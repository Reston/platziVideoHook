import React, { useContext, useEffect } from 'react'
import MovieLayout from '../components/layout-movie'
import Player from '../../player/containers/player'
import Header from '../../sections/components/header'
import Close from '../../sections/components/close'
import Details from '../../videos/components/details'
import VideoContext from '../../context/video-context'
import { Animated } from 'react-native'

const Movie = () => {
  const opacity = new Animated.Value(0)
  const { videos, dispatchVideos } = useContext(VideoContext)
  const closeVideo = () => {
    dispatchVideos({
      type: 'SET_SELECTED_MOVIE',
      payload: {
        movie: null
      }
    })
  }
  useEffect(() => {
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start()
  }, [])
  return (
    <Animated.View
      driver
      style={{
        flex: 1,
        opacity: opacity
      }}
    >
      <MovieLayout>
        <Header>
          <Close onPress={closeVideo} />
        </Header>
        <Player />
        <Details {...videos.selectedMovie} />
      </MovieLayout>
    </Animated.View>
  )
}

export default Movie
