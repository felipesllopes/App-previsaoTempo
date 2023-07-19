import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Home from './src/home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
      <StatusBar backgroundColor={"#444"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
