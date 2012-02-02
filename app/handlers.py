
import os
from google.appengine.ext.webapp import template
from django.utils import simplejson
from model import Schedule, Point
from google.appengine.ext import db
from google.appengine.ext import webapp


class SaveSchedule(webapp.RequestHandler):
    def post(self):
        a, d = self.request.get('author'), self.request.get('description')  # error: missing either key
        text = ""
        #try:
        schedString = self.request.get('schedulestring')   # error: missing parameter
        jsonSched = simplejson.loads(schedString)          # error: bad json
        
        s = Schedule(auth = a, desc = d)
        s.put()                                            # error: some puts succeed while others fail
        text += "saved schedule"
        for pt in jsonSched["points"]:                     # error: not an object, or no "points" key
            p = Point(sched = s, location = map(int, pt), phase = ['R', 'R'])  # error:  setting all phases to RR
            p.put()                                        # error: some puts succeed while others fail
            text += "saved point"
        # schedule should be post-ed as json string
        # so parse the string into Schedule's and Point's, then save it 
        #   (check out previous versions of scheduler.py for examples of saving)
        self.response.out.write('<html><body>Schedule was successfully saved!</body></html>') # maybe add the schedule's id?
        #except Exception, e:
        #    self.response.out.write('<html><body>error: ' + e.message + str(a) + str(d) + text + '</body></html>')


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
