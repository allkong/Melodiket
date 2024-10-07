'use client';

import customFetch from '@/services/customFetch';
import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';

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

function arrayBufferToBase64(buffer: ArrayBuffer | null): string {
  if (!buffer) return '';
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
}

const WebPush = () => {
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;

    if ('serviceWorker' in navigator) {
      const handleServiceWorker = async () => {
        // 1. 서버에서 공용 키 가져오기
        const publicKey = process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string;

        // 2. 서비스 워커 등록
        await navigator.serviceWorker.register('/sw.js');

        // 3. 서비스 워커 활성화 대기
        const readyRegistration = await navigator.serviceWorker.ready;

        // 4. 푸시 구독 생성
        const subscription = await readyRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        });

        // 5. 구독 데이터 생성
        const subscriptionData = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: arrayBufferToBase64(subscription.getKey('p256dh')),
            auth: arrayBufferToBase64(subscription.getKey('auth')),
          },
        };

        // 6. 서버로 구독 정보 전송
        try {
          await customFetch('/webpush/subscribe', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: subscriptionData,
          });
          console.log('구독 성공');
        } catch (error) {
          console.error('구독 실패', error);
        }
      };

      handleServiceWorker();
    }
  }, [accessToken]);

  return null;
};

export default WebPush;
