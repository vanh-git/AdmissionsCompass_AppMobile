import { BottomNavigation } from '@/components/BottomNavigation';
import { useAuth } from '@/context/AuthContext';
import { LoginScreen } from '@/screens/LoginScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

export default function AppRoot() {
  const { user, loading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        if (Platform.OS === 'web') {
          // Always show onboarding on web for continuous checking
          setShowOnboarding(true);
          return;
        }

        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        setShowOnboarding(seen !== 'true');
      } catch (e) {
        setShowOnboarding(true);
      }
    };
    checkOnboarding();
  }, []);

  if (loading || showOnboarding === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  if (showOnboarding) {
    return (
      <OnboardingScreen
        onComplete={async () => {
          if (Platform.OS === 'web') {
            // On web: allow user to proceed to Login but keep onboarding shown on fresh opens
            setShowOnboarding(false);
            return;
          }
          await AsyncStorage.setItem('hasSeenOnboarding', 'true');
          setShowOnboarding(false);
        }}
      />
    );
  }

  if (!user) {
    return <LoginScreen />;
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

