/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, createContext, useEffect } from 'react';
import type { Node } from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Homescreen from './screens/Homescreen';
import { LogBox } from "react-native"
import { constants } from './Constant';
import SplashScreen from './screens/SplashScreen';

LogBox.ignoreAllLogs(true)
export async function apiCall(pageNo, setData) {
  const resp = await fetch("http://www.omdbapi.com/?s=Batman&apikey=eeefc96f&page=" + pageNo)
  const data = await resp.json();
  console.log(typeof data.Search);
  setData(prev => {
    console.log(prev);
    return [...prev, ...data.Search]
  });
}

export const AppContext = createContext();
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState([
    {
      Title: "Batman Begins",
      Year: "2005",
      imdbID: "tt0372784",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
    },
  ])

  const datas = [{
    "Title": "Batman Begins",
    "Year": "2005",
    "imdbID": "tt0372784",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
  },]

  // is it?

  useEffect(() => {
    console.log('useeffect run');
    apiCall(1, setData)
  }, [])

  const Stack = createNativeStackNavigator();
  return (
    <AppContext.Provider value={{
      data,
      setData
    }}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}

        >
          <Stack.Screen name={constants.Splash} component={SplashScreen} />
          <Stack.Screen name={constants.home} component={Homescreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
