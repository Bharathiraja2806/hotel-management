import React, { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Menu as MenuIcon, X, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const food = [
  { name: 'Masala dosa', tag: 'THE SIGNATURE', title: <>Crispy. Golden.<br/><em>Unforgettable.</em></>, copy: 'A whisper-thin, golden dosa. A heart of spiced potato. The first bite is always a little moment.', img: 'photo-1668236543090-82eba5ee5976', alt: 'Golden South Indian dosa served with chutneys', tone: '#263126', price: '₹ 240' },
  { name: 'Idly & vada', tag: 'A GENTLE START', title: <>Soft as a cloud.<br/><em>Made with care.</em></>, copy: 'Pillowy idly, slow-fermented overnight and served warm with our house-made sambar.', img: 'photo-1589301760014-d929f3979dbc', alt: 'A traditional South Indian breakfast plate', tone: '#4d4032', price: '₹ 180' },
  { name: 'Chicken biryani', tag: 'THE SUNDAY TABLE', title: <>Spice, soul<br/><em>& slow Sundays.</em></>, copy: 'Fragrant jeera samba rice, gently layered with warming spices and a little patience.', img: 'photo-1563379091339-03246963d96a', alt: 'Aromatic biryani rice with herbs and spices', tone: '#452a20', price: '₹ 420' },
  { name: 'South Indian meals', tag: 'A TABLE OF PLENTY', title: <>A little of<br/><em>everything.</em></>, copy: 'Seasonal vegetables, dal, rasam, rice and all the small things that make a meal feel like home.', img: 'photo-1547592180-85f173990554', alt: 'Colorful traditional Indian thali with several dishes', tone: '#3b3021', price: '₹ 380' },
];
const dishes = [
  { name:'Masala dosa', desc:'Golden, crisp & filled with our signature potato masala.', price:'₹ 240', img:'photo-1668236543090-82eba5ee5976', label:'HOUSE FAVOURITE' },
  { name:'Idly & vada', desc:'Cloud-soft idly and a golden lentil vada, with sambar.', price:'₹ 180', img:'photo-1589301760014-d929f3979dbc', label:'ALL-DAY COMFORT' },
  { name:'Ven pongal', desc:'Slow-cooked rice and lentils, finished with ghee & pepper.', price:'₹ 210', img:'photo-1547592180-85f173990554', label:'MORNING RITUAL' },
  { name:'Chicken biryani', desc:'Aromatic jeera samba rice, layered with warming spices.', price:'₹ 420', img:'photo-1563379091339-03246963d96a', label:'SUNDAY TABLE' },
  { name:'Filter coffee', desc:'A strong, sweet, slow-poured South Indian classic.', price:'₹ 90', img:'photo-1461023058943-07fcbe16d735', label:'ONE MORE CUP' },
];
const src = (id, w=1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

function Nav(){const [open,setOpen]=useState(false);return <header className="nav"><a className="brand" href="#home"><span className="brand-mark">S<span>&</span>S</span><span className="brand-name">SAFFRON <i>&</i> STONE<small>A SOUTH INDIAN TABLE</small></span></a><nav className={open?'nav-links show':'nav-links'}><a href="#story" onClick={()=>setOpen(false)}>Our story</a><a href="#menu" onClick={()=>setOpen(false)}>The menu</a><a href="#experience" onClick={()=>setOpen(false)}>The experience</a><a href="#visit" onClick={()=>setOpen(false)}>Find us</a></nav><a className="nav-cta" href="#visit">Reserve a table <ArrowUpRight size={15}/></a><button className="menu-toggle" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<MenuIcon/>}</button></header>}

function Hero(){return <section className="hero" id="home"><div className="hero-image"/><div className="hero-shade"/><div className="hero-content"><motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="eyebrow"><span/>ROOTED IN THE SOUTH. MADE FOR EVERY TABLE.</motion.div><motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.1}}>Come hungry.<br/><em>Leave a little</em><br/>more <em>yourself.</em></motion.h1><motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.45}}>The warmth of a familiar table, with a story in every bite.</motion.p><motion.a initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.6}} className="button button-gold" href="#signature">Come on in <ArrowRight size={16}/></motion.a></div><div className="hero-side">EST. WITH LOVE · CHENNAI</div><div className="hero-bottom"><span>01 — 04</span><span>SCROLL TO TASTE</span><ArrowDown size={16}/></div></section>}

