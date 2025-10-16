const form = document.getElementById("form-endereco");
const cep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const numero = document.getElementById("numero");
const uf = document.getElementById("uf");

cep.addEventListener("input", () => {
  const digits = cep.value.replace(/\D/g, "").slice(0, 8);
  const masked = digits.replace(/^(\d{5})(\d{0,3}).*$/, (_, a, b) => (b ? `${a}-${b}` : a));
  const pos = cep.selectionStart;
  const before = cep.value;
  cep.value = masked;
  if (document.activeElement === cep) {
    const delta = masked.length - before.length;
    cep.setSelectionRange(Math.max(0, (pos || masked.length) + delta), Math.max(0, (pos || masked.length) + delta));
  }
});

uf.addEventListener("input", () => {
  uf.value = uf.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
});

numero.addEventListener("input", () => {
  numero.value = numero.value.replace(/\D/g, "");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const errors = [];

  const cepOk = /^\d{5}-\d{3}$/.test(cep.value);
  if (!cepOk) errors.push("CEP inválido. Use o formato 00000-000.");

  const logOk = typeof logradouro.value === "string" && logradouro.value.trim().length >= 5;
  if (!logOk) errors.push("Logradouro deve conter no mínimo 5 caracteres.");

  const numOk = /^\d+$/.test(numero.value);
  if (!numOk) errors.push("Número deve conter apenas dígitos.");

  const ufOk = /^[A-Z]{2}$/.test(uf.value);
  if (!ufOk) errors.push("UF deve conter exatamente 2 letras maiúsculas, ex: SP, RJ.");

  if (errors.length) {
    alert(errors[0]);
    return;
  }

  alert("Endereço cadastrado com sucesso");
});
