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
    },
    {
        path : 'game/worduess',
        pathMatch : 'full',
        loadChildren : () => 
            import('./modules/games/worduess/worduess.module').then(m => m.WorduessModule)
    },
    {
        path : 'game/sudoku',
        pathMatch : 'full',
        loadChildren : () => 
            import('./modules/games/sudoku/sudoku.module').then(m => m.SudokuModule)
    },
    {
        path : 'game/twins-hunt',
        pathMatch : 'full',
        loadChildren : () => 
            import('./modules/games/twins-hunt/twins-hunt.module').then(m => m.TwinsHuntModule)
    }
];
