import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BLUR_INTENSITY } from '../constants';
import { featureStyles } from '../styles';
import type { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
  onPress: (featureTitle: string) => void;
}

export const FeatureCard = ({ feature, onPress }: FeatureCardProps) => (
  <TouchableOpacity
    style={featureStyles.featureCard}
    onPress={() => onPress(feature.title)}
  >
    <BlurView intensity={BLUR_INTENSITY.FEATURE_CARD} style={featureStyles.featureBlur}>
      <ThemedView style={featureStyles.featureContent}>
        <View style={[featureStyles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
          <IconSymbol 
            name={feature.icon} 
            size={28} 
            color={feature.color} 
          />
        </View>
        <ThemedText type="defaultSemiBold" style={featureStyles.featureTitle}>
          {feature.title}
        </ThemedText>
        <ThemedText style={featureStyles.featureDescription}>
          {feature.description}
        </ThemedText>
      </ThemedView>
    </BlurView>
  </TouchableOpacity>
);