const { expect } = require('chai');
const request = require('supertest');
const { Genre } = require('../src/models')
const app = require('../src/app')

describe('/genre', () => {
    before(async () => {
        await Genre.destroy({ where: {}})
        Genre.sequelize.sync()
    });

    describe('with no records in the database', () => {
        describe('POST /genre', () => {
            it('creates a new genre in the database', async () => {
                const response = await request(app).post('/genre').send({
                    genre: 'Fiction'
                });
                const newGenreRecord = await Genre.findByPk(response.body.id, {
                    raw: true
                });

                expect(response.status).to.equal(201);
                expect(response.body.genre).to.equal('Fiction');
                expect(newGenreRecord).to.equal('Fiction')
            });
            it('throws an error if the genre field is empty', async () => {
                const response = await request(app).post('/genre').send({});
                const newGenreRecord = await Genre.findByPk(response.body.id, {
                    raw: true
                });

                expect(response.status).to.equal(400)
                expect(response.body.errors[0]).to.equal('The genre field cannot be empty.')
            });
        });
    });

    describe('with records in the database', () => {
        let genres;
beforeEach(async () => {
    await Genre.destroy({ where: {} })
    genres = await Promise.all([
Genre.create({
    genre: 'fiction',
}),
Genre.create({
    genre: 'Romance',
}),
Genre.create({
    genre: 'Young Adult',
}),
    ]);
});

    })
})