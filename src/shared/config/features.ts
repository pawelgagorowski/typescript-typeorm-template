export type Features = {
  geolocation: boolean;
  autorization: boolean;
  health: boolean;
  config: boolean;
  user: boolean;
  product: boolean;
};

export const features: Features = {
  geolocation: true,
  autorization: true,
  health: true,
  config: true,
  user: true,
  product: true
};

export type FeatureName = keyof Features;
