/*
  Warnings:

  - The primary key for the `_ChapterToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_LessonToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_ChapterToUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_LessonToUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstTime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstTime" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "_ChapterToUser" DROP CONSTRAINT "_ChapterToUser_AB_pkey";

-- AlterTable
ALTER TABLE "_LessonToUser" DROP CONSTRAINT "_LessonToUser_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_ChapterToUser_AB_unique" ON "_ChapterToUser"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_LessonToUser_AB_unique" ON "_LessonToUser"("A", "B");
