addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(req) {
  let request = await req.json()
  console.log('function handle')
  let chatid
  if (Array.isArray(request.message)) {
    console.log('is array')
    chatid = request.message[0].my_chat_member.chat.id
  } else {
    console.log('not array.')
    if (request.hasOwnProperty('edited_message')) {
      chatid = request.edited_message.chat.id
      console.log('edited message')
    } else {
      console.log('not edited')
      chatid = request.message.chat.id
    }
  }
  console.log('retutning output')
  console.log(chatid)
  let prettyjson = JSON.stringify(request,null,2) 
  let resJson = {
    method: 'sendMessage',
    chat_id: chatid,
    text: `<pre>${prettyjson}</pre>`,
    parse_mode: 'HTML'
  }
  
  
    return new Response(JSON.stringify(resJson), {
      headers: { 'content-type': 'application/json' },
    })
}
