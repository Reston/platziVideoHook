import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

function SplashScreen () {
  return (
    <View style={styles.container}>
      <Text>Loading user!</Text>
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

export default SplashScreen
