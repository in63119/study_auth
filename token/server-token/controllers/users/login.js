const { Users } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 POST /login 구현에 필요한 로직을 작성하세요.

  const userInfo = await Users.findOne({
    where: { userId: req.body.userId, password: req.body.password },
  });

  const token = jwt.sign(userInfo, process.env.ACCESS_SECRET);

  console.log("login : ", token);

  if (!userInfo) {
    res.status(400).send({ message: "not authorized", data: null });
  } else {
    res.status(200).send({ message: "ok", data: { accessToken: "asd" } });
  }
};
