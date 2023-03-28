const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { BadRequestError } = require('../errors/bad-request');

const AdminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, '어드민 유저이름을 입력해주세요.'],
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    require: [true, '최소 6글자 이상의 비밀번호를 입력해주세요.'],
    minlength: 6,
  },
});

AdminUserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminUserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Admin_User', AdminUserSchema);
