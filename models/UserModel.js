import mongoose from 'mongoose';

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

export default mongoose.model('User', userSchema);
