import { Router } from "express"
import { readFile } from "node:fs/promises"
import path from 'node:path'
import client from '../mqtt/client'

type ColorPayload = {
    color: string
}

const router = Router()
router.post("/bedroom", async (req, res) => {
    const body: ColorPayload = req.body
    if (body.color === undefined) {
        return res.status(400).end("Where's my payload?")
    }
    console.log(body)
    try {
        await client.connect();
        await client.setColor(body.color);
        res.end('ok')
    } catch (err) {
        res.status(500).end((err as Error).message);
    }
});

router.get("/bedroom", async (req, res) => {
    let file = await readFile(path.join(__dirname, "./view.html"))
    res.render("./skeleton", { input: file.toString() }, (err, html) => {
        console.error(err)
        res.send(html)
    })
})

export default router;
