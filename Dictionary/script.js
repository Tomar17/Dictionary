document.querySelector('#btn').addEventListener('click',()=>{
    word = document.querySelector('#in').value
    url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url)
    .then((response)=>{
        if (!response.ok){
            new Error('issue occurred')
        }else{
            return response
        }
        
    })
    .then(data=>data.json())
    .then((data)=>{ 
        let results=[]
        data.forEach((def)=>{
            results.push(getImp(def))
        })
        console.log(results)

        document.querySelector('.bodyMain').innerText=''

        topDiv=document.createElement('div')
        topDiv.classList.add('topDiv')
        snd = document.createElement('i')
        snd.classList.add('fa')
        snd.classList.add('fa-bullhorn')
        phon=document.createElement('p')
        phon.innerText=results[0].phonetic
        topDiv.appendChild(snd)
        topDiv.appendChild(phon)
        document.querySelector('.bodyMain').appendChild(topDiv)
        console.log(results[0].sound)
        snd.addEventListener('click',()=>{
            let pron = new Audio(results[0].sound)
            if(pron===undefined){
                
            }else{
                pron.play()
            }
        })

        results.forEach((def,index)=>{
            defDiv=document.createElement('div')
            outerDiv=document.createElement('div')
            defDiv.classList.add(`defDiv`)
            outerDiv.classList.add(`outerDiv`)
            outerDiv.classList.add(`outerDiv${index}`)
            defP=document.createElement('p')
            defBtn=document.createElement('button')
            wordDiv= document.createElement('div')
            wordDiv.classList.add('wordDiv')
            wordDiv.classList.add(`wordDiv${index}`)
            defP.innerText=def.type
            defBtn.innerText='ᨆ'
            defBtn.classList.add('faceUp')
            defBtn.classList.add('arrowBtn')
            // console.log(Array.from(defBtn.classList))
            defBtn.addEventListener('mouseover',(event)=>{
                wordDiv.innerText=''
                
                if(Array.from(event.target.classList).includes('faceDown')){
                    document.querySelectorAll('arrowBtn').forEach((element)=>{console.log(element)})
                    event.target.classList.remove('faceDown')
                    event.target.classList.add('faceUp')
                    console.log(event.target.classList)
                }else{
                    document.querySelectorAll('arrowBtn').forEach((element)=>{console.log(element)})
                    
                    event.target.classList.add('faceDown')
                    event.target.classList.remove('faceUp')
                    console.log(event.target.classList)
                    definitionP=document.createElement('p')
                    exampleP=document.createElement('p')
                    definitionP.innerText=`Definition: ${def.definition}`
                    exampleP.innerText= def.example? `Example: ${def.example}`:''
                    wordDiv.appendChild(definitionP)
                    wordDiv.appendChild(exampleP)
                    document.querySelector(`.outerDiv${index}`).appendChild(wordDiv)
                }
            })
            defBtn.addEventListener('mouseleave',(event)=>{
                wordDiv.innerText=''
                console.log('dided')
                event.target.classList.remove('faceDown')
                event.target.classList.add('faceUp')
                console.log(event.target.classList)
            })
            defDiv.appendChild(defP)
            defDiv.appendChild(defBtn)
            outerDiv.appendChild(defDiv)
            document.querySelector('.bodyMain').appendChild(outerDiv)
        })
        

    })
    .catch((err)=>{console.log(err)})
})

function getImp(arr){
    console.log(arr)
    let result={}
    result.definition = arr.meanings[0].definitions[0].definition
    try{
        result.phonetic = arr.phonetic
        // result.sound=arr.phonetics[0].audio
        result.sound=`https://ssl.gstatic.com/dictionary/static/sounds/20200429/${arr.word}--_gb_1.mp3`
    }catch{
        result.phonetic = undefined
        result.sound=undefined
    }
    result.type =arr.meanings[0].partOfSpeech
    result.example = arr.meanings[0].definitions[0].example
    return result
}

