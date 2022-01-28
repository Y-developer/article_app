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

# create database tables
class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body


# Serialize the data
ma = Marshmallow(app)

class ArticlesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')

article_schema = ArticlesSchema()
articles_schema = ArticlesSchema(many=True)
if __name__ == '__main__':
    app.run(debug=True)