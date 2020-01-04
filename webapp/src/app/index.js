import React, { useState, useEffect} from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

const serverRoutinesURL = (process.env.REACT_APP_SERVER || "http://localhost:3000/") + "routines";

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
  const titleStyle = { fontSize: 50 }

  return (
    <View>
    <Text style={titleStyle}>
        {"Hercules App"}
      </Text>
    </View>
  )
}

function Body(props) {
 const { addMode, routines, refreshRoutines } = props
 let scrollStyle = { width: '86%', marginVertical: 10, alignSelf: 'center' }
 let routineStyle = { backgroundColor: 'ivory', borderColor: 'black', borderWidth: 2, borderRadius: 5 }
 let nameStyle = { textAlign: 'center', fontSize: 30, textDecorationLine: 'underline' }
 let procedureStyle = { textAlign: 'center', fontSize: 15 }
 let display

 if (addMode) {
   display = (
     <Add
       doneAdding={() => {
         console.log("refresh after add")
         refreshRoutines()
       }}
     />
   )
 } else {
   display = (
     <ScrollView style={scrollStyle}>
       {
         routines.map((routine, index) =>
           <View key={index} style={routineStyle}>
               <Text style={nameStyle}>
                     {routine.name}
                </Text>
                <Text style={procedureStyle}>
                      {routine.procedure}
                </Text>
          </View>
         )
       }
     </ScrollView>
   )
 }

  return (
      <ScrollView style={scrollStyle}>
        {display}
      </ScrollView>
  )
}

function Footer(props) {
  const { onPressRoutines, onPressAdd } = props

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ marginLeft: 10 }}>
        <Button
          title={"ROUTINES"}
          color={"black"}
          onPress={() => onPressRoutines()}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Button
          title={"ADD"}
          color={"darkgreen"}
          onPress={() => onPressAdd()}
        />
      </View>
    </View>
  )
}

function Container() {
  const [ addMode, setAddMode ] = useState(false)
  const [ routines, setRoutines ] = useState([])
  const refreshFromServer = () => getRoutinesFromServer(routines => setRoutines(routines))

  useEffect(() => {
      getRoutinesFromServer(routines => setRoutines(routines))
  }, [])
  return (
    <View style={styles.container}>

      <View style={styles.header}>
          <Header/>
      </View>

      <View style={styles.body}>
          <Body
            addMode={addMode}
            routines={routines}
            refreshRoutines={() => {
              console.log("refresh routines")
              refreshFromServer()
              setAddMode(false)
            }}
          />
      </View>

      <View style={styles.footer}>
          <Footer
            onPressRoutines={() => {
               console.log("refresh routines")
               refreshFromServer()
               setAddMode(false)
            }}
            onPressAdd={() => {
              console.log("setting addMode")
              setAddMode(true)
            }}
          />
      </View>

    </View>
  )
}

function Routine(props) {
  const { name, procedure, setName, setProcedure, submit, cancel } = props
  const routineStyle = {
    backgroundColor: 'cornsilk',
    borderColor: 'black', borderWidth: 2, borderRadius: 5
  }

  return (
    <View style={routineStyle}>
      <View style={{ flex:1, flexDirection: 'row' }}>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, marginLeft: 5 }}>
            {"Name"}
          </Text>
        </View>
        <View style={{ flex: 5 }}>
          <TextInput
            style={{ height: 40, backgroundColor: 'ivory', marginBottom: 5 }}
            editable={!!setName}
            placeholder={"Enter name here"}
            onChangeText={(text) => setName(text)}
            value={name}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', width: '86%' }}>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, marginLeft: 5 }}>
            {"Procedure"}
          </Text>
        </View>
        <View style={{ flex: 5 }}>
          <TextInput
            style={{ height: 100, backgroundColor: 'ivory', marginBottom: 5 }}
            placeholder={"Enter procedure here"}
            multiline={true}
            onChangeText={(text) => setProcedure(text)}
            value={procedure}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ margin: 10 }}>
          <Button
            title={"SUBMIT ADD"}
            color={"green"}
            onPress={() => submit()}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title={"Cancel"}
            color={"black"}
            onPress={() => cancel()}
          />
        </View>
      </View>
    </View>
  )
}

function Add(props) {
  const { doneAdding } = props
  const [ name, setName ] = useState("")
  const [ procedure, setProcedure ] = useState("")

  return (
    <Routine
      name={name}
      procedure={procedure}
      setName={setName}
      setProcedure={setProcedure}
      submit={() => {
        addRoutineOnServer({ name, procedure }, () => {
          doneAdding()
        })
      }}
      cancel={() => {
        doneAdding()
      }}
    />
  )
}


export default Container
