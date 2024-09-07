import { Stack } from "expo-router";
import { Provider as PaperProvider } from 'react-native-paper';

import App from "./App";

export default function RootLayout() {
  return (
    <>
    {/* <Header
  placement="left"
  style={{backgroundColor:"blue"}}
  leftComponent={{ text: 'Passkeeeper', style: { color: '#fff' } }}
/> */}
    <PaperProvider>


    <App/>
    </PaperProvider>
    </>
  )
}