export type RIASECType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RIASECQuestion {
  id: number;
  text: string;
  type: RIASECType;
}

export const RIASEC_LABELS: Record<RIASECType, { name: string; fullName: string; description: string; icon: string }> = {
  R: {
    name: 'Realistic',
    fullName: 'Kỹ thuật – Thực hành – Vận động',
    description: 'Thích làm việc với máy móc, công cụ, hoạt động ngoài trời',
    icon: '🔧'
  },
  I: {
    name: 'Investigative',
    fullName: 'Phân tích – Nghiên cứu – Tư duy logic',
    description: 'Thích nghiên cứu, phân tích, giải quyết vấn đề phức tạp',
    icon: '🔬'
  },
  A: {
    name: 'Artistic',
    fullName: 'Sáng tạo – Nghệ thuật – Tự do',
    description: 'Thích sáng tạo, thể hiện bản thân, làm việc tự do',
    icon: '🎨'
  },
  S: {
    name: 'Social',
    fullName: 'Giao tiếp – Giúp đỡ – Hỗ trợ',
    description: 'Thích làm việc với con người, giúp đỡ, giảng dạy',
    icon: '🤝'
  },
  E: {
    name: 'Enterprising',
    fullName: 'Lãnh đạo – Kinh doanh – Thuyết phục',
    description: 'Thích lãnh đạo, kinh doanh, thuyết phục người khác',
    icon: '💼'
  },
  C: {
    name: 'Conventional',
    fullName: 'Tổ chức – Số liệu – Quy trình',
    description: 'Thích làm việc có tổ chức, chi tiết, theo quy trình',
    icon: '📊'
  }
};

