import React from 'react';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { featureStyles } from '../styles';
import type { FeatureItem } from '../types';

interface FeatureCardProps {
  feature: FeatureItem;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => (
  <BlurView intensity={60} style={featureStyles.featureCard}>
    <ThemedView style={featureStyles.featureContent}>
      <IconSymbol name={feature.icon} size={24} color={feature.color} />
      <View style={featureStyles.featureTextContainer}>
        <ThemedText type="defaultSemiBold" style={featureStyles.featureTitle}>
          {feature.title}
        </ThemedText>
        <ThemedText style={featureStyles.featureText}>
          {feature.description}
        </ThemedText>
      </View>
    </ThemedView>
  </BlurView>
);