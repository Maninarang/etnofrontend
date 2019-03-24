import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrMessages } from '../../helpers/toaster.service';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const components = [
  CategoriesComponent,
  AddComponent,
  ViewComponent,
  EditComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    CategoriesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ToastrMessages,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CategoriesModule { }
