import { Routes } from '@angular/router';
import { GamesListComponent } from './components/games-list/games-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
    {
        path : '',
        pathMatch : 'full',
        component : WelcomeComponent
    },
    {
        path : 'games-list',
        pathMatch : 'full',
        component : GamesListComponent
    }
];
