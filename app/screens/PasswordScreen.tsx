import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DataTable, TextInput, Button } from 'react-native-paper';
import { Menu, IconButton } from 'react-native-paper';

const PasswordScreen = () => {
  const [password, setPassword] = useState<any[]>([]);
  const [search, setsearch] = useState<string | undefined>();
  const [visible, setVisible] = useState<string | null>(null); // To control the visibility of the menu
  const [currentItem, setCurrentItem] = useState<any>(null); // To store the current item for menu actions

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/passwords?search=${search}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res:{
        data: {
          data: any[];
        };
      }) => {
        console.log('ff', res);
        
        setPassword(res.data.data);
      });
  }, [search]);

  const openMenu = (itemId: string) => {
    setVisible(itemId);
  };

  const closeMenu = () => setVisible(null);

  const handleAction = (action: string) => {
    if (action === 'launch') {
      // Implement launch action
    } else if (action === 'edit') {
      // Implement edit action
    } else if (action === 'delete') {
      // Implement delete action
    } else if (action === 'share') {
      // Implement share action
    } else if (action === 'view') {
      // Implement view action
    }
    closeMenu();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="Search"
          onChangeText={setsearch}
          value={search}
          style={styles.searchInput}
        />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.columnWebsite}>Website</DataTable.Title>
            <DataTable.Title style={styles.columnUsername}>Username</DataTable.Title>
            <DataTable.Title style={styles.columnActions}>Actions</DataTable.Title>
          </DataTable.Header>

          {password.map((item: any) => (
            <DataTable.Row key={item._id}>
              <DataTable.Cell style={styles.columnWebsite}>{item.website}</DataTable.Cell>
              <DataTable.Cell style={styles.columnUsername}>{item.username}</DataTable.Cell>
              <DataTable.Cell style={styles.columnActions}>
                <IconButton
                  icon="dots-vertical"
                  size={24}
                  onPress={() => openMenu(item._id)}
                />
                <Menu
                  visible={visible === item._id}
                  onDismiss={closeMenu}
                  anchor={<View />}
                >
                  <Menu.Item
                    onPress={() => handleAction('launch')}
                    title="Launch"
                    leadingIcon="launch"
                  />
                  {(!item.sharedItem || item.sharedItem?.permissions?.edit) && (
                    <Menu.Item
                      onPress={() => handleAction('edit')}
                      title="Edit password"
                      leadingIcon="pencil"
                    />
                  )}
                  {(!item.sharedItem || item.sharedItem?.permissions?.delete) && (
                    <Menu.Item
                      onPress={() => handleAction('delete')}
                      title="Delete password"
                      leadingIcon="delete"
                    />
                  )}
                  {!item.sharedItem && (
                    <Menu.Item
                      onPress={() => handleAction('share')}
                      title="Share password"
                      leadingIcon="share"
                    />
                  )}
                  {(!item.sharedItem || item.sharedItem?.permissions?.view) && (
                    <Menu.Item
                      onPress={() => handleAction('view')}
                      title="View password"
                      leadingIcon="eye"
                    />
                  )}
                </Menu>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  searchInput: {
    marginBottom: 20,
  },
  columnWebsite: {
    flex: 2,
  },
  columnUsername: {
    flex: 3,
  },
  columnActions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PasswordScreen;
