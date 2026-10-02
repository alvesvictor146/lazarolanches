/**
 * Cardápio Oficial - Lázaro's Burger (Est. 2023)
 * Dados extraídos dos folhetos originais do estabelecimento.
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
    openingHours: "Terça a Domingo: 18h30 às 23h30",
    rating: "4.9",
    ratingCount: "380+"
};

const MENU_CATEGORIES = [
    { id: "all", name: "Todos os Itens", icon: "✨" },
    { id: "novidades", name: "Novidades & Especiais", icon: "🔥" },
    { id: "combos", name: "Combos Simples", icon: "🍔" },
    { id: "mega", name: "Mega Combos", icon: "👑" },
    { id: "acai", name: "Açaí na Garrafa", icon: "🍇" },
    { id: "extras", name: "Acompanhamentos & Porções", icon: "🍟" }
];

const MENU_ITEMS = [
    // --- NOVIDADES NO CARDÁPIO ---
    {
        id: "xdog",
        category: "novidades",
        name: "X Dog",
        price: 14.00,
        badge: "Mais Vendido",
        description: "Pão artesanal tostado, salsicha suculenta, queijo derretido, presunto selecionado, batata palha crocante e molho especial da casa.",
        ingredients: ["Pão", "Salsicha", "Queijo", "Presunto", "Batata Palha", "Molho Especial"],
        image: "assets/burger_xdog.jpg",
        highlight: false
    },
    {
        id: "xsalame",
        category: "novidades",
        name: "X Salame",
        price: 21.00,
        badge: "Especial",
        description: "Pão selado na chapa, generosas fatias de salame italiano tostadas, queijo derretido, alface fresca, tomate fatiado e molho da casa.",
        ingredients: ["Pão", "Salame Italiano", "Queijo", "Alface", "Tomate", "Molho"],
        image: "assets/burger_xsalame.jpg",
        highlight: false
    },
    {
        id: "xtoscana",
        category: "novidades",
        name: "X Toscana",
        price: 18.00,
        badge: "Tradicional",
        description: "Pão macio, linguiça toscana grelhada no ponto com sabor defumado marcante, queijo, alface fresca, tomate e molho artesanal.",
        ingredients: ["Pão", "Linguiça Toscana", "Queijo", "Alface", "Tomate", "Molho"],
        image: "assets/burger_xtoscana.jpg",
        highlight: false
    },
    {
        id: "brutal_burgue",
        category: "novidades",
        name: "Brutal Burgue 2.0",
        price: 33.00,
        badge: "O Mais Brutal! 💥",
        description: "Pão brioche, 2 hambúrgueres artesanais, salsicha, calabresa fatiada, peito de frango, bacon crocante, ovo, linguiça toscana, presunto, queijo derretido, molho cheddar cremoso, Catupiry legítimo, batata palha e molho especial.",
        ingredients: ["2 Hambúrgueres", "Bacon Crocante", "Calabresa", "Toscana", "Frango", "Ovo", "Salsicha", "Queijo", "Cheddar & Catupiry", "Batata Palha"],
        image: "assets/burger_brutal.jpg",
        highlight: true
    },

    // --- COMBOS SIMPLES (BATATA SIMPLES + REFRI LATA) ---
    {
        id: "combo_1",
        category: "combos",
        name: "Combo 1: X-Salada Completo",
        price: 25.00,
        badge: "Combo Clássico",
        description: "Pão selado, hambúrguer de carne 120g grelhada no fogo, queijo derretido, salada fresca de alface e tomate + Porção de Batata Simples sequinha + Refrigerante em lata gelado.",
        ingredients: ["Pão", "Carne 120g", "Queijo", "Salada", "Batata Simples", "Refri Lata"],
        image: "assets/combo_xsalada.jpg",
        highlight: false
    },
    {
        id: "combo_2",
        category: "combos",
        name: "Combo 2: X-Bacon Supremo",
        price: 28.00,
        badge: "Favorito do Público ⭐",
        description: "Pão artesanal, hambúrguer de carne 120g, fatias crocantes de bacon dourado, queijo derretido + Batata frita crocante + Refrigerante em lata a escolher.",
        ingredients: ["Pão", "Carne 120g", "Queijo", "Bacon Especial", "Batata Simples", "Refri Lata"],
        image: "assets/combo_xbacon.jpg",
        highlight: true
    },
    {
        id: "combo_3",
        category: "combos",
        name: "Combo 3: X-Tudo Campeão",
        price: 33.00,
        badge: "Super Completo",
        description: "Pão macio, carne 120g, ovo estalado, calabresa defumada, fatias de bacon, queijo, presunto, salada fresca + Batata frita simples + Refri lata trincando.",
        ingredients: ["Carne 120g", "Ovo", "Calabresa", "Bacon", "Queijo", "Presunto", "Salada", "Batata", "Refri"],
        image: "assets/combo_xtudo.jpg",
        highlight: false
    },

    // --- MEGA COMBOS (BATATA COMPLETA & REFRI 2L) ---
    {
        id: "mega_1",
        category: "mega",
        name: "Mega Combo 1: Dupla de Respeito",
        price: 52.00,
        badge: "Serve 2 Pessoas 👥",
        description: "2 X-Burgers caprichados (à sua escolha: Salada ou Bacon) + 1 Tigela generosa de Batata Completa com Cheddar e Bacon + 1 Refrigerante de 2 Litros bem gelado.",
        ingredients: ["2 X-Burgers (Salada ou Bacon)", "1 Batata Completa (Cheddar & Bacon)", "1 Refri 2 Litros"],
        image: "assets/mega_combo1.jpg",
        highlight: true
    },
    {
        id: "mega_2",
        category: "mega",
        name: "Mega Combo 2: Burger + Pastel de Queijo",
        price: 47.00,
        badge: "Econômico Mega",
        description: "1 X-Burger (Salada ou Bacon) + 1 Pastel frito na hora de queijo crocante + 1 Batata Simples + 1 Refrigerante 2 Litros geladíssimo.",
        ingredients: ["1 X-Burger (Salada ou Bacon)", "1 Pastel de Queijo", "1 Batata Simples", "1 Refri 2 Litros"],
        image: "assets/mega_combo2.jpg",
        highlight: false
    },
    {
        id: "mega_3",
        category: "mega",
        name: "Mega Combo 3: Burger + Pastel de Carne + Batata Completa",
        price: 52.00,
        badge: "Campeão de Vendas 🏆",
        description: "1 X-Burger (Salada ou Bacon) + 1 Pastel de carne moída bem temperado + 1 Batata Completa com muito Cheddar cremoso e Bacon + 1 Refrigerante de 2 Litros.",
        ingredients: ["1 X-Burger (Salada ou Bacon)", "1 Pastel de Carne", "1 Batata Completa", "1 Refri 2 Litros"],
        image: "assets/mega_combo3.jpg",
        highlight: true
    },

    // --- AÇAÍ NA GARRAFA (500ml) ---
    {
        id: "acai_maracuja",
        category: "acai",
        name: "Açaí com Mousse de Maracujá",
        price: 15.00,
        badge: "Cremoso & Gelado",
        description: "Açaí puro e cremoso batido na garrafa, camadas de mousse artesanal de maracujá e farto leite condensado moça.",
        ingredients: ["Açaí Cremoso", "Mousse de Maracujá", "Leite Condensado"],
        image: "assets/acai_maracuja.jpg",
        highlight: false
    },
    {
        id: "acai_morango",
        category: "acai",
        name: "Açaí com Mousse de Morango",
        price: 15.00,
        badge: "Refrescante 🍓",
        description: "Açaí denso e super cremoso, deliciosa calda e mousse de morango fresco e toque de leite condensado.",
        ingredients: ["Açaí Cremoso", "Mousse de Morango", "Leite Condensado"],
        image: "assets/acai_morango.jpg",
        highlight: true
    },
    {
        id: "acai_avela_maracuja",
        category: "acai",
        name: "Açaí com Creme de Avelã & Maracujá",
        price: 15.00,
        badge: "Gourmet ✨",
        description: "Açaí cremoso de garrafa, camadas aveludadas de creme de avelã nobre + mousse de maracujá cítrico e leite condensado.",
        ingredients: ["Açaí Cremoso", "Creme de Avelã", "Mousse de Maracujá", "Leite Condensado"],
        image: "assets/acai_avela_maracuja.jpg",
        highlight: false
    },
    {
        id: "acai_leite_condensado",
        category: "acai",
        name: "Açaí com Leite Condensado",
        price: 15.00,
        badge: "Clássico",
        description: "A fórmula perfeita: açaí cremoso de altíssima qualidade com dose dupla de leite condensado cremoso.",
        ingredients: ["Açaí Cremoso", "Dose Dupla Leite Condensado"],
        image: "assets/acai_leite_condensado.jpg",
        highlight: false
    },
    {
        id: "acai_pacoca",
        category: "acai",
        name: "Açaí com Paçoca de Rolha & Leite Condensado",
        price: 15.00,
        badge: "Top Sabor 🥜",
        description: "Açaí da casa batido na garrafa, farelo crocante de paçoca de amendoim selecionada e leite condensado cremoso.",
        ingredients: ["Açaí Cremoso", "Paçoca de Amendoim", "Leite Condensado"],
        image: "assets/acai_pacoca.jpg",
        highlight: false
    },
    {
        id: "acai_avela_morango",
        category: "acai",
        name: "Açaí com Creme de Avelã & Morango",
        price: 15.00,
        badge: "Desejo do Dia 🍫🍓",
        description: "A combinação suprema: açaí super batido, farto creme de avelã, mousse artesanal de morango e leite condensado.",
        ingredients: ["Açaí Cremoso", "Creme de Avelã", "Mousse de Morango", "Leite Condensado"],
        image: "assets/acai_avela_morango.jpg",
        highlight: true
    },
    {
        id: "acai_ninho",
        category: "acai",
        name: "Tradicional de Garrafa com Leite Ninho",
        price: 15.00,
        badge: "Sensação do Verão",
        description: "Garrafa de açaí cremoso mesclado com leite condensado e generosa camada de leite ninho em pó.",
        ingredients: ["Açaí Cremoso", "Leite Ninho em Pó", "Leite Condensado"],
        image: "assets/menu_banner_acai_full.jpg",
        highlight: false
    },

    // --- EXTRAS E PORÇÕES ---
    {
        id: "batata_cheddar_bacon",
        category: "extras",
        name: "Batata Completa com Cheddar & Bacon",
        price: 24.00,
        badge: "Porção Especial 🍟",
        description: "Porção grande de batatas douradas e crocantes, coberta com farto molho de cheddar fundido cremoso e cubinhos crocantes de bacon artesanal.",
        ingredients: ["Batata Crocante Grande", "Cheddar Cremoso", "Bacon em Cubos Crocante"],
        image: "assets/crispy_fries.jpg",
        highlight: true
    },
    {
        id: "pastel_queijo",
        category: "extras",
        name: "Pastel Frito de Queijo Derretido",
        price: 10.00,
        badge: "Fritinho na Hora",
        description: "Massa crocante sequinha recheada com muito queijo derretido puxento.",
        ingredients: ["Massa de Pastel Caseira", "Queijo Mussarela Especial"],
        image: "assets/mega_combo2.jpg",
        highlight: false
    },
    {
        id: "pastel_carne",
        category: "extras",
        name: "Pastel Frito de Carne Temperada",
        price: 10.00,
        badge: "Temperado",
        description: "Pastel frito na hora com massa folhada crocante e recheio suculento de carne moída com ervas e azeitonas.",
        ingredients: ["Massa Crocante", "Carne Moída Refogada", "Especiarias"],
        image: "assets/mega_combo3.jpg",
        highlight: false
    }
];

const ORIGINAL_FLYERS = [
    { title: "Novidades do Cardápio (Lanches & Bebidas)", path: "assets/menu_novidades_original.jpg" },
    { title: "Combos Simples & Mega Combos", path: "assets/menu_combos_original.jpg" },
    { title: "Cardápio Açaí na Garrafa", path: "assets/menu_acai_original.jpg" },
    { title: "Banner Especial Novidades com Leite", path: "assets/banner_garrafa_original.jpg" },
    { title: "Entrega em Toda Região", path: "assets/banner_entrega.jpg" }
];
