const jwt = require('jsonwebtoken')

const cloudinary = require('cloudinary').v2
const { promisify } = require('util')

require('dotenv').config()
const Users = require('../model/users')
const { HttpCode } = require('../helpers/constants')
// const UploadAvatar = require('../services/upload-avatars')
const UploadAvatar = require('../services/upload-cloud')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS

cloudinary.config({
  cloud_name: process.env.Cloud_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const reg = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      })
    }
    const newUser = await Users.create(req.body)
    const { id, name, email, subscription, avatarURL } = newUser
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { id, name, email, subscription, avatarURL },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      })
    }

    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '3h' })
    await Users.updateToken(id, token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { token },
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    await Users.updateToken(req.user.id, null)
    return res.status(HttpCode.NO_CONTENT).json({
      status: '204 No Content',
    })
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  try {
    const user = await Users.current(req.user.token)
    const { email, subscription } = user
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { email, subscription },
    })
  } catch (e) {
    next(e)
  }
}

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    // cтатика
    // return res.json({})
    // const uploads = new UploadAvatar(AVATARS_OF_USERS)
    // const avatarURL = await uploads.saveAvatarToStatic({
    //   idUser: id,
    //   pathFile: req.file.path,
    //   name: req.file.filename,
    //   oldFile: req.user.avatarURL,
    // })
    // await Users.updateAvatar(id, avatarURL)
    const uploadCloud = promisify(cloudinary.uploader.upload)
    const uploads = new UploadAvatar(uploadCloud)
    const { userIdImg, avatarURL } = await uploads.saveAvatarToCloud(
      req.file.path,
      req.user.userIdImg
    )

    await Users.updateAvatar(id, avatarURL, userIdImg)

    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarURL },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  reg,
  login,
  logout,
  current,
  avatars,
}
