/* MI BOLSILLO · Seis calculadoras financieras */
(() => {
  "use strict";
  const form = document.querySelector("[data-calculator]");
  if (!form) return;

  const type = form.dataset.calculator;
  const resultBox = document.getElementById("calculator-result");
  const errorBox = document.getElementById("calculator-error");
  const euro = new Intl.NumberFormat("es-ES", { style:"currency", currency:"EUR", maximumFractionDigits:2 });
  const number = id => Number(document.getElementById(id)?.value);
  const field = id => document.getElementById(id);
  const validNonNegative = value => Number.isFinite(value) && value >= 0;
  const money = value => euro.format(value);
  const showError = message => {
    errorBox.textContent = message;
    errorBox.hidden = false;
    resultBox.hidden = true;
  };
  const showResult = html => {
    errorBox.hidden = true;
    resultBox.innerHTML = html;
    resultBox.hidden = false;
    resultBox.scrollIntoView({behavior:"smooth", block:"nearest"});
  };
  const item = (label, value) => `<div class="result-item"><span>${label}</span><strong>${value}</strong></div>`;
  const highlight = (label, value) => `<h2>${label}</h2><p class="result-highlight">${value}</p>`;
  const readRequired = (ids, positiveIds=[]) => {
    const values = {};
    for (const id of ids) {
      const el = field(id);
      const v = Number(el?.value);
      if (!el || !Number.isFinite(v) || v < 0 || (positiveIds.includes(id) && v <= 0)) {
        throw new Error("Revisa los campos: introduce cantidades válidas y no negativas. Los campos indicados como obligatorios deben ser mayores que cero.");
      }
      values[id] = v;
    }
    return values;
  };

  const calculations = {
    savings() {
      const v = readRequired(["initial-savings","monthly-savings","savings-years"]);
      if (v["savings-years"] <= 0 || v["savings-years"] > 80) throw new Error("La duración debe ser mayor que cero y no superar 80 años.");
      const months = Math.round(v["savings-years"] * 12);
      const contributions = v["monthly-savings"] * months;
      const total = v["initial-savings"] + contributions;
      return highlight("Tu ahorro estimado al final del periodo",money(total)) +
        '<div class="result-grid">' +
        item("Ahorro inicial",money(v["initial-savings"])) +
        item("Aportaciones acumuladas",money(contributions)) +
        item("Duración",months + " meses") +
        item("Aportación mensual",money(v["monthly-savings"])) +
        '</div><p class="result-note">Cálculo sin intereses, comisiones ni inflación. El periodo se redondea al mes más cercano.</p>';
    },

    compound() {
      const v = readRequired(["compound-initial","compound-monthly","compound-years"]);
      const rate = number("compound-rate");
      if (!Number.isFinite(rate) || rate < -99 || rate > 100) throw new Error("La tasa anual debe estar entre -99 % y 100 %.");
      const years = v["compound-years"];
      if (years <= 0 || years > 80) throw new Error("La duración debe ser mayor que cero y no superar 80 años.");
      const months = Math.round(years * 12);
      const monthlyRate = rate / 100 / 12;
      let futureInitial, futureContributions;
      if (Math.abs(monthlyRate) < 1e-12) {
        futureInitial = v["compound-initial"];
        futureContributions = v["compound-monthly"] * months;
      } else {
        const factor = Math.pow(1 + monthlyRate, months);
        futureInitial = v["compound-initial"] * factor;
        futureContributions = v["compound-monthly"] * ((factor - 1) / monthlyRate);
      }
      const total = futureInitial + futureContributions;
      const contributed = v["compound-initial"] + v["compound-monthly"] * months;
      const difference = total - contributed;
      return highlight("Valor final estimado",money(total)) +
        '<div class="result-grid">' +
        item("Capital aportado",money(contributed)) +
        item("Rendimiento matemático",money(difference)) +
        item("Aportaciones mensuales",money(v["compound-monthly"])) +
        item("Periodo",months + " meses") +
        '</div><p class="result-note">Hipótesis: tasa nominal anual constante dividida entre 12, capitalización mensual y aportaciones al final de cada mes. El rendimiento puede ser negativo. No incluye impuestos, comisiones ni inflación y no predice resultados reales.</p>';
    },

    rule() {
      const v = readRequired(["rule-income"]);
      const income = v["rule-income"];
      const needs = income * .50;
      const wants = income * .30;
      const savings = income * .20;
      return highlight("Distribución orientativa de tus ingresos",money(income)) +
        '<div class="result-bar" role="img" aria-label="50 por ciento necesidades, 30 por ciento deseos y 20 por ciento ahorro">' +
        '<span style="width:50%;background:#4A8B70"></span><span style="width:30%;background:#D4A85B"></span><span style="width:20%;background:#7799BC"></span></div>' +
        '<div class="result-grid">' +
        item("50 % · Necesidades",money(needs)) +
        item("30 % · Deseos",money(wants)) +
        item("20 % · Ahorro y objetivos",money(savings)) +
        item("Ahorro orientativo anual",money(savings*12)) +
        '</div><p class="result-note">La regla es una guía flexible. Ajusta los porcentajes a tus gastos, responsabilidades y objetivos reales.</p>';
    },

    loan() {
      const v = readRequired(["loan-principal","loan-years"],["loan-principal","loan-years"]);
      const rate = number("loan-rate");
      if (!Number.isFinite(rate) || rate < 0 || rate > 100) throw new Error("El tipo anual debe estar entre 0 % y 100 %.");
      const months = Math.round(v["loan-years"] * 12);
      if (months < 1 || months > 480) throw new Error("El plazo debe estar entre 1 y 40 años.");
      const monthlyRate = rate / 100 / 12;
      const payment = monthlyRate === 0
        ? v["loan-principal"] / months
        : v["loan-principal"] * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
      const total = payment * months;
      const interest = total - v["loan-principal"];
      return highlight("Cuota mensual estimada",money(payment)) +
        '<div class="result-grid">' +
        item("Capital solicitado",money(v["loan-principal"])) +
        item("Total de cuotas",money(total)) +
        item("Intereses estimados",money(interest)) +
        item("Número de cuotas",String(months)) +
        '</div><p class="result-note">Sistema francés con cuotas mensuales constantes y tipo nominal anual dividido entre 12. No incluye comisiones, seguros, vinculaciones, impuestos ni otros gastos. No es una TAE ni una oferta de crédito.</p>';
    },

    emergency() {
      const v = readRequired(["emergency-expenses","emergency-current"]);
      const months = Number(field("emergency-months").value);
      if (!Number.isInteger(months) || months < 1 || months > 24) throw new Error("Selecciona un número de meses válido.");
      const target = v["emergency-expenses"] * months;
      const gap = Math.max(0,target-v["emergency-current"]);
      const surplus = Math.max(0,v["emergency-current"]-target);
      const progress = target > 0 ? Math.min(100,v["emergency-current"]/target*100) : (v["emergency-current"] > 0 ? 100 : 0);
      return highlight("Objetivo de tu fondo de emergencia",money(target)) +
        '<div class="result-bar" role="img" aria-label="Progreso del fondo: ' + progress.toFixed(0) + ' por ciento"><span style="width:' + progress + '%;background:#4A8B70"></span></div>' +
        '<div class="result-grid">' +
        item("Ahorro actual",money(v["emergency-current"])) +
        item("Te falta ahorrar",money(gap)) +
        item("Cobertura elegida",months + " meses") +
        item("Por encima del objetivo",money(surplus)) +
        '</div><p class="result-note">El objetivo se calcula multiplicando tus gastos esenciales por los meses elegidos. La cantidad apropiada depende de tu situación personal.</p>';
    },

    budget() {
      const ids = ["budget-income","budget-housing","budget-bills","budget-food","budget-transport","budget-debt","budget-leisure","budget-other"];
      const v = readRequired(ids);
      const income = v["budget-income"];
      const categories = [
        ["Vivienda",v["budget-housing"]],
        ["Suministros y comunicaciones",v["budget-bills"]],
        ["Alimentación",v["budget-food"]],
        ["Transporte",v["budget-transport"]],
        ["Deudas y préstamos",v["budget-debt"]],
        ["Ocio y compras",v["budget-leisure"]],
        ["Otros gastos",v["budget-other"]]
      ];
      const total = categories.reduce((sum,c)=>sum+c[1],0);
      const balance = income-total;
      const ratio = income > 0 ? total/income*100 : 0;
      const details = categories.map(([name,value]) => item(name, money(value) + (income>0 ? " · " + (value/income*100).toFixed(1).replace(".",",") + "%" : ""))).join("");
      return highlight(balance >= 0 ? "Dinero restante estimado" : "Déficit mensual estimado",money(balance)) +
        '<div class="result-grid">' +
        item("Ingresos netos",money(income)) +
        item("Total de gastos",money(total)) +
        item("Porcentaje de ingresos gastado",ratio.toFixed(1).replace(".",",") + " %") +
        item("Saldo anual si se repite",money(balance*12)) +
        '</div><h2 style="margin-top:20px">Desglose de gastos</h2><div class="result-grid">' + details + '</div>' +
        '<p class="result-note">No olvides incluir gastos anuales, imprevistos y objetivos de ahorro. Si tus ingresos son cero, el porcentaje gastado no se calcula.</p>';
    }
  };

  form.addEventListener("submit", event => {
    event.preventDefault();
    try {
      const calculate = calculations[type];
      if (!calculate) throw new Error("No se ha encontrado el tipo de calculadora.");
      showResult(calculate());
    } catch (error) {
      showError(error instanceof Error ? error.message : "No se pudo realizar el cálculo. Revisa los datos.");
    }
  });

  // Calcula con los valores de ejemplo al abrir la página.
  form.requestSubmit();
})();
