import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMoviesAndGenres1729462756032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tmdbId" integer NOT NULL, CONSTRAINT "PK_genre_id" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "releaseDate" date NOT NULL, "averageRating" double precision NOT NULL, "tmdbId" integer NOT NULL, CONSTRAINT PK_movie_id PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_genre" ("movie_id" integer NOT NULL, "genre_id" integer NOT NULL, CONSTRAINT "PK_movie_genre_id" PRIMARY KEY ("movie_id", "genre_id"))`,
    );

    await queryRunner.query(`CREATE INDEX "IDX_movie_genre_movie_id" ON "movie_genre" ("movie_id") `);
    await queryRunner.query(` CREATE INDEX "IDX_movie_genre_genre_id" ON "movie_genre" ("genre_id") `);
    await queryRunner.query(
      `ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_movie_genre_movie_id" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_movie_genre_genre_id" FOREIGN KEY ("genre_id") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_movie_genre_genre_id"`);
    await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_movie_genre_movie_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_movie_genre_genre_id"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_movie_genre_movie_id"`);
    await queryRunner.query(`DROP TABLE "movie_genre"`);

    await queryRunner.query(`DROP TABLE "movie"`);

    await queryRunner.query(`DROP TABLE "genre"`);
  }
}
