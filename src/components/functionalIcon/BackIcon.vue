<template>
  <IconLayoutLeft @click="handleRouteBack" />
</template>
<script lang="ts" setup name="BackIcon">
import { useRouter } from 'vue-router';
const router = useRouter()
const handleRouteBack = () => {
  router.back()
}
</script>
<style scoped lang="scss"></style>
