import { useState } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --navy:#3b0764;   /* Deep Royal Purple */
  --navy2:#1e0533;  /* Midnight Purple */
  --blue:#5b21b6;   /* Violet Accent */
  --sky:#a78bfa; 
  --gold:#facc15;   /* Golden Yellow */
  --gold2:#fde047;  /* Bright Yellow */
  --cream:#ffffff;  /* Pure White Background */
  --white:#ffffff;
  --gray:#4b5563;
  --light:#f8fafc;
  --mist:#f5f3ff;   /* Soft Lavender Mist */
  --red:#e11d48;    /* Crimson Red */
  --green:#10b981;
}

html.dark-mode {
  --navy:#ffffff; --navy2:#f5f5f5; --blue:#1a4a8a; --sky:#2d7dd2;
  --gold:#d4a837; --gold2:#f0c84a; --cream:#1a1a1a; --white:#000000;
  --gray:#999999; --light:#2a2a2a; --mist:#333333; --red:#c0392b;
  --green:#1a7a4a;
}

body{font-family:'Outfit',sans-serif;background:var(--cream);color:var(--navy);scroll-behavior:smooth;}
img{display:block;max-width:100%;}
a{text-decoration:none;color:inherit;}
button{cursor:pointer;font-family:'Outfit',sans-serif;}
input,select,textarea{font-family:'Outfit',sans-serif;}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(59, 7, 100, 0.95);
  backdrop-filter: blur(10px);
  display:flex;align-items:center;justify-content:space-between;padding:0 60px;height:76px;
  border-bottom: 1px solid rgba(255,255,255,0.05);}
.nav-brand{display:flex;align-items:center;gap:15px;}
.nav-logo-icon{width:40px;height:40px;background:var(--gold);border-radius:0;
  display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:800;color:var(--navy);
  box-shadow: 4px 4px 0 rgba(0,0,0,0.1);}
.nav-brand-text{display:flex;flex-direction:column;line-height:1.2;}
.nav-brand-name{font-family:'Outfit',sans-serif;font-size:1.25rem;font-weight:700;
  color:var(--white);letter-spacing:0.5px;text-transform: uppercase;}
.nav-brand-sub{font-size:0.65rem;font-weight:600;color:var(--gold);text-transform:uppercase;letter-spacing:2.5px;}
.nav-links{display:flex;gap:8px;list-style:none;}
.nav-links li button{background:none;border:none;color:rgba(255,255,255,0.65);
  font-size:0.85rem;font-weight:600;padding:10px 18px;border-radius:0;
  text-transform:uppercase;letter-spacing:1px;transition:all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);}
.nav-links li button:hover,.nav-links li button.active{color:var(--white);background:rgba(255,255,255,0.08);}
.nav-enq{background:var(--gold);color:var(--navy);border:none;padding:12px 28px;
  border-radius:0;font-size:0.85rem;font-weight:800;text-transform:uppercase;
  letter-spacing:1px;transition:all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 6px 6px 0 rgba(0,0,0,0.15);}
.nav-enq:hover{background:var(--white);transform:translateY(-2px);box-shadow: 8px 8px 0 rgba(0,0,0,0.2);}
.theme-toggle{background:none;border:1px solid rgba(255,255,255,0.3);color:var(--white);
  padding:6px 12px;border-radius:0;font-size:1rem;cursor:pointer;}

/* PAGE WRAPPER */
.page{padding-top:68px;min-height:100vh;}
.section{padding:80px 60px;}
.section-alt{background:var(--white);}
.section-dark{background:var(--navy);color:var(--white);}
.section-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:3px;
  color:var(--gold);margin-bottom:10px;}
.section-title{font-family:'Outfit',sans-serif;font-size:clamp(2rem,3.5vw,3rem);
  font-weight:700;line-height:1.1;letter-spacing:-0.5px;margin-bottom:14px;}
.section-sub{font-size:0.95rem;color:var(--gray);font-weight:300;line-height:1.75;max-width:560px;}

/* ── HOME ─────────────────────── */
.hero{
  min-height:calc(100vh - 68px);
  background: radial-gradient(circle at 20% 50%, #5b21b6 0%, #3b0764 60%, #1e0533 100%);
  position:relative;overflow:hidden;
  display:flex;align-items:center;justify-content:space-between;padding:0 80px;
  gap: 40px;
}
.hero-geo{position:absolute;top:0;right:0;bottom:0;width:45%;opacity:0.06;
  background:repeating-linear-gradient(45deg,var(--gold) 0,var(--gold) 1px,transparent 1px,transparent 40px);}
.hero-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  background: var(--gold);
  filter: blur(150px);
  opacity: 0.1;
  border-radius: 0;
  top: 50%;
  right: 10%;
  transform: translate(50%, -50%);
  pointer-events: none;
}
.hero-content{max-width:620px;position:relative;z-index:2;}
.hero-image-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
}
.hero-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
}
.hero-image-card {
  background: #ffffff;
  border: 3.5px solid var(--gold);
  padding: 15px;
  box-shadow: 25px 25px 0 rgba(0,0,0,0.15);
  position: relative;
  z-index: 5;
}
.kural-card {
  margin-top: 25px;
  background: rgba(250, 204, 21, 0.05);
  border: 1px solid var(--gold);
  padding: 18px;
  text-align: center;
  max-width: 100%;
}
.kural-card span {
  display: block;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--white);
  line-height: 1.5;
  letter-spacing: 0.5px;
}
.kural-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  color: var(--gold);
  letter-spacing: 2px;
  margin-bottom: 8px;
  font-weight: 800;
}
.kural-author {
  font-size: 0.7rem;
  color: var(--gold);
  text-align: right;
  margin-top: 10px;
  font-weight: 600;
  opacity: 0.8;
  letter-spacing: 1px;
}
@keyframes heroFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
}
.hero-badge{display:inline-flex;align-items:center;gap:10px;
  background:var(--gold);border:none;
  color:var(--navy);padding:8px 20px;border-radius:0;
  font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:32px;
  box-shadow: 10px 10px 0 rgba(0,0,0,0.15);}
.hero h1{font-family:'Outfit',sans-serif;
  font-size:clamp(2.8rem,5.5vw,4.8rem);font-weight:800;
  color:var(--white);line-height:1.05;letter-spacing:-1.5px;margin-bottom:15px;text-transform:none;}
.hero h1 span{color:var(--gold);}
.hero-tagline{font-size:0.95rem;color:rgba(255,255,255,0.6);
  text-transform:uppercase;letter-spacing:3px;font-weight:300;margin-bottom:24px;}
.hero-desc{font-size:1.05rem;color:rgba(255,255,255,0.72);
  line-height:1.8;font-weight:300;max-width:540px;margin-bottom:40px;}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;}
.btn-gold{background:var(--gold);color:var(--navy);border:none;
  padding:15px 36px;border-radius:0;font-size:0.9rem;font-weight:800;
  text-transform:uppercase;letter-spacing:1px;transition:all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  display:inline-flex;align-items:center;justify-content:center;gap:10px;}
.btn-gold:hover{background:var(--white);color:var(--navy);transform:translateY(-3px);box-shadow: 0 10px 20px rgba(0,0,0,0.2);}
.btn-ghost{background:rgba(255,255,255,0.05);color:var(--white);
  border:1px solid rgba(255,255,255,0.3);padding:15px 36px;border-radius:0;
  font-size:0.9rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;transition:all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  display:inline-flex;align-items:center;justify-content:center;gap:10px;}
.btn-ghost:hover{border-color:var(--white);background:rgba(255,255,255,0.15);transform:translateY(-3px);}
.hero-stats{display:flex;gap:36px;margin-top:52px;padding-top:40px;
  border-top:1px solid rgba(255,255,255,0.1);}
.hstat{display:flex;flex-direction:column;gap:4px;}
.hstat-n{font-family:'Outfit',sans-serif;font-size:2.2rem;font-weight:800;
  color:var(--gold);line-height:1;}
.hstat-l{font-size:0.75rem;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:1px;font-weight:600;}

.home-subjects{padding:100px 60px;background:var(--white);}
.subjects-row{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:56px;}
.subj-card{border:1.5px solid var(--mist);border-radius:0;padding:40px 30px;
  background:var(--white);cursor:pointer;
  position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:flex-start;}
.subj-card::after{content:'';position:absolute;bottom:0;right:0;width:60px;height:60px;
  background:var(--gold);opacity:0.05;clip-path:polygon(100% 0, 100% 100%, 0 100%);}
.subj-card:hover{box-shadow:20px 20px 0 var(--navy);border-color:var(--navy);}
.subj-img-area{width:100%;height:260px;background:var(--white);margin-bottom:28px;
  overflow:hidden;border:1px solid var(--mist);display:flex;align-items:center;justify-content:center;font-size:3.5rem;padding:15px;}
.subj-img-area img{width:100%;height:100%;object-fit:contain;}
.subj-name{font-family:'Outfit',sans-serif;font-size:1.6rem;font-weight:800;margin-bottom:12px;color:var(--navy);text-transform:uppercase;letter-spacing:0.5px;}
.subj-desc{font-size:0.88rem;color:var(--gray);line-height:1.7;margin-bottom:24px;flex-grow:1;}
.subj-grades{display:flex;gap:8px;flex-wrap:wrap;margin-top:auto;}
.grade-chip{font-size:0.75rem;background:var(--mist);color:var(--navy);
  padding:5px 14px;border-radius:0;font-weight:700;letter-spacing:0.5px;
  border:1px solid transparent;transition:all 0.2s;}
.subj-card:hover .grade-chip{background:var(--gold);border-color:var(--gold);}

.home-exam{padding:100px 60px;background:var(--navy);}
.exam-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px;}
.exam-card{border:1.5px solid rgba(255,255,255,0.1);border-radius:0;padding:40px 30px;
  background:rgba(255,255,255,0.02);cursor:pointer;
  position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:flex-start;}
.exam-card::after{content:'';position:absolute;bottom:0;right:0;width:60px;height:60px;
  background:var(--gold);opacity:0.05;clip-path:polygon(100% 0, 100% 100%, 0 100%);}
