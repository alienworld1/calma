import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function populateDB() {
  const chapter1 = await prisma.chapter.create({
    data: {
      ChapterNumber: 1,
      ChapterName: 'Searching and Sorting',
    },
  });

  const lesson1 = await prisma.lesson.create({
    data: {
      Chapter: {
        connect: chapter1
      },
      LessonNumber: 1,
      LessonName: 'Linear Search',
    }
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      Chapter: {
        connect: chapter1
      },
      LessonNumber: 2,
      LessonName: 'Binary Search'
    }
  });
}

export default populateDB;