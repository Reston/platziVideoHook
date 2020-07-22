import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'

function Profile () {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title='Ir al Profile' />
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

export default Profile