.exam-card:hover{box-shadow:20px 20px 0 var(--gold);border-color:var(--gold);background:rgba(255,255,255,0.05);}
.exam-img-area{width:100%;height:260px;background:rgba(255,255,255,0.03);margin-bottom:28px;
  overflow:hidden;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:3.5rem;padding:15px;}
.exam-img-area img{width:100%;height:100%;object-fit:contain;}
.exam-badge{display:inline-block;background:var(--gold);color:var(--navy);
  font-size:0.78rem;font-weight:800;padding:6px 16px;border-radius:0;
  text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;}
.exam-name{font-family:'Outfit',sans-serif;font-size:1.6rem;font-weight:800;
  color:var(--white);margin-bottom:6px;text-transform:uppercase;}
.exam-full{font-size:0.8rem;color:rgba(255,255,255,0.5);margin-bottom:20px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;}
.exam-desc{font-size:0.88rem;color:rgba(255,255,255,0.7);line-height:1.7;flex-grow:1;}
.exam-topics{display:flex;gap:8px;flex-wrap:wrap;margin-top:24px;}
.exam-topic{font-size:0.75rem;background:rgba(212,168,55,0.1);color:var(--gold);
  padding:5px 14px;border-radius:0;font-weight:700;border:1px solid transparent;transition:all 0.2s;}
.exam-card:hover .exam-topic{background:var(--gold);color:var(--navy);border-color:var(--gold);}

.home-why{padding:80px 60px;background:var(--cream);}
.why-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-top:48px;}
.why-points{display:flex;flex-direction:column;gap:24px;}
.why-pt{display:flex;gap:16px;align-items:flex-start;}
.why-num{width:36px;height:36px;border-radius:0;background:var(--gold);
  color:var(--navy);display:flex;align-items:center;justify-content:center;
  font-size:0.8rem;font-weight:800;flex-shrink:0;}
.why-pt-t{font-size:0.95rem;font-weight:600;margin-bottom:4px;}
.why-pt-d{font-size:0.83rem;color:var(--gray);line-height:1.6;}
.why-visual{background:var(--navy);border-radius:0;padding:40px;
  box-shadow:20px 20px 0 var(--gold);}
.why-visual h3{font-family:'Outfit',sans-serif;font-size:1.4rem;font-weight:700;
  color:var(--white);margin-bottom:6px;}
.why-visual p{font-size:0.8rem;color:rgba(255,255,255,0.5);margin-bottom:28px;}
.bar-item{margin-bottom:14px;}
.bar-label{display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:5px;}
.bar-label span:first-child{color:rgba(255,255,255,0.7);}
.bar-label span:last-child{color:var(--gold);font-weight:700;}
.bar-track{height:6px;background:rgba(255,255,255,0.1);border-radius:0;overflow:hidden;}
.bar-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold2));border-radius:0;}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30, 5, 51, 0.85);
  backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-content {
  background: var(--white);
  border: 3.5px solid var(--gold);
  border-radius: 0;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  box-shadow: 25px 25px 0 rgba(0,0,0,0.3);
  position: relative;
  overflow-y: auto;
}
.modal-close {
  position: absolute;
  top: 15px; right: 15px;
  background: var(--light);
  border: 1px solid var(--mist);
  color: var(--navy);
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem; font-weight: bold; cursor: pointer;
  transition: all 0.2s;
  z-index: 10;
}
.modal-close:hover { background: var(--red); color: var(--white); border-color: var(--red); }
.modal-left {
  background: var(--light);
  border-right: 1.5px solid var(--mist);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  position: relative;
  padding: 20px;
}
.modal-left img {
  width: 100%; height: 100%; object-fit: contain;
}
.modal-icon {
  font-size: 6rem;
}
.modal-right {
  padding: 50px 45px;
  display: flex; flex-direction: column; justify-content: center;
}
.modal-right h2 {
  font-family: 'Outfit', sans-serif;
  font-size: 2.2rem; font-weight: 800; color: var(--navy);
  margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px;
}
.modal-grades {
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;
}
.modal-grades .grade-chip {
  background: var(--gold); color: var(--navy);
}
.modal-desc {
  font-size: 1.1rem; color: var(--gray); line-height: 1.8;
  margin-bottom: 30px; font-weight: 500;
}
.modal-features {
  display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;
  padding-top: 24px; border-top: 1px solid var(--mist);
}
.modal-features .feat {
  font-size: 0.95rem; color: var(--navy); font-weight: 700;
  display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.5px;
}
@media (max-width: 768px) {
  .modal-content { grid-template-columns: 1fr; }
  .modal-left { height: 300px; border-right: none; border-bottom: 1.5px solid var(--mist); }
  .modal-right { padding: 40px 25px; }
}

/* ── ABOUT ─────────────────────── */
.about-hero{background:linear-gradient(135deg,var(--navy) 0%,var(--navy2) 100%);
  padding:80px 60px 60px;color:var(--white);}
.about-hero .section-title{color:var(--white);}
.about-hero .section-sub{color:rgba(255,255,255,0.65);}
.about-body{padding:80px 60px;background:var(--white);}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;}
.about-text p{font-size:0.92rem;color:var(--gray);line-height:1.85;margin-bottom:18px;}
.about-text strong{color:var(--navy);font-weight:600;}
.about-values{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.val-card{background:var(--cream);border-radius:0;padding:22px;border:1px solid var(--mist);}
.val-icon{font-size:1.3rem;margin-bottom:10px;}
.val-title{font-size:0.88rem;font-weight:700;color:var(--navy);margin-bottom:4px;}
.val-desc{font-size:0.78rem;color:var(--gray);line-height:1.55;}
.team-section{padding:60px;background:var(--cream);}
.team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px;}
.team-card{background:var(--white);border-radius:0;overflow:hidden;
  border:1px solid var(--mist);transition:transform 0.3s,box-shadow 0.3s;}
.team-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,0.08);}
.team-avatar{height:140px;display:flex;align-items:center;justify-content:center;
  font-size:3rem;background:linear-gradient(135deg,var(--light),var(--mist));}
.team-body{padding:20px;}
.team-name{font-family:'Outfit',sans-serif;font-size:1.2rem;font-weight:700;}
.team-role{font-size:0.75rem;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin:4px 0 8px;}
.team-bio{font-size:0.78rem;color:var(--gray);line-height:1.55;}

/* ── COURSES ─────────────────────── */
.courses-hero{background:var(--navy);padding:70px 60px;color:var(--white);}
.courses-hero .section-title{color:var(--white);}
.courses-body{padding:70px 60px;background:var(--white);}
.courses-tabs{display:flex;gap:8px;margin-bottom:48px;flex-wrap:wrap;}
.tab-btn{background:var(--cream);border:1px solid var(--mist);color:var(--gray);
  padding:9px 22px;border-radius:0;font-size:0.82rem;font-weight:600;
  text-transform:uppercase;letter-spacing:0.5px;transition:all 0.2s;}
.tab-btn.active,.tab-btn:hover{background:var(--navy);color:var(--white);border-color:var(--navy);}
.course-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
.course-card{border:1px solid var(--mist);border-radius:0;overflow:hidden;
  background:var(--white);cursor:pointer;}
.course-card:hover{box-shadow:15px 15px 0 rgba(0,0,0,0.1);}
.course-img-area{width:100%;height:220px;background:var(--white);
  overflow:hidden;border-bottom:1px solid var(--mist);display:flex;align-items:center;justify-content:center;font-size:3.5rem;padding:15px;}
.course-img-area img{width:100%;height:100%;object-fit:contain;}
.course-header{padding:24px 28px 18px;border-bottom:1px solid var(--mist);
  display:flex;align-items:center;gap:16px;}
.course-icon{width:48px;height:48px;border-radius:0;
  display:flex;align-items:center;justify-content:center;font-size:1.4rem;}
.course-title{font-family:'Outfit',sans-serif;font-size:1.3rem;font-weight:700;}
.course-sub{font-size:0.75rem;color:var(--gray);margin-top:2px;}
.course-body{padding:18px 28px 22px;}
.course-topics{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;}
.topic-item{font-size:0.75rem;color:var(--navy);font-weight:700;background:var(--cream);padding:6px 14px;border:1px solid var(--mist);display:flex;align-items:center;gap:6px;}
.topic-item::before{content:'▹';color:var(--gold);font-size:0.9rem;}
.topic-item::before{content:'▹';color:var(--gold);font-size:0.9rem;}
.know-more-btn{width:100%;margin-top:20px;background:transparent;border:2px solid var(--navy);color:var(--navy);font-family:'Outfit',sans-serif;font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;padding:12px;cursor:pointer;transition:all 0.2s;}
.know-more-btn:hover{background:var(--navy);color:var(--white);}
.know-more-btn-light{width:100%;margin-top:20px;background:transparent;border:2px solid var(--gold);color:var(--gold);font-family:'Outfit',sans-serif;font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:1px;padding:12px;cursor:pointer;transition:all 0.2s;}
.know-more-btn-light:hover{background:var(--gold);color:var(--navy);}
.course-stds{background:linear-gradient(135deg,var(--gold) 0%,var(--gold2) 100%);color:var(--navy);font-weight:800;font-size:0.78rem;padding:14px 28px;margin:24px -28px -22px;display:flex;align-items:center;justify-content:center;gap:10px;text-transform:uppercase;letter-spacing:0.8px;}

.exam-section{padding:70px 60px;background:var(--cream);}
.exam-full-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
.exam-full-card{background:var(--white);border:1px solid var(--mist);border-radius:0;
  padding:36px 28px;cursor:pointer;}
.exam-full-card:hover{border-color:var(--gold);box-shadow:15px 15px 0 rgba(0,0,0,0.1);}
.exam-full-img-area{width:100%;height:220px;background:var(--white);margin-bottom:24px;
  overflow:hidden;border:1px solid var(--mist);display:flex;align-items:center;justify-content:center;padding:15px;}
.exam-full-img-area img{width:100%;height:100%;object-fit:contain;}
.exam-full-card .exam-badge{margin-bottom:16px;}
.exam-full-card h3{font-family:'Outfit',sans-serif;font-size:1.5rem;font-weight:700;
  color:var(--navy);margin-bottom:4px;}
