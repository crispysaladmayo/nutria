import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getActivePrepRun, getPrepItems, type PrepItemRow } from '../data/prepStore';
import { loadSettings } from '../data/settingsStore';
import type { SettingsPayload } from '../schemas/settings';
import { listMealsForWeek, type MealRow } from '../data/mealStore';
import { weekStartISO } from '../utils/date';
import { averageRemainingRatio, homeAlertTone } from '../domain/depletion';
import { syncDepletionNotifications } from '../services/depletionNotifications';

export type HomeData = {
  settings: SettingsPayload;
  items: PrepItemRow[];
  avgRemaining: number;
  weekMeals: MealRow[];
  weekStart: string;
};

export function useHomeData() {
  const db = useSQLiteContext();
  const [data, setData] = useState<HomeData | null>(null);

  const refresh = useCallback(async () => {
    const settings = await loadSettings(db);
    const run = await getActivePrepRun(db);
    const items = run ? await getPrepItems(db, run.id) : [];
    const ratios = items.map((i) => ({
      remaining: i.remaining_grams,
      total: i.total_cooked_grams,
    }));
    const avgRemaining = averageRemainingRatio(ratios);
    const weekStart = weekStartISO();
    const weekMeals = await listMealsForWeek(db, weekStart);
    const tone = homeAlertTone(
      avgRemaining,
      settings.lowThresholdPct,
      settings.criticalThresholdPct,
    );
    setData({ settings, items, avgRemaining, weekMeals, weekStart });
    await syncDepletionNotifications(db, { prepRunId: run?.id ?? null, tone });
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return { data, refresh };
}
