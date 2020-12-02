/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
	const content: any;
	export const ReactComponent: any;
	export default content;
}

declare module "filestack-react" {
	import React from "react"
	import { PickerFileMetadata, ClientOptions } from "filestack-js"

	type FilestackAction =
		| "transform"
		| "retrieve"
		| "metadata"
		| "storeUrl"
		| "upload"
		| "multiupload"
		| "remove"
		| "pick"
		| "removeMetadata"
		| "preview"
		| "logout"

	type ComponentDisplayModeType = "button" | "link" | "immediate"

	interface Props {
		apikey: string | undefined
		action?: FilestackAction
		componentDisplayMode?: {
			type?: ComponentDisplayModeType
			customText?: string
			customClass?: string
		}
		onSuccess?: (data: PickerResponse) => void
		onError?: (error: PickerFileMetadata[]) => void
		clientOptions?: ClientOptions
		file?: File
		source?: string
		customRender?: React.ComponentType<{ onPick: (arg: unknown) => void }>
		actionOptions: OptionsObject
	}

	declare class ReactFilestack extends React.Component<Props> {}
	export default ReactFilestack
}
