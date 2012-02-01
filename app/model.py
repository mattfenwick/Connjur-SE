
from google.appengine.ext import db



class Schedule(db.Model):
  auth = db.StringProperty(required = True)
  date = db.DateTimeProperty(auto_now_add = True)
  desc = db.StringProperty(required = True, multiline = True)


class Point(db.Model):
  sched     = db.ReferenceProperty(Schedule, collection_name = 'points')
  location  = db.ListProperty(int)
  phase     = db.StringListProperty()