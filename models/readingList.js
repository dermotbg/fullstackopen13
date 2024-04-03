const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model {}

ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refereces: { model: 'blogs', key: 'id' }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refereces: { model: 'blogs', key: 'id' }
  },
  read:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'readingList'
})

module.exports = { 
  ReadingList
}