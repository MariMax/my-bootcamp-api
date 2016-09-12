module.exports.policies = {

    '*': ['isAuthenticated'],

    AuthController: {
        '*': true
    }
};
