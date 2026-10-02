/**
 * Lázaro's Burger - Main Application Engine
 * Interactions, Geolocation, WhatsApp Redirection, Animations & Cart
 */

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

// State Management
const AppState = {
    cart: JSON.parse(localStorage.getItem("lazaros_cart") || "[]"),
    userAddress: JSON.parse(localStorage.getItem("lazaros_address") || "null"),
    currentCategory: "all",
    searchQuery: "",
    activeModalItem: null,
    selectedPayment: "PIX"
};

function initApp() {
    renderMenuCategories();
    renderMenuItems();
    renderFlyers();
    initAddressBar();
    initAnimations();
    initMouseFollow();
    initMagneticButtons();
    initAudioSynthesizer();
    updateCartUI();
    setupEventListeners();
    initTextReveal();
}

/* ==========================================================================
   MENU RENDERING & FILTERS
   ========================================================================== */
function renderMenuCategories() {
    const container = document.getElementById("categoryTabs");
    if (!container) return;

    container.innerHTML = MENU_CATEGORIES.map(cat => `
        <button class="cat-btn ${cat.id === AppState.currentCategory ? 'active' : ''} magnetic-btn" 
                data-category="${cat.id}">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
        </button>
    `).join("");

    container.querySelectorAll(".cat-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            playAudioFeedback("click");
            container.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            AppState.currentCategory = btn.dataset.category;
            renderMenuItems();
        });
    });
}

