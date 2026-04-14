<script>
    import Navbar from '$lib/Navbar.svelte';
    import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
    <title>Ruben Gres</title>
    <link rel='icon' type='image/png' href='/favicon.ico'>
    <link rel='stylesheet' href='/css/grid.css'>
    <link rel='stylesheet' href='/css/home.css'>
    <link rel='stylesheet' href='/css/resume.css'>
</svelte:head>

<a href="#main-content" class="skip-link">Skip to main content</a>

<header>
    <Navbar />
</header>

<main id="main-content">
    <slot />
</main>

<Footer/>

<style>
    .skip-link {
        position: absolute;
        top: -100%;
        left: 0;
        background: #05364d;
        color: white;
        padding: 8px 16px;
        z-index: 10000;
        text-decoration: none;
        border-radius: 0 0 4px 0;
        font-size: 14px;
    }
    .skip-link:focus {
        top: 0;
    }
</style>
