import React from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { infoStyles } from '../styles';

interface InfoSectionItem {
  title: string;
  content: React.ReactNode;
}

interface InfoSectionProps {
  sections: InfoSectionItem[];
}

export const InfoSection = ({ sections }: InfoSectionProps) => (
  <ThemedView style={infoStyles.infoSection}>
    <ThemedText type="subtitle" style={infoStyles.sectionTitle}>
      About This Demo
    </ThemedText>
    
    {sections.map((section, index) => (
      <Collapsible key={index} title={section.title}>
        {section.content}
      </Collapsible>
    ))}
  </ThemedView>
);