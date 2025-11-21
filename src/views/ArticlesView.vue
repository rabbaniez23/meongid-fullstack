<template>
  <main>
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <h1>Artikel & Sumber Informasi</h1>
        <p>Pelajari segala hal tentang perawatan, kesehatan, adopsi, dan kisah inspiratif seputar kucing kesayanganmu.</p>
      </div>
    </section>

    <!-- Daftar Artikel -->
    <section class="articles-section">
      <div class="container">
        <div class="articles-grid">
          <!-- 1 -->
          <article class="article-card">
          <img src="/artikel4.jpg" />
            <div class="article-content">
              <h3>Panduan Lengkap Mengadopsi Kucing</h3>
              <p class="article-meta">15 Januari 2025 • 5 menit baca</p>
              <p>
                Segala hal yang perlu kamu ketahui sebelum mengadopsi kucing — mulai dari persiapan rumah hingga membantu
                kucing beradaptasi dengan lingkungan barunya.
              </p>
              <RouterLink to="/articles/1" class="btn btn-small">Baca Selengkapnya</RouterLink>
              <p class="source">Sumber: ASPCA (aspca.org)</p>
            </div>
          </article>

          <!-- 2 -->
          <article class="article-card">
             <img src="/artikel5.jpg" />
            <div class="article-content">
              <h3>Tips Perawatan Kucing untuk Pemilik Baru</h3>
              <p class="article-meta">12 Januari 2025 • 4 menit baca</p>
              <p>
                Pelajari dasar-dasar perawatan kucing seperti makanan, kebersihan, latihan litter box, dan cara bermain
                agar kucing tetap sehat dan bahagia.
              </p>
              <RouterLink to="/articles/2" class="btn btn-small">Baca Selengkapnya</RouterLink>
              <p class="source">Sumber: The Spruce Pets (thesprucepets.com)</p>
            </div>
          </article>

          <!-- 3 -->
          <article class="article-card">
            <img src="/artikel6.jpg" />
            <div class="article-content">
              <h3>Menemukan Rumah Baru untuk Kucing Jalanan</h3>
              <p class="article-meta">10 Januari 2025 • 6 menit baca</p>
              <p>
                Cerita tentang para relawan dan pecinta hewan yang membantu kucing jalanan menemukan rumah penuh kasih di
                seluruh Indonesia.
              </p>
              <RouterLink to="/articles/3" class="btn btn-small">Baca Selengkapnya</RouterLink>
              <p class="source">Sumber: RSPCA UK (rspca.org.uk)</p>
            </div>
          </article>

          <!-- 4 -->
          <article class="article-card">
           <img src="/artikel7.jpg" />
            <div class="article-content">
              <h3>Memahami Kesehatan dan Kesejahteraan Kucing</h3>
              <p class="article-meta">8 Januari 2025 • 7 menit baca</p>
              <p>
                Panduan lengkap mengenali tanda-tanda penyakit, jadwal vaksinasi, dan kapan waktu terbaik membawa kucing
                ke dokter hewan.
              </p>
              <RouterLink to="/articles/4" class="btn btn-small">Baca Selengkapnya</RouterLink>
              <p class="source">Sumber: Cornell Feline Health Center (vet.cornell.edu)</p>
            </div>
          </article>

          <!-- 5 -->
          <article class="article-card">
            <img src="/artikel10.jpg" />
            <div class="article-content">
              <h3>Melatih Kucing dengan Penguatan Positif</h3>
              <p class="article-meta">5 Januari 2025 • 5 menit baca</p>
              <p>
                Temukan metode pelatihan kucing yang efektif dan lembut untuk membangun kepercayaan serta perilaku yang
                baik pada teman berbulu kamu.
              </p>
              <RouterLink to="/articles/5" class="btn btn-small">Baca Selengkapnya</RouterLink>
              <p class="source">Sumber: International Cat Care (icatcare.org)</p>
            </div>
          </article>

          <!-- 6 -->
          <article class="article-card">
            <img src="/artikel11.jpg" />
            <div class="article-content">
              <h3>Mengapa Mengadopsi Kucing Senior Itu Istimewa</h3>
              <p class="article-meta">3 Januari 2025 • 4 menit baca</p>
              <p>
                Kucing senior cenderung tenang dan penuh kasih sayang. Ketahui mengapa memberi mereka rumah baru bisa
                mengubah hidupmu dan hidup mereka.
              </p>
              <RouterLink to="/articles/6" class="btn btn-small">Baca Selengkapnya</RouterLink>
              <p class="source">Sumber: Petfinder (petfinder.com)</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
