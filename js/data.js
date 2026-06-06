/* ============================================================
   CONTENIDO DE ESTUDIO — Redes Informáticas y Comunicación
   IES N.º 6023 "Dr. Alfredo Loutaif" · Orán · 2do año
   Basado en Kurose & Ross (Caps. 1 y 2) y en los TP de la cátedra.
   Cada unidad: { id, glyph, icon, title, desc, tool?, html, quiz, cards }
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.units = [

/* ===================================================================
   UNIDAD 1 — INTRODUCCIÓN A LAS REDES
   =================================================================== */
{
  id: "redes",
  glyph: "⇄",
  icon: "net",
  title: "Introducción a las Redes",
  desc: "Internet, sistemas terminales, ISP, acceso, conmutación, retardos y throughput.",
  tool: "retardos",
  html: `
    <p class="lead">Una <strong>red de computadoras</strong> es un conjunto de dispositivos interconectados que intercambian datos siguiendo <strong>protocolos</strong>. Internet es "la red de redes": millones de redes enlazadas a escala mundial.</p>

    <div class="callout def">
      <strong class="callout__tag">Definición</strong>
      Un <strong>protocolo</strong> define el <em>formato</em> y el <em>orden</em> de los mensajes intercambiados entre dos o más entidades, y las <em>acciones</em> que se toman al enviar o recibir un mensaje. Son las "reglas" para que dos dispositivos se entiendan.
    </div>

    <h2>El borde de la red: sistemas terminales</h2>
    <p>Los <strong>sistemas terminales</strong> (o <em>hosts</em>) están en el "borde" de Internet: PCs, celulares, servidores, sensores. Ejecutan las aplicaciones.</p>
    <ul>
      <li><strong>Host:</strong> cualquier dispositivo con dirección IP que envía o recibe datos.</li>
      <li><strong>Sistema terminal:</strong> el host usado directamente por usuarios/aplicaciones. Un <strong>servidor web es un sistema terminal</strong> (está en el extremo y responde solicitudes).</li>
      <li><strong>Cliente:</strong> <em>inicia</em> la comunicación pidiendo un servicio. <strong>Servidor:</strong> <em>espera</em> y responde. El servidor nunca solicita servicios al cliente.</li>
    </ul>

    <h3>Tecnologías de acceso</h3>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Tecnología</th><th>Velocidad típica</th><th>Tipo</th></tr></thead>
      <tbody>
        <tr><td>Módem telefónico</td><td>hasta 56 kbps</td><td>dedicada</td></tr>
        <tr><td>DSL</td><td>1 – 100 Mbps</td><td>dedicada</td></tr>
        <tr><td>HFC (cable módem)</td><td>10 Mbps – 1 Gbps</td><td><strong>compartida</strong></td></tr>
        <tr><td>FTTH (fibra al hogar)</td><td>100 Mbps – 10 Gbps</td><td>gen. dedicada</td></tr>
        <tr><td>Ethernet (empresa)</td><td>10 Mbps – 10 Gbps</td><td>compartida</td></tr>
        <tr><td>Wi-Fi / 4G-5G</td><td>variable</td><td>compartida</td></tr>
      </tbody>
    </table>
    </div>
    <p>En <strong>HFC</strong> la velocidad se comparte entre los usuarios; en el canal de descarga no hay colisiones porque la transmisión va en un solo sentido. <strong>Ethernet</strong> funciona sobre par trenzado de cobre (UTP) o fibra óptica.</p>

    <h3>Medios físicos</h3>
    <ul>
      <li><strong>Guiados:</strong> las ondas viajan por un medio sólido — par trenzado (UTP), cable coaxial, fibra óptica.</li>
      <li><strong>No guiados:</strong> se propagan por el aire — Wi-Fi, radio, microondas, satélite.</li>
    </ul>

    <h2>El núcleo de la red: conmutación</h2>
    <p>El núcleo es la malla de <strong>routers</strong> que reenvía datos entre sistemas terminales. Hay dos formas de mover datos por el núcleo:</p>

    <h3>Conmutación de circuitos</h3>
    <p>Se <strong>reserva</strong> un camino (ancho de banda) durante toda la conexión, como en la telefonía clásica.</p>
    <ul>
      <li>Ancho de banda dedicado y <strong>retardo constante</strong>; sin congestión ni pérdidas.</li>
      <li>Multiplexación <strong>FDM</strong> (bandas de frecuencia, todos a la vez) o <strong>TDM</strong> (turnos de tiempo).</li>
      <li>Desventaja de TDM: si el usuario no transmite en su turno, ese intervalo <strong>se desperdicia</strong>.</li>
    </ul>

    <h3>Conmutación de paquetes</h3>
    <p>El mensaje se parte en <strong>paquetes</strong>, cada uno con una cabecera (dirección de destino). Los routers usan esa dirección para reenviarlos.</p>
    <div class="callout def">
      <strong class="callout__tag">Store-and-forward</strong>
      Cada router debe <strong>recibir el paquete completo antes de reenviarlo</strong>. Por eso, con N enlaces de tasa R y paquete de tamaño L, el retardo de transmisión total es <strong>N · (L/R)</strong>.
    </div>
    <p>Usa <strong>multiplexación estadística</strong>: el enlace se comparte <em>dinámicamente según la demanda</em>, sin turnos fijos. Es más eficiente, pero puede haber colas y pérdidas.</p>

    <h2>Retardos en una red</h2>
    <p>El <strong>retardo nodal</strong> (en cada router) tiene cuatro componentes:</p>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Retardo</th><th>Qué es</th><th>Fórmula</th></tr></thead>
      <tbody>
        <tr><td><strong>Procesamiento</strong></td><td>examinar cabecera y decidir salida</td><td>—</td></tr>
        <tr><td><strong>Cola</strong> (espera)</td><td>esperar en el buffer; depende de la congestión <em>(único variable)</em></td><td>—</td></tr>
        <tr><td><strong>Transmisión</strong></td><td>"empujar" los bits al enlace</td><td><strong>L / R</strong></td></tr>
        <tr><td><strong>Propagación</strong></td><td>viaje del bit por el medio</td><td><strong>d / v</strong></td></tr>
      </tbody>
    </table>
    </div>
    <p>La <strong>transmisión (L/R)</strong> depende del tamaño del paquete y la tasa, <em>no</em> de la distancia. La <strong>propagación (d/v)</strong> depende de la distancia y la velocidad del medio (v ≈ 2×10⁸ m/s), <em>no</em> del tamaño.</p>

    <div class="callout tip">
      <strong class="callout__tag">Intensidad de tráfico</strong>
      La/R mide cuán cargado está un enlace. Si <strong>La/R → 1</strong> el retardo de cola se dispara; si <strong>La/R &gt; 1</strong> llega más de lo que sale y se <strong>pierden paquetes</strong>.
    </div>

    <h2>Throughput y cuello de botella</h2>
    <p>El <strong>throughput</strong> (tasa de transferencia real) en una ruta de varios enlaces lo limita el <strong>enlace más lento</strong> = <em>cuello de botella</em>.</p>
    <div class="formula-box">Ej.: enlaces de 10, 2 y 5 Mbps en serie  →  throughput = mín = 2 Mbps</div>
    <p>El <strong>RTT</strong> (Round-Trip Time) es el tiempo de ida y vuelta de un paquete pequeño; se usa para estimar el handshake de TCP o la carga de una página.</p>

    <div class="callout tip">
      <strong class="callout__tag">Practicá</strong>
      Usá la <a href="#/tool/retardos">Calculadora de retardos y throughput</a> para resolver los ejercicios numéricos de cálculo.
    </div>`,
  quiz: [
    { q: "El retardo de <strong>transmisión</strong> se calcula como…", opts: ["d / v", "L / R", "L × R", "R / L"], a: 1,
      exp: "L/R = tamaño del paquete sobre la tasa del enlace. No depende de la distancia." },
    { q: "¿Qué componente del retardo depende de la <strong>congestión</strong>?", opts: ["Procesamiento", "Transmisión", "Cola", "Propagación"], a: 2,
      exp: "El retardo de cola es el único variable: crece con el tráfico." },
    { q: "En una ruta de varios enlaces, el <strong>throughput</strong> lo limita…", opts: ["El enlace más rápido", "El enlace más lento (cuello de botella)", "El promedio", "El primer enlace"], a: 1,
      exp: "El cuello de botella es el enlace más lento de la ruta." },
    { q: "¿Qué conmutación <strong>reserva</strong> ancho de banda durante toda la conexión?", opts: ["De paquetes", "De circuitos", "Estadística", "Store-and-forward"], a: 1,
      exp: "Circuitos reserva recursos: ancho de banda dedicado y retardo constante." },
    { q: "¿Qué significa <strong>store-and-forward</strong>?", opts: ["Reenvía bit a bit mientras llegan", "Recibe el paquete completo antes de reenviarlo", "Descarta paquetes al azar", "Comprime el paquete"], a: 1,
      exp: "Debe almacenar el paquete entero y recién ahí lo reenvía; por eso suma L/R en cada nodo." },
    { q: "En <strong>HFC</strong> la velocidad de acceso es…", opts: ["Dedicada por usuario", "Compartida entre los usuarios", "Siempre de 1 Gbps fija", "Solo de subida"], a: 1,
      exp: "HFC (cable módem) comparte el medio entre los usuarios de la zona." }
  ],
  cards: [
    { q: "¿Diferencia entre host y sistema terminal? ¿Un servidor web es sistema terminal?", a: "<strong>Host:</strong> dispositivo con IP que envía/recibe datos. <strong>Sistema terminal:</strong> el host que usan directamente usuarios o apps. <strong>Sí</strong>: un servidor web es sistema terminal (está en el extremo y responde solicitudes)." },
    { q: "Componentes del retardo terminal a terminal: ¿cuáles son constantes y cuáles variables?", a: "Procesamiento, cola, transmisión y propagación. <strong>Variable:</strong> solo el de <strong>cola</strong> (depende de la congestión). Los otros tres son constantes." },
    { q: "Ventajas de conmutación de circuitos frente a paquetes", a: "Ancho de banda dedicado, retardo constante y predecible, sin congestión ni pérdidas, y QoS garantizada (ideal para voz/tiempo real)." }
  ]
},

