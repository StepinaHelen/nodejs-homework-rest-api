const db = require('./db')
const { ObjectID } = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listContacts = async () => {
  try {
    const collection = await getCollection(db, 'contacts')
    const contacts = collection.find({}).toArray()
    return contacts
  } catch (err) {
    console.error(err)
  }
}

const getContactById = async (contactId) => {
  try {
    const collection = await getCollection(db, 'contacts')
    const [contacts] = await collection
      .find({ _id: new ObjectID(contactId) })
      .toArray()
    return contacts
  } catch (error) {
    console.error(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const collection = await getCollection(db, 'contacts')

    const { value: deletedContact } = await collection.findOneAndDelete({
      _id: new ObjectID(contactId),
    })

    return deletedContact
  } catch (error) {
    console.error(error)
  }
}
const addContact = async (body) => {
  try {
    const collection = await getCollection(db, 'contacts')
    // if (Object.keys(body).length !== 0) {
    let contact = {
      ...body,
    }
    const {
      ops: [newContact],
    } = await collection.insertOne(contact)

    return newContact
    // } else return
  } catch (error) {
    console.error(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const collection = await getCollection(db, 'contacts')
    const { value: updatedContact } = await collection.findOneAndUpdate(
      {
        _id: new ObjectID(contactId),
      },
      { $set: body },
      { returnOriginal: false }
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
}
