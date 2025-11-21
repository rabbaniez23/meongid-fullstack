<script setup>
import { ref } from 'vue'
// Gunakan RouterLink untuk navigasi di Vue, ini lebih baik dari <a href>
import { RouterLink } from 'vue-router'

// 1. Variabel reaktif untuk melacak status sidebar
const isSidebarOpen = ref(false)

// 2. Fungsi untuk mengubah status (membuka/menutup)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// 3. Fungsi untuk menutup sidebar (dipakai saat link diklik)
const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="logo">
          <RouterLink to="/" @click="closeSidebar">
            <span class="logo-icon">🐾</span>
            <span class="logo-text">Meong id</span>
          </RouterLink>
        </div>

    <ul class="nav-links" :class="{ 'nav-open': isSidebarOpen }">
          <li><RouterLink to="/" @click="closeSidebar">Home</RouterLink></li>
          <li><RouterLink to="/articles" @click="closeSidebar">Artikel</RouterLink></li>
          <li><RouterLink to="/donation" @click="closeSidebar">Donasi</RouterLink></li>
          <li><RouterLink to="/About-us" @click="closeSidebar">About us</RouterLink></li>
          <li><RouterLink to="/login" @click="closeSidebar">Login</RouterLink></li>
        </ul>

        <button class="nav-toggle" @click="toggleSidebar" :class="{ 'is-active': isSidebarOpen }">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
      </nav>
    </div>

    <div 
      class="nav-overlay" 
      v-if="isSidebarOpen" 
      @click="toggleSidebar"
    ></div>
  </header>
</template>

<style scoped>
/* Style Dasar untuk Header & Navigasi Desktop */
.header {
  background: #fff;
  border-bottom: 1px solid #eaeaea;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2d2d2d;
  font-weight: 700;
  font-family: 'Segoe UI', system-ui, sans-serif;
  letter-spacing: -0.5px;
}

.logo-icon {
  font-size: 1.6rem;
  margin-right: 0.6rem;
  transition: transform 0.2s;
}

.logo-icon:hover {
  transform: scale(1.1);
}

.logo-text {
  font-size: 1.35rem;
  font-weight: 700;
}

/* Navigasi Desktop */
.nav-links {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1.8rem;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.nav-links li {
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #444;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.6rem 1.1rem;
  border-radius: 10px;
  transition: all 0.25s ease;
  position: relative;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  background: #A9C47F;
  color: white;
  box-shadow: 0 4px 12px rgba(169, 196, 127, 0.25);
}

/* Tombol Hamburger (Sembunyi di Desktop) */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1050;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.nav-toggle:hover {
  background: #f5f5f5;
}

.hamburger-bar {
  display: block;
  width: 26px;
  height: 3px;
  background-color: #333;
  margin: 5px 0;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Animasi Hamburger */
.nav-toggle.is-active .hamburger-bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
  background: #A9C47F;
}
.nav-toggle.is-active .hamburger-bar:nth-child(2) {
  opacity: 0;
}
.nav-toggle.is-active .hamburger-bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
  background: #A9C47F;
}

/* Overlay Mobile */
.nav-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1001;
}

/* Responsif Mobile */
@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }

  .nav-overlay {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    background: #FFFFF0;
    flex-direction: column;
    align-items: flex-start;
    padding: 3.5rem 2rem 2rem;
    gap: 1.8rem;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.12);
    z-index: 1002;
    transform: translateX(-100%);
    transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .nav-links.nav-open {
    transform: translateX(0);
  }

  .nav-links a {
    width: 100%;
    text-align: left;
    font-size: 1.15rem;
    padding: 0.8rem 1.2rem;
    border-radius: 12px;
  }

  .logo a {
    position: absolute;
    top: 1.5rem;
    left: 2rem;
  }
}
</style>