/* ===================================================================
   UNIDAD 2 — CAPA DE APLICACIÓN
   =================================================================== */
{
  id: "aplicacion",
  glyph: "@",
  icon: "app",
  title: "Capa de Aplicación",
  desc: "Cliente-servidor y P2P, sockets, HTTP, correo, DNS y BitTorrent.",
  html: `
    <p class="lead">La <strong>capa de aplicación</strong> es donde viven los programas que usás (web, correo, mensajería). Solo se ejecuta en los <strong>sistemas terminales</strong>, no en el núcleo de la red.</p>

    <h2>Arquitecturas de aplicación</h2>
    <div class="callout def">
      <strong class="callout__tag">Atención</strong>
      La <strong>arquitectura de red</strong> es fija (las 5 capas). La <strong>arquitectura de aplicación</strong> la diseña el programador: define cómo se organiza la app sobre los hosts.
    </div>
    <ul>
      <li><strong>Cliente-servidor:</strong> un servidor siempre activo, con IP fija, atiende a los clientes (que no se hablan entre sí). Ej.: la Web. Ventaja: control centralizado. Desventaja: el servidor puede saturarse (no escala fácil).</li>
      <li><strong>P2P (par a par):</strong> los hosts se comunican directamente, sin servidor central. Ej.: BitTorrent. Ventaja: <strong>autoescalable</strong> (cada par aporta recursos). En cada sesión un par actúa de cliente y otro de servidor, pero un mismo par puede ser ambos a la vez.</li>
    </ul>

    <h2>Procesos, sockets y direccionamiento</h2>
    <p>Un <strong>socket</strong> es la "puerta" entre el proceso de aplicación y la capa de transporte: la app envía y recibe mensajes a través de él.</p>
    <div class="callout">
      <strong class="callout__tag">Identificar un proceso</strong>
      Para enviar datos a un proceso en otro host se necesitan <strong>dos datos</strong>: la <strong>dirección IP</strong> del host (identifica la máquina) y el <strong>número de puerto</strong> (identifica el proceso). Ej.: web → puerto 80, SMTP → 25, DNS → 53.
    </div>

    <h3>¿TCP o UDP?</h3>
    <p>La app elige el servicio de transporte. <strong>TCP</strong> da entrega <em>fiable</em>, control de flujo y de congestión. <strong>UDP</strong> es rápido, sin conexión ni garantías. Para una transacción lo más rápida posible conviene <strong>UDP</strong> (no hay handshake). <strong>SSL/TLS</strong> opera a nivel de aplicación: el programador incorpora la biblioteca y cifra antes de entregar a TCP.</p>

    <h2>HTTP — la Web</h2>
    <ul>
      <li><strong>No persistente:</strong> una conexión TCP por cada objeto (HTML, cada imagen). Gasta un RTT extra por objeto.</li>
      <li><strong>Persistente</strong> (por defecto en HTTP/1.1): reutiliza la misma conexión TCP para varios objetos. Menos retardo y sobrecarga.</li>
      <li><strong>Cookies:</strong> el servidor genera un ID, lo envía con <span class="cmd">Set-cookie</span>, el navegador lo guarda y lo reenvía en cada pedido → el servidor reconoce al usuario.</li>
      <li><strong>Caché web:</strong> guarda copias de objetos pedidos; si hay acierto, los entrega local (menos retardo). No reduce el retardo de <em>todos</em> los objetos, solo los que están en caché.</li>
    </ul>

    <h2>FTP — transferencia de archivos</h2>
    <div class="callout def">
      <strong class="callout__tag">"Fuera de banda"</strong>
      FTP usa <strong>dos conexiones TCP</strong>: <strong>control</strong> (puerto 21, comandos y contraseñas) y <strong>datos</strong> (puerto 20, los archivos). Como el control viaja por una conexión distinta a los datos, se dice que va "fuera de banda". HTTP, en cambio, va "dentro de banda".
    </div>

    <h2>Correo electrónico</h2>
    <ul>
      <li><strong>SMTP:</strong> <em>envía</em> el correo (cliente→servidor y entre servidores). Es de "empuje" (push).</li>
      <li><strong>POP3:</strong> el destinatario <em>descarga</em> los mensajes ("bajar y borrar" o "bajar y mantener").</li>
      <li><strong>IMAP:</strong> gestiona los mensajes <em>en el servidor</em> (carpetas, sincroniza varios dispositivos).</li>
    </ul>
    <p>Alicia (correo web) → Benito (POP3): la serie de protocolos es <strong>HTTP → SMTP → POP3</strong>.</p>

    <h2>DNS — nombres a direcciones</h2>
    <p>El <strong>DNS</strong> traduce nombres (www.ejemplo.com) a direcciones IP. Es una base de datos <strong>jerárquica y distribuida</strong>: servidores <strong>raíz</strong> → <strong>TLD</strong> (.com, .ar…) → <strong>autoritativos</strong>. Usa <strong>UDP</strong> (puerto 53) para ser rápido.</p>

    <h2>P2P y BitTorrent</h2>
    <ul>
      <li><strong>Tit-for-tat</strong> (toma y daca): cada par envía a quienes le dan a mejor velocidad.</li>
      <li><strong>Desbloqueo optimista:</strong> cada par elige al azar a otro y le envía, aunque no esté entre los mejores → así un par nuevo recibe su primer fragmento.</li>
      <li><strong>Red solapada (overlay):</strong> red lógica de pares por encima de Internet. No contiene routers; sus nodos son los propios hosts.</li>
      <li><strong>DHT:</strong> tabla hash distribuida. En malla, 1 salto pero mucho estado; circular, poco estado pero ~N/2 saltos.</li>
    </ul>`,
  quiz: [
    { q: "¿En qué puerto escucha por defecto un servidor <strong>HTTP</strong>?", opts: ["21", "25", "80", "53"], a: 2,
      exp: "HTTP usa el puerto 80 (21=FTP control, 25=SMTP, 53=DNS)." },
    { q: "¿Cuántas conexiones TCP usa <strong>FTP</strong>?", opts: ["Una sola", "Dos: control y datos", "Tres", "Ninguna, usa UDP"], a: 1,
      exp: "FTP usa 2: control (21) y datos (20). Por eso el control va 'fuera de banda'." },
    { q: "¿Qué protocolo traduce <strong>nombres de dominio</strong> a IP?", opts: ["DHCP", "DNS", "ARP", "ICMP"], a: 1,
      exp: "El DNS resuelve nombres a IP. Usa UDP, puerto 53." },
    { q: "¿Qué arquitectura de aplicación es <strong>autoescalable</strong>?", opts: ["Cliente-servidor", "P2P (par a par)", "Centralizada", "Monolítica"], a: 1,
      exp: "En P2P cada par aporta recursos, así escala con la cantidad de usuarios." },
    { q: "Para una transacción <strong>lo más rápida posible</strong> conviene…", opts: ["TCP, por ser fiable", "UDP, sin handshake ni control de congestión", "FTP", "SMTP"], a: 1,
      exp: "UDP no establece conexión: empieza a enviar de inmediato (menor retardo)." },
    { q: "¿Qué protocolo de correo deja los mensajes <strong>en el servidor</strong> y sincroniza dispositivos?", opts: ["POP3", "IMAP", "SMTP", "HTTP"], a: 1,
      exp: "IMAP gestiona los correos en el servidor; POP3 típicamente descarga y borra." },
    { q: "HTTP <strong>persistente</strong> se caracteriza por…", opts: ["Una conexión TCP por objeto", "Reutilizar la misma conexión TCP para varios objetos", "No usar TCP", "Cifrar los datos"], a: 1,
      exp: "Reutiliza la conexión: ahorra un RTT por objeto frente al no persistente." }
  ],
  cards: [
    { q: "¿Por qué FTP envía la información de control \"fuera de banda\"?", a: "Porque usa <strong>dos conexiones TCP</strong>: control (puerto 21, comandos y claves) y datos (puerto 20, archivos). El control viaja por una conexión distinta a los datos." },
    { q: "¿Qué necesita un proceso para identificar a otro proceso en otro host?", a: "La <strong>dirección IP</strong> del host (la máquina) y el <strong>número de puerto</strong> (el proceso dentro de ese host)." },
    { q: "¿Para qué sirven SMTP, POP3 e IMAP?", a: "<strong>SMTP</strong> envía el correo (push). <strong>POP3</strong> descarga al dispositivo. <strong>IMAP</strong> gestiona los mensajes en el servidor y sincroniza varios dispositivos." }
  ]
},

