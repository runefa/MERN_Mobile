import React, { useState, useEffect } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import axios from 'axios'

const serverRoutinesURL = (process.env.REACT_APP_SERVER || "http://localhost:3000/") + "routines"
const getRoutinesFromServer = async (doneFetchingCb) => {
  try {
    const result = await axios.get(serverRoutinesURL)
    console.log("fetched result", result)
    doneFetchingCb(result.data)
  } catch (error) {
    doneFetchingCb([])
  }
}
const addRoutineOnServer = async (data, doneAddedCb) => {
  try {
    const result = await axios.post(serverRoutinesURL, data)
    console.log("add result", result)
    doneAddedCb()
  } catch (error) {
    console.log("error in adding", error)
    doneAddedCb()
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100vw',
    height: '100vh'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'powderblue'
  },
  body: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'steelblue'
  },
})
function Header(props) {
  return (
    <View>
      <Text>
        {"Hercules App"}
      </Text>
    </View>
  )
}

function Body(props) {
  return (
    <View>
      <Text>
        {"Body"}
      </Text>
    </View>
  )
}

function Footer(props) {
  return (
    <View style={{ flexDirection:'row '}}>
      <View style={{ marginLeft: 10 }}>
         <Button
            title={"ROUTINES"}
            color={"black"}
            onPress={() => console.log("Routines pressed")}
         />
                 </View>
                 <View style={{ marginLeft: 10 }}>
         <Button
            title={"ADD"}
            color={"darkgreen"}
            onPress={() => console.log("Add pressed")}
         />
                 </View>
    </View>
  )
}

function Container() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
          <Header/>
      </View>

      <View style={styles.body}>
          <Body/>
      </View>

      <View style={styles.footer}>
          <Footer/>
      </View>

    </View>
  )
}

export default Container
