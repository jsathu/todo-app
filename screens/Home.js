import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, AsyncStorage } from 'react-native';
import { Button } from 'native-base';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoCount: ""
        }
    }

    getTodoCount = async () => {
        await AsyncStorage.getItem("TodoCount", (error, result) => {
            if (!error) {
                if (result !== "" && result !== null) {
                    this.setState({ todoCount: result })
                } else {
                    this.setState({ todoCount: "Click to View TODOs" })
                }
            } else {
                console.log(error)
            }
        })
    }

    componentDidMount() {
        this.getTodoCount();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image source={require('/home/jsathu/ReactNative/MYAPPS/TODO/assets/todo.png')} style={styles.image} />

                <Text style={styles.title}>MY TODO APP</Text>

                <Button rounded light style={styles.buttonBottom} onPress={() => {
                    this.props.navigation.navigate('TODO');
                }}>
                    <Text style={styles.text}>  {this.state.todoCount}</Text>
                </Button>

                <Text style={styles.version}>v 1.0</Text>
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
        fontSize: 16,
        fontWeight: "bold"
    },
    title: {
        color: "#fff",
        alignSelf: "center",
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 25
    },
    buttonBottom: {
        width: 150,
        marginTop: 100,
        alignSelf: "center"
    },
    image: {
        marginTop: 30,
        width: 280,
        height: 280,
        alignSelf: "center",
    },
    version: {
        fontSize: 20,
        color: 'green',
        alignItems: "center",
        alignSelf: "center",
        marginTop: 50
    }
});