function renderMenuItems() {
    const grid = document.getElementById("menuGrid");
    if (!grid) return;

    let items = MENU_ITEMS;

    // Filter by Category
    if (AppState.currentCategory !== "all") {
        items = items.filter(item => item.category === AppState.currentCategory);
    }

    // Filter by Search
    if (AppState.searchQuery.trim() !== "") {
        const q = AppState.searchQuery.toLowerCase();
        items = items.filter(item => 
            item.name.toLowerCase().includes(q) || 
            item.description.toLowerCase().includes(q) ||
            item.ingredients.some(ing => ing.toLowerCase().includes(q))
        );
    }

    if (items.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                <h3>Nenhum lanche encontrado</h3>
                <p>Tente buscar por outro termo ou selecione outra categoria.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map((item, index) => `
        <div class="card-item reveal reveal-blur stagger-${(index % 4) + 1}" data-id="${item.id}">
            <div class="card-shine"></div>
            <div class="card-media-wrapper">
                <span class="card-badge-pill ${item.highlight ? 'highlight' : ''}">${item.badge}</span>
                <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy" />
            </div>
            <div class="card-body">
                <div class="card-header-row">
                    <h3 class="card-title">${item.name}</h3>
                    <div class="card-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <p class="card-desc">${item.description}</p>
                <div class="card-ingredients">
                    ${item.ingredients.slice(0, 4).map(ing => `<span class="ing-chip">${ing}</span>`).join("")}
                    ${item.ingredients.length > 4 ? `<span class="ing-chip">+${item.ingredients.length - 4}</span>` : ''}
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm card-btn-order magnetic-btn" data-action="order" data-id="${item.id}">
                        <span>Pedir no WhatsApp</span>
                        <span>💬</span>
                    </button>
                    <button class="card-btn-add magnetic-btn" title="Adicionar à sacola" data-action="add-cart" data-id="${item.id}">
                        +
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    // Reattach interactions to newly rendered cards
    init3DHoverEffect();
    initIntersectionReveal();
    initMagneticButtons();
}

function renderFlyers() {
    const container = document.getElementById("flyersRow");
    if (!container) return;

    container.innerHTML = ORIGINAL_FLYERS.map(flyer => `
        <div class="flyer-thumb-card magnetic-btn" data-path="${flyer.path}" data-title="${flyer.title}">
            <img src="${flyer.path}" alt="${flyer.title}" loading="lazy" />
            <div class="flyer-thumb-title">${flyer.title}</div>
        </div>
    `).join("");

    container.querySelectorAll(".flyer-thumb-card").forEach(card => {
        card.addEventListener("click", () => {
            playAudioFeedback("pop");
            openFlyerModal(card.dataset.path, card.dataset.title);
        });
    });
}

/* ==========================================================================
   3D HOVER TILT WITH SPECULAR GLARE
   ========================================================================== */
function init3DHoverEffect() {
    const cards = document.querySelectorAll(".card-item");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Update shine glare position
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            card.style.setProperty("--shine-x", `${percentX}%`);
            card.style.setProperty("--shine-y", `${percentY}%`);
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease-out";
        });

        card.addEventListener("mouseenter", () => {
            card.style.transition = "none";
        });
    });
}

/* ==========================================================================
   MOUSE FOLLOWER (GLOW & DOT)
   ========================================================================== */
function initMouseFollow() {
    const dot = document.querySelector(".cursor-dot");
    const glow = document.querySelector(".cursor-glow");
    if (!dot || !glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let glowX = mouseX, glowY = mouseY;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Linear interpolation for smooth trailing
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;

        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;

        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Expand cursor on interactive hover
    document.querySelectorAll("a, button, .card-item, .cat-btn, .header-address-pill").forEach(el => {
        el.addEventListener("mouseenter", () => {
            dot.style.width = "20px";
            dot.style.height = "20px";
            dot.style.backgroundColor = "rgba(245, 158, 11, 0.8)";
        });
        el.addEventListener("mouseleave", () => {
            dot.style.width = "8px";
            dot.style.height = "8px";
            dot.style.backgroundColor = "var(--primary-light)";
        });
    });
}

/* ==========================================================================
   MAGNETIC BUTTONS ENGINE
   ========================================================================== */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll(".magnetic-btn");

    magneticElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            // Pull strength
            const strength = 0.25;
            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });

        el.addEventListener("mouseleave", () => {
            el.style.transform = "translate(0px, 0px)";
        });
    });
}

/* ==========================================================================
   PARALLAX ENGINE (SCROLL & MOUSE)
   ========================================================================== */
function initAnimations() {
    const heroVisual = document.querySelector(".hero-visual");
    const burgerImg = document.querySelector(".hero-main-burger");
    const topBadge = document.querySelector(".floating-badge-top");
    const bottomBadge = document.querySelector(".floating-badge-bottom");

    // Mouse Parallax on Hero Section
    if (heroVisual) {
        window.addEventListener("mousemove", (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const offsetX = (e.clientX - centerX) / centerX;
            const offsetY = (e.clientY - centerY) / centerY;

            if (burgerImg) {
                burgerImg.style.transform = `translate3d(${offsetX * 18}px, ${offsetY * 18}px, 20px) rotate(${offsetX * 3}deg)`;
            }
            if (topBadge) {
                topBadge.style.transform = `translate3d(${offsetX * -20}px, ${offsetY * -20}px, 90px)`;
            }
            if (bottomBadge) {
                bottomBadge.style.transform = `translate3d(${offsetX * 18}px, ${offsetY * 18}px, 90px)`;
            }
        });
    }

    // Scroll Parallax
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY;
        const orb1 = document.querySelector(".ambient-orb-1");
        const orb2 = document.querySelector(".ambient-orb-2");

        if (orb1) orb1.style.transform = `translateY(${scrolled * 0.25}px)`;
        if (orb2) orb2.style.transform = `translateY(${scrolled * -0.18}px)`;
    });

    initIntersectionReveal();
}

/* ==========================================================================
   REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initIntersectionReveal() {
    const reveals = document.querySelectorAll(".reveal:not(.revealed)");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   TEXT REVEAL & CHARACTER REVEAL (PRESERVES WORDS INTACT)
   ========================================================================== */
function initTextReveal() {
    const textReveals = document.querySelectorAll(".char-reveal");

    textReveals.forEach(el => {
        const fullText = el.innerText.trim();
        const words = fullText.split(/\s+/);
        el.innerHTML = "";

        let charCount = 0;
        words.forEach((word, wIdx) => {
            const wordSpan = document.createElement("span");
            wordSpan.className = "word-token";

            [...word].forEach((char) => {
                const charSpan = document.createElement("span");
                charSpan.className = "char-token";
                charSpan.textContent = char;
                charSpan.style.transitionDelay = `${charCount * 30}ms`;
                wordSpan.appendChild(charSpan);
                charCount++;
            });

            el.appendChild(wordSpan);

            if (wIdx < words.length - 1) {
                const spaceSpan = document.createElement("span");
                spaceSpan.innerHTML = "&nbsp;";
                spaceSpan.style.display = "inline-block";
                el.appendChild(spaceSpan);
                charCount++;
            }
        });

        setTimeout(() => {
            el.classList.add("revealed");
        }, 120);
    });
}

/* ==========================================================================
   AUDIO SYNTHESIZER (MICROINTERACTIONS)
   ========================================================================== */
let audioCtx = null;

function initAudioSynthesizer() {
    // Lazy initialize on first interaction to comply with browser policies
    document.addEventListener("click", () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }, { once: true });
}

function playAudioFeedback(type = "click") {
    if (!audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === "click") {
            osc.frequency.setValueAtTime(420, now);
            osc.frequency.exponentialRampToValueAtTime(780, now + 0.06);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            osc.start(now);
            osc.stop(now + 0.06);
        } else if (type === "pop") {
            osc.frequency.setValueAtTime(550, now);
            osc.frequency.exponentialRampToValueAtTime(220, now + 0.1);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === "success") {
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(660, now + 0.08);
            osc.frequency.setValueAtTime(880, now + 0.16);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        }
    } catch (e) {
        // Audio policy or unsupported
    }
}

/* ==========================================================================
   ADDRESS & GEOLOCATION (HTML5 GPS + REVERSE GEOCODING)
   ========================================================================== */
function initAddressBar() {
    updateAddressDisplay();

    const addressPill = document.getElementById("headerAddressPill");
    if (addressPill) {
        addressPill.addEventListener("click", () => {
            playAudioFeedback("click");
            openAddressModal();
        });
    }

    const bannerGeoBtn = document.getElementById("bannerGeoBtn");
    if (bannerGeoBtn) {
        bannerGeoBtn.addEventListener("click", () => {
            playAudioFeedback("click");
            requestDeviceLocation();
        });
    }

    const bannerManualBtn = document.getElementById("bannerManualBtn");
    if (bannerManualBtn) {
        bannerManualBtn.addEventListener("click", () => {
            playAudioFeedback("click");
            openAddressModal();
        });
    }
}

function updateAddressDisplay() {
    const addressValueEl = document.getElementById("headerAddressText");
    if (!addressValueEl) return;

    if (AppState.userAddress && AppState.userAddress.formatted) {
        addressValueEl.textContent = AppState.userAddress.formatted;
    } else {
        addressValueEl.textContent = "Definir endereço de entrega";
    }
}

function requestDeviceLocation(onSuccessCallback) {
    if (!("geolocation" in navigator)) {
        showToast("⚠️ Geolocalização não suportada no seu navegador.");
        return;
    }

    showToast("🛰️ Obtendo sua localização GPS...");
    const geoBtn = document.getElementById("modalGeoBtn");
    if (geoBtn) {
        geoBtn.innerHTML = "<span>🔄 Localizando aparelho...</span>";
        geoBtn.disabled = true;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

            try {
                // Reverse geocoding via OpenStreetMap Nominatim
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
                if (res.ok) {
                    const data = await res.json();
                    const road = data.address.road || data.address.pedestrian || "Rua identificada via GPS";
                    const houseNumber = data.address.house_number || "S/N";
                    const suburb = data.address.suburb || data.address.neighbourhood || data.address.city_district || "";
                    const city = data.address.city || data.address.town || "";

                    const formattedAddress = `${road}, ${houseNumber}${suburb ? ' - ' + suburb : ''}${city ? ' (' + city + ')' : ''}`;

                    AppState.userAddress = {
                        formatted: formattedAddress,
                        street: road,
                        number: houseNumber,
                        neighborhood: suburb,
                        coords: { latitude, longitude },
                        mapsUrl: mapsUrl,
                        type: "gps"
                    };
                } else {
                    throw new Error("Reverse geocoding offline");
                }
            } catch (err) {
                // Fallback to coordinates
                AppState.userAddress = {
                    formatted: `Localização GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
                    coords: { latitude, longitude },
                    mapsUrl: mapsUrl,
                    type: "gps"
                };
            }

            localStorage.setItem("lazaros_address", JSON.stringify(AppState.userAddress));
            updateAddressDisplay();
            playAudioFeedback("success");
            showToast("📍 Localização detectada com sucesso!");

            if (geoBtn) {
                geoBtn.innerHTML = "<span>✅ Localização GPS Ativada!</span>";
                geoBtn.disabled = false;
            }

            // If modal inputs are visible, fill them
            const addrInput = document.getElementById("modalAddressInput");
            if (addrInput) addrInput.value = AppState.userAddress.formatted;

            if (typeof onSuccessCallback === "function") {
                onSuccessCallback(AppState.userAddress);
            }
        },
        (error) => {
            let msg = "Não foi possível obter a localização.";
            if (error.code === error.PERMISSION_DENIED) {
                msg = "Permissão de localização negada pelo celular.";
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                msg = "Sinal de GPS indisponível no momento.";
            } else if (error.code === error.TIMEOUT) {
                msg = "Tempo esgotado ao buscar GPS.";
            }
            showToast(`⚠️ ${msg}`);
            if (geoBtn) {
                geoBtn.innerHTML = "<span>📍 Usar GPS do Celular</span>";
                geoBtn.disabled = false;
            }
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
}

