import React, { useState } from "react";
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
    const translateX = new Animated.Value(0);
    const [offset, setOffset] = useState(0);

    // Calculate the initial position based on the value
    React.useEffect(() => {
        if (sliderWidth > 0) {
            const position = ((value - min) / (max - min)) * sliderWidth;
            translateX.setValue(position);
        }
    }, [value, min, max, sliderWidth, translateX]);

    // Handle layout changes to get the width of the slider
    const onLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setSliderWidth(width);
    };

    // Create pan responder for handling touch events
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                const currentValue = Number(JSON.stringify(translateX));
                setOffset(currentValue);
                translateX.setValue(0);
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
            },
            onPanResponderRelease: () => {
                const currentValue = Number(JSON.stringify(translateX));
                const currentPosition = offset + currentValue;
                translateX.setValue(currentPosition);
                setOffset(0);

                // Calculate the new value based on the position
                const ratio = currentPosition / sliderWidth;
                const range = max - min;
                let newValue = min + ratio * range;

                // Apply step if provided
                if (step > 0) {
                    newValue = Math.round(newValue / step) * step;
                }

                // Ensure the value is within bounds
                newValue = Math.max(min, Math.min(max, newValue));

                // Update the position to match the stepped value
                const newPosition = ((newValue - min) / range) * sliderWidth;
                Animated.timing(translateX, {
                    toValue: newPosition,
                    duration: 100,
                    useNativeDriver: true,
                }).start();

                // Call the callback with the new value
                onValueChange(newValue);
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
