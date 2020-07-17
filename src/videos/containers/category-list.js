import React, { useContext } from 'react'
import {
  FlatList
} from 'react-native'
import Separator from '../../sections/components/horizontal-separator'
import Empty from '../components/empty'
import Category from '../components/category'
import Layout from '../components/category-list-layout'
import VideoContext from '../../context/video-context'

const CategoryList = () => {
  const { videos } = useContext(VideoContext)
  const renderEmpty = () => <Empty text='No hay recomendaciones' />
  const itemSeparator = () => <Separator />
  const renderItem = ({ item }) => {
    return <Category {...item} />
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
