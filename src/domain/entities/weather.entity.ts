export interface WeatherEntity {
  id: string;
  lat: number;
  lon: number;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
