import React from 'react'
import { View, SafeAreaView, Image, StyleSheet } from 'react-native'

const Header = (props) => {
  return (
    <View>
      <SafeAreaView>
        <View style={styles.container}>
          <Image source={require('../../../assets/abaqus.png')} style={styles.logo} />
          <View style={styles.right}>
            {props.children}
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 26,
    resizeMode: 'contain'
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default Header
