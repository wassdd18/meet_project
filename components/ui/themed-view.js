import React from 'react';
import { StyleSheet, View } from 'react-native';

export const ThemedView = ({ 
  style, 
  useTheme = true,
  ...props 
}) => {
  
  return (
    <View style={[useTheme ? styles.container : {}, style]} {...props} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});