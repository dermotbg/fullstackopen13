const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, resp) => {
  const users = await User.findAll()
  resp.json(users)
})

router.post('/', async (req, resp, next) => {
  try {
    const user = await User.create(req.body)
    resp.status(204).json(user) 
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, resp, next) => {
  try {
    const userToChange = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    userToChange.username = req.body.username
    await userToChange.save()
    resp.status(204).json(userToChange)
  } catch (error) {
    next(error)
  }
})

module.exports = router