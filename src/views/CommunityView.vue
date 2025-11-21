<template>
    <main>
        <section class="page-header">
            <div class="container">
                <h1>Komunitas Pecinta Kucing</h1>
                <p>Berbagi pengalaman, tips, dan terhubung dengan sesama pecinta kucing</p>
                <div class="community-header-buttons">
                    <div class="dropdown">
                        <button id="category-btn" class="btn btn-primary btn-fulldrop">
                            {{ selectedCategory }}
                        </button>
                        <div id="dropdown-menu" class="dropdown-menu">
                            <a href="#" @click.prevent="selectCategory('Semua Kategori')">Semua Kategori</a>
                            <a href="#" @click.prevent="selectCategory('Kesehatan')">Kesehatan</a>
                            <a href="#" @click.prevent="selectCategory('Perawatan')">Perawatan</a>
                            <a href="#" @click.prevent="selectCategory('Nutrisi')">Nutrisi</a>
                            <a href="#" @click.prevent="selectCategory('Adopsi')">Adopsi</a>
                            <a href="#" @click.prevent="selectCategory('Perilaku')">Perilaku</a>
                            <a href="#" @click.prevent="selectCategory('Tips & Trik')">Tips & Trik</a>
                        </div>
                    </div>
                        <button @click="showPopup = true" class="btn btn-primary btn-fulldrop">➕ Buat Post</button>
                </div>
            </div>
        </section>

        <section class="community-section">
            <div class="container">
                <div class="community-layout">
                    <div class="posts-container">
                       <div class="post-card" v-for="(post, index) in filteredPosts" :key="index">
                            <div class="post-header">
                                <div class="post-user">
                                    <div class="user-avatar">{{ post.avatar }}</div>
                                    <div class="user-info">
                                        <h4>{{ post.user }}</h4>
                                        <p class="post-time">{{ post.tanggal }}</p>
                                    </div>
                                </div>
                            <div class="post-category-badge" :class="categoryClass(post.kategori)">
                                {{ post.kategori }}
                            </div>
                        </div>
                        <div class="post-content">
                            <div class="text-content">
                                <h3>{{ post.judul }}</h3>
                                <p>{{ post.isi }}</p>
                            </div>
                            <div v-if="post.foto" class="post-image-container">
                                <img :src="post.foto" :alt="post.judul" class="post-image" />
                            </div>
                        </div>
                        
                        <div class="post-footer">
                            <span v-if="post.comments.length > 0" class="post-stat post-stat-clickable" @click="toggleComments(index)">
                                💬 {{ post.comments.length }} balasan
                            </span>
                            <span v-else class="post-stat post-stat-clickable" @click="toggleComments(index)">
                                💬 0 balasan
                            </span>
                            
                            <span
                                class="post-stat post-stat-clickable like-area"
                                @click="toggleLike(index)"
                            >
                                <span :class="['heart-icon', { liked: post.disukai }]">❤️</span>
                                {{ post.suka }} suka
                                <transition name="pop-heart">
                                <span v-if="post.showHeart" class="heart-pop">❤️</span>
                                </transition>
                            </span>
                        </div>

                            <div class="comment-section" v-if="activePostIndexForComments === index">
                                <div class="comment-title">
                                    <h4>{{ post.comments.length }} Komentar</h4>
                                </div>
                                <div class="comment-list">
                                    <div class="comment-item" v-for="(comment, cIndex) in post.comments" :key="cIndex">
                                        <div class="comment-user-avatar">{{ comment.user.charAt(0) }}</div>
                                        <div class="comment-body">
                                            <strong>{{ comment.user }}:</strong> {{ comment.text }}
                                        </div>
                                    </div>
                                    <div v-if="post.comments.length === 0" class="no-comments">
                                        Belum ada balasan. Jadilah yang pertama berkomentar!
                                    </div>
                                </div>
                                <div class="comment-input-area">
                                    <input type="text" placeholder="Tulis komentar Anda..." class="comment-input"/>
                                    <button class="btn-comment-send">Kirim</button>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </section>
    </main>

    <div v-if="showPopup" class="popup">
        <div class="popup__content">
            <div class="form">
                <h2>Buat Post Baru</h2>
                <div class="form-group">
                    <label for="kategori-post">Kategori</label>
                    <select id="kategori-post" v-model="newPost.kategori" required>
                        <option value="" disabled selected>Pilih Kategori</option>
                        <option value="Kesehatan">Kesehatan</option>
                        <option value="Perawatan">Perawatan</option>
                        <option value="Nutrisi">Nutrisi</option>
                        <option value="Adopsi">Adopsi</option>
                        <option value="Perilaku">Perilaku</option>
                        <option value="Tipsntrik">Tips & Trik</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="judul">Judul Post</label>
                    <input type="text" id="judul" v-model="newPost.judul" placeholder="Tulis judul yang menarik..." required />
                </div>
                <div class="form-group">
                    <label for="isi">Isi Post</label>
                    <textarea id="isi" v-model="newPost.isi" rows="5" placeholder="Tulis pertanyaan atau pengalaman..." required></textarea>
                </div>
            
                <div class="form-group">
                    <label for="foto">Upload Foto</label>
                    <input type="file" id="foto" @change="handleFileUpload" accept="image/*" />
                    <div v-if="newPost.foto" class="new-post-preview mt-2">
                        <img :src="newPost.foto" alt="Pratinjau Foto" style="max-width: 100%; max-height: 150px; border-radius: 4px; display: block; margin-top: 10px;" />
                    </div>
                </div>
                <div class="modal-buttons">
                    <button class="btn-posting" @click="submitPost">Posting</button>
                    <button class="btn-batal" @click="showPopup = false">Batal</button>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
    export default {
        name: "CommunityView",
            data() {
                return {
                    showPopup: false,
                    selectedCategory: "Semua Kategori",
                    activePostIndexForComments: null,
                    newPost: {
                        kategori: "",
                        judul: "",
                        isi: "",
                        foto: null, 
                    },
                    posts: [
                        {
                            user: "Rifa_danindra",
                            avatar: "R",
                            tanggal: "30/10/2025",
                            kategori: "Kesehatan",
                            foto: "/Post1.jpg", 
                            judul: "Kucing saya tidak mau makan sejak 2 hari yang lalu, apa yang harus dilakukan?",
                            isi: "Halo semuanya, kucing saya Luna (2 tahun) tiba-tiba tidak mau makan sejak 2 hari lalu. Dia masih minum air dan aktifbermain, tapi sama sekali tidak tertarik dengan makanannya. Sudah coba ganti makanan tapi tetap tidak mau. Ada yangpunya pengalaman serupa?",
                            suka: 67,
                            disukai: false, 
                            showHeart: false, 
                            comments: [ 
                                { user: "Niha_april", text: "Coba bawa ke dokter hewan, bisa jadi kucingnya lagi stress." },
                                { user: "PencintaKucing", text: "Setuju, lebih baik segera konsultasi ke vet. Dehidrasi bisa cepat terjadi!" }
                            ]
                        },
                        {
                            user: "Niha_april",
                            avatar: "N",
                            tanggal: "30/09/2025",
                            kategori: "Perawatan",
                            foto: null, 
                            judul: "Tips memandikan kucing yang takut air",
                            isi: "Kucing saya Milo sangat takut air. Setiap kali dimandikan selalu stress dan menggaruk-garuk. Adakah tips untuk memandikan kucing yang takut air? Atau alternatif lain untuk membersihkan kucing tanpa air?.",
                            suka: 67,
                            disukai: false, 
                            showHeart: false, 
                            comments: [ 
                                { user: "UserA", text: "Mungkin bisa coba pakai kain lap basah (grooming wipes) yang khusus kucing, itu efektif kok!" },
                                { user: "UserB", text: "Atau gunakan sampo kering (dry shampoo). Kucing saya juga takut air, ini sangat membantu." }
                            ]
                        },
                        {
                            user: "NaufalRizky_rabbani",
                            avatar: "N",
                            tanggal: "12/04/2025",
                            kategori: "Perilaku",
                            foto: null,
                            judul: "Kucing saya tiba-tiba sering mengeong tengah malam, normal nggak ya?",
                            isi: "Halo semuanya, aku mau curhat dikit nih. Kucing aku, namanya Coco (umur 1 tahun), akhir-akhir ini sering banget mengeongkeras tiap tengah malam. Kadang sampai aku kebangun karena suaranya. Siangnya dia biasa aja, aktif dan mau makan. Akuudah coba ganti jadwal makan dan main sebelum tidur, tapi tetep aja suka konser jam 2 pagi. Ada yang pernah ngalaminhal serupa? Ini tanda kangen, lapar, atau mungkin lagi birahi ya?.",
                            suka: 31,
                            disukai: false, 
                            showHeart: false, 
                            comments: [ 
                                { user: "Maya_catmom", text: "Coba cek apakah ada birahi, biasanya kucing jantan/betina yang birahi memang lebih berisik di malam hari." },
                            ]
                        },
                        {
                            user: "Putri_11",
                            avatar: "P",
                            tanggal: "22/03/2025",
                            kategori: "Perilaku",
                            foto: "/Post4.jpg",
                            judul: "Kucing aku tiba-tiba jadi manja banget setelah disteril, wajar nggak sih?",
                            isi: "Hai semua pecinta kucing! Aku baru aja steril kucing betina aku minggu lalu. Setelah pulih, dia jadi manja banget. Biasanya nggak suka dipeluk, tapi sekarang nempel terus kayak bayangan. Aku senang sih, tapi agak bingung apakah ini efek dari steril atau cuma fase sementara aja. Ada yang punya pengalaman sama kayak gini?",
                            suka: 89,
                            disukai: false, 
                            showHeart: false, 
                            comments: [ 
                                { user: "Doctor_vet", text: "Sangat wajar! Steril mengurangi hormon yang membuat kucing aktif berburu atau mencari pasangan, sehingga lebih fokus pada bonding dengan pemilik." },
                            ]
                        },
                        {
                            user: "Firda_rzk",
                            avatar: "F",
                            tanggal: "26/02/2025",
                            kategori: "Kesehatan",
                            foto: "/Post5.jpg",
                            judul: "Kucing saya lesu dan tidak mau main, apakah harus dibawa ke dokter?",
                            isi: "Halo semuanya, aku lagi khawatir banget. Kucing aku, Neko, dari kemarin kelihatan lesu banget. Biasanya aktif banget dan suka lari-lari, tapi sekarang cuma tiduran dan makannya juga berkurang. Suhunya agak hangat kalau aku pegang. Aku udah coba kasih air dan makanan kesukaannya, tapi tetap nggak terlalu tertarik. Kira-kira ini masih bisa dipantau di rumah atau sebaiknya langsung ke dokter hewan ya?",
                            suka: 52,
                            disukai: false, 
                            showHeart: false, 
                            comments: [ 
                                { user: "Rifa_danindra", text: "Kalau sudah ada gejala lesu dan agak hangat, sebaiknya segera bawa ke dokter hewan. Jangan tunda ya!" },
                            ]
                        },
                         {
                            user: "Syahrul_",
                            avatar: "S",
                            tanggal: "07/11/2025",
                            kategori: "Nutrisi",
                            foto: null, 
                            judul: "Bagaimana cara menjaga pola makan kucing agar tetap sehat?",
                            isi: "Halo semuanya, saya ingin tahu bagaimana cara memastikan kucing saya mendapat nutrisi yang seimbang. Apakah lebih baik memberi makanan kering, basah, atau kombinasi keduanya? Saya ingin kucing saya tetap sehat dan tidak gampang bosan dengan makanannya.",
                            suka: 1,
                            disukai: false, 
                            showHeart: false, 
                            comments: [ ] 
                        },
                    ]
                };
            },
            computed: {
                filteredPosts() {
                    if (this.selectedCategory === "Semua Kategori") {
                        return this.posts;
                    }
                    return this.posts.filter(p => p.kategori === this.selectedCategory);
                }
            },
      
            methods: {
                // METHOD BARU DARI CONTOH
                toggleLike(index) {
                    const post = this.posts[index];
                    if (post.disukai) {
                        post.suka--;
                        post.disukai = false;
                    } else {
                        post.suka++;
                        post.disukai = true;
                        post.showHeart = true;
                        setTimeout(() => (post.showHeart = false), 600);
                    }
                },
                // Method lama
                selectCategory(category){
                    this.selectedCategory = category;
                },
                categoryClass(kategori) {
                    switch (kategori) {
                        case "Kesehatan": return "badge-kesehatan";
                        case "Perawatan": return "badge-perawatan";
                        case "Nutrisi": return "badge-nutrisi";
                        case "Perilaku": return "badge-perilaku";
                        case "Adopsi": return "badge-adopsi";
                        case "Tipsntrik": 
                        case "Tips & Trik": return "badge-tips"; 
                        default: return "";
                    }
                },
                toggleComments(index) {
                    if (this.activePostIndexForComments === index) {
                        this.activePostIndexForComments = null; 
                    } else {
                        this.activePostIndexForComments = index; 
                    }
                },
                handleFileUpload(event) {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.newPost.foto = e.target.result; 
                        };
                        reader.readAsDataURL(file); 
                    } else {
                        this.newPost.foto = null;
                    }
                },
                submitPost() {
                    if (!this.newPost.judul || !this.newPost.isi || !this.newPost.kategori) {
                        alert("Lengkapi semua data sebelum posting!");
                    return;
                }
                
                const newPostData = {
                    user: "Pengguna_Baru",
                    avatar: "P",
                    tanggal: new Date().toLocaleDateString("id-ID"),
                    kategori: this.newPost.kategori,
                    judul: this.newPost.judul,
                    isi: this.newPost.isi,
                    suka: 0,
                    disukai: false, 
                    showHeart: false, 
                    foto: this.newPost.foto, 
                    comments: [], 
                };

                this.posts.unshift(newPostData);

                alert(`Post berhasil dikirim!\nJudul: ${this.newPost.judul}`);
                this.showPopup = false;
                this.newPost = { kategori: "", judul: "", isi: "", foto: null }; 
                },
            },
            mounted() {
            const dropdownBtn = document.getElementById("category-btn");
            const dropdown = dropdownBtn?.closest(".dropdown");
            const dropdownMenu = dropdown?.querySelector(".dropdown-menu");

            if (dropdownBtn && dropdownMenu) {
                dropdownBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle("show");
                });
             
            document.addEventListener("click", (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove("show");
                }
            });
        }
    },
};
</script>