/* ===================================================================
   UNIDAD 3 — MODELO DE CAPAS Y ENCAPSULAMIENTO
   =================================================================== */
{
  id: "capas",
  glyph: "≡",
  icon: "layers",
  title: "Modelo de Capas y Encapsulamiento",
  desc: "Las 5 capas, unidades de datos, encapsulamiento y qué capa procesa cada dispositivo.",
  tool: "capas",
  html: `
    <p class="lead">Internet organiza la comunicación en <strong>capas</strong>: cada una resuelve una parte del problema y ofrece un servicio a la capa de arriba. El modelo de estudio (Kurose) usa <strong>5 capas</strong>.</p>

    <h2>Las cinco capas de la pila de Internet</h2>
    <div class="layer-block"><div class="lh">5 · Aplicación</div>
      <strong>Función:</strong> interfaz con el usuario; las apps generan e interpretan los datos.<br>
      <strong>Unidad (PDU):</strong> Mensaje · <strong>Dispositivo:</strong> host (PC, servidor).<br>
      <strong>Protocolos:</strong> HTTP, SMTP, FTP, DNS, POP3, IMAP, RIP.</div>
    <div class="layer-block"><div class="lh">4 · Transporte</div>
      <strong>Función:</strong> comunicación lógica <em>proceso a proceso</em> (puertos); fiabilidad, control de flujo y congestión.<br>
      <strong>Unidad:</strong> Segmento (TCP) / Datagrama (UDP) · <strong>Dispositivo:</strong> host.<br>
      <strong>Protocolos:</strong> TCP, UDP.</div>
    <div class="layer-block"><div class="lh">3 · Red</div>
      <strong>Función:</strong> lleva los datos de origen a destino entre redes; direccionamiento lógico (IP) y enrutamiento.<br>
      <strong>Unidad:</strong> Datagrama / paquete · <strong>Dispositivo:</strong> router.<br>
      <strong>Protocolos:</strong> IP, ICMP, RIP.</div>
    <div class="layer-block"><div class="lh">2 · Enlace</div>
      <strong>Función:</strong> transfiere datos entre <em>nodos vecinos</em>; acceso al medio (MAC) y detección de errores.<br>
      <strong>Unidad:</strong> Trama · <strong>Dispositivo:</strong> switch, placa de red (NIC).<br>
      <strong>Protocolos:</strong> Ethernet, Wi-Fi, ARP, PPP, Frame Relay, ATM.</div>
    <div class="layer-block"><div class="lh">1 · Física</div>
      <strong>Función:</strong> transmite los bits "crudos" por el medio (señales, voltajes).<br>
      <strong>Unidad:</strong> Bits · <strong>Dispositivo:</strong> cable, fibra, hub, repetidor.<br>
      <strong>Protocolos:</strong> medios y normas físicas (UTP, fibra, RJ-45).</div>
    <p class="muted">Las capas se numeran <strong>desde abajo</strong>: la 1 es Física (los bits) y la 5 es Aplicación (los programas).</p>

    <h2>Encapsulamiento</h2>
    <p>Al <strong>descender</strong> por las capas, cada una agrega su propia cabecera al dato de la capa superior:</p>
    <div class="formula-box">Mensaje  →  + cab. transporte = Segmento
       →  + cab. red = Datagrama
       →  + cab. enlace = Trama  →  Bits</div>
    <p>En el receptor se hace al revés (<strong>desencapsulamiento</strong>): cada capa quita su cabecera. Regla mnemotécnica: <em>Mensaje → Segmento → Datagrama → Trama → Bits</em>.</p>

    <h2>¿Qué capas procesa cada dispositivo?</h2>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Dispositivo</th><th>Capas que procesa</th></tr></thead>
      <tbody>
        <tr><td><strong>Host</strong> (PC, servidor)</td><td>las 5: aplicación, transporte, red, enlace, física</td></tr>
        <tr><td><strong>Router</strong></td><td>red, enlace y física</td></tr>
        <tr><td><strong>Switch</strong> de enlace</td><td>enlace y física</td></tr>
        <tr><td><strong>Hub / repetidor</strong></td><td>solo física</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Protocolo → capa</h2>
    <div class="tbl-wrap">
    <table class="layers">
      <tr><td class="cap">Aplicación</td><td>HTTP, SMTP, POP3, IMAP, FTP, DNS · RIP (corre sobre UDP)</td></tr>
      <tr><td class="cap">Transporte</td><td>TCP (fiable) · UDP (no fiable)</td></tr>
      <tr><td class="cap">Red</td><td>IP (direccionamiento/enrutamiento) · ICMP (control/errores)</td></tr>
      <tr><td class="cap">Enlace</td><td>Ethernet, Token Ring (LAN) · Frame Relay, ATM (WAN) · ARP (IP↔MAC)</td></tr>
    </table>
    </div>
    <div class="callout tip">
      <strong class="callout__tag">Practicá</strong>
      Poné a prueba la clasificación con el juego <a href="#/tool/capas">Protocolos por capa</a>.
    </div>

    <h2>TCP/IP vs OSI · ventajas de las capas</h2>
    <p>El modelo <strong>TCP/IP "puro" tiene 4 capas</strong> (junta enlace y física en "acceso a la red"); el de estudio usa 5. El modelo <strong>OSI</strong> tiene 7 (agrega Sesión y Presentación).</p>
    <p><strong>Ventajas</strong> de organizar en capas: simplifica el diseño, da modularidad (cambiar una capa sin tocar las demás) y facilita la estandarización. <strong>Desventaja:</strong> funciones duplicadas entre capas y sobrecarga por las cabeceras.</p>

    <h2>Las dos funciones del router</h2>
    <ul>
      <li><strong>Reenvío (forwarding):</strong> acción local y rápida — mira la IP de destino y manda el paquete por el enlace de salida correcto, según su tabla.</li>
      <li><strong>Enrutamiento (routing):</strong> determina el camino completo origen→destino, construyendo las tablas con algoritmos/protocolos (p. ej. RIP).</li>
    </ul>`,
  quiz: [
    { q: "La unidad de datos (PDU) de la <strong>capa de red</strong> se llama…", opts: ["Trama", "Segmento", "Datagrama", "Mensaje"], a: 2,
      exp: "Mensaje (aplicación) → Segmento (transporte) → Datagrama (red) → Trama (enlace)." },
    { q: "¿Qué capas procesa un <strong>router</strong>?", opts: ["Solo red", "Red, enlace y física", "Las cinco", "Enlace y física"], a: 1,
      exp: "El router opera en red, enlace y física. El host procesa las cinco." },
    { q: "¿Cuántas capas tiene el modelo <strong>TCP/IP 'puro'</strong>?", opts: ["4", "5", "6", "7"], a: 0,
      exp: "TCP/IP puro tiene 4 capas (junta enlace y física). El de estudio usa 5; OSI tiene 7." },
    { q: "Las dos funciones principales de un <strong>router</strong> son…", opts: ["Cifrar y comprimir", "Reenvío y enrutamiento", "Enviar y recibir correo", "Detección de errores y control de flujo"], a: 1,
      exp: "Reenvío (forwarding) decide la salida de cada paquete; enrutamiento (routing) arma las tablas." },
    { q: "¿En qué capa opera <strong>SSL/TLS</strong>?", opts: ["Física", "Enlace", "Aplicación", "Red"], a: 2,
      exp: "SSL/TLS opera a nivel de aplicación: el desarrollador incorpora la biblioteca." },
    { q: "La capa de <strong>enlace</strong> direcciona entre nodos vecinos usando…", opts: ["Direcciones IP", "Direcciones MAC", "Números de puerto", "Nombres de dominio"], a: 1,
      exp: "La capa de enlace usa direcciones MAC; la IP es de la capa de red." }
  ],
  cards: [
    { q: "Mensaje, segmento, datagrama y trama: ¿qué es cada uno?", a: "<strong>Mensaje</strong> (aplicación) · <strong>Segmento</strong> (transporte: + puertos) · <strong>Datagrama</strong> (red: + IP) · <strong>Trama</strong> (enlace: + MAC). Cada capa agrega su cabecera = encapsulamiento." },
    { q: "¿Qué es el encapsulamiento de datos?", a: "Al bajar por las capas, cada una agrega su cabecera: Mensaje → Segmento → Datagrama → Trama → Bits. En el receptor se quitan (desencapsulamiento)." },
    { q: "Ventajas y desventaja de organizar la red en capas", a: "<strong>Ventajas:</strong> simplifica el diseño, modularidad (cambiar una capa sin afectar otras), estandarización. <strong>Desventaja:</strong> funciones duplicadas y sobrecarga por cabeceras." }
  ]
},

