const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { newContact, newUser } = require('./data/data')
const app = require('../app')

const db = require('../model/db')
const Users = require('../model/users')

const Contacts = require('../schemas/contacts')
const User = require('../schemas/user')

// describe- ни на что не влияет, просто красиво выводит
describe('E2E test the routes api/contacts', () => {
  let user, token

  //хуки
  beforeAll(async () => {
    await db
    await User.deleteOne({ email: newUser.email })
    user = await Users.create(newUser)
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
    const issueToken = (payload, secret) => jwt.sign(payload, secret)
    token = issueToken({ id: user._id }, JWT_SECRET_KEY)
    await Users.updateToken(user._id, token)
  })

  beforeEach(async () => {
    await Contacts.deleteMany()
  })

  afterAll(async () => {
    const mongo = await db
    await User.deleteOne({ email: newUser.email })
    await mongo.disconnect()
  })

  describe('should handle get request', () => {
    it('should response 200 status for get all contacts', async () => {
      const res = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contacts).toBeInstanceOf(Array)
    })
    // it('should response 200 status for get contact by id', async () => {
    //   const contact = await Contacts.create({
    //     ...newContact,
    //     owner: user._id,
    //   })
    //   const res = await request(app)
    //     .get(`/api/contacts/${contact._id}`)
    //     .set('Authorization', `Bearer ${token}`)

    //   expect(res.status).toEqual()
    //   expect(res.body).toBeDefined()
    //   expect(res.body.data.contact.id).toBe(String(contact._id))
    // })
    it('should response 400 status for get contact by id', async () => {
      const res = await request(app)
        .get(`/api/contacts/123`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
    })
  })
  describe('should handle post request', () => {
    it('should response 201 status create contact', async () => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send(newContact)

      expect(res.status).toEqual(201)
      expect(res.body).toBeDefined()
    })
    it('should response 400 status without required field ', async () => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'Helen' })

      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
    })
  })
  //   describe('should handle put request', () => {
  //     it('should response 200 status create contacts', async () => {
  //       const contact = await Contacts.create({ ...newContact, owner: user._id })
  //       const res = await request(app)
  //         .put(`/api/contacts/${contact._id}`)
  //         .set('Authorization', `Bearer ${token}`)
  //         .set('Accept', 'application/json')
  //         .send({ name: 'Alexandr' })

  //       expect(res.status).toEqual(200)
  //       expect(res.body).toBeDefined()
  //       expect(res.body.data.contact.name).toBe('Alexandr')
  //     })
  //   })

  //   describe('should handle delete request', () => {})
  //   describe('should handle patch request', () => {})
})
