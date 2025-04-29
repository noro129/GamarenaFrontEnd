import { Routes } from '@angular/router';
import { GamesListComponent } from './components/games-list/games-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path : '',
        pathMatch : 'full',
        component : WelcomeComponent
    },
    {
        path : 'games-list',
        pathMatch : 'full',
        component : GamesListComponent,
        canActivate: [authGuard]
    },
    {
        path : 'game/worduess',
        pathMatch : 'full',
        loadChildren : () => 
            import('./modules/games/worduess/worduess.module').then(m => m.WorduessModule),
        canActivate: [authGuard]
    },
    {
        path : 'game/sudoku',
        pathMatch : 'full',
        loadChildren : () => 
            import('./modules/games/sudoku/sudoku.module').then(m => m.SudokuModule),
        canActivate: [authGuard]
    },
    {
        path : 'game/twins-hunt',
        pathMatch : 'full',
        loadChildren : () => 
            import('./modules/games/twins-hunt/twins-hunt.module').then(m => m.TwinsHuntModule),
        canActivate: [authGuard]
    },
    {
        path : 'game/minesweeper',
        pathMatch : 'full',
        loadChildren : () => 
            import('./modules/games/minesweeper/minesweeper.module').then(m => m.MinesweeperModule),
        canActivate: [authGuard]
    },
    {
        path : 'game/snake',
        pathMatch : 'full',
        loadChildren : () => 
            import('./modules/games/snake/snake.module').then(m => m.SnakeModule),
        canActivate: [authGuard]
    }
];
