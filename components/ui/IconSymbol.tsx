// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'drop.fill': 'water-drop',
  'sparkles': 'auto-awesome',
  'cube': 'view-in-ar',
  'paintbrush': 'brush',
  'brain.head.profile': 'psychology',
  'pencil.and.scribble': 'edit',
  'photo.on.rectangle': 'image',
  'doc.text.magnifyingglass': 'search',
  'globe': 'language',
  'waveform': 'graphic-eq',
  'gear': 'settings',
  'lock.shield': 'security',
  'plus.magnifyingglass': 'search',
  'phone.fill': 'phone',
  'dial.high': 'tune',
  'oval.fill': 'fiber-manual-record',
  'camera.fill': 'camera-alt',
  'cpu.fill': 'memory',
  'apple.logo': 'apple',
  'eye.fill': 'visibility',
  'ellipsis': 'more-horiz',
  'text.bubble.fill': 'chat-bubble',
  'viewfinder': 'crop-free',
  'wand.and.stars': 'auto-fix-high',
  'doc.text.viewfinder': 'document-scanner',
  'fork.knife': 'restaurant',
  'doc.text': 'description',
  'magnifyingglass': 'search',
  'character.book.closed': 'translate',
  'apps.iphone': 'apps',
  'photo.fill': 'photo',
  'safari.fill': 'language',
  'message.fill': 'message',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
