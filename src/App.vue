<template>
  <div class="app-shell">
    <header class="app-header">
      <nav class="nav">
        <RouterLink class="nav-item" to="/properties">Properties</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>
