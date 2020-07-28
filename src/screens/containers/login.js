import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'
import AuthContext from '@context/auth-context'

function Login () {
  const { signIn } = useContext(AuthContext)
  const handlePress = () => {
    signIn('username/pass')
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
