
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from handlers import ScheduleEngine, GetSchedule, SaveSchedule, Tester

        

def main():
    app = webapp.WSGIApplication([('/',              ScheduleEngine),  # for full sample scheduler engine
                                  ('/saveschedule',  SaveSchedule),    # for saving schedules (by post)
                                  ('/getschedule',   GetSchedule),    # for ajax schedule requests
                                  ('/test',          Tester)],
                                 debug=True)
    run_wsgi_app(app)


if __name__ == "__main__":
    main()

