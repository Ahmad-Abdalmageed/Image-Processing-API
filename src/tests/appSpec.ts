import supertest from 'supertest';
import { app } from '../app';
import * as fs from 'fs';
const request = supertest(app);

describe('Image Processing API EndPoint Testing', () => {
  const filename = '557155.png';
  it('Endpoint Get Response OK ', async () => {
    console.log(`/api/v1/images/${filename}`);
    const response = await request.get(`/api/v1/images/?filename=${filename}`);
    expect(response.status).toBe(200);
  });
  it('Endpoint Get Response Internal Error', async () => {
    const response = await request.get('/api/v1/images/?filename=55155.png');
    expect(response.status).toBe(500);
  });

  it('Endpoint Returns Error with No Filename', async () => {
    const response = await request.get(`/api/v1/images`);
    expect(response.status).toBe(500);
  });
  it('Endpoint Saves Output to Thumbs with correct name', async () => {
    await request.get(
      '/api/v1/images/?width=500&height=200&rotate=180&blur=3&format=jpeg&filename=557155.png'
    );
    const filename = 'assets/thumbs/557155_500x200_rot_blur.jpeg';
    expect(fs.existsSync(filename)).toBeTrue();
  });
});
