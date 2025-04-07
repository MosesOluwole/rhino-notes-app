import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { Note } from '../../domain/note.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectRepository(Note)
    private readonly repo: EntityRepository<Note>,
    private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.repo.findAll();
  }
  async findById(id: number): Promise<Note | null> {
    return this.repo.findOne({ id });
  }

  async create(note: Note): Promise<Note> {
    await this.em.persistAndFlush(note);
    return note;
  }

  async delete(id: number): Promise<void> {
    await this.repo.nativeDelete({ id });
  }
}
