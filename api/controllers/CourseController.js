/**
 * CourseController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create(req, res) {
		Course
		.create(Object.assign({}, req.body, {owner:req.user.id}))
		.then(course=>res.created(course));
  },

  destroy(req, res) {
		console.log(req.allParams().id)
  },

  update(req, res) {
		Course
			.update({id:req.course.id}, req.course)
			.then(()=>res.ok(req.course));
  },

  get(req, res) {
    Course
      .find()
			.where({ owner: req.user.id })
			.then(courses=>res.ok({items:courses}))
  }
};
