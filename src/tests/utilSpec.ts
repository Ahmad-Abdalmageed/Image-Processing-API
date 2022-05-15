import fs from 'fs';
import { pipeline, thumbsDir } from '../Controllers/utils';
import path from 'path';

describe('Image Processing API Processing Function Testing', () => {
  it('Image is Correctly Processed', async () => {
    const newName = await pipeline('557155.png', 500, 500, 180, 1);
    expect(newName).toBe('557155_500x500_180_1.png');
  });

  it('Image is Correctly Saved', async () => {
    const newName = await pipeline('557155.png', 500, 500, 180, 1);
    expect(fs.existsSync(path.join(__dirname, thumbsDir, newName))).toBeTrue();
  });
});
