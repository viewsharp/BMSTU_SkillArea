import {SERVER_URL, ACCESS_ID_STORAGE_KEY} from '../settings.js'

class Service {
  url = SERVER_URL + 'rpc/';
  prefix = '';

  async _call(method, params) {
    const request = {
      'method': this.prefix + '.' + method,
      'params': params,
      'jsonrpc': '2.0',
      'id': localStorage.getItem(ACCESS_ID_STORAGE_KEY)
    };

    const response = await fetch(
        this.url,
        {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request),
        }
    ).then(response => response.json());

    if ('error' in response) {
      throw response.error;
    }

    return response.result
  }
}

export default Service