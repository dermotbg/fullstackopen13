# Relational Databases

## Node / Express backend for a simple blog site using PostgreSQL and Sequelize. 

- Migrations
- User Authentication and Server Side SesDB_URLsions / Session Validation
- Many-to-many relationships
- Endpoint creation / Search options using sequelize operators

Create .env file with dev DATABASE_URL & jwt SECRET
```
DATABASE_URL=postgres://postgres:mysecretdevpassword@db:5432/postgres
SECRET='hereisyourjwtsecret'
```
Run docker compose from root
```
docker compose -f docker-compose-dev.yml up
```
git 
Server runs on localhost:3001
