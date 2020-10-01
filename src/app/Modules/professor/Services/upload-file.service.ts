import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  public url = 'https://file.io/';

  constructor(
    private _client: HttpClient
  ) { }

  public upload(file: any){
    return this._client.post<any>(this.url, file,{
      reportProgress:true,
      observe:'events'
    })
  }
}
