import { app } from "./app";

const PORT = 3030
app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Http Server running in port:${PORT}`)
  })