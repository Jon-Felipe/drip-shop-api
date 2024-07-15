import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: Number,
  dateOfBirth: String,
  address: {
    street: String,
    city: String,
    postalcode: String,
    country: String,
  },
});

userSchema.methods.comparePasswords = async function (password) {
  const passwordsMatch = await bcrypt.compare(password, this.password);
  return passwordsMatch;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);
