const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name:{type:String, default:"add your name"},
    bio:{type:String, default:"Add Your Bio"},
    role:{type:String , default:"Add Your role"},
    about:{type:String, default:"About section"},
    profilePicture :{type: String , default:" "},
    following:[{type:mongoose.Schema.Types.ObjectId}],
    followers:[{type:mongoose.Schema.Types.ObjectId}]

  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
