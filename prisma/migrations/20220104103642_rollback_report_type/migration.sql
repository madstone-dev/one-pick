/*
  Warnings:

  - You are about to drop the column `content` on the `QuestionCommentReport` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `QuestionReport` table. All the data in the column will be lost.
  - Added the required column `type` to the `QuestionCommentReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `QuestionReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionCommentReport" DROP COLUMN "content",
ADD COLUMN     "type" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "QuestionReport" DROP COLUMN "content",
ADD COLUMN     "type" INTEGER NOT NULL;
