'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import 'swiper/css';
import { initials } from '@/lib/formatters';
import SectionHeading from './SectionHeading';
import styles from './Testimonials.module.scss';

export default function Testimonials({ items }) {
  const swiperRef = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  return (
    <section className={styles.section} aria-labelledby="testi-h">
      <div className="container">
        <div className={styles.head}>
          <SectionHeading id="testi-h" eyebrow="Testimonials" title="Stories from fictional clients" text="Sample reviews written for this demo." />
          <div className={styles.nav}>
            <button type="button" onClick={() => swiperRef.current?.slidePrev()} disabled={edge.start} aria-label="Previous testimonials">
              <ChevronLeft size={22} />
            </button>
            <button type="button" onClick={() => swiperRef.current?.slideNext()} disabled={edge.end} aria-label="Next testimonials">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
        <Swiper
          modules={[A11y, Keyboard]}
          keyboard
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{ 700: { slidesPerView: 2.1 }, 1100: { slidesPerView: 3 } }}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setEdge({ start: s.isBeginning, end: s.isEnd })}
          className={styles.swiper}
        >
          {items.map((t) => (
            <SwiperSlide key={t.id} className={styles.slide}>
              <figure className={styles.card}>
                <Quote size={28} className={styles.quote} aria-hidden="true" />
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  {t.image ? (
                    <span className={styles.avatar}>
                      <Image src={t.image} alt="" fill sizes="48px" />
                    </span>
                  ) : (
                    <span className={`${styles.avatar} ${styles.initials}`} aria-hidden="true">
                      {initials(t.name)}
                    </span>
                  )}
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
