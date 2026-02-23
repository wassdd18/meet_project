import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity
} from 'react-native';

const ThemedButton = ({ 
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
}) => {
  const getButtonStyle = () => {
    const styles = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    if (variant === 'primary') {
      styles.backgroundColor = '#007AFF';
    } else if (variant === 'secondary') {
      styles.backgroundColor = '#6C757D';
    } else if (variant === 'outline') {
      styles.backgroundColor = 'transparent';
      styles.borderWidth = 1;
      styles.borderColor = '#007AFF';
    }

    if (size === 'small') {
      styles.paddingHorizontal = 12;
      styles.paddingVertical = 6;
    } else if (size === 'medium') {
      styles.paddingHorizontal = 16;
      styles.paddingVertical = 10;
    } else if (size === 'large') {
      styles.paddingHorizontal = 24;
      styles.paddingVertical = 14;
    }

    if (disabled) {
      styles.opacity = 0.6;
    }

    return styles;
  };

  const textColor = variant === 'outline' ? '#007AFF' : '#FFFFFF';

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text style={{
          color: textColor,
          fontSize: size === 'small' ? 14 : 16,
          fontWeight: '600',
        }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ThemedButton;