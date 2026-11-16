'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Thumbs, Zoom } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import styles from './PropertyGallery.module.scss';

function Lightbox({ images, startIndex, onClose, title }) {
  const [index, setIndex] = useState(startIndex);
  const swiperRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${title} photo viewer`}>
      <div className={styles.lbBar}>
        <p aria-live="polite">
          {index + 1} / {images.length}
        </p>
        <button type="button" onClick={onClose} aria-label="Close fullscreen viewer" autoFocus>
          <X size={24} />
        </button>
      </div>
      <Swiper
        modules={[Keyboard, A11y, Zoom]}
        keyboard={{ enabled: true }}
        zoom
        initialSlide={startIndex}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setIndex(s.activeIndex)}
        className={styles.lbSwiper}
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.src}>
            <div className="swiper-zoom-container">
              <Image src={img.src} alt={img.alt} width={1600} height={1067} sizes="100vw" className={styles.lbImage} priority={i === startIndex} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous image" disabled={index === 0}>
        <ChevronLeft size={26} />
      </button>
      <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => swiperRef.current?.slideNext()} aria-label="Next image" disabled={index === images.length - 1}>
        <ChevronRight size={26} />
      </button>
    </div>
  );
}

export default function PropertyGallery({ images, title }) {
  const [thumbs, setThumbs] = useState(null);
  const [index, setIndex] = useState(0);
  const [lightboxAt, setLightboxAt] = useState(null);
  const mainRef = useRef(null);

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <Swiper
          modules={[Thumbs, Keyboard, A11y]}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
          keyboard={{ enabled: true }}
          onSwiper={(s) => (mainRef.current = s)}
          onSlideChange={(s) => setIndex(s.activeIndex)}
          a11y={{ prevSlideMessage: 'Previous image', nextSlideMessage: 'Next image' }}
          className={styles.mainSwiper}
        >
          {images.map((img, i) => (
            <SwiperSlide key={img.src}>
              <button type="button" className={styles.slideBtn} onClick={() => setLightboxAt(i)} aria-label={`Open ${img.alt} in fullscreen`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1100px) 100vw, 800px"
                  className={styles.img}
                  priority={i === 0}
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        <span className={styles.counter} aria-hidden="true">
          {index + 1} / {images.length}
        </span>

        <button type="button" className={styles.expand} onClick={() => setLightboxAt(index)} aria-label="View fullscreen">
          <Expand size={18} /> <span>Fullscreen</span>
        </button>

        <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => mainRef.current?.slidePrev()} aria-label="Previous image" disabled={index === 0}>
          <ChevronLeft size={22} />
        </button>
        <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => mainRef.current?.slideNext()} aria-label="Next image" disabled={index === images.length - 1}>
          <ChevronRight size={22} />
        </button>
      </div>

      {images.length > 1 && (
        <Swiper
          modules={[Thumbs, A11y]}
          onSwiper={setThumbs}
          spaceBetween={10}
          slidesPerView={3.2}
          breakpoints={{ 600: { slidesPerView: 4.2 }, 1100: { slidesPerView: 5 } }}
          watchSlidesProgress
          className={styles.thumbs}
          a11y={{ enabled: false }}
        >
          {images.map((img) => (
            <SwiperSlide key={img.thumb} className={styles.thumb}>
              <Image src={img.thumb} alt="" fill sizes="160px" className={styles.img} />
              <span className="visually-hidden">{img.alt}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {lightboxAt !== null && <Lightbox images={images} startIndex={lightboxAt} title={title} onClose={() => setLightboxAt(null)} />}
    </div>
  );
}
