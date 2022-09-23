import React, { useCallback, useContext, useState } from 'react'
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, Button, FlatList, View, Image, Linking, ActivityIndicator } from 'react-native';
import { apiCall, AppContext } from '../App';

let pageNo = 1;
export default function Homescreen({ navigation }) {

    const { data, setData } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false)

    const LoadingData = () => <View>
        {isLoading && <ActivityIndicator />}
        {isLoading && <Text>Loading more</Text>}
    </View>
    const renderList = useCallback(({ item, index }) => {

        return <View style={{ flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center', }}>
            {/**  
                         * Title: "Batman Begins",
                            Year: "2005",
                            imdbID: "tt0372784",
                            Type: "movie",
                            Poster: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
                         * 
                         * */ }
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', width: '100%', backgroundColor: '#f7f1f1', borderRadius: 15 }}>

                <Image
                    style={{ width: 75, height: 75, borderRadius: 15 }}
                    source={item.Poster ? { uri: item.Poster } : require('../assets/tiny_logo.png')
                    }

                />
                <TouchableOpacity
                    style={{ flexDirection: 'row', padding: 1, alignItems: 'center', margin: 5, flex: 1, borderWidth: 1 }}
                    onPress={() => {
                        console.log(item, ' outside')
                    }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', width: '50%', }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', width: '100%', }}>



                            <Text style={{ textAlign: 'left', width: '100%', fontSize: 15 }}>{item.Title} </Text>



                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1, width: '100%', }}>
                            <Text style={{ textAlign: 'left', width: '100%' }}>  {item.Type}, {item.Year}</Text>
                        </View>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ padding: 1, margin: 5, textAlign: 'left', width: '15%', justifyContent: 'center', height: '69%', borderRadius: 15, overflow: 'hidden', }}
                    onPress={() => {
                        console.log(item, 'inside')
                        Linking.openURL('https://www.imdb.com/title/' + item.imdbID)
                    }}>
                    {/* 
                    <Text style={{ color: '#000', alignSelf: 'baseline', height: '50%', textAlign: 'center', textAlignVertical: 'center' }}>IMDB</Text> */}
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                        source={require('../assets/IMDB_Logo.png')} />
                </TouchableOpacity>
            </View>

        </View>

    })

    const EmptyComp = () => <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Movies available</Text>
    </View>

    const loadMoreData = async () => {
        // setData
        setIsLoading(true)
        pageNo++
        await apiCall(pageNo, setData)
        setIsLoading(false)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={data}
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
    textStyle: { color: '#000', borderColor: 'yellow', backgroundColor: 'orange', padding: 10 }
})