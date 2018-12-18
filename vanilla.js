/**
 * 1. Récupérer la liste des pays synchrone
 * 2. Click sur inscription > désactivez les inputs
 * 3. Req la liste de chiens en Async
 * 4. Apparition des inputs d'inscription
 */

document.addEventListener('DOMContentLoaded', function(){

    const container = document.querySelector('.container')
    const raceName = document.querySelector('#race_name')
    const raceCountry = document.querySelector('#race_country')
    const raceDuration = document.querySelector('#race_duration')
    const btnRaceRegistration = document.querySelector('#race_registration')
    const dogContainer = document.querySelector('#dog_container')
    const dogList = []

    function raceCountryInit(){
        fetch('./rqListePays.php')
            .then(res => res.json())
            .then(function(res){
                for(data of res){
                    const raceCountryOption = document.createElement('option')
                    raceCountryOption.setAttribute('value', `${data.codeP}`)
                    raceCountryOption.innerText = data.nomP
                    raceCountry.appendChild(raceCountryOption)
                }
            })
    }

    function raceRegistration(){
        btnRaceRegistration.addEventListener('click', function(){
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
                    for(data of res){
                        dogList.push(data)
                        const dogSelectOption = document.createElement('option')
                        dogSelectOption.setAttribute('value', `${data.idA}`)
                        dogSelectOption.innerText = data.nomA
                        dogSelect.appendChild(dogSelectOption)
                    }
                })
        })
    }

    function dogRegistration(){
        const dogSelect = document.querySelector('#dog_select')
        const dogOption = document.querySelectorAll('#dog_select option')
        console.log(dogOption)
        for(let i = 0; i <= dogOption.length; i++){
            if(dogOption[i].getAttribute('value') === dogSelect.value){
                console.log(dogOption[i])
                dogOption[i].setAttribute('disabled', true)
            }
        }
        
        
        
        
    }



    raceCountryInit();
    raceRegistration();
    


});