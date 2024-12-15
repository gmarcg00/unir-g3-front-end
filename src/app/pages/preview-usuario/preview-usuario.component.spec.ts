import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUsuarioComponent } from './preview-usuario.component';

describe('PreviewUsuarioComponent', () => {
  let component: PreviewUsuarioComponent;
  let fixture: ComponentFixture<PreviewUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
