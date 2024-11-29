// src/__tests__/text.controller.test.ts
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index';
import Text from '../models/Text';
import { TextAnalyzerService } from '../services/textAnalyzer.service';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Setup MongoDB Memory Server
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect('mongodb://localhost:27017/text_analyzer');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the database before each test
  await Text.deleteMany({});
});

describe('Text Controller Tests', () => {
  const mockUserEmail = 'test@example.com';
  const mockText = {
    title: 'Test Title',
    content: 'This is a test content.',
    userEmail: mockUserEmail
  };

  describe('POST /api/texts', () => {
    it('should create a new text', async () => {
      const response = await request(app)
        .post('/api/texts')
        .send(mockText);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(mockText.title);
      expect(response.body.content).toBe(mockText.content);
      expect(response.body.userEmail).toBe(mockText.userEmail);
      expect(response.body.analysis).toBeDefined();
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/texts')
        .send({ content: mockText.content, userEmail: mockText.userEmail });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Title and content are required');
    });
  });

  describe('GET /api/texts', () => {
    beforeEach(async () => {
      await Text.create([
        { ...mockText },
        { ...mockText, title: 'Second Text' },
        { ...mockText, title: 'Third Text' },
      ]);
    });

    it('should get all texts for a user', async () => {
      const response = await request(app)
        .get('/api/texts')
        .query({ userEmail: mockUserEmail });

      expect(response.status).toBe(200);
      expect(response.body.texts).toHaveLength(3);
      expect(response.body.pagination).toBeDefined();
    });

    it('should paginate results correctly', async () => {
      const response = await request(app)
        .get('/api/texts')
        .query({ userEmail: mockUserEmail, page: 1, limit: 2 });

      expect(response.status).toBe(200);
      expect(response.body.texts).toHaveLength(2);
      expect(response.body.pagination.total).toBe(3);
    });
  });

  describe('POST /api/texts/get-details', () => {
    let createdText: any;

    beforeEach(async () => {
      createdText = await Text.create(mockText);
    });

    it('should get a specific text', async () => {
      const response = await request(app)
        .post('/api/texts/get-details')
        .send({ id: createdText._id, userEmail: mockUserEmail });

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(createdText._id.toString());
      expect(response.body.title).toBe(mockText.title);
    });

    it('should return 404 for non-existent text', async () => {
      const response = await request(app)
        .post('/api/texts/get-details')
        .send({ id: new mongoose.Types.ObjectId(), userEmail: mockUserEmail });

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/texts', () => {
    let createdText: any;

    beforeEach(async () => {
      createdText = await Text.create(mockText);
    });

    it('should update a text', async () => {
      const updatedContent = 'Updated content';
      const response = await request(app)
        .put('/api/texts')
        .send({
          id: createdText._id,
          userEmail: mockUserEmail,
          title: mockText.title,
          content: updatedContent
        });

      expect(response.status).toBe(200);
      expect(response.body.content).toBe(updatedContent);
    });
  });

  describe('DELETE /api/texts', () => {
    let createdText: any;

    beforeEach(async () => {
      createdText = await Text.create(mockText);
    });

    it('should delete a text', async () => {
      const response = await request(app)
        .delete('/api/texts')
        .send({ id: createdText._id, userEmail: mockUserEmail });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Text deleted successfully');

      const deletedText = await Text.findById(createdText._id);
      expect(deletedText).toBeNull();
    });
  });

  describe('GET /api/texts/stats', () => {
    beforeEach(async () => {
      await Text.create([
        mockText,
        mockText,
        mockText
      ]);
    });

    it('should get text statistics', async () => {
      const response = await request(app)
        .get('/api/texts/stats')
        .query({ userEmail: mockUserEmail });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('totalTexts');
      expect(response.body).toHaveProperty('avgWordCount');
      expect(response.body).toHaveProperty('totalWords');
    });
  });
});