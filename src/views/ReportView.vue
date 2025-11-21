<!-- <template>

    <main>
        <section class="page-header">
            <div class="container">
                <h1>Report an Animal in Need</h1>
                <p>Help us save animals by reporting strays or animals requiring assistance</p>
            </div>
        </section>

        <section class="form-section">
            <div class="container">
                <div class="form-container">
                    <form class="report-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="reporter-name">Your Name</label>
                                <input type="text" id="reporter-name" name="reporter-name" placeholder="Enter your full name" required>
                            </div>

                            <div class="form-group">
                                <label for="contact">Contact Number</label>
                                <input type="tel" id="contact" name="contact" placeholder="Your phone number" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="location">Location</label>
                                <input type="text" id="location" name="location" placeholder="Where did you find the animal?" required>
                            </div>

                            <div class="form-group">
                                <label for="animal-type">Animal Type</label>
                                <select id="animal-type" name="animal-type" required>
                                    <option value="">Select animal type</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="bird">Bird</option>
                                    <option value="rabbit">Rabbit</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea id="description" name="description" rows="5" placeholder="Please describe the animal's condition, appearance, and situation..." required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="photo">Upload Photo</label>
                            <div class="file-upload">
                                <input type="file" id="photo" name="photo" accept="image/*">
                                <label for="photo" class="file-upload-label">
                                    <span>📷 Choose Photo</span>
                                </label>
                            </div>
                            <p class="form-hint">Upload a clear photo if possible (optional)</p>
                        </div>

                        <div class="form-group">
                            <label for="urgency">Urgency Level</label>
                            <select id="urgency" name="urgency" required>
                                <option value="">Select urgency level</option>
                                <option value="low">Low - Animal seems stable</option>
                                <option value="medium">Medium - Needs attention soon</option>
                                <option value="high">High - Immediate danger or injury</option>
                            </select>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Submit Report</button>
                            <button type="reset" class="btn btn-secondary">Clear Form</button>
                        </div>
                    </form>

                    <div class="info-box">
                        <h3>Emergency Cases</h3>
                        
                        <p>If the animal is in immediate danger or severely injured, please call our emergency hotline:</p>
                        <p class="emergency-number">📞 +1 (555) 911-PETS</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About Pet Rescue</h3>
                    <p>We are dedicated to rescuing, rehabilitating, and rehoming animals in need. Every life matters, and together we can make a difference.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="/adoption">Adoption</a></li>
                        <li><a href="/foster">Foster Home</a></li>
                        <li><a href="/report">Report Animal</a></li>
                        <li><a href="/articles">Articles</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <ul class="footer-contact">
                        <li>📧 info@petrescue.org</li>
                        <li>📞 +1 (555) 123-4567</li>
                        <li>📍 123 Rescue Street, City, State</li>
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
                <p>&copy; 2025 Pet Rescue. All rights reserved. Made with 💚 for animals in need.</p>
            </div>
            
        </div>
    </footer>
</template>

<script>
export default { name: 'ReportView' }
</script>

<style scoped>
</style> -->
<template>
    <section class="page-header" style="background-color: #F8F8F0; padding: 2rem 0; text-align: left;">
            <div class="container">
                <h1 style="color: #4C6A4C; font-size: 2.5rem; margin-bottom: 0;">Lapor Kucing</h1>
            </div>
        </section>
    <main class="page-content">
        <div class="container">
            <div class="header-toggles">
                <RouterLink to="/lost-cats" class="btn-toggle">Kucing Hilang</RouterLink>
                <RouterLink to="/report" class="btn-toggle active">Buat Laporan</RouterLink>
            </div>
            <section class="page-header" style="padding-top: 1rem;">
                <h1>Lapor Kucing Hilang</h1>
                <p>Laporkan Kucingmu Yang Hilang</p>
            </section>

            <section class="form-section" style="padding: 0 0 4rem 0; background-color: transparent;">
                <div class="form-container" style="max-width: 700px; margin-top: 0;">
                    <form class="report-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="reporter-name">Nama lengkap</label>
                                <input type="text" id="reporter-name" name="reporter-name" placeholder="Maukkan Nama Lengkap" required>
                            </div>

                            <div class="form-group">
                                <label for="contact">Nomor Telepon</label>
                                <input type="tel" id="contact" name="contact" placeholder="No Telepon" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="location">Lokasi</label>
                                <input type="text" id="location" name="Lokasi" placeholder="Lokasi Kucing Hilang" required>
                            </div>

                            <!-- <div class="form-group">
                                <label for="animal-type">Animal Type</label>
                                <select id="animal-type" name="animal-type" required>
                                    <option value="">Select animal type</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="bird">Bird</option>
                                    <option value="rabbit">Rabbit</option>
                                    <option value="other">Other</option>
                                </select>
                            </div> -->
                        </div>

                        <div class="form-group">
                            <label for="description">Deskripsi</label>
                            <textarea id="description" name="description" rows="5" placeholder="Deksripsi kucing yang hilang" required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="photo">Foto</label>
                            <div class="file-upload">
                                <input type="file" id="photo" name="photo" accept="image/*">
                                <label for="photo" class="file-upload-label">
                                    <span>🐾 Upload Photo</span>
                                </label>
                            </div>
                            <p class="form-hint">Unggah foto yang jelas kalau bisa(opsional)</p>
                        </div>

                        <!-- <div class="form-group">
                            <label for="urgency">Urgency Level</label>
                            <select id="urgency" name="urgency" required>
                                <option value="">Select urgency level</option>
                                <option value="low">Low - Animal seems stable</option>
                                <option value="medium">Medium - Needs attention soon</option>
                                <option value="high">High - Immediate danger or injury</option>
                            </select>
                        </div> -->

                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Kirim Laporan</button>
                            <button type="reset" class="btn btn-secondary">Bersihkan Form</button>
                        </div>
                    </form>

                    <div class="info-box">
                        <h3>Kasus Emergency</h3>
                        
                        <p>If the animal is in immediate danger or severely injured, please call our emergency hotline:</p>
                        <p class="emergency-number">📞 +1 (555) 911-PETS</p>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
// Tambahkan RouterLink dari vue-router
import { RouterLink } from 'vue-router'
export default { 
    name: 'ReportView',
    components: {
        RouterLink
    }
}
</script>

<style scoped>
/* Tambahkan style untuk header-toggles jika belum ada di style.css global */
.header-toggles {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.btn-toggle {
  padding: 0.6rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  background-color: var(--light-gray); /* Abu muda */
  color: var(--text-black);
  transition: all 0.2s;
}

.btn-toggle:hover {
  background-color: #d1d1d1;
}

.btn-toggle.active {
  background-color: var(--dark-green); /* Hijau tua */
  color: var(--white);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Sesuaikan padding main.page-content */
.page-content {
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: var(--light-cream);
}
</style>