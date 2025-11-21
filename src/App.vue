<template>
  <div id="app" :class="{ 
      'logged-in-layout': store.isLoggedIn, 
      'sidebar-open': store.isLoggedIn && store.isSidebarOpen 
    }">
    
    <button v-if="store.isLoggedIn" @click="toggleSidebar" class="global-toggle-btn">
      <span class="hamburger-bar"></span>
      <span class="hamburger-bar"></span>
      <span class="hamburger-bar"></span>
    </button>

    <Navbar v-if="!store.isLoggedIn" />

    <Sidebar v-if="store.isLoggedIn" />

    <main>
      <RouterView />
    </main>
    
    <FooterComp />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import FooterComp from './components/Footer.vue'
import Sidebar from './components/Sidebar.vue'
import { store } from './store.js'

export default {
  name: 'App',
  components: {
     Navbar, FooterComp, Sidebar
  },
  data() {
    return {
      store 
    }
  },
  methods: {
    // LANGKAH 2: Fungsi untuk mengubah status di store
    toggleSidebar() {
      store.value.isSidebarOpen = !store.value.isSidebarOpen
    }
  }
}
</script>

<style>
/* Import style.css global-mu */
@import './assets/style.css';

/* ... (style #app dan main lama) ... */
#app { 
  min-height:100vh; 
  display:flex; 
  flex-direction:column; 
}
main { 
  flex:1; 
  padding-top:rem; 
}

/* LANGKAH 3: CSS Dinamis (Intinya di sini) 
*/

/* 1. Beri transisi slide ke main dan footer */
main, .footer {
  transition: margin-left 0.3s ease;
}

/* 2. Style untuk sidebar saat TERTUTUP */
#app.logged-in-layout:not(.sidebar-open) .sidebar {
  /* Geser sidebar ke kiri (hilang dari layar) */
  transform: translateX(-100%);
}

/* 3. Style untuk main saat sidebar TERBUKA */
#app.logged-in-layout.sidebar-open main {
  /* Geser main ke kanan (sesuai angkamu) */
  margin-left: 115px; 
  padding-top: 0;
  padding: 0; 
}

/* 4. Style untuk footer saat sidebar TERBUKA */
#app.logged-in-layout.sidebar-open .footer {
  /* Geser footer ke kanan (sesuai angkamu) */
  margin-left: 115px; 
}

/* 5. Style untuk Tombol Hamburger (Bisa kamu sesuaikan) */
.global-toggle-btn {
  position: fixed; /* Selalu menempel di layar */
  top: 15px;
  left: 15px;
  z-index: 1100; /* Paling depan (di atas sidebar) */
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}

/* 6. Style untuk garis-garis di tombol hamburger */
.hamburger-bar {
  display: block;
  width: 20px;
  height: 2px;
  background-color: #333;
  margin: 4px 0;
}
</style>
