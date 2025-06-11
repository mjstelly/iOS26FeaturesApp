import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';

export const useFeatureDemo = () => {
  const handleFeatureDemo = (feature: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      `${feature} Demo`,
      `This demonstrates ${feature} integration in iOS 26. In a real app, this would provide enhanced functionality.`,
      [{ text: 'OK' }]
    );
  };

  return { handleFeatureDemo };
};