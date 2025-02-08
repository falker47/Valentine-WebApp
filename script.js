document.addEventListener('DOMContentLoaded', () => {
  // Funzione per formattare il numero con separatore delle migliaia (apostrofo)
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  }

  const THRESHOLD_DIGITS = 25; // Soglia per mostrare il numero per intero oppure un messaggio personalizzato

  // Pre-carica le immagini
  const imagePaths = [
    'images/start.jpg',
    'images/cellule.jpg',
    'images/sabbia.jpg',
    'images/stelle.jpg',
    'images/amore.jpg',
    'images/end.jpg'
  ];
  imagePaths.forEach(path => {
    const img = new Image();
    img.src = path;
  });

  // Riferimenti agli elementi DOM
  const nextButton  = document.getElementById('nextButton');
  const prevButton  = document.getElementById('prevButton');
  const stepDisplay = document.getElementById('stepDisplay');
  const title       = document.getElementById('title');  // Global title ("Quanto ti amo?")
  const bg          = document.querySelector('.bg');

  // Imposta subito il background iniziale su start.jpg
  bg.style.backgroundImage = "url('images/start.jpg')";

  /* Array degli step:
     - Lo step 0 (indice 0) è lo step iniziale merged, che contiene:
         • image: 'images/start.jpg'
         • content: il testo completo da mostrare all'apertura:
           "Ho provato a quantificarlo, ed è stato un lungo viaggio.
            Ti va di percorrere le tappe più importanti con me?"
     - Gli step successivi (indice 1,2,3,...) sono gli step numerici.
       Per ciascuno definisci:
         • label: (usato anche per il prefix)
         • exponent: il valore numerico (oppure 0 per lo step dinamico "amore che provo per te")
         • image: l'immagine da usare
         • prefix: il testo da mostrare prima della notazione scientifica
         • bigMessage (opzionale): il messaggio personalizzato da mostrare se il numero supera la soglia
  */
  const steps = [
    {
      // Step 0: merged iniziale
      label: 'iniziale',
      exponent: null,
      image: 'images/start.jpg',
      content: "Ho provato a quantificarlo, ed è stato un lungo viaggio.<br>Ti va di percorrere le tappe più importanti con me?"
    },
    {
      label: 'cellule nel corpo umano',
      exponent: 13,
      image: 'images/cellule.jpg',
      prefix: "Ti amo più di quante sono le cellule nel corpo umano: "
    },
    {
      label: 'stelle nell\'universo',
      exponent: 23,
      image: 'images/stelle.jpg',
      prefix: "Ti amo più di quante sono le stelle nell'universo: "
    },
    {
      label: 'granelli di sabbia nel mondo',
      exponent: 37,
      image: 'images/sabbia.jpg',
      prefix: "Ti amo più di quanti sono i granelli di sabbia nel mondo: ",
      bigMessage: "Se dovessi scrivere il numero su questo schermo, mi sa che straborderebbe un po'!"
    },
    {
      label: 'amore che provo per te',
      exponent: 0, // Dinamico
      image: 'images/amore.jpg',
      prefix: "Ecco esattamente quanto ti amo: ",
      bigMessage: "È davvero tanto, non trovi? Se lo scrivessi, arriverebbe da Parma a Milano!"
    }
  ];

  // Lo step speciale finale verrà mostrato quando currentStep === steps.length
  let currentStep = 0;
  let dynamicInterval = null;

  // Appena carica la web app, mostra subito lo step 0 (merged iniziale)
  showStep(steps[currentStep]);
  currentStep++; // Al primo clic su "Successivo" verrà caricato lo step 1

  nextButton.addEventListener('click', () => {
    updateStep();
  });

  prevButton.addEventListener('click', () => {
    prevStep();
  });

  // Funzione per aggiornare il background con effetto fade (solo opacità)
  // function updateBackground(newImage, callback) {
  //   bg.classList.add('fade-out');
  //   setTimeout(() => {
  //     bg.style.backgroundImage = `url(${newImage})`;
  //     bg.classList.remove('fade-out');
  //     bg.classList.add('fade-in');
  //     setTimeout(() => {
  //       bg.classList.remove('fade-in');
  //       if (callback) callback();
  //     }, 400);
  //   }, 400);
  // }
  function updateBackground(newImage, callback) {
    bg.style.backgroundImage = `url(${newImage})`;
    if (callback) callback();
  }
  

  // Funzione per creare il contenuto dello step
  // Se step.exponent è null, usa step.content direttamente.
  // Altrimenti, usa il prefisso fornito e genera la notazione scientifica e il numero per intero
  // Il "secondo rigo" viene racchiuso in un <span> con margin-top:5px per creare spaziatura.
  function createStepContent(step, prefix) {
    const stepData = document.createElement('div');
    stepData.classList.add('step-data');
    const stepText = document.createElement('div');
    stepText.classList.add('step-text');

    if (step.exponent === null) {
      // Step iniziale: usa il contenuto specificato
      stepText.innerHTML = `${step.content}`;
    } else if (step.label === 'amore che provo per te') {
      // Step dinamico: aggiorna l'esponente ogni secondo
      function updateDynamicExponent() {
        const targetDate = new Date('2024-08-29T12:00:00');
        const now = new Date();
        const diffSeconds = Math.floor((now - targetDate) / 1000);
        if ((diffSeconds + 1) <= THRESHOLD_DIGITS) {
          let fullNumber = "1" + "0".repeat(diffSeconds);
          stepText.innerHTML = `<strong>${prefix}</strong>10<sup>${formatNumber(diffSeconds)}</sup><br><span style="display:block; margin-top:25px;">${formatNumber(fullNumber)}</span>`;
        } else {
          let msg = step.bigMessage ? step.bigMessage : "Se dovessi scrivere il numero, occuperebbe un'intera pagina di testo.";
          stepText.innerHTML = `<strong>${prefix}</strong>10<sup>${formatNumber(diffSeconds)}</sup><br><span style="display:block; margin-top:25px;">${msg}</span>`;
        }
      }
      updateDynamicExponent();
      dynamicInterval = setInterval(updateDynamicExponent, 1000);
    } else {
      if ((step.exponent + 1) <= THRESHOLD_DIGITS) {
        let fullNumber = "1" + "0".repeat(step.exponent);
        stepText.innerHTML = `<strong>${prefix}</strong>10<sup>${formatNumber(step.exponent)}</sup><br><span style="display:block; margin-top:25px;">${formatNumber(fullNumber)}</span>`;
      } else {
        let msg = step.bigMessage ? step.bigMessage : "Se dovessi scrivere il numero, occuperebbe un'intera pagina di testo.";
        stepText.innerHTML = `<strong>${prefix}</strong>10<sup>${formatNumber(step.exponent)}</sup><br><span style="display:block; margin-top:25px;">${msg}</span>`;
      }
    }
    stepData.appendChild(stepText);
    stepDisplay.innerHTML = '';
    stepDisplay.appendChild(stepData);
    stepDisplay.classList.add('fade-in');
  }

  // Funzione per mostrare uno step normale
  function showStep(step) {
    if (dynamicInterval) {
      clearInterval(dynamicInterval);
      dynamicInterval = null;
    }
    if (step.image) {
      updateBackground(step.image, function() {
        // Per gli step normali, usa il prefix definito nello step
        let prefix = step.prefix || "";
        createStepContent(step, prefix);
      });
    } else {
      bg.style.backgroundImage = '';
      let prefix = step.prefix || "";
      createStepContent(step, prefix);
    }
  }

  // Funzione per mostrare lo step speciale finale
  // In questo step il contenuto interno mostra:
  // Nel box: "È stato un bel viaggio!" a capo "Il mio amore per te cresce ogni giorno, ogni secondo."
  function showSpecialStep(imagePath, specialHeader, specialSubheader, newButtonText) {
    if (dynamicInterval) {
      clearInterval(dynamicInterval);
      dynamicInterval = null;
    }
    updateBackground(imagePath, function() {
      const specialData = document.createElement('div');
      specialData.classList.add('step-data');
      specialData.style.position = 'relative';
      specialData.style.zIndex = 2;
      specialData.style.height = '100%';
      specialData.style.minHeight = '100%';
      
      const specialText = document.createElement('div');
      specialText.classList.add('step-text');
      specialText.innerHTML = `<strong>${specialHeader}</strong><br><span style="display:block; margin-top:5px;">${specialSubheader}</span>`;
      specialData.appendChild(specialText);
  
      stepDisplay.innerHTML = '';
      stepDisplay.appendChild(specialData);
      stepDisplay.classList.add('fade-in');
  
      title.textContent = "Quanto ti amo?"; // Global title rimane invariato
      nextButton.textContent = newButtonText;
      prevButton.style.display = 'none';
    });
  }

  // Funzione per aggiornare lo step corrente
  function updateStep() {
    if (dynamicInterval) {
      clearInterval(dynamicInterval);
      dynamicInterval = null;
    }
    if (currentStep < steps.length) {
      showStep(steps[currentStep]);
      currentStep++;
      nextButton.textContent = (currentStep === steps.length) ? 'Fine' : 'Successivo';
      updateButtonVisibility();
    } else if (currentStep === steps.length) {
      showSpecialStep(
        'images/end.jpg',
        'È stato un bel viaggio!',
        'Il mio amore per te cresce ogni giorno, ogni secondo.',
        'Ricomincia'
      );
      currentStep++;
      prevButton.style.display = 'none';
    } else {
      resetSequence();
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      if (dynamicInterval) {
        clearInterval(dynamicInterval);
        dynamicInterval = null;
      }
      currentStep -= 2;
      updateStep();
    }
  }

  function updateButtonVisibility() {
    const displayedIndex = currentStep - 1;
    prevButton.style.display = (displayedIndex > 0 && displayedIndex < steps.length - 1) ? 'inline-block' : 'none';
  }

  function resetSequence() {
    if (dynamicInterval) {
      clearInterval(dynamicInterval);
      dynamicInterval = null;
    }
    currentStep = 0;
    stepDisplay.innerHTML = '';
    title.textContent = 'Quanto ti amo?';
    nextButton.textContent = 'Inizia il viaggio!';
    prevButton.style.display = 'none';
    bg.style.backgroundImage = "url('images/cellule.jpg')";
    showStep(steps[currentStep]);
    currentStep++;
  }
});
