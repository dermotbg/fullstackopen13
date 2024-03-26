require('dotenv').config()
const { Sequelize, DataTypes, Model } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' })

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()

app.get('/', async (req, resp) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  return resp.json(blogs)
})

app.post('/api/blogs', async (req, resp) => {
    try {
      const blog = await Blog.create(req.body)
      return resp.json(blog)
    } catch (error) {
      console.log('An error occurred:', error)
      return resp.status(400)
    }
})

app.delete('/api/blogs/:id', async (req, resp) => {
  const blogToDelete = await Blog.findByPk(req.params.id)
  console.log(blogToDelete)
  if (blogToDelete){
    await blogToDelete.destroy()
    return resp.status(204).end()
  }
  else{
    return resp.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})