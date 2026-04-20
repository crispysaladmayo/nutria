import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { NButton } from '../../components/NButton';
import { colors, radius, spacing } from '../../theme/config';
import type { PrepItemRow } from '../../data/prepStore';
import type { MealRow } from '../../data/mealStore';
import type { Nudge } from '../../domain/nudges';
import type { RootStackParamList, TabParamList } from '../../navigation/types';
import { dayLabel } from '../../utils/date';

export type HomeNav = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Base = {
  avgRemaining: number;
  items: PrepItemRow[];
  nudges: Nudge[];
  weekMeals: MealRow[];
  alertTone: 'ok' | 'warn' | 'crit';
  navigation: HomeNav;
};

function AlertBanner({ tone }: { tone: 'ok' | 'warn' | 'crit' }) {
  if (tone === 'ok') return null;
  const bg = tone === 'crit' ? colors.danger : colors.warn;
  const msg =
    tone === 'crit'
      ? 'Prepped food is critically low — plan groceries or a new prep run soon.'
      : 'Prepped food is getting low — check the week and grocery list.';
  return (
    <View style={[styles.banner, { backgroundColor: bg }]}>
      <Text style={styles.bannerText}>{msg}</Text>
    </View>
  );
}

function ItemRow({ it }: { it: PrepItemRow }) {
  const pct = it.total_cooked_grams > 0 ? it.remaining_grams / it.total_cooked_grams : 0;
  return (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>{it.name}</Text>
      <Text style={styles.itemMeta}>
        {Math.round(it.remaining_grams)}g / {Math.round(it.total_cooked_grams)}g cooked (
        {Math.round(pct * 100)}% left)
      </Text>
    </View>
  );
}

export function DepletionLayout(p: Base) {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <AlertBanner tone={p.alertTone} />
      <Text style={styles.h1}>Prep status</Text>
      <Text style={styles.lead}>
        On average, about {Math.round(p.avgRemaining * 100)}% of your last prep run is still
        available (by weight).
      </Text>
      {p.nudges.map((n) => (
        <Text key={n.id} style={styles.nudge}>
          {n.text}
        </Text>
      ))}
      <View style={styles.card}>
        {p.items.length === 0 ? (
          <Text style={styles.muted}>No items in the active prep run.</Text>
        ) : (
          p.items.map((it) => <ItemRow key={it.id} it={it} />)
        )}
      </View>
      <Text style={styles.h2}>Next steps</Text>
      <NButton
        title="Prep mode — focus for next cook"
        onPress={() => p.navigation.getParent()?.navigate('PrepMode')}
      />
      <View style={{ height: spacing.sm }} />
      <NButton
        title="Log a prepped meal"
        variant="secondary"
        onPress={() => p.navigation.navigate('Log')}
      />
      <View style={{ height: spacing.sm }} />
      <NButton
        title="Open grocery list"
        variant="ghost"
        onPress={() => p.navigation.navigate('Grocery')}
      />
    </ScrollView>
  );
}

export function PlannerPeekLayout(p: Base) {
  const preview = p.weekMeals.slice(0, 6);
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <AlertBanner tone={p.alertTone} />
      <Text style={styles.h1}>This week at a glance</Text>
      <View style={styles.card}>
        {preview.length === 0 ? (
          <Text style={styles.muted}>No meals planned yet — open the Week tab.</Text>
        ) : (
          preview.map((m) => (
            <Text key={m.id} style={styles.mealLine}>
              {dayLabel(m.day_index)} · {m.title} · {m.person_id}
            </Text>
          ))
        )}
      </View>
      <Text style={styles.h2}>Prep stock</Text>
      <Text style={styles.lead}>~{Math.round(p.avgRemaining * 100)}% of prep left (avg).</Text>
      <NButton title="Go to week planner" onPress={() => p.navigation.navigate('Planner')} />
      <View style={{ height: spacing.sm }} />
      <NButton
        title="Prep mode"
        variant="secondary"
        onPress={() => p.navigation.getParent()?.navigate('PrepMode')}
      />
    </ScrollView>
  );
}

export function CompactLayout(p: Base) {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <AlertBanner tone={p.alertTone} />
      <View style={styles.compactRow}>
        <View style={styles.compactStat}>
          <Text style={styles.compactNum}>{Math.round(p.avgRemaining * 100)}%</Text>
          <Text style={styles.compactLbl}>prep left</Text>
        </View>
        <View style={styles.compactStat}>
          <Text style={styles.compactNum}>{p.items.length}</Text>
          <Text style={styles.compactLbl}>items tracked</Text>
        </View>
      </View>
      <NButton title="Log prepped meal" onPress={() => p.navigation.navigate('Log')} />
      <View style={{ height: spacing.sm }} />
      <NButton
        title="Prep mode"
        variant="secondary"
        onPress={() => p.navigation.getParent()?.navigate('PrepMode')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  h1: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    fontStyle: 'italic',
  },
  h2: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  lead: { fontSize: 16, color: colors.textMuted, lineHeight: 22, marginBottom: spacing.md },
  nudge: { fontSize: 14, color: colors.accent, marginBottom: spacing.sm },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  itemRow: { marginBottom: spacing.sm },
  itemName: { fontSize: 16, fontWeight: '600', color: colors.text },
  itemMeta: { fontSize: 14, color: colors.textMuted },
  muted: { color: colors.textMuted },
  mealLine: { fontSize: 15, color: colors.text, marginBottom: 6 },
  banner: { borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.lg },
  bannerText: { color: colors.surface, fontWeight: '600', fontSize: 15 },
  compactRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg },
  compactStat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  compactNum: { fontSize: 32, fontWeight: '700', color: colors.accent },
  compactLbl: { fontSize: 13, color: colors.textMuted },
});
