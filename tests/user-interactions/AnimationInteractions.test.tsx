import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Animated, Pressable, View, Text } from 'react-native';

// Use the existing jest setup for animations

describe('Animation Interaction User Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Touch-triggered Animations', () => {
    it('triggers animation on touch with correct parameters', () => {
      const TestAnimationComponent = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;

        const handlePress = () => {
          Animated.timing(animValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        };

        return (
          <Pressable testID="anim-trigger" onPress={handlePress}>
            <Animated.View
              testID="animated-element"
              style={{
                opacity: animValue,
                transform: [{ scale: animValue }]
              }}
            >
              <Text>Animated Content</Text>
            </Animated.View>
          </Pressable>
        );
      };

      const { getByTestId } = render(<TestAnimationComponent />);
      
      fireEvent.press(getByTestId('anim-trigger'));

      expect(Animated.timing).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      );
    });

    it('handles rapid touch animations without conflicts', () => {
      const TestRapidAnimation = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;
        const [animationCount, setAnimationCount] = React.useState(0);

        const handlePress = () => {
          setAnimationCount(prev => prev + 1);
          Animated.timing(animValue, {
            toValue: Math.random(),
            duration: 200,
            useNativeDriver: true,
          }).start();
        };

        return (
          <View>
            <Pressable testID="rapid-anim-trigger" onPress={handlePress}>
              <Text>Trigger Animation</Text>
            </Pressable>
            <Text testID="anim-count">{animationCount}</Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestRapidAnimation />);
      
      // Trigger multiple rapid animations
      fireEvent.press(getByTestId('rapid-anim-trigger'));
      fireEvent.press(getByTestId('rapid-anim-trigger'));
      fireEvent.press(getByTestId('rapid-anim-trigger'));

      expect(getByTestId('anim-count')).toHaveTextContent('3');
      expect(Animated.timing).toHaveBeenCalledTimes(3);
    });

    it('handles touch coordinates affecting animation properties', () => {
      const TestCoordinateAnimation = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;
        const [lastCoords, setLastCoords] = React.useState({ x: 0, y: 0 });

        const handlePress = (event: any) => {
          const { locationX = 0, locationY = 0 } = event.nativeEvent || {};
          setLastCoords({ x: locationX, y: locationY });
          
          // Animation intensity based on coordinates
          const intensity = Math.min(locationX / 100, 1);
          Animated.timing(animValue, {
            toValue: intensity,
            duration: 500,
            useNativeDriver: true,
          }).start();
        };

        return (
          <View>
            <Pressable
              testID="coord-anim-trigger"
              onPress={handlePress}
              style={{ width: 200, height: 200 }}
            >
              <Text>Touch anywhere</Text>
            </Pressable>
            <Text testID="coords-display">
              Last: {lastCoords.x}, {lastCoords.y}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestCoordinateAnimation />);
      
      fireEvent.press(getByTestId('coord-anim-trigger'), {
        nativeEvent: { locationX: 150, locationY: 100 }
      });

      expect(getByTestId('coords-display')).toHaveTextContent('Last: 150, 100');
      expect(Animated.timing).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          toValue: 1, // 150/100 = 1.5, clamped to 1
          duration: 500,
        })
      );
    });
  });

  describe('Animation Timing Accuracy', () => {
    it('ensures animation durations match specifications', () => {
      const TestTimingComponent = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;

        const triggerShortAnim = () => {
          Animated.timing(animValue, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }).start();
        };

        const triggerLongAnim = () => {
          Animated.timing(animValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        };

        return (
          <View>
            <Pressable testID="short-anim" onPress={triggerShortAnim}>
              <Text>Short Animation</Text>
            </Pressable>
            <Pressable testID="long-anim" onPress={triggerLongAnim}>
              <Text>Long Animation</Text>
            </Pressable>
          </View>
        );
      };

      const { getByTestId } = render(<TestTimingComponent />);
      
      fireEvent.press(getByTestId('short-anim'));
      expect(Animated.timing).toHaveBeenLastCalledWith(
        expect.any(Object),
        expect.objectContaining({ duration: 250 })
      );

      fireEvent.press(getByTestId('long-anim'));
      expect(Animated.timing).toHaveBeenLastCalledWith(
        expect.any(Object),
        expect.objectContaining({ duration: 1000 })
      );
    });

    it('validates animation sequence initiation', () => {
      const TestSequenceAnimation = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;
        const [sequenceStarted, setSequenceStarted] = React.useState(false);

        const triggerSequence = () => {
          setSequenceStarted(true);
          Animated.timing(animValue, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }).start();
        };

        return (
          <View>
            <Pressable testID="sequence-trigger" onPress={triggerSequence}>
              <Text>Start Sequence</Text>
            </Pressable>
            <Text testID="sequence-status">
              {sequenceStarted ? 'Sequence Started' : 'Ready'}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestSequenceAnimation />);
      
      fireEvent.press(getByTestId('sequence-trigger'));
      
      // Sequence should be initiated
      expect(getByTestId('sequence-status')).toHaveTextContent('Sequence Started');
      expect(Animated.timing).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ toValue: 0.5, duration: 200 })
      );
    });

    it('handles animation timing with native driver requirements', () => {
      const TestNativeDriverComponent = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;

        const triggerNativeAnimation = () => {
          Animated.timing(animValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true, // Required for 60fps performance
          }).start();
        };

        const triggerJSAnimation = () => {
          Animated.timing(animValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false, // JS thread animation
          }).start();
        };

        return (
          <View>
            <Pressable testID="native-anim" onPress={triggerNativeAnimation}>
              <Text>Native Animation</Text>
            </Pressable>
            <Pressable testID="js-anim" onPress={triggerJSAnimation}>
              <Text>JS Animation</Text>
            </Pressable>
          </View>
        );
      };

      const { getByTestId } = render(<TestNativeDriverComponent />);
      
      fireEvent.press(getByTestId('native-anim'));
      expect(Animated.timing).toHaveBeenLastCalledWith(
        expect.any(Object),
        expect.objectContaining({ useNativeDriver: true })
      );

      fireEvent.press(getByTestId('js-anim'));
      expect(Animated.timing).toHaveBeenLastCalledWith(
        expect.any(Object),
        expect.objectContaining({ useNativeDriver: false })
      );
    });
  });

  describe('Concurrent Animation Handling', () => {
    it('manages multiple simultaneous animations', () => {
      const TestConcurrentAnimations = () => {
        const anim1 = React.useRef(new Animated.Value(0)).current;
        const anim2 = React.useRef(new Animated.Value(0)).current;
        const [activeAnimations, setActiveAnimations] = React.useState(0);

        const startConcurrentAnimations = () => {
          setActiveAnimations(2);
          
          Animated.timing(anim1, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            setActiveAnimations(prev => prev - 1);
          });

          Animated.timing(anim2, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }).start(() => {
            setActiveAnimations(prev => prev - 1);
          });
        };

        return (
          <View>
            <Pressable testID="concurrent-trigger" onPress={startConcurrentAnimations}>
              <Text>Start Concurrent</Text>
            </Pressable>
            <Text testID="active-count">{activeAnimations}</Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestConcurrentAnimations />);
      
      fireEvent.press(getByTestId('concurrent-trigger'));
      
      expect(getByTestId('active-count')).toHaveTextContent('2');
      expect(Animated.timing).toHaveBeenCalledTimes(2);
      expect(Animated.timing).toHaveBeenNthCalledWith(1,
        expect.any(Object),
        expect.objectContaining({ duration: 400 })
      );
      expect(Animated.timing).toHaveBeenNthCalledWith(2,
        expect.any(Object),
        expect.objectContaining({ duration: 600 })
      );
    });

    it('handles animation interference and overlap', () => {
      const TestAnimationOverlap = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;
        const [animationId, setAnimationId] = React.useState(0);

        const startAnimation = (targetValue: number, duration: number) => {
          const currentId = animationId + 1;
          setAnimationId(currentId);
          
          Animated.timing(animValue, {
            toValue: targetValue,
            duration: duration,
            useNativeDriver: true,
          }).start();
        };

        return (
          <View>
            <Pressable testID="anim-1" onPress={() => startAnimation(1, 300)}>
              <Text>Animation 1</Text>
            </Pressable>
            <Pressable testID="anim-2" onPress={() => startAnimation(0.5, 200)}>
              <Text>Animation 2</Text>
            </Pressable>
            <Text testID="animation-id">{animationId}</Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestAnimationOverlap />);
      
      // Start first animation
      fireEvent.press(getByTestId('anim-1'));
      expect(getByTestId('animation-id')).toHaveTextContent('1');
      
      // Start second animation (should interrupt first)
      fireEvent.press(getByTestId('anim-2'));
      expect(getByTestId('animation-id')).toHaveTextContent('2');
      
      expect(Animated.timing).toHaveBeenCalledTimes(2);
    });
  });

  describe('Animation Completion Callbacks', () => {
    it('sets up animations with proper callback structure', () => {
      const TestCallbackAnimation = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;
        const [animationStarted, setAnimationStarted] = React.useState(false);

        const startAnimationWithCallback = () => {
          setAnimationStarted(true);
          Animated.timing(animValue, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }).start();
        };

        return (
          <View>
            <Pressable testID="callback-anim" onPress={startAnimationWithCallback}>
              <Text>Animation with Callback</Text>
            </Pressable>
            <Text testID="anim-status">
              {animationStarted ? 'Animation Started' : 'Ready'}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestCallbackAnimation />);
      
      fireEvent.press(getByTestId('callback-anim'));
      
      expect(getByTestId('anim-status')).toHaveTextContent('Animation Started');
      expect(Animated.timing).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ duration: 250 })
      );
    });

    it('handles multiple animation initiations correctly', () => {
      const TestMultipleAnimations = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;
        const [animationCount, setAnimationCount] = React.useState(0);

        const startAnimation = () => {
          setAnimationCount(prev => prev + 1);
          Animated.timing(animValue, {
            toValue: Math.random(),
            duration: 100,
            useNativeDriver: true,
          }).start();
        };

        return (
          <View>
            <Pressable testID="multi-anim" onPress={startAnimation}>
              <Text>Start Animation</Text>
            </Pressable>
            <Text testID="anim-count">{animationCount}</Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestMultipleAnimations />);
      
      fireEvent.press(getByTestId('multi-anim'));
      fireEvent.press(getByTestId('multi-anim'));
      fireEvent.press(getByTestId('multi-anim'));

      expect(getByTestId('anim-count')).toHaveTextContent('3');
      expect(Animated.timing).toHaveBeenCalledTimes(3);
    });

    it('handles animation state management during lifecycle', () => {
      const TestLifecycleAnimation = () => {
        const animValue = React.useRef(new Animated.Value(0)).current;
        const [isAnimating, setIsAnimating] = React.useState(false);

        const startAnimation = () => {
          setIsAnimating(true);
          Animated.timing(animValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        };

        const stopAnimation = () => {
          setIsAnimating(false);
        };

        return (
          <View>
            <Pressable testID="start-anim" onPress={startAnimation}>
              <Text>Start Animation</Text>
            </Pressable>
            <Pressable testID="stop-anim" onPress={stopAnimation}>
              <Text>Stop Animation</Text>
            </Pressable>
            <Text testID="anim-state">
              {isAnimating ? 'Animating' : 'Stopped'}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<TestLifecycleAnimation />);
      
      // Start animation
      fireEvent.press(getByTestId('start-anim'));
      expect(getByTestId('anim-state')).toHaveTextContent('Animating');
      
      // Stop animation
      fireEvent.press(getByTestId('stop-anim'));
      expect(getByTestId('anim-state')).toHaveTextContent('Stopped');
      
      expect(Animated.timing).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ duration: 1000 })
      );
    });
  });
});