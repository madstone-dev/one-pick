/*
  Warnings:

  - Added the required column `pick` to the `QuestionComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionComment" ADD COLUMN     "pick" INTEGER NOT NULL;
