import type { Question } from '@/types/quiz'

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Yếu tố nào không phải là bối cảnh tác động đến sự thay đổi của nông nghiệp Việt Nam?',
    options: [
      { label: 'A', text: 'Toàn cầu hóa và hội nhập kinh tế quốc tế' },
      { label: 'B', text: 'Biến đổi khí hậu và khủng hoảng kinh tế' },
      { label: 'C', text: 'Sự suy giảm dân số nghiêm trọng' },
      { label: 'D', text: 'Cách mạng công nghiệp 4.0' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 2,
    question: 'Tác động tích cực của thay đổi kinh tế đối với nông nghiệp Việt Nam là gì?',
    options: [
      { label: 'A', text: 'Giá vật tư nông nghiệp tăng mạnh' },
      { label: 'B', text: 'Rủi ro phụ thuộc thị trường xuất khẩu' },
      { label: 'C', text: 'Mở rộng thị trường xuất khẩu nhờ các FTA' },
      { label: 'D', text: 'Thiếu hụt lao động nông nghiệp do chuyển dịch cơ cấu' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 3,
    question: 'Bài học quan trọng từ trường hợp bún dưa hấu – bánh mì thanh long là gì?',
    options: [
      { label: 'A', text: 'Chỉ nên tập trung xuất khẩu mà không ưu tiên thị trường nội địa' },
      { label: 'B', text: 'Chuyển từ xuất thô sang chế biến sâu để thích ứng khi thị trường biến động' },
      { label: 'C', text: 'Giảm chất lượng để hạ giá thành cạnh tranh' },
      { label: 'D', text: 'Phụ thuộc vào một thị trường xuất khẩu duy nhất' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 4,
    question: 'Điểm nổi bật giúp gạo ST25 thành công khi thích ứng với thị trường toàn cầu là:',
    options: [
      { label: 'A', text: 'Tập trung bán số lượng lớn, giá rẻ' },
      { label: 'B', text: 'Dựa vào ưu đãi thuế quan, không cần nâng chất lượng' },
      { label: 'C', text: 'Đầu tư R&D giống lúa, nâng tiêu chuẩn và định vị phân khúc cao cấp' },
      { label: 'D', text: 'Giảm quy trình kiểm soát chất lượng để tiết kiệm chi phí' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 5,
    question: 'Giải pháp nào sau đây thuộc nhóm phát triển nông nghiệp bền vững?',
    options: [
      { label: 'A', text: 'Tăng cường xuất thô để đẩy nhanh kim ngạch' },
      { label: 'B', text: 'Tận dụng phụ phẩm, giảm phát thải theo mô hình kinh tế tuần hoàn' },
      { label: 'C', text: 'Giảm yêu cầu truy xuất nguồn gốc để giảm chi phí' },
      { label: 'D', text: 'Phụ thuộc mạnh vào thị trường Trung Quốc' }
    ],
    correctAnswer: 'B'
  }
]
