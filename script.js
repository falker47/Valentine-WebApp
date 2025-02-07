document.addEventListener('DOMContentLoaded', () => {
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
  
    // Ottieni i riferimenti agli elementi nel DOM
    const nextButton  = document.getElementById('nextButton');
    const stepDisplay = document.getElementById('stepDisplay');
    const title       = document.getElementById('title');
    const description = document.getElementById('description');
  
    // Definizione degli step intermedi
    // Per "Amore che provo per te" l'esponente sarà dinamico, quindi lo impostiamo a 0 (o lasciamo placeholder)
    const steps = [
      {
        label: 'Cellule nel corpo umano',
        exponent: 13,  // approssimativamente 10^13
        image: 'images/cellule.jpg'
      },
      {
        label: 'Granelli di sabbia nel mondo',
        exponent: 20,  // approssimativamente 10^20
        image: 'images/sabbia.jpg'
      },
      {
        label: 'Stelle nell\'universo',
        exponent: 32,  // approssimativamente 10^32
        image: 'images/stelle.jpg'
      },
      {
        label: 'Il numero primo più grande',
        exponent: 24862048,  // valore simbolico
        image: 'images/prime.jpg'
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
       Inizialmente, mostriamo l'immagine di start e impostiamo currentStep = 0.
    */
    let currentStep = 0;
    // Variabile per gestire l'intervallo per l'esponente dinamico
    let dynamicInterval = null;
  
    // Al caricamento della pagina, mostra subito l'immagine di start
    showSpecialStep(
      'images/start.jpg',
      'Quanto ti amo?',
      'Ecco le tappe del nostro viaggio!',
      'Successivo'
    );
  
    nextButton.addEventListener('click', () => {
      // Se è in corso un'animazione, usa fade-out prima di aggiornare
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
  
    function updateStep() {
      // Se c'era un intervallo per l'esponente dinamico, lo interrompiamo
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
        }
      } else if (currentStep === steps.length) {
        // Stato finale: mostra l'immagine "end"
        showSpecialStep(
          'images/end.jpg',
          'Grazie per aver viaggiato con me!',
          'Il nostro amore è infinito.',
          'Ricomincia'
        );
        currentStep++;
      } else {
        // Reset della sequenza
        resetSequence();
      }
    }
  
    function showStep(step) {
      // Se è presente un intervallo per l'esponente dinamico, lo fermiamo
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
        // Funzione per aggiornare l'esponente dinamico in base al tempo trascorso
        function updateDynamicExponent() {
          // Data di riferimento: 29/08/2024 ore 12:00 (in formato ISO)
          const targetDate = new Date('2024-08-29T12:00:00');
          const now = new Date();
          // Calcola la differenza in secondi
          const diffSeconds = Math.floor((now - targetDate) / 1000);
          stepText.innerHTML = `<strong>${step.label}:</strong> 10<sup>${diffSeconds}</sup>`;
        }
        updateDynamicExponent(); // Imposta subito il valore iniziale
        dynamicInterval = setInterval(updateDynamicExponent, 1000);
      } else {
        stepText.innerHTML = `<strong>${step.label}:</strong> 10<sup>${step.exponent}</sup>`;
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
      // Se esiste un intervallo per l'esponente dinamico, lo fermiamo
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
  
      // Aggiorna titolo, descrizione e testo del bottone
      title.textContent = newTitle;
      description.textContent = newDescription;
      nextButton.textContent = newButtonText;
    }
  
    function resetSequence() {
      // Se esiste un intervallo per l'esponente dinamico, lo fermiamo
      if (dynamicInterval) {
        clearInterval(dynamicInterval);
        dynamicInterval = null;
      }
      currentStep = 0;
      stepDisplay.innerHTML = '';
      title.textContent = 'Quanto ti amo?';
      description.innerHTML = 'Ho provato a quantificarlo, ed è stato un lungo viaggio.<br>Ti va di percorrere le tappe più importanti con me?';
      nextButton.textContent = 'Inizia il viaggio!';
      // Mostra nuovamente l'immagine di start
      showSpecialStep(
        'images/start.jpg',
        'Quanto ti amo?',
        'Ecco le tappe del nostro viaggio!',
        'Successivo'
      );
    }
  });
  