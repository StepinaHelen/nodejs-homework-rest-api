const Contacts = require('../schemas/contacts')

const listContacts = async () => {
  const contacts = Contacts.find({})
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await Contacts.findById(contactId)
  return contacts
}

const removeContact = async (contactId) => {
  const deletedContact = await Contacts.findByIdAndDelete(contactId)
  return deletedContact
}
const addContact = async (body) => {
  const newContact = await Contacts.create(body)
  return newContact
}

const updateContact = async (contactId, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  )
  return updatedContact
}

const updateStatusContact = async (contactId, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  )
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
