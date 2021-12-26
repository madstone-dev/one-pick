/*
  Warnings:

  - Added the required column `pick` to the `PickersOnQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PickersOnQuestions" ADD COLUMN     "pick" INTEGER NOT NULL;
