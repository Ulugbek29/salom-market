import cls from "./styles.module.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  GeolocationControl,
  Placemark,
  YMaps,
  ZoomControl,
  Map,
} from "@pbe/react-yandex-maps";
import TextField from "../../components/FormElements/TextField"
import FRow from "../../components/FormElements/FRow"
import MapList from "../../components/MapList"
import { getGeoLocation } from "../../services/yandexSerive";
import { getCurrentLocation } from "../../hooks/getCurrentLocation";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrder } from "../../store/order/order.slice";
import placemarkIcon from "/placemark.png";
import { apikey, geoApikey } from "../../services/yandexSerive";
import useGeoLocation from "../../hooks/useGeoLocation";
import useOutsideClick from "../../hooks/useOutsideClick";






export default function DeliveryMap({ control, setValue, watch }) {
  const [addressList, setAddressList] = useState([]);
  const [mapHasResponse, setMapHasResponse] = useState(false);
  // const [ymaps, setYmaps] = useState();
  const [placemark, setPlacemark] = useState([41.3113, 69.279773]); //41.3113, 69.279773
  const [zoom, setZoom] = useState(12);
  const [geolocationFetched, setGeolocationFetched] = useState(false);
  const mapRef = useRef();
  const {
    order: {
      userData: { address },
    },
  } = useSelector((store) => store);
  const dispatch = useDispatch();
  const addressInput = watch("address", "")
  const addressCoordinates = watch("placemark", []);
  


  useEffect(() => {
    function success(pos) {
      const crd = pos.coords;
      setPlacemark([crd.latitude, crd.longitude]);
      // setValue("placemark",[crd.latitude, crd.longitude])
      setGeolocationFetched(true);
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
  }, []);


  useEffect(() => {
    if (addressInput !== "" && mapHasResponse) {
      const getData = setTimeout(() => {
        fetchLocations(addressInput);
      }, 300);
      return () => {
        clearTimeout(getData);
      };
    }
  }, [addressInput]);




  

  useEffect(() => {
    if (geolocationFetched) {
      getGeoLocation({ lat: placemark[1], long: placemark[0] }).then((res) => {

        // if (res.features) {

        //   const newAddress = res?.features[0].properties?.name;

        //   const districtComponent = res.features
        //   .filter((add) => add.properties.name.includes("tumani"))
        //   .map((add) => add.properties.name);

        //   setZoom(17);
        //   // setValue("placemark", placemark);
        //   setValue("address", newAddress);
        //   dispatch(
        //     setUserOrder({
        //       // address: newAddress,
        //       district: districtComponent[0],
        //     })
        //   );
        // }




        // Geo Code
        if (res.response) {
          console.log("res", res.response)
          const newAddress =
            res.response.GeoObjectCollection.featureMember[0].GeoObject.name;
            
               const districtComponent = res.response.GeoObjectCollection.featureMember
          .filter((add) => add.GeoObject.name.includes("tumani"))
          .map((add) => add.GeoObject.name);


            const localityComponent = res.response.GeoObjectCollection.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.find(
              (component) => component.kind === "locality"
            );

            console.log("districtComponent",districtComponent)
            console.log("localityComponent",localityComponent)
          setZoom(17);
          setValue("placemark", placemark);
          setValue("address", newAddress);
          dispatch(
            setUserOrder({
              // address: newAddress,
              district: districtComponent ? districtComponent : localityComponent?.name,
            })
          );
        }
      });
    }
  }, [placemark]);

  

  useEffect(() => {
    const mapInstance = mapRef.current;

    const handleBoundsChange = () => {
      const newZoom = mapInstance.getZoom();
      setZoom(newZoom);
    };

    if (mapInstance) {
      mapInstance.events.add("boundschange", handleBoundsChange);
    }

    return () => {
      if (mapInstance) {
        mapInstance.events.remove("boundschange", handleBoundsChange);
      }
    };
  }, [mapRef]);

 

  const fetchLocations = async (query) => {
    try {
      if (query !== "") {
        // Only fetch if the query is not empty
        const response = await axios.get(
          `https://search-maps.yandex.ru/v1/?apikey=${apikey}&text=${query}&lang=uz_UZ`
          // `https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&format=json&geocode=${query}&lang=uz_UZ` //geocode&ll=69.2401,41.2995&spn=0.2,0.2&rspn=1
        );
        const data = response.data.features;
        // const data = response.data.response.GeoObjectCollection.featureMember; // geocode
        if (data) {
          const extractedLocations = data.map((feature) => ({
            name: feature.properties.name,
            coordinates: feature.geometry.coordinates.reverse(),
            description: feature.properties.description,
          }));

          // const extractedLocations = data.map((feature) => ({
          //   name: feature.GeoObject.name,
          //   coordinates: feature.GeoObject.Point.pos.split(" ").reverse(),
          //   description: feature.GeoObject.description,
          // })); // geocode
          
          setAddressList(extractedLocations);
          // setMapHasResponse(true); // Set mapHasResponse to true only when there's a response
        }
      } else {
        setAddressList([]); // Clear the address list if the query is empty
        setMapHasResponse(false); // Set mapHasResponse to false when there's no query
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

   //Pick the addreess from the address list
   const pickAddress = (placeLocation, addressName) => {
    // setValue("placemark", placeLocation);
    setPlacemark(placeLocation)
    setValue("address", addressName);
    setAddressList([]);
    setMapHasResponse(false);
    setZoom(17);
  };

  // console.log(addressList)
  // console.log("placemark", placemark);
  return (
    <div className={cls.map}>
      <div className={cls.map__wrapper}>
        {/* <p className={cls.adressP}>Manzil:</p> */}
        {/* <div className={cls.place}>{address}</div> */}
       <div style={{ position: "relative", width: "100%" }}>
                <FRow label="Manzil" position>
                  <TextField
                    onFocus={()=>setMapHasResponse(true)}
                    // onBlur={()=>setMapHasResponse(false)}
                    fullWidth
                    name="address"
                    control={control}
                  />
                </FRow>
                {(mapHasResponse && addressList.length > 0) && (
                  <MapList
                    locations={addressList}
                    pickAddress={pickAddress}
                    setAddressList={setAddressList}
                    setMapHasResponse={setMapHasResponse}
                  />
                )}
              </div>
        <PrimaryButton
          type="button"
          center
          classes={cls.get_location_btn}
          onClick={() => {
            setZoom(17);
            getCurrentLocation(setPlacemark);
          }}
        >
          Yetkazib berish manzilini belgilang
        </PrimaryButton>
        <YMaps
          query={{
            apikey: geoApikey,
            load: "util.bounds",
          }}
        >
          <Controller
            name="placemark"
            control={control}
            render={({ field: {onChange, value} }) => (
              <Map
                instanceRef={mapRef}
                width="100%"
                onClick={(e) => {
                  onChange(e.get("coords"));
                  setPlacemark(e.get("coords"));
                  setZoom(17);
                }}
                modules={["geocode", "geolocation"]}
                options={{ suppressMapOpenBlock: true, controls: [] }}
                state={{
                  // center: value && value.length > 0
                  //             ? value
                  //             : [],
                  center: placemark,
                  zoom: zoom,
                  controls: [],
                  behaviors: ["default", "scrollZoom"],
                }}
              >
                <GeolocationControl
                  options={{
                    position: {
                      top: 8,
                      right: 8,
                    },
                    size: "40px",
                  }}
                />
                <ZoomControl
                  options={{
                    position: {
                      bottom: 50,
                      right: 8,
                    },
                    size: "40px",
                    width: "40px",
                    height: "40px",
                    cornerRadius: "50%",
                  }}
                />
                <Placemark
                  geometry={placemark}
                  options={{
                    draggable: true,
                    iconLayout: "default#image",
                    iconImageHref: placemarkIcon,
                    iconImageSize: [50, 50],
                    iconImageOffset: [-25, -45],
                  }}
                  onDragEnd={(e) => {
                    const newCoords = e.get("target").geometry.getCoordinates();
                    setPlacemark(newCoords);
                    onChange(newCoords);
                  }}
                  onClick={(e) => {
                    const map = e.get("map");
                    map.setZoom(17);
                    map.setCenter(value);
                  }}
                />
              </Map>
            )}
          />
        </YMaps>
      </div>
    </div>
  );
}
