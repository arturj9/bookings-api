import app from "./app.js"

const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

const start = async () => {
    try{
        await app.listen({port:PORT, host:HOST})
        app.log.info(`Server is running on htpp://${HOST}:${PORT}`)
    }catch(error){
        app.log.error(error)
        process.exit(1)
    }
}

start()