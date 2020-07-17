import React, { useContext } from 'react'
import { Text } from 'react-native'
import Home from './screens/containers/home'
import Header from './sections/components/header'
import Search from './sections/components/search'
import SuggestionList from './videos/containers/suggestion-list'
import CategoryList from './videos/containers/category-list'
import Movie from './screens/containers/movie'
import VideoContext from './context/video-context'

const AppLayout = () => {
  const { videos } = useContext(VideoContext)
  return (
    <>
      {videos.selectedMovie !== null ? (
        <Movie />
      ) : (
        <Home>
          <Header />
          <Search />
          <CategoryList />
          <SuggestionList />
        </Home>
      )}

    </>
  )
}

export default AppLayout
