import BottomDrawerExample from "@/components/BottomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  TextInput,
  IconButton,
  List,
  Button,
  Dialog,
  Portal,
  Text,
} from "react-native-paper"; // Import Button from react-native-paper
import PasswordViewScreen from "./PasswordViewScreen";
// import Dialog, {
//   DialogContent,
//   SlideAnimation,
// } from "react-native-popup-dialog";

import service from "./../../services/passwordservice"; // Adjust the import path as necessary
import AntDesign from "@expo/vector-icons/AntDesign";
import PasswordForm from "@/components/PasswordForm";
const PasswordScreen = ({ navigation }: any) => {
  const Drawer = createDrawerNavigator();
  const [passwords, setPasswords] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [visibleMenu, setVisibleMenu] = useState<string | null>(null);
  const [password, setPassword] = useState<any>(null);
  const [openDrawer, setDrawerOpen] = useState<boolean>(false);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    getPasswords();
  }, [search]);

  const getPasswords = async () => {
    try {
      const data = await service.fetchPasswords(search);
      setPasswords(data);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  const openMenu = (item: any) => {
    if (item._id === visibleMenu) {
      setVisibleMenu(null);
    } else {
      setVisibleMenu(item._id);
      setPassword(item);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!openDrawer);
  };

  const closeMenu = (_action: string) => {
    if (_action === "delete") {
      // Handle delete action if needed
    }
    setDrawerOpen(true);
    setVisibleMenu(null);
  };

  const toggleFavourite = async (passwordId: string) => {
    try {
      await service.fetchPasswords(passwordId);
      getPasswords();
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  function hideDialog(): void {
    setShowModel(false)
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
          style={styles.searchInput}
        />
        {passwords.map((item) => (
          <List.Item
            key={item._id}
            titleStyle={{ fontWeight: "bold", textTransform: "capitalize" }}
            title={`${item.website} ${showModel}`}
            description={item.username}
            left={(props: any) => (
              <IconButton
                icon="star"
                iconColor={item.isFavorite ? "yellow" : "gray"}
                size={24}
                onPress={() => toggleFavourite(item._id)}
              />
            )}
            right={(props: any) => (
              <TouchableOpacity onPress={() => openMenu(item)}>
                <AntDesign name="setting" size={24} color="black" />
              </TouchableOpacity>
            )}
          />
        ))}
      </View>
      <PasswordForm visible={showModel} onDismiss={hideDialog} />
      <PasswordViewScreen
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        password={password}
      />
      {visibleMenu ? <BottomDrawerExample closeMenu={closeMenu} /> : null}

      <TouchableOpacity
        style={styles.newPasswordButton}
        onPress={() => setShowModel(true)}
      >
        <AntDesign name="pluscircle" size={36} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  searchInput: {
    marginBottom: 20,
  },
  newPasswordButton: {
    borderRadius: 4,
    position: "absolute",
    bottom: 10,
    right: 10,
    color: "#ff55d3",
    alignItems: "center",
  },
  newPasswordButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PasswordScreen;
