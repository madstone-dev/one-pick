-- DropForeignKey
ALTER TABLE "QuestionBlock" DROP CONSTRAINT "QuestionBlock_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionCommentBlock" DROP CONSTRAINT "QuestionCommentBlock_questionCommentId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionCommentReport" DROP CONSTRAINT "QuestionCommentReport_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionReport" DROP CONSTRAINT "QuestionReport_userId_fkey";

-- AddForeignKey
ALTER TABLE "QuestionBlock" ADD CONSTRAINT "QuestionBlock_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionReport" ADD CONSTRAINT "QuestionReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionCommentBlock" ADD CONSTRAINT "QuestionCommentBlock_questionCommentId_fkey" FOREIGN KEY ("questionCommentId") REFERENCES "QuestionComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionCommentReport" ADD CONSTRAINT "QuestionCommentReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
