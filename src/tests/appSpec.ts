import supertest from 'supertest';
import { app } from '../app';
const request = supertest(app);

describe('Image Processing API EndPoint Testing', () => {
  const filename = '557155.png';

  it('Correct Request to Server is OK', async () => {
    const response = await request.get(`/api/v1/images/?filename=${filename}`);
    expect(response.status).toBe(200);
  });

  it('Non-Existing Request is OK', async () => {
    const response = await request.get(`/api/v1/`);
    expect(response.status).toBe(404);
  });

  it('Passing Wrong/Non Existent Image Return Not Found', async () => {
    const wrongName = await request.get('/api/v1/images/?filename=55155.png');
    const noName = await request.get('/api/v1/images/');
    console.log(wrongName.status);
    console.log(noName.status);
    expect(noName.status == 404 && wrongName.status == 404).toBeTrue();
  });
});
