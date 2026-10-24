/**
 * Lázaro's Burger - Main Mobile Application Engine
 * Mobile-first Compact Layout (Estilo Anota.ai)
 * Continuous Menu List, Scrollspy, Open/Closed Status, Profile Modal & WhatsApp Checkout
 */

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

// State Management
const AppState = {
    cart: JSON.parse(localStorage.getItem("lazaros_cart") || "[]"),
    userAddress: JSON.parse(localStorage.getItem("lazaros_address") || "null"),
    currentCategory: "promocao",
    searchQuery: "",
    activeModalItem: null,
    selectedPayment: "PIX",
    isProgrammaticScroll: false
};

function initApp() {
    updateStoreStatus();
    renderMenuCategories();
    renderContinuousMenuList();
    initScrollSpy();
    initProfileModal();
    initHeaderSearch();
    initShareButton();
    initAddressDisplay();
    initAudioSynthesizer();
    updateCartUI();
    setupEventListeners();
}

/* ==========================================================================
   STORE STATUS (ABERTO / FECHADO POR HORÁRIO)
   Terça a Domingo: 18h30 às 23h30 | Segunda: Fechado
   ========================================================================== */
function updateStoreStatus() {
    const strip = document.getElementById("storeStatusStrip");
    const textEl = document.getElementById("storeStatusText");
    if (!strip || !textEl) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    const openTimeInMinutes = 18 * 60 + 30; // 18h30
    const closeTimeInMinutes = 23 * 60 + 30; // 23h30

    // Segunda-feira (1) é fechado
    const isWorkingDay = day !== 1;
    const isOpenHours = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes;

    if (isWorkingDay && isOpenHours) {
        strip.className = "store-status-strip open-now";
        textEl.textContent = "Aberto agora • Fazendo entrega";
    } else {
        strip.className = "store-status-strip closed-now";
        if (day === 1) {
            textEl.textContent = "Loja fechada hoje (Segunda-feira) • Abre Terça às 18h30";
        } else if (currentTimeInMinutes < openTimeInMinutes) {
            textEl.textContent = "Loja fechada no momento • Abre hoje às 18h30";
        } else {
            textEl.textContent = "Loja fechada • Abre amanhã às 18h30";
        }
    }
}

/* ==========================================================================
   CATEGORY TABS (STICKY, SÓ TEXTO, UNDERLINE)
   ========================================================================== */
function renderMenuCategories() {
    const container = document.getElementById("categoryTabs");
    if (!container) return;

    container.innerHTML = MENU_CATEGORIES.map(cat => `
        <button class="cat-tab-btn ${cat.id === AppState.currentCategory ? 'active' : ''}" 
                data-category="${cat.id}">
            ${cat.name}
        </button>
    `).join("");

    container.querySelectorAll(".cat-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const catId = btn.dataset.category;
            playAudioFeedback("click");
            setActiveCategoryTab(catId);

            // Scroll suave até a seção correspondente
            const targetSection = document.getElementById(`section-${catId}`);
            if (targetSection) {
                AppState.isProgrammaticScroll = true;
                targetSection.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                    AppState.isProgrammaticScroll = false;
                }, 600);
            }
        });
    });
}

function setActiveCategoryTab(catId) {
    AppState.currentCategory = catId;
    const container = document.getElementById("categoryTabs");
    if (!container) return;

    container.querySelectorAll(".cat-tab-btn").forEach(b => {
        if (b.dataset.category === catId) {
            b.classList.add("active");
            // Centralizar a aba horizontalmente na barra visível
            b.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        } else {
            b.classList.remove("active");
        }
    });
}

/* ==========================================================================
   CONTINUOUS MENU LIST (SEÇÕES AGRUPADAS & CARDS EM LINHA)
   ========================================================================== */
