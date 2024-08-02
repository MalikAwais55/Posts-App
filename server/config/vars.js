const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    port : process.env.PORT,
    mongoURI : process.env.DATABASE_URL,
    keyURI : process.env.PRIVATE_KEY

}