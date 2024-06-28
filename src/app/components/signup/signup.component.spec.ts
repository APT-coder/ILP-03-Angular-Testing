import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have username and password fields', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[formControlName="username"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should display error messages when username and password are invalid', () => {
    const usernameControl = component.loginForm.controls['username'];
    const passwordControl = component.loginForm.controls['password'];

    usernameControl.markAsTouched();
    passwordControl.markAsTouched();
    fixture.detectChanges();

    let errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(2);
    expect(errorMessages[0].nativeElement.textContent).toContain('Name is required.');
    expect(errorMessages[1].nativeElement.textContent).toContain('Password is required.');

    usernameControl.setValue('abc');
    passwordControl.setValue('123');
    fixture.detectChanges();

    errorMessages = fixture.debugElement.queryAll(By.css('.error-message'));
    expect(errorMessages.length).toBe(2);
    expect(errorMessages[0].nativeElement.textContent).toContain('Name must be at least 4 characters long.');
    expect(errorMessages[1].nativeElement.textContent).toContain('Password must be at least 4 characters long.');
  });

  it('should submit the form when valid', () => {
    spyOn(console, 'log');
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('testpass');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(component.submitted).toBeTruthy();
    expect(console.log).toHaveBeenCalledWith({ username: 'testuser', password: 'testpass' });
  });
});
