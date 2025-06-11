import { useState } from 'react';
import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { TIMING } from './constants';

export const useTextProcessing = () => {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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
    }, TIMING.PROCESSING_DELAY);
  };

  return {
    inputText,
    setInputText,
    isProcessing,
    handleTextProcessing,
  };
};

export const useAIFeatures = () => {
  const handleAIFeature = (feature: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      `${feature} Demo`,
      `This would activate ${feature} in a real iOS 26 app. The feature runs entirely on-device for privacy.`,
      [{ text: 'OK' }]
    );
  };

  return { handleAIFeature };
};