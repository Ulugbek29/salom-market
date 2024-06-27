export default function useTelegram() {
  // const tg = {};
  const tg = window.Telegram.WebApp;
  return {
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
  };
}
