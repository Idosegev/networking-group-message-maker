
/**
 * Checks emptieness inside a field.
 * @param {DOMObject} e 
 * @param {String} fieldId 
 * @returns 
 */
const emptyField= (e,fieldId)=>{
    let fieldEl = document.querySelector(`#${fieldId}_id`)
    let warnEl = document.querySelector(`#error-message-${fieldId}`)
    
    return fieldEl.value===''
}


/**
 * This warns the user in the field itself if field is empty.
 * Assure that on click of field the field will be ready again for write down.
 * @param {DOMObject} e  Element obtain from an event
 * @param {String} fieldId Type of field named by a string
 */
const fieldWarner = (e, fieldId )=>{
    let labelEl = document.querySelector(`#${fieldId}_label`)
    let fieldEl = document.querySelector(`#${fieldId}_id`)
    let spanEL = document.createElement('span')
    spanEL.setAttribute('class',`error-message`)
    spanEL.setAttribute('id',`error-message-${fieldId}`)
    spanEL.setAttribute('aria-live','polite')
    spanEL.textContent = e!==undefined?e:'שדה זה הוא חובה'
   
    let el = labelEl.querySelector(`#error-message-${fieldId}`)
    if((el===null && fieldId.textContent==='') || (spanEL !=='שדה זה הוא חובה' && el===null )){
        labelEl.appendChild(spanEL)
        fieldEl.addEventListener('click',()=>{
            let el2 = labelEl.querySelector(`#error-message-${fieldId}`)
            el2===spanEL?labelEl.removeChild(spanEL):null;
            fieldEl.textContent=''
            labelEl.removeEventListener('click',fieldEl)
            
        })
    }
    

}

/**
 * Creates the read more element in the Whatsapp messages
 * @returns String with 1200 contcatnated zero width joiner unicode character
 */
const readMoreMaker = ()=>{
    let i = 0
    let returnString = ''
    while(i<1200){
        returnString +='\u200B'
        
        i++
    }
    return returnString
}

const WhatsappMessage = (e)=>{
    const alumniName = `*${e.target.sender.value}`
    const alumniYear = e.target.year.value
    const messageTitle = `${e.target.headText.value}*`
    const messageBody = e.target.body.value
    let checkTel = e.target.tel.value.replaceAll('-','').replaceAll(' ','').split('')
    console.log(checkTel)
    if(checkTel[0]!==`+` || checkTel[1]!==`9` ||checkTel[2]!==`7`||checkTel[3]!==`2`){
        throw new Error(`${e.target.tel.id}:המספר הזה חייב להכיל קידומת +972`)
    }
    if(checkTel[4]==='0'){
        throw new Error(`${e.target.tel.id}:אין צורך בספרה 0 כמו בקידומת 054`)
    }
    for(let i=1; i<checkTel.length;i++){
        
        if(isNaN(Number(checkTel[i]))){
            throw new Error(`${e.target.tel.id}:שדה זה חייב להכיל רק מספרים ופלוס`)
        }
    }
    const alumniTel = `https://wa.me/${e.target.tel.value}`.replaceAll('-','').replaceAll(' ','')
    const contactHim = `*ללחוץ על הלינק לפתיחת צאט עימו/ה*`

    return `${alumniName} מ${alumniYear} ${messageTitle}${readMoreMaker()} \n \n ${messageBody}\n \n ${contactHim}\n ${alumniTel}`

}


/**
 * Copies A string to the browser clipboard
 * @param {String} toBeCopied 
 */
const copyToClipboard = (toBeCopied)=>{
    let tmp = document.createElement("textarea")
    tmp.value=toBeCopied
    document.body.appendChild(tmp)
    tmp.select()
    navigator.clipboard.writeText(tmp.value)
    document.body.removeChild(tmp)
}

const setFieldValue = (fieldId)=>{
    let fieldElement = document.querySelector(`#${fieldId}`)
    
    fieldElement.addEventListener('input',(e)=>{
        
        chrome.storage.local.set({[fieldId]: e.target.value})
    })
}



const getFieldValue = (fieldId)=>{
    let fieldElement = document.querySelector(`#${fieldId}`)
    
    
    if(fieldId==='sender_id'){
        chrome.storage.local.get([fieldId]).then((data)=>{
            if(data.sender_id!==undefined){
                fieldElement.value = data.sender_id
            }
            
        })
    }    
    if(fieldId ==='year_id'){
        chrome.storage.local.get([fieldId]).then((data)=>{
            if(data.year_id!==undefined){
                fieldElement.value = data.year_id
            }
            
        })
    }
    if(fieldId==='title_id'){
        chrome.storage.local.get([fieldId]).then((data)=>{
            if(data.title_id!==undefined){
                fieldElement.value = data.title_id
            }
            
        })
    }
    if(fieldId==='tel_id'){
        chrome.storage.local.get([fieldId]).then((data)=>{
            if(data.tel_id!==undefined){
                fieldElement.value = data.tel_id
                
            }
            
            
            
        })
    }
    if(fieldId ==='body_id'){
        chrome.storage.local.get([fieldId]).then((data)=>{
            if(data.body_id!==undefined){
                fieldElement.value = data.body_id
            }
            
        })

    }
            
}

const clearField = (fieldId)=>{
    let fieldElement = document.querySelector(`#${fieldId}`)
    let errorEl = document.getElementById(`error-message-${fieldId.split('_')[0]}`)
    fieldElement.value = ''
    errorEl!==null?errorEl.parentElement.removeChild(errorEl):null;
    
}