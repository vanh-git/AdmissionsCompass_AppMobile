import { Colors } from '@/constants/theme';
import { useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

interface NumerologyReading {
  lifeNumber: number;
  destinyNumber: number;
  soulNumber: number;
  interpretation: string;
}

export function NumerologyScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [fullName, setFullName] = useState('');
  const [reading, setReading] = useState<NumerologyReading | null>(null);
  const [showModal, setShowModal] = useState(false);

  const reduceNumber = (num: number): number => {
    while (num > 9) {
      num = Math.floor(num / 10) + (num % 10);
    }
    return num;
  };

  const calculateLifeNumber = (date: string): number => {
    const parts = date.split('/');
    if (parts.length !== 3) return 0;
    
    const day = parseInt(parts[0]) || 0;
    const month = parseInt(parts[1]) || 0;
    const year = parseInt(parts[2]) || 0;
    
    const sum = day + month + year;
    return reduceNumber(sum);
  };

  const calculateDestinyNumber = (name: string): number => {
    const nameUpper = name.toUpperCase().replace(/\s/g, '');
    const vowels = 'AEIOUAÁÀẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬEÈÉẺẼẸÊỀẾỂỄỆIÌÍỈĨỊOÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢUÙÚỦŨỤƯỪỨỬỮỰYỲÝỶỸỴ';
    
    let sum = 0;
    for (const char of nameUpper) {
      if (/[A-Z]/.test(char)) {
        sum += char.charCodeAt(0) - 64;
      }
    }
    
    return reduceNumber(sum);
  };

  const calculateSoulNumber = (name: string): number => {
    const nameUpper = name.toUpperCase().replace(/\s/g, '');
    const vowels = 'AEIOUAÁÀẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬEÈÉẺẼẸÊỀẾỂỄỆIÌÍỈĨỊOÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢUÙÚỦŨỤƯỪỨỬỮỰYỲÝỶỸỴ';
    
    let sum = 0;
    for (const char of nameUpper) {
      if (/[A-ZÁÀẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬEÈÉẺẼẸÊỀẾỂỄỆIÌÍỈĨỊOÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢUÙÚỦŨỤƯỪỨỬỮỰYỲÝỶỸỴ]/.test(char) && 
          vowels.includes(char)) {
        sum += char.charCodeAt(0) - 64;
      }
    }
    
    return reduceNumber(sum);
  };

  const getInterpretation = (num: number): string => {
    const interpretations: Record<number, string> = {
      1: 'Bạn là người lãnh đạo, độc lập và có khát vọng cao. Thích tạo ra những điều mới và dẫn dắt con đường riêng của mình.',
      2: 'Bạn là người hòa hợp, tôn trọng, và có khả năng làm việc nhóm tuyệt vời. Thích tìm kiếm sự cân bằng và hòa bình.',
      3: 'Bạn là người sáng tạo, vui vẻ và có khả năng giao tiếp tốt. Thích thể hiện bản thân qua nghệ thuật và sáng kiến.',
      4: 'Bạn là người thực tế, có kỷ luật và trách nhiệm. Thích xây dựng nền tảng vững chắc cho tương lai.',
      5: 'Bạn là người năng động, tự do và yêu thích thay đổi. Thích khám phá những trải nghiệm mới và mạo hiểm.',
      6: 'Bạn là người chăm sóc, yêu thương và có trách nhiệm gia đình. Thích giúp đỡ những người xung quanh.',
      7: 'Bạn là người tư duy sâu sắc, thích nghiên cứu và tìm tòi. Có trực giác mạnh mẽ và tâm linh cao.',
      8: 'Bạn là người tham vọng, có khả năng quản lý tốt. Thích đạt được thành công vật chất và quyền lực.',
      9: 'Bạn là người nhân hậu, bao dung và có tầm nhìn rộng. Thích giúp đỡ nhân loại và làm thay đổi thế giới.',
    };
    
    return interpretations[num] || 'Số này đại diện cho sự cân bằng và hài hòa trong cuộc sống.';
  };

  const handleCalculate = () => {
    if (!dateOfBirth || !fullName) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin (ngày sinh và tên đầy đủ)');
      return;
    }

    const life = calculateLifeNumber(dateOfBirth);
    const destiny = calculateDestinyNumber(fullName);
    const soul = calculateSoulNumber(fullName);

    if (life === 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập ngày sinh đúng định dạng (DD/MM/YYYY)');
      return;
    }

    const newReading: NumerologyReading = {
      lifeNumber: life,
      destinyNumber: destiny,
      soulNumber: soul,
      interpretation: getInterpretation(life),
    };

    setReading(newReading);
    setShowModal(true);
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
            🔮 Thần Số Học
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Khám phá ý nghĩa của những con số trong cuộc sống bạn
          </Text>
        </View>

        {/* Info Section */}
        <View style={[styles.infoCard, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>
            ✨ Thần Số Học Là Gì?
          </Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Thần số học là một hệ thống tin rằng các con số có những rung động năng lượng đặc biệt. Bằng cách phân tích ngày sinh và tên của bạn, chúng ta có thể hiểu rõ hơn về tính cách, con đường cuộc sống, và tiềm năng của bạn.
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={[styles.inputLabel, { color: colors.text }]}>
            📅 Ngày Sinh Của Bạn
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: colors.backgroundElement,
                color: colors.text,
                borderColor: colors.backgroundSelected
              }
            ]}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={colors.textSecondary}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            keyboardType="decimal-pad"
          />

          <Text style={[styles.inputLabel, { color: colors.text }]}>
            ✍️ Tên Đầy Đủ
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: colors.backgroundElement,
                color: colors.text,
                borderColor: colors.backgroundSelected
              }
            ]}
            placeholder="Nhập tên đầy đủ của bạn"
            placeholderTextColor={colors.textSecondary}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Calculate Button */}
        <TouchableOpacity 
          style={[styles.calculateButton, { backgroundColor: '#059669' }]}
          onPress={handleCalculate}
        >
          <Text style={styles.calculateButtonText}>🔍 Tính Toán Số Học Của Tôi</Text>
        </TouchableOpacity>

        {/* Info Cards */}
        <View style={styles.legendSection}>
          <Text style={[styles.legendTitle, { color: colors.text }]}>
            📚 Các Con Số
          </Text>

          <View style={[styles.legendCard, { backgroundColor: colors.backgroundElement }]}>
            <Text style={[styles.legendName, { color: colors.text }]}>
              🎯 Con Số Sống (Life Number)
            </Text>
            <Text style={[styles.legendDesc, { color: colors.textSecondary }]}>
              Phản ánh con đường sống, bài học, và trải nghiệm chính của bạn
            </Text>
          </View>

          <View style={[styles.legendCard, { backgroundColor: colors.backgroundElement }]}>
            <Text style={[styles.legendName, { color: colors.text }]}>
              🎭 Con Số Định Mệnh (Destiny Number)
            </Text>
            <Text style={[styles.legendDesc, { color: colors.textSecondary }]}>
              Tiết lộ mục đích, tài năng, và tiềm năng tối đa của bạn
            </Text>
          </View>

          <View style={[styles.legendCard, { backgroundColor: colors.backgroundElement }]}>
            <Text style={[styles.legendName, { color: colors.text }]}>
              💫 Con Số Tâm Hồn (Soul Number)
            </Text>
            <Text style={[styles.legendDesc, { color: colors.textSecondary }]}>
              Biểu thị những mong muốn nội tâm, đam mê, và động lực thực sự của bạn
            </Text>
          </View>
        </View>

        {/* Display Previous Reading */}
        {reading && (
          <View style={[styles.readingSection, { backgroundColor: colors.backgroundElement }]}>
            <Text style={[styles.readingTitle, { color: colors.text }]}>
              📖 Kết Quả Của Bạn
            </Text>

            <View style={styles.numberGrid}>
              <View style={styles.numberCard}>
                <Text style={styles.numberValue}>{reading.lifeNumber}</Text>
                <Text style={[styles.numberLabel, { color: colors.textSecondary }]}>
                  Con Số Sống
                </Text>
              </View>

              <View style={styles.numberCard}>
                <Text style={styles.numberValue}>{reading.destinyNumber}</Text>
                <Text style={[styles.numberLabel, { color: colors.textSecondary }]}>
                  Con Số Định Mệnh
                </Text>
              </View>

              <View style={styles.numberCard}>
                <Text style={styles.numberValue}>{reading.soulNumber}</Text>
                <Text style={[styles.numberLabel, { color: colors.textSecondary }]}>
                  Con Số Tâm Hồn
                </Text>
              </View>
            </View>

            <View style={styles.interpretationBox}>
              <Text style={[styles.interpretationText, { color: colors.text }]}>
                {reading.interpretation}
              </Text>
            </View>
          </View>
        )}

        {/* Fun Facts */}
        <View style={styles.factsSection}>
          <Text style={[styles.factsTitle, { color: colors.text }]}>
            💡 Những Điều Thú Vị
          </Text>

          <View style={[styles.factCard, { backgroundColor: colors.backgroundElement }]}>
            <Text style={styles.factEmoji}>1️⃣</Text>
            <Text style={[styles.factText, { color: colors.text }]}>
              Thần số học được sử dụng từ thời Pythagoras cổ đại, nhà toán học nổi tiếng người Hy Lạp
            </Text>
          </View>

          <View style={[styles.factCard, { backgroundColor: colors.backgroundElement }]}>
            <Text style={styles.factEmoji}>2️⃣</Text>
            <Text style={[styles.factText, { color: colors.text }]}>
              Mỗi con số từ 1-9 có những rung động năng lượng riêng biệt và ý nghĩa sâu sắc
            </Text>
          </View>

          <View style={[styles.factCard, { backgroundColor: colors.backgroundElement }]}>
            <Text style={styles.factEmoji}>3️⃣</Text>
            <Text style={[styles.factText, { color: colors.text }]}>
              Tên của bạn có thể ảnh hưởng đến con đường sống và cách bạn tương tác với thế giới
            </Text>
          </View>
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>

      {/* Result Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>

            {reading && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  🔮 Kết Quả Thần Số Học
                </Text>

                <View style={styles.modalNumberContainer}>
                  <View style={[styles.modalNumberCard, { backgroundColor: colors.backgroundElement }]}>
                    <Text style={styles.modalNumberValue}>{reading.lifeNumber}</Text>
                    <Text style={[styles.modalNumberLabel, { color: colors.textSecondary }]}>
                      Con Số Sống
                    </Text>
                    <Text style={[styles.modalNumberDesc, { color: colors.textSecondary }]}>
                      {getInterpretation(reading.lifeNumber)}
                    </Text>
                  </View>

                  <View style={[styles.modalNumberCard, { backgroundColor: colors.backgroundElement }]}>
                    <Text style={styles.modalNumberValue}>{reading.destinyNumber}</Text>
                    <Text style={[styles.modalNumberLabel, { color: colors.textSecondary }]}>
                      Con Số Định Mệnh
                    </Text>
                    <Text style={[styles.modalNumberDesc, { color: colors.textSecondary }]}>
                      {getInterpretation(reading.destinyNumber)}
                    </Text>
                  </View>

                  <View style={[styles.modalNumberCard, { backgroundColor: colors.backgroundElement }]}>
                    <Text style={styles.modalNumberValue}>{reading.soulNumber}</Text>
                    <Text style={[styles.modalNumberLabel, { color: colors.textSecondary }]}>
                      Con Số Tâm Hồn
                    </Text>
                    <Text style={[styles.modalNumberDesc, { color: colors.textSecondary }]}>
                      {getInterpretation(reading.soulNumber)}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            )}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
  },
  calculateButton: {
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  legendSection: {
    marginBottom: 24,
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  legendCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  legendName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  legendDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  readingSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  readingTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  numberGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  numberCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#059669',
  },
  numberValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#059669',
  },
  numberLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  interpretationBox: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  interpretationText: {
    fontSize: 13,
    lineHeight: 18,
  },
  factsSection: {
    marginBottom: 24,
  },
  factsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  factCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    gap: 12,
  },
  factEmoji: {
    fontSize: 20,
  },
  factText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  footerSpace: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  modalCloseText: {
    fontSize: 24,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalNumberContainer: {
    gap: 12,
  },
  modalNumberCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalNumberValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 8,
  },
  modalNumberLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalNumberDesc: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
});
