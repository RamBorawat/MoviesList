import React, { useCallback, useContext, useState, useEffect } from 'react'
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Button, FlatList, View, Image, Linking, ActivityIndicator, Modal, Pressable, TextInput } from 'react-native';
import { apiCall, AppContext } from '../App';
let pageNo = 1;
export default function Homescreen({ navigation }) {

    const { data, setData } = useContext(AppContext);
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [movieDetails, setMovieDetails] = useState({
        Title: "Batman Begins",
        Year: "2005",
        imdbID: "tt0372784",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
    })
    const [temp, setTemp] = useState('')
    const LoadingData = () => <View style={{ justifyContent: 'center', alignItems: 'center', margin: 30 }}>
        {isLoading && <ActivityIndicator size={50} />}
        {isLoading && <Text>Loading more</Text>}
    </View>
    const renderList = useCallback(({ item, index }) => {
        return <View style={styles.renderViewStyle}>
            <View style={styles.containerView}>
                <Image
                    style={{ width: 75, height: 75, borderRadius: 15 }}
                    source={item.Poster ? { uri: item.Poster } : require('../assets/tiny_logo.png')
                    }
                />
                <TouchableOpacity
                    style={styles.touchableStyle}
                    onPress={() => {
                        let currentMovie = {
                            Title: item.Title,
                            Year: item.Year,
                            imdbID: item.imdbID,
                            Type: item.Type,
                            Poster: item.Poster
                        }
                        setMovieDetails(prev => currentMovie)
                        setModalVisible(!modalVisible)
                    }}>
                    <View style={styles.touchableInsideView}>
                        <View style={styles.titleView}>
                            <Text style={styles.textTitle}>{item.Title} </Text>
                        </View>
                        <View style={styles.typeView}>
                            <Text style={styles.typeAndYear}>{item.Type}, {item.Year}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.imdbClick}
                    onPress={() => Linking.openURL('https://www.imdb.com/title/' + item.imdbID)}>
                    <Image
                        style={styles.imdbLogo}
                        source={require('../assets/IMDB_Logo.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>

    })

    const EmptyComp = () => <View style={styles.empComp}>
        <Text style={styles.textStyle}>No Movies available</Text>
    </View>

    const loadMoreData = async () => {
        setIsLoading(true)
        pageNo++
        await apiCall(pageNo, setData)
        setIsLoading(false)
    }


    const searchItems = text => {
        console.log(data.length);
        console.log(temp.length);
        const newData = data.filter(item => {
            const itemData = `${item.Title.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setTemp(newData)

    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            style={{ width: 220, height: 275, borderRadius: 15 }}
                            source={{ uri: movieDetails.Poster }
                            }

                        />
                        <Text style={styles.modalText}>{movieDetails.Title}</Text>
                        <Text style={styles.modalText}> Release Year : {movieDetails.Year}</Text>
                        <Text style={styles.modalText}>Type : {movieDetails.Type}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => Linking.openURL('https://www.imdb.com/title/' + movieDetails.imdbID)}>
                                <Text style={styles.textStyle}>View On IMDB b</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Close </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <TextInput
                style={{ height: 60, borderColor: '#000', borderWidth: 1 }}
                placeholder="Search"
                onChangeText={text => {
                    searchItems(text)
                    setQuery(text)
                }}
                value={query}
            />
            <FlatList
                data={temp === '' ? data : temp}
                renderItem={renderList}
                initialNumToRender={10}
                ListEmptyComponent={<EmptyComp />}
                onEndReached={loadMoreData}
                ListFooterComponent={LoadingData}
                onEndReachedThreshold={0.3}
            />
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    textStyle: { color: '#000', borderColor: 'yellow', backgroundColor: 'orange', padding: 10 },
    renderViewStyle: { flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', },
    containerView: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', width: '100%', backgroundColor: '#f7f1f1', borderRadius: 15 },
    touchableStyle: { flexDirection: 'row', padding: 1, alignItems: 'center', margin: 5, flex: 1, },
    touchableInsideView: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', width: '50%', },
    titleView: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', width: '100%', },
    textTitle: { textAlign: 'left', width: '100%', fontSize: 15 }, typeView: { flexDirection: 'row', justifyContent: 'flex-start', flex: 1, width: '100%', },
    typeAndYear: { textAlign: 'left', width: '100%' },
    imdbClick: { padding: 1, margin: 5, textAlign: 'left', width: '15%', justifyContent: 'center', height: '69%', borderRadius: 15, overflow: 'hidden', },
    imdbLogo: { width: '100%', height: '100%', resizeMode: 'stretch' },
    empComp: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "lightyellow",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#f7f8f9"
    },
    buttonClose: {
        backgroundColor: 'black',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

})