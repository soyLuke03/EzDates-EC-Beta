import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../users/users.component.css']
})
export class ListComponent implements OnInit {

    /** Filter, paginator y datatable */
    displayedColumns = ['username', 'name', 'surname', 'boton'];
    dataSource = new MatTableDataSource<User>();
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  constructor(private uS:UserService, private route:ActivatedRoute) { 
    this.uS.getUsers().subscribe({
      next: resp => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  filterWord:string = "";

  applyFilter() {
    this.filterWord = this.filterWord.trim(); // Remove whitespace
    this.filterWord = this.filterWord.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterWord;
  }

  /** ------------ */
  
  error: boolean = false;
  userList: User[] = [];
  UserN:string = ""
  
  ngOnInit(): void {

    
  }



}

