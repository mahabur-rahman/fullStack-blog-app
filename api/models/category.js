const mongoose = require("mongoose");

// category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// create a collection | model
const Category = mongoose.model("Category", categorySchema);

// export
module.exports = Category;
