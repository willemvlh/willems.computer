import { Router } from "express";
import { getBooks } from "./books";
import { view } from "./view";

const router = Router()
router.get("/books", async (_,res) => {
    const books = await getBooks();
    res.render("./skeleton", {input: view(books)}, (_, html) => {
        console.log(_)
        res.send(html)
    })
})

export default router