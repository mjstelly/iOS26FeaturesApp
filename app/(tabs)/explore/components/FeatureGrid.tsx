import React from 'react';
import { View } from 'react-native';
import { FeatureCard } from './FeatureCard';
import { featureStyles } from '../styles';
import type { Feature } from '../types';

interface FeatureGridProps {
  features: Feature[];
  onFeaturePress: (featureTitle: string) => void;
}

export const FeatureGrid = ({ features, onFeaturePress }: FeatureGridProps) => (
  <View style={featureStyles.featureGrid}>
    {features.map((feature, index) => (
      <FeatureCard 
        key={index} 
        feature={feature} 
        onPress={onFeaturePress} 
      />
    ))}
  </View>
);