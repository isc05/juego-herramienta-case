/**
 * Módulo de datos estáticos.
 * Mantiene la separación de intereses al extraer la información del dominio (preguntas)
 * de la lógica de presentación y del motor del juego.
 */
export const caseToolsQuestions = [
    {
        question: "¿Qué tipo de herramienta CASE se enfoca en las fases iniciales del ciclo de vida (Planificación, Análisis y Diseño)?",
        options: ["Upper CASE", "Lower CASE", "Integrated CASE", "Maintenance CASE"],
        correctAnswer: 0
    },
    {
        question: "¿Cuál de los siguientes es un ejemplo clásico de una herramienta Upper CASE?",
        options: ["Git", "Erwin Data Modeler", "JUnit", "Eclipse IDE"],
        correctAnswer: 1
    },
    {
        question: "Las herramientas Lower CASE se utilizan principalmente para...",
        options: ["Recolección de requisitos", "Diseño de diagramas UML", "Generación de código, pruebas y despliegue", "Gestión financiera del proyecto"],
        correctAnswer: 2
    },
    {
        question: "Un ejemplo de herramienta Lower CASE (focalizada en implementación/pruebas) es:",
        options: ["Microsoft Visio", "Rational RequisitePro", "Enterprise Architect", "Selenium"],
        correctAnswer: 3
    },
    {
        question: "¿Qué significa el acrónimo I-CASE (Integrated CASE)?",
        options: ["Herramientas exclusivas para bases de datos", "Herramientas que cubren todo el ciclo de vida del software", "Herramientas de pruebas integradas", "Herramientas de inteligencia artificial"],
        correctAnswer: 1
    },
    {
        question: "Un ejemplo representativo de una herramienta I-CASE (Integrated CASE) es:",
        options: ["Postman", "Figma", "Enterprise Architect", "Jenkins"],
        correctAnswer: 2
    }
];