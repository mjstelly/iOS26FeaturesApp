import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const handleFeaturePress = (feature: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const features = [
    {
      title: 'Liquid Glass Design',
      description: 'Experience the new translucent design system with dynamic materials',
      icon: 'drop.fill',
      gradient: ['#667eea', '#764ba2'],
    },
    {
      title: 'Apple Intelligence',
      description: 'On-device AI models for enhanced productivity and creativity',
      icon: 'brain.head.profile',
      gradient: ['#f093fb', '#f5576c'],
    },
    {
      title: 'Visual Intelligence',
      description: 'Screen-aware AI that understands what you\'re looking at',
      icon: 'eye.fill',
      gradient: ['#4facfe', '#00f2fe'],
    },
    {
      title: 'Live Translation',
      description: 'Real-time translation in Messages, FaceTime, and Phone',
      icon: 'text.bubble.fill',
      gradient: ['#43e97b', '#38f9d7'],
    },
    {
      title: 'Enhanced Phone App',
      description: 'Unified layout with call screening and smart features',
      icon: 'phone.fill',
      gradient: ['#fa709a', '#fee140'],
    },
    {
      title: 'Foundation Models',
      description: 'Direct access to on-device AI models for developers',
      icon: 'cpu.fill',
      gradient: ['#a8edea', '#fed6e3'],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>iOS 26 Features</ThemedText>
        <ThemedText style={styles.subtitle}>
          Explore the latest innovations from Apple&apos;s WWDC 2025
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            onPress={() => handleFeaturePress(feature.title)}
          >
            <BlurView intensity={80} style={styles.blurCard}>
              <ThemedView style={styles.cardContent}>
                <IconSymbol 
                  name={feature.icon} 
                  size={32} 
                  color="#007AFF" 
                  style={styles.featureIcon}
                />
                <ThemedText type="subtitle" style={styles.featureTitle}>
                  {feature.title}
                </ThemedText>
                <ThemedText style={styles.featureDescription}>
                  {feature.description}
                </ThemedText>
              </ThemedView>
            </BlurView>
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ThemedView style={styles.versionInfo}>
        <ThemedText style={styles.versionText}>
          iOS 26 • Developer Beta • Available Now
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  featuresContainer: {
    padding: 20,
    gap: 16,
  },
  featureCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  blurCard: {
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  featureIcon: {
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  versionInfo: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  versionText: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
  },
});
