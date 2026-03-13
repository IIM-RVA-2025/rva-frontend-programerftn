import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { Dijagnoza } from '../model/dijagnoza.model';
import { DijagnozaService } from '../service/dijagnoza.service';
import { MatDialog } from '@angular/material/dialog';
import { DijagnozaDialogComponent } from '../dialog/dijagnoza-dialog/dijagnoza-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dijagnoza',
  templateUrl: './dijagnoza.component.html',
  styleUrls: ['./dijagnoza.component.css']
})
export class DijagnozaComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'actions'];

  //dataSource!: Observable<Dijagnoza[]>;
  dataSource!: MatTableDataSource<Dijagnoza>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dijagnozaService: DijagnozaService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.dijagnozaService.getAllDijagnoza();
    this.dijagnozaService.getAllDijagnoza().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch(property) {
          case 'id': return data[property];
          case 'naziv' : return data[property];
          case 'oznaka' : return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  public openDialog(flag: number, id: number, naziv: string, opis: string,  oznaka: string) {

    //konstanta dijalog koja će pozvati da se otvori Dijagnoza dialog
    //definišemo vrednosti koje se prosleđuju dijalogu
    const dialog = this.dialog.open(DijagnozaDialogComponent, {data: {id: id, naziv: naziv, opis: opis , oznaka: oznaka}});

    //dijalogu prosleđujemo flag obeležje
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue : string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}