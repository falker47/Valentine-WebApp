document.addEventListener('DOMContentLoaded', () => {
    const nextButton = document.getElementById('nextButton');
    const stepDisplay = document.getElementById('stepDisplay');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    
    // Definizione degli step con dati in notazione scientifica (solo 10^n) e immagini associate.
    const steps = [
      {
        label: 'Cellule nel corpo umano',
        exponent: 13, // approssimativamente 10^13
        image: 'images/cellule.jpg'
      },
      {
        label: 'Granelli di sabbia nel mondo',
        exponent: 20, // approssimativamente 10^20
        image: 'images/sabbia.jpg'
      },
      {
        label: 'Stelle nell\'universo',
        exponent: 32, // approssimativamente 10^32
        image: 'images/stelle.jpg'
      },
      {
        label: 'Il numero primo più grande',
        exponent: 24862048, // valore simbolico approssimato
        image: 'images/prime.jpg'
      },
      {
        label: 'Amore che provo per te',
        exponent: 29082024, // 10^29082024
        image: 'images/amore.jpg'
      }
    ];
    
    let currentStep = 0;
    
    nextButton.addEventListener('click', () => {
      // Se è già presente un dato, lo fa scomparire con animazione prima di aggiornare
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
        const step = steps[currentStep];
        
        // Creazione di un contenitore per lo step
        const stepData = document.createElement('div');
        stepData.classList.add('step-data');
        
        // Creazione del testo che mostra il label e il numero in forma "10^n"
        const stepText = document.createElement('div');
        stepText.classList.add('step-text');
        stepText.innerHTML = `<strong>${step.label}:</strong> 10<sup>${step.exponent}</sup>`;
        stepData.appendChild(stepText);
        
        // Se è definita un'immagine per lo step, aggiungila
        if (step.image) {
          const stepImage = document.createElement('div');
          stepImage.classList.add('step-image');
          const img = document.createElement('img');
          img.src = step.image;
          img.alt = step.label;
          stepImage.appendChild(img);
          stepData.appendChild(stepImage);
        }
        
        // Aggiorna il contenuto del display
        stepDisplay.innerHTML = '';
        stepDisplay.appendChild(stepData);
        
        // Aggiungi la classe per il fade-in
        stepDisplay.classList.add('fade-in');
        
        currentStep++;
        
        // Cambia il testo del bottone dopo il primo click
        if (currentStep === 1) {
          nextButton.textContent = 'Continua';
        }
        
        // Quando si arriva all'ultimo step, cambia il testo in "Ricomincia"
        if (currentStep === steps.length) {
          nextButton.textContent = 'Ricomincia';
        }
      } else {
        // Resetta la sequenza se sono stati mostrati tutti gli step
        currentStep = 0;
        stepDisplay.innerHTML = '';
        title.textContent = 'Quanto ti amo';
        description.textContent = 'Ti va di ripercorrere le tappe più importanti con me?';
        nextButton.textContent = 'Rinizia il viaggio!';
      }
    }
  });
  