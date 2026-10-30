"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "../styles/invitation.module.css";
const links = [{ href: "#story", label: "Our story" }, { href: "#celebration", label: "The celebration" }, { href: "#entourage", label: "Entourage" }, { href: "#gallery", label: "Gallery" }, { href: "#details", label: "Guest details" }];
export default function Navigation() {
  const [expanded,setExpanded] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  useEffect(()=>{const update=()=>setScrolled(window.scrollY>80);update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update);},[]);
  return <header className={`${styles.navigation} ${scrolled || expanded ? styles.navigationSolid : ""} fixed inset-x-0 top-0 z-30`}>
    <nav aria-label="Invitation" className="relative mx-auto flex max-w-[92rem] items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
      <a href="#invitation" aria-label="Jahzen and Glyzell, back to top" className={styles.navMonogram}>J <span>&</span> G</a>
      <div className="hidden items-center gap-6 lg:flex">{links.map(link=><a className={styles.navLink} key={link.href} href={link.href}>{link.label}</a>)}</div>
      <div className="flex items-center gap-4"><a href="#rsvp" className={`${styles.navRsvp} inline-flex min-h-10 items-center px-4 py-2`}>RSVP</a><button type="button" className="inline-flex size-11 items-center justify-center lg:hidden" aria-expanded={expanded} aria-controls="jg-mobile-nav" aria-label={expanded?"Close navigation":"Open navigation"} onClick={()=>setExpanded(value=>!value)}>{expanded?<X size={22}/>:<Menu size={22}/>}</button></div>
      <div id="jg-mobile-nav" hidden={!expanded} className={`${styles.mobileNav} absolute inset-x-0 top-full px-6 pb-5 lg:hidden`}>{links.map(link=><a className={`${styles.navLink} block py-3`} key={link.href} href={link.href} onClick={()=>setExpanded(false)}>{link.label}</a>)}</div>
    </nav>
  </header>;
}
