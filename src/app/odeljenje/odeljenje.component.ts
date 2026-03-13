import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OdeljenjeDialogComponent } from '../dialog/odeljenje-dialog/odeljenje-dialog.component';
import { Bolnica } from '../model/bolnica.model';
import { Odeljenje } from '../model/odeljenje.model';
import { OdeljenjeService } from '../service/odeljenje.service';

@Component({
  selector: 'app-odeljenje',
  templateUrl: './odeljenje.component.html',
  styleUrls: ['./odeljenje.component.css']
})
export class OdeljenjeComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'lokacija', 'bolnica', 'actions'];

  bolnica!: Bolnica;

  selektovanoOdeljenje!: Odeljenje;

  dataSource!: MatTableDataSource<Odeljenje>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public odeljenjeService: OdeljenjeService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.odeljenjeService.getAllOdeljenje().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'bolnica' ? currentTerm + data.bolnica.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data: any, property) => {
        switch (property) {
          case 'id': return data[property];
          case 'naziv': return data[property];
          case 'lokacija': return data[property];
          case 'bolnica': return data.bolnica.naziv;
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, naziv: string, lokacija: string, bolnica: Bolnica | null) {
    const dialog = this.dialog.open(OdeljenjeDialogComponent, {
      data: { id: id, naziv: naziv, lokacija: lokacija, bolnica: bolnica }
    });
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  public selectedRow(row: Odeljenje): void {
    this.selektovanoOdeljenje = row;
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
