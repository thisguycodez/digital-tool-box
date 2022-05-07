from flask import Flask, render_template, request, url_for, abort, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from ipaddress import IPv4Network
from requests import get
from ip2geotools.databases.noncommercial import DbIpCity
import datetime,os,timedelta,uuid,jwt,json,copy,socket as built_in_socket,pyshorteners
from faker import Faker





fake = Faker()


# db uri's
uri = 'postgresql://pwcyjfcpcluhdn:ed8bea7b04805752efc26eaa7057b296390947b65a2ad7e774358325b17831f2@ec2-52-5-110-35.compute-1.amazonaws.com:5432/d1dnr7t4u23mrl'


if not os.environ.get('IS_HEROKU'):
	pass
else:
	uri = os.environ['DATABASE_URL']

# days of session expire
one_day = timedelta.Timedelta(days=1)

# build your own custom sessions until you know why its not building its table
# Variables
app = Flask(__name__)
app.app_context()
# Settings
# app.config['DEBUG'] = True
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
# switch secret to an actual psk secret
app.config['SECRET_KEY'] = 'f>w$f!@[$Ty|24];]}ea=5A-t#2g_@g4{@'

# sockets active per visitor (* accept every call source on production use : client side host link)

# 
app.config['SQLALCHEMY_DATABASE_URI'] = uri

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)










# created tablez
# USER ACCOUNTS
class Users(db.Model):
	__name__='users'


	id = db.Column(db.Integer,primary_key=True)

	username = db.Column(db.String(12),nullable=False,unique=True)

	psk = db.Column(db.String(1000),nullable=False)

	date_created = db.Column(db.DateTime,default=datetime.datetime.now())

	last_login = db.Column(db.DateTime,nullable=False,default=datetime.datetime.now())

	pw_bank_id = db.Column(db.String(1000),nullable=False,unique=True)

	note_pad_id = db.Column(db.String(1000),nullable=False,unique=True)

	events_id = db.Column(db.String(1000),nullable=False,unique=True)



	def __repr__(self):


		return json.dumps({
			"id":self.id,
			"username":self.username,
			"psk":self.psk,
			"date_created":str(self.date_created),
			"last_login":str(self.last_login),
			"pw_bank_id":self.pw_bank_id,
			"note_pad_id":self.note_pad_id,
			"events_id":self.events_id

			})






#SESSION TABS FOR USER LOGINS (DQLALCHEMY DOES NOT CREATE THE TABLE SO i WILL)
class Sessions(db.Model):
	
	__name__='sessions'


	id = db.Column(db.Integer,primary_key=True)
	
	user_id = db.Column(db.Integer,nullable=False)
	
	date_created = db.Column(db.DateTime,nullable=False,default=datetime.datetime.now()+one_day)
	
	expire = db.Column(db.DateTime,nullable=False,default=datetime.datetime.now())
	
	username_token = db.Column(db.String(1000),nullable=False)



	def __repr__(self):

		return json.dumps({
			"id":self.id,
			"user_id":self.user_id,
			"date_created":str(self.date_created),
			"expire":str(self.expire),
			"username_token":self.username_token
			})








# note pad. users will be able to use a builtin notepad app on tab
class Note_Pad(db.Model):
	
	__name__='note_pad'



	id = db.Column(db.Integer,primary_key=True,nullable=False)

	title = db.Column(db.String(12),nullable=False)

	body = db.Column(db.String(1000),nullable=False)

	last_saved = db.Column(db.DateTime,nullable=False,default=datetime.datetime.now())

	note_pad_id = db.Column(db.String(1000),nullable=False)



	def __repr__(self):
		return json.dumps({
					"id":self.id,
					"title":self.title,
					"body":self.body,
					"last_saved":str(self.last_saved)[0:str(self.last_saved).index('.')],
					"note_pad_id":self.note_pad_id
					},default=lambda obj: obj.__dict__)




