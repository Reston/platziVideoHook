import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import Header from '../../sections/components/header'
import Search from '../../sections/components/search'
import SuggestionList from '../../videos/containers/suggestion-list'
import CategoryList from '../../videos/containers/category-list'

function Home (props) {
  return (
    <View>
      <Header />
      <Search />
      <CategoryList />
      <SuggestionList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'

  }
})

export default Home