/* ==========================================================================
   ORDER MODAL & WHATSAPP REDIRECTION
   ========================================================================== */
function openOrderModal(item) {
    AppState.activeModalItem = item;
    let qty = 1;

    const modal = document.getElementById("orderModal");
    const container = document.getElementById("orderModalContent");
    if (!modal || !container) return;

    const currentSavedAddress = AppState.userAddress ? AppState.userAddress.formatted : "";
    const currentSavedName = localStorage.getItem("lazaros_client_name") || "";

    container.innerHTML = `
        <div class="modal-header">
            <h3>Fazer Pedido no WhatsApp</h3>
            <button class="modal-close-btn" id="closeOrderModal">&times;</button>
        </div>
        <div class="modal-body">
            <!-- Item Preview -->
            <div class="modal-item-preview">
                <img src="${item.image}" alt="${item.name}" class="modal-item-thumb" />
                <div class="modal-item-info">
                    <h4>${item.name}</h4>
                    <div class="item-price" id="modalItemTotalPrice">R$ ${(item.price).toFixed(2).replace('.', ',')}</div>
                </div>
            </div>

            <!-- Geolocation & Address Section -->
            <div class="geo-action-box">
                <p style="font-size: 0.88rem; color: var(--text-sub);">
                    📍 Onde entregamos seu pedido? Escolha uma opção:
                </p>
                <button type="button" class="btn btn-primary btn-sm geo-btn magnetic-btn" id="modalGeoBtn">
                    <span>📍 Usar GPS do Aparelho Celular</span>
                </button>
                <div class="geo-divider"><span>OU DIGITE O ENDEREÇO</span></div>
            </div>

            <div class="form-group">
                <label for="modalAddressInput">Endereço de Entrega (Rua, Número, Bairro)*</label>
                <input type="text" id="modalAddressInput" class="form-control" 
                       placeholder="Ex: Rua das Palmeiras, 142 - Centro" 
                       value="${currentSavedAddress}" required />
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="modalClientName">Seu Nome</label>
                    <input type="text" id="modalClientName" class="form-control" 
                           placeholder="Ex: Victor" value="${currentSavedName}" />
                </div>
                <div class="form-group">
                    <label>Quantidade</label>
                    <div class="qty-selector">
                        <button type="button" class="qty-btn" id="qtyMinus">-</button>
                        <span class="qty-display" id="qtyDisplay">1</span>
                        <button type="button" class="qty-btn" id="qtyPlus">+</button>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="modalNotesInput">Observações ou Ingredientes (Opcional)</label>
                <textarea id="modalNotesInput" class="form-control" rows="2" 
                          placeholder="Ex: Sem cebola, carne bem passada, refrigerante: Coca-Cola"></textarea>
            </div>

            <div class="form-group">
                <label>Forma de Pagamento</label>
                <div class="payment-options-grid">
                    <div class="payment-chip selected" data-method="PIX">
                        <span>⚡</span>
                        <span>PIX</span>
                    </div>
                    <div class="payment-chip" data-method="Cartão">
                        <span>💳</span>
                        <span>Cartão</span>
                    </div>
                    <div class="payment-chip" data-method="Dinheiro">
                        <span>💵</span>
                        <span>Dinheiro</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <div class="order-total-bar">
                <span>Subtotal deste item:</span>
                <span class="order-total-price" id="modalFooterTotal">R$ ${(item.price).toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="modal-actions-stacked">
                <button class="btn btn-primary magnetic-btn" id="modalAddToCartBtn" style="width: 100%;">
                    <span>➕ Adicionar à Sacola (+ Escolher Mais Itens)</span>
                </button>
                <button class="btn btn-whatsapp magnetic-btn" id="modalConfirmWhatsappBtn" style="width: 100%;">
                    <span>🟢 Pedir Apenas Este Item no WhatsApp</span>
                </button>
            </div>
        </div>
    `;

    modal.classList.add("open");
    playAudioFeedback("pop");

    // Hook events inside modal
    document.getElementById("closeOrderModal").addEventListener("click", () => {
        modal.classList.remove("open");
    });

    const qtyMinus = document.getElementById("qtyMinus");
    const qtyPlus = document.getElementById("qtyPlus");
    const qtyDisplay = document.getElementById("qtyDisplay");
    const modalItemTotalPrice = document.getElementById("modalItemTotalPrice");
    const modalFooterTotal = document.getElementById("modalFooterTotal");

    function updateQty(newQty) {
        if (newQty < 1) return;
        qty = newQty;
        qtyDisplay.textContent = qty;
        const total = (item.price * qty).toFixed(2).replace('.', ',');
        modalItemTotalPrice.textContent = `R$ ${total}`;
        modalFooterTotal.textContent = `R$ ${total}`;
        playAudioFeedback("click");
    }

    qtyMinus.addEventListener("click", () => updateQty(qty - 1));
    qtyPlus.addEventListener("click", () => updateQty(qty + 1));

    // Payment Selection
    container.querySelectorAll(".payment-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            playAudioFeedback("click");
            container.querySelectorAll(".payment-chip").forEach(c => c.classList.remove("selected"));
            chip.classList.add("selected");
            AppState.selectedPayment = chip.dataset.method;
        });
    });

    // Modal GPS Button
    document.getElementById("modalGeoBtn").addEventListener("click", () => {
        requestDeviceLocation((detected) => {
            document.getElementById("modalAddressInput").value = detected.formatted;
        });
    });

    // Option 1: Add to Cart and continue choosing more items
    document.getElementById("modalAddToCartBtn").addEventListener("click", () => {
        const notes = document.getElementById("modalNotesInput").value.trim();
        const address = document.getElementById("modalAddressInput").value.trim();
        const clientName = document.getElementById("modalClientName").value.trim();

        if (address) {
            AppState.userAddress = { formatted: address, manual: true };
            localStorage.setItem("lazaros_address", JSON.stringify(AppState.userAddress));
            updateAddressDisplay();
        }
        if (clientName) {
            localStorage.setItem("lazaros_client_name", clientName);
        }

        addToCart(item.id, qty, notes);
        modal.classList.remove("open");
        playAudioFeedback("success");
        showToast(`🎉 ${qty}x ${item.name} adicionado ao pedido! Você pode escolher mais itens abaixo.`);
    });

    // Option 2: Send this single item immediately to WhatsApp
    document.getElementById("modalConfirmWhatsappBtn").addEventListener("click", () => {
        const address = document.getElementById("modalAddressInput").value.trim();
        const clientName = document.getElementById("modalClientName").value.trim();
        const notes = document.getElementById("modalNotesInput").value.trim();

        if (!address) {
            showToast("⚠️ Por favor, informe seu endereço ou clique no botão de GPS!");
            document.getElementById("modalAddressInput").focus();
            return;
        }

        // Save preferences
        if (clientName) localStorage.setItem("lazaros_client_name", clientName);
        AppState.userAddress = { formatted: address, manual: true };
        localStorage.setItem("lazaros_address", JSON.stringify(AppState.userAddress));
        updateAddressDisplay();

        // Build WhatsApp Message
        const totalPrice = (item.price * qty).toFixed(2).replace('.', ',');
        let msg = `Olá, *${RESTAURANT_CONFIG.name}*! Gostaria de fazer o seguinte pedido:\n\n`;
        msg += `🍔 *Item*: ${qty}x ${item.name}\n`;
        msg += `💰 *Valor Total*: R$ ${totalPrice}\n`;
        
        if (notes) {
            msg += `📝 *Observações*: ${notes}\n`;
        }
        
        msg += `💳 *Forma de Pagamento*: ${AppState.selectedPayment}\n`;
        if (clientName) {
            msg += `👤 *Cliente*: ${clientName}\n`;
        }
        
        msg += `\n📍 *Endereço de Entrega*:\n${address}\n`;
        
        if (AppState.userAddress.mapsUrl) {
            msg += `🗺️ *Link GPS*: ${AppState.userAddress.mapsUrl}\n`;
        }
        
        msg += `\nFavor confirmar o pedido e tempo de entrega! Obrigado!`;

        const encodedMsg = encodeURIComponent(msg);
        const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodedMsg}`;

        playAudioFeedback("success");
        modal.classList.remove("open");
        window.open(whatsappUrl, "_blank");
    });
}

/* ==========================================================================
   CART & MULTI-ITEM CHECKOUT
   ========================================================================== */
function addToCart(itemId, qty = 1, notes = "") {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    // Check if item with same ID and notes already exists
    const existing = AppState.cart.find(c => c.id === itemId && (c.notes || "") === (notes || ""));
    if (existing) {
        existing.quantity += qty;
    } else {
        AppState.cart.push({ ...item, quantity: qty, notes: notes });
    }

    localStorage.setItem("lazaros_cart", JSON.stringify(AppState.cart));
    updateCartUI();
    playAudioFeedback("pop");
}

function updateCartUI() {
    const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Navbar Badge
    const badge = document.getElementById("cartCountBadge");
    if (badge) {
        badge.textContent = totalCount;
        badge.style.transform = "scale(1.3)";
        setTimeout(() => badge.style.transform = "scale(1)", 200);
    }

    // Floating Order Bar
    const floatBar = document.getElementById("floatingOrderBar");
    const floatCount = document.getElementById("floatingBarCount");
    const floatTotal = document.getElementById("floatingBarTotal");
    if (floatBar) {
        if (totalCount > 0) {
            floatBar.classList.add("show");
            if (floatCount) floatCount.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'itens'}`;
            if (floatTotal) floatTotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        } else {
            floatBar.classList.remove("show");
        }
    }

    // Render cart items inside drawer
    const list = document.getElementById("cartItemsList");
    const subtotalEl = document.getElementById("cartDrawerSubtotal");
    if (!list) return;

    if (AppState.cart.length === 0) {
        list.innerHTML = `
            <div class="cart-empty-state">
                <div class="cart-empty-icon">🛍️</div>
                <h4>Sua sacola está vazia</h4>
                <p>Selecione seus lanches e açaís favoritos no cardápio!</p>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = "R$ 0,00";
        return;
    }

    list.innerHTML = AppState.cart.map((item, idx) => {
        const itemTotal = item.price * item.quantity;
        return `
            <div class="cart-item-row">
                <img src="${item.image}" alt="${item.name}" />
                <div class="cart-item-meta">
                    <h5>${item.name}</h5>
                    ${item.notes ? `<small style="color: var(--primary-light); display:block; font-size: 0.78rem;">📝 ${item.notes}</small>` : ''}
                    <div class="price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="qty-selector">
                    <button class="qty-btn" onclick="changeCartQty(${idx}, -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeCartQty(${idx}, 1)">+</button>
                </div>
            </div>
        `;
    }).join("");

    if (subtotalEl) {
        subtotalEl.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }
}

window.changeCartQty = function(index, delta) {
    if (!AppState.cart[index]) return;

    AppState.cart[index].quantity += delta;
    if (AppState.cart[index].quantity <= 0) {
        AppState.cart.splice(index, 1);
    }

    localStorage.setItem("lazaros_cart", JSON.stringify(AppState.cart));
    updateCartUI();
    playAudioFeedback("click");
};

function checkoutCartWhatsApp() {
    if (AppState.cart.length === 0) {
        showToast("⚠️ Sua sacola está vazia!");
        return;
    }

    // Open Modal with Cart Summary to collect Address & Notes
    const modal = document.getElementById("orderModal");
    const container = document.getElementById("orderModalContent");
    if (!modal || !container) return;

    let subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const currentSavedAddress = AppState.userAddress ? AppState.userAddress.formatted : "";
    const currentSavedName = localStorage.getItem("lazaros_client_name") || "";

    container.innerHTML = `
        <div class="modal-header">
            <h3>Finalizar Sacola no WhatsApp</h3>
            <button class="modal-close-btn" id="closeOrderModal">&times;</button>
        </div>
        <div class="modal-body">
            <!-- Items Summary -->
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 1rem; border: 1px solid var(--border-subtle);">
                <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem;">Resumo da Sacola (${AppState.cart.length} itens):</h4>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.88rem; color: var(--text-sub);">
                    ${AppState.cart.map(c => `
                        <li style="display: flex; justify-content: space-between;">
                            <span>${c.quantity}x ${c.name}</span>
                            <span style="font-weight: 700; color: var(--primary-light);">R$ ${(c.price * c.quantity).toFixed(2).replace('.', ',')}</span>
                        </li>
                    `).join("")}
                </ul>
            </div>

            <!-- Geolocation & Address Section -->
            <div class="geo-action-box">
                <p style="font-size: 0.88rem; color: var(--text-sub);">
                    📍 Onde entregamos seu pedido? Escolha uma opção:
                </p>
                <button type="button" class="btn btn-primary btn-sm geo-btn magnetic-btn" id="modalGeoBtn">
                    <span>📍 Usar GPS do Aparelho Celular</span>
                </button>
                <div class="geo-divider"><span>OU DIGITE O ENDEREÇO</span></div>
            </div>

            <div class="form-group">
                <label for="modalAddressInput">Endereço de Entrega (Rua, Número, Bairro)*</label>
                <input type="text" id="modalAddressInput" class="form-control" 
                       placeholder="Ex: Rua das Palmeiras, 142 - Centro" 
                       value="${currentSavedAddress}" required />
            </div>

            <div class="form-group">
                <label for="modalClientName">Seu Nome</label>
                <input type="text" id="modalClientName" class="form-control" 
                       placeholder="Ex: Victor" value="${currentSavedName}" />
            </div>

            <div class="form-group">
                <label for="modalNotesInput">Observações para o Pedido (Opcional)</label>
                <textarea id="modalNotesInput" class="form-control" rows="2" 
                          placeholder="Ex: Sem cebola no hambúrguer, troco para 50"></textarea>
            </div>

            <div class="form-group">
                <label>Forma de Pagamento</label>
                <div class="payment-options-grid">
                    <div class="payment-chip selected" data-method="PIX">
                        <span>⚡</span>
                        <span>PIX</span>
                    </div>
                    <div class="payment-chip" data-method="Cartão">
                        <span>💳</span>
                        <span>Cartão</span>
                    </div>
                    <div class="payment-chip" data-method="Dinheiro">
                        <span>💵</span>
                        <span>Dinheiro</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <div class="order-total-bar">
                <span>Total da Sacola:</span>
                <span class="order-total-price">R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="btn btn-whatsapp magnetic-btn" id="modalConfirmWhatsappBtn">
                <span>Enviar Sacola para o WhatsApp</span>
                <span>🟢</span>
            </button>
        </div>
    `;

    modal.classList.add("open");
    playAudioFeedback("pop");

    // Close
    document.getElementById("closeOrderModal").addEventListener("click", () => {
        modal.classList.remove("open");
    });

    // Payment Selection
    container.querySelectorAll(".payment-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            playAudioFeedback("click");
            container.querySelectorAll(".payment-chip").forEach(c => c.classList.remove("selected"));
            chip.classList.add("selected");
            AppState.selectedPayment = chip.dataset.method;
        });
    });

    // GPS
    document.getElementById("modalGeoBtn").addEventListener("click", () => {
        requestDeviceLocation((detected) => {
            document.getElementById("modalAddressInput").value = detected.formatted;
        });
    });

    // Confirm WhatsApp
    document.getElementById("modalConfirmWhatsappBtn").addEventListener("click", () => {
        const address = document.getElementById("modalAddressInput").value.trim();
        const clientName = document.getElementById("modalClientName").value.trim();
        const notes = document.getElementById("modalNotesInput").value.trim();

        if (!address) {
            showToast("⚠️ Por favor, informe seu endereço de entrega!");
            document.getElementById("modalAddressInput").focus();
            return;
        }

        // Build WhatsApp message
        let msg = `Olá, *${RESTAURANT_CONFIG.name}*! Gostaria de fazer o seguinte pedido da Sacola:\n\n`;
        AppState.cart.forEach(item => {
            msg += `▫️ ${item.quantity}x *${item.name}* - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
        });
        msg += `\n💰 *Total*: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
        
        if (notes) {
            msg += `📝 *Observações*: ${notes}\n`;
        }
        
        msg += `💳 *Forma de Pagamento*: ${AppState.selectedPayment}\n`;
        if (clientName) {
            msg += `👤 *Cliente*: ${clientName}\n`;
        }
        
        msg += `\n📍 *Endereço de Entrega*:\n${address}\n`;
        if (AppState.userAddress && AppState.userAddress.mapsUrl) {
            msg += `🗺️ *Link GPS*: ${AppState.userAddress.mapsUrl}\n`;
        }
        
        msg += `\nFavor confirmar os itens e tempo de entrega!`;

        const encodedMsg = encodeURIComponent(msg);
        const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodedMsg}`;

        playAudioFeedback("success");
        modal.classList.remove("open");
        document.getElementById("cartDrawer").classList.remove("open");
        window.open(whatsappUrl, "_blank");
    });
}