function Transformation(){
  const root=useRef(null);
  const stage=useRef(null);
  useLayoutEffect(()=>{
    const media=gsap.matchMedia();
    media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
      const images=gsap.utils.toArray('.dish-scene');
      const copy=gsap.utils.toArray('.food-copy');
      const bg=root.current.querySelector('.transform-bg');
      gsap.set(images,{autoAlpha:0,xPercent:12,scale:.84,rotation:5});
      gsap.set(copy,{autoAlpha:0,y:22});
      gsap.set([images[0],copy[0]],{autoAlpha:1,xPercent:0,scale:1,rotation:0,y:0});
      const tl=gsap.timeline({
        defaults:{ease:'power2.inOut'},
        scrollTrigger:{trigger:root.current,start:'top top',end:'+=4000',pin:stage.current,scrub:.85,anticipatePin:1,invalidateOnRefresh:true}
      });
      const labels=['idly','biryani','meals'];
      labels.forEach((label,index)=>{
        const outgoing=index, incoming=index+1, at=.75+index*1.2;
        tl.addLabel(label,at)
          .to(bg,{backgroundColor:food[incoming].tone,duration:1.05},label)
          .to(images[outgoing],{xPercent:-24,scale:.76,rotation:-6,autoAlpha:0,duration:1.05},label)
          .fromTo(images[incoming],{xPercent:24,scale:.76,rotation:6,autoAlpha:0},{xPercent:0,scale:1,rotation:0,autoAlpha:1,duration:1.05,immediateRender:false},label)
          .to(copy[outgoing],{autoAlpha:0,y:-18,duration:.42},`${label}+=.12`)
          .fromTo(copy[incoming],{autoAlpha:0,y:18},{autoAlpha:1,y:0,duration:.48,immediateRender:false},`${label}+=.48`);
      });
      },root);
      return()=>ctx.revert();
    });
    const refresh=()=>ScrollTrigger.refresh();
    if(document.readyState==='complete')refresh();else window.addEventListener('load',refresh,{once:true});
    return()=>{window.removeEventListener('load',refresh);media.revert()};
  },[]);
  return <section className="transform-section" id="signature" ref={root}><div className="transform-bg"/><div className="transform-stage" ref={stage}><div className="transform-top"><span>THE SIGNATURE SEQUENCE</span><span>SCROLL TO SAVOUR &nbsp; ↓</span></div><div className="food-visual">{food.map(d=><div key={d.name} className="dish-scene" style={{backgroundImage:`url(${src(d.img,1300)})`}} role="img" aria-label={d.alt}><div className="food-glow"/></div>)}<div className="steam" aria-hidden="true"><i/><i/><i/></div><span className="visual-stamp">S<span>&</span>S<br/><small>MADE SLOW</small></span></div><div className="transform-text">{food.map(d=><article className="food-copy" key={d.name}><div className="eyebrow"><span/>{d.tag}</div><h2>{d.title}</h2><p>{d.copy}</p><a className="text-link" href="#menu">Discover the dish <ArrowRight size={16}/></a></article>)}</div><div className="transform-footer"><span>FRESH OFF THE TAWA, EVERY TIME</span><span>SCROLL TO CONTINUE &nbsp; ↓</span></div></div><div className="transform-mobile" aria-label="Signature dishes">{food.map(d=><motion.article key={d.name} className="mobile-food" style={{backgroundImage:`linear-gradient(0deg,rgba(15,19,15,.8),transparent),url(${src(d.img,900)})`}} initial={{opacity:0,y:34,scale:.97}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:false,amount:.3}} transition={{duration:.65,ease:[.22,.61,.36,1]}}><span className="eyebrow">{d.tag}</span><h2>{d.name}</h2><p>{d.copy}</p></motion.article>)}</div></section>
}

