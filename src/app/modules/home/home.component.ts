import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/service/user.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  public spinner = true;
  public displayedColumns: string[] = ['id', 'nombre', 'apellido', 'estado'];
  public team: MatTableDataSource<User> = new MatTableDataSource;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }


  

  getUser() {
    this.userService.getUser()
      .subscribe(team => {
        this.team = new MatTableDataSource<User>(team)
        this.team.sort = this.sort;
        this.spinner = false;
      })
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.team.filter = filterValue.trim().toLowerCase();
    this.team.filterPredicate = function (data, filter: string): boolean {
      return data.nombre.toLowerCase().includes(filter);
    };
  }
}
