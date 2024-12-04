import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necessário para standalone components
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule, RouterModule], // Incluindo o FormsModule
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = ''; // Mensagem de erro

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        // Captura e armazena o token e a role
        this.authService.setUserData(response.token, response.user.role); 
        this.router.navigate(['/dashboard']); // Navega para o dashboard após o login
      },
      error: (err) => {
        // Exibe mensagem de erro em caso de falha no login
        this.errorMessage = 'Erro ao fazer login! Verifique suas credenciais.';
      },
    });
  }
}
