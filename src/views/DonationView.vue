<template>
  <div class="donation-page">
    
    <transition name="slide-down">
      <div v-if="isSuccess" class="success-alert">
        <div class="alert-content">
          <div class="icon-check">✓</div>
          <div class="text">
            <h4>Alhamdulillah, Donasi Berhasil!</h4>
            <p>Terima kasih <b>{{ form.isAnonymous ? 'Orang Baik' : form.name }}</b>, donasi Anda sangat berarti.</p>
          </div>
          <button @click="isSuccess = false" class="close-btn">✕</button>
        </div>
      </div>
    </transition>

    <PageHeader 
      title="Mari Berbagi Kebaikan"
      subtitle="Sedikit bantuanmu, nyawa bagi mereka."
    />

    <div class="container main-content">
      <div class="form-wrapper">
        
        <form @submit.prevent="submitDonation">
          
          <div class="section-box">
            <h3 class="section-title">Mau donasi berapa?</h3>
            <div class="nominal-grid">
              <label 
                v-for="amount in presets" 
                :key="amount"
                class="nominal-card"
                :class="{ active: selectedNominal === amount }"
              >
                <input type="radio" v-model="selectedNominal" :value="amount">
                <span class="amount-text">Rp {{ formatPrice(amount) }}</span>
                <div class="check-mark" v-if="selectedNominal === amount">✓</div>
              </label>

              <label class="nominal-card" :class="{ active: selectedNominal === 'custom' }">
                <input type="radio" v-model="selectedNominal" value="custom">
                <span class="amount-text">Nominal Lain</span>
              </label>
            </div>

            <div v-if="selectedNominal === 'custom'" class="custom-input-box">
              <span class="currency-label">Rp</span>
              <input 
                type="number" 
                v-model="customAmount" 
                placeholder="Masukkan jumlah (min 10.000)"
                class="input-clean"
              >
            </div>
          </div>

          <div class="section-box">
            <h3 class="section-title">Metode Pembayaran</h3>
            <div class="payment-list">
              <label class="payment-item" :class="{ active: form.paymentMethod === 'qris' }">
                <input type="radio" v-model="form.paymentMethod" value="qris">
                <div class="payment-info">
                  <span class="payment-icon">📷</span> 
                  <span>QRIS (Gopay, OVO, Dana, ShopeePay)</span>
                </div>
                <div class="radio-circle"></div>
              </label>

              <label class="payment-item" :class="{ active: form.paymentMethod === 'bca' }">
                <input type="radio" v-model="form.paymentMethod" value="bca">
                <div class="payment-info">
                  <span class="payment-icon">🏦</span> 
                  <span>Transfer Bank BCA</span>
                </div>
                <div class="radio-circle"></div>
              </label>

              <label class="payment-item" :class="{ active: form.paymentMethod === 'mandiri' }">
                <input type="radio" v-model="form.paymentMethod" value="mandiri">
                <div class="payment-info">
                  <span class="payment-icon">🏦</span> 
                  <span>Transfer Bank Mandiri</span>
                </div>
                <div class="radio-circle"></div>
              </label>
            </div>
          </div>

          <div class="section-box">
            <h3 class="section-title">Data Donatur</h3>
            
            <div class="form-group">
              <input 
                type="text" 
                v-model="form.name" 
                placeholder="Nama Lengkap" 
                class="input-style"
                :disabled="form.isAnonymous"
                required
              >
            </div>

            <div class="form-group">
              <input 
                type="email" 
                v-model="form.email" 
                placeholder="Email atau WhatsApp (Opsional)" 
                class="input-style"
              >
            </div>

            <div class="form-group">
              <textarea 
                v-model="form.message" 
                placeholder="Tulis doa atau dukungan (Opsional)" 
                rows="3"
                class="input-style"
              ></textarea>
            </div>

            <div class="toggle-box">
              <label class="switch-label">
                <input type="checkbox" v-model="form.isAnonymous">
                <span class="slider round"></span>
              </label>
              <span class="toggle-text">Sembunyikan nama saya (Hamba Allah)</span>
            </div>
          </div>

          <div class="sticky-footer">
            <button type="submit" class="btn-donate-now" :disabled="isLoading">
              <span v-if="isLoading">Sedang Memproses...</span>
              <span v-else>
                Donasi Sekarang 
                <strong v-if="finalAmount > 0">Rp {{ formatPrice(finalAmount) }}</strong>
              </span>
              <span class="arrow-icon">➜</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import { ref, reactive, computed, onMounted, watch } from 'vue'
import { store } from '../store.js'

const route = useRoute()
const isLoading = ref(false)
const isSuccess = ref(false)

// Pilihan nominal
const presets = [10000, 25000, 50000, 100000, 250000, 500000]
const selectedNominal = ref(50000)
const customAmount = ref('')

const form = reactive({
  name: '',
  email: '',
  message: '',
  paymentMethod: 'qris',
  isAnonymous: false
})

// Isi data otomatis jika login
onMounted(() => {
  if (store.value.isLoggedIn && store.value.user) {
    form.name = store.value.user.name
    form.email = store.value.user.email
  }
})

