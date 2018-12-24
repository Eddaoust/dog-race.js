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
                raceCountryPlaceholder.setAttribute('selected', true)
                raceCountryPlaceholder.setAttribute('disabled', true)
                raceCountryPlaceholder.innerText = 'Choisissez le pays de la course'
                raceCountry.appendChild(raceCountryPlaceholder)
                for(data of res){
                    const raceCountryOption = document.createElement('option')
                    raceCountryOption.setAttribute('value', `${data.codeP}`)
                    raceCountryOption.innerText = data.nomP
                    raceCountry.appendChild(raceCountryOption)
                }
            })
    }

    function raceRegistration(){
        //TODO Gérer l'exeption des inputs vides
        raceName.setAttribute('disabled', true)
        raceCountry.setAttribute('disabled', true)
        raceDuration.setAttribute('disabled', true)
        btnRaceRegistration.remove()

        const label = document.createElement('label')
        label.setAttribute('for', 'dog_select')
        label.innerText = 'Choississez un chien'
        container.appendChild(label)
        const dogSelect = document.createElement('select')
        dogSelect.setAttribute('id', 'dog_select')
        container.appendChild(dogSelect)
        const btnDogRegistration = document.createElement('input')
        btnDogRegistration.setAttribute('type', 'button')
        btnDogRegistration.setAttribute('value', 'inscrire')
        btnDogRegistration.setAttribute('id', 'dog_register')
        container.appendChild(btnDogRegistration)
        const btnDogEndRegistration = document.createElement('input')
        btnDogEndRegistration.setAttribute('type', 'button')
        btnDogEndRegistration.setAttribute('value', 'Cloturer les inscriptions')
        btnDogEndRegistration.setAttribute('id', 'dog_end_registration')
        container.appendChild(btnDogEndRegistration)

        // Event ajout chien
        btnDogRegistration.addEventListener('click', dogRegistration)

        fetch('./rqListeAnimaux.php')
            .then(res => res.json())
            .then(function(res){
                const dogSelectPlaceholder = document.createElement('option')
                dogSelectPlaceholder.setAttribute('selected', true)
                dogSelectPlaceholder.setAttribute('disabled', true)
                dogSelectPlaceholder.innerText = 'Choisissez un chien'
                dogSelect.appendChild(dogSelectPlaceholder)
                for(data of res){
                    dogList.push(data)
                    const dogSelectOption = document.createElement('option')
                    dogSelectOption.setAttribute('value', `${data.idA}`)
                    dogSelectOption.innerText = data.nomA
                    dogSelect.appendChild(dogSelectOption)
                }
            })
    }

    function dogRegistration(){
        const dogSelect = document.querySelector('#dog_select')
        const dogOption = document.querySelectorAll('#dog_select option')
        for(let i = 0; i < dogOption.length; i++){
            if(dogOption[i].getAttribute('value') === dogSelect.value){
                dogOption[i].setAttribute('disabled', true)

                // Sélection du chien
                const selectedDog = dogList.find(function (element) {
                    return element.idA == dogSelect.value
                })
                // Création des éléments du tableau
                const dogRowCloned = dogRow.cloneNode()
                const dogId = document.createElement('th')
                const dogName = document.createElement('th')
                const dogCountry = document.createElement('th')
                const dogDesc = document.createElement('th')
                const dogDelete = document.createElement('input')
                dogDelete.setAttribute('type', 'button')
                dogDelete.setAttribute('value', 'supprimer')
                dogDelete.setAttribute('id', 'dog_delete')

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

                // Suppression de la ligne au click sur supprimer
                dogDelete.addEventListener('click', function () {
                    this.parentNode.remove()


                })
            }
        }
    }




    /********************** Action *********************/
    raceCountryInit();
    btnRaceRegistration.addEventListener('click', raceRegistration)


});