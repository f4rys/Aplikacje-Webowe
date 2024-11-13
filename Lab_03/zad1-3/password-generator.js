document
  .getElementById("generatePassword")
  .addEventListener("click", function () {
    const minLength = parseInt(document.getElementById("minLength").value);
    const maxLength = parseInt(document.getElementById("maxLength").value);
    const includeUppercase =
      document.getElementById("includeUppercase").checked;
    const includeSpecialChars = document.getElementById(
      "includeSpecialChars"
    ).checked;

    if (isNaN(minLength) || isNaN(maxLength)) {
      alert("Podane wartości nie są liczbami.");
      return;
    }

    if (minLength < 1 || maxLength < 1) {
      alert("Długość hasła nie może być mniejsza niż 1.");
      return;
    }

    if (minLength > maxLength) {
      alert(
        "Minimalna długość hasła nie może być większa od maksymalnej długości hasła."
      );
      return;
    }

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let allChars = lowercaseChars;
    if (includeUppercase) {
      allChars += uppercaseChars;
    }
    if (includeSpecialChars) {
      allChars += specialChars;
    }

    const passwordLength =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }

    alert("Wygenerowane hasło: " + password);
  });
