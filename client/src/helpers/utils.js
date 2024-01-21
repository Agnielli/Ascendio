export const textSensitive = (text, text2) => {
  return text
    .toUpperCase()
    .normalize("NFD") //unicode
    .replace(/[\u0300-\u036f]/g, "") //expresion regular
    .includes(
      text2
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );
};
