import { Stack } from "expo-router";
import { Header } from "react-native-elements";
import App from "./App";

export default function RootLayout() {
  return (
    <>
    <Header
  placement="left"
  style={{backgroundColor:"blue"}}
  leftComponent={{ text: 'Passkeeeper', style: { color: '#fff' } }}
/>

    <App/>
    </>
  )
}