/*
  Warnings:

  - Made the column `image` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "image" SET NOT NULL;
