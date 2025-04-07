import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { NoteService } from '../../application/services/note.service';
import { Note } from '../../domain/note.entity';
import { CreateNoteDto } from '../../dto/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async getNotes(): Promise<Note[]> {
    return this.noteService.getNotes();
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string): Promise<Note | null> {
    return this.noteService.getNoteById(Number(id));
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.createNote(createNoteDto.content);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<void> {
    return this.noteService.deleteNote(Number(id));
  }
}
