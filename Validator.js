const Constraint = require('./Constraint');

class Validator{
 /**
  * 
  * @param {Constraint} constraint - The constraint. defaults to a new empty Constraint. Empty constraint will
  * always return true on validation. This is to allow the use of Validator without the need to throw an error
  * on empty constraint, instead it will just always validate to true,since an object is always valid if there
  * are no defined constraint to it.
  */ 
 constructor(constraint = new Constraint()){
  this.constraint = constraint;
 }

 /**
  * Validates an object based on the constraint
  * @param {object} obj - The object to validate with the Constraint
  */
 validate(obj){
  for(let k in this.constraint.isRequiredDefinitions){
    if(k !== undefined){//if there is a requiredDefinitions for prop k
     if(obj[k] === undefined){//and prop k is not defined
      throw new ValidationError(`isRequired check failed:field->${k}`);
     }
    }
  }

   for(let k in this.constraint.minLengthDefinitions){
    if(k !== undefined){//if there is a minLengthDefinitions for prop k
     if(obj[k] !== undefined && obj[k].length < this.constraint.minLengthDefinitions[k]){//and prop k is not defined
      throw new ValidationError(`minLength check failed:field->${k}`);
     }
    }
   }
 
   for(let k in this.constraint.maxLengthDefinitions){
    if(k !== undefined){//if there is a minLengthDefinitions for prop k
     if(obj[k] !== undefined && obj[k].length > this.constraint.maxLengthDefinitions[k]){//and prop k is not defined
      throw new ValidationError(`maxLength check failed:field->${k}`);
     }
     }
    }

    for(let k in this.constraint.formatDefinitions){
      if(k !== undefined){//if there is a minLengthDefinitions for prop k
       if(obj[k] !== undefined && !this.constraint.formatDefinitions[k].test(obj[k])){//and prop k is not defined
        throw new ValidationError(`format check failed:field->${k}`);
       }
      }
     }

     for(let k in this.constraint.typeDefinitions){
      if(k !== undefined){//if there is a typeDefinition for prop k
        let type = this.constraint.typeDefinitions[k];
        if(type === 'string' || type === 'number' || type === 'boolean'){
         
         if(obj[k] !== undefined && typeof obj[k] !== type){
          throw new ValidationError(`type check failed:field->${k}`);
         }
        }
        else{
         if(obj[k] !== undefined && !(obj[k] instanceof type)){//type is assumed to be a Class e.g. class X{}
         throw new ValidationError(`type check failed:field->${k}`);
         }
        }
       }
      }
   return true;
 }

 get requiredFields(){
  //return the required Fields in the constraint
 }
}

class ValidationError extends Error{
  constructor(message){
    super(mesage);
    this.name = 'VALIDATION_ERROR';
  }

}

Validator.ValidationError = ValidationError;

module.exports = Validator;

