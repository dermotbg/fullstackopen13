const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, resp) => {
  const users = await User.findAll()
  resp.json(users)
})

router.post('/', async (req, resp) => {
  try {
    const user = await User.create(req.body)
    resp.status(204).json(user) 
  } catch (error) {
    console.error("An error occurred:", error )
    resp.status(400).json({ error: "Bad request" })
  }
})

router.put('/:username', async (req, resp) => {
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
    console.error("An error occurred:", error )
    resp.status(404).json({ error: "User not found" })
  }
})

module.exports = router