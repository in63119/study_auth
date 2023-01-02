const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const { accessSecret } = require("../../secretKey");

module.exports = async (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.

  if (!req.headers.authorization) {
    res.status(400).send({ data: null, message: "invalid access token" });
  } else {
    // jwt를 해독해서 일치하는 유저가 없을 경우와
    // 일치하는 경우를 만들어야함
    const authorization = req.headers["authorization"];
    const token = authorization.split(" ")[1];
    // console.log('스플릿토큰:' + token);
    // console.log('토큰:' + authorization);
    const data = jwt.verify(token, accessKey); //해독

    // console.log('해독한 데이타 :' + data);
    const userInfo = await Users.findOne({
      where: {
        id: data.id,
        userId: data.userId,
        email: data.email,
      },
    });

    if (!userInfo) {
      // 유저 정보가 없을 경우
      res
        .status(400)
        .send({ data: null, message: "access token has been tempered" });
    } else {
      // 유저 정보가 있을 경우
      // const payload = {
      //   id: userInfo.dataValues.id,
      //   userId: userInfo.dataValues.userId,
      //   email: userInfo.dataValues.email,
      //   createdAt: userInfo.dataValues.createdAt,
      //   updatedAt: userInfo.dataValues.updatedAt
      // };

      // const accessToken = jwt.sign(
      //   payload,
      //   accessKey,
      //   {
      //     // subject: 'boyToken',
      //     expiresIn: '3m',
      //     // issuer: 'Insu'
      // });
      delete data.iat;
      res.status(200).send({ data: { userInfo: data }, message: "ok" });
    }
  }
};
