var http = require('http'),
    express = require('express'),
    schools = require('./data/schools.json'),
    departments = require('./data/departments.json'),
    courses = require('./data/courses.json'),
    course = require('./data/course.json'),
    port = 8000;

var app = express();
  app.use(express.json({limit: '20mb'}));
  app.use(app.router);

app.all('*', function (req, res, next) { setTimeout(next, 500); });

app.get('/api/login', function (req, res) { res.send(200); });
app.get('/api/school', function (req, res) { res.send(schools); });
app.get('/api/school/:id', function (req, res) { res.send(departments); });
app.get('/api/department/:id', function (req, res) { res.send(courses); });
app.get('/api/course/:id', function (req, res) { res.send(course); });
app.post('/api/user', function (req, res) {
  if (req.body.phone.length === 10 ) res.send({ "status": "SMS request sent"});
  else res.send({"error_code": 400,"error": "Invalid phone number"});
});

app.post('/api/user/:phoneNumber', function(req, res) {
  if (req.body.confirmation_token === "11") res.send({"error_code": 400,"error": "Invalid confirmation token"});
  else res.send({"access_token": "58557faa-b04a-43f2-9087-a6a3474fd330"});
});


app.get('/dist/build.js', function (req, res) { res.sendfile('dist/build.js'); });
app.get('/dist/ga.js', function (req, res) { res.sendfile('dist/ga.js'); });
app.get('/dist/build.css', function (req, res) { res.sendfile('dist/build.css'); });
app.get('/dist/phone@2x.png', function (req, res) { res.sendfile('dist/phone@2x.png'); });
app.get('/dist/logo@2x.png', function (req, res) { res.sendfile('dist/logo@2x.png'); });
app.get('/dist/radar-tail.png', function (req, res) { res.sendfile('dist/radar-tail.png'); });


app.get('*', function (req, res) { res.sendfile('index.html'); });


var httpServer = http.createServer(app).listen(port, function () {
  console.log('Fakepi listening on port ' + port);
});