/* ==========================================================================
   ORIGINAL FLYER MODAL VIEWER
   ========================================================================== */
function openFlyerModal(imagePath, title) {
    const modal = document.getElementById("orderModal");
    const container = document.getElementById("orderModalContent");
    if (!modal || !container) return;

    container.innerHTML = `
        <div class="modal-header">
            <h3>${title}</h3>
            <button class="modal-close-btn" id="closeOrderModal">&times;</button>
        </div>
        <div class="modal-body" style="padding: 1rem; text-align: center;">
            <img src="${imagePath}" alt="${title}" style="max-width: 100%; border-radius: var(--radius-sm); max-height: 70vh; object-fit: contain; box-shadow: 0 10px 30px rgba(0,0,0,0.6);" />
        </div>
        <div class="modal-footer" style="align-items: center;">
            <button class="btn btn-outline btn-sm magnetic-btn" id="closeFlyerBtn">Fechar Visualização</button>
        </div>
    `;

    modal.classList.add("open");

    document.getElementById("closeOrderModal").addEventListener("click", () => {
        modal.classList.remove("open");
    });
    document.getElementById("closeFlyerBtn").addEventListener("click", () => {
        modal.classList.remove("open");
    });
}

/* ==========================================================================
   ADDRESS MODAL (STANDALONE)
   ========================================================================== */
