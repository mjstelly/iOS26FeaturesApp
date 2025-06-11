import { ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ExploreScreen() {
  const handleFeatureDemo = (feature: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      `${feature} Demo`,
      `This demonstrates ${feature} integration in iOS 26. In a real app, this would provide enhanced functionality.`,
      [{ text: 'OK' }]
    );
  };

  const additionalFeatures = [
    {
      title: 'Live Translation',
      description: 'Real-time translation in Messages, FaceTime, and Phone',
      icon: 'globe',
      color: '#AF52DE',
    },
    {
      title: 'Enhanced Phone App',
      description: 'Unified layout with call screening and smart voicemail',
      icon: 'phone.fill',
      color: '#34C759',
    },
    {
      title: 'Control Center Widgets',
      description: 'Customizable widgets with third-party app support',
      icon: 'dial.high',
      color: '#FF9500',
    },
    {
      title: 'Dynamic Island',
      description: 'Enhanced Live Activities with richer interactions',
      icon: 'oval.fill',
      color: '#FF2D92',
    },
    {
      title: 'Camera Control',
      description: 'New dedicated camera button with haptic feedback',
      icon: 'camera.fill',
      color: '#007AFF',
    },
    {
      title: 'Foundation Models API',
      description: 'Direct access to on-device AI models for developers',
      icon: 'cpu.fill',
      color: '#FF3B30',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <BlurView intensity={20} style={styles.headerBlur}>
            <ThemedView style={styles.headerContent}>
              <IconSymbol name="plus.magnifyingglass" size={48} color="#ffffff" />
              <ThemedText type="title" style={styles.headerTitle}>
                More Features
              </ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Discover additional iOS 26 capabilities
              </ThemedText>
            </ThemedView>
          </BlurView>
        </LinearGradient>
      </View>

      <ThemedView style={styles.featuresSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Additional iOS 26 Features
        </ThemedText>
        
        <View style={styles.featureGrid}>
          {additionalFeatures.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              onPress={() => handleFeatureDemo(feature.title)}
            >
              <BlurView intensity={60} style={styles.featureBlur}>
                <ThemedView style={styles.featureContent}>
                  <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
                    <IconSymbol 
                      name={feature.icon} 
                      size={28} 
                      color={feature.color} 
                    />
                  </View>
                  <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                    {feature.title}
                  </ThemedText>
                  <ThemedText style={styles.featureDescription}>
                    {feature.description}
                  </ThemedText>
                </ThemedView>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.infoSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          About This Demo
        </ThemedText>
        
        <Collapsible title="iOS 26 Overview">
          <ThemedText>
            iOS 26 introduces the most significant design overhaul in years with{' '}
            <ThemedText type="defaultSemiBold">Liquid Glass</ThemedText>, a new translucent design system.
          </ThemedText>
          <ThemedText>
            The update also brings enhanced <ThemedText type="defaultSemiBold">Apple Intelligence</ThemedText>{' '}
            capabilities with direct access to on-device AI models.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Developer Benefits">
          <ThemedText>
            This version introduces the <ThemedText type="defaultSemiBold">Foundation Models framework</ThemedText>,{' '}
            allowing developers to tap directly into Apple&apos;s on-device AI.
          </ThemedText>
          <ThemedText>
            New APIs for <ThemedText type="defaultSemiBold">Visual Intelligence</ThemedText> enable{' '}
            screen-aware functionality across all apps.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Privacy & Security">
          <ThemedText>
            All AI processing happens entirely on-device, ensuring user privacy and security.{' '}
            No data is sent to external servers for processing.
          </ThemedText>
          <ThemedText>
            The new <ThemedText type="defaultSemiBold">Liquid Glass</ThemedText> design system{' '}
            includes privacy-focused blur effects that protect sensitive content.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Compatibility">
          <ThemedText>
            iOS 26 supports iPhone 11 and newer devices. Apple Intelligence features{' '}
            require iPhone 15 Pro or iPhone 16 series.
          </ThemedText>
          <ThemedText>
            Developer beta is available now, with public beta coming in July 2025.
          </ThemedText>
        </Collapsible>
      </ThemedView>

      <ThemedView style={styles.footerSection}>
        <BlurView intensity={40} style={styles.footerCard}>
          <ThemedView style={styles.footerContent}>
            <IconSymbol name="apple.logo" size={32} color="#000000" />
            <ThemedText type="subtitle" style={styles.footerTitle}>
              WWDC 2025
            </ThemedText>
            <ThemedText style={styles.footerText}>
              This demo showcases features announced at Apple&apos;s Worldwide Developers Conference 2025.
            </ThemedText>
            <ExternalLink href="https://developer.apple.com/wwdc25/">
              <ThemedText type="link">Learn more about WWDC 2025</ThemedText>
            </ExternalLink>
          </ThemedView>
        </BlurView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
  },
  headerGradient: {
    flex: 1,
  },
  headerBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 40,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    width: '47%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featureBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureContent: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
    minHeight: 140,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 16,
  },
  infoSection: {
    padding: 20,
  },
  footerSection: {
    padding: 20,
    paddingBottom: 40,
  },
  footerCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  footerContent: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
});
