import { useTextProcessing } from '@/app/(tabs)/apple-intelligence/hooks';
import { renderHook, act } from '@testing-library/react-native';
import { 
  createValidTextInput, 
  createEmptyTextInput, 
  createWhitespaceInput,
  expectHapticFeedback,
  expectProcessingDelay 
} from '../../test-utils';
import * as Haptics from 'expo-haptics';

// Spy on haptics for business rule validation
jest.spyOn(Haptics, 'impactAsync');

// Mock timers for processing delay testing
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('TextProcessor_InputValidation_BusinessRules', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clear any pending timers without executing them to avoid act warnings
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  describe('BUSINESS RULE: Empty input validation', () => {
    it('prevents processing when input is empty string', () => {
      const { result } = renderHook(() => useTextProcessing());
      
      act(() => {
        result.current.setInputText(createEmptyTextInput());
      });

      act(() => {
        result.current.handleTextProcessing();
      });

      // Business rule: No processing should occur for empty input
      expect(result.current.isProcessing).toBe(false);
      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });

    it('prevents processing when input is only whitespace', () => {
      const { result } = renderHook(() => useTextProcessing());
      
      act(() => {
        result.current.setInputText(createWhitespaceInput());
      });

      act(() => {
        result.current.handleTextProcessing();
      });

      // Business rule: Whitespace-only input should not trigger processing
      expect(result.current.isProcessing).toBe(false);
      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });
  });

  describe('BUSINESS RULE: Valid input processing workflow', () => {
    it('initiates processing state for valid input', () => {
      const { result } = renderHook(() => useTextProcessing());
      
      act(() => {
        result.current.setInputText(createValidTextInput());
      });

      act(() => {
        result.current.handleTextProcessing();
      });

      // Business rule: Valid input triggers processing state
      expect(result.current.isProcessing).toBe(true);
      
      // Business rule: Processing should be scheduled (verify setTimeout called)
      expect(jest.getTimerCount()).toBe(1);
    });

    it('provides haptic feedback on processing start', () => {
      const { result } = renderHook(() => useTextProcessing());
      
      act(() => {
        result.current.setInputText(createValidTextInput());
      });

      act(() => {
        result.current.handleTextProcessing();
      });

      // Business rule: Medium haptic feedback required on processing start
      expectHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
    });

    it('completes processing after 2-second delay', async () => {
      const { result } = renderHook(() => useTextProcessing());
      
      act(() => {
        result.current.setInputText(createValidTextInput('Test input'));
      });

      act(() => {
        result.current.handleTextProcessing();
      });

      // Verify processing started
      expect(result.current.isProcessing).toBe(true);

      // Fast-forward through the 2-second delay with proper act wrapping
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      // Business rule: Processing should complete after delay
      expect(result.current.isProcessing).toBe(false);
    });
  });
});