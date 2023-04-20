import Application from "./app/Screens/Application";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TestApp from "./app/Screens/Test";
import store from "./app/Store/Redux/ReduxStore";
import { View, Text } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";

// const store = configureStore({
//   reducer: rootReducer,
// });

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#4993F7" }}>
      <Application />
    </SafeAreaProvider>
  );
}
