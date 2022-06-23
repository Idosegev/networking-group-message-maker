const createButton = document.getElementById('createMessage')
const clearButton = document.getElementById('clear')
const FIELDS = [`sender`, `year`, `title`, `body`, `tel`]
const IDS = [`sender_id`, `year_id`, `title_id`, `body_id`, `tel_id`]


IDS.forEach((id)=>{
  setFieldValue(id)
  getFieldValue(id)
})

clearButton.addEventListener('click',()=>{
  IDS.forEach((id)=>{
    clearField(id)
    chrome.storage.local.clear(id)
  })
  
  
})

createButton.addEventListener('submit',(e)=>{
  e.preventDefault()
  let compliedFieldsCounter = 0
  FIELDS.forEach((obj)=>{
    emptyField(e,obj)?fieldWarner(undefined,obj):compliedFieldsCounter++;
  })


  try{
    if(FIELDS.length===compliedFieldsCounter){
      let compiledMessage = WhatsappMessage(e)
      copyToClipboard(compiledMessage)
    }
  }catch(e){
    let tel = e.message.split(':')[0].split('_')[0]
    fieldWarner(e.message.split(':')[1],tel)
  }
  
})

