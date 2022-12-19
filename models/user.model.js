import { model, Schema } from "mongoose";
import validator from "validator";

//user model for database
const userSchema = new Schema({
  firstName: { type: String, required: [true, "First Name is required"] },
  lastName: { type: String, required: [true, "Last Name is required"] },
  mobile: { type: Number, required: [true, "Mobile number is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: (value) => {
      if (
        !validator.isStrongPassword(value, {
          returnScore: false,
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        throw new Error(
          "Password must contain atleast 1 uppercase, 1 lowercase, 1 symbol and must be atleast 8 characters long"
        );
      }
    },
  },
  hno: { type: String, required: [true, "Hno. is required"] },
  area: { type: String, required: [true, "Area is required"] },
  city: { type: String, required: [true, "City is required"] },
  state: { type: String, required: [true, "State is required"] },
  country: { type: String, required: [true, "Country is required"] },
  pincode: { type: String, required: [true, "Pincode is required"] },
});

const user = model("user", userSchema);
export default user;
