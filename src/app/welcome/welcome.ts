import { Component, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {
    // construtor sem aplicar diretamente o modo (será feito em ngOnInit após validação)
  }

  ngOnInit(): void {
    type Mode = 'padrao' | 'daltonismo' | 'baixa-visao' | 'pessoa-cega';
    const allowed: Mode[] = ['padrao', 'daltonismo', 'baixa-visao', 'pessoa-cega'];

    const saved = localStorage.getItem('accessibilityMode');
    if (saved && allowed.includes(saved as Mode)) {
      // chama applyAccessibility com tipo seguro; não persiste novamente (persist = false)
      this.applyAccessibility(saved as Mode, false);
    }
  }

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
  currentMode: 'padrao' | 'daltonismo' | 'baixa-visao' | 'pessoa-cega' = 'padrao';

  toggleAccessibilityMenu(): void {
    this.accessibilityMenuOpen = !this.accessibilityMenuOpen;
  }

  applyAccessibility(mode: 'padrao' | 'daltonismo' | 'baixa-visao' | 'pessoa-cega', persist = true): void {
    const modes = ['daltonismo', 'baixa-visao', 'pessoa-cega'];
    // remove classes do elemento root (<html>)
    modes.forEach(m => this.renderer.removeClass(document.documentElement, m));

    if (mode === 'padrao') {
      if (persist) localStorage.removeItem('accessibilityMode');
      this.currentMode = 'padrao';
    } else {
      // aplica no elemento <html> para que rem / regras globais funcionem
      this.renderer.addClass(document.documentElement, mode);
      if (persist) localStorage.setItem('accessibilityMode', mode);
      this.currentMode = mode;
    }

    // fecha menu
    this.accessibilityMenuOpen = false;
  }
}

