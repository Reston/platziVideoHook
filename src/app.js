
import React, { useEffect, useReducer } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '@screens/containers/home'
import ProfileScreen from '@screens/containers/profile'
import AboutScreen from '@screens/containers/about'
import MovieScreen from '@screens/containers/movie'
import LogoutScreen from '@screens/containers/logout'
import CategoryScreen from '@screens/containers/category'
import Api from '@utils/api'
import VideoContext from '@context/video-context'
import videosReducer, { initialVideoState, initCategories, initSuggestions } from '@reducers/videos'

const Drawer = createDrawerNavigator()

const Stacker = createStackNavigator()

// ? Drawer navigator does not handle Header prop so a workaround is using a stack
function MainScreens () {
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
    <VideoContext.Provider value={{ videos, dispatchVideos }}>
      <Stacker.Navigator>
        <Stacker.Screen name='Home' component={HomeScreen} />
        <Stacker.Screen name='Movie' component={MovieScreen} />
        <Stacker.Screen name='Category' component={CategoryScreen} />
      </Stacker.Navigator>
    </VideoContext.Provider>
  )
}

function AppLayout () {
  return (
    <Drawer.Navigator initialRouteName='App'>
      <Drawer.Screen name='App' component={MainScreens} options={{ title: 'Este es el home', gestureEnabled: true, headerMode: 'screen' }} />
      <Drawer.Screen name='Profile' component={ProfileScreen} />
      <Drawer.Screen name='About' component={AboutScreen} options={{ gestureEnabled: true }} />
      <Drawer.Screen name='Logout' component={LogoutScreen} />
    </Drawer.Navigator>
  )
}

export default AppLayout
