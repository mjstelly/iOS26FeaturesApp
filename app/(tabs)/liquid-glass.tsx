import React from 'react';
import { ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Local imports
import { useFloatingAnimation, usePulseAnimation, useRippleEffects } from './liquid-glass/hooks';
import { GLASS_ELEMENTS, FEATURES } from './liquid-glass/data';
import { mainStyles, featureStyles, playgroundStyles } from './liquid-glass/styles';

// Components
import { HeroSection } from './liquid-glass/components/HeroSection';
import { RippleEffect } from './liquid-glass/components/RippleEffect';
import { MainInteractiveArea } from './liquid-glass/components/MainInteractiveArea';
import { GlassElement } from './liquid-glass/components/GlassElement';
import { FeatureCard } from './liquid-glass/components/FeatureCard';

export default function LiquidGlassScreen() {
  const floatingAnim = useFloatingAnimation();
  const pulseAnim = usePulseAnimation();
  const { ripples, createRipple } = useRippleEffects();

  const handleGlassPress = (event: any) => {
    const { locationX = 50, locationY = 50 } = event.nativeEvent;
    createRipple(locationX, locationY);
  };

  return (
    <ScrollView 
      style={mainStyles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={mainStyles.scrollContent}
    >
      <HeroSection floatingAnim={floatingAnim} pulseAnim={pulseAnim} />

      <ThemedView style={mainStyles.demoSection}>
        <ThemedText type="subtitle" style={mainStyles.sectionTitle}>
          Interactive Glass Elements
        </ThemedText>
        <ThemedText style={mainStyles.sectionDescription}>
          🎯 Tap anywhere on the glass elements to create ripple effects
        </ThemedText>

        <View style={playgroundStyles.glassPlayground}>
          <MainInteractiveArea onPress={handleGlassPress} />

          {ripples.map((ripple) => (
            <RippleEffect key={ripple.id} ripple={ripple} />
          ))}

          {GLASS_ELEMENTS.map((element) => (
            <GlassElement 
              key={element.id} 
              element={element} 
              onPress={handleGlassPress} 
            />
          ))}
        </View>
      </ThemedView>

      <ThemedView style={featureStyles.featuresSection}>
        <ThemedText type="subtitle" style={mainStyles.sectionTitle}>
          Key Features
        </ThemedText>
        
        <View style={featureStyles.featuresList}>
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </View>
      </ThemedView>
    </ScrollView>
  );
}