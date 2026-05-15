import bcrypt from 'bcryptjs';
import prisma from './lib/prisma';

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@hatmedia.vn';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

async function seed() {
  console.log('🌱 Starting database seed...');

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: DEFAULT_ADMIN_EMAIL }
  });

  if (existingAdmin) {
    console.log('✅ Admin already exists, skipping creation');
  } else {
    // Hash password
    const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);

    // Create admin
    await prisma.admin.create({
      data: {
        email: DEFAULT_ADMIN_EMAIL,
        password: hashedPassword
      }
    });

    console.log(`✅ Admin created: ${DEFAULT_ADMIN_EMAIL}`);
  }

  // Seed Services
  const services = [
    {
      title: 'Thiết Kế',
      description: 'Giải pháp sáng tạo đa lĩnh vực từ UI/UX website, ứng dụng di động đến thiết kế bao bì, mô phỏng 3D.',
      image: '/images/tk.png',
      order: 0
    },
    {
      title: 'Thiết kế Brand',
      description: 'Xây dựng bộ nhận diện thương hiệu đồng bộ, từ logo, màu sắc, typography đến hệ thống hình ảnh.',
      image: '/images/brand.png',
      order: 1
    },
    {
      title: 'Lập Trình',
      description: 'Phát triển website, ứng dụng và hệ thống số với công nghệ phù hợp, hiệu năng ổn định.',
      image: '/images/code.png',
      order: 2
    },
    {
      title: 'Chụp ảnh',
      description: 'Chụp ảnh sản phẩm, chân dung thương hiệu và hình ảnh truyền thông.',
      image: '/images/camera.png',
      order: 3
    }
  ];

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { title: service.title }
    });

    if (!existing) {
      await prisma.service.create({ data: service });
      console.log(`✅ Service created: ${service.title}`);
    }
  }

  // Seed Process Sections
  const processSections = [
    {
      category: 'design',
      title: 'Thiết kế',
      description: 'Quy trình thiết kế tập trung vào cân bằng giữa tính thẩm mỹ và hiệu quả trải nghiệm.',
      order: 0,
      steps: [
        { step: '01', title: 'Nghiên cứu', description: 'Tìm kiếm cảm hứng, phong cách và xu hướng.', order: 0 },
        { step: '02', title: 'Phác thảo', description: 'Hiện thực hóa ý tưởng qua các bản vẽ.', order: 1 },
        { step: '03', title: 'Hoàn thiện', description: 'Tinh chỉnh chi tiết, màu sắc và chất liệu.', order: 2 },
        { step: '04', title: 'Sản xuất', description: 'Xuất bản phẩm chất lượng cao.', order: 3 }
      ]
    },
    {
      category: 'brand',
      title: 'Thiết kế Brand',
      description: 'Xây dựng thương hiệu dựa trên sự thấu hiểu sâu sắc về giá trị cốt lõi.',
      order: 1,
      steps: [
        { step: '01', title: 'Chiến lược', description: 'Định vị thương hiệu và giá trị cốt lõi.', order: 0 },
        { step: '02', title: 'Ý tưởng', description: 'Sáng tạo biểu tượng và ngôn ngữ thiết kế.', order: 1 },
        { step: '03', title: 'Nhận diện', description: 'Xây dựng hệ thống nhận diện toàn diện.', order: 2 },
        { step: '04', title: 'Hướng dẫn', description: 'Hướng dẫn sử dụng và bàn giao.', order: 3 }
      ]
    },
    {
      category: 'code',
      title: 'Lập trình',
      description: 'Công nghệ là công cụ để hiện thực hóa sáng tạo với mã nguồn sạch.',
      order: 2,
      steps: [
        { step: '01', title: 'Kiến trúc', description: 'Thiết lập cấu trúc và lựa chọn công nghệ.', order: 0 },
        { step: '02', title: 'Phát triển', description: 'Lập trình tính năng và giao diện.', order: 1 },
        { step: '03', title: 'Tích hợp', description: 'Kết nối dữ liệu và tối ưu hóa.', order: 2 },
        { step: '04', title: 'Triển khai', description: 'Triển khai hệ thống và hỗ trợ.', order: 3 }
      ]
    },
    {
      category: 'photo',
      title: 'Chụp ảnh',
      description: 'Sử dụng ánh sáng và góc nhìn nghệ thuật để tôn vinh giá trị thực.',
      order: 3,
      steps: [
        { step: '01', title: 'Chuẩn bị', description: 'Lên Concept và chuẩn bị bối cảnh.', order: 0 },
        { step: '02', title: 'Chụp', description: 'Thực hiện chụp với kỹ thuật chuyên sâu.', order: 1 },
        { step: '03', title: 'Hậu kỳ', description: 'Hậu kỳ hình ảnh và tinh chỉnh màu.', order: 2 },
        { step: '04', title: 'Bàn giao', description: 'Bàn giao hình ảnh chất lượng cao.', order: 3 }
      ]
    }
  ];

  for (const section of processSections) {
    const existing = await prisma.processSection.findUnique({
      where: { category: section.category }
    });

    if (!existing) {
      await prisma.processSection.create({
        data: {
          category: section.category,
          title: section.title,
          description: section.description,
          order: section.order,
          steps: {
            create: section.steps
          }
        }
      });
      console.log(`✅ Process section created: ${section.title}`);
    }
  }

  console.log('🎉 Database seeding completed!');
}

async function main() {
  try {
    await seed();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();