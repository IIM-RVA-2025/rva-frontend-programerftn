import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dijagnoza } from 'src/app/model/dijagnoza.model';
import { Odeljenje } from 'src/app/model/odeljenje.model';
import { DijagnozaService } from 'src/app/service/dijagnoza.service';
import { OdeljenjeService } from 'src/app/service/odeljenje.service';
import { PacijentService } from 'src/app/service/pacijent.service';
import { Pacijent } from './../../model/pacijent.model';

@Component({
  selector: 'app-pacijent-dialog',
  templateUrl: './pacijent-dialog.component.html',
  styleUrls: ['./pacijent-dialog.component.css']
})
export class PacijentDialogComponent implements OnInit {
  public flag!: number;
  dijagnozas!: Dijagnoza[];
  odeljenjes!: Odeljenje[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PacijentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pacijent,
    public pacijentService: PacijentService,
    public odeljenjeService: OdeljenjeService,
    public dijagnozaService: DijagnozaService
  ) {}

  ngOnInit(): void {
    this.dijagnozaService.getAllDijagnoza().subscribe(d => this.dijagnozas = d);
    this.odeljenjeService.getAllOdeljenje().subscribe(o => this.odeljenjes = o);
  }

  public add(): void {
    this.pacijentService.addPacijent(this.data);
    this.snackBar.open('Uspešno dodat pacijent ' + this.data.ime, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.pacijentService.updatePacijent(this.data);
    this.snackBar.open('Uspešno izmenjen pacijent ' + this.data.ime, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.pacijentService.deletePacijent(this.data);
    this.snackBar.open('Uspešno obrisan pacijent ' + this.data.ime, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

  compareTo(a: any, b: any) { return a && b && a.id === b.id; }
}
