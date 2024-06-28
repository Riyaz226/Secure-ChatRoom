import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	fullName: {
	  type: String,
	  required: true,
	  unique: true, 
	},
	phoneNumber: {
	  type: String,
	  required: true,
	},
	password: {
	  type: mongoose.Schema.Types.Mixed, 
	  required: true,
	  validate: {
		validator: function(v) {
		  const password = v.toString();
		  return password.length >= 6;
		},
		message: props => `${props.value} is shorter than the minimum allowed length (6)!`
	  }
	},
	gender: {
	  type: String,
	  required: true,
	},
	profilePic: {
	  type: String,
	  required: true,
	}
  });
  
const User = mongoose.model("User", userSchema);

export default User;