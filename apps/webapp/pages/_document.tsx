import Document, {
	Html,
	Main,
	Head,
	NextScript,
	DocumentContext,
} from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return initialProps;
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="icon"
						href="https://media.graphcms.com/ZUjeEBiaT9iGYxhI5kzq"
					/>
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
				</Head>
				<Main />
				<NextScript />
			</Html>
		);
	}
}

export default MyDocument;
