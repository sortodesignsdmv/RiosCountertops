// Representative city points from the 2025 U.S. Census Places Gazetteer.
// https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2025_Gazetteer/2025_Gaz_place_national.zip
// These points identify places; they do not define a service-area boundary.
export const SERVICE_CITIES = [
  { id: 'annapolis', name: 'Annapolis', state: 'MD', lat: 38.972152, lng: -76.505332 },
  { id: 'bethesda', name: 'Bethesda', state: 'MD', lat: 38.987292, lng: -77.118612 },
  { id: 'chevy-chase', name: 'Chevy Chase', state: 'MD', lat: 38.981893, lng: -77.083197 },
  { id: 'potomac', name: 'Potomac', state: 'MD', lat: 39.013332, lng: -77.193579 },
  { id: 'tysons', name: 'Tysons Corner', state: 'VA', lat: 38.921355, lng: -77.227621 },
  { id: 'alexandria', name: 'Alexandria', state: 'VA', lat: 38.819251, lng: -77.083670 },
  { id: 'arlington', name: 'Arlington', state: 'VA', lat: 38.878337, lng: -77.100703 },
  { id: 'washington', name: 'Washington', state: 'DC', lat: 38.904243, lng: -77.016524 },
] as const;