function renderContinuousMenuList() {
    const container = document.getElementById("menuContinuousList");
    if (!container) return;

    const query = AppState.searchQuery.trim().toLowerCase();

    // Filtra itens se houver busca
    let filteredItems = MENU_ITEMS;
    if (query !== "") {
        filteredItems = MENU_ITEMS.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query) ||
            item.ingredients.some(ing => ing.toLowerCase().includes(query))
        );
    }

    if (filteredItems.length === 0) {
        container.innerHTML = `
            <div class="no-results-box">
                <div style="font-size: 2.5rem;">🔍</div>
                <h4>Nenhum item encontrado</h4>
                <p>Tente buscar por outro sabor, lanche ou ingrediente.</p>
            </div>
        `;
        return;
    }

    // Renderiza cada categoria que contenha itens
    container.innerHTML = MENU_CATEGORIES.map(cat => {
        const catItems = filteredItems.filter(item => item.category === cat.id);
        if (catItems.length === 0) return "";

        return `
            <section class="menu-category-section" id="section-${cat.id}" data-category-id="${cat.id}">
                <h2 class="category-section-title">${cat.name}</h2>
                <div class="menu-items-group">
                    ${catItems.map(item => renderItemRowHtml(item)).join("")}
                </div>
            </section>
        `;
    }).join("");
}

function renderItemRowHtml(item) {
    // Miniatura ou ícone fallback
    let mediaHtml = "";
    if (item.image) {
        mediaHtml = `<img src="${item.image}" alt="${item.name}" loading="lazy" />`;
    } else {
        // Fallback para itens sem foto (por exemplo bebidas ou porções específicas)
        const icon = item.category === "bebidas" ? "🥤" : (item.category === "pasteis" ? "🥟" : "🍔");
        mediaHtml = `<span class="item-fallback-icon">${icon}</span>`;
    }

    const badgeHtml = item.badge 
        ? `<span class="item-badge-mini ${item.highlight ? 'highlight' : ''}">${item.badge}</span>` 
        : "";

    return `
        <article class="menu-item-row" data-id="${item.id}" tabindex="0" role="button">
            <div class="item-row-info">
                ${badgeHtml}
                <h3 class="item-row-title">${item.name}</h3>
                <p class="item-row-desc">${item.description}</p>
                <div class="item-row-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="item-row-media">
                ${mediaHtml}
            </div>
        </article>
    `;
}

/* ==========================================================================
   SCROLLSPY COM INTERSECTION OBSERVER
   Atualiza a aba ativa no topo conforme o usuário rola a lista
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll(".menu-category-section");
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        if (AppState.isProgrammaticScroll) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const catId = entry.target.dataset.categoryId;
                if (catId) {
                    setActiveCategoryTab(catId);
                }
            }
        });
    }, {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0
    });

    sections.forEach(s => observer.observe(s));
}

/* ==========================================================================
   HEADER SEARCH SLIDE BAR
   ========================================================================== */
function initHeaderSearch() {
    const toggleBtn = document.getElementById("headerSearchToggle");
    const slideBar = document.getElementById("searchSlideBar");
    const closeBtn = document.getElementById("searchCloseBtn");
    const input = document.getElementById("menuSearchInput");

    if (toggleBtn && slideBar && input) {
        toggleBtn.addEventListener("click", () => {
            playAudioFeedback("click");
            slideBar.classList.add("open");
            setTimeout(() => input.focus(), 150);
        });
    }

    if (closeBtn && slideBar && input) {
        closeBtn.addEventListener("click", () => {
            slideBar.classList.remove("open");
            input.value = "";
            AppState.searchQuery = "";
            renderContinuousMenuList();
            initScrollSpy();
        });
    }

    if (input) {
        input.addEventListener("input", (e) => {
            AppState.searchQuery = e.target.value;
            renderContinuousMenuList();
            initScrollSpy();
        });
    }
}

/* ==========================================================================
   SHARE BUTTON (NATIVE WEB SHARE API)
   ========================================================================== */
function initShareButton() {
    const shareBtn = document.getElementById("headerShareBtn");
    if (!shareBtn) return;

    shareBtn.addEventListener("click", async () => {
        playAudioFeedback("click");
        const shareData = {
            title: "Lázaro's Burger - Cardápio Online",
            text: "Peça os melhores hambúrgueres artesanais 100% carne e combos do Lázaro's Burger!",
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // Cancelled by user
            }
        } else {
            // Fallback: Copiar link para área de transferência
            navigator.clipboard.writeText(window.location.href).then(() => {
                showToast("📋 Link da loja copiado com sucesso!");
            }).catch(() => {
                showToast("⚠️ Não foi possível copiar o link.");
            });
        }
    });
}

