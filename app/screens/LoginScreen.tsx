import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Button, TextInput } from "@react-native-material/core";
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({navigation}: {
  navigation: any
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
            axios.post('http://localhost:3000/api/auth/login', values).then((res)=>{
              console.log(res.data);
              if (res.data.mfaRequired) {
                
                    navigation.navigate('MFAVerification', { mfaMethod: res.data.mfaMethod, email: values.username });
                 
              } else {
                localStorage.setItem('token', res.data.token)
                navigation.navigate('Home');
              }
            })
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <Text style={styles.title}>Login with your account</Text>
              <TextInput
                 variant='outlined'
                placeholder="Enter your username"
                onChangeText={
                  handleChange('username')
        
                }
                onBlur={() => {
                  handleBlur('username');
                  console.log('rrr', values)

                }}
                value={values.username}
                // errorMessage={errors.username && touched.username ? errors.username : ''}
              />
              <TextInput
                variant='outlined'
                placeholder="Enter your password"
                secureTextEntry={hidePassword}
                onChangeText={handleChange('password')}
                onBlur={() => {
                  handleBlur('password');
                }}
                value={values.password}
                // errorMessage={errors.password && touched.password ? errors.password : ''}
              />
              <TouchableOpacity
                // onPress={() => navigation.navigate(['Signup'])}
                style={styles.linkContainer}
              >
                <Text style={styles.link}>Forget Password</Text>
              </TouchableOpacity>
              <Button
                title="Login Now"
                onPress={handleSubmit}
                // disabled={!values.username || !values.password || !!errors.username || !!errors.password}
              />
              {/* <TouchableOpacity
                // onPress={() => navigation.navigate('ResetPassword')}
                style={styles.linkContainer}
              >
                <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity> */}
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    margin: 16,
  },
  form: {
    flexDirection: 'column',
    rowGap:20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  linkContainer: {
    marginVertical: 12,
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;