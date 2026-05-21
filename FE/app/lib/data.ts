import type { NavItem, HeroCard, Service, Project, Testimonial, ProcessStep, Skill, Benefit, Client } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Dự án", href: "/du-an" },
  { label: "Lợi ích", href: "#benefits" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const HERO_CARDS: HeroCard[] = [
  {
    id: "design",
    src: "/images/tk.png",
    alt: "Design"
  },
  {
    id: "code",
    src: "/images/code.png",
    alt: "Code"
  },
  {
    id: "photo",
    src: "/images/camera.png",
    alt: "Photography"
  },
];

export const SERVICES: Service[] = [
  {
    title: "Thiết Kế",
    desc: "Giải pháp sáng tạo đa lĩnh vực từ UI/UX website, ứng dụng di động đến thiết kế bao bì, mô phỏng 3D, các ấn phẩm truyền thông kỹ thuật số hiện đại và nhiều hơn nữa.",
    image: "/images/tk.png",
  },
  {
    title: "Thiết kế Brand",
    desc: "Xây dựng bộ nhận diện thương hiệu đồng bộ, từ logo, màu sắc, typography đến hệ thống hình ảnh giúp thương hiệu nổi bật và dễ ghi nhớ.",
    image: "/images/brand.png",
  },
  {
    title: "Lập Trình",
    desc: "Phát triển website, ứng dụng và hệ thống số với công nghệ phù hợp, hiệu năng ổn định, dễ mở rộng và vận hành mượt mà.",
    image: "/images/code.png",
  },
  {
    title: "Chụp ảnh",
    desc: "Chụp ảnh sản phẩm, chân dung thương hiệu và hình ảnh truyền thông nhằm thể hiện rõ câu chuyện, phong cách và giá trị của doanh nghiệp.",
    image: "/images/camera.png",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "BAOVIET Insurance",
    category: "Digital Platform",
    image: "/images/code.png",
  },
  {
    title: "Creative Studio",
    category: "Photography",
    image: "/images/camera.png",
  },
  {
    title: "Logistics Solution",
    category: "Web App",
    image: "/images/code.png",
  },
  {
    title: "Modern UI/UX Design",
    category: "Product Design",
    image: "/images/tk.png",
  },
  {
    title: "E-Commerce Experience",
    category: "Digital Retail",
    image: "/images/code.png",
  },
  {
    title: "Financial Dashboard",
    category: "Data Visualization",
    image: "/images/tk.png",
  },
];

export const BENEFITS: Benefit[] = [
  "Tốc độ triển khai nhanh chóng",
  "Thiết kế cá nhân hoá theo thương hiệu",
  "Code sạch, dễ bảo trì và mở rộng",
  "Hỗ trợ kỹ thuật tận tâm sau bàn giao",
];

export const PROCESS_BY_FIELD = {
  design: {
    title: "Thiết kế",
    desc: "Quy trình thiết kế của chúng tôi tập trung vào việc cân bằng giữa tính thẩm mỹ hiện đại và hiệu quả trải nghiệm, đảm bảo mỗi sản phẩm đều có linh hồn riêng.",
    steps: [
      { step: "01", title: "Nghiên cứu", desc: "Tìm kiếm cảm hứng, phong cách và xu hướng sáng tạo." },
      { step: "02", title: "Phác thảo", desc: "Hiện thực hóa ý tưởng qua các bản vẽ và bố cục sơ khởi." },
      { step: "03", title: "Hoàn thiện", desc: "Tinh chỉnh chi tiết, màu sắc và chất liệu thị giác." },
      { step: "04", title: "Sản xuất", desc: "Xuất bản phẩm chất lượng cao cho mọi nền tảng." }
    ]
  },
  brand: {
    title: "Thương hiệu",
    desc: "Chúng tôi xây dựng thương hiệu dựa trên sự thấu hiểu sâu sắc về giá trị cốt lõi, từ đó tạo nên bản sắc độc bản và bền vững theo thời gian.",
    steps: [
      { step: "01", title: "Chiến lược", desc: "Định vị thương hiệu và giá trị cốt lõi." },
      { step: "02", title: "Ý tưởng", desc: "Sáng tạo biểu tượng và ngôn ngữ thiết kế." },
      { step: "03", title: "Nhận diện thương hiệu", desc: "Xây dựng hệ thống nhận diện toàn diện." },
      { step: "04", title: "Hướng dẫn sử dụng", desc: "Hướng dẫn sử dụng và bàn giao tài liệu." }
    ]
  },
  code: {
    title: "Lập trình",
    desc: "Công nghệ là công cụ để hiện thực hóa sáng tạo. Chúng tôi ưu tiên mã nguồn sạch, hiệu năng tối ưu và khả năng mở rộng linh hoạt.",
    steps: [
      { step: "01", title: "Kiến trúc", desc: "Thiết lập cấu trúc và lựa chọn công nghệ." },
      { step: "02", title: "Phát triển", desc: "Lập trình tính năng và giao diện mượt mà." },
      { step: "03", title: "Tích hợp", desc: "Kết nối dữ liệu và tối ưu hóa hiệu năng." },
      { step: "04", title: "Triển khai", desc: "Triển khai hệ thống và hỗ trợ vận hành." }
    ]
  },
  photo: {
    title: "Studio",
    desc: "Mỗi khung hình là một câu chuyện. Chúng tôi sử dụng ánh sáng và góc nhìn nghệ thuật để tôn vinh giá trị thực của sản phẩm và con người.",
    steps: [
      { step: "01", title: "Chuẩn bị trước", desc: "Lên Concept và chuẩn bị bối cảnh." },
      { step: "02", title: "Chụp", desc: "Thực hiện chụp với kỹ thuật chuyên sâu." },
      { step: "03", title: "Hậu kỳ", desc: "Hậu kỳ hình ảnh và tinh chỉnh màu sắc." },
      { step: "04", title: "Bàn giao", desc: "Bàn giao hình ảnh chất lượng cao nhất." }
    ]
  }
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "HATMedia đã giúp chúng tôi xây dựng một nền tảng quản lý khách hàng hiệu quả và trực quan.",
    author: "Nguyễn Văn A",
    role: "CEO, Startup Tech",
  },
  {
    quote: "Sự tận tâm và chất lượng sản phẩm vượt ngoài mong đợi. Rất đáng tin cậy!",
    author: "Trần Thị B",
    role: "Marketing Manager",
  },
];

