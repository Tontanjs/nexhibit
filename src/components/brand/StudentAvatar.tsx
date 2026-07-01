"use client";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Student } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { getStudentIllustrationSrc, getStudentPortraitSrc } from "@/lib/visual-assets";

type StudentAvatarProps = {
  student: Pick<Student, "id" | "name" | "initials" | "photoUrl" | "photoStatus">;
  className?: string;
  imageClassName?: string;
};

export function StudentAvatar({ student, className, imageClassName }: StudentAvatarProps) {
  const portraitSrc = getStudentPortraitSrc(student);
  const fallbackSrc = getStudentIllustrationSrc(student.id);
  const [imageSrc, setImageSrc] = useState(portraitSrc);

  useEffect(() => {
    setImageSrc(portraitSrc);
  }, [portraitSrc]);

  return (
    <Avatar className={cn("bg-ink-100 shadow-sm ring-2 ring-white/80", className)}>
      <AvatarImage
        src={imageSrc}
        alt={`${student.name} profile photo`}
        className={cn("object-cover saturate-[0.98] contrast-[1.02]", imageClassName)}
        onLoadingStatusChange={(status) => {
          if (status === "error" && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
          }
        }}
      />
      <AvatarFallback className="font-bold text-ink-700">{student.initials}</AvatarFallback>
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/45" aria-hidden="true" />
    </Avatar>
  );
}
