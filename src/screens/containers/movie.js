import React, { useContext, useEffect, useCallback, useLayoutEffect } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/stack'

import MovieLayout from '@screens/components/layout-movie'
import Player from '@player/containers/player'
import Details from '@videos/components/details'
import VideoContext from '@context/video-context'
import { Animated, BackHandler } from 'react-native'

const Movie = () => {
  const opacity = new Animated.Value(0)
  const navigation = useNavigation()
  const { videos, dispatchVideos } = useContext(VideoContext)
  // * handling back button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            dispatchVideos({
              type: 'SET_SELECTED_MOVIE',
              payload: {
                movie: null
              }
            })
            navigation.goBack()
          }}
        />
      )
    }
    )
  }, [navigation])
  // * handling physical back button press
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        dispatchVideos({
          type: 'SET_SELECTED_MOVIE',
          payload: {
            movie: null
          }
        })
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    })
  )

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
        <Player />
        <Details {...videos.selectedMovie} />
      </MovieLayout>
    </Animated.View>
  )
}

export default Movie
