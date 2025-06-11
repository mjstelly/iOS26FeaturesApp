import React from 'react';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLORS, BLUR_INTENSITY } from '../constants';
import { heroStyles } from '../styles';

export const HeroSection = () => (
  <View style={heroStyles.heroSection}>
    <LinearGradient
      colors={COLORS.HERO_GRADIENT}
      style={heroStyles.heroGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <BlurView intensity={BLUR_INTENSITY.HERO} style={heroStyles.heroBlur}>
        <ThemedView style={heroStyles.heroContent}>
          <IconSymbol name="brain.head.profile" size={64} color="#ffffff" />
          <ThemedText type="title" style={heroStyles.heroTitle}>
            Apple Intelligence
          </ThemedText>
          <ThemedText style={heroStyles.heroSubtitle}>
            On-device AI that protects your privacy
          </ThemedText>
        </ThemedView>
      </BlurView>
    </LinearGradient>
  </View>
);