
<template>
    <main>
        <section class="page-header" style="background-color: #F8F8F0; padding: 2rem 0; text-align: left;">
            <div class="container">
                <h1 style="color: #4C6A4C; font-size: 2.5rem; margin-bottom: 0;">Adopsi Kucing</h1>
            </div>
        </section>

        <div class="container" style="padding-top: 1.5rem; display: flex; justify-content: flex-end;">
            <button @click="openRegistrationModal" class="btn btn-primary" style="background-color: var(--dark-green); padding: 0.75rem 1.5rem;">
                Taro Kucing untuk Adopsi
            </button>
        </div>
        <section class="adoption-section" style="padding-top: 2rem;">
            <div class="container">
                <div class="adoption-filters" style="justify-content: flex-start; gap: 0.75rem;">
                    <div class="search-bar" style="position: relative; flex-grow: 0; width: 400px;">
                         <input type="text" placeholder="🔍Cari nama" class="filter-input">
                    </div>
                    <select class="filter-select" style="width: 150px;">
                        <option value="">Ras</option>
                        <option value="domestic">Domestic</option>
                        <option value="persia">Persia</option>
                    </select>
                    <select class="filter-select" style="width: 150px;">
                        <option value="">Usia</option>
                        <option value="kitten">Kitten</option>
                        <option value="adult">Adult</option>
                    </select>
                    <select class="filter-select" style="width: 150px;">
                        <option value="">Lokasi</option>
                        <option value="jakarta">Jakarta</option>
                        <option value="bandung">Bandung</option>
                    </select>
                </div>

                <div class="adoption-grid">
                    <div class="pet-card" v-for="pet in adoptablePets" :key="pet.name">
                        <img :src="pet.image" :alt="pet.name"> 
                        <div class="pet-info">
                            <h3 style="color: #4C6A4C;">{{ pet.name }}</h3>
                            <p class="pet-description" style="color: #555; font-size: 0.95rem; margin-bottom: 1.5rem;">{{ pet.description }}</p>
                            <button @click="openModal(pet)" class="btn btn-primary btn-full" style="padding: 0.6rem 1rem;">Adopsi</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <h2 class="modal-title">Form Adopsi - {{ selectedPet.name }}</h2>
            <form class="adoption-form" @submit.prevent="submitAdoptionForm">
                <InputField label="Nama Lengkap" type="text" placeholder="Masukkan nama lengkap Anda" required />
                <InputField label="Email" type="email" placeholder="Masukkan alamat email Anda" required />
                <InputField label="Nomor Telepon" type="tel" placeholder="Nomor telepon aktif" required />
                <InputField label="Pekerjaan" type="text" placeholder="Pekerjaan saat ini" required />
                <TextArea label="Alamat Lengkap" placeholder="Alamat lengkap Anda" required />

                <div class="form-actions" style="margin-top: 1.5rem; justify-content: flex-end;">
                    <button type="submit" class="btn btn-primary" style="background-color: #A9C47F;">Kirim Aplikasi Adopsi</button>
                    <button type="button" @click="closeModal" class="btn btn-secondary" style="background-color: #F0F0F0;">Batal</button>
                </div>
            </form>
        </div>
    </div>
    <div v-if="isRegistrationModalOpen" class="modal-overlay" @click.self="closeRegistrationModal">
        <div class="modal-content">
            <form class="registration-form" @submit.prevent="submitRegistrationForm"></form>
            <h2 class="modal-title">Daftarkan Kucing untuk Adopsi</h2>
            <p style="margin-bottom: 1.5rem; color: #555;">Isi detail kucing yang ingin Anda daftarkan.</p>
            <form class="registration-form">
                <InputField label="Nama Kucing" type="text" placeholder="Contoh: Meong, Cimol" required />
                <TextArea label="Deskripsi Kucing" placeholder="Jelaskan usia, ras, sifat, dan kondisi kesehatan kucing" required />
                <InputField label="Nomor Telepon Anda" type="tel" placeholder="Nomor telepon yang bisa dihubungi" required />
                
                <div class="form-group">
                    <label for="photo">Upload Foto Kucing</label>
                    <div class="file-upload">
                        <input type="file" id="photo" name="photo" accept="image/*">
                        <label for="photo" class="file-upload-label">
                            <span>🐾 Pilih Foto</span>
                        </label>
                    </div>
                    <p class="form-hint">Upload foto kucing yang jelas (wajib)</p>
                </div>

                <div class="form-actions" style="margin-top: 1.5rem; justify-content: flex-end;">
                    <button type="submit" class="btn btn-primary btn-full" style="background-color: var(--soft-green);">Kirim Form Adopsi</button>
                </div>
            </form>
            <button type="button" @click="closeRegistrationModal" class="btn btn-secondary btn-full" style="background-color: #F0F0F0; margin-top: 1rem;">Batal</button>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import InputField from '@/components/ui/InputField.vue' // Import jika tidak di register global (tapi di main.js sudah)
