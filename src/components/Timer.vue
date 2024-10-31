<template>
  <div class="text-center mb-4">{{ timeLeft }} secondes</div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 10,
      interval: null,
    };
  },
  methods: {
    startTimer() {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.interval);
          this.$emit('time-up');
        }
      }, 1000);
    },
    resetTimer() {
      clearInterval(this.interval);
      this.timeLeft = 10;
      this.startTimer();
    },
    stopTimer() {
      clearInterval(this.interval);
    }
  }
};
</script>