.exam-full-name{font-size:0.75rem;color:var(--gray);margin-bottom:20px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;}
.exam-feature-list{display:flex;flex-direction:column;gap:10px;}
.exam-feat{font-size:0.82rem;color:var(--navy);font-weight:600;display:flex;align-items:center;gap:12px;background:var(--cream);padding:10px 16px;border:1px solid var(--mist);}
.exam-feat::before{content:'✓';color:var(--gold);font-weight:800;font-size:1rem;}

/* ── FEES ─────────────────────── */
.fees-hero{background:var(--navy);padding:70px 60px;color:var(--white);}
.fees-hero .section-title{color:var(--white);}
.fees-body{padding:70px 60px;background:var(--white);}
.fees-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px;}
.fee-card{border-radius:0;padding:36px 28px;border:2px solid var(--mist);
  background:var(--cream);position:relative;transition:all 0.3s;}
.fee-card:hover{border-color:var(--gold);transform:translateY(-4px);}
.fee-card.popular{border-color:var(--gold);background:var(--navy);}
.fee-popular-tag{position:absolute;top:-12px;left:50%;transform:translateX(-50%);
  background:var(--gold);color:var(--navy);font-size:0.68rem;font-weight:800;
  padding:4px 14px;border-radius:0;text-transform:uppercase;letter-spacing:0.8px;white-space:nowrap;}
.fee-tier{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;
  color:var(--gold);margin-bottom:12px;}
.fee-price{font-family:'Outfit',sans-serif;font-size:2.8rem;font-weight:700;
  color:var(--navy);line-height:1;}
.fee-card.popular .fee-price{color:var(--white);}
.fee-period{font-size:0.8rem;color:var(--gray);margin-top:4px;margin-bottom:20px;}
.fee-card.popular .fee-period{color:rgba(255,255,255,0.5);}
.fee-divider{height:1px;background:var(--mist);margin:0 0 20px;}
.fee-card.popular .fee-divider{background:rgba(255,255,255,0.12);}
.fee-features{display:flex;flex-direction:column;gap:10px;margin-bottom:28px;}
.fee-feat{font-size:0.82rem;color:var(--gray);display:flex;align-items:center;gap:8px;}
.fee-card.popular .fee-feat{color:rgba(255,255,255,0.75);}
.fee-feat::before{content:'✓';color:var(--green);font-weight:700;}
.fee-card.popular .fee-feat::before{color:var(--gold);}
.fee-btn{width:100%;padding:12px;border-radius:0;font-size:0.85rem;font-weight:700;
  text-transform:uppercase;letter-spacing:0.5px;border:2px solid var(--gold);
  background:transparent;color:var(--gold);transition:all 0.2s;}
.fee-btn:hover{background:var(--gold);color:var(--navy);}
.fee-card.popular .fee-btn{background:var(--gold);color:var(--navy);border-color:var(--gold);}
.fee-card.popular .fee-btn:hover{background:var(--gold2);}
.fees-note{background:var(--light);border-radius:0;padding:24px 28px;
  border-left:4px solid var(--gold);}
.fees-note h4{font-size:0.88rem;font-weight:700;color:var(--navy);margin-bottom:10px;}
.fees-note ul{list-style:none;display:flex;flex-direction:column;gap:6px;}
.fees-note li{font-size:0.82rem;color:var(--gray);display:flex;gap:8px;align-items:flex-start;}
.fees-note li::before{content:'→';color:var(--blue);font-size:0.75rem;flex-shrink:0;margin-top:2px;}

/* ── CONTACT ─────────────────────── */
.contact-hero{background:var(--navy);padding:70px 60px;color:var(--white);}
.contact-hero .section-title{color:var(--white);}
.contact-body{padding:70px 60px;background:var(--white);}
.contact-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:48px;}
.contact-info-cards{display:flex;flex-direction:column;gap:16px;}
.cinfo-card{background:var(--cream);border:1px solid var(--mist);border-radius:0;
  padding:20px 22px;display:flex;gap:16px;align-items:flex-start;}
.cinfo-icon{width:40px;height:40px;background:var(--navy);border-radius:0;
  display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.cinfo-label{font-size:0.72rem;font-weight:700;text-transform:uppercase;
  letter-spacing:0.8px;color:var(--gold);margin-bottom:5px;}
.cinfo-val{font-size:0.88rem;color:var(--navy);font-weight:500;line-height:1.5;}
.map-block{background:var(--navy);border-radius:0;padding:28px;
  display:flex;align-items:center;justify-content:center;min-height:160px;
  color:rgba(255,255,255,0.4);font-size:0.85rem;border:1px solid rgba(255,255,255,0.08);}
.contact-form-wrap{background:var(--cream);border-radius:0;padding:36px;
  border:1px solid var(--mist);}
.contact-form-wrap h3{font-family:'Outfit',sans-serif;font-size:1.5rem;
  font-weight:700;margin-bottom:24px;color:var(--navy);}

/* ── ENQUIRY FORM ─────────────────── */
.enq-page{padding:70px 60px;background:var(--cream);}
.enq-hero{background:var(--navy);padding:70px 60px;color:var(--white);}
.enq-hero .section-title{color:var(--white);}
.form-card{background:var(--white);border-radius:0;padding:48px;
  box-shadow:0 8px 40px rgba(11,31,58,0.1);max-width:820px;margin:0 auto;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.form-group{display:flex;flex-direction:column;gap:6px;}
.form-group.full{grid-column:1/-1;}
.form-label{font-size:0.75rem;font-weight:700;text-transform:uppercase;
  letter-spacing:0.8px;color:var(--navy);}
.form-input,.form-select,.form-textarea{
  background:var(--cream);border:1.5px solid var(--mist);border-radius:0;
  padding:11px 14px;font-size:0.9rem;color:var(--navy);
  transition:border-color 0.2s,box-shadow 0.2s;outline:none;width:100%;}
.form-input:focus,.form-select:focus,.form-textarea:focus{
  border-color:var(--blue);box-shadow:0 0 0 3px rgba(45,125,210,0.12);}
.form-input.form-error,.form-select.form-error,.form-textarea.form-error{
  border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,0.1);}
.form-textarea{resize:vertical;min-height:100px;}
.form-submit{width:100%;padding:15px;background:var(--navy);color:var(--white);
  border:none;border-radius:0;font-size:0.95rem;font-weight:700;
  text-transform:uppercase;letter-spacing:1px;transition:all 0.2s;margin-top:8px;}
.form-submit:hover{background:var(--blue);transform:translateY(-1px);}
.form-success{background:var(--light);border:2px solid var(--green);border-radius:0;
  padding:28px;text-align:center;}
.form-success h3{font-family:'Outfit',sans-serif;font-size:1.4rem;color:var(--green);margin:8px 0;}
.form-success p{font-size:0.85rem;color:var(--gray);}
ft:4px solid var(--gold);}
.fees-note h4{font-size:0.88rem;font-weight:700;color:var(--navy);margin-bottom:10px;}
.fees-note ul{list-style:none;display:flex;flex-direction:column;gap:6px;}
.fees-note li{font-size:0.82rem;color:var(--gray);display:flex;gap:8px;align-items:flex-start;}
.fees-note li::before{content:'→';color:var(--blue);font-size:0.75rem;flex-shrink:0;margin-top:2px;}

/* ── CONTACT ─────────────────────── */
.contact-hero{background:var(--navy);padding:70px 60px;color:var(--white);}
.contact-hero .section-title{color:var(--white);}
.contact-body{padding:70px 60px;background:var(--white);}
.contact-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:48px;}
.contact-info-cards{display:flex;flex-direction:column;gap:16px;}
.cinfo-card{background:var(--cream);border:1px solid var(--mist);border-radius:10px;
  padding:20px 22px;display:flex;gap:16px;align-items:flex-start;}
.cinfo-icon{width:40px;height:40px;background:var(--navy);border-radius:8px;
  display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.cinfo-label{font-size:0.72rem;font-weight:700;text-transform:uppercase;
  letter-spacing:0.8px;color:var(--gold);margin-bottom:5px;}
.cinfo-val{font-size:0.88rem;color:var(--navy);font-weight:500;line-height:1.5;}
.map-block{background:var(--navy);border-radius:12px;padding:28px;
  display:flex;align-items:center;justify-content:center;min-height:160px;
  color:rgba(255,255,255,0.4);font-size:0.85rem;border:1px solid rgba(255,255,255,0.08);}
.contact-form-wrap{background:var(--cream);border-radius:14px;padding:36px;
  border:1px solid var(--mist);}
.contact-form-wrap h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;
  font-weight:700;margin-bottom:24px;color:var(--navy);}

