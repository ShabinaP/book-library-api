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
describe('GET /genre', () => {
    it('gets all genres', async () => {
        const response = await request(app).get('/genre');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach(genre => {
            const expected = genres.find((a) => a.id === genre.id)

            expect(genre.name).to.equal(expected.genre)
            
        });
    });
});


describe('GET /genre/:id', () => {
it('gets genre by id', async () => {
    const genre = genres[0];
    const response = await request(app).get(`/genre/${genre.id}`)

    expect(response.status).to.equal(200);
    expect(response.body.genre).to.equal(genre.genre)
});

it('returns a 404 if the record does not exist', async () => {
    const response = await request(app).get('/genre/73638');

    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal('The genre could not be found.')
});
});


    })
})