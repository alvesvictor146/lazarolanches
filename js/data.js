/**
 * Cardápio Oficial - Lázaro's Burger (Est. 2023)
 * Dados rigorosamente atualizados com ingredientes reais objetivos e nova organização de categorias.
 */

const RESTAURANT_CONFIG = {
    name: "Lázaro's Burger",
    shortName: "Lázaro Lanches",
    slogan: "Sabor que você sente! Feito com carinho e ingredientes selecionados.",
    whatsappNumber: "5511981881627",
    whatsappDisplay: "(11) 98188-1627",
    instagram: "@lazarosburger",
    deliveryInfo: "Fazemos Entrega em Toda Região! 🛵",
    estimatedTime: "30 - 45 min",
    openingHours: "Quarta a Domingo: 19h30 às 01h00",
    rating: "4.9",
    ratingCount: "380+"
};

const MENU_CATEGORIES = [
    { id: "promocao", name: "Promoção" },
    { id: "lanches", name: "Tradicionais" },
    { id: "novidades", name: "Novidade Salg." },
    { id: "artesanais", name: "Artesanais" },
    { id: "combos", name: "Combo" },
    { id: "mega", name: "Mega Combo" },
    { id: "doces", name: "Novidade Doce" },
    { id: "pasteis", name: "Pastel" },
    { id: "porcoes", name: "Porção" },
    { id: "acai", name: "Açaí na Garrafa" },
    { id: "bebidas", name: "Bebidas" }
];

