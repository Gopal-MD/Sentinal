"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Coordinates } from "@/lib/types";

interface ShipmentMapProps {
  currentLocation: Coordinates;
  waypoints: Coordinates[];
  origin?: Coordinates;
  destination?: Coordinates;
}

export default function ShipmentMap({ currentLocation, waypoints, origin, destination }: ShipmentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const initialMap = new google.maps.Map(mapRef.current, {
          center: currentLocation,
          zoom: 7,
          mapId: "SENTINEL_MAP_ID", // Optional
          disableDefaultUI: false,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#ffffff" }, { weight: "0.1" }]
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [{ visibility: "off" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#1a2c3d" }]
            },
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#2c3e50" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#34495e" }]
            }
          ]
        });

        // Add Current Location Marker
        new google.maps.Marker({
          position: currentLocation,
          map: initialMap,
          title: "Current Location",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#3b82f6",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          },
        });

        // Add Route Polyline
        if (waypoints && waypoints.length > 0) {
            const routePath = new google.maps.Polyline({
                path: waypoints,
                geodesic: true,
                strokeColor: "#3b82f6",
                strokeOpacity: 0.8,
                strokeWeight: 4,
            });
            routePath.setMap(initialMap);

            // Fit bounds to show entire route
            const bounds = new google.maps.LatLngBounds();
            waypoints.forEach(p => bounds.extend(p));
            initialMap.fitBounds(bounds);
        }

        setMap(initialMap);
      }
    });
  }, [currentLocation, waypoints]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-xl" />
  );
}