/* ==========================================================================
   PERFIL DA LOJA MODAL (HORÁRIOS, PAGAMENTOS, ENDEREÇO & PANFLETOS)
   ========================================================================== */
function initProfileModal() {
    const openBtn = document.getElementById("openProfileBtn");
    const modal = document.getElementById("profileModal");
    const closeBtn = document.getElementById("closeProfileModal");
    const changeAddressBtn = document.getElementById("profileChangeAddressBtn");
    const flyersRow = document.getElementById("profileFlyersRow");

    if (openBtn && modal) {
        openBtn.addEventListener("click", () => {
            playAudioFeedback("pop");
            updateProfileModalAddress();
            modal.classList.add("open");
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("open");
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
    }

    if (changeAddressBtn) {
        changeAddressBtn.addEventListener("click", () => {
            if (modal) modal.classList.remove("open");
            openAddressModal();
        });
    }

    // Render Flyers no Perfil
    if (flyersRow && typeof ORIGINAL_FLYERS !== "undefined") {
        flyersRow.innerHTML = ORIGINAL_FLYERS.map(f => `
            <div class="flyer-thumb-card" data-path="${f.path}" data-title="${f.title}">
                <img src="${f.path}" alt="${f.title}" loading="lazy" />
                <div class="flyer-thumb-title">${f.title}</div>
            </div>
        `).join("");

        flyersRow.querySelectorAll(".flyer-thumb-card").forEach(card => {
            card.addEventListener("click", () => {
                playAudioFeedback("pop");
                openFlyerModal(card.dataset.path, card.dataset.title);
            });
        });
    }
}

function updateProfileModalAddress() {
    const el = document.getElementById("profileAddressText");
    if (!el) return;
    if (AppState.userAddress && AppState.userAddress.formatted) {
        el.textContent = AppState.userAddress.formatted;
    } else {
        el.textContent = "Nenhum endereço de entrega definido ainda.";
    }
}

function initAddressDisplay() {
    updateProfileModalAddress();
}

/* ==========================================================================
   ORDER CUSTOMIZATION MODAL (BOTTOM SHEET)
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
            <h3>Fazer Pedido</h3>
            <button class="modal-close-btn" id="closeOrderModal">&times;</button>
        </div>
        <div class="modal-body">
            <!-- Item Preview -->
            <div class="modal-item-preview">
                <img src="${item.image || 'assets/hero_burger.jpg'}" alt="${item.name}" class="modal-item-thumb" />
                <div class="modal-item-info">
                    <h4>${item.name}</h4>
                    <div class="item-price" id="modalItemTotalPrice">R$ ${(item.price).toFixed(2).replace('.', ',')}</div>
                </div>
            </div>

            <!-- Observações ou Ingredientes -->
            <div class="form-group">
                <label for="modalNotesInput" style="display: flex; justify-content: space-between;">
                    <span>✏️ Observações ou Ingredientes</span>
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal;">(Opcional)</span>
                </label>
                <textarea id="modalNotesInput" class="form-control" rows="2" 
                          placeholder="Ex: Sem cebola, carne bem passada, sem molho..."></textarea>
            </div>

            <!-- Endereço de Entrega Compacto com Botão de GPS Integrado e Esquecer Endereço -->
            <div class="form-group address-input-group">
                <div class="address-header-row">
                    <label for="modalAddressInput">Endereço de Entrega *</label>
                    ${currentSavedAddress ? `<button type="button" class="btn-forget-address" id="btnForgetAddress" title="Limpar e esquecer este endereço">✕ Esquecer endereço</button>` : ''}
                </div>
                <div class="input-with-gps">
                    <input type="text" id="modalAddressInput" class="form-control" 
                           placeholder="Digite sua rua, número e bairro..." 
                           value="${currentSavedAddress}" required />
                    <button type="button" class="btn-inline-gps" id="modalGeoBtn" title="Detectar endereço pelo GPS do celular" aria-label="Usar GPS">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                        </svg>
                        <span>GPS</span>
                    </button>
                </div>
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
                <span>Subtotal:</span>
                <span class="order-total-price" id="modalFooterTotal">R$ ${(item.price).toFixed(2).replace('.', ',')}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
                <button class="btn btn-primary" id="modalAddToCartBtn" style="width: 100%;">
                    <span>➕ Adicionar à Sacola (+ Itens)</span>
                </button>
                <button class="btn btn-whatsapp" id="modalConfirmWhatsappBtn" style="width: 100%;">
                    <span>🟢 Pedir Apenas Este no WhatsApp</span>
                </button>
            </div>
        </div>
    `;

    modal.classList.add("open");
    playAudioFeedback("pop");

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

    container.querySelectorAll(".payment-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            playAudioFeedback("click");
            container.querySelectorAll(".payment-chip").forEach(c => c.classList.remove("selected"));
            chip.classList.add("selected");
            AppState.selectedPayment = chip.dataset.method;
        });
    });

    const forgetBtn = document.getElementById("btnForgetAddress");
    if (forgetBtn) {
        forgetBtn.addEventListener("click", () => {
            const input = document.getElementById("modalAddressInput");
            if (input) input.value = "";
            AppState.userAddress = null;
            localStorage.removeItem("lazaros_address");
            updateProfileModalAddress();
            forgetBtn.remove();
            playAudioFeedback("click");
            showToast("🗑️ Endereço esquecido com sucesso!");
        });
    }

    document.getElementById("modalGeoBtn").addEventListener("click", () => {
        requestDeviceLocation((detected) => {
            document.getElementById("modalAddressInput").value = detected.formatted;
        });
    });

    document.getElementById("modalAddToCartBtn").addEventListener("click", () => {
        const notes = document.getElementById("modalNotesInput").value.trim();
        const address = document.getElementById("modalAddressInput").value.trim();
        const clientName = document.getElementById("modalClientName").value.trim();

        if (address) {
            AppState.userAddress = { formatted: address, manual: true };
            localStorage.setItem("lazaros_address", JSON.stringify(AppState.userAddress));
            updateProfileModalAddress();
        }
        if (clientName) {
            localStorage.setItem("lazaros_client_name", clientName);
        }

        addToCart(item.id, qty, notes);
        modal.classList.remove("open");
        playAudioFeedback("success");
        showToast(`🎉 ${qty}x ${item.name} adicionado à sacola!`);
    });

    document.getElementById("modalConfirmWhatsappBtn").addEventListener("click", () => {
        const address = document.getElementById("modalAddressInput").value.trim();
        const clientName = document.getElementById("modalClientName").value.trim();
        const notes = document.getElementById("modalNotesInput").value.trim();

        if (!address) {
            showToast("⚠️ Por favor, informe seu endereço de entrega!");
            document.getElementById("modalAddressInput").focus();
            return;
        }

        if (clientName) localStorage.setItem("lazaros_client_name", clientName);
        AppState.userAddress = { formatted: address, manual: true };
        localStorage.setItem("lazaros_address", JSON.stringify(AppState.userAddress));
        updateProfileModalAddress();

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
        
        if (AppState.userAddress && AppState.userAddress.mapsUrl) {
            msg += `🗺️ *Link GPS*: ${AppState.userAddress.mapsUrl}\n`;
        }
        
        msg += `\nFavor confirmar o pedido e o tempo de entrega! Obrigado!`;

        const encodedMsg = encodeURIComponent(msg);
        const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodedMsg}`;

        playAudioFeedback("success");
        modal.classList.remove("open");
        window.open(whatsappUrl, "_blank");
    });
}

/* ==========================================================================
   CART ENGINE & BOTTOM NAVIGATION INTEGRATION
   ========================================================================== */
function addToCart(itemId, qty = 1, notes = "") {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

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

    // Bottom Navigation Badge
    const bottomBadge = document.getElementById("bottomNavCartBadge");
    if (bottomBadge) {
        bottomBadge.textContent = totalCount;
        if (totalCount > 0) {
            bottomBadge.classList.add("show");
        } else {
            bottomBadge.classList.remove("show");
        }
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

    // Cart Drawer List
    const list = document.getElementById("cartItemsList");
    const subtotalEl = document.getElementById("cartDrawerSubtotal");
    if (!list) return;

    if (AppState.cart.length === 0) {
        list.innerHTML = `
            <div class="cart-empty-state">
                <div class="cart-empty-icon">🛍️</div>
                <h4>Sua sacola está vazia</h4>
                <p>Toque em qualquer lanche ou combo no cardápio para pedir!</p>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = "R$ 0,00";
        return;
    }

    list.innerHTML = AppState.cart.map((item, idx) => {
        const itemTotal = item.price * item.quantity;
        return `
            <div class="cart-item-row">
                <img src="${item.image || 'assets/hero_burger.jpg'}" alt="${item.name}" />
                <div class="cart-item-meta">
                    <h5>${item.name}</h5>
                    ${item.notes ? `<small style="color: var(--primary-light); display:block; font-size: 0.72rem;">📝 ${item.notes}</small>` : ''}
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

    const modal = document.getElementById("orderModal");
    const container = document.getElementById("orderModalContent");
    if (!modal || !container) return;

    let subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const currentSavedAddress = AppState.userAddress ? AppState.userAddress.formatted : "";
    const currentSavedName = localStorage.getItem("lazaros_client_name") || "";

    container.innerHTML = `
        <div class="modal-header">
            <h3>Finalizar Pedido no WhatsApp</h3>
            <button class="modal-close-btn" id="closeOrderModal">&times;</button>
        </div>
        <div class="modal-body">
            <div style="background: rgba(255,255,255,0.03); border-radius: var(--radius-md); padding: 0.85rem; border: 1px solid var(--border-subtle);">
                <h4 style="margin-bottom: 0.4rem; font-size: 0.9rem;">Itens da Sacola (${AppState.cart.length}):</h4>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.82rem; color: var(--text-sub);">
                    ${AppState.cart.map(c => `
                        <li style="display: flex; justify-content: space-between;">
                            <span>${c.quantity}x ${c.name}</span>
                            <span style="font-weight: 700; color: var(--primary-light);">R$ ${(c.price * c.quantity).toFixed(2).replace('.', ',')}</span>
                        </li>
                    `).join("")}
                </ul>
            </div>

            <!-- Endereço de Entrega Compacto com Botão de GPS Integrado e Esquecer Endereço -->
            <div class="form-group address-input-group">
                <div class="address-header-row">
                    <label for="modalAddressInput">Endereço de Entrega *</label>
                    ${currentSavedAddress ? `<button type="button" class="btn-forget-address" id="btnForgetAddressCart" title="Limpar e esquecer este endereço">✕ Esquecer endereço</button>` : ''}
                </div>
                <div class="input-with-gps">
                    <input type="text" id="modalAddressInput" class="form-control" 
                           placeholder="Digite sua rua, número e bairro..." 
                           value="${currentSavedAddress}" required />
                    <button type="button" class="btn-inline-gps" id="modalGeoBtn" title="Detectar endereço pelo GPS do celular" aria-label="Usar GPS">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                        </svg>
                        <span>GPS</span>
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label for="modalClientName">Seu Nome</label>
                <input type="text" id="modalClientName" class="form-control" 
                       placeholder="Ex: Victor" value="${currentSavedName}" />
            </div>

            <div class="form-group">
                <label for="modalNotesInput">Observações para o Pedido (Opcional)</label>
                <textarea id="modalNotesInput" class="form-control" rows="2" 
                          placeholder="Ex: Sem cebola, troco para 50, etc."></textarea>
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
            <button class="btn btn-whatsapp" id="modalConfirmWhatsappBtn" style="width: 100%;">
                <span>Enviar Pedido para o WhatsApp 🟢</span>
            </button>
        </div>
    `;

    modal.classList.add("open");
    playAudioFeedback("pop");

    document.getElementById("closeOrderModal").addEventListener("click", () => {
        modal.classList.remove("open");
    });

    container.querySelectorAll(".payment-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            playAudioFeedback("click");
            container.querySelectorAll(".payment-chip").forEach(c => c.classList.remove("selected"));
            chip.classList.add("selected");
            AppState.selectedPayment = chip.dataset.method;
        });
    });

    const forgetBtnCart = document.getElementById("btnForgetAddressCart");
    if (forgetBtnCart) {
        forgetBtnCart.addEventListener("click", () => {
            const input = document.getElementById("modalAddressInput");
            if (input) input.value = "";
            AppState.userAddress = null;
            localStorage.removeItem("lazaros_address");
            updateProfileModalAddress();
            forgetBtnCart.remove();
            playAudioFeedback("click");
            showToast("🗑️ Endereço esquecido com sucesso!");
        });
    }

    document.getElementById("modalGeoBtn").addEventListener("click", () => {
        requestDeviceLocation((detected) => {
            document.getElementById("modalAddressInput").value = detected.formatted;
        });
    });

    document.getElementById("modalConfirmWhatsappBtn").addEventListener("click", () => {
        const address = document.getElementById("modalAddressInput").value.trim();
        const clientName = document.getElementById("modalClientName").value.trim();
        const notes = document.getElementById("modalNotesInput").value.trim();

        if (!address) {
            showToast("⚠️ Por favor, informe seu endereço de entrega!");
            document.getElementById("modalAddressInput").focus();
            return;
        }

        let msg = `Olá, *${RESTAURANT_CONFIG.name}*! Gostaria de fazer o seguinte pedido da Sacola:\n\n`;
        AppState.cart.forEach(item => {
            msg += `▫️ ${item.quantity}x *${item.name}* - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
            if (item.notes) msg += `   ↳ Obs: ${item.notes}\n`;
        });
        msg += `\n💰 *Total*: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
        
        if (notes) {
            msg += `📝 *Observações Gerais*: ${notes}\n`;
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
        const cartDrawer = document.getElementById("cartDrawer");
        if (cartDrawer) cartDrawer.classList.remove("open");
        window.open(whatsappUrl, "_blank");
    });
}

/* ==========================================================================
   GPS & GEOLOCATION
   ========================================================================== */
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
                    throw new Error("Offline");
                }
            } catch (err) {
                AppState.userAddress = {
                    formatted: `Localização GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
                    coords: { latitude, longitude },
                    mapsUrl: mapsUrl,
                    type: "gps"
                };
            }

            localStorage.setItem("lazaros_address", JSON.stringify(AppState.userAddress));
            updateProfileModalAddress();
            playAudioFeedback("success");
            showToast("📍 Localização detectada com sucesso!");

            if (geoBtn) {
                geoBtn.innerHTML = "<span>✅ Localização GPS Ativada!</span>";
                geoBtn.disabled = false;
            }

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
   STANDALONE ADDRESS MODAL
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
            <!-- Endereço de Entrega Compacto com Botão de GPS Integrado e Esquecer Endereço -->
            <div class="form-group address-input-group">
                <div class="address-header-row">
                    <label for="modalAddressInput">Rua, Número, Bairro e Cidade</label>
                    ${currentSavedAddress ? `<button type="button" class="btn-forget-address" id="btnForgetAddressSolo" title="Limpar e esquecer este endereço">✕ Esquecer endereço</button>` : ''}
                </div>
                <div class="input-with-gps">
                    <input type="text" id="modalAddressInput" class="form-control" 
                           placeholder="Ex: Av. Brasil, 500 - Centro" 
                           value="${currentSavedAddress}" />
                    <button type="button" class="btn-inline-gps" id="modalGeoBtn" title="Detectar endereço pelo GPS do celular" aria-label="Usar GPS">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                        </svg>
                        <span>GPS</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" id="saveAddressOnlyBtn" style="width: 100%;">
                <span>Salvar Endereço</span>
            </button>
        </div>
    `;

    modal.classList.add("open");

    const closeBtn = document.getElementById("closeOrderModal");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    }

    const forgetBtnSolo = document.getElementById("btnForgetAddressSolo");
    if (forgetBtnSolo) {
        forgetBtnSolo.addEventListener("click", () => {
            const input = document.getElementById("modalAddressInput");
            if (input) input.value = "";
            AppState.userAddress = null;
            localStorage.removeItem("lazaros_address");
            updateProfileModalAddress();
            forgetBtnSolo.remove();
            playAudioFeedback("click");
            showToast("🗑️ Endereço esquecido com sucesso!");
        });
    }

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
        updateProfileModalAddress();
        playAudioFeedback("success");
        showToast("📍 Endereço salvo com sucesso!");
        modal.classList.remove("open");
    });
}

