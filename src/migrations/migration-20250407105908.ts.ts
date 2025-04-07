import { Migration } from '@mikro-orm/migrations';

export class Migration20250407105908 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "note" ("id" serial primary key, "content" varchar(255) not null, "created_at" timestamptz not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "note" cascade;`);
  }

}
