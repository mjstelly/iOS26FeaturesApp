import { Animated } from 'react-native';

export interface RippleData {
  id: number;
  x: number;
  y: number;
  anim: Animated.Value;
}

export interface GlassElement {
  id: number;
  top: number;
  left: number;
  size: number;
  intensity: number;
  color: string;
}

export interface FeatureItem {
  icon: 'sparkles' | 'cube' | 'paintbrush';
  title: string;
  description: string;
  color: string;
}