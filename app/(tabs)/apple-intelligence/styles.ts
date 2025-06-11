import { StyleSheet } from 'react-native';
import { COLORS, LAYOUT } from './constants';

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 20,
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
  heroTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export const demoStyles = StyleSheet.create({
  demoSection: {
    padding: LAYOUT.SECTION_PADDING,
  },
  inputContainer: {
    gap: 16,
  },
  textInput: {
    borderRadius: LAYOUT.INPUT_BORDER_RADIUS,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    textAlignVertical: 'top',
  },
  processButton: {
    borderRadius: LAYOUT.BUTTON_BORDER_RADIUS,
    overflow: 'hidden',
  },
  processingButton: {
    opacity: 0.7,
  },
  buttonBlur: {
    backgroundColor: COLORS.PRIMARY,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const featureStyles = StyleSheet.create({
  featuresSection: {
    padding: LAYOUT.SECTION_PADDING,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    width: LAYOUT.FEATURE_CARD_WIDTH,
    borderRadius: LAYOUT.CARD_BORDER_RADIUS,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featureBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureContent: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: LAYOUT.ICON_CONTAINER_SIZE,
    height: LAYOUT.ICON_CONTAINER_SIZE,
    borderRadius: LAYOUT.ICON_CONTAINER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export const privacyStyles = StyleSheet.create({
  privacySection: {
    padding: LAYOUT.SECTION_PADDING,
    paddingBottom: 40,
  },
  privacyCard: {
    borderRadius: LAYOUT.CARD_BORDER_RADIUS,
    overflow: 'hidden',
  },
  privacyContent: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  privacyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  privacyText: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 24,
  },
});