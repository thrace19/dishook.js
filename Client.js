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
      
    this.username = options.username || 'DisHook.js'
        
    this.avatar = options.avatar_url || 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/mail-512.png'
    this.url = 'https://discordapp.com/api/v8';
  }
  
  send(payload) {
    if(!payload) throw Error('Cannot send empty webhook!')

    return new Promise((resolve, reject) => {
              
    if (payload instanceof Object) {
        
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
        data: {
          embeds: [
            payload
          ],   
          avatar_url: this.avatar,
          username: this.username
        }
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
      } else  {
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
        data: {
          content: payload,
          avatar_url: "https://cdn.discordapp.com/avatars/489076647727857685/580b58269c3509bb73bd092e622950dc.jpg?size=128",
          username: 'Musical Tune'
        }
      })
      .then(res => resolve(res))
      .catch(err => reject(err));
      }
    })
  }
  
}

module.exports = WebhookClient;
