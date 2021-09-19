const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const router = require('../src/routes/bookRouter');
const app = require('../src/app');
const book = require('../src/models/book');
const dataFactory = require('../test-helpers/dataFactory')


describe('/book', () => {
    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} })
    });

    describe('with no records in the database', () => {
        describe('POST /book', () => {
            it('creates a new book in the database', async () => {
                const response = await request(app).post('/book').send(dataFactory.bookCollection());
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true
                });
                
                console.log({newBookRecord})
                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal(response.body.title);
                expect(newBookRecord.author).to.equal(newBookRecord.author);
                expect(newBookRecord.genre).to.equal(newBookRecord.genre);
                expect(newBookRecord.ISBN).to.equal(newBookRecord.ISBN);
            });
        });
    });

describe('with records in the database', () => {
    let books;

    beforeEach(async ()  => {
     books = await Promise.all([
Book.create(dataFactory.bookCollection()),
Book.create(dataFactory.bookCollection()),
Book.create(dataFactory.bookCollection())
    ]);
    });


describe('GET/books', () => {
   it('it returns all books', async () => {
const response = await request(app).get('/book');

expect(response.status).to.equal(200);
expect(response.body.length).to.equal(3)

response.body.forEach((book)=> {
    const expected = books.find((a)=> a.id === book.id)
    expect(book.title).to.equal(expected.title);
    expect(book.author).to.equal(expected.author);
    expect(book.genre).to.equal(expected.genre);
    expect(book.ISBN).to.equal(expected.ISBN)
});
    });
})
describe('GET/book/:id', () => {
    it('gets book record by id', async () => {
        const book = books[0];
        const response = await request(app).get(`/book/${book.id}`)
    console.log(book)
        expect(response.status).to.equal(200)
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.ISBN).to.equal(book.ISBN);
    
    })

    it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get('/book/9988');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.')
    });
});

describe('DELETE /book/:id', () => {
    it('deletes a book record by id if its no longer available for loan', async () => {
const book = books[0];
const response = await request(app).delete(`/book/${book.id}`);
const deletedBook = await Book.findByPk(book.id, { raw: true});

expect(response.status).to.equal(204);
expect(deletedBook).to.equal(null);
    });

    it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).delete('/book/837633');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.')
    })
})

});
})
