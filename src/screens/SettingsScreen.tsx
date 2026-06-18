import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

export function SettingsScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(scheme === 'dark');
  const [showChangeNameModal, setShowChangeNameModal] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || '');

  const handleLogout = () => {
    Alert.alert(
      'Xác Nhận Đăng Xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', onPress: () => {}, style: 'cancel' },
        { 
          text: 'Đăng Xuất', 
          onPress: async () => {
            await logout();
          },
          style: 'destructive'
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Xóa Bộ Nhớ Đệm',
      'Điều này sẽ xóa tất cả dữ liệu cache. Bạn có chắc chắn?',
      [
        { text: 'Hủy', onPress: () => {}, style: 'cancel' },
        { 
          text: 'Xóa', 
          onPress: () => {
            Alert.alert('Thành Công', 'Bộ nhớ đệm đã được xóa');
          },
          style: 'destructive'
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            ⚙️ Cài Đặt
          </Text>
        </View>

        {/* User Profile Section */}
        <View style={[styles.section, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            👤 Hồ Sơ Của Tôi
          </Text>

          <View style={styles.profileContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarEmoji}>👤</Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {user?.displayName || 'Người Dùng'}
              </Text>
              <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                {user?.email}
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.settingButton, { borderColor: colors.backgroundSelected }]}
            onPress={() => setShowChangeNameModal(true)}
          >
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              ✏️ Đổi Tên Hiển Thị
            </Text>
            <Text style={[styles.settingArrow, { color: colors.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={[styles.section, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🎨 Tùy Chỉnh
          </Text>

          <View style={[styles.settingRow, { borderBottomColor: colors.backgroundSelected }]}>
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                🔔 Thông Báo
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Nhận cảnh báo về cơ hội học tập mới
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#d1d5db', true: '#10b981' }}
              thumbColor={notifications ? '#059669' : '#9ca3af'}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                🌙 Chế Độ Tối
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Bật chế độ tối để bảo vệ mắt
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#d1d5db', true: '#10b981' }}
              thumbColor={darkMode ? '#059669' : '#9ca3af'}
            />
          </View>
        </View>

        {/* App Info Section */}
        <View style={[styles.section, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            ℹ️ Về Ứng Dụng
          </Text>

          <TouchableOpacity 
            style={[styles.settingButton, { borderColor: colors.backgroundSelected }]}
          >
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                📱 Phiên Bản
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                v1.0.0
              </Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              Mới nhất
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingButton, { borderColor: colors.backgroundSelected }]}
          >
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                👥 Người Dùng
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Tổng số lượt truy cập
              </Text>
            </View>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              12.5K+
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingButton, { borderColor: colors.backgroundSelected }]}
          >
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                ⭐ Đánh Giá
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Đánh giá ứng dụng của chúng tôi
              </Text>
            </View>
            <Text style={[styles.settingArrow, { color: colors.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={[styles.section, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            💬 Hỗ Trợ & Phản Hồi
          </Text>

          <TouchableOpacity 
            style={[styles.settingButton, { borderColor: colors.backgroundSelected }]}
          >
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                ❓ Câu Hỏi Thường Gặp
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Xem các câu hỏi thường được hỏi
              </Text>
            </View>
            <Text style={[styles.settingArrow, { color: colors.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingButton, { borderColor: colors.backgroundSelected }]}
          >
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                📧 Liên Hệ Chúng Tôi
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Gửi phản hồi hoặc báo cáo sự cố
              </Text>
            </View>
            <Text style={[styles.settingArrow, { color: colors.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingButton, { borderColor: colors.backgroundSelected }]}
          >
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                📋 Điều Khoản & Điều Kiện
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Đọc các điều khoản dịch vụ
              </Text>
            </View>
            <Text style={[styles.settingArrow, { color: colors.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingButton, { borderColor: colors.backgroundSelected }]}
          >
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                🔒 Chính Sách Bảo Mật
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Xem cách chúng tôi bảo vệ dữ liệu
              </Text>
            </View>
            <Text style={[styles.settingArrow, { color: colors.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Storage Section */}
        <View style={[styles.section, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            💾 Bộ Nhớ
          </Text>

          <View style={styles.storageInfo}>
            <View>
              <Text style={[styles.storageLabel, { color: colors.text }]}>
                Dung Lượng Sử Dụng
              </Text>
              <Text style={[styles.storageValue, { color: colors.text }]}>
                24 MB / 1 GB
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.clearButton, { backgroundColor: colors.backgroundSelected }]}
              onPress={handleClearCache}
            >
              <Text style={[styles.clearButtonText, { color: colors.text }]}>
                Xóa Cache
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={[styles.section, { backgroundColor: colors.backgroundElement }]}>
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={handleLogout}
          >
            <Text style={styles.dangerButtonText}>🚪 Đăng Xuất</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Admissions Compass © 2024
          </Text>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Giúp bạn khám phá con đường tương lai
          </Text>
        </View>
      </ScrollView>

      {/* Change Name Modal */}
      <Modal
        visible={showChangeNameModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowChangeNameModal(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                ✏️ Đổi Tên Hiển Thị
              </Text>
              <TouchableOpacity onPress={() => setShowChangeNameModal(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: colors.backgroundElement,
                  color: colors.text,
                  borderColor: colors.backgroundSelected
                }
              ]}
              placeholder="Nhập tên mới"
              placeholderTextColor={colors.textSecondary}
              value={newName}
              onChangeText={setNewName}
            />

            <View style={styles.modalButtonGroup}>
              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: colors.backgroundSelected }]}
                onPress={() => setShowChangeNameModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>
                  Hủy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: '#059669' }]}
                onPress={() => {
                  setShowChangeNameModal(false);
                  Alert.alert('Thành Công', 'Tên của bạn đã được cập nhật');
                }}
              >
                <Text style={[styles.modalButtonText, { color: '#ffffff' }]}>
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 12,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 12,
  },
  settingValue: {
    fontSize: 12,
  },
  settingArrow: {
    fontSize: 16,
  },
  storageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storageLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  storageValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dangerButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalCloseButton: {
    fontSize: 24,
    fontWeight: '600',
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
