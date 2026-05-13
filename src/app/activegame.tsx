import { useState } from "react";
import { Stack } from "expo-router";
import { View } from "react-native";

import { Card } from "@/components/Card";
import { CoinToss } from "@/components/CoinToss";
import { DamageDot } from "@/components/DamageDot";
import type { DotMode } from "@/components/DamageDot/types";
import { DragDropProvider } from "@/components/DragDropProvider";
import { MenuButton } from "@/components/MenuButton";
import { SideMenu } from "@/components/SideMenu";
import { Toggle } from "@/components/Toggle";
import { styles } from "@/styles/activegame";

const TOP_FAR = ["tf-1", "tf-2", "tf-3", "tf-4", "tf-5"];
const BOTTOM_FAR = ["bf-1", "bf-2", "bf-3", "bf-4", "bf-5"];

const MODE_OPTIONS: [
  { label: string; value: DotMode },
  { label: string; value: DotMode },
] = [
  { label: "Damage", value: "damage" },
  { label: "Heal", value: "heal" },
];

export default function ActiveGame() {
  const [resetKey, setResetKey] = useState(0);
  const [mode, setMode] = useState<DotMode>("damage");

  const handleReset = () => setResetKey((k) => k + 1);

  return (
    <DragDropProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>

        <View style={styles.section}>
          <View style={styles.farRow}>
            {TOP_FAR.map((id, i) => (
              <Card
                key={`${id}-${resetKey}`}
                id={id}
                label={`A${i + 1}`}
                compact
                style={styles.compactCard}
              />
            ))}
          </View>
          <View style={styles.closeRow}>
            <Card key={`t-close-${resetKey}`} id="t-close" label="Alpha" />
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
            <Card key={`b-close-${resetKey}`} id="b-close" label="Beta" />
          </View>
          <View style={styles.farRow}>
            {BOTTOM_FAR.map((id, i) => (
              <Card
                key={`${id}-${resetKey}`}
                id={id}
                label={`B${i + 1}`}
                compact
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
    </DragDropProvider>
  );
}
