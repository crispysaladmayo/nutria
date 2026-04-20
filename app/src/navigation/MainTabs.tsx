import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { colors } from '../theme/config';
import type { TabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { PlannerScreen } from '../screens/PlannerScreen';
import { GroceryScreen } from '../screens/GroceryScreen';
import { LogScreen } from '../screens/LogScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

function tabIcon(route: keyof TabParamList, focused: boolean) {
  const map: Record<keyof TabParamList, string> = {
    Home: '🏠',
    Planner: '📅',
    Grocery: '🛒',
    Log: '🍽️',
    Settings: '⚙️',
  };
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{map[route]}</Text>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ focused }) => tabIcon(route.name as keyof TabParamList, focused),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Planner" component={PlannerScreen} options={{ title: 'Week' }} />
      <Tab.Screen name="Grocery" component={GroceryScreen} options={{ title: 'Grocery' }} />
      <Tab.Screen name="Log" component={LogScreen} options={{ title: 'Log meal' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}
