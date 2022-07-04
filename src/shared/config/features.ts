export type Features = {
  geolocation: boolean;
  autorization: boolean;
  ping: boolean;
  config: boolean;
};

export const features: Features = {
  geolocation: true,
  autorization: false,
  ping: true,
  config: true
};

export type FeatureName = keyof Features;