/* ── ENQUIRY FORM ─────────────────── */
.enq-page{padding:70px 60px;background:var(--cream);}
.enq-hero{background:var(--navy);padding:70px 60px;color:var(--white);}
.enq-hero .section-title{color:var(--white);}
.form-card{background:var(--white);border-radius:16px;padding:48px;
  box-shadow:0 8px 40px rgba(11,31,58,0.1);max-width:820px;margin:0 auto;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.form-group{display:flex;flex-direction:column;gap:6px;}
.form-group.full{grid-column:1/-1;}
.form-label{font-size:0.75rem;font-weight:700;text-transform:uppercase;
  letter-spacing:0.8px;color:var(--navy);}
.form-input,.form-select,.form-textarea{
  background:var(--cream);border:1.5px solid var(--mist);border-radius:8px;
  padding:11px 14px;font-size:0.9rem;color:var(--navy);
  transition:border-color 0.2s,box-shadow 0.2s;outline:none;width:100%;}
.form-input:focus,.form-select:focus,.form-textarea:focus{
  border-color:var(--blue);box-shadow:0 0 0 3px rgba(45,125,210,0.12);}
.form-input.form-error,.form-select.form-error,.form-textarea.form-error{
  border-color:#c0392b;box-shadow:0 0 0 3px rgba(192,57,43,0.1);}
.form-textarea{resize:vertical;min-height:100px;}
.form-submit{width:100%;padding:15px;background:var(--navy);color:var(--white);
  border:none;border-radius:8px;font-size:0.95rem;font-weight:700;
  text-transform:uppercase;letter-spacing:1px;transition:all 0.2s;margin-top:8px;}
.form-submit:hover{background:var(--blue);transform:translateY(-1px);}
.form-success{background:var(--light);border:2px solid var(--green);border-radius:10px;
  padding:28px;text-align:center;}
.form-success h3{font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:var(--green);margin:8px 0;}
.form-success p{font-size:0.85rem;color:var(--gray);}

/* FOOTER */
footer{background:#060f1e;color:#5a6f8a;padding:56px 60px 32px;}
.footer-top{display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap;margin-bottom:40px;}
.footer-brand-name{font-family:'Outfit',sans-serif;font-size:1.2rem;
  font-weight:700;color:var(--white);display:block;margin-bottom:10px;}
.footer-brand-name span{color:var(--gold);}
.footer-brand p{font-size:0.78rem;max-width:230px;line-height:1.7;}
.footer-col h4{font-size:0.68rem;text-transform:uppercase;letter-spacing:2px;
  color:var(--gold);font-weight:700;margin-bottom:14px;}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:9px;}
.footer-col li{font-size:0.8rem;cursor:pointer;transition:color 0.2s;}
.footer-col li:hover{color:var(--white);}
.footer-bottom{border-top:1px solid #0f1e30;padding-top:24px;
  display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:0.75rem;}

/* MOBILE */
.mobile-menu-btn{display:none;background:none;border:none;color:var(--gold);font-size:1.8rem;cursor:pointer;margin-left:10px;}
.mobile-nav-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(11,31,58,0.4);backdrop-filter:blur(4px);z-index:9998;transition:opacity 0.3s;}
.mobile-offcanvas{position:fixed;top:0;right:0;width:320px;max-width:85%;height:100vh;background:var(--white);z-index:9999;display:flex;flex-direction:column;padding:32px 24px;box-shadow:-10px 0 50px rgba(0,0,0,0.15);overflow-y:auto;}
.offcanvas-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;}
.offcanvas-logo{font-family:'Outfit',sans-serif;font-weight:800;font-size:1.2rem;color:var(--navy);}
.offcanvas-close{background:var(--light);border:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;cursor:pointer;color:var(--navy);transition:all 0.2s;}
.offcanvas-close:hover{background:var(--gold);transform:rotate(90deg);}
.offcanvas-desc{font-size:0.85rem;color:var(--gray);line-height:1.6;margin-bottom:32px;border-bottom:1px solid var(--mist);padding-bottom:24px;}
.offcanvas-links{list-style:none;display:flex;flex-direction:column;gap:4px;margin-bottom:32px;border-bottom:1px solid var(--mist);padding-bottom:24px;}
.offcanvas-links button{background:none;border:none;text-align:left;padding:12px 0;font-size:1.1rem;font-weight:700;color:var(--navy);cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:color 0.2s;}
.offcanvas-links button:hover{color:var(--gold);}
.offcanvas-links button span{font-size:0.8rem;opacity:0.3;}
.offcanvas-title{font-size:0.7rem;text-transform:uppercase;letter-spacing:1.5px;color:var(--gold);font-weight:800;margin-bottom:20px;}
.offcanvas-contact{display:flex;flex-direction:column;gap:16px;margin-bottom:32px;}
.oc-item{display:flex;gap:12px;align-items:center;}
.oc-icon{width:36px;height:36px;background:var(--cream);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.9rem;border:1px solid var(--mist);}
.oc-text{display:flex;flex-direction:column;}
.oc-label{font-size:0.65rem;text-transform:uppercase;color:var(--gray);font-weight:700;}
.oc-val{font-size:0.85rem;color:var(--navy);font-weight:600;}
.offcanvas-social{display:flex;gap:12px;}
.oc-social-btn{width:40px;height:40px;background:var(--light);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--navy);transition:all 0.2s;}
.oc-social-btn:hover{background:var(--navy);color:var(--white);transform:translateY(-3px);}

.fee-row-card-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 0; }
.fee-row-content { padding: 60px 50px; position: relative; display: flex; flex-direction: column; justify-content: center; }
.fee-features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 48px; }
.fees-bottom-card { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; margin-top: 100px; padding: 60px; background: var(--cream); border-radius: 24px; border: 1px solid var(--mist); align-items: center; }

@media(max-width:900px){
  .nav{padding:0 20px;}
  .nav-links{display:none;}
  .nav-enq{display:none;}
  .mobile-menu-btn{display:block;}
  .hero{padding:56px 20px; flex-direction: column; text-align: left !important; min-height: auto;}
  .hero-content{max-width: 100%; margin-bottom: 40px; text-align: left !important;}
  .hero-btns{justify-content: flex-start !important;}
  .hero-stats{justify-content: flex-start !important; gap: 24px;}
  .hero-image-wrap{width: 100%;}
  .hero-image{max-height: 50vh;}
  .kural-card { padding: 12px 10px !important; }
  .kural-card span { font-size: 0.82rem !important; }
  .section,.courses-body,.fees-body,.contact-body,.enq-page,
  .about-body,.about-hero,.courses-hero,.fees-hero,.contact-hero,.enq-hero,
  .home-subjects,.home-exam,.home-why,.team-section,.exam-section,
  .about-values-section{padding:56px 20px !important;}
  .about-values-section > div {grid-template-columns:1fr !important;}
  .subjects-row,.exam-grid,.course-grid,.fees-grid,.exam-full-grid,
  .team-grid,.about-grid,.why-grid,.contact-grid,.about-values,
  .fee-row-card-grid, .fees-bottom-card {grid-template-columns:1fr !important;}
  .form-row{grid-template-columns:1fr;}
  footer{padding:40px 20px 24px;}

  .fee-row-content { padding: 30px 20px !important; }
  .fee-features-grid { grid-template-columns: 1fr !important; margin-bottom: 24px !important; gap: 12px !important; }
  .fees-bottom-card { padding: 30px 20px !important; margin-top: 40px !important; gap: 30px !important; }
  .fee-price { font-size: 3rem !important; }
  .fee-row-img { padding: 20px !important; }
  .exam-full-card { padding: 24px 20px !important; }
  .hero-desc { text-align: left !important; }
}


/* ANIMATIONS */
@keyframes pulse {
  0%, 100% { opacity:1; }
  50% { opacity:0.8; }
}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SUBJECTS = [
  { icon: "📐", name: "Mathematics", img: "/images/maths.jpeg", desc: "Algebra, Geometry, Calculus, Statistics — from fundamentals to advanced concepts.", grades: ["Class 1–5", "Class 6–10", "Class 11–12"] },
  { icon: "⚗️", name: "Chemistry", img: "/images/chemistry.png", desc: "Organic, Inorganic & Physical Chemistry with concept clarity and problem solving.", grades: ["Class 8–10", "Class 11–12"] },
  { icon: "🔭", name: "Physics", img: "/images/physics.png", desc: "Mechanics, Electricity, Optics, Modern Physics — from basics to board-level mastery.", grades: ["Class 8–10", "Class 11–12"] },
  { icon: "🧬", name: "Biology", img: "/images/biology.png", desc: "Botany, Zoology, Human Physiology — structured for strong academic and competitive foundation.", grades: ["Class 8–10", "Class 11–12"] },
];

const EXAMS = [
  { badge: "NEET", name: "NEET", icon: "🏥", img: "/images/NEEEET.webp", full: "National Eligibility cum Entrance Test", desc: "Comprehensive NEET preparation covering Physics, Chemistry & Biology with test series and previous year papers.", topics: ["Physics", "Chemistry", "Botany", "Zoology", "Mock Tests"] },
  { badge: "JEE", name: "JEE", icon: "📐", img: "/images/jee.jpeg", full: "Joint Entrance Examination", desc: "Rigorous JEE Mains & Advanced coaching with problem-solving strategies, shortcuts and extensive practice.", topics: ["Maths", "Physics", "Chemistry", "Advanced Problems"] },
  { badge: "UPSC", name: "UPSC", icon: "📚", img: "/images/upsce.jpeg", full: "Union Public Service Commission", desc: "Foundation to advanced UPSC preparation with GS papers, optional subjects and essay & answer-writing workshops.", topics: ["GS Paper 1–4", "Essay", "Optional Subject", "Current Affairs"] },
];

const TEAM = [
  { emoji: "👩‍🏫", name: "Dr. Kavitha Rajan", role: "Founder & Mathematics Head", bio: "PhD in Mathematics, 18+ years teaching experience. Specialist in IIT-JEE and board exam coaching." },
  { emoji: "👨‍🔬", name: "Prof. Suresh Anand", role: "Chemistry & Physics Faculty", bio: "M.Sc Physics, former CBSE examiner. NEET topper mentor with 14 years of dedicated teaching." },
  { emoji: "🧬", name: "Ms. Priya Nair", role: "Biology Faculty", bio: "M.Sc Biotechnology with 10 years NEET coaching. Known for her clear concept delivery and revision strategies." },
];

const FEES = [
  { tier: "Foundation", price: "₹1,800", period: "per month", popular: false, feats: ["1 Subject", "8 Sessions/month", "Study Notes Provided", "Weekly Tests", "WhatsApp Doubt Support"] },
  { tier: "Standard", price: "₹3,200", period: "per month", popular: true, feats: ["2 Subjects", "16 Sessions/month", "All Study Materials", "Bi-weekly Assessments", "Dedicated Mentor", "24/7 Doubt Clearing"] },
  { tier: "Elite", price: "₹5,500", period: "per month", popular: false, feats: ["All Subjects", "Unlimited Sessions", "Premium Study Kit", "Full Mock Test Series", "1-on-1 Mentoring", "Competitive Exam Track"] },
];

