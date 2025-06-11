// Shared constants across the iOS 26 Features App
export const APP_COLORS = {
  // Core iOS colors
  PRIMARY: '#007AFF',
  DESTRUCTIVE: '#FF3B30',
  SUCCESS: '#34C759',
  WARNING: '#FF9500',
  PURPLE: '#AF52DE',
  PINK: '#FF2D92',
  WHITE: '#ffffff',
  BLACK: '#000000',
  
  // Common gradients
  BLUE_PURPLE: ['#667eea', '#764ba2'],
  PURPLE_PINK: ['#f093fb', '#f5576c'],
  BLUE_CYAN: ['#4facfe', '#00f2fe'],
  GREEN_CYAN: ['#43e97b', '#38f9d7'],
  PINK_YELLOW: ['#fa709a', '#fee140'],
  CYAN_PINK: ['#a8edea', '#fed6e3'],
  
  // Extended gradients
  HERO_GRADIENT: ['#667eea', '#764ba2', '#f093fb'],
  VISUAL_GRADIENT: ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
} as const;

export const LAYOUT_CONSTANTS = {
  // Common dimensions
  SECTION_PADDING: 20,
  CARD_BORDER_RADIUS: 16,
  SMALL_BORDER_RADIUS: 12,
  LARGE_BORDER_RADIUS: 25,
  ICON_CONTAINER_SIZE: 56,
  FEATURE_CARD_WIDTH: '47%',
  
  // Common heights
  HERO_HEIGHT: 300,
  HEADER_HEIGHT: 200,
  MIN_CARD_HEIGHT: 140,
  
  // Spacing
  FOOTER_PADDING_BOTTOM: 40,
} as const;

export const BLUR_CONSTANTS = {
  LIGHT: 20,
  MEDIUM: 40,
  HEAVY: 60,
  INTENSE: 80,
  MAX: 95,
} as const;

export const ANIMATION_CONSTANTS = {
  QUICK: 150,
  NORMAL: 300,
  SLOW: 500,
  PROCESSING_DELAY: 2000,
  DEMO_DELAY: 1500,
} as const;