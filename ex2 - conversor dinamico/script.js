const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");


function celsiusToFahrenheit(valor) {
      const campo = document.getElementById('fahrenheit');
      if (valor === '') { campo.value = ''; return; }
      campo.value = ((parseFloat(valor) * 9/5) + 32).toFixed(2);
    }

    function fahrenheitToCelsius(valor) {
      const campo = document.getElementById('celsius');
      if (valor === '') { campo.value = ''; return; }
      campo.value = ((parseFloat(valor) - 32) * 5/9).toFixed(2);
    }