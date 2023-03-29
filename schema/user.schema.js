import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  }
});

const User = mongoose.model('User', userSchema);

export default User;