
const logout = async (req, res, next) => {
  try {
    // clear cookie
    res.clearCookie('accessToken');
    //response generate
    res.status(200).json({
      message: "logout successfully",
    });
  } catch (error) {
    next(error)
  }
};

module.exports = logout;
