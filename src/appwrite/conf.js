import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
             this.databases = new Databases(this.client);
             this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
         try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
                )
         } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
         }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
       try {
         return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
         )
       } catch (error) {
         console.log("Appwrite service :: updatePost :: error", error)
       }
    }
}

const service = new Service();

export default service;
