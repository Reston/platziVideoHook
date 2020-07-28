import React, { useState, useContext } from 'react'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import VideoContext from '@context/video-context'
import API from '@utils/api'

function Search () {
  const navigation = useNavigation()
  const { dispatchVideos } = useContext(VideoContext)
  const [text, setText] = useState('')
  const handleSubmit = async () => {
    const movies = await API.searchMovie(text)
    dispatchVideos({
      type: 'SET_SELECTED_MOVIE',
      payload: {
        movie: movies[0]
      }
    })
    navigation.navigate('Movie')
  }
  const handleOnChangeText = (text) => {
    setText(text)
  }
  return (
    <TextInput
      placeholder='Busca tu película favorita'
      autoCorrect={false}
      autoCapitalize='none'
      underlineColorAndroid='transparent'
      onSubmitEditing={handleSubmit}
      onChangeText={handleOnChangeText}
    />
  )
}

export default Search
