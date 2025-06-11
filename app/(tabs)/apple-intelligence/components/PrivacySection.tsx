import React from 'react';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLORS, BLUR_INTENSITY } from '../constants';
import { privacyStyles } from '../styles';

export const PrivacySection = () => (
  <ThemedView style={privacyStyles.privacySection}>
    <BlurView intensity={BLUR_INTENSITY.PRIVACY_CARD} style={privacyStyles.privacyCard}>
      <ThemedView style={privacyStyles.privacyContent}>
        <IconSymbol name="lock.shield" size={32} color={COLORS.SUCCESS} />
        <ThemedText type="subtitle" style={privacyStyles.privacyTitle}>
          Privacy First
        </ThemedText>
        <ThemedText style={privacyStyles.privacyText}>
          All Apple Intelligence features run entirely on your device. Your data never leaves your iPhone, ensuring complete privacy and security.
        </ThemedText>
      </ThemedView>
    </BlurView>
  </ThemedView>
);