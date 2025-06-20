<!-- File: src/routes/work/[slug]/+page.svelte -->
<script>
    export let data;
    const { project } = data;
    
    let fullscreenImage = null;
    let fullscreenAlt = '';
    let currentImageIndex = 0;
    let allImages = [];
    
    // Build array of all images with their metadata
    $: {
        allImages = [];
        
        // Add main project images
        project.images?.forEach((image, i) => {
            allImages.push({
                src: `/${image}`,
                alt: `${project.title} - Image ${i + 1}`,
                type: 'main'
            });
        });
        
        // Add content block images
        project.content?.forEach((block) => {
            if (block.imgs) {
                block.imgs.forEach((image, i) => {
                    allImages.push({
                        src: `/${image}`,
                        alt: `${block.title} - Image ${i + 1}`,
                        type: 'content'
                    });
                });
            }
        });
    }
    
    function openFullscreen(imageSrc, altText) {
        const index = allImages.findIndex(img => img.src === imageSrc);
        currentImageIndex = index !== -1 ? index : 0;
        fullscreenImage = allImages[currentImageIndex].src;
        fullscreenAlt = allImages[currentImageIndex].alt;
        document.body.style.overflow = 'hidden';
    }
    
    function closeFullscreen() {
        fullscreenImage = null;
        fullscreenAlt = '';
        currentImageIndex = 0;
        document.body.style.overflow = '';
    }
    
    function nextImage() {
        if (allImages.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % allImages.length;
            fullscreenImage = allImages[currentImageIndex].src;
            fullscreenAlt = allImages[currentImageIndex].alt;
        }
    }
    
    function prevImage() {
        if (allImages.length > 1) {
            currentImageIndex = currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1;
            fullscreenImage = allImages[currentImageIndex].src;
            fullscreenAlt = allImages[currentImageIndex].alt;
        }
    }
    
    function handleKeydown(event) {
        if (!fullscreenImage) return;
        
        switch(event.key) {
            case 'Escape':
                closeFullscreen();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextImage();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                prevImage();
                break;
        }
    }
</script>

