import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { playgroundStyles } from '../styles';
import type { GlassElement as GlassElementType } from '../types';

interface GlassElementProps {
  element: GlassElementType;
  onPress: (event: any) => void;
}

export const GlassElement = ({ element, onPress }: GlassElementProps) => (
  <TouchableOpacity
    style={[
      playgroundStyles.glassElement,
      {
        top: element.top,
        left: element.left,
        width: element.size,
        height: element.size,
      },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <BlurView intensity={element.intensity} style={playgroundStyles.glassBlur}>
      <LinearGradient
        colors={[`${element.color}60`, `${element.color}30`, `${element.color}40`]}
        style={playgroundStyles.elementGradient}
      >
        <View style={playgroundStyles.glassContent}>
          <IconSymbol 
            name="sparkles" 
            size={element.size * 0.4} 
            color={element.color} 
          />
        </View>
      </LinearGradient>
    </BlurView>
  </TouchableOpacity>
);