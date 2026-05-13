import { useCallback, useState } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";

import { Card } from "@/components/Card";
import { CardSwapProvider } from "@/components/CardSwapProvider";
import { CoinToss } from "@/components/CoinToss";
import { DamageDot } from "@/components/DamageDot";
import type { DotMode } from "@/components/DamageDot/types";
import { DragDropProvider } from "@/components/DragDropProvider";
import { MenuButton } from "@/components/MenuButton";
import { SideMenu } from "@/components/SideMenu";
import { Toggle } from "@/components/Toggle";
import { styles } from "@/styles/activegame";

interface CardData {
  id: string;
  label: string;
  total: number;
}

const INITIAL_TOP: CardData[] = [
  { id: "tf-1", label: "A1", total: 0 },
  { id: "tf-2", label: "A2", total: 0 },
  { id: "tf-3", label: "A3", total: 0 },
  { id: "tf-4", label: "A4", total: 0 },
  { id: "tf-5", label: "A5", total: 0 },
  { id: "t-close", label: "Alpha", total: 0 },
];

const INITIAL_BOTTOM: CardData[] = [
  { id: "b-close", label: "Beta", total: 0 },
  { id: "bf-1", label: "B1", total: 0 },
  { id: "bf-2", label: "B2", total: 0 },
  { id: "bf-3", label: "B3", total: 0 },
  { id: "bf-4", label: "B4", total: 0 },
  { id: "bf-5", label: "B5", total: 0 },
];

const MODE_OPTIONS: [
  { label: string; value: DotMode },
  { label: string; value: DotMode },
] = [
  { label: "Damage", value: "damage" },
  { label: "Heal", value: "heal" },
];

export default function ActiveGame() {
  const [mode, setMode] = useState<DotMode>("damage");
  const [topCards, setTopCards] = useState<CardData[]>(INITIAL_TOP);
  const [bottomCards, setBottomCards] = useState<CardData[]>(INITIAL_BOTTOM);

  const handleTotalChange = useCallback((id: string, newTotal: number) => {
    setTopCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, total: newTotal } : c))
    );
    setBottomCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, total: newTotal } : c))
    );
  }, []);

  const handleSwap = useCallback((draggedId: string, targetId: string) => {
    setTopCards((prev) => {
      const i = prev.findIndex((c) => c.id === draggedId);
      const j = prev.findIndex((c) => c.id === targetId);
      if (i < 0 || j < 0) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setBottomCards((prev) => {
      const i = prev.findIndex((c) => c.id === draggedId);
      const j = prev.findIndex((c) => c.id === targetId);
      if (i < 0 || j < 0) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setTopCards(INITIAL_TOP);
    setBottomCards(INITIAL_BOTTOM);
  }, []);

  return (
    <DragDropProvider>
      <CardSwapProvider>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>

          <View style={styles.section}>
            <View style={styles.farRow}>
              {topCards.slice(0, 5).map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  label={card.label}
                  compact
                  side="top"
                  total={card.total}
                  onTotalChange={handleTotalChange}
                  onSwap={handleSwap}
                  style={styles.compactCard}
                />
              ))}
            </View>
            <View style={styles.closeRow}>
              <Card
                key={topCards[5].id}
                id={topCards[5].id}
                label={topCards[5].label}
                side="top"
                total={topCards[5].total}
                onTotalChange={handleTotalChange}
                onSwap={handleSwap}
              />
            </View>
          </View>

          <View style={styles.center}>
            <View style={styles.dotsColumn}>
              <DamageDot value={10} mode={mode} />
              <DamageDot value={20} mode={mode} />
            </View>
            <CoinToss size={90} />
            <View style={styles.dotsColumn}>
              <DamageDot value={50} mode={mode} />
              <DamageDot value={100} mode={mode} />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.closeRow}>
              <Card
                key={bottomCards[0].id}
                id={bottomCards[0].id}
                label={bottomCards[0].label}
                side="bottom"
                total={bottomCards[0].total}
                onTotalChange={handleTotalChange}
                onSwap={handleSwap}
              />
            </View>
            <View style={styles.farRow}>
              {bottomCards.slice(1).map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  label={card.label}
                  compact
                  side="bottom"
                  total={card.total}
                  onTotalChange={handleTotalChange}
                  onSwap={handleSwap}
                  style={styles.compactCard}
                />
              ))}
            </View>
          </View>

        </View>

        <SideMenu side="right">
          <Toggle options={MODE_OPTIONS} value={mode} onChange={setMode} />
          <MenuButton label="Reset" variant="danger" onPress={handleReset} />
        </SideMenu>
      </CardSwapProvider>
    </DragDropProvider>
  );
}
