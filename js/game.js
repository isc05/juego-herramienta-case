/**
 * Clase principal del juego.
 * Encapsula el estado del juego y la manipulación del DOM requerida durante la partida.
 * Utiliza un patrón de arquitectura basada en componentes lógicos.
 */
export class TriviaGame {
    constructor(questionsData) {
        this.questions = questionsData;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isAcceptingAnswers = false;

        this.cacheDOM();
        this.bindEvents();
    }

    /**
     * Almacena las referencias del DOM para evitar consultas repetidas, 
     * mejorando el rendimiento general.
     */
    cacheDOM() {
        this.screens = {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            end: document.getElementById('end-screen')
        };
        
        this.ui = {
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),
            questionCounter: document.getElementById('question-counter'),
            scoreDisplay: document.getElementById('score-display'),
            progressFill: document.getElementById('progress-fill'),
            finalScore: document.getElementById('final-score'),
            feedbackText: document.getElementById('feedback-text'),
            btnStart: document.getElementById('btn-start'),
            btnRestart: document.getElementById('btn-restart')
        };
    }

    bindEvents() {
        this.ui.btnStart.addEventListener('click', () => this.startGame());
        this.ui.btnRestart.addEventListener('click', () => this.startGame());
    }

    switchScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
        this.screens[screenName].classList.add('active');
    }

    startGame() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.updateScoreDisplay();
        this.switchScreen('game');
        this.loadNextQuestion();
    }

    loadNextQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            return this.endGame();
        }

        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.ui.questionText.textContent = currentQuestion.question;
        
        this.updateProgress();

        this.ui.optionsContainer.innerHTML = '';
        
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('btn', 'option');
            button.textContent = option;
            button.dataset.index = index;
            
            button.addEventListener('click', (e) => this.handleAnswer(e));
            this.ui.optionsContainer.appendChild(button);
        });

        this.isAcceptingAnswers = true;
    }

    /**
     * Lógica de evaluación de respuestas.
     * Bloquea la entrada para prevenir múltiples clics, aplica clases CSS para feedback visual
     * y gestiona la transición asíncrona hacia la siguiente pregunta.
     */
    handleAnswer(event) {
        if (!this.isAcceptingAnswers) return;
        this.isAcceptingAnswers = false;

        const selectedButton = event.target;
        const selectedAnswer = parseInt(selectedButton.dataset.index, 10);
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        if (isCorrect) {
            selectedButton.classList.add('correct');
            this.score += 10;
            this.updateScoreDisplay();
        } else {
            selectedButton.classList.add('incorrect');
            const buttons = this.ui.optionsContainer.querySelectorAll('.btn.option');
            buttons[currentQuestion.correctAnswer].classList.add('correct');
        }

        setTimeout(() => {
            this.currentQuestionIndex++;
            this.loadNextQuestion();
        }, 1200);
    }

    updateProgress() {
        const questionNumber = this.currentQuestionIndex + 1;
        const totalQuestions = this.questions.length;
        
        this.ui.questionCounter.textContent = `Pregunta ${questionNumber} / ${totalQuestions}`;
        
        const progressPercentage = ((questionNumber - 1) / totalQuestions) * 100;
        this.ui.progressFill.style.width = `${progressPercentage}%`;
    }

    updateScoreDisplay() {
        this.ui.scoreDisplay.textContent = `Puntaje: ${this.score}`;
    }

    endGame() {
        this.switchScreen('end');
        this.ui.finalScore.textContent = this.score;
        
        const maxScore = this.questions.length * 10;
        const percentage = (this.score / maxScore) * 100;
        
        if (percentage === 100) {
            this.ui.feedbackText.textContent = "¡Excelente! Eres un experto en herramientas CASE.";
        } else if (percentage >= 60) {
            this.ui.feedbackText.textContent = "Buen trabajo, tienes un sólido entendimiento de ingeniería de software.";
        } else {
            this.ui.feedbackText.textContent = "Sigue repasando las clasificaciones de las herramientas CASE.";
        }
    }
}