<template>
  <aside class="sidebar" :class="{ 'collapsed': !isOpen }">
    
    <div class="sidebar-header">
      <RouterLink to="/" class="logo-link">
        <div class="logo-icon">🐾</div>
        <span class="logo-text" v-if="isOpen">Meong.id</span>
      </RouterLink>
    </div>

    <div class="sidebar-menu">
      <RouterLink to="/" class="nav-item" active-class="active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        <span class="text" v-if="isOpen">Beranda</span>
      </RouterLink>

      <RouterLink to="/report" class="nav-item" active-class="active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span class="text" v-if="isOpen">Lapor Kucing</span>
      </RouterLink>

      <RouterLink to="/adoption" class="nav-item" active-class="active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <span class="text" v-if="isOpen">Adopsi</span>
      </RouterLink>

      <RouterLink to="/hospital-shelter" class="nav-item" active-class="active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
        <span class="text" v-if="isOpen">RS & Shelter</span>
      </RouterLink>

      <RouterLink to="/donation" class="nav-item" active-class="active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        <span class="text" v-if="isOpen">Donasi</span>
      </RouterLink>

      <RouterLink to="/community" class="nav-item" active-class="active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        <span class="text" v-if="isOpen">Komunitas</span>
      </RouterLink>
    </div>

    <div class="sidebar-footer">
      
      <!-- <div class="nav-item action-btn" @click="toggleTheme">
        <span class="icon">{{ store.isDarkMode ? '☀️' : '🌙' }}</span>
        <span class="text" v-if="isOpen">{{ store.isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
      </div> -->

      <div class="user-profile">
        <div class="avatar">
          <img :src="store.user?.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'" alt="User">
        </div>
        <div class="user-info" v-if="isOpen">
          <p class="user-name">{{ store.user?.name || 'User' }}</p>
          <RouterLink to="/profile" class="user-link">Lihat Profil</RouterLink>
        </div>
      </div>

    </div>

  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { store, toggleTheme } from '../store.js'

const isOpen = computed(() => store.value.isSidebarOpen)
</script>

<style scoped>
/* --- 1. Variabel Warna (CSS Murni) --- */
.sidebar {
  /* Warna Light Mode */
  --bg-color: #F9FAFB; /* Abu sangat muda */
  --text-color: #64748B; /* Abu teks */
  --active-bg: #FFFFFF; /* Putih untuk kartu aktif */
  --active-text: #A9C47F; /* Hijau Brand */
  --hover-bg: #F1F5F9;
  --border-color: #E2E8F0;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Warna Dark Mode (Diwariskan dari body.dark-mode) */
:global(body.dark-mode) .sidebar {
  --bg-color: #1E1E1E;
  --text-color: #A0A0A0;
  --active-bg: #2D2D2D;
  --active-text: #A9C47F;
  --hover-bg: #2A2A2A;
  --border-color: #333333;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
}

/* --- 2. Layout Sidebar --- */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px; /* Lebar Terbuka */
  background-color: var(--bg-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  padding: 1.5rem 1rem;
}

.sidebar.collapsed {
  width: 80px; /* Lebar Tertutup (Hanya Ikon) */
  padding: 1.5rem 0.75rem;
}

/* --- 3. Header --- */
.sidebar-header {
  margin-bottom: 2.5rem;
  height: 40px;
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--active-text);
  font-weight: 800;
  font-size: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
}

.logo-icon {
  font-size: 1.8rem;
  min-width: 40px;
  text-align: center;
}

/* --- 4. Menu Navigasi --- */
.sidebar-menu {
  flex-grow: 1; /* Isi ruang kosong */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.8rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.nav-item:hover {
  background-color: var(--hover-bg);
  color: var(--active-text);
}

/* Gaya "Kartu" untuk Menu Aktif (Mirip Referensi) */
.nav-item.active {
  background-color: var(--active-bg);
  color: var(--active-text);
  box-shadow: var(--shadow);
}

.icon {
  width: 24px;
  height: 24px;
  min-width: 24px; /* Agar ikon tidak mengecil */
  text-align: center;
}

/* --- 5. Footer (Profil) --- */
.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.5rem;
  background-color: var(--hover-bg); /* Sedikit beda biar menonjol */
  border-radius: 12px;
  overflow: hidden;
}

.avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--active-text);
}

.user-info {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-color); /* Gunakan warna teks yang sesuai mode */
}

/* PERBAIKAN WARNA DARK MODE KHUSUS */
:global(body.dark-mode) .user-name {
  color: #fff; /* Pastikan nama putih di dark mode */
}

.user-link {
  font-size: 0.75rem;
  color: var(--active-text);
  text-decoration: none;
}

/* Tombol Action (Dark Mode Toggle) */
.action-btn {
  justify-content: flex-start;
}
</style>