import {FC} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

interface MapContainerView {
    center: [number, number],
    zoom: number,
    scrollWheelZoom: boolean,
    className: string,
    whenReady?: any
}

export const MapContainerView: FC<MapContainerView> = (
    {
        center,
        zoom,
        scrollWheelZoom,
        children,
        className,
        whenReady
    }
) => {
    return (
        <MapContainer
            whenReady={whenReady}
            className={className}
            center={center}
            zoom={zoom}
            scrollWheelZoom={scrollWheelZoom}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    )
}