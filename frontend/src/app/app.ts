import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RegretListComponent } from './components/regret-list/regret-list';

/**
 * Root component of the Wall of Regret application.
 * This component serves as the main entry point and container
 * for the entire application.
 */
@Component({
  selector: 'app-root',
  imports: [HttpClientModule, RegretListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  /**
   * Application title.
   */
  title = 'Wall of Regret';
}
