import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import Routes from './src/Routes';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Routes />
      <StatusBar backgroundColor={"#444"} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
