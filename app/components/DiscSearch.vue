<template>
  <v-text-field
    v-model="searchString"
    class="text-width"
    placeholder="Search Discs"
    hide-details
    solo
    @input="emitDiscs"
  />
</template>

<script>
const modelEvent = 'modelChange';
const searchPartition = '|%|';

export default {
  model: {
    prop: 'searched',
    event: modelEvent,
  },
  props: {
    /**
     * list of discs to search
     */
    discs: {
      type: Array,
      required: true,
    },
    /**
     * attributes on disc objects to search
     */
    attributes: {
      type: Array,
      required: true,
    },
    /**
     * v-model - the discs which match the serach criteria
     */
    searched: {
      type: Array,
      default: () => {return this.discs},
    },
  },
  data() {
    return {
      searchString: '',
    };
  },
  computed: {
    discsStrings() {
      return this.discs.map((disc) => {
        return { ...disc, search: this.discToString(disc) };
      });
    },
    internalSearched() {
      return this.discsStrings.filter((disc) =>
        disc.search.includes(this.searchString.toLowerCase())
      );
    },
  },
  watch: {
    discs(val) {
      this.$emit(modelEvent, val);
    }
  },
  methods: {
    emitDiscs() {
      this.$emit(modelEvent, this.internalSearched);
    },
    discToString(disc) {
      let st = '';
      this.attributes.forEach((attr) => {
        st += searchPartition;
        st += disc[attr];
      });
      // remove the first
      return st.replace(searchPartition, '').toLowerCase();
    },
  },
};
</script>

<style scoped>
.text-width {
  max-width: 18em;
}
</style>
