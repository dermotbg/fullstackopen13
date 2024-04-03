const { ReadingList } = require('../models')

const router = require('express').Router()

router.put('/:id', async (req, resp) => {
  try {
    const listEntry = await ReadingList.findByPk(req.params.id)
    listEntry.read = req.body.read
    listEntry.save()
    return resp.status(204).json(listEntry)
  } catch {
    return resp.status(400).json({ error: error })
  }
})

router.post('/', async (req, resp) => {
  try {
    const listEntry = await ReadingList.create({
      blogId: req.body.blogId,
      userId: req.body.userId,
    })
    return resp.status(200).json(listEntry)
  } catch (error) {
    return resp.status(400).json({ error: error })
  }
})

module.exports = router