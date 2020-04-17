import React from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, TextInput,
  AsyncStorage, Alert, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard
} from 'react-native';
import { Button, Icon, Card, CardItem } from 'native-base';

export default class TODO extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todo: '',
      key: '',
      data: [],
    }
  }

  componentDidMount() {
    this.props.navigation.addListener(
      "focus",
      () => {
        this.getAllTodo()
      }
    )
  }

  setTodoCount = async () => {
    let result = `You have ${this.state.data.length} TODOs`;
    await AsyncStorage.setItem("TodoCount", result)
      .catch((error) => console.log(error))
  }

  getAllTodo = async () => {
    await AsyncStorage.getAllKeys()

      .then(async (keys) => {

        return await AsyncStorage.multiGet(keys)
          .then(result => {
            result.pop();
            this.setState({ data: result });
          })
          .catch((error) => { console.log(error) })
      })
      .catch((error) => { console.log(error) })
  }


  saveTodo = async () => {

    if (this.state.inputValue !== "") {
      var todo = this.state.inputValue
      await AsyncStorage.setItem(Date.now().toString(), todo)
        .then(() => {
          this.getAllTodo()
          .then(()=>{this.setTodoCount()})
        })
        .catch((error) => { console.log(error) })
    }

    else {
      Alert.alert('Enter TODO !!!!')
    }

    this.setState({ inputValue: "" })
  }


  removeTodo = (key) => {

    Alert.alert(
      'Remove Todo ?',
      'Do you need to remove your TODO????',

      [
        { text: "Cancel" },

        {
          text: " OK",
          onPress: async () => {
            await AsyncStorage.removeItem(key)
              .then(this.getAllTodo().then(()=>{this.setTodoCount()}))
              .catch((error) => { console.log(error) })
          }
        }]
    )
  }



  render() {
    return (
      <SafeAreaView style={styles.container}>

        <ScrollView >

          <TextInput style={styles.input}
            selectionColor="#000"
            keyboardType="default"
            placeholder=" Enter TODOs"
            placeholderTextColor="#000"
            value={this.state.inputValue}
            onChangeText={inputValue => this.setState({ inputValue })} />


          <View>
            <Button iconLeft light style={styles.button} onPress={() => { this.saveTodo() }}>
              <Icon name='add' />
            </Button>
          </View>

          <View style={styles.list}>
            <FlatList
              data={this.state.data}

              renderItem={({ item }) => {
                let todo = item[1];
                let key = item[0].toString();

                return (
                  <View>
                    <Card >
                      <CardItem button onPress={() => { this.removeTodo(key) }} style={styles.cardItem}>
                        <Text style={styles.text}>{todo}</Text>
                      </CardItem>
                    </Card>
                  </View>
                )
              }}
              keyExtractor={(item, index) => item[0].toString()}
            />
          </View>

        </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",

  },
  input: {
    color: '#000',
    backgroundColor: '#7B8788',
    borderRadius: 15,
    paddingVertical: 12,
    marginTop: 30,
    width: 300,
    alignSelf: "center",
  },
  button: {
    color: '#fff',
    width: 50,
    borderRadius: 4,
    marginTop: 20,
    alignSelf: "center"
  },
  buttonHome: {
    color: '#fff',
    width: "auto",
    borderRadius: 4,
    alignSelf: "center"

  },
  list: {
    margin: 20
  },

  cardItem: {
    backgroundColor: '#2475B0'
  }
});
