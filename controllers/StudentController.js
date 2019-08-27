const { validationResult } = require("express-validator");
const Student = require("../models/Students");
const Staff = require("../models/Staff");
const Permission = require("../models/Permissions");
const config = require("config");
const bcrypt = require("bcrypt");
const { CheckStaffPermissions } = require("./PermissionController");

const createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const staff = await Staff.findById(req.staff.id).select("-password");
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    const newStudent = {
      created_by: staff.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      middlename: req.body.middlename,
      email: req.body.email
    };

    const salt = await bcrypt.genSalt(10);
    newStudent.password = await bcrypt.hash(req.body.lastname, salt);
    const student = new Student(newStudent);
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getAllStudents = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });
    const students = await Student.find({ deleted: false })
      .sort({ created_date: -1 })
      .populate("created_by", ["name"]);

    if (!students) return res.status(400).json({ msg: "no Students found" });

    res.status(200).json(students);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getStudentById = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    const student = await Student.findById(req.params.id).populate("created_by", [
      "name"
    ]);

    if (!student || student.deleted)
      return res.status(400).json({ msg: "No Student found" });

    res.status(200).json(student);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const viewMyProfile_Student = async (req, res) => {
  try {
    //verify staff
    const student = await Student.findById(req.student.id).populate("created_by", [
      "name"
    ]);
    if (!student || student.deleted)
      return res.status(400).json({ msg: "No Student found" });

    res.status(200).json(student);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const viewMyProfile_Staff = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id).populate("created_by", [
      "name"
    ]);
    if (!staff || staff.deleted)
      return res.status(400).json({ msg: "No Staff found" });

    res.status(200).json(staff);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const updateStudentWithId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("studentUpdatePermission")
    );
    console.log("permission", haspermission);
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to edit students" });
    }
    const student = await Student.findById(req.params.id);
    if (!student || student.deleted)
      return res.status(400).json({ msg: "No Student found" });

    const { firstname, lastname, middlename, email } = req.body;
    if (firstname) student.firstname = firstname;
    if (lastname) student.lastname = lastname;
    if (middlename) student.middlename = middlename;
    if (email) student.email = email;

    student.updated_at = Date.now();
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const deleteStudentWithId = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    //verify the bucketlist
    const student = await Student.findById(req.params.id);
    if (!student || student.deleted)
      return res.status(400).json({ msg: "No Student found" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("studentDeletePermission")
    );
    console.log("permission", haspermission);
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to delete students" });
    }
    student.deleted = true;
    student.deleted_by = staff.id;
    await student.save();
    res.status(200).send("Student deleted successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentWithId,
  deleteStudentWithId,
  viewMyProfile_Student,
  viewMyProfile_Staff
};
