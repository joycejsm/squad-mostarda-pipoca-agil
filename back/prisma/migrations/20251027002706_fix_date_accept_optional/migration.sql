-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "accept_lgpd" SET DEFAULT false,
ALTER COLUMN "updated_at" DROP NOT NULL;
