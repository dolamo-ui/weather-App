import { useState, useEffect } from 'react';

export function usePermissions() {
  const [locationPermission, setLocationPermission] = useState<PermissionState>('prompt');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async (): Promise<void> => {
    // Check geolocation permission
    if ('permissions' in navigator) {
      try {
        const geoPermission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        setLocationPermission(geoPermission.state);
        
        geoPermission.addEventListener('change', () => {
          setLocationPermission(geoPermission.state);
        });
      } catch (err) {
        console.log('Permission API not supported');
      }
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  };

  const requestLocationPermission = async (): Promise<void> => {
    // This is handled in the main component
    // This hook just tracks the state
  };

  const requestNotificationPermission = async (): Promise<void> => {
    if (!('Notification' in window)) {
      throw new Error('Notifications are not supported by your browser');
    }

    if (Notification.permission === 'granted') {
      setNotificationPermission('granted');
      return;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    } else {
      throw new Error('Notification permission denied. Please enable it in your browser settings.');
    }
  };

  return {
    locationPermission,
    notificationPermission,
    requestLocationPermission,
    requestNotificationPermission,
  };
}