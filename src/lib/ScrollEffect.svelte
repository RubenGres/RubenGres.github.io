<script>
    import { onMount } from "svelte";

    let modules = [];
    let lastScrollY = 0;

    const isVisible = (element, partial) => {
        const viewTop = window.scrollY;
        const viewBottom = viewTop + window.innerHeight;
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.clientHeight;

        const compareTop = partial ? elementBottom : elementTop;
        const compareBottom = partial ? elementTop : elementBottom;

        return compareBottom <= viewBottom && compareTop >= viewTop;
    };

    const checkVisibility = () => {
        // Get current scroll position
        const currentScrollY = window.scrollY;

        // Only proceed if scrolling down
        if (currentScrollY > lastScrollY) {
            modules.forEach(module => {
                if (isVisible(module, true)) {
                    module.classList.add("come-in");
                }
            });
        }

        // Update last scroll position
        lastScrollY = currentScrollY;
    };

    onMount(() => {
        modules = Array.from(document.querySelectorAll(".module"));

        // Initial check for already visible elements
        modules.forEach(module => {
            if (isVisible(module, true)) {
                module.classList.add("already-visible");
            }
        });

        window.addEventListener("scroll", checkVisibility);

        return () => {
            window.removeEventListener("scroll", checkVisibility);
        };
    });
</script>

<slot />
