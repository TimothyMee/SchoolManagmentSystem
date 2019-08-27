const express = require("express");
const { check } = require("express-validator");
var router = express.Router();

/**
 * @api {post} /api/v1.0/student/register Create a Student
 * @apiVersion 1.0.0
 * @apiName Create Student
 * @apiGroup Student
 * @apiPermission authenticated staff
 *
 * @apiParam (Request body) {String} firstname The Student's firstname
 * @apiParam (Request body) {String} lastname The Student's lastname
 * @apiParam (Request body) {String} middlename The Student's middlename
 * @apiParam (Request body) {Email} email The Student's email
 * @apiParam (Request body) {Password} password The Student's password
 *
 * @apiExample {js} Example usage:
 * const data = {
 *   "firstname": "Timothy"
 *   "middlename": "Mee"
 *   "lastname": "Doe"
 *   "email": "Timothy@gmail.com"
 *   "password": "password"
 * }
 *
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {String} token User token!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      "token": "57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a",
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 User already exists
 */
router.post(
  "/student/register",
  [
    check("firstname", "FirstName is required")
      .not()
      .isEmpty(),
    check("lastname", "LastName is required")
      .not()
      .isEmpty(),
    check("middlename", "MiddleName is required")
      .not()
      .isEmpty(),
    check("email", "Please use a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  registerUser => {}
);
module.exports = router;
