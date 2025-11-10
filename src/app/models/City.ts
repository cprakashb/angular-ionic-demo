export interface City {
  id: number;
  name: string;
  country: string;
  state?: string;
  coord: { lat: number; lon: number };
}
