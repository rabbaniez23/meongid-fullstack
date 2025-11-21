<script setup>
import Card from "../components/ui/Card.vue"; 
</script>

<template>
<!-- <header class="header">
 
      <div class="container">
        <nav class="nav">
          <div class="logo">
            <span class="logo-icon">🐾</span>
            <span class="logo-text">Meong id</span>
          </div>
          <ul class="nav-links">
            <li><a href="/" class="active">Home</a></li>
            <li><a href="#artikel">Articles</a></li>
            <li><a href="/adoption">Adoption</a></li>
            <li><a href="/community">Community</a></li>
            <li><a href="/donation">Donate</a></li>
            <li><a href="/signup" class="btn-nav">Login</a></li>
          </ul>
        </nav>
      </div>
    </header> -->
    <main>
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1>Welcome to Meong id</h1>
              <p class="hero-subtitle">
                Lapor dan Temukan Kucing kamu yang hilang
              </p>
              
              <p class="hero-description">
                kamu juga bisa bergabung dengan komunitas kucing di seluruh
                dunia Daftar Sekarang Gratis
              </p>
              <div class="hero-buttons">
               <RouterLink to="/signup" class="btn btn-primary">Daftar</RouterLink>
                <RouterLink to="/signup" class="btn btn-primary">login</RouterLink>
              </div>
              
            </div>
            <div class="hero-image">
              <img src="/kucing.png" alt="Happy rescued dog" />
            </div>
          </div>
        </div>
      </section>

      <section class="features">
        <div class="container">
          <h2 class="section-title">Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">📚</div>
              <h3>Artikel</h3>
              <p>
                Temukan berbagai artikel menarik seputar dunia hewan peliharaan
                — mulai dari cara merawat hewan dengan baik, kisah inspiratif
                penyelamatan hewan, hingga tips penting sebelum dan sesudah
                adopsi. Semua dibuat agar kamu bisa menjadi sahabat terbaik bagi
                hewanmu.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📢</div>
              <h3>Laporkan Hewan</h3>
              <p>
                Jika kamu melihat hewan terlantar, tersesat, atau membutuhkan
                pertolongan, segera beri tahu kami. Setiap laporanmu bisa
                menjadi langkah awal untuk menyelamatkan nyawa dan memberi
                mereka kesempatan hidup yang lebih baik.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">👥</div>
              <h3>Komunitas</h3>
              <p>
                Bergabunglah dengan komunitas pecinta hewan dari berbagai
                daerah. Di sini kamu bisa saling berbagi cerita, pengalaman, dan
                dukungan — karena mencintai hewan akan terasa lebih indah saat
                dilakukan bersama.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🏠</div>
              <h3>Adopsi</h3>
              <p>
                Lihat daftar hewan lucu dan penuh kasih yang sedang mencari
                rumah baru. Siapa tahu, di antara mereka ada yang sedang
                menunggumu untuk menjadi bagian dari keluarganya. Dengan
                mengadopsi, kamu memberi mereka kehidupan yang lebih hangat dan
                penuh cinta.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💚</div>
              <h3>Donasi</h3>
              <p>
                Bantu kami melanjutkan misi penyelamatan hewan melalui donasi.
                Setiap rupiah yang kamu berikan akan digunakan untuk memberi
                makan, merawat, dan menyelamatkan hewan-hewan yang membutuhkan
                bantuan.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🤝</div>
              <h3>Shelter</h3>
              <p>
                Belum siap untuk adopsi permanen? Kamu tetap bisa membantu
                dengan menjadi rumah sementara bagi hewan yang menunggu keluarga
                barunya. Kasih sayang dan perawatanmu akan sangat berarti bagi
                mereka.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section Komunitas -->
      <section class="community-section">
        <div class="community-content">
          <div class="community-icon">
            <img
              src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
              alt="Komunitas"
            />
          </div>
          <div class="community-text">
            <h2>Bergabunglah Dengan <br /><span>Komunitas Kami</span></h2>
            <p>
              Dapatkan ruang berbagi pengalaman, cerita lucu, dan inspirasi
              bersama para pecinta kucing lainnya. Komunitas ini adalah tempat
              untuk tumbuh bersama!
            </p>
            <a href="/community" class="btn-primary">Gabung Komunitas →</a>
          </div>
        </div>
        <div class="paw-trail">🐾 🐾 🐾</div>
      </section>

      <!-- Section Artikel & Edukasi -->
  

      <!-- <section class="cta">
            <div class="container">
                <div class="cta-content">
                    <h2>Save Animals Together With Us</h2>
                    <p>Join our community of compassionate individuals making a difference in animals' lives</p>
                    <div class="cta-buttons">
                        <a href="/signup" class="btn btn-primary">Get Started</a>
                        <a href="/donation" class="btn btn-outline">Make a Donation</a>
                    </div>
                </div>
            </div>
        </section> -->
    </main>

    <footer class="footer">
      <!-- <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Meong ID</h3>
            <p>
              Platform terpercaya untuk adopsi kucing, melaporkan kucing hilang,
              dan menghubungkan komunitas pecinta kucing di Indonesia.
            </p>
          </div>
          <div class="footer-section">
            <h3>Menu Utama</h3>
            <ul class="footer-links">
              <li><a href="/adoption">Adopsi kucing</a></li>
              <li><a href="/foster">Foster Home</a></li>
              <li><a href="/report">Lapor kucing Hilang</a></li>
              <li><a href="/articles">Artikel</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Kontak Kami</h3>
            <ul class="footer-contact">
              <li>📧 meongid@gmail.com</li>
              <li>📞 +62 867 4829 2323</li>
              <li>📍 Bandung ,Indonesia</li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">Instagram</a>
              <a href="#" class="social-link">Twitter</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>
            &copy; 2025 Meong ID. Semua hak dilindungi. Dibuat dengan 💚 untuk
            kucing indonesia.
          </p>
        </div>
      </div> -->
    </footer>
</template>

<script>

import Button from '../components/ui/Button.vue';

export default { 
  name: 'HomeView',
  components: {
   
}
}
</script>

<style scoped>

</style>
