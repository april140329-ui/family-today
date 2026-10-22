// 우리 가족 오늘 할 일 - 알림창(서비스워커)
// 휴대폰 크롬 등에서는 서비스워커를 통해서만 시스템 알림창(소리·진동 포함)을 띄울 수 있어요.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of list) { if ('focus' in c) { await c.focus(); return; } }
    if (self.clients.openWindow) await self.clients.openWindow('./');
  })());
});