/* ==========================================================================
   ORIGINAL FLYER MODAL
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
            <img src="${imagePath}" alt="${title}" style="max-width: 100%; border-radius: var(--radius-sm); max-height: 70vh; object-fit: contain;" />
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline btn-sm" id="closeFlyerBtn" style="width: 100%;">Fechar</button>
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
   EVENT LISTENERS SETUP
   ========================================================================== */
function setupEventListeners() {
    // Menu Continuous List Delegation
    const menuList = document.getElementById("menuContinuousList");
    if (menuList) {
        menuList.addEventListener("click", (e) => {
            const row = e.target.closest(".menu-item-row");
            if (row) {
                const id = row.dataset.id;
                const item = MENU_ITEMS.find(i => i.id === id);
                if (item) openOrderModal(item);
            }
        });
    }

    // Bottom Navigation Handlers
    const bottomNavHome = document.getElementById("bottomNavHome");
    const bottomNavCart = document.getElementById("bottomNavCart");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartClose = document.getElementById("cartDrawerClose");
    const cartCheckoutBtn = document.getElementById("cartDrawerCheckout");
    const continueBtn = document.getElementById("cartDrawerContinueBtn");

    if (bottomNavHome) {
        bottomNavHome.addEventListener("click", () => {
            playAudioFeedback("click");
            bottomNavHome.classList.add("active");
            if (bottomNavCart) bottomNavCart.classList.remove("active");
            if (cartDrawer) cartDrawer.classList.remove("open");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if (bottomNavCart && cartDrawer) {
        bottomNavCart.addEventListener("click", () => {
            playAudioFeedback("click");
            bottomNavCart.classList.add("active");
            if (bottomNavHome) bottomNavHome.classList.remove("active");
            cartDrawer.classList.add("open");
        });
    }

    if (cartClose && cartDrawer) {
        cartClose.addEventListener("click", () => {
            cartDrawer.classList.remove("open");
            if (bottomNavCart) bottomNavCart.classList.remove("active");
            if (bottomNavHome) bottomNavHome.classList.add("active");
        });
    }

    if (continueBtn && cartDrawer) {
        continueBtn.addEventListener("click", () => {
            playAudioFeedback("click");
            cartDrawer.classList.remove("open");
            if (bottomNavCart) bottomNavCart.classList.remove("active");
            if (bottomNavHome) bottomNavHome.classList.add("active");
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
            if (bottomNavCart) bottomNavCart.classList.add("active");
            if (bottomNavHome) bottomNavHome.classList.remove("active");
        });
    }

    // Order modal backdrop click
    const modal = document.getElementById("orderModal");
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
    }
}

/* ==========================================================================
   AUDIO FEEDBACK & TOAST NOTIFICATION
   ========================================================================== */
let audioCtx = null;

function initAudioSynthesizer() {
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
            osc.frequency.setValueAtTime(450, now);
            osc.frequency.exponentialRampToValueAtTime(750, now + 0.05);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === "pop") {
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === "success") {
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(660, now + 0.07);
            osc.frequency.setValueAtTime(880, now + 0.14);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.start(now);
            osc.stop(now + 0.22);
        }
    } catch (e) {
        // Ignored if browser disables audio context
    }
}

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
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}
