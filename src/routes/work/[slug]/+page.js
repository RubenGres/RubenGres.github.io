// File: src/routes/work/[slug]/+page.js
export async function load({ params }) {
    const { slug } = params;

    // All your projects data (moved from your main component)
    const allProjects = {
        // GenAI Projects
        "bitz": {
            "title": "BITZ - Biodiversity In Transition Zones",
            "subtitle": "A digital tool for identifying and learning about the organisms around you",
            "description": "Built during my S+T+ARTS + MUSAE residency as a part of Nicetrails. BITZ bridges the gap between digital technology and environmental awareness. Created in collaboration with Genomic Gastronomy, this tool transforms biodiversity observation into engaging community experiences.",
            "images": ["img/bitz/interface_0.jpg", "img/bitz/interface_2.jpg", "img/bitz/interface_1.jpg"],
            "content": [
                {
                    "title": "Project Overview",
                    "text": "BITZ is a digital tool that enables users to photograph plants, insects, or animals and receive guided species identification along with cultural and ecological connections. The platform serves as both an educational resource for individuals and a data-gathering tool for organizations, governments, and activists facilitating community-driven biodiversity events. The base tool is freely available, while bespoke projects are offered as commercial services to support conservation efforts and public engagement.",
                    "imgs": []
                },
                {
                    "title": "Eyes on the Field: Porto",
                    "text": "Our flagship event combined farm visits with immersive dining experiences to explore agricultural biodiversity in the Porto region. Participants embarked on species-quests using BITZ to observe, identify, and understand the ecological networks supporting local food production. The discoveries made during these field investigations directly inspired a multi-course, multi-sensory dinner at Venn Canteen, creating a unique connection between biodiversity observation and culinary experience.",
                    "imgs": ["img/bitz/workshop_1.jpg", "img/bitz/workshop_2.jpg", "img/bitz/workshop_3.jpg", "img/bitz/workshop_4.jpg", "img/bitz/workshop_5.jpg", "img/bitz/workshop_6.jpg"]
                },
                {
                    "title": "From Field to Table",
                    "text": "The dinner experience transformed field observations into a celebration of local biodiversity. Each course was designed to showcase the ecological connections discovered during the farm visit, creating a direct link between environmental awareness and sensory experience. This approach demonstrates how technology can facilitate deeper connections with our food systems and the organisms that sustain them.",
                    "imgs": ["img/bitz/dinner_1.jpg", "img/bitz/dinner_2.jpg", "img/bitz/dinner_3.jpg"]
                },
                {
                    "title": "Technical Implementation",
                    "text": "The application uses generative AI to help users identify organisms in their environment, while providing educational content about local ecosystems in different tones. The image classification leans on image capabilities of LLM to have a robust non specific recognition tool. BITZ also suggests place-specific instructions finding new organisms.",
                    "imgs": []
                },
                {
                    "title": "Impact & Applications",
                    "text": "BITZ serves multiple audiences: individual nature enthusiasts seeking to learn about their environment, educators conducting field studies, and organizations running biodiversity storytelling campaigns. The tool generates public datasets while fostering community engagement with local ecosystems. By making biodiversity observation accessible and engaging, BITZ contributes to building a more environmentally aware society.",
                    "imgs": []
                }
            ],
            "links": [
                { "title": "Open the app", "url": "https://bitz.tools" },
                { "title": "Video presentation", "url": "https://www.youtube.com/watch?v=c64kkIIpARY" },
                { "title": "CGG Article", "url": "https://genomicgastronomy.com/work/2025-2/bitz/" },
                { "title": "Code", "url": "https://github.com/RubenGres/BITZ" }
            ]
        },

        "eyes-on-the-field": {
            "title": "Eyes on the Field: Porto",
            "subtitle": "A farm visit and biodiversity dinner event in the Porto region",
            "description": "A participatory event combining species-quests and immersive dining to explore agricultural biodiversity around Porto. Participants used the BITZ digital tool to observe and identify organisms in the field, with findings transformed into a multi-sensory dinner experience at Venn Canteen. Part of the EU S+T+ARTS MUSAE project.",
            "images": ["img/eyes-on-the-field/field_1.jpg", "img/eyes-on-the-field/field_2.jpg", "img/eyes-on-the-field/field_3.jpg"],
            "content": [
                {
                    "title": "Event Overview",
                    "text": "Eyes on the Field: Porto brought together farmers, artists, scientists, and curious eaters for a day of biodiversity observation and collective discovery. The event was structured around the idea that paying attention to the organisms sharing our agricultural landscapes can fundamentally change how we relate to what we eat. Participants moved through working farms in the Porto region, guided by species-quest prompts designed to surface the hidden ecological richness of transition zones between cultivated and wild land.",
                    "imgs": []
                },
                {
                    "title": "Species Quests in the Field",
                    "text": "Using the BITZ digital tool, participants photographed plants, insects, fungi, and animals encountered during the farm visit. Each photo triggered species identification and opened connections to the cultural and ecological roles of that organism in the local food system. The quests were designed not just to identify species but to prompt reflection on how biodiversity supports soil health, pollination, pest control, and flavor. The collective observations built a shared live dataset of agricultural biodiversity in the Porto region.",
                    "imgs": ["img/eyes-on-the-field/field_4.jpg", "img/eyes-on-the-field/field_5.jpg", "img/eyes-on-the-field/field_6.jpg", "img/eyes-on-the-field/field_7.jpg"]
                },
                {
                    "title": "From Field to Table",
                    "text": "The day culminated in a multi-course dinner at Venn Canteen with chef Barney Pau, where the discoveries from the field directly shaped the menu. Each dish was built around organisms identified during the species-quests, creating a sensory bridge between environmental observation and culinary experience. Formiga Gloriosa brought their foraging and fermentation expertise to the table, grounding the dinner in the living landscape the group had spent the day exploring.",
                    "imgs": ["img/eyes-on-the-field/dinner_1.jpg", "img/eyes-on-the-field/dinner_2.jpg", "img/eyes-on-the-field/dinner_3.jpg", "img/eyes-on-the-field/dinner_4.jpg", "img/eyes-on-the-field/dinner_5.jpg", "img/eyes-on-the-field/dinner_6.jpg"]
                },
                {
                    "title": "Data & Community",
                    "text": "Beyond the event itself, the BITZ observations contributed to a growing public dataset of biodiversity in agricultural transition zones. This kind of community-generated data supports researchers, conservationists, and farmers in understanding which organisms are present, absent, or under pressure in working landscapes. Eyes on the Field demonstrated how participatory art events can double as meaningful scientific data-gathering exercises when paired with the right tools.",
                    "imgs": []
                },
                {
                    "title": "Collaborators & Support",
                    "text": "Eyes on the Field: Porto was organized by Genomic Gastronomy and Nicetrails, hosted at Venn Canteen with chef Barney Pau, and supported by Formiga Gloriosa. The event was made possible by the EU S+T+ARTS MUSAE project, which supports art-science collaborations exploring the relationship between technology, ecology, and culture.",
                    "imgs": []
                }
            ],
            "links": [
                { "title": "BITZ tool", "url": "https://bitz.tools" },
                { "title": "Genomic Gastronomy article", "url": "https://genomicgastronomy.com/work/2025-2/eyes-on-the-field/" }
            ]
        },

        "eat-bitz": {
            "title": "EAT.BITZ",
            "subtitle": "A data-driven oracle experience for exploring the biodiversity of the kitchen",
            "description": "An interactive installation combining ingredient oracle readings, a kaleidoscope viewer, and a custom digital platform to reveal the ecological dimensions of restaurant dishes. Created with Bernat Cuní and Genomic Gastronomy for Venn Canteen in Porto, as part of the ST3ER (Scaling Twin Transition in Tourism) project.",
            "images": ["img/eat-bitz/event_1.jpg", "img/eat-bitz/event_4.jpg", "img/eat-bitz/event_6.jpg"],
            "content": [
                {
                    "title": "Project Overview",
                    "text": "EAT.BITZ transforms the dining table into a site of ecological inquiry. Each dish served at Venn Canteen became an entry point into the biodiversity of the kitchen — the organisms, landscapes, and supply chains behind every ingredient. Rather than presenting this as a lecture or a menu annotation, EAT.BITZ made the information tangible and playful through three interlocking experiences: oracle card readings, a physical kaleidoscope viewer, and an interactive digital platform built on the BITZ data infrastructure.",
                    "imgs": []
                },
                {
                    "title": "The Oracle Cards",
                    "text": "Diners received oracle card readings tied to the specific ingredients in their meal. Each card surfaced ecological and cultural stories embedded in the food — the pollinators behind a fruit, the soil fungi supporting a root vegetable, the migratory routes of a spice. The cards were designed to work both as standalone objects and as prompts for conversation, reframing each dish as a node in a larger living system rather than a finished product.",
                    "imgs": ["img/eat-bitz/oracle_cards_1.jpg", "img/eat-bitz/oracle_cards_3.jpg", "img/eat-bitz/oracle_card.gif"]
                },
                {
                    "title": "Kaleidoscope Viewer",
                    "text": "A custom physical kaleidoscope viewer placed on each table let guests observe fragments of the micro-world of their ingredients — soil samples, plant structures, seed surfaces — transformed into immersive geometric patterns. The kaleidoscope made the invisible visible, offering a sensory encounter with the scale of life that exists below the threshold of the meal.",
                    "imgs": ["img/eat-bitz/kaleidoscope.gif", "img/eat-bitz/event_2.jpg", "img/eat-bitz/event_3.jpg"]
                },
                {
                    "title": "Digital Platform",
                    "text": "The accompanying digital platform allowed guests to dive deeper into the biodiversity stories behind each dish. Built on the BITZ infrastructure, the platform connected ingredient data to species records, ecological relationships, and regional food system context. I developed the platform to pull structured biodiversity data into a format legible to curious eaters, bridging the gap between scientific datasets and the dinner table.",
                    "imgs": ["img/eat-bitz/platform_1.png", "img/eat-bitz/platform_2.png", "img/eat-bitz/platform_4.png"]
                },
                {
                    "title": "Event & Context",
                    "text": "EAT.BITZ was presented at Venn Canteen in Porto as part of the ST3ER (Scaling Twin Transition in Tourism) project, which explores how the tourism and hospitality sector can embrace regenerative and digital transitions simultaneously. The collaboration brought together artist and digital craftsman Bernat Cuní, Genomic Gastronomy, and Venn Canteen to test what it looks like when a restaurant becomes a platform for ecological literacy.",
                    "imgs": ["img/eat-bitz/event_5.jpg", "img/eat-bitz/event_7.jpg"]
                }
            ],
            "links": [
                { "title": "Genomic Gastronomy article", "url": "https://genomicgastronomy.com/work/2026-2/eat-bitz/" },
                { "title": "Code", "url": "https://github.com/RubenGres/eatbitz3D" }
            ]
        },

        "visualizing-rags": {
            "title": "Visualizing RAGs",
            "subtitle": "An educational tool for understanding Retrieval-Augmented Generation systems",
            "description": "A small interactive application designed to demystify the inner workings of RAG systems through visual representation. Built as a teaching tool to help users understand how RAGs process documents, create embeddings, and generate contextual responses.",
            "images": ["img/rags/screenshot.png"],
            "content": [
                {
                    "title": "Project Overview",
                    "text": "Visualizing RAGs is an educational tool that makes the inner workings of Retrieval-Augmented Generation systems visible and understandable. By processing PDF documents and creating visual representations of embeddings and retrieval processes, this application helps users grasp how RAG systems chunk text, create semantic embeddings, and retrieve relevant context for question answering.",
                    "imgs": []
                },
                {
                    "title": "Technical Implementation",
                    "text": "The tool supports multiple AI providers including OpenAI (for embeddings), Mistral, Gemini, and Anthropic for text generation. Gradio is used to make the interface and llama index for the chunking and retrieval",
                    "imgs": []
                }
            ],
            "links": [
                { "title": "Code", "url": "https://github.com/RubenGres/visualizingRAG" }
            ]
        },

        "wtfood": {
            "title": "WTFood",
            "subtitle": "A lens to explore systemic socioeconomic glitches in the food system and discover ways to take action",
            "description": "From curiosity to action. Take a fruit or vegetable, open the camera, and watch it morph into a glitch of the food system. WTFood reveals hidden socioeconomic impacts and connects you to local communities and policies that are fixing these issues.",
            "images": [
                "img/wtfood/map.gif", "img/wtfood/sorting.gif",
            ],
            "content": [
                {
                    "title": "Reality Filter & Perspective Map",
                    "text": "WTFood transforms photos of fruits and vegetables into visual narratives that reveal hidden aspects of the food system. WTFood creates morphing videos displaying systemic issues from different stakeholder perspectives - from permaculture growers to supermarket managers. For each generated story the tool looks for local resources, communities, and policies where users can take action.",
                    "imgs": ["img/wtfood/example1.gif", "img/wtfood/example2.gif", "img/wtfood/example3.gif", "img/wtfood/example4.gif"]
                },
                {
                    "title": "Technical Implementation",
                    "text": "Built in static html / js with ComfyUI and Stable Diffusion for image generation, the system uses ControlNet TILE models for visual consistency and FILM interpolation for smooth morphing transitions. Web research is handled by Tavily Langchain integration. The interactive map uses CLIP text-image embedding and content sorting and community-driven exploration of food system narratives.",
                    "imgs": []
                },
                {
                    "title": "Credits",
                    "text": "WTFood is a project created by the artist Bernat Cuní and developed by Ruben Gres. This project is part of The Hungry EcoCities project, and has received funding from the European Union’s Horizon Europe research and innovation program. Part of S+T+ARTS program.",
                    "imgs": []
                }
            ],
            "links": [
                { "title": "WTFood", "url": "https://wtfood.eu" },
                { "title": "Video presentation", "url": "https://www.youtube.com/watch?v=ihN679-qSrc" },
                { "title": "Code", "url": "https://github.com/RubenGres/wtfood" }
            ]
        },

        "gouvx": {
            "title": "GouvX",
            "subtitle": "A chatbot using RAG to help you navigate French law",
            "description": "GouvX is an assistant based on the service-public.fr website that helps navigate French law. Its goal is to promote better understanding of government topics, encourage civic reflection, and facilitate access to information. By implementing advanced language models, GouvX also aims to demonstrate the democratic utility of these emerging technologies.",
            "images": ["img/gouvx/gouvx_screenshot.jpg", "img/gouvx/gouvx_logo.jpg", "img/gouvx/gouvx_screenshot2.jpg"],
            "content": [
                {
                    "title": "Project Overview",
                    "text": "GouvX is designed to make French legal information more accessible through conversational AI. Built as an assistant leveraging the comprehensive database of service-public.fr, it transforms complex legal documentation into clear, understandable guidance for citizens. The platform uses advanced language models to foster civic engagement and demonstrate how AI can serve democratic purposes.",
                    "imgs": []
                },
                {
                    "title": "Technical Implementation",
                    "text": "The system employs RAG (Retrieval-Augmented Generation) architecture to provide contextual answers to legal questions. GouvX can utilize different LLM backends including ChatGPT and Albert, allowing for flexible deployment and optimization based on specific use cases. This technical flexibility ensures robust performance while maintaining accessibility for users.",
                    "imgs": []
                },
                {
                    "title": "Democratic Impact",
                    "text": "By making French legal information more accessible, GouvX serves as a bridge between citizens and their government. The tool encourages civic reflection by providing clear explanations of legal processes and requirements, ultimately contributing to a more informed citizenry. This demonstrates the potential for AI technologies to strengthen democratic participation through improved access to public information.",
                    "imgs": []
                }
            ],
            "links": [
                { "title": "Open GouvX", "url": "https://gouvx.fr" },
                { "title": "Blog post", "url": "../blog/gouvx" },
                { "title": "Code", "url": "https://github.com/RubenGres/gouvx" }
            ]
        },

        "drawing2map": {
            title: "Drawing2Map",
            subtitle: "Interactive demonstration of AI terrain generation",
            description: "Drawing2Map helps understanding diffusion models and ControlNet using the Seg2Sat model.",
            images: ["img/drawing2map/thumb.jpg", "img/drawing2map/demo.gif"],
            content: [
                {
                    "title": "Project Overview",
                    "text": "This interactive web tool transforms simple drawings into realistic satellite imagery in real-time. Users can sketch terrain features like forests, rivers, and buildings, then watch as AI generates photorealistic aerial views. The project has been used in workshops at IGN (French National Geographic Institute) to make complex generative AI concepts accessible to diverse audiences through hands-on experimentation.",
                    "imgs": []
                },
                {
                    "title": "Technical implementation",
                    "text": "The interface is built with Svelte for a smooth, responsive user experience. The backend leverages a Hugging Face endpoint running the custom-trained Seg2Sat ControlNet model. This architecture allows real-time generation while keeping the interface lightweight and accessible from any web browser without requiring local GPU resources.",
                    "imgs": []
                },
            ],
            links: [
                { "title": "Try the Demo", "url": "https://rubengr.es/Seg2Sat/" },
                { "title": "Source Code", "url": "https://github.com/RubenGres/Seg2Sat-demo" }
            ],
        },

        "seg2sat": {
            title: "Seg2Sat",
            year: 2023,
            category: "GenAI",
            subtitle: "Create aerial view images in any style you want",
            description: "Project made with IGN FLAIR1 dataset, StableDiffusion, and ControlNet.",
            link: "https://github.com/RubenGres/Seg2Sat",
            images: ["img/seg2sat.jpg"],
            content: [
                {
                    title: "Technical Details",
                    text: "Seg2Sat combines the IGN FLAIR1 dataset with StableDiffusion and ControlNet to generate aerial view images in various artistic styles, bridging geographic data with creative AI."
                }
            ],
            tags: ["StableDiffusion", "ControlNet", "Geographic Data", "IGN FLAIR1"]
        },

        // Games
        "dad-knows-siege-best": {
            title: "Dad knows (siege) best",
            year: 2025,
            category: "Games",
            subtitle: "Lead an army of LLM soldier agents from the grave",
            description: "Built during Mistral x HF Hackaton 2025.",
            link: "https://www.youtube.com/watch?v=ofAcTvuybvY",
            images: ["img/siege.jpg"],
            content: [
                {
                    title: "Hackathon Project",
                    text: "A unique strategy game where you command AI agents powered by large language models. Each soldier has their own personality and decision-making capabilities."
                }
            ],
            tags: ["LLM", "Strategy Game", "Hackathon", "AI Agents"]
        },

        "zoomies": {
            title: "Zoomies: Fast or fired",
            year: 2024,
            category: "Games",
            subtitle: "Play as an exploited employee in corporate hell",
            description: "GMTK 2024 GameJam entry exploring workplace dynamics.",
            link: "https://ohmlet.itch.io/zoomies",
            images: ["https://img.itch.zone/aW1nLzE3NDQ4OTYxLmpwZw==/315x250%23c/p%2BHryy.jpg"],
            content: [
                {
                    title: "Game Jam Theme",
                    text: "Created for GMTK 2024, this game critiques modern work culture through gameplay mechanics that mirror the stress and pressure of corporate environments."
                }
            ],
            tags: ["Game Jam", "GMTK", "Corporate Satire", "RockBottom"]
        },

        "snipit": {
            title: "SnipIt",
            year: 2023,
            category: "Games",
            subtitle: "First place in the 2023 Hugging Face Game JAM",
            description: "Snip away and explore famous paintings in a whole new dimension.",
            link: "https://ohmlet.itch.io/snip-it",
            images: ["img/snipit.jpg"],
            content: [
                {
                    title: "Award Winner",
                    text: "This innovative puzzle game won first place at the 2023 Hugging Face Game JAM by combining art appreciation with unique gameplay mechanics."
                }
            ],
            tags: ["Game Jam Winner", "Art", "Puzzle Game", "Hugging Face"]
        },

        // Other projects
        "menace": {
            title: "Tic-tac-toe matchbox AI",
            year: 2024,
            category: "Other",
            subtitle: "Mechanical learning system from the 1960s using matchboxes",
            description: "Demonstrating fundamental AI principles with everyday objects.",
            link: "/blog/menace",
            images: ["img/menace.jpg"],
            content: [
                {
                    title: "Historical AI",
                    text: "MENACE (Machine Educable Noughts And Crosses Engine) was a mechanical computer built from matchboxes that could learn to play tic-tac-toe, predating modern AI by decades."
                }
            ],
            tags: ["Historical AI", "Machine Learning", "Educational", "MENACE"]
        },

        "this-website": {
            title: "This website",
            year: 2022,
            category: "Other",
            subtitle: "Wow so meta. Statically built with SvelteKit and Bootstrap",
            description: "No template cause I'm a special boy.",
            link: "/",
            images: ["img/portfolio.jpg"],
            content: [
                {
                    title: "Portfolio Development",
                    text: "Built from scratch using SvelteKit and Bootstrap, this portfolio showcases my work while serving as a project itself."
                }
            ],
            tags: ["SvelteKit", "Bootstrap", "Portfolio", "Web Development"]
        }
    };

    const project = allProjects[slug];

    if (!project) {
        throw new Error(`Project "${slug}" not found`);
    }

    return {
        project
    };
}