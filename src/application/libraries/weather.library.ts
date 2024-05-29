export interface IWeatherLibrary {
  postCoordinates(lat: number, lon: number, part: string): Promise<any>;
}

export const IWeatherLibrary = Symbol('IWeatherLibrary');
