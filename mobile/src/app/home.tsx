import { useEffect, useState } from 'react'
import { View, Alert } from 'react-native'

import { api } from '@/services/api'
import { Categories, CategoriesProps } from '@/components/categories'

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")

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

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />
    </View>
  )
}