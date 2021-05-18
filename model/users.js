const User = require('../schemas/user')

const findById = async (id) => {
  const user = await User.findById(id)
  return user
}
const findByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

const create = async (options) => {
  const newUser = new User(options)
  return await newUser.save()
}

const updateToken = async (id, token) => {
  const updatedToken = await User.findByIdAndUpdate(id, { token })
  return updatedToken
}

module.exports = {
  findById,
  create,
  findByEmail,
  updateToken,
}
