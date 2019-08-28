const { validationResult } = require("express-validator");
const Student = require("../models/Students");
const Staff = require("../models/Staff");
const Permission = require("../models/Permissions");
const config = require("config");
const bcrypt = require("bcrypt");
const { CheckStaffPermissions } = require("./PermissionController");

const createStaff = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const staff = await Staff.findById(req.staff.id).select("-password");
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = await CheckStaffPermissions(
      staff,
      config.get("permissions.createstaff")
    );
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to create staff" });
    }

    const oldStaff = await Staff.findOne({ email: req.body.email });
    if (oldStaff && oldStaff.email) {
      return res.status(400).json({ msg: "staff already exists" });
    }

    const newStaff = {
      created_by: staff.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      middlename: req.body.middlename,
      email: req.body.email,
      role: req.body.role
    };

    const salt = await bcrypt.genSalt(10);
    newStaff.password = await bcrypt.hash(req.body.lastname, salt);

    const staffObj = new Staff(newStaff);
    await staffObj.save();

    res.status(200).json(staffObj);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getAllStaff = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = await CheckStaffPermissions(
      staff,
      config.get("permissions.getallstaff")
    );
    console.log("permission", haspermission);
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to get all staff" });
    }

    const allStaff = await Staff.find({ deleted: false })
      .sort({ created_at: -1 })
      .populate("created_by", ["name"]);

    if (!allStaff) return res.status(400).json({ msg: "no Staff found" });

    res.status(200).json(allStaff);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getStaffById = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = await CheckStaffPermissions(
      staff,
      config.get("permissions.getstaff")
    );
    console.log("permission", haspermission);
    //verify the student
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to get staff" });
    }

    const fetchedStaff = await Staff.findById(req.params.id).populate(
      "created_by",
      ["name"]
    );

    if (!fetchedStaff || fetchedStaff.deleted)
      return res.status(400).json({ msg: "No Staff found" });

    res.status(200).json(fetchedStaff);
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

    var haspermission = await CheckStaffPermissions(
      staff,
      config.get("permissions.updatestaff")
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

    var haspermission = await CheckStaffPermissions(
      staff,
      config.get("permissions.deletestaff")
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
