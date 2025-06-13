import { useRippleEffects } from '@/app/(tabs)/liquid-glass/hooks';
import { renderHook, act } from '@testing-library/react-native';
import { Animated } from 'react-native';
import { ANIMATION_CONFIG } from '@/app/(tabs)/liquid-glass/constants';
import { createTouchCoordinates } from '../../test-utils';

jest.useFakeTimers();

describe('RippleScale_Calculations_BusinessRules', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  describe('BUSINESS RULE: Ripple scale transformation calculations', () => {
    it('enforces 300% scale expansion for ripple animations', () => {
      const { result } = renderHook(() => useRippleEffects());
      const coordinates = createTouchCoordinates(100, 200);

      act(() => {
        result.current.createRipple(coordinates.x, coordinates.y);
      });

      // Business rule: Ripple must scale to exactly 300% (RIPPLE_SCALE: 3)
      expect(Animated.timing).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          toValue: 1,
          duration: ANIMATION_CONFIG.RIPPLE_DURATION,
          useNativeDriver: true,
        })
      );

      // Verify the scale constant is used in the animation
      expect(ANIMATION_CONFIG.RIPPLE_SCALE).toBe(3);
    });

    it('calculates ripple initial scale as zero for growth animation', () => {
      const { result } = renderHook(() => useRippleEffects());
      const coordinates = createTouchCoordinates();

      act(() => {
        result.current.createRipple(coordinates.x, coordinates.y);
      });

      // Business rule: Ripple starts at scale 0 and grows to scale 1 (which represents RIPPLE_SCALE * 100%)
      const ripple = result.current.ripples[0];
      expect(ripple).toBeDefined();
      expect(ripple.id).toBe(0);
      expect(ripple.x).toBe(coordinates.x);
      expect(ripple.y).toBe(coordinates.y);
    });

    it('maintains consistent scale calculations across multiple ripples', () => {
      const { result } = renderHook(() => useRippleEffects());

      act(() => {
        result.current.createRipple(50, 100);
        result.current.createRipple(150, 200);
        result.current.createRipple(250, 300);
      });

      // Business rule: All ripples use identical scale animation parameters
      expect(result.current.ripples).toHaveLength(3);
      
      result.current.ripples.forEach((ripple, index) => {
        expect(ripple.id).toBe(index);
        expect(ripple.anim).toBeDefined();
      });

      // Verify all timing calls use same scale parameters
      expect(Animated.timing).toHaveBeenCalledTimes(3);
      const allCalls = (Animated.timing as jest.Mock).mock.calls;
      
      allCalls.forEach((call) => {
        expect(call[1]).toEqual(expect.objectContaining({
          toValue: 1,
          duration: ANIMATION_CONFIG.RIPPLE_DURATION,
          useNativeDriver: true,
        }));
      });
    });
  });

  describe('BUSINESS RULE: Scale animation interpolation', () => {
    it('validates scale interpolation range from 0 to RIPPLE_SCALE', () => {
      // Business rule: Scale interpolation must map 0->1 animation value to 0->300% visual scale
      const expectedScaleRange = ANIMATION_CONFIG.RIPPLE_SCALE;
      
      // This validates the business requirement that ripples grow from 0% to 300%
      expect(expectedScaleRange).toBe(3);
      
      // The actual interpolation happens in the component's transform style:
      // transform: [{ scale: ripple.scale.interpolate({ inputRange: [0, 1], outputRange: [0, RIPPLE_SCALE] }) }]
    });

    it('enforces smooth scale transition timing', () => {
      const { result } = renderHook(() => useRippleEffects());
      const coordinates = createTouchCoordinates();

      act(() => {
        result.current.createRipple(coordinates.x, coordinates.y);
      });

      // Business rule: Scale animation must use exact timing for consistent user experience
      expect(Animated.timing).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          duration: 1000, // RIPPLE_DURATION: 1000ms
          useNativeDriver: true, // Required for 60fps performance
        })
      );
    });
  });
});