import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Student } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { getStudentPortraitSrc } from "@/lib/visual-assets";

type StudentAvatarProps = {
  student: Pick<Student, "id" | "name" | "initials">;
  className?: string;
  imageClassName?: string;
};

export function StudentAvatar({ student, className, imageClassName }: StudentAvatarProps) {
  return (
    <Avatar className={cn("bg-ink-100 ring-1 ring-ink-200", className)}>
      <AvatarImage
        src={getStudentPortraitSrc(student.id)}
        alt={`${student.name} profile portrait`}
        className={cn("object-cover", imageClassName)}
      />
      <AvatarFallback className="font-bold text-ink-700">{student.initials}</AvatarFallback>
    </Avatar>
  );
}
