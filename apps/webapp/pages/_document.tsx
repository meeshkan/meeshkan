import Document, {
	Html,
	Main,
	Head,
	NextScript,
	DocumentContext,
} from 'next/document';
import { MixpanelScript } from '@lightspeed/react-mixpanel-script';

type DocumentProps = {
	nonce: string;
};

class MyDocument extends Document<DocumentProps> {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return initialProps;
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					{process.env.VERCEL_ENV === 'preview' ||
					process.env.VERCEL_ENV === 'development' ||
					process.env.NODE_ENV === 'development' ? (
						<link
							rel="icon"
							href="https://media.graphcms.com/3rGTPSeRQSGrTSByY6M6"
						/>
					) : process.env.NODE_ENV === 'production' ||
					  process.env.VERCEL_ENV === 'production' ? (
						<link
							rel="icon"
							href="https://media.graphcms.com/Sf3Hxc3gQP6ylXt8d3EX"
						/>
					) : (
						<link
							rel="icon"
							href="https://media.graphcms.com/Sf3Hxc3gQP6ylXt8d3EX"
						/>
					)}
					{/* Meeshkan Recorder */}
					{process.env.NODE_ENV === 'production' ? (
						<script
							async
							src="https://recorder.meeshkan.com/record.js?client_id=ckiu1t1gy025708md3baydqrl"
						/>
					) : null}
					{/* Intercom */}
					<script
						dangerouslySetInnerHTML={{
							__html:
								'(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic("reattach_activator");ic("update",w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement("script");s.type="text/javascript";s.async=true;s.src="https://widget.intercom.io/widget/nou4ik17";var x=d.getElementsByTagName("script")[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent("onload",l);}else{w.addEventListener("load",l,false);}}})();',
						}}
					/>
					{/* Commandbar */}
					<script
						dangerouslySetInnerHTML={{
							__html:
								'(function(){var org="a552aa00";var w = window; var d = document; var cb = []; cb.q = []; window.CommandBar = new Proxy(cb, { get: function (f, n) { if (n in f) { return f[n] } return function () { var a = Array.prototype.slice.call(arguments); a.unshift(n); cb.q.push(a) } }, }); var load = function () { var a = "h"; var t = "s"; var r = null; try { r = localStorage.getItem("commandbar.lc"); } catch (e) { }; var e = "https://api.commandbar.com"; var o = "o"; var c = "l"; var n = "t"; var l = "c"; if (r && r.includes("local")) { var v = "a"; var s = ":8"; var i = "p:/"; e = "htt" + i + "/" + c + o + l + v + c + a + o + t + n + s + "000" } var m = d.createElement("script"); var h = e + "/latest/" + org; h = r ? h + "?lc=" + r : h; m.type = "text/javascript"; m.async = true; m.src = h; d.head.appendChild(m) }; if(w.attachEvent){w.attachEvent("onload", load)}else{w.addEventListener("load", load, false)}})();',
						}}
					/>
					<MixpanelScript
						// random UUID generated as a secret
						nonce={`456DE3C3-1598-4D76-BA71-DE9A6EDBFB3B`}
						mixpanelApiKey={process.env.MIXPANEL_TOKEN || ''}
					/>
					<script
						src="https://meeshkan-product-tours.vercel.app/tours.js"
						id="meeshkan-product-tours"
					/>
				</Head>
				<Main />
				<NextScript />
			</Html>
		);
	}
}

export default MyDocument;
