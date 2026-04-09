import { useState } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --navy:#0b1f3a; --navy2:#112950; --blue:#1a4a8a; --sky:#2d7dd2;
  --gold:#d4a837; --gold2:#f0c84a; --cream:#f8f5ef; --white:#ffffff;
  --gray:#4a5568; --light:#eef2f8; --mist:#dde6f4; --red:#c0392b;
  --green:#1a7a4a;
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
.nav{position:fixed;top:0;left:0;right:0;z-index:200;background:var(--navy);
  display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:68px;}
.nav-brand{display:flex;align-items:center;gap:12px;}
.nav-logo-icon{width:38px;height:38px;background:var(--gold);border-radius:8px;
  display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;color:var(--navy);}
.nav-brand-text{display:flex;flex-direction:column;line-height:1.1;}
.nav-brand-name{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;
  color:var(--white);letter-spacing:0.3px;}
.nav-brand-sub{font-size:0.6rem;font-weight:500;color:var(--gold);text-transform:uppercase;letter-spacing:2px;}
.nav-links{display:flex;gap:4px;list-style:none;}
.nav-links li button{background:none;border:none;color:rgba(255,255,255,0.75);
  font-size:0.82rem;font-weight:500;padding:8px 14px;border-radius:6px;
  text-transform:uppercase;letter-spacing:0.6px;transition:all 0.2s;}
.nav-links li button:hover,.nav-links li button.active{color:var(--white);background:rgba(255,255,255,0.1);}
.nav-enq{background:var(--gold);color:var(--navy);border:none;padding:9px 22px;
  border-radius:6px;font-size:0.82rem;font-weight:700;text-transform:uppercase;
  letter-spacing:0.5px;transition:all 0.2s;}
.nav-enq:hover{background:var(--gold2);transform:translateY(-1px);}
.theme-toggle{background:none;border:1px solid rgba(255,255,255,0.3);color:var(--white);
  padding:6px 12px;border-radius:6px;font-size:1rem;cursor:pointer;}

/* PAGE WRAPPER */
.page{padding-top:68px;min-height:100vh;}
.section{padding:80px 60px;}
.section-alt{background:var(--white);}
.section-dark{background:var(--navy);color:var(--white);}
.section-label{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:3px;
  color:var(--gold);margin-bottom:10px;}
.section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.5vw,3rem);
  font-weight:700;line-height:1.1;letter-spacing:-0.5px;margin-bottom:14px;}
.section-sub{font-size:0.95rem;color:var(--gray);font-weight:300;line-height:1.75;max-width:560px;}

/* ── HOME ─────────────────────── */
.hero{
  min-height:calc(100vh - 68px);
  background:linear-gradient(135deg,var(--navy) 0%,var(--navy2) 55%,#0d2d5e 100%);
  position:relative;overflow:hidden;
  display:flex;align-items:center;padding:60px 60px 60px;
}
.hero-geo{position:absolute;top:0;right:0;bottom:0;width:45%;opacity:0.06;
  background:repeating-linear-gradient(45deg,var(--gold) 0,var(--gold) 1px,transparent 1px,transparent 40px);}
.hero-circle{position:absolute;right:8%;top:50%;transform:translateY(-50%);
  width:380px;height:380px;border-radius:50%;
  border:1px solid rgba(212,168,55,0.2);
  display:flex;align-items:center;justify-content:center;}
.hero-circle2{width:280px;height:280px;border-radius:50%;
  border:1px solid rgba(212,168,55,0.3);
  display:flex;align-items:center;justify-content:center;}
.hero-circle3{width:180px;height:180px;border-radius:50%;
  background:rgba(212,168,55,0.08);border:1px solid rgba(212,168,55,0.4);
  display:flex;align-items:center;justify-content:center;
  font-family:'Cormorant Garamond',serif;font-size:1rem;color:var(--gold);
  text-align:center;line-height:1.4;padding:20px;}
.hero-content{max-width:600px;position:relative;z-index:1;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;
  background:rgba(212,168,55,0.15);border:1px solid rgba(212,168,55,0.3);
  color:var(--gold);padding:6px 16px;border-radius:20px;
  font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:28px;}
.hero h1{font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.8rem,5vw,4.5rem);font-weight:700;
  color:var(--white);line-height:1.05;letter-spacing:-1.5px;margin-bottom:10px;}
