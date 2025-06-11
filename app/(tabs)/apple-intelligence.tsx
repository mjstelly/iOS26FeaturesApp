import React from 'react';
import { ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Local imports
import { useTextProcessing, useAIFeatures } from './apple-intelligence/hooks';
import { AI_FEATURES } from './apple-intelligence/data';
import { mainStyles, demoStyles, featureStyles } from './apple-intelligence/styles';

// Components
import { HeroSection } from './apple-intelligence/components/HeroSection';
import { TextProcessor } from './apple-intelligence/components/TextProcessor';
import { FeatureGrid } from './apple-intelligence/components/FeatureGrid';
import { PrivacySection } from './apple-intelligence/components/PrivacySection';

export default function AppleIntelligenceScreen() {
  const { 
    inputText, 
    setInputText, 
    isProcessing, 
    handleTextProcessing 
  } = useTextProcessing();
  
  const { handleAIFeature } = useAIFeatures();

  return (
    <ScrollView style={mainStyles.container} showsVerticalScrollIndicator={false}>
      <HeroSection />

      <ThemedView style={demoStyles.demoSection}>
        <ThemedText type="subtitle" style={mainStyles.sectionTitle}>
          Try AI Text Processing
        </ThemedText>
        <ThemedText style={mainStyles.sectionDescription}>
          Enter text below to see Apple Intelligence in action
        </ThemedText>

        <TextProcessor
          inputText={inputText}
          setInputText={setInputText}
          isProcessing={isProcessing}
          onProcess={handleTextProcessing}
        />
      </ThemedView>

      <ThemedView style={featureStyles.featuresSection}>
        <ThemedText type="subtitle" style={mainStyles.sectionTitle}>
          AI Capabilities
        </ThemedText>
        
        <FeatureGrid 
          features={AI_FEATURES} 
          onFeaturePress={handleAIFeature} 
        />
      </ThemedView>

      <PrivacySection />
    </ScrollView>
  );
}