import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for our context
interface AppContextType {
    // User progress
    progress: {
        [surahId: string]: {
            currentAyah: number;
            difficulty: number;
            completed: boolean;
        };
    };
    // Current learning state
    currentSurah: string | null;
    displayFormat: "arabic" | "english";
    difficulty: number;

    // Methods
    setSurah: (surahId: string) => void;
    setDisplayFormat: (format: "arabic" | "english") => void;
    setDifficulty: (level: number) => void;
    updateProgress: (
        surahId: string,
        ayah: number,
        difficulty: number,
        completed: boolean
    ) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
    progress: {},
    currentSurah: null,
    displayFormat: "arabic",
    difficulty: 0,

    setSurah: () => {},
    setDisplayFormat: () => {},
    setDifficulty: () => {},
    updateProgress: () => {},
});

// Provider component
export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [progress, setProgress] = useState<AppContextType["progress"]>({});
    const [currentSurah, setCurrentSurah] = useState<string | null>(null);
    const [displayFormat, setDisplayFormat] = useState<"arabic" | "english">(
        "arabic"
    );
    const [difficulty, setDifficulty] = useState<number>(0);

    // Set current surah
    const setSurah = (surahId: string) => {
        setCurrentSurah(surahId);

        // Initialize progress for this surah if it doesn't exist
        if (!progress[surahId]) {
            setProgress((prev) => ({
                ...prev,
                [surahId]: {
                    currentAyah: 1,
                    difficulty: 0,
                    completed: false,
                },
            }));
        }
    };

    // Update progress for a specific surah and ayah
    const updateProgress = (
        surahId: string,
        ayah: number,
        difficultyLevel: number,
        completed: boolean
    ) => {
        setProgress((prev) => ({
            ...prev,
            [surahId]: {
                currentAyah: ayah,
                difficulty: difficultyLevel,
                completed,
            },
        }));
    };

    return (
        <AppContext.Provider
            value={{
                progress,
                currentSurah,
                displayFormat,
                difficulty,

                setSurah,
                setDisplayFormat,
                setDifficulty,
                updateProgress,
            }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);
