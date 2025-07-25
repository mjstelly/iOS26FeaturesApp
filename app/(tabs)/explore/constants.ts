export const COLORS = {
  HEADER_GRADIENT: ['#667eea', '#764ba2'],
  PURPLE: '#AF52DE',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  PINK: '#FF2D92',
  PRIMARY: '#007AFF',
  DESTRUCTIVE: '#FF3B30',
  BLACK: '#000000',
  WHITE: '#ffffff',
} as const;

export const LAYOUT = {
  HEADER_HEIGHT: 200,
  SECTION_PADDING: 20,
  CARD_BORDER_RADIUS: 16,
  ICON_CONTAINER_SIZE: 56,
  FEATURE_CARD_WIDTH: '47%',
  MIN_CARD_HEIGHT: 140,
  FOOTER_PADDING_BOTTOM: 40,
} as const;

export const BLUR_INTENSITY = {
  HEADER: 20,
  FEATURE_CARD: 60,
  FOOTER_CARD: 40,
} as const;