import { coerceArray } from '../helpers/coerce';
import { FeatureName, features } from './features';

export default function useFeature(featureName: FeatureName | FeatureName[]): boolean {
  return coerceArray(featureName).some((featureKey) => Boolean(features[featureKey]));
}
