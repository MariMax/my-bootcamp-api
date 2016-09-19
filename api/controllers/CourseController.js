/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create(req, res) {
    Course
      .create(Object.assign({}, _.omit(req.allParams(), 'id'), {
        owner: req.user.id
      }))
      .then(course => res.created(course))
      .catch(error => res.serverError(error))
  },

  destroy(req, res) {
    var id = req.allParams().id;
    if (!id) {
      return res.notFound(req.allParams());
    }
    Course
      .remove(id)
      .then(() => res.ok())
      .catch(error => res.serverError(error));
  },

  update(req, res) {
    var course = req.allParams();
    if (!course.id) {
      return res.notFound(req.allParams());
    }
    Course
      .update({
        id: course.id
      }, course)
      .then(() => Course.findOne({
        id: course.id
      }))
      .then(course => res.ok(course))
      .catch(error => res.serverError(error))
  },

  find(req, res) {
    Course
      .find()
      .where({
        owner: req.user.id
      })
      .then(courses => res.ok({
        items: courses
      }))
      .catch(error => res.serverError(error))
  }
};
