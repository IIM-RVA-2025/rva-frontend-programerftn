import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PacijentDialogComponent } from '../dialog/pacijent-dialog/pacijent-dialog.component';
import { Dijagnoza } from '../model/dijagnoza.model';
import { Odeljenje } from '../model/odeljenje.model';
import { Pacijent } from '../model/pacijent.model';
import { PacijentService } from '../service/pacijent.service';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css'],
})
export class PacijentComponent implements OnInit {
  displayedColumns = ['id', 'ime', 'prezime', 'zdrOsiguranje', 'datumRodjenja', 'odeljenje', 'dijagnoza', 'actions'];
  dataSource!: MatTableDataSource<Pacijent>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public pacijentService: PacijentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.pacijentService.getAllPacijent().subscribe((data: Pacijent[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, ime: string, prezime: string, zdrOsiguranje: boolean, datumRodjenja: string, odeljenje: Odeljenje | null, dijagnoza: Dijagnoza | null) {
    const dialog = this.dialog.open(PacijentDialogComponent, {
      data: { id, ime, prezime, zdrOsiguranje, datumRodjenja, odeljenje, dijagnoza }
    });
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe((result) => {
      if (result === 1) this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
