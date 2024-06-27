import request from "../utils/request";

// export const apikey = "c98d40ff-b595-4324-ac0e-ac2159a1a918";
export const geoApikey = "2859ec3c-55c0-4f22-b3db-88818e3802e3"   //FOR GEOlOCATION
export const apikey = "9a43b82c-7133-4e89-bf67-f18385836828"

const getGeoLocation = ({ lat, long }) =>
  request.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${geoApikey}&format=json&geocode=${lat},${long}&lang=uz_UZ`);
  // const getGeoLocation = ({ lat, long }) =>
  // request.get(`https://search-maps.yandex.ru/v1/?apikey=${apikey}&text=${long},${lat}&lang=uz_UZ`);

export { getGeoLocation };
