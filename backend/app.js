const path = require("path");
const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const config = require('./config/database');
const users = require('./controllers/users');
const items = require('./controllers/items');
const categories = require('./controllers/categories');
const messages = require('./controllers/messages');
const craiglist = require('./controllers/craiglist');
const learning = require('./controllers/learning');
global.io = io;

mongoose.connect(config.database);

const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/items', items);
app.use('/api/categories', categories);
app.use('/api/messages', messages);
app.use('/api/craigslist', craiglist);
app.use('/api/learning', learning);

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, "dist/Agora", index.html));
});

var clients = [];
global.clients = clients;

io.on('connection', socket => {

  console.log('user connected');

  socket.on('sendUser', (id) => {
    clients.push({
      id: id,
      "socket": socket.id
    });
    console.log(clients);

  });

  socket.on('disconnect', function () {
    var index = clients.find((client, i) => {
      if (client.socket == socket.id) {
        return i;
      }
    });
    clients.splice(index, 1);
    console.log(clients);
    console.log('user disconnected');
  });


});

//Listen to port 3000
http.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});

module.exports = app;
