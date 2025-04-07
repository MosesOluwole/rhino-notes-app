import { Injectable, Inject } from '@nestjs/common';
import { Note } from '../../domain/note.entity';
import { NoteRepository } from '../../infrastructure/repository/note.repository';
import { RedisService } from '../../infrastructure/redis/redis.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class NoteService {
  private readonly cacheKey = 'notes_cache';

  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly redisService: RedisService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getNotes(): Promise<Note[]> {
    const cachedNotes = await this.cacheManager.get<Note[]>(this.cacheKey);
    if (cachedNotes && cachedNotes.length > 0) {
      return cachedNotes;
    }

    const notes = await this.noteRepository.findAll();
    await this.cacheManager.set(this.cacheKey, notes, 60);
    return notes;
  }

  async getNoteById(id: number): Promise<Note | null> {
    const cachedNote = await this.cacheManager.get<Note>(
      `${this.cacheKey}_${id}`,
    );
    if (cachedNote) {
      return cachedNote;
    }

    const note = await this.noteRepository.findById(id);
    if (note) {
      await this.cacheManager.set(`${this.cacheKey}_${id}`, note, 60);
    }
    return note;
  }

  async createNote(content: string): Promise<Note> {
    const note = new Note(content);
    const savedNote = await this.noteRepository.create(note);
    await this.cacheManager.del(this.cacheKey);
    return savedNote;
  }

  async deleteNote(id: number): Promise<void> {
    await this.noteRepository.delete(id);

    await this.cacheManager.del(this.cacheKey);
  }
}
