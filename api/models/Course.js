/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  types: {
      stringArray: function(array){
          if (!Array.isArray(array)) {
              return false;
          } else {
              return array.every(function (value) {
                  return typeof(value) === "string"
              });
          }
      }
  },
  attributes: {
    title:{
      type: 'string'
    },
    description:{
      type: 'string'
    },
    duration:{
      type:'integer'
    },
    date:{
      type:'date',
      defaultsTo: new Date()
    },
    authors:{
      type:'array',
      stringArray:true
    },

    owner:{
      model:'user'
    }
  }
};
