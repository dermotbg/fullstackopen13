const { Blog } = require('../models')
const { sequelize } = require('../util/db')

const router = require('express').Router()

router.get('/', async (req, resp) => {

  const authors = await Blog.findAll({
    group: ['author'],
    attributes: [
      'author', 
      [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    order: [['likes', 'DESC'], [sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
  }) 
  resp.json(authors)

})

module.exports = router