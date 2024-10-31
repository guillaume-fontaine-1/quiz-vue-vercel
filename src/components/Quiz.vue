<template>
  <div class="container mx-auto p-4">
    <div v-if="!selectedQuiz">
      <h1 class="text-2xl font-bold mb-4 text-center">Choisissez un quiz</h1>
      <div class="flex flex-row justify-evenly mt-8">
        <button v-for="(quiz, index) in quizzes" :key="index" @click="startQuiz(quiz)"
                class="bg-blue-500 text-white px-4 py-2 rounded">
          Quiz {{ index + 1 }}
        </button>
      </div>
    </div>
    <div v-else>
      <div v-if="!showScore">
        <Timer @time-up="nextQuestion" ref="timer"/>
        <div class="text-center mb-4">Question {{ currentQuestionIndex + 1 }} / {{ selectedQuiz.length }}</div>
        <Question v-if="currentQuestion" :question="currentQuestion" @answer="handleAnswer"/>
      </div>
      <Score v-else :score="score" @replay="replayQuiz" @change="changeQuiz"/>
    </div>
  </div>
</template>

<script>
import Question from './Question.vue';
import Score from './Score.vue';
import Timer from './Timer.vue';
import questionService from '../services/questionService';

export default {
  components: {Question, Score, Timer},
  data() {
    return {
      quizzes: [],
      selectedQuiz: null,
      currentQuestion: null,
      currentQuestionIndex: 0,
      score: 0,
      showScore: false,
    };
  },
  async created() {
    this.quizzes = await questionService.getQuestions();
  },
  methods: {
    startQuiz(quiz) {
      this.selectedQuiz = quiz;
      this.shuffleQuestions();
      this.currentQuestion = this.selectedQuiz[this.currentQuestionIndex];
      this.$nextTick(() => {
        this.$refs.timer.startTimer();
      });
    },
    shuffleQuestions() {
      this.selectedQuiz.sort(() => Math.random() - 0.5);
    },
    handleAnswer(isCorrect) {
      if (isCorrect) {
        this.score++;
      }
      this.nextQuestion();
    },
    nextQuestion() {
      this.$refs.timer.resetTimer();
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.selectedQuiz.length) {
        this.currentQuestion = this.selectedQuiz[this.currentQuestionIndex];
      } else {
        this.showScore = true;
        this.$refs.timer.stopTimer();
      }
    },
    replayQuiz() {
      this.score = 0;
      this.currentQuestionIndex = 0;
      this.showScore = false;
      this.shuffleQuestions();
      this.currentQuestion = this.selectedQuiz[this.currentQuestionIndex];
      this.$nextTick(() => {
        this.$refs.timer.startTimer();
      });
    },
    changeQuiz() {
      this.score = 0;
      this.currentQuestionIndex = 0;
      this.selectedQuiz = null;
      this.showScore = false;
    }
  }
};
</script>