const request = require('supertest');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const testData = require('../db/data/test-data');
const app = require('../app');

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  it("200: response with all topics", () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toHaveLength(3);
        topics.forEach(topic => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/topic", () => {
  it("404: invalid path", () => {
    return request(app)
      .get('/api/topic')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid path');
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("200: response with a single article object of the id", () => {
    return request(app)
      .get('/api/articles/7')
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toEqual({
          article_id: 7,
          title: 'Z',
          topic: 'mitch',
          author: 'icellusedkars',
          body: 'I was hungry.',
          created_at: '2020-01-07T14:08:00.000Z',
          votes: 0,
          article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        });
      });
  });

  it("404: response with article not found if id is invalid", () => {
    return request(app)
      .get('/api/articles/77')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('article not found');
      });
  });

  it("400: response with bad parameter if id is not a number", () => {
    return request(app)
      .get('/api/articles/notAnId')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('bad input parameter(s)');
      });
  });
});

