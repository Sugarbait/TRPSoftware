export interface Property {
    id: string;
    name: string;
    address: string;
    image: string;
    occupancy: number;
    revenue: number;
    activeIssues: number;
    totalUnits: number;
    occupiedUnits: number;
    status: 'Fully Occupied' | 'High Vacancy' | 'Urgent Issues' | 'Stable';
}

export interface Issue {
    id: string;
    title: string;
    location: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Open' | 'In Progress' | 'Resolved';
    date: string;
    reporter: string;
}

export interface Contact {
    id: string;
    name: string;
    role: 'Tenant' | 'Property Owner' | 'Contractor';
    company?: string;
    phone?: string;
    email?: string;
    avatar: string;
    lastContacted: string;
}