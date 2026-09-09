/**
 * Clase principal del juego.
 * Gestiona el estado de la partida, multiplicadores, persistencia de puntuación máxima
 * y coordinacion de animaciones responsivas.
 */
export class TriviaGame {
    constructor(questionsData) {
        this.questions = questionsData;
        
        // Estado del juego
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isAcceptingAnswers = false;
        
        // Mecánicas avanzadas
        this.streakCount = 0;
        this.multiplier = 1.0;
        
        // Persistencia utilizando LocalStorage por su retención a largo plazo.
        this.highScoreKey = 'caseToolsTriviaHighScore';
        this.highScore = parseFloat(localStorage.getItem(this.highScoreKey)) || 0;

        this.cacheDOM();
        this.bindEvents();
        this.updateHighScoreUI();
    }

    cacheDOM() {
        this.screens = {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            end: document.getElementById('end-screen')
        };
        
        this.ui = {
            gameCard: document.getElementById('game-card'),
            questionContainer: document.getElementById('question-container'),
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),
            questionCounter: document.getElementById('question-counter'),
            scoreDisplay: document.getElementById('score-display'),
            multiplierDisplay: document.getElementById('multiplier-display'),
            progressFill: document.getElementById('progress-fill'),
            finalScore: document.getElementById('final-score'),
            feedbackText: document.getElementById('feedback-text'),
            bestScoreStart: document.getElementById('best-score-start'),
            bestScoreEnd: document.getElementById('best-score-end'),
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

    updateHighScoreUI() {
        this.ui.bestScoreStart.textContent = this.highScore.toFixed(1);
        this.ui.bestScoreEnd.textContent = this.highScore.toFixed(1);
    }

    startGame() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.streakCount = 0;
        this.multiplier = 1.0;
        
        this.updateScoreDisplay();
        this.switchScreen('game');
        
        // Asegurar que la tarjeta principal no tenga clases residuales
        this.resetAnimations();
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

        // Revelar contenedor de pregunta suavemente
        this.ui.questionContainer.classList.add('fade-in');
        
        setTimeout(() => {
            this.ui.questionContainer.classList.remove('fade-in');
            this.isAcceptingAnswers = true;
        }, 300);
    }

    /**
     * Lógica de evaluación.
     * Computa las mecánicas de Racha y Multiplicador.
     * Coordina las animaciones de feedback positivo (brillo) y negativo (caída).
     */
    handleAnswer(event) {
        if (!this.isAcceptingAnswers) return;
        this.isAcceptingAnswers = false;

        const selectedButton = event.target;
        const selectedAnswer = parseInt(selectedButton.dataset.index, 10);
        const currentQuestion = this.questions[this.currentQuestionIndex];
        
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        const basePoints = 10;

        if (isCorrect) {
            selectedButton.classList.add('correct');
            
            // Lógica de incremento y multiplicador
            this.streakCount++;
            this.multiplier = Math.min(2.5, this.multiplier + 0.2);
            this.score += (basePoints * this.multiplier);
            
            this.ui.gameCard.classList.add('shine-up');
        } else {
            selectedButton.classList.add('incorrect');
            const buttons = this.ui.optionsContainer.querySelectorAll('.btn.option');
            buttons[currentQuestion.correctAnswer].classList.add('correct');
            
            // Lógica de penalización
            this.streakCount = 0;
            this.multiplier = Math.max(1.0, this.multiplier - 0.4);
            
            this.ui.gameCard.classList.add('shake-and-fall');
        }

        this.updateScoreDisplay();

        // Orquestación asíncrona de transición entre preguntas
        const animationDuration = isCorrect ? 800 : 800; // Sincronizado con variables.css

        setTimeout(() => {
            if (isCorrect) {
                // Si es correcta, aplicamos desvanecimiento gradual a la pregunta actual
                this.ui.questionContainer.classList.add('fade-out');
                setTimeout(() => this.prepareNextTurn(), 300);
            } else {
                // Si cayó al vacío, simplemente preparamos el siguiente turno y limpiamos la caída
                this.prepareNextTurn();
            }
        }, animationDuration);
    }

    prepareNextTurn() {
        this.resetAnimations();
        this.currentQuestionIndex++;
        this.loadNextQuestion();
    }

    resetAnimations() {
        this.ui.gameCard.classList.remove('shine-up', 'shake-and-fall');
        this.ui.questionContainer.classList.remove('fade-out', 'fade-in');
    }

    updateProgress() {
        const questionNumber = this.currentQuestionIndex + 1;
        const totalQuestions = this.questions.length;
        
        this.ui.questionCounter.textContent = `Pregunta ${questionNumber} / ${totalQuestions}`;
        
        const progressPercentage = ((questionNumber - 1) / totalQuestions) * 100;
        this.ui.progressFill.style.width = `${progressPercentage}%`;
    }

    /**
     * Sincroniza la UI del HUD para reflejar estado de puntaje, racha y multiplicadores
     */
    updateScoreDisplay() {
        this.ui.scoreDisplay.textContent = `${this.score.toFixed(1)} pts`;
        
        if (this.streakCount >= 3) {
            this.ui.scoreDisplay.classList.add('streak-active');
        } else {
            this.ui.scoreDisplay.classList.remove('streak-active');
        }

        if (this.multiplier > 1.0) {
            this.ui.multiplierDisplay.textContent = `x${this.multiplier.toFixed(1)}`;
            this.ui.multiplierDisplay.classList.remove('hidden');
        } else {
            this.ui.multiplierDisplay.classList.add('hidden');
        }
    }

    endGame() {
        this.switchScreen('end');
        this.ui.finalScore.textContent = this.score.toFixed(1);
        
        // Evaluar y registrar la máxima puntuación
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem(this.highScoreKey, this.highScore);
            this.updateHighScoreUI();
        }
        
        const maxScoreBase = this.questions.length * 10;
        const percentage = (this.score / maxScoreBase) * 100;
        
        if (percentage >= 150) {
            this.ui.feedbackText.textContent = "¡Sobresaliente! Tu racha multiplicadora destrozó los límites.";
        } else if (percentage >= 100) {
            this.ui.feedbackText.textContent = "¡Excelente! Eres un experto en herramientas CASE.";
        } else if (percentage >= 60) {
            this.ui.feedbackText.textContent = "Buen trabajo, tienes un sólido entendimiento de ingeniería de software.";
        } else {
            this.ui.feedbackText.textContent = "Sigue repasando las clasificaciones de las herramientas CASE.";
        }
    }
}