<script>
    import WorkCarousel from './WorkCarousel.svelte';
</script>

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
                    <h1 class="hero-name"><span class="gradient-name"><span class="initial">R</span>uben <span class="initial">G</span>res</span></h1>
                    <h2 class="hero-tagline">Game Dev, Creative Technologist and AI Engineer</h2>

                    <div class="intro-bio">
                        <p class="bio-text">
                            I build tools, apps, and games; often with artists, studios, and educational orgs.
                        </p>
                        <p class="bio-text">
                            Making cool things within <a href="https://misaligned.games/">Misaligned Games</a>, and the <a href="https://rockbttm.itch.io">RockBottom</a> collective.
                        </p>
                        <p class="bio-cta">
                            <a href="https://calendly.com/rubengres/30min">Book a 30mn call</a>
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
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        border-radius: 50%;
        filter: blur(28px);
        z-index: -1;
        pointer-events: none;
    }

    .intro-bio .bio-cta {
        margin-top: 1em;
    }

    .intro-bio :global(a) {
        color: #ffe1f1;
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
