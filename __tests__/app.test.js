const request = require("supertest");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data");
const app = require("../app");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  it("200: response with all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
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
      .get("/api/topic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid path");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("200: response with a single article object of the id", () => {
    return request(app)
      .get("/api/articles/7")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toEqual({
          article_id: 7,
          title: "Z",
          topic: "mitch",
          author: "icellusedkars",
          body: "I was hungry.",
          created_at: "2020-01-07T14:08:00.000Z",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  it("404: response with article not found if id is invalid", () => {
    return request(app)
      .get("/api/articles/77")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("article not found");
      });
  });

  it("400: response with bad parameter if id is not a number", () => {
    return request(app)
      .get("/api/articles/notAnId")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad data format");
      });
  });
});

describe("GET /api/articles", () => {
  it("200: response with all articles with their comments count, sorted by created at", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(12);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
        expect(body.articles).toBeSorted({
          descending: true,
          key: "created_at",
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("200: response with empty array if article exists but has no comment", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });

  it("200: response with list of comments of the article, sorted by created at", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(11);
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            article_id: expect.any(Number),
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
          });
        });
        expect(body.comments).toBeSorted({ descending: true, key: "created_at" });
      });
  });

  it('400: bad article id', () => {
    return request(app)
      .get('/api/articles/notAnId/comments')
      .expect(400)
      .then(({ body }) => {
          expect(body.msg).toBe('bad data format');
      })
  });

  it('404: article not found', () => {
    return request(app)
      .get('/api/articles/999/comments')
      .expect(404)
      .then(({ body }) => {
          expect(body.msg).toBe('article not found');
      })
  });
});

describe("POST /api/articles/:article_id", () => {
  it("201: response with the created comment", () => {
    const input = { username: "rogersop", body: "hEllo wOrld!" };
    return request(app)
      .post("/api/articles/2/comments")
      .send(input)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          comment_id: 19,
          body: 'hEllo wOrld!',
          article_id: 2,
          author: 'rogersop',
          votes: 0,
          created_at: expect.any(String)        
        });
      });
  });

  it("400: bad article id", () => {
    const input = { username: "rogersop", body: "hEllo wOrld!" };
    return request(app)
    .post("/api/articles/notAnId/comments")
    .send(input)
    .expect(400)
    .then(({ body }) => {
      expect(body.msg).toBe('bad data format');
    });
  });

  it("404: article not found", () => {
    const input = { username: "rogersop", body: "hEllo wOrld!" };
    return request(app)
      .post('/api/articles/999/comments')
      .send(input)
      .expect(404)
      .then(({ body }) => {
          expect(body.msg).toBe('article not found');
      })
  });

  it("400: bad username or user does not exist", () => {
    const input = { username: "rogerfederer", body: "hEllo wOrld!" };
    return request(app)
      .post('/api/articles/2/comments')
      .send(input)
      .expect(400)
      .then(({ body }) => {
          expect(body.msg).toBe('invalid information provided');
      })
  });

  it("400: missing comment body", () => {
    const input = { username: "rogersop" };
    return request(app)
      .post('/api/articles/2/comments')
      .send(input)
      .expect(400)
      .then(({ body }) => {
          expect(body.msg).toBe('missing required information');
      })
  });
});
