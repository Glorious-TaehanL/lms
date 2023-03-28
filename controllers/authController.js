const AdminUser = require('../models/AdminUser');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const register = async (req, res) => {
  const user = await AdminUser.create(req.body);
  res.status(StatusCodes.CREATED).json({ user: { name: user.name } });
};

const login = async (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;
  if (!name || !password) throw new CustomError.BadRequestError('이름과 이메일을 제공해주세요.');

  const user = await AdminUser.findOne({ name });
  if (!user) {
    throw new CustomError.UnauthenticatedError('어드민 유저정보를 확인할 수 없습니다.');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    // throw new CustomError.UnauthenticatedError('어드민 유저정보를 확인할 수 없습니다.');
    console.log('failed');
  }
  res.render('test');
};

module.exports = {
  register,
  login,
};
