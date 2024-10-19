import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextInput } from "@react-native-material/core";
import { loginUser } from '../../store/actions/authAction'; // Adjust the import based on your structure
import store from '@/store/store';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const res: any = await store.dispatch(loginUser(data.username, data.password));
      
      if (res.mfaRequired) {
        navigation.navigate('MFAVerification', { mfaMethod: res.mfaMethod, email: data.username });
      } else if (res.success) {
        navigation.navigate('Home');
      } else {
        setSnackbarMessage(res?.message);
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setSnackbarMessage('Login failed. Please try again.');
      setSnackbarVisible(true);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login with your account</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              variant='outlined'
              placeholder="Enter your username"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              helperText={errors.username?.message}
            />
          )}
        />
        
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              variant='outlined'
              placeholder="Enter your password"
              secureTextEntry={hidePassword}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              helperText={errors.password?.message}
            />
          )}
        />
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.linkContainer}
        >
          <Text style={styles.link}>Need an account</Text>
        </TouchableOpacity>
        
        <Button
          title="Login Now"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || !!Object.keys(errors).length}
        />
        
        <TouchableOpacity
          // onPress={() => navigation.navigate('ResetPassword')}
          style={styles.linkContainer}
        >
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
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
