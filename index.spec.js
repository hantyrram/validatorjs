require('dotenv').config();

const assert = require('assert');

describe('mongodeler', function(){

  describe('connect',function(){
    it('returns true on proper connection',function(done){
      const mongodeler = require('./mongodeler');

      async function run(){
        try {
          console.log(process.env.MONGODB_URI);
          let connectionOK = await mongodeler.connect("mongodb://dbadmin-11223344:44adm!nx1!@ds141631.mlab.com:41631/hantyr-shop-db-test");  
          console.log(connectionOK);
          assert.ok(connectionOK);
          done();
        } catch (error) {
          console.log(error);

        }
        
      }
      
      run();

    });
  });
})





