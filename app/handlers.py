
import os
from google.appengine.ext.webapp import template
from django.utils import simplejson
from model import Schedule, Point
from google.appengine.ext import db
from google.appengine.ext import webapp


class SaveSchedule(webapp.RequestHandler):
    def post(self):
        # schedule should be post-ed as json string
        # so parse the string into Schedule's and Point's, then save it 
        #   (check out previous versions of scheduler.py for examples of saving)
        pass


class GetSchedule(webapp.RequestHandler):
  def get(self):
    id = int(self.request.get('id'))
    sched = Schedule.get_by_id(id)
    if sched is None:
        self.response.out.write(simplejson.dumps({'error': 'no schedule of id ' + str(id)}))
    else:
        s = {'author': sched.auth, 'description': sched.desc, 'points': [], 'id': sched.key().id()}
        for p in sched.points:
            s['points'].append({'location': p.location, 'phase': p.phase})
        self.response.out.write(simplejson.dumps(s))
    
    
class ScheduleEngine(webapp.RequestHandler):
    def get(self):
        scheds = db.GqlQuery("SELECT * FROM Schedule") # is this horribly inefficient or a bad practice?
        ids = []
        for s in scheds:
          ids.append(s.key().id())
    
        stuff = {'ids': ids}
        path = os.path.join(os.path.dirname(__file__), 'scheduler.html')
        self.response.out.write(template.render(path, stuff))
