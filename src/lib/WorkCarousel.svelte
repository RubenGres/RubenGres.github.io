<script>
    import { onMount, onDestroy } from 'svelte';

    const images = [
        "img/bitz/bitz_logo.jpg",
        "img/eat-bitz/event_1.jpg",
        "img/eyes-on-the-field/field_1.jpg",
        "img/wtfood.png",
        "img/rags.jpg",
        "img/fifi.png",
        "img/gouvx/gouvx_logo.jpg",
        "img/seg2sat.jpg"
    ];

    let current = 0;
    /** @type {ReturnType<typeof setInterval> | undefined} */
    let timer;

    onMount(() => {
        timer = setInterval(() => {
            current = (current + 1) % images.length;
        }, 5000);
    });

    onDestroy(() => clearInterval(timer));
</script>

<div class="bg_carousel" aria-hidden="true">
    {#each images as src, i}
        <div
            class="bg_slide"
            class:active={i === current}
            style="background-image: url({src});"
        ></div>
    {/each}
    <div class="bg_tint"></div>
</div>

<style>
    .bg_carousel {
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
    }

    .bg_slide {
        position: absolute;
        inset: 0;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0;
        transition: opacity 1.4s ease-in-out, transform 6s ease-out;
        transform: scale(1);
    }

    .bg_slide.active {
        opacity: 1;
        transform: scale(1.06);
    }

    .bg_tint {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        pointer-events: none;
    }
</style>
