import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import Empty from '../components/empty'
import Layout from '../components/suggestion-list-layout'
import Separator from '../../sections/components/vertical-separator'
import Suggestion from '../components/suggestion'
import VideoContext from '../../context/video-context'

const SuggestionList = () => {
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
  }
  const renderItem = ({ item }) => {
    return <Suggestion {...item} onPress={() => { viewMovie(item) }} />
  }
  const keyExtractor = item => item.id.toString()
  return (
    <Layout title='Recomendado para ti'>
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

export default SuggestionList
