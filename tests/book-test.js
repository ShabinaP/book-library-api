const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const router = require('../src/routes/bookRouter');

describe('/book', () => {
    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} })
    });

    describe('with no records in the database', () => {
        describe('POST /book', () => {
            it('creates a new book in the database', async () => {
                const response = await (await request(router).post('/book')).send({
                title: "A place for us",
                author: "Fatima Mirza",
                genre: "Contemporary fiction",
                ISBN: '22998877'
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true
                });
                console.log({newBookRecord})
                expect(response.status).to.equal(201);
                // expect(response.body.title).to.equal('A place for us');
                // expect(newBookRecord.name).to.equal('A place for us');
                // expect(newBookRecord.author).to.equal('Fatima Mirza');
                // expect(newBookRecord.genre).to.equal('Contemporary fiction');
                // expect(newBookRecord.ISBN).to.equal('22998877');
            });
        });
    });
});