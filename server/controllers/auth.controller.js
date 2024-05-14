const service = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const { token, user } = await service.login(email, password, role);

    res.status(200).send({ token, user });
  } catch (err) {
    res.status(401).json(err.message);
  }
};

const checkAuth = async (req, res) => {
  const { userId, role } = req;

  const user = await service.checkAuth(userId, role);

  res.status(200).send({ user });
};

module.exports = { login, checkAuth };
