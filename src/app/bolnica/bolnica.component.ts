import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { BolnicaDialogComponent } from '../dialog/bolnica-dialog/bolnica-dialog.component';
import { Bolnica } from './../model/bolnica.model';
import { BolnicaService } from './../service/bolnica.service';

@Component({
  selector: 'app-bolnica',
  templateUrl: './bolnica.component.html',
  styleUrls: ['./bolnica.component.css']
})
export class BolnicaComponent {

  displayedColumns = ['id', 'naziv', 'adresa', 'budzet', 'actions'];

  //dataSource!: Observable<Bolnica[]>;
  dataSource!: MatTableDataSource<Bolnica>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public bolnicaService: BolnicaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    //this.dataSource = this.bolnicaService.getAllBolnica();
    this.bolnicaService.getAllBolnica().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch (property) {
          case 'id': return data[property];
          case 'naziv': return data[property];
          case 'adresa': return data[property];
          case 'budzet': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, naziv: string, adresa: string, budzet: number) {
    const dialog = this.dialog.open(BolnicaDialogComponent, { data: { id: id, naziv: naziv, adresa: adresa, budzet: budzet } });
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
