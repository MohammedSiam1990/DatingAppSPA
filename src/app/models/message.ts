export interface Message {
    id: number;
    senderId: number;
    senderPhotoURL: string;
    senderKnownAs: string;
    recipientId: number;
    recipientKnownAs: string;
    recipientPhotoURL: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
}
