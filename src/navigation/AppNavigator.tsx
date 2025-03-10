import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import HomeScreen from "../screens/HomeScreen";
import SurahSelectionScreen from "../screens/SurahSelectionScreen";
import LearningScreen from "../screens/LearningScreen";
import ProgressScreen from "../screens/ProgressScreen";

// Define the types for our navigation parameters
export type RootStackParamList = {
    Home: undefined;
    SurahSelection: undefined;
    Learning: {
        surahId: string;
        displayFormat: "arabic" | "english";
    };
    Progress: { surahId: string };
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#F8F9FA" },
                animation: "slide_from_right",
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="SurahSelection"
                component={SurahSelectionScreen}
            />
            <Stack.Screen name="Learning" component={LearningScreen} />
            <Stack.Screen name="Progress" component={ProgressScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
