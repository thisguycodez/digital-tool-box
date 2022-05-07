from hooks import *



all_routes = ['/register','/login','/','/home']


# 1-- before every request call, check sessions and add user to session


# 2 -- register route actions here
@app.route('/register',methods=['POST'])
def register():
    if request.method == 'POST':

        return register_user(request.json),200



# 3 -- login route actions here, if pw is correct allow home render else login(return false)
@app.route('/login',methods=['POST'])
def login():
    if request.method == 'POST':
        print(request.cookies)
        r = user_login(request.json)
        res = make_response(r)
        print('>>>>>>>>>>>>>>>>',r)
        # set cookie from server side to duck the 'SameSite' error
        res.set_cookie('dtb_usr',json.loads(r)['session']['username_token'],samesite='Lax',secure=True)
        return res,200





# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------






#   IP LOOCKUP TOOLS ----------------------------------------
@app.route('/get_ip')
def get_ip():

    if request.method == 'GET':
        return str(request.environ.get('HTTP_X_FORWARDED_FOR',request.environ['REMOTE_ADDR']))




@app.route('/get_url_ip',methods=['POST'])
def url_ip():

    try:
        obj=request.json

        if '://' in obj['url']:
            obj['url'] = obj['url'][obj['url'].index('://')+3:]

        print(obj)
        ip = built_in_socket.gethostbyname(obj['url'])
        return f'active ip for url given: {ip}'


    except Exception as e:
        return "Not a valid url"



# FULL CREDENTIALS FOR URL OR IP ADDRESSES
@app.route('/geo_credz',methods=['POST'])
def geo_credz():
    if request.method == 'POST':
        # is this an ip address?
        if int(request.json['address'].count('.')) == 3:
            ip = request.json['address']
            response = DbIpCity.get(f'{ip}', api_key='free')
            print(response.to_json())
            return dict(msg=f'current active geo info on the ip given. {ip}',data=response.to_json())


        else:
            try:
                obj=request.json

                if '://' in obj['address']:
                    obj['address'] = obj['address'][obj['address'].index('://')+3:]

                print(obj)
                ip = built_in_socket.gethostbyname(obj['address'])
                response = DbIpCity.get(f'{ip}', api_key='free')
                print(response.to_json())
                return dict(msg=f'current active geo info on the ip currently being used on the url given.',data=response.to_json())



            except Exception as e:
                return "Not a valid url"





# URL SHORTENER
@app.route('/shorten_url',methods=['POST'])
def shorten_url():
    if request.method == 'POST':
        url = request.json['url']

        squeeze = pyshorteners.Shortener()

        shrt_url = squeeze.tinyurl.short(url)


        return shrt_url
#   IP LOOCKUP TOOLS ----------------------------------------








# NOTEPAD FEATURES ONLY -------------------------------------
@app.route('/notepad/<act>',methods=['POST'])
def notepad(act):
    #check session / validate user before action takes off
    print(act)
    usr = request.json
    user_cred = Users.query.filter_by(username=usr['username']).first()
    
    if not user_cred:
        return abort(403)

    is_session_active = Sessions.query.filter_by(user_id=user_cred.id).first()

    #if not apart of the logged in session list then kick them
    if not is_session_active or user_cred.note_pad_id != usr['npid']:
        return abort(403)


    db.session.close()
    if request.method == 'POST':
        

            if 'add' in act:
                return str(add_note(usr))
                
            elif 'upd' in act:
                del usr['username']
                return str(update_note(usr))

            elif 'del' in act:
                return str(delete_note(usr))

            elif 'get' in act:
                return str(get_notes(usr))




        

# NOTEPAD FEATURES ONLY -------------------------------------

# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------
# APPLICATION FEATURES ROUTES HERE ---------------------





# Routes to render application (sever/client-in-app rendering)
@app.route('/', methods=['GET'])
def index():
    if request.method == 'GET':
        return render_template('index.html')


@app.route('/home', methods=['GET'])
def home():
    if request.method == 'GET':
        return render_template('index.html')
        


@app.route('/home/ip_tools', methods=['GET'])
def ip_tools():
    if request.method == 'GET':
        return render_template('index.html')
        


@app.route('/home/url_shortener', methods=['GET'])
def url_shortener():
    if request.method == 'GET':
        return render_template('index.html')
        

@app.route('/home/note_pad', methods=['GET'])
def note_pad():
    if request.method == 'GET':
        return render_template('index.html')
        





# Run
if __name__ == '__main__':
    app.run()
