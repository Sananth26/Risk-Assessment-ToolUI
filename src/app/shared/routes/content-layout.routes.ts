import { Routes } from '@angular/router';
import { SigninComponent } from 'src/app/auth/signin/signin.component';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
    {
        path: 'pages',
        loadChildren: () => import('../../pages/content-pages/content-pages.module').then(m => m.ContentPagesModule)

    },
    {
        path: 'auth',
        loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'urs',
        loadChildren: () => import('../../urs/ursmodules.module').then(m => m.UrsmodulesModule)
    }
    
];