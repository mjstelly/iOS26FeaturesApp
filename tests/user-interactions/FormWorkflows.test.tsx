import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TextInput, Pressable, View, Text, Alert } from 'react-native';

// Mock Alert
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Alert.alert = jest.fn();
  return RN;
});

describe('Form Workflow User Interactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Text Input Completion Workflows', () => {
    it('handles complete text input workflow with validation', () => {
      const mockOnSubmit = jest.fn();
      const TestForm = () => {
        const [text, setText] = React.useState('');
        const [error, setError] = React.useState('');

        const handleSubmit = () => {
          if (!text.trim()) {
            setError('Text is required');
            return;
          }
          setError('');
          mockOnSubmit(text);
        };

        return (
          <View>
            <TextInput
              testID="form-input"
              value={text}
              onChangeText={setText}
              placeholder="Enter text"
            />
            {error ? (
              <Text testID="error-message" style={{ color: 'red' }}>
                {error}
              </Text>
            ) : null}
            <Pressable testID="submit-button" onPress={handleSubmit}>
              <Text>Submit</Text>
            </Pressable>
          </View>
        );
      };

      const { getByTestId, queryByTestId } = render(<TestForm />);
      
      // Initially no error shown
      expect(queryByTestId('error-message')).toBeNull();

      // Submit without input should show error
      fireEvent.press(getByTestId('submit-button'));
      expect(getByTestId('error-message')).toBeTruthy();
      expect(mockOnSubmit).not.toHaveBeenCalled();

      // Enter valid text and submit
      fireEvent.changeText(getByTestId('form-input'), 'Valid input');
      fireEvent.press(getByTestId('submit-button'));
      
      // Error should be cleared and submit should be called
      expect(queryByTestId('error-message')).toBeNull();
      expect(mockOnSubmit).toHaveBeenCalledWith('Valid input');
    });

    it('handles multi-step form completion', () => {
      const mockOnComplete = jest.fn();
      const MultiStepForm = () => {
        const [step, setStep] = React.useState(1);
        const [step1Data, setStep1Data] = React.useState('');
        const [step2Data, setStep2Data] = React.useState('');

        const handleNext = () => {
          if (step === 1 && step1Data.trim()) {
            setStep(2);
          } else if (step === 2 && step2Data.trim()) {
            mockOnComplete({ step1: step1Data, step2: step2Data });
          }
        };

        const handleBack = () => {
          if (step > 1) setStep(step - 1);
        };

        return (
          <View>
            <Text testID="step-indicator">Step {step} of 2</Text>
            
            {step === 1 && (
              <TextInput
                testID="step1-input"
                value={step1Data}
                onChangeText={setStep1Data}
                placeholder="Step 1 data"
              />
            )}
            
            {step === 2 && (
              <TextInput
                testID="step2-input"
                value={step2Data}
                onChangeText={setStep2Data}
                placeholder="Step 2 data"
              />
            )}
            
            <View style={{ flexDirection: 'row' }}>
              {step > 1 && (
                <Pressable testID="back-button" onPress={handleBack}>
                  <Text>Back</Text>
                </Pressable>
              )}
              <Pressable testID="next-button" onPress={handleNext}>
                <Text>{step === 2 ? 'Complete' : 'Next'}</Text>
              </Pressable>
            </View>
          </View>
        );
      };

      const { getByTestId, queryByTestId } = render(<MultiStepForm />);
      
      // Start at step 1
      expect(getByTestId('step-indicator')).toHaveTextContent('Step 1 of 2');
      expect(getByTestId('step1-input')).toBeTruthy();
      expect(queryByTestId('step2-input')).toBeNull();

      // Complete step 1
      fireEvent.changeText(getByTestId('step1-input'), 'Step 1 completed');
      fireEvent.press(getByTestId('next-button'));

      // Should be at step 2
      expect(getByTestId('step-indicator')).toHaveTextContent('Step 2 of 2');
      expect(queryByTestId('step1-input')).toBeNull();
      expect(getByTestId('step2-input')).toBeTruthy();
      expect(getByTestId('back-button')).toBeTruthy();

      // Complete step 2
      fireEvent.changeText(getByTestId('step2-input'), 'Step 2 completed');
      fireEvent.press(getByTestId('next-button'));

      expect(mockOnComplete).toHaveBeenCalledWith({
        step1: 'Step 1 completed',
        step2: 'Step 2 completed'
      });
    });

    it('handles form auto-save functionality', async () => {
      const mockAutoSave = jest.fn();
      const AutoSaveForm = () => {
        const [text, setText] = React.useState('');
        const [lastSaved, setLastSaved] = React.useState('');

        React.useEffect(() => {
          if (text.trim() && text !== lastSaved) {
            const timer = setTimeout(() => {
              mockAutoSave(text);
              setLastSaved(text);
            }, 500); // Auto-save after 500ms of no typing

            return () => clearTimeout(timer);
          }
        }, [text, lastSaved]);

        return (
          <View>
            <TextInput
              testID="auto-save-input"
              value={text}
              onChangeText={setText}
              placeholder="Auto-saving input"
            />
            <Text testID="save-status">
              {lastSaved ? `Last saved: ${lastSaved}` : 'Not saved'}
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<AutoSaveForm />);
      
      // Type some text
      fireEvent.changeText(getByTestId('auto-save-input'), 'Auto save test');
      
      // Wait for auto-save to trigger
      await waitFor(() => {
        expect(mockAutoSave).toHaveBeenCalledWith('Auto save test');
      }, { timeout: 1000 });

      expect(getByTestId('save-status')).toHaveTextContent('Last saved: Auto save test');
    });
  });

  describe('Validation Feedback Workflows', () => {
    it('provides real-time validation feedback', () => {
      const ValidationForm = () => {
        const [email, setEmail] = React.useState('');
        const [emailError, setEmailError] = React.useState('');

        const validateEmail = (value: string) => {
          if (!value) {
            setEmailError('Email is required');
          } else if (!value.includes('@')) {
            setEmailError('Invalid email format');
          } else {
            setEmailError('');
          }
        };

        React.useEffect(() => {
          if (email) validateEmail(email);
        }, [email]);

        return (
          <View>
            <TextInput
              testID="email-input"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
            />
            {emailError ? (
              <Text testID="email-error" style={{ color: 'red' }}>
                {emailError}
              </Text>
            ) : email ? (
              <Text testID="email-success" style={{ color: 'green' }}>
                Valid email
              </Text>
            ) : null}
          </View>
        );
      };

      const { getByTestId, queryByTestId } = render(<ValidationForm />);
      
      // Initially no validation messages
      expect(queryByTestId('email-error')).toBeNull();
      expect(queryByTestId('email-success')).toBeNull();

      // Enter invalid email
      fireEvent.changeText(getByTestId('email-input'), 'invalid');
      expect(getByTestId('email-error')).toHaveTextContent('Invalid email format');

      // Enter valid email
      fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
      expect(queryByTestId('email-error')).toBeNull();
      expect(getByTestId('email-success')).toHaveTextContent('Valid email');
    });

    it('handles character limit validation with counter', () => {
      const CharacterLimitForm = () => {
        const [text, setText] = React.useState('');
        const maxLength = 50;
        const remainingChars = maxLength - text.length;

        return (
          <View>
            <TextInput
              testID="limited-input"
              value={text}
              onChangeText={setText}
              maxLength={maxLength}
              placeholder="Max 50 characters"
            />
            <Text 
              testID="char-counter"
              style={{ color: remainingChars < 10 ? 'red' : 'gray' }}
            >
              {remainingChars} characters remaining
            </Text>
          </View>
        );
      };

      const { getByTestId } = render(<CharacterLimitForm />);
      
      // Initial state
      expect(getByTestId('char-counter')).toHaveTextContent('50 characters remaining');

      // Type some text
      fireEvent.changeText(getByTestId('limited-input'), 'This is a test message');
      expect(getByTestId('char-counter')).toHaveTextContent('28 characters remaining');

      // Approach limit (should turn red when < 10 remaining)
      const longMessage = 'This message has exactly forty six characters!'; // 46 chars
      fireEvent.changeText(getByTestId('limited-input'), longMessage);
      expect(getByTestId('char-counter')).toHaveTextContent('4 characters remaining');
    });
  });

  describe('Submission Workflows', () => {
    it('handles form submission with loading state', async () => {
      const mockSubmit = jest.fn().mockResolvedValue({ success: true });
      const SubmissionForm = () => {
        const [text, setText] = React.useState('');
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [submitResult, setSubmitResult] = React.useState('');

        const handleSubmit = async () => {
          setIsSubmitting(true);
          try {
            const result = await mockSubmit(text);
            setSubmitResult(result.success ? 'Success!' : 'Failed');
          } catch (error) {
            setSubmitResult('Error occurred');
          } finally {
            setIsSubmitting(false);
          }
        };

        return (
          <View>
            <TextInput
              testID="submission-input"
              value={text}
              onChangeText={setText}
              editable={!isSubmitting}
              placeholder="Enter text to submit"
            />
            <Pressable
              testID="submit-btn"
              onPress={handleSubmit}
              disabled={isSubmitting || !text.trim()}
            >
              <Text>{isSubmitting ? 'Submitting...' : 'Submit'}</Text>
            </Pressable>
            {submitResult && (
              <Text testID="submit-result">{submitResult}</Text>
            )}
          </View>
        );
      };

      const { getByTestId, queryByTestId } = render(<SubmissionForm />);
      
      // Enter text
      fireEvent.changeText(getByTestId('submission-input'), 'Test submission');
      
      // Submit form
      fireEvent.press(getByTestId('submit-btn'));
      
      // Should show loading state
      expect(getByTestId('submit-btn')).toHaveTextContent('Submitting...');
      
      // Wait for submission to complete
      await waitFor(() => {
        expect(getByTestId('submit-result')).toHaveTextContent('Success!');
      });

      expect(mockSubmit).toHaveBeenCalledWith('Test submission');
    });

    it('handles form submission with network errors', async () => {
      const mockSubmit = jest.fn().mockRejectedValue(new Error('Network error'));
      const ErrorHandlingForm = () => {
        const [text, setText] = React.useState('');
        const [error, setError] = React.useState('');
        const [isSubmitting, setIsSubmitting] = React.useState(false);

        const handleSubmit = async () => {
          setIsSubmitting(true);
          setError('');
          try {
            await mockSubmit(text);
          } catch (err) {
            setError('Submission failed. Please try again.');
          } finally {
            setIsSubmitting(false);
          }
        };

        return (
          <View>
            <TextInput
              testID="error-form-input"
              value={text}
              onChangeText={setText}
              placeholder="Enter text"
            />
            {error && (
              <Text testID="submission-error" style={{ color: 'red' }}>
                {error}
              </Text>
            )}
            <Pressable
              testID="error-submit-btn"
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text>Submit</Text>
            </Pressable>
          </View>
        );
      };

      const { getByTestId, queryByTestId } = render(<ErrorHandlingForm />);
      
      // Enter text and submit
      fireEvent.changeText(getByTestId('error-form-input'), 'Test data');
      fireEvent.press(getByTestId('error-submit-btn'));
      
      // Wait for error to appear
      await waitFor(() => {
        expect(getByTestId('submission-error')).toHaveTextContent('Submission failed. Please try again.');
      });

      expect(mockSubmit).toHaveBeenCalledWith('Test data');
    });
  });

  describe('Error State Handling Workflows', () => {
    it('handles field-specific error recovery', () => {
      const ErrorRecoveryForm = () => {
        const [fields, setFields] = React.useState({
          username: '',
          password: ''
        });
        const [errors, setErrors] = React.useState({
          username: '',
          password: ''
        });

        const validateField = (name: string, value: string) => {
          let error = '';
          if (name === 'username' && value.length < 3) {
            error = 'Username must be at least 3 characters';
          } else if (name === 'password' && value.length < 6) {
            error = 'Password must be at least 6 characters';
          }
          
          setErrors(prev => ({ ...prev, [name]: error }));
        };

        const handleFieldChange = (name: string, value: string) => {
          setFields(prev => ({ ...prev, [name]: value }));
          validateField(name, value);
        };

        return (
          <View>
            <TextInput
              testID="username-input"
              value={fields.username}
              onChangeText={(value) => handleFieldChange('username', value)}
              placeholder="Username"
            />
            {errors.username && (
              <Text testID="username-error" style={{ color: 'red' }}>
                {errors.username}
              </Text>
            )}
            
            <TextInput
              testID="password-input"
              value={fields.password}
              onChangeText={(value) => handleFieldChange('password', value)}
              placeholder="Password"
              secureTextEntry
            />
            {errors.password && (
              <Text testID="password-error" style={{ color: 'red' }}>
                {errors.password}
              </Text>
            )}
          </View>
        );
      };

      const { getByTestId, queryByTestId } = render(<ErrorRecoveryForm />);
      
      // Enter invalid username
      fireEvent.changeText(getByTestId('username-input'), 'ab');
      expect(getByTestId('username-error')).toHaveTextContent('Username must be at least 3 characters');

      // Fix username error
      fireEvent.changeText(getByTestId('username-input'), 'validuser');
      expect(queryByTestId('username-error')).toBeNull();

      // Enter invalid password
      fireEvent.changeText(getByTestId('password-input'), '123');
      expect(getByTestId('password-error')).toHaveTextContent('Password must be at least 6 characters');

      // Fix password error
      fireEvent.changeText(getByTestId('password-input'), 'validpassword');
      expect(queryByTestId('password-error')).toBeNull();
    });

    it('handles form reset after errors', () => {
      const ResetForm = () => {
        const [data, setData] = React.useState({ field1: '', field2: '' });
        const [hasErrors, setHasErrors] = React.useState(false);

        const handleSubmit = () => {
          if (!data.field1 || !data.field2) {
            setHasErrors(true);
            return;
          }
          setHasErrors(false);
          Alert.alert('Success', 'Form submitted successfully');
        };

        const handleReset = () => {
          setData({ field1: '', field2: '' });
          setHasErrors(false);
        };

        return (
          <View>
            <TextInput
              testID="field1"
              value={data.field1}
              onChangeText={(value) => setData(prev => ({ ...prev, field1: value }))}
              placeholder="Field 1"
            />
            <TextInput
              testID="field2"
              value={data.field2}
              onChangeText={(value) => setData(prev => ({ ...prev, field2: value }))}
              placeholder="Field 2"
            />
            
            {hasErrors && (
              <Text testID="form-errors" style={{ color: 'red' }}>
                All fields are required
              </Text>
            )}
            
            <View style={{ flexDirection: 'row' }}>
              <Pressable testID="submit-form" onPress={handleSubmit}>
                <Text>Submit</Text>
              </Pressable>
              <Pressable testID="reset-form" onPress={handleReset}>
                <Text>Reset</Text>
              </Pressable>
            </View>
          </View>
        );
      };

      const { getByTestId, queryByTestId } = render(<ResetForm />);
      
      // Enter partial data and submit (should show error)
      fireEvent.changeText(getByTestId('field1'), 'value1');
      fireEvent.press(getByTestId('submit-form'));
      expect(getByTestId('form-errors')).toBeTruthy();

      // Reset form
      fireEvent.press(getByTestId('reset-form'));
      expect(getByTestId('field1').props.value).toBe('');
      expect(getByTestId('field2').props.value).toBe('');
      expect(queryByTestId('form-errors')).toBeNull();
    });
  });
});