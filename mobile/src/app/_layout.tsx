import { Stack } from 'expo-router'
import { colors } from '@/styles/theme'

export default function Layout() {
  return <Stack
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.gray[100] }
    }}
  />
}