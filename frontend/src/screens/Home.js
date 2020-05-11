import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import firebase from '../components/firebase';

export default function Home(props) {
    const [user, setuser] = useState("Petra")
    const [plants, setPlants] = useState([]);
    const { navigate } = props.navigation;

    console.disableYellowBox = true;

    // retrieving firebase data and inserting it to "plants" list
    useEffect(() => {
        firebase.database().ref('omatkasvit/').on('value', snapshot => {
            const plants = Object.values(snapshot.val());
            setPlants(plants);
        });
    }, []);

    const handleSelect = (item) => {
        navigate('MyPlant', { plant: item })
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.top} >
                <Text style={styles.top}>Huomenta {user}!</Text>
            </View>
            <View style={styles.middle}>
                <View style={styles.middleheader}>
                    <Text style={styles.header}>Omat kasvini</Text>
                </View>
                <FlatList
                    horizontal={true}
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={plants}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.border}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.middletext}>{item.nimi}</Text>
                            <Image style={styles.middleimage} source={require('../assets/flowerpot.png')} />
                        </TouchableOpacity>
                    }
                />
            </View>
            <View style={styles.bottomheader}>
                <Text style={styles.header}>Viimeisimmät tapahtumat</Text>
                <TouchableOpacity
                    onPress={() => navigate('Notifications', { plants })}
                >
                    <Text style={styles.showmore}>Näytä lisää</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <FlatList data={plants}
                    marginLeft={15}
                    renderItem={({ item }) =>
                        <View style={styles.bottomitem}>
                            <View>
                                <Image style={[styles.bottomimage]} source={require('../assets/eaaf7e.png')} />
                            </View>
                            <View style={styles.bottomtext}>
                                <Text style={styles.bottomtext1}>Tänään klo 8.20</Text>
                                <Text style={styles.bottomtext2}>{item.nimi} kasteltu.</Text>
                            </View>
                        </View>

                    }
                />
            </View>
        </ScrollView>
    );
};
Home.navigationOptions = ({ navigate }) => ({ title: 'Home' });

const styles = StyleSheet.create({
    button: {
        paddingBottom: 20
    },
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1,

    },
    top: {
        fontSize: 26,
        marginLeft: 10,
        flex: 1,
        marginTop: 40,
        marginBottom: 30
    },
    middle: {
        fontSize: 14,
        marginLeft: 10,
        flex: 2,
        fontWeight: 'bold',
        shadowColor: "#000",
    },
    middleheader: {
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    header: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5,
        marginBottom: 15
    },
    border: {
        shadowColor: 'rgba(0,0,0, .1)', // IOS
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 3, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        borderRadius: 4,
        margin: 5,
        marginRight: 3,
        marginLeft: 3,
        marginTop: 10,
        backgroundColor: 'white',
        height: 170
    },
    middletext: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        fontWeight: "bold"
    },
    middleimage: {
        width: 150,
        height: 150
    },
    bottomheader: {
        justifyContent: "space-between",
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 30
    },
    showmore: {
        color: '#63816D',
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 15
    },
    bottom: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        flex: 2,
        fontWeight: 'bold',
        fontSize: 14,
        shadowColor: 'rgba(0,0,0, .1)', // IOS
        shadowOffset: { height: 3, width: 2 }, // IOS
        shadowOpacity: 3, // IOS
        shadowRadius: 1, //IOS
        elevation: 3, // android
        backgroundColor: 'white',
        borderRadius: 4
    },
    bottomitem: {
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 10

    },
    bottomimage: {
        width: 30,
        height: 30,
        borderRadius: 40
    },
    bottomtext: {
        marginLeft: 10,
        marginBottom: 10,
        flex: 2
    },
    bottomtext1: {
        marginLeft: 5,
        fontSize: 12,
        color: "#ACACAC",
        fontWeight: "bold"
    },
    bottomtext2: {
        marginLeft: 5,
        fontSize: 16
    }
});