import TextArea from '@/components/ui/TextArea.vue' // Import jika tidak di register global (tapi di main.js sudah)

// Data Reaktif untuk Modal
const isModalOpen = ref(false)
const selectedPet = ref({})

const adoptablePets = ref([
    { 
        name: 'Hattoo', 
        description: 'Matanya punya dua warna', 
        image: '/Hatto.jpeg'
    },
    { 
        name: 'Abu', 
        description: 'Punya Warna Abu', 
        image: '/Abu.jpeg' 
        
    },
    // Data lainnya...
])

// Fungsi untuk membuka modal
const openModal = (pet) => {
    selectedPet.value = pet
    isModalOpen.value = true
}

// Fungsi untuk menutup modal
const closeModal = () => {
    isModalOpen.value = false
    selectedPet.value = {}
}
// 🔥 FUNGSI BARU 1: Handler untuk Form Aplikasi Adopsi
const submitAdoptionForm = () => {
    // Tampilkan pesan alert
    alert(`Aplikasi adopsi untuk ${selectedPet.value.name} berhasil dikirim! Kami akan segera menghubungi Anda.`);
    
    // Tutup modal menggunakan fungsi closeModal yang sudah ada
    closeModal();
}



const isRegistrationModalOpen = ref(false)

const openRegistrationModal = () => {
    isRegistrationModalOpen.value = true
}

const closeRegistrationModal = () => {
    isRegistrationModalOpen.value = false
}
// FUNGSI BARU 2: Handler untuk Form Registrasi Kucing
const submitRegistrationForm = () => {
    // Di sini seharusnya ada logika pengiriman data ke server
    
    // Tampilkan pesan alert
    alert('Kucing Anda berhasil didaftarkan untuk adopsi! Mohon tunggu konfirmasi dari admin.');
    
    // Tutup modal
    closeRegistrationModal();
}



// Fungsi Submit Form (dapat ditambahkan logika AJAX di sini)
const submitRegistration = () => {
    alert('Form registrasi kucing berhasil dikirim!');
    closeRegistrationModal();
}
</script>

<style scoped>
/* Styling Tambahan untuk Modal */
.file-upload {
    position: relative;
    /* Ambil dari style.css global */
}
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.modal-content {
    background: white;
    padding: 2.5rem;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: relative;
    /* Tambahkan style border hijau sesuai mockup */
    border: 10px solid #f8f8f0; 
}

.modal-title {
    color: var(--dark-green);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

.adoption-form, .registration-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.registration-form :deep(.form-group) {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.registration-form :deep(input[type="text"]),
.registration-form :deep(input[type="tel"]),
.registration-form :deep(input[type="email"]),
.registration-form :deep(textarea) {
    width: 100%; /* Memastikan lebar penuh */
    box-sizing: border-box; /* Penting untuk padding */
    padding: 0.75rem; /* Ambil dari style.css global */
    border: 2px solid var(--light-gray); /* Ambil dari style.css global */
    border-radius: 10px; /* Ambil dari style.css global */
}

.form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: flex-end;
}

/* Style untuk Filter */
.filter-input {
    padding: 0.75rem;
    border: 2px solid var(--light-gray);
    border-radius: 10px;
    font-size: 1rem;
    font-family: 'Nunito', sans-serif;
    transition: border-color 0.3s;
    width: 100%;
}

.filter-input:focus {
    outline: none;
    border-color: var(--soft-green);
}

/* Penyesuaian Style Card Adopsi (hanya untuk tampilan) */
.pet-card {
    /* Style dasar dari style.css */
    border: 1px solid var(--light-gray);
}
.pet-card img {
    /* Ganti object-fit agar gambar tidak terpotong */
    height: 200px; 
    object-fit: contain; 
    background-color: #e5e5d9; /* Background kontras */
}

/* Override Style Global untuk menyesuaikan layout grid */
.adoption-section {
    padding: 4rem 0;
}
.adoption-filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
}
.adoption-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}
@media (max-width: 768px) {
    .adoption-filters {
        flex-direction: column;
    }
    .adoption-grid {
        grid-template-columns: 1fr;
    }
}
</style>
