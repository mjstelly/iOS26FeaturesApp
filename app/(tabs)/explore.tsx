import React from 'react';
import { ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Local imports
import { useFeatureDemo } from './explore/hooks';
import { ADDITIONAL_FEATURES, INFO_SECTIONS } from './explore/data';
import { mainStyles, featureStyles } from './explore/styles';

// Components
import { HeaderSection } from './explore/components/HeaderSection';
import { FeatureGrid } from './explore/components/FeatureGrid';
import { InfoSection } from './explore/components/InfoSection';
import { FooterSection } from './explore/components/FooterSection';

export default function ExploreScreen() {
  const { handleFeatureDemo } = useFeatureDemo();

  return (
    <ScrollView style={mainStyles.container} showsVerticalScrollIndicator={false}>
      <HeaderSection />

      <ThemedView style={featureStyles.featuresSection}>
        <ThemedText type="subtitle" style={mainStyles.sectionTitle}>
          Additional iOS 26 Features
        </ThemedText>
        
        <FeatureGrid 
          features={ADDITIONAL_FEATURES} 
          onFeaturePress={handleFeatureDemo} 
        />
      </ThemedView>

      <InfoSection sections={INFO_SECTIONS} />

      <FooterSection />
    </ScrollView>
  );
}