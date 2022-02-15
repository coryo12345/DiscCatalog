<template>
  <v-container class="main">
    <h2>Add Disc</h2>
    <hr class="mb-4" />
    <v-form ref="form" lazy-validation>
    <v-row>
      <v-col v-for="field in fields" :key="field.name" cols="12" sm="6" md="3">
          <!-- TODO change input based on type -->
        <v-text-field
          v-model="disc[field.name]"
          :label="field.name"
          class="d-inline-block"
          :rules="[required[field.required.toString()]]"
          outlined
          dense
        />
      </v-col>
    </v-row>
    <v-btn color="primary" @click="submit">Add</v-btn>
    </v-form>
    <p v-if="error" class="error--text text-center mt-2">There was a problem submitting your request</p>
  </v-container>
</template>

<script>
import { URLS } from '@/constants'

// name: type
const FIELDS = {
  'Brand': 'String',
  'Mold': 'String',
  'Plastic?': 'String',
  'Weight?': 'Int',
  'Run?': 'String',
  'Foil?': 'String',
  'Stamp?': 'String',
  'Color?': 'String',
  'Public?': 'Boolean'
}

export default {
  data() {
    return {
      disc: {},
      fields: [],
      required: {
          'true': (val) => !!val || 'This field is required',
          'false': (_) => true
      },
      error: false
    }
  },
  created() {
    Object.keys(FIELDS).forEach((key) => {
      this.fields.push({
        name: key.replaceAll('?', ''),
        type: FIELDS[key],
        required: !key.includes('?')
      })
      this.disc[key] = undefined
    })
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.$post(URLS.ADD_DISC, this.disc);
        } catch (err) {
          this.error = true;
        }
      }
    }
  }
}
</script>

<style scoped>
.main {
  background: var(--v-background-base);
}
</style>
