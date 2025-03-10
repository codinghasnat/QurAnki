import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

import {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
} from "../utils/theme";
import { surahs } from "../utils/mockData";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAppContext } from "../context/AppContext";
import Card from "../components/Card";

type SurahSelectionScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "SurahSelection"
>;

const SurahSelectionScreen: React.FC = () => {
    const navigation = useNavigation<SurahSelectionScreenNavigationProp>();
    const { setSurah, setDisplayFormat, progress } = useAppContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFormat, setSelectedFormat] = useState<"arabic" | "english">(
        "arabic"
    );

    // Filter surahs based on search query
    const filteredSurahs = surahs.filter(
        (surah) =>
            surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            surah.nameArabic.includes(searchQuery)
    );

    // Handle surah selection
    const handleSurahSelect = (surahId: string) => {
        setSurah(surahId);
        setDisplayFormat(selectedFormat);
        navigation.navigate("Learning", {
            surahId,
            displayFormat: selectedFormat,
        });
    };

    // Render a surah item
    const renderSurahItem = ({ item }: { item: (typeof surahs)[0] }) => {
        const surahProgress = progress[item.id];
        const progressPercentage = surahProgress
            ? Math.min(
                  100,
                  Math.round(
                      (surahProgress.currentAyah / item.numberOfAyahs) * 100
                  )
              )
            : 0;

        return (
            <TouchableOpacity
                style={styles.surahCard}
                onPress={() => handleSurahSelect(item.id)}>
                <View style={styles.surahNumberContainer}>
                    <Text style={styles.surahNumber}>{item.id}</Text>
                </View>

                <View style={styles.surahInfo}>
                    <Text style={styles.surahName}>{item.name}</Text>
                    <Text style={styles.surahNameArabic}>
                        {item.nameArabic}
                    </Text>
                    <Text style={styles.surahDetails}>
                        {item.numberOfAyahs} Ayahs
                    </Text>
                </View>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progressPercentage}%` },
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {progressPercentage}%
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select a Surah</Text>
                <View style={styles.placeholder} />
            </LinearGradient>

            <View style={styles.content}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Surahs..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={colors.textHint}
                    />
                </View>

                <View style={styles.formatSelector}>
                    <Text style={styles.formatLabel}>Display Format:</Text>
                    <View style={styles.formatOptions}>
                        <TouchableOpacity
                            style={[
                                styles.formatOption,
                                selectedFormat === "arabic" &&
                                    styles.formatOptionSelected,
                            ]}
                            onPress={() => setSelectedFormat("arabic")}>
                            <Text
                                style={[
                                    styles.formatOptionText,
                                    selectedFormat === "arabic" &&
                                        styles.formatOptionTextSelected,
                                ]}>
                                Arabic
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.formatOption,
                                selectedFormat === "english" &&
                                    styles.formatOptionSelected,
                            ]}
                            onPress={() => setSelectedFormat("english")}>
                            <Text
                                style={[
                                    styles.formatOptionText,
                                    selectedFormat === "english" &&
                                        styles.formatOptionTextSelected,
                                ]}>
                                English
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={filteredSurahs}
                    renderItem={renderSurahItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.surahList}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.l,
    },
    headerTitle: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeXLarge,
        color: colors.textOnPrimary,
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
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        padding: spacing.m,
    },
    searchContainer: {
        marginBottom: spacing.m,
    },
    searchInput: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeMedium,
        color: colors.textPrimary,
        ...shadows.small,
    },
    formatSelector: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.m,
    },
    formatLabel: {
        fontFamily: typography.fontFamilyTextMedium,
        fontSize: typography.fontSizeSmall,
        color: colors.textSecondary,
        marginRight: spacing.m,
    },
    formatOptions: {
        flexDirection: "row",
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        overflow: "hidden",
        ...shadows.small,
    },
    formatOption: {
        paddingHorizontal: spacing.m,
        paddingVertical: spacing.s,
    },
    formatOptionSelected: {
        backgroundColor: colors.primary,
    },
    formatOptionText: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeSmall,
        color: colors.textPrimary,
    },
    formatOptionTextSelected: {
        color: colors.textOnPrimary,
    },
    surahList: {
        paddingBottom: spacing.l,
    },
    surahCard: {
        flexDirection: "row",
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
        padding: spacing.m,
        marginBottom: spacing.m,
        alignItems: "center",
        ...shadows.small,
    },
    surahNumberContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing.m,
    },
    surahNumber: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeMedium,
        color: colors.textOnPrimary,
    },
    surahInfo: {
        flex: 1,
    },
    surahName: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeMedium,
        color: colors.textPrimary,
    },
    surahNameArabic: {
        fontFamily: typography.fontFamilyArabic,
        fontSize: typography.fontSizeMedium,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    surahDetails: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeSmall,
        color: colors.textSecondary,
    },
    progressContainer: {
        width: 60,
        alignItems: "center",
    },
    progressBar: {
        width: 50,
        height: 6,
        backgroundColor: colors.textDisabled,
        borderRadius: 3,
        overflow: "hidden",
        marginBottom: spacing.xs,
    },
    progressFill: {
        height: "100%",
        backgroundColor: colors.secondary,
    },
    progressText: {
        fontFamily: typography.fontFamilyTextMedium,
        fontSize: typography.fontSizeXSmall,
        color: colors.textSecondary,
    },
});

export default SurahSelectionScreen;
