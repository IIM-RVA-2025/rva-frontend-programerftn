import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dijagnoza } from 'src/app/model/dijagnoza.model';
import { DijagnozaService } from 'src/app/service/dijagnoza.service';

@Component({
  selector: 'app-dijagnoza-dialog',
  templateUrl: './dijagnoza-dialog.component.html',
  styleUrls: ['./dijagnoza-dialog.component.css']
})
export class DijagnozaDialogComponent {
  public flag!: number;

  constructor(public snackBar: MatSnackBar ,
    public dialogRef: MatDialogRef<DijagnozaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Dijagnoza,
    public dijagnozaService: DijagnozaService ) {}
  

  ngOnInit(): void {
  }

  public add(): void {
    this.dijagnozaService.addDijagnoza(this.data);
    this.snackBar.open('Uspešno dodata dijagnoza ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public update(): void {
    this.dijagnozaService.updateDijagnoza(this.data);
    this.snackBar.open('Uspešno izmenjena dijagnoza ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public delete(): void {
    this.dijagnozaService.deleteDijagnoza(this.data);
    this.snackBar.open('Uspešno obrisana dijagnoza ' + this.data.naziv, 'U redu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {duration: 2000});
  }

}