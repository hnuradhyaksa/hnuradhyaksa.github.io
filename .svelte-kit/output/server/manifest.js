export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "hnuradhyaksa.github.io/_app",
	assets: new Set([".nojekyll","favicon.png","icon/normal-down.svg","icon/normal-up.svg","thumbnails/covid-downturn-thumbnail.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.qyT4Rf2k.js","app":"_app/immutable/entry/app.HuftZySP.js","imports":["_app/immutable/entry/start.qyT4Rf2k.js","_app/immutable/chunks/DlbFIuNO.js","_app/immutable/chunks/wLOSxmgx.js","_app/immutable/chunks/BsckyEtd.js","_app/immutable/chunks/C5wHBSb1.js","_app/immutable/entry/app.HuftZySP.js","_app/immutable/chunks/wLOSxmgx.js","_app/immutable/chunks/BB5SsDs-.js","_app/immutable/chunks/CLIfRqP4.js","_app/immutable/chunks/DyJ8b57r.js","_app/immutable/chunks/_YIgFCO7.js","_app/immutable/chunks/C5wHBSb1.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
