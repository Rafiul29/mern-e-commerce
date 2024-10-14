const User = require("../../../../models/User");
const services = require("../../../../services");
const createError = require("http-errors");
const { createJSONWebToken, emailWithNodeMail } = require("../../../../utlis");
const { jwtActivityKey, Client_URL } = require("../../../../secret");

const registerProcess = async (req, res, next) => {
  const { name, email, phone, address, password } = req.body;
  try {
    const newUser = {
      name,
      email,
      phone,
      address,
      password,
    };

    const image = req.file.path;

    if (image & (image.size > 1024 * 1024 * 2)) {
      throw createError(400, "File to large. It must be less than 2MB");
    }
    const userExits = await services.existingItem({ Model: User, email });

    if (userExits) {
      throw createError(409, "Email Already Exists");
    }

    // add property image file
    newUser.image = image;
    const token = createJSONWebToken(newUser, jwtActivityKey, "10m");

    //prepre email data
    const emailData = {
      email,
      subject: "Account verify email",
      html: `
      <h1>Hello ${name}</h1>
      <p>Please click on the link below to 
      <a href="${Client_URL}/api/v1/auth/activate/${token}" target="_blank">verify your account </a> 
      </p>
      `,
    };

    emailWithNodeMail(emailData);

    res.status(200).json({
      messaage: `Please go to your ${email} for completing your registration process`,
      token,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = registerProcess;
