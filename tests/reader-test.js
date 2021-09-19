const { expect } = require('chai');
const request = require('supertest');
const { Reader } = require('../src/models');
const app = require('../src/app');
const dataFactory = require('../test-helpers/dataFactory')

describe('/reader', () => {
  before(async () => Reader.sequelize.sync());

  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /reader', () => {
      it('creates a new reader in the database', async () => {
        const response = await request(app).post('/reader').send({
         name: "Anne Hathaway",
         email: 'florals_in_spring?@hotmail.com',
         password: 'efef3yyhhhh'
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal('Anne Hathaway');
        expect(newReaderRecord.name).to.equal('Anne Hathaway');
        expect(newReaderRecord.email).to.equal('florals_in_spring?@hotmail.com');
        expect(newReaderRecord.password).to.equal('efef3yyhhhh')
      });
    });
  });

  describe('with records in the database', () => {
    let readers;

    beforeEach(async () => {
      readers = await Promise.all([
        Reader.create({
          name: 'Anne Hathaway',
          email: 'florals_in_spring?@hotmail.com',
          password: "efef3yyhhhh"
        }),
        Reader.create({ 
        name: 'Lara Jean',
        email: 'love_letters@kavinsky.com',
        password: "ddfwfsdc2"
      }),
        Reader.create({ 
          name: 'Allie Hamilton',
          email: 'im_a_bird@gmail.com',
          password: "hufihdsd"
         }),
      ]);
    });

    describe('GET /readers', () => {
      it('gets all readers records', async () => {
        const response = await request(app).get('/reader');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);

          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
        });
      });
    });

    describe('GET /reader/:id', () => {
      it('gets readers record by id', async () => {
        const reader = readers[0];
        const response = await request(app).get(`/reader/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).get('/reader/26273');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('PATCH /reader/:id', () => {
      it('updates readers email by id', async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/reader/${reader.id}`)
          .send({ email: `can_you_spell_gabbana@hotmail.com` });
        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal('can_you_spell_gabbana@hotmail.com');
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app)
          .patch('/reader/26273')
          .send({ email: 'can_you_spell_gabbana@hotmail.com'});

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

   

    describe('DELETE /reader/:id', () => {
      it('deletes reader record by id', async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/reader/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).delete('/reader/26273');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });
  });
});