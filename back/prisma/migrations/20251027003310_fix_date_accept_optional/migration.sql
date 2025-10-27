/*
  Warnings:

  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "date_accept" DROP NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
