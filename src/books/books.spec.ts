import test from 'node:test';
import { getBooks } from './books';

test("books", async () => {
    console.log(await getBooks())
})

