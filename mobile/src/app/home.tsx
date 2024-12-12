import { useEffect, useState } from 'react'
import { View, Alert } from 'react-native'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'

import { api } from '@/services/api'
import { Categories, CategoriesProps } from '@/components/categories'
import { PlaceProps } from '@/components/place'
import { Places } from '@/components/places'

type MarketsProps = PlaceProps

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")
  const [markets, setMarkets] = useState<MarketsProps[]>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
      setCategory(data[0].id)
    } catch (err) {
      console.log(err)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias.')
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return
      }

      const { data } = await api.get('/markets/category/' + category)
      setMarkets(data)
    } catch (err) {
      console.log(err)
      Alert.alert('Locais', 'Não foi possível carregar os locais.')
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()

      if (granted) {
        const location = await Location.getCurrentPositionAsync()
        console.log(location)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category])

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#CECECE ' }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />

      <Places data={markets} />
    </View>
  )
}