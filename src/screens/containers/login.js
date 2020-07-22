import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'

function Login (props) {
  const handlePress = () => {
    props.navigation.navigate('Home')
  }
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title='Ir al home' onPress={handlePress} />
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

export default Login
