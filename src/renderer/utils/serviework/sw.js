// sw.js

const staticAssets = [
    './',
    './style.css',
    './app.js'
];

// sw.js首次被注册时候触发
self.addEventListener('install', async event => {
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
})

self.addEventListener('fetch', event => {
    console.log('页面请求了')
    const req = event.request;
    const url = new URL(req.url);

    // 当本地开发时候可以这么配置
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req));
    } else if ((req.url.indexOf('http') !== -1)) {
        // chrome的https协议限制，接口必须满足https
        event.respondWith(networkFirst(req));
    }
});

// 缓存优先
async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

// 网络优先
async function networkFirst(req) {
    // 将请求到的数据缓存在id为news-dynamic中
    const cache = await caches.open('news-dynamic');

    try {
        const res = await fetch(req); // 获取数据
        cache.put(req, res.clone()); // 更新缓存
        return res;
    } catch (error) {
        return await cache.match(req); // 报错则使用缓存
    }
}