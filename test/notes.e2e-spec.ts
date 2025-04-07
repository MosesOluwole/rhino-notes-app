import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Notes API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Apply global validation pipe as in your main.ts
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/notes (GET) should return an empty array initially', async () => {
    await request(app.getHttpServer()).get('/notes').expect(200).expect([]);
  });

  it('/notes (POST) should create a note with title and content', async () => {
    const noteTitle = 'Test Note Title';
    const noteContent = 'This is a test note content.';
    const response = await request(app.getHttpServer())
      .post('/notes')
      .send({ title: noteTitle, content: noteContent })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toEqual(noteTitle);
    expect(response.body.content).toEqual(noteContent);
    expect(response.body).toHaveProperty('createdAt');
  });

  it('/notes (GET) should return an array with at least one note', async () => {
    const response = await request(app.getHttpServer())
      .get('/notes')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/notes/:id (DELETE) should delete a note', async () => {
    // First, create a note to delete
    const noteTitle = 'Note to Delete';
    const noteContent = 'This note will be deleted.';
    const postResponse = await request(app.getHttpServer())
      .post('/notes')
      .send({ title: noteTitle, content: noteContent })
      .expect(201);
    const noteId = postResponse.body.id;

    // Delete the note
    await request(app.getHttpServer()).delete(`/notes/${noteId}`).expect(200);

    // Verify deletion by ensuring the note no longer exists
    const getResponse = await request(app.getHttpServer())
      .get('/notes')
      .expect(200);
    const deletedNote = getResponse.body.find(
      (note: any) => note.id === noteId,
    );
    expect(deletedNote).toBeUndefined();
  });
});
