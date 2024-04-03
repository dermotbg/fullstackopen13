const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, resp) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    }
  })
  resp.json(users)
})

router.get('/:id', async (req, resp) => {
  const where = {}

  if (req.query.read){
    where.read = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] },
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: 'userId' },
        through: {
          model: ReadingList,
          attributes: ['read', 'id'],
          where
        }
      }
    ]
  })
  resp.json(user)
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