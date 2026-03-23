import React, { useEffect, useState } from 'react';
import { AppNotification } from '../types';
import { dbService } from '../services/dbService';
import { auth } from '../firebase';
import { Bell } from 'lucide-react';

interface NotificationCenterProps {
  userId: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const fetchNotifs = async () => {
      if (!auth.currentUser) return;
      const notifs = await dbService.fetchNotifications(userId);
      setNotifications(notifs.filter(n => !n.isRead));
    };
    fetchNotifs();
  }, [userId]);

  return (
    <div className="relative">
      <button className="p-2 bg-white border-2 border-black rounded-full">
        <Bell size={20} />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
    </div>
  );
};
