import { model, Schema } from "mongoose";
import validator from "validator";
//seller model for database
const sellerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name is Required"],
    minLength: [4, "It should be at least 4 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required"],
    minLength: [4, "It should be at least 4 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
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
  mobile: { type: String, required: [true, "Mobile number is Required"] },
  storeName: {
    type: String,
    required: [true, "Store Name is Required"],
    unique: true,
  },
  shippingMethod: {
    type: String,
    required: [true, "Shipping Method is Required"],
  },
  legalName: { type: String, required: [true, "Legal Name is Required"] },
  GSTPAN: { type: String, required: [true, "GST / PAN is Required"] },
  bankAccountNumber: {
    type: String,
    required: [true, "Bank Account number is Required"],
  },
  bankIFSC: { type: String, required: [true, "Bank IFSC is Required"] },
  bankName: { type: String, required: [true, "Bank Name is Required"] },
});
const seller = model("seller", sellerSchema);
export default seller;