.hero h1 span{color:var(--gold);}
.hero-tagline{font-size:0.95rem;color:rgba(255,255,255,0.6);
  text-transform:uppercase;letter-spacing:3px;font-weight:300;margin-bottom:24px;}
.hero-desc{font-size:1.05rem;color:rgba(255,255,255,0.72);
  line-height:1.8;font-weight:300;max-width:500px;margin-bottom:40px;}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;}
.btn-gold{background:var(--gold);color:var(--navy);border:2px solid var(--gold);
  padding:13px 32px;border-radius:6px;font-size:0.88rem;font-weight:700;
  text-transform:uppercase;letter-spacing:0.5px;transition:all 0.2s;}
.btn-gold:hover{background:var(--gold2);border-color:var(--gold2);transform:translateY(-2px);}
.btn-ghost{background:transparent;color:var(--white);
  border:2px solid rgba(255,255,255,0.35);padding:13px 32px;border-radius:6px;
  font-size:0.88rem;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;transition:all 0.2s;}
.btn-ghost:hover{border-color:var(--white);background:rgba(255,255,255,0.08);}
.hero-stats{display:flex;gap:36px;margin-top:52px;padding-top:40px;
  border-top:1px solid rgba(255,255,255,0.1);}
.hstat{display:flex;flex-direction:column;gap:4px;}
.hstat-n{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;
  color:var(--gold);line-height:1;}
.hstat-l{font-size:0.7rem;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;}

.home-subjects{padding:80px 60px;background:var(--white);}
.subjects-row{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:48px;}
.subj-card{border:1px solid var(--mist);border-radius:12px;padding:32px 24px;
  background:var(--cream);cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;}
.subj-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:var(--gold);transform:scaleX(0);transition:transform 0.3s;transform-origin:left;}
.subj-card:hover{box-shadow:0 12px 40px rgba(11,31,58,0.12);transform:translateY(-4px);}
.subj-card:hover::before{transform:scaleX(1);}
.subj-icon{width:52px;height:52px;background:var(--light);border-radius:10px;
  display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:18px;}
.subj-name{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;margin-bottom:8px;}
.subj-desc{font-size:0.82rem;color:var(--gray);line-height:1.65;}
.subj-grades{display:flex;gap:6px;flex-wrap:wrap;margin-top:14px;}
.grade-chip{font-size:0.67rem;background:var(--light);color:var(--blue);
  padding:3px 10px;border-radius:10px;font-weight:600;letter-spacing:0.3px;}

.home-exam{padding:80px 60px;background:var(--navy);}
.exam-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
.exam-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);
  border-radius:12px;padding:36px 28px;transition:all 0.3s;}
.exam-card:hover{background:rgba(255,255,255,0.07);border-color:var(--gold);transform:translateY(-4px);}
.exam-badge{display:inline-block;background:var(--gold);color:var(--navy);
  font-size:0.78rem;font-weight:800;padding:4px 14px;border-radius:4px;
  text-transform:uppercase;letter-spacing:1px;margin-bottom:20px;}
.exam-name{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:700;
  color:var(--white);margin-bottom:6px;}
.exam-full{font-size:0.78rem;color:rgba(255,255,255,0.45);margin-bottom:16px;text-transform:uppercase;letter-spacing:0.5px;}
.exam-desc{font-size:0.85rem;color:rgba(255,255,255,0.65);line-height:1.7;}
.exam-topics{display:flex;gap:6px;flex-wrap:wrap;margin-top:16px;}
.exam-topic{font-size:0.68rem;background:rgba(212,168,55,0.12);color:var(--gold);
  padding:3px 10px;border-radius:8px;font-weight:600;}

.home-why{padding:80px 60px;background:var(--cream);}
.why-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-top:48px;}
.why-points{display:flex;flex-direction:column;gap:24px;}
.why-pt{display:flex;gap:16px;align-items:flex-start;}
.why-num{width:36px;height:36px;border-radius:50%;background:var(--gold);
  color:var(--navy);display:flex;align-items:center;justify-content:center;
  font-size:0.8rem;font-weight:800;flex-shrink:0;}
