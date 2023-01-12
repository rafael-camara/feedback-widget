import 'react-native-gesture-handler';

import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { theme } from './src/theme';
import { Widget } from './src/components/Widget';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium,
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
      } finally {
        setAppIsReady(true);

        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Widget />
    </GestureHandlerRootView>
  );
}
