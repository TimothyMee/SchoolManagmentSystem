const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PermissionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  permissions: [
    {
      permission: {
        type: String
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "staff"
  }
});

module.exports = Permissions = mongoose.model("permissions", PermissionSchema);
