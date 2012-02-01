
import os
from google.appengine.ext.webapp import template
from django.utils import simplejson
from model import Schedule, Point
from google.appengine.ext import db


class Save(webapp.RequestHandler):
    def get(self):
        pass


class GetSchedule(webapp.RequestHandler):
  def get(self):
    id = int(self.request.get('id'))
    sched = Schedule.get_by_id(id)
    s = {'author': sched.auth, 'description': sched.desc, 'points': [], 'id': sched.key().id()}
    for p in sched.points:
      s['points'].append({'location': p.location, 'phase': p.phase})
    self.response.out.write(simplejson.dumps(s))
    
    
class Full(webapp.RequestHandler):
    def get(self):
        scheds = db.GqlQuery("SELECT * FROM Schedule")
        ids = []
        for s in scheds:
          ids.append(s.key().id())
    
        stuff = {'ids': ids}
        path = os.path.join(os.path.dirname(__file__), 'scheduler.html')
        self.response.out.write(template.render(path, stuff))