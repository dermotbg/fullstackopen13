const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { User, Session } = require('../models')
const { SECRET } = require('../util/config')

router.post('/', async (req, resp) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  if (user.disabled === true) return resp.status(403).json({ error: 'This account is restricted from login, please contact support' })
  
  const passwordCorrect = req.body.password === 'secret'

  if(!(passwordCorrect && user)){
    resp.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.create({
    userId: user.id,
    userToken: token
  })
  //TODO: Timeout || cron job to turn Session.isActive to false 

  resp.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = router