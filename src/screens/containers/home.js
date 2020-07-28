import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '@sections/components/header'
import Search from '@sections/components/search'
import SuggestionList from '@videos/containers/suggestion-list'
import CategoryList from '@videos/containers/category-list'

function Home () {
  const navigation = useNavigation()
  // ? using custom header remove animations so it's not recommended
  // ? if we are not handling all that.
  useLayoutEffect(() => {
    navigation.setOptions({ header: () => <Header /> }
    )
  }, [navigation])

  return (
    <>
      <Search />
      <CategoryList />
      <SuggestionList />
    </>
  )
}

export default Home
