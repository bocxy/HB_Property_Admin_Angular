import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ModeService } from 'src/app/services/mode.service';
import { DatePipe } from '@angular/common';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { forkJoin,of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { IdPassService } from 'src/app/services/id-pass.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

export interface WebsiteData {

  vamenities:String;
}


@Component({
  selector: 'app-create-website',
  templateUrl: './create-website.component.html',
  styleUrls: ['./create-website.component.css'],
  providers: [DatePipe]
})
export class CreateWebsiteComponent implements OnInit{

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: string[] = [];

  selectable = true;
  removable = true;
  n_ID!: number;
  isLinear = false;
  websiteFormGroup!: FormGroup;
  id:any;
  nid:any;
  websiteData: any = {};
  amenities: string[] = [];

  selectedFiles: { [key: string]: File[] } = {
    fphoto: [],
    fvideo: [],
    ffloorPlanPicture: [],
    fpocPicture: [],
  };


  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private idPassService: IdPassService,
    public modeService: ModeService,private dialog: MatDialog,private route : ActivatedRoute,private httpservice: HttpService,) {

  }

  redirectToNextTab() {

    this.router.navigate(['/next-tab']);
  }

  ngOnInit() {

    this.websiteFormGroup = this.fb.group({
      n_ID:[''],
      nschemeId:[''],
      fphoto: [''],
      fvideo: [''],
      ffloorPlanPicture: new FormControl(),
      fpocPicture: [''],
      vprojectDescription: [''],
      vgeoTagLink: [''],
      vpocName: [''],
      vpocMobile: [''],
      vpocEmail: [''],
      vamenities: [''],
    });

         this.id = this.route.snapshot.paramMap.get('id')!;
        console.log(this.id);

        this.nid = this.idPassService.getN_ID();

         this.getWebsiteData();

   }



   async onSubmit() {
    const base64Promises: { [key: string]: Promise<string[]> } = {};
    const filesArray: string[] = [];

    for (const controlName in this.selectedFiles) {
      if (this.selectedFiles.hasOwnProperty(controlName)) {
        const files = this.selectedFiles[controlName];

        if (files && files.length > 0) {
          const promises = files.map(async (file) => {
            const base64Data = await this.getBase64EncodedString(file);
            return base64Data;
          });
          base64Promises[controlName] = Promise.all(promises);

          if (controlName === 'fphoto') {
            const fphotoPromises = await Promise.all(promises);
            filesArray.push(...fphotoPromises);
          }
        }
      }
    }

    const nschemeId = parseInt(this.id, 10);

    try {
      const resolvedPromises = await Promise.all(Object.values(base64Promises));

      const requestBody = {
        vpocMobile: this.websiteFormGroup.get('vpocMobile')!.value,
        vgeoTagLink: this.websiteFormGroup.get('vgeoTagLink')!.value,
        vamenities: this.websiteFormGroup.get('vamenities')!.value,
        vpocName: this.websiteFormGroup.get('vpocName')!.value,
        vpocEmail: this.websiteFormGroup.get('vpocEmail')!.value,
        fphoto: filesArray.length > 0 ? filesArray : null,
        fvideo: resolvedPromises[1] ? resolvedPromises[1][0] : null,
        ffloorPlanPicture: resolvedPromises[2] ? resolvedPromises[2][0] : null,
        fpocPicture: resolvedPromises[3] ? resolvedPromises[3][0] : null,
        vprojectDescription: this.websiteFormGroup.get('vprojectDescription')!.value,
        nschemeId: nschemeId
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      await this.http.post('http://localhost:8080/saveWebsiteData', [requestBody], httpOptions).toPromise();

      console.log('Website data created successfully!');
      this.dialog.open(DialogMsgComponent, {
        data: {
          isSuccess: true,
          message: 'Website data created successfully!',
          routerLink: '/property/home/view-scheme'
        },
      });
      this.websiteFormGroup.reset();
    } catch (error) {
      console.error('Error:', error);

      this.dialog.open(DialogMsgComponent, {
        data: {
          isSuccess: false,
          message: 'Failed to create website data. Please try again.',
        },
      });
    }
  }


async onUpdate(id: number) {
  try {
    const base64Promises: { [key: string]: Promise<string[]> } = {};
    const filesArray: string[] = [];

    for (const controlName in this.selectedFiles) {
      if (this.selectedFiles.hasOwnProperty(controlName)) {
        const files = this.selectedFiles[controlName];

        if (files && files.length > 0) {
          const promises = files.map(async (file) => {
            return await this.getBase64EncodedString(file);
          });
          base64Promises[controlName] = Promise.all(promises);

          if (controlName === 'fphoto') {
            const fphotoPromises = await Promise.all(promises);
            filesArray.push(...fphotoPromises);
          }
        }
      }
    }

    const nschemeId = parseInt(this.id, 10);

    const resolvedPromises = await Promise.all(Object.values(base64Promises));

    const requestBody = {
      n_ID: this.websiteData.n_ID,
      vpocMobile: this.websiteFormGroup.get('vpocMobile')!.value,
      vgeoTagLink: this.websiteFormGroup.get('vgeoTagLink')!.value,
      vamenities: this.websiteFormGroup.get('vamenities')!.value,
      vpocName: this.websiteFormGroup.get('vpocName')!.value,
      vpocEmail: this.websiteFormGroup.get('vpocEmail')!.value,
      fphoto: filesArray.length > 0 ? filesArray : null,
      fvideo: resolvedPromises[1] ? resolvedPromises[1][0] : null,
      ffloorPlanPicture: resolvedPromises[2] ? resolvedPromises[2][0] : null,
      fpocPicture: resolvedPromises[3] ? resolvedPromises[3][0] : null,
      vprojectDescription: this.websiteFormGroup.get('vprojectDescription')!.value,
      nschemeId: nschemeId,
    };

    console.log(requestBody);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const response = await this.http
      .post('http://localhost:8080/saveWebsiteData', [requestBody], httpOptions)
      .toPromise();

    console.log('API Response:', response);

    this.dialog.open(DialogMsgComponent, {
      data: {
        isSuccess: true,
        message: 'Website data updated successfully!',
        routerLink: '/property/home/view-scheme'
      },
    });

    this.websiteFormGroup.reset();
  } catch (error) {
    console.error('Error:', error);

    this.dialog.open(DialogMsgComponent, {
      data: {
        isSuccess: false,
        message: 'Failed to update website data. Please try again.',
      },
    });
  }
}

getWebsiteData() {
  this.httpservice.getWebsiteData(this.id).subscribe(
    (response) => {
      this.websiteData = response.data[0];
      console.log(this.websiteData);

      this.websiteFormGroup.patchValue({
        fvideo: this.websiteData.fvideo,
        ffloorPlanPicture: this.websiteData.ffloorPlanPicture,
        fpocPicture: this.websiteData.fpocPicture,
        vprojectDescription: this.websiteData.vprojectDescription,
        vamenities: this.websiteData.vamenities,
        vgeoTagLink: this.websiteData.vgeoTagLink,
        vpocName: this.websiteData.vpocName,
        vpocMobile: this.websiteData.vpocMobile,
        vpocEmail: this.websiteData.vpocEmail,
        nschemeId: this.id
      });

      if (this.websiteData.fphoto && Array.isArray(this.websiteData.fphoto)) {
        const fphotoFormArray = this.websiteFormGroup.get('fphoto') as FormArray;
        fphotoFormArray.clear();
        this.websiteData.fphoto.forEach((photo: any) => {
          fphotoFormArray.push(this.fb.control(photo));
        });
      }

      console.log(response);
    },
    (error) => {
      console.error('HTTP error:', error);
    }
  );
}

deleteWebsite()
{
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '500px',
    data: {
      message: 'Are you sure you want to delete this website Data?',
      confirmBackgroundColor: 'green',
      cancelBackgroundColor: 'red',
      confirmTextColor: 'white',
      cancelTextColor: 'white',
      confirmText: 'Yes',
      cancelText: 'No'
    }
  });
  dialogRef.afterClosed().subscribe(result => {
  if (this.websiteData && this.websiteData.n_ID) {
    const id = this.websiteData.n_ID;
    this.httpservice.deleteWebsiteData(id)
      .subscribe(
        response => {
          console.log('Successfully deleted:', response);
          this.dialog.open(DialogMsgComponent, {
            data: {
              isSuccess: true,
              message: 'Website data deleted successfully!',
              routerLink: '/property/home/view-scheme'
            },
          });


        },
        error => {
          console.error('Failed to delete:', error);

        }
      );
  } else {
    console.error('websiteData or n_ID is undefined');
  }
})
}

