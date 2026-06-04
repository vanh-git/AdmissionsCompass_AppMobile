import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { RIASECTestScreen } from '@/screens/RIASECTestScreen';
import { CommunityChatScreen } from '@/screens/CommunityChatScreen';
import { useAuth } from '@/context/AuthContext';

type Screen = 'riasec' | 'chat';

export function BottomNavigation() {
  const [activeScreen, setActiveScreen] = useState<Screen>('riasec');
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logout */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Xin chào, {user?.displayName}!
        </Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logout()}
        >
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {/* Screen Content */}
      <View style={styles.content}>
        {activeScreen === 'riasec' && <RIASECTestScreen />}
        {activeScreen === 'chat' && <CommunityChatScreen />}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeScreen === 'riasec' && styles.navItemActive
          ]}
          onPress={() => setActiveScreen('riasec')}
        >
          <Text style={styles.navIcon}>📝</Text>
          <Text style={[
            styles.navLabel,
            activeScreen === 'riasec' && styles.navLabelActive
          ]}>
            RIASEC
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navItem,
            activeScreen === 'chat' && styles.navItemActive
          ]}
          onPress={() => setActiveScreen('chat')}
        >
          <Text style={styles.navIcon}>💬</Text>
          <Text style={[
            styles.navLabel,
            activeScreen === 'chat' && styles.navLabelActive
          ]}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fee2e2',
    borderRadius: 6,
  },
  logoutText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    height: 60,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  navItemActive: {
    backgroundColor: '#f0fdf4',
    borderTopWidth: 3,
    borderTopColor: '#059669',
  },
  navIcon: {
    fontSize: 24,
  },
  navLabel: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#059669',
  },
});
