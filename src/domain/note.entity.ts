import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Note {
  @PrimaryKey()
  id!: number;

  @Property()
  content: string;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  constructor(content: string) {
    this.content = content;
  }
}
