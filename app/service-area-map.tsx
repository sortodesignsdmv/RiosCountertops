'use client';

import { useEffect, useRef, useState } from 'react';
import type { LatLngBounds, Map as LeafletMap, Marker } from 'leaflet';
import { MapPin } from 'lucide-react';
import { SERVICE_CITIES } from './service-cities';

export default function ServiceAreaMap() {
  const frameRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const boundsRef = useRef<LatLngBounds | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let disposed = false;
    let resize: ResizeObserver | undefined;
    let map: LeafletMap | undefined;

    async function loadMap() {
      try {
        const L = await import('leaflet');
        if (disposed || !frame) return;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        map = L.map(frame, {
          scrollWheelZoom: false,
          dragging: window.matchMedia('(pointer: fine)').matches,
          touchZoom: false,
          doubleClickZoom: false,
          boxZoom: false,
          minZoom: 8,
          maxZoom: 14,
          zoomSnap: 0.25,
          zoomAnimation: !reducedMotion,
          fadeAnimation: !reducedMotion,
          markerZoomAnimation: !reducedMotion,
        });
        mapRef.current = map;
        map.attributionControl.setPrefix(false);
        const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);
        let successfulTiles = 0;
        let failedTiles = 0;
        tiles.on('tileload', () => { successfulTiles += 1; if (!disposed) setStatus('ready'); });
        tiles.on('tileerror', () => {
          failedTiles += 1;
          if (!disposed && failedTiles >= 4 && successfulTiles === 0) setStatus('error');
        });

        const pin = L.divIcon({
          className: 'city-map-marker',
          html: '<span class="service-city-pin"><span></span></span>',
          iconSize: [24, 30],
          iconAnchor: [12, 28],
          popupAnchor: [0, -28],
        });
        const markers: Record<string, Marker> = {};
        for (const city of SERVICE_CITIES) {
          const label = `${city.name}, ${city.state}`;
          const popup = document.createElement('div');
          const heading = document.createElement('strong');
          heading.textContent = label;
          const note = document.createElement('span');
          note.textContent = 'Granite & quartz countertop service';
          popup.appendChild(heading);
          popup.appendChild(note);
          popup.className = 'service-city-popup';
          const marker = L.marker([city.lat, city.lng], { icon: pin, title: label, alt: label })
            .addTo(map)
            .bindPopup(popup, { closeButton: true, minWidth: 155 });
          marker.on('click', () => {
            if (disposed) return;
            for (const other of Object.values(markers)) other.setZIndexOffset(0);
            marker.setZIndexOffset(500);
            setSelected(city.id);
          });
          markers[city.id] = marker;
        }
        markersRef.current = markers;
        boundsRef.current = L.latLngBounds(SERVICE_CITIES.map(city => [city.lat, city.lng]));
        map.fitBounds(boundsRef.current, { padding: [32, 32], animate: false });
        resize = new ResizeObserver(() => {
          if (!map || disposed) return;
          map.invalidateSize({ pan: false });
        });
        resize.observe(frame);
      } catch {
        if (!disposed) setStatus('error');
      }
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      void loadMap();
    }, { rootMargin: '120px' });
    observer.observe(frame);
    return () => {
      disposed = true;
      observer.disconnect();
      resize?.disconnect();
      map?.remove();
      mapRef.current = null;
      boundsRef.current = null;
      markersRef.current = {};
    };
  }, []);

  function focusCity(id: string) {
    setSelected(id);
    const map = mapRef.current;
    if (!map) return;
    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    map.closePopup();
    for (const marker of Object.values(markersRef.current)) marker.setZIndexOffset(0);
    const city = SERVICE_CITIES.find(item => item.id === id);
    if (city) {
      map.setView([city.lat, city.lng], 12, { animate });
      markersRef.current[id]?.setZIndexOffset(500).openPopup();
    } else if (boundsRef.current) {
      map.fitBounds(boundsRef.current, { padding: [32, 32], animate });
    }
  }

  return <div className="service-map-card">
    <div className="service-map-heading"><span><MapPin size={16} strokeWidth={1.5} /> A little closer to home</span><span>DMV</span></div>
    <label className="map-city-label" htmlFor="map-city">Explore a city</label>
    <select id="map-city" className="map-city-select" value={selected} onChange={event => focusCity(event.target.value)}>
      <option value="">All highlighted cities</option>
      {SERVICE_CITIES.map(city => <option value={city.id} key={city.id}>{city.name}, {city.state}</option>)}
    </select>
    <div className="service-map-frame">
      <div ref={frameRef} className="service-map" role="region" aria-label="Map of the eight highlighted RIOS service cities" />
      {status === 'loading' && <p className="map-status" role="status">Loading the neighborhood…</p>}
      {status === 'error' && <div className="map-status map-error" role="status"><span>The map is temporarily unavailable.</span><a href="https://www.openstreetmap.org/#map=9/38.93/-76.87" target="_blank" rel="noopener noreferrer">Open the DMV map ↗</a></div>}
    </div>
    <p className="service-map-note">City-center pins · select a city for a closer look</p>
  </div>;
}
