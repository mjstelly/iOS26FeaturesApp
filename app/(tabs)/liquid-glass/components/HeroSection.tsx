import React from 'react';
import { View, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLORS, ANIMATION_CONFIG } from '../constants';
import { heroStyles } from '../styles';

interface HeroSectionProps {
  floatingAnim: Animated.Value;
  pulseAnim: Animated.Value;
}

export const HeroSection = ({ floatingAnim, pulseAnim }: HeroSectionProps) => (
  <View style={heroStyles.heroSection}>
    <LinearGradient
      colors={COLORS.HERO_GRADIENT}
      style={heroStyles.heroGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <BlurView intensity={40} style={heroStyles.heroBlur}>
        <ThemedView style={heroStyles.heroContent}>
          <Animated.View
            style={[
              heroStyles.liquidIcon,
              {
                transform: [
                  {
                    translateY: floatingAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, ANIMATION_CONFIG.FLOATING_DISTANCE],
                      extrapolate: 'clamp',
                    }),
                  },
                  { 
                    scale: pulseAnim.interpolate({
                      inputRange: [0.9, 1.1],
                      outputRange: [1, ANIMATION_CONFIG.PULSE_SCALE],
                      extrapolate: 'clamp',
                    })
                  },
                ],
              },
            ]}
          >
            <IconSymbol name="drop.fill" size={64} color="#ffffff" />
          </Animated.View>
          <ThemedText type="title" style={heroStyles.heroTitle}>
            Liquid Glass
          </ThemedText>
          <ThemedText style={heroStyles.heroSubtitle}>
            Dynamic materials that adapt to your content
          </ThemedText>
        </ThemedView>
      </BlurView>
    </LinearGradient>
  </View>
);