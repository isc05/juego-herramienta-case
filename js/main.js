/**
 * Punto de entrada de la aplicación (Entry point).
 * Se encarga de importar las dependencias, instanciar la lógica de negocio
 * e iniciar el ciclo de vida del juego al cargar el documento.
 */
import { caseToolsQuestions } from './data.js';
import { TriviaGame } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new TriviaGame(caseToolsQuestions);
});