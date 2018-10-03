const assert = require('assert');
/**
 * Defines a field as a required field.
 * 
 * @param {string} field - The name of the field
 * @param {boolean} bool - true,false or truthy or falsy values. Automatically converted to boolean value.
 */
const isRequired = function(field,bool = true){
  this.isRequiredDefinitions[field] = bool !== true || bool !== false? Boolean(bool): bool;
  return this;
}

/**
 * Indicates the mininum length of the field
 * @param {string} field - The name of the field.
 * @param {number} num - The minimum length of the field.
 */
const minLength = function(field,num){
  if(this.maxLengthDefinitions[field]){
    if(num > this.maxLengthDefinitions[field] ){
      throw {error:'CONSTRAINT_VIOLATION',message:`Value can't be greater than maxLength!`}
    }
  }
  this.minLengthDefinitions[field] = num;
  return this;
}

/**
 * Indicates the maximum length of the field
 * @param {string} field - The name of the field.
 * @param {number} num - The maximum length of the field.
 */
const maxLength = function(field,num){
  if(this.minLengthDefinitions[field]){
    if(num < this.minLengthDefinitions[field] ){
      throw {error:'CONSTRAINT_VIOLATION',message:`Value can't be greater than maxLength!`}
    }
  }
  this.maxLengthDefinitions[field] = num;
  return this;
}

/**
 * Indicates the type of the field. Value can be 'string','boolean','number',null, or a Class
 * @param {string} field - The name of the field.
 * @param {mix} type - The javascript type of the field.
 */
const type = function(field,type){
  this.typeDefinitions[field] = type;
  return this;
}

const format = function(field,regexp){
 this.formatDefinitions[field] = RegExp(regexp);
}



class ModelConstraint{

  constructor(){
    this.minLengthDefinitions = [];
    this.maxLengthDefinitions = [];
    this.typeDefinitions = [];
    this.isRequiredDefinitions = [];
    this.formatDefinitions = [];
  }

  /**
   * Set's the name of the field, to define a constraint to.
   * @param {string} field 
   */
  forField(field){
    assert(typeof field === 'string','field should be a string!')
    this.isRequired = isRequired.bind(this,field);
    this.minLength = minLength.bind(this,field);
    this.maxLength = maxLength.bind(this,field);
    this.type = type.bind(this,field);
    this.format = format.bind(this,field);
    this.type(this.defaultType);
    return this;
  }

  /**
  * Sets the default type for a field. If type() and defaultType() is not used, ModelConstraint will use 'string'
  * as default type for each field definition.
  */
  set defaultType(defaultType){
    Object.defineProperty(this,'ds',{value: defaultType,configurable:false,enumerable:false});
  }

  get defaultType(){
    if(!this.ds){
    return 'string';
    }
    return this.ds;
  }
}

module.exports = ModelConstraint;