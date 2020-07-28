import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview'

function Details (props) {
  return (
    <ScrollView>
      <View style={styles.top}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.details}>
          <Image style={styles.cover} source={{ uri: props.medium_cover_image }} />
          <Text style={styles.description}>{props.description_full}</Text>
        </View>
      </View>
      <WebView
        style={styles.trailer}
        source={{
          uri: `https://www.youtube.com/embed/${props.yt_trailer_code}`
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  trailer: {
    height: 200,
    marginBottom: 0
  },
  details: {
    flexDirection: 'row',
    marginBottom: 20
  },
  cover: {
    width: 125,
    height: 190,
    backgroundColor: 'black'
  },
  title: {
    color: '#44546b',
    fontSize: 18,
    fontWeight: 'bold'
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    padding: 20,
    backgroundColor: 'white'
  },
  bottom: {
    padding: 20,
    flex: 1
  },
  description: {
    fontSize: 15,
    lineHeight: 22.5,
    color: '#4c4c4c',
    marginLeft: 10,
    flex: 1
  }
})

export default Details
