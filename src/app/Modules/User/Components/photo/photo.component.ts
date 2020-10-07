import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotoDialogData } from '../details/details.component';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  photo:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PhotoDialogData
  ) { }

  ngOnInit(): void {
    this.photo = this.data.photo;
  }
}
