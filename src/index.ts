import path from "path"
import express from "express"
import books from "./books/controller"
import music from "./music/controller"
import sports from './sports/controller'
import home from './home/controller'
import bedroom from './bedroom/controller'
import { cacheMiddleware } from "./cache"

const app = express()

app.use(cacheMiddleware);

app.use(express.json());
app.use(home)
app.use(books)
app.use(music)
app.use(sports)
app.use(bedroom)

app.use(express.static("src/static"))

app.set("views", path.join(__dirname,'./views'))
app.set("view engine", "ejs")

app.listen(8080, () => console.log("listening"))

export default app;