import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bolnica } from 'src/app/model/bolnica.model';
import { BolnicaService } from 'src/app/service/bolnica.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-bolnica-dialog',
  templateUrl: './bolnica-dialog.component.html',
  styleUrls: ['./bolnica-dialog.component.css']
})
export class BolnicaDialogComponent {
  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BolnicaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Bolnica,
    public bolnicaService: BolnicaService ) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.bolnicaService.addBolnica(this.data);
    this.snackBar.open('Uspešno dodata bolnica ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.bolnicaService.updateBolnica(this.data);
    this.snackBar.open('Uspešno izmenjena bolnica ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.bolnicaService.deleteBolnica(this.data);
    this.snackBar.open('Uspešno obrisana bolnica ' + this.data.id, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});

}
}