function Specialties(){
  const root=useRef(null);
  useLayoutEffect(()=>{
    const media=gsap.matchMedia();
    media.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
      const track=root.current.querySelector('.specialty-track');
      const distance=()=>Math.max(0,track.scrollWidth-root.current.clientWidth);
      const range={trigger:root.current,start:'top top',end:()=>`+=${distance()}`,scrub:.9,invalidateOnRefresh:true};
      gsap.to(track,{x:()=>-distance(),ease:'none',scrollTrigger:{...range,pin:root.current.querySelector('.specialty-pin'),anticipatePin:1,onUpdate:self=>root.current?.style.setProperty('--gallery-progress',`${self.progress*100}%`)}});
      gsap.fromTo(root.current.querySelectorAll('.specialty-img'),{scale:1.12},{scale:1,ease:'none',scrollTrigger:{...range,trigger:root.current,start:'top top',end:()=>`+=${distance()}`}});
      },root);
      return()=>ctx.revert();
    });
    return()=>media.revert();
  },[]);
  return <section className="specialties" id="experience" ref={root}><div className="specialty-pin"><div className="specialty-heading"><div><div className="eyebrow"><span/>A FEW TABLE FAVOURITES</div><h2>Made to be <em>shared.</em></h2></div><p>Seven little reasons<br/>to stay a little longer.</p></div><div className="specialty-track">{[...dishes.slice(0,4),{name:'Veg biryani',desc:'Garden vegetables with fragrant rice and fresh herbs.',price:'₹ 340',img:'photo-1512058564366-18510be2db19',label:'PLANT-BASED'},dishes[4]].map((d,i)=><article className="specialty-card" key={d.name}><div className="specialty-img" style={{backgroundImage:`url(${src(d.img,900)})`}}><span>{d.label}</span><b>0{i+1}</b></div><div className="specialty-info"><div><h3>{d.name}</h3><p>{d.desc}</p></div><strong>{d.price}</strong></div></article>)}<a href="#menu" className="menu-end"><span>TAKE A LOOK AROUND</span><h3>Explore our<br/><em>full menu.</em></h3><ArrowUpRight/></a></div><div className="specialty-progress"><span>SCROLL TO EXPLORE</span><div><i/></div><span>06 — 06</span></div></div></section>
}

function Story(){return <section className="story section-pad" id="story"><div className="story-photo" data-motion-image><div className="story-photo-inner"/><span>OUR TABLE, YOURS TOO</span></div><div className="story-copy"><div className="eyebrow"><span/>A LITTLE ABOUT US</div><h2>Some things are<br/>better <em>slow.</em></h2><p className="story-lede">The first thing you notice is the smell. Curry leaves in hot ghee. Coffee roasting. Something crisp coming off the tawa.</p><p>We grew up around food that brought everyone to the table. At Saffron & Stone, we cook with those memories: patient, seasonal, and meant to be passed around. Old recipes, a little room to make them our own, and always one more place set.</p><a className="text-link" href="#visit">Pull up a chair <ArrowRight size={16}/></a><div className="story-signature">With love, from our kitchen <em>S & S</em></div></div></section>}

function Menu(){return <section className="menu-section section-pad" id="menu"><div className="menu-heading"><div><div className="eyebrow"><span/>GOOD THINGS, MADE DAILY</div><h2>The <em>regulars.</em></h2></div><p>Made with care. Served with a little extra chutney.<br/>Here are a few of the dishes we keep coming back to.</p></div><div className="menu-grid">{dishes.slice(0,4).map((d,i)=><article className="menu-item" key={d.name}><div className="menu-img" style={{backgroundImage:`url(${src(d.img,900)})`}}><span>0{i+1}</span></div><div className="menu-item-title"><h3>{d.name}</h3><b>{d.price}</b></div><p>{d.desc}</p></article>)}</div><a className="button button-dark" href="#visit">See what’s cooking <ArrowRight size={16}/></a></section>}

function Quote(){return <section className="quote-section"><div className="quote-top"><span>KIND WORDS, SHARED</span><span>✳ &nbsp; FROM THE TABLE</span></div><div className="quote-mark">“</div><blockquote>It tastes like someone<br/>remembered <em>exactly</em><br/>how home should feel.</blockquote><div className="quote-by"><div className="stars">★★★★★</div><span>ANANYA R. &nbsp;·&nbsp; CHENNAI</span></div><div className="quote-bottom"><span>4.9 / 5 &nbsp; GUEST LOVE</span><div><span>01</span><i/><span>03</span></div></div></section>}

