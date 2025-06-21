<script>
  import { onMount } from 'svelte';
  
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

<div id="navigation">
  <nav class="navbar navbar-expand-sm navbar-light container">
    <div class="navbar-brand">
      <a class="nav-link" href="../" id="site-name-nav">
        <span>Ruben Gres</span>
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
      <i class="fas fa-bars"></i>
    </button>

    <div class="navbar-collapse {isMenuOpen ? 'show' : ''}" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="blog" on:click={closeMenu}>Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="publications" on:click={closeMenu}>Publications</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="teaching" on:click={closeMenu}>Teaching</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="resume" on:click={closeMenu}>Resume</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="about" on:click={closeMenu}>About</a>
        </li>
      </ul>
    </div>
  </nav>
</div>

<style>
  #navigation {
    height: 75px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin-bottom: 6px;
    font-family: "Roboto", sans-serif;
    font-size: 1.15em;
    position: relative;
  }

  .navbar {
    height: 50px;
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    flex-shrink: 0;
  }

  .navbar-toggler {
    display: none;
    background: none;
    border: none;
    font-size: 2rem;
    color: #05364d;
    cursor: pointer;
    padding: 10px;
    min-width: 50px;
    min-height: 50px;
    align-items: center;
    justify-content: center;
  }

  .navbar-collapse {
    display: flex;
  }

  :global(#collapsibleNavbar ul) {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link) {
    font: 500 14px/35px "Roboto", sans-serif;
    font-size: 1em;
    text-transform: capitalize;
    white-space: nowrap;
    color: #05364d;
    padding: 0px 10px;
    display: inline-block;
    margin: 0 5px;
    border-radius: 2px;
    text-decoration: none;
  }

  :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link:hover) {
    color: #efb6df;
    border-bottom: 0px;
  }

  :global(#site-name-nav *) {
    color: rgba(15, 118, 110, 0.9);
    font: 500 1.25em/1.75em "Roboto", sans-serif;
    font-weight: 600;
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    #navigation {
      height: auto;
      min-height: 75px;
    }

    .navbar {
      height: auto;
      min-height: 50px;
      padding-top: 15px;
      padding-bottom: 15px;
      flex-wrap: wrap;
    }

    .navbar-toggler {
      display: flex;
      order: 2;
    }

    .navbar-brand {
      order: 1;
    }

    .navbar-collapse {
      order: 3;
      width: 100%;
      display: none;
      margin-top: 15px;
    }

    .navbar-collapse.show {
      display: block;
    }

    :global(#collapsibleNavbar ul) {
      flex-direction: column;
      width: 100%;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 5px;
      padding: 10px 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    :global(.navbar .navbar-collapse .navbar-nav .nav-item) {
      width: 100%;
      text-align: center;
      border-bottom: 1px solid rgba(5, 54, 77, 0.1);
    }

    :global(.navbar .navbar-collapse .navbar-nav .nav-item:last-child) {
      border-bottom: none;
    }

    :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link) {
      display: block;
      padding: 20px 20px;
      margin: 0;
      width: 100%;
      border-radius: 0;
      font-size: 1.1em;
    }

    :global(.navbar .navbar-collapse .navbar-nav .nav-item .nav-link:hover) {
      background-color: rgba(239, 182, 223, 0.1);
      color: #efb6df;
    }

    /* Keep site name visible and styled properly on mobile */
    :global(#site-name-nav .nav-link) {
      font-size: 1.25em !important;
      font-weight: 600 !important;
      color: rgba(15, 118, 110, 0.9) !important;
    }
  }

  /* Extra small screens */
  @media (max-width: 480px) {
    .navbar {
      padding-left: 10px;
      padding-right: 10px;
    }

    :global(#site-name-nav .nav-link) {
      font-size: 1.1em !important;
    }
  }
</style>