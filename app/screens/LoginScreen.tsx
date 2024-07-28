import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigation = useNavigation();

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
            // navigation.navigate('Home');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form} >
              <Text style={styles.title}>Login with your account</Text>
              <Input
              style={{borderWidth: 0}}
                placeholder="Enter your username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                errorMessage={errors.username && touched.username ? errors.username : ''}
              />
              <Input
              style={{borderWidth: 0}}

                placeholder="Enter your password"
                secureTextEntry={hidePassword}
                rightIcon={{
                  type: 'material',
                  name: hidePassword ? 'visibility-off' : 'visibility',
                  onPress: togglePasswordVisibility,
                }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={errors.password && touched.password ? errors.password : ''}
              />
              <TouchableOpacity
                // onPress={() => navigation.navigate(['Signup'])}
                style={styles.linkContainer}
              >
                <Text style={styles.link}>Not have an account? Signup now</Text>
              </TouchableOpacity>
              <Button
                title="Login Now"
                // onPress={handleSubmit}
                disabled={!values.username || !values.password || !!errors.username || !!errors.password}
              />
              <TouchableOpacity
                // onPress={() => navigation.navigate('ResetPassword')}
                style={styles.linkContainer}
              >
                <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity>
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
    flexDirection: 'row',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 200,
  },
  form: {
    flexDirection: 'column',
    rowGap:20
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight:800,
    marginBottom: 16,
  },
  linkContainer: {
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  link: {
    color: '#1e90ff',
    fontSize: 14,
  },
});

export default LoginScreen;
