import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BLUR_INTENSITY } from '../constants';
import { demoStyles } from '../styles';

interface TextProcessorProps {
  inputText: string;
  setInputText: (text: string) => void;
  isProcessing: boolean;
  onProcess: () => void;
}

export const TextProcessor = ({ 
  inputText, 
  setInputText, 
  isProcessing, 
  onProcess 
}: TextProcessorProps) => (
  <View style={demoStyles.inputContainer}>
    <TextInput
      style={demoStyles.textInput}
      placeholder="Enter text to process with AI..."
      placeholderTextColor="#666"
      value={inputText}
      onChangeText={setInputText}
      multiline
    />
    <TouchableOpacity
      style={[demoStyles.processButton, isProcessing && demoStyles.processingButton]}
      onPress={onProcess}
      disabled={isProcessing || !inputText.trim()}
    >
      <BlurView intensity={BLUR_INTENSITY.BUTTON} style={demoStyles.buttonBlur}>
        <View style={demoStyles.buttonContent}>
          {isProcessing ? (
            <IconSymbol name="gear" size={20} color="#ffffff" />
          ) : (
            <IconSymbol name="brain.head.profile" size={20} color="#ffffff" />
          )}
          <ThemedText style={demoStyles.buttonText}>
            {isProcessing ? 'Processing...' : 'Process with AI'}
          </ThemedText>
        </View>
      </BlurView>
    </TouchableOpacity>
  </View>
);