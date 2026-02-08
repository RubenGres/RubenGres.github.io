<!-- src/routes/+layout.svelte -->
<script data-goatcounter="https://rgres.goatcounter.com/count" async src="//gc.zgo.at/count.js">
    import Navbar from '$lib/Navbar.svelte';
    import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
    <title>Ruben Gres</title>
    <link rel='icon' type='image/png' href='/favicon.ico'>
    <link rel='stylesheet' href='/css/bootstrap.css'>
    <link rel='stylesheet' href='/css/home.css'>
    <link rel='stylesheet' href='/css/resume.css'>
</svelte:head>

<header>
    <Navbar />
</header>

<main>
    <slot />
</main>

<Footer/>