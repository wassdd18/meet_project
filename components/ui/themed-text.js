import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const ThemedText = ({ 
  type = 'default', 
  style, 
  ...props 
}) => {
  const textStyles = {
    title: styles.title,
    subtitle: styles.subtitle,
    default: styles.default,
    defaultSemiBold: styles.defaultSemiBold,
    link: styles.link,
  };

  return (
    <Text style={[textStyles[type], style]} {...props} />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 4,
  },
  default: {
    fontSize: 16,
    marginVertical: 2,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 2,
  },
  link: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});