const request = require('supertest');
const express = require('express');
const app = require('./server'); // Make sure server.js exports your app

describe('GET /midi', () => {
  it('should return MIDI note data', async () => {
    const response = await request(app).get('/midi');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('notes');
    expect(Array.isArray(response.body.notes)).toBe(true);
  });
});
