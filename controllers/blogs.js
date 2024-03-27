const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, resp) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  return resp.json(blogs)
})

router.put('/:id', async (req, resp) => {
    const blogToUpdate = await Blog.findByPk(req.params.id)
    if (blogToUpdate) {
      blogToUpdate.likes = blogToUpdate.likes + 1
      await blogToUpdate.save()
      return resp.json({ likes: blogToUpdate.likes })
    }
    else {
      resp.status(404).end()
    }
})

router.post('/', async (req, resp) => {
    try {
      const blog = await Blog.create(req.body)
      return resp.json(blog)
    } catch (error) {
      console.log('An error occurred:', error)
      return resp.status(400)
    }
})

router.delete('/:id', async (req, resp) => {
  const blogToDelete = await Blog.findByPk(req.params.id)
  console.log(blogToDelete)
  if (blogToDelete){
    await blogToDelete.destroy()
    return resp.status(204).end()
  }
  else{
    return resp.status(404).end()
  }
})

module.exports = router