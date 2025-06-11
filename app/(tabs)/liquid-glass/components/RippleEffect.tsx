import React from 'react';
import { Animated } from 'react-native';
import { ANIMATION_CONFIG, LAYOUT } from '../constants';
import { playgroundStyles } from '../styles';
import type { RippleData } from '../types';

interface RippleEffectProps {
  ripple: RippleData;
}

export const RippleEffect = ({ ripple }: RippleEffectProps) => (
  <Animated.View
    style={[
      playgroundStyles.rippleEffect,
      {
        left: ripple.x - LAYOUT.RIPPLE_SIZE / 2,
        top: ripple.y - LAYOUT.RIPPLE_SIZE / 2,
        transform: [
          {
            scale: ripple.anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, ANIMATION_CONFIG.RIPPLE_SCALE],
            }),
          },
        ],
        opacity: ripple.anim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.6, 0],
        }),
      },
    ]}
  />
);