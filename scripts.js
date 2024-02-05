let currentPageUrl = 'https://swapi.dev/api/people/';





window.onload = async () => {
   
   
    try {
   
        await getData (currentPageUrl);

 
    
    } catch (error) {
    
        console.log(error);
        alert('Erro ao carregar os cards.');
    }
       
     
    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage) 
  
};




async function getData (url) {
   
 
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {
  
        

        const response = await fetch(url);
        const responseJson = await  response.json();
   
        console.log(response)
      
        console.log(responseJson)

        responseJson.results.forEach((character) => {
       
     
        const card = document.createElement("div")
        card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
        card.className = "card"

      
        const  characterName = document.createElement('span')
        characterName.className = "character-name" 
        characterName.innerText = `${character.name}` 
        card.appendChild(characterName)


        const mainContent = document.getElementById('main-content')
        mainContent.appendChild(card)
           
        card.onclick = () => {

            const modal = document.getElementById('modal')
            modal.style.visibility = "visible"



            const modalContent = document.getElementById('modal-content')
            modalContent.innerHTML = "";
            
            
            
            const imgChar = document.createElement('div');
            imgChar.className = "modal-avatar"
            imgChar.style.backgroundImage =  `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
          
            modalContent.appendChild(imgChar)
            
            
            const name = document.createElement('span')
            name.className = "modal-text"            
            name.innerHTML =` Nome: ${character.name}`

            const height= document.createElement('span')
            height.className = "modal-text"
            height.innerHTML = ` Altura: ${convertHeight(character.height)}`



            const mass = document.createElement('span')
            mass.className =  "modal-text"
            mass.innerHTML = ` Massa: ${convertMass(character.mass)}`

           
                     
            const eyeColor = document.createElement('span')
            eyeColor.className =  "modal-text"
            eyeColor.innerHTML = `Cor dos Olhos: ${convertEyeColor(character.eye_color)}` 

           
          
            const gender = document.createElement('span')
            gender.className =  "modal-text"
         

           if (character.gender === "n/a") {
            
                 gender.innerHTML = "Gênero: desconhecido"
         
            } else {

                  gender.innerHTML =  `Gênero: ${convertGender(character.gender)}`
           }
          


          
             
           
             modalContent.appendChild(name)
             modalContent.appendChild(height)
             modalContent.appendChild(mass)
             modalContent.appendChild(eyeColor)
             modalContent.appendChild(gender)

           
             console.log(modalContent)



        

        } 
            
 
      
       

        
      
   
          
  
    
      });

      const nextButton = document.getElementById('next-button');
      const backButton = document.getElementById('back-button');
      
      nextButton.disable =!responseJson.next;
      backButton.disable =!responseJson.previous;
      backButton.style.visibility = responseJson.previous? "visible" : "hidden";

   

      currentPageUrl = url        

         
    
          


        }  catch (error) {

         throw new Error('Erro ao carregar as informações.')
       
        }
   
   
   
    }

    
    
    
  
    function hideModal() {

        const modal = document.getElementById('modal')
        modal.style.visibility = "hidden"

    }
   
    function convertHeight(height) {
        if (height === "unknown") {
          return "desconhecida";
        }
        
        return (height / 100).toFixed(2);
      }


      function convertMass(mass) {
        if (mass === "unknown") {
          return "desconhecido";
        }
        
        return `${mass} kg`;
      }
      
      function convertEyeColor(eyeColor) {
        const cores = {
          blue: "azul",
          brown: "castanho",
          green: "verde",
          yellow: "amarelo",
          black: "preto",
          pink: "rosa",
          red: "vermelho",
          orange: "laranja",
          hazel: "avela",
          unknown: "desconhecida"
        };
      
        return cores[eyeColor.toLowerCase()] || eyeColor;
      }


      function convertGender (gender) {


         


            const genders = {

                female: "feminino", 
                male: "masculino",
                unknown : "desconhecido",
                undefined: "desconhecido"
                



            };

            return  genders[gender.toLowerCase()] ;


            


      }



   async function loadNextPage () {


    if (!currentPageUrl) return ;

    try {

          const response = await fetch (currentPageUrl)
          const responseJson = response.json()
          console.log(responseJson);
      
          await getData (responseJson.next)

    } catch (error){
        console.log (error)
        alert('Erro ao carregar a próxima ')
    }



}

   
async function loadPreviousPage () {


    if (!currentPageUrl) return ;

    try {

          const response = await fetch (currentPageUrl)
          const responseJson = response.json()
          console.log(responseJson);
        await getData (responseJson.previous)

    } catch {

        alert('Erro ao carregar a página anterior ')
    }



}
