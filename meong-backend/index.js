// meong-id-backend/index.js

const fastify = require('fastify')({ 
  logger: true,
  bodyLimit: 30 * 1024 * 1024 // Izinkan upload sampai 30MB
});
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- 1. SETUP & PLUGINS ---
fastify.register(require('@fastify/cors'), {
  origin: 'http://localhost:5173', // Sesuaikan dengan port frontend-mu
  credentials: true,

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

fastify.register(require('@fastify/jwt'), {
  secret: 'kunci_rahasia_meong_id_12345' // Ganti string ini saat produksi
});

// Middleware untuk proteksi rute (Cek apakah user sudah login)
fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ message: 'Akses ditolak, silakan login' });
  }
});

// --- 2. RUTE AUTENTIKASI (User) ---

// Register
fastify.post('/register', async (request, reply) => {
  const { name, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });
    return { message: 'Registrasi berhasil', user: { id: user.id, name: user.name } };
  } catch (e) {
    reply.code(400).send({ message: 'Email sudah terdaftar' });
  }
});

// Login
fastify.post('/login', async (request, reply) => {
  const { email, password } = request.body;
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.code(401).send({ message: 'Email atau password salah' });
  }
  
  const token = fastify.jwt.sign({ id: user.id, role: user.role });
  return { 
    message: 'Login berhasil', 
    token, 
    user: { id: user.id, name: user.name, email: user.email, role: user.role } 
  };
});

// Cek Profil (Butuh Login)
fastify.get('/me', { onRequest: [fastify.authenticate] }, async (req) => {
  return await prisma.user.findUnique({ 
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, role: true, phone: true, avatar: true }
  });
});

// Update Profil (Butuh Login)
fastify.put('/me', { onRequest: [fastify.authenticate] }, async (req) => {
  const { name, email, phone, avatar } = req.body; // Tambahkan avatar
  
  return await prisma.user.update({
    where: { id: req.user.id },
    data: { 
      name, 
      email, 
      phone, 
      avatar // Simpan string base64 gambar ke database
    }
  });
});


// --- 3. RUTE ARTIKEL ---

// Ambil Semua Artikel
fastify.get('/articles', async () => {
  return await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });
});

// Ambil Detail Satu Artikel
fastify.get('/articles/:id', async (req) => {
  return await prisma.article.findUnique({
    where: { id: Number(req.params.id) },
    include: { author: { select: { name: true } } }
  });
});

// Buat Artikel (Sementara: Siapa saja yang login bisa buat, nanti bisa dibatasi Admin)
fastify.post('/articles', { onRequest: [fastify.authenticate] }, async (req) => {
  const { title, content, image, source } = req.body;
  return await prisma.article.create({
    data: {
      title, content, image, source,
      authorId: req.user.id
    }
  });
});


// --- 4. RUTE ADOPSI ---

// Ambil Daftar Kucing Tersedia
fastify.get('/adoptions', async () => {
  return await prisma.adoptionListing.findMany({
    where: { status: 'AVAILABLE' },
    orderBy: { createdAt: 'desc' },
    include: { owner: { select: { name: true, phone: true } } } // Sertakan info pemilik
  });
});

// Daftarkan Kucing Baru (Butuh Login)
fastify.post('/adoptions', { onRequest: [fastify.authenticate] }, async (req) => {
  const { name, description, race, age, gender, location, image } = req.body;
  return await prisma.adoptionListing.create({
    data: {
      name, description, race, age, gender, location, image,
      ownerId: req.user.id
    }
  });
});

// Lamar Adopsi (Butuh Login)
fastify.post('/adoptions/:id/apply', { onRequest: [fastify.authenticate] }, async (req) => {
  const { message } = req.body;
  const listingId = Number(req.params.id);

  // Cek apakah listing ada
  const listing = await prisma.adoptionListing.findUnique({ where: { id: listingId } });
  if (!listing) throw new Error('Listing tidak ditemukan');

  return await prisma.adoptionApplication.create({
    data: {
      message,
      listingId,
      applicantId: req.user.id
    }
  });
});


// --- 5. RUTE LAPOR KUCING HILANG ---

// Lihat Daftar Kucing Hilang
fastify.get('/lost-cats', async () => {
  return await prisma.lostCatReport.findMany({
    where: { status: 'LOST' },
    orderBy: { createdAt: 'desc' },
    include: { reporter: { select: { name: true } } }
  });
});

// Buat Laporan (Butuh Login)
fastify.post('/lost-cats', { onRequest: [fastify.authenticate] }, async (req) => {
  const { name, description, location, contact, image } = req.body;
  return await prisma.lostCatReport.create({
    data: {
      name, description, location, contact, image,
      reporterId: req.user.id
    }
  });
});


// --- 6. RUTE KOMUNITAS (FORUM) ---

// Ambil Semua Postingan + Komentar
fastify.get('/posts', async () => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { name: true } },
      comments: {
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: 'asc' }
      }
    }
  });
  
  // Format data agar mudah dibaca frontend
  return posts.map(p => ({
    id: p.id,
    judul: p.title,
    isi: p.content,
    kategori: p.category,
    foto: p.image,
    tanggal: p.createdAt,
    user: p.author.name,
    avatar: p.author.name.charAt(0).toUpperCase(),
    comments: p.comments.map(c => ({
      id: c.id,
      text: c.content,
      user: c.author.name
    })),
    suka: 0, // Placeholder (database belum ada fitur like)
    disukai: false
  }));
});

// Buat Postingan Baru (Butuh Login)
fastify.post('/posts', { onRequest: [fastify.authenticate] }, async (req) => {
  const { title, content, image, category } = req.body;
  return await prisma.post.create({
    data: {
      title, content, image, category,
      authorId: req.user.id
    }
  });
});

// Buat Komentar (Butuh Login)
fastify.post('/posts/:id/comments', { onRequest: [fastify.authenticate] }, async (req) => {
  const { content } = req.body;
  return await prisma.comment.create({
    data: {
      content,
      postId: Number(req.params.id),
      authorId: req.user.id
    }
  });
});







// --- RUTE CAMPAIGN (SHELTER) ---

// 1. Ambil Semua Kampanye
fastify.get('/campaigns', async () => {
  return await prisma.campaign.findMany({
    orderBy: { createdAt: 'desc' }
  });
});

// 2. Ambil Detail Kampanye (berdasarkan ID atau Slug)
fastify.get('/campaigns/:id', async (req) => {
  const id = Number(req.params.id);
  return await prisma.campaign.findUnique({
    where: { id },
    include: { 
      _count: { select: { donations: true } } // Hitung jumlah donatur
    }
  });
});

// UPDATE RUTE POST /donations
fastify.post('/donations', async (req, reply) => {
  const { amount, paymentMethod, message, donorId, campaignId } = req.body; // Ada campaignId

  // ... (validasi amount & method) ...

  try {
    // 1. Simpan Donasi
    const newDonation = await prisma.donation.create({
      data: {
        amount: Number(amount),
        paymentMethod,
        message,
        donorId: donorId || null,
        campaignId: Number(campaignId), // Hubungkan ke kampanye
        status: 'SUCCESS' // Anggap sukses dulu buat demo
      }
    });

    // 2. Update Total Terkumpul di Kampanye
    await prisma.campaign.update({
      where: { id: Number(campaignId) },
      data: {
        collected: { increment: Number(amount) } // Tambah otomatis
      }
    });
    
    return { message: 'Donasi berhasil!', donation: newDonation };
  } catch (err) {
    // ... error handling ...
  }
});

// --- JALANKAN SERVER ---
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server Meong.id berjalan di http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();