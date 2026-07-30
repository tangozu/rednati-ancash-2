import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_image_optimizer_status" AS ENUM('complete', 'error');
  ALTER TYPE "public"."enum_payload_jobs_log_task_slug" ADD VALUE 'imageOptimizer_regenerateDocument' BEFORE 'schedulePublish';
  ALTER TYPE "public"."enum_payload_jobs_task_slug" ADD VALUE 'imageOptimizer_regenerateDocument' BEFORE 'schedulePublish';
  CREATE TABLE "image_optimizer_state" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collections" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "media" ADD COLUMN "image_optimizer_thumb_hash" varchar;
  ALTER TABLE "media" ADD COLUMN "image_optimizer_original_size" numeric;
  ALTER TABLE "media" ADD COLUMN "image_optimizer_optimized_size" numeric;
  ALTER TABLE "media" ADD COLUMN "image_optimizer_status" "enum_media_image_optimizer_status";
  ALTER TABLE "media" ADD COLUMN "image_optimizer_error" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "image_optimizer_state" CASCADE;
  ALTER TABLE "payload_jobs_log" ALTER COLUMN "task_slug" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  ALTER TABLE "payload_jobs_log" ALTER COLUMN "task_slug" SET DATA TYPE "public"."enum_payload_jobs_log_task_slug" USING "task_slug"::"public"."enum_payload_jobs_log_task_slug";
  ALTER TABLE "payload_jobs" ALTER COLUMN "task_slug" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  ALTER TABLE "payload_jobs" ALTER COLUMN "task_slug" SET DATA TYPE "public"."enum_payload_jobs_task_slug" USING "task_slug"::"public"."enum_payload_jobs_task_slug";
  ALTER TABLE "media" DROP COLUMN "image_optimizer_thumb_hash";
  ALTER TABLE "media" DROP COLUMN "image_optimizer_original_size";
  ALTER TABLE "media" DROP COLUMN "image_optimizer_optimized_size";
  ALTER TABLE "media" DROP COLUMN "image_optimizer_status";
  ALTER TABLE "media" DROP COLUMN "image_optimizer_error";
  DROP TYPE "public"."enum_media_image_optimizer_status";`)
}
