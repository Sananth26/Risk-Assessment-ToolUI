import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    },
  
    // {
    //     path: 'ui-elements',
    //     loadChildren: () => import('../../ui-elements/ui-elements.module').then(m => m.UIElementsModule)
    // },
    // {
    //     path: 'charts',
    //     loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsNg2Module)

    // },
    // {
    //     path: 'form',
    //     loadChildren: () => import('../../form/form.module').then(m => m.FormModule)
    // },
    // {
    //     path: 'calendar',
    //     loadChildren: () => import('../../fullcalendar/fullcalendar.module').then(m => m.FullcalendarModule)

    // },
    // {
    //     path: 'table',
    //     loadChildren: () => import('../../tables/tables.module').then(m => m.TablesModule)

    // },
    // {
    //     path: 'datatable',
    //     loadChildren: () => import('../../datatable/datatable.module').then(m => m.DatatableModule)

    // },
    // {
    //     path: 'ui-icons',
    //     loadChildren: () => import('../../ui-icons/ui-icons.module').then(m => m.UiIconsModule)

    // },
    // {
    //     path: 'maps',
    //     loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule)

    // },
    // {
    //     path: 'master-dynamic-form',
    //     loadChildren: () => import('../../master-dynamic-form/master-dynamic-form/master-dynamic-form.module').then(m => m.FullPagesModule)

    // },
    {
        path: 'pages',
        loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)

    },
    {
       path: 'urs',
       loadChildren: () => import('../../urs/ursmodules.module').then(m => m.UrsmodulesModule)
     }

];