function Visit(){return <section className="visit section-pad" id="visit"><div className="visit-content"><div className="eyebrow"><span/>YOUR PLACE AT THE TABLE</div><h2>Come as<br/><em>you are.</em></h2><p>Long lunch, quick coffee, or a reason to gather. We’ll keep a seat warm.</p><a className="button button-gold" href="mailto:hello@saffronandstone.in?subject=Table%20reservation">Reserve your table <ArrowUpRight size={16}/></a></div><div className="visit-details"><div><span>FIND OUR TABLE</span><p>12, Second Main Road<br/>Raja Annamalaipuram<br/>Chennai, Tamil Nadu 600028</p><a href="https://maps.google.com/?q=Raja+Annamalaipuram+Chennai" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14}/></a></div><div><span>WHEN WE’RE HERE</span><p>Every day<br/>Breakfast · 8 — 11:30<br/>Lunch & dinner · 12 — 10</p></div><div><span>SAY HELLO</span><p>+91 44 4000 2020<br/>hello@saffronandstone.in</p></div></div><div className="visit-photo"/></section>}

function Footer(){return <footer className="footer"><div className="footer-top"><a className="brand" href="#home"><span className="brand-mark">S<span>&</span>S</span><span className="brand-name">SAFFRON <i>&</i> STONE<small>A SOUTH INDIAN TABLE</small></span></a><p>Good food. Good company.<br/>Always room for one more.</p><a className="back-top" href="#home">BACK TO THE TOP ↑</a></div><div className="footer-bottom"><span>© 2025 SAFFRON & STONE</span><div><a href="#story">OUR STORY</a><a href="#menu">THE MENU</a><a href="#visit">FIND US</a></div><a href="https://instagram.com" aria-label="Instagram"><Instagram size={17}/></a></div></footer>}

function PageMotion(){
  useLayoutEffect(()=>{
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      const ctx=gsap.context(()=>{
        const items=gsap.utils.toArray('.story-copy > *, .menu-heading > *, .menu-item, .quote-section blockquote, .quote-section .quote-by, .visit-content > *, .visit-details > div, .footer-top > *');
        items.forEach((item,index)=>gsap.fromTo(item,{autoAlpha:0,y:34},{autoAlpha:1,y:0,duration:.78,delay:(index%4)*.035,ease:'power3.out',scrollTrigger:{trigger:item,start:'top 91%',toggleActions:'play none none reverse'}}));
        gsap.fromTo('.story-photo-inner',{clipPath:'inset(9% 9% 9% 9%)',scale:1.12},{clipPath:'inset(0% 0% 0% 0%)',scale:1,duration:1.25,ease:'power3.out',scrollTrigger:{trigger:'.story-photo',start:'top 82%',toggleActions:'play none none reverse'}});
        gsap.utils.toArray('.story-copy h2 em, .specialty-heading h2 em, .menu-heading h2 em, .visit h2 em, .quote-section blockquote em').forEach((word)=>gsap.fromTo(word,{backgroundSize:'0% 38%'},{backgroundSize:'100% 38%',duration:1,ease:'power2.out',scrollTrigger:{trigger:word,start:'top 86%',toggleActions:'play none none reverse'}}));
        gsap.to('.hero-image',{yPercent:15,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
        gsap.fromTo('.hero-content',{y:0},{y:-72,autoAlpha:.75,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
        gsap.to('.page-progress i',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.documentElement,start:'top top',end:'max',scrub:.2}});
      });
      return()=>ctx.revert();
    });
    return()=>media.revert();
  },[]);
  return <div className="page-progress" aria-hidden="true"><i/></div>;
}

function App(){return <MotionConfig reducedMotion="user"><PageMotion/><Nav/><main><Hero/><Transformation/><Specialties/><Story/><Menu/><Quote/><Visit/></main><Footer/></MotionConfig>}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
