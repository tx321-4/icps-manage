const fs = require('fs');
const path = require('path');
const { sequelize } = require('./db');

const files = fs.readdirSync(path.join(__dirname));

const js_files = files.filter((f) => {
  return f.endsWith('.js');
}, files);

module.exports = {};

for ( const f of js_files) {
  const name = f.substr(0, f.length - 3);
  if (name !== 'db' && name !== 'models') {
    module.exports[name] = require(path.join(__dirname, f));
  }
}

module.exports.sync = () => {
  sequelize.sync({});
}