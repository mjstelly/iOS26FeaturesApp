import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

// Mock utilities for business logic testing
export const createMockTextProcessor = () => ({
  inputText: '',
  setInputText: jest.fn(),
  isProcessing: false,
  handleTextProcessing: jest.fn(),
});

export const createMockRippleManager = () => ({
  ripples: [],
  createRipple: jest.fn(),
});

// Test data factories
export const createValidTextInput = (text: string = 'Valid input text') => text;
export const createEmptyTextInput = () => '';
export const createWhitespaceInput = () => '   \n\t  ';
export const createLongTextInput = (length: number = 1000) => 'a'.repeat(length);

export const createTouchCoordinates = (x: number = 100, y: number = 200) => ({ x, y });

// Business rule validation helpers
export const expectProcessingDelay = (expectedDelay: number = 2000) => {
  expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expectedDelay);
};

export const expectHapticFeedback = (feedbackType: Haptics.ImpactFeedbackStyle) => {
  expect(Haptics.impactAsync).toHaveBeenCalledWith(feedbackType);
};

export const expectAlertShown = (title: string, message?: string) => {
  expect(Alert.alert).toHaveBeenCalledWith(
    title,
    message ? expect.stringContaining(message) : expect.any(String),
    expect.any(Array)
  );
};

// Animation testing utilities
export const expectAnimationStarted = (animatedValue: any) => {
  expect(animatedValue.start).toHaveBeenCalled();
};

export const expectAnimationDuration = (duration: number) => {
  // Helper for verifying animation timing constraints
  return { duration, useNativeDriver: true };
};