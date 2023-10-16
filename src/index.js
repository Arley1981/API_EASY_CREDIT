import  app  from "./app.js"
import {PORT} from './config.js'

// Listening del servidor
app.listen(PORT)
console.log('Servidor escuchado por el puerto', PORT);