import { COLORS } from './constants';
import type { GlassElement, FeatureItem } from './types';

export const GLASS_ELEMENTS: GlassElement[] = [
  { id: 1, top: 100, left: 50, size: 80, intensity: 90, color: COLORS.PRIMARY },
  { id: 2, top: 200, left: 200, size: 60, intensity: 70, color: COLORS.DESTRUCTIVE },
  { id: 3, top: 350, left: 100, size: 100, intensity: 80, color: COLORS.SUCCESS },
  { id: 4, top: 450, left: 250, size: 70, intensity: 85, color: COLORS.WARNING },
];

export const FEATURES: FeatureItem[] = [
  {
    icon: 'sparkles',
    title: 'Dynamic Ripples',
    description: 'Interactive ripple effects that respond to your touch with realistic physics',
    color: COLORS.PRIMARY,
  },
  {
    icon: 'cube',
    title: 'Depth Perception',
    description: 'Multi-layered blur effects create realistic depth and dimension',
    color: COLORS.DESTRUCTIVE,
  },
  {
    icon: 'paintbrush',
    title: 'Haptic Feedback',
    description: 'Tactile responses that enhance the liquid glass interaction experience',
    color: COLORS.SUCCESS,
  },
];