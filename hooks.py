from tblz import *






#using json web token to self encode passwords
#this way its up to the user to remember there password
#see ...I will never even know your fake password 
def secure_pw(pw):
	spw = jwt.encode({"psk":pw},pw,algorithm="HS256")

	return str(spw) 


def pull_pw(pw,pw_attempt):
	spw = jwt.decode(pw,pw_attempt,algorithms=["HS256"])

	return spw 




# register a user 
def register_user(user):
	try:
		# pull keys & values into a new obj (sec finesse)
		user_ = {}
		if user.get('username') and user.get('psk'):
			user_['username'] = user['username'].strip()
			user_['psk'] = user['psk']
		else:
			raise Exception('The info sent does not match the required info needed. ')
		# check for errors
		un = user_['username']
		upw = user_['psk']
		if len(un) < 5 or len(un) > 12:
			raise Exception('username - (5-12 characters only)')
		
		elif not un.isascii() or un.isspace() or type(un) != str:
			raise Exception('username - (A-z 0-9 mainly)')

		elif len(upw) < 5:
			raise Exception('password - (5 characters long at least)')
		
		elif upw.isspace() or type(upw) != str:
			raise Exception('password - (needs more characters)')

		# ok to move on here(else:) after no errors found
		else:
			# create a new user in the db
			pw_bank_id = str(uuid.uuid4())
			note_pad_id = str(uuid.uuid4())
			events_id = str(uuid.uuid4())
			new_user = Users(username=un,psk=secure_pw(upw),pw_bank_id=pw_bank_id,note_pad_id=note_pad_id,events_id=events_id)
			# insert into db
			db.session.add(new_user)
			db.session.commit()
			# return an success msg
			return f"Successfully registered username: {un}"

		return 'Something went wrong try later.'
	except Exception as e:

		if "UNIQUE" in str(e) and 'users.username' in str(e):
			return "This Username is already taken"


		print(str(e))


# user is loging in
def user_login(user):
	try:
		print('checking if user exist in DB....')
		# see if user exist
		user_cred = Users.query.filter_by(username=user['username']).first()


		# check if user exist 
		if not user_cred:
			raise Exception('That username does not exist...') 
		

		print('checking users password credz >>>>>>>>',type(user_cred))
		# check pw
		check = pull_pw(user_cred.psk,user['psk'])
		if check and type(check) == dict:
			print('>>>>>>>>>>>>>>>',check['psk'])
			

			# remove user from sessions if user is there
			# add user to session for fresh token
			# add to sessions

			Sessions.query.filter_by(user_id=user_cred.id).delete()
			fresh_user_session = Sessions(user_id=user_cred.id,username_token=str(uuid.uuid4()))
			db.session.add(fresh_user_session)
			db.session.commit()
			fresh_user_session = Sessions.query.filter_by(user_id=user_cred.id).first()
			# recreate user obj, at this point user has proven themselves
			# throw full cred obj, with session obj within, remove enc psk
			
			user = copy.copy(user_cred)
			user = json.loads(str(user))
			sess_obj = json.loads(str(fresh_user_session))
			print('SESSION BEFORE DONE>>>>>>>>>>>>>>>',sess_obj)
			user['session'] = sess_obj
			print('RIGHT BEFORE DONE>>>>>>>>>>>>>>>',user)
			# id is already in sessions obj, del the extra
			# del the enc password before sending obj
			del user['id']
			del user['psk']
			print('DONE>>>>>>>>>>>>>>>',user)
			# return users full obj an send to the front end
			return json.dumps(user)

		else:
			raise Exception('password does not match.')
	except Exception as e:
		print(str(e))

		if "psk" in str(e) and len(str(e)) < 5:
			return "Use the App"

		# if user is not in the DB
		if "NoneType" in str(e):
			return "user does not exist in this application"

		elif "Signature verification failed" in str(e):
			return 'password does not match.'

		return str(e)












# note pad features below ---------------------------------------

# get all the notes requested user has
def get_notes(obj):
	try:
		npid = obj['npid']
		notes = Note_Pad.query.filter_by(note_pad_id=npid).all()#filter_by(note_pad_id=npid)
		

		return notes

	except Exception as e:

		return str(e)







# adding notes to the DB
def add_note(obj):
	try:
		npid = obj['npid']
		# create table instance
		new_note = Note_Pad(title=obj['title'],body=obj['body'],note_pad_id=npid)

		# add it
		db.session.add(new_note)
		
		# save/commit
		db.session.commit()

		# new updated list

		notes = get_notes({"npid":npid})

		db.session.close()
		# return msg and new data
		return notes


	except Exception as e:

		
		return str(e)


	


#update a note within the data base
def update_note(obj):
	try:
		#grab the note the user is looking for
		the_note = Note_Pad.query.filter_by(id=obj['id'],note_pad_id=obj['npid'])
		touch_obj_2_cIFitExist = Note_Pad.query.filter_by(id=obj['id'],note_pad_id=obj['npid']).first()


		#if its none the obj holding npid an id doesnt exist
		if not touch_obj_2_cIFitExist:
			raise Exception('That Note Does Not Exist...')

		#switch npid for full name as it is in table
		obj['note_pad_id'],npid,obj['last_saved'] = obj['npid'],obj['npid'],datetime.datetime.now()
		del obj['npid']

		#add to data table
		the_note.update(obj)

		#save/commit
		db.session.commit()


		#get updated verison of users list
		notes = get_notes({"npid":npid})

		#close session actions
		db.session.close()
		
		# return msg and new data
		return notes


	except Exception as e:

		return str(e)








#delete users requested note or notes
def delete_note(obj):
	try:
		#if true then delete all
		if obj['amt']:

			kill_all = Note_Pad.query.filter_by(note_pad_id=obj['npid']).delete()

			print(kill_all,type(kill_all))

			if not kill_all:
				raise Exception('You dont have any notes to delete.')

			db.session.commit()
			db.session.close()

			return []
		#else delete the 1 requested
		else:
			x_out = Note_Pad.query.filter_by(id=obj['id'],note_pad_id=obj['npid']).delete()


			if not x_out:
				raise Exception('that note didnt exist...hmm')

			db.session.commit()
			db.session.close()
			notes = get_notes({"npid":obj['npid']})

			return notes

	except Exception as e:
		return str(e)









