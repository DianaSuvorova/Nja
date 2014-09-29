var http = require('http'),
    express = require('express'),
    departments = require('./data/departments.json'),
    department = require('./data/department.json'),
    course = require('./data/course.json'),
    error = require('./data/course.json')
    port = 8102,
    getId = function () { return Math.floor(Math.random() * 500).toString(); };

var app = express();
  app.use(express.json({limit: '20mb'}));
  app.use(app.router);

app.all('*', function (req, res, next) { setTimeout(next, 1000); }); // Delay everything so we see loading states, etc.

// Error states

// Fake data to get the app up and running
app.get('/v0/login', function (req, res) { res.send(200); });
app.get('/v0/school/:id', function (req, res) { res.send(departments); });
app.get('/v0/departments/:id', function (req, res) { res.send(department); });
app.get('/v0/courses/:id', function (req, res) { res.send(course); });


var httpServer = http.createServer(app).listen(port, function () {
  console.log('Fakepi listening on port ' + port);
});
