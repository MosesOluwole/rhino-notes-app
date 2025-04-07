import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Note {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