/* ─────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────── */
function EnquiryFormInner() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", std: "", subject: "", exam: "", msg: "", batchTime: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: "" }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.match(/^\d{10}$/)) newErrors.phone = "Valid 10-digit phone required";
    if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email required";
    return newErrors;
  };
  
  const handle = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/submit-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrors({ submit: "Failed to submit. Please try again." });
      }
    } catch (err) {
      setErrors({ submit: "Network error. Please check your connection." });
    } finally {
      setLoading(false);
    }
  };
  
  if (submitted) return (
    <div className="form-success">
      <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
      <h3>Enquiry Submitted Successfully!</h3>
      <p>Thank you, <strong>{form.name}</strong>. Our admissions team will contact you within 24 hours.<br />For urgent queries, call <strong>+91 98765 43210</strong> or email <strong>admissions@cornerstonemathsphere.in</strong></p>
      <button className="btn-gold" style={{ marginTop: "20px" }} onClick={() => window.location.href = "/"}>← Back to Home</button>
    </div>
  );
  return (
    <div>
      {errors.submit && <div style={{ background: "#ffdddd", color: "#c0392b", padding: "12px", borderRadius: "0", marginBottom: "20px", fontSize: "0.85rem" }}>⚠️ {errors.submit}</div>}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Student Name *</label>
          <input className={`form-input ${errors.name ? "form-error" : ""}`} placeholder="Full Name" value={form.name} onChange={e => set("name", e.target.value)} />
          {errors.name && <span style={{ color: "#c0392b", fontSize: "0.75rem", marginTop: "4px" }}>{errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Parent / Guardian Name</label>
          <input className="form-input" placeholder="Parent Name" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number * (10 digits)</label>
          <input className={`form-input ${errors.phone ? "form-error" : ""}`} placeholder="9876543210" value={form.phone} onChange={e => set("phone", e.target.value)} maxLength="10" />
          {errors.phone && <span style={{ color: "#c0392b", fontSize: "0.75rem", marginTop: "4px" }}>{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className={`form-input ${errors.email ? "form-error" : ""}`} type="email" placeholder="email@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
          {errors.email && <span style={{ color: "#c0392b", fontSize: "0.75rem", marginTop: "4px" }}>{errors.email}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">Current Standard / Class</label>
          <select className="form-select" value={form.std} onChange={e => set("std", e.target.value)}>
            <option value="">Select Class</option>
            {["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Subject of Interest</label>
          <select className="form-select" value={form.subject} onChange={e => set("subject", e.target.value)}>
            <option value="">Select Subject</option>
            <option>Mathematics</option>
            <option>Chemistry</option>
            <option>Physics</option>
            <option>Biology</option>
            <option>All Subjects</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Competitive Exam (if any)</label>
          <select className="form-select" value={form.exam} onChange={e => set("exam", e.target.value)}>
            <option value="">Not Applicable</option>
            <option>NEET</option>
            <option>JEE Mains</option>
            <option>JEE Advanced</option>
            <option>UPSC</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Preferred Batch Time</label>
          <select className="form-select" value={form.batchTime} onChange={e => set("batchTime", e.target.value)}>
            <option value="">Select Batch Time</option>
            <option>Morning (7am – 10am)</option>
            <option>Afternoon (1pm – 4pm)</option>
            <option>Evening (5pm – 8pm)</option>
            <option>Weekend Batch</option>
          </select>
        </div>
        <div className="form-group full">
          <label className="form-label">Message / Additional Info</label>
          <textarea className="form-textarea" placeholder="Tell us about your learning goals, current difficulties, or any questions..." value={form.msg} onChange={e => set("msg", e.target.value)} />
        </div>
      </div>
      <button className="form-submit" onClick={handle} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>{loading ? "⏳ Submitting..." : "Submit Enquiry →"}</button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGES
───────────────────────────────────────────── */
function HomePage({ goTo }) {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-geo"></div>
        <div className="hero-glow"></div>
        
        <div className="hero-content">
          <div className="hero-badge">🏆 Est. 2012 · #1 Tuition Centre in Chennai</div>
          <h1>Unlock Your Academic Potential</h1>
          <div className="hero-tagline">Expert Science & Mathematics Coaching</div>
          <p className="hero-desc">Transform your grades with personalized coaching from experienced faculty. Master boards exams and competitive exams (NEET, JEE, UPSC) with confidence.</p>
          <div className="hero-btns" style={{ marginTop: "10px" }}>
            <button className="btn-gold" onClick={() => goTo("enquiry")}>🎯 Apply for Admission</button>
            <button className="btn-ghost" onClick={() => goTo("courses")}>📚 Explore Courses</button>
          </div>
          <div className="hero-stats">
            {[["1200+","Students Trained"],["98%","Success Rate"],["10+","Years Excellence"],["5⭐","Avg Rating"]].map(([n,l]) => (
              <div className="hstat" key={l}>
                <span className="hstat-n">{n}</span>
                <span className="hstat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image-wrap" style={{ flexDirection: "column" }}>
          <div className="hero-image-card">
            <img src="/images/thiruvalluvar.png" alt="Thiruvalluvar" className="hero-image" />
          </div>
          <div className="kural-card">
            <div className="kural-label">Cornerstone MathSphere</div>
            <span>தெய்வத்தான் ஆகா தெனினும் முயற்சிதன்<br />மெய்வருத்தக் கூலி தரும்.</span>
            <div className="kural-author">— திருவள்ளுவர்</div>
          </div>
        </div>
      </div>


      {/* Subjects */}
      <div className="home-subjects">
        <div className="section-label">📚 What We Teach</div>
        <div className="section-title">Core Subjects for<br />Every Standard</div>
        <div style={{ fontSize: "0.92rem", color: "var(--gray)", marginBottom: "0", marginTop: "8px" }}>From Class 1 foundations to Class 12 board & competitive exams</div>
        <div className="subjects-row">
          {SUBJECTS.map(s => (
            <div className="subj-card" key={s.name} onClick={() => setSelectedSubject(s)}>
              <div className="subj-img-area">
                {s.img ? <img src={s.img} alt={s.name} /> : <span>{s.icon}</span>}
              </div>
              <div className="subj-name">{s.name}</div>
              <div className="subj-desc">{s.desc}</div>
              <div className="subj-grades">
                {s.grades.map(g => <span className="grade-chip" key={g}>{g}</span>)}
              </div>
              <button className="know-more-btn" style={{marginTop: "24px"}} onClick={(e) => { e.stopPropagation(); setSelectedSubject(s); }}>Know More →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive Exams */}
      <div className="home-exam">
        <div className="section-label">🎯 Specialized Coaching</div>
        <div className="section-title" style={{ color: "var(--white)" }}>NEET · JEE · UPSC</div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.92rem", fontWeight: 300, marginBottom: "0", marginTop: "8px" }}>Expert guidance for India's most competitive entrance examinations</div>
        <div className="exam-grid">
          {EXAMS.map(e => (
            <div className="exam-card" key={e.badge} onClick={() => setSelectedSubject(e)}>
              <div className="exam-img-area">
                {e.img ? <img src={e.img} alt={e.full} /> : <span>{e.icon}</span>}
              </div>
              <div className="exam-badge">{e.badge}</div>
              <div className="exam-name">{e.icon} {e.badge}</div>
              <div className="exam-full">{e.full}</div>
              <div className="exam-desc">{e.desc}</div>
              <div className="exam-topics">
                {e.topics.map(t => <span className="exam-topic" key={t}>✓ {t}</span>)}
              </div>
              <button className="know-more-btn-light" style={{marginTop: "24px"}} onClick={(e) => { e.stopPropagation(); setSelectedSubject(e); }}>Know More →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Why Us */}
      <div className="home-why">
        <div className="why-grid">
          <div>
            <div className="section-label">✨ Our Advantage</div>
            <div className="section-title">Why Students<br />Choose Us</div>
            <div className="why-points">
              {[
                ["1-on-1 Attention", "Small batches (max 8 students) ensure every child gets personalized focus and instant feedback."],
                ["Expert Faculty", "All tutors are postgraduates with 10+ years experience and proven track records."],
                ["Structured Curriculum", "Aligned with CBSE, State boards + competitive exam patterns."],
                ["Regular Testing", "Weekly tests, monthly mocks, and performance tracking keep students accountable."],
                ["Doubt Clearing", "Daily doubt sessions with dedicated mentors - no question left unanswered."],
                ["Success Rate", "98% board pass rate and consistent selections in NEET, JEE, UPSC."],
              ].map(([t, d], i) => (
                <div className="why-pt" key={t}>
                  <div className="why-num" style={{ background: "linear-gradient(135deg, var(--gold), var(--gold2))" }}>{String(i + 1).padStart(2, "0")}</div>
                  <div><div className="why-pt-t">{t}</div><div className="why-pt-d">{d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="why-visual">
            <h3>📊 Recent Results</h3>
            <p>Average score improvement in 1 semester</p>
            {[["Mathematics", "94%"], ["Physics", "89%"], ["Chemistry", "91%"], ["Biology", "93%"], ["Overall Growth", "92%"]].map(([s, v]) => (
              <div className="bar-item" key={s}>
                <div className="bar-label">
                  <span>{s}</span><span>{v}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: v }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "var(--gold)", padding: "60px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "var(--navy)", marginBottom: "12px" }}>Ready to Start Your Journey?</div>
        <div style={{ fontSize: "0.95rem", color: "#5a3e00", marginBottom: "28px" }}>Admissions open for the new batch. Limited seats available.</div>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-gold" style={{ background: "var(--navy)", borderColor: "var(--navy)", color: "var(--white)" }} onClick={() => goTo("enquiry")}>Enquire Now</button>
          <button className="btn-ghost" style={{ color: "var(--navy)", borderColor: "var(--navy)" }} onClick={() => goTo("fees")}>View Fee Structure</button>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: "80px 60px", background: "var(--white)" }}>
        <div className="section-label">Student Success Stories</div>
        <div className="section-title">What Our Students Say</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "48px" }}>
          {[
            { name: "Arjun Kumar", exam: "JEE Advanced - AIR 156", quote: "Cornerstone's personalized approach helped me crack JEE. Faculty explained complex concepts brilliantly!" },
            { name: "Priya Sharma", exam: "NEET - 720/720", quote: "Best decision ever. Teachers were supportive, classes were structured, and results speak for themselves." },
            { name: "Rohan Patel", exam: "Class 12 Board - 95%", quote: "From struggling in maths to scoring 98! The doubt clearing sessions were game-changing." },
          ].map((test, i) => (
            <div key={i} style={{ background: "var(--cream)", padding: "28px", borderRadius: "0", border: "1px solid var(--mist)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "1.4rem", marginBottom: "12px", color: "var(--gold)" }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize: "0.95rem", color: "var(--gray)", lineHeight: "1.7", marginBottom: "16px" }}>"{test.quote}"</p>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)" }}>{test.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 600 }}>{test.exam}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: "80px 60px", background: "var(--navy)", color: "var(--white)" }}>
        <div className="section-label" style={{ color: "var(--gold)" }}>Frequently Asked Questions</div>
        <div className="section-title" style={{ color: "var(--white)" }}>Common Questions</div>
        <div style={{ maxWidth: "800px", margin: "48px auto 0" }}>
          {[
            { q: "What classes do you teach?", a: "We teach Classes 1-12 across Mathematics, Physics, Chemistry, and Biology. We also have specialized NEET, JEE, and UPSC coaching programs." },
            { q: "Are there batch transfers available?", a: "Yes, we provide flexible batch timings - Morning (7am-10am), Afternoon (1pm-4pm), Evening (5pm-8pm), and Weekend batches. Transfers can be done once per month." },
            { q: "Do you provide online classes?", a: "Currently, we offer in-center coaching with recorded sessions for revision. Online classes are coming soon!" },
            { q: "What's your result track record?", a: "98% board pass rate, 1200+ students trained, and consistent selections in NEET, JEE, and UPSC exams over 10+ years." },
            { q: "Is there a free trial class?", a: "Yes! You can attend a free introductory class. Just fill the enquiry form and our team will contact you." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" }}>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--gold)", marginBottom: "8px" }}>Q: {item.q}</div>
              <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: "1.6" }}>A: {item.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Modal */}
      {selectedSubject && (
        <div className="modal-overlay" onClick={() => setSelectedSubject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedSubject(null)}>✕</button>
            <div className="modal-left">
              {selectedSubject.img ? <img src={selectedSubject.img} alt={selectedSubject.name} /> : <div className="modal-icon">{selectedSubject.icon}</div>}
            </div>
            <div className="modal-right">
              <h2>{selectedSubject.icon} {selectedSubject.name}</h2>
              <div className="modal-grades">
                {(selectedSubject.grades || selectedSubject.topics).map(g => <span className="grade-chip" key={g}>{g}</span>)}
              </div>
              <p className="modal-desc">{selectedSubject.desc}</p>
              <div className="modal-features">
                <div className="feat">✓ Expert Faculty Mentorship</div>
                <div className="feat">✓ Comprehensive Study Materials</div>
                <div className="feat">✓ Regular Mock Assessments</div>
              </div>
              <button 
                className="btn-gold" 
                onClick={() => { setSelectedSubject(null); goTo("enquiry"); }} 
                style={{ width: "100%", marginTop: "24px", justifyContent: "center" }}>
                🎯 Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="about-hero" style={{ position: "relative", padding: "120px 60px", background: "var(--navy)", overflow: "hidden" }}>
        <img src="/images/about1.jpeg" alt="Cornerstone MathSphere" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <div className="section-label" style={{ color: "var(--gold)" }}>About Us</div>
          <div className="section-title" style={{ color: "var(--white)", fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "20px" }}>Cornerstone MathSphere</div>
          <div className="section-sub" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", maxWidth: "600px" }}>Leading Science & Mathematics education institution in Chennai with 10+ years of proven excellence and 1200+ successful students.</div>
        </div>
      </div>

      {/* Story */}
      <div className="about-body" style={{ padding: "100px 60px", background: "var(--white)" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div className="about-image-collage" style={{ position: "relative", maxWidth: "420px", margin: "0 auto" }}>
            <img src="/images/about2.jpeg" alt="Students learning" style={{ width: "100%", height: "auto", border: "4px solid var(--gold)", boxShadow: "15px 15px 0 var(--navy)" }} />
            <div style={{ position: "absolute", bottom: "-25px", right: "-25px", background: "var(--navy)", padding: "24px", color: "var(--white)", boxShadow: "10px 10px 0 var(--gold)" }}>
              <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "var(--gold)", lineHeight: 1 }}>10+</div>
              <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginTop: "8px", fontWeight: 700 }}>Years of <br/>Excellence</div>
            </div>
          </div>
          <div className="about-text">
            <div className="section-label">Our Story</div>
            <div className="section-title" style={{ fontSize: "2.8rem", color: "var(--navy)", marginBottom: "24px" }}>Shaping Minds Since 2012</div>
            <p style={{ fontSize: "1.05rem", color: "var(--gray)", lineHeight: 1.8, marginBottom: "20px" }}>Cornerstone MathSphere was founded with a simple but powerful conviction — that <strong>quality science and mathematics education</strong> should be accessible to every student, regardless of their starting point.</p>
            <p style={{ fontSize: "1.05rem", color: "var(--gray)", lineHeight: 1.8, marginBottom: "20px" }}>Over a decade, we have grown from a small neighbourhood tuition centre to one of the most trusted academic coaching institutions in the region, with a track record of producing <strong>board toppers and competitive exam qualifiers</strong> year after year.</p>
            <p style={{ fontSize: "1.05rem", color: "var(--gray)", lineHeight: 1.8 }}>Our approach combines <strong>concept-first teaching</strong>, regular practice, personalised feedback, and a nurturing environment where students feel confident to ask, explore, and grow.</p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="about-values-section" style={{ padding: "100px 60px", background: "var(--cream)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", alignItems: "center" }}>
          <div className="values-left">
            <div className="section-label">Why We're Different</div>
            <div className="section-title" style={{ fontSize: "2.8rem", color: "var(--navy)", marginBottom: "40px" }}>Our Core Values</div>
            
            <div className="about-values" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
              {[
                ["🎯", "Excellence", "We set high standards and support every student in reaching them."],
                ["🤝", "Integrity", "Honest guidance, transparent fees, and genuine care for outcomes."],
                ["💡", "Innovation", "Modern teaching methods combined with time-tested academic rigour."],
                ["🌱", "Growth Mindset", "We believe every student can improve with the right support."],
              ].map(([icon, title, desc]) => (
                <div className="val-card" key={title} style={{ background: "var(--white)", border: "1px solid var(--mist)", padding: "30px 24px", borderRadius: "0", transition: "transform 0.3s", boxShadow: "10px 10px 0 rgba(0,0,0,0.04)" }}>
                  <div className="val-icon" style={{ fontSize: "2.2rem", marginBottom: "16px", background: "var(--light)", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>{icon}</div>
                  <div className="val-title" style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--navy)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>{title}</div>
                  <div className="val-desc" style={{ fontSize: "0.9rem", color: "var(--gray)", lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="values-right" style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
            <img src="/images/about3.jpeg" alt="Core Values Classroom" style={{ width: "100%", height: "auto", border: "4px solid var(--gold)", boxShadow: "-20px 20px 0 var(--navy)" }} />
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="team-section" style={{ padding: "100px 60px", background: "var(--white)" }}>
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 60px" }}>
          <div className="section-label">Our Faculty</div>
          <div className="section-title">Meet the Experts</div>
        </div>
        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {TEAM.map(t => (
            <div className="team-card" key={t.name} style={{ background: "var(--cream)", border: "1px solid var(--mist)", borderRadius: "0", overflow: "hidden", transition: "all 0.3s" }}>
              <div className="team-avatar" style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", background: "linear-gradient(135deg, var(--navy), var(--navy2))" }}>{t.emoji}</div>
              <div className="team-body" style={{ padding: "30px" }}>
                <div className="team-name" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--navy)" }}>{t.name}</div>
                <div className="team-role" style={{ fontSize: "0.8rem", color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", margin: "8px 0 16px" }}>{t.role}</div>
                <div className="team-bio" style={{ fontSize: "0.9rem", color: "var(--gray)", lineHeight: 1.6 }}>{t.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesPage({ goTo }) {
  const [tab, setTab] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const courseList = [
    { icon: "📐", color: "#eef2f8", name: "Mathematics", sub: "Class 1 – 12 | All Boards", img: "/images/maths.jpeg", topics: ["Number Systems", "Algebra & Geometry", "Trigonometry", "Calculus", "Statistics", "Probability"], stds: "Available for all standards" },
    { icon: "⚗️", color: "#fef9ec", name: "Chemistry", sub: "Class 8 – 12 | CBSE & State", img: "/images/chemistry.png", topics: ["Atomic Structure", "Chemical Bonding", "Organic Chemistry", "Electrochemistry", "Thermodynamics", "Equilibrium"], stds: "Class 8 to Class 12" },
    { icon: "🔭", color: "#eef8f4", name: "Physics", sub: "Class 8 – 12 | CBSE & State", img: "/images/physics.png", topics: ["Mechanics", "Thermodynamics", "Optics", "Electrostatics", "Magnetism", "Modern Physics"], stds: "Class 8 to Class 12" },
    { icon: "🧬", color: "#f5eef8", name: "Biology", sub: "Class 8 – 12 | CBSE & State", img: "/images/biology.png", topics: ["Cell Biology", "Genetics", "Human Physiology", "Plant Physiology", "Ecology", "Biotechnology"], stds: "Class 8 to Class 12" },
  ];
  const filtered = tab === "all" ? courseList : tab === "science" ? courseList.slice(1) : courseList.slice(0, 1);
  return (
    <div>
      <div className="courses-hero" style={{ position: "relative", padding: "160px 60px", background: "var(--navy2)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/images/course_hero.jpeg" alt="Courses & Programs" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4, mixBlendMode: "overlay" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", textAlign: "center" }}>
          <div className="section-label" style={{ color: "var(--gold)" }}>📚 Comprehensive Programs</div>
          <div className="section-title" style={{ color: "var(--white)", fontSize: "clamp(3rem, 6vw, 4.5rem)", marginBottom: "24px" }}>Courses & Subjects</div>
          <div className="section-sub" style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.15rem", margin: "0 auto", fontWeight: 400 }}>Expertly crafted syllabus coverage for Classes 1–12, CBSE/State boards, and intense competitive exam tracks (NEET, JEE, UPSC).</div>
        </div>
      </div>

      <div className="courses-body" style={{ background: "var(--light)", padding: "100px 60px" }}>
        <div className="courses-tabs" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginBottom: "60px" }}>
          {[["all", "All Subjects"], ["science", "Science (PCB)"], ["math", "Mathematics"]].map(([key, label]) => (
            <button key={key} style={{ background: tab === key ? "var(--navy)" : "var(--white)", color: tab === key ? "var(--white)" : "var(--navy)", padding: "14px 32px", border: `2px solid ${tab === key ? "var(--navy)" : "var(--mist)"}`, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", borderRadius: "12px", transition: "all 0.3s" }} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>
        <div className="course-grid" style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          {filtered.map((c, i) => {
            const isLeftImage = i % 2 === 0;

            return (
              <div className="fee-row-card-grid" key={c.name} onClick={() => setSelectedCourse(c)} style={{ background: "var(--white)", border: "1px solid var(--mist)", borderRadius: "24px", overflow: "hidden", cursor: "pointer", boxShadow: "0 15px 40px rgba(0,0,0,0.06)", transition: "transform 0.3s" }}>
                
                {isLeftImage && (
                  <div className="fee-row-img" style={{ position: "relative", minHeight: "380px", overflow: "hidden", background: c.color || "var(--light)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
                    <img src={c.img} alt={c.name} style={{ maxWidth: "100%", maxHeight: "380px", objectFit: "contain", borderRadius: "12px", boxShadow: "0 15px 35px rgba(0,0,0,0.05)" }} />
                  </div>
                )}

                <div className="fee-row-content" style={{ color: "var(--navy)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                    <div style={{ background: "var(--navy)", width: "70px", height: "70px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem", flexShrink: 0, boxShadow: "4px 4px 0 var(--gold)" }}>{c.icon}</div>
                    <div>
                      <div className="course-title" style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--navy)", marginBottom: "4px" }}>{c.name}</div>
                      <div className="course-sub" style={{ fontSize: "1.05rem", color: "var(--gray)", fontWeight: 500 }}>{c.sub}</div>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--gold)", marginBottom: "16px" }}>Core Syllabus Topics</div>
                  <div className="course-topics" style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
                    {c.topics.map(t => <div className="topic-item" key={t} style={{ background: "var(--light)", padding: "10px 18px", fontSize: "0.95rem", color: "var(--navy)", borderRadius: "8px", border: "1px solid var(--mist)", fontWeight: 600 }}>{t}</div>)}
                  </div>
                  
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
                     <div className="course-stds" style={{ fontSize: "1rem", color: "var(--navy)", display: "flex", alignItems: "center", gap: "10px", fontWeight: 700 }}><span style={{ fontSize: "1.4rem" }}>📚</span> {c.stds}</div>
                     <button className="know-more-btn" style={{ background: "transparent", color: "var(--navy)", padding: "14px 32px", border: "2px solid var(--navy)", borderRadius: "8px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", transition: "all 0.3s" }} onClick={(e) => { e.stopPropagation(); setSelectedCourse(c); }}>View Details →</button>
                  </div>
                </div>

                {!isLeftImage && (
                  <div className="fee-row-img" style={{ position: "relative", minHeight: "380px", overflow: "hidden", background: c.color || "var(--light)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
                    <img src={c.img} alt={c.name} style={{ maxWidth: "100%", maxHeight: "380px", objectFit: "contain", borderRadius: "12px", boxShadow: "0 15px 35px rgba(0,0,0,0.05)" }} />
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
      <div className="exam-section" style={{ padding: "100px 60px", background: "var(--cream)", textAlign: "center" }}>
        <div className="section-label">Competitive Exam Coaching</div>
        <div className="section-title" style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)" }}>NEET · JEE · UPSC</div>
        <div style={{ fontSize: "1.1rem", color: "var(--gray)", fontWeight: 400, maxWidth: "600px", margin: "0 auto 60px" }}>Intensive, structured programmes meticulously designed for conquering India's most demanding competitive exams.</div>
        
        <div className="exam-full-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", textAlign: "left" }}>
          {[
            { badge: "NEET", img: "/images/NEEEET.webp", full: "National Eligibility cum Entrance Test", feats: ["Complete Physics, Chemistry & Biology coverage", "Chapter-wise tests & full mock exams", "Previous year paper analysis", "NCERT mastery sessions", "Doubt-clearing workshops", "Performance tracking dashboard"] },
            { badge: "JEE", img: "/images/jee.jpeg", full: "Joint Entrance Examination (Mains & Advanced)", feats: ["Maths, Physics & Chemistry deep dive", "JEE Advanced problem-solving strategies", "Speed & accuracy building drills", "All India mock test series", "Rank improvement strategies", "Personal mentor assignment"] },
            { badge: "UPSC", img: "/images/upsce.jpeg", full: "Union Public Service Commission", feats: ["GS Papers 1, 2, 3, 4 complete coverage", "Essay & answer-writing workshop", "Optional subject coaching", "Current affairs daily update sessions", "Interview guidance", "CSAT preparation"] },
          ].map(e => (
            <div className="exam-full-card" key={e.badge} onClick={() => setSelectedCourse(e)} style={{ background: "var(--white)", borderRadius: "20px", border: "1px solid var(--mist)", padding: "40px 30px", position: "relative", cursor: "pointer", transition: "transform 0.3s", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
              <div className="exam-full-img-area" style={{ height: "200px", borderRadius: "16px", overflow: "hidden", marginBottom: "30px", border: "4px solid var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(30,5,51,0.02)" }}>
                <img src={e.img} alt={e.full} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>
              <div className="exam-badge" style={{ position: "absolute", top: "30px", right: "20px", background: "var(--gold)", color: "var(--navy)", padding: "8px 24px", fontWeight: 800, borderRadius: "8px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1.5px", boxShadow: "4px 4px 0 rgba(0,0,0,0.15)" }}>{e.badge}</div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--navy)", marginBottom: "8px", fontFamily: "'Outfit', sans-serif" }}>{e.badge} Track</h3>
              <div className="exam-full-name" style={{ fontSize: "0.85rem", color: "var(--gray)", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>{e.full}</div>
              <div className="exam-feature-list" style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1, marginBottom: "32px" }}>
                {e.feats.map(f => (
                  <div className="exam-feat" key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.95rem", color: "var(--navy)" }}>
                    <span style={{ color: "var(--gold)", fontWeight: 800, fontSize: "1.2rem", lineHeight: 1 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button className="know-more-btn" style={{ width: "100%", padding: "16px", background: "var(--navy)", color: "var(--white)", border: "none", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", borderRadius: "8px" }} onClick={(e) => { e.stopPropagation(); setSelectedCourse(e); }}>Explore {e.badge} →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCourse(null)}>✕</button>
            <div className="modal-left">
              {selectedCourse.img ? <img src={selectedCourse.img} alt={selectedCourse.name || selectedCourse.badge} /> : <div className="modal-icon">{selectedCourse.icon || "🏥"}</div>}
            </div>
            <div className="modal-right">
              <h2>{selectedCourse.icon || "🏥"} {selectedCourse.name || selectedCourse.badge}</h2>
              <div className="modal-grades">
                {(selectedCourse.topics || selectedCourse.feats)?.map(g => <span className="grade-chip" key={g}>{g}</span>)}
              </div>
              <p className="modal-desc">{selectedCourse.sub || selectedCourse.full}</p>
              <div className="modal-features">
                <div className="feat">✓ Dedicated doubt-clearing sessions</div>
                <div className="feat">✓ Rigorous testing & feedback</div>
                <div className="feat">✓ Expert faculty supervision</div>
              </div>
              <button 
                className="btn-gold" 
                onClick={() => { setSelectedCourse(null); goTo("enquiry"); }} 
                style={{ width: "100%", marginTop: "24px", justifyContent: "center" }}>
                🎯 Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FeesPage({ goTo }) {
  return (
    <div>
      <div className="fees-hero">
        <div className="section-label">💰 Transparent Pricing</div>
        <div className="section-title">Fee Structure</div>
        <div className="section-sub" style={{ color: "rgba(255,255,255,0.6)" }}>No hidden charges. Flexible monthly plans designed for every budget and learning objective.</div>
      </div>
      <div className="fees-body" style={{ background: "var(--light)", padding: "100px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div className="section-label">Monthly Plans — Regular Batches</div>
          <div className="section-title" style={{ fontSize: "2.8rem" }}>Choose Your Learning Track</div>
        </div>
        
        <div className="fees-grid" style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          {FEES.map((f, i) => {
            const isLeftImage = i % 2 === 0;
            const img = `/images/fee${i + 1}.jpeg`;

            return (
              <div className={`fee-row-card fee-row-card-grid${f.popular ? " popular" : ""}`} key={f.tier} style={{
                background: f.popular ? "var(--navy)" : "var(--white)",
                border: f.popular ? "none" : "1px solid var(--mist)", borderRadius: "24px", overflow: "hidden",
                boxShadow: f.popular ? "0 25px 50px rgba(11,31,58,0.2)" : "0 15px 35px rgba(0,0,0,0.06)"
              }}>
                {isLeftImage && (
                  <div className="fee-row-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", background: f.popular ? "rgba(255,255,255,0.03)" : "rgba(30,5,51,0.02)" }}>
                    <img src={img} alt={f.tier} style={{ maxWidth: "100%", maxHeight: "450px", objectFit: "contain", borderRadius: "16px" }} />
                  </div>
                )}
                
                <div className="fee-row-content" style={{ color: f.popular ? "var(--white)" : "var(--navy)" }}>
                  {f.popular && <div className="fee-popular-tag" style={{ position: "absolute", top: 0, right: "30px", background: "var(--gold)", color: "var(--navy)", padding: "8px 24px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px", fontSize: "0.8rem", boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}>Most Popular</div>}
                  <div className="fee-tier" style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2.5px", fontWeight: 800, color: "var(--gold)", marginBottom: "20px" }}>{f.tier} Plan</div>
                  <div className="fee-price" style={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif", lineHeight: 1, marginBottom: "10px", color: f.popular ? "var(--white)" : "var(--navy)" }}>{f.price}</div>
                  <div className="fee-period" style={{ fontSize: "1.05rem", color: f.popular ? "rgba(255,255,255,0.7)" : "var(--gray)", marginBottom: "40px", fontWeight: 500 }}>{f.period}</div>
                  
                  <div className="fee-features-grid">
                    {f.feats.map(ft => (
                      <div className="fee-feat" key={ft} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.05rem", fontWeight: 600, color: f.popular ? "rgba(255,255,255,0.9)" : "var(--navy)" }}>
                        <span style={{ color: "var(--gold)", fontSize: "1.4rem" }}>✓</span> {ft}
                      </div>
                    ))}
                  </div>

                  <button className="fee-btn" style={{ 
                    padding: "18px 40px", background: f.popular ? "var(--gold)" : "transparent", color: f.popular ? "var(--navy)" : "var(--navy)", border: `2.5px solid ${f.popular ? "var(--gold)" : "var(--navy)"}`, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", transition: "all 0.3s", cursor: "pointer", width: "fit-content", fontSize: "0.95rem"
                  }} onClick={() => goTo("enquiry")}>Enquire Now ➔</button>
                </div>

                {!isLeftImage && (
                  <div className="fee-row-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", background: f.popular ? "rgba(255,255,255,0.03)" : "rgba(30,5,51,0.02)" }}>
                    <img src={img} alt={f.tier} style={{ maxWidth: "100%", maxHeight: "450px", objectFit: "contain", borderRadius: "16px" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="fees-bottom-card">
          <div>
            <div className="fees-note" style={{ background: "transparent", border: "none", padding: 0, borderLeft: "none", marginBottom: "40px" }}>
              <h4 style={{ fontSize: "1.8rem", color: "var(--navy)", marginBottom: "24px", fontFamily: "'Outfit', sans-serif" }}>Specialized & Competitive Extracurriculars</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px", paddingLeft: 0 }}>
                <li style={{ display: "flex", gap: "14px", fontSize: "1.1rem", alignItems: "center" }}><span style={{ color: "var(--gold)", fontSize: "1.2rem" }}>▸</span> NEET Full Course (1 Year) — <strong>₹32,000/year</strong></li>
                <li style={{ display: "flex", gap: "14px", fontSize: "1.1rem", alignItems: "center" }}><span style={{ color: "var(--gold)", fontSize: "1.2rem" }}>▸</span> JEE Mains + Advanced (1 Year) — <strong>₹35,000/year</strong></li>
                <li style={{ display: "flex", gap: "14px", fontSize: "1.1rem", alignItems: "center" }}><span style={{ color: "var(--gold)", fontSize: "1.2rem" }}>▸</span> UPSC Foundation + Mains — <strong>₹28,000/year</strong></li>
              </ul>
            </div>
            
            <div className="fees-note" style={{ background: "transparent", border: "none", padding: 0, borderLeft: "none" }}>
              <h4 style={{ fontSize: "1.4rem", color: "var(--navy)", marginBottom: "20px" }}>Exclusive Benefits Included</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", paddingLeft: 0 }}>
                <li style={{ display: "flex", gap: "14px", fontSize: "1.05rem", color: "var(--gray)" }}><span style={{ color: "var(--green)", fontWeight: 800 }}>✓</span> Printed premium study materials & test banks</li>
                <li style={{ display: "flex", gap: "14px", fontSize: "1.05rem", color: "var(--gray)" }}><span style={{ color: "var(--green)", fontWeight: 800 }}>✓</span> Unlimited access to recorded revision classes</li>
                <li style={{ display: "flex", gap: "14px", fontSize: "1.05rem", color: "var(--gray)" }}><span style={{ color: "var(--green)", fontWeight: 800 }}>✓</span> Flat 10% Sibling discount & Need-based scholarships</li>
              </ul>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "450px" }}>
            <img src="/images/fee4.jpeg" alt="Classroom view" style={{ width: "100%", height: "550px", objectFit: "cover", objectPosition: "top", borderRadius: "16px", border: "4px solid var(--white)", boxShadow: "20px 20px 0 var(--gold)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <div className="contact-hero">
        <div className="section-label">📞 Contact Us</div>
        <div className="section-title">Get in Touch</div>
        <div className="section-sub" style={{ color: "rgba(255,255,255,0.6)" }}>Have questions? Visit our centre, call us, or submit your inquiry. We're here to help!</div>
      </div>
      <div className="contact-body">
        <div className="contact-grid">
          <div>
            <div className="section-label" style={{ marginBottom: "20px" }}>Contact Information</div>
            <div className="contact-info-cards">
              {[
                ["📍", "Address", "12, Knowledge Park, Near Central Bus Stand\nChennai – 600 001, Tamil Nadu"],
                ["📞", "Phone", "+91 98765 43210\n+91 98765 43211 (Admin)"],
                ["📧", "Email", "info@cornerstonemathsphere.in\nadmissions@cornerstonemathsphere.in"],
                ["🕐", "Centre Hours", "Mon – Sat: 7:00 AM – 9:00 PM\nSunday: 9:00 AM – 1:00 PM"],
              ].map(([icon, label, val]) => (
                <div className="cinfo-card" key={label}>
                  <div className="cinfo-icon">{icon}</div>
                  <div>
                    <div className="cinfo-label">{label}</div>
                    <div className="cinfo-val" style={{ whiteSpace: "pre-line" }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="map-block" style={{ marginTop: "20px" }}>
              📍 Google Maps — Cornerstone MathSphere, Chennai
            </div>
          </div>
          <div>
            <div className="contact-form-wrap">
              <h3>📧 Send Us a Message</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[["Name *", "Your full name", "text"], ["Phone *", "9876543210", "tel"], ["Email", "your@email.com", "email"], ["Subject", "What is this about?", "text"]].map(([label, ph, type]) => (
                  <div className="form-group" key={label}>
                    <label className="form-label">{label}</label>
                    <input className="form-input" placeholder={ph} type={type} />
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" placeholder="Your message..." style={{ minHeight: "110px" }} />
                </div>
                <button className="form-submit">Send Message →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnquiryPage() {
  return (
    <div>
      <div className="enq-hero">
        <div className="section-label">🎯 Admissions</div>
        <div className="section-title">Admission<br />Form</div>
        <div className="section-sub" style={{ color: "rgba(255,255,255,0.6)" }}>Complete the form below to start your learning journey. Our admissions team will contact you within 24 hours to discuss your goals and available batch options.</div>
      </div>
      <div className="enq-page">
        <div className="form-card">
          <div style={{ marginBottom: "32px" }}>
            <div className="section-label">Student Admission Form</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)", marginBottom: "8px" }}>Cornerstone MathSphere</div>
            <div style={{ fontSize: "0.82rem", color: "var(--gray)" }}>All fields marked * are required. We'll reach out within one business day.</div>
          </div>
          <EnquiryFormInner />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP SHELL
───────────────────────────────────────────── */
const PAGE_LABELS = { home: "Home", about: "About Us", courses: "Courses", fees: "Fees", contact: "Contact", enquiry: "Enquire" };

export default function App() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const goTo = (p) => { setPage(p); window.scrollTo({ top: 0 }); setMenuOpen(false); };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  return (
    <>
      <style>{G}</style>
      <nav className="nav">
        <div className="nav-brand">
          <div className="nav-logo-icon">C</div>
          <div className="nav-brand-text">
            <span className="nav-brand-name">Cornerstone MathSphere</span>
            <span className="nav-brand-sub">Science & Maths Tuition</span>
          </div>
        </div>
        <ul className="nav-links">
          {["home", "about", "courses", "fees", "contact"].map(p => (
            <li key={p}><button className={page === p ? "active" : ""} onClick={() => goTo(p)}>{PAGE_LABELS[p]}</button></li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button className="theme-toggle" onClick={toggleDarkMode} title="Toggle Dark Mode">{darkMode ? "☀️" : "🌙"}</button>
          <button className="nav-enq" onClick={() => goTo("enquiry")}>Enquire / Admit</button>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div className="mobile-nav-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="mobile-offcanvas">
            <div className="offcanvas-header">
              <div className="offcanvas-logo">
                <span style={{color:"var(--navy)"}}>Cornerstone</span> <span style={{color:"var(--gold)"}}>MathSphere</span>
              </div>
              <button className="offcanvas-close" onClick={() => setMenuOpen(false)}>×</button>
            </div>
            
            <div className="offcanvas-links">
              {["home", "about", "courses", "fees", "contact"].map(p => (
                <button key={p} onClick={() => goTo(p)}>
                  {PAGE_LABELS[p]}
                  <span>➜</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="page">
        {page === "home" && <HomePage goTo={goTo} />}
        {page === "about" && <AboutPage />}
        {page === "courses" && <CoursesPage goTo={goTo} />}
        {page === "fees" && <FeesPage goTo={goTo} />}
        {page === "contact" && <ContactPage />}
        {page === "enquiry" && <EnquiryPage />}
      </div>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-brand-name">Cornerstone <span>MathSphere</span></span>
            <p>Expert coaching in Mathematics, Physics, Chemistry & Biology for all standards. NEET, JEE & UPSC exam tracks.</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <a href="#!" style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.1)", borderRadius: "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>f</a>
              <a href="#!" style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.1)", borderRadius: "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>𝕏</a>
              <a href="#!" style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.1)", borderRadius: "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>in</a>
              <a href="#!" style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.1)", borderRadius: "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>📱</a>
            </div>
          </div>
          {[
            ["Quick Links", ["Home", "About Us", "Courses", "Fee Structure", "Contact Us", "Enquiry Form"]],
            ["Subjects", ["Mathematics", "Chemistry", "Physics", "Biology"]],
            ["Exam Tracks", ["NEET Coaching", "JEE Mains & Advanced", "UPSC Foundation", "Weekend Crash Batches"]],
          ].map(([title, links]) => (
            <div className="footer-col" key={title}>
              <h4>{title}</h4>
              <ul>{links.map(l => <li key={l} onClick={() => {
                if (l === "Home") goTo("home");
                else if (l === "About Us") goTo("about");
                else if (l.includes("Course") || l.includes("Subject") || l.includes("Maths") || l.includes("Chemistry") || l.includes("Physics") || l.includes("Biology") || l.includes("NEET") || l.includes("JEE") || l.includes("UPSC") || l.includes("Weekend")) goTo("courses");
                else if (l.includes("Fee")) goTo("fees");
                else if (l === "Contact Us") goTo("contact");
                else if (l.includes("Enquiry")) goTo("enquiry");
              }}>{l}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Cornerstone MathSphere. All rights reserved.</span>
          <span>📍 12, Knowledge Park, Chennai – 600 001 | ☎ +91 98765 43210 | 📧 info@cornerstonemathsphere.in</span>
        </div>
      </footer>
    </>
  );
}
