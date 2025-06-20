import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs'; // We need this to use async/await with HttpClient

// Define the Regret interface
interface Regret {
  id: number;
  content: string;
  author: string;
  location: string;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  regretForm: FormGroup;
  regrets: Regret[] = [];
  isEditing = false;
  editId: number | null = null;
  username: string | null = null;
  isLoading = false;
  statusMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.regretForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    this.loadUsername();
    this.loadRegrets();
  }

  loadUsername(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.username = JSON.parse(storedUser).username;
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadRegrets(): void {
    this.http.get<Regret[]>('http://localhost:3000/regrets').subscribe({
      next: (data) => {
        this.regrets = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      error: (err) => console.error('Failed to load regrets', err),
    });
  }

  /**
   * NEW: Fetches a city name from coordinates using a free Reverse Geocoding API.
   * @param lat - Latitude
   * @param lon - Longitude
   * @returns A Promise that resolves to the city name string.
   */
  private async getCityFromCoordinates(lat: number, lon: number): Promise<string> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    try {
      // Use lastValueFrom for a modern async/await syntax with HttpClient
      const response: any = await lastValueFrom(this.http.get(apiUrl));
      const address = response.address;
      // Look for city, town, or village in the response. Return the first one found.
      return address.city || address.town || address.village || 'A specific location';
    } catch (error) {
      console.error("Reverse geocoding failed", error);
      // If the API fails, return a generic location name
      return 'An unknown land';
    }
  }

  /**
   * UPDATED: Now gets coordinates and then converts them to a city name.
   */
  private getUserLocation(): Promise<string> {
    this.statusMessage = 'Fetching your location...';
    
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject('Geolocation is not supported by your browser.');
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.statusMessage = 'Location found! Identifying city...';
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // After getting coordinates, call the new function to get the city name
          const cityName = await this.getCityFromCoordinates(lat, lon);
          resolve(cityName);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED: return reject('Location permission was denied.');
            case error.TIMEOUT: return reject('Could not get location in time.');
            default: return reject('An error occurred while fetching location.');
          }
        },
        { timeout: 15000 } // Timeout set to 15 seconds
      );
    });
  }

  /**
   * The onSubmit logic remains the same, as it already handles the Promise from getUserLocation.
   */
  async onSubmit(): Promise<void> {
    if (this.regretForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.statusMessage = null;
    let location = 'Unknown';

    try {
      location = await this.getUserLocation();
      this.statusMessage = 'Location identified! Submitting...';
    } catch (error) {
      console.error('Location Error:', error);
      this.statusMessage = `${error}. Posting with "Unknown" location.`;
      await new Promise(res => setTimeout(res, 2000));
    }
    
    const payload = {
      content: this.regretForm.value.content,
      author: this.username || 'Anonymous', // Keeping the anonymous logic simple for now
      location: location,
    };
    
    this.createRegret(payload);
  }

  private createRegret(payload: {content: string, author: string, location: string}): void {
    this.http.post<Regret>('http://localhost:3000/regrets', payload).subscribe({
      next: (createdRegret) => {
        this.regrets.unshift(createdRegret);
        this.regretForm.reset();
        this.statusMessage = 'Regret posted successfully!';
        setTimeout(() => this.statusMessage = null, 2000);
      },
      error: (err) => {
        this.statusMessage = `Error: ${err.error.message || 'Failed to submit.'}`;
        this.isLoading = false;
        console.error('Backend Error:', err.error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  // Other methods remain unchanged
  deleteRegret(id: number): void {
    if(confirm('Are you sure?')) {
      this.http.delete(`http://localhost:3000/regrets/${id}`).subscribe(() => {
        this.regrets = this.regrets.filter(r => r.id !== id);
      });
    }
  }

  editRegret(regret: Regret): void {
    const newContent = prompt('Enter new content:', regret.content);
    if(newContent){
        this.http.patch(`http://localhost:3000/regrets/${regret.id}`, {content: newContent})
        .subscribe(() => this.loadRegrets());
    }
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.editId = null;
    this.regretForm.reset({
      content: '',
      isAnonymous: false // Reset the checkbox as well
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
