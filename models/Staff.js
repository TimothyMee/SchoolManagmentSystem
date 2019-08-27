const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
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

module.exports = Staff = mongoose.model("staff", StaffSchema);
