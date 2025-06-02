import { NOTIFY } from '../const.js';
import type {
  Notification,
  NotificationItem,
  NotificationType
} from '../types.js';
import { FlowLauncher } from '../utils/flowLauncher.js';

export class NotificationManagerController {
  notifications: Notification;

  constructor() {
    this.notifications = {};
  }

  add(type: NotificationType, item: NotificationItem) {
    if (this.notifications[type] === undefined) {
      this.notifications[type] = [];
    }
    this.notifications[type]?.push(item);
  }

  displayAll() {
    //INFO: Not sure if this is the best way
    if (Object.values(this.notifications).length > 0)
      FlowLauncher.showMessage(NOTIFY.title, this.format());
  }

  //WARN: Possibly change in futur
  format(): string {
    const LINE_FEED = '\n';

    let formattedNotifications = '';
    for (const [section, items] of Object.entries(this.notifications)) {
      formattedNotifications += `${String(section).toUpperCase()}${LINE_FEED}`;
      items.forEach(item => {
        formattedNotifications += `[${String(item.source).toUpperCase()}] - ${item.text}${LINE_FEED}`;
      });
    }

    return formattedNotifications;
  }
}
