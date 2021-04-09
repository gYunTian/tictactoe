import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import 'react-native-gesture-handler';
import { Board } from './src/components/board'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{marginTop: 20}}> App </Text>
      <Board/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


