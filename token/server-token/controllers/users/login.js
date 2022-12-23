const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const { accessSecret, refreshSecret } = require("../../secretKey");

module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 POST /login 구현에 필요한 로직을 작성하세요.

  const userInfo = await Users.findOne({
    where: { userId: req.body.userId, password: req.body.password },
  });

  // console.log("accessToken : ", accessToken);

  if (!userInfo) {
    res.status(400).send({ message: "not authorized", data: null });
  } else {
    const payload = {
      id: userInfo.id,
      userId: userInfo.userId,
      email: userInfo.email,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
    };

    const accessToken = jwt.sign(payload, accessSecret, {
      expiresIn: "3m",
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
      expiresIn: "10m",
    });

    res
      .cookie("refreshToken", refreshToken)
      .status(200)
      .send({ message: "ok", data: { accessToken: accessToken } });
  }
};
