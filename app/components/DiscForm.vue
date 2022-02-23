<template>
  <v-container class="main">
    <h2>{{ title }}</h2>
    <hr class="mb-4" />
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col
          v-for="field in fields"
          :key="field.name"
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            v-if="field.type === 'String'"
            v-model="internalDisc[field.name]"
            :label="field.name"
            class="d-inline-block"
            :rules="[required[field.required.toString()]]"
            outlined
            dense
          />
          <v-text-field
            v-else-if="field.type === 'Number'"
            v-model.number="internalDisc[field.name]"
            type="number"
            min="100"
            max="200"
            :label="field.name"
            class="d-inline-block"
            :rules="[required[field.required.toString()]]"
            outlined
            dense
          />
          <v-checkbox
            v-else-if="field.type === 'Boolean'"
            v-model="internalDisc[field.name]"
            :label="field.name"
            class="d-inline-block"
          />
        </v-col>
      </v-row>
      <v-btn color="primary" @click="submit">{{ submitText }}</v-btn>
    </v-form>
    <p v-if="error" class="error--text text-center mt-2">
      There was a problem submitting your request
    </p>
  </v-container>
</template>

<script>
import { URLS } from '@/constants';

// name: type
const FIELDS = {
  brand: 'String',
  mold: 'String',
  'plastic?': 'String',
  'weight?': 'Number',
  'run?': 'String',
  'foil?': 'String',
  'stamp?': 'String',
  'color?': 'String',
  'shared?': 'Boolean',
};

export default {
  props: {
    disc: {
      type: Object,
      required: false,
      default: () => {},
    }
  },
  data() {
    return {
      internalDisc: {},
      editing: false,
      fields: [],
      required: {
        true: (val) => !!val || 'This field is required',
        false: (_) => true,
      },
      error: false,
    };
  },
  computed: {
    title() {
      return this.editing ? 'Edit Disc' : 'Add Disc';
    },
    submitText() {
      return this.editing ? 'Save' : 'Add';
    }
  },
  watch: {
    disc: {
      handler(val, _) {
        this.discPropWatcher(val);
      },
      deep: true
    }
  },
  created() {
    Object.keys(FIELDS).forEach((key) => {
      this.fields.push({
        name: key.replaceAll('?', ''),
        type: FIELDS[key],
        required: !key.includes('?'),
      });
    });
    this.discPropWatcher(this.disc);
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          if (this.editing) {
            await this.$axios.$post(URLS.UPDATE_DISC, this.internalDisc);
            this.$emit('update', this.internalDisc);
          } else {
            await this.$axios.$post(URLS.ADD_DISC, this.internalDisc);
            this.$emit('create', this.internalDisc);
          }
        } catch (err) {
          this.error = true;
        }
      }
    },
    discPropWatcher(val) {
      if (Object.keys(val).length > 0) {
        // we were given a disc - edit mode
        this.internalDisc = {...val};
        this.editing = true;
      } else {
        this.internalDisc = {};
        this.editing = false;
      }
    }
  },
};
</script>

<style scoped>
.main {
  background: var(--v-background-base);
}

.main >>> label.v-label {
  text-transform: capitalize;
}
</style>
