import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
} from "../utils/theme";
import Card from "./Card";
import { Ayah } from "../utils/mockData";

interface AyahDisplayProps {
    ayah: Ayah;
    difficulty: number;
    displayFormat: "arabic" | "english";
    onWordSelected: (wordIndex: number, isCorrect: boolean) => void;
    onComplete: () => void;
}

interface WordState {
    index: number;
    word: string;
    translation: string;
    isBlank: boolean;
    isSelected: boolean;
    isCorrect: boolean | null;
}

const AyahDisplay: React.FC<AyahDisplayProps> = ({
    ayah,
    difficulty,
    displayFormat,
    onWordSelected,
    onComplete,
}) => {
    const [words, setWords] = useState<WordState[]>([]);
    const [selectedBlankIndex, setSelectedBlankIndex] = useState<number | null>(
        null
    );
    const [options, setOptions] = useState<
        { word: string; translation: string; index: number }[]
    >([]);
    const [showOptions, setShowOptions] = useState(false);
    const [completedWords, setCompletedWords] = useState(0);

    // Initialize words based on ayah and difficulty
    useEffect(() => {
        const totalWords = ayah.words.length;
        const blanksCount = Math.round((difficulty / 10) * totalWords);

        // Create array of indices to blank
        const blankIndices = new Set<number>();
        while (blankIndices.size < blanksCount) {
            const randomIndex = Math.floor(Math.random() * totalWords);
            blankIndices.add(randomIndex);
        }

        // Create word state
        const wordStates = ayah.words.map((word, index) => ({
            index,
            word: word.arabic,
            translation: word.english,
            isBlank: blankIndices.has(index),
            isSelected: false,
            isCorrect: null,
        }));

        setWords(wordStates);
        setCompletedWords(0);
    }, [ayah, difficulty]);

    // Check if all blanks are filled correctly
    useEffect(() => {
        const blanksCount = words.filter((word) => word.isBlank).length;
        if (completedWords === blanksCount && blanksCount > 0) {
            onComplete();
        }
    }, [completedWords, words, onComplete]);

    // Handle word selection
    const handleWordPress = (index: number) => {
        if (!words[index].isBlank || words[index].isCorrect !== null) {
            return;
        }

        setSelectedBlankIndex(index);

        // Generate options (1 correct + 5 random)
        const correctOption = {
            word: words[index].word,
            translation: words[index].translation,
            index,
        };

        const otherOptions = ayah.words
            .filter((_, i) => i !== index)
            .map((word, i) => ({
                word: word.arabic,
                translation: word.english,
                index: i,
            }))
            .sort(() => Math.random() - 0.5)
            .slice(0, 5);

        const allOptions = [correctOption, ...otherOptions].sort(
            () => Math.random() - 0.5
        );

        setOptions(allOptions);
        setShowOptions(true);
    };

    // Handle option selection
    const handleOptionSelect = (option: {
        word: string;
        translation: string;
        index: number;
    }) => {
        if (selectedBlankIndex === null) return;

        const isCorrect = option.word === words[selectedBlankIndex].word;

        setWords((prev) =>
            prev.map((word, i) =>
                i === selectedBlankIndex
                    ? { ...word, isSelected: false, isCorrect }
                    : word
            )
        );

        if (isCorrect) {
            setCompletedWords((prev) => prev + 1);
        }

        onWordSelected(selectedBlankIndex, isCorrect);
        setShowOptions(false);
        setSelectedBlankIndex(null);
    };

    // Request a hint
    const requestHint = () => {
        if (selectedBlankIndex === null) return;

        // Show translation as hint
        // In a real app, you might want to track hint usage for scoring
    };

    // Render a word based on its state
    const renderWord = (word: WordState) => {
        if (!word.isBlank) {
            return (
                <Text
                    key={word.index}
                    style={[
                        styles.word,
                        displayFormat === "arabic"
                            ? styles.arabicWord
                            : styles.englishWord,
                    ]}>
                    {displayFormat === "arabic" ? word.word : word.translation}
                </Text>
            );
        }

        if (word.isCorrect === true) {
            return (
                <Text
                    key={word.index}
                    style={[
                        styles.word,
                        styles.correctWord,
                        displayFormat === "arabic"
                            ? styles.arabicWord
                            : styles.englishWord,
                    ]}>
                    {displayFormat === "arabic" ? word.word : word.translation}
                </Text>
            );
        }

        if (word.isCorrect === false) {
            return (
                <TouchableOpacity
                    key={word.index}
                    onPress={() => handleWordPress(word.index)}
                    style={[styles.blankWord, styles.incorrectWord]}>
                    <Text
                        style={[
                            styles.blankText,
                            displayFormat === "arabic"
                                ? styles.arabicWord
                                : styles.englishWord,
                        ]}>
                        ___
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                key={word.index}
                onPress={() => handleWordPress(word.index)}
                style={styles.blankWord}>
                <Text
                    style={[
                        styles.blankText,
                        displayFormat === "arabic"
                            ? styles.arabicWord
                            : styles.englishWord,
                    ]}>
                    ___
                </Text>
            </TouchableOpacity>
        );
    };

    // Options modal
    const renderOptionsModal = () => (
        <Modal
            visible={showOptions}
            transparent
            animationType="fade"
            onRequestClose={() => setShowOptions(false)}>
            <View style={styles.modalOverlay}>
                <Card style={styles.optionsCard}>
                    <Text style={styles.optionsTitle}>
                        Select the correct word
                    </Text>

                    {selectedBlankIndex !== null && (
                        <Text style={styles.contextText}>
                            {displayFormat === "arabic"
                                ? `...${
                                      words[selectedBlankIndex - 1]?.word || ""
                                  } ___ ${
                                      words[selectedBlankIndex + 1]?.word || ""
                                  }...`
                                : `...${
                                      words[selectedBlankIndex - 1]
                                          ?.translation || ""
                                  } ___ ${
                                      words[selectedBlankIndex + 1]
                                          ?.translation || ""
                                  }...`}
                        </Text>
                    )}

                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => `option-${index}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={() => handleOptionSelect(item)}>
                                <Text
                                    style={[
                                        styles.optionText,
                                        displayFormat === "arabic"
                                            ? styles.arabicWord
                                            : styles.englishWord,
                                    ]}>
                                    {displayFormat === "arabic"
                                        ? item.word
                                        : item.translation}
                                </Text>
                            </TouchableOpacity>
                        )}
                        numColumns={2}
                        contentContainerStyle={styles.optionsContainer}
                    />

                    <TouchableOpacity
                        style={styles.hintButton}
                        onPress={requestHint}>
                        <Text style={styles.hintButtonText}>Get Hint</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowOptions(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <Card style={styles.ayahCard}>
                <ScrollView contentContainerStyle={styles.ayahContainer}>
                    <View
                        style={[
                            styles.wordsContainer,
                            {
                                justifyContent:
                                    displayFormat === "arabic"
                                        ? "flex-end"
                                        : "flex-start",
                            },
                        ]}>
                        {words.map(renderWord)}
                    </View>

                    {displayFormat === "arabic" && (
                        <Text style={styles.translationText}>
                            {ayah.english}
                        </Text>
                    )}
                </ScrollView>
            </Card>

            {renderOptionsModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    ayahCard: {
        minHeight: 150,
    },
    ayahContainer: {
        padding: spacing.m,
    },
    wordsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    word: {
        marginHorizontal: spacing.xs,
        marginVertical: spacing.xs,
    },
    arabicWord: {
        fontFamily: typography.fontFamilyArabic,
        fontSize: typography.fontSizeXXLarge,
        textAlign: "right",
        color: colors.textPrimary,
    },
    englishWord: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeLarge,
        color: colors.textPrimary,
    },
    blankWord: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.small,
        padding: spacing.xs,
        marginHorizontal: spacing.xs,
        marginVertical: spacing.xs,
        minWidth: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.primary,
    },
    blankText: {
        color: colors.textSecondary,
    },
    correctWord: {
        color: colors.accent,
        fontWeight: "bold",
    },
    incorrectWord: {
        borderColor: colors.error,
    },
    translationText: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeSmall,
        color: colors.textSecondary,
        marginTop: spacing.m,
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.m,
    },
    optionsCard: {
        width: "90%",
        maxWidth: 400,
    },
    optionsTitle: {
        fontFamily: typography.fontFamilyTextSemiBold,
        fontSize: typography.fontSizeLarge,
        color: colors.textPrimary,
        textAlign: "center",
        marginBottom: spacing.m,
    },
    contextText: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeMedium,
        color: colors.textSecondary,
        textAlign: "center",
        marginBottom: spacing.m,
        fontStyle: "italic",
    },
    optionsContainer: {
        paddingVertical: spacing.s,
    },
    optionButton: {
        flex: 1,
        margin: spacing.xs,
        padding: spacing.s,
        backgroundColor: colors.surface,
        borderRadius: borderRadius.small,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 60,
        ...shadows.small,
    },
    optionText: {
        textAlign: "center",
    },
    hintButton: {
        marginTop: spacing.m,
        padding: spacing.s,
        backgroundColor: colors.background,
        borderRadius: borderRadius.small,
        alignItems: "center",
    },
    hintButtonText: {
        fontFamily: typography.fontFamilyTextMedium,
        fontSize: typography.fontSizeSmall,
        color: colors.primary,
    },
    closeButton: {
        marginTop: spacing.s,
        padding: spacing.s,
        alignItems: "center",
    },
    closeButtonText: {
        fontFamily: typography.fontFamilyText,
        fontSize: typography.fontSizeSmall,
        color: colors.textSecondary,
    },
});

export default AyahDisplay;
