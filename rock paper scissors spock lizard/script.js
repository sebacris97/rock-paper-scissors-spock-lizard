    class Eleccion {
      constructor(nombre) {
        this.nombre = nombre.toLowerCase();
        this.vencedores = new Set();
      }

      addVencedor(eleccion) {
        if (this.equals(eleccion)) return false;
        this.vencedores.add(eleccion);
        return true;
      }

      resultado(e) {
        if (this.perdi(e)) return "DERROTA 😢";
        if (this.gane(e)) return "VICTORIA 🎉";
        return "EMPATE 😐";
      }

      gane(e) {
        return !this.empate(e) && !this.perdi(e);
      }

      perdi(e) {
        return [...this.vencedores].some(v => v.equals(e));
      }

      empate(e) {
        return this.nombre === e.nombre;
      }

      equals(other) {
        return this.nombre === other.nombre;
      }

      toString() {
        return this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
      }
    }

    const piedra = new Eleccion("piedra");
    const papel = new Eleccion("papel");
    const tijera = new Eleccion("tijera");
    const lagarto = new Eleccion("lagarto");
    const spock = new Eleccion("spock");

    piedra.addVencedor(tijera);
    piedra.addVencedor(lagarto);

    papel.addVencedor(piedra);
    papel.addVencedor(spock);

    tijera.addVencedor(papel);
    tijera.addVencedor(lagarto);

    lagarto.addVencedor(spock);
    lagarto.addVencedor(papel);

    spock.addVencedor(tijera);
    spock.addVencedor(piedra);

    const elecciones = { piedra, papel, tijera, lagarto, spock };

    let victorias = 0, derrotas = 0, empates = 0;

    function jugar(nombreJugador) {
      const jugador = elecciones[nombreJugador];
      const opciones = Object.values(elecciones);
      const aleatoria = opciones[Math.floor(Math.random() * opciones.length)];
      const resultado = jugador.resultado(aleatoria);

      let mensaje = `
        <p>Elegiste: <strong>${jugador.toString()}</strong></p>
        <p>Computadora eligió: <strong>${aleatoria.toString()}</strong></p>
        <p>Resultado: <strong>${resultado}</strong></p>
      `;
      document.getElementById("resultado").innerHTML = mensaje;

      // Actualizar contador
      if (resultado.includes("VICTORIA")) {
        victorias++;
        document.getElementById("sound-win").play();
      } else if (resultado.includes("DERROTA")) {
        derrotas++;
        document.getElementById("sound-lose").play();
      } else {
        empates++;
        document.getElementById("sound-draw").play();
      }

      actualizarContador();
    }

    function actualizarContador() {
      document.getElementById("victorias").textContent = victorias;
      document.getElementById("derrotas").textContent = derrotas;
      document.getElementById("empates").textContent = empates;
    }

    function reiniciarContador() {
      victorias = derrotas = empates = 0;
      actualizarContador();
      document.getElementById("resultado").innerHTML = "<p>Contador reiniciado.</p>";
    }