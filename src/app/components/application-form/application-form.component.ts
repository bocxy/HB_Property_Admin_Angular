import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})

export class ApplicationFormComponent {

  unitDetailsForm!: FormGroup;
  applicantForm!: FormGroup;
  bankDetailsForm!: FormGroup;
  paymentForm!: FormGroup;
  documentForm!: FormGroup;
  showPopup = false;
  id:any;
  ApplData:any

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private dialog: MatDialog,
    private router: Router,
    private route : ActivatedRoute) { }

  ngOnInit() {

    this.unitDetailsForm = this.formBuilder.group({
      unitAccountNo: [''],
      unitType: [''],
      modeOfAllotment: [''],
      cityRural: [''],
      circle: [''],
      scheme: [''],
      type: [''],
      blockNo: [''],
      floorNo: [''],
      flatNo: [''],
      unitNo: [''],
      plotUdsArea: [''],
      plinthArea: [''],
      reservationCategory: [''],
      priorityBasis: [''],
      costOfUnit: ['']
    });

    this.applicantForm = this.formBuilder.group({
      applicantName: ['', Validators.required],
      dateOfBirth: [''],
      age: [''],
      applicantSpouseName: [''],
      applicantFathersName: [''],
      jointApplicantName: [''],
      jointApplicantDOB: [''],
      jointApplicantAge: [''],
      jointApplicantSpouseName: [''],
      jointApplicantFathername: [''],
      mobileNumber: [''],
      emailId: [''],
      aadhaarNumber: [''],
      panNumber: [''],
      correspondenceAddress: [''],
      permanentAddress: [''],
      applicantMonthlyIncome: [''],
      spouseMonthlyIncome: [''],
      totalMonthlyIncome: ['']
    });

    this.bankDetailsForm = this.formBuilder.group({
      bankName: [''],
      accountNumber: [''],
      ifscCode: [''],
      accountHolderName: ['']
    });

    this.paymentForm = this.formBuilder.group({
      applicationFee: [''],
      registrationFee: [''],
      amountPaid: [''],

    });

    this.documentForm = this.formBuilder.group({
      nativecertificate: [''],
      birthcertificate: [''],
      aadhar: [''],
      pan: [''],
      incomecertificate: [''],
      maincategorycertificate:[''],
      subcategorycertificate: [''],
      signature: [''],
      joinapplsignature:['']

    });

    this.id= this.route.snapshot.paramMap.get('id')!;

    this.httpService.getApplform(this.id).subscribe((response: any) => {
    if (response && response.status === 1 && response.data) {
      console.log(response.data)
      this.ApplData = response.data
      const data = response.data;


    this.unitDetailsForm.patchValue({
      unitAccountNo: data.unitAccountNo,
      unitType: data.unitType,
      modeOfAllotment: data.modeOfAllotment,
      cityRural: data.cityRural,
      circle: data.circle,
      scheme: data.scheme,
      type: data.type,
      blockNo: data.blockNo,
      floorNo: data.floorNo,
      flatNo: data.flatNo,
      unitNo: data.unitNo,
      plotUdsArea: data.plotUdsArea,
      plinthArea: data.plinthArea,
      reservationCategory: data.reservationCategory,
      priorityBasis: data.priorityBasis,
      costOfUnit: data.costOfUnit
    });


    this.applicantForm.patchValue({
      applicantName: data.applicantName,
      dateOfBirth: data.dateOfBirth,
      age: data.age,
      applicantSpouseName: data.applicantSpouseName,
      applicantFathersName: data.applicantFathersName,
      jointApplicantName: data.jointApplicantName,
      jointApplicantDOB: data.jointApplicantDOB,
      jointApplicantAge: data.jointApplicantAge,
      jointApplicantSpouseName: data.jointApplicantSpouseName,
      jointApplicantFathername: data.jointApplicantFathername,
      mobileNumber: data.mobileNumber,
      emailId: data.emailId,
      aadhaarNumber: data.aadhaarNumber,
      panNumber: data.panNumber,
      correspondenceAddress: data.correspondenceAddress,
      permanentAddress: data.permanentAddress,
      applicantMonthlyIncome: data.applicantMonthlyIncome,
      spouseMonthlyIncome: data.spouseMonthlyIncome,
      totalMonthlyIncome: data.totalMonthlyIncome
    });


    this.bankDetailsForm.patchValue({
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      ifscCode: data.ifscCode,
      accountHolderName: data.accountHolderName
    });

    this.paymentForm.patchValue({
      applicationFee: data.applicationFee,
      registrationFee: data.registrationFee,
      amountPaid: data.amountPaid,
    });

    this.documentForm.patchValue({
      nativecertificate: data.nativeOfTamilnadu_filepath,
      birthcertificate: data.birthCertificate_filepath,
      aadhar: data.aadhaarProof_filepath,
      pan: data.panProof_filepath,
      incomecertificate: data.incomeCertificate_filepath,
      maincategorycertificate: data.reservationCategoryProof_filepath,
      subcategorycertificate: data.reservationSubCategoryProof_filepath,
      signature: data.signature_filepath,
      joinapplsignature : data.jointApplSignFilePath

    });
  }
  });

}


openFileInNewTab(filePath: string): string {
  return 'file://' + filePath;
}

// openFileInNewTab(filePath: string): string {
//   return 'file://' + filePath.replace(/\\/g, '/');
// }

togglePopup(): void {
  this.showPopup = !this.showPopup;
}

closePopup(): void {
  this.showPopup = false;
}


accept(): void {
this.showPopup = false;
this.ApplData.status = "Approved";
this.httpService.saveApplform(this.ApplData).subscribe((response: any) => {
if (response && response.status === 1 && response.data) {
    console.log(response.data)
    const requestBody = {
      schemeId: this.ApplData.schemeNId,
      unitId: this.ApplData.unitNId,
      category: this.ApplData.reservationCategory,
      subcategory: this.ApplData.priorityBasis,
      status: "accept",
      reservation: "Reservation"
    };
  this.httpService.listreduce(requestBody).subscribe(
      (response: any) => {
        if (response && response.status === 1 && response.data) {
          console.log(response.data);
        }
      },
      (error) => {
        console.log(error)
      }
    );
    this.openDialog(true, 'Application Accepted Successfully!','/property/home/application');
  }});

}

reject(): void {
  this.showPopup = false;
  this.ApplData.status = "Rejected";
  this.httpService.saveApplform(this.ApplData).subscribe((response: any) => {
    if (response && response.status === 1 && response.data) {
    console.log(response.data)
    const requestBody = {
      schemeId: this.ApplData.schemeNId,
      unitId: this.ApplData.unitNId,
      category: this.ApplData.reservationCategory,
      subcategory: this.ApplData.priorityBasis,
      status: "reject",
      reservation: "Reservation"
    };
  this.httpService.listreduce(requestBody).subscribe(
      (response: any) => {
        if (response && response.status === 1 && response.data) {
          console.log(response.data);
        }
      },
      (error) => {
        console.log(error)
      }
    );
    this.openDialog(true, 'Application Rejected Successfully!' ,'/property/home/application' );
  }});

}


openDialog(isSuccess: boolean, message: string ,routerLink:string ) {
  const dialogRef = this.dialog.open(DialogMsgComponent, {
    width: '400px',
    data: { isSuccess, message ,routerLink}
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}

}


