import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ] 
  },
  { path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent}
    ]
  },

  // { path: 'something', component: PageNotFoundComponent}
  // let's change the something to 'not-found' and lets make sure that
  // once we add another new route whichthen is 'something', we don't have to 
  // add component here but we redirect to another route, to the not found route.
  // for this we have another property we can add to any route config, if you don't
  // want to specify a component to load, you can say 'redirectTo' redirect to another
  // path. 
  { path: 'not-found', component: PageNotFoundComponent},
  // { path: 'something', redirectTo: '/not-found'}
  // so to convenient way to catch all routes which are not covered by tour app is
  // to use the double asterisk route here. this is the wildcard route which means 
  // catch all paths. and it should be the last one in our route table
  { path: '**', redirectTo: '/not-found', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
