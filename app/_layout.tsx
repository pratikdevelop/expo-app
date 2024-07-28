import { Stack } from "expo-router";
import { Header } from "react-native-elements";

export default function RootLayout() {
  return (
    <>
    <Header
  placement="left"
  style={{backgroundColor:"blue"}}
  leftComponent={{ text: 'Passkeeeper', style: { color: '#fff' } }}
/>
    <Stack>
      <Stack.Screen options={{navigationBarHidden: false}} name="index" />
    </Stack>
    </>
  )
}