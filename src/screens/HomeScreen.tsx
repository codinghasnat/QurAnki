import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors, typography, spacing } from "../utils/theme";
import Button from "../components/Button";
import { RootStackParamList } from "../navigation/AppNavigator";

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Home"
>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                style={styles.headerGradient}>
                <View style={styles.header}>
                    <Text style={styles.appName}>QurAnki</Text>
                    <Text style={styles.tagline}>
                        Memorize the Quran with ease
                    </Text>
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>Welcome to QurAnki</Text>
                    <Text style={styles.welcomeText}>
                        QurAnki helps you memorize the Quran through an adaptive
                        learning system that adjusts to your progress.
                    </Text>
                </View>

                <View style={styles.featuresSection}>
                    <Text style={styles.sectionTitle}>Features</Text>

                    <View style={styles.featureCard}>
                        <View style={styles.featureIconContainer}>
                            <Text style={styles.featureIcon}>🎯</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>
                                Progressive Learning
                            </Text>
                            <Text style={styles.featureDescription}>
                                Master individual ayahs before combining them
                                into larger sections.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.featureCard}>
                        <View style={styles.featureIconContainer}>
                            <Text style={styles.featureIcon}>🔄</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>
                                Adaptive Difficulty
                            </Text>
                            <Text style={styles.featureDescription}>
                                Adjust difficulty from 0-10 to control how many
                                words are blanked.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.featureCard}>
                        <View style={styles.featureIconContainer}>
                            <Text style={styles.featureIcon}>📊</Text>
                        </View>
                        <View style={styles.featureContent}>
                            <Text style={styles.featureTitle}>
                                Track Progress
                            </Text>
                            <Text style={styles.featureDescription}>
                                Monitor your memorization progress for each
                                surah.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actionsSection}>
                    <Button
                        title="Start Learning"
                        onPress={() => navigation.navigate("SurahSelection")}
                        variant="primary"
                        size="large"
                    />

                    <Button
                        title="View Progress"
                        onPress={() =>
                            navigation.navigate("Progress", { surahId: "1" })
                        }
                        variant="outline"
                        style={styles.secondaryButton}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerGradient: {
        paddingTop: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.l,
    },
    appName: {
        fontFamily: typography.fontFamilyTextBold,
        fontSize: typography.fontSizeXXXLarge,
        color: colors.textOnPrimary,
        marginBottom: spacing.xs,
    },
    tagline: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeMedium,
        color: colors.textOnPrimary,
        opacity: 0.9,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: spacing.l,
    },
    welcomeSection: {
        marginBottom: spacing.xl,
    },
    welcomeTitle: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeXLarge,
        color: colors.textPrimary,
        marginBottom: spacing.s,
    },
    welcomeText: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeMedium,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    sectionTitle: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeLarge,
        color: colors.textPrimary,
        marginBottom: spacing.m,
    },
    featuresSection: {
        marginBottom: spacing.xl,
    },
    featureCard: {
        flexDirection: "row",
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.m,
        marginBottom: spacing.m,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    featureIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginRight: spacing.m,
    },
    featureIcon: {
        fontSize: 24,
    },
    featureContent: {
        flex: 1,
    },
    featureTitle: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeMedium,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    featureDescription: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeSmall,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    actionsSection: {
        marginBottom: spacing.xl,
    },
    secondaryButton: {
        marginTop: spacing.m,
    },
});

export default HomeScreen;
