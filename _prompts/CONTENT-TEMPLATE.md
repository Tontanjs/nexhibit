# 📝 CONTENT TEMPLATE — เติมข้อมูลจริงตรงนี้

> เปิดไฟล์นี้ใน Google Docs / Notion ก็ได้ — เติมให้ครบ แล้วใช้แทน placeholder ในตอน build M1

---

## 1. Team Information

```
ชื่อสมาชิกทีม:
1. ___________________ (Role: ___________________)
2. ___________________ (Role: ___________________)
3. ___________________ (Role: ___________________)
4. ___________________ (Role: ___________________)

ชื่อวิชา: ___________________
อาจารย์ผู้สอน: ___________________
ภาคเรียน: Spring 2026
มหาวิทยาลัย: Zhejiang University of Technology
วันนำเสนอ: June 5, 2026
```

---

## 2. Interview Quotes (เลือก 3-5 ที่ดีที่สุด)

**กฎ:**
- สั้น ≤ 15 คำ ภาษาอังกฤษ
- มี emotion ชัด
- ต่างกันแต่ละ quote
- ระบุ code, สัญชาติ, ปี, สาขา

### Format

```
Quote 1: "_______________________________________________"
         — P1, [Nationality], Year [N] [Major]
         Mood: frustrated / hopeful

Quote 2: "_______________________________________________"
         — P_, ___________, Year _ ___________
         Mood: ____________

Quote 3: "_______________________________________________"
         — P_, ___________, Year _ ___________
         Mood: ____________

Quote 4: "_______________________________________________"
         — P_, ___________, Year _ ___________
         Mood: ____________

Quote 5: "_______________________________________________"
         — P_, ___________, Year _ ___________
         Mood: ____________
```

### ตัวอย่าง (จาก template ที่ผมเตรียมไว้ — เปลี่ยนได้)

```
Quote 1: "I sent 30 resumes. Zero replies."
         — P2, Vietnamese, Year 4 Engineering
         Mood: frustrated

Quote 2: "My Chinese is not perfect — but my skills are real."
         — P3, Pakistani, Year 3 Software Engineering
         Mood: frustrated

Quote 3: "No one ever sees the work I'm most proud of."
         — P1, Thai, Year 4 Business
         Mood: frustrated

Quote 4: "Finally — somewhere my work gets seen."
         — P4, Indonesian, Year 3 Engineering
         Mood: hopeful

Quote 5: "I'd use it. Hundred percent."
         — P5, Mongolian, Year 4 Language
         Mood: hopeful
```

---

## 3. Interview Synthesis (สำคัญสำหรับ slide deck)

### Demographics ของ 5 คนที่สัมภาษณ์

| Code | Origin | Year | Major | Status |
|---|---|---|---|---|
| P1 | _______ | _ | _______ | Looking for internship |
| P2 | _______ | _ | _______ | Applying full-time |
| P3 | _______ | _ | _______ | Not started |
| P4 | _______ | _ | _______ | _______ |
| P5 | _______ | _ | _______ | _______ |

### Key Insights ที่พบ (3-5 ข้อ)

1. **Insight 1:** _______________________________________________
   - Evidence quote: P_, "_______"

2. **Insight 2:** _______________________________________________
   - Evidence quote: P_, "_______"

3. **Insight 3:** _______________________________________________
   - Evidence quote: P_, "_______"

4. **Surprising insight** (สิ่งที่ไม่คาดมาก่อน):
   _______________________________________________

---

## 4. Real Statistics ที่ต้องหา

### A. ZJUT International Students

ค้นจาก:
- https://www.zjut.edu.cn/en/ (เว็บมหาวิทยาลัย — มี International Students section)
- หรือ China MOE statistics: http://www.moe.gov.cn

```
จำนวน international students ที่ ZJUT (ปีล่าสุดที่มี data):
____________________ คน

จำนวนประเทศที่นักศึกษามาจาก:
____________________ ประเทศ

แหล่งข้อมูล: ____________________
```

### B. Job Market Statistics (ถ้าหาได้)

