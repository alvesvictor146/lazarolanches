/**
 * Cardápio Oficial - Lázaro's Burger (Est. 2023)
 * Dados rigorosamente extraídos e sincronizados com as 5 imagens oficiais do cardápio:
 * 1. preco (2).jpeg -> Lanches Artesanais (100% Carne)
 * 2. preco.jpeg -> Novidades Doces (Lançamentos com Nutella, Ganache e Doce de Leite)
 * 3. WhatsApp Image 2026-10-15 at 20.52.08 (1).jpeg -> Novidades Salgadas
 * 4. WhatsApp Image 2026-10-15 at 20.52.08.jpeg -> Combos Simples & Mega Combos
 * 5. WhatsApp Image 2026-10-15 at 20.52.07.jpeg -> Lanches Tradicionais, Pastéis, Batatas e Bebidas
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
    { id: "artesanais", name: "Lanches Artesanais", icon: "🥩" },
    { id: "doces", name: "Novidades Doces", icon: "🍫" },
    { id: "novidades", name: "Novidades Salgadas", icon: "🔥" },
    { id: "combos", name: "Combos Simples", icon: "🍔" },
    { id: "mega", name: "Mega Combos", icon: "👑" },
    { id: "lanches", name: "Lanches Tradicionais", icon: "🥪" },
    { id: "pasteis", name: "Pastéis Fritos", icon: "🥟" },
    { id: "porcoes", name: "Porções de Batata", icon: "🍟" },
    { id: "bebidas", name: "Bebidas Geladas", icon: "🥤" }
];

const MENU_ITEMS = [
    // =========================================================================
    // 1. LANCHES ARTESANAIS (100% CARNE) - Folheto: preco (2).jpeg
    // =========================================================================
    {
        id: "artesanal_cheddar",
        category: "artesanais",
        name: "1. Cheddar Artesanal",
        price: 24.00,
        badge: "100% Carne",
        description: "Pão brioche dourado, 2 hambúrgueres artesanais suculentos 100% carne, cremoso molho cheddar, queijo cheddar fatiado derretido e saborosa cebola caramelizada.",
        ingredients: ["Pão Brioche", "2 Carnes Artesanais", "Molho Cheddar", "Queijo Cheddar", "Cebola Caramelizada"],
        image: "assets/cheddar_artesanal.jpg",
        highlight: true
    },
    {
        id: "artesanal_cheddar_bacon",
        category: "artesanais",
        name: "2. Cheddar Bacon",
        price: 26.00,
        badge: "Favorito do Público ⭐",
        description: "Pão brioche selado, 2 hambúrgueres 100% carne grelhados na chapa, farto molho cheddar cremoso, queijo cheddar derretido, cebola caramelizada e tiras de bacon crocante.",
        ingredients: ["Pão Brioche", "2 Carnes Artesanais", "Molho Cheddar", "Queijo Cheddar", "Cebola Caramelizada", "Bacon Crocante"],
        image: "assets/cheddar_bacon.jpg",
        highlight: true
    },
    {
        id: "artesanal_cheddar_egg",
        category: "artesanais",
        name: "3. Cheddar Egg",
        price: 26.00,
        badge: "Artesanal Clássico",
        description: "Pão brioche macio, 2 hambúrgueres 100% carne, molho cheddar artesanal, queijo cheddar derretido, cebola caramelizada dourada e ovo estalado com gema no ponto.",
        ingredients: ["Pão Brioche", "2 Carnes Artesanais", "Molho Cheddar", "Queijo Cheddar", "Cebola Caramelizada", "Ovo Frito"],
        image: "assets/cheddar_egg.jpg",
        highlight: false
    },
    {
        id: "artesanal_cheddar_egg_bacon",
        category: "artesanais",
        name: "4. Cheddar Egg Bacon",
        price: 30.00,
        badge: "Artesanal Supremo 👑",
        description: "Pão brioche tostado na manteiga, 2 hambúrgueres 100% carne, dose dupla de molho cheddar cremoso, queijo cheddar, cebola caramelizada, ovo frito e bacon artesanal fatiado.",
        ingredients: ["Pão Brioche", "2 Carnes Artesanais", "Molho Cheddar", "Queijo Cheddar", "Cebola Caramelizada", "Ovo Frito", "Bacon"],
        image: "assets/cheddar_egg_bacon.jpg",
        highlight: true
    },

    // =========================================================================
    // 2. NOVIDADES DOCES (LANÇAMENTO!) - Folheto: preco.jpeg
    // =========================================================================
    {
        id: "doce_sensacao",
        category: "doces",
        name: "X-Sensação",
        price: 18.00,
        badge: "Lançamento Doce 🍓🍫",
        description: "Pão brioche macio artesanal recheado com generosa camada de autêntica Nutella, morangos frescos fatiados e polvilhado com muito Leite Ninho.",
        ingredients: ["Pão Brioche", "Nutella", "Morangos Frescos", "Leite Ninho"],
        image: "assets/x_sensacao.jpg",
        highlight: true
    },
    {
        id: "doce_morango_eclipse",
        category: "doces",
        name: "Morango Eclipse",
        price: 18.00,
        badge: "Gourmet Especial ✨",
        description: "Pão brioche especial com deliciosa cobertura de chocolate derretido no topo, recheado com cremosa ganache branca aveludada, morangos frescos fatiados e Leite Ninho.",
        ingredients: ["Pão Brioche", "Ganache Branca", "Morangos Frescos", "Leite Ninho", "Cobertura de Chocolate"],
        image: "assets/morango_eclipse.jpg",
        highlight: true
    },
    {
        id: "doce_leite_banana",
        category: "doces",
        name: "X-Doce de Leite",
        price: 15.00,
        badge: "Sobremesa dos Deuses 🍌",
        description: "Pão brioche artesanal com farto doce de leite cremoso tradicional, rodelas selecionadas de banana fresca e cobertura suave de Leite Ninho em pó.",
        ingredients: ["Pão Brioche", "Doce de Leite Cremoso", "Banana Fresca", "Leite Ninho"],
        image: "assets/x_doce_leite.jpg",
        highlight: false
    },

    // =========================================================================
    // 3. NOVIDADES NO CARDÁPIO - Folheto: WhatsApp Image 2026-10-15 at 20.52.08 (1).jpeg
    // =========================================================================
    {
        id: "xdog",
        category: "novidades",
        name: "X Dog",
        price: 14.00,
        badge: "Sucesso de Vendas",
        description: "Pão tostado macio, salsicha suculenta, queijo derretido, presunto fatiado, batata palha crocante e molho especial exclusivo da casa.",
        ingredients: ["Pão", "Salsicha", "Queijo", "Presunto", "Batata Palha", "Molho da Casa"],
        image: "assets/burger_xdog.jpg",
        highlight: false
    },
    {
        id: "xsalame",
        category: "novidades",
        name: "X Salame",
        price: 21.00,
        badge: "Sabor Marcante",
        description: "Pão selado na chapa com fartas fatias crocantes de salame italiano, queijo derretido, alface fresca, tomate fatiado e molho artesanal.",
        ingredients: ["Pão", "Salame Italiano", "Queijo", "Alface", "Tomate", "Molho"],
        image: "assets/burger_xsalame.jpg",
        highlight: false
    },
    {
        id: "xtoscana",
        category: "novidades",
        name: "X Toscana",
        price: 18.00,
        badge: "Tradicional Defumado",
        description: "Pão macio recheado com linguiça toscana grelhada no ponto com tempero defumado autêntico, queijo derretido, alface fresca, tomate e molho especial.",
        ingredients: ["Pão", "Linguiça Toscana Grelhada", "Queijo", "Alface", "Tomate", "Molho"],
        image: "assets/burger_xtoscana.jpg",
        highlight: false
    },
    {
        id: "brutal_burgue_2",
        category: "novidades",
        name: "Brutal Burgue 2.0",
        price: 33.00,
        badge: "O Mais Brutal! 💥",
        description: "O lanche mais completo e imponente: Pão, 2 hambúrgueres artesanais, salsicha, calabresa, peito de frango desfiado, bacon crocante, ovo, linguiça toscana, presunto, queijo derretido, molho cheddar cremoso, Catupiry legítimo, queijo cheddar fatiado, batata palha e molho especial.",
        ingredients: ["2 Hambúrgueres", "Frango", "Bacon", "Calabresa", "Toscana", "Salsicha", "Ovo", "Catupiry & Cheddar", "Batata Palha"],
        image: "assets/burger_brutal.jpg",
        highlight: true
    },

    // =========================================================================
    // 4. COMBOS SIMPLES (BATATA SIMPLES + REFRI LATA) - Folheto: WhatsApp Image 2026-10-15 at 20.52.08.jpeg
    // =========================================================================
    {
        id: "combo_1",
        category: "combos",
        name: "Combo 1: X-Salada + Batata + Refri Lata",
        price: 25.00,
        badge: "Combo Clássico",
        description: "Pão selado, hambúrguer de carne 120g grelhada no ponto, queijo derretido, salada fresca de alface e tomate + Porção individual de Batata Simples sequinha + Refrigerante em lata geladíssimo.",
        ingredients: ["Pão", "Carne 120g", "Queijo", "Salada", "Batata Simples", "Refri Lata"],
        image: "assets/combo_xsalada.jpg",
        highlight: false
    },
    {
        id: "combo_2",
        category: "combos",
        name: "Combo 2: X-Bacon + Batata + Refri Lata",
        price: 28.00,
        badge: "Mais Pedido ⭐",
        description: "Pão artesanal tostado, hambúrguer de carne 120g, fatias de bacon crocante dourado, queijo derretido + Porção de Batata Simples + Refrigerante em lata bem gelado.",
        ingredients: ["Pão", "Carne 120g", "Queijo", "Bacon Especial", "Batata Simples", "Refri Lata"],
        image: "assets/combo_xbacon.jpg",
        highlight: true
    },
    {
        id: "combo_3",
        category: "combos",
        name: "Combo 3: X-Tudo + Batata + Refri Lata",
        price: 33.00,
        badge: "Combo Turbinado",
        description: "Pão macio, carne 120g, ovo estalado, calabresa defumada, bacon crocante, queijo derretido, presunto, salada fresca + Porção de Batata Simples + Refrigerante em lata.",
        ingredients: ["Carne 120g", "Ovo", "Calabresa", "Bacon", "Queijo", "Presunto", "Salada", "Batata Simples", "Refri Lata"],
        image: "assets/combo_xtudo.jpg",
        highlight: false
    },

    // =========================================================================
    // 5. MEGA COMBOS (BATATA COMPLETA & REFRI 2L) - Folheto: WhatsApp Image 2026-10-15 at 20.52.08.jpeg
    // =========================================================================
    {
        id: "mega_1",
        category: "mega",
        name: "Mega Combo 1: 2 X-Burgers + Batata Completa + Refri 2L",
        price: 52.00,
        badge: "Serve 2 Pessoas 👥",
        description: "2 Lanches caprichados (escolha entre X-Salada ou X-Bacon) + 1 Tigela generosa de Batata Completa (com Cheddar cremoso e Bacon crocante) + 1 Refrigerante de 2 Litros geladíssimo.",
        ingredients: ["2 Lanches (Salada ou Bacon)", "1 Batata Completa (Cheddar & Bacon)", "1 Refri 2 Litros"],
        image: "assets/mega_combo1.jpg",
        highlight: true
    },
    {
        id: "mega_2",
        category: "mega",
        name: "Mega Combo 2: 1 X-Burger + Pastel Queijo + Batata + Refri 2L",
        price: 47.00,
        badge: "Econômico da Família",
        description: "1 Lanche (X-Salada ou X-Bacon) + 1 Pastel frito na hora de queijo crocante + 1 Batata Simples sequinha + 1 Refrigerante de 2 Litros bem gelado.",
        ingredients: ["1 Lanche (Salada ou Bacon)", "1 Pastel de Queijo", "1 Batata Simples", "1 Refri 2 Litros"],
        image: "assets/mega_combo2.jpg",
        highlight: false
    },
    {
        id: "mega_3",
        category: "mega",
        name: "Mega Combo 3: 1 X-Burger + Pastel Carne + Batata Completa + Refri 2L",
        price: 52.00,
        badge: "Campeão de Vendas 🏆",
        description: "1 Lanche (X-Salada ou X-Bacon) + 1 Pastel frito na hora recheado com carne moída temperada + 1 Batata Completa (com Cheddar cremoso e Bacon) + 1 Refrigerante 2 Litros.",
        ingredients: ["1 Lanche (Salada ou Bacon)", "1 Pastel de Carne", "1 Batata Completa", "1 Refri 2 Litros"],
        image: "assets/mega_combo3.jpg",
        highlight: true
    },

    // =========================================================================
    // 6. LANCHES TRADICIONAIS - Folheto: WhatsApp Image 2026-10-15 at 20.52.07.jpeg
    // =========================================================================
    {
        id: "trad_x_burguer",
        category: "lanches",
        name: "X-Burguer",
        price: 10.00,
        badge: "Econômico",
        description: "Pão tradicional macio, hambúrguer grelhado, queijo derretido, presunto, alface fresca, tomate e molho especial da casa.",
        ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Alface", "Tomate", "Molho da Casa"],
        image: "assets/hero_burger.jpg",
        highlight: false
    },
    {
        id: "trad_x_salada",
        category: "lanches",
        name: "X-Salada",
        price: 12.00,
        badge: "Tradicional",
        description: "Pão de hambúrguer, hambúrguer suculento, queijo derretido, presunto, alface fresca, tomate, salada crocante e molho especial.",
        ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Alface", "Tomate", "Salada", "Molho"],
        image: "assets/combo_xsalada.jpg",
        highlight: false
    },
    {
        id: "trad_x_bacon",
        category: "lanches",
        name: "X-Bacon",
        price: 15.00,
        badge: "Bacon Crocante",
        description: "Pão, hambúrguer no ponto, fatias crocantes de bacon, queijo derretido na chapa, presunto e molho especial.",
        ingredients: ["Pão", "Hambúrguer", "Bacon", "Queijo", "Presunto", "Molho"],
        image: "assets/combo_xbacon.jpg",
        highlight: true
    },
    {
        id: "trad_x_egg",
        category: "lanches",
        name: "X-Egg",
        price: 14.00,
        badge: "Ovo Estalado",
        description: "Pão macio, ovo frito no ponto, hambúrguer de carne, queijo derretido, presunto e salada fresca de alface e tomate.",
        ingredients: ["Pão", "Ovo", "Hambúrguer", "Queijo", "Presunto", "Salada"],
        image: "assets/combo_xtudo.jpg",
        highlight: false
    },
    {
        id: "trad_x_egg_bacon",
        category: "lanches",
        name: "X-Egg Bacon",
        price: 17.00,
        badge: "Ovo & Bacon",
        description: "Pão, ovo frito saboroso, fatias de bacon crocante dourado, hambúrguer, queijo derretido e presunto.",
        ingredients: ["Pão", "Ovo", "Bacon", "Hambúrguer", "Queijo", "Presunto"],
        image: "assets/combo_xbacon.jpg",
        highlight: false
    },
    {
        id: "trad_x_calabresa",
        category: "lanches",
        name: "X-Calabresa",
        price: 14.00,
        badge: "Defumado & Cebola",
        description: "Pão selado, rodelas de linguiça calabresa defumada, queijo derretido, presunto, alface, tomate, molho da casa e cebola refogada.",
        ingredients: ["Pão", "Calabresa", "Queijo", "Presunto", "Alface", "Tomate", "Cebola", "Molho"],
        image: "assets/burger_xtoscana.jpg",
        highlight: false
    },
    {
        id: "trad_x_frango",
        category: "lanches",
        name: "X-Frango",
        price: 15.00,
        badge: "Frango com Batata Palha",
        description: "Pão, frango desfiado temperado artesanalmente, queijo derretido, presunto, alface, tomate, batata palha crocante e molho especial.",
        ingredients: ["Pão", "Frango Desfiado", "Queijo", "Presunto", "Alface", "Tomate", "Batata Palha", "Molho"],
        image: "assets/hero_burger.jpg",
        highlight: false
    },
    {
        id: "trad_x_catufrango",
        category: "lanches",
        name: "X-Catufrango",
        price: 17.00,
        badge: "Frango com Catupiry",
        description: "Pão tostado, peito de frango desfiado bem temperado, queijo muçarela derretido, autêntico Catupiry cremoso e molho especial.",
        ingredients: ["Pão", "Frango Desfiado", "Queijo", "Catupiry Legítimo", "Molho"],
        image: "assets/hero_burger.jpg",
        highlight: true
    },
    {
        id: "trad_x_tudo",
        category: "lanches",
        name: "X-Tudo",
        price: 20.00,
        badge: "Super Completo",
        description: "Pão de hambúrguer, carne saborosa, queijo derretido, presunto, ovo, bacon crocante, alface, tomate, batata palha e molho especial.",
        ingredients: ["Pão", "Carne", "Queijo", "Presunto", "Ovo", "Bacon", "Alface", "Tomate", "Batata Palha", "Molho"],
        image: "assets/combo_xtudo.jpg",
        highlight: true
    },
    {
        id: "trad_x_duplo_cheddar",
        category: "lanches",
        name: "X-Duplo Cheddar",
        price: 23.00,
        badge: "2 Burgers & Cheddar",
        description: "Pão, 2 hambúrgueres suculentos, bastante molho cheddar fundido cremoso, presunto e cebola caramelizada especial.",
        ingredients: ["Pão", "2 Hambúrgueres", "Cheddar Cremoso", "Presunto", "Cebola Caramelizada"],
        image: "assets/cheddar_artesanal.jpg",
        highlight: false
    },
    {
        id: "trad_brutal_burguer",
        category: "lanches",
        name: "Brutal Burgue (Tradicional)",
        price: 25.00,
        badge: "O Clássico Gigante",
        description: "Pão, 3 hambúrgueres generosos, calabresa, ovo, bacon crocante, queijo, presunto, alface, tomate, batata palha, Catupiry, cheddar e molho especial.",
        ingredients: ["3 Hambúrgueres", "Calabresa", "Ovo", "Bacon", "Queijo", "Presunto", "Alface", "Tomate", "Batata Palha", "Catupiry", "Cheddar", "Molho"],
        image: "assets/burger_brutal.jpg",
        highlight: true
    },

    // =========================================================================
    // 7. PASTÉIS (R$ 15,00 CADA) - Folheto: WhatsApp Image 2026-10-15 at 20.52.07.jpeg
    // =========================================================================
    {
        id: "pastel_queijo",
        category: "pasteis",
        name: "Pastel de Queijo Muçarela",
        price: 15.00,
        badge: "Fritinho na Hora 🥟",
        description: "Pastel artesanal frito na hora com massa dourada ultra crocante e sequinha, recheado com queijo muçarela puxento derretido.",
        ingredients: ["Massa Crocante Sequinha", "Queijo Muçarela"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_queijo_catupiry",
        category: "pasteis",
        name: "Pastel de Queijo & Catupiry",
        price: 15.00,
        badge: "Dose Dupla de Queijo",
        description: "Massa crocante com bolhas sequinhas, recheada com queijo muçarela derretido e Catupiry cremoso legítimo.",
        ingredients: ["Massa de Pastel", "Queijo Muçarela", "Catupiry Legítimo"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_carne",
        category: "pasteis",
        name: "Pastel de Carne Temperada",
        price: 15.00,
        badge: "Carne Moída Caseira",
        description: "Massa frita crocante recheada com carne moída de primeira, bem refogada e temperada com cebola, alho e especiarias da casa.",
        ingredients: ["Massa Crocante", "Carne Moída Temperada"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: true
    },
    {
        id: "pastel_calabresa",
        category: "pasteis",
        name: "Pastel de Calabresa",
        price: 15.00,
        badge: "Calabresa Fatiada",
        description: "Pastel sequinho e crocante recheado com deliciosas fatias finas de linguiça calabresa defumada.",
        ingredients: ["Massa Crocante", "Calabresa Fatiada"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_frango",
        category: "pasteis",
        name: "Pastel de Frango",
        price: 15.00,
        badge: "Frango Desfiado",
        description: "Massa crocante recheada generosamente com frango desfiado temperado artesanalmente no azeite com temperos naturais.",
        ingredients: ["Massa Crocante", "Frango Desfiado Temperado"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_frango_catupiry",
        category: "pasteis",
        name: "Pastel de Frango com Catupiry",
        price: 15.00,
        badge: "Favorito dos Pastéis ⭐",
        description: "A clássica e perfeita combinação: frango desfiado temperado na medida certa com farto recheio de Catupiry cremoso.",
        ingredients: ["Massa de Pastel", "Frango Desfiado", "Catupiry Legítimo"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: true
    },
    {
        id: "pastel_pizza",
        category: "pasteis",
        name: "Pastel de Pizza",
        price: 15.00,
        badge: "Sabor Pizza",
        description: "Massa crocante com recheio de presunto selecionado, queijo muçarela derretido, molho de tomate artesanal e orégano aromático.",
        ingredients: ["Massa Crocante", "Presunto", "Queijo Muçarela", "Molho de Tomate", "Orégano"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },
    {
        id: "pastel_bauru",
        category: "pasteis",
        name: "Pastel de Bauru",
        price: 15.00,
        badge: "Tradicional Bauru",
        description: "Pastel sequinho frito na hora com recheio de fatias de presunto, queijo derretido abundante e cubos suculentos de tomate fresco.",
        ingredients: ["Massa Crocante", "Presunto", "Queijo Muçarela", "Tomate Fresco"],
        image: "assets/pasteis_crocantes.jpg",
        highlight: false
    },

    // =========================================================================
    // 8. PORÇÕES DE BATATA - Folheto: WhatsApp Image 2026-10-15 at 20.52.07.jpeg
    // =========================================================================
    {
        id: "batata_simples",
        category: "porcoes",
        name: "Porção de Batata Simples",
        price: 10.00,
        badge: "Batata Crocante 🍟",
        description: "Batata frita palito dourada e crocante por fora e macia por dentro. Acompanha sachês de ketchup, mostarda e maionese especial.",
        ingredients: ["Batata Frita Crocante", "Ketchup", "Mostarda", "Maionese"],
        image: "assets/crispy_fries.jpg",
        highlight: false
    },
    {
        id: "batata_completa",
        category: "porcoes",
        name: "Porção de Batata Completa",
        price: 16.00,
        badge: "Turbinada com Bacon! 🧀🥓",
        description: "Tigela de batatas fritas super crocantes cobertas com molho cheddar cremoso fundido, Catupiry, cubinhos de bacon dourado crocante, queijo ralado, maionese, ketchup e mostarda.",
        ingredients: ["Batata Crocante", "Cheddar Cremoso", "Catupiry", "Bacon em Cubos", "Queijo Ralado", "Molhos"],
        image: "assets/crispy_fries.jpg",
        highlight: true
    },

    // =========================================================================
    // 9. BEBIDAS GELADAS - Folheto: WhatsApp Image 2026-10-15 at 20.52.07.jpeg
    // =========================================================================
    {
        id: "bebida_coca_lata",
        category: "bebidas",
        name: "Coca-Cola Lata 350ml",
        price: 6.00,
        badge: "Refrigerante Gelado 🥤",
        description: "Lata de 350ml trincando de gelada.",
        ingredients: ["Lata 350ml", "Super Gelada"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_guarana_lata",
        category: "bebidas",
        name: "Guaraná Antarctica Lata 350ml",
        price: 6.00,
        badge: "O Original do Brasil",
        description: "Lata de Guaraná Antarctica 350ml bem geladinha.",
        ingredients: ["Lata 350ml", "Super Gelada"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_fanta_lata",
        category: "bebidas",
        name: "Fanta Laranja Lata 350ml",
        price: 6.00,
        badge: "Refrescante",
        description: "Fanta Laranja lata de 350ml servida no ponto.",
        ingredients: ["Lata 350ml", "Super Gelada"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_coca_2l",
        category: "bebidas",
        name: "Coca-Cola 2 Litros",
        price: 16.00,
        badge: "Família 2L",
        description: "Garrafa de Coca-Cola 2 Litros bem gelada para acompanhar seu lanche ou combo.",
        ingredients: ["Garrafa 2 Litros", "Super Gelada"],
        image: "assets/bebidas_geladas.jpg",
        highlight: true
    },
    {
        id: "bebida_dolly_2l",
        category: "bebidas",
        name: "Dolly Guaraná 2 Litros",
        price: 10.00,
        badge: "Econômico 2L",
        description: "Garrafa de Dolly Guaraná 2 Litros gelada.",
        ingredients: ["Garrafa 2 Litros"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_sukita_2l",
        category: "bebidas",
        name: "Sukita Laranja 2 Litros",
        price: 10.00,
        badge: "Família 2L",
        description: "Garrafa de Sukita sabor Laranja 2 Litros geladíssima.",
        ingredients: ["Garrafa 2 Litros"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_heineken",
        category: "bebidas",
        name: "Cerveja Heineken Long Neck",
        price: 7.00,
        badge: "Cerveja Puro Malte 🍺",
        description: "Cerveja Heineken garrafa Long Neck trincando de gelada.",
        ingredients: ["Long Neck", "Puro Malte", "Trincando"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_original",
        category: "bebidas",
        name: "Cerveja Original",
        price: 6.00,
        badge: "Tradicional 🍺",
        description: "Cerveja Antarctica Original bem gelada.",
        ingredients: ["Cerveja Gelada", "Tradicional"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_amstel",
        category: "bebidas",
        name: "Cerveja Amstel",
        price: 9.00,
        badge: "Puro Malte 🍺",
        description: "Cerveja Amstel puro malte geladíssima.",
        ingredients: ["Cerveja Amstel", "Puro Malte", "Gelada"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_agua",
        category: "bebidas",
        name: "Água Mineral 500ml",
        price: 3.00,
        badge: "Mineral 💧",
        description: "Garrafinha de água mineral sem gás 500ml gelada.",
        ingredients: ["500ml", "Sem Gás"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    },
    {
        id: "bebida_agua_gas",
        category: "bebidas",
        name: "Água Mineral com Gás 500ml",
        price: 4.00,
        badge: "Com Gás 🫧",
        description: "Garrafinha de água mineral com gás 500ml gelada.",
        ingredients: ["500ml", "Com Gás"],
        image: "assets/bebidas_geladas.jpg",
        highlight: false
    }
];

const ORIGINAL_FLYERS = [
    { title: "Lanches Artesanais 100% Carne", path: "assets/flyer_artesanais.jpeg" },
    { title: "Novidades Doces (Nutella & Morango)", path: "assets/flyer_doces.jpeg" },
    { title: "Novidades Salgadas (X Dog, Salame, Toscana, Brutal 2.0)", path: "assets/flyer_novidades.jpeg" },
    { title: "Combos Simples & Mega Combos", path: "assets/flyer_combos.jpeg" },
    { title: "Cardápio Geral (Lanches, Pastéis, Batata e Bebidas)", path: "assets/flyer_cardapio_principal.jpeg" }
];
