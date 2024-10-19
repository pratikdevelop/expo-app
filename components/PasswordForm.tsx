import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Modal, 
  Portal, 
  Provider, 
  TextInput, 
  Button, 
  Title, 
  HelperText, 
  Chip 
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import TagInput from './TagInput';

const PasswordForm = ({ visible, onDismiss }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Add password logic here
  };

  return (
      <Portal >
        <Modal visible={visible} onDismiss={onDismiss} style={{backgroundColor:"white"}}>
          <View style={styles.container}>
            <Title>Add Password</Title>
            <View style={styles.form}>
              <Controller
                control={control}
                name="name"
                rules={{ required: true, pattern: /^[A-Za-z0-9 ]+$/ }} // Adjust pattern as needed
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Enter name"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                  />
                )}
              />
              {errors.name && <HelperText type="error">{errors.name.type === 'required' ? 'Name is required' : 'Invalid name format'}</HelperText>}

              <Controller
                control={control}
                name="website"
                rules={{ required: true, pattern: /https?:\/\/[^\s/$.?#].[^\s]*/ }} // Adjust pattern as needed
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="https://example.com"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                  />
                )}
              />
              {errors.website && <HelperText type="error">{errors.website.type === 'required' ? 'Website is required' : 'Invalid website format'}</HelperText>}

              <Controller
                control={control}
                name="username"
                rules={{ required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ }} // Adjust pattern as needed
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="username@example.com"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                  />
                )}
              />
              {errors.username && <HelperText type="error">{errors.username.type === 'required' ? 'Username is required' : 'Invalid email format'}</HelperText>}

              <Controller
                control={control}
                name="password"
                rules={{ required: true, minLength: 8 }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Enter password"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                  />
                )}
              />
              {errors.password && <HelperText type="error">{errors.password.type === 'required' ? 'Password is required' : 'Password must be at least 8 characters long'}</HelperText>}

              <Controller
                control={control}
                name="description"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Enter description"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                    multiline
                  />
                )}
              />
              {errors.description && <HelperText type="error">Description is required</HelperText>}

              {/* Tags section (simple example) */}
              <View style={styles.tagsContainer}>
               <TagInput tags={[]}/>
              </View>
            </View>

            <View style={styles.actions}>
              <Button mode="text" onPress={onDismiss}>Cancel</Button>
              <Button mode="contained" onPress={handleSubmit(onSubmit)}>Add Password</Button>
            </View>
          </View>
        </Modal>
      </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  tag: {
    margin: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default PasswordForm;
