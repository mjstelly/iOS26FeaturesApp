import React from 'react';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLORS, BLUR_INTENSITY } from '../constants';
import { headerStyles } from '../styles';

export const HeaderSection = () => (
  <View style={headerStyles.header}>
    <LinearGradient
      colors={COLORS.HEADER_GRADIENT}
      style={headerStyles.headerGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <BlurView intensity={BLUR_INTENSITY.HEADER} style={headerStyles.headerBlur}>
        <ThemedView style={headerStyles.headerContent}>
          <IconSymbol name="plus.magnifyingglass" size={48} color={COLORS.WHITE} />
          <ThemedText type="title" style={headerStyles.headerTitle}>
            More Features
          </ThemedText>
          <ThemedText style={headerStyles.headerSubtitle}>
            Discover additional iOS 26 capabilities
          </ThemedText>
        </ThemedView>
      </BlurView>
    </LinearGradient>
  </View>
);