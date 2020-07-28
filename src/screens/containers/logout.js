import React, { useContext, useEffect } from 'react'
import {
  View,
  Text
} from 'react-native'
import AuthContext from '@context/auth-context'

function Login () {
  const { signOut } = useContext(AuthContext)
  useEffect(() => {
    signOut()
  }, [])
  return (
    <View>
      <Text>Logging out!</Text>
    </View>
  )
}

export default Login
