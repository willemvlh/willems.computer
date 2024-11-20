import { Router } from "express"
import {readFile} from 'node:fs/promises'
import path from "path"

const router = Router()
router.get("/", async (_,res) => {
    let file = await readFile(path.join(__dirname, "./dots.html"))
    res.render("./skeleton", {input: file.toString()}, (err, html) => {
        console.log(err)
        res.send(html)
    })
})

export default router