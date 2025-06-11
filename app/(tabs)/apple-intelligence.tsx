import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AppleIntelligenceScreen() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAIFeature = (feature: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      `${feature} Demo`,
      `This would activate ${feature} in a real iOS 26 app. The feature runs entirely on-device for privacy.`,
      [{ text: 'OK' }]
    );
  };

  const handleTextProcessing = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'AI Processing Complete',
        `Apple Intelligence has analyzed: "${inputText}"\n\nThis demonstrates on-device AI processing with complete privacy.`,
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const aiFeatures = [
    {
      title: 'Smart Writing',
      description: 'AI-powered writing assistance and proofreading',
      icon: 'pencil.and.scribble',
      color: '#007AFF',
    },
    {
      title: 'Image Generation',
      description: 'Create images from text descriptions on-device',
      icon: 'photo.on.rectangle',
      color: '#FF3B30',
    },
    {
      title: 'Code Completion',
      description: 'Intelligent code suggestions and debugging',
      icon: 'chevron.left.forwardslash.chevron.right',
      color: '#34C759',
    },
    {
      title: 'Smart Summarization',
      description: 'Summarize documents and web pages instantly',
      icon: 'doc.text.magnifyingglass',
      color: '#FF9500',
    },
    {
      title: 'Language Translation',
      description: 'Real-time translation across 40+ languages',
      icon: 'globe',
      color: '#AF52DE',
    },
    {
      title: 'Voice Understanding',
      description: 'Advanced speech recognition and processing',
      icon: 'waveform',
      color: '#FF2D92',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb', '#f5576c']}
          style={styles.heroGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <BlurView intensity={30} style={styles.heroBlur}>
            <ThemedView style={styles.heroContent}>
              <IconSymbol name="brain.head.profile" size={64} color="#ffffff" />
              <ThemedText type="title" style={styles.heroTitle}>
                Apple Intelligence
              </ThemedText>
              <ThemedText style={styles.heroSubtitle}>
                On-device AI that protects your privacy
              </ThemedText>
            </ThemedView>
          </BlurView>
        </LinearGradient>
      </View>

      <ThemedView style={styles.demoSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Try AI Text Processing
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Enter text below to see Apple Intelligence in action
        </ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter text to process with AI..."
            placeholderTextColor="#666"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            style={[styles.processButton, isProcessing && styles.processingButton]}
            onPress={handleTextProcessing}
            disabled={isProcessing || !inputText.trim()}
          >
            <BlurView intensity={80} style={styles.buttonBlur}>
              <View style={styles.buttonContent}>
                {isProcessing ? (
                  <IconSymbol name="gear" size={20} color="#ffffff" />
                ) : (
                  <IconSymbol name="brain.head.profile" size={20} color="#ffffff" />
                )}
                <ThemedText style={styles.buttonText}>
                  {isProcessing ? 'Processing...' : 'Process with AI'}
                </ThemedText>
              </View>
            </BlurView>
          </TouchableOpacity>
        </View>
      </ThemedView>

      <ThemedView style={styles.featuresSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          AI Capabilities
        </ThemedText>
        
        <View style={styles.featureGrid}>
          {aiFeatures.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              onPress={() => handleAIFeature(feature.title)}
            >
              <BlurView intensity={70} style={styles.featureBlur}>
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

      <ThemedView style={styles.privacySection}>
        <BlurView intensity={50} style={styles.privacyCard}>
          <ThemedView style={styles.privacyContent}>
            <IconSymbol name="lock.shield" size={32} color="#34C759" />
            <ThemedText type="subtitle" style={styles.privacyTitle}>
              Privacy First
            </ThemedText>
            <ThemedText style={styles.privacyText}>
              All Apple Intelligence features run entirely on your device. Your data never leaves your iPhone, ensuring complete privacy and security.
            </ThemedText>
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
    height: 280,
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
  heroTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
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
  inputContainer: {
    gap: 16,
  },
  textInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    textAlignVertical: 'top',
  },
  processButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  processingButton: {
    opacity: 0.7,
  },
  buttonBlur: {
    backgroundColor: '#007AFF',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    padding: 20,
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
  privacySection: {
    padding: 20,
    paddingBottom: 40,
  },
  privacyCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  privacyContent: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  privacyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  privacyText: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 24,
  },
});