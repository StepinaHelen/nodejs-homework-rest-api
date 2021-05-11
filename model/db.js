const { MongoClient } = require('mongodb')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = new MongoClient.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 5,
})

// закрываем соеденение с нашей БД
process.on('SIGINT', async () => {
  const client = await db
  client.close()
  console.log('Disconnect MongoDB')
  process.exit()
})

module.exports = db
