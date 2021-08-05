
export interface Photo {
    name: string;
    id: string;
    type: string;
    width: number;
    height: number;
}

export interface PhotoList {
    photos: Photo[];
    count: number;
}

const ENDPOINT = 'http://localhost:8000';

export async function searchPhotos(name: string, from = 0): Promise<PhotoList> {
    const response = await fetch(`${ENDPOINT}/photos?name=${name}&from=${from}`);
    return await response.json();
}

export function uploadPhoto(name: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    return fetch(`${ENDPOINT}/photos`, {method: 'POST', body: formData})
}

export function photoUrl(photo: Photo) {
    return `${ENDPOINT}/photos/${photo.id}`;
}