<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  $: isHome = $page.url.pathname === '/';

  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  function closeMenu() {
    isMenuOpen = false;
  }
  
  onMount(() => {
    // Close menu when clicking outside
    function handleClickOutside(event) {
      const nav = document.getElementById('navigation');
      if (!nav.contains(event.target) && isMenuOpen) {
        closeMenu();
      }
    }
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div id="navigation" class:home={isHome}>
  <nav class="navbar navbar-expand-sm navbar-light container">
    <div class="navbar-brand">
      <a class="nav-link" href="/" id="site-name-nav">
        <span>Ruben&nbsp;Gres</span>
      </a>
    </div>

    <button
      class="navbar-toggler"
      type="button"
      on:click={toggleMenu}
      aria-controls="collapsibleNavbar"
      aria-expanded={isMenuOpen}
      aria-label="Toggle navigation"
    >
      <svg class="hamburger-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>

    <div class="navbar-collapse {isMenuOpen ? 'show' : ''}" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/blog" on:click={closeMenu}>Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/publications" on:click={closeMenu}>Publications</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/teaching" on:click={closeMenu}>Teaching</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/resume" on:click={closeMenu}>Resume</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about" on:click={closeMenu}>About</a>
        </li>
      </ul>
    </div>
  </nav>
</div>

<style>
  #navigation {
    height: 75px;
    background-color: #0a0a12;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
    margin-bottom: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 1.15em;
    position: relative;
  }

  :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link) {
    color: #c9d4ff !important;
  }

  :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link:hover) {
    color: #efb6df !important;
  }

  :global(#site-name-nav span) {
    color: #ffd0ec !important;
  }

  :global(.navbar-toggler) {
    color: #c9d4ff !important;
  }

  #navigation.home {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
    box-shadow: none;
    z-index: 10000;
  }

  #navigation.home :global(.nav-link) {
    color: rgba(255, 255, 255, 0.92) !important;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  }

  #navigation.home :global(.nav-link:hover) {
    color: #ffd0ec !important;
  }

  #navigation.home :global(#site-name-nav span) {
    color: #ffffff !important;
  }

  #navigation.home :global(.navbar-toggler) {
    color: #ffffff !important;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    height: auto;
    margin-right: auto;
  }

  .navbar-toggler {
    display: none;
    background: none;
    border: none;
    color: #c9d4ff;
    cursor: pointer;
    padding: 10px;
    min-width: 50px;
    min-height: 50px;
    align-items: center;
    justify-content: center;
  }

  .hamburger-icon {
    width: 28px;
    height: 28px;
    fill: none;
    stroke: currentColor;
  }

  .navbar-collapse {
    display: flex;
    order: 2;
  }

  :global(#collapsibleNavbar ul) {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link) {
    font: 500 14px/35px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 1em;
    text-transform: capitalize;
    white-space: nowrap;
    color: #05364d;
    padding: 0px 10px;
    display: inline-block;
    margin: 0 5px;
    border-radius: 2px;
    text-decoration: none;
    line-height: 35px;
    vertical-align: middle;
  }

  :global(#site-name-nav) {
    line-height: 35px;
    vertical-align: middle;
  }

  :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link:hover) {
    color: #efb6df;
    border-bottom: 0px;
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    #navigation {
      height: auto;
      min-height: 60px;
    }

    .navbar {
      height: auto;
      min-height: 40px;
      padding-top: 10px;
      padding-bottom: 10px;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0;
    }

    .navbar-toggler {
      display: flex;
      order: 2;
      padding: 5px;
      min-width: 40px;
      min-height: 40px;
    }

    .hamburger-icon {
      width: 32px;
      height: 32px;
    }

    .navbar-collapse {
      order: 3;
      width: 100%;
      display: none;
    }

    .navbar-collapse.show {
      display: block;
    }

    :global(#collapsibleNavbar ul) {
      flex-direction: column;
      width: 100%;
    }

    :global(.navbar .navbar-collapse .navbar-nav .nav-item) {
      width: 100%;
      text-align: left;
    }

    :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link) {
      display: block;
      padding: 3px 15px;
      margin: 0;
      color: #666;
      width: 100%;
    }

    :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link:hover) {
      background-color: rgba(239, 182, 223, 0.1);
      color: #efb6df;
    }
  }

  /* Extra small screens */
  @media (max-width: 480px) {
    #navigation {
      min-height: 50px;
    }

    .navbar {
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 8px;
      padding-bottom: 8px;
      min-height: 35px;
    }

    .navbar-toggler {
      padding: 3px;
      min-width: 35px;
      min-height: 35px;
    }

    .hamburger-icon {
      width: 26px;
      height: 26px;
    }

    :global(#site-name-nav span) {
      font-size: 1.1em !important;
    }
  }
</style>