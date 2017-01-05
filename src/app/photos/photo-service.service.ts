import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";
import 'rxjs/Rx'

import { Photo } from "./photo"
import {Observable} from "rxjs";

@Injectable()
export class PhotoServiceService {
  photosChanged = new EventEmitter<Photo[]>();
  private photos: Photo[] = [];
  //  new Photo('Eden Back To School','Eden\'s picture for back to school Fall 2016', 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/13920942_10153777762794599_6398620272109907535_n.jpg?oh=beace499fd1d57fd17bc584fdfa0fb9b&oe=5922CCE2')
  //]
  constructor(private http: Http, private router: Router) { }

  getPhotos() {
    return this.photos;
  }
  getPhoto(id: number) {
    return this.photos[id];
  }

  deletePhoto(photo: Photo) {
    this.storeData()
      .then(success => {this.photos.splice(this.photos.indexOf(photo), 1)},error => {this.router.navigate(['/photos/error'])} );

    // if(errorHappened){
    //   console.log("in else")
    //   this.router.navigate(['/photos/error'])
    // }
    // else{
    //   this.photos.splice(this.photos.indexOf(photo), 1)
    // }
  }

  addPhoto(photo: Photo) {


    var errorHappened = false
    this.http.put('https://family-project-4f904.firebaseio.com/photos/'+ this.photos.indexOf(photo).toString() +'.json',JSON.stringify(photo)).toPromise()
      .then(success => {this.photos.push(photo)},error => {this.router.navigate(['/photos/error'])} );
    // if(errorHappened){
    //   console.log("in else")
    //   this.router.navigate(['/photos/error'])
    // }
    // else{
    //   this.photos.push(photo);
    // }
  }

  editPhoto(oldPhoto: Photo, newPhoto: Photo) {

    var errorHappened = false
    this.http.patch('https://family-project-4f904.firebaseio.com/photos/'+this.photos.indexOf(oldPhoto)+'/.json',JSON.stringify(newPhoto))
      .toPromise()
      // .catch((error:any) => {errorHappened=true} )
      .then(success => {this.photos[this.photos.indexOf(oldPhoto)] = newPhoto},error => {this.router.navigate(['/photos/error'])} );
    // if(errorHappened){
    //   console.log("in else")
    //   this.router.navigate(['/photos/error'])
    //   }
    // else{
    //   this.photos[this.photos.indexOf(oldPhoto)] = newPhoto;
    // }
  }

  storeData(){
    const body = JSON.stringify(this.photos);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://family-project-4f904.firebaseio.com/photos.json', body, {headers: headers}).toPromise();
  }
  fetchData() {
    return this.http.get('https://family-project-4f904.firebaseio.com/photos.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Photo[]) => {
          if(!!data) {
            this.photos = data;
          }
          this.photosChanged.emit(this.photos);
        }
      );
  }





}
