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
  accessibilityMenuOpen = false;
  daltonismoSubmenuOpen = false;
  currentMode: 'padrao' | 'daltonismo-protanopia' | 'daltonismo-deuteranopia' | 'daltonismo-tritanopia' | 'daltonismo-monocromatico' | 'baixa-visao' | 'pessoa-cega' = 'padrao';
  showToast = false;
  toastMessage = '';

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    type Mode = 'padrao' | 'daltonismo-protanopia' | 'daltonismo-deuteranopia' | 'daltonismo-tritanopia' | 'daltonismo-monocromatico' | 'baixa-visao' | 'pessoa-cega';
    const allowed: Mode[] = ['padrao', 'daltonismo-protanopia', 'daltonismo-deuteranopia', 'daltonismo-tritanopia', 'daltonismo-monocromatico', 'baixa-visao', 'pessoa-cega'];

    const saved = localStorage.getItem('accessibilityMode');
    if (saved && allowed.includes(saved as Mode)) {
      this.applyAccessibility(saved as Mode, false);
    }
  }

  toggleAccessibilityMenu(): void {
    this.accessibilityMenuOpen = !this.accessibilityMenuOpen;
    if (this.accessibilityMenuOpen) {
      this.daltonismoSubmenuOpen = false;
    }
  }

  toggleDaltonismoSubmenu(): void {
    this.daltonismoSubmenuOpen = !this.daltonismoSubmenuOpen;
  }

  // Trata eventos de teclado nos cards (Enter/Space)
  onCardKeydown(event: KeyboardEvent, route: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.navigateByRoute(route);
    }
  }

  // Navega para rota por string
  private navigateByRoute(route: string): void {
    switch (route) {
      case 'jogadores':
        this.navigateToJogadores();
        break;
      case 'times':
        this.navigateToTimes();
        break;
      case 'contratos':
        this.navigateToContratos();
        break;
      case 'jogador-restricoes':
        this.navigateToJogadorRestricoes();
        break;
      case 'time-restricoes':
        this.navigateToTimeRestricoes();
        break;
      case 'login':
        this.navigateToLogin();
        break;
    }
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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  applyAccessibility(mode: 'padrao' | 'daltonismo-protanopia' | 'daltonismo-deuteranopia' | 'daltonismo-tritanopia' | 'daltonismo-monocromatico' | 'baixa-visao' | 'pessoa-cega', persist = true): void {
    const modes = ['daltonismo-protanopia', 'daltonismo-deuteranopia', 'daltonismo-tritanopia', 'daltonismo-monocromatico', 'baixa-visao', 'pessoa-cega'];
    modes.forEach(m => this.renderer.removeClass(document.documentElement, m));

    if (mode === 'padrao') {
      if (persist) localStorage.removeItem('accessibilityMode');
      this.currentMode = 'padrao';
    } else {
      this.renderer.addClass(document.documentElement, mode);
      if (persist) localStorage.setItem('accessibilityMode', mode);
      this.currentMode = mode;

      // Notificação para modo Pessoa Cega
      if (mode === 'pessoa-cega') {
        this.showToastMessage('Tab Index implementado, pronto para uso com Text to Speech!');
      }
    }

    this.accessibilityMenuOpen = false;
    this.daltonismoSubmenuOpen = false;
  }

  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
}

