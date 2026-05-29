# 🚀 NEXHIBIT — Build Execution Guide

> อ่านไฟล์นี้ก่อนเสมอ แล้วทำตามลำดับ Module

---

## ⚡ Quick Reference

**Project folder:** `~/Desktop/nexhibit`
**GitHub:** https://github.com/Tontanjs/nexhibit
**Vercel:** https://nexhibit-nine.vercel.app (จะเป็น URL หลักหลัง deploy)

---

## 📋 ลำดับการรัน Module (สำคัญมาก ห้ามข้าม)

| ลำดับ | Module | Tool | Prompt File | เวลา |
|---|---|---|---|---|
| 1 | M1 — Foundation + Marketing | Claude Code | `PROMPT-M1.md` | 2-3 ชม. |
| 2 | M2A — Student Core Flows | Claude Code | `PROMPT-M2A.md` | 2-3 ชม. |
| 3 | M2B — Student Misc Pages | Codex CLI | `PROMPT-M2B-codex.md` | 1 ชม. |
| 4 | M3 — Employer Flow | Codex CLI | `PROMPT-M3-codex.md` | 2 ชม. |
| 5 | M4 — Admin + Polish + Deploy | Claude Code | `PROMPT-M4.md` | 2 ชม. |

**สำคัญ:** ก่อนรัน Module ถัดไป ต้องเช็คว่า Module ก่อนหน้าเสร็จและ commit ขึ้น GitHub แล้ว

---

## 🔧 Git Workflow (Cheatsheet)

### หลังจบแต่ละ Module ให้รันคำสั่งนี้ใน Terminal

```bash
# เข้า folder (ถ้ายังไม่อยู่)
cd ~/Desktop/nexhibit

# ดูว่าไฟล์อะไรเปลี่ยนบ้าง
git status

# เพิ่มทุกไฟล์ที่เปลี่ยน
git add .

# Commit พร้อมข้อความ
git commit -m "Module 1: Foundation + Marketing pages"

# Push ขึ้น GitHub (Vercel จะ deploy อัตโนมัติ)
git push
```

**เปลี่ยน message แต่ละ module:**
- M1: `"Module 1: Foundation + Marketing pages"`
- M2A: `"Module 2A: Student core flows"`
- M2B: `"Module 2B: Student misc pages"`
- M3: `"Module 3: Employer flow"`
- M4: `"Module 4: Admin + polish + final"`

### ครั้งแรกเท่านั้น — ตั้งค่า git identity

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### ถ้า push ครั้งแรกขอ authentication

GitHub จะขอ Personal Access Token (PAT) — ไม่ใช่ password ปกติ

1. ไป https://github.com/settings/tokens/new
2. **Note:** `nexhibit-mac`
3. **Expiration:** 30 days
4. **Scopes:** ติ๊ก ✅ `repo` (อันบนสุด)
5. คลิก **Generate token** → **copy token เก็บไว้**
6. กลับ Terminal — ตอน push มันถาม username = `Tontanjs`, password = paste token นั้น

Mac จะจำให้ครั้งต่อไป

---

## ✅ QA Checklist (เช็คหลังแต่ละ Module)

### หลัง M1 (Foundation):
- [ ] เปิด live URL บน Vercel ได้
- [ ] Landing page มี hero section + 3 step cards + comparison + stats + CTA
- [ ] /login, /signup, /about ทำงานได้
- [ ] Mobile view ที่ 375px (iPhone) ไม่มี horizontal scroll
- [ ] Logo + brand colors สม่ำเสมอ
- [ ] ไม่มี Lorem Ipsum, ไม่มี placeholder text
- [ ] กดทุกปุ่มไม่มี error

### หลัง M2A (Student Core):
- [ ] /student/onboarding มี privacy controls (toggle field by field)
- [ ] /student/profile มี 3 tabs (Personal/Academic/Portfolio)
- [ ] Profile builder กดทุกอย่างได้
- [ ] /student/events แสดง 4 events
- [ ] /student/events/[id] เปิดได้, กด book slot ได้
- [ ] Booking confirmation popup

### หลัง M2B (Student Misc):
- [ ] /student/event-day แสดง QR badge mockup
- [ ] /student/dashboard แสดง stats + Who viewed me
- [ ] /student/messages มี chat UI
- [ ] /student/settings มี privacy + account sections

### หลัง M3 (Employer):
- [ ] /employer/dashboard มี overview cards
- [ ] /employer/browse แสดง 12 students + filter ทำงาน
- [ ] /employer/student/[id] แสดง profile detail
- [ ] /employer/scanner มี QR scanner UI
- [ ] /employer/shortlist แสดงรายชื่อที่ save
- [ ] /employer/messages มี chat

### หลัง M4 (Final):
- [ ] /admin มี dashboard + charts
- [ ] /success-stories แสดง 4 stories
- [ ] /404 page สวย
- [ ] ทุกหน้า responsive ที่ 375 / 768 / 1280
- [ ] ไม่มี console error
- [ ] Vercel deployment ล่าสุด "Ready"
- [ ] กดเปิดบนมือถือจริงได้ลื่น

---

## 🚨 ถ้าเจอปัญหา

### Vercel deploy fail
1. ไป https://vercel.com/teeradet-s-projects/nexhibit/deployments
2. ดู deployment ล่าสุด → คลิก → ดู **Build Logs**
3. หา error message สีแดง → copy → ส่งให้ Claude Code แก้

### Localhost ไม่ขึ้น
```bash
cd ~/Desktop/nexhibit
npm run dev
```
ถ้า error: `npm install` ก่อน

### Push ไม่ขึ้น
```bash
git pull
git push
```

### หลง commit ผิด อยาก undo
```bash
git reset --soft HEAD~1
```

---

## 📞 ลำดับการช่วยเหลือ

1. ลองดู error ใน Terminal/Browser console ก่อน
2. ถ้าไม่เข้าใจ → copy error ส่งให้ Claude Code แก้
3. ถ้ายังไม่ได้ → กลับมาคุย Claude (เรา) ในแชทนี้
