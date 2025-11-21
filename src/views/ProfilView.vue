<template>
  <div class="profile-page">
    <PageHeader title="Profil Saya" subtitle="Kelola informasi akun Anda di sini." />

    <div class="container content-wrapper">
      <div class="profile-card">
        
        <div class="profile-header">
          <div class="avatar-wrapper">
            <img :src="store.user?.avatar || defaultAvatar" alt="Avatar" class="avatar-img">
          </div>
          <div class="header-info">
            <h2>{{ store.user?.name }}</h2>
            <span class="badge-role">{{ store.user?.role || 'USER' }}</span>
          </div>
        </div>

        <hr class="divider">

        <div class="profile-details">
          <div class="detail-item">
            <span class="label">Email</span>
            <span class="value">{{ store.user?.email }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Nomor Telepon</span>
            <span class="value">{{ store.user?.phone || '-' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Bergabung Sejak</span>
            <span class="value">{{ formatDate(store.user?.createdAt) }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <Button @click="$router.push('/profile/edit')" variant="primary" :block="true">
            ✏️ Edit Profil
          </Button>
          <Button @click="handleLogout" variant="secondary" :block="true">
            🚪 Logout
          </Button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { store, logout } from '../store.js'

import { watchEffect } from 'vue'
watchEffect(() => {
  console.log("Data User di Store:", store.value.user);
})
const router = useRouter()
const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/847/847969.png' // Gambar kucing default

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

const handleLogout = () => {
  const confirm = window.confirm("Apakah Anda yakin ingin keluar?");
  if (confirm) {
    logout(); // Panggil fungsi dari store.js
    router.push('/login');
  }
}
</script>

<style scoped>
.profile-page { background-color: #F6F4EE; min-height: 100vh; padding-bottom: 3rem; }
.content-wrapper { max-width: 500px; margin-top: 2rem; }

.profile-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  text-align: center;
}

.avatar-wrapper {
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #A9C47F;
}
.avatar-img { width: 100%; height: 100%; object-fit: cover; }

.header-info h2 { font-size: 1.5rem; color: #333; margin-bottom: 0.5rem; }
.badge-role {
  background: #E8F5E9; color: #4C6A4C; padding: 4px 12px; 
  border-radius: 20px; font-size: 0.8rem; font-weight: bold; letter-spacing: 1px;
}

.divider { border: none; border-top: 1px dashed #ddd; margin: 1.5rem 0; }

.profile-details { text-align: left; margin-bottom: 2rem; }
.detail-item { 
  display: flex; justify-content: space-between; 
  padding: 0.8rem 0; border-bottom: 1px solid #f5f5f5; 
}
.detail-item:last-child { border-bottom: none; }
.label { color: #888; font-size: 0.9rem; }
.value { font-weight: 600; color: #333; }

.action-buttons { display: flex; flex-direction: column; gap: 10px; }
</style>