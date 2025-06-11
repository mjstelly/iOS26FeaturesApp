import React from 'react';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ExternalLink } from '@/components/ExternalLink';
import { COLORS, BLUR_INTENSITY } from '../constants';
import { footerStyles } from '../styles';

export const FooterSection = () => (
  <ThemedView style={footerStyles.footerSection}>
    <BlurView intensity={BLUR_INTENSITY.FOOTER_CARD} style={footerStyles.footerCard}>
      <ThemedView style={footerStyles.footerContent}>
        <IconSymbol name="apple.logo" size={32} color={COLORS.BLACK} />
        <ThemedText type="subtitle" style={footerStyles.footerTitle}>
          WWDC 2025
        </ThemedText>
        <ThemedText style={footerStyles.footerText}>
          This demo showcases features announced at Apple&apos;s Worldwide Developers Conference 2025.
        </ThemedText>
        <ExternalLink href="https://developer.apple.com/wwdc25/">
          <ThemedText type="link">Learn more about WWDC 2025</ThemedText>
        </ExternalLink>
      </ThemedView>
    </BlurView>
  </ThemedView>
);