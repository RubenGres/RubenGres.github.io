<script>
    const archived = [
        {
            title: "Bad Apple Animation",
            link: "https://www.youtube.com/watch?v=LD4D09EVcDY&t=112s",
            image: "img/badapple.jpg",
            description: "A Blender animation of the opening of Bad Apple rendered on an Etch-A-Sketch. Over 333k views on YouTube.",
            year: 2020
        },
        {
            title: "Dad knows (siege) best",
            link: "https://www.youtube.com/watch?v=ofAcTvuybvY",
            image: "img/siege.jpg",
            description: "Lead an army of LLM soldier agents from the grave. Built during Mistral x HF Hackaton 2025.",
            year: 2025
        },
        {
            title: "Pug Heist",
            link: "https://ohmlet.itch.io/pug-heists",
            image: "img/pug.jpg",
            description: "A strange little puzzle game made for GMTK 2022. Solve every level and escape to safety.",
            year: 2022
        },
        {
            title: "VR Handglider",
            link: "https://github.com/RubenGres/VRHanglider",
            image: "img/planeur.jpg",
            description: "Procedural world generator and flight simulator in VR using Unity. The plane is controlled via a microcontroller.",
            year: 2020
        },
        {
            title: "Flocking Sandbox",
            link: "https://github.com/RubenGres/FlockingSandbox",
            image: "img/boidsjs.jpg",
            description: "Boids algorithm in p5.js. You can spawn a fish or a shark; the sharks will try to eat the fishes as they try to escape.",
            year: 2020
        },
        {
            title: "Out Of Control(s)",
            link: "https://ohmlet.itch.io/out-of-controls",
            image: "img/outofcontrols.jpg",
            description: "You have a limited number of key presses before you run out of controls. Made for GMTK 2020 Game Jam.",
            year: 2020
        },
        {
            title: "Blastoff",
            link: "https://github.com/RubenGres/Blastoff",
            image: "img/blastoff.jpg",
            description: "Procedural mining game in Java. Custom game engine, perlin noise, and cellular automatas for terrain generation.",
            year: 2018
        }
    ];
</script>

<svelte:head>
    <title>Archive — Ruben Gres</title>
    <meta name="description" content="Older projects, experiments and one-off ideas by Ruben Gres." />
    <meta property="og:title" content="Archive — Ruben Gres" />
    <link rel="canonical" href="https://rubengr.es/archive" />
</svelte:head>

<div class="archive-wrap">
    <header class="archive-header">
        <a href="/" class="back-link">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Back home
        </a>
        <h1>Archive</h1>
        <p>Older experiments, jam games and one-off ideas that didn't quite earn a spot on the main page but I still want to keep around.</p>
    </header>

    <div class="projects-grid">
        {#each archived as project, index}
            <div class="project-card" class:tilt-left={index % 2 === 0} class:tilt-right={index % 2 !== 0} style="animation-delay: {index * 0.08}s;">
                <a
                    href={project.link}
                    class="project-card-link"
                    target={project.link.startsWith('http') ? '_blank' : null}
                    rel={project.link.startsWith('http') ? 'noopener noreferrer' : null}
                >
                    <div class="project-card-img-wrap">
                        <img src={project.image} alt={project.title} class="project-card-img" loading="lazy">
                    </div>
                    <div class="project-card-body">
                        <h4 class="project-card-title">
                            {project.title}
                            <small class="project-card-year">({project.year})</small>
                        </h4>
                        <p class="project-card-desc">{project.description}</p>
                    </div>
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
    .archive-wrap {
        max-width: 1000px;
        margin: 0 auto;
        padding: 3rem 13px 4rem;
    }

    .archive-header {
        margin-bottom: 2.5rem;
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #a8a8b8;
        text-decoration: none;
        margin-bottom: 1.25rem;
        transition: color 0.2s ease;
    }

    .back-link:hover {
        color: #efb6df;
    }

    .archive-header h1 {
        font-size: 2.5rem;
        font-weight: 800;
        color: #e8e8f0;
        margin: 0 0 0.75rem;
        letter-spacing: -0.01em;
    }

    .archive-header p {
        color: #a8a8b8;
        font-size: 1rem;
        line-height: 1.5;
        max-width: 640px;
        margin: 0;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
    }

    @media (max-width: 768px) {
        .projects-grid {
            grid-template-columns: 1fr;
        }
    }

    .project-card {
        opacity: 0;
        transform: scale(0.3) rotate(10deg);
        animation: projectPoof 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .project-card-link {
        display: block;
        text-decoration: none;
        color: inherit;
        background: #14141f;
        border: 1px solid #2a2a3a;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        overflow: hidden;
        height: 100%;
        transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease;
    }

    .tilt-left .project-card-link:hover {
        box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        border-color: #efb6df;
        transform: translateY(-5px) rotate(-1.5deg);
    }

    .tilt-right .project-card-link:hover {
        box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        border-color: #efb6df;
        transform: translateY(-5px) rotate(1.5deg);
    }

    .project-card-img-wrap {
        overflow: hidden;
        aspect-ratio: 1;
    }

    .project-card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .project-card-link:hover .project-card-img {
        transform: scale(1.06);
    }

    .project-card-body {
        padding: 1rem;
    }

    .project-card-title {
        text-transform: uppercase;
        color: #e8e8f0;
        margin-bottom: 5px;
        font-size: 1rem;
    }

    .project-card-year {
        font-weight: 400;
        color: #a8a8b8;
    }

    .project-card-desc {
        color: #a8a8b8;
        line-height: 1.3em;
        font-size: 0.95rem;
        margin: 0;
    }

    @keyframes projectPoof {
        0% { opacity: 0; transform: scale(0.3) rotate(5deg); }
        50% { opacity: 0.8; transform: scale(1.05) rotate(-2deg); }
        70% { opacity: 1; transform: scale(0.95) rotate(1deg); }
        100% { opacity: 1; transform: scale(1) rotate(0deg); }
    }
</style>
