import  express  from "express"
import userRoutes from './routes/user.routes.js'
import idexRoutes from './routes/index.routes.js'
import clientRoutes from './routes/client.routes.js'
import  loginRoutes from "./routes/login.routes.js"

const app = express();


// middlewares para el procesamiento de solicitudes
app.use(express.json());

//Routes
app.use('/', idexRoutes)
app.use('/api',userRoutes)
app.use('/api',clientRoutes)
app.use('/api',loginRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: " Endpoint Not found" });
  });

  export default app;