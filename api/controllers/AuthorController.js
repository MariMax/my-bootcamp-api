/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  get(req, res) {
    Author
      .find({})
      .then(authors => res.ok({
        items: authors
      }))
      .catch(error => res.serverError(error))
  }
};
