/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title:{
      type: 'string',
      required: true
    },
    description:{
      type: 'string',
      required: true
    },
    duration:{
      type:'integer',
      required: true
    },
    date:{
      type:'date',
      defaultsTo: new Date()
    },
    authors:{
      collection: 'author',
      via: 'works',
      dominant: true
    },

    owner:{
      model:'user'
    }
  }
};
