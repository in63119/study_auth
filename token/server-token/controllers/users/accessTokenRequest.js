const { accessSecret } = require("../../config/config");
const { Users } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.
  const token = jwt.sign("토큰에 담을 값", ACCESS_SECRET, { 옵션: "값" });
};
