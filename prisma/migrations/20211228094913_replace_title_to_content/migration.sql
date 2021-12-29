/*
  Warnings:

  - You are about to drop the column `title` on the `QuestionComment` table. All the data in the column will be lost.
  - Added the required column `content` to the `QuestionComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionComment" DROP COLUMN "title",
ADD COLUMN     "content" TEXT NOT NULL;