setFphotoArray(fphotoArray: any[]) {
  const fphotoFormArray = this.websiteFormGroup.get('fphoto') as FormArray;
  fphotoArray.forEach((photo) => {
    fphotoFormArray.push(this.fb.control(photo));
  });
}




getFileName(url: string): string {
  if (typeof url === 'string' && url.length > 0) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
  return '';
}


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value) {
      this.fruits.push(value);
      this.updateAmenitiesFormControlValue();
        if (input) {
        input.value = '';
      }
    }
  }

  remove(amenity: string): void {
    const index = this.fruits.indexOf(amenity);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.updateAmenitiesFormControlValue();
    }
  }

  private updateAmenitiesFormControlValue() {
     const amenityString = this.fruits.join(', ');
    this.websiteFormGroup.get('vamenities')!.setValue(amenityString);
  }

  onFileSelected(controlName: string, event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (!this.selectedFiles[controlName]) {
        this.selectedFiles[controlName] = [];
      }

      if (controlName === 'fphoto') {
            for (let i = 0; i < files.length; i++) {
          this.selectedFiles[controlName].push(files[i]);
          console.log('Selected Files for', controlName, ':', files[i]);
        }
      } else {
        this.selectedFiles[controlName] = [files[0]];
        console.log('Selected File for', controlName, ':', files[0]);
      }
    }
  }

  getBase64EncodedStrings(files: File[]): Promise<string[]> {
    const promises: Promise<string>[] = [];

    for (const file of files) {
      const promise = this.getBase64EncodedString(file);
      promises.push(promise);
    }

    return Promise.all(promises);
  }

  getBase64EncodedString(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }


  showCreateWebsite() {
    this.modeService.createWebsite = true;
    this.modeService.editWebsite = false;
    this.modeService.viewWebsite = false;
  }

  showViewWebsite(n_ID: number) {
    this.modeService.createWebsite = false;
    this.modeService.editWebsite = false;
    this.modeService.viewWebsite = true;
    this.idPassService.setN_ID(n_ID);

  }

  showEditWebsite(n_ID: number) {
    this.modeService.createWebsite = false;
    this.modeService.editWebsite = true;
    this.modeService.viewWebsite = false;
    this.idPassService.setN_ID(n_ID);
  }





}
