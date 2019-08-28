const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  course_code: {
    type: String,
    required: true
  },
  students: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "students",
        required: true
      }
    }
  ],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "staff"
  },
  semester: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

module.exports = Classes = mongoose.model("classes", ClassSchema);
