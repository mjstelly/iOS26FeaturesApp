import { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ANIMATION_CONFIG } from './constants';
import type { RippleData } from './types';

export const useFloatingAnimation = () => {
  const floatingAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: ANIMATION_CONFIG.FLOATING_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: ANIMATION_CONFIG.FLOATING_DURATION,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [floatingAnim]);

  return floatingAnim;
};

export const usePulseAnimation = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: ANIMATION_CONFIG.PULSE_SCALE,
          duration: ANIMATION_CONFIG.PULSE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: ANIMATION_CONFIG.PULSE_DURATION,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return pulseAnim;
};

export const useRippleEffects = () => {
  const [ripples, setRipples] = useState<RippleData[]>([]);
  const rippleCounter = useRef(0);

  const createRipple = (x: number, y: number) => {
    const rippleId = rippleCounter.current++;
    const rippleAnim = new Animated.Value(0);
    
    const newRipple: RippleData = { id: rippleId, x, y, anim: rippleAnim };
    setRipples(prev => [...prev, newRipple]);

    Animated.timing(rippleAnim, {
      toValue: 1,
      duration: ANIMATION_CONFIG.RIPPLE_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return { ripples, createRipple };
};