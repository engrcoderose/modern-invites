"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Armchair, ArrowLeft, ArrowRight, Check, Heart, MapPin, Search, X } from "lucide-react";
import { findGuests, guests, normalizeName, tables } from "./sample-data";
import styles from "./seat-finder.module.css";

export default function SeatFinder() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const matches = findGuests(query);
  const selected = guests.find((guest) => guest.id === selectedId);
  const table = tables.find((item) => item.number === selected?.table);
  const hasQuery = normalizeName(query).length >= 2;
  const isAmbiguous = selected && guests.filter((guest) => guest.name === selected.name).length > 1;

  function updateQuery(value: string) {
    setQuery(value);
    setSelectedId(null);
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/eric-and-li" className={styles.back}><ArrowLeft size={16} aria-hidden="true" /> Our invitation</Link>
        <span className={styles.sample}>Sample experience</span>
      </header>

      <div className={styles.content}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>THE WEDDING OF</p>
          <p className={styles.names}>Eric <span>&amp;</span> Li</p>
          <p className={styles.date}>20 JUNE 2030 <span>·</span> VIRDIS GARDEN</p>
          <div className={styles.divider}><span /><Heart size={15} aria-hidden="true" /><span /></div>
          <h1>A place just for you.</h1>
          <p>Find your seat, settle in, and celebrate with us.</p>
        </header>

        <div className={styles.workspace}>
          <section className={styles.finder} aria-labelledby="search-title">
            <div className={styles.sectionTitle}><Armchair size={21} aria-hidden="true" /><h2 id="search-title">Find your seat</h2></div>
            <label htmlFor="guest-name" className={styles.label}>Your first or last name</label>
            <div className={styles.searchbox}>
              <Search size={20} aria-hidden="true" />
              <input ref={inputRef} id="guest-name" type="search" autoComplete="off" maxLength={100} placeholder="e.g. Sofia Reyes" value={query} onChange={(event) => updateQuery(event.target.value)} aria-describedby="search-help" />
              {query && <button type="button" aria-label="Clear search" onClick={() => { updateQuery(""); inputRef.current?.focus(); }}><X size={18} /></button>}
            </div>
            <p id="search-help" className={styles.help}>Enter at least 2 letters, then select your name.</p>

            {!hasQuery && <div className={styles.initial}>
              <p className={styles.eyebrow}>GIVE IT A TRY</p>
              <p>This sample uses fictional guests and seating.</p>
              <div className={styles.examples}>{["Sofia Reyes", "Emma Chen", "Olivia Bennett"].map((name) => <button type="button" key={name} onClick={() => updateQuery(name)}>{name}<ArrowRight size={14} aria-hidden="true" /></button>)}</div>
            </div>}

            <div role="status" aria-live="polite" aria-atomic="true" className={styles.srOnly}>
              {selected && table ? `${selected.name}, Table ${table.number}, ${table.name}, Seat ${selected.seat}. ${table.location}.` : hasQuery ? `${matches.length} matching guests found.` : "Enter at least 2 letters to search."}
            </div>

            {hasQuery && !selected && <div className={styles.results}>
              {matches.length ? <>
                <p className={styles.resultCount}>{matches.length} {matches.length === 1 ? "guest found" : "guests found"} · Select your name</p>
                <ul>{matches.map((guest) => {
                  const duplicate = guests.filter((item) => item.name === guest.name).length > 1;
                  return <li key={guest.id}><button type="button" onClick={() => setSelectedId(guest.id)}><span>{guest.name}{duplicate && <small>Table {guest.table} · Ask our welcome team to confirm</small>}</span><ArrowRight size={18} aria-hidden="true" /></button></li>;
                })}</ul>
              </> : <div className={styles.empty}><Search size={26} aria-hidden="true" /><h3>We couldn’t find that name</h3><p>Try a first name, last name, or a different spelling. Our welcome team can help you find your seat.</p><button type="button" onClick={() => { updateQuery(""); inputRef.current?.focus(); }}>Try another name</button></div>}
            </div>}

            {selected && table && <div className={styles.assignment}>
              <p className={styles.confirmation}><Check size={16} aria-hidden="true" /> {isAmbiguous ? "Please confirm with our welcome team" : "Your place is ready"}</p>
              <h3>{selected.name}</h3>
              <div className={styles.ticket}><div><p>TABLE</p><strong>{String(table.number).padStart(2, "0")}</strong><span>{table.name}</span></div><div><p>SEAT</p><strong>{String(selected.seat).padStart(2, "0")}</strong><span>Reserved for you</span></div></div>
              <p className={styles.location}><MapPin size={17} aria-hidden="true" />{table.location}.</p>
              {isAmbiguous && <p className={styles.help}>More than one sample guest has this name. Our welcome team can confirm the correct assignment.</p>}
              <button type="button" className={styles.reset} onClick={() => { updateQuery(""); inputRef.current?.focus(); }}><ArrowLeft size={15} aria-hidden="true" /> Find another guest</button>
            </div>}
            <p className={styles.assistance}>Need a hand? Our welcome team will be happy to help.</p>
          </section>

          <section className={styles.mapPanel} aria-labelledby="map-title">
            <div className={styles.mapHeader}><div><p className={styles.eyebrow}>THE RECEPTION</p><h2 id="map-title">Your way to the celebration</h2></div><span className={styles.mapLabel}>Sample layout</span></div>
            <div className={styles.floorplan} role="img" aria-label={table ? `Sample reception layout. Your table is ${table.number}, ${table.name}. ${table.location}.` : "Sample reception layout. Tables 1 and 2 at the front, 3 and 4 in the middle, 5 and 6 near the entrance. The dance floor is in the center."}>
              <div className={styles.couple}><Heart size={13} aria-hidden="true" /> ERIC &amp; LI</div>
              <div className={styles.tableGrid}>
                {tables.map((item) => <div key={item.number} className={`${styles.table} ${selected?.table === item.number ? styles.activeTable : ""}`}><span className={styles.tableCircle}>{String(item.number).padStart(2, "0")}{selected?.table === item.number && <Check className={styles.tableCheck} size={14} aria-hidden="true" />}</span><span>{item.name}</span></div>)}
                <div className={styles.danceFloor}>DANCE<br />FLOOR</div>
              </div>
              <div className={styles.entrance}>ENTRANCE <ArrowRight size={13} aria-hidden="true" /></div>
            </div>
            <div className={styles.legend}><span><i />Guest table</span><span><i className={styles.selectedDot} />Your table</span></div>
          </section>
        </div>
        <footer className={styles.footer}>Made for a day to remember. <span>Eric &amp; Li</span></footer>
      </div>
    </main>
  );
}
