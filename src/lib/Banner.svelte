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
                    <h1 class="hero-name"><span class="gradient-name"><span class="name-part" style="font-family: {fonts[firstIndex].css};">Ruben</span>&nbsp;<span class="name-part" style="font-family: {fonts[lastIndex].css};">Gres</span></span></h1>
                    <h2 class="hero-tagline">Game Dev, Creative Technologist &amp; AI Engineer</h2>

                    <div class="intro-bio">
                        <p class="bio-text">
                            I build tools, apps, and games with artists, studios, and educational orgs.
                            <br />
                            <span class="bio-affiliations">Currently at <a href="https://misaligned.games/">Misaligned Games</a> &amp; the <a href="https://rockbttm.itch.io">RockBottom</a> collective.</span>
                        </p>
                        <div class="social_icons intro-social">
                            <a href="https://github.com/RubenGres" aria-label="GitHub profile">
                                <svg viewBox="0 0 496 512" aria-hidden="true"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                            </a>
                            <a href="https://ohmlet.itch.io/" aria-label="Itch.io games">
                                <svg viewBox="0 0 640 512" aria-hidden="true"><path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z"/></svg>
                            </a>
                            <!--
                            <a href="https://www.youtube.com/@retronyme" aria-label="YouTube channel">
                                <svg viewBox="0 0 576 512" aria-hidden="true"><path d="M549.7 124.1c-6.281-23.65-24.79-42.28-48.28-48.6C458.8 64 288 64 288 64S117.2 64 74.63 75.49c-23.5 6.322-42 24.95-48.28 48.6-11.41 42.87-11.41 132.3-11.41 132.3s0 89.44 11.41 132.3c6.281 23.65 24.79 41.5 48.28 47.82C117.2 448 288 448 288 448s170.8 0 213.4-11.49c23.5-6.321 42-24.17 48.28-47.82 11.41-42.87 11.41-132.3 11.41-132.3s0-89.44-11.41-132.3zm-317.5 213.5V175.2l142.7 81.21-142.7 81.2z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/retronyme/" aria-label="Instagram profile">
                                <svg viewBox="0 0 448 512" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                            </a>
                            -->
                            <a href="https://www.linkedin.com/in/ruben-gres-484930158/" aria-label="LinkedIn profile">
                                <svg viewBox="0 0 448 512" aria-hidden="true"><path d="M100.3 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.6 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>
                            </a>
                            <a href="mailto:ruben.gres@proton.me" aria-label="Send email">
                                <svg viewBox="0 0 512 512" aria-hidden="true"><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z"/></svg>
                            </a>
                        </div>
                        <div class="bio-cta">
                            <a class="cta-button" href="https://calendly.com/rubengres/30min">
                                <svg class="cta-icon" viewBox="0 0 448 512" aria-hidden="true"><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z"/></svg>
                                <span>Book a 30&nbsp;min call</span>
                                <svg class="cta-icon cta-arrow" viewBox="0 0 448 512" aria-hidden="true"><path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"/></svg>
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

    .cta-button :global(.cta-icon) {
        width: 1em;
        height: 1em;
        fill: currentColor;
        flex-shrink: 0;
    }

    .cta-button :global(.cta-arrow) {
        transition: transform 0.25s ease;
    }

    .cta-button:hover :global(.cta-arrow) {
        transform: translateX(4px);
    }

    .intro-social {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        gap: 24px;
    }

    .intro-social :global(a) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 1.5em;
        padding: 0;
        padding-right: 0;
        transition: color 0.3s ease 0s, transform 0.25s ease;
    }

    .intro-social :global(a svg) {
        width: 1.5em;
        height: 1.5em;
        fill: currentColor;
        filter:
            drop-shadow(1px 0 0 #000)
            drop-shadow(-1px 0 0 #000)
            drop-shadow(0 1px 0 #000)
            drop-shadow(0 -1px 0 #000)
            drop-shadow(0 4px 12px rgba(0, 0, 0, 0.85));
        transition: filter 0.3s ease;
    }

    .intro-social :global(a:hover) {
        color: #e66cb8;
        transform: scale(1.6) rotate(-8deg);
    }

    .intro-social :global(a:hover svg) {
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6));
    }

    @media (max-width: 768px) {
        .intro-bio {
            margin-top: 20px;
            font-size: 1.15rem;
        }
    }
</style>
