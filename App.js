/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useReducer } from 'react'

import Api from './src/utils/api'
import VideoContext from './src/context/video-context'
import videosReducer, { initialVideoState, initCategories, initSuggestions } from './src/reducers/videos'
import AppLayout from './src/app'

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
    <VideoContext.Provider value={{ videos, dispatchVideos }}>
      <AppLayout />
    </VideoContext.Provider>
  )
}

export default App
