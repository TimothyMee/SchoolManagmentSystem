const { validationResult } = require("express-validator");
const Student = require("../models/Students");
const Staff = require("../models/Staff");
const Permission = require("../models/Permissions");
const Class = require("../models/Classes");
const config = require("config");
const bcrypt = require("bcrypt");
const { CheckStaffPermissions } = require("./PermissionController");

const createClasses = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const staff = await Staff.findById(req.staff.id).select("-password");
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("staffCreateClasses")
    );
    console.log("permission", haspermission);
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to create classes" });
    }

    const newClass = {
      title: req.body.title,
      course_code: req.body.course_code,
      semester: req.body.semester,
      year: req.body.year
    };

    const ClassObj = new Class(newClass);
    await ClassObj.save();

    res.status(200).json(ClassObj);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getAllClasses = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("staffGetAllClasses")
    );
    console.log("permission", haspermission);
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to get all classes" });
    }

    const allClasses = await Class.find().populate("teacher", ["name"]);

    if (!allClasses) return res.status(400).json({ msg: "no Classes found" });

    res.status(200).json(allClasses);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getMyClasses = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("staffMyClasses")
    );
    console.log("permission", haspermission);
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to get all classes" });
    }

    const allClasses = await Class.find({ teacher: staff.id }).populate(
      "teacher",
      ["name"]
    );

    if (!allClasses) return res.status(400).json({ msg: "no Classes found" });

    res.status(200).json(allClasses);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getClassById = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("staffGetAllClasses")
    );
    console.log("permission", haspermission);
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to get staff" });
    }

    const fetchedClass = await Staff.findById(req.params.id).populate(
      "teacher",
      ["name"]
    );

    if (!fetchedClass) return res.status(400).json({ msg: "No Classes found" });

    res.status(200).json(fetchedClass);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Staff not found" });
    }
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const updateClassWithId = async (req, res) => {
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
      config.get("staffUpdateClasses")
    );
    console.log("permission", haspermission);
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to edit class" });
    }
    const fetchClass = await Class.findById(req.params.id);
    if (!fetchClass) return res.status(400).json({ msg: "No class found" });

    //check if staff is teaching less than 3
    const canTeach = checkIfCanStillTeach(
      staff,
      req.body.semester,
      req.body.session
    );
    if (!canTeach) {
      return res
        .status(400)
        .json({ msg: "Staff already teaches three classes" });
    }
    const { title, course_code, teacher, semester, year } = req.body;
    if (title) fetchClass.title = title;
    if (course_code) fetchClass.course_code = course_code;
    if (teacher) fetchClass.teacher = teacher;
    if (semester) fetchClass.semester = semester;
    if (year) fetchClass.year = year;
    await fetchClass.save();

    res.status(200).json(fetchClass);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const removeStudentFromClass = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    //verify the student
    const studentToBeRemoved = await Student.findById(req.params.student_id);
    if (!studentToBeRemoved)
      return res.status(400).json({ msg: "No Student found" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("RemoveStudentFromClass")
    );
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to Remove student" });
    }

    const theClass = Class.findById(req.params.class_id);
    const students = theClass.students;
    let deleteIndex = students
      .map(e => e.student)
      .indexOf(req.params.studentToBeRemoved.id);
    theClass.students.splice(deleteIndex, 1);

    await theClass.save();
    res.status(200).send("Student removed successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const addStudentToClass = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    //verify the student
    const studentToBeAdded = await Student.findById(req.body.student);
    if (!studentToBeAdded)
      return res.status(400).json({ msg: "No Student found" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("AddStudentToClass")
    );
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to Add student" });
    }

    const theClass = Class.findById(req.params.class_id);
    const students = theClass.students;
    let check = students.filter(x => x.student === req.body.student);
    if (check) {
      return res
        .status(400)
        .json({ msg: "This student is already registered" });
    }

    const canEnroll = checkIfCanStillEnroll(
      studentToBeAdded,
      theClass.semester,
      theClass.year
    );
    if (!canEnroll) {
      return res
        .status(400)
        .json({ msg: "Student can't enroll in more than 6 courses" });
    }
    theClass.students.unshift({ student: req.body.student });

    await theClass.save();
    res.status(200).send(theClass);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const addMyselfToClass = async (req, res) => {
  try {
    //verify the student
    const studentToBeAdded = await Student.findById(req.student.id);
    if (!studentToBeAdded)
      return res.status(400).json({ msg: "No Student found" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("AddStudentToClass")
    );
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to Enroll in class" });
    }

    const theClass = Class.findById(req.params.class_id);
    const students = theClass.students;
    let check = students.filter(x => x.student === req.student.id);
    if (check) {
      return res.status(400).json({ msg: "You have already registered" });
    }

    const canEnroll = checkIfCanStillEnroll(
      studentToBeAdded,
      theClass.semester,
      theClass.year
    );
    if (!canEnroll) {
      return res
        .status(400)
        .json({ msg: "You can't enroll in more than 6 classes" });
    }
    theClass.students.unshift({ teacher: req.student.id });

    await theClass.save();
    res.status(200).send(theClass);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};
const checkIfCanStillTeach = (staff, semester, year) => {
  const teaching = Class.find({
    teacher: staff.id,
    semester: semester,
    year: year
  });
  if (teaching.length < 3) {
    return true;
  } else {
    return false;
  }
};

const checkIfCanStillEnroll = (student, semester, year) => {
  const classes = Class.find({
    semester: semester,
    year: year
  });

  let enrolled = 0;
  classes.forEach(item => {
    const students = item.students;
    const check = student.filter(x => x.student == student.id);
    if (check) {
      enrolled++;
    }
  });
  if (enrolled < 6) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  createClasses,
  getAllClasses,
  getMyClasses,
  getClassById,
  updateClassWithId,
  removeStudentFromClass,
  addStudentToClass,
  addMyselfToClass
};
