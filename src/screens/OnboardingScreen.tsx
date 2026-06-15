import { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    ListRenderItemInfo,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface Slide {
  icon: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    icon: '🚀',
    title: 'Chào Mừng Bạn!',
    description:
      'Khám phá bản thân và định hướng tương lai ngay trên chiếc điện thoại của bạn.\nHãy cùng bắt đầu hành trình tuyệt vời này nhé!',
  },
  {
    icon: '📝',
    title: 'Trắc Nghiệm RIASEC',
    description:
      'Khám phá định hướng nghề nghiệp thông qua bài trắc nghiệm khoa học, giúp bạn hiểu rõ hơn về tính cách, khả năng và sở thích của bản thân.',
  },
  {
    icon: '💬',
    title: 'Chat Cộng Đồng',
    description:
      'Tham gia cộng đồng và trò chuyện với những người khác, chia sẻ kinh nghiệm tuyển sinh và nhận lời khuyên từ bạn bè.',
  },
  {
    icon: '🔮',
    title: 'Khám Phá Thần Số Học',
    description:
      'Giải mã những con số gắn liền với ngày sinh và tên gọi của bạn để thấu hiểu sâu sắc hơn về thế mạnh nội tại và vận mệnh tương lai.',
  },
  {
    icon: '✨',
    title: 'Dễ Dàng Sử Dụng',
    description:
      'Giao diện thân thiện, dễ sử dụng trên di động. Bạn có thể truy cập mọi lúc, mọi nơi.',
  },
];

// Cosmic background with stars
const CosmicBackground = () => (
  <View style={styles.nebulaBg} pointerEvents="none">
    <View style={styles.starsContainer} pointerEvents="none">
      {Array.from({ length: 60 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const left = Math.round(Math.random() * (width - size));
        const top = Math.round(Math.random() * (height - size));
        return (
          <View
            key={i}
            style={[
              styles.star,
              {
                width: size,
                height: size,
                left,
                top,
                opacity: 0.25 + Math.random() * 0.6,
              },
            ]}
          />
        );
      })}
    </View>
  </View>
);

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Slide> | null>(null);

  // Reanimated shared value for rocket float
  const float = useSharedValue(0);

  useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-18, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [float]);

  const animatedRocketStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: float.value }],
    };
  });

  const animatedSmallStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: float.value * 0.5 }],
    };
  });

  // Colors for icon backgrounds per slide
  const iconBg = ['#fce7ff', '#fff7ed', '#eef2ff', '#fef3c7', '#fff1f2'];

  const renderItem = ({ item, index: itemIndex }: ListRenderItemInfo<Slide>) => {
    const isFirst = itemIndex === 0;
    const bg = iconBg[itemIndex % iconBg.length];
    return (
      <View style={styles.slide}>
        <Animated.View
          style={[
            isFirst ? styles.rocketWrap : styles.iconWrap,
            isFirst ? animatedRocketStyle : animatedSmallStyle,
            { backgroundColor: bg },
          ]}
        >
          <Text style={isFirst ? styles.icon : styles.iconSmall}>{item.icon}</Text>
        </Animated.View>

        {/* Wrap content of all slides in the same glassPanel style for visual consistency */}
        <View style={styles.glassPanel}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const onNext = () => {
    if (index < slides.length - 1) {
      const next = index + 1;
      listRef.current?.scrollToOffset({ offset: next * width, animated: true });
      setIndex(next);
    } else {
      onComplete();
    }
  };

  const onSkip = () => {
    onComplete();
  };

  return (
    <View style={styles.container}>
      <CosmicBackground />

      <View style={styles.headerRight}>
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.round(ev.nativeEvent.contentOffset.x / width);
          setIndex(newIndex);
        }}
        getItemLayout={(_, i) => ({ length: width, offset: i * width, index: i })}
        initialNumToRender={1}
        windowSize={2}
      />

      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]} />
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextText}>{index === slides.length - 1 ? 'Bắt Đầu Ngay' : 'Tiếp theo'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1326',
  },
  nebulaBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0b1326',
    zIndex: -1,
  },
  headerRight: {
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'web' ? 20 : 50,
    zIndex: 10,
  },
  skip: {
    color: '#ddb7ff',
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '600',
  },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: 120,
    marginBottom: 24,
  },
  iconSmall: {
    fontSize: 64,
    marginBottom: 16,
  },
  iconWrap: {
    width: 140,
    height: 140,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    elevation: 6,
  },
  rocketWrap: {
    marginTop: -height * 0.1,
    marginBottom: 8,
    alignItems: 'center',
  },
  glassPanel: {
    marginTop: 12,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(221, 183, 255, 0.1)',
    backgroundColor: 'rgba(23, 31, 51, 0.4)',
    shadowColor: 'rgba(255, 255, 255, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#ddb7ff',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Epilogue',
  },
  description: {
    fontSize: 16,
    color: '#cfc2d6',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 760,
    fontFamily: 'Plus Jakarta Sans',
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 999,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#d1bcff',
    width: 24,
  },
  dotInactive: {
    backgroundColor: 'rgba(207, 194, 214, 0.3)',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'web' ? 32 : 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  nextButton: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#e364a7',
    shadowColor: '#ddb7ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  nextText: {
    color: '#3d0026',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Plus Jakarta Sans',
  },
});
