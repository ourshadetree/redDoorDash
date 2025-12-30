<template>
  <div class="app-shell">
    <header class="app-header">
      <nav class="nav">
        <RouterLink class="nav-item" to="/">Dashboard</RouterLink>
        <RouterLink class="nav-item" to="/properties">Properties</RouterLink>
        <RouterLink class="nav-item" to="/">Reports</RouterLink>
        <RouterLink class="nav-item" to="/">Settings</RouterLink>
      </nav>
      <div class="topbar-actions">
        <div class="search-wrap">
          <span class="search-icon">⌕</span>
          <input placeholder="Search property, tenant, or unit" />
        </div>
      </div>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>
