"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function RegionalRiskMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly"
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 }, // Center of India
          zoom: 4,
          disableDefaultUI: true,
          styles: [
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#242f3e" }]
            },
            {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }]
            },
            {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }]
            }
          ]
        });

        // Mock risk markers
        const risks = [
          { pos: { lat: 19.0760, lng: 72.8777 }, color: "#ef4444", label: "High Risk" },
          { pos: { lat: 28.6139, lng: 77.2090 }, color: "#f59e0b", label: "Med Risk" },
          { pos: { lat: 12.9716, lng: 77.5946 }, color: "#10b981", label: "Low Risk" },
        ];

        risks.forEach(r => {
          new google.maps.Circle({
            strokeColor: r.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: r.color,
            fillOpacity: 0.35,
            map,
            center: r.pos,
            radius: 200000
          });
        });
      }
    });
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}
