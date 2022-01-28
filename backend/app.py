import datetime

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

# confi the mysql data base
# mysql://username:password@server/db
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/electronjs_flask_ex'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
if __name__ == '__main__':
    app.run(debug=True)