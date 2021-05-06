const fs = require('fs/promises')
const path = require('path')
// const contacts = require('./contacts.json')

const { v4: uuidv4 } = require('uuid')
const contactsPath = path.join(__dirname, '', 'contacts.json')

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath)
    let contacts = JSON.parse(response)
    // console.log(contacts)
    return contacts
  } catch (err) {
    console.error(err)
  }
}
// listContacts()
const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const findContact = contacts.find(
      ({ id }) => id.toString() === contactId.toString()
    )
    // console.table(findContact)
    return findContact
  } catch (error) {
    console.error(error)
  }
}
// getContactById(2)

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const deletedContact = await getContactById(contactId)
    let newContactList = contacts.filter(
      ({ id }) => id.toString() !== contactId.toString()
    )
    // console.table(newContactList)
    fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2))
    return deletedContact
  } catch (error) {
    console.error(error)
  }
}
// removeContact(3)
const addContact = async (body) => {
  try {
    if (Object.keys(body).length !== 0) {
      const contacts = await listContacts()
      let contact = {
        id: uuidv4(),
        ...body,
      }
      const newContact = [...contacts, contact]
      // console.table(newContact)
      fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2))
      return newContact
    } else return
  } catch (error) {
    console.error(error)
  }
}
// addContact('Helen', '02222')
const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const contactToUpdate = await getContactById(contactId)

    const updatedContact = Object.assign(contactToUpdate, body)

    const сontactsList = contacts.filter(
      ({ id }) => id.toString() !== contactId.toString()
    )

    const updatedContactList = [...сontactsList, updatedContact]

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactList, null, 2)
    )
    console.log(updatedContact)
    return updatedContact
  } catch (error) {
    console.error(error)
  }
}
// updateContact(11, {
//   email: 'lena1994@gmail.com',
//   phone: '(097) 360-21-50',
// })

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
