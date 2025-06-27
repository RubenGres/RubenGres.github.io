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
                { "title": "Code", "url": "https://github.com/RubenGres/BITZ" }
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
                { "title": "Blog article", "url": "../blog/gouvx" },
                { "title": "Code", "url": "https://github.com/RubenGres/gouvx" }
            ]
        },

        "drawing2map": {
            title: "Drawing2Map",
            year: 2023,
            category: "GenAI",
            subtitle: "Web interface for Seg2Sat to generate a map from a drawing",
            description: "Built using HuggingFace's inference endpoint to turn sketches into satellite imagery.",
            link: "https://rubengr.es/Seg2Sat/",
            images: ["img/drawing2map.jpg"],
            content: [
                {
                    title: "Technical Implementation",
                    text: "This web interface makes the Seg2Sat model accessible through a simple drawing interface, allowing users to sketch and see their drawings transformed into realistic satellite imagery."
                }
            ],
            tags: ["HuggingFace", "Image Generation", "Web Interface", "Seg2Sat"]
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
            tags: ["Game Jam", "GMTK", "Corporate Satire", "Ohmlet Studio"]
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