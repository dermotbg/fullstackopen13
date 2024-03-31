const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')


const sequelize = new Sequelize(DATABASE_URL, { dialect: 'postgres' })

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to the database')
  } catch (error) {
    console.log('Unable to connect to the database:', error)
    return process.exit(1)
  }
  return null
}

const migConf = {
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  logger: console,
}

const runMigrations = async () => { 
  const migrator = new Umzug(migConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migConf)
  await migrator.down()
}

module.exports = {
  connectToDatabase,
  sequelize,
  rollbackMigration,
}