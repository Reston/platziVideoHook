import React, { useState } from 'react'
import { StyleSheet, ActivityIndicator, Text } from 'react-native'
import Video from 'react-native-video'
import Layout from '../components/layout-player'
import ControlLayout from '../components/layout-control'
import PlayPause from '../components/play-pause'

function Player () {
  const [buffering, setBuffering] = useState(true)
  const [paused, setPaused] = useState(false)
  const onLoad = () => {
    setBuffering(false)
  }
  const playPause = () => {
    setPaused(value => !value)
  }
  return (
    <Layout
      loading={buffering}
      video={
        <Video
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
          }}
          style={styles.video}
          resizeMode='contain'
          onLoad={onLoad}
          paused={paused}
        />
      }
      loader={
        <ActivityIndicator color='red' />
      }
      controls={
        <ControlLayout>
          <PlayPause
            onPress={playPause}
            paused={paused}
          />
          <Text>pogress bar |</Text>
          <Text>Time |</Text>
          <Text>full |</Text>
        </ControlLayout>
      }
    />
  )
}

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})

export default Player
