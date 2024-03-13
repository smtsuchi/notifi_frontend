export type NotificationMethodType = 'email' | 'phone' | 'both'

export interface UserType {
    id: string;
    username: string;
    email: string;
    phone: string;
    date_created: string;
    subscription_count: number;
    notify_on_drop_only: boolean;
    notification_method: NotificationMethodType;
}