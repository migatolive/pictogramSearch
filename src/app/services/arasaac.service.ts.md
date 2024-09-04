## Arasaac Service Documentation

**Table of Contents**

- [Overview](#overview)
- [Usage](#usage)
- [Methods](#methods)
  - [getPictogramId](#getpictogramid)
  - [getPictogramImage](#getpictogramimage)

### Overview

The `ArasaacService` is an Angular service that interacts with the Arasaac API to retrieve pictograms. It provides two main methods:

- `getPictogramId`: Searches for a pictogram by its name and returns its ID.
- `getPictogramImage`: Retrieves the image of a pictogram based on its ID.

### Usage

To use the `ArasaacService` in your Angular component, first inject it into the constructor:

```typescript
import { ArasaacService } from './arasaac.service';

constructor(private arasaacService: ArasaacService) {}
```

Then, you can call the service methods to retrieve the desired data:

```typescript
// Get the ID of a pictogram by searching for its name
this.arasaacService.getPictogramId('cat').subscribe(id => {
  // Use the retrieved pictogram ID
  console.log('Pictogram ID:', id);
});

// Get the image of a pictogram by its ID
this.arasaacService.getPictogramImage(123).subscribe(imageUrl => {
  // Use the retrieved image URL
  console.log('Pictogram Image URL:', imageUrl);
});
```

### Methods

#### getPictogramId

```typescript
getPictogramId(searchText: string): Observable<number> {
  return this.http.get<{ _id: number }[]>(`${this.apiUrl}/pictograms/es/bestsearch/${searchText}`)
    .pipe(
      map(response => {
        console.log('getPictogramId response:', response); // Log the response
        if (response.length > 0) {
          return response[0]._id; // Ensure only a single id is returned
        } else {
          throw new Error('No pictogram found');
        }
      })
    );
}
```

This method searches for a pictogram by its name (in Spanish) and returns its ID.

- **Parameters:**
  - `searchText`: The name of the pictogram to search for.
- **Returns:** An `Observable` that emits the ID of the pictogram.
- **Throws:** An error if no pictogram is found.
- **Logic:**
  - Makes a GET request to the Arasaac API endpoint `/pictograms/es/bestsearch/` with the search text.
  - Maps the response to the ID of the first pictogram found.
  - If no pictograms are found, throws an error.

#### getPictogramImage

```typescript
getPictogramImage(id: number): Observable<string> {
  return this.http.get(`${this.apiUrl}/pictograms/${id}`, {
    params: {
      download: 'false',
      plural: 'false',
      color: 'true',
    },
    responseType: 'blob',
  }).pipe(
    map((response: Blob) => URL.createObjectURL(response))
  );
}
```

This method retrieves the image of a pictogram based on its ID.

- **Parameters:**
  - `id`: The ID of the pictogram.
- **Returns:** An `Observable` that emits the URL of the pictogram image.
- **Logic:**
  - Makes a GET request to the Arasaac API endpoint `/pictograms/` with the pictogram ID.
  - Sets the `download`, `plural`, and `color` query parameters to control the image format.
  - Sets the `responseType` to `blob` to retrieve the image data as a Blob.
  - Maps the response to the URL of the Blob object. 
