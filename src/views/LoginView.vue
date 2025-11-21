<template>
  <div class="auth-container">
    <div class="auth-content">
      <div class="auth-form-section">
        <div class="auth-form-wrapper">
          <div class="auth-logo">
            <span class="logo-icon">🐾</span>
            <span class="logo-text">Meong id</span>
          </div>
          <h1 class="auth-title">Selamat datang</h1>
          <p class="auth-subtitle">Masukkan akun Anda untuk melanjutkan.</p>

          <form class="auth-form" @submit.prevent="handleLogin">
            <InputField
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              v-model="email"
              required
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              v-model="password"
              required
            />

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" name="remember" />
                <span>ingat saya</span>
              </label>
              <RouterLink to="/forgot-password" class="link"
                >Lupa Password?</RouterLink
              >
            </div>

            <Button type="submit" variant="primary" :block="true">
              Masuk
            </Button>
          </form>

          <p class="auth-footer">
            Tidak punya akun?
            <RouterLink to="/signup" class="link">Buat Akun</RouterLink>
          </p>

          <RouterLink to="/" class="back-link">← kembali ke beranda</RouterLink>
        </div>
      </div>

      <div class="auth-image-section">
        <img
          src="/kucing.png"
          alt="Meong.id"
        />
        <div class="auth-image-overlay">
          <h2>Selamat datang di Meong.id</h2>
          <p>Kami senang melihatmu kembali</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { store, login } from '../store.js';

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    // 1. Kirim data ke Backend Fastify (Port 3000)
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await response.json();

    // 2. Cek apakah login berhasil
    if (response.ok) {
      // BERHASIL!
      alert("Login Berhasil!");
      
     

      // Panggil fungsi login
    login(data.token, data.user);

      // Pindah ke halaman profile
      router.push("/profile");
    } else {
      // GAGAL (Password salah / User tidak ada)
      alert(data.message || "Login gagal");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan koneksi ke server");
  }
};
</script>

<style scoped>
/* Kebanyakan style akan diambil dari style.css global-mu 
  (seperti .auth-container, dll.) 
*/

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}
</style>
