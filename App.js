/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useReducer, useMemo } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '@screens/containers/login'
import SplashScreen from '@screens/containers/splashscreen'
import AuthContext from '@context/auth-context'
import authReducer, { initialAuthState } from '@reducers/auth'
import AppScreen from './src/app'

const Stack = createStackNavigator()

const App = () => {
  const [auth, dispatchAuth] = useReducer(authReducer, initialAuthState)

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken

      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatchAuth({ type: 'RESTORE_TOKEN', token: userToken })
    }

    bootstrapAsync()
  }, [])

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        console.log(data)
        dispatchAuth({ type: 'SIGN_IN', token: 'dummy-auth-token' })
      },
      signOut: () => dispatchAuth({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatchAuth({ type: 'SIGN_IN', token: 'dummy-auth-token' })
      }
    }),
    []
  )
  if (auth.isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {auth.userToken === null ? (
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{
                title: 'Entrar',
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: auth.isSignout ? 'pop' : 'push'
              }}
            />
          ) : (
            <Stack.Screen name='Home' component={AppScreen} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App
