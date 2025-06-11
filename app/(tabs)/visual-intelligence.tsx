import { ScrollView, StyleSheet, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');

export default function VisualIntelligenceScreen() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const handleVisualDemo = (demo: string) => {
    setActiveDemo(demo);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    setTimeout(() => {
      setActiveDemo(null);
      Alert.alert(
        `${demo} Analysis`,
        `Visual Intelligence has analyzed the screen content. In a real app, this would provide:\n\n• Object recognition\n• Text extraction\n• Context-aware suggestions\n• Smart actions`,
        [{ text: 'OK' }]
      );
    }, 1500);
  };

  const visualFeatures = [
    {
      title: 'Screen Understanding',
      description: 'AI analyzes everything visible on your screen',
      icon: 'eye.fill',
      color: '#007AFF',
    },
    {
      title: 'Object Recognition',
      description: 'Identify objects, people, and text in images',
      icon: 'viewfinder',
      color: '#FF3B30',
    },
    {
      title: 'Smart Actions',
      description: 'Contextual suggestions based on what you see',
      icon: 'wand.and.stars',
      color: '#34C759',
    },
    {
      title: 'Live Text',
      description: 'Extract and interact with text from any image',
      icon: 'doc.text.viewfinder',
      color: '#FF9500',
    },
  ];

  const demoScenarios = [
    {
      title: 'Restaurant Menu',
      description: 'Scan menu items and get nutritional info',
      icon: 'fork.knife',
      preview: 'Menu scanning active...',
    },
    {
      title: 'Document Text',
      description: 'Extract text from documents and photos',
      icon: 'doc.text',
      preview: 'Text extraction in progress...',
    },
    {
      title: 'Product Search',
      description: 'Find similar products online',
      icon: 'magnifyingglass',
      preview: 'Product identification running...',
    },
    {
      title: 'Translation',
      description: 'Translate text in real-time',
      icon: 'character.book.closed',
      preview: 'Live translation active...',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <LinearGradient
          colors={['#4facfe', '#00f2fe', '#43e97b', '#38f9d7']}
          style={styles.heroGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <BlurView intensity={25} style={styles.heroBlur}>
            <ThemedView style={styles.heroContent}>
              <View style={styles.eyeContainer}>
                <IconSymbol name="eye.fill" size={64} color="#ffffff" />
                <View style={styles.scanLine} />
              </View>
              <ThemedText type="title" style={styles.heroTitle}>
                Visual Intelligence
              </ThemedText>
              <ThemedText style={styles.heroSubtitle}>
                AI that sees and understands your screen
              </ThemedText>
            </ThemedView>
          </BlurView>
        </LinearGradient>
      </View>

      <ThemedView style={styles.demoSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Interactive Demos
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Tap any scenario to see Visual Intelligence in action
        </ThemedText>

        <View style={styles.demoGrid}>
          {demoScenarios.map((demo, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.demoCard,
                activeDemo === demo.title && styles.activeDemoCard
              ]}
              onPress={() => handleVisualDemo(demo.title)}
            >
              <BlurView intensity={60} style={styles.demoBlur}>
                <ThemedView style={styles.demoContent}>
                  <IconSymbol 
                    name={demo.icon} 
                    size={32} 
                    color={activeDemo === demo.title ? '#34C759' : '#007AFF'} 
                  />
                  <ThemedText type="defaultSemiBold" style={styles.demoTitle}>
                    {demo.title}
                  </ThemedText>
                  <ThemedText style={styles.demoDescription}>
                    {activeDemo === demo.title ? demo.preview : demo.description}
                  </ThemedText>
                  {activeDemo === demo.title && (
                    <View style={styles.processingIndicator}>
                      <IconSymbol name="gear" size={16} color="#34C759" />
                    </View>
                  )}
                </ThemedView>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.featuresSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Core Capabilities
        </ThemedText>
        
        <View style={styles.featuresList}>
          {visualFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <BlurView intensity={50} style={styles.featureBlur}>
                <ThemedView style={styles.featureRow}>
                  <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                    <IconSymbol 
                      name={feature.icon} 
                      size={24} 
                      color={feature.color} 
                    />
                  </View>
                  <View style={styles.featureTextContent}>
                    <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                      {feature.title}
                    </ThemedText>
                    <ThemedText style={styles.featureText}>
                      {feature.description}
                    </ThemedText>
                  </View>
                </ThemedView>
              </BlurView>
            </View>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.integrationSection}>
        <BlurView intensity={40} style={styles.integrationCard}>
          <ThemedView style={styles.integrationContent}>
            <IconSymbol name="apps.iphone" size={32} color="#FF9500" />
            <ThemedText type="subtitle" style={styles.integrationTitle}>
              System Integration
            </ThemedText>
            <ThemedText style={styles.integrationText}>
              Visual Intelligence works seamlessly across all apps. Simply long-press any image or use the Camera Control button to analyze what you see.
            </ThemedText>
            <View style={styles.integrationApps}>
              <IconSymbol name="camera.fill" size={20} color="#666" />
              <IconSymbol name="photo.fill" size={20} color="#666" />
              <IconSymbol name="safari.fill" size={20} color="#666" />
              <IconSymbol name="message.fill" size={20} color="#666" />
            </View>
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
  heroSection: {
    height: 300,
  },
  heroGradient: {
    flex: 1,
  },
  heroBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  eyeContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  scanLine: {
    position: 'absolute',
    top: 30,
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: '#ffffff',
    opacity: 0.8,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  demoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 20,
  },
  demoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  demoCard: {
    width: (width - 56) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  activeDemoCard: {
    transform: [{ scale: 0.98 }],
  },
  demoBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  demoContent: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
    minHeight: 140,
    justifyContent: 'center',
  },
  demoTitle: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  demoDescription: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 16,
  },
  processingIndicator: {
    marginTop: 8,
  },
  featuresSection: {
    padding: 20,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  featureBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 18,
  },
  integrationSection: {
    padding: 20,
    paddingBottom: 40,
  },
  integrationCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  integrationContent: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  integrationTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  integrationText: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  integrationApps: {
    flexDirection: 'row',
    gap: 16,
  },
});