.why-pt-t{font-size:0.95rem;font-weight:600;margin-bottom:4px;}
.why-pt-d{font-size:0.83rem;color:var(--gray);line-height:1.6;}
.why-visual{background:var(--navy);border-radius:16px;padding:40px;
  box-shadow:20px 20px 0 var(--gold);}
.why-visual h3{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;
  color:var(--white);margin-bottom:6px;}
.why-visual p{font-size:0.8rem;color:rgba(255,255,255,0.5);margin-bottom:28px;}
.bar-item{margin-bottom:14px;}
.bar-label{display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:5px;}
.bar-label span:first-child{color:rgba(255,255,255,0.7);}
.bar-label span:last-child{color:var(--gold);font-weight:700;}
.bar-track{height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;}
.bar-fill{height:100%;background:linear-gradient(90deg,var(--gold),var(--gold2));border-radius:3px;}

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
.val-card{background:var(--cream);border-radius:10px;padding:22px;border:1px solid var(--mist);}
.val-icon{font-size:1.3rem;margin-bottom:10px;}
.val-title{font-size:0.88rem;font-weight:700;color:var(--navy);margin-bottom:4px;}
.val-desc{font-size:0.78rem;color:var(--gray);line-height:1.55;}
.team-section{padding:60px;background:var(--cream);}
.team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px;}
.team-card{background:var(--white);border-radius:12px;overflow:hidden;
  border:1px solid var(--mist);transition:transform 0.3s,box-shadow 0.3s;}
.team-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(0,0,0,0.08);}
.team-avatar{height:140px;display:flex;align-items:center;justify-content:center;
  font-size:3rem;background:linear-gradient(135deg,var(--light),var(--mist));}
.team-body{padding:20px;}
.team-name{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700;}
.team-role{font-size:0.75rem;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin:4px 0 8px;}
.team-bio{font-size:0.78rem;color:var(--gray);line-height:1.55;}

/* ── COURSES ─────────────────────── */
.courses-hero{background:var(--navy);padding:70px 60px;color:var(--white);}
.courses-hero .section-title{color:var(--white);}
.courses-body{padding:70px 60px;background:var(--white);}
.courses-tabs{display:flex;gap:8px;margin-bottom:48px;flex-wrap:wrap;}
.tab-btn{background:var(--cream);border:1px solid var(--mist);color:var(--gray);
  padding:9px 22px;border-radius:6px;font-size:0.82rem;font-weight:600;
  text-transform:uppercase;letter-spacing:0.5px;transition:all 0.2s;}
.tab-btn.active,.tab-btn:hover{background:var(--navy);color:var(--white);border-color:var(--navy);}
.course-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;}
.course-card{border:1px solid var(--mist);border-radius:12px;overflow:hidden;
  background:var(--cream);transition:all 0.3s;}
.course-card:hover{box-shadow:0 8px 32px rgba(0,0,0,0.08);transform:translateY(-3px);}
.course-header{padding:24px 28px 18px;border-bottom:1px solid var(--mist);
  display:flex;align-items:center;gap:16px;}
.course-icon{width:48px;height:48px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;font-size:1.4rem;}
.course-title{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;}
.course-sub{font-size:0.75rem;color:var(--gray);margin-top:2px;}
.course-body{padding:18px 28px 22px;}
.course-topics{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:16px;}
.topic-item{font-size:0.78rem;color:var(--gray);display:flex;align-items:center;gap:6px;}
.topic-item::before{content:'▸';color:var(--gold);font-size:0.7rem;}
.course-stds{font-size:0.75rem;color:var(--blue);font-weight:600;}

.exam-section{padding:70px 60px;background:var(--cream);}
.exam-full-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
.exam-full-card{background:var(--white);border:1px solid var(--mist);border-radius:14px;
  padding:36px 28px;transition:all 0.3s;}
.exam-full-card:hover{border-color:var(--gold);box-shadow:0 8px 32px rgba(0,0,0,0.08);}
.exam-full-card .exam-badge{margin-bottom:16px;}
.exam-full-card h3{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:700;
  color:var(--navy);margin-bottom:4px;}
