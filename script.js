// Interaktivitas Halaman Toko Urban
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu Toggle (Mobile)
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navbarMenu = document.getElementById('navbar-menu');

    if (hamburgerBtn && navbarMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = hamburgerBtn.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        // Tutup menu saat salah satu link navigasi diklik
        document.querySelectorAll('.navbar .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navbarMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Tutup menu saat pengguna mengklik di luar area navbar
        document.addEventListener('click', (e) => {
            if (!navbarMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navbarMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. Pemilihan Ukuran atau Varian
    const optionButtons = document.querySelectorAll('.size-button, .variant-button');
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.closest('.size-options');
            if (container) {
                container.querySelectorAll('.size-button, .variant-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        });
    });

    // 3. Tombol Aksi Beli Sekarang (Mendukung Banyak Kartu Produk)
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.detail-content') || document;
            const productTitle = card.querySelector('.detail-title')?.textContent || 'Produk';
            const activeOption = card.querySelector('.size-button.active, .variant-button.active')?.textContent || '';
            const variantText = activeOption ? ` (Varian: ${activeOption})` : '';
            alert(`Terima kasih! ${productTitle}${variantText} berhasil ditambahkan ke keranjang belanja.`);
        });
    });

    // 4. Navigasi Pill Pilihan Produk Aktif
    const navPills = document.querySelectorAll('.product-nav-pills .nav-pill');
    if (navPills.length > 0) {
        navPills.forEach(pill => {
            pill.addEventListener('click', () => {
                navPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
            });
        });

        // Set active pill berdasarkan hash URL jika ada saat pertama buka
        if (window.location.hash) {
            const currentPill = document.querySelector(`.product-nav-pills a[href="${window.location.hash}"]`);
            if (currentPill) {
                navPills.forEach(p => p.classList.remove('active'));
                currentPill.classList.add('active');
            }
        }
    }

    // 5. Filter Kategori Simpel di Halaman Depan (index.html)
    const filterTabs = document.querySelectorAll('.category-filter-tabs .filter-tab');
    const groupSepatu = document.getElementById('sepatu');
    const groupTas = document.getElementById('tas');

    function applyCategoryFilter(category) {
        if (!filterTabs.length || !groupSepatu || !groupTas) return;

        // Perbarui tombol tab aktif
        filterTabs.forEach(tab => {
            if (tab.dataset.target === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Tampilkan/sembunyikan grup produk
        if (category === 'sepatu') {
            groupSepatu.classList.add('active');
            groupTas.classList.remove('active');
        } else if (category === 'tas') {
            groupTas.classList.add('active');
            groupSepatu.classList.remove('active');
        } else if (category === 'semua') {
            groupSepatu.classList.add('active');
            groupTas.classList.add('active');
        }
    }

    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                applyCategoryFilter(tab.dataset.target);
            });
        });

        // Tangani tombol "Pilih Sepatu" atau "Pilih Tas" di Hero & Category Card
        document.querySelectorAll('[data-filter]').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const targetFilter = trigger.dataset.filter;
                if (targetFilter) {
                    applyCategoryFilter(targetFilter);
                }
            });
        });

        // Cek URL hash saat pertama kali halaman dimuat
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash === 'sepatu' || currentHash === 'tas') {
            applyCategoryFilter(currentHash);
        }
    }

    // 6. Sistem Accordion FAQ Produk (Pojok Kanan Bawah)
    const faqWidget = document.getElementById('faqWidget');
    const faqToggleBtn = document.getElementById('faqToggleBtn');
    const faqPopup = document.getElementById('faqPopup');
    const faqCloseBtn = document.getElementById('faqCloseBtn');
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqToggleBtn && faqPopup) {
        // Toggle Buka/Tutup Pop-up FAQ
        faqToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = faqPopup.classList.toggle('active');
            faqToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Tombol Tutup FAQ (X)
        if (faqCloseBtn) {
            faqCloseBtn.addEventListener('click', () => {
                faqPopup.classList.remove('active');
                faqToggleBtn.setAttribute('aria-expanded', 'false');
            });
        }

        // Tutup jika klik di luar area widget
        document.addEventListener('click', (e) => {
            if (faqWidget && !faqWidget.contains(e.target)) {
                faqPopup.classList.remove('active');
                faqToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Logika Accordion (Buka satu, tutup yang lain)
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            if (questionBtn) {
                questionBtn.addEventListener('click', () => {
                    const isAlreadyActive = item.classList.contains('active');

                    // Tutup semua item terlebih dahulu (true accordion)
                    faqItems.forEach(otherItem => otherItem.classList.remove('active'));

                    // Jika sebelumnya belum aktif, buka item ini
                    if (!isAlreadyActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // 7. Sistem Ikon Love (Wishlist) & Menu Favorit
    const WISHLIST_STORAGE_KEY = 'toko_urban_wishlist';
    const openWishlistBtn = document.getElementById('openWishlistBtn');
    const closeWishlistBtn = document.getElementById('closeWishlistBtn');
    const wishlistDrawer = document.getElementById('wishlistDrawer');
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    const wishlistCountBadge = document.getElementById('wishlistCount');
    const wishlistHeaderCount = document.getElementById('wishlistHeaderCount');
    const wishlistEmpty = document.getElementById('wishlistEmpty');
    const wishlistItemsList = document.getElementById('wishlistItemsList');

    function getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveWishlist(items) {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
        updateWishlistUI();
    }

    function toggleWishlist(product) {
        let items = getWishlist();
        const existingIndex = items.findIndex(item => item.id === product.id);

        if (existingIndex > -1) {
            items.splice(existingIndex, 1);
        } else {
            items.push(product);
        }
        saveWishlist(items);
    }

    function removeFromWishlist(productId) {
        let items = getWishlist();
        items = items.filter(item => item.id !== productId);
        saveWishlist(items);
    }

    function updateWishlistUI() {
        const items = getWishlist();
        const count = items.length;

        // Perbarui badge jumlah favorit di navbar dan header drawer
        if (wishlistCountBadge) wishlistCountBadge.textContent = count;
        if (wishlistHeaderCount) wishlistHeaderCount.textContent = `(${count})`;

        // Perbarui keadaan tombol love pada seluruh kartu produk di halaman
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const btnId = btn.dataset.id;
            const isLiked = items.some(item => item.id === btnId);
            if (isLiked) {
                btn.classList.add('active');
                btn.setAttribute('aria-label', `Hapus dari Favorit (${btn.dataset.title})`);
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-label', `Sukai ${btn.dataset.title}`);
            }
        });

        // Perbarui daftar produk di dalam drawer
        if (wishlistItemsList && wishlistEmpty) {
            if (count === 0) {
                wishlistEmpty.style.display = 'flex';
                wishlistItemsList.innerHTML = '';
            } else {
                wishlistEmpty.style.display = 'none';
                wishlistItemsList.innerHTML = items.map(item => `
                    <div class="wishlist-card">
                        <img src="${item.image}" alt="${item.title}" class="wishlist-card-img">
                        <div class="wishlist-card-details">
                            <span class="wishlist-card-category">${item.category || 'PRODUK'}</span>
                            <h4 class="wishlist-card-title">${item.title}</h4>
                            <p class="wishlist-card-price">${item.price}</p>
                            <div class="wishlist-card-actions">
                                <a href="${item.link}" class="wishlist-view-btn">Lihat Produk</a>
                                <button type="button" class="wishlist-remove-btn" data-remove-id="${item.id}" aria-label="Hapus ${item.title}">&times; Hapus</button>
                            </div>
                        </div>
                    </div>
                `).join('');

                // Tambahkan event listener untuk tombol hapus di dalam drawer
                wishlistItemsList.querySelectorAll('.wishlist-remove-btn').forEach(removeBtn => {
                    removeBtn.addEventListener('click', () => {
                        const idToRemove = removeBtn.dataset.removeId;
                        removeFromWishlist(idToRemove);
                    });
                });
            }
        }
    }

    // Pasang event listener pada tombol love kartu produk
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const product = {
                id: btn.dataset.id,
                title: btn.dataset.title,
                category: btn.dataset.category || '',
                price: btn.dataset.price || '',
                image: btn.dataset.image || '',
                link: btn.dataset.link || '#'
            };
            toggleWishlist(product);
        });
    });

    // Buka Drawer Menu Favorit
    if (openWishlistBtn && wishlistDrawer && wishlistOverlay) {
        openWishlistBtn.addEventListener('click', () => {
            wishlistDrawer.classList.add('active');
            wishlistOverlay.classList.add('active');

            // Tutup menu hamburger jika sedang terbuka di layar HP
            if (hamburgerBtn && navbarMenu) {
                hamburgerBtn.classList.remove('active');
                navbarMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });

        const closeDrawer = () => {
            wishlistDrawer.classList.remove('active');
            wishlistOverlay.classList.remove('active');
        };

        if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeDrawer);
        wishlistOverlay.addEventListener('click', closeDrawer);
    }

    // Inisialisasi UI Wishlist saat halaman dimuat
    updateWishlistUI();

    // 8. Iklan Slide Show Produk Sepatu & Tas (Di Atas Nav)
    const adSlides = document.querySelectorAll('.ad-slide');
    const adDots = document.querySelectorAll('.ad-dot');
    const adPrevBtn = document.getElementById('adSlidePrev');
    const adNextBtn = document.getElementById('adSlideNext');
    const adSlideshowContainer = document.querySelector('.top-ad-slideshow');

    if (adSlides.length > 0) {
        let currentAdIndex = 0;
        let adAutoSlideInterval = null;
        const slideDelay = 4500; // Berpindah setiap 4.5 detik

        function showAdSlide(index) {
            if (index >= adSlides.length) {
                currentAdIndex = 0;
            } else if (index < 0) {
                currentAdIndex = adSlides.length - 1;
            } else {
                currentAdIndex = index;
            }

            // Perbarui tampilan slide aktif
            adSlides.forEach((slide, idx) => {
                if (idx === currentAdIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // Perbarui titik indikator aktif
            adDots.forEach((dot, idx) => {
                if (idx === currentAdIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextAdSlide() {
            showAdSlide(currentAdIndex + 1);
        }

        function prevAdSlide() {
            showAdSlide(currentAdIndex - 1);
        }

        function startAdAutoSlide() {
            stopAdAutoSlide();
            adAutoSlideInterval = setInterval(nextAdSlide, slideDelay);
        }

        function stopAdAutoSlide() {
            if (adAutoSlideInterval) {
                clearInterval(adAutoSlideInterval);
                adAutoSlideInterval = null;
            }
        }

        // Tombol Panah Berikutnya / Sebelumnya
        if (adNextBtn) {
            adNextBtn.addEventListener('click', () => {
                nextAdSlide();
                startAdAutoSlide(); // Reset penghitung waktu otomatis
            });
        }

        if (adPrevBtn) {
            adPrevBtn.addEventListener('click', () => {
                prevAdSlide();
                startAdAutoSlide();
            });
        }

        // Klik Titik Indikator Dots
        adDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetIndex = parseInt(dot.dataset.slideTo, 10);
                if (!isNaN(targetIndex)) {
                    showAdSlide(targetIndex);
                    startAdAutoSlide();
                }
            });
        });

        // Jeda auto-slide saat kursor mouse berada di area iklan (hover) agar nyaman dibaca
        if (adSlideshowContainer) {
            adSlideshowContainer.addEventListener('mouseenter', stopAdAutoSlide);
            adSlideshowContainer.addEventListener('mouseleave', startAdAutoSlide);
            adSlideshowContainer.addEventListener('touchstart', stopAdAutoSlide, { passive: true });
            adSlideshowContainer.addEventListener('touchend', startAdAutoSlide, { passive: true });
        }

        // Jalankan slide show otomatis saat halaman dibuka
        startAdAutoSlide();
    }

    // 9. Sistem Accordion Informasi Toko (Tentang Kami, Cara Belanja, Kontak)
    const infoItems = document.querySelectorAll('.info-item');

    function openInfoAccordion(targetId) {
        infoItems.forEach(item => {
            const headerBtn = item.querySelector('.info-accordion-header');
            if (item.id === targetId) {
                item.classList.add('active');
                if (headerBtn) headerBtn.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                if (headerBtn) headerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (infoItems.length > 0) {
        infoItems.forEach(item => {
            const headerBtn = item.querySelector('.info-accordion-header');
            if (headerBtn) {
                headerBtn.addEventListener('click', () => {
                    const isAlreadyActive = item.classList.contains('active');

                    // Tutup item accordion lainnya (sistem accordion sejati)
                    infoItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherBtn = otherItem.querySelector('.info-accordion-header');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    });

                    // Jika sebelumnya belum aktif, buka item ini
                    if (!isAlreadyActive) {
                        item.classList.add('active');
                        headerBtn.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });

        // Buka otomatis saat tautan hash #tentang-kami, #cara-belanja, atau #kontak diklik
        document.querySelectorAll('a[href*="#tentang-kami"], a[href*="#cara-belanja"], a[href*="#kontak"]').forEach(link => {
            link.addEventListener('click', () => {
                const href = link.getAttribute('href');
                if (href) {
                    const hashIndex = href.indexOf('#');
                    if (hashIndex !== -1) {
                        const targetId = href.substring(hashIndex + 1);
                        const targetItem = document.getElementById(targetId);
                        if (targetItem && targetItem.classList.contains('info-item')) {
                            openInfoAccordion(targetId);
                        }
                    }
                }
            });
        });

        // Cek URL hash saat pertama kali halaman dimuat
        const initialInfoHash = window.location.hash.replace('#', '');
        if (initialInfoHash === 'tentang-kami' || initialInfoHash === 'cara-belanja' || initialInfoHash === 'kontak') {
            openInfoAccordion(initialInfoHash);
        }
    }

    // 10. Pengaturan & Pergantian Tema (Dark Theme / Light Theme)
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeText) themeText.textContent = 'Light';
            if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Klik untuk beralih ke Mode Gelap');
        } else {
            document.documentElement.classList.remove('light-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeText) themeText.textContent = 'Dark';
            if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Klik untuk beralih ke Mode Terang');
        }
        localStorage.setItem('toko_urban_theme', theme);
    }

    // Ambil preferensi tema dari localStorage, default adalah 'dark'
    const savedTheme = localStorage.getItem('toko_urban_theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
});
