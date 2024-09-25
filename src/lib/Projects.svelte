<script>
    import ScrollEffect from './ScrollEffect.svelte';

    let genAIProjects = [
        {
            title: "WTFood",
            link: "https://www.cunicode.com/works/food-dysmorphia",
            image: "img/wtfood.png",
            description: "[2024] Using AI to uncover the glitches of the food system. Made with cunicode for S+T+ARTS EU"
        },
        {
            title: "GouvX",
            link: "https://www.gouvx.fr/",
            image: "img/gouvx.jpg",
            description: "[2023] A chatbot using retrieval augmented generation to help you navigate French law"
        },
        {
            title: "Drawing2Map",
            link: "https://rubengr.es/Seg2Sat/",
            image: "img/drawing2map.jpg",
            description: "[2023] Web interface for Seg2Sat to generate a map from a drawing"
        },
        {
            title: "Seg2Sat",
            link: "https://github.com/RubenGres/Seg2Sat",
            image: "img/seg2sat.jpg",
            description: "[2023] Create aerial view images in any style you want. Project made with IGN FLAIR1 dataset, StableDiffusion, and ControlNet"
        },
        {
            title: "ControlMeme",
            link: "https://meme.koll.ai",
            image: "img/controlmeme.jpg",
            description: "[2023] Generate variations of popular memes using StableDiffusion and ControlNet. Share your creations in the gallery!"
        },
        {
            title: "Infinite Canvas",
            link: "https://canvas.koll.ai",
            image: "img/canvas.jpg",
            description: "[2022] Start creating with others using AI image generation in this shared infinite canvas"
        },
        {
            title: "This SCP does not exist",
            link: "https://www.thisscpdoesnotexist.com/",
            image: "img/tsdne.jpg",
            description: "[2021] Generate custom SCP from a simple prompt using GPT4."
        }
    ];

    let gameProjects = [
        {
            title: "Zoomies: Fast or fired",
            link: "https://ohmlet.itch.io/zoomies",
            image: "https://img.itch.zone/aW1nLzE3NDQ4OTYxLmpwZw==/315x250%23c/p%2BHryy.jpg",
            description: "[2024] Play as an exploited employee in corporate hell. GMTK 2024 GameJam"
        },
        {
            title: "noperope.io [WIP]",
            link: "https://github.com/RubenGres/noperope.io",
            image: "img/snake.jpg",
            description: "[2024] .io multiplayer snake with procedural animation and simple AI"
        },
        {
            title: "SnipIt",
            link: "https://ohmlet.itch.io/snip-it",
            image: "img/snipit.jpg",
            description: "[2023] First place in the 2023 Hugging Face Game JAM. Snip away and explore famous paintings in a whole new dimension."
        },
        {
            title: "Pug Heist",
            link: "https://ohmlet.itch.io/pug-heists",
            image: "img/pug.jpg",
            description: "[2022] A strange little puzzle game made for GTMK 2022. Solve every level and escape to safety!"
        },
        {
            title: "Unwanted Roommate",
            link: "https://ohmlet.itch.io/unwanted-roommate",
            image: "img/unwantedroommate.jpg",
            description: "[2021] Deal with your inescapable anxiety, your unwanted roommate. Made for GMTK 2021 Game Jam"
        },
        {
            title: "VR Handglider",
            link: "https://github.com/RubenGres/VRHanglider",
            image: "img/planeur.jpg",
            description: "[2020] Procedural world generator and flight simulator in VR using Unity. The plane is controlled via a microcontroller"
        },
        {
            title: "Out Of Control(s)",
            link: "https://ohmlet.itch.io/out-of-controls",
            image: "img/outofcontrols.jpg",
            description: "[2020] You have a limited number of key presses before you run out of controls. Made for GMTK 2020 Game Jam"
        },
        {
            title: "Blastoff",
            link: "https://github.com/RubenGres/Blastoff",
            image: "img/blastoff.jpg",
            description: "[2018] Procedural mining game in Java. Custom game engine, perlin noise, and cellular automatas for terrain generation"
        }
    ];

    let otherProjects = [
        {
            title: "This website",
            link: "/",
            image: "img/portfolio.jpg",
            description: "Wow so meta. Statically built with SvelteKit and Bootstrap. No template cause I'm a special boy"
        },
        {
            title: "TVShow Ratings",
            link: "https://rubengres.github.io/TvShowRatings/index.html",
            image: "img/tvshowratings.jpg",
            description: "[2020] View TV show IMDB ratings in a simple, comprehensive way. Built using Angular, jQuery, and OMDB API for data"
        },
        {
            title: "Bad Apple Animation",
            link: "https://www.youtube.com/watch?v=LD4D09EVcDY&t=112s",
            image: "img/badapple.jpg",
            description: "[2020] A Blender 3D animation of Bad Apple on an Etch-A-Sketch. Currently more than 333k views!"
        },
        {
            title: "Flocking Sandbox",
            link: "https://github.com/RubenGres/FlockingSandbox",
            image: "img/boidsjs.jpg",
            description: "[2020] Boids algorithm in p5.js. You can spawn a fish or a shark; the sharks will try to eat the fishes as they try to escape"
        }
    ];

    let projectCategories = [
        {
            title: "GenAI apps I've built",
            description: `
                <p> I'm often tinkering with AI to create new and useful use cases for a broad audience.
                <br> I've also co-created <a href="https://latentminds.com">LatentMinds</a>, an art collective where we build online apps to explore the frontier of generative AI.</p>
            `,
            projects : genAIProjects
        },
        {
            title: "Games I've worked on",
            description:`
                <p>Once or twice a year I bring a few friends together to make small games for <a href="https://ohmlet.itch.io">Ohmlet studio</a>.</p>
            `,
            projects : gameProjects
        },
        {
            title: "The other stuff",
            description:`
                <p>Older projects and things I've made along the way<p>
            `,
            projects : otherProjects
        },
    ]
</script>


<ScrollEffect>

    {#each projectCategories as category}
        <section class="services_area" id="projects">
            <div class="container">

                <div class="row">
                    <div class="col-lg-12">
                        <div class="main_title">
                            <p class="top_text">{category.title}<span></span></p>
                            <div class="description">
                                {@html category.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        {#each category.projects as project}
                            <div class="col-lg-3 col-sm-4 col-6 module">
                                <a href={project.link}>
                                    <div class="other_project">
                                        <img src={project.image} alt={project.title} class="img-fluid">
                                        <div class="op_label">
                                            <h3>{project.title}</h3>
                                            <p>
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </section>
    {/each}
</ScrollEffect>
