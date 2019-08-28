const express = require("express");
const { check } = require("express-validator");
var router = express.Router();
const auth = require("../../middleware/auth");
const { login } = require("../../controllers/AuthController");
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentWithId,
  viewMyProfile_Student,
  viewMyProfile_Staff,
  deleteStudentWithId
} = require("../../controllers/StudentController");

const {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaffWithId,
  deleteStaffWithId
} = require("../../controllers/StaffController");

const {
  addPermissionToRole,
  getPermissions,
  getPermissionsByRole,
  removePermissionInRole
} = require("../../controllers/PermissionController");

const {
  createClasses,
  getAllClasses,
  getMyClasses,
  getClassById,
  updateClassWithId,
  removeStudentFromClass,
  addStudentToClass,
  addMyselfToClass
} = require("../../controllers/ClassesController");

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

router.post(
  "/auth/login",
  [
    check("email", "Please use a valid email").isEmail(),
    check("Password")
      .not()
      .isEmpty()
  ],
  login
);

router.post(
  "/student/create",
  [
    auth,
    check("firstname", "FirstName is required")
      .not()
      .isEmpty(),
    check("lastname", "LastName is required")
      .not()
      .isEmpty(),
    check("middlename", "MiddleName is required")
      .not()
      .isEmpty(),
    check("email", "Please use a valid email").isEmail()
  ],
  createStudent
);

router.get("/student", auth, getAllStudents);
router.get("/student/:id", auth, getStudentById);
router.put("/student/:id", auth, updateStudentWithId);
router.get("/student/myprofile", auth, viewMyProfile_Student);
router.get("/staff/myprofile", auth, viewMyProfile_Staff);
router.delete("/student/:id", auth, deleteStudentWithId);

router.post(
  "/staff",
  [
    auth,
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
    check("role", "Role is Required")
  ],
  createStaff
);

router.get("/staff", auth, getAllStaff);
router.get("/staff/:id", auth, getStaffById);
router.put("/staff/:id", auth, updateStaffWithId);
router.delete("/staff/:id", auth, deleteStaffWithId);

router.post(
  "/permission",
  [
    auth,
    check("role", "Role is required")
      .not()
      .isEmpty(),
    check("permission", "Permission is required")
      .not()
      .isEmpty()
  ],
  addPermissionToRole
);
router.get("/permission", auth, getPermissions);
router.get("/permission/:role", auth, getPermissionsByRole);
router.get("/permission/:role/:type", auth, removePermissionInRole);

router.post(
  "/class",
  [
    auth,
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("course_code", "Course Code is required")
      .not()
      .isEmpty(),
    check("semester", "Semester is required")
      .not()
      .isEmpty(),
    check("year", "Year is required")
      .not()
      .isEmpty()
  ],
  createClasses
);
router.get("/class", auth, getAllClasses);
router.get("/class/myClasses", auth, getMyClasses);
router.get("/class/:id", auth, getClassById);
router.put("/class/:id", auth, updateClassWithId);
router.delete("/class/:class_id/:student_id", auth, removeStudentFromClass);
router.post(
  "/class/add/:class_id",
  [auth, check("student", "Student is required")],
  addStudentToClass
);
router.put("/class/add/:class_id", auth, addMyselfToClass);

module.exports = router;
