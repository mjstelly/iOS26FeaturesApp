import { StyleSheet } from 'react-native';
import { COLORS, LAYOUT } from './constants';

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
});

export const headerStyles = StyleSheet.create({
  header: {
    height: LAYOUT.HEADER_HEIGHT,
  },
  headerGradient: {
    flex: 1,
  },
  headerBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 40,
  },
  headerTitle: {
    color: COLORS.WHITE,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: COLORS.WHITE,
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
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
    minHeight: LAYOUT.MIN_CARD_HEIGHT,
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

export const infoStyles = StyleSheet.create({
  infoSection: {
    padding: LAYOUT.SECTION_PADDING,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
});

export const footerStyles = StyleSheet.create({
  footerSection: {
    padding: LAYOUT.SECTION_PADDING,
    paddingBottom: LAYOUT.FOOTER_PADDING_BOTTOM,
  },
  footerCard: {
    borderRadius: LAYOUT.CARD_BORDER_RADIUS,
    overflow: 'hidden',
  },
  footerContent: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
});