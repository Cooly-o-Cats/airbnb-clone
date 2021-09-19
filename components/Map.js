import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from "geolib/es/getCenter";
import { LocationMarkerIcon } from '@heroicons/react/solid';

function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the Search Results object into { latitude: 52.516272, longitude: 13.377722 } for each stay
    const coordinates = searchResults.map(result => ({
        latitude: result.lat,
        longitude: result.long
    }));

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL 
            mapStyle="mapbox://styles/liamr44/cktra6prn0hq419pbqekdjykn" 
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <a aria-label="push-pin" href="#" onClick={() => setSelectedLocation(result)}><LocationMarkerIcon className="w-4 h-4 text-red-400 animate-bounce"/></a>
                    </Marker>

                    {/* Show a Popup based on the Selected Location If Marker Clicked */}
                    {selectedLocation.long === result.long ? (
                        <Popup 
                            closeOnClick={true} 
                            onClose={() => setSelectedLocation({})} 
                            latitude={result.lat} 
                            longitude={result.long}
                            className="z-10 rounded-xl"
                        >
                            {result.title}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))};

        </ReactMapGL>
    )
}

export default Map
