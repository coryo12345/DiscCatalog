<template>
  <div class="d-flex justify-center mt-8">
    <v-progress-circular :size="64" indeterminate />
  </div>
</template>

<script>
export default {
  name: 'AuthPage',
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/account');
    } else {
      this.$router.push('/');
    }
  }
}
</script>