// Importing necessary modules from the "appwrite" library

import { Client, Account, Databases, Storage, Avatars } from "appwrite";

// Configuration object for Appwrite, containing project-specific details

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

// Creating a new instance of the Appwrite client

export const client = new Client();

// Setting the endpoint for the Appwrite client using the configured URL

client.setEndpoint(appwriteConfig.url);

// Setting the project for the Appwrite client using the configured project ID

client.setProject(appwriteConfig.projectId);


// Creating instances of Appwrite modules using the configured client

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
