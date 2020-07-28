import React, { useContext } from 'react'
import {
  FlatList
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Separator from '@sections/components/horizontal-separator'
import Empty from '@videos/components/empty'
import Category from '@videos/components/category'
import Layout from '@videos/components/category-list-layout'
import VideoContext from '@context/video-context'

const CategoryList = () => {
  const navigation = useNavigation()
  const { videos } = useContext(VideoContext)
  const renderEmpty = () => <Empty text='No hay recomendaciones' />
  const itemSeparator = () => <Separator />
  const viewCategory = (item) => {
    navigation.navigate('Category', { genre: item.genres[0] })
  }
  const renderItem = ({ item }) => {
    return (
      <Category
        {...item}
        onPress={() => viewCategory(item)}
      />)
  }
  const keyExtractor = item => item.id.toString()
  return (
    <Layout title='Categorías'>
      <FlatList
        horizontal
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={itemSeparator}
        renderItem={renderItem}
        data={videos.categories}
        keyExtractor={keyExtractor}
      />
    </Layout>
  )
}

export default CategoryList
