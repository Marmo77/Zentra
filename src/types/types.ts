export type TaskProps = {
  id: number;
  task: string;
  isCompleted: boolean;
};
export type Environment = "rain" | "forest" | "night" | "cafe" | "ocean" | null;

export type UserSettings = {
  saveToLocalStorage: boolean;
  saveTime: boolean;
  saveAmbinetSounds: boolean;
};
export type AmbinetSounds = {
  environment: Environment;
  isMuted: boolean;
  volume: number;
};
