import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'https://my-json-server.typicode.com/JSGund/XHR-Fetch-Request-JavaScript/posts';
  private baseUrl = 'https://api.themoviedb.org/3/';
  private API_KEY = '37b2654d338023c318312c90b5eee0ba';

  constructor(private http: HttpClient) { }

 /*   applyQueryParams (queryUrl, params = {}, addApiKey = true) {
    if (isEmpty(params) && !addApiKey) {
      return queryUrl;
    }
    const parameters = addApiKey
      ? {
          ...params,
          [API_KEY]: process.env.REACT_APP_API_KEY,
        }
      : params;
    const queryParams = queryString.stringify(parameters);
    return `${queryUrl}?${queryParams}`;
  };
 */

  getPosts() {
    return this.http.get(this.url);
  }

  getMoviesFromName(url2: string, params: any) {
    return this.http.get(`${this.baseUrl}${url2}`,{
      params: {
        ...params,
        api_key: this.API_KEY,
      }
    });
  }

}
