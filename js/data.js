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
        question: "¿Cuál de los siguientes software es un ejemplo representativo de una herramienta Upper CASE?",
        options: ["Enterprise Architect", "Selenium", "Eclipse", "Doxygen"],
        correctAnswer: 0
    },
    {
        question: "¿Cuál de las siguientes opciones es un ejemplo de plataforma Integrated CASE (I-CASE)?",
        options: ["OutSystems", "Postman", "Swagger", "ClickUp"],
        correctAnswer: 0
    },
    {
        question: "Si un equipo necesita extraer comentarios del código fuente para generar automáticamente la documentación del proyecto,¿qué herramienta CASE debe usar?",
        options: ["Doxygen", "Lucichart", "IDA Pro", "Asana"],
        correctAnswer: 0
    },
    {
        question: "¿En qué categoría entra un entorno como Visual Studio o PyCharm?",
        options: ["Upper CASE", "Lower CASE", "Cross-Life Cycle", "I-CASE"],
        correctAnswer: 1
    },
    {
        question: "¿A qué categoría pertenecen Selenium y JUnit?",
        options: ["Pruebas y verificación (CAST)", "Documentación automática", "Gestión de proyectos", "Ingeniería inversa"],
        correctAnswer: 0
    }
];
