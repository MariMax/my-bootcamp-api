/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';

const populateAuthors = (course) => {
  return Object.assign({}, course, { authors: course.authors.map(i => i.id) });
}

module.exports = {
  create(req, res) {
    Course
      .create(Object.assign({}, _.omit(req.allParams(), 'id'), {
        owner: req.user.id
      }))
      .then(course => Course.findOne({ id: course.id }).populate('authors'))
      .then(course => {
        course = populateAuthors(course);
        return res.created(course);
      })
      .catch(error => res.serverError(error))
  },

  destroy(req, res) {
    var id = req.allParams().id;
    if (!id) {
      return res.notFound(req.allParams());
    }
    Course
      .destroy({ id:id })
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
      .then(() => Course.findOne().where({ id: course.id }).populate('authors'))
      .then(course => {
        course = populateAuthors(course)
        return res.ok(course)
      })
      .catch(error => res.serverError(error))
  },

  find(req, res) {
    console.log(req.user.id);
    Course
      .find()
      .where({
        owner: req.user.id
      })
      .populate('authors')
      .then(courses => {
        courses = courses.map(populateAuthors);

        res.ok({
          items: courses
        })
      })
      .catch(error => res.serverError(error))
  }
};
