/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerMenu = (props: any) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
          <Text style={styles.headerSubtitle}>Citizen Dashboard</Text>
        </View>

        <DrawerItem
          label="Donations"
          labelStyle={styles.drawerLabel}
          // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-unused-vars
          icon={({ color, size }) => (
            <Icon name="heart-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => { /* Navigate to Donations screen if needed */ }}
        />
        <DrawerItem
          label="Simulation Drills"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Icon name="gamepad-variant-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => { /* Navigate to Drills screen */ }}
        />
        <DrawerItem
          label="Resources"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Icon name="book-open-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => { /* Navigate to Resources screen */ }}
        />
        <DrawerItem
          label="All Reports"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Icon name="file-document-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => { /* Navigate to All Reports screen */ }}
        />
        <DrawerItem
          label="Missing Person Finder"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Icon name="magnify" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => { /* Navigate to Missing Person Finder screen */ }}
        />
        <DrawerItem
          label="Settings"
          labelStyle={styles.drawerLabel}
          icon={({ color, size }) => (
            <Icon name="cog-outline" size={size} color="#138D35" />
          )}
          style={styles.drawerItem}
          onPress={() => { /* Navigate to Settings screen */ }}
        />
        <DrawerItem
          label="Logout"
          labelStyle={[styles.drawerLabel, styles.logoutLabel]}
          icon={({ color, size }) => (
            <Icon name="logout" size={size} color="#D45348" />
          )}
          style={styles.drawerItem}
          onPress={() => { navigation.navigate('Login') }} // Navigate back to Login
        />
      </DrawerContentScrollView>

      <View style={styles.bottomStatus}>
        <View style={styles.onlineIndicator} />
        <Text style={styles.statusText}>Online • All services active</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  drawerItem: {
    marginVertical: 0,
  },
  drawerLabel: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: -20,
  },
  logoutLabel: {
    color: '#D45348',
  },
  bottomStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#138D35',
    marginRight: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
});

export default DrawerMenu;