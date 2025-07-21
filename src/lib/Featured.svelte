<script>
    let featuredProjects = [
        {
            title: "BITZ",
            link: "/work/bitz",
            image: "img/bitz/bitz_logo.jpg",
            description: "A digital tool for identifying and learning about the organisms around you. S+T+ARTS EU residency.",
            year: 2025,
            category: "Art & Tech"
        },
        {
            title: "GouvX",
            link: "work/gouvx",
            image: "img/gouvx/gouvx_logo.jpg",
            description: "A chatbot using retrieval augmented generation to help you navigate French law.",
            year: 2023,
            category: "AI & Law"
        },
        {
            title: "Seg2Sat",
            link: "work/drawing2map",
            image: "img/seg2sat.jpg",
            description: "Create aerial view images in any style you want. Project made with IGN FLAIR1 dataset, StableDiffusion, and ControlNet.",
            year: 2023,
            category: "Computer Vision"
        }
    ];
</script>

<section class="featured-section">
    <div class="container" style="max-width: 1200px;">
        <div class="featured-grid">
            {#each featuredProjects as project, index}
                <div class="featured-card" style="--rotation: -2deg;">
                    <a href={project.link} class="card-link">
                        <div class="image-container">
                            <img src={project.image} alt={project.title} class="project-image">
                        </div>
                        
                        <div class="card-content">
                            <div class="project-header">
                                <h3 class="project-title">{project.title}</h3>
                            </div>
                            
                            <p class="project-description">{project.description}</p>
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .featured-section {
        padding: 10px 20px;
        position: relative;
    }

    .featured-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }

    .container {
        position: relative;
        z-index: 1;
    }

    .featured-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 40px;
        justify-items: center;
    }

    .featured-card {
        width: 100%;
        max-width: 380px;
        transition: transform 0.3s ease;
    }

    .featured-card:hover {
        transform: translateY(-10px);
    }

    .card-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }

    .image-container {
        position: relative;
        overflow: hidden;
        border-radius: 15px;
        margin-bottom: 20px;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform-origin: center;
    }

    .featured-card:hover .image-container {
        transform: rotate(var(--rotation)) scale(1.05);
    }

    .project-image {
        width: 100%;
        height: 280px;
        object-fit: cover;
        transition: box-shadow 0.3s ease;
    }

    .featured-card:hover .project-image {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    .card-content {
        padding: 0 10px;
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 12px;
    }

    .project-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #333;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .project-year {
        font-weight: 600;
        color: #456df3;
        font-size: 0.9rem;
    }

    .project-category {
        font-size: 0.9rem;
        color: #666;
        font-weight: 500;
        margin-bottom: 15px;
    }

    .project-description {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #666;
        margin-bottom: 0;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .featured-grid {
            grid-template-columns: 1fr;
            gap: 30px;
        }

        .featured-card {
            max-width: 100%;
        }

        .project-title {
            font-size: 1.5rem;
        }

        .featured-section {
            padding: 0 20px;
        }
    }
</style>