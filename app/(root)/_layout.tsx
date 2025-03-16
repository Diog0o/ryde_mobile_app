import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";


SplashScreen.preventAutoHideAsync();

export default function Layout() {

  return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="find-ride" options={{ headerShown: false }} />
          <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
          <Stack.Screen name="book-ride" options={{ headerShown: false }} />
        </Stack>
  );
}
