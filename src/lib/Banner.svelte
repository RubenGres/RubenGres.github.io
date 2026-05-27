<script>
    import { onMount } from 'svelte';
    import WorkCarousel from './WorkCarousel.svelte';

    const fonts = [
        { name: 'Times',       css: '"Times New Roman", Times, serif' },
        { name: 'PT Serif',    css: '"PT Serif", serif' },
        { name: 'EB Garamond', css: '"EB Garamond", serif' },
        { name: 'Crimson Pro', css: '"Crimson Pro", serif' },
        { name: 'Cardo',       css: '"Cardo", serif' },
        { name: 'Spectral',    css: '"Spectral", serif' }
    ];

    let firstIndex = 0;
    let lastIndex = 3;

    function nextIndex(current, other) {
        let n = (current + 1) % fonts.length;
        if (n === other) n = (n + 1) % fonts.length;
        return n;
    }

    onMount(() => {
        let tick = 0;
        const timer = setInterval(() => {
            if (tick % 2 === 0) {
                firstIndex = nextIndex(firstIndex, lastIndex);
            } else {
                lastIndex = nextIndex(lastIndex, firstIndex);
            }
            tick++;
        }, 1000);
        return () => clearInterval(timer);
    });
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cardo:wght@700&family=Crimson+Pro:wght@700;800&family=EB+Garamond:wght@700;800&family=PT+Serif:wght@700&family=Spectral:wght@700;800&display=swap"
    />
</svelte:head>

<section class="home_banner_area">
    <WorkCarousel />

    <div class="banner_boids">
        <iframe
            src="/fs_portfolio/index.html"
            allowtransparency="true"
            scrolling="no"
            title="boids_banner"
        >
        </iframe>
    </div>

    <div class="banner_inner">
        <div class="container">
            <div class="row justify-content-center banner_parent">
                <div class="banner_content col-12 text-center">
                    <h1 class="hero-name"><span class="gradient-name"><span class="name-part" style="font-family: {fonts[firstIndex].css};"><span class="initial">R</span>uben</span> <span class="name-part" style="font-family: {fonts[lastIndex].css};"><span class="initial">G</span>res</span></span></h1>
                    <h2 class="hero-tagline">Game Dev, Creative Technologist &amp; AI Engineer</h2>

                    <div class="intro-bio">
                        <p class="bio-text">
                            I build tools, apps, and games with artists, studios, and educational orgs.
                            <br />
                            <span class="bio-affiliations">Currently at <a href="https://misaligned.games/">Misaligned Games</a> &amp; the <a href="https://rockbttm.itch.io">RockBottom</a> collective.</span>
                        </p>
                        <div class="social_icons intro-social">
                            <a href="https://github.com/RubenGres" aria-label="GitHub profile">
                                <i class="fab fa-github" aria-hidden="true"></i>
                            </a>
                            <a href="https://ohmlet.itch.io/" aria-label="Itch.io games">
                                <i class="fas fa-gamepad" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.youtube.com/@retronyme" aria-label="YouTube channel">
                                <i class="fab fa-youtube" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.instagram.com/retronyme/" aria-label="Instagram profile">
                                <i class="fab fa-instagram" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/ruben-gres-484930158/" aria-label="LinkedIn profile">
                                <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                            </a>
                            <a href="mailto:ruben.gres@proton.me" aria-label="Send email">
                                <i class="fas fa-envelope" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div class="bio-cta">
                            <a class="cta-button" href="https://calendly.com/rubengres/30min">
                                <i class="far fa-calendar-alt" aria-hidden="true"></i>
                                <span>Book a 30&nbsp;min call</span>
                                <i class="fas fa-arrow-right cta-arrow" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .intro-bio {
        max-width: 720px;
        margin: 4vh auto 0;
        padding: 0 20px;
        text-align: center;
        font-size: 1.25rem;
        line-height: 1.6em;
        font-weight: 300;
        color: #fff;
    }

    .intro-bio p,
    .hero-name,
    .hero-tagline {
        position: relative;
        width: fit-content;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .intro-bio p {
        padding: 0.6em 1.1em;
    }

    .hero-name {
        padding: 0.1em 0.4em;
    }

    .hero-tagline {
        padding: 0.3em 0.8em;
    }

    .intro-bio p::before,
    .hero-name::before,
    .hero-tagline::before {
        content: "";
        position: absolute;
        inset: -0.2em -0.4em;
        background: rgba(0, 0, 0, 0.85);
        border-radius: 50%;
        filter: blur(22px);
        z-index: -1;
        pointer-events: none;
    }

    .hero-name::before {
        background: rgba(0, 0, 0, 0.9);
        filter: blur(26px);
    }

    .intro-bio .bio-affiliations {
        font-size: 0.95em;
        opacity: 0.85;
        margin-top: -0.2em;
    }

    .intro-bio .bio-cta {
        margin-top: 6em;
        display: flex;
        justify-content: center;
    }

    .intro-bio :global(a) {
        color: #ffe1f1;
    }

    .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 0.6em;
        padding: 0.8em 1.6em;
        font-size: 1.05rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: #111 !important;
        background: #fff;
        border-radius: 999px;
        text-decoration: none;
        box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.35),
            0 2px 6px rgba(0, 0, 0, 0.25);
        transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
        position: relative;
    }

    .cta-button::before {
        display: none;
    }

    .cta-button:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow:
            0 12px 32px rgba(0, 0, 0, 0.45),
            0 4px 10px rgba(0, 0, 0, 0.35);
        filter: brightness(0.97);
    }

    .cta-button .cta-arrow {
        transition: transform 0.25s ease;
    }

    .cta-button:hover .cta-arrow {
        transform: translateX(4px);
    }

    .intro-social {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        gap: 24px;
    }

    .intro-social :global(a) {
        display: inline-block;
        color: #fff;
        font-size: 1.5em;
        padding: 0;
        transition: color 0.3s ease 0s, transform 0.25s ease;
        text-shadow:
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            0 4px 20px rgba(0, 0, 0, 0.85);
    }

    .intro-social :global(a:hover) {
        background: linear-gradient(90deg, #456df3 0%, #e66cb8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: none;
        transform: scale(1.6) rotate(-8deg);
    }

    @media (max-width: 768px) {
        .intro-bio {
            margin-top: 20px;
            font-size: 1.15rem;
        }
    }
</style>
