import { ScrollView, StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function LiquidGlassScreen() {
  const floatingAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [ripples, setRipples] = useState<{id: number, x: number, y: number, anim: Animated.Value}[]>([]);
  const rippleCounter = useRef(0);

  useEffect(() => {
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    floatingAnimation.start();
    pulseAnimation.start();

    return () => {
      floatingAnimation.stop();
      pulseAnimation.stop();
    };
  }, [floatingAnim, pulseAnim]);

  const createRipple = (x: number, y: number) => {
    const rippleId = rippleCounter.current++;
    const rippleAnim = new Animated.Value(0);
    
    const newRipple = { id: rippleId, x, y, anim: rippleAnim };
    setRipples(prev => [...prev, newRipple]);

    Animated.timing(rippleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleGlassPress = (event: any) => {
    const { locationX = 50, locationY = 50 } = event.nativeEvent;
    createRipple(locationX, locationY);
  };

  const glassElements = [
    { id: 1, top: 100, left: 50, size: 80, intensity: 90, color: '#007AFF' },
    { id: 2, top: 200, left: 200, size: 60, intensity: 70, color: '#FF3B30' },
    { id: 3, top: 350, left: 100, size: 100, intensity: 80, color: '#34C759' },
    { id: 4, top: 450, left: 250, size: 70, intensity: 85, color: '#FF9500' },
  ];

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.heroSection}>
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          style={styles.heroGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <BlurView intensity={40} style={styles.heroBlur}>
            <ThemedView style={styles.heroContent}>
              <Animated.View
                style={[
                  styles.liquidIcon,
                  {
                    transform: [
                      {
                        translateY: floatingAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -20],
                          extrapolate: 'clamp',
                        }),
                      },
                      { 
                        scale: pulseAnim.interpolate({
                          inputRange: [0.9, 1.1],
                          outputRange: [1, 1.1],
                          extrapolate: 'clamp',
                        })
                      },
                    ],
                  },
                ]}
              >
                <IconSymbol name="drop.fill" size={64} color="#ffffff" />
              </Animated.View>
              <ThemedText type="title" style={styles.heroTitle}>
                Liquid Glass
              </ThemedText>
              <ThemedText style={styles.heroSubtitle}>
                Dynamic materials that adapt to your content
              </ThemedText>
            </ThemedView>
          </BlurView>
        </LinearGradient>
      </View>

      <ThemedView style={styles.demoSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Interactive Glass Elements
        </ThemedText>
        <ThemedText style={styles.sectionDescription}>
          🎯 Tap anywhere on the glass elements to create ripple effects
        </ThemedText>

        <View style={styles.glassPlayground}>
          {/* Main interactive area */}
          <TouchableOpacity 
            style={styles.mainInteractiveArea}
            onPress={handleGlassPress}
            activeOpacity={0.8}
          >
            <BlurView intensity={95} style={styles.mainBlur}>
              <LinearGradient
                colors={['rgba(0, 122, 255, 0.3)', 'rgba(255, 59, 48, 0.2)', 'rgba(52, 199, 89, 0.3)']}
                style={styles.mainGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.mainContent}>
                  <IconSymbol name="drop.fill" size={40} color="#ffffff" />
                  <ThemedText style={styles.mainText}>Tap Anywhere</ThemedText>
                </View>
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>

          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <Animated.View
              key={ripple.id}
              style={[
                styles.rippleEffect,
                {
                  left: ripple.x - 50,
                  top: ripple.y - 50,
                  transform: [
                    {
                      scale: ripple.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 3],
                      }),
                    },
                  ],
                  opacity: ripple.anim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 0.6, 0],
                  }),
                },
              ]}
            />
          ))}

          {/* Static glass elements */}
          {glassElements.map((element) => (
            <TouchableOpacity
              key={element.id}
              style={[
                styles.glassElement,
                {
                  top: element.top,
                  left: element.left,
                  width: element.size,
                  height: element.size,
                },
              ]}
              onPress={handleGlassPress}
              activeOpacity={0.7}
            >
              <BlurView intensity={element.intensity} style={styles.glassBlur}>
                <LinearGradient
                  colors={[`${element.color}60`, `${element.color}30`, `${element.color}40`]}
                  style={styles.elementGradient}
                >
                  <View style={styles.glassContent}>
                    <IconSymbol 
                      name="sparkles" 
                      size={element.size * 0.4} 
                      color={element.color} 
                    />
                  </View>
                </LinearGradient>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.featuresSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Key Features
        </ThemedText>
        
        <View style={styles.featuresList}>
          <BlurView intensity={60} style={styles.featureCard}>
            <ThemedView style={styles.featureContent}>
              <IconSymbol name="wand.and.rays" size={24} color="#007AFF" />
              <View style={styles.featureTextContainer}>
                <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                  Dynamic Ripples
                </ThemedText>
                <ThemedText style={styles.featureText}>
                  Interactive ripple effects that respond to your touch with realistic physics
                </ThemedText>
              </View>
            </ThemedView>
          </BlurView>

          <BlurView intensity={60} style={styles.featureCard}>
            <ThemedView style={styles.featureContent}>
              <IconSymbol name="perspective" size={24} color="#FF3B30" />
              <View style={styles.featureTextContainer}>
                <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                  Depth Perception
                </ThemedText>
                <ThemedText style={styles.featureText}>
                  Multi-layered blur effects create realistic depth and dimension
                </ThemedText>
              </View>
            </ThemedView>
          </BlurView>

          <BlurView intensity={60} style={styles.featureCard}>
            <ThemedView style={styles.featureContent}>
              <IconSymbol name="paintbrush" size={24} color="#34C759" />
              <View style={styles.featureTextContainer}>
                <ThemedText type="defaultSemiBold" style={styles.featureTitle}>
                  Haptic Feedback
                </ThemedText>
                <ThemedText style={styles.featureText}>
                  Tactile responses that enhance the liquid glass interaction experience
                </ThemedText>
              </View>
            </ThemedView>
          </BlurView>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
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
  liquidIcon: {
    marginBottom: 16,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
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
    marginBottom: 30,
  },
  glassPlayground: {
    height: 600,
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  mainInteractiveArea: {
    position: 'absolute',
    top: 30,
    left: 30,
    right: 30,
    height: 150,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  mainBlur: {
    flex: 1,
  },
  mainGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  rippleEffect: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    pointerEvents: 'none',
  },
  glassElement: {
    position: 'absolute',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  glassBlur: {
    flex: 1,
  },
  elementGradient: {
    flex: 1,
    borderRadius: 20,
  },
  glassContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  featuresSection: {
    padding: 20,
  },
  featuresList: {
    gap: 16,
  },
  featureCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  featureContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'transparent',
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    opacity: 0.7,
  },
});