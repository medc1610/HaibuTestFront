import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { User } from 'src/app/core/interfaces/user.interface';
import { UserService } from 'src/app/core/service/user.service';
declare var moment: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  user!: User;
  rutIsValid = false;
  dateIsValid = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.userService.getUserId(id))
      )
      .subscribe(user => {
        this.user = user
        this.rutValidator(user.rut)
        this.birthdayValidator(user.fechaNacimiento)
      });
  }

  private birthdayValidator(fechaNacimiento: string):boolean {
    return moment(fechaNacimiento, "DD/MM/YYYY", true)
      .isValid() ? this.dateIsValid = true : this.dateIsValid = false;
  }

  private rutValidator(rut: string): boolean {
    // Verifica la longitud
    if (!rut || rut.trim().length < 3) { return this.rutIsValid = false; }
    const sanitizedRut = rut.replace(/[^0-9kK-]/g, '');
    // Verifica la longitud despues de eliminar los puntos
    if (sanitizedRut.length < 3) { return this.rutIsValid = false; }
    const split = sanitizedRut.split('-');
    // Verifica la longitud de la matriz despues de dividir el rut con el digito verificador
    if (split.length !== 2) { return this.rutIsValid = false; }
    const num = parseInt(split[0], 10);
    const dgv = split[1];
    // Invoca al método para calcular el digitor verificador
    const dvCalc = this.calculateDV(num);
    // Si el digito veriticador calculado es igual al original, el rut es valido
    return dvCalc === dgv ? this.rutIsValid = true : this.rutIsValid = false;
  }
  private calculateDV(rut: number): string {
    const body = `${rut}`;
    let sum = 0;
    let multiple = 2;
    for (let i = 1; i <= body.length; i++) {
      const index = multiple * parseInt(body.charAt(body.length - i), 10);
      sum += index;
      if (multiple < 7) {
        multiple += 1;
      } else {
        multiple = 2;
      }
    }
    const dvExpected = 11 - (sum % 11);
    if (dvExpected === 10) { return 'k'; }
    if (dvExpected === 11) { return '0'; }
    return `${dvExpected}`;
  }

  back() {
    this.router.navigate([''])
  }




}

