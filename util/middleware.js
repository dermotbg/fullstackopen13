
const { Blog } = require('../models')

const errorHandler = (error, req, resp, next) => {
  if(error.name === 'TypeError') {
    return resp.status(404).send({ error: 'Blog not found' })
  }
  if(error.name === 'ValidationError' || error.name === 'SequelizeValidationError') {
    return resp.status(400).send({ error: 'malformed request' })
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


module.exports = {
  blogFinder,
  errorHandler,
}