function openAddressModal() {
    const modal = document.getElementById("orderModal");
    const container = document.getElementById("orderModalContent");
    if (!modal || !container) return;

    const currentSavedAddress = AppState.userAddress ? AppState.userAddress.formatted : "";

    container.innerHTML = `
        <div class="modal-header">
            <h3>Definir Endereço de Entrega</h3>
            <button class="modal-close-btn" id="closeOrderModal">&times;</button>
        </div>
        <div class="modal-body">
            <div class="geo-action-box">
                <p style="font-size: 0.9rem; color: var(--text-sub);">
                    Obtenha sua localização exata em 1 segundo usando o sensor GPS do seu dispositivo:
                </p>
                <button type="button" class="btn btn-primary geo-btn magnetic-btn" id="modalGeoBtn">
                    <span>📍 Detectar Minha Localização Atual</span>
                </button>
                <div class="geo-divider"><span>OU DIGITE MANUALMENTE</span></div>
            </div>

            <div class="form-group">
                <label for="modalAddressInput">Rua, Número, Bairro e Cidade</label>
                <input type="text" id="modalAddressInput" class="form-control" 
                       placeholder="Ex: Av. Paulista, 1000 - Bela Vista" 
                       value="${currentSavedAddress}" />
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary magnetic-btn" id="saveAddressOnlyBtn">
                <span>Salvar Endereço</span>
                <span>💾</span>
            </button>
        </div>
    `;

    modal.classList.add("open");

    document.getElementById("closeOrderModal").addEventListener("click", () => {
        modal.classList.remove("open");
    });

    document.getElementById("modalGeoBtn").addEventListener("click", () => {
        requestDeviceLocation((detected) => {
            document.getElementById("modalAddressInput").value = detected.formatted;
        });
    });

    document.getElementById("saveAddressOnlyBtn").addEventListener("click", () => {
        const val = document.getElementById("modalAddressInput").value.trim();
        if (!val) {
            showToast("⚠️ Digite um endereço válido!");
            return;
        }
        AppState.userAddress = { formatted: val, manual: true };
        localStorage.setItem("lazaros_address", JSON.stringify(AppState.userAddress));
        updateAddressDisplay();
        playAudioFeedback("success");
        showToast("📍 Endereço salvo com sucesso!");
        modal.classList.remove("open");
    });
}

