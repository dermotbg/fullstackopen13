const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { blogFinder, tokenExtractor, sessionValidator } = require('../util/middleware')

router.get('/', async (req, resp) => {

  const where = {}

  if (req.query.search) {
    where[Op.or] = [
        { 
          title: {
            [Op.iLike]: '%' + req.query.search + '%' }
        },
        { 
          author: { 
            [Op.iLike]: '%' + req.query.search + '%' 
        }
      }
    ]
  }

  const blogs = await Blog.findAll({
    order: [['likes', 'DESC']],
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  return resp.json(blogs)
})

router.put('/:id', blogFinder, tokenExtractor, sessionValidator, async (req, resp, next) => {
  if(req.sessionValid) {
    try {
      req.blog.likes = req.blog.likes + 1
      await req.blog.save()
      return resp.json({ likes: req.blog.likes })
  }
    catch(error) {
      next(error)
    }
  } else {
    return resp.status(401).json({ error: 'Unauthorized, please log in' })
  }
})

router.post('/', tokenExtractor, sessionValidator, async (req, resp, next) => {
  if(req.sessionValid) {
    try {
      const user = await User.findByPk(req.decodedToken.id)

      if(req.body.year < 1991 || req.body.year > 2024 ) {
        return resp.status(400).json({ error: 'Year must be between 1991 and 2024' })
      }

      const blog = await Blog.create({
        ...req.body,
        userId: user.id,
      })

      return resp.json(blog)

    } catch (error) {
      next(error)
    }
  }
  else {
    return resp.status(401).json({ error: 'Unauthorized, please log in' })
  }
})

router.delete('/:id', blogFinder, tokenExtractor, sessionValidator, async (req, resp) => {
  if (req.blog && req.sessionValid){
    const user = await User.findByPk(req.decodedToken.id)
    if(user.id === req.blog.userId){
      await req.blog.destroy()
      return resp.status(204).end()
    }
    else {
      return resp.status(401).json({ error: 'unauthorized user' })
    }
  }
  else{
    return !req.blog 
      ? resp.status(404).end() 
      : resp.status(401).json({ error: 'Unauthorized, please log in' })
  }
})

module.exports = router