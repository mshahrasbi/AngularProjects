import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // id is string here and we need to convert it to number, the + sign will do this for us
    const id = +this.route.snapshot.params['id'];

    console.log(id);
    
    this.server = this.serversService.getServer(id);

    console.log(this.server);

    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
        }
      );
  }

  onEdit() {
    // now want to navigate to the edit-server.component with the help of Router.
    // you could use this.router.navigate(['/server', this.server.id, 'edit']) but
    // since we already are on this path, why not just use a a relative route and
    // just use the edit. Now if you want to use a relative path here, when using
    // the navigation method, you need to set up the 'relativeTo' property here on 
    // the second argument, on this object you can pass to navigate and refernce the
    // currently loaded route, so that the @angular/router knows to which route you
    // want to navigate relatively.
    // this.router.navigate(['edit'], {relativeTo: this.route});
    // to preserve the information we get a simple way of doing so, in the server 
    // component where we navigate, we can pass another property to this javascript
    // object we use to configure our navigation, we we get 'QueryParamsHandling' 
    // property, it takes a string as a value and this could be 'merge' our old query
    // params with any we might add here and we don't add any new ones, so can simply
    // choose 'preserve' instead and preserve which will overwrite the default which
    // is to simply drop them and make sure that the old ones are kept. Now if we were
    // to add new ones here, the old ones would actually overwrite the new ones, so
    // we should use merge in this case.
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
