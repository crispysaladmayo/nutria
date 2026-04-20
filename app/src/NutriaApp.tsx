import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { migrate } from './db/migrate';
import { RootNavigator } from './navigation/RootNavigator';
import { colors } from './theme/config';

export default function NutriaApp() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SQLiteProvider databaseName="nutria.db" onInit={migrate}>
        <StatusBar style="dark" />
        <RootNavigator />
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});
