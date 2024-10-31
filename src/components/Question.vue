<template>
  <div class="mb-4">
    <h2 class="text-xl font-bold mb-2 text-center">{{ question.text }}</h2>
    <div class="flex flex-row justify-evenly mt-8">
      <button v-for="(option, index) in question.options" :key="index" @click="selectAnswer(option)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        {{ option.text }}
      </button>
    </div>
    <div v-if="feedback" class="mt-2 text-green-500 text-center">{{ feedback }}</div>
  </div>
</template>


<script>
export default {
  props: ['question'],
  data() {
    return {
      feedback: '',
    };
  },
  methods: {
    selectAnswer(option) {
      const isCorrect = option.isCorrect;
      this.feedback = isCorrect ? 'Correct!' : 'Incorrect!';
      this.$emit('answer', isCorrect);
    }
  }
};
</script>