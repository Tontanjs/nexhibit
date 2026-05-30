export function getStudentPortraitSrc(studentId: string) {
  return `/assets/students/${studentId}.svg`;
}

export function getEmployerLogoSrc(employerId: string) {
  return `/assets/employers/${employerId}.svg`;
}

export function getEventImageSrc(eventId: string) {
  return `/assets/events/${eventId}.png`;
}
