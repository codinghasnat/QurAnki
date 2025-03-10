import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    PanResponder,
    Animated,
    LayoutChangeEvent,
    ViewStyle,
    Platform,
} from "react-native";
import { colors, typography, spacing, borderRadius } from "../utils/theme";

interface DifficultySliderProps {
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    style?: ViewStyle;
    showLabels?: boolean;
}

const DifficultySlider: React.FC<DifficultySliderProps> = ({
    value,
    onValueChange,
    min = 0,
    max = 10,
    step = 1,
    style,
    showLabels = true,
}) => {
    const [sliderWidth, setSliderWidth] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;
    const [offset, setOffset] = useState(0);
    const lastValue = useRef(value);

    // Calculate the initial position based on the value
    React.useEffect(() => {
        if (sliderWidth > 0 && value !== lastValue.current) {
            const position = ((value - min) / (max - min)) * sliderWidth;
            translateX.setValue(position);
            lastValue.current = value;
        }
    }, [value, min, max, sliderWidth, translateX]);

    // Handle layout changes to get the width of the slider
    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setSliderWidth(width);
    };

    // Helper function to convert position to value
    const positionToValue = (position: number): number => {
        const ratio = position / sliderWidth;
        const range = max - min;
        let newValue = min + ratio * range;

        // Apply step if provided
        if (step > 0) {
            newValue = Math.round(newValue / step) * step;
        }

        // Ensure the value is within bounds
        return Math.max(min, Math.min(max, newValue));
    };

    // Create pan responder for handling touch events
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                let currentValue = 0;
                translateX.addListener(({ value }) => {
                    currentValue = value;
                });
                setOffset(currentValue);
                translateX.setValue(0);
                translateX.removeAllListeners();
            },
            onPanResponderMove: (_, gestureState) => {
                let newX = gestureState.dx;

                // Constrain the position within the slider bounds
                if (offset + newX < 0) {
                    newX = -offset;
                } else if (offset + newX > sliderWidth) {
                    newX = sliderWidth - offset;
                }

                translateX.setValue(newX);

                // Update value while dragging for smooth feedback
                const currentPosition = offset + newX;
                const newValue = positionToValue(currentPosition);
                if (newValue !== lastValue.current) {
                    onValueChange(newValue);
                    lastValue.current = newValue;
                }
            },
            onPanResponderRelease: () => {
                let currentValue = 0;
                translateX.addListener(({ value }) => {
                    currentValue = value;
                });
                const currentPosition = offset + currentValue;
                translateX.removeAllListeners();

                const newValue = positionToValue(currentPosition);
                const newPosition =
                    ((newValue - min) / (max - min)) * sliderWidth;

                Animated.timing(translateX, {
                    toValue: newPosition,
                    duration: 100,
                    useNativeDriver: true,
                }).start();

                setOffset(0);
                onValueChange(newValue);
                lastValue.current = newValue;
            },
        })
    ).current;

    // Calculate the fill width based on the thumb position
    const fillWidth = translateX.interpolate({
        inputRange: [0, sliderWidth],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp",
    });

    // Generate labels if showLabels is true
    const renderLabels = () => {
        if (!showLabels) return null;

        return (
            <View style={styles.labelsContainer}>
                <Text style={styles.labelText}>Easy</Text>
                <Text style={styles.valueText}>{value}</Text>
                <Text style={styles.labelText}>Hard</Text>
            </View>
        );
    };

    return (
        <View style={[styles.container, style]}>
            {renderLabels()}

            <View style={styles.sliderContainer} onLayout={onLayout}>
                <View style={styles.track} />
                <Animated.View style={[styles.fill, { width: fillWidth }]} />
                <Animated.View
                    style={[
                        styles.thumb,
                        {
                            transform: [{ translateX }],
                        },
                    ]}
                    {...panResponder.panHandlers}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: spacing.m,
    },
    sliderContainer: {
        height: 40,
        justifyContent: "center",
        position: "relative",
    },
    track: {
        height: 6,
        backgroundColor: colors.textDisabled,
        borderRadius: borderRadius.small,
        position: "absolute",
        left: 0,
        right: 0,
    },
    fill: {
        height: 6,
        backgroundColor: colors.secondary,
        borderRadius: borderRadius.small,
        position: "absolute",
        left: 0,
    },
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.secondary,
        position: "absolute",
        left: -12, // Half of the thumb width
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    labelsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.s,
    },
    labelText: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeSmall,
        color: colors.textSecondary,
    },
    valueText: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeMedium,
        color: colors.textPrimary,
    },
});

export default DifficultySlider;
