/* ===========================================================
   Banco de práctica — Redes (Caps. 1 y 2)
   QUIZ: opción múltiple · LAYERS: ¿qué capa? · TF: verdadero/falso
   =========================================================== */

const LAYER_OPTS = ["Aplicación", "Transporte", "Red", "Enlace"];

// ---- Opción múltiple (también se usa en el modo examen) ----
const QUIZ = [
  { q: "¿Qué tarea es responsabilidad de la <b>capa de transporte</b>?",
    options: ["Enrutar paquetes entre redes", "Comunicación proceso a proceso (puertos) y fiabilidad", "Transmitir los bits por el cable", "Traducir nombres a IP"],
    correct: 1, explain: "La capa de transporte da comunicación lógica entre procesos usando puertos; TCP agrega fiabilidad." },
  { q: "¿Cuál de estos protocolos <b>NO</b> es fiable (no garantiza la entrega)?",
    options: ["TCP", "UDP", "FTP", "HTTP"], correct: 1,
    explain: "UDP no establece conexión ni reenvía lo perdido. TCP sí es fiable." },
  { q: "¿Qué componente del retardo depende de la <b>congestión</b> de la red?",
    options: ["Procesamiento", "Transmisión", "Cola", "Propagación"], correct: 2,
    explain: "El retardo de cola es el único variable: crece cuando hay más tráfico." },
  { q: "El retardo de <b>transmisión</b> se calcula como…",
    options: ["d / v", "L / R", "L × R", "R / L"], correct: 1,
    explain: "L/R = tamaño del paquete dividido la tasa del enlace. No depende de la distancia." },
  { q: "¿En qué puerto escucha por defecto un servidor <b>HTTP</b>?",
    options: ["21", "25", "80", "53"], correct: 2,
    explain: "HTTP usa el puerto 80. (21=FTP control, 25=SMTP, 53=DNS)." },
  { q: "¿Cuántas conexiones TCP usa <b>FTP</b>?",
    options: ["Una sola", "Dos: control y datos", "Tres", "Ninguna, usa UDP"], correct: 1,
    explain: "FTP usa 2 conexiones: control (21) y datos (20). Por eso el control va 'fuera de banda'." },
  { q: "¿Qué protocolo traduce <b>nombres de dominio</b> a direcciones IP?",
    options: ["DHCP", "DNS", "ARP", "ICMP"], correct: 1,
    explain: "El DNS resuelve nombres (www.ejemplo.com) a IP. Usa UDP, puerto 53." },
  { q: "¿Qué arquitectura de aplicación es <b>autoescalable</b>?",
    options: ["Cliente-servidor", "P2P (par a par)", "Centralizada", "Monolítica"], correct: 1,
    explain: "En P2P cada par aporta recursos, así que escala con la cantidad de usuarios." },
  { q: "La unidad de datos (PDU) de la <b>capa de red</b> se llama…",
    options: ["Trama", "Segmento", "Datagrama", "Mensaje"], correct: 2,
    explain: "Mensaje (aplicación) → Segmento (transporte) → Datagrama (red) → Trama (enlace)." },
  { q: "Para identificar a un proceso en otro host se necesita…",
    options: ["Solo la dirección IP", "Solo el número de puerto", "Dirección IP + número de puerto", "La dirección MAC"], correct: 2,
    explain: "La IP identifica la máquina y el puerto identifica el proceso dentro de ella." },
  { q: "En una ruta de varios enlaces, el <b>throughput</b> lo limita…",
    options: ["El enlace más rápido", "El enlace más lento (cuello de botella)", "El promedio de los enlaces", "El primer enlace"], correct: 1,
    explain: "El cuello de botella es el enlace más lento de la ruta." },
  { q: "¿Qué protocolo de correo deja los mensajes <b>en el servidor</b> y sincroniza varios dispositivos?",
    options: ["POP3", "IMAP", "SMTP", "HTTP"], correct: 1,
    explain: "IMAP gestiona los correos en el servidor. POP3 típicamente descarga y borra." },
  { q: "¿Qué tipo de conmutación <b>reserva</b> ancho de banda durante toda la conexión?",
    options: ["Conmutación de paquetes", "Conmutación de circuitos", "Multiplexación estadística", "Store-and-forward"], correct: 1,
    explain: "Circuitos reserva recursos (ancho de banda dedicado y retardo constante)." },
  { q: "¿Cuántas capas tiene el modelo <b>TCP/IP 'puro'</b>?",
    options: ["4", "5", "6", "7"], correct: 0,
    explain: "TCP/IP puro tiene 4 capas (junta enlace y física en 'acceso a la red'). El modelo de estudio usa 5." },
  { q: "Las dos funciones principales de un <b>router</b> son…",
    options: ["Cifrar y comprimir", "Reenvío y enrutamiento", "Enviar y recibir correo", "Detección de errores y control de flujo"], correct: 1,
    explain: "Reenvío (forwarding) decide la salida de cada paquete; enrutamiento (routing) arma las tablas." },
  { q: "HTTP, SMTP, FTP y POP3 corren sobre <b>TCP</b> porque…",
    options: ["Es más rápido que UDP", "Necesitan entrega fiable y ordenada", "No usan puertos", "Son de la capa de red"], correct: 1,
    explain: "Páginas, correos y archivos deben llegar completos y sin errores: eso lo garantiza TCP." },
  { q: "¿Qué significa <b>store-and-forward</b> en un conmutador?",
    options: ["Reenvía bit a bit mientras llegan", "Recibe el paquete completo antes de reenviarlo", "Descarta paquetes al azar", "Comprime el paquete"], correct: 1,
    explain: "Debe almacenar el paquete entero y recién ahí lo reenvía; por eso suma L/R en cada nodo." },
  { q: "El retardo de <b>propagación</b> depende de…",
    options: ["El tamaño del paquete", "La distancia y la velocidad del medio (d/v)", "La tasa del enlace", "La congestión"], correct: 1,
    explain: "d/v: distancia sobre velocidad de propagación. No depende del tamaño del paquete." }
];

