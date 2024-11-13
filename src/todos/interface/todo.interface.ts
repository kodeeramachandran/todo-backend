export interface Todo {
    id?: string;
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed'; 
    priority: 'high' | 'medium' | 'low';            
    createdAt?: Date;                                 
    updatedAt?: Date;                                 
  }
  