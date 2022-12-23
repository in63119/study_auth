const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const { accessSecret } = require("../../secretKey");

module.exports = (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.

  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const data = jwt.verify(token, accessSecret);

  if (!authorization) {
    res.status(400).send({ data: null, message: "invalid access token" });
  } else {
    console.log(token);

    res.status(200).send({
      data: { userInfo: data },
      message: "ok",
    });
  }
};
