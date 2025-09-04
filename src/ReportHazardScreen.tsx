import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const eventTypes = ['Tsunami', 'High Wave', 'Flooding', 'Storm Surge', 'SOS', 'Other'];
const reportCategories = ['Observation', 'SOS'];

const ReportHazardScreen = () => {
  const navigation = useNavigation<any>();
  const [eventType, setEventType] = useState('');
  const [reportCategory, setReportCategory] = useState('Observation');
  const [description, setDescription] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<any[]>([]); // New state for media files

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    setLoadingLocation(true);
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingLocation(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {
        Alert.alert('Location Error', 'Failed to get your location. Please check your permissions.');
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleMediaUpload = (type: 'photo' | 'video') => {
    launchImageLibrary({
      mediaType: type,
      quality: 1,
      selectionLimit: 5, // Allow up to 5 files to be selected
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets) {
        const newFiles = response.assets.map(asset => ({
          uri: asset.uri,
          fileName: asset.fileName,
          type: asset.type?.startsWith('photo') ? 'Image' : 'Video'
        }));
        setMediaFiles(prevFiles => [...prevFiles, ...newFiles]);
      }
    });
  };

  const handleReport = () => {
    if (!eventType || !description || !coords) {
      Alert.alert('Incomplete Form', 'Please fill all required fields and ensure location is found.');
      return;
    }
    // Logic to send data to your backend
    const reportData = {
      eventType,
      reportCategory,
      description,
      locationDescription,
      latitude: coords.latitude,
      longitude: coords.longitude,
      mediaFiles: mediaFiles.map(file => ({
        type: file.type,
        fileName: file.fileName,
        uri: file.uri,
      }))
    };
    console.log('Hazard Report Data:', reportData);
    // Simulate API call
    Alert.alert('Report Submitted!', 'Your hazard report has been submitted successfully.');
    navigation.goBack(); // Navigate back to the Dashboard
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Hazard</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>Event Type *</Text>
        <View style={styles.selectorContainer}>
          {eventTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.selectorButton,
                eventType === type && styles.selectorButtonActive,
              ]}
              onPress={() => setEventType(type)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  eventType === type && styles.selectorButtonTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>Report Category *</Text>
        <View style={styles.selectorContainer}>
          {reportCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.selectorButton,
                reportCategory === category && styles.selectorButtonActive,
              ]}
              onPress={() => setReportCategory(category)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  reportCategory === category && styles.selectorButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>Description *</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Describe the hazard"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.inputLabel}>Your Location *</Text>
        <View style={styles.locationContainer}>
          {loadingLocation ? (
            <ActivityIndicator size="small" color="#138D35" />
          ) : coords ? (
            <Text style={styles.locationText}>
              Lat: {coords.latitude.toFixed(4)}, Long: {coords.longitude.toFixed(4)}
            </Text>
          ) : (
            <Text style={styles.locationText}>Location not available</Text>
          )}
          <TouchableOpacity onPress={fetchUserLocation} style={styles.refreshButton}>
            <Icon name="refresh" size={20} color="#138D35" />
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.inputLabel}>Location Description (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Near Marina Beach"
          value={locationDescription}
          onChangeText={setLocationDescription}
        />
        
        {/* New Media Upload Section */}
        <Text style={styles.inputLabel}>Upload Media (Optional)</Text>
        <View style={styles.uploadButtonsContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleMediaUpload('photo')}
          >
            <Icon name="image-outline" size={24} color="#333" />
            <Text style={styles.uploadButtonText}>Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleMediaUpload('video')}
          >
            <Icon name="video-outline" size={24} color="#333" />
            <Text style={styles.uploadButtonText}>Video</Text>
          </TouchableOpacity>
        </View>
        
        {mediaFiles.length > 0 && (
          <View style={styles.mediaPreviewContainer}>
            <Text style={styles.mediaPreviewTitle}>Selected Files:</Text>
            {mediaFiles.map((file, index) => (
              <View key={index} style={styles.mediaItem}>
                {file.type === 'Image' ? (
                  <Image source={{ uri: file.uri }} style={styles.mediaImage} />
                ) : (
                  <View style={styles.videoPlaceholder}>
                    <Icon name="play-circle-outline" size={24} color="#fff" />
                    <Text style={styles.videoPlaceholderText}>Video</Text>
                  </View>
                )}
                <Text style={styles.mediaFileName}>{file.fileName}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.mainButton} onPress={handleReport}>
          <Text style={styles.mainButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  inputLabel: {
    width: '100%',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 15,
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectorButton: {
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: '30%',
    alignItems: 'center',
  },
  selectorButtonActive: {
    backgroundColor: '#D4EDDA',
    borderColor: '#138D35',
  },
  selectorButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  selectorButtonTextActive: {
    color: '#138D35',
  },
  descriptionInput: {
    height: 100,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  refreshText: {
    marginLeft: 5,
    color: '#138D35',
  },
  input: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingVertical: 15,
    width: '48%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  uploadButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  mediaPreviewContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fafafa',
  },
  mediaPreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mediaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mediaImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  videoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholderText: {
    color: '#fff',
    fontSize: 12,
  },
  mediaFileName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  mainButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#138D35",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ReportHazardScreen;