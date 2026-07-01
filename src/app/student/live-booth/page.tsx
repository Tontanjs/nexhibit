import { LiveBoothClient } from "@/components/student/LiveBoothClient";
import { currentStudent } from "@/lib/current-user";

export default function StudentLiveBoothPage() {
  return <LiveBoothClient student={currentStudent} />;
}
