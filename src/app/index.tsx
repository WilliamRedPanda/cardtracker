import { useRouter } from "expo-router";
import { View } from "react-native";

import { CoinToss } from "@/components/CoinToss";
import { styles } from "@/styles/home";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CoinToss
        size={140}
        onResult={() => {
          setTimeout(() => router.push("/activegame"), 700);
        }}
      />
    </View>
  );
}
