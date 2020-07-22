import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'

function About () {
  return (
    <View style={styles.container}>
      <Text>About</Text>
      <Button title='Ir al profile' />
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

export default About
