-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "social" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT E'user',
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBlock" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "blockId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "genre" TEXT NOT NULL,
    "image" TEXT,
    "content" TEXT NOT NULL,
    "choice" TEXT[],
    "answer" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizHashtag" (
    "id" SERIAL NOT NULL,
    "hashtag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizHashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizTry" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "quizId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizTry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WinnersOnQuizs" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WinnersOnQuizs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizLike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizBlock" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizReport" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizComment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizCommentBlock" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizCommentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizCommentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizCommentReport" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizCommentId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizCommentReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuizToQuizHashtag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "QuizHashtag_hashtag_key" ON "QuizHashtag"("hashtag");

-- CreateIndex
CREATE UNIQUE INDEX "WinnersOnQuizs_quizId_userId_key" ON "WinnersOnQuizs"("quizId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizLike_quizId_userId_key" ON "QuizLike"("quizId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizBlock_quizId_userId_key" ON "QuizBlock"("quizId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizReport_quizId_userId_key" ON "QuizReport"("quizId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizCommentBlock_userId_quizCommentId_key" ON "QuizCommentBlock"("userId", "quizCommentId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizCommentReport_userId_quizCommentId_key" ON "QuizCommentReport"("userId", "quizCommentId");

-- CreateIndex
CREATE UNIQUE INDEX "_QuizToQuizHashtag_AB_unique" ON "_QuizToQuizHashtag"("A", "B");

-- CreateIndex
CREATE INDEX "_QuizToQuizHashtag_B_index" ON "_QuizToQuizHashtag"("B");

-- AddForeignKey
ALTER TABLE "UserBlock" ADD CONSTRAINT "UserBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizTry" ADD CONSTRAINT "QuizTry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizTry" ADD CONSTRAINT "QuizTry_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WinnersOnQuizs" ADD CONSTRAINT "WinnersOnQuizs_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WinnersOnQuizs" ADD CONSTRAINT "WinnersOnQuizs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizLike" ADD CONSTRAINT "QuizLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizLike" ADD CONSTRAINT "QuizLike_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizBlock" ADD CONSTRAINT "QuizBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizBlock" ADD CONSTRAINT "QuizBlock_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizReport" ADD CONSTRAINT "QuizReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizReport" ADD CONSTRAINT "QuizReport_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizComment" ADD CONSTRAINT "QuizComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizComment" ADD CONSTRAINT "QuizComment_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizCommentBlock" ADD CONSTRAINT "QuizCommentBlock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizCommentBlock" ADD CONSTRAINT "QuizCommentBlock_quizCommentId_fkey" FOREIGN KEY ("quizCommentId") REFERENCES "QuizComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizCommentReport" ADD CONSTRAINT "QuizCommentReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizCommentReport" ADD CONSTRAINT "QuizCommentReport_quizCommentId_fkey" FOREIGN KEY ("quizCommentId") REFERENCES "QuizComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizToQuizHashtag" ADD FOREIGN KEY ("A") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizToQuizHashtag" ADD FOREIGN KEY ("B") REFERENCES "QuizHashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
