import { StatusBar } from 'expo-status-bar/src/StatusBar';
import { StyleSheet, Text, View } from 'react-native';
import SpecifiedView from './components/SpecifiedView';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DetailPage from './pages/DetailPage';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" options={{ title: 'Home', headerShown: false }} component={HomePage} />
      <Stack.Screen name="Detail" component={DetailPage} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'Category') {
                  iconName = focused ? 'list' : 'list-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeStackScreen} />
            <Tab.Screen name="Category" component={CategoryPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}