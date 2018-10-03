const EventEmitter = require('events');
const Validator = require('./Validator');
const Constraint = require('./Constraint');
const MongoClient = require('mongodb').MongoClient;

class Mongodeler extends EventEmitter{
  constructor(){
    super();
    this.ready = false;
    this.on('db-ready',(db)=>{
      this.db = db;
      this.ready = true;
    })
  }

  /**
   * Database is ready, true if connect was called and was successful.
   */
  get isReady(){
    return this.ready;
  }

  /**
   * Connects to the database
   * @param {string} path 
   */
  async connect(path){
    console.log('Connecting to DB');
    try {
      let connectedClient = await MongoClient.connect(path,{useNewUrlParser:true});  
      //retrieve the database name instead of extracting from path, database name is on s.options object of the connected client
      let databaseName = connectedClient.s.options.db;
      
      this.emit('db-ready',connectedClient.db(databaseName));
      
      return this.ready;

    } catch (mongoError) {
      console.log(mongoError);
      return mongoError;
    }
  }

/**
 * Creates a Model based on the given collection. The Model will have the static and prototype functions to 
 * transact to the MongoDB database.
 * @param {string} collectionName - The name of the collection 
 * @param {Constraint} modelConstraint - <optional> The Constraint
 */
  createModel(collectionName,modelConstraint){

    let collection = this.db.collection(collectionName);

    let M = class {

      constructor(data){
        //default validator with empty constraint
        this.validator = new Validator();
        Object.defineProperty(this,'collection',{value:collection,enumerable:false,writable:false});
        if(modelConstraint && modelConstraint instanceof Constraint){
          this.validator = new Validator(modelConstraint);
          //immediately validate data on Model construction if a Constraint was set during createModel
          this.validator.validate(data);
        }
        //allow passing data on construction
        this.document = {};
        (data) ? Object.assign(this.document,data): null;
        
      }

      /**
       * Saves the Model to the database. If ._id is present, updates the collection
       * @throws {Validator.ValidationError} - If data is not valid
       */
      save(){
        this.validator.validate(this.document);
        console.log('Saving',this.document);
      }
      remove(){
        console.log('Removing...',this.document);
      }
    }
    return M;
  }

}

module.exports = Mongodeler;