const MENU_ITEMS = [
    // =========================================================================
    // 1. PROMOÇÃO
    // =========================================================================
    {
        id: "promo_xbacon_combo",
        category: "promocao",
        name: "X-Bacon + Batata Frita P + Sukita 200ml",
        price: 30.00,
        badge: "Super Promoção",
        description: "Pão, hambúrguer, queijo, bacon, alface, tomate, molho, batata frita P e Sukita 200ml.",
        ingredients: ["Pão", "Hambúrguer", "Bacon", "Queijo", "Batata Frita P", "Sukita 200ml"],
        image: "assets/combo_xbacon.jpg",
        highlight: true
    },
    {
        id: "promo_xcalabresa_combo",
        category: "promocao",
        name: "X-Calabresa + Batata Frita P + Sukita 200ml",
        price: 30.00,
        badge: "Super Promoção",
        description: "Pão, hambúrguer, queijo, calabresa, alface, tomate, molho, batata frita P e Sukita 200ml.",
        ingredients: ["Pão", "Hambúrguer", "Calabresa", "Queijo", "Batata Frita P", "Sukita 200ml"],
        image: "assets/combo1.jpg",
        highlight: true
    },
    {
        id: "promo_artesanal_cheddar",
        category: "promocao",
        name: "Combo Cheddar Especial + Batata P",
        price: 32.00,
        badge: "Destaque",
        description: "Pão, 2 hambúrgueres, queijo cheddar fatiado, cebola caramelizada, molho cheddar e batata frita P.",
        ingredients: ["Pão", "2 Carnes", "Cheddar", "Cebola Caramelizada", "Batata P"],
        image: "assets/cheddar_artesanal.jpg",
        highlight: true
    },

    // =========================================================================
    // 2. TRADICIONAIS
    // =========================================================================
    {
        id: "trad_x_burguer",
        category: "lanches",
        name: "X-Burguer",
        price: 10.00,
        badge: "",
        description: "Pão, hambúrguer, queijo, presunto, alface, tomate e molho.",
        ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Alface", "Tomate", "Molho"],
        image: "assets/hero_burger.jpg",
        highlight: false
    },
    {
        id: "trad_x_salada",
        category: "lanches",
        name: "X-Salada",
        price: 12.00,
        badge: "",
        description: "Pão, hambúrguer, queijo, presunto, alface, tomate e molho.",
        ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Alface", "Tomate", "Molho"],
        image: "assets/combo_xsalada.jpg",
        highlight: false
    },
    {
        id: "trad_x_bacon",
        category: "lanches",
        name: "X-Bacon",
        price: 15.00,
        badge: "",
        description: "Pão, hambúrguer, queijo, presunto, bacon e molho.",
        ingredients: ["Pão", "Hambúrguer", "Bacon", "Queijo", "Presunto", "Molho"],
        image: "assets/combo_xbacon.jpg",
        highlight: true
    },
    {
        id: "trad_x_egg",
        category: "lanches",
        name: "X-Egg",
        price: 14.00,
        badge: "",
        description: "Pão, hambúrguer, queijo, presunto, ovo, alface e tomate.",
        ingredients: ["Pão", "Ovo", "Hambúrguer", "Queijo", "Presunto", "Alface", "Tomate"],
        image: "assets/combo_xtudo.jpg",
        highlight: false
    },
    {
        id: "trad_x_egg_bacon",
        category: "lanches",
        name: "X-Egg Bacon",
        price: 17.00,
        badge: "",
        description: "Pão, hambúrguer, queijo, presunto, ovo e bacon.",
        ingredients: ["Pão", "Ovo", "Bacon", "Hambúrguer", "Queijo", "Presunto"],
        image: "assets/combo_xbacon.jpg",
        highlight: false
    },
    {
        id: "trad_x_calabresa",
        category: "lanches",
        name: "X-Calabresa",
        price: 14.00,
        badge: "",
        description: "Pão, calabresa, queijo, presunto, alface, tomate, cebola e molho.",
        ingredients: ["Pão", "Calabresa", "Queijo", "Presunto", "Alface", "Tomate", "Cebola", "Molho"],
        image: "assets/burger_xtoscana.jpg",
        highlight: false
    },
    {
        id: "trad_x_frango",
        category: "lanches",
        name: "X-Frango",
        price: 15.00,
        badge: "",
        description: "Pão, frango desfiado, queijo, presunto, alface, tomate, batata palha e molho.",
        ingredients: ["Pão", "Frango Desfiado", "Queijo", "Presunto", "Alface", "Tomate", "Batata Palha", "Molho"],
        image: "assets/hero_burger.jpg",
        highlight: false
    },
    {
        id: "trad_x_catufrango",
        category: "lanches",
        name: "X-Catufrango",
        price: 17.00,
        badge: "",
        description: "Pão, frango desfiado, queijo, catupiry e molho.",
        ingredients: ["Pão", "Frango Desfiado", "Queijo", "Catupiry", "Molho"],
        image: "assets/hero_burger.jpg",
        highlight: true
    },
    {
        id: "trad_x_tudo",
        category: "lanches",
        name: "X-Tudo",
        price: 20.00,
        badge: "Completo",
        description: "Pão, hambúrguer, queijo, presunto, ovo, bacon, calabresa, alface, tomate, batata palha e molho.",
        ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Ovo", "Bacon", "Calabresa", "Alface", "Tomate", "Batata Palha", "Molho"],
        image: "assets/combo_xtudo.jpg",
        highlight: true
    },
    {
        id: "trad_x_duplo_cheddar",
        category: "lanches",
        name: "X-Duplo Cheddar",
        price: 23.00,
        badge: "",
        description: "Pão, 2 hambúrgueres, molho cheddar, presunto e cebola caramelizada.",
        ingredients: ["Pão", "2 Hambúrgueres", "Molho Cheddar", "Presunto", "Cebola Caramelizada"],
        image: "assets/cheddar_artesanal.jpg",
        highlight: false
    },
    {
        id: "trad_brutal_burguer",
        category: "lanches",
        name: "Brutal Burgue",
        price: 29.00,
        badge: "Mais Pedido ⭐",
        description: "Pão, 3 hambúrgueres, calabresa, ovo, bacon, queijo, presunto, alface, tomate, batata palha, catupiry, cheddar e molho.",
        ingredients: ["Pão", "3 Hambúrgueres", "Calabresa", "Ovo", "Bacon", "Queijo", "Presunto", "Alface", "Tomate", "Batata Palha", "Catupiry", "Cheddar", "Molho"],
        image: "assets/burger_brutal.jpg",
        highlight: true
    },

    // =========================================================================
    // 3. NOVIDADE SALG.
    // =========================================================================
    {
        id: "novidade_lanche_frango",
        category: "novidades",
        name: "Lanche de Frango Empanado",
        price: 17.00,
        badge: "Lançamento 🍗",
        description: "Pão, frango empanado e requeijão.",
        ingredients: ["Pão", "Frango Empanado", "Requeijão"],
        image: "assets/lanche_frango_empanado.jpg",
        highlight: true
    },
    {
        id: "xdog",
        category: "novidades",
        name: "X Dog",
        price: 14.00,
        badge: "",
        description: "Pão, salsicha, queijo, presunto, batata palha e molho.",
        ingredients: ["Pão", "Salsicha", "Queijo", "Presunto", "Batata Palha", "Molho"],
        image: "assets/burger_xdog.jpg",
        highlight: false
    },
    {
        id: "xsalame",
        category: "novidades",
        name: "X Salame",
        price: 21.00,
        badge: "",
        description: "Pão, salame, queijo, alface, tomate e molho.",
        ingredients: ["Pão", "Salame", "Queijo", "Alface", "Tomate", "Molho"],
        image: "assets/burger_xsalame.jpg",
        highlight: false
    },
    {
        id: "xtoscana",
        category: "novidades",
        name: "X Toscana",
        price: 18.00,
        badge: "",
        description: "Pão, linguiça toscana, alface, tomate e molho.",
        ingredients: ["Pão", "Linguiça Toscana", "Alface", "Tomate", "Molho"],
        image: "assets/burger_xtoscana.jpg",
        highlight: false
    },
    {
        id: "brutal_burgue_2",
        category: "novidades",
        name: "Brutal Burgue 2.0",
        price: 33.00,
        badge: "Super Completo 💥",
        description: "Pão, 2 hambúrgueres, salsicha, calabresa, frango, bacon, ovo, toscana, presunto, queijo, molho cheddar, catupiry, cheddar, batata palha e molho.",
        ingredients: ["Pão", "2 Hambúrgueres", "Salsicha", "Calabresa", "Frango", "Bacon", "Ovo", "Toscana", "Presunto", "Queijo", "Molho Cheddar", "Catupiry", "Cheddar", "Batata Palha", "Molho"],
        image: "assets/burger_brutal.jpg",
        highlight: true
    },

    // =========================================================================
    // 4. ARTESANAIS
    // =========================================================================
    {
        id: "artesanal_cheddar",
        category: "artesanais",
        name: "Cheddar Especial",
        price: 24.00,
        badge: "Duplo Burger",
        description: "Pão, 2 hambúrgueres, molho cheddar, queijo cheddar e cebola caramelizada.",
        ingredients: ["Pão", "2 Hambúrgueres", "Molho Cheddar", "Queijo Cheddar", "Cebola Caramelizada"],
        image: "assets/cheddar_artesanal.jpg",
        highlight: true
    },
    {
        id: "artesanal_cheddar_bacon",
        category: "artesanais",
        name: "Cheddar Bacon",
        price: 26.00,
        badge: "Mais Pedido ⭐",
        description: "Pão, 2 hambúrgueres, molho cheddar, queijo cheddar, cebola caramelizada e bacon.",
        ingredients: ["Pão", "2 Hambúrgueres", "Molho Cheddar", "Queijo Cheddar", "Cebola Caramelizada", "Bacon"],
        image: "assets/cheddar_bacon.jpg",
        highlight: true
    },
    {
        id: "artesanal_cheddar_egg",
        category: "artesanais",
        name: "Cheddar Egg",
        price: 26.00,
        badge: "",
        description: "Pão, 2 hambúrgueres, molho cheddar, queijo cheddar, cebola caramelizada e ovo.",
        ingredients: ["Pão", "2 Hambúrgueres", "Molho Cheddar", "Queijo Cheddar", "Cebola Caramelizada", "Ovo"],
        image: "assets/cheddar_egg.jpg",
        highlight: false
    },
    {
        id: "artesanal_cheddar_egg_bacon",
        category: "artesanais",
        name: "Cheddar Egg Bacon",
        price: 30.00,
        badge: "Especial 👑",
        description: "Pão, 2 hambúrgueres, molho cheddar, queijo cheddar, cebola caramelizada, ovo e bacon.",
        ingredients: ["Pão", "2 Hambúrgueres", "Molho Cheddar", "Queijo Cheddar", "Cebola Caramelizada", "Ovo", "Bacon"],
        image: "assets/cheddar_egg_bacon.jpg",
        highlight: true
    },

    // =========================================================================
    // 5. COMBO
    // =========================================================================
    {
        id: "combo_1",
        category: "combos",
        name: "Combo 1: X-Salada + Batata + Refri Lata",
        price: 25.00,
        badge: "",
        description: "X-Salada (pão, hambúrguer, queijo, presunto, alface, tomate e molho) + batata simples + refrigerante em lata.",
        ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Alface", "Tomate", "Batata Simples", "Refri Lata"],
        image: "assets/combo_xsalada.jpg",
        highlight: false
    },
    {
        id: "combo_2",
        category: "combos",
        name: "Combo 2: X-Bacon + Batata + Refri Lata",
        price: 28.00,
        badge: "Mais Pedido ⭐",
        description: "X-Bacon (pão, hambúrguer, queijo, presunto, bacon e molho) + batata simples + refrigerante em lata.",
        ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Bacon", "Batata Simples", "Refri Lata"],
        image: "assets/combo_xbacon.jpg",
        highlight: true
    },
    {
        id: "combo_3",
        category: "combos",
        name: "Combo 3: X-Tudo + Batata + Refri Lata",
        price: 33.00,
        badge: "",
        description: "X-Tudo (pão, hambúrguer, queijo, presunto, ovo, bacon, calabresa, alface, tomate, batata palha e molho) + batata simples + refrigerante em lata.",
        ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Ovo", "Bacon", "Calabresa", "Alface", "Tomate", "Batata Simples", "Refri Lata"],
        image: "assets/combo_xtudo.jpg",
        highlight: false
    },

    // =========================================================================
    // 6. MEGA COMBO
    // =========================================================================
    {
        id: "mega_1",
        category: "mega",
        name: "Mega Combo 1: 2 Lanches + Batata Completa + Refri 2L",
        price: 52.00,
        badge: "Para 2 Pessoas 👥",
        description: "2 lanches (X-Salada ou X-Bacon) + batata completa com cheddar e bacon + refrigerante 2 litros.",
        ingredients: ["2 Lanches (Salada ou Bacon)", "Batata Completa", "Refri 2 Litros"],
        image: "assets/mega_combo1.jpg",
        highlight: true
    },
    {
        id: "mega_2",
        category: "mega",
        name: "Mega Combo 2: 1 Lanche + Pastel Queijo + Batata + Refri 2L",
        price: 47.00,
        badge: "",
        description: "1 lanche (X-Salada ou X-Bacon) + 1 pastel de queijo + batata simples + refrigerante 2 litros.",
        ingredients: ["1 Lanche (Salada ou Bacon)", "Pastel de Queijo", "Batata Simples", "Refri 2 Litros"],
        image: "assets/mega_combo2.jpg",
        highlight: false
    },
    {
        id: "mega_3",
        category: "mega",
        name: "Mega Combo 3: 1 Lanche + Pastel Carne + Batata Completa + Refri 2L",
        price: 52.00,
        badge: "Campeão 🏆",
        description: "1 lanche (X-Salada ou X-Bacon) + 1 pastel de carne + batata completa com cheddar e bacon + refrigerante 2 litros.",
        ingredients: ["1 Lanche (Salada ou Bacon)", "Pastel de Carne", "Batata Completa", "Refri 2 Litros"],
        image: "assets/mega_combo3.jpg",
        highlight: true
    },

    // =========================================================================
    // 7. NOVIDADE DOCE
    // =========================================================================
    {
        id: "doce_sensacao",
        category: "doces",
        name: "X-Sensação",
        price: 18.00,
        badge: "Doce 🍓🍫",
        description: "Pão, Nutella, morango e Leite Ninho.",
        ingredients: ["Pão", "Nutella", "Morango", "Leite Ninho"],
        image: "assets/x_sensacao.jpg",
        highlight: true
    },
    {
        id: "doce_morango_eclipse",
        category: "doces",
        name: "Morango Eclipse",
        price: 18.00,
        badge: "Doce ✨",
        description: "Pão com cobertura de chocolate, ganache branca, morango e Leite Ninho.",
        ingredients: ["Pão", "Cobertura de Chocolate", "Ganache Branca", "Morango", "Leite Ninho"],
        image: "assets/morango_eclipse.jpg",
        highlight: true
    },
    {
        id: "doce_leite_banana",
        category: "doces",
        name: "X-Doce de Leite",
        price: 15.00,
        badge: "Doce 🍌",
        description: "Pão, doce de leite, banana e Leite Ninho.",
        ingredients: ["Pão", "Doce de Leite", "Banana", "Leite Ninho"],
        image: "assets/x_doce_leite.jpg",
        highlight: false
    },

    // =========================================================================
    // 8. PASTEL (R$ 15,00 CADA)
    // =========================================================================
    {
        id: "pastel_queijo",
        category: "pasteis",
        name: "Pastel de Queijo",
        price: 15.00,
        badge: "",
        description: "Massa de pastel e queijo muçarela.",
        ingredients: ["Massa de Pastel", "Queijo Muçarela"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_queijo_catupiry",
        category: "pasteis",
        name: "Pastel de Queijo com Catupiry",
        price: 15.00,
        badge: "",
        description: "Massa de pastel, queijo muçarela e catupiry.",
        ingredients: ["Massa de Pastel", "Queijo Muçarela", "Catupiry"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_carne",
        category: "pasteis",
        name: "Pastel de Carne",
        price: 15.00,
        badge: "",
        description: "Massa de pastel e carne moída.",
        ingredients: ["Massa de Pastel", "Carne Moída"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: true
    },
    {
        id: "pastel_calabresa",
        category: "pasteis",
        name: "Pastel de Calabresa",
        price: 15.00,
        badge: "",
        description: "Massa de pastel e calabresa fatiada.",
        ingredients: ["Massa de Pastel", "Calabresa"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_frango",
        category: "pasteis",
        name: "Pastel de Frango",
        price: 15.00,
        badge: "",
        description: "Massa de pastel e frango desfiado.",
        ingredients: ["Massa de Pastel", "Frango Desfiado"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_frango_catupiry",
        category: "pasteis",
        name: "Pastel de Frango com Catupiry",
        price: 15.00,
        badge: "Mais Pedido ⭐",
        description: "Massa de pastel, frango desfiado e catupiry.",
        ingredients: ["Massa de Pastel", "Frango Desfiado", "Catupiry"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: true
    },
    {
        id: "pastel_pizza",
        category: "pasteis",
        name: "Pastel de Pizza",
        price: 15.00,
        badge: "",
        description: "Massa de pastel, queijo, presunto, molho de tomate e orégano.",
        ingredients: ["Massa de Pastel", "Queijo", "Presunto", "Molho de Tomate", "Orégano"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_bauru",
        category: "pasteis",
        name: "Pastel de Bauru",
        price: 15.00,
        badge: "",
        description: "Massa de pastel, queijo, presunto e tomate.",
        ingredients: ["Massa de Pastel", "Queijo", "Presunto", "Tomate"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },

    // =========================================================================
    // 9. PORÇÃO
    // =========================================================================
    {
        id: "batata_simples",
        category: "porcoes",
        name: "Porção de Batata Simples",
        price: 10.00,
        badge: "",
        description: "Batata frita palito.",
        ingredients: ["Batata Frita Palito"],
        image: "assets/crispy_fries.jpg",
        highlight: false
    },
    {
        id: "batata_completa",
        category: "porcoes",
        name: "Porção de Batata Completa",
        price: 16.00,
        badge: "Turbinada",
        description: "Batata frita com molho cheddar, catupiry, bacon em cubos e queijo ralado.",
        ingredients: ["Batata Frita", "Molho Cheddar", "Catupiry", "Bacon em Cubos", "Queijo Ralado"],
        image: "assets/crispy_fries.jpg",
        highlight: true
    },
    {
        id: "porcao_cebola_empanada",
        category: "porcoes",
        name: "Cebola Empanada",
        price: 16.00,
        badge: "Crocante",
        description: "Anéis de cebola empanados e fritos.",
        ingredients: ["Cebola Empanada"],
        image: "assets/cebola_empanada.jpg",
        highlight: true
    },
    {
        id: "porcao_polenta_frita",
        category: "porcoes",
        name: "Polenta Frita",
        price: 10.00,
        badge: "",
        description: "Polenta frita em palitos.",
        ingredients: ["Polenta Frita"],
        image: "assets/polenta_frita.jpg",
        highlight: false
    },
    {
        id: "porcao_bolinho_batata",
        category: "porcoes",
        name: "Bolinho de Batata",
        price: 15.00,
        badge: "",
        description: "Bolinho de batata frito.",
        ingredients: ["Bolinho de Batata"],
        image: "assets/bolinho_batata.jpg",
        highlight: false
    },

    // =========================================================================
    // 10. AÇAÍ NA GARRAFA (R$ 15,00 CADA)
    // =========================================================================
    {
        id: "acai_mousse_maracuja",
        category: "acai",
        name: "Açaí com Mousse de Maracujá",
        price: 15.00,
        badge: "500ml",
        description: "Açaí, mousse de maracujá e leite condensado.",
        ingredients: ["Açaí", "Mousse de Maracujá", "Leite Condensado"],
        image: "assets/acai1.jpg",
        highlight: true
    },
    {
        id: "acai_mousse_morango",
        category: "acai",
        name: "Açaí com Mousse de Morango",
        price: 15.00,
        badge: "500ml",
        description: "Açaí, mousse de morango e leite condensado.",
        ingredients: ["Açaí", "Mousse de Morango", "Leite Condensado"],
        image: "assets/acai2.jpg",
        highlight: true
    },
    {
        id: "acai_avela_maracuja",
        category: "acai",
        name: "Açaí com Creme de Avelã e Mousse de Maracujá",
        price: 15.00,
        badge: "500ml",
        description: "Açaí, creme de avelã, mousse de maracujá e leite condensado.",
        ingredients: ["Açaí", "Creme de Avelã", "Mousse de Maracujá", "Leite Condensado"],
        image: "assets/acai3.jpg",
        highlight: true
    },
    {
        id: "acai_leite_condensado",
        category: "acai",
        name: "Açaí com Leite Condensado",
        price: 15.00,
        badge: "500ml",
        description: "Açaí e leite condensado.",
        ingredients: ["Açaí", "Leite Condensado"],
        image: "assets/acai4.jpg",
        highlight: false
    },
    {
        id: "acai_pacoca",
        category: "acai",
        name: "Açaí com Paçoca e Leite Condensado",
        price: 15.00,
        badge: "500ml",
        description: "Açaí, paçoca e leite condensado.",
        ingredients: ["Açaí", "Paçoca", "Leite Condensado"],
        image: "assets/acai5.jpg",
        highlight: false
    },
    {
        id: "acai_avela_morango",
        category: "acai",
        name: "Açaí com Creme de Avelã e Mousse de Morango",
        price: 15.00,
        badge: "500ml",
        description: "Açaí, creme de avelã, mousse de morango e leite condensado.",
        ingredients: ["Açaí", "Creme de Avelã", "Mousse de Morango", "Leite Condensado"],
        image: "assets/acai6.jpg",
        highlight: true
    },

    // =========================================================================
    // 11. BEBIDAS (SEM CERVEJAS)
    // =========================================================================
    {
        id: "bebida_coca_1_5l",
        category: "bebidas",
        name: "Coca-Cola 1,5L",
        price: 18.00,
        badge: "1,5 Litros",
        description: "Garrafa de 1,5L gelada.",
        ingredients: ["Garrafa 1,5L"],
        image: "assets/bebidas_geladas.jpg",
        highlight: true
    },
    {
        id: "bebida_coca_lata",
        category: "bebidas",
        name: "Coca-Cola Lata 350ml",
        price: 6.00,
        badge: "",
        description: "Lata 350ml gelada.",
        ingredients: ["Lata 350ml"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_guarana_lata",
        category: "bebidas",
        name: "Guaraná Antarctica Lata 350ml",
        price: 6.00,
        badge: "",
        description: "Lata 350ml gelada.",
        ingredients: ["Lata 350ml"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_fanta_lata",
        category: "bebidas",
        name: "Fanta Laranja Lata 350ml",
        price: 6.00,
        badge: "",
        description: "Lata 350ml gelada.",
        ingredients: ["Lata 350ml"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_dolly_2l",
        category: "bebidas",
        name: "Dolly Guaraná 2 Litros",
        price: 10.00,
        badge: "",
        description: "Garrafa 2 Litros gelada.",
        ingredients: ["Garrafa 2 Litros"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_sukita_2l",
        category: "bebidas",
        name: "Sukita Laranja 2 Litros",
        price: 10.00,
        badge: "",
        description: "Garrafa 2 Litros gelada.",
        ingredients: ["Garrafa 2 Litros"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_agua",
        category: "bebidas",
        name: "Água Mineral 500ml",
        price: 3.00,
        badge: "",
        description: "Garrafa 500ml sem gás.",
        ingredients: ["Garrafa 500ml"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_agua_gas",
        category: "bebidas",
        name: "Água Mineral com Gás 500ml",
        price: 4.00,
        badge: "",
        description: "Garrafa 500ml com gás.",
        ingredients: ["Garrafa 500ml"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    }
];

const ORIGINAL_FLYERS = [
    { title: "Lanches Artesanais", path: "assets/flyer_artesanais.jpeg" },
    { title: "Novidade Doce", path: "assets/flyer_doces.jpeg" },
    { title: "Novidade Salg. (X Dog, Salame, Toscana, Frango, Brutal 2.0)", path: "assets/flyer_novidades.jpeg" },
    { title: "Combos & Mega Combos", path: "assets/flyer_combos.jpeg" },
    { title: "Cardápio Geral (Tradicionais, Pastéis, Porções e Bebidas)", path: "assets/flyer_cardapio_principal.jpeg" },
    { title: "Novidade Açaí na Garrafa", path: "assets/flyer_acai.jpg" },
    { title: "Lanche de Frango Empanado", path: "assets/lanche_frango_empanado.jpg" }
];