.exam-full-name{font-size:0.75rem;color:var(--gray);margin-bottom:14px;}
.exam-feature-list{display:flex;flex-direction:column;gap:8px;}
.exam-feat{font-size:0.82rem;color:var(--gray);display:flex;align-items:center;gap:8px;}
.exam-feat::before{content:'✓';color:var(--green);font-weight:700;font-size:0.85rem;}

/* ── FEES ─────────────────────── */
.fees-hero{background:var(--navy);padding:70px 60px;color:var(--white);}
.fees-hero .section-title{color:var(--white);}
.fees-body{padding:70px 60px;background:var(--white);}
.fees-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:48px;}
.fee-card{border-radius:14px;padding:36px 28px;border:2px solid var(--mist);
  background:var(--cream);position:relative;transition:all 0.3s;}
.fee-card:hover{border-color:var(--gold);transform:translateY(-4px);}
.fee-card.popular{border-color:var(--gold);background:var(--navy);}
.fee-popular-tag{position:absolute;top:-12px;left:50%;transform:translateX(-50%);
  background:var(--gold);color:var(--navy);font-size:0.68rem;font-weight:800;
  padding:4px 14px;border-radius:10px;text-transform:uppercase;letter-spacing:0.8px;white-space:nowrap;}
.fee-tier{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;
  color:var(--gold);margin-bottom:12px;}
