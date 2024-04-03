const { Blog } = require('./blog')
const { ReadingList } = require('./readingList')
const { User } = require('./user')


User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: ReadingList })
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog,
  User,
  ReadingList
}