<template>
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-2">Votre score est : {{ score }}</h2>
    <p class="mb-4">{{ comment }}</p>
    <div class="flex flex-row justify-evenly mt-8">
      <button @click="replay" class="bg-blue-500 text-white px-4 py-2 rounded">Rejouer</button>
      <button @click="change" class="bg-blue-500 text-white px-4 py-2 rounded">Changer de quizz</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['score'],
  computed: {
    comment() {
      if (this.score > 8) {
        return 'Excellent!';
      } else if (this.score > 5) {
        return 'Pas mal!';
      } else {
        return 'Peut mieux faire!';
      }
    }
  },
  methods: {
    replay() {
      this.$emit('replay');
    },
    change() {
      this.$emit('change');
    }
  }
};
</script>