/* ===================================================================
   UNIDAD 4 — SEGURIDAD EN REDES
   =================================================================== */
{
  id: "seguridad",
  glyph: "⚿",
  icon: "shield",
  title: "Seguridad en Redes",
  desc: "Malware, botnets y DDoS, sniffing, spoofing y ataques man-in-the-middle.",
  html: `
    <p class="lead">Internet no fue diseñada pensando en la seguridad. Conviene conocer las amenazas más comunes y por qué funcionan.</p>

    <h2>Malware</h2>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Tipo</th><th>Cómo se propaga</th></tr></thead>
      <tbody>
        <tr><td><strong>Virus</strong></td><td>se adjunta a archivos/programas; se propaga al <em>ejecutarlos</em>.</td></tr>
        <tr><td><strong>Gusano</strong> (worm)</td><td>se propaga <em>solo</em> por la red, sin intervención del usuario, aprovechando vulnerabilidades.</td></tr>
        <tr><td><strong>Troyano</strong></td><td>se presenta como legítimo pero oculta código malicioso que se ejecuta al instalarlo.</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Botnets y DoS / DDoS</h2>
    <div class="callout def">
      <strong class="callout__tag">Botnet</strong>
      El atacante infecta muchos dispositivos con malware y los controla remotamente sin que el usuario lo sepa (una red de "bots").
    </div>
    <ul>
      <li><strong>DoS</strong> (denegación de servicio): saturar los recursos de un servidor para dejarlo fuera de servicio.</li>
      <li><strong>DDoS</strong> (distribuido): usa la <strong>botnet</strong> para enviar tráfico masivo <em>desde muchos orígenes a la vez</em>, mucho más difícil de frenar.</li>
    </ul>

    <h2>Sniffing, spoofing y man-in-the-middle</h2>
    <ul>
      <li><strong>Packet sniffing:</strong> un dispositivo en el medio compartido "escucha" y copia todos los paquetes que pasan (útil para robar contraseñas no cifradas).</li>
      <li><strong>IP spoofing:</strong> inyectar paquetes con una <em>dirección de origen falsa</em> para suplantar a otro host.</li>
      <li><strong>Man-in-the-middle:</strong> alguien (p. ej. "Victoria") se ubica entre dos partes e intercepta/reenvía los paquetes.</li>
    </ul>
    <div class="callout warn">
      <strong class="callout__tag">MITM — daños posibles</strong>
      Interceptar datos, modificar mensajes, suplantar identidad, insertar información falsa, repetir mensajes (replay) o interrumpir la comunicación.
    </div>

    <h2>Defensas básicas</h2>
    <ul>
      <li><strong>Cifrado</strong> (SSL/TLS, HTTPS) para confidencialidad e integridad.</li>
      <li><strong>Autenticación</strong> de los extremos.</li>
      <li><strong>Firewalls</strong> y filtrado de tráfico; sistemas de detección de intrusiones.</li>
      <li>En el router hogareño (Linksys): cambiar contraseña por defecto, cifrado Wi-Fi (WPA2), filtrado MAC, desactivar SSID si hace falta.</li>
    </ul>`,
  quiz: [
    { q: "¿Qué malware se propaga <strong>solo</strong> por la red sin intervención del usuario?", opts: ["Virus", "Gusano (worm)", "Troyano", "Cookie"], a: 1,
      exp: "El gusano se propaga solo aprovechando vulnerabilidades; el virus necesita que ejecuten el archivo." },
    { q: "Una <strong>botnet</strong> es…", opts: ["Un antivirus", "Una red de dispositivos infectados controlados por el atacante", "Un protocolo de correo", "Un tipo de cable"], a: 1,
      exp: "Es una red de 'bots' (equipos infectados) que el atacante controla remotamente." },
    { q: "Un ataque <strong>DDoS</strong> se caracteriza por…", opts: ["Cifrar los archivos de la víctima", "Tráfico masivo desde muchos orígenes a la vez (botnet)", "Robar cookies", "Falsificar un correo"], a: 1,
      exp: "DDoS = denegación de servicio distribuida: usa una botnet para saturar al servidor." },
    { q: "Interceptar y reenviar paquetes entre dos partes es un ataque…", opts: ["De fuerza bruta", "Man-in-the-middle", "De phishing", "SQL injection"], a: 1,
      exp: "El atacante se ubica 'en el medio' y puede leer, modificar o suplantar mensajes." }
  ],
  cards: [
    { q: "Diferencia entre virus, gusano y troyano", a: "<strong>Virus:</strong> se adjunta a archivos y se propaga al ejecutarlos. <strong>Gusano:</strong> se propaga solo por la red. <strong>Troyano:</strong> parece legítimo pero oculta código malicioso." },
    { q: "¿Cómo se crea una botnet y cómo se usa en un DDoS?", a: "El atacante infecta muchos equipos con malware y los controla remotamente (botnet). En un <strong>DDoS</strong> usa esa botnet para enviar tráfico masivo a un servidor a la vez, saturándolo." }
  ]
}

];
