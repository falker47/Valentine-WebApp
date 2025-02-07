document.addEventListener('DOMContentLoaded', () => {
    // Funzione per formattare il numero con separatore delle migliaia (apostrofo)
    function formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    }
  
    // Pre-carica tutte le immagini
    const imagePaths = [
      'images/start.jpg',
      'images/cellule.jpg',
      'images/sabbia.jpg',
      'images/stelle.jpg',
      'images/prime.jpg',
      'images/amore.jpg',
      'images/end.jpg'
    ];
    imagePaths.forEach(path => {
      const img = new Image();
      img.src = path;
    });
  
    // Riferimenti agli elementi DOM
    const nextButton  = document.getElementById('nextButton');
    const prevButton  = document.getElementById('prevButton'); // Nuovo pulsante "Indietro"
    const stepDisplay = document.getElementById('stepDisplay');
    const title       = document.getElementById('title');
    const description = document.getElementById('description');
  
    // Definizione degli step intermedi
    const steps = [
      {
        label: 'Cellule nel corpo umano',
        exponent: 13,  // approssimativamente 10^13
        image: 'images/cellule.jpg'
      },
      {
        label: 'Stelle nell\'universo',
        exponent: 23,  // approssimativamente 10^23
        image: 'images/stelle.jpg'
      },
      {
        label: 'Granelli di sabbia nel mondo',
        exponent: 37,  // approssimativamente 10^37
        image: 'images/sabbia.jpg'
      },
      {
        label: 'Amore che provo per te',
        exponent: 0,  // verrà aggiornato dinamicamente
        image: 'images/amore.jpg'
      }
    ];
  
    /* Stato:
         - currentStep da 0 a steps.length-1 → step intermedi
         - currentStep = steps.length → stato finale (immagine di end)
         - currentStep > steps.length → reset
       Inizialmente mostriamo l'immagine di start e impostiamo currentStep = 0.
       NOTA: currentStep indica l'indice del passo *successivo* da mostrare.
    */
    let currentStep = 0;
    let dynamicInterval = null;
  
    // Mostra subito l'immagine di start al caricamento della pagina
    showSpecialStep(
      'images/start.jpg',
      'Quanto ti amo?',
      'Ecco le tappe del nostro viaggio!',
      'Successivo'
    );
  
    // Gestione del pulsante "Avanti"
    nextButton.addEventListener('click', () => {
      // Applica animazione fade-out se necessario
      if (stepDisplay.classList.contains('fade-in')) {
        stepDisplay.classList.remove('fade-in');
        stepDisplay.classList.add('fade-out');
        setTimeout(() => {
          stepDisplay.classList.remove('fade-out');
          updateStep();
        }, 800);
      } else {
        updateStep();
      }
    });
  
    // Gestione del pulsante "Indietro"
    prevButton.addEventListener('click', () => {
      prevStep();
    });
  
    function updateStep() {
      // Ferma eventuali aggiornamenti dinamici
      if (dynamicInterval) {
        clearInterval(dynamicInterval);
        dynamicInterval = null;
      }
  
      if (currentStep < steps.length) {
        // Mostra lo step corrente (step intermedi)
        showStep(steps[currentStep]);
        currentStep++;
        if (currentStep === steps.length) {
          nextButton.textContent = 'Fine';
        } else {
          nextButton.textContent = 'Successivo';
        }
        updateButtonVisibility();
      } else if (currentStep === steps.length) {
        // Stato finale: mostra l'immagine "end"
        showSpecialStep(
          'images/end.jpg',
          'Grazie per aver viaggiato con me!',
          'Il nostro amore è infinito.',
          'Ricomincia'
        );
        currentStep++;
        prevButton.style.display = 'none';
      } else {
        // Reset della sequenza
        resetSequence();
      }
    }
  
    function prevStep() {
      // Se siamo già oltre il primo step intermedio, possiamo tornare indietro
      if (currentStep > 1) {
        if (dynamicInterval) {
          clearInterval(dynamicInterval);
          dynamicInterval = null;
        }
        // Poiché currentStep è incrementato dopo aver mostrato uno step, per tornare indietro sottraiamo 2
        currentStep -= 2;
        updateStep();
      }
    }
  
    function updateButtonVisibility() {
      // Il passo attualmente visualizzato è (currentStep - 1)
      const displayedIndex = currentStep - 1;
      // Mostra il pulsante "Indietro" solo se siamo oltre il primo step intermedio
      if (displayedIndex > 0 && displayedIndex < steps.length - 1) {
        prevButton.style.display = 'inline-block';
      } else {
        prevButton.style.display = 'none';
      }
    }
  
    function showStep(step) {
      // Ferma eventuali aggiornamenti dinamici precedenti
      if (dynamicInterval) {
        clearInterval(dynamicInterval);
        dynamicInterval = null;
      }
  
      const stepData = document.createElement('div');
      stepData.classList.add('step-data');
  
      const stepText = document.createElement('div');
      stepText.classList.add('step-text');
  
      // Se lo step è quello dinamico, aggiorna l'esponente ogni secondo
      if (step.label === 'Amore che provo per te') {
        function updateDynamicExponent() {
          // Data di riferimento: 29/08/2024 ore 12:00 (formato ISO)
          const targetDate = new Date('2024-08-29T12:00:00');
          const now = new Date();
          const diffSeconds = Math.floor((now - targetDate) / 1000);
          stepText.innerHTML = `<strong>${step.label}:</strong> 10<sup>${formatNumber(diffSeconds)}</sup>`;
        }
        updateDynamicExponent(); // Imposta subito il valore iniziale
        dynamicInterval = setInterval(updateDynamicExponent, 1000);
      } else {
        stepText.innerHTML = `<strong>${step.label}:</strong> 10<sup>${formatNumber(step.exponent)}</sup>`;
      }
      stepData.appendChild(stepText);
  
      if (step.image) {
        const stepImage = document.createElement('div');
        stepImage.classList.add('step-image');
        const img = document.createElement('img');
        img.src = step.image;
        img.alt = step.label;
        stepImage.appendChild(img);
        stepData.appendChild(stepImage);
      }
  
      stepDisplay.innerHTML = '';
      stepDisplay.appendChild(stepData);
      stepDisplay.classList.add('fade-in');
    }
  
    function showSpecialStep(imagePath, newTitle, newDescription, newButtonText) {
      // Ferma eventuali intervalli dinamici
      if (dynamicInterval) {
        clearInterval(dynamicInterval);
        dynamicInterval = null;
      }
  
      const specialData = document.createElement('div');
      specialData.classList.add('step-data');
  
      const specialImage = document.createElement('div');
      specialImage.classList.add('step-image');
      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = newTitle;
      specialImage.appendChild(img);
      specialData.appendChild(specialImage);
  
      stepDisplay.innerHTML = '';
      stepDisplay.appendChild(specialData);
      stepDisplay.classList.add('fade-in');
  
      title.textContent = newTitle;
      description.textContent = newDescription;
      nextButton.textContent = newButtonText;
      // Durante gli step speciali (start ed end) nascondiamo il pulsante "Indietro"
      prevButton.style.display = 'none';
    }
  
    function resetSequence() {
      if (dynamicInterval) {
        clearInterval(dynamicInterval);
        dynamicInterval = null;
      }
      currentStep = 0;
      stepDisplay.innerHTML = '';
      title.textContent = 'Quanto ti amo?';
      description.innerHTML = 'Ho provato a quantificarlo, ed è stato un lungo viaggio.<br>Ti va di percorrere le tappe più importanti con me?';
      nextButton.textContent = 'Inizia il viaggio!';
      prevButton.style.display = 'none';
      showSpecialStep(
        'images/start.jpg',
        'Quanto ti amo?',
        'Ecco le tappe del nostro viaggio!',
        'Successivo'
      );
    }
  });
  