import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { NoteService } from '../../application/services/note.service';
import { Note } from '../../domain/note.entity';
import { CreateNoteDto } from '../../dto/create-note.dto';
import { GetNoteDto } from 'src/dto/get-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async getNotes(): Promise<Note[]> {
    const notes: Note[] = await this.noteService.getNotes();
    return notes.map(
      (note) =>
        new GetNoteDto({
          id: note.id,
          title: note.title,
          content: note.content,
          createdAt: note.createdAt,
        }),
    );
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string): Promise<Note | null> {
    return this.noteService.getNoteById(Number(id));
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<GetNoteDto> {
    const note = await this.noteService.createNote(
      createNoteDto.title,
      createNoteDto.content,
    );
    return new GetNoteDto({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
    });
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<void> {
    return this.noteService.deleteNote(Number(id));
  }
}
