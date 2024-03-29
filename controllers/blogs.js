const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { blogFinder, tokenExtractor } = require('../util/middleware')

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

router.put('/:id', blogFinder, async (req, resp, next) => {
  try{
    req.blog.likes = req.blog.likes + 1
    await req.blog.save()
    return resp.json({ likes: req.blog.likes })
  }
  catch(error) {
    next(error)
  }
})

router.post('/', tokenExtractor, async (req, resp) => {
    try {
      const user = await User.findByPk(req.decodedToken.id)
      const blog = await Blog.create({
        ...req.body,
        userId: user.id,
      })
      return resp.json(blog)
    } catch (error) {
      return resp.status(400).json({ error: error })
    }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, resp) => {
  if (req.blog){
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
    return resp.status(404).end()
  }
})

module.exports = router