const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { User } = require('../models')
const { SECRET } = require('../util/config')

router.post('/', async (req, resp) => {

  
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  
  const passwordCorrect = req.body.password === 'secret'

  if(!(passwordCorrect && user)){
    resp.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  resp.status(200).json({ token, username: user.username, name: user.name })
  
})

module.exports = router