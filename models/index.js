const { Blog } = require('./blog')
const { ReadingList } = require('./readingList')
const { User } = require('./user')
const { Session } = require('./session')


User.hasMany(Blog)
User.hasOne(Session, { as: 'activeSession', foreignKey: 'userId' })

Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList })
// Blog.sync({ alter: true })
// User.sync({ alter: true })

module.exports = {
  Blog,
  User,
  ReadingList,
  Session
}