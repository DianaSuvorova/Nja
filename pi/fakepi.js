var http = require('http'),
    express = require('express'),
    departments = require('./data/departments.json'),
    department = require('./data/department.json'),
    course = require('./data/course.json'),
    port = 8000;

var app = express();
  app.use(express.json({limit: '20mb'}));
  app.use(app.router);

app.get('/login', function (req, res) { res.send(200); });
app.get('/departments', function (req, res) { res.send(departments); });
app.get('/departments/:id', function (req, res) { res.send(department); });
app.get('/courses/:id', function (req, res) { res.send(course); });
app.get('*', function (req, res) { res.sendfile('index.html'); });


var httpServer = http.createServer(app).listen(port, function () {
  console.log('Fakepi listening on port ' + port);
});
