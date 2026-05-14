import type { NavItem, HeroCard, Service, Project, Testimonial, ProcessStep, Skill, Benefit, Client } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: "Giới thiệu", href: "#about" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Dự án", href: "#projects" },
  { label: "Lợi ích", href: "#benefits" },
  { label: "Liên hệ", href: "#contact" },
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
    title: "Thiết kế",
    desc: "Khám phá cách chúng tôi thiết kế website chuyên nghiệp giúp khách hàng bán hàng trực tuyến hiệu quả và tạo ấn tượng thương hiệu tốt hơn.",
    image: "/images/tk.png",
  },
  {
    title: "Brand",
    desc: "Xây dựng bản sắc thương hiệu độc đáo, từ logo đến chiến lược truyền thông toàn diện.",
    image: "/images/tk.png",
  },
  {
    title: "Lập trình",
    desc: "Phát triển website và ứng dụng di động với công nghệ tiên tiến nhất, đảm bảo tốc độ và bảo mật.",
    image: "/images/code.png",
  },
  {
    title: "Chụp ảnh",
    desc: "Ghi lại những khoảnh khắc đắt giá và sản xuất nội dung hình ảnh/video chất lượng cao cho thương hiệu.",
    image: "/images/camera.png",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Olinycallr Dashboard",
    category: "Web App",
    image: "/images/code.png",
  },
  {
    title: "Brand Identity — Sendesign",
    category: "Branding",
    image: "/images/tk.png",
  },
  {
    title: "E-Commerce Platform",
    category: "Development",
    image: "/images/code.png",
  },
];

export const BENEFITS: Benefit[] = [
  "Tốc độ triển khai nhanh chóng",
  "Thiết kế cá nhân hoá theo thương hiệu",
  "Code sạch, dễ bảo trì và mở rộng",
  "Hỗ trợ kỹ thuật tận tâm sau bàn giao",
];

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", title: "Trao đổi", desc: "Lắng nghe ý tưởng và mục tiêu của bạn." },
  { step: "02", title: "Lên kế hoạch", desc: "Wireframe, thiết kế prototype và xác nhận." },
  { step: "03", title: "Phát triển", desc: "Code, tích hợp và kiểm thử kỹ lưỡng." },
  { step: "04", title: "Bàn giao", desc: "Ra mắt sản phẩm và hỗ trợ liên tục." },
];

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

export const CLIENTS: Client[] = [
  "EXIMBANK",
  "PETROLIMEX",
  "BAOVIET",
  "MB",
  "LPBANK",
  "LOTTE",
  "DEWEY",
  "SENDESIGN",
];
