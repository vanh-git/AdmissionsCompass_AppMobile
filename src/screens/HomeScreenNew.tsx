import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { RIASECType } from '@/data/riasec-questions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

interface RIASECResult {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

interface HomeScreenProps {
  onStartTest?: () => void;
  onOpenChat?: () => void;
}

export function HomeScreen({ onStartTest, onOpenChat }: HomeScreenProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [riasecResults, setRiasecResults] = useState<RIASECResult | null>(null);
  const [topTypes, setTopTypes] = useState<RIASECType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('riasecResults');
        if (stored) {
          const results = JSON.parse(stored) as RIASECResult;
          setRiasecResults(results);
          const sorted = (Object.entries(results) as [RIASECType, number][]) 
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([type]) => type);
          setTopTypes(sorted);
        }
      } catch (error) {
        console.error('Error loading RIASEC results:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}> 
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.heroCard, { backgroundColor: colors.backgroundElement }]}> 
          <View style={styles.heroTop}>
            <View style={styles.avatar}> 
              <Text style={styles.avatarEmoji}>👩‍🎓</Text>
            </View>
            <View style={styles.heroText}> 
              <Text style={[styles.title, { color: colors.text }]}>Xin Chào, {user?.displayName ?? 'Minh'}</Text>
            </View>
            <View style={styles.notificationIcon}> 
              <Text style={styles.notificationEmoji}>🔔</Text>
            </View>
          </View>

        </View>

        <View style={styles.section}> 
          <Text style={[styles.sectionHeading, { color: colors.text }]}>Định hướng nghề nghiệp</Text>
          <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}> 
            <Text style={[styles.cardTitle, { color: colors.text }]}>TRẮC NGHIỆM RIASEC</Text>
            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>Khám phá nhóm tính cách phù hợp với đam mê và năng lực cốt lõi của bạn.</Text>
            <View style={[styles.testHero, { backgroundColor: '#064e3b' }]}> 
              <Text style={styles.testHeroText}>BẢN ĐỒ NĂNG LỰC</Text>
            </View>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: '#0f766e' }]} onPress={onStartTest}> 
              <Text style={styles.primaryButtonText}>Bắt đầu làm bài test →</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}> 
          <View style={[styles.card, { backgroundColor: '#ecfdf5' }]}> 
            <View style={styles.numerologyHeader}>
              <View>
                <Text style={styles.numerologyTitle}>THẦN SỐ HỌC</Text>
                <Text style={styles.numerologySubtitle}>Giải mã các con số</Text>
              </View>
              <View style={styles.numerologyBadge}> 
                <Text style={styles.numerologyBadgeText}>9</Text>
              </View>
            </View>
            <View style={styles.numerologyStats}> 
              <View style={[styles.smallCard, { backgroundColor: '#ffffff' }]}> 
                <Text style={styles.smallCardHeading}>Đường đời</Text>
                <Text style={styles.smallCardValue}>Số 7</Text>
              </View>
              <View style={[styles.smallCard, { backgroundColor: '#ffffff' }]}> 
                <Text style={styles.smallCardHeading}>Linh hồn</Text>
                <Text style={styles.smallCardValue}>Số 3</Text>
              </View>
            </View>
            <Text style={styles.numerologyText}>Con số đường đời 7 cho thấy bạn là người có khả năng phân tích sâu sắc và ham học hỏi.</Text>
            <TouchableOpacity style={styles.secondaryButton}> 
              <Text style={styles.secondaryButtonText}>Xem chi tiết bản đồ</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}> 
          <View style={[styles.card, { backgroundColor: '#ecfdf5' }]}> 
            <Text style={[styles.cardTitle, { color: '#065f46' }]}>Cộng đồng Sĩ tử</Text>
            <Text style={[styles.cardSubtitle, { color: '#065f46' }]}>Trò chuyện, hỏi đáp và hỗ trợ nhau trong kỳ tuyển sinh.</Text>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: '#0f766e', marginTop: 12 }]}
              onPress={onOpenChat}
            >
              <Text style={styles.primaryButtonText}>Vào chat cộng đồng →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  heroText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#ecfccb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationEmoji: {
    fontSize: 18,
  },
  profileCard: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#064e3b',
  },
  profileCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileCardTitle: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  profileCardLabel: {
    color: '#d1fae5',
    marginTop: 4,
    fontSize: 12,
  },
  progressBadge: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  progressBadgeText: {
    color: '#0f766e',
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#14532d',
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '80%',
    height: '100%',
    backgroundColor: '#86efac',
  },
  profileHint: {
    fontSize: 12,
    lineHeight: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    borderRadius: 22,
    padding: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  testHero: {
    borderRadius: 18,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  testHeroText: {
    color: '#d1fae5',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  numerologyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  numerologyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#065f46',
    marginBottom: 4,
  },
  numerologySubtitle: {
    fontSize: 12,
    color: '#065f46',
  },
  numerologyBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numerologyBadgeText: {
    color: '#064e3b',
    fontSize: 18,
    fontWeight: '700',
  },
  numerologyStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  smallCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
  },
  smallCardHeading: {
    fontSize: 12,
    color: '#0f766e',
    marginBottom: 6,
  },
  smallCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#065f46',
  },
  numerologyText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#166534',
    marginBottom: 16,
  },
  secondaryButton: {
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#dcfce7',
  },
  secondaryButtonText: {
    color: '#166534',
    fontWeight: '700',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLink: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  newsCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  newsSubtitle: {
    fontSize: 12,
    lineHeight: 18,
  },
  communityCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  communityTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  communityDescription: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  communityMeta: {
    fontSize: 11,
  },
});
