import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedText } from '@/components/ThemedText';

describe('Infrastructure Validation: Single Component Test', () => {
  it('renders without crashing (infrastructure validation only)', () => {
    const { getByText } = render(
      <ThemedText>Test</ThemedText>
    );
    
    expect(getByText('Test')).toBeTruthy();
  });
});