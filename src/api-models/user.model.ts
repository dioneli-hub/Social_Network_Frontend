export interface UserModel extends SimpleUserModel {
    totalFollowers: number;
    totalFollowsTo: number;
  }
  
  export interface SimpleUserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: ApplicationFileModel | null;
  }
  
  export interface ApplicationFileModel {
    id: number;
    contentType: string;
    fileName: string;
    createdAt: Date;
  }
  