export class GetNoteDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;

  constructor(partial: Partial<GetNoteDto>) {
    Object.assign(this, partial);
  }
}
