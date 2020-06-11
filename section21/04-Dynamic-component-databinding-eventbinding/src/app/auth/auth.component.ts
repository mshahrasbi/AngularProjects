import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placehodler.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = false;
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      console.log('[onSubmit] loginMode');
      authObs = this.authService.login(email, password);
    } else {
      console.log('[onSubmit] signupMode');
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;

      this.router.navigate(['/recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.showError(errorMessage);
      this.isLoading = false;
    });


    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showError(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  
    const hostViewComponentRef = this.alertHost.viewContainerRef;
    hostViewComponentRef.clear();
    const componentRef = hostViewComponentRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;

    /**
     * remember that close in here is just an eventEmitter, now we know that we should use eventemitter bascially
     * only here when it is decorated with @output and whenever we manually subscribe to something you would
     * want to use a subject, here is basically the only execption to that rule. Since this is a component where 
     * we have @output, because we could use this component by a selector as well, we have an eventEmitter and yet
     * here, we manually want to subscribe and so we subscribe to this, so whenever this fires we want to run this 
     * anaynoumous function. 
     */
    this.closeSub = componentRef.instance.close.subscribe( () => {
      this.closeSub.unsubscribe();
      hostViewComponentRef.clear();
    });
  }
}
