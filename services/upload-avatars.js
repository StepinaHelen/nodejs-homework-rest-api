const Jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')

const createFolderIsNotExist = require('../helpers/create-dir')
class Upload {
  constructor(AVATARS_OF_USERS) {
    this.AVATARS_OF_USERS = AVATARS_OF_USERS
  }
  async transformAvatar(pathFile) {
    const file = await Jimp.read(pathFile)
    await file
      .autocrop()
      .cover(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
      .writeAsync(pathFile)
  }

  async saveAvatarToStatic({ idUser, pathFile, name, oldFile }) {
    await this.transformAvatar(pathFile)

    const folderUserAvatar = path.join(this.AVATARS_OF_USERS, idUser)

    await createFolderIsNotExist(folderUserAvatar)

    await fs.rename(pathFile, path.join(folderUserAvatar, name))

    await this.deleteOldAvatar(
      path.join(process.cwd(), this.AVATARS_OF_USERS, oldFile)
    )
    const avatarURL = path.normalize(path.join(idUser, name))
    // console.log(avatarURL)
    return avatarURL
  }

  async deleteOldAvatar(pathFile) {
    try {
      await fs.unlink(pathFile)
    } catch (error) {
      console.log(error.message)
    }
  }
}
module.exports = Upload
