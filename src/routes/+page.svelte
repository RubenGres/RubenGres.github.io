<script>
    import Banner from '$lib/Banner.svelte';
    import Featured from '$lib/Featured.svelte';
    import Projects from '$lib/Projects.svelte';
</script>

<style>
    .section-header {
        text-align: center;
        margin-top: 80px;
        margin-bottom: 20px;
    }

    .section-title {
        font-size: 2.5rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: #333;
        margin-bottom: 20px;
        display: inline-block;
        position: relative;
    }
</style>

<Banner />

<div class="section-header">
    <h2 class="section-title">
        Featured Work
    </h2>
</div>

<Featured />

<div class="section-header">
    <h2 class="section-title">
        What I do
    </h2>
</div>

<Projects />