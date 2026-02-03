<template>
  <div class="page-kanban">
    <KanbanBoard />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Kanban Board',
})
</script>

<style scoped>
.page-kanban {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}
</style>
