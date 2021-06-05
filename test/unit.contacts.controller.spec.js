const { updateSomeContact } = require('../controllers/contacts')
const Contacts = require('../model/index')

jest.mock('../model/index')

describe('Unit tect contacts controllers', () => {
  // test("without contact in DB", async () => {})
  const req = { user: { id: 1 }, params: { id: 3 }, body: {} }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  }
  const next = jest.fn()

  it('without contact in DB', async () => {
    Contacts.updateContact = jest.fn()
    const result = await updateSomeContact(req, res, next)
    expect(result.status).toEqual('error')
    expect(result.code).toEqual(404)
    expect(result.data).toEqual('Not found')
  })
  it(' DB return an exception', async () => {
    Contacts.updateContact = jest.fn(() => {
      throw new Error('Ups')
    })
    await updateSomeContact(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
