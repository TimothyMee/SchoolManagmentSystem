const { validationResult } = require("express-validator");
const Permission = require("../models/Permissions");
const Staff = require("../models/Staff");
const config = require("config");
const bcrypt = require("bcrypt");

const addPermissionToRole = async (req, res) => {
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
      config.get("permissions.createpermission")
    );

    if (!haspermission && req.body.role !== config.get("roles.principal")) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to create Permissions" });
    }

    const role = req.body.role;
    const newPermission = req.body.permission;
    const permission = await Permission.findOne({ role: role });
    if (permission && permission.role) {
      const permissions = permission.permissions;
      const check = permissions.filter(x => x.permission === newPermission);
      if (check.length !== 0) {
        return res.status(400).json({
          msg: "You already have the permission set up for this role"
        });
      }
      permission.permissions.unshift({ permission: newPermission });
      await permission.save();
      return res.status(200).json(permission);
    }

    const newPermissionRole = new Permission({
      role: role,
      permissions: [{ permission: newPermission }],
      created_by: req.staff.id
    });

    await newPermissionRole.save();
    res.status(200).json(newPermissionRole);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getPermissions = async (req, res) => {
  try {
    //verify Staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = await CheckStaffPermissions(
      staff,
      config.get("permissions.getallpermission")
    );
    //check the permission
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to get all Permissions" });
    }

    const allPermissions = await Permission.find().populate("created_by", [
      "name"
    ]);

    if (!allPermissions)
      return res.status(400).json({ msg: "no Permissions found" });

    res.status(200).json(allPermissions);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "staff not found" });
    }
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getPermissionsByRole = async (req, res) => {
  try {
    //verify Staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    var haspermission = await CheckStaffPermissions(
      staff,
      config.get("permissions.getpermission")
    );
    //check the permission
    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to get permission" });
    }

    const permission = await Permission.find({
      role: req.params.role
    }).populate("created_by", ["name"]);

    if (!permission || permission.permissions)
      return res.status(400).json({ msg: "No Permission found" });

    res.status(200).json(permission);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Staff not found" });
    }
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const removePermissionInRole = async (req, res) => {
  try {
    //verify staff
    const staff = await Staff.findById(req.staff.id);
    if (!staff || staff.deleted)
      return res.status(401).json({ msg: "unauthorized user token" });

    //check the permission
    const permission = await Permission.find({
      role: req.params.role
    }).populate("created_by", ["name"]);
    if (!permission || permission.permissions)
      return res.status(400).json({ msg: "No Permission found" });

    var haspermission = await CheckStaffPermissions(
      staff,
      config.get("permissions.removepermission")
    );

    if (!haspermission) {
      return res
        .status(401)
        .json({ msg: "You don't have the permission to remove permissions" });
    }

    const permissions = permission.permissions;
    let deleteIndex = permissions.map(e => e.type).indexOf(req.params.type);
    permission.permissions.splice(deleteIndex, 1);

    await permission.save();

    res.status(200).send("Permission deleted successfully");
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const CheckStaffPermissions = async (staff, action) => {
  const role = staff.role;
  const permissionGroup = await Permission.findOne({ role: role });
  if (!permissionGroup.permissions) {
    return false;
  }
  const permissions = permissionGroup.permissions;
  var permission = permissions.filter(e => e.permission === action);
  if (permission.length > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  addPermissionToRole,
  getPermissions,
  getPermissionsByRole,
  removePermissionInRole,
  CheckStaffPermissions
};
