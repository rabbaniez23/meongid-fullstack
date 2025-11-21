const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  console.log('🌱 Memulai seeding...');

  // 1. Buat User Admin
  const password = await bcrypt.hash('rahasia123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@meong.id' },
    update: {},
    create: {
      email: 'admin@meong.id',
      name: 'Admin Meong',
      password: password,
      role: 'ADMIN',
      phone: '081234567890'
    },
  });

  // 2. DATA SHELTER, RS, DAN EVENT (CAMPAIGNS)
  
  // A. Tipe: SHELTER (Muncul di Halaman Shelter & Donasi)
  await prisma.campaign.upsert({
    where: { slug: 'shelter-pejaten' },
    update: {},
    create: {
      title: 'Pejaten Shelter',
      slug: 'shelter-pejaten',
      description: 'Rumah bagi 500+ anjing dan kucing terlantar. Kami membutuhkan biaya operasional harian.',
      target: 100000000,
      collected: 45000000,
      image: '/shelter1.jpg',
      verified: true,
      location: 'Pejaten, Jakarta Selatan',
      contact: '0812-3456-7890',
      type: 'SHELTER', // <--- PENTING
      managerId: admin.id
    }
  });

  await prisma.campaign.upsert({
    where: { slug: 'rumah-kucing-bandung' },
    update: {},
    create: {
      title: 'Rumah Kucing Bandung',
      slug: 'rumah-kucing-bandung',
      description: 'Tempat perlindungan kucing jalanan di Bandung.',
      target: 50000000,
      collected: 1200000,
      image: '/shelter2.jpg',
      verified: true,
      location: 'Dago, Bandung',
      contact: '0898-7654-3210',
      type: 'SHELTER',
      managerId: admin.id
    }
  });

  // B. Tipe: HOSPITAL (Muncul di Halaman Shelter & Donasi)
  await prisma.campaign.upsert({
    where: { slug: 'rsh-jakarta' },
    update: {},
    create: {
      title: 'RS Hewan Jakarta',
      slug: 'rsh-jakarta',
      description: 'Rumah Sakit Hewan dengan fasilitas UGD 24 Jam.',
      target: 0, // RS mungkin tidak punya target donasi, tapi bisa terima donasi sukarela
      collected: 5000000,
      image: '/rs1.jpg',
      verified: true,
      location: 'Ragunan, Jakarta',
      contact: '(021) 789-1234',
      type: 'HOSPITAL',
      managerId: admin.id
    }
  });

  // C. Tipe: EVENT (Hanya muncul di Halaman Donasi)
  await prisma.campaign.upsert({
    where: { slug: 'steril-gratis' },
    update: {},
    create: {
      title: 'Program Steril Subsidi 100 Kucing',
      slug: 'steril-gratis',
      description: 'Bantu kami mengontrol populasi kucing liar dengan steril massal.',
      target: 15000000,
      collected: 3000000,
      image: '/shelter3.jpg',
      verified: true,
      location: 'Bogor',
      type: 'EVENT',
      managerId: admin.id
    }
  });

  console.log('✅ Data Shelter & Campaign dibuat.');
  console.log('🌱 Seeding selesai!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });