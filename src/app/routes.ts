import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './routerGuards/auth.guard';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'member-list', component: MemberListComponent, canActivate: [AuthGuard]},
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListsComponent},
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
