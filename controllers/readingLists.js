const { ReadingList } = require('../models')
const { tokenExtractor, sessionValidator } = require('../util/middleware')

const router = require('express').Router()

router.put('/:id', tokenExtractor, sessionValidator, async (req, resp) => {
  if(req.sessionValid) {
    try {
      const listEntry = await ReadingList.findByPk(req.params.id)
      listEntry.read = req.body.read
      listEntry.save()
      return resp.status(204).json(listEntry)
    } catch {
      return resp.status(400).json({ error: 'Malformed Request' })
    }
  }
  else {
    return resp.status(401).json ({ error: 'Please log in to update your reading list' })
  }
})

router.post('/', tokenExtractor, sessionValidator, async (req, resp) => {
  if(req.sessionValid){
    try {
      const listEntry = await ReadingList.create({
        blogId: req.body.blogId,
        userId: req.body.userId,
      })
      return resp.status(200).json(listEntry)
    } catch (error) {
      return resp.status(400).json({ error: 'Malformed request' })
    }
  }
  else {
    return resp.status(401).json ({ error: 'Please login to add to your reading list' })
  }
})

module.exports = router