<svelte:head>
    <title>{project.title} - Ruben Gres</title>
    <meta name="description" content={project.description} />
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="container">
    <a href="/" class="back-link">← Back to projects</a>

    <div class="project-content">        
        <h1 class="project-title">{project.title}</h1>
        <p class="project-subtitle">{project.subtitle}</p>

        <div class="project-images">
            <div class="image-grid" class:single={project.images.length === 1}>
                {#each project.images as image, i}
                    <img 
                        src="/{image}" 
                        alt="{project.title} - Image {i + 1}"
                        on:click={() => openFullscreen(`/${image}`, `${project.title} - Image ${i + 1}`)}
                        class="clickable-image"
                    />
                {/each}
            </div>
        </div>

        <div class="project-description">
            <p>{project.description}</p>
        </div>

        {#each project.content as block}
            <section class="content-block">
                <h2>{block.title}</h2>
                <p>{block.text}</p>
                
                {#if block.imgs}
                    <div class="content-images">
                        <div class="image-grid" class:single={block.imgs.length === 1}>
                            {#each block.imgs as image, i}
                                <img 
                                    src="/{image}" 
                                    alt="{block.title} - Image {i + 1}"
                                    on:click={() => openFullscreen(`/${image}`, `${block.title} - Image ${i + 1}`)}
                                    class="clickable-image"
                                />
                            {/each}
                        </div>
                    </div>
                {/if}
            </section>
        {/each}

        <div class="project-links">
            {#each project.links as link}
                <a href={link.url} target="_blank" rel="noopener noreferrer" class="project-link">
                    {link.title} →
                </a>
            {/each}
        </div>
    </div>
</div>

<!-- Fullscreen Modal -->
{#if fullscreenImage}
    <div class="fullscreen-overlay" on:click={closeFullscreen} role="button" tabindex="0">
        <div class="fullscreen-content" on:click|stopPropagation>
            <button class="close-button" on:click={closeFullscreen} aria-label="Close fullscreen">
                ×
            </button>
            
            <!-- Navigation arrows (only show if more than 1 image) -->
            {#if allImages.length > 1}
                <button class="nav-arrow nav-arrow-left" on:click={prevImage} aria-label="Previous image">
                    &#8249;
                </button>
                <button class="nav-arrow nav-arrow-right" on:click={nextImage} aria-label="Next image">
                    &#8250;
                </button>
                
                <!-- Image counter -->
                <div class="image-counter">
                    {currentImageIndex + 1} / {allImages.length}
                </div>
            {/if}
            
            <img src={fullscreenImage} alt={fullscreenAlt} class="fullscreen-image" />
        </div>
    </div>
{/if}

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    .back-link {
        color: #666;
        text-decoration: none;
        margin-bottom: 30px;
        display: inline-block;
    }

    .project-content {
        background: white;
        border-radius: 8px;
        padding: 40px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .project-meta {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
        font-size: 14px;
    }

    .category {
        background: #f0f0f0;
        padding: 4px 12px;
        border-radius: 4px;
        color: #666;
    }

    .year {
        color: #888;
    }

    .project-title {
        font-size: 32px;
        margin-bottom: 10px;
        color: #333;
    }

    .project-subtitle {
        font-size: 18px;
        color: #666;
        margin-bottom: 30px;
    }

    .project-images {
        margin: 30px 0;
    }

    /* Unified grid system for all images */
    .image-grid {
        display: grid !important;
        gap: 15px !important;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
    }

    @media (min-width: 500px) {
        .image-grid:not(.single) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 768px) {
        .image-grid:not(.single) {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
    }

    .image-grid.single {
        grid-template-columns: 1fr;
        max-width: 600px;
        margin: 0 auto;
    }

    .image-grid img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 4px;
    }

    .clickable-image {
        cursor: pointer;
        transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .clickable-image:hover {
        transform: scale(1.02);
        opacity: 0.9;
    }

    .image-grid.single img {
        height: auto;
    }

    .content-images {
        margin: 20px 0;
    }

    .project-description {
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }

    .project-description p {
        font-size: 16px;
        line-height: 1.6;
        color: #555;
    }

    .content-block {
        margin-bottom: 30px;
    }

    .content-block h2 {
        font-size: 20px;
        margin-bottom: 10px;
        color: #333;
        text-align: left;
    }

    .content-block p {
        font-size: 16px;
        line-height: 1.6;
        color: #555;
    }

    .project-links {
        display: flex;
        gap: 15px;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee;
    }

    .project-link {
        padding: 10px 20px;
        background:rgb(0, 0, 0);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
    }

    .project-link:hover {
        background:rgb(8, 0, 37);
    }

    /* Fullscreen Modal Styles */
    .fullscreen-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
    }

    .fullscreen-content {
        position: relative;
        max-width: 95vw;
        max-height: 95vh;
        cursor: default;
    }

    .fullscreen-image {
        max-width: 100%;
        max-height: 95vh;
        object-fit: contain;
        border-radius: 4px;
    }

    .close-button {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        z-index: 1001;
    }

    .close-button:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    /* Navigation arrows */
    .nav-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.0);
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        padding: 15px 20px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        z-index: 1001;
    }

    .nav-arrow:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .nav-arrow-left {
        left: 20px;
    }

    .nav-arrow-right {
        right: 20px;
    }

    /* Image counter */
    .image-counter {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        background: rgba(0, 0, 0, 0.5);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        backdrop-filter: blur(10px);
    }

    @media (max-width: 768px) {
        .container {
            padding: 20px 15px;
        }

        .project-content {
            padding: 25px;
        }

        .project-title {
            font-size: 24px;
        }

        .project-links {
            flex-direction: column;
        }

        .close-button {
            top: -35px;
            font-size: 25px;
        }

        .nav-arrow {
            font-size: 30px;
            padding: 10px 15px;
        }

        .nav-arrow-left {
            left: 10px;
        }

        .nav-arrow-right {
            right: 10px;
        }

        .image-counter {
            bottom: -35px;
            font-size: 12px;
            padding: 6px 12px;
        }
    }
</style>