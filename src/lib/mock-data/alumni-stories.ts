export type AlumniStory = {
  id: string;
  title: string;
  author: string;
  initials: string;
  summary: string;
  markdown: string;
};

export const alumniStories: AlumniStory[] = [
  {
    id: "story-001",
    title: "From campus translator to cloud support intern",
    author: "Linh Tran",
    initials: "LT",
    summary: "How a bilingual student turned daily translation work into a product-support portfolio.",
    markdown:
      "Linh arrived at ZJUT with strong English and beginner Mandarin. Her first useful portfolio did not begin as a class project. It came from helping classmates translate dorm notices, scholarship reminders, and appointment instructions.\n\nShe started writing down repeat questions and turned them into a small bilingual support guide. During a reverse fair booth session, she framed the project as customer support research instead of volunteer work. Employers understood the signal immediately: she could notice recurring user problems, organize them, and explain them clearly across languages.\n\nHer advice is simple: do not hide cross-cultural work because it feels informal. If it required judgment, communication, and consistency, it can become evidence. Show the situation, the people affected, what you changed, and what became easier afterward.",
  },
  {
    id: "story-002",
    title: "A robotics demo that became an operations role",
    author: "Ahmed Hassan",
    initials: "AH",
    summary: "A small hardware prototype became more valuable once the student documented the process.",
    markdown:
      "Ahmed built a sorting-arm demo for a lab presentation, but the prototype alone did not win employer interest. The turning point was the build log. He documented failed sensor positions, part changes, safety checks, and the Mandarin terms he learned while asking lab staff for help.\n\nA manufacturing employer cared less about whether the arm was perfect and more about how he approached uncertainty. The log showed he could work with incomplete instructions, ask specific questions, and leave useful notes for the next person.\n\nIn interviews, Ahmed now brings a one-page process summary with each project. He explains the problem, the constraints, the test method, and the next improvement. That habit helped employers see him as someone who could join a real operations team, not only a student who finished an assignment.",
  },
  {
    id: "story-003",
    title: "Turning regional insight into product research",
    author: "Priya Raman",
    initials: "PR",
    summary: "A student used interviews with international classmates to show product judgment.",
    markdown:
      "Priya wanted a product role but did not have a famous internship. She began with something nearby: how international students chose payment apps, delivery platforms, and campus services in China. She interviewed classmates from different regions and noticed that trust signals changed by language background.\n\nHer portfolio focused on decisions, not decoration. She showed which questions she asked, where answers conflicted, and how she would change onboarding copy for different users. At the fair, this made her booth feel like a research station rather than a resume table.\n\nHer first mentor told her that cross-cultural confusion is often product data. Priya now encourages students to treat their own adaptation process as research material, as long as they describe it with respect and avoid broad stereotypes.",
  },
  {
    id: "story-004",
    title: "Learning to answer visa questions with confidence",
    author: "Sofia Martinez",
    initials: "SM",
    summary: "A business student prepared a clear work-authorization explanation before interviews.",
    markdown:
      "Sofia used to feel nervous when employers asked about work authorization. She answered vaguely, which made the conversation more tense. A career advisor helped her prepare a short, accurate explanation of what she could do as a student, what required employer support, and what timeline she expected after graduation.\n\nShe added the same information to her profile in a calm reference-only format. Employers still had to do their own checks, but the conversation changed. Instead of guessing, they could ask focused follow-up questions.\n\nSofia says international students should not pretend paperwork is simple. Clear context builds trust. Her strongest interviews happened when she paired that clarity with examples of market research and bilingual customer work.",
  },
];
