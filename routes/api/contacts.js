const express = require('express')
const router = express.Router()
const { HttpCode } = require('../../helpers/constants')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const contacts = await listContacts()
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contacts },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    console.log(req.params.contactId)
    console.log(contact)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const contact = await addContact(req.body)
    // console.log(contact)
    if (contact) {
      return res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'missing required name field',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        message: 'contact deleted',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
