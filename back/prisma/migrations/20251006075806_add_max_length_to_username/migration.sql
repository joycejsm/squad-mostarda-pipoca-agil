/*
  Warnings:

  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(144)`.

*/
-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "username" SET DATA TYPE VARCHAR(144);
