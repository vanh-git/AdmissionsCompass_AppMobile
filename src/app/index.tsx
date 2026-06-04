import { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { LoginScreen } from '@/screens/LoginScreen';
import { GuideScreen } from '@/screens/GuideScreen';
import { BottomNavigation } from '@/components/BottomNavigation';

export default function AppRoot() {
  const { user, loading } = useAuth();
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // Check if user has seen the guide
    if (user && !showGuide) {
      // Check localStorage or AsyncStorage to see if guide was shown
      setShowGuide(true);
    }
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  if (showGuide) {
    return (
      <GuideScreen onComplete={() => setShowGuide(false)} />
    );
  }

  return <BottomNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
});