.fee-price{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:700;
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
.fee-btn{width:100%;padding:12px;border-radius:6px;font-size:0.85rem;font-weight:700;
  text-transform:uppercase;letter-spacing:0.5px;border:2px solid var(--gold);
  background:transparent;color:var(--gold);transition:all 0.2s;}
.fee-btn:hover{background:var(--gold);color:var(--navy);}
.fee-card.popular .fee-btn{background:var(--gold);color:var(--navy);border-color:var(--gold);}
.fee-card.popular .fee-btn:hover{background:var(--gold2);}
.fees-note{background:var(--light);border-radius:10px;padding:24px 28px;
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
.footer-brand-name{font-family:'Cormorant Garamond',serif;font-size:1.2rem;
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
@media(max-width:900px){
  .nav{padding:0 20px;}
  .nav-links{display:none;}
  .hero,.section,.courses-body,.fees-body,.contact-body,.enq-page,
  .about-body,.about-hero,.courses-hero,.fees-hero,.contact-hero,.enq-hero,
  .home-subjects,.home-exam,.home-why,.team-section,.exam-section{padding:56px 20px;}
  .subjects-row,.exam-grid,.course-grid,.fees-grid,.exam-full-grid,
  .team-grid,.about-grid,.why-grid,.contact-grid{grid-template-columns:1fr;}
  .form-row{grid-template-columns:1fr;}
  .hero-stats{gap:20px;flex-wrap:wrap;}
  .hero-circle{display:none;}
  footer{padding:40px 20px 24px;}
}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SUBJECTS = [
  { icon: "📐", name: "Mathematics", desc: "Algebra, Geometry, Calculus, Statistics — from fundamentals to advanced concepts.", grades: ["Class 1–5", "Class 6–10", "Class 11–12"] },
  { icon: "⚗️", name: "Chemistry", desc: "Organic, Inorganic & Physical Chemistry with concept clarity and problem solving.", grades: ["Class 8–10", "Class 11–12"] },
  { icon: "🔭", name: "Physics", desc: "Mechanics, Electricity, Optics, Modern Physics — from basics to board-level mastery.", grades: ["Class 8–10", "Class 11–12"] },
  { icon: "🧬", name: "Biology", desc: "Botany, Zoology, Human Physiology — structured for strong academic and competitive foundation.", grades: ["Class 8–10", "Class 11–12"] },
];

const EXAMS = [
  { badge: "NEET", full: "National Eligibility cum Entrance Test", desc: "Comprehensive NEET preparation covering Physics, Chemistry & Biology with test series and previous year papers.", topics: ["Physics", "Chemistry", "Botany", "Zoology", "Mock Tests"] },
  { badge: "JEE", full: "Joint Entrance Examination", desc: "Rigorous JEE Mains & Advanced coaching with problem-solving strategies, shortcuts and extensive practice.", topics: ["Maths", "Physics", "Chemistry", "Advanced Problems"] },
  { badge: "UPSC", full: "Union Public Service Commission", desc: "Foundation to advanced UPSC preparation with GS papers, optional subjects and essay & answer-writing workshops.", topics: ["GS Paper 1–4", "Essay", "Optional Subject", "Current Affairs"] },
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
  const [form, setForm] = useState({ name: "", phone: "", email: "", std: "", subject: "", exam: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handle = async () => {
    if (form.name && form.phone) {
      setLoading(true);
      try {
        const response = await fetch('/api/submit-enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (response.ok) {
          setSubmitted(true);
        }
      } catch (err) {
        console.error('Form submission error:', err);
      } finally {
        setLoading(false);
      }
    }
  };
  if (submitted) return (
    <div className="form-success">
      <div style={{ fontSize: "2rem" }}>✅</div>
      <h3>Enquiry Submitted!</h3>
      <p>Thank you, <strong>{form.name}</strong>. Our team will contact you within 24 hours.<br />For urgent queries call <strong>+91 98765 43210</strong>.</p>
    </div>
  );
  return (
    <div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Student Name *</label>
          <input className="form-input" placeholder="Full Name" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Parent / Guardian Name</label>
          <input className="form-input" placeholder="Parent Name" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input className="form-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => set("phone", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" placeholder="email@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
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
          <select className="form-select">
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
      <button className="form-submit" onClick={handle} disabled={loading}>{loading ? "Submitting..." : "Submit Enquiry →"}</button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGES
───────────────────────────────────────────── */
function HomePage({ goTo }) {
  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-geo"></div>
        <div className="hero-circle">
          <div className="hero-circle2">
            <div className="hero-circle3">Cornerstone<br />MathSphere</div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">Est. 2012 · Excellence in Education</div>
          <h1>Cornerstone<br /><span>MathSphere</span></h1>
          <div className="hero-tagline">Science & Mathematics Tuition Centre</div>
          <p className="hero-desc">Expert coaching for all standards — from foundational learning to competitive exam mastery in NEET, JEE & UPSC. Personalised. Proven. Powerful.</p>
          <div className="hero-btns">
            <button className="btn-gold" onClick={() => goTo("enquiry")}>Apply for Admission</button>
            <button className="btn-ghost" onClick={() => goTo("courses")}>View Courses</button>
          </div>
          <div className="hero-stats">
            {[["1200+","Students Trained"],["98%","Board Pass Rate"],["10+","Years Experience"],["3","Exam Tracks"]].map(([n,l]) => (
              <div className="hstat" key={l}>
                <span className="hstat-n">{n}</span>
                <span className="hstat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="home-subjects">
        <div className="section-label">Our Subjects</div>
        <div className="section-title">Core Sciences &<br />Mathematics</div>
        <div style={{ fontSize: "0.92rem", color: "var(--gray)", marginBottom: "0" }}>Available for all standards from Class 1 to Class 12</div>
        <div className="subjects-row">
          {SUBJECTS.map(s => (
            <div className="subj-card" key={s.name}>
              <div className="subj-icon">{s.icon}</div>
              <div className="subj-name">{s.name}</div>
              <div className="subj-desc">{s.desc}</div>
              <div className="subj-grades">
                {s.grades.map(g => <span className="grade-chip" key={g}>{g}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive Exams */}
      <div className="home-exam">
        <div className="section-label">Competitive Coaching</div>
        <div className="section-title" style={{ color: "var(--white)" }}>NEET · JEE · UPSC</div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.92rem", fontWeight: 300, marginBottom: "0" }}>Structured tracks for India's most prestigious entrance exams</div>
        <div className="exam-grid">
          {EXAMS.map(e => (
            <div className="exam-card" key={e.badge}>
              <div className="exam-badge">{e.badge}</div>
              <div className="exam-name">{e.badge} Coaching</div>
              <div className="exam-full">{e.full}</div>
              <div className="exam-desc">{e.desc}</div>
              <div className="exam-topics">
                {e.topics.map(t => <span className="exam-topic" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Us */}
      <div className="home-why">
        <div className="why-grid">
          <div>
            <div className="section-label">Why Choose Us</div>
            <div className="section-title">Built on a<br />Foundation of Results</div>
            <div className="why-points">
              {[
                ["Individual Attention", "Small batch sizes ensure every student gets personal focus and timely feedback."],
                ["Experienced Faculty", "All tutors are postgraduates with 10+ years of teaching experience."],
                ["Structured Curriculum", "Aligned with CBSE/State board syllabus plus competitive exam requirements."],
                ["Regular Assessments", "Weekly tests and monthly mock exams keep students on track consistently."],
                ["Doubt Clearing Sessions", "Dedicated doubt-solving hours daily — no question goes unanswered."],
              ].map(([t, d], i) => (
                <div className="why-pt" key={t}>
                  <div className="why-num">{String(i + 1).padStart(2, "0")}</div>
                  <div><div className="why-pt-t">{t}</div><div className="why-pt-d">{d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="why-visual">
            <h3>Student Results</h3>
            <p>Average improvement after one semester</p>
            {[["Mathematics", "94%"], ["Physics", "89%"], ["Chemistry", "91%"], ["Biology", "93%"], ["Overall", "92%"]].map(([s, v]) => (
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
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "var(--navy)", marginBottom: "12px" }}>Ready to Start Your Journey?</div>
        <div style={{ fontSize: "0.95rem", color: "#5a3e00", marginBottom: "28px" }}>Admissions open for the new batch. Limited seats available.</div>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-gold" style={{ background: "var(--navy)", borderColor: "var(--navy)", color: "var(--white)" }} onClick={() => goTo("enquiry")}>Enquire Now</button>
          <button className="btn-ghost" style={{ color: "var(--navy)", borderColor: "var(--navy)" }} onClick={() => goTo("fees")}>View Fee Structure</button>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <div className="about-hero">
        <div className="section-label">About Us</div>
        <div className="section-title">Cornerstone MathSphere</div>
        <div className="section-sub">A centre built on rigour, care and the belief that every student can excel with the right guidance.</div>
      </div>
      <div className="about-body">
        <div className="about-grid">
          <div className="about-text">
            <div className="section-label">Our Story</div>
            <div className="section-title" style={{ fontSize: "1.8rem" }}>Shaping Minds Since 2012</div>
            <p>Cornerstone MathSphere was founded with a simple but powerful conviction — that <strong>quality science and mathematics education</strong> should be accessible to every student, regardless of their starting point.</p>
            <p>Over a decade, we have grown from a small neighbourhood tuition centre to one of the most trusted academic coaching institutions in the region, with a track record of producing <strong>board toppers and competitive exam qualifiers</strong> year after year.</p>
            <p>Our approach combines <strong>concept-first teaching</strong>, regular practice, personalised feedback, and a nurturing environment where students feel confident to ask, explore, and grow.</p>
            <p>Whether you're a Class 3 student building arithmetic foundations or a Class 12 aspirant targeting NEET or JEE, Cornerstone MathSphere has a programme designed precisely for you.</p>
          </div>
          <div>
            <div className="section-label" style={{ marginBottom: "16px" }}>Our Core Values</div>
            <div className="about-values">
              {[
                ["🎯", "Excellence", "We set high standards and support every student in reaching them."],
                ["🤝", "Integrity", "Honest guidance, transparent fees, and genuine care for outcomes."],
                ["💡", "Innovation", "Modern teaching methods combined with time-tested academic rigour."],
                ["🌱", "Growth Mindset", "We believe every student can improve with the right support."],
              ].map(([icon, title, desc]) => (
                <div className="val-card" key={title}>
                  <div className="val-icon">{icon}</div>
                  <div className="val-title">{title}</div>
                  <div className="val-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="team-section">
        <div className="section-label">Our Faculty</div>
        <div className="section-title">Meet the Experts</div>
        <div className="team-grid">
          {TEAM.map(t => (
            <div className="team-card" key={t.name}>
              <div className="team-avatar">{t.emoji}</div>
              <div className="team-body">
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
                <div className="team-bio">{t.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesPage() {
  const [tab, setTab] = useState("all");
  const courseList = [
    { icon: "📐", color: "#eef2f8", name: "Mathematics", sub: "Class 1 – 12 | All Boards", topics: ["Number Systems", "Algebra & Geometry", "Trigonometry", "Calculus", "Statistics", "Probability"], stds: "Available for all standards" },
    { icon: "⚗️", color: "#fef9ec", name: "Chemistry", sub: "Class 8 – 12 | CBSE & State", topics: ["Atomic Structure", "Chemical Bonding", "Organic Chemistry", "Electrochemistry", "Thermodynamics", "Equilibrium"], stds: "Class 8 to Class 12" },
    { icon: "🔭", color: "#eef8f4", name: "Physics", sub: "Class 8 – 12 | CBSE & State", topics: ["Mechanics", "Thermodynamics", "Optics", "Electrostatics", "Magnetism", "Modern Physics"], stds: "Class 8 to Class 12" },
    { icon: "🧬", color: "#f5eef8", name: "Biology", sub: "Class 8 – 12 | CBSE & State", topics: ["Cell Biology", "Genetics", "Human Physiology", "Plant Physiology", "Ecology", "Biotechnology"], stds: "Class 8 to Class 12" },
  ];
  const filtered = tab === "all" ? courseList : tab === "science" ? courseList.slice(1) : courseList.slice(0, 1);
  return (
    <div>
      <div className="courses-hero">
        <div className="section-label">Courses & Subjects</div>
        <div className="section-title">What We Teach</div>
        <div className="section-sub" style={{ color: "rgba(255,255,255,0.6)" }}>Comprehensive subject coverage for Classes 1–12 plus competitive exam tracks for NEET, JEE and UPSC.</div>
      </div>
      <div className="courses-body">
        <div className="courses-tabs">
          {[["all", "All Subjects"], ["science", "Science (PCB)"], ["math", "Mathematics"]].map(([key, label]) => (
            <button key={key} className={`tab-btn${tab === key ? " active" : ""}`} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>
        <div className="course-grid">
          {filtered.map(c => (
            <div className="course-card" key={c.name}>
              <div className="course-header" style={{ background: c.color }}>
                <div className="course-icon" style={{ background: "white" }}>{c.icon}</div>
                <div>
                  <div className="course-title">{c.name}</div>
                  <div className="course-sub">{c.sub}</div>
                </div>
              </div>
              <div className="course-body">
                <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--navy)", marginBottom: "10px" }}>Topics Covered</div>
                <div className="course-topics">
                  {c.topics.map(t => <div className="topic-item" key={t}>{t}</div>)}
                </div>
                <div className="course-stds" style={{ marginTop: "14px" }}>📚 {c.stds}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="exam-section">
        <div className="section-label">Competitive Exam Coaching</div>
        <div className="section-title">NEET · JEE · UPSC</div>
        <div style={{ fontSize: "0.92rem", color: "var(--gray)", fontWeight: 300 }}>Intensive, structured programmes for India's top competitive exams</div>
        <div className="exam-full-grid">
          {[
            { badge: "NEET", full: "National Eligibility cum Entrance Test", feats: ["Complete Physics, Chemistry & Biology coverage", "Chapter-wise tests & full mock exams", "Previous year paper analysis", "NCERT mastery sessions", "Doubt-clearing workshops", "Performance tracking dashboard"] },
            { badge: "JEE", full: "Joint Entrance Examination (Mains & Advanced)", feats: ["Maths, Physics & Chemistry deep dive", "JEE Advanced problem-solving strategies", "Speed & accuracy building drills", "All India mock test series", "Rank improvement strategies", "Personal mentor assignment"] },
            { badge: "UPSC", full: "Union Public Service Commission", feats: ["GS Papers 1, 2, 3, 4 complete coverage", "Essay & answer-writing workshop", "Optional subject coaching", "Current affairs daily update sessions", "Interview guidance", "CSAT preparation"] },
          ].map(e => (
            <div className="exam-full-card" key={e.badge}>
              <div className="exam-badge">{e.badge}</div>
              <h3>{e.badge} Track</h3>
              <div className="exam-full-name">{e.full}</div>
              <div className="exam-feature-list">
                {e.feats.map(f => <div className="exam-feat" key={f}>{f}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeesPage({ goTo }) {
  return (
    <div>
      <div className="fees-hero">
        <div className="section-label">Fee Structure</div>
        <div className="section-title">Transparent &<br />Affordable Pricing</div>
        <div className="section-sub" style={{ color: "rgba(255,255,255,0.6)" }}>No hidden charges. Simple monthly plans to match every learning goal.</div>
      </div>
      <div className="fees-body">
        <div className="section-label" style={{ marginBottom: "40px" }}>Monthly Plans — Regular Batches</div>
        <div className="fees-grid">
          {FEES.map(f => (
            <div className={`fee-card${f.popular ? " popular" : ""}`} key={f.tier}>
              {f.popular && <div className="fee-popular-tag">Most Popular</div>}
              <div className="fee-tier">{f.tier}</div>
              <div className="fee-price">{f.price}</div>
              <div className="fee-period">{f.period}</div>
              <div className="fee-divider"></div>
              <div className="fee-features">
                {f.feats.map(ft => <div className="fee-feat" key={ft}>{ft}</div>)}
              </div>
              <button className="fee-btn" onClick={() => goTo("enquiry")}>Enquire Now</button>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
          <div className="fees-note">
            <h4>Competitive Exam Coaching Fees</h4>
            <ul>
              <li>NEET Full Course (1 Year) — ₹32,000/year</li>
              <li>JEE Mains + Advanced (1 Year) — ₹35,000/year</li>
              <li>UPSC Foundation + Mains — ₹28,000/year</li>
              <li>Weekend crash batches available at ₹8,000/month</li>
            </ul>
          </div>
          <div className="fees-note">
            <h4>Payment & Concession Policy</h4>
            <ul>
              <li>10% sibling discount for a second enrolled child</li>
              <li>Need-based scholarship available — inquire at centre</li>
              <li>Quarterly advance payment attracts 5% discount</li>
              <li>Fees payable by 5th of every month (cash / UPI / NEFT)</li>
            </ul>
          </div>
        </div>

        <div className="fees-note">
          <h4>What's Included in All Plans</h4>
          <ul>
            <li>Printed and digital study materials</li>
            <li>Chapter-wise assessment sheets and answer keys</li>
            <li>Access to recorded explanation videos for revision</li>
            <li>Parent–teacher communication via WhatsApp group</li>
            <li>Annual prize distribution for top performers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div>
      <div className="contact-hero">
        <div className="section-label">Get in Touch</div>
        <div className="section-title">Contact Us</div>
        <div className="section-sub" style={{ color: "rgba(255,255,255,0.6)" }}>We'd love to hear from you. Visit us or drop a message — we respond within 24 hours.</div>
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
              <h3>Send Us a Message</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[["Name *", "Your full name", "text"], ["Phone *", "+91 XXXXX XXXXX", "tel"], ["Email", "your@email.com", "email"], ["Subject", "What is this about?", "text"]].map(([label, ph, type]) => (
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
        <div className="section-label">Admissions</div>
        <div className="section-title">Enquiry &<br />Admission Form</div>
        <div className="section-sub" style={{ color: "rgba(255,255,255,0.6)" }}>Fill in the details below and our admissions team will get back to you within 24 hours to guide you through the next steps.</div>
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
  const goTo = (p) => { setPage(p); window.scrollTo({ top: 0 }); };

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
        </div>
      </nav>

      <div className="page">
        {page === "home" && <HomePage goTo={goTo} />}
        {page === "about" && <AboutPage />}
        {page === "courses" && <CoursesPage />}
        {page === "fees" && <FeesPage goTo={goTo} />}
        {page === "contact" && <ContactPage />}
        {page === "enquiry" && <EnquiryPage />}
      </div>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-brand-name">Cornerstone <span>MathSphere</span></span>
            <p>Expert coaching in Mathematics, Physics, Chemistry & Biology for all standards. NEET, JEE & UPSC exam tracks.</p>
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
          <span>📍 Chennai, Tamil Nadu · ☎ +91 98765 43210</span>
        </div>
      </footer>
    </>
  );
}
