document.addEventListener('DOMContentLoaded', () => {
    const nextButton  = document.getElementById('nextButton');
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
        exponent: 29082024,  // 10^29082024
        image: 'images/amore.jpg'
      }
    ];
  
    /* Stato:
         currentStep = 0..steps.length-1 → step intermedi
         currentStep = steps.length → stato finale (immagine di end)
         currentStep > steps.length → reset
       Inizialmente, mostriamo l'immagine di start e impostiamo currentStep = 0. */
    let currentStep = 0;
  
    // AL CARICAMENTO MOSTRA L'IMMAGINE DI START (con titolo, descrizione e bottone aggiornati)
    showSpecialStep(
      'images/start.jpg',
      'Quanto ti amo?',
      'Ecco le tappe del nostro viaggio!',
      'Successivo'
    );
  
    nextButton.addEventListener('click', () => {
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
      const stepData = document.createElement('div');
      stepData.classList.add('step-data');
  
      const stepText = document.createElement('div');
      stepText.classList.add('step-text');
      stepText.innerHTML = `<strong>${step.label}:</strong> 10<sup>${step.exponent}</sup>`;
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
      currentStep = 0;
      stepDisplay.innerHTML = '';
      title.textContent = 'Quanto ti amo?';
      description.innerHTML = 'Ho provato a quantificarlo, ed è stato un lungo viaggio.<br>Ti va di percorrere le tappe più importanti con me?';
      nextButton.textContent = 'Inizia il viaggio!';
      // Ripristina l'immagine di start all'avvio
      showSpecialStep(
        'images/start.jpg',
        'Quanto ti amo?',
        'Ecco le tappe del nostro viaggio!',
        'Successivo'
      );
    }
  });
  