export const RIASEC_QUESTIONS: RIASECQuestion[] = [
  // R – REALISTIC (Kỹ thuật – Thực hành – Vận động)
  { id: 1, text: 'Tôi thích sửa chữa thiết bị điện hoặc máy móc.', type: 'R' },
  { id: 2, text: 'Tôi thích làm việc ngoài trời hơn là ngồi văn phòng.', type: 'R' },
  { id: 3, text: 'Tôi hứng thú với lắp ráp, xây dựng hoặc chế tạo.', type: 'R' },
  { id: 4, text: 'Tôi thích học các môn như Vật lý, Công nghệ.', type: 'R' },
  { id: 5, text: 'Tôi thích làm việc với công cụ, dụng cụ thực tế.', type: 'R' },
  { id: 6, text: 'Tôi thấy mình khéo tay và thực tế.', type: 'R' },
  { id: 7, text: 'Tôi thích quan sát cách máy móc vận hành.', type: 'R' },
  { id: 8, text: 'Tôi thích công việc có tính hành động.', type: 'R' },
  { id: 9, text: 'Tôi thích giải quyết vấn đề bằng cách thử nghiệm.', type: 'R' },
  { id: 10, text: 'Tôi muốn tạo ra sản phẩm hữu hình.', type: 'R' },

  // I – INVESTIGATIVE (Phân tích – Nghiên cứu – Tư duy logic)
  { id: 11, text: 'Tôi thích giải bài toán khó.', type: 'I' },
  { id: 12, text: 'Tôi thích tìm hiểu nguyên nhân của một hiện tượng.', type: 'I' },
  { id: 13, text: 'Tôi thích nghiên cứu chuyên sâu một vấn đề.', type: 'I' },
  { id: 14, text: 'Tôi hứng thú với khoa học và khám phá.', type: 'I' },
  { id: 15, text: 'Tôi thích đọc tài liệu học thuật.', type: 'I' },
  { id: 16, text: 'Tôi thích đặt câu hỏi "vì sao".', type: 'I' },
  { id: 17, text: 'Tôi thích làm thí nghiệm.', type: 'I' },
  { id: 18, text: 'Tôi thấy mình có tư duy logic tốt.', type: 'I' },
  { id: 19, text: 'Tôi thích phân tích dữ liệu.', type: 'I' },
  { id: 20, text: 'Tôi muốn làm công việc thiên về nghiên cứu.', type: 'I' },

  // A – ARTISTIC (Sáng tạo – Nghệ thuật – Tự do)
  { id: 21, text: 'Tôi thích vẽ, thiết kế hoặc sáng tạo nội dung.', type: 'A' },
  { id: 22, text: 'Tôi không thích công việc quá khuôn mẫu.', type: 'A' },
  { id: 23, text: 'Tôi thích viết lách hoặc kể chuyện.', type: 'A' },
  { id: 24, text: 'Tôi yêu thích âm nhạc hoặc nghệ thuật.', type: 'A' },
  { id: 25, text: 'Tôi có nhiều ý tưởng độc đáo.', type: 'A' },
  { id: 26, text: 'Tôi thích thể hiện bản thân qua sản phẩm sáng tạo.', type: 'A' },
  { id: 27, text: 'Tôi thích công việc tự do hơn là gò bó.', type: 'A' },
  { id: 28, text: 'Tôi thích thiết kế hình ảnh hoặc video.', type: 'A' },
  { id: 29, text: 'Tôi thích sáng tạo hơn là làm theo quy trình.', type: 'A' },
  { id: 30, text: 'Tôi muốn công việc mang tính cá nhân cao.', type: 'A' },

  // S – SOCIAL (Giao tiếp – Giúp đỡ – Hỗ trợ)
  { id: 31, text: 'Tôi thích giúp người khác giải quyết vấn đề.', type: 'S' },
  { id: 32, text: 'Tôi thích lắng nghe và tư vấn.', type: 'S' },
  { id: 33, text: 'Tôi thích làm việc nhóm.', type: 'S' },
  { id: 34, text: 'Tôi quan tâm đến cảm xúc người khác.', type: 'S' },
  { id: 35, text: 'Tôi thích dạy người khác điều mình biết.', type: 'S' },
  { id: 36, text: 'Tôi thích công việc liên quan đến con người.', type: 'S' },
  { id: 37, text: 'Tôi thấy vui khi giúp ai đó tiến bộ.', type: 'S' },
  { id: 38, text: 'Tôi thích môi trường giao tiếp nhiều.', type: 'S' },
  { id: 39, text: 'Tôi quan tâm đến giáo dục hoặc y tế.', type: 'S' },
  { id: 40, text: 'Tôi muốn tạo ảnh hưởng tích cực cho cộng đồng.', type: 'S' },

  // E – ENTERPRISING (Lãnh đạo – Kinh doanh – Thuyết phục)
  { id: 41, text: 'Tôi thích thuyết trình trước đám đông.', type: 'E' },
  { id: 42, text: 'Tôi thích dẫn dắt nhóm.', type: 'E' },
  { id: 43, text: 'Tôi muốn tự kinh doanh trong tương lai.', type: 'E' },
  { id: 44, text: 'Tôi thích thương lượng và thuyết phục.', type: 'E' },
  { id: 45, text: 'Tôi thích môi trường cạnh tranh.', type: 'E' },
  { id: 46, text: 'Tôi quan tâm đến marketing và bán hàng.', type: 'E' },
  { id: 47, text: 'Tôi thích đưa ra quyết định.', type: 'E' },
  { id: 48, text: 'Tôi muốn tạo ra cơ hội kiếm tiền.', type: 'E' },
  { id: 49, text: 'Tôi thích xây dựng chiến lược.', type: 'E' },
  { id: 50, text: 'Tôi tự tin khi giao tiếp.', type: 'E' },

  // C – CONVENTIONAL (Tổ chức – Số liệu – Quy trình)
  { id: 51, text: 'Tôi thích làm việc theo kế hoạch rõ ràng.', type: 'C' },
  { id: 52, text: 'Tôi thích sắp xếp dữ liệu, tài liệu.', type: 'C' },
  { id: 53, text: 'Tôi cẩn thận và chú ý chi tiết.', type: 'C' },
  { id: 54, text: 'Tôi thích làm việc với con số.', type: 'C' },
  { id: 55, text: 'Tôi thích công việc ổn định.', type: 'C' },
  { id: 56, text: 'Tôi thích tuân thủ quy trình.', type: 'C' },
  { id: 57, text: 'Tôi thấy mình có tính kỷ luật cao.', type: 'C' },
  { id: 58, text: 'Tôi thích phân tích báo cáo.', type: 'C' },
  { id: 59, text: 'Tôi thích làm việc trong môi trường có cấu trúc.', type: 'C' },
  { id: 60, text: 'Tôi thích quản lý thông tin.', type: 'C' },
];

export const ANSWER_OPTIONS = [
  { value: 4, label: 'Rất đúng' },
  { value: 3, label: 'Khá đúng' },
  { value: 2, label: 'Bình thường' },
  { value: 1, label: 'Không đúng' },
];
