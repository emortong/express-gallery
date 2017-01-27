const app = require('./server');
const db = require('./models');

app.listen(3033, function() {
  console.log('Started connection on port 3033');
  db.sequelize.sync();
});

