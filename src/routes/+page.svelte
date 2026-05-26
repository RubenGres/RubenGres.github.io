<script>
    import Banner from '$lib/Banner.svelte';
    import Featured from '$lib/Featured.svelte';
    import Projects from '$lib/Projects.svelte';
</script>

<svelte:head>
    <title>Ruben Gres — Creative Technologist & AI Engineer | France</title>
    <meta name="description" content="Ruben Gres — Creative Technologist & AI Engineer based in France. Building tools, apps, and games with artists, studios, and educational organizations at the intersection of AI and creativity." />
    <meta name="keywords" content="creative technologist France, AI engineer France, generative AI, AI artist, AI games, creative AI, Ruben Gres" />
    <meta property="og:title" content="Ruben Gres — Creative Technologist & AI Engineer (France)" />
    <meta property="og:description" content="Creative Technologist & AI Engineer based in France. Tools, apps, and games at the intersection of AI and creativity." />
    <link rel="canonical" href="https://rubengr.es/" />
    {@html `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ruben Gres",
        "url": "https://rubengr.es/",
        "image": "https://rubengr.es/img/portfolio.jpg",
        "jobTitle": "Creative Technologist & AI Engineer",
        "description": "Creative Technologist and AI Engineer based in France, building tools, apps, and games at the intersection of AI and creativity.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
        },
        "nationality": "FR",
        "knowsAbout": [
            "Creative Technology",
            "Artificial Intelligence",
            "Generative AI",
            "Game Development",
            "Art and Technology"
        ],
        "sameAs": [
            "https://github.com/RubenGres",
            "https://www.linkedin.com/in/ruben-gres-484930158/",
            "https://ohmlet.itch.io/",
            "https://www.youtube.com/@retronyme",
            "https://www.instagram.com/retronyme/"
        ],
        "blog": {
            "@type": "Blog",
            "url": "https://rubengr.es/blog",
            "name": "Ruben Gres — Blog"
        },
        "worksFor": [
            { "@type": "Organization", "name": "Misaligned Games", "url": "https://misaligned.games/" },
            { "@type": "Organization", "name": "RockBottom", "url": "https://rockbttm.itch.io" }
        ]
    })}</script>`}
</svelte:head>

<style>
    .section-header {
        text-align: center;
        margin-top: 80px;
        margin-bottom: 20px;
    }

    .section-title {
        font-size: 2.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: #333;
        margin-bottom: 20px;
        display: inline-block;
        position: relative;
    }

    @media (max-width: 768px) {
        .section-header {
            margin-top: 50px;
            padding: 0 15px;
        }

        .section-title {
            font-size: 1.6rem;
            letter-spacing: 0.1em;
        }
    }
</style>

<Banner />

<div class="section-header">
    <h2 class="section-title">
        Featured Work
    </h2>
</div>

<Featured />

<div class="section-header">
    <h2 class="section-title">
        What I do
    </h2>
</div>

<Projects />