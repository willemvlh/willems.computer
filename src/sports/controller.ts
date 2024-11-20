import { Router } from "express"
import { view } from "./view"
import { getLastActivities } from "./strava"

const router = Router()
router.get('/sports', async (_,res) => {
    res.render("./skeleton", {input:view(await getLastActivities())}, (_,html) => {
        res.send(html)
    })
})

export default router