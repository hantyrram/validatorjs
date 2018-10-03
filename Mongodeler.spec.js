require('dotenv').config();
let m = require('./');

async function run(){
  await m.connect("mongodb://dbadmin-11223344:44adm!nx1!@ds141631.mlab.com:41631/hantyr-shop-db-test");
  let User = m.createModel('users');
  console.log(User);
  let user = new User({username:'abcdefg'});
  user.save();
  user.remove();
}

run();