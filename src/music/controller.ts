import { Router } from "express"
import { getLastPlayedTracks } from "./music"
import { view } from "./view"

const router = Router()
router.get("/music", async (_,res) => {
    res.render("./skeleton", {input: view(await getLastPlayedTracks())}, (_,html) => {
        res.send(html)
    })
})

export default router
