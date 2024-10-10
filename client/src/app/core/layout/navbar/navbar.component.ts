import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { PasswordsService } from '../../services/password/passwords.service';
import { Register } from '../../../models/register.model';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

  
export class NavbarComponent implements OnInit {

  fname: string = ''
  email: string = '' 
  showPopup = false; 

  isLoggedIn! : Observable<boolean>
 
  isDropdownVisible = false;
  

  logService = inject(LoginService)
  registerService = inject(PasswordsService)
  router = inject(Router)

@ViewChild('navbarDefault') navbarDefault!: ElementRef


  ngOnInit() {

    this.isLoggedIn = this.logService.loggedIn$
    this.loadUsers()
    
  }


  loadUsers(){

     this.logService.userData$.subscribe({
      next: (userData) => {

        if(userData){
          console.log(userData)
          this.fname = userData.fname
          this.email = userData.email
        }
      },
      error: (error) => {
        console.error(error)
      }
    })
  }



  deleteUser(){

 

    this.logService.deleteUser().subscribe({
      next: (response) => {
        this.logService.clearToken(); 
        this.router.navigate(['/login']);
        console.log(response)
        this.showPopup = false; 
      },
      error: (error) => {

        console.error(error)
      }
    })


  }

  toggleNavbar() {
    const navbar = this.navbarDefault.nativeElement;
    navbar.classList.toggle('hidden');
}



  logOut(){
    this.logService.logOut()
    this.router.navigate(['/login'])
  }



}
