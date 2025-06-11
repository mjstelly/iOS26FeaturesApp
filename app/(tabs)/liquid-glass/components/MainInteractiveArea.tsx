import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { COLORS } from '../constants';
import { playgroundStyles } from '../styles';

interface MainInteractiveAreaProps {
  onPress: (event: any) => void;
}

export const MainInteractiveArea = ({ onPress }: MainInteractiveAreaProps) => (
  <TouchableOpacity 
    style={playgroundStyles.mainInteractiveArea}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <BlurView intensity={95} style={playgroundStyles.mainBlur}>
      <LinearGradient
        colors={COLORS.MAIN_GRADIENT}
        style={playgroundStyles.mainGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={playgroundStyles.mainContent}>
          <IconSymbol name="drop.fill" size={40} color="#ffffff" />
          <ThemedText style={playgroundStyles.mainText}>Tap Anywhere</ThemedText>
        </View>
      </LinearGradient>
    </BlurView>
  </TouchableOpacity>
);