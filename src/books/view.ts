import { BookCollection } from "./types"

export function view(books: BookCollection): string {
    let string = `<h2 style="border-left: solid 6px orange; padding-left: 4px;">Reading</h2>`
    books.booksReading.forEach((book: any) => {
        string += `<div><span>${book.author}, </span><span>${book.title} (${book.published})`
    })
    string += `<h2 style="border-left: solid 6px purple; padding-left: 4px;">Read</h2>`
    books.booksRead.forEach((book: any) => {
        string += `<div><span>${book.author}, </span><span>${book.title} (${book.published})`
    })
    return string
}