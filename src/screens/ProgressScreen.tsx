import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

import {
    colors,
    typography,
    spacing,
    shadows,
    borderRadius,
} from "../utils/theme";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAppContext } from "../context/AppContext";
import { surahs } from "../utils/mockData";
import Card from "../components/Card";

type ProgressScreenRouteProp = RouteProp<RootStackParamList, "Progress">;
type ProgressScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Progress"
>;

const ProgressScreen: React.FC = () => {
    const route = useRoute<ProgressScreenRouteProp>();
    const navigation = useNavigation<ProgressScreenNavigationProp>();
    const { surahId } = route.params;
    const { progress } = useAppContext();

    // Find the selected surah
    const surah = surahs.find((s) => s.id === surahId);

    // If surah not found, show error
    if (!surah) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Surah not found</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Get progress for this surah
    const surahProgress = progress[surahId] || {
        currentAyah: 1,
        difficulty: 0,
        completed: false,
    };

    // Calculate overall progress
    const overallProgress = Math.min(
        100,
        Math.round((surahProgress.currentAyah / surah.numberOfAyahs) * 100)
    );

    // Render ayah progress item
    const renderAyahProgress = ({
        item,
        index,
    }: {
        item: (typeof surah.ayahs)[0];
        index: number;
    }) => {
        const isCompleted = index < surahProgress.currentAyah - 1;
        const isCurrent = index === surahProgress.currentAyah - 1;

        return (
            <Card
                style={[
                    styles.ayahCard,
                    isCompleted && styles.completedAyahCard,
                    isCurrent && styles.currentAyahCard,
                ]}
                elevation="small">
                <View style={styles.ayahHeader}>
                    <View style={styles.ayahNumberContainer}>
                        <Text style={styles.ayahNumber}>{item.id}</Text>
                    </View>
                    <View style={styles.ayahStatus}>
                        {isCompleted && (
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>Completed</Text>
                            </View>
                        )}
                        {isCurrent && (
                            <View
                                style={[
                                    styles.statusBadge,
                                    styles.currentBadge,
                                ]}>
                                <Text style={styles.statusText}>
                                    In Progress
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <Text style={styles.ayahText} numberOfLines={2}>
                    {item.arabic}
                </Text>

                {isCurrent && (
                    <View style={styles.difficultyInfo}>
                        <Text style={styles.difficultyText}>
                            Current Difficulty: {surahProgress.difficulty} / 10
                        </Text>
                        <View style={styles.difficultyBar}>
                            <View
                                style={[
                                    styles.difficultyFill,
                                    {
                                        width: `${
                                            (surahProgress.difficulty / 10) *
                                            100
                                        }%`,
                                    },
                                ]}
                            />
                        </View>
                    </View>
                )}

                <TouchableOpacity
                    style={[
                        styles.practiceButton,
                        !isCompleted && !isCurrent && styles.disabledButton,
                    ]}
                    disabled={!isCompleted && !isCurrent}
                    onPress={() => {
                        navigation.navigate("Learning", {
                            surahId,
                            displayFormat: "arabic",
                        });
                    }}>
                    <Text
                        style={[
                            styles.practiceButtonText,
                            !isCompleted &&
                                !isCurrent &&
                                styles.disabledButtonText,
                        ]}>
                        {isCompleted
                            ? "Review"
                            : isCurrent
                            ? "Continue"
                            : "Locked"}
                    </Text>
                </TouchableOpacity>
            </Card>
        );
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
                        <Text style={styles.surahNameArabic}>
                            {surah.nameArabic}
                        </Text>
                    </View>

                    <View style={styles.placeholder} />
                </View>
            </LinearGradient>

            <ScrollView style={styles.content}>
                <Card style={styles.progressCard}>
                    <Text style={styles.progressTitle}>Overall Progress</Text>

                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${overallProgress}%` },
                                ]}
                            />
                        </View>
                        <Text style={styles.progressText}>
                            {overallProgress}%
                        </Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>
                                {surahProgress.currentAyah}
                            </Text>
                            <Text style={styles.statLabel}>Current Ayah</Text>
                        </View>

                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>
                                {surah.numberOfAyahs}
                            </Text>
                            <Text style={styles.statLabel}>Total Ayahs</Text>
                        </View>

                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>
                                {surahProgress.completed ? "Yes" : "No"}
                            </Text>
                            <Text style={styles.statLabel}>Completed</Text>
                        </View>
                    </View>
                </Card>

                <Text style={styles.sectionTitle}>Ayahs Progress</Text>

                <FlatList
                    data={surah.ayahs}
                    renderItem={renderAyahProgress}
                    keyExtractor={(item) => item.id.toString()}
                    scrollEnabled={false}
                />
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
    surahNameArabic: {
        fontFamily: typography.fontFamilyArabic,
        fontSize: typography.fontSizeMedium,
        color: colors.textOnPrimary,
        opacity: 0.9,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        padding: spacing.m,
    },
    progressCard: {
        marginBottom: spacing.l,
    },
    progressTitle: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeLarge,
        color: colors.textPrimary,
        marginBottom: spacing.m,
        textAlign: "center",
    },
    progressBarContainer: {
        alignItems: "center",
        marginBottom: spacing.m,
    },
    progressBar: {
        width: "100%",
        height: 12,
        backgroundColor: colors.textDisabled,
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: spacing.s,
    },
    progressFill: {
        height: "100%",
        backgroundColor: colors.secondary,
    },
    progressText: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeMedium,
        color: colors.textPrimary,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: spacing.m,
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
    sectionTitle: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeLarge,
        color: colors.textPrimary,
        marginBottom: spacing.m,
        marginTop: spacing.m,
    },
    ayahCard: {
        marginBottom: spacing.m,
    },
    completedAyahCard: {
        borderLeftWidth: 4,
        borderLeftColor: colors.accent,
    },
    currentAyahCard: {
        borderLeftWidth: 4,
        borderLeftColor: colors.secondary,
    },
    ayahHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.s,
    },
    ayahNumberContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    ayahNumber: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeSmall,
        color: colors.textOnPrimary,
    },
    ayahStatus: {
        flexDirection: "row",
    },
    statusBadge: {
        backgroundColor: colors.accent,
        paddingHorizontal: spacing.s,
        paddingVertical: spacing.xs / 2,
        borderRadius: borderRadius.small,
    },
    currentBadge: {
        backgroundColor: colors.secondary,
    },
    statusText: {
        fontFamily: typography.fontFamilyTextMedium,
        fontSize: typography.fontSizeXSmall,
        color: colors.textOnPrimary,
    },
    ayahText: {
        fontFamily: typography.fontFamilyArabic,
        fontSize: typography.fontSizeMedium,
        color: colors.textPrimary,
        marginBottom: spacing.m,
    },
    difficultyInfo: {
        marginBottom: spacing.m,
    },
    difficultyText: {
        fontFamily: typography.fontFamilyTextMedium,
        fontSize: typography.fontSizeSmall,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    difficultyBar: {
        width: "100%",
        height: 6,
        backgroundColor: colors.textDisabled,
        borderRadius: 3,
        overflow: "hidden",
    },
    difficultyFill: {
        height: "100%",
        backgroundColor: colors.secondary,
    },
    practiceButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.s,
        borderRadius: borderRadius.small,
        alignItems: "center",
    },
    practiceButtonText: {
        fontFamily: typography.fontFamilyTextMedium,
        fontSize: typography.fontSizeSmall,
        color: colors.textOnPrimary,
    },
    disabledButton: {
        backgroundColor: colors.textDisabled,
    },
    disabledButtonText: {
        color: colors.textHint,
    },
});

export default ProgressScreen;
