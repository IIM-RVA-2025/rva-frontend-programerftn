import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { AuthorComponent } from './core/author/author.component';
import { BolnicaComponent } from './bolnica/bolnica.component';
import { DijagnozaComponent } from './dijagnoza/dijagnoza.component';
import { OdeljenjeComponent } from './odeljenje/odeljenje.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { BolnicaDialogComponent } from './dialog/bolnica-dialog/bolnica-dialog.component';
import { DijagnozaDialogComponent } from './dialog/dijagnoza-dialog/dijagnoza-dialog.component';
import { OdeljenjeDialogComponent } from './dialog/odeljenje-dialog/odeljenje-dialog.component';
import { PacijentDialogComponent } from './dialog/pacijent-dialog/pacijent-dialog.component';

import { BolnicaService } from './service/bolnica.service';
import { DijagnozaService } from './service/dijagnoza.service';
import { OdeljenjeService } from './service/odeljenje.service';
import { PacijentService } from './service/pacijent.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'bolnica', component: BolnicaComponent },
  { path: 'dijagnoza', component: DijagnozaComponent },
  { path: 'odeljenje', component: OdeljenjeComponent },
  { path: 'pacijent', component: PacijentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    BolnicaComponent,
    DijagnozaComponent,
    OdeljenjeComponent,
    PacijentComponent,
    BolnicaDialogComponent,
    DijagnozaDialogComponent,
    OdeljenjeDialogComponent,
    PacijentDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  providers: [
    BolnicaService,
    DijagnozaService,
    OdeljenjeService,
    PacijentService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
