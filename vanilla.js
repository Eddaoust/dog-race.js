document.addEventListener('DOMContentLoaded', function(){

    const container = document.querySelector('.container')
    const raceName = document.querySelector('#race_name')
    const raceCountry = document.querySelector('#race_country')
    const raceDuration = document.querySelector('#race_duration')
    const btnRaceRegistration = document.querySelector('#race_registration')
    const dogContainer = document.querySelector('.dog_container')
    const dogRow = document.querySelector('#dog_row')
    const dogList = []

    /**
     * Fonction qui initialise la course et rempli la sélection pays via Ajax
     */
    function raceCountryInit(){
        fetch('./rqListePays.php')
            .then(res => res.json())
            .then(function(res){
                const raceCountryPlaceholder = document.createElement('option')
                raceCountryPlaceholder.selected = true
                raceCountryPlaceholder.disabled = true
                raceCountryPlaceholder.innerText = 'Choisissez le pays de la course'
                raceCountry.appendChild(raceCountryPlaceholder)
                for(data of res){
                    const raceCountryOption = document.createElement('option')
                    raceCountryOption.value = data.codeP
                    raceCountryOption.innerText = data.nomP
                    raceCountry.appendChild(raceCountryOption)
                }
            })
    }

    function raceRegistration(){
        // Désactivation des inputs après validation
        raceName.disabled = true
        raceCountry.disabled = true
        raceDuration.disabled = true
        btnRaceRegistration.remove()

        // Création du formulaire d'ajout des chiens
        const label = document.createElement('label')
        label.setAttribute('for', 'dog_select')
        label.innerText = 'Choississez un chien'
        container.appendChild(label)
        const dogSelect = document.createElement('select')
        dogSelect.setAttribute('id', 'dog_select')
        container.appendChild(dogSelect)
        const btnDogRegistration = document.createElement('input')
        btnDogRegistration.type = 'button'
        btnDogRegistration.value = 'Inscrire'
        btnDogRegistration.id = 'dog_register'
        container.appendChild(btnDogRegistration)
        const btnDogEndRegistration = document.createElement('input')
        btnDogEndRegistration.type = 'button'
        btnDogEndRegistration.value = 'Cloturer les inscriptions'
        btnDogEndRegistration.id = 'dog_end_registration'
        container.appendChild(btnDogEndRegistration)

        // Event ajout chien
        btnDogRegistration.addEventListener('click', dogRegistration)

        //TODO Ajouter une exeption ne pas commencer la course si pas d'inscrit

        // Event cloture de la course
        btnDogEndRegistration.addEventListener('click', closeRaceRegistration)

        // Requete pour remplir la liste des chiens avec les data
        fetch('./rqListeAnimaux.php')
            .then(res => res.json())
            .then(function(res){
                const dogSelectPlaceholder = document.createElement('option')
                dogSelectPlaceholder.selected = true
                dogSelectPlaceholder.disabled = true
                dogSelectPlaceholder.innerText = 'Choisissez un chien'
                dogSelect.appendChild(dogSelectPlaceholder)
                for(data of res){
                    // Push des data dans une variable globale
                    dogList.push(data)
                    const dogSelectOption = document.createElement('option')
                    dogSelectOption.value = data.idA
                    dogSelectOption.innerText = data.nomA
                    dogSelect.appendChild(dogSelectOption)
                }
            })
    }

    function dogRegistration(){
        // Sélection de la liste déroulante des chiens
        const dogSelect = document.querySelector('#dog_select')
        // Sélection des options de la liste
        const dogOption = document.querySelectorAll('#dog_select option')
        // Loop pour obtenir le cien sélectionné
        for(let i = 0; i < dogOption.length; i++){
            if(dogOption[i].value === dogSelect.value){
                dogOption[i].disabled = true

                // Sélection du chien data
                const selectedDog = dogList.find(function (element) {
                    return element.idA == dogSelect.value
                })
                // Création des éléments du tableau
                const dogRowCloned = dogRow.cloneNode()
                dogRowCloned.id = dogOption[i].value
                const dogId = document.createElement('th')
                const dogName = document.createElement('th')
                const dogCountry = document.createElement('th')
                const dogDesc = document.createElement('th')
                const dogDelete = document.createElement('input')
                dogDelete.type = 'button'
                dogDelete.value = 'Supprimer'
                dogDelete.id = 'dog_delete'

                // Attribution des données en fonction du chien sélectionné
                dogId.innerHTML = selectedDog.idA
                dogName.innerHTML = selectedDog.nomA
                dogCountry.innerHTML = selectedDog.nationA
                dogDesc.innerHTML = selectedDog.descA

                // Insertion des données dans la ligne du tableau
                dogRowCloned.appendChild(dogDelete)
                dogRowCloned.appendChild(dogId)
                dogRowCloned.appendChild(dogName)
                dogRowCloned.appendChild(dogCountry)
                dogRowCloned.appendChild(dogDesc)

                // Insertion de la ligne dans le tableau
                dogContainer.appendChild(dogRowCloned)

                // Déplacement du curseur sur le placeholder
                dogOption[0].selected = true

                // Suppression de la ligne au click sur supprimer
                dogDelete.addEventListener('click', function () {
                    this.parentNode.remove()
                    for(const option of dogOption) {
                        if(this.parentNode.id == option.value){
                            option.disabled = false
                        }
                    }

                })
            }
        }
    }

    function closeRaceRegistration(){
        // Suppression des inputs de la phase de sélection des chiens
        const labelToRemove = Array.from(document.querySelectorAll('label')).find(function(element){
            return element.getAttribute('for') === 'dog_select'
        })
        labelToRemove.remove()
        document.querySelector('#dog_select').remove()
        document.querySelector('#dog_register').remove()
        document.querySelector('#dog_end_registration').remove()

        // Création des inputs de controle de la course
        const raceStart = document.createElement('input')
        raceStart.id = 'race_start'
        raceStart.type = 'button'
        raceStart.value = 'Start'
        const timerDisplay = document.createElement('input')
        timerDisplay.type = 'time'
        timerDisplay.id = 'timer_display'
        const label = document.createElement('label')
        label.setAttribute('for', 'timer_display_remainning')
        label.innerText = 'Temps restant'
        const timerDisplayRemaining = document.createElement('input')
        timerDisplayRemaining.type = 'time'
        timerDisplayRemaining.id = 'timer_display_remaining'
        container.appendChild(raceStart)
        container.appendChild(timerDisplay)
        container.appendChild(label)
        container.appendChild(timerDisplayRemaining)

        // Suppression des bouttons 'supprimer' dans chaque ligne du tableau
        const inputToDelete = Array.from(document.querySelectorAll('tr input'))
        inputToDelete.map(function(element){
            element.remove()
        })

        // Création des inputs de fin de course
        const raceStop = document.createElement('input')
        raceStop.type = 'button'
        raceStop.id = 'race_stop'
        raceStop.value = 'Stop'
        const raceAbort = document.createElement('input')
        raceAbort.type = 'button'
        raceAbort.id = 'race_abort'
        raceAbort.value = 'Abandon'

        const trToFill = Array.from(document.querySelectorAll('tr'))

        trToFill.map(function(row) {
            if(row.getAttribute('id') !== 'dog_row' ){
                const raceStop = document.createElement('input')
                raceStop.type = 'button'
                raceStop.className = 'race_stop'
                raceStop.value = 'Stop'
                const raceAbort = document.createElement('input')
                raceAbort.type = 'button'
                raceAbort.className = 'race_abort'
                raceAbort.value = 'Abandon'

                row.insertBefore(raceAbort, row.firstChild)
                row.insertBefore(raceStop, row.firstChild)
            }
        })



    }




    /********************** Action *********************/
    raceCountryInit();
    btnRaceRegistration.addEventListener('click', raceRegistration)





});