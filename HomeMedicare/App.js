import Application from "./app/Screens/Application";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#4993F7" }}>
      <Application />
    </SafeAreaProvider>
  );
}
