module.exports = {
  schema: true,
  attributes: {
    password: {
      type: 'string'
    },
    login: {
      type: 'string',
      required: true,
      unique: true
    },

    courses: {
      collection: 'course',
      via: 'owner'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeUpdate: function(values, next) {
    authService.hashPassword(values);
    next();
  },
  beforeCreate: function(values, next) {
    authService.hashPassword(values);
    next();
  }
};
