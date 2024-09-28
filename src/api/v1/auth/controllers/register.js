
const register=()=>{

}

module.exports=register
// // get single user
// const getUserById = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const options = { password: 0 };
//     const user = await findWithId(User, id, options);

//     return successResponse(res, {
//       statusCode: 200,
//       message: "user were returned successfully",
//       payload: {
//         user,
//       },
//     });
//   } catch (error) {
//     if (error instanceof mongoose.Error) {
//       next(createError(400, "Invalid user id"));
//       return;
//     }
//     next(error);
//   }
// };

// // delete user
// const deleteUserById = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const options = { password: 0 };
//     const user = await findWithId(User, id, options);

//     const userImagePath = user.image;

//     deleteImage(userImagePath);

//     await User.findByIdAndDelete({ _id: id, idAdmin: false });

//     return successResponse(res, {
//       statusCode: 200,
//       message: "user was delete successfully",
//     });
//   } catch (error) {
//     if (error instanceof mongoose.Error) {
//       next(createError(400, "Invalid user id"));
//       return;
//     }
//     next(error);
//   }
// };

// // process register
// const processRegister = async (req, res, next) => {
//   try {
//     const { name, email, phone, address, password } = req.body;

//     const newUser = {
//       name,
//       email,
//       phone,
//       address,
//       password,
//     };

//     const userExits = await User.exists({ email });

//     if (userExits) {
//       throw createError(
//         409,
//         "user with this email already exists. please login"
//       );
//     }

//     // crete jwt token
//     const token = createJSONWebToken(
//       { name, email, phone, address, password },
//       jwtActivityKey,
//       "10m"
//     );

//     //prepre email
//     const emailData = {
//       email,
//       subject: "Account Activation Email",
//       html: `
//       <h1>Hello ${name}</h1>
//       <p>Please click on the link below to <a href="${clientURL}/api/users/activate/${token}" target="_blank">activate your account </a> </p>
//       `,
//     };

//     // send email with nodemailer
//     try {
//       await emailWithNodeMail(emailData);
//     } catch (error) {
//       next(createError(500, "Failed to send verification email"));
//       return;
//     }

//     return successResponse(res, {
//       statusCode: 200,
//       message: `please go to your ${email} for completing your registration process`,
//       payload: {
//         token,
//       },
//     });
//   } catch (error) {
//     if (error instanceof mongoose.Error) {
//       next(createError(400, "Invalid user id"));
//       return;
//     }
//     next(error);
//   }
// };
