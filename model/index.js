const Contacts = require('../schemas/contacts')

const listContacts = async () => {
  try {
    const contacts = Contacts.find({})
    return contacts
  } catch (err) {
    console.error(err)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await Contacts.findOne({
      _id: contactId,
    })
    return contacts
  } catch (error) {
    console.error(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const deletedContact = await Contacts.findByIdAndDelete({
      _id: contactId,
    })

    return deletedContact
  } catch (error) {
    console.error(error)
  }
}
const addContact = async (body) => {
  try {
    const newContact = await Contacts.create(body)
    return newContact
  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contacts.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )
    return updatedContact
  } catch (error) {
    console.error(error)
  }
}

const updateStatusContact = async (contactId, body) => {
  try {
    const updatedContact = await Contacts.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    )
    return updatedContact
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
