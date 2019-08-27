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

    const allClasses = await Class.find({teacher: staff.id}).populate("teacher", ["name"]);

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

    if (!fetchedClass)
      return res.status(400).json({ msg: "No Staff found" });

    res.status(200).json(fetchedClass);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Staff not found" });
    }
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const updateStaffWithId = async (req, res) => {
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
      config.get("staffEditPermission")
    );
    console.log("permission", haspermission);
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to edit staff" });
    }
    const fetchStaff = await Staff.findById(req.params.id);
    if (!fetchStaff || fetchStaff.deleted)
      return res.status(400).json({ msg: "No staff found" });

    const { firstname, lastname, middlename, email, role, password } = req.body;
    if (firstname) fetchStaff.firstname = firstname;
    if (lastname) fetchStaff.lastname = lastname;
    if (middlename) fetchStaff.middlename = middlename;
    if (email) fetchStaff.email = email;
    if (role) fetchStaff.role = role;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      fetchStaff.password = await bcrypt.hash(password, salt);
    } // some more logic has to go into this.

    fetchStaff.updated_at = Date.now();
    await fetchStaff.save();

    res.status(200).json(fetchStaff);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const deleteStaffWithId = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    //verify the staff
    const staffToBeDeleted = await Staff.findById(req.params.id);
    if (!staffToBeDeleted || staffToBeDeleted.deleted)
      return res.status(400).json({ msg: "No Student found" });

    var haspermission = CheckStaffPermissions(
      staff,
      config.get("staffDeletePermission")
    );
    console.log("permission", haspermission);
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to delete staff" });
    }
    staffToBeDeleted.deleted = true;
    staffToBeDeleted.deleted_by = staff.id;
    await staffToBeDeleted.save();
    res.status(200).send("Staff deleted successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaffWithId,
  deleteStaffWithId
};
