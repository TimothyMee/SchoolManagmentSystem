const express = require("express");
const { check } = require("express-validator");
var router = express.Router();
const auth = require("../../middleware/auth");
const { login } = require("../../controllers/AuthController");
const bcrypt = require("bcrypt");
const config = require("config");

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
 * @api {post} /api/v1.0/auth/login Logs in a User (Staff, Student)
 * @apiVersion 1.0.0
 * @apiName Log User in
 * @apiGroup Auth
 * @apiPermission no authentication
 *
 * @apiParam (Request body) {Email} email The Student's email
 * @apiParam (Request body) {String} role The Student's role
 * @apiParam (Request body) {Password} password The Student's password
 *
 * @apiExample {js} Example usage:
 * const data = {
 *   "email": "Timothy@gmail.com"
 *    "role": "Teacher"
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
 *    HTTP/1.1 400 Invalid Email / Password
 */
router.post(
  "/auth/login",
  [
    check("email", "Please use a valid email").isEmail(),
    check("password")
      .not()
      .isEmpty(),
    check("role")
      .not()
      .isEmpty()
  ],
  login
);

/**
 * @api {post} /api/v1.0/student Create a Student
 * @apiVersion 1.0.0
 * @apiName Create Student
 * @apiGroup Student
 * @apiPermission authenticated staff with CREATE_STUDENT permission
 *
 * @apiParam (Request body) {String} firstname The Student's firstname
 * @apiParam (Request body) {String} lastname The Student's lastname
 * @apiParam (Request body) {String} middlename The Student's middlename
 * @apiParam (Request body) {Email} email The Student's email
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * const data = {
 *   "firstname": "Timothy",
 *   "middlename": "Mee",
 *   "lastname": "Doe",
 *   "email": "Timothy@gmail.com"
 * }
 *
 * $http.post(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {String} Student Newly created Student!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *       {
 *          "firstname": "Timothy",
 *          "middlename": "Mee",
 *          "lastname" : "Doe",
 *          "email" : "Timothy@gmail.com",
 *          "password" : hashed(Doe),
 *          "role" : "STUDENT"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        },
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 staff not found
 *    HTTP/1.1 400 student already exists
 *    HTTP/1.1 401 You don't have the permission to create students
 *    HTTP/1.1 401 unauthorized user token
 */
router.post(
  "/student",
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

/**
 * @api {get} /api/v1.0/student Get all Student's
 * @apiVersion 1.0.0
 * @apiName Fetch Students
 * @apiGroup Student
 * @apiPermission authenticated staff
 *
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Array} Students Array of Students!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     [{
 *          "firstname": "Timothy",
 *          "middlename": "Mee",
 *          "lastname" : "Doe",
 *          "email" : "Timothy@gmail.com",
 *          "role" : "STUDENT"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        }]
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 400 no student found
 *    HTTP/1.1 400 no staff found (authenticated staff)
 */
router.get("/student", auth, getAllStudents);

/**
 * @api {get} /api/v1.0/student/:id Get a Student's
 * @apiVersion 1.0.0
 * @apiName Fetch Student
 * @apiGroup Student
 * @apiPermission authenticated staff
 *
 * @apiParam {id} id The student's id
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Array} Students Array of Students!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "firstname": "Timothy",
 *          "middlename": "Mee",
 *          "lastname" : "Doe",
 *          "email" : "Timothy@gmail.com",
 *          "role" : "STUDENT"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 400 no student found
 *    HTTP/1.1 400 no staff found (authenticated staff)
 */
router.get("/student/:id", auth, getStudentById);

/**
 * @api {put} /api/v1.0/student/:id Update a Student's profile
 * @apiVersion 1.0.0
 * @apiName Update Student
 * @apiGroup Student
 * @apiPermission authenticated staff with UPDATE_STUDENT permission
 *
 * @apiParam {id} id The student's id
 * @apiParam (Request body) {firstname} id The student's id
 * @apiParam (Request body) {lastname} id The student's id
 * @apiParam (Request body) {midddlename} id The student's id
 * @apiParam (Request body) {email} id The student's id
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * //the following fields can be updated (firstname, lastname, middlename, email);
 * const data = {
 *    firstname : "timothymee"
 * }
 *
 * $http.put(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Students Object of Update Student!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "firstname": "timothymee",
 *          "middlename": "Mee",
 *          "lastname" : "Doe",
 *          "email" : "Timothy@gmail.com",
 *          "role" : "STUDENT"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't permission to edit students
 *    HTTP/1.1 400 no student found
 */
router.put("/student/:id", auth, updateStudentWithId);

/**
 * @api {get} /api/v1.0/staff/myprofile Get a LoggedIn Student Profile
 * @apiVersion 1.0.0
 * @apiName Fetch Student
 * @apiGroup Student
 * @apiPermission authenticated Student
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Students Object of Staff Profile!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "firstname": "Timothy",
 *          "middlename": "Mee",
 *          "lastname" : "Doe",
 *          "email" : "Timothy@gmail.com",
 *          "role" : "STUDENT"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 no staff found (authenticated staff)
 */
router.get("/student/myprofile", auth, viewMyProfile_Student);

/**
 * @api {get} /api/v1.0/staff/myprofile Get a LoggedIn Staff Profile
 * @apiVersion 1.0.0
 * @apiName Fetch Staff
 * @apiGroup Staff
 * @apiPermission authenticated staff
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Students Object of Staff Profile!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "firstname": "TimothyStaff",
 *          "middlename": "MeeStaff",
 *          "lastname" : "DoeStaff",
 *          "email" : "Timothymee@gmail.com",
 *          "role" : "PRINCIPAL"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 no staff found (authenticated staff)
 */
router.get("/staff/myprofile", auth, viewMyProfile_Staff);

/**
 * @api {delete} /api/v1.0/student/:id Delete a Student's profile (soft-deletes)
 * @apiVersion 1.0.0
 * @apiName Delete Student
 * @apiGroup Student
 * @apiPermission authenticated staff with DELETE_STUDENT permission
 *
 * @apiParam {id} id The student's id
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.delete(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {String} msg Student deleted successfully!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     { "Student deleted  successfully" }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't permission to delete students
 *    HTTP/1.1 400 no student found
 */
router.delete("/student/:id", auth, deleteStudentWithId);

/**
 * @api {post} /api/v1.0/staff Create a Staff
 * @apiVersion 1.0.0
 * @apiName Create Staff
 * @apiGroup Staff
 * @apiPermission authenticated staff with CREATE_STAFF permission
 *
 * @apiParam (Request body) {String} firstname The Staff's firstname
 * @apiParam (Request body) {String} lastname The Staff's lastname
 * @apiParam (Request body) {String} middlename The Staff's middlename
 * @apiParam (Request body) {Email} email The Staff's email
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * const data = {
 *   "firstname": "John",
 *   "middlename": "Franker",
 *   "lastname": "numb",
 *   "email": "John@gmail.com"
 * }
 *
 * $http.post(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Staff newly created staff!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *      {
 *          "firstname": "John",
 *          "middlename": "Franker",
 *          "lastname" : "numb",
 *          "email" : "john@gmail.com",
 *          "password" : hashed(numb),
 *          "role" : "TEACHER"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        },
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 staff not found
 *    HTTP/1.1 400 staff already exists
 *    HTTP/1.1 401 You don't have the permission to create staff
 *    HTTP/1.1 401 unauthorized user token
 */
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

/**
 * @api {get} /api/v1.0/staff Get all Staff
 * @apiVersion 1.0.0
 * @apiName Fetch Staff
 * @apiGroup Staff
 * @apiPermission authenticated staff with GET_ALL_STAFF permission
 *
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Array} Staff Array of Staff!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     [{
 *          "firstname": "John",
 *          "middlename": "Franker",
 *          "lastname" : " numb",
 *          "email" : "john@gmail.com",
 *          "role" : "TEACHER"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        }]
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't permission to get staff
 *    HTTP/1.1 400 no staff found (authenticated staff)
 */
router.get("/staff", auth, getAllStaff);

/**
 * @api {get} /api/v1.0/staff/id Get all Staff
 * @apiVersion 1.0.0
 * @apiName Fetch Staff
 * @apiGroup Staff
 * @apiPermission authenticated staff with GET_STAFF permission
 *
 * @apiParam {id} id The staff's id
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Staff staff detais json!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "firstname": "John",
 *          "middlename": "Franker",
 *          "lastname" : " numb",
 *          "email" : "john@gmail.com",
 *          "role" : "TEACHER"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't permission to get staff
 *    HTTP/1.1 400 no staff found (authenticated staff)
 */
router.get("/staff/:id", auth, getStaffById);

/**
 * @api {put} /api/v1.0/staff/:id Update a Staff's profile
 * @apiVersion 1.0.0
 * @apiName Update Staff
 * @apiGroup Staff
 * @apiPermission authenticated staff with UPDATE_STAFF permission
 *
 * @apiParam {id} id The staff's id
 * @apiParam (Request body) {firstname} id The staff's id
 * @apiParam (Request body) {lastname} id The staff's id
 * @apiParam (Request body) {midddlename} id The staff's id
 * @apiParam (Request body) {email} id The staff's id
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * //the following fields can be updated (firstname, lastname, middlename, email);
 * const data = {
 *    firstname : "timothymee"
 * }
 *
 * $http.put(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Staff Object of Update Staff!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "firstname": "timothymee",
 *          "middlename": "franker",
 *          "lastname" : "numb",
 *          "email" : "john@gmail.com",
 *          "role" : "TEACHER"
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *          "deleted": false
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't permission to edit staff
 *    HTTP/1.1 400 no staff found
 */
router.put("/staff/:id", auth, updateStaffWithId);

/**
 * @api {delete} /api/v1.0/staff/:id Delete a staff's profile (soft-deletes)
 * @apiVersion 1.0.0
 * @apiName Delete staff
 * @apiGroup staff
 * @apiPermission authenticated staff
 *
 * @apiParam {id} id The staff's id
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.delete(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {String} msg staff deleted successfully!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      { "staff deleted  successfully" }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't permission to delete staff
 *    HTTP/1.1 400 no staff found
 */
router.delete("/staff/:id", auth, deleteStaffWithId);

/**
 * @api {post} /api/v1.0/permission Create/Add Permission
 * @apiVersion 1.0.0
 * @apiName Create Permission
 * @apiGroup Permission
 * @apiPermission authenticated staff with CREATE_PERMISSION permission
 *
 * @apiParam (Request body) {String} role The Staff's role
 * @apiParam (Request body) {String} permission The permission to be added
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * const data = {
 *   "role": "PRINCIPAL",
 *   "permission": "CREATE_STUDENT"
 * }
 *
 * $http.post(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Permission newly added permission!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *       {
 *          "role": "PRINCIPAL",
 *          "permissions": "[{
 *              id : "5d661d5ed5d661d5edcd"
 *              permission: "CREATE_STUDENT"
 *          }]",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        },
 *     }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 staff not found
 *    HTTP/1.1 400 you already have the permission set up for this role
 *    HTTP/1.1 401 You don't have the permission to create permission
 *    HTTP/1.1 401 unauthorized user token
 */
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

/**
 * @api {get} /api/v1.0/permission Get all Permission
 * @apiVersion 1.0.0
 * @apiName Fetch Permission
 * @apiGroup Permission
 * @apiPermission authenticated staff with GET_ALL_PERMISSION permission
 *
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Permission permission details json!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "role": "PRINCIPAL",
 *           "permissions": "[{
 *              id : "5d661d5ed5d661d5edcd"
 *              permission: "CREATE_STUDENT"
 *          }]",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't have the permission to get all permission
 *    HTTP/1.1 400 no Permission found
 *    HTTP/1.1 400 no staff found (authenticated staff)
 */
router.get("/permission", auth, getPermissions);

/**
 * @api {get} /api/v1.0/permission/:role Get Role Permission
 * @apiVersion 1.0.0
 * @apiName Fetch Permission
 * @apiGroup Permission
 * @apiPermission authenticated staff with GET_PERMISSION permission
 *
 * @apiParam {role} role The Staff's role
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Permission permission details json!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      {
 *          "role": "PRINCIPAL",
 *           "permissions": "[{
 *              id : "5d661d5ed5d661d5edcd"
 *              permission: "CREATE_STUDENT"
 *          }]",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't have the permission to get a permission
 *    HTTP/1.1 400 no Permission found
 *    HTTP/1.1 400 no staff found (authenticated staff)
 */
router.get("/permission/:role", auth, getPermissionsByRole);

/**
 * @api {delete} /api/v1.0/permission/:role/:type Remove Role Permission
 * @apiVersion 1.0.0
 * @apiName Remove Permission
 * @apiGroup Permission
 * @apiPermission authenticated staff with REMOVE_PERMISSION permission
 *
 * @apiParam {role} role The Staff's role
 * @apiParam {type} type The Permission type
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.delete(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Permission updated permission details json!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      {
 *          "role": "PRINCIPAL",
 *           "permissions": "[]",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't have the permission to remove permission
 *    HTTP/1.1 400 no Permission found
 *    HTTP/1.1 400 no staff found (authenticated staff)
 */
router.delete("/permission/:role/:type", auth, removePermissionInRole);

/**
 * @api {post} /api/v1.0/class Create Class
 * @apiVersion 1.0.0
 * @apiName Create Class
 * @apiGroup Class
 * @apiPermission authenticated staff with CREATE_CLASS permission
 *
 * @apiParam (Request body) {String} title The Class's title
 * @apiParam (Request body) {String} course_code The Class's course_code.
 * @apiParam (Request body) {String} semester The Class's  semeter.
 * @apiParam (Request body) {String} year The Class's  year.
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * const data = {
 *   "title": "English",
 *   "course_code": "ENG101",
 *   "semester": "First",
 *   "year": "2018",
 * }
 *
 * $http.post(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Class newly created class!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "title": "English",
 *          "course_code": "ENG101"
 *          "students": "[]",
 *          "semester": "First",
 *          "year" : "2018",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        },
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 staff not found
 *    HTTP/1.1 401 You don't have the permission to create classes
 *    HTTP/1.1 401 unauthorized user token
 */
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

/**
 * @api {get} /api/v1.0/class Get all Classes
 * @apiVersion 1.0.0
 * @apiName Fetch Classes
 * @apiGroup Class
 * @apiPermission authenticated staff with GET_ALL_CLASSES permission
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Array} Class Array of Classes!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      [{
 *          "title": "English",
 *          "course_code": "ENG101"
 *          "students": "[]",
 *          "semester": "First",
 *          "year" : "2018",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        }]
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 staff not found
 *    HTTP/1.1 401 You don't have the permission to get classes
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 400 no Classes found
 *
 */
router.get("/class", auth, getAllClasses);

/**
 * @api {get} /api/v1.0/class Get my Classes
 * @apiVersion 1.0.0
 * @apiName Fetch Authenticated Staff Classes
 * @apiGroup Class
 * @apiPermission authenticated staff with GET_MY_CLASSES permission
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Array} Class Array of Classes!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      [{
 *          "title": "English",
 *          "course_code": "ENG101"
 *          "students": "[]",
 *          "teacher" : "5d65f85b1c9d440055d65f85b1c9d44005"
 *          "semester": "First",
 *          "year" : "2018",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        }],
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 staff not found
 *    HTTP/1.1 401 You don't have the permission to get classes
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 400 no Classes found
 *
 */
router.get("/class/myClasses", auth, getMyClasses);
/**
 * @api {get} /api/v1.0/class/:id Get a Classes
 * @apiVersion 1.0.0
 * @apiName Fetch Class
 * @apiGroup Class
 * @apiPermission authenticated staff with GET_CLASS permission
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * $http.get(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Class object of class found!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      {
 *          "title": "English",
 *          "course_code": "ENG101"
 *          "students": "[]",
 *          "semester": "First",
 *          "year" : "2018",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        },
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 400 staff not found
 *    HTTP/1.1 401 You don't have the permission to get classes
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 400 no Classes found
 *
 */
router.get("/class/:id", auth, getClassById);

/**
 * @api {put} /api/v1.0/class/:id Update a Class
 * @apiVersion 1.0.0
 * @apiName Update Class (add teacher, change title, course_code)
 * @apiGroup Class
 * @apiPermission authenticated staff With UPDATE_CLASS permissions
 *
 * @apiParam {id} id The class's id
 * @apiParam (Request body) {title} The class's title
 * @apiParam (Request body) {course_code} The class's course_code
 * @apiParam (Request body) {semester} The class's semester
 * @apiParam (Request body) {year} The class's year
 * @apiParam (Request body) {teacher} The class's teacher
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * //the following fields can be updated (teacher, title, course_code, semester, year);
 * const data = {
 *    teacher : "5d65f85b1c9d44005d65f85b1c9d4400"
 * }
 *
 * $http.put(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Class Object of Update Class!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "title": "English",
 *          "course_code": "ENG101"
 *          "students": "[]",
 *          "semester": "First",
 *          "teacher": "5d65f85b1c9d44005d65f85b1c9d4400",
 *          "year" : "2018",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't permission to edit class
 *    HTTP/1.1 400 staff not found
 *    HTTP/1.1 400 no Classes found
 */
router.put("/class/:id", auth, updateClassWithId);

/**
 * @api {delete} /api/v1.0/class/:class_id/:student_id deletes a student from a Class
 * @apiVersion 1.0.0
 * @apiName Delete Student from class
 * @apiGroup Class
 * @apiPermission authenticated staff With DELETE_STUDENT_FROM_CLASS permissions
 *
 * @apiParam {class_id} id The class's id
 * @apiParam {student_id} id The class's student id
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 *
 * $http.delete(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Class Object of Update Class!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "title": "English",
 *          "course_code": "ENG101"
 *          "students": "[]",
 *          "semester": "First",
 *          "teacher": "5d65f85b1c9d44005d65f85b1c9d4400",
 *          "year" : "2018",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 401 you don't permission to edit class
 *    HTTP/1.1 400 staff not found
 *    HTTP/1.1 400 no Classes found
 */
router.delete("/class/:class_id/:student_id", auth, removeStudentFromClass);

/**
 * @api {post} /api/v1.0/class/:class_id/add Add Student to Class
 * @apiVersion 1.0.0
 * @apiName Add Student to class
 * @apiGroup Class
 * @apiPermission authenticated staff with ADD_STUDENT_TO_CLASS permission
 *
 * @apiParam (Request body) {String} student The student id
 * @apiParam {class_id} class The class id
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 * const data = {
 *   "student": "5d65f85b1c9d44005d65f85b1c9d4400",
 * }
 *
 * $http.post(url, config, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Class class with newly added student!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *       {
 *          "title": "English",
 *          "course_code": "ENG101"
 *          "students": "[{
 *              "student" : "5d65f85b1c9d44005d65f85b1c9d4400"
 *          }]",
 *          "semester": "First",
 *          "year" : "2018",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        },
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 You don't have the permission to add student
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 400 student is already registered
 *    HTTP/1.1 400 no student found
 *    HTTP/1.1 400 Student can't enroll in more than 6 courses
 */
router.post(
  "/class/:class_id/add",
  [auth, check("student", "Student is required")],
  addStudentToClass
);

/**
 * @api {put} /api/v1.0/class/:class_id/add Add Student to Class
 * @apiVersion 1.0.0
 * @apiName Add Student to class
 * @apiGroup Class
 * @apiPermission authenticated staff with ADD_STUDENT_TO_CLASS permission
 *
 * @apiParam (Request body) {String} student The student id
 * @apiParam {class_id} class The class id
 *
 * @apiExample {js} Example usage:
 *
 * const config = {
 *  "x-auth-token" : "authenticated staff token"
 * }
 *
 *
 * $http.put(url, config)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Class class with newly added student!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *       {
 *          "title": "English",
 *          "course_code": "ENG101"
 *          "students": "[{
 *              "student" : "5d65f85b1c9d44005d65f85b1c9d4400"
 *          }]",
 *          "semester": "First",
 *          "year" : "2018",
 *          "created_at": "2019-08-28T04:23:28.886+00:00",
 *          "created_by": "5d65f85b1c9d44005d65f85b1c9d4400"
 *        },
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 401 You don't have the permission to add student
 *    HTTP/1.1 401 unauthorized user token
 *    HTTP/1.1 400 student is already registered
 *    HTTP/1.1 400 no student found
 *    HTTP/1.1 400 Student can't enroll in more than 6 courses
 */
router.put("/class/:class_id/add", auth, addMyselfToClass);

/**
 * @api {get} /api/v1.0/roles/ Get all roles
 * @apiVersion 1.0.0
 * @apiName Fetch Roles
 * @apiGroup Roles
 * @apiPermission no authentication required
 *
 * @apiExample {js} Example usage:
 *
 *
 * $http.get(url)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Class roles found!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      "roles": {
 *         "student": "STUDENT",
 *          "principal": "PRINCIPAL",
 *          "admin": "ADMIN",
 *          "teacher": "TEACHER"
 *          "finance": "FINANCE",
 *          "management": "MANAGEMENT",
 *          "general": "GENERAL",
 *          "contractor": "CONTRACTOR"
 *        },
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 204 no roles found
 *
 */
router.get("/roles", (req, res) => {
  try {
    const roles = config.get("roles");
    if (Object.keys(roles).length === 0) {
      return res.status(204).json({ msg: "No roles found" });
    }
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

/**
 * @api {get} /api/v1.0/permissions-available/ Get all permissons available
 * @apiVersion 1.0.0
 * @apiName Fetch Permissions
 * @apiGroup Permission
 * @apiPermission no authentication required
 *
 * @apiExample {js} Example usage:
 *
 *
 * $http.get(url)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 200) {Object} Class permissions found!
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      "permissions": {
 *         "createstudent": "CREATE_STUDENT",
 *         "createpermission": "CREATE_PERMISSION",
 *         "updatestudent": "UPDATE_STUDENT",
 *         "deletestudent": "DELETE_STUDENT",
 *         "createstaff": "CREATE_STAFF",
 *         "getallstaff": "GET_ALL_STAFF",
 *         "getstaff": "GET_STAFF",
 *         "updatestaff": "UPDATE_STAFF",
 *         "deletestaff": "DELETE_STAFF",
 *         "getallpermission": "GET_ALL_PERMISSION",
 *         "getpermission": "GET_PERMISSION",
 *         "removepermission": "REMOVE_PERMISSION",
 *         "createclasses": "CREATE_CLASSES",
 *         "getallclasses": "GET_ALL_CLASSES",
 *         "getclass": "GET_CLASS",
 *         "updateclasses": "UPDATE_CLASSES",
 *         "getmyclasses": "GET_MY_CLASSES",
 *         "addstudenttoclass": "ADD_STUDENT_TO_CLASS"
 *       }
 *
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Server Error
 *    HTTP/1.1 204 no roles found
 *
 */
router.get("/permissions-available", (req, res) => {
  try {
    const roles = config.get("permissions");
    if (Object.keys(roles).length === 0) {
      return res.status(204).json({ msg: "No permissions found" });
    }
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
