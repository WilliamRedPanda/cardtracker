import { Stack } from "expo-router";
import { View } from "react-native";

import { Card } from "@/components/Card";
import { CoinToss } from "@/components/CoinToss";
import { DamageDot } from "@/components/DamageDot";
import { DragDropProvider } from "@/components/DragDropProvider";
import { styles } from "@/styles/activegame";

const TOP_FAR = ["tf-1", "tf-2", "tf-3", "tf-4", "tf-5"];
const BOTTOM_FAR = ["bf-1", "bf-2", "bf-3", "bf-4", "bf-5"];

export default function ActiveGame() {
  return (
    <DragDropProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.farRow}>
            {TOP_FAR.map((id, i) => (
              <Card
                key={id}
                id={id}
                label={`A${i + 1}`}
                compact
                style={styles.compactCard}
              />
            ))}
          </View>
          <View style={styles.closeRow}>
            <Card id="t-close" label="Alpha" />
          </View>
        </View>

        <View style={styles.center}>
          <View style={styles.dotsColumn}>
            <DamageDot value={10} />
            <DamageDot value={20} />
          </View>
          <CoinToss size={90} />
          <View style={styles.dotsColumn}>
            <DamageDot value={50} />
            <DamageDot value={100} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.closeRow}>
            <Card id="b-close" label="Beta" />
          </View>
          <View style={styles.farRow}>
            {BOTTOM_FAR.map((id, i) => (
              <Card
                key={id}
                id={id}
                label={`B${i + 1}`}
                compact
                style={styles.compactCard}
              />
            ))}
          </View>
        </View>
      </View>
    </DragDropProvider>
  );
}