// Hitung nominal akhir
const finalAmount = computed(() => {
  if (selectedNominal.value === 'custom') {
    return parseInt(customAmount.value) || 0
  }
  return selectedNominal.value
})

// Format Rupiah (tanpa ,00)
const formatPrice = (value) => {
  return new Intl.NumberFormat('id-ID').format(value)
}

// Handler Submit
const submitDonation = async () => {
  if (finalAmount.value < 10000) {
    alert('Mohon maaf, minimal donasi adalah Rp 10.000 🙏')
    return
  }
  
  isLoading.value = true
  
  // PERBAIKAN: Masukkan campaignId ke dalam data yang akan dikirim
  const donationData = {
    amount: finalAmount.value,
    paymentMethod: form.paymentMethod,
    message: form.message,
    // Ambil ID dari URL, jika tidak ada (misal di halaman /donation biasa) default ke 1
    campaignId: route.params.id || 1, 
    donorId: store.value.isLoggedIn ? store.value.user.id : null 
  }

  try {
    const response = await fetch('http://localhost:3000/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Kirim header Authorization hanya jika ada token
        ...(store.value.token && { 'Authorization': `Bearer ${store.value.token}` })
      },
      // Hapus baris campaignId dari sini
      body: JSON.stringify(donationData)
    })

    const result = await response.json()

    if (response.ok) {
      // SUKSES!
      isSuccess.value = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      // Reset form
      form.message = ''
      if(!store.value.isLoggedIn) {
        form.name = ''
        form.email = ''
      }
    } else {
      alert(result.message || 'Gagal donasi')
    }
  } catch (error) {
    console.error(error)
    alert('Terjadi kesalahan koneksi')
  } finally {
    isLoading.value = false
  }
}

// Watcher: Jika checkbox anonim dicentang, ubah nama jadi Hamba Allah di tampilan (opsional)
watch(() => form.isAnonymous, (newVal) => {
  if (newVal) {
    // Simpan nama asli dulu jika mau dikembalikan
    // Disini kita biarkan input disabled
  }
})
</script>


<style scoped>
.donation-page {
  background-color: #F6F4EE; /* Warna background soft cream */
  min-height: 100vh;
  padding-bottom: 80px; /* Space untuk sticky button */
}

/* ALERT SUKSES */
.success-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.alert-content {
  background-color: #4CAF50; /* Hijau Sukses */
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  min-width: 300px;
}

.icon-check {
  background: white;
  color: #4CAF50;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto;
}

/* ANIMASI */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* LAYOUT */
.container.main-content {
  max-width: 600px; /* Lebih ramping seperti di HP */
  margin: -2rem auto 0; /* Naik sedikit menutupi header */
  position: relative;
  z-index: 10;

}

.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

}

.section-box {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin: 4rem 0 0;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
  display: inline-block;

}

/* NOMINAL GRID */
.nominal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 kolom */
  gap: 10px;
}

.nominal-card {
  border: 2px solid #eee;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  font-weight: 600;
  color: #555;
}

.nominal-card input { display: none; } /* Sembunyikan radio asli */

.nominal-card:hover {
  border-color: #A9C47F;
  background-color: #fdfaf6;
}

.nominal-card.active {
  border-color: #A9C47F;
  background-color: #A9C47F;
  color: white;
  box-shadow: 0 4px 10px rgba(169, 196, 127, 0.4);
}

.check-mark {
  position: absolute;
  top: 5px;
  right: 5px;
  background: white;
  color: #A9C47F;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* INPUT CUSTOM */
.custom-input-box {
  margin-top: 1rem;
  position: relative;
}
.currency-label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  color: #4C6A4C;
}
.input-clean {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 3rem;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  outline: none;
  color: #333;
}
.input-clean:focus {
  border-color: #A9C47F;
}

/* PAYMENT METHODS */
.payment-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.payment-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-item input { display: none; }

.payment-item.active {
  border-color: #A9C47F;
  background-color: #f9fff0;
}

.payment-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #444;
}

.payment-icon { font-size: 1.5rem; }

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
}

.payment-item.active .radio-circle {
  border-color: #A9C47F;
}

.payment-item.active .radio-circle::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 10px; height: 10px;
  background: #A9C47F;
  border-radius: 50%;
}

/* FORM INPUTS */
.input-style {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  margin-bottom: 0.5rem;
}
.input-style:focus {
  outline: none;
  border-color: #A9C47F;
}

/* TOGGLE SWITCH (ANONIM) */
.toggle-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
}
.switch-label {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}
.switch-label input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 16px; width: 16px;
  left: 3px; bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider { background-color: #A9C47F; }
input:checked + .slider:before { transform: translateX(18px); }
.toggle-text { font-size: 0.9rem; color: #666; }

/* STICKY FOOTER BUTTON */
.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 1rem;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  z-index: 999;
}

.btn-donate-now {
  background-color: #33888c; /* Warna mirip referensi */
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  width: 100%;
  max-width: 600px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s;
}

.btn-donate-now:hover {
  background-color: #2b7578;
  transform: translateY(-2px);
}

.btn-donate-now:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (min-width: 768px) {
  .nominal-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 kolom di desktop */
  }
}
</style>