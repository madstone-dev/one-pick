/*
  Warnings:

  - You are about to drop the column `type` on the `QuestionCommentReport` table. All the data in the column will be lost.
  - Added the required column `content` to the `QuestionCommentReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionCommentReport" DROP COLUMN "type",
ADD COLUMN     "content" TEXT NOT NULL;
