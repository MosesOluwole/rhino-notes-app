import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Note } from '../../domain/note.entity';
import { NoteService } from '../../application/services/note.service';
import { NoteRepository } from '../repository/note.repository';
import { NotesController } from '../../presentation/controllers/notes.controller';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Note] })],
  controllers: [NotesController],
  providers: [NoteService, NoteRepository, RedisService],
})
export class NotesModule {}
