import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { Location } from '../../maps/search-map/entity/Location';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';

// import { NotificationMessages } from '../../helpers/notification.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
@Component({
  selector: 'ngx-add',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})


export class AddComponent implements OnInit {
  // baseUrl = environment.baseUrl;
  loginForm: FormGroup;

  @Output() positionChanged = new EventEmitter<Location>();

  @ViewChild('search')
  public searchElementRef: ElementRef;
  min: Date;
  searchedLocation: Location = new Location();


  constructor(
    // private notification: NotificationMessages,
    // private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private dateService: NbDateService<Date>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    //  private http: HttpClient

  ) {
    this.min = this.dateService.addDay(this.dateService.today(), 0);
  }
  imagePath;
  fileData: File = null;
  categoryForm: FormGroup;
  submitted = false;
  imgURL: any;
  message: string;
  @ViewChild('form') form;
  ngOnInit() {
    // this.categoryForm = this.formBuilder.group({
    //   name: ['', [Validators.required, Validators.minLength(4)]],
    //   image: [this.fileData, Validators.required],
    // });
    // this.mapsAPILoader.load().then(() => {
    //   const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ['address'],
    //   });
    //   autocomplete.addListener('place_changed', () => {
    //     this.ngZone.run(() => {
    //       // get the place result
    //       const place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       // verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       this.positionChanged.emit(
    //         new Location(place.geometry.location.lat(),
    //           place.geometry.location.lng()));
    //     });
    //   });
    // });
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


  updateLocation(event: Location) {
    console.log(event);
    this.searchedLocation = new Location(event.latitude, event.longitude);
  }

}
