import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from 'react-redux';
import store from '.././store/store';
import App from "./App";

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
      </Provider>
    </>
  );
}