export const SKILLS: Skill[] = [
  "React / Next.js",
  "Node.js",
  "UI/UX Design",
  "Photography",
  "Branding",
  "Motion Graphics",
];

export const ABOUT_CONTENT = {
  subtitle: "Về HAT Studio",
  title: "Thấu hiểu, đồng hành và thiết kế trải nghiệm digital không giới hạn.",
  desc: "Chúng tôi xây dựng cho mình Tư duy thiết kế, Triết lý sáng tạo và gửi gắm Giá trị cho mỗi thương hiệu, mỗi doanh nghiệp cũng như cả cộng đồng. Mỗi dự án là một câu chuyện độc bản được kể bằng ngôn ngữ của trải nghiệm và cảm xúc.",
  since: "2026"
};

export const CONTACT_INFO = {
  phones: ["(+84) 123 456 789", "(+84) 987 654 321"],
  emails: ["contact@hatmedia.vn"],
  website: "hatmedia.vn"
};

export const OFFICE_LOCATIONS = [
  {
    name: "Showroom ",
    address: "Số 4, ngách 19/143 Kim Mã, phường Kim Mã, quận Ba Đình, Hà Nội"
  },
  {
    name: "Studio",
    address: "Số 2, Lộc Dư, Thượng Phúc, Hà Nội"
  }
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" }
];

export const BENEFITS_CONTENT = {
  philosophy: "Our Philosophy",
  statement: "Chúng tôi không chỉ kiến tạo sản phẩm số, HATMedia đồng hành cùng thương hiệu để định hình giá trị và tạo ra những trải nghiệm chạm tới cảm xúc.",
  founder: {
    name: "Nguyễn Minh Công",
    role: "Chief Marketing Officer",
    initial: "DELI"
  },
  watermark: "Manifesto"
};

export const CLIENTS: Client[] = [
  "MSB", "NCB", "VietinBank", "Thang Long University", "BTEC", "British Council",
  "MSIG", "EVN FINANCE", "TMC", "The Olympia Schools", "MB", "VNPAY",
  "PVcomBank", "BAOVIET", "PETROLIMEX", "LUXURY TRAVEL", "toong", "interloka",
  "FPT", "Viettel", "PICENZA", "STARLAKE", "TECHCOMBANK", "Journey On Air"
];
