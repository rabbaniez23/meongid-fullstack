<template>
  <main class="article-detail">
    <div class="detail-container">
      <div class="image-wrapper">
        <img :src="article.image" alt="Article Image" class="article-image" />
      </div>
      <h1 class="article-title">{{ article.title }}</h1>
      <p class="article-meta">{{ article.date }} • {{ article.readTime }}</p>
      <p class="article-content">{{ article.content }}</p>
      <p class="article-source">Sumber: {{ article.source }}</p>

      <!-- Tombol kembali ke artikel di bawah -->
      <RouterLink to="/articles" class="back-link">← Kembali ke Artikel</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const articles = [
  {
    id: 1,
    title: "Panduan Lengkap Mengadopsi Kucing",
    image:  "/artikel4.jpg",
    date: "15 Januari 2025",
    readTime: "5 menit baca",
    content:
      "Sebelum mengadopsi kucing, pastikan kamu sudah menyiapkan rumah yang aman dan nyaman. Beri tempat tidur hangat, wadah makan dan minum, serta pasir untuk buang air. Luangkan waktu untuk bermain dan berinteraksi setiap hari agar kucing merasa disayangi dan cepat beradaptasi.",
    source: "ASPCA (aspca.org)",
  },
  {
    id: 2,
    title: "Tips Dasar Merawat Kucing untuk Pemilik Baru",
    image: "/artikel5.jpg",
    date: "12 Januari 2025",
    readTime: "4 menit baca",
    content:
      "Kucing membutuhkan taurin dan asam amino penting dalam makanannya untuk menjaga kesehatan mata dan jantung. Pastikan kamu menyediakan makanan bergizi, air bersih, serta tempat tidur yang nyaman. Jangan lupa grooming secara rutin agar bulu tetap bersih dan sehat.",
    source: "The Spruce Pets (thesprucepets.com)",
  },
  {
  id: 3,
  title: "Memahami Bahasa Tubuh Kucing",
  image:  "/artikel6.jpg",
  date: "10 Januari 2025",
  readTime: "6 menit baca",
  content:
    "Kucing memiliki cara unik untuk berkomunikasi melalui bahasa tubuh. Ekor yang tegak biasanya menandakan suasana hati bahagia, sedangkan ekor yang mengembang menunjukkan rasa takut atau kewaspadaan. Jika kucing menatap dengan perlahan atau ‘blink’ ke arahmu, itu tanda kasih sayang. Memahami bahasa tubuh ini akan membantu mempererat hubungan antara kamu dan kucing peliharaanmu.",
  source: "Purina Indonesia (purina.co.id)",
},
  {
    id: 4,
    title: "Memahami Kesehatan dan Kesejahteraan Kucing",
    image:  "/artikel7.jpg",
    date: "8 Januari 2025",
    readTime: "7 menit baca",
    content:
      "Kucing perlu pemeriksaan rutin minimal setahun sekali ke dokter hewan. Perhatikan gejala seperti kehilangan nafsu makan, muntah, atau perubahan perilaku. Vaksinasi dan kebersihan lingkungan juga penting untuk menjaga kucing tetap sehat dan bahagia.",
    source: "Cornell Feline Health Center (vet.cornell.edu)",
  },
  {
    id: 5,
    title: "Pelatihan Positif untuk Kucing",
    image:  "/artikel10.jpg",
    date: "5 Januari 2025",
    readTime: "5 menit baca",
    content:
      "Kucing bisa dilatih menggunakan metode positif, seperti memberikan camilan saat mereka berperilaku baik. Hindari hukuman karena dapat membuat kucing stres. Dengan kesabaran dan konsistensi, kamu bisa mengajari kucing untuk menggunakan litter box atau tidak naik ke meja makan.",
    source: "International Cat Care (icatcare.org)",
  },
  {
    id: 6,
    title: "Mengapa Mengadopsi Kucing Senior Itu Berharga",
    image:  "/artikel11.jpg",
    readTime: "4 menit baca",
    content:
      "Kucing senior cenderung lebih tenang, penyayang, dan tidak seaktif anak kucing. Mereka biasanya sudah terlatih dan mudah beradaptasi. Dengan mengadopsi kucing senior, kamu memberi mereka kesempatan untuk menikmati masa tua dengan penuh kasih sayang.",
    source: "Petfinder (petfinder.com)",
  },
];

const article = articles.find((a) => a.id === parseInt(route.params.id));
</script>

<style scoped>
.article-detail {
  background-color: #f3efe5;
  min-height: 100vh;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.detail-container {
  max-width: 600px;
  width: 100%;
  background: #fdfaf5;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.article-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.article-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 0.5rem;
}

.article-meta {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.article-content {
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: justify;
}

.article-source {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background-color: #a9c47f;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.back-link:hover {
  background-color: #90ad6a;
}

@media (max-width: 768px) {
  .detail-container {
    padding: 1.5rem;
  }

  .article-image {
    width: 140px;
    height: 140px;
  }

  .article-title {
    font-size: 1.3rem;
  }

  .article-content {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .article-detail {
    padding: 2rem 0.8rem;
  }

  .article-image {
    width: 120px;
    height: 120px;
  }

  .article-title {
    font-size: 1.1rem;
  }

  .article-content {
    font-size: 0.9rem;
  }
}
</style>
