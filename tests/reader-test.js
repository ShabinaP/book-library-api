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
        const response = await request(app).post('/reader').send(dataFactory.listOfReaders());
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal(response.body.name);
        expect(newReaderRecord.name).to.equal(newReaderRecord.name);
        expect(newReaderRecord.email).to.equal(newReaderRecord.email);
        expect(newReaderRecord.password).to.equal(newReaderRecord.password)
      });
    });
  });

  describe('handling Sequelize validation errors for the Reader model', () => {
    describe('it should throw an error if the name field is empty', () => {
      it('sends a user friendly message to the client', async () => {
        const response = await request(app).post('/reader').send({
         name: " ",
         email: 'hello@world.com',
         password: 'bdyegbndi83hd',
        });

        expect(response.status).to.equal(400)
        expect(response.body.errors[0]).to.equal('Please enter a name.')
      });
    });
  });

  describe('handling Sequelize validation errors for the Reader model', () => {
    describe('it should throw an error if the email address is not valid', () => {
      it('sends a user friendly message to the client', async () => {
        const response = await request(app).post('/reader').send({
          name: 'Hello',
          email: 'world',
          password: '3783hfbskud'
        });

        expect(response.status).to.equal(400)
        expect(response.body.errors[0]).to.equal('Please provide a valid email address.')
      });
    });
  });

  describe('handling Sequelize validation errors for the Reader model', () => {
    describe('it should throw an error if the password is not a valid length', () => {
      it('sends a user friendly message to the client', async () => {
        const response = await request(app).post('/reader').send({
          name: 'Shabina',
          email: 'shabina-patel@hello.com',
          password: 'dd'
        });

        expect(response.status).to.equal(400)
        expect(response.body.errors[0]).to.equal('The password must be between 8 and 20 characters long.')
      });
    });
  });

  describe('handling Sequelize validation errors for the Reader model', () => {
    describe('it should throw an error if any of the fields are null', () => {
      it('should send a user friendly error to the client', async () => {
        const response = await request(app).post('/reader').send({ });

        expect(response.status).to.equal(400)
        expect(response.body.errors[0]).to.equal('A name is required.')
        expect(response.body.errors[1]).to.equal('An email address is required.')
        expect(response.body.errors[2]).to.equal('Please enter a password.')
      })
    })
  })
  describe('with records in the database', () => {
    let readers;

    beforeEach(async () => {
      readers = await Promise.all([
      Reader.create(dataFactory.listOfReaders()),
      Reader.create(dataFactory.listOfReaders()),
      Reader.create(dataFactory.listOfReaders())
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