const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("config");
const StudentRole = config.get("roles.student");

const StudentSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  middlename: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: StudentRole,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "staff"
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleted_by: {
    type: Schema.Types.ObjectId,
    ref: "staff"
  }
});

module.exports = Students = mongoose.model("students", StudentSchema);
