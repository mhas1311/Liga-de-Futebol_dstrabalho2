import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class WelcomeComponent {

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToJogadores() {
    this.router.navigate(['/jogadores']);
  }

  navigateToTimes() {
    this.router.navigate(['/times']);
  }

  navigateToContratos() {
    this.router.navigate(['/contratos']);
  }

  navigateToJogadorRestricoes() {
    this.router.navigate(['/jogador-restricoes']);
  }

  navigateToTimeRestricoes() {
    this.router.navigate(['/time-restricoes']);
  }

  accessibilityMenuOpen = false;

  toggleAccessibilityMenu(): void {
    this.accessibilityMenuOpen = !this.accessibilityMenuOpen;
  }

  applyAccessibility(mode: 'daltonismo' | 'baixa-visao' | 'pessoa-cega'): void {
    // remover classes anteriores
    this.renderer.removeClass(document.body, 'daltonismo');
    this.renderer.removeClass(document.body, 'baixa-visao');
    this.renderer.removeClass(document.body, 'pessoa-cega');

    // aplicar a escolhida
    if (mode) {
      this.renderer.addClass(document.body, mode);
    }

    // fechar menu após aplicar
    this.accessibilityMenuOpen = false;
  }
}

