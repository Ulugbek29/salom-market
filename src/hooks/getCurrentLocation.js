// function getCurrentLocation(setPlacemark) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setPlacemark([position.coords.latitude, position.coords.longitude]);
//       },
//       (error) => {
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             console.error("User denied Geolocation. Please enable location services.");
//             alert("Please enable location services to use this feature.");
//             break;
//           case error.POSITION_UNAVAILABLE:
//             console.error("Location information is unavailable.");
//             alert("Location information is unavailable. Please try again later.");
//             break;
//           case error.TIMEOUT:
//             console.error("The request to get user location timed out.");
//             alert("The request to get user location timed out. Please try again later.");
//             break;
//           case error.UNKNOWN_ERROR:
//             console.error("An unknown error occurred.");
//             alert("An unknown error occurred. Please try again later.");
//             break;
//           default:
//             console.error("Error getting current location:", error.message);
//             alert("Error getting current location: " + error.message);
//             break;
//         }
//       }
//     );
//   } else {
//     console.error("Geolocation is not supported by this browser.");
//     alert("Geolocation is not supported by this browser.");
//   }
// }

// export default getCurrentLocation;





export const getCurrentLocation = (setValue) => {

  function success(pos) {
    const crd = pos.coords;
    // setPlacemark([crd.latitude, crd.longitude]);
    setValue("placemark",[crd.latitude, crd.longitude])
  }
  function error(prop) {
    console.log("ERROR => ", prop);
    // Handle error, such as displaying a message to the user
  }
  // Request location permission and get current position
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });

}




