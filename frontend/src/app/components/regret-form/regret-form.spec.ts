import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegretFormComponent } from './regret-form';

/**
 * Unit tests for RegretFormComponent.
 * Tests the form component for creating and editing regrets.
 */
describe('RegretFormComponent', () => {
  let component: RegretFormComponent;
  let fixture: ComponentFixture<RegretFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegretFormComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegretFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test that the form is invalid when content is empty.
   */
  it('should be invalid when content is empty', () => {
    component.regretForm.patchValue({ content: '', author: 'Test Author' });
    expect(component.regretForm.invalid).toBeTruthy();
  });

  /**
   * Test that the form is valid when content is provided.
   */
  it('should be valid when content is provided', () => {
    component.regretForm.patchValue({ content: 'Test regret content', author: 'Test Author' });
    expect(component.regretForm.valid).toBeTruthy();
  });

  /**
   * Test that the form emits submit event when valid.
   */
  it('should emit submit event when form is valid and submitted', () => {
    spyOn(component.submit, 'emit');
    component.regretForm.patchValue({ content: 'Test regret content', author: 'Test Author' });
    component.onSubmit();
    expect(component.submit.emit).toHaveBeenCalled();
  });

  /**
   * Test that the form does not emit submit event when invalid.
   */
  it('should not emit submit event when form is invalid', () => {
    spyOn(component.submit, 'emit');
    component.regretForm.patchValue({ content: '', author: 'Test Author' });
    component.onSubmit();
    expect(component.submit.emit).not.toHaveBeenCalled();
  });
});
