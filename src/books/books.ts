import { XMLParser } from "fast-xml-parser"
import { Book, BookCollection } from "./types"


async function getBooks(): Promise<BookCollection> {
    const [booksRead, booksReading] = await Promise.all([getBooksFromShelf("read"), getBooksFromShelf("currently-reading")])
    return { booksRead: booksRead, booksReading: booksReading }
}

async function getBooksFromShelf(shelf: string): Promise<Book[]> {
    const url = 'https://www.goodreads.com/review/list_rss/31458920?key=qj9ZWzbS4ByXGj5KrAlrtKWM7VCRObtZbTnYhb89OaGsmZsw&shelf=' + shelf
    const result = await (await fetch(url)).text()
    const parser = new XMLParser();
    const dom = parser.parse(result)
    const bookOrBooksOrUndefined = dom.rss.channel.item;
    let items: any[];
    if (!bookOrBooksOrUndefined){
        items = []
    }
    else if ('slice' in bookOrBooksOrUndefined) {//fuck me
        items = dom.rss.channel.item.slice(0, 5);
    }
    else {
        items = [dom.rss.channel.item]
    }
    return items.map((item: any) => ({
        title: item.title,
        author: item.author_name,
        published: item.book_published
    }))

}

export { getBooks }