/* ==========================================================================
   GLOBAL EVENT LISTENERS & SETUP
   ========================================================================== */
function setupEventListeners() {
    // Menu Grid Delegation
    const grid = document.getElementById("menuGrid");
    if (grid) {
        grid.addEventListener("click", (e) => {
            const orderBtn = e.target.closest('[data-action="order"]');
            const addBtn = e.target.closest('[data-action="add-cart"]');
            const card = e.target.closest('.card-item');

            if (orderBtn) {
                e.stopPropagation();
                const id = orderBtn.dataset.id;
                const item = MENU_ITEMS.find(i => i.id === id);
                if (item) openOrderModal(item);
            } else if (addBtn) {
                e.stopPropagation();
                const id = addBtn.dataset.id;
                addToCart(id);
            } else if (card) {
                const id = card.dataset.id;
                const item = MENU_ITEMS.find(i => i.id === id);
                if (item) openOrderModal(item);
            }
        });
    }

    // Search Input
    const searchInput = document.getElementById("menuSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            AppState.searchQuery = e.target.value;
            renderMenuItems();
        });
    }

    // Cart Drawer Toggle
    const cartToggle = document.getElementById("cartToggleBtn");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartClose = document.getElementById("cartDrawerClose");
    const cartCheckoutBtn = document.getElementById("cartDrawerCheckout");

    if (cartToggle && cartDrawer) {
        cartToggle.addEventListener("click", () => {
            playAudioFeedback("click");
            cartDrawer.classList.toggle("open");
        });
    }

    if (cartClose && cartDrawer) {
        cartClose.addEventListener("click", () => {
            cartDrawer.classList.remove("open");
        });
    }

    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener("click", () => {
            checkoutCartWhatsApp();
        });
    }

    // Floating Bar Button
    const floatBarBtn = document.getElementById("floatingBarFinishBtn");
    if (floatBarBtn && cartDrawer) {
        floatBarBtn.addEventListener("click", () => {
            playAudioFeedback("click");
            cartDrawer.classList.add("open");
        });
    }

    // Continue Shopping button inside drawer
    const continueBtn = document.getElementById("cartDrawerContinueBtn");
    if (continueBtn && cartDrawer) {
        continueBtn.addEventListener("click", () => {
            playAudioFeedback("click");
            cartDrawer.classList.remove("open");
            const menuSection = document.getElementById("cardapio");
            if (menuSection) menuSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // Modal Backdrop Click
    const modal = document.getElementById("orderModal");
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("open");
            }
        });
    }
}

/* ==========================================================================
   TOAST SYSTEM
   ========================================================================== */
function showToast(message) {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 350);
    }, 3200);
}
