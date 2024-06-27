// import { apikey } from "../services/yandexSerive"

// export function loadYandexMap(lang) {
//     const hasAdded = !!document.getElementById('yandex-map-script')
//     if (!hasAdded) {
//       var jsElm = document.createElement('script')
//       jsElm.type = 'application/javascript'
//       jsElm.src = `https://api-maps.yandex.ru/2.1/?lang=${
//         lang == 'en' ? 'en-US' : 'ru_RU'
//       }&apikey=${apikey}`
//       jsElm.id = 'yandex-map-script'
//       document.body.appendChild(jsElm)
//     }
//   }