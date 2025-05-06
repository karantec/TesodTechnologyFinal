const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "All",
        "Apps",
        "Website",
        "Softwares",
        "Logo",
        "Google ads",
        "InstaAds",
        "Facebook ads",
        "Seo",
        "Other digital marketing services",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Work", workSchema);