// ---- ¿Qué capa? (protocolo → capa) ----
const LAYERS = [
  { protocol: "HTTP", layer: "Aplicación" },
  { protocol: "SMTP", layer: "Aplicación" },
  { protocol: "POP3", layer: "Aplicación" },
  { protocol: "IMAP", layer: "Aplicación" },
  { protocol: "FTP", layer: "Aplicación" },
  { protocol: "DNS", layer: "Aplicación" },
  { protocol: "RIP", layer: "Aplicación" },
  { protocol: "TCP", layer: "Transporte" },
  { protocol: "UDP", layer: "Transporte" },
  { protocol: "IP", layer: "Red" },
  { protocol: "ICMP", layer: "Red" },
  { protocol: "ARP", layer: "Enlace" },
  { protocol: "Ethernet", layer: "Enlace" },
  { protocol: "Token Ring", layer: "Enlace" },
  { protocol: "Frame Relay", layer: "Enlace" },
  { protocol: "ATM", layer: "Enlace" }
];

// ---- Verdadero / Falso ----
const TF = [
  { statement: "UDP garantiza que todos los datos lleguen al destino.", answer: false,
    explain: "Falso: UDP no es fiable; no reenvía lo que se pierde. El fiable es TCP." },
  { statement: "El retardo de propagación depende del tamaño del paquete.", answer: false,
    explain: "Falso: depende de la distancia y la velocidad del medio (d/v), no del tamaño." },
  { statement: "En la conmutación de circuitos el ancho de banda está reservado.", answer: true,
    explain: "Verdadero: se reserva un circuito dedicado durante toda la conexión." },
  { statement: "FTP usa una sola conexión TCP para control y datos.", answer: false,
    explain: "Falso: usa dos (control en el 21 y datos en el 20)." },
  { statement: "DNS usa principalmente UDP.", answer: true,
    explain: "Verdadero: usa UDP (puerto 53) para ser más rápido." },
  { statement: "La capa de enlace usa direcciones MAC.", answer: true,
    explain: "Verdadero: la capa de enlace direcciona entre nodos vecinos con MAC." },
  { statement: "TCP no realiza control de congestión.", answer: false,
    explain: "Falso: TCP sí controla la congestión (además de flujo y errores)." },
  { statement: "En P2P un mismo par puede ser cliente y servidor a la vez.", answer: true,
    explain: "Verdadero: los roles existen por sesión, pero un par cumple ambos." },
  { statement: "El throughput de una ruta lo limita el enlace más rápido.", answer: false,
    explain: "Falso: lo limita el más lento (cuello de botella)." },
  { statement: "La caché web reduce el retardo de absolutamente todos los objetos.", answer: false,
    explain: "Falso: solo de los que están en caché; si hay fallo, igual va al servidor de origen." },
  { statement: "Un router opera en la capa de red.", answer: true,
    explain: "Verdadero: el router trabaja en red, enlace y física." },
  { statement: "HTTP persistente reutiliza la misma conexión TCP para varios objetos.", answer: true,
    explain: "Verdadero: ahorra tiempo y recursos frente al modo no persistente." },
  { statement: "El retardo de cola es el único componente variable del retardo nodal.", answer: true,
    explain: "Verdadero: depende de la congestión; los otros tres son constantes." },
  { statement: "SSL/TLS opera en la capa física.", answer: false,
    explain: "Falso: opera a nivel de aplicación (el desarrollador incorpora la biblioteca)." }
];

if (typeof module !== "undefined") { module.exports = { QUIZ, LAYERS, TF, LAYER_OPTS }; }
