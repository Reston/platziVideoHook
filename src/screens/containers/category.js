import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Empty from '@videos/components/empty'
import Layout from '@videos/components/suggestion-list-layout'
import Separator from '@sections/components/vertical-separator'
import Suggestion from '@videos/components/suggestion'
import VideoContext from '@context/video-context'

const CategoryScreen = ({route}) => {
  const navigation = useNavigation()
  const { videos, dispatchVideos } = useContext(VideoContext)
  const renderEmpty = () => <Empty text='No hay recomendaciones' />
  const itemSeparator = () => <Separator />
  const viewMovie = (item) => {
    dispatchVideos({
      type: 'SET_SELECTED_MOVIE',
      payload: {
        movie: item
      }
    })
    navigation.navigate('Movie')
  }

  const renderItem = ({ item }) => {
    return <Suggestion {...item} onPress={() => { viewMovie(item) }} />
  }
  const keyExtractor = item => item.id.toString()
  return (
    // ? equivalente a (params.genre === null || params.genre === undefined) ? 'Categoría' : params.genre);
    <Layout title={`${route.params?.genre ?? 'Categoría'}`}>
      <FlatList
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={itemSeparator}
        renderItem={renderItem}
        data={videos.suggestions}
        keyExtractor={keyExtractor}
      />
    </Layout>
  )
}

export default CategoryScreen
