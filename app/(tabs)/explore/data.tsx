import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { COLORS } from './constants';
import type { Feature } from './types';

export const ADDITIONAL_FEATURES: Feature[] = [
  {
    title: 'Live Translation',
    description: 'Real-time translation in Messages, FaceTime, and Phone',
    icon: 'globe',
    color: COLORS.PURPLE,
  },
  {
    title: 'Enhanced Phone App',
    description: 'Unified layout with call screening and smart voicemail',
    icon: 'phone.fill',
    color: COLORS.SUCCESS,
  },
  {
    title: 'Control Center Widgets',
    description: 'Customizable widgets with third-party app support',
    icon: 'dial.high',
    color: COLORS.WARNING,
  },
  {
    title: 'Dynamic Island',
    description: 'Enhanced Live Activities with richer interactions',
    icon: 'oval.fill',
    color: COLORS.PINK,
  },
  {
    title: 'Camera Control',
    description: 'New dedicated camera button with haptic feedback',
    icon: 'camera.fill',
    color: COLORS.PRIMARY,
  },
  {
    title: 'Foundation Models API',
    description: 'Direct access to on-device AI models for developers',
    icon: 'cpu.fill',
    color: COLORS.DESTRUCTIVE,
  },
];

export const INFO_SECTIONS = [
  {
    title: 'iOS 26 Overview',
    content: (
      <>
        <ThemedText>
          iOS 26 introduces the most significant design overhaul in years with{' '}
          <ThemedText type="defaultSemiBold">Liquid Glass</ThemedText>, a new translucent design system.
        </ThemedText>
        <ThemedText>
          The update also brings enhanced <ThemedText type="defaultSemiBold">Apple Intelligence</ThemedText>{' '}
          capabilities with direct access to on-device AI models.
        </ThemedText>
      </>
    ),
  },
  {
    title: 'Developer Benefits',
    content: (
      <>
        <ThemedText>
          This version introduces the <ThemedText type="defaultSemiBold">Foundation Models framework</ThemedText>,{' '}
          allowing developers to tap directly into Apple&apos;s on-device AI.
        </ThemedText>
        <ThemedText>
          New APIs for <ThemedText type="defaultSemiBold">Visual Intelligence</ThemedText> enable{' '}
          screen-aware functionality across all apps.
        </ThemedText>
      </>
    ),
  },
  {
    title: 'Privacy & Security',
    content: (
      <>
        <ThemedText>
          All AI processing happens entirely on-device, ensuring user privacy and security.{' '}
          No data is sent to external servers for processing.
        </ThemedText>
        <ThemedText>
          The new <ThemedText type="defaultSemiBold">Liquid Glass</ThemedText> design system{' '}
          includes privacy-focused blur effects that protect sensitive content.
        </ThemedText>
      </>
    ),
  },
  {
    title: 'Compatibility',
    content: (
      <>
        <ThemedText>
          iOS 26 supports iPhone 11 and newer devices. Apple Intelligence features{' '}
          require iPhone 15 Pro or iPhone 16 series.
        </ThemedText>
        <ThemedText>
          Developer beta is available now, with public beta coming in July 2025.
        </ThemedText>
      </>
    ),
  },
];