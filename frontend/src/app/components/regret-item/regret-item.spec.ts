import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegretItemComponent } from './regret-item';
import { Regret } from '../../models/regret.model';

/**
 * Unit tests for RegretItemComponent.
 * Tests the component for displaying individual regret items.
 */
describe('RegretItemComponent', () => {
  let component: RegretItemComponent;
  let fixture: ComponentFixture<RegretItemComponent>;

  const mockRegret: Regret = {
    id: 1,
    content: 'Test regret content',
    author: 'Test Author',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegretItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegretItemComponent);
    component = fixture.componentInstance;
    component.regret = mockRegret;
    fixture.detectChanges();
  });

  /**
   * Test that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test that the component displays regret content.
   */
  it('should display regret content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content')?.textContent).toContain('Test regret content');
  });

  /**
   * Test that the component displays author name.
   */
  it('should display author name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.author')?.textContent).toContain('Test Author');
  });

  /**
   * Test that edit event is emitted when edit button is clicked.
   */
  it('should emit edit event when edit button is clicked', () => {
    spyOn(component.edit, 'emit');
    component.onEdit();
    expect(component.edit.emit).toHaveBeenCalledWith(mockRegret);
  });

  /**
   * Test that delete event is emitted when delete is confirmed.
   */
  it('should emit delete event when delete is confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.delete, 'emit');
    component.onDelete();
    expect(component.delete.emit).toHaveBeenCalledWith(mockRegret.id);
  });

  /**
   * Test that delete event is not emitted when delete is cancelled.
   */
  it('should not emit delete event when delete is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.delete, 'emit');
    component.onDelete();
    expect(component.delete.emit).not.toHaveBeenCalled();
  });
});
