
const jwt = require('jsonwebtoken')
const { Blog, Session } = require('../models')
const { SECRET } = require('./config')

const errorHandler = (error, req, resp, next) => {
  if(error.name === 'TypeError') {
    return resp.status(400).send({ error: error.message })
  }
  if(error.name === 'ValidationError' || error.name === 'SequelizeValidationError') {
    return resp.status(400).send({ error: error.message })
  }
  next(error)
}

const blogFinder = async (req, res, next) => {
  try{
    req.blog = await Blog.findByPk(req.params.id)
  } catch (error) {
    next(error)
  }
  next()  
}

const tokenExtractor = (req, resp, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      return resp.status(401).json({ error: 'token invalid' })
    }
  }
  else{
    return resp.status(401).json({ error: 'no token provided' })
  }
  next()
}

const sessionValidator = async (req, resp, next) => {
  const authorization = req.get('authorization')
  if (authorization && req.decodedToken) {
    try {
      req.activeSession = await Session.findOne({
        where: {
          user_id: req.decodedToken.id,
          user_token: authorization.substring(7),
          is_active: true
        }
      })
      if (req.activeSession) {
        req.sessionValid = true
      }
    }
    catch (error) {
      next(error)
    }
  }
  else {
    resp.status(401).json({ error: "Unauthorized token, please log in"})
  }
  next()
}


module.exports = {
  blogFinder,
  errorHandler,
  tokenExtractor,
  sessionValidator
}