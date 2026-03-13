import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bolnica } from 'src/app/model/bolnica.model';
import { Odeljenje } from 'src/app/model/odeljenje.model';
import { BolnicaService } from 'src/app/service/bolnica.service';
import { OdeljenjeService } from 'src/app/service/odeljenje.service';

@Component({
  selector: 'app-odeljenje-dialog',
  templateUrl: './odeljenje-dialog.component.html',
  styleUrls: ['./odeljenje-dialog.component.css']
})
export class OdeljenjeDialogComponent implements OnInit {
  public flag!: number;
  bolnicas!: Bolnica[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OdeljenjeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Odeljenje,
    public odeljenjeService: OdeljenjeService,
    public bolnicaService: BolnicaService
  ) {}

  ngOnInit(): void {
    this.bolnicaService.getAllBolnica().subscribe(bolnicas => this.bolnicas = bolnicas);
  }

  public add(): void {
    this.odeljenjeService.addOdeljenje(this.data);
    this.snackBar.open('Uspešno dodato odeljenje ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.odeljenjeService.updateOdeljenje(this.data);
    this.snackBar.open('Uspešno izmenjeno odeljenje ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.odeljenjeService.deleteOdeljenje(this.data);
    this.snackBar.open('Uspešno obrisano odeljenje ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

  compareTo(a: any, b: any) { return a && b && a.id === b.id; }
}
