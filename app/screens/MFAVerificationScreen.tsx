import axios from 'axios';
import React, { useState } from 'react';
import {  Text, TextInput, Button } from '@react-native-material/core' ;
import { View, StyleSheet } from 'react-native';

const MFAVerificationScreen = ({ navigation, route }:
    {
        navigation: any,
        route: any
        }
) => {
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState(null);
  const email = route.params.email;
  console.log('email', email);
  

  const handleVerifyMfaCode = () => {
    const apiUrl = 'http://localhost:3000/api/auth/verify-mfa';
    axios.post(apiUrl, { mfaCode, email })
      .then((res: { data: { token: string; }; }) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token)
        navigation.navigate('Home');
      })
      .catch((error: { message: any; }) => {
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MFA Verification</Text>
      <Text style={styles.message}>Enter the MFA code sent to your email ({email}):</Text>
      <TextInput
        style={styles.input}
        value={mfaCode}
        onChangeText={(text: any) => setMfaCode(text)}
        placeholder="MFA Code"
        keyboardType="numeric"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Verify" onPress={handleVerifyMfaCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default MFAVerificationScreen;