import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

export const getCourse = async (id: string) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: { id },
  });
  if (!course) {
    notFound();
  }
  return course;
};
