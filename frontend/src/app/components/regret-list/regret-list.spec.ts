import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegretListComponent } from './regret-list';
import { RegretService } from '../../services/regret.service';
import { Regret } from '../../models/regret.model';
import { of, throwError } from 'rxjs';

/**
 * Unit tests for RegretListComponent.
 * Tests the main component for displaying and managing regrets.
 */
describe('RegretListComponent', () => {
  let component: RegretListComponent;
  let fixture: ComponentFixture<RegretListComponent>;
  let regretService: jasmine.SpyObj<RegretService>;

  const mockRegrets: Regret[] = [
    {
      id: 1,
      content: 'Test regret 1',
      author: 'Author 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      content: 'Test regret 2',
      author: 'Author 2',
      createdAt: '2023-01-02T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z'
    }
  ];

  beforeEach(async () => {
    const regretServiceSpy = jasmine.createSpyObj('RegretService', [
      'getAllRegrets',
      'createRegret',
      'updateRegret',
      'deleteRegret'
    ]);

    await TestBed.configureTestingModule({
      imports: [RegretListComponent, HttpClientTestingModule],
      providers: [
        { provide: RegretService, useValue: regretServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegretListComponent);
    component = fixture.componentInstance;
    regretService = TestBed.inject(RegretService) as jasmine.SpyObj<RegretService>;
  });

  /**
   * Test that the component is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test that regrets are loaded on initialization.
   */
  it('should load regrets on init', () => {
    regretService.getAllRegrets.and.returnValue(of(mockRegrets));
    
    component.ngOnInit();
    
    expect(regretService.getAllRegrets).toHaveBeenCalled();
    expect(component.regrets).toEqual(mockRegrets);
    expect(component.loading).toBeFalse();
  });

  /**
   * Test that error is handled when loading regrets fails.
   */
  it('should handle error when loading regrets fails', () => {
    regretService.getAllRegrets.and.returnValue(throwError(() => new Error('Test error')));
    
    component.ngOnInit();
    
    expect(component.error).toBe('Failed to load regrets. Please try again.');
    expect(component.loading).toBeFalse();
  });

  /**
   * Test that new regret is created successfully.
   */
  it('should create new regret', () => {
    const newRegret: Regret = {
      id: 3,
      content: 'New regret',
      author: 'New Author',
      createdAt: '2023-01-03T00:00:00.000Z',
      updatedAt: '2023-01-03T00:00:00.000Z'
    };
    
    regretService.createRegret.and.returnValue(of(newRegret));
    component.regrets = [...mockRegrets];
    
    component.onCreateRegret({ content: 'New regret', author: 'New Author' });
    
    expect(regretService.createRegret).toHaveBeenCalledWith({ content: 'New regret', author: 'New Author' });
    expect(component.regrets[0]).toEqual(newRegret);
    expect(component.showAddForm).toBeFalse();
  });

  /**
   * Test that regret is deleted successfully.
   */
  it('should delete regret', () => {
    regretService.deleteRegret.and.returnValue(of(void 0));
    component.regrets = [...mockRegrets];
    
    component.onDeleteRegret(1);
    
    expect(regretService.deleteRegret).toHaveBeenCalledWith(1);
    expect(component.regrets.length).toBe(1);
    expect(component.regrets.find(r => r.id === 1)).toBeUndefined();
  });
});
