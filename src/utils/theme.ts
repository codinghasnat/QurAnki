// Theme configuration for the QurAnki app

export const colors = {
    // Primary colors
    primary: "#4A6572",
    primaryLight: "#7B96A5",
    primaryDark: "#1A3743",

    // Secondary colors
    secondary: "#F9A826",
    secondaryLight: "#FFCA7A",
    secondaryDark: "#C67700",

    // Accent colors
    accent: "#00BFA6",
    accentLight: "#5DF2D6",
    accentDark: "#008E78",

    // Neutral colors
    background: "#F8F9FA",
    surface: "#FFFFFF",
    error: "#B00020",

    // Text colors
    textPrimary: "#212121",
    textSecondary: "#757575",
    textHint: "#9E9E9E",
    textDisabled: "#BDBDBD",
    textOnPrimary: "#FFFFFF",
    textOnSecondary: "#000000",

    // Gradients
    gradientStart: "#4A6572",
    gradientEnd: "#1A3743",
};

export const typography = {
    // Font families
    fontFamilyArabic: "Amiri-Regular",
    fontFamilyArabicBold: "Amiri-Bold",
    fontFamilyText: "Poppins-Regular",
    fontFamilyTextMedium: "Poppins-Medium",
    fontFamilyTextSemiBold: "Poppins-SemiBold",
    fontFamilyTextBold: "Poppins-Bold",

    // Font sizes
    fontSizeXSmall: 12,
    fontSizeSmall: 14,
    fontSizeMedium: 16,
    fontSizeLarge: 18,
    fontSizeXLarge: 20,
    fontSizeXXLarge: 24,
    fontSizeXXXLarge: 32,

    // Line heights
    lineHeightTight: 1.2,
    lineHeightNormal: 1.5,
    lineHeightLoose: 1.8,

    // Font weights
    fontWeightRegular: "400",
    fontWeightMedium: "500",
    fontWeightSemiBold: "600",
    fontWeightBold: "700",
};

export const spacing = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
};

export const borderRadius = {
    small: 4,
    medium: 8,
    large: 16,
    round: 9999,
};

export const shadows = {
    small: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    large: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
};
