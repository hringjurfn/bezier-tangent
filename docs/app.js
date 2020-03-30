((g,h)=>{let i=function(){return this}(),e={},f=(c,d)=>{if(typeof c==="number"){let a=e[c],b;return a||(a=e[c]={exports:{}},g[c].call(i,f,a.exports,a)),b=a.exports,d&&(!b||!b.__esModule)&&((!b||typeof b!=="object")&&(b={}),"default"in b||Object.defineProperty(b,"default",{get:()=>a.exports,enumerable:!0})),b}d.__esModule=()=>!0;for(let a in d)Object.defineProperty(c,a,{get:d[a],enumerable:!0})};return f(h)})({1(){const m=typeof global!="undefined"?global:typeof window!="undefined"?window:this||{},M=console.log.bind(console),N=function(){},O=(a,b)=>Array.prototype.slice.call((b||document).querySelectorAll(a)),P=(a,b)=>(b||document).querySelector(a);class Q{constructor(){this._events=new Map()}on(a,b){return this.addEventListener(a,b)}off(a,b){return this.removeEventListener(a,b)}addEventListener(a,b){let c=this._events.get(a);return c?c.add(b):(c=new Set([b]),this._events.set(a,c)),c.size}removeEventListener(a,b){let c=this._events.get(a);return!c||!c.delete(b)?-1:(c.size==0&&this._events.delete(a),c.size)}dispatchEvent(a,b){let c=this._events.get(a);if(c)for(let d of c)d(b)}}function ba(a){const b={stack:""};if(Error.captureStackTrace){Error.captureStackTrace(b,a);const c=b.stack.indexOf(`
`);if(c!=-1)return b.stack.substr(c+1)}return b.stack}function ca(a){let b=/\s*at\s+(?:[^\s]+\.|)([^\s\.]+)\s+(?:\[as ([^\]]+)\]\s+|)\((?:.+[\/ ](src\/[^\:]+)|([^\:]*))(?:\:(\d+)\:(\d+)|.*)\)/.exec(a);return b?{func:b[2]||b[1],file:b[3]||b[4],line:b[5]?parseInt(b[5]):0,col:b[6]?parseInt(b[6]):0}:(console.log("failed to parse stack frame",JSON.stringify(a)),null)}function R(){}m.GlobalContext=m,m.log=M,m.dlog=N,m.$=P,m.$$=O,m.EventEmitter=Q,m.assert=R;
function oa(a){return a*(180/Math.PI)}function pa(a){return a*(Math.PI/180)}class J{constructor(a,b,c,d){this.x=a,this.y=b,this.width=c,this.height=d}containsPoint(a){return a.x>=this.x&&a.x<=this.x+this.width&&a.y>=this.y&&a.y<=this.y+this.width}translate(a){return new J(this.x+a.x,this.y+a.y,this.width,this.height)}toString(){return`(${this.x}, ${this.y}, ${this.width}, ${this.height})`}}class i{constructor(a,b){this.x=a,this.y=b}distanceTo(a){return Math.sqrt(this.squaredDistanceTo(a))}squaredDistanceTo(a){let b=this.x-a.x,c=this.y-a.y;return b*b+c*c}angleTo(a){return Math.atan2(this.y-a.y,this.x-a.x)+Math.PI}lerp(a,b){let c=this,d=c.x,e=c.y;return f(d+b*(a.x-d),e+b*(a.y-e))}isInside(a,b){return v.x>=a.x&&v.x<=b.x&&v.y>=a.y&&v.y<=b.y}copy(){return new i(this.x,this.y)}sub(a){return typeof a=="number"?new i(this.x-a,this.y-a):new i(this.x-a.x,this.y-a.y)}add(a){return typeof a=="number"?new i(this.x+a,this.y+a):new i(this.x+a.x,this.y+a.y)}mul(a){return typeof a=="number"?new i(this.x*a,this.y*a):new i(this.x*a.x,this.y*a.y)}div(a){return typeof a=="number"?new i(this.x/a,this.y/a):new i(this.x/a.x,this.y/a.y)}toString(){return`(${this.x}, ${this.y})`}}function f(a,b){return new i(a,b)}
class A{constructor(a,b){this.color=a,this.weight=b}}A.default=new A("black",1);class K extends EventEmitter{constructor(a){super(),this.parent=null,this.position=a||f(0,0),this._bounds=new J(0,0,0,0),this.visible=!0,this.transform=null,this.needsRecompute=!0}dirty(){this.needsRecompute=!0}recompute(){this.needsRecompute=!1,this._bounds.x=this.position.x,this._bounds.y=this.position.y}get bounds(){return this.needsRecompute&&this.recompute(),this._bounds}updateAndDraw(a,b){this.visible&&(this.needsRecompute&&this.recompute(),this.update(b,a),this.draw(a,b))}update(a,b){}draw(a,b){}remove(){this.parent&&this.parent.remove(this)}pointFromSceneSpace(a){return this.parent?this.parent.pointFromSceneSpace(a):a}hitTest(a){return null}}class E extends K{constructor(a,b,c){super(a),this.interactive=!0,this.position=a||f(0,0),this.fill=b===void 0?"white":b,typeof c=="string"&&(c=new A(c,1)),this.stroke=c||null}draw(a){a.fillStyle=this.fill,this.stroke&&(a.strokeStyle=this.stroke.color,a.lineWidth=this.stroke.weight)}hitTest(a){return this.interactive&&this.bounds.containsPoint(a)?new L(this,a):null}}
class I extends K{constructor(a,b){super(a),this.children=new Set(b)}add(a){return a.parent&&a.parent.remove(a),this.children.add(a),a.parent=this,a}remove(a){this.children.delete(a)&&(a.parent=null)}updateAndDraw(a,b){if(!this.visible)return;this.needsRecompute&&this.recompute();let c=a.getTransform();a.translate(this.position.x,this.position.y),this.update(b,a);for(let d of this.children)d.updateAndDraw(a,b);a.setTransform(c)}pointFromSceneSpace(a){return a.sub(this.position)}hitTest(a){a=a.sub(this.position);for(let b of this.children){let c=b.hitTest(a);if(c)return c}return null}}
class t extends E{constructor(a,b,c){super(a,null,c||Stroke.default),this.end=b||f(0,0)}draw(a){super.draw(a),a.beginPath(),a.moveTo(this.position.x,this.position.y),a.lineTo(this.end.x,this.end.y),a.stroke()}get length(){return this.position.distanceTo(this.end)}set length(a){let b=this.position.angleTo(this.end);this.end=f(this.position.x+a*Math.cos(b),this.position.y+a*Math.sin(b))}rotate(a){let b=Math.PI/180*a,c=Math.cos(b),d=Math.sin(b),e=this.position,g=this.end;this.end=f(c*(g.x-e.x)+d*(g.y-e.y)+e.x,c*(g.y-e.y)-d*(g.x-e.x)+e.y)}hitTest(a){return null}}class n extends E{constructor(a,b,c,d){super(a,c,d),this.radius=b||10,this.size=this.radius*2}recompute(){super.recompute(),this.bounds.x=this.position.x-this.radius,this.bounds.y=this.position.y-this.radius,this.bounds.width=this.radius*2,this.bounds.height=this.radius*2}draw(a){super.draw(a),a.beginPath(),a.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,!1),a.closePath(),this.fill&&a.fill(),this.stroke&&a.stroke()}}
class U extends E{constructor(a,b,c,d,e){super(a,null,e||Stroke.default),this.c1=b,this.c2=c,this.end=d,this.interpolationData={x1:0,x2:0,x3:0,x4:0,y1:0,y2:0,y3:0,y4:0}}recompute(){super.recompute(),this.updateInterpolationData()}updateInterpolationData(){const a=this.interpolationData;let b=this.position.x,c=this.c1.x,d=this.c2.x,e=this.end.x;a.x1=e-3*d+3*c-b,a.x2=3*d-6*c+3*b,a.x3=3*c-3*b,a.x4=b,b=this.position.y,c=this.c1.y,d=this.c2.y,e=this.end.y,a.y1=e-3*d+3*c-b,a.y2=3*d-6*c+3*b,a.y3=3*c-3*b,a.y4=b}pointAt(a){const b=this.interpolationData;return f(b.x1*a*a*a+b.x2*a*a+b.x3*a+b.x4,b.y1*a*a*a+b.y2*a*a+b.y3*a+b.y4)}normalAt(a){return this.tangentAt(a).rotate(90)}tangentAt(a){const b=this.interpolationData;return f(3*b.x1*a*a+2*b.x2*a+b.x3,3*b.y1*a*a+2*b.y2*a+b.y3)}closestPoint(a){let b=0,c=25;for(let s=Infinity,o=c+1;o--;){let u=a.squaredDistanceTo(this.pointAt(o/c));u<s&&(s=u,b=o)}let d=Math.max((b-1)/c,0),e=Math.min((b+1)/c,1),g,B=0,C=s=>(B=s,g=this.pointAt(s),a.squaredDistanceTo(g)),x=.0001,r=0;for(;e-d>x;)r=(e+d)/2,C(r-x)<C(r+x)?e=r:d=r;return[g,B]}draw(a){super.draw(a),a.beginPath(),a.moveTo(this.position.x,this.position.y),a.bezierCurveTo(this.c1.x,this.c1.y,this.c2.x,this.c2.y,this.end.x,this.end.y),a.strokeStyle=this.stroke.color,a.lineWidth=this.stroke.weight,a.stroke()}}
class L{constructor(a,b,c){this.node=a,this.point=b,this.scenePoint=c}}class S extends EventEmitter{constructor(a){super(),this.renderer=a,this.width=a.canvas.width,this.height=a.canvas.height,this.pointer=f(0,0),this.pointerDownAt=f(0,0),this.root=new I(),this._eventHandlers={}}enableHitTesting(){let a=null;this.addEventListener("pointerdown",()=>{(a=this.hitTest(this.pointer))&&(this.pointerDownAt.x=this.pointer.x,this.pointerDownAt.y=this.pointer.y,a.node.dispatchEvent("pointerdown",a))}),this.addEventListener("pointerup",()=>{let b=this.hitTest(this.pointer);b?(b.node.dispatchEvent("pointerup",b),a&&b.node!==a.node&&a.node.dispatchEvent("pointerup",b)):a&&a.node.dispatchEvent("pointerup",new L(null,null)),a=null})}hitTest(a){return this.root.hitTest(a)}addEventListener(a,b){let c=super.addEventListener(a,b);return c==1&&this._addEventHandler(a),c}removeEventListener(a,b){let c=super.removeEventListener(a,b);return c==0&&this._removeEventHandler(a),c}_addEventHandler(a){const b={pointermove:1,pointerleave:1,pointerenter:1,pointerdown:1,pointerup:1};if(!(a in b))throw new Error(`invalid event ${a}`);let c=a=="pointermove"?d=>{this.pointer.x=d.x,this.pointer.y=d.y;let e=this.pointer.sub(this.pointerDownAt);this.dispatchEvent(a,e)}:d=>{this.pointer.x=d.x,this.pointer.y=d.y,this.dispatchEvent(a,this.pointer)};this.renderer.canvas.addEventListener(a,c),this._eventHandlers[a]=c}_removeEventHandler(a){let b=this._eventHandlers[a];b&&(delete this._eventHandlers[a],this.renderer.canvas.removeEventListener(a,b))}add(a){return this.root.add(a)}remove(a){this.root.remove(a)}updateAndDraw(a,b){a.clearRect(0,0,this.width,this.height),this.root.updateAndDraw(a,b)}}
class T extends EventEmitter{constructor(){super(),this.canvas=$("canvas"),this.g=this.canvas.getContext("2d"),this.scale=1,this.updateScale(),this.resizeCanvasToWindow(),this._onWindowResize=()=>{this.updateScale(),this.resizeCanvasToWindow(),this.dispatchEvent("resize")},window.addEventListener("resize",this._onWindowResize)}finalize(){window.removeEventListener("resize",this._onWindowResize)}updateScale(){this.scale=(window.devicePixelRatio||1)/(this.g.backingStorePixelRatio||this.g.webkitBackingStorePixelRatio||this.g.mozBackingStorePixelRatio||this.g.msBackingStorePixelRatio||this.g.oBackingStorePixelRatio||1)}resizeCanvasToWindow(){this.resizeCanvas(window.innerWidth,window.innerWidth)}resizeCanvas(a,b){this.canvas.style.zoom=String(1/this.scale),this.canvas.width=a*this.scale,this.canvas.height=b*this.scale}render(a,b){const c=this.g;c.setTransform(this.scale,0,0,this.scale,0,0),a.transform&&c.transform(a.transform),a.updateAndDraw(c,b)}}
function V(a,b){let c=new I(f(100,200)),d=c.add(new U(f(250,120),f(290,-40),f(300,200),f(400,150),new A("rgba(0,0,0,0.4)",1.5))),e=4,g=c.add(new t(d.c1,d.position,"rgba(0,0,0,0.1)")),B=c.add(new t(d.c2,d.end,"rgba(0,0,0,0.1)")),C=c.add(new n(d.position,e,"white","rgba(0,30,200,0.5)")),x=c.add(new n(d.end,e,"white","rgba(0,30,200,0.5)")),r=c.add(new n(d.c1,e,"white","rgba(0,180,20,0.8)")),s=c.add(new n(d.c2,e,"white","rgba(0,180,20,0.8)"));function o(h){let j=h.fill;const p=l=>{let q=k.pointFromSceneSpace(a.pointer);h.position.x=q.x,h.position.y=q.y,h.dirty(),g.dirty(),B.dirty(),d.dirty()};h.on("pointerdown",l=>{h.fill="rgba(0,180,20,0.8)",a.on("pointermove",p)}),h.on("pointerup",l=>{h.fill=j,a.off("pointermove",p)})}o(C),o(x),o(r),o(s);let u=f(-1000,-1000),y=c.add(new n(u,8,null,"rgba(0,200,255,0.2)")),k=c.add(new n(u,8,"rgba(0,200,255,0.3)")),z=c.add(new t(null,null,"rgba(255,50,0,0.9)")),w=c.add(new t(null,null,"rgba(0,100,255,0.9)")),D=c.add(new n(u,3,"rgba(0,200,255,1)"));const F=h=>{k.position=k.pointFromSceneSpace(a.pointer);let[j,p]=d.closestPoint(k.position);D.position=j;let l=k.position.distanceTo(D.position),q=j.add(d.tangentAt(p));z.position=j,z.end=q,z.length=Math.max(40,l),w.position=j,w.end=q,w.rotate(90),w.length=Math.max(40,l),y.position=k.position,y.radius=Math.max(k.radius,l),y.stroke.color=`rgba(0,200,255,${Math.max(.1,20/l)})`};a.on("pointermove",F),a.on("pointerleave",()=>{a.removeEventListener("pointermove",F),D.visible=!1,k.visible=!1,y.visible=!1,z.visible=!1,w.visible=!1}),a.on("pointerenter",()=>{a.addEventListener("pointermove",F),D.visible=!0,k.visible=!0,y.visible=!0,z.visible=!0,w.visible=!0});let G=c.add(new t(null,null,"rgba(255,50,0,0.9)")),H=c.add(new t(null,null,"rgba(0,100,255,0.9)")),X=c.add(new n(null,2,"black"));G.update=h=>{let j=Math.abs(1-h%4000/2000);X.position=d.pointAt(j);let p=d.pointAt(j),l=d.tangentAt(j),q=p.add(l.mul(.3));G.position=p,G.end=q,H.position=p,H.end=q,H.rotate(90)},a.add(c),a.enableHitTesting()}function W(){log("start");let a=new T(),b=new S(a);V(b);let c=!0;function d(e){a.render(b,e),c&&requestAnimationFrame(d)}c?requestAnimationFrame(d):d(1200)}W();
}},1);
//# sourceMappingURL=app.js.map
