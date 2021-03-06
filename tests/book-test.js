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

    describe('handling sequelize validation error for the title field',  () => {
        describe('creating a book without a title should throw a Sequelize Validation Error', () => {
            it('throws a user friendly error to the user', async () => {
                const response = await request(app).post('/book').send({
                    title: ' ',
                    author: 'Khaled Hosseini',
                    genre: 'Fiction',
                    ISBN: 78787878
                })
                expect(response.status).to.equal(400)
                expect(response.body.errors[0]).to.equal('Please enter the title of the book.')
            });
        });
    });

    describe('handling sequelize validation error for author', () => {
        describe('creating an author with no value should throw a Sequelize Validation Error', () => {
            it('throws a user friendly message to the user', async () => {
                const response = await request (app).post('/book').send({
                    title: 'Why We Sleep',
                    author: ' ',
                    genre: 'Non-fiction',
                    ISBN: 83464784
                })
                expect(response.status).to.equal(400)
                expect(response.body.errors[0]).to.equal('Please enter the author of the book.')
            });
        });
    });

    describe('handling sequelize validation errors for the Book model', () => {
        describe('if both title and author are empty, it should throw 2 errors', () => {
            it('throws 2 user friendly errors', async () => {
                const response = await request(app).post('/book').send({
                    title: " ",
                    author: " ",
                    genre: 'Fiction',
                    ISBN: 66557744
                })
                expect(response.status).to.equal(400)
                expect(response.body.errors[0]).to.equal('Please enter the title of the book.')
                expect(response.body.errors[1]).to.equal('Please enter the author of the book.')
            });
        });
    });

describe('handling sequelize validation errors for the Book model', () => {
    describe('if title and author are null, it should throw 2 errors', () => {
        it('throws 2 user friendly errors', async () => {
            const response = await request(app).post('/book').send({
                genre: 'Contemporary fiction',
                ISBN: 33221133
            });
            expect(response.status).to.equal(400)
            expect(response.body.errors[0]).to.equal('A title is required.');
            expect(response.body.errors[1]).to.equal('An author is required.')
        })
    })
} )   




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

describe('PATCH /book/:id', () => {
    it('updates a books genre by id', async () => {
        const book = books[0];
        const response = await request(app)
        .patch(`/book/${book.id}`)
        .send({ genre: `Contemporary`})
        const updatedBookRecord = await Book.findByPk(book.id, {
            raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.genre).to.equal('Contemporary')

        it('returns a 404 if the book does not exist', async () => {
            const response = await request(app).get('/book/8736');

            expect(response.status).to.equal(404)
            expect(response.body.error).to.equal('The book could not be found.')
        })
    })
})




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
