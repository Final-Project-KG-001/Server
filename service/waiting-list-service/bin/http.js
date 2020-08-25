
const app = require('../app.js');
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'test';


app.listen(PORT, function () {
  console.log('running on port');
  console.table({ PORT, NODE_ENV })
})