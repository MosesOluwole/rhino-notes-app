import { Migration } from '@mikro-orm/migrations';

export class Migration20250407163334 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "note" add column "title" varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "note" drop column "title";`);
  }

}
