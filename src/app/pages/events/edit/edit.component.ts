import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ToastrMessages } from '../../../helpers/toaster.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-edit',
  styleUrls: ['./edit.component.scss'],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;
  categoryStatus: string;
  spinner = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private toast: ToastrMessages,

  ) {
    this.http.get(this.baseUrl + 'viewCategory/' + this.route.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.f['name'].setValue(response.body.name);
        this.f['image'].setValue(response.body.image);
        this.f['addedBy'].setValue(response.body.email);
        this.categoryStatus = response.body.status;
        this.imgURL = this.imagesUrl + response.body.image;
      }, (error) => {
        this.toast.showToast(NbToastStatus.DANGER, 'Invalid Category!', 'Please Check Category Id');
      },
    );
  }
  imagePath;
  fileData: File = null;
  categoryForm: FormGroup;
  submitted = false;
  imgURL: any;
  message: string;
  @ViewChild('form') form;
  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      image: [this.fileData, Validators.required],
      addedBy: [],
    });
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    this.f['image'].setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    this.imagePath = files;
    this.fileData = <File>files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }
  ////// ========================== super admin login function =========================== //////
  addCategory() {
    this.submitted = true;
    //       if (this.categoryForm.invalid) {
    //         return;
    //       }
    //       this.ngxService.start();
    //       const formData = new FormData();
    //       formData.append('name', this.f.name.value);
    //       formData.append('image', this.fileData);
    //        this.http.post(this.baseUrl + 'addCategory', formData).subscribe(
    //         (response: any) => {
    //           this.ngxService.stop();
    //           if (response.message === 'Exists' || response.message === 'Error') {
    //             this.notification.errorMessage(response.body);
    //            }  else if (response.message === 'Added') {
    //             this.notification.successMessage(response.body);
    //             this.form.nativeElement.reset();
    //             this.imgURL = '';
    // // tslint:disable-next-line: forin
    //             for (const i in this.categoryForm.controls) {
    //               this.categoryForm.controls[i].setErrors(null);
    //             }
    //           }
    //       },
    //       (error) => {
    //         this.ngxService.stop();
    //         this.notification.errorMessage( error);
    //       });
  }

  ////// ========================== update cateory status ================================= //////

  updateStatus(status: string) {
    this.spinner = true;
    this.http.put(this.baseUrl + 'changeStatus', { id: this.route.snapshot.paramMap.get('id'), status: status })
      .subscribe(
        (response: any) => {
          this.spinner = false;
          this.toast.showToast(NbToastStatus.SUCCESS, response.message, response.body);
          if (status === 'Active') {
            this.categoryStatus = 'Active';
          } else {
            this.categoryStatus = 'Inactive';
          }
        }, (error) => {
          this.spinner = false;
          this.toast.showToast(NbToastStatus.DANGER, 'Error', 'Something Went Wrong.Please Try Again!');
        });
  }
}
