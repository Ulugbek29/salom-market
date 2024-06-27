import { useEffect } from "react";
import Router from "./router";
import useTelegram from "./hooks/useTelegram";
// import { loadYandexMap } from "./utils/loadYandex";

function App() {
  const { tg } = useTelegram();
  let ts = 0;

  // useEffect(() => {
  //   const overflow = 100;
  //   document.body.style.overflowY = 'hidden';
  //   document.body.style.marginTop = `${overflow}px`;
  //   document.body.style.height = window.innerHeight + overflow + "px";
  //   document.body.style.paddingBottom = `${overflow}px`;
  //   window.scrollTo(0, overflow);

  //   const scrollableEl = document.scrollingElement || document.documentElement;

  //   const onTouchStart = (e) => {
  //     ts = e.touches[0].clientY;
  //   };

  //   const onTouchMove = (e) => {
  //     const scroll = scrollableEl.scrollTop;
  //     const te = e.changedTouches[0].clientY;
  //     if (scroll <= 0 && ts < te) {
  //       e.preventDefault();
  //     }
  //   };

  //   document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false });
  //   document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false });

  //   return () => {
  //     document.documentElement.removeEventListener('touchstart', onTouchStart);
  //     document.documentElement.removeEventListener('touchmove', onTouchMove);
  //   };
  // }, []);

 

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
    tg.onEvent('viewportChanged', () => {
      if (!tg.isExpanded) {
        tg.expand();
      }
    });
  }, [tg]);

  
  // useEffect(() => {
  //   loadYandexMap("ru");
  // }, []);

  return <Router />;
}

export default App;
