// Buscamos letras a) b) c) d) e) f)
const letterPattern = /[a-f]\)/g;

// Obtenemos todo el texto visible
const text = document.body.innerText;

// Lo separamos por líneas
const lines = text.split('\n');

const resultados = [];

for (const rawLine of lines) {
  const line = rawLine.trim();
  if (!line) continue;

  let hasValidMatch = false;
  letterPattern.lastIndex = 0; // IMPORTANTE: resetear antes de cada línea

  let match;
  while ((match = letterPattern.exec(line)) !== null) {
    const idx = match.index;           // posición de la letra (a-f)
    const before = line.slice(0, idx); // texto antes de la coincidencia

    // Condición: antes de la letra NO puede haber "("
    if (!before.includes("(")) {
      hasValidMatch = true;
      break;
    }
  }

  if (hasValidMatch) {
    resultados.push(line);
  }
}

// Mostramos en consola
console.log("Líneas encontradas:", resultados.length);
console.log(resultados);

// Descargamos a un TXT
const blob = new Blob([resultados.join("\n")], { type: "text/plain" });
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "resultados_filtrados.txt";
a.click();

URL.revokeObjectURL(url);
