import { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { RIASEC_QUESTIONS, RIASEC_LABELS, ANSWER_OPTIONS, RIASECType } from '@/data/riasec-questions';
import { calculateScores, getTopTypes, getCareerSuggestions, SINGLE_TYPE_CAREERS } from '@/data/riasec-careers';

type TestPhase = 'intro' | 'quiz' | 'result';

export function RIASECTestScreen() {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const scrollViewRef = useRef<ScrollView>(null);

  const progress = (Object.keys(answers).length / RIASEC_QUESTIONS.length) * 100;
  const isComplete = Object.keys(answers).length === RIASEC_QUESTIONS.length;
  const currentQuestion = RIASEC_QUESTIONS[currentQuestionIndex];

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    if (currentQuestionIndex < RIASEC_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      }, 300);
    }
  };

  const handleFinish = () => {
    if (isComplete) {
      setPhase('result');
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setPhase('intro');
  };

  // Result calculation
  const scores = useMemo(() => calculateScores(answers, RIASEC_QUESTIONS), [answers]);
  const topTypes = useMemo(() => getTopTypes(scores), [scores]);
  const careerSuggestions = useMemo(() => getCareerSuggestions(topTypes), [topTypes]);

  if (phase === 'intro') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerEmoji}>🎯</Text>
            <Text style={styles.headerTitle}>Trắc Nghiệm RIASEC</Text>
            <Text style={styles.headerSubtitle}>
              Khám phá định hướng nghề nghiệp phù hợp với bạn
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>ℹ️ Về bài trắc nghiệm</Text>
            <Text style={styles.infoText}>
              • 60 câu hỏi về sở thích và khả năng{'\n'}
              • Thời gian hoàn thành: 15-20 phút{'\n'}
              • Kết quả: Gợi ý ngành học phù hợp{'\n'}
              • Bạn có thể tạm dừng và tiếp tục sau
            </Text>
          </View>

          <View style={styles.typesPreview}>
            <Text style={styles.previewTitle}>6 Hạng mục RIASEC:</Text>
            <View style={styles.typesGrid}>
              {Object.entries(RIASEC_LABELS).map(([key, label]) => (
                <View key={key} style={styles.typeCard}>
                  <Text style={styles.typeEmoji}>{label.icon}</Text>
                  <Text style={styles.typeName}>{key}</Text>
                  <Text style={styles.typeShort}>{label.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setPhase('quiz')}
        >
          <Text style={styles.startButtonText}>Bắt Đầu Trắc Nghiệm</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (phase === 'quiz') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.quizContent} showsVerticalScrollIndicator={false}>
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Object.keys(answers).length} / {RIASEC_QUESTIONS.length}
          </Text>

          {/* Question */}
          <View style={styles.questionContainer}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>
                Câu {currentQuestionIndex + 1}/{RIASEC_QUESTIONS.length}
              </Text>
              <Text style={styles.questionType}>
                {currentQuestion.type}
              </Text>
            </View>

            <Text style={styles.questionText}>{currentQuestion.text}</Text>

            {/* Answer Options */}
            <View style={styles.optionsContainer}>
              {ANSWER_OPTIONS.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected
                    ]}
                    onPress={() => handleAnswer(option.value)}
                  >
                    <View style={[
                      styles.optionCircle,
                      isSelected && styles.optionCircleSelected
                    ]} />
                    <Text style={[
                      styles.optionLabel,
                      isSelected && styles.optionLabelSelected
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestionIndex === 0 && styles.navButtonDisabled
              ]}
              onPress={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              <Text style={styles.navButtonText}>← Trước</Text>
            </TouchableOpacity>

            {currentQuestionIndex === RIASEC_QUESTIONS.length - 1 && isComplete && (
              <TouchableOpacity
                style={styles.finishButton}
                onPress={handleFinish}
              >
                <Text style={styles.finishButtonText}>Xem Kết Quả</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.navButton,
                currentQuestionIndex === RIASEC_QUESTIONS.length - 1 && styles.navButtonDisabled
              ]}
              onPress={() => setCurrentQuestionIndex(Math.min(RIASEC_QUESTIONS.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === RIASEC_QUESTIONS.length - 1}
            >
              <Text style={styles.navButtonText}>Sau →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Result Phase
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.resultContent}>
        {/* Result Header */}
        <View style={styles.resultHeader}>
          <Text style={styles.resultEmoji}>✨</Text>
          <Text style={styles.resultTitle}>Kết Quả Của Bạn</Text>
        </View>

        {/* Top Types */}
        <View style={styles.topTypesContainer}>
          {topTypes.map((type, idx) => {
            const label = RIASEC_LABELS[type];
            const score = scores[type];
            return (
              <View key={type} style={styles.resultTypeCard}>
                <View style={styles.resultTypeRank}>
                  <Text style={styles.resultTypeRankText}>
                    {idx === 0 ? 'Chính' : 'Phụ'}
                  </Text>
                </View>
                <Text style={styles.resultTypeEmoji}>{label.icon}</Text>
                <View style={styles.resultTypeInfo}>
                  <Text style={styles.resultTypeName}>{type}</Text>
                  <Text style={styles.resultTypeFullName}>{label.fullName}</Text>
                  <Text style={styles.resultTypeScore}>Điểm: {score}/40</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Career Suggestions */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Ngành Học Gợi Ý</Text>
          <Text style={styles.suggestionsDescription}>
            {careerSuggestions.description}
          </Text>
          <View style={styles.majorsList}>
            {careerSuggestions.majors.map((major, idx) => (
              <View key={idx} style={styles.majorItem}>
                <Text style={styles.majorBullet}>•</Text>
                <Text style={styles.majorText}>{major}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Score Distribution */}
        <View style={styles.scoreDistribution}>
          <Text style={styles.distTitle}>Phân Bố Điểm</Text>
          {Object.entries(RIASEC_LABELS).map(([type, label]) => {
            const score = scores[type as RIASECType];
            const percentage = (score / 40) * 100;
            return (
              <View key={type} style={styles.scoreBar}>
                <View style={styles.scoreBarLabel}>
                  <Text style={styles.scoreBarType}>{type}</Text>
                  <Text style={styles.scoreBarValue}>{score}</Text>
                </View>
                <View style={styles.scoreBarBackground}>
                  <View
                    style={[
                      styles.scoreBarFill,
                      {
                        width: `${percentage}%`,
                        backgroundColor: getTypeColor(type as RIASECType)
                      }
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Tip Box */}
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Lời Khuyên</Text>
          <Text style={styles.tipText}>
            Kết quả này là tham khảo. Hãy kết hợp với quan tâm thực tế, năng lực học tập, và tình hình việc làm để đưa ra quyết định tuyển sinh tốt nhất.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.resultButtons}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => {}}
          >
            <Text style={styles.shareButtonText}>Chia Sẻ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestart}
          >
            <Text style={styles.restartButtonText}>Làm Lại</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getTypeColor(type: RIASECType): string {
  const colors: Record<RIASECType, string> = {
    R: '#ef4444', // red
    I: '#3b82f6', // blue
    A: '#f97316', // orange
    S: '#10b981', // emerald
    E: '#f59e0b', // amber
    C: '#8b5cf6', // violet
  };
  return colors[type];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 22,
  },
  typesPreview: {
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  typeEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  typeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  typeShort: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Quiz Styles
  quizContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#059669',
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 24,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  questionType: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 24,
  },
  optionsContainer: {
    marginTop: 24,
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionButtonSelected: {
    backgroundColor: '#dcfce7',
    borderColor: '#059669',
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
  },
  optionCircleSelected: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  optionLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  optionLabelSelected: {
    color: '#059669',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 24,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  finishButton: {
    flex: 1,
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Result Styles
  resultContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  resultEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  topTypesContainer: {
    gap: 12,
    marginBottom: 28,
  },
  resultTypeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultTypeRank: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  resultTypeRankText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  resultTypeEmoji: {
    fontSize: 28,
  },
  resultTypeInfo: {
    flex: 1,
  },
  resultTypeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  resultTypeFullName: {
    fontSize: 12,
    color: '#6b7280',
    marginVertical: 2,
  },
  resultTypeScore: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  suggestionsDescription: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  majorsList: {
    gap: 8,
  },
  majorItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  majorBullet: {
    color: '#059669',
    fontWeight: 'bold',
  },
  majorText: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
  },
  scoreDistribution: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  distTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  scoreBar: {
    marginBottom: 14,
  },
  scoreBarLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  scoreBarType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  scoreBarValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  scoreBarBackground: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  tipBox: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 24,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#78350f',
    lineHeight: 18,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#059669',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: 'bold',
  },
  restartButton: {
    flex: 1,
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
