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
                { "title": "Video presentation", "url": "https://youtube.com" },
                { "title": "Code", "url": "https://github.com/RubenGres/BITZ" }
            ]
        },

        "visualizing-rags": {
            title: "Visualizing RAGs",
            year: 2025,
            category: "GenAI",
            subtitle: "Teaching tool to explain the inner workings of a RAG system",
            description: "An interactive visualization to help people understand how Retrieval Augmented Generation works.",
            link: "https://github.com/RubenGres/visualizingRAGS",
            images: ["img/rags.jpg"],
            content: [
                {
                    title: "Educational Goal",
                    text: "RAG systems can be complex to understand. This tool breaks down the process into visual, interactive components that make the concept accessible to both technical and non-technical audiences."
                }
            ],
            tags: ["RAG", "Education", "Visualization", "Teaching Tool"]
        },

        "wtfood": {
            title: "WTFood",
            year: 2024,
            category: "GenAI",
            subtitle: "Using AI to uncover the glitches of the food system",
            description: "Made with cunicode for S+T+ARTS EU, exploring food system dysmorphia through AI.",
            link: "https://www.cunicode.com/works/food-dysmorphia",
            images: ["img/wtfood.png"],
            content: [
                {
                    title: "Concept",
                    text: "WTFood uses AI to highlight the absurdities and problems in our modern food system, creating a critical examination of how we produce, distribute, and consume food."
                }
            ],
            tags: ["AI", "Food Systems", "Critical Design", "S+T+ARTS EU"]
        },

        "gouvx": {
            title: "GouvX",
            year: 2023,
            category: "GenAI",
            subtitle: "A chatbot using retrieval augmented generation to help you navigate French law",
            description: "Making French legal information more accessible through conversational AI.",
            link: "https://www.gouvx.fr/",
            images: ["img/gouvx.jpg"],
            content: [
                {
                    title: "Problem & Solution",
                    text: "French legal documentation can be overwhelming and hard to navigate. GouvX uses RAG to provide clear, contextual answers to legal questions, making the law more accessible to citizens."
                }
            ],
            tags: ["RAG", "Legal Tech", "French Law", "Accessibility"]
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