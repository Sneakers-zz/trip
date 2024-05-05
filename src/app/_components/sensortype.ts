// sensor-types.ts

export interface SensorData {
  chipId: number;
  'water 1': number;
  'water 2': number;
  'water 3': number;
  'water 4': number;
  'Temp C': number;
  'Temp F': number;
  Uvlight: number;
}
