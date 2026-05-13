import { Card } from "@/components/Card";
import { DragDropProvider } from "@/components/DragDropProvider";
import { DamageDot } from "@/components/DamageDot";
import { View } from "react-native";

import { styles } from "@/styles/home";

export default function Index() {
  return (
    <DragDropProvider>
      <View style={styles.container}>
        <View style={styles.cards}>
          <Card id="player-1" label="Player 1" />
          <Card id="player-2" label="Player 2" />
        </View>
        <View style={styles.dots}>
          <DamageDot value={1} />
          <DamageDot value={3} />
          <DamageDot value={5} />
          <DamageDot value={10} />
        </View>
      </View>
    </DragDropProvider>
  );
}
