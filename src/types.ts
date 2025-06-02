/////////////////////////////
//      Flow Launcher      //
/////////////////////////////

export type Arguments = {
  method: string;
  parameters: string[];
};

export type Result = {
  Title: string;
  Subtitle: string;
  JsonRPCAction?: {
    method: string;
    parameters: string[];
  };
  IcoPath?: string;
  score?: number;
};

// ┌                   ┐
// │   Notifications   │
// └                   ┘

export type NotificationType = 'MESSAGE' | 'INFO' | 'ERROR';

export type NotificationItem = {
  text: string;
  source: string;
};

export type Notification = {
  [key in NotificationType]?: NotificationItem[];
};

/////////////////////
//      Metas      //
/////////////////////

export type Metas = {
  [key: string]: any;
};
