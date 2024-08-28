<!-- src/routes/+layout.svelte -->
<script>
    import Navbar from '$lib/Navbar.svelte';
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
