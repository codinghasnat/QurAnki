import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors, typography, spacing, borderRadius } from "../utils/theme";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "outline" | "text";
    size?: "small" | "medium" | "large";
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = "primary",
    size = "medium",
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon,
    iconPosition = "left",
    ...rest
}) => {
    // Determine button styles based on variant and size
    const buttonStyles: ViewStyle[] = [
        styles.button,
        styles[`${size}Button`],
        styles[`${variant}Button`],
        disabled && styles.disabledButton,
        style as ViewStyle,
    ];

    // Determine text styles based on variant and size
    const textStyles: TextStyle[] = [
        styles.text,
        styles[`${size}Text`],
        styles[`${variant}Text`],
        disabled && styles.disabledText,
        textStyle as TextStyle,
    ];

    // Render button content
    const renderContent = () => {
        if (loading) {
            return (
                <ActivityIndicator
                    color={
                        variant === "outline" || variant === "text"
                            ? colors.primary
                            : colors.textOnPrimary
                    }
                />
            );
        }

        const textElement = <Text style={textStyles}>{title}</Text>;

        if (!icon) {
            return textElement;
        }

        return (
            <>
                {iconPosition === "left" && icon}
                {textElement}
                {iconPosition === "right" && icon}
            </>
        );
    };

    // Render button with or without gradient
    if (variant === "primary" && !disabled) {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                style={[styles.buttonContainer, style]}
                activeOpacity={0.8}
                {...rest}>
                <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={buttonStyles}>
                    {renderContent()}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[buttonStyles, style]}
            activeOpacity={0.8}
            {...rest}>
            {renderContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: borderRadius.medium,
        overflow: "hidden",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: borderRadius.medium,
        paddingHorizontal: spacing.l,
    },
    text: {
        fontFamily: typography.fontFamilyTextMedium,
        textAlign: "center",
    },
    // Size variations
    smallButton: {
        paddingVertical: spacing.xs,
        minHeight: 32,
    },
    mediumButton: {
        paddingVertical: spacing.s,
        minHeight: 44,
    },
    largeButton: {
        paddingVertical: spacing.m,
        minHeight: 56,
    },
    smallText: {
        fontSize: typography.fontSizeSmall,
    },
    mediumText: {
        fontSize: typography.fontSizeMedium,
    },
    largeText: {
        fontSize: typography.fontSizeLarge,
    },
    // Variant styles
    primaryButton: {
        backgroundColor: colors.primary,
    },
    secondaryButton: {
        backgroundColor: colors.secondary,
    },
    outlineButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.primary,
    },
    textButton: {
        backgroundColor: "transparent",
        paddingHorizontal: spacing.s,
    },
    primaryText: {
        color: colors.textOnPrimary,
    },
    secondaryText: {
        color: colors.textOnSecondary,
    },
    outlineText: {
        color: colors.primary,
    },
    textText: {
        color: colors.primary,
    },
    // Disabled state
    disabledButton: {
        backgroundColor: colors.textDisabled,
        borderColor: colors.textDisabled,
    },
    disabledText: {
        color: colors.textHint,
    },
});

export default Button;
