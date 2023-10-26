import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  createScheme = false;
  editScheme = false;
  viewScheme = false;

  createUnit = false;
  editUnit = false;
  viewUnit = false;

  createWebsite = true;
  editWebsite = false;
  viewWebsite = false;

  constructor() { }
}
