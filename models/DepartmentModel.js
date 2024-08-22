import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: String,
  text: String,
  description: String,
});

export default mongoose.model('Department', departmentSchema);
