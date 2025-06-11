import { StyleSheet } from 'react-native';
import { COLORS, LAYOUT } from './constants';

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  demoSection: {
    padding: LAYOUT.PADDING,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
  },
});

export const heroStyles = StyleSheet.create({
  heroSection: {
    height: LAYOUT.HERO_HEIGHT,
  },
  heroGradient: {
    flex: 1,
  },
  heroBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  liquidIcon: {
    marginBottom: 16,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
  },
});

export const playgroundStyles = StyleSheet.create({
  glassPlayground: {
    height: LAYOUT.PLAYGROUND_HEIGHT,
    position: 'relative',
    borderRadius: LAYOUT.BORDER_RADIUS.MEDIUM,
    overflow: 'hidden',
    backgroundColor: COLORS.PLAYGROUND_BACKGROUND,
  },
  mainInteractiveArea: {
    position: 'absolute',
    top: LAYOUT.MAIN_PADDING,
    left: LAYOUT.MAIN_PADDING,
    right: LAYOUT.MAIN_PADDING,
    height: LAYOUT.MAIN_AREA_HEIGHT,
    borderRadius: LAYOUT.BORDER_RADIUS.LARGE,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  mainBlur: {
    flex: 1,
  },
  mainGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  rippleEffect: {
    position: 'absolute',
    width: LAYOUT.RIPPLE_SIZE,
    height: LAYOUT.RIPPLE_SIZE,
    borderRadius: LAYOUT.RIPPLE_SIZE / 2,
    backgroundColor: COLORS.RIPPLE,
    borderWidth: 2,
    borderColor: COLORS.RIPPLE_BORDER,
    pointerEvents: 'none',
  },
  glassElement: {
    position: 'absolute',
    borderRadius: LAYOUT.BORDER_RADIUS.MEDIUM,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  glassBlur: {
    flex: 1,
  },
  elementGradient: {
    flex: 1,
    borderRadius: LAYOUT.BORDER_RADIUS.MEDIUM,
  },
  glassContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: LAYOUT.BORDER_RADIUS.MEDIUM,
  },
});

export const featureStyles = StyleSheet.create({
  featuresSection: {
    padding: LAYOUT.PADDING,
  },
  featuresList: {
    gap: 16,
  },
  featureCard: {
    borderRadius: LAYOUT.BORDER_RADIUS.SMALL,
    overflow: 'hidden',
  },
  featureContent: {
    padding: LAYOUT.PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'transparent',
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    opacity: 0.7,
  },
});