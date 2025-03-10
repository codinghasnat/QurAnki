import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { View, Text } from "react-native";
import { registerRootComponent } from "expo";

import AppNavigator from "./src/navigation/AppNavigator";
import { AppContextProvider } from "./src/context/AppContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(() => {
    // Ignore errors
});

function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    "Amiri-Regular": require("./src/assets/fonts/Amiri-Regular.ttf"),
                    "Amiri-Bold": require("./src/assets/fonts/Amiri-Bold.ttf"),
                    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
                    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
                    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
                    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
                });
            } catch (e) {
                console.warn("Error loading fonts:", e);
                setError(
                    e instanceof Error
                        ? e.message
                        : "Unknown error loading fonts"
                );
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately
            await SplashScreen.hideAsync().catch(() => {
                // Ignore errors
            });
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    if (error) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                }}>
                <Text
                    style={{ color: "red", fontSize: 16, textAlign: "center" }}>
                    Error loading application: {error}
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaProvider onLayout={onLayoutRootView}>
            <AppContextProvider>
                <NavigationContainer>
                    <StatusBar style="auto" />
                    <AppNavigator />
                </NavigationContainer>
            </AppContextProvider>
        </SafeAreaProvider>
    );
}

// Register the root component
registerRootComponent(App);

export default App;
