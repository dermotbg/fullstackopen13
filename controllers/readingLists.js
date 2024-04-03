const { ReadingList } = require('../models')

const router = require('express').Router()

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