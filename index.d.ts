type ApiResponse = {
     success: boolean;
     message: string;
     data?: any;
}

type UserData = {
     _id: string;
     status: "active" | "inactive";
     name: string;
     email: string;
     type: "user" | "admin";
     role: "developer" | "hr" | "tester" | "manager" | "analyst" | null;
     permissions: {
          create: boolean;
          read: boolean;
          edit: boolean;
          remove: boolean;
     };
};


type FilterItemType = "active" | "inactive" | "all" | "manager" | "hr" | "developer" | "tester" | "analyst";