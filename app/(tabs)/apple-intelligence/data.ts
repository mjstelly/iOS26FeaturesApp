import { COLORS } from './constants';
import type { AIFeature } from './types';

export const AI_FEATURES: AIFeature[] = [
  {
    title: 'Smart Writing',
    description: 'AI-powered writing assistance and proofreading',
    icon: 'pencil.and.scribble',
    color: COLORS.PRIMARY,
  },
  {
    title: 'Image Generation',
    description: 'Create images from text descriptions on-device',
    icon: 'photo.on.rectangle',
    color: COLORS.DESTRUCTIVE,
  },
  {
    title: 'Code Completion',
    description: 'Intelligent code suggestions and debugging',
    icon: 'chevron.left.forwardslash.chevron.right',
    color: COLORS.SUCCESS,
  },
  {
    title: 'Smart Summarization',
    description: 'Summarize documents and web pages instantly',
    icon: 'doc.text.magnifyingglass',
    color: COLORS.WARNING,
  },
  {
    title: 'Language Translation',
    description: 'Real-time translation across 40+ languages',
    icon: 'globe',
    color: COLORS.PURPLE,
  },
  {
    title: 'Voice Understanding',
    description: 'Advanced speech recognition and processing',
    icon: 'waveform',
    color: COLORS.PINK,
  },
];