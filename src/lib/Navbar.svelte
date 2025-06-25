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
    justify-content: flex-start;
    align-items: center;
    gap: 40px;
  }

  .navbar-brand {
    height: auto;
    order: 1;
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
      font-size: 1.5rem;
      padding: 5px;
      min-width: 40px;
      min-height: 40px;
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
      font-size: 1.3rem;
      padding: 3px;
      min-width: 35px;
      min-height: 35px;
    }

    :global(#site-name-nav span) {
      font-size: 1.1em !important;
    }
  }
</style>