/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useReducer } from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Api from './src/utils/api'
import VideoContext from './src/context/video-context'
import videosReducer, { initialVideoState, initCategories, initSuggestions } from './src/reducers/videos'
import LoginScreen from './src/screens/containers/login'
import HomeScreen from './src/screens/containers/home'
import ProfileScreen from './src/screens/containers/profile'
import AboutScreen from './src/screens/containers/about'
import MovieScreen from './src/screens/containers/movie'

const Stack = createStackNavigator()

const App = () => {
  const [videos, dispatchVideos] = useReducer(videosReducer, initialVideoState)
  useEffect(() => {
    let didCancel = false
    const cacheValues = async () => {
      if (!didCancel) {
        Promise.all([initSuggestions(), initCategories()]).then(([suggestions, categories]) => {
          dispatchVideos({
            type: 'SET_INIT_DATA',
            payload: {
              suggestions,
              categories
            }
          })
        })
      }
    }
    const fetchSuggestions = async () => {
      try {
        const suggestionList = await Api.getSuggestion(10)
        if (!didCancel) {
          dispatchVideos({
            type: 'SET_SUGGESTION_LIST',
            payload: suggestionList
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    const fetchCategories = async () => {
      try {
        const categoryList = await Api.getMovies()
        if (!didCancel) {
          dispatchVideos({
            type: 'SET_CATEGORY_LIST',
            payload: categoryList
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    cacheValues().then(() => {
      fetchSuggestions()
      fetchCategories()
    })
    return () => {
      didCancel = true
    }
  }, [])
  return (
    <NavigationContainer>
      <VideoContext.Provider value={{ videos, dispatchVideos }}>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ title: 'titulo generico' }}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Este es el home', gestureEnabled: true }} />
          <Stack.Screen name='Movie' component={MovieScreen} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
          <Stack.Screen name='About' component={AboutScreen} options={{ gestureEnabled: true }} />
        </Stack.Navigator>
      </VideoContext.Provider>
    </NavigationContainer>
  )
}

export default App
