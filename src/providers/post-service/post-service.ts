import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PostServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PostServiceProvider {

  private url: string; //Don't forget to set the url

  constructor(public http: Http) {
    console.log('Hello PostServiceProvider Provider');
    //this.url='';
  }

  //Precondition: isDataStored
  authentication(data){
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Request-type', 'authentication');

    //body: crypted(name? lastname? IMEI); ID
    let body = data;

    this.http
      .post(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json())
      .subscribe(
          (data) =>{
            console.log(data)
            //3 cases:
            //Success: requestStatus: success ; ID ; Hash(new)
            //Not registered(ID not found): requestStatus: notregistered ;
            //Data mismatch: requestStatus: mismatch ; JSON ; ID ; Hash(new)
          },
          // Catch error
          (err) => console.log("Server error"));
  }

  registration(data){
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Request-type', 'registration');

    //body: SlideOne ; SlideTwo ; Slide Three
    let body = data;

    this.http
      .post(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json())
      .subscribe(
          (data) =>{
            console.log(data)
            //2 cases:
            //Success: requestStatus: success ; ID ; Hash
            //Data Similar: request-status: similar ; JSON ; ID ; Hash
          },
          // Catch error
          (err) => console.log("Server error"));
  }

  edit(data){
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Request-type', 'edit');

    //body: SlideOne ; SlideTwo ; Slide Three ; ID ; Hash
    let body = data;

    this.http
      .post(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json())
      .subscribe(
          (data) =>{
            console.log(data)
            //Case Success: requestStatus: success ; ID ; Hash(new)
            return JSON.parse(data);
          },
          //Catch error
          (err) => console.log("Server error"));
  }

  makeRequest(data){
    let headers= new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Request-type', 'request');

    //body: ID ; Hash ; data from request
    let body = data;

    this.http
      .post(this.url, JSON.stringify(data), {headers: headers})
      .map(res => res.json())
      .subscribe(
          (data) =>{
            console.log(data)
            //Case Success: requestStatus: success ; ID ; Hash(new)
            return JSON.parse(data);
          },
          //Catch error
          (err) => console.log("Server error"));
  }

}
