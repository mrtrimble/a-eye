import './chunks/index_CmTKkXyS.mjs';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_fWYTE4LQ.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/repos/a-eye/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"generate-diagram/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/generate-diagram","isIndex":false,"type":"page","pattern":"^\\/generate-diagram\\/?$","segments":[[{"content":"generate-diagram","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/generate-diagram.astro","pathname":"/generate-diagram","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"identify-part/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/identify-part","isIndex":false,"type":"page","pattern":"^\\/identify-part\\/?$","segments":[[{"content":"identify-part","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/identify-part.astro","pathname":"/identify-part","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"scan-document/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/scan-document","isIndex":false,"type":"page","pattern":"^\\/scan-document\\/?$","segments":[[{"content":"scan-document","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/scan-document.astro","pathname":"/scan-document","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.1.10_rollup@4.32.1_typescript@5.7.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/.pnpm/astro@5.1.10_rollup@4.32.1_typescript@5.7.3/node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/repos/a-eye/src/pages/generate-diagram.astro",{"propagation":"none","containsHead":true}],["C:/repos/a-eye/src/pages/identify-part.astro",{"propagation":"none","containsHead":true}],["C:/repos/a-eye/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/repos/a-eye/src/pages/scan-document.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.1.10_rollup@4.32.1_typescript@5.7.3/node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:src/pages/generate-diagram@_@astro":"pages/generate-diagram.astro.mjs","\u0000@astro-page:src/pages/identify-part@_@astro":"pages/identify-part.astro.mjs","\u0000@astro-page:src/pages/scan-document@_@astro":"pages/scan-document.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.1.10_rollup@4.32.1_typescript@5.7.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_T9-pbv99.mjs","\u0000astro:internal-actions":"chunks/_astro_internal-actions_Ms9ThckQ.mjs","C:/repos/a-eye/node_modules/.pnpm/astro@5.1.10_rollup@4.32.1_typescript@5.7.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Dz727Dwp.mjs","C:/repos/a-eye/src/components/DiagramGenerator.vue":"_astro/DiagramGenerator.YqVlFAzU.js","C:/repos/a-eye/src/components/PartIdentifier.vue":"_astro/PartIdentifier.BvIuw_gC.js","C:/repos/a-eye/src/components/DocumentScanner.vue":"_astro/DocumentScanner.ChVdsV1o.js","@astrojs/vue/client.js":"_astro/client.B_Gc98XW.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg","/icons/camera.svg","/images/diagram-generation.png","/images/document-scanning.png","/images/part-identification.png","/_astro/client.B_Gc98XW.js","/_astro/DiagramGenerator.YqVlFAzU.js","/_astro/DocumentScanner.ChVdsV1o.js","/_astro/Error.BuWj0tcT.js","/_astro/PartIdentifier.BvIuw_gC.js","/_astro/runtime-core.esm-bundler.CYxkA8vs.js","/generate-diagram/index.html","/identify-part/index.html","/scan-document/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"HntcJ+yQTFtoy/M6KCCvdMH6Yt7l/UImlvU5/xOS1e8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
