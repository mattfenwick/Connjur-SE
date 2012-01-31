
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import random
import os
from google.appengine.ext.webapp import template
from django.utils import simplejson

class Schedule(db.Model):
  auth = db.StringProperty(required = True)
  date = db.DateTimeProperty(auto_now_add = True)
  desc = db.StringProperty(required = True, multiline = True)


class Point(db.Model):
  sched = db.ReferenceProperty(Schedule, collection_name = 'points')
  location = db.ListProperty(int)
  phase = db.StringListProperty()


class Scheduler(webapp.RequestHandler):
  def get(self):

    self.response.out.write("""
<html>
<body>
<form action='/add' method='post'>
  Author:<textarea name='auth'></textarea>
  Description:<textarea name='desc'></textarea>
  <input type='submit' value='Save schedule'>
</form>
</body>
</html>""")


class Adder(webapp.RequestHandler):
  def post(self):
    a, d = self.request.get('auth'), self.request.get('desc')
    try:
      if not a or not d:
        raise ValueError()
      s = Schedule(auth = a, desc = d)
      s.put()
      for x in range(100):
        p = Point(sched = s, location = [random.randint(0, 100), random.randint(0, 100)], phase = [random.choice(['I', 'R']), random.choice(['I', 'R'])])
        p.put()
      self.redirect('/search')
    except Exception, e:
      self.response.out.write('<html><body>' + e.message + a + d + '</html><body>')
#      self.redirect('/failure?message=exception_in_Adder')
  def get(self):
    self.redirect('/failure?message=no_gets_please')


class Failure(webapp.RequestHandler):
  def get(self):
    self.response.out.write('<html><body>damn it, it did not work: ' + self.request.get('message') + '</body></html>')


class Reader(webapp.RequestHandler):
  def get(self):
    self.response.out.write("<html><body><table border='2'><tr><th>author</th><th>description</th><th>key</th></tr>")
    scheds = db.GqlQuery("SELECT * FROM Schedule")
    for s in scheds:
      self.response.out.write("<tr><td>" + s.auth + "</td><td>" + s.desc + "</td><td>" + str(s.key().id()) + "<td>")
      for p in s.points:
        self.response.out.write(str(p.phase) + "," + str(p.location) + ",,")
      self.response.out.write("</td></tr>")
    self.response.out.write("</table></body></html>")


class Searcher(webapp.RequestHandler):
  def get(self):
    scheds = db.GqlQuery("SELECT * FROM Schedule")
    ids = []
    for s in scheds:
      ids.append(s.key().id())

    stuff = {'ids': ids}
    path = os.path.join(os.path.dirname(__file__), 'searcher.html')
    self.response.out.write(template.render(path, stuff))


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
        
class View(webapp.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'viewSchedule.html')
        self.response.out.write(template.render(path, {}))

def main():
    app = webapp.WSGIApplication([('/',        Scheduler),
                                  ('/add',     Adder),
                                  ('/success', Reader),
                                  ('/failure', Failure),
                                  ('/read',    Reader),
                                  ('/search',  Searcher),
                                  ('/schedule',  GetSchedule),
                                  ('/full',      Full),
                                  ('/view',      View)],
                                 debug=True)
    run_wsgi_app(app)

if __name__ == "__main__":
    main()

