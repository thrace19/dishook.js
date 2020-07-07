const axios = require('axios');
const isObject = (obj) => !Array.isArray(obj) && obj === Object(obj);

class WebhookClient {
  constructor(options) {
    if(!isObject(options)) throw Error('[DisHook.js] Client options must be an object');
    
    if(!options.id) throw Error('[DisHook.js] The ID of the webhook is required');
    
    if(typeof options.id !== 'string') throw Error('[DisHook.js] The provided ID must be an string');
    
    this.id = options.id;
    
    if(!options.token) throw Error('[DisHook.js] The token of the webhook is required');
    
    if(typeof options.token !== 'string') throw Error('[DisHook.js] The provided token must be a string');
       
    this.token = options.token;
      
    this.username = options.username || 'Dishook.js'
        
    this.avatar = options.avatar_url || 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/mail-512.png'
    this.url = 'https://discordapp.com/api/v8';
    
    this.payload = {};
  }
  
  async send(payload) {
   
    if(!payload) throw Error('Cannot send empty webhook!');
    
   this.payload.username = this.username
   this.payload.avatar_url = this.avatar;
   
    let endPayload = {
            ...this.payload
        };

        if (typeof payload === 'string'){
            endPayload.content = payload;
        }
        else {
            endPayload = {
                ...endPayload,
                ...payload.getJSON()
            };
        };
      try {
        let res = await this.post(endPayload);

        if(res.status === 429) {
          const waitUntil = res["retry-after"];

          setTimeout(() => this.post(endPayload), waitUntil);
        }
          else if (res.status != 204){
                throw new Error(`Error sending webhook: ${res.status} status code. Response: ${await res.text()}`);
            };
        }
        catch(err){
            if (this.throwErrors) throw new Error(err.message);
        };

  }

  post(payload) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.url}/webhooks/${this.id}/${this.token}`,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Musical Tune',
          "Upgrade-Insecure-Requests": "1",
          "Cache-Control": "max-age=0",
          "Connection": "keep-alive"
        },
        data: JSON.stringify(payload),
      })
    .then(res => resolve(res))
    .catch(err => reject(err));
    });
  }
  
}

module.exports = WebhookClient;