<style scoped>
.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--dark-green);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.community-header-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.community-header-buttons .btn {
  display: inline-flex;           
  align-items: center;            
  justify-content: center;        
  gap: 0.5rem;                    
  padding: 0.6rem 1.8rem;           
  height: 45px;                    
  line-height: 1;                 
  font-weight: 600;
  border-radius: 25px;
  color: var(--white);
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}


.dropdown {
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 110%;
  left: 0;
  background-color: var(--white);
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 0.5rem 0;
  min-width: 180px;
  z-index: 10;
}

.dropdown-menu a {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--text-black);
  text-decoration: none;
  transition: background 0.2s;
}

.dropdown-menu a:hover {
  background-color: var(--light-cream);
}

.dropdown.show .dropdown-menu {
  display: block;
}

.post-category-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.3rem 0.8rem;
  border-radius: 10px;
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  text-transform: capitalize;
}

.badge-kesehatan { background-color: #54ff9b; color: white; }   
.badge-perawatan { background-color: #3498db; color: white; }   
.badge-nutrisi { background-color: #e67e22; color: white; }     
.badge-perilaku { background-color: #9b59b6; color: white; }   
.badge-adopsi { background-color: #e84393; color: white; }      
.badge-tips { background-color: #f1c40f; color: #333; } 


.community-section {
  text-align: left;
  align-items: flex-start;
}

.community-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-card {
    position: relative;
    border-radius: 15px;
    padding: 1.5rem;
}

.community-buttons .btn-primary {
  background-color: var(--soft-green);
  color: var(--white);
}

.community-buttons .btn-primary:hover {
  background-color: var(--dark-green);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.post-content {
    display: flex; 
    gap: 20px;     
    margin-bottom: 15px; 
    align-items: flex-start; 
    flex-wrap: wrap; 
}

.text-content {
    flex: 2; 
    min-width: 250px; 
}

.text-content p {
    text-align: justify; 
    margin-top: 10px;    
}

.post-image-container {
    flex: 1; 
    min-width: 200px; 
    max-width: 300px; 
    max-height: 300px; 
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 0; 
}

.post-image {
    width: 100%;
    height: 100%; 
    display: block;
    object-fit: cover;
}

@media (max-width: 768px) {
    .post-content {
        flex-direction: column; 
        align-items: center; 
    }
    .text-content, .post-image-container {
        width: 100%; 
        max-width: 100%;
        min-width: unset;
    }
    .post-image-container {
        margin-top: 15px; 
    }
}

.post-stat-clickable {
    cursor: pointer;
    font-weight: 600;
    color: var(--text-black); 
    transition: color 0.2s;
    user-select: none; 
}
.post-stat-clickable:hover {
    color: var(--dark-green);
}

.comment-section {
    margin-top: 15px;
    background-color: var(--light-cream); 
    padding: 15px;
    border-radius: 10px;
}

.comment-title h4 {
    font-size: 1rem;
    color: var(--dark-green);
    margin-bottom: 10px;
    border-bottom: 1px solid var(--light-gray);
    padding-bottom: 5px;
}

.comment-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 250px; 
    overflow-y: auto;
    padding-right: 5px;
    margin-bottom: 15px;
}

.comment-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.95rem;
}

.no-comments {
    text-align: center;
    font-style: italic;
    color: #666;
    padding: 10px 0;
}

.comment-user-avatar {
    width: 30px;
    height: 30px;
    min-width: 30px;
    border-radius: 50%;
    background-color: #d0d0d0;
    color: var(--text-black);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.8rem;
}

.comment-body {
    flex-grow: 1;
    line-height: 1.4;
}

.comment-body strong {
    color: var(--dark-green);
    margin-right: 5px;
    font-weight: 700;
}

.comment-input-area {
    display: flex;
    gap: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--light-gray);
}

.comment-input {
    flex-grow: 1;
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid var(--light-gray);
    font-size: 0.9rem;
}

.btn-comment-send {
    background-color: var(--soft-green);
    color: var(--white);
    border: none;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
}

.btn-comment-send:hover {
    background-color: var(--dark-green);
}

/* ... Style Popup ... */
.popup {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup__content {
  background: white;
  padding: 25px;
  border-radius: 15px;
  width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-posting,
.btn-batal {
  padding: 10px 25px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
}

.btn-posting {
  background-color: var(--soft-green);
  color: var(--text-black);
}

.btn-batal {
  background-color: var(--light-gray);
  color: var(--text-black);
}


/* === STYLE BARU UNTUK 'LIKE' DARI CONTOH === */

.like-area {
  position: relative;
}

.heart-icon {
  font-size: 1.1rem;
  transition: transform 0.2s ease, color 0.2s ease;
  margin-right: 6px;
  font-style: normal; /* Memastikan emoji tidak miring */
}

.heart-icon.liked {
  color: #e74c3c;
  transform: scale(1.3);
}

/* Efek hati pop-up */
.heart-pop {
  position: absolute;
  top: -15px;
  right: 20px; 
  font-size: 1.2rem;
  color: #e74c3c;
  animation: pop-up 0.6s ease forwards;
  font-style: normal;
}

@keyframes pop-up {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.5) translateY(-10px);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) translateY(-25px);
  }
}
</style>