import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegretService } from './regret.service';
import { Regret, CreateRegretDto, UpdateRegretDto } from '../models/regret.model';

/**
 * Unit tests for RegretService.
 * Tests the service for handling HTTP requests to the regret API.
 */
describe('RegretService', () => {
  let service: RegretService;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegretService]
    });
    service = TestBed.inject(RegretService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Test that the service is created successfully.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test that getAllRegrets makes correct HTTP request.
   */
  it('should retrieve all regrets', () => {
    service.getAllRegrets().subscribe(regrets => {
      expect(regrets).toEqual(mockRegrets);
    });

    const req = httpMock.expectOne('http://localhost:3000/regrets');
    expect(req.request.method).toBe('GET');
    req.flush(mockRegrets);
  });

  /**
   * Test that getRegretById makes correct HTTP request.
   */
  it('should retrieve regret by id', () => {
    const regretId = 1;
    const mockRegret = mockRegrets[0];

    service.getRegretById(regretId).subscribe(regret => {
      expect(regret).toEqual(mockRegret);
    });

    const req = httpMock.expectOne(`http://localhost:3000/regrets/${regretId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRegret);
  });

  /**
   * Test that createRegret makes correct HTTP request.
   */
  it('should create a new regret', () => {
    const newRegretDto: CreateRegretDto = {
      content: 'New regret content',
      author: 'New Author'
    };
    const createdRegret: Regret = {
      id: 3,
      ...newRegretDto,
      createdAt: '2023-01-03T00:00:00.000Z',
      updatedAt: '2023-01-03T00:00:00.000Z'
    };

    service.createRegret(newRegretDto).subscribe(regret => {
      expect(regret).toEqual(createdRegret);
    });

    const req = httpMock.expectOne('http://localhost:3000/regrets');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newRegretDto);
    req.flush(createdRegret);
  });

  /**
   * Test that updateRegret makes correct HTTP request.
   */
  it('should update an existing regret', () => {
    const regretId = 1;
    const updateDto: UpdateRegretDto = {
      content: 'Updated content'
    };
    const updatedRegret: Regret = {
      ...mockRegrets[0],
      content: 'Updated content',
      updatedAt: '2023-01-03T00:00:00.000Z'
    };

    service.updateRegret(regretId, updateDto).subscribe(regret => {
      expect(regret).toEqual(updatedRegret);
    });

    const req = httpMock.expectOne(`http://localhost:3000/regrets/${regretId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updateDto);
    req.flush(updatedRegret);
  });

  /**
   * Test that deleteRegret makes correct HTTP request.
   */
  it('should delete a regret', () => {
    const regretId = 1;

    service.deleteRegret(regretId).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`http://localhost:3000/regrets/${regretId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

