import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import NicknameScreen from './screens/NicknameScreen';
import GenderScreen from './screens/GenderScreen';
import BirthdayScreen from './screens/BirthdayScreen';

const Stack = createStackNavigator();

const firstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Your Tarot Journey</Text>
      <Text style={styles.description}>
        Log in to unlock all features. To better understand you and provide personalized Tarot guidance, we'll ask you a few questions. Then, choose your favorite Tarot deck and embark on your spiritual journey.
      </Text>
      <Button 
      title="Login" 
      color="#6495ED" 
      onPress={() => {
        console.log("Button pressed!");
        navigation.navigate('Login');
      }}
      />
    </View>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'black' }
        }}
      >
        <Stack.Screen name="Home" component={firstScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Nickname" component={NicknameScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="Birthday" component={BirthdayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default App;
