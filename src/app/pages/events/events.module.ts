import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastrMessages } from '../../helpers/toaster.service';
import { MapsModule } from '../../pages/maps/maps.module';

const components = [
  EventsComponent,
  AddComponent,
  ViewComponent,
  EditComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    EventsRoutingModule,
    Ng2SmartTableModule,
    MapsModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ToastrMessages],
})
export class EventsModule { }
