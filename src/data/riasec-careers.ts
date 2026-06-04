import { RIASECType } from './riasec-questions';

export interface CareerMapping {
  majors: string[];
  description: string;
}

// Mapping cho từng nhóm đơn lẻ
export const SINGLE_TYPE_CAREERS: Record<RIASECType, CareerMapping> = {
  R: {
    majors: [
      'Kỹ thuật cơ khí',
      'Xây dựng',
      'Điện – Điện tử',
      'Công nghệ ô tô',
      'Hàng hải',
      'Công nghệ sản xuất',
      'Kỹ thuật môi trường',
      'Nông nghiệp'
    ],
    description: 'Bạn phù hợp với các ngành kỹ thuật, cần sự khéo léo và làm việc thực tế'
  },
  I: {
    majors: [
      'Công nghệ thông tin',
      'Y khoa',
      'Dược học',
      'Sinh học',
      'Khoa học dữ liệu',
      'Kỹ thuật phần mềm',
      'Hóa học',
      'Vật lý'
    ],
    description: 'Bạn phù hợp với các ngành nghiên cứu, cần tư duy logic và phân tích'
  },
  A: {
    majors: [
      'Thiết kế đồ họa',
      'Truyền thông đa phương tiện',
      'Báo chí',
      'Kiến trúc',
      'Marketing sáng tạo',
      'Nghệ thuật',
      'Điện ảnh',
      'Thiết kế thời trang'
    ],
    description: 'Bạn phù hợp với các ngành sáng tạo, cần sự tự do và thẩm mỹ'
  },
  S: {
    majors: [
      'Sư phạm',
      'Tâm lý học',
      'Điều dưỡng',
      'Công tác xã hội',
      'Quản trị nhân sự',
      'Giáo dục mầm non',
      'Y tế công cộng',
      'Xã hội học'
    ],
    description: 'Bạn phù hợp với các ngành xã hội, cần kỹ năng giao tiếp và sự đồng cảm'
  },
  E: {
    majors: [
      'Quản trị kinh doanh',
      'Marketing',
      'Thương mại điện tử',
      'Kinh tế quốc tế',
      'Luật kinh doanh',
      'Khởi nghiệp (Startup)',
      'Quan hệ công chúng',
      'Quản lý dự án'
    ],
    description: 'Bạn phù hợp với các ngành kinh doanh, cần kỹ năng lãnh đạo và thuyết phục'
  },
  C: {
    majors: [
      'Kế toán',
      'Kiểm toán',
      'Tài chính – Ngân hàng',
      'Logistics',
      'Hành chính văn phòng',
      'Quản lý dữ liệu',
      'Thống kê',
      'Quản trị văn phòng'
    ],
    description: 'Bạn phù hợp với các ngành nghiệp vụ, cần sự tỉ mỉ và có tổ chức'
  }
};

// Helper functions
export function calculateScores(answers: Record<number, number>, questions: any[]) {
  const scores: Record<RIASECType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  
  questions.forEach(q => {
    if (answers[q.id] !== undefined) {
      scores[q.type] += answers[q.id];
    }
  });
  
  return scores;
}

export function getTopTypes(scores: Record<RIASECType, number>): RIASECType[] {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([type]) => type as RIASECType);
}

export function getCareerSuggestions(topTypes: RIASECType[]) {
  if (topTypes.length === 1) {
    return SINGLE_TYPE_CAREERS[topTypes[0]];
  }
  
  const key = topTypes.join('');
  return SINGLE_TYPE_CAREERS[topTypes[0]]; // Fallback to first type
}
