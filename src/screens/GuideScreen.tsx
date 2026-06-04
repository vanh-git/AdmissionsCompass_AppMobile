import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { GraduationCap, BookOpen, MessageCircle, Zap } from 'lucide-react';

interface GuideItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const guideItems: GuideItem[] = [
  {
    icon: '📝',
    title: 'Trắc Nghiệm RIASEC',
    description: 'Khám phá định hướng nghề nghiệp của bạn thông qua bài trắc nghiệm RIASEC, giúp bạn hiểu rõ hơn về khả năng và sở thích trong học tập.',
  },
  {
    icon: '💬',
    title: 'Chat Cộng Đồng',
    description: 'Tham gia cộng đồng và trò chuyện với những người khác, chia sẻ kinh nghiệm tuyển sinh và nhận lời khuyên từ bạn bè.',
  },
  {
    icon: '✨',
    title: 'Dễ Dàng Sử Dụng',
    description: 'Giao diện thân thiện, dễ sử dụng trên di động. Bạn có thể truy cập mọi lúc, mọi nơi.',
  },
];

export function GuideScreen({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🚀</Text>
          <Text style={styles.headerTitle}>Chào Mừng!</Text>
          <Text style={styles.headerSubtitle}>
            Hãy cùng khám phá những tính năng tuyệt vời
          </Text>
        </View>

        {/* Guide Items */}
        <View style={styles.itemsContainer}>
          {guideItems.map((item, index) => (
            <View key={index} style={styles.guideItem}>
              <View style={styles.itemIcon}>
                <Text style={styles.itemEmoji}>{item.icon}</Text>
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))}
        </View>

        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          {guideItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentStep === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={styles.infoText}>
            Hệ thống được thiết kế để giúp bạn tìm ra định hướng tuyển sinh phù hợp nhất. Hãy tận dụng tối đa những công cụ này!
          </Text>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (currentStep < guideItems.length - 1) {
              setCurrentStep(currentStep + 1);
            } else {
              onComplete();
            }
          }}
        >
          <Text style={styles.buttonText}>
            {currentStep === guideItems.length - 1 ? 'Bắt Đầu' : 'Tiếp Theo'}
          </Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  itemsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  guideItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
  },
  itemIcon: {
    marginBottom: 12,
  },
  itemEmoji: {
    fontSize: 40,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  dotActive: {
    backgroundColor: '#059669',
    width: 24,
  },
  infoBox: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoText: {
    fontSize: 14,
    color: '#92400e',
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  button: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonArrow: {
    color: '#fff',
    fontSize: 18,
  },
});
