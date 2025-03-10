import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

import { colors, typography, spacing, shadows } from "../utils/theme";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAppContext } from "../context/AppContext";
import { surahs } from "../utils/mockData";
import AyahDisplay from "../components/AyahDisplay";
import DifficultySlider from "../components/DifficultySlider";
import Button from "../components/Button";

type LearningScreenRouteProp = RouteProp<RootStackParamList, "Learning">;
type LearningScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Learning"
>;

const LearningScreen: React.FC = () => {
    const route = useRoute<LearningScreenRouteProp>();
    const navigation = useNavigation<LearningScreenNavigationProp>();

    // Ensure displayFormat has a default value if it's not provided in route.params
    const { surahId, displayFormat = "arabic" } = route.params || {
        surahId: "1",
        displayFormat: "arabic",
    };

    const { difficulty, setDifficulty, updateProgress } = useAppContext();

    const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [ayahCompleted, setAyahCompleted] = useState(false);

    // Find the selected surah
    const surah = surahs.find((s) => s.id === surahId);

    // If surah not found, show error
    if (!surah) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Surah not found</Text>
                    <Button
                        title="Go Back"
                        onPress={() => navigation.goBack()}
                        variant="primary"
                    />
                </View>
            </SafeAreaView>
        );
    }

    // Get the current ayah
    const currentAyah = surah.ayahs[currentAyahIndex];

    // Handle word selection
    const handleWordSelected = (wordIndex: number, isCorrect: boolean) => {
        if (isCorrect) {
            setCorrectAnswers((prev) => prev + 1);
        } else {
            setIncorrectAnswers((prev) => prev + 1);
        }
    };

    // Handle ayah completion
    const handleAyahComplete = () => {
        setAyahCompleted(true);

        // Update progress
        updateProgress(
            surahId,
            currentAyahIndex + 1,
            difficulty,
            currentAyahIndex === surah.ayahs.length - 1 && difficulty === 10
        );

        // Show completion message
        if (difficulty < 10) {
            Alert.alert(
                "Ayah Completed!",
                "Great job! The difficulty will increase for the next round.",
                [
                    {
                        text: "Continue",
                        onPress: () => {
                            setDifficulty(Math.min(10, difficulty + 1));
                            setAyahCompleted(false);
                            setCorrectAnswers(0);
                            setIncorrectAnswers(0);
                        },
                    },
                ]
            );
        } else if (currentAyahIndex < surah.ayahs.length - 1) {
            Alert.alert(
                "Ayah Mastered!",
                "Excellent! You have mastered this ayah at the highest difficulty. Moving to the next ayah.",
                [
                    {
                        text: "Continue",
                        onPress: () => {
                            setDifficulty(0);
                            setCurrentAyahIndex((prev) => prev + 1);
                            setAyahCompleted(false);
                            setCorrectAnswers(0);
                            setIncorrectAnswers(0);
                        },
                    },
                ]
            );
        } else {
            Alert.alert(
                "Surah Completed!",
                "Congratulations! You have completed the entire surah.",
                [
                    {
                        text: "Back to Surah Selection",
                        onPress: () => navigation.navigate("SurahSelection"),
                    },
                ]
            );
        }
    };

    // Handle difficulty change
    const handleDifficultyChange = (value: number) => {
        setDifficulty(value);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>

                    <View style={styles.headerInfo}>
                        <Text style={styles.surahName}>{surah.name}</Text>
                        <Text style={styles.ayahInfo}>
                            Ayah {currentAyahIndex + 1} of {surah.numberOfAyahs}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.progressButton}
                        onPress={() =>
                            navigation.navigate("Progress", { surahId })
                        }>
                        <Text style={styles.progressButtonText}>📊</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content}>
                <View style={styles.difficultyContainer}>
                    <Text style={styles.difficultyLabel}>
                        Difficulty: {difficulty} / 10
                    </Text>
                    <DifficultySlider
                        value={difficulty}
                        onValueChange={handleDifficultyChange}
                        min={0}
                        max={10}
                        step={1}
                    />
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{correctAnswers}</Text>
                        <Text style={styles.statLabel}>Correct</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{incorrectAnswers}</Text>
                        <Text style={styles.statLabel}>Incorrect</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                            {Math.round(
                                (correctAnswers /
                                    (correctAnswers + incorrectAnswers || 1)) *
                                    100
                            )}
                            %
                        </Text>
                        <Text style={styles.statLabel}>Accuracy</Text>
                    </View>
                </View>

                <AyahDisplay
                    ayah={currentAyah}
                    difficulty={difficulty}
                    displayFormat={displayFormat}
                    onWordSelected={handleWordSelected}
                    onComplete={handleAyahComplete}
                />

                {ayahCompleted && (
                    <View style={styles.completionContainer}>
                        <Text style={styles.completionText}>
                            {difficulty < 10
                                ? "Great job! Ready to increase difficulty?"
                                : currentAyahIndex < surah.ayahs.length - 1
                                ? "Ayah mastered! Ready for the next one?"
                                : "Congratulations! Surah completed!"}
                        </Text>

                        <Button
                            title={
                                difficulty < 10
                                    ? "Increase Difficulty"
                                    : currentAyahIndex < surah.ayahs.length - 1
                                    ? "Next Ayah"
                                    : "Finish"
                            }
                            onPress={() => {
                                if (difficulty < 10) {
                                    setDifficulty(Math.min(10, difficulty + 1));
                                    setAyahCompleted(false);
                                    setCorrectAnswers(0);
                                    setIncorrectAnswers(0);
                                } else if (
                                    currentAyahIndex <
                                    surah.ayahs.length - 1
                                ) {
                                    setDifficulty(0);
                                    setCurrentAyahIndex((prev) => prev + 1);
                                    setAyahCompleted(false);
                                    setCorrectAnswers(0);
                                    setIncorrectAnswers(0);
                                } else {
                                    navigation.navigate("SurahSelection");
                                }
                            }}
                            variant="primary"
                            style={styles.actionButton}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.l,
    },
    errorText: {
        fontFamily: typography.fontFamilyTextMedium,
        fontSize: typography.fontSizeLarge,
        color: colors.error,
        marginBottom: spacing.l,
        textAlign: "center",
    },
    header: {
        paddingTop: spacing.m,
        paddingBottom: spacing.l,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.m,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonText: {
        fontSize: 24,
        color: colors.textOnPrimary,
    },
    headerInfo: {
        alignItems: "center",
    },
    surahName: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeLarge,
        color: colors.textOnPrimary,
        marginBottom: spacing.xs,
    },
    ayahInfo: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeSmall,
        color: colors.textOnPrimary,
        opacity: 0.9,
    },
    progressButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    progressButtonText: {
        fontSize: 20,
        color: colors.textOnPrimary,
    },
    content: {
        flex: 1,
        padding: spacing.m,
    },
    difficultyContainer: {
        marginBottom: spacing.l,
    },
    difficultyLabel: {
        fontFamily: typography.fontFamilyTextMedium,
        fontSize: typography.fontSizeMedium,
        color: colors.textPrimary,
        marginBottom: spacing.s,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: spacing.l,
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.m,
        ...shadows.small,
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeXLarge,
        color: colors.textPrimary,
    },
    statLabel: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeSmall,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    completionContainer: {
        marginTop: spacing.l,
        padding: spacing.m,
        backgroundColor: colors.surface,
        borderRadius: 12,
        alignItems: "center",
        ...shadows.small,
    },
    completionText: {
        fontFamily: typography.fontFamilyTextMedium,
        fontSize: typography.fontSizeMedium,
        color: colors.textPrimary,
        textAlign: "center",
        marginBottom: spacing.m,
    },
    actionButton: {
        minWidth: 200,
    },
});

export default LearningScreen;
