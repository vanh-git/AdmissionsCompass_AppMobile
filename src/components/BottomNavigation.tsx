import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { CommunityChatScreen } from '@/screens/CommunityChatScreen';
import { HomeScreen } from '@/screens/HomeScreenNew';
import { NumerologyScreen } from '@/screens/NumerologyScreen';
import { RIASECTestScreen } from '@/screens/RIASECTestScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

type Screen = 'home' | 'riasec' | 'chat' | 'numerology' | 'settings';

export function BottomNavigation() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const { user, logout } = useAuth();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.backgroundElement, borderBottomColor: colors.backgroundSelected }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {activeScreen === 'home' && '🎯 Trang Chủ'}
            {activeScreen === 'riasec' && '📝 Kiểm Tra RIASEC'}
            {activeScreen === 'chat' && '💬 Trò Chuyện'}
            {activeScreen === 'numerology' && '🔮 Thần Số Học'}
            {activeScreen === 'settings' && '⚙️ Cài Đặt'}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Xin chào, {user?.displayName}!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logout()}
        >
          <Text style={styles.logoutText}>🚪</Text>
        </TouchableOpacity>
      </View>

      {/* Screen Content */}
      <View style={styles.content}>
        {activeScreen === 'home' && <HomeScreen onStartTest={() => setActiveScreen('riasec')} onOpenChat={() => setActiveScreen('chat')} />}
        {activeScreen === 'riasec' && <RIASECTestScreen />}
        {activeScreen === 'chat' && <CommunityChatScreen />}
        {activeScreen === 'numerology' && <NumerologyScreen />}
        {activeScreen === 'settings' && <SettingsScreen />}
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: colors.backgroundElement, borderTopColor: colors.backgroundSelected }]}>
        <TouchableOpacity
          style={[
            styles.navItem,
            activeScreen === 'home' && styles.navItemActive
          ]}
          onPress={() => setActiveScreen('home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[
            styles.navLabel,
            activeScreen === 'home' && styles.navLabelActive
          ]}>
            Trang Chủ
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

        <TouchableOpacity
          style={[
            styles.navItem,
            activeScreen === 'numerology' && styles.navItemActive
          ]}
          onPress={() => setActiveScreen('numerology')}
        >
          <Text style={styles.navIcon}>🔮</Text>
          <Text style={[
            styles.navLabel,
            activeScreen === 'numerology' && styles.navLabelActive
          ]}>
            Thần Số
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navItem,
            activeScreen === 'settings' && styles.navItemActive
          ]}
          onPress={() => setActiveScreen('settings')}
        >
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={[
            styles.navLabel,
            activeScreen === 'settings' && styles.navLabelActive
          ]}>
            Cài Đặt
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    // No specific styling needed, active state is shown via text color
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9ca3af',
  },
  navLabelActive: {
    color: '#059669',
    fontWeight: '600',
  },
});
