import React from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";
import { colors, spacing, borderRadius, shadows } from "../utils/theme";

interface CardProps extends ViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
    elevation?: "none" | "small" | "medium" | "large";
    padding?: "none" | "small" | "medium" | "large";
    backgroundColor?: string;
    borderRadius?: number;
}

const Card: React.FC<CardProps> = ({
    children,
    style,
    elevation = "medium",
    padding = "medium",
    backgroundColor = colors.surface,
    borderRadius: customBorderRadius,
    ...rest
}) => {
    const cardStyles: ViewStyle[] = [
        styles.card,
        elevation !== "none" && shadows[elevation],
        styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
        {
            backgroundColor,
            borderRadius: customBorderRadius ?? borderRadius.medium,
        },
        style as ViewStyle,
    ];

    return (
        <View style={cardStyles} {...rest}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        overflow: "hidden",
    },
    paddingNone: {
        padding: 0,
    },
    paddingSmall: {
        padding: spacing.s,
    },
    paddingMedium: {
        padding: spacing.m,
    },
    paddingLarge: {
        padding: spacing.l,
    },
});

export default Card;
