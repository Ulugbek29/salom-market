// import React, { useEffect, useState } from 'react'

// function useGeoLocation() {
//     const [position, setPosition] = useState([41.3113, 69.279773])
//     const [error, setError] = useState()

//     useEffect(()=> {
//         const geo = navigator.geolocation;

//         if(!geo) {
//             setError("location data not available")
//             return
//         }
//         const currentPosition = geo.watchPosition((e)=> {
//             setPosition(e.coords)
//         }, (e) => setError(e.message));
//         return () => geo.clearWatch(currentPosition)
//     },[setError, setPosition])

//   return {
//     position, 
//     error
//   }
// }

// export default useGeoLocation


import React, { useEffect, useState } from 'react';

function useGeoLocation() {
    const [position, setPosition] = useState([41.3113, 69.279773]);
    const [error, setError] = useState();

    useEffect(() => {
        const geo = navigator.geolocation;

        if (!geo) {
            setError("Location data not available");
            return;
        }

        geo.getCurrentPosition(
            (position) => {
                setPosition(position.coords);
            },
            (error) => {
                setError(error.message);
            }
        );
    }, []);

    return {
        position,
        error
    };
}

export default useGeoLocation;
