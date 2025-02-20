-- CreateTable
CREATE TABLE "User" (
    "userid" TEXT NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "ChapterID" TEXT NOT NULL,
    "ChapterName" TEXT NOT NULL,
    "ChapterNumber" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("ChapterID")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "LessonID" TEXT NOT NULL,
    "LessonName" TEXT NOT NULL,
    "LessonNumber" INTEGER NOT NULL,
    "chapterChapterID" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("LessonID")
);

-- CreateTable
CREATE TABLE "_ChapterToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChapterToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LessonToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LessonToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_ChapterToUser_B_index" ON "_ChapterToUser"("B");

-- CreateIndex
CREATE INDEX "_LessonToUser_B_index" ON "_LessonToUser"("B");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_chapterChapterID_fkey" FOREIGN KEY ("chapterChapterID") REFERENCES "Chapter"("ChapterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToUser" ADD CONSTRAINT "_ChapterToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Chapter"("ChapterID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChapterToUser" ADD CONSTRAINT "_ChapterToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToUser" ADD CONSTRAINT "_LessonToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Lesson"("LessonID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LessonToUser" ADD CONSTRAINT "_LessonToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;
