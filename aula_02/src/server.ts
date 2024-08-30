import { app } from './app'
import { env } from './env'

const PORT = env.PORT
app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`Http Server running in port:${PORT}`)
  })
