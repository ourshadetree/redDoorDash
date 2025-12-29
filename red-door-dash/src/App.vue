<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark"></div>
        <div>
          <div class="brand-title">Red Door Dash</div>
          <div class="brand-subtitle">Portfolio Control</div>
        </div>
      </div>

      <nav class="nav">
        <RouterLink class="nav-item" to="/">Dashboard</RouterLink>
        <RouterLink class="nav-item" to="/#properties">Properties</RouterLink>
        <RouterLink class="nav-item" to="/">Reports</RouterLink>
        <RouterLink class="nav-item" to="/">Settings</RouterLink>
      </nav>

      <button class="logout">Log Out</button>
    </aside>

    <div class="content">
      <header class="topbar">
        <div class="search-wrap">
          <span class="search-icon">⌕</span>
          <input placeholder="Search property, tenant, or unit" />
        </div>
        <div class="topbar-actions">
          <button class="pill">New Report</button>
          <div class="user-chip">
            <div class="avatar"></div>
            <span>Martine Furry</span>
          </div>
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>
