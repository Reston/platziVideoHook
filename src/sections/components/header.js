import React from 'react'
import { View, SafeAreaView, Text, StyleSheet } from 'react-native'

const Header = (props) => {
  return (
    <View>
      <SafeAreaView style={styles.statusBar}>
        <View style={styles.container}>
          <Text>Video App</Text>
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
  statusBar: {
    backgroundColor: 'white'
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
