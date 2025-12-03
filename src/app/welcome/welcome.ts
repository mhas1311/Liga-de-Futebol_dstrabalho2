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
    modes.forEach(m => {
    this.renderer.removeClass(document.body, m);
    this.renderer.removeClass(document.documentElement, m);
  });

// Encontrar container
  const container = document.querySelector('.welcome-container, .login-container, .contratos-container, .jogadores-container, .times-container, .jogador-restricoes-container, .time-restricoes-container');

  if (mode === 'padrao') {
    // Resetar tudo
    if (container) {
      this.renderer.setStyle(container, 'filter', 'none');
    }
    this.renderer.setStyle(document.body, 'filter', 'none');

    if (persist) localStorage.removeItem('accessibilityMode');
    this.currentMode = 'padrao';
    this.showToastMessage('Modo padrão restaurado');

  } else {
    // Aplicar classe no body
    this.renderer.addClass(document.body, mode);

    // Aplicar filtro DIRETAMENTE no container
    if (mode.startsWith('daltonismo-') && container) {
      const filterType = mode.replace('daltonismo-', '');
      let filterValue = '';

      switch(filterType) {
        case 'protanopia':
          filterValue = 'url(#protanopia-filter)';
          break;
        case 'deuteranopia':
          filterValue = 'url(#deuteranopia-filter)';
          break;
        case 'tritanopia':
          filterValue = 'url(#tritanopia-filter)';
          break;
        case 'monocromatico':
          filterValue = 'grayscale(100%) contrast(1.2)';
          break;
      }

      this.renderer.setStyle(container, 'filter', filterValue);
      console.log(`Filtro aplicado no container: ${filterValue}`);
    }

    if (persist) localStorage.setItem('accessibilityMode', mode);
    this.currentMode = mode;

    this.showToastMessage(`Modo ${this.getModeName(mode)} ativado`);
  }


    if (mode === 'padrao') {
      if (persist) localStorage.removeItem('accessibilityMode');
      this.currentMode = 'padrao';
    } else {
      this.renderer.addClass(document.documentElement, mode);
      if (persist) localStorage.setItem('accessibilityMode', mode);
      this.currentMode = mode;

      // Notificação para modo Pessoa Cega
      if (mode === 'pessoa-cega') {
        this.showToastMessage('TabIndex implementado globalmente, pronto para uso com a tecnologia Text to Speech!');
      }
    }

    this.accessibilityMenuOpen = false;
    this.daltonismoSubmenuOpen = false;
  }

private getModeName(mode: string): string {
    const modeNames: { [key: string]: string } = {
      'daltonismo-protanopia': 'Protanopia (Vermelho)',
      'daltonismo-deuteranopia': 'Deuteranopia (Verde)',
      'daltonismo-tritanopia': 'Tritanopia (Azul)',
      'daltonismo-monocromatico': 'Monocromático'
    };
    return modeNames[mode] || mode;
  }

  showToastMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
}

