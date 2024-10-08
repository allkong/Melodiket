'use client';

import customFetch from '@/services/customFetch';
import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';
import useWebPushStore from '@/store/webPushStore';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function isNotificationUnsupported(): boolean {
  let supported = true;
  if (
    !('serviceWorker' in navigator) ||
    !('PushManager' in window) ||
    !('showNotification' in ServiceWorkerRegistration.prototype)
  ) {
    supported = false;
  }
  return supported;
}

async function askPermission() {
  const output = Notification.requestPermission().then((res) => res);
  return output;
}

async function useHandleServiceWorker() {
  const { accessToken } = useAuthStore();
  const { isSubscribed, setIsSubscribed } = useWebPushStore();

  useEffect(() => {
    if (!accessToken) return;

    const isSupported = isNotificationUnsupported();
    if (!isSupported) {
      console.log('not support');
    }

    if (isSubscribed) return;
    handleServiceWorker(setIsSubscribed);
  }, [accessToken, isSubscribed, setIsSubscribed]);
}

async function handleServiceWorker(setIsSubscribed: (value: boolean) => void) {
  // 1. 서버에서 공용 키 가져오기
  const publicKey = process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string;

  // 2. 서비스 워커 등록
  await navigator.serviceWorker.register('/sw.js');

  const permitted = await askPermission();
  if (permitted !== 'granted') return;

  // 3. 서비스 워커 활성화 대기
  const readyRegistration = await navigator.serviceWorker.ready;

  // 4. 푸시 구독 생성
  const subscription = await readyRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  // 5. 서버로 구독 정보 전송
  await customFetch('/webpush/subscribe', {
    method: 'post',
    body: JSON.parse(JSON.stringify(subscription)),
  });

  setIsSubscribed(true);
}

const WebPush = () => {
  useHandleServiceWorker();

  return null;
};

export default WebPush;
