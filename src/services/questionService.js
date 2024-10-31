import questions1 from '../assets/questions1.json';
import questions2 from '../assets/questions2.json';
import questions3 from '../assets/questions3.json';
import questions4 from '../assets/questions4.json';
import questions5 from '../assets/questions5.json';

export default {
    async getQuestions() {
        return [questions1, questions2, questions3, questions4, questions5];
    }
}