<template>
  <v-container class="main">
    <h2 class="mb-2">{{ name }}</h2>
    <!-- <div v-if="disc.image"></div> -->
    <div v-for="attr in attributes" :key="attr" class="mb-2">
      <span class="capital left-col pr-1">{{ attr }}</span>
      <span>{{ disc[attr] }}</span>
    </div>
    <div v-if="editable" class="d-flex">
      <v-btn class="ml-auto" @click="edit">Edit</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    disc: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    name() {
      const pl = this.disc.plastic ? this.disc.plastic : '';
      const mld = this.disc.mold ? this.disc.mold : '';
      return `${pl} ${mld}`.trim();
    },
    attributes() {
      return Object.keys(this.disc).filter(x => 
        !['image', 'id', 'userid'].includes(x.toLowerCase()) &&
        this.disc[x]
      );
    }
  },
  methods: {
    edit() {
      this.$emit('edit', this.disc);
    }
  },
};
</script>

<style scoped>
.main {
  background: var(--v-background-base);
}

.capital {
  text-transform: capitalize;
}

.left-col {
  display: inline-block;
  text-align: right;
  word-wrap: break-word;
  width: 6rem;
  color: var(--v-accent-lighten1);
}
</style>
