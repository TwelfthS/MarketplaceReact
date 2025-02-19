const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")
const models = require('../models/index.js')

const User = models.User

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
  
    if (!token) {
      return res.status(403).send({
        message: "Отсутствует токен!"
      })
    }
  
    jwt.verify(token,
              config.secret,
              (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Требуется авторизация!",
                  })
                }
                req.userId = decoded.id
                next()
              })
}

const authJwt = {
    verifyToken
}

module.exports = authJwt