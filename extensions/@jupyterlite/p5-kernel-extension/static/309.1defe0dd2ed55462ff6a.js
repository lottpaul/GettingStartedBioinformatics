"use strict";(self.webpackChunk_jupyterlite_p5_kernel_extension=self.webpackChunk_jupyterlite_p5_kernel_extension||[]).push([[309,528],{309:(e,t,n)=>{n.r(t),n.d(t,{P5Kernel:()=>r});var s=n(289),o=n(526);const i="text/html-sandboxed";class r extends s.BaseKernel{constructor(e){super(e),this._displayId="",this._bootstrap="",this._evalFunc=new Function("window","code","return window.eval(code);"),this._inputs=[],this._ready=new o.PromiseDelegate,this._parentHeaders=[];const{p5Url:t}=e;this._displayId=this.id,this._iframe=document.createElement("iframe"),this._iframe.style.visibility="hidden",this._iframe.style.position="absolute",this._iframe.style.top="-100000px",this._bootstrap=`\n    import('${t}').then(() => {\n      // create the p5 global instance\n      window.__globalP5 = new p5();\n      return Promise.resolve();\n    })\n  `,this._iframe.onload=async()=>{await this._initIFrame(),this._eval(this._bootstrap),this._ready.resolve(),window.addEventListener("message",(e=>{const t=e.data;if("stream"===t.event){const e=t;this.stream(e)}}))},document.body.appendChild(this._iframe)}get ready(){return this._ready.promise}dispose(){this.isDisposed||(this._iframe.remove(),super.dispose())}async kernelInfoRequest(){return{implementation:"p5.js",implementation_version:"0.1.0",language_info:{codemirror_mode:{name:"javascript"},file_extension:".js",mimetype:"text/javascript",name:"p5js",nbconvert_exporter:"javascript",pygments_lexer:"javascript",version:"es2017"},protocol_version:"5.3",status:"ok",banner:"A p5.js kernel",help_links:[{text:"p5.js Kernel",url:"https://github.com/jupyterlite/p5-kernel"}]}}async executeRequest(e){const{code:t}=e,n={display_id:this._displayId};if(t.startsWith("%show")){const e={...await this._magics(t),transient:n};if(e)return this.displayData(e),this._parentHeaders.push(this._parentHeader),{status:"ok",execution_count:this.executionCount,user_expressions:{}}}try{const e=this._eval(t);this.publishExecuteResult({execution_count:this.executionCount,data:{"text/plain":e},metadata:{}}),t.trim().startsWith("%")||this._inputs.push(t);const s=await this._magics(),{data:o,metadata:i}=s;return this._parentHeaders.forEach((e=>{this.clearOutput({wait:!1}),this.updateDisplayData({data:o,metadata:i,transient:n},e)})),{status:"ok",execution_count:this.executionCount,user_expressions:{}}}catch(e){const{name:t,stack:n,message:s}=e;return this.publishExecuteError({ename:t,evalue:s,traceback:[`${n}`]}),{status:"error",execution_count:this.executionCount,ename:t,evalue:s,traceback:[`${n}`]}}}async completeRequest(e){var t,n;const s=this._evalFunc(this._iframe.contentWindow,"Object.keys(window)"),{code:o,cursor_pos:i}=e,r=null!==(n=(null!==(t=o.slice(0,i).match(/(\w+)$/))&&void 0!==t?t:[])[0])&&void 0!==n?n:"";return{matches:s.filter((e=>e.startsWith(r))),cursor_start:i-r.length,cursor_end:i,metadata:{},status:"ok"}}async inspectRequest(e){throw new Error("not implemented")}async isCompleteRequest(e){throw new Error("not implemented")}async commInfoRequest(e){throw new Error("not implemented")}inputReply(e){throw new Error("not implemented")}async commOpen(e){throw new Error("not implemented")}async commMsg(e){throw new Error("not implemented")}async commClose(e){throw new Error("not implemented")}_eval(e){return this._evalFunc(this._iframe.contentWindow,e)}async _magics(e=""){var t,n;const s=this._inputs.map((e=>["try {",`window.eval(\`${e}\`);`,"} catch(e) {}"].join("\n"))).join("\n"),o=`\n        ${this._bootstrap}.then(() => {\n          ${s}\n          window.__globalP5._start();\n        })\n      `,r=e.match(/^%show(?: (.+)\s+(.+))?\s*$/),a=null!==(t=null==r?void 0:r[1])&&void 0!==t?t:void 0,c=null!==(n=null==r?void 0:r[2])&&void 0!==n?n:void 0;return{execution_count:this.executionCount,data:{[i]:['<body style="overflow: hidden;">',`<script>${o}<\/script>`,"</body>"].join("\n")},metadata:{[i]:{width:a,height:c}}}}async _initIFrame(){this._iframe.contentWindow&&this._evalFunc(this._iframe.contentWindow,'\n          console._log = console.log;\n          console._error = console.error;\n          window._bubbleUp = function(msg) {\n            window.parent.postMessage(msg);\n          }\n          console.log = function() {\n            const args = Array.prototype.slice.call(arguments);\n            window._bubbleUp({\n              "event": "stream",\n              "name": "stdout",\n              "text": args.join(\' \') + \'\\n\'\n            });\n          };\n          console.info = console.log;\n          console.error = function() {\n            const args = Array.prototype.slice.call(arguments);\n            window._bubbleUp({\n              "event": "stream",\n              "name": "stderr",\n              "text": args.join(\' \') + \'\\n\'\n            });\n          };\n          console.warn = console.error;\n          window.onerror = function(message, source, lineno, colno, error) {\n            console.error(message);\n          }\n        ')}}}}]);