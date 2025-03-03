import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/authentecation/auth.service';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  imports: [RouterLink],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent  {

}
