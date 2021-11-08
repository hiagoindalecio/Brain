//#region user interface
export interface User {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    points: number | undefined;
    password: string | undefined;
    image_url: string | undefined;
}
//#endregion

//#region objects
export interface Task {
    idTask: number;
    idCheck: number;
    summary: string;
    desc: string;
    status: boolean;
}

export interface CheckpointsData {
    cod: number;
    codUser: number;
    summary: string;
    limitdate: string;
    description: string;
    status: number;
}

export interface FriendsData {
    cod_friend: number,
    name_friend: string,
    pic_friend: string,
    accepted: number,
    user_online: number
}

export interface NotesData {
    idNote: number,
    idUser: number,
    summary: string,
    desc: string
}
//#endregion

//#region response
export interface createNotesResponse {
    id: number,
    message: string
}

export interface createTasksResponse {
    id: number,
    name: string,
    message: string
}

export interface createCheckpointResponse {
    id: number,
    name: string,
    message: string
}

export interface messageResponse {
    message: string
}

export interface completeResponse {
    done: number,
    message: string
}

export interface userValidationResponse {
    user: {
        id: number;
        name: string;
        email: string;
        points: number;
        password: string;
        image_url: string;
    }
}

export interface UserEditResponse {
    message: string;
}

export interface UserUpdateResponse {
    message: string,
    userReply: {
        id: number,
        name: string,
        password: string,
        image_url: string
    }
}

export interface singOutResponse {
    id: number, 
    message: string
}

export interface checkpointResponse {
    cod: number;
    codUser: number;
    summary: string;
    limitdate: string;
    description: string;
    status: number;
}

export interface friendsResponse {
    cod_friend: number,
    name_friend: string,
    pic_friend: string,
    accepted: number,
    user_online: number
}

export interface notesResponse {
    idNote: number,
    idUser: number,
    summary: string,
    desc: string
}

export interface tasksResponse {
    idTask: number;
    idCheck: number;
    summary: string;
    desc: string;
    status: boolean;
}

export interface activityResponse {
    codActivity: number,
    descriType: string,
    nameUser: string,
    description: string,
    updateTime: Date,
    profilePic: string
}

export interface FindUsersResponse {
    cod: string,
    name: string,
    email: string,
    points: number,
    profile_pic: string
}
//#endregion

//#region contexts
export interface FriendsContextData {
    loading: boolean;
    getFriends: (idUser: number) => Promise<Array<FriendsData>>;
    getFriendship: (idUser: number, idFriend: number) => Promise<FriendsData>;
    addNewFriend: (idUser: string, idFriend: string) => Promise<messageResponse>;
    getFriendshipRequests: (idUser: string) => Promise<FriendsData[]>;
    getFriendshipRequest: (idUser: string, idFriend: string) => Promise<FriendsData>;
    cancelFriendRequest: (idUser: string, idFriend: string) => Promise<messageResponse>;
    declineFriendRequest: (idUser: string, idFriend: string) => Promise<messageResponse>;
    acceptFriendRequest: (idUser: string, idFriend: string) => Promise<messageResponse>;
    endFriendship: (idUser: string, idFriend: string) => Promise<messageResponse>;
}

export interface TasksContextData {
    loading: boolean;
    getTasks: (idCheckpoint: number) => Promise<Array<Task>>;
    setTasks: (idCheck: number, summary: string, description: string) => Promise<createTasksResponse>;
    updateTask: (idTask: number, summary: string, description: string) => Promise<messageResponse>;
    completeTask: (idTask: number) => Promise<completeResponse>
}

export interface NotesContexData {
    loading: boolean;
    getNotes: (idUser: number) => Promise<Array<NotesData>>;
    setNotes: (id: number, name: string, message: string) => Promise<createNotesResponse>;
    updateNotes: (idNote: number, summary: string, description: string) => Promise<messageResponse>;
    drop: (idNote: number) => Promise<messageResponse>
}

export interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    currentScreen: string;
    singIn(email: string, password: string): Promise<string>;
    createUser(email: string, password: string, name: string, image: File): Promise<string>;
    updateUser(id: number, name: string | null, password: string | null, image: File | null): Promise<string>;
    singOut(email: string, password: string): Promise<string>;
    setPoints(pointsUser: number): void;
    selectScreen(eleme: string): void;
    findUser(name: string): Promise<FindUsersResponse[] | messageResponse>;
    findByCod(cod: string): Promise<FindUsersResponse | messageResponse>;
}

export interface CheckpointsContextData {
    loading: boolean;
    getCheckpoints: (idUser: number) => Promise<Array<CheckpointsData>>;
    setCheckpoint: (id_user: number, summary: string, description: string, limitdate: string) => Promise<createCheckpointResponse>;
    updateCheckpoint: (idCheck: number, summary: string, description: string, limitdate: string) => Promise<messageResponse>;
    completeCheckpoint: (idCheck: number) => Promise<completeResponse>;
    deleteCheckpoint: (idCheck: number) => Promise<messageResponse>
}

export interface ActivityContextData {
    loading: boolean;
    getFriendsActivity: (idUser: number) => Promise<Array<activityResponse>>;
    getActivityByUser: (idUser: string) => Promise<Array<activityResponse>>;
}
//#endregion

//#region Components
export interface DropzoneProps {
    onFileUploaded: (file: File) => void;
}

export interface ModalCheckProps {
    props : {
        id: number,
        summary: string,
        description: string,
        date: string
    };
    onClose: () => void;
}

export interface ModalPropsCompleteCheck {
    props : {
        idCheck: number;
        title: string;
    };
    onClose: () => void;
}

export interface ModalTaskProps {
    props : {
        idTask: number;
        title: string;
    };
    onClose: () => void;
}

export interface ModalDeleteCheckProps {
    props : {
        idCheck: number;
        title: string;
    };
    onClose: () => void;
}

export interface ModalDropNoteProps {
    props : {
        idNote: number;
        title: string;
    };
    onClose: () => void;
}

export interface ModalMessagesProps {
    props : {
        message: string;
    };
    onClose: () => void;
}

export interface ModalNotesProps {
    props : {
        id: number, 
        summary: string, 
        description: string
    };
    onClose: () => void;
}

export interface ModalTasksProps {
    props : {
        id: number,
        idCheck: number,
        summary: string,
        description: string
    };
    onClose: () => void;
}
//#endregion 

export interface Visibility {
    contentVisibility: "visible" | "auto" | "hidden";
}