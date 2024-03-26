require('dotenv').config()
const { Sequelize } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

app.get('/', (req, resp) => {
   resp.json({ say: 'hello shworld'})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})