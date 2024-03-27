const router = require('express').Router()

const { Blog } = require('../models')
const { blogFinder } = require('../util/middleware')

router.get('/', async (req, resp) => {
  const blogs = await Blog.findAll()
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

router.post('/', async (req, resp, next) => {
    try {
      const blog = await Blog.create(req.body)
      return resp.json(blog)
    } catch (error) {
      next(error)
    }
})

router.delete('/:id', blogFinder, async (req, resp) => {
  if (req.blog){
    await req.blog.destroy()
    return resp.status(204).end()
  }
  else{
    return resp.status(404).end()
  }
})

module.exports = router