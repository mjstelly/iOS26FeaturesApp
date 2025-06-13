import { useRippleEffects } from '@/app/(tabs)/liquid-glass/hooks';
import { renderHook, act } from '@testing-library/react-native';
import { Animated } from 'react-native';
import { 
  createTouchCoordinates,
  expectHapticFeedback,
  expectAnimationDuration 
} from '../../test-utils';
import * as Haptics from 'expo-haptics';
import { ANIMATION_CONFIG } from '@/app/(tabs)/liquid-glass/constants';

jest.useFakeTimers();

describe('LiquidGlass_RippleWorkflow_BusinessRules', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  describe('BUSINESS RULE: Ripple creation and lifecycle', () => {
    it('creates ripple at exact touch coordinates', () => {
      const { result } = renderHook(() => useRippleEffects());
      const coordinates = createTouchCoordinates(150, 300);

      act(() => {
        result.current.createRipple(coordinates.x, coordinates.y);
      });

      // Business rule: Ripple must be created at exact touch coordinates
      expect(result.current.ripples).toHaveLength(1);
      expect(result.current.ripples[0].x).toBe(150);
      expect(result.current.ripples[0].y).toBe(300);
    });

    it('provides haptic feedback on ripple creation', () => {
      const { result } = renderHook(() => useRippleEffects());
      const coordinates = createTouchCoordinates();

      act(() => {
        result.current.createRipple(coordinates.x, coordinates.y);
      });

      // Business rule: Medium haptic feedback required on ripple creation
      expectHapticFeedback(Haptics.ImpactFeedbackStyle.Medium);
    });

    it('enforces 1-second ripple animation duration', () => {
      const { result } = renderHook(() => useRippleEffects());
      const coordinates = createTouchCoordinates();

      act(() => {
        result.current.createRipple(coordinates.x, coordinates.y);
      });

      // Business rule: Ripple animation must be created with correct duration
      expect(Animated.timing).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          toValue: 1,
          duration: ANIMATION_CONFIG.RIPPLE_DURATION,
          useNativeDriver: true,
        })
      );
    });

    it('schedules ripple removal after animation completes', () => {
      const { result } = renderHook(() => useRippleEffects());
      const coordinates = createTouchCoordinates();

      act(() => {
        result.current.createRipple(coordinates.x, coordinates.y);
      });

      expect(result.current.ripples).toHaveLength(1);

      // Business rule: Animation start should be called to schedule removal
      const animationStart = (Animated.timing as jest.Mock).mock.results[0].value.start;
      expect(animationStart).toHaveBeenCalled();
    });
  });

  describe('BUSINESS RULE: Concurrent ripple management', () => {
    it('allows multiple concurrent ripples', () => {
      const { result } = renderHook(() => useRippleEffects());

      act(() => {
        result.current.createRipple(100, 200);
        result.current.createRipple(300, 400);
        result.current.createRipple(500, 600);
      });

      // Business rule: Multiple ripples can exist concurrently
      expect(result.current.ripples).toHaveLength(3);
      expect(result.current.ripples[0].id).not.toBe(result.current.ripples[1].id);
      expect(result.current.ripples[1].id).not.toBe(result.current.ripples[2].id);
    });

    it('assigns unique IDs to each ripple', () => {
      const { result } = renderHook(() => useRippleEffects());

      act(() => {
        result.current.createRipple(100, 200);
        result.current.createRipple(300, 400);
      });

      // Business rule: Each ripple must have unique identifier for cleanup
      const ids = result.current.ripples.map(r => r.id);
      expect(new Set(ids).size).toBe(ids.length); // All IDs are unique
    });
  });
});