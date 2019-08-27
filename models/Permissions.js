const mongoose = require("mongoose");
const PermissionSchema = new mongoose.Schema({
  Role: {
    type: String,
    required: true
  },
  Permissions: [
    {
      permisson: {
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
