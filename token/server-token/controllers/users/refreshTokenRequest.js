const { Users } = require("../../models");
const jwt = require("jsonwebtoken");
const { accessKey, refreshKey } = require("../../secretKey");

module.exports = (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /refreshtokenrequest 구현에 필요한 로직을 작성하세요.
  // console.log('토큰 있니???' + req.cookies.refreshToken);
  // cookies에 토큰이 있는지 확인해서
  // 토큰이 없다면, { "data": null, "message": "refresh token not provided" }
  if (!req.cookies.refreshToken) {
    res.status(400).send({ data: null, message: "refresh token not provided" });
  } else {
    // refresh token이 유효한지, 서버가 가지고 있는 비밀 키로 생성한 것이 맞는지 확인
    // 유효x && 해독x, { "data": null, "message": "invalid refresh token, please log in again" }
    const authorization = req.cookies.refreshToken;
    // console.log('스플릿토큰:' + token);
    // console.log('토큰:' + authorization);
    jwt.verify(authorization, refreshKey, async (err, resp) => {
      if (err) {
        res
          .status(400)
          .send({
            data: null,
            message: "invalid refresh token, please log in again",
          });
      }
      const userInfo = await Users.findOne({
        where: {
          id: resp.id,
          userId: resp.userId,
          email: resp.email,
        },
      });
      // 일치하는 유저가 없을 경우
      if (!userInfo) {
        res
          .status(400)
          .send({ data: null, message: "refresh token has been tempered" });
      } else {
        // 일치하는 유저가 있을 경우
        const payload = {
          id: userInfo.dataValues.id,
          userId: userInfo.dataValues.userId,
          email: userInfo.dataValues.email,
          createdAt: userInfo.dataValues.createdAt,
          updatedAt: userInfo.dataValues.updatedAt,
        };

        const accessToken = jwt.sign(payload, accessKey, {
          // subject: 'boyToken',
          expiresIn: "3m",
          // issuer: 'Insu'
        });
        res.status(200).send({
          data: {
            accessToken: accessToken,
            userInfo: payload,
          },
          message: "ok",
        });
      }
    }); //해독
  }

  // 유효, 일치하는 유저 || 일치하지 않는 유저
};
