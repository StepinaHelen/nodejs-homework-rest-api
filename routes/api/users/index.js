const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/users')

const {
  validateCreateUser,
  validateLogin,
} = require('../../../validation/validate-user')

router.post('/signup', validateCreateUser, controller.reg)
router.post('/login', validateLogin, controller.login)

router.post('/users/logout', async (req, res, next) => {
  try {
    const data = await updateToken(id, null)
    return data
  } catch (e) {
    next(e)
  }
})

module.exports = router