```
% นักศึกษาต่างชาติที่หางานในจีนได้หลังเรียนจบ:
____________________% (source: ____________________)

ระยะเวลาเฉลี่ยจาก graduate → first job:
____________________ เดือน

ปัญหาหลักที่ international students พบ (จากงานวิจัย):
____________________
```

**ถ้าหาไม่ได้:** ใช้ placeholder ที่ผมตั้งไว้ใน mock data ก่อน แก้ทีหลังได้

---

## 5. Mock Data Customization (Optional)

ใน M1, Claude Code จะ generate 12 students และ 8 employers อัตโนมัติ แต่ถ้าคุณอยากให้บางคน "match กับ interviewees จริง" (เพื่อเล่าเรื่องได้ดีขึ้น) ให้เติมข้อมูลที่นี่:

### Student profiles ที่อยากให้สะท้อน interviewees

```
Student 1 (สะท้อน P1):
- Name (สมมุติ): ____________________
- Nationality: ____________________
- Year: __
- Major: ____________________
- Skills: ____________________
- 1 project: ____________________

Student 2 (สะท้อน P2):
- Name (สมมุติ): ____________________
- Nationality: ____________________
- Year: __
- Major: ____________________
- Skills: ____________________
- 1 project: ____________________

(repeat for P3-P5 if desired)
```

> **คำเตือน:** ใช้ชื่อสมมุติ! อย่าใช้ชื่อจริงของ interviewees — ผิดจริยธรรมวิจัย

---

## 6. Featured Employers (ถ้ามีรายชื่อบริษัทเฉพาะที่อยากใส่)

ถ้ามีบริษัทเฉพาะที่อยากให้แสดงใน mock data (เช่น บริษัทที่นักศึกษา ZJUT มักได้ทำงาน) ระบุที่นี่:

```
Featured Employer 1:
- ชื่อ: ____________________
- Industry: ____________________
- ทำไมมีในระบบ: ____________________

Featured Employer 2:
- ชื่อ: ____________________
- Industry: ____________________
- ทำไมมีในระบบ: ____________________
```

ถ้าไม่ระบุ Claude Code จะใช้รายชื่อ default (Alibaba Cloud, Bosch China, BYD International, ฯลฯ)

---

## 7. Competitive References

ถ้าจะเปรียบเทียบกับคู่แข่ง ในสไลด์ Define/Competitive ระบุที่นี่:

```
Existing platforms ที่คล้าย (เพื่อเปรียบเทียบ):
1. ____________________ (พบที่: ____________________)
2. ____________________ (พบที่: ____________________)
3. ____________________ (พบที่: ____________________)

จุดที่ NEXHIBIT ต่าง:
- ____________________
- ____________________
- ____________________
```

ตัวอย่าง (ถ้านึกไม่ออก):
- LinkedIn — global, no university verification
- BOSS Zhipin — Chinese students focus, language-heavy
- Trinity College Dublin Reverse Career Fair (real precedent, EU only)

---

## 8. Presentation-Ready Story Hooks (เก็บไว้ใช้เปิด slide)

จาก interview + insight สรุปเป็น "hook" 1-2 ประโยคที่ใช้เปิดสไลด์ได้:

```
Hook 1: ____________________ (ใช้เปิด presentation)
Hook 2: ____________________ (ใช้ปิด presentation)
```

ตัวอย่างที่ใช้ได้:
- Hook 1: "We asked 5 international students one question — and got the same answer 5 times."
- Hook 2: "International students don't want to be hired. They want to be seen — working."

---

## ✅ Checklist — เติมเสร็จเมื่อ:

- [ ] Team info ครบ 4 คน
- [ ] 5 quotes ระบุ source ครบ
- [ ] Interview demographics 5 คน ครบ
- [ ] 3-5 key insights มีหลักฐาน
- [ ] Stats real หรือ placeholder ตกลงแล้ว
- [ ] Story hooks สำรอง 2 อัน

**เมื่อ checklist ครบ → ส่งให้ทีมเพื่อ review → พร้อมใช้ใน slide deck (Phase 3)**
