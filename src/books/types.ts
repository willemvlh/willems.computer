type Book = {
    title: string;
    author: string;
    published: number;
}

type BookCollection = {
    booksReading: Book[];
    booksRead: Book[]
}

export {Book, BookCollection}