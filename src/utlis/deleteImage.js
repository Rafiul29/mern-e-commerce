const fs = require("fs").promises;

const deleteImage = async (userImagePath) => {

  try {
    await fs.access(userImagePath)
    await fs.unlink(userImagePath)
    console.log("user image was deleted")
  } catch (error) {
    console.log("user image dose not exist")
  }

  // fs.access(userImagePath)
  //   .then(() => fs.unlink(userImagePath))
  //   .then(() => console.log("user image was deleted"))
  //   .catch(err => console.log("user image dose not exist"))
}

module.exports = deleteImage