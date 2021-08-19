import { gql } from 'graphql-request';

export const CONFIGURATION_UPDATE_LOGIN_FLOW = gql`
	mutation CONFIGURATION_UPDATE_LOGIN_FLOW($id: ID!, $flow: ID!) {
		configurationUpdate(
			filter: { id: $id }
			data: { logInStory: { connect: { id: $flow } } }
		) {
			id
		}
	}
`;

export const LINK_DEMO_PROJECT_TO_TEST_RUNS = gql`
	mutation LINK_DEMO_PROJECT_TO_TEST_RUNS(
		$id: ID!
		$data: ProjectUpdateInput!
	) {
		projectUpdate(filter: { id: $id }, data: $data) {
			id
		}
	}
`;

export const CREATE_DEMO_PROJECT = gql`
	mutation CREATE_DEMO_PROJECT($id: ID!, $name: String!) {
		projectCreate(
			data: {
				members: { connect: { id: $id } }
				name: $name
				avatar: { connect: { fileId: "rouqioXhQk25T22mdpzr" } }
				configuration: {
					create: {
						subscriptionStatus: "active"
						billingInterval: "monthly"
						stagingURL: "https://www.staging.lego.com/"
						productionURL: "https://www.lego.com/"
						plan: "Demo"
						inviteLink: ""
					}
				}
				userStories: {
					create: [
						{
							title: "Log in flow"
							isTestCase: true
							requiresAuthentication: true
							flows: {
								create: [
									{
										flowId: 0
										ipAddress: "213.243.176.31"
										browser: "Chrome"
										browserVersion: "86.0.4240.111"
										language: "en-US"
									}
								]
							}
							created: "manual"
							isExpected: true
							significance: "high"
							video: { connect: { fileId: "lRVMhE28T7eOWQwRjugx" } }
							scriptCommands: {
								create: [
									{
										command: "open"
										sIndex: 0
										eventId: "88c2bb1a-67c5-46dc-8790-15029ba216bd"
										value: "https://www.lego.com/en-fi"
									}
									{
										command: "set viewport size"
										sIndex: 1
										eventId: "88c2bb1a-67c5-46dc-8790-15029ba216bd"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 4
										eventId: "c11e537d-545a-4384-829f-38d345375b7b"
										xCoordinate: 1570
										yCoordinate: 24
										xpath: "/html/body/div[1]/div[2]/header/div[2]/div[1]/div[3]/button/span"
										selector: ".UtilityBarstyles__AccountButton-sc-1uwh8t8-6 > span"
										className: "."
										tagName: "SPAN"
										tagId: ""
										innerText: "Account"
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 5
										eventId: "8cb99c4d-e078-483a-9192-7955fac688fa"
										xCoordinate: 959
										yCoordinate: 367
										xpath: "/html/body/div[5]/div/aside/div/div/button"
										selector: ".eCVPKR"
										className: ".Button__Base-sc-1jdmsyi-0.eCVPKR.AccountViewstyles__SignIn-sc-1m5bq7g-10.kBctia"
										tagName: "BUTTON"
										tagId: ""
										innerText: "Sign In"
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 6
										xpath: "/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/div[2]/form/div[1]/div[2]/input"
										selector: ".FormElement__Input--5PB65bF FormElement__InputContainer--12b6bYw"
										innerText: ""
										documentURL: "https://identity.lego.com/en-AU/login/?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3FappContext%3Dfalse%26adultexperience%3Dtrue%26hideheader%3Dtrue%26scope%3Dopenid%2520email%2520profile%2520dob%26response_type%3Did_token%2520token%26client_id%3D316ad352-6573-4df0-b707-e7230ab7e0c7%26redirect_uri%3Dhttps%253A%252F%252Fwww.lego.com%252Fidentity%252Fcallback%26ui_locales%3Den-AU%26state%3D25aQ0LvPTH47MzLc%26nonce%3D0Q5saiFlkfBtGzi2"
									}
									{
										command: "type"
										sIndex: 7
										value: "demo.project@meeshkan.com"
										xpath: "/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/div[2]/form/div[1]/div[2]/input"
										selector: ""
										documentURL: "https://identity.lego.com/en-AU/login/?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3FappContext%3Dfalse%26adultexperience%3Dtrue%26hideheader%3Dtrue%26scope%3Dopenid%2520email%2520profile%2520dob%26response_type%3Did_token%2520token%26client_id%3D316ad352-6573-4df0-b707-e7230ab7e0c7%26redirect_uri%3Dhttps%253A%252F%252Fwww.lego.com%252Fidentity%252Fcallback%26ui_locales%3Den-AU%26state%3D25aQ0LvPTH47MzLc%26nonce%3D0Q5saiFlkfBtGzi2"
									}
									{
										command: "type"
										sIndex: 8
										value: "$uper$ecure1"
										xpath: "/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/div[2]/form/div[2]/div[2]/div/input"
										selector: ".FormElement__PasswordInput--KWpJF-8 FormElement__Input--5PB65bF"
										documentURL: "https://identity.lego.com/en-AU/login/?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3FappContext%3Dfalse%26adultexperience%3Dtrue%26hideheader%3Dtrue%26scope%3Dopenid%2520email%2520profile%2520dob%26response_type%3Did_token%2520token%26client_id%3D316ad352-6573-4df0-b707-e7230ab7e0c7%26redirect_uri%3Dhttps%253A%252F%252Fwww.lego.com%252Fidentity%252Fcallback%26ui_locales%3Den-AU%26state%3D25aQ0LvPTH47MzLc%26nonce%3D0Q5saiFlkfBtGzi2"
									}
									{
										command: "click"
										sIndex: 2
										xpath: "/html/body/div[1]/div[5]/div/div/div[1]/div[1]/div/button"
										selector: ""
										innerText: "Continue"
										documentURL: ""
									}
									{
										command: "click"
										sIndex: 3
										xpath: "/html/body/div[4]/div/aside/div/div/div[3]/div[1]/div[1]/button[2]"
										selector: ""
										innerText: "Accept all"
										documentURL: ""
									}
									{
										command: "click"
										sIndex: 10
										xpath: "/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/div[2]/form/div[4]/button"
										selector: ""
										innerText: "Log in"
										documentURL: ""
									}
								]
							}
						}
						{
							title: "Check out whats new and filter by set"
							isTestCase: true
							requiresAuthentication: true
							video: { connect: { fileId: "V4lGtgRPamJ76JsuBhcQ" } }
							flows: {
								create: [{ipAddress: "123.248.115.121", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 0}, {ipAddress: "42.168.1.187", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 1}, {ipAddress: "5.14.43.149", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 2}, {ipAddress: "87.115.204.234", browser: "Firefox", browserVersion: "89.0", language: "de", flowId: 3}, {ipAddress: "73.151.42.245", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 4}, {ipAddress: "68.102.227.126", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 5}, {ipAddress: "148.34.7.202", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 6}, {ipAddress: "43.208.139.100", browser: "Samsung Internet", browserVersion: "14.2", language: "en-US", flowId: 7}, {ipAddress: "164.127.235.162", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 8}, {ipAddress: "193.129.22.100", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 9}, {ipAddress: "192.22.193.188", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 10}, {ipAddress: "115.19.122.45", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 11}, {ipAddress: "173.118.64.42", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 12}, {ipAddress: "86.182.148.248", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 13}, {ipAddress: "171.232.98.108", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 14}, {ipAddress: "23.96.71.189", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 15}, {ipAddress: "133.164.114.127", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 16}, {ipAddress: "118.3.241.85", browser: "Edge", browserVersion: "91.0.864", language: "en-US", flowId: 17}, {ipAddress: "13.85.104.113", browser: "Chrome", browserVersion: "91.0.4472", language: "en-GB", flowId: 18}, {ipAddress: "62.103.248.124", browser: "Safari", browserVersion: "14.1", language: "fr", flowId: 19}, {ipAddress: "120.174.112.165", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 20}, {ipAddress: "151.247.119.183", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 21}, {ipAddress: "69.247.82.101", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-au", flowId: 22}, {ipAddress: "139.16.249.141", browser: "Firefox", browserVersion: "89.0", language: "en-US", flowId: 23}, {ipAddress: "18.215.248.130", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 24}, {ipAddress: "130.80.26.225", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 25}, {ipAddress: "171.170.29.55", browser: "Chrome", browserVersion: "86.0.4240", language: "fr-FR", flowId: 26}, {ipAddress: "158.80.24.27", browser: "Chrome Mobile", browserVersion: "91.0.4472", language: "en-US", flowId: 27}, {ipAddress: "64.181.200.95", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 28}, {ipAddress: "26.194.149.44", browser: "Edge", browserVersion: "91.0.864", language: "fr", flowId: 29}, {ipAddress: "26.74.184.213", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 30}, {ipAddress: "203.204.94.176", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 31}, {ipAddress: "137.222.224.55", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 32}, {ipAddress: "111.162.3.246", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 33}, {ipAddress: "212.102.168.17", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 34}, {ipAddress: "203.121.47.35", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 35}, {ipAddress: "207.116.191.126", browser: "Instagram", browserVersion: "193.0.0", language: "en-au", flowId: 36}, {ipAddress: "157.191.193.140", browser: "Instagram", browserVersion: "194.0.0", language: "en-US", flowId: 37}, {ipAddress: "219.159.210.112", browser: "Safari", browserVersion: "14.0", language: "fr-fr", flowId: 38}, {ipAddress: "83.119.144.108", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 39}, {ipAddress: "70.231.13.24", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 40}, {ipAddress: "207.23.117.159", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 41}, {ipAddress: "175.26.163.9", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 42}, {ipAddress: "182.228.176.5", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 43}, {ipAddress: "31.110.161.118", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 44}, {ipAddress: "172.147.221.156", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 45}, {ipAddress: "19.135.241.61", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 46}, {ipAddress: "28.120.80.143", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 47}, {ipAddress: "103.135.85.23", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 48}, {ipAddress: "87.233.229.126", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "en-GB", flowId: 49}, {ipAddress: "18.216.95.145", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "en-US", flowId: 50}, {ipAddress: "73.114.15.3", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 51}, {ipAddress: "101.79.24.30", browser: "Safari", browserVersion: "14.1.1", language: "fr-fr", flowId: 52}, {ipAddress: "25.30.254.233", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 53}, {ipAddress: "95.224.52.124", browser: "Instagram", browserVersion: "182.0.0", language: "en-US", flowId: 54}, {ipAddress: "186.235.107.234", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 55}, {ipAddress: "28.100.45.75", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 56}, {ipAddress: "50.255.173.225", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 57}, {ipAddress: "13.79.146.35", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 58}, {ipAddress: "13.214.152.199", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 59}, {ipAddress: "170.14.192.100", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 60}, {ipAddress: "89.187.210.155", browser: "Chrome Mobile", browserVersion: "91.0.4472", language: "el-GR", flowId: 61}, {ipAddress: "102.252.210.154", browser: "Instagram", browserVersion: "193.0.0", language: "en-au", flowId: 62}, {ipAddress: "212.53.200.252", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 63}, {ipAddress: "12.209.173.229", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 64}, {ipAddress: "27.16.45.188", browser: "Edge", browserVersion: "91.0.864", language: "en-US", flowId: 65}, {ipAddress: "147.94.114.28", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 66}, {ipAddress: "140.103.254.85", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 67}, {ipAddress: "186.166.25.168", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 68}, {ipAddress: "93.91.132.72", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 69}, {ipAddress: "6.166.183.161", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 70}, {ipAddress: "164.59.131.175", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 71}, {ipAddress: "166.107.160.87", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 72}, {ipAddress: "58.111.133.160", browser: "Firefox", browserVersion: "78.0", language: "fr", flowId: 73}, {ipAddress: "5.37.214.191", browser: "Chrome", browserVersion: "91.0.4472", language: "fr", flowId: 74}, {ipAddress: "29.58.110.44", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 75}, {ipAddress: "146.233.34.89", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 76}, {ipAddress: "190.6.4.39", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 77}, {ipAddress: "9.139.25.248", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 78}, {ipAddress: "55.217.104.90", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 79}, {ipAddress: "182.89.99.75", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 80}, {ipAddress: "179.88.19.125", browser: "Chrome", browserVersion: "91.0.4472", language: "zh-TW", flowId: 81}, {ipAddress: "4.91.39.154", browser: "Instagram", browserVersion: "196.0.0", language: "en-US", flowId: 82}, {ipAddress: "215.254.100.5", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 83}, {ipAddress: "86.45.173.17", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-gb", flowId: 84}, {ipAddress: "102.64.179.240", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 85}, {ipAddress: "170.216.200.197", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 86}, {ipAddress: "94.233.157.161", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 87}, {ipAddress: "192.21.69.44", browser: "Chrome Mobile", browserVersion: "91.0.4472", language: "en-US", flowId: 88}, {ipAddress: "8.91.74.165", browser: "Snapchat", browserVersion: "11.34.1", language: "de-de", flowId: 89}, {ipAddress: "110.16.95.241", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 90}]
							}
							created: "user"
							isExpected: true
							significance: "medium"
							scriptCommands: {
								create: [
									{
										command: "open"
										sIndex: 0
										eventId: "68a535a3-f1be-4aef-9f8f-1b2f8b2d3e2c"
										value: "https://www.lego.com/en-fi"
									}
									{
										command: "set viewport size"
										sIndex: 1
										eventId: "68a535a3-f1be-4aef-9f8f-1b2f8b2d3e2c"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 2
										eventId: "edb3abff-dfa6-4ffc-ac7b-96596ae608d2"
										xCoordinate: 501
										yCoordinate: 722
										xpath: "/html/body/div[1]/main/div/div[2]/div/section/ul/li[1]/a/div/picture/img"
										selector: ".QuickLinksstyles__BlockWrapper-vicnbr-2:nth-child(1) .Imagestyles__Img-m2o9tb-0"
										className: ".Imagestyles__Img-m2o9tb-0.jyexzd.Picturestyles__Image-j8hf1d-1.fdrHFh"
										tagName: "IMG"
										tagId: ""
										altOrAriaText: ""
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 3
										eventId: "8e212f9e-f806-4457-bf01-1267c476b7d2"
										xCoordinate: 303
										yCoordinate: 413
										xpath: "/html/body/div[1]/main/div/div[3]/div/section/div/aside/div/div/div[2]/div/div/div/div/ul/li[1]/label/div/div/svg/polygon"
										selector: "#product-facet-productType-accordion-content .FacetLabelstyles__Wrapper-sc-1vk7n0o-1:nth-child(1) polygon"
										tagName: "polygon"
										tagId: ""
										documentURL: "https://www.lego.com/en-fi/categories/new-sets-and-products?icmp=HP-SHQL-EG-NO-new-116"
									}
									{
										command: "click"
										sIndex: 4
										eventId: "63896e9d-ef88-4f92-97ea-463c25eda993"
										xCoordinate: 303
										yCoordinate: 413
										xpath: "/html/body/div[1]/main/div/div[3]/div/section/div/aside/div/div/div[2]/div/div/div/div/ul/li[1]/label/div/input"
										selector: "#product-facet-productType-accordion-content .FacetLabelstyles__Wrapper-sc-1vk7n0o-1:nth-child(1) .Checkbox__HiddenCheckbox-sc-19eplce-3"
										className: ".Checkbox__HiddenCheckbox-sc-19eplce-3.fNVHnp"
										tagName: "INPUT"
										tagId: ""
										documentURL: "https://www.lego.com/en-fi/categories/new-sets-and-products?icmp=HP-SHQL-EG-NO-new-116"
									}
									{
										command: "type"
										sIndex: 5
										eventId: "173bb7b4-981a-48cb-9f95-5fc81cf8831a"
										value: "on"
										xpath: "/html/body/div[1]/main/div/div[3]/div/section/div/aside/div/div/div[2]/div/div/div/div/ul/li[1]/label/div/input"
										selector: "#product-facet-productType-accordion-content .FacetLabelstyles__Wrapper-sc-1vk7n0o-1:nth-child(1) .Checkbox__HiddenCheckbox-sc-19eplce-3"
										className: ".Checkbox__HiddenCheckbox-sc-19eplce-3.fNVHnp"
										tagName: "INPUT"
										tagId: ""
										documentURL: "https://www.lego.com/en-fi/categories/new-sets-and-products?page=1&filters.i0.key=categories.id&filters.i0.values.i0=12ba8640-7fb5-4281-991d-ac55c65d8001"
									}
									{
										command: "click"
										sIndex: 6
										eventId: "38b024b3-1e8b-4672-93da-1ddc93ff08a5"
										xCoordinate: 704
										yCoordinate: 864
										xpath: "/html/body/div[1]/main/div/div[3]/div/section/div/div/div[2]/ul/li[1]/div/div[2]/div[2]/button/div[3]"
										selector: ".ProductGridstyles__Item-lc2zkx-1:nth-child(1) .ButtonLabelWithProgressstyles__StyledMessage-sc-19upyqe-1"
										className: ".ButtonLabelWithProgressstyles__StyledMessage-sc-19upyqe-1.jEcysK"
										tagName: "DIV"
										tagId: ""
										innerText: "Add to Bag"
										documentURL: "https://www.lego.com/en-fi/categories/new-sets-and-products?page=1&filters.i0.key=categories.id&filters.i0.values.i0=12ba8640-7fb5-4281-991d-ac55c65d8001"
									}
									{
										command: "click"
										sIndex: 7
										eventId: "3e7fe602-2b13-464f-908c-5fadf85baf6d"
										xCoordinate: 1049
										yCoordinate: 589
										xpath: "/html/body/div[5]/div/aside/div/div[2]/div[2]/div[2]/a"
										selector: ".Linksstyles__RouterLinkButton-sc-684acv-2"
										className: ".Linksstyles__RouterLinkButton-sc-684acv-2.bPmAZc.AddToBagModalstyles__StyledLink-thtx66-14.eFFjKo"
										tagName: "A"
										tagId: ""
										innerText: "View My Bag"
										documentURL: "https://www.lego.com/en-fi/categories/new-sets-and-products?page=1&filters.i0.key=categories.id&filters.i0.values.i0=12ba8640-7fb5-4281-991d-ac55c65d8001"
									}
								]
							}
						}
						{
							title: "Navigate to cart"
							isTestCase: true
							requiresAuthentication: true
							video: { connect: { fileId: "9v8cNYaiR4iGKW36XfZ3" } }
							flows: {
								create: [
									{
										flowId: 0
										ipAddress: "213.243.176.31"
										browser: "Chrome"
										browserVersion: "86.0.4240.111"
										language: "en-US"
									}
								]
							}
							created: "manual"
							isExpected: true
							significance: "high"
							scriptCommands: {
								create: [
									{
										command: "open"
										sIndex: 0
										eventId: "f40400d7-729c-4a9e-b272-7a7e2a12d118"
										value: "https://www.lego.com/en-fi"
									}
									{
										command: "set viewport size"
										sIndex: 1
										eventId: "f40400d7-729c-4a9e-b272-7a7e2a12d118"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 2
										eventId: "df99bb88-255e-4390-ad7e-92717f3970e7"
										xCoordinate: 1662
										yCoordinate: 100
										xpath: "/html/body/div[1]/div[2]/header/div[2]/div[2]/div/div[5]/a[2]/svg"
										selector: ".jWyjvs"
										tagName: "svg"
										tagId: ""
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 3
										eventId: "c88cdabd-7445-4f6d-87aa-4c1bbaeae188"
										xCoordinate: 1020
										yCoordinate: 812
										xpath: "/html/body/div[1]/main/div[2]/div/div/div[2]/div/div/div[3]/div/div/div/div[2]/div/div[2]/button/div[3]"
										selector: ".ProductCarouselstyles__ProductWrapper-sc-159nny3-1:nth-child(3) .ButtonLabelWithProgressstyles__StyledMessage-sc-19upyqe-1"
										className: ".ButtonLabelWithProgressstyles__StyledMessage-sc-19upyqe-1.jEcysK"
										tagName: "DIV"
										tagId: ""
										innerText: "Add to Bag"
										documentURL: "https://www.lego.com/en-fi/cart"
									}
								]
							}
						}
						{
							title: "Go to the play zone"
							isTestCase: true
							requiresAuthentication: true
							flows: {
								create: [{ipAddress: "176.107.74.234", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 0}, {ipAddress: "43.125.50.185", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 1}, {ipAddress: "74.90.225.25", browser: "Samsung Internet", browserVersion: "14.2", language: "en-US", flowId: 2}, {ipAddress: "219.106.77.83", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 3}, {ipAddress: "78.242.202.232", browser: "Firefox", browserVersion: "89.0", language: "en-GB", flowId: 4}, {ipAddress: "33.164.181.203", browser: "Firefox", browserVersion: "89.0", language: "en-US", flowId: 5}, {ipAddress: "7.61.126.113", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 6}, {ipAddress: "161.191.201.233", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 7}, {ipAddress: "55.128.239.179", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 8}, {ipAddress: "148.161.94.49", browser: "Firefox", browserVersion: "89.0", language: "en-US", flowId: 9}, {ipAddress: "122.126.207.57", browser: "Instagram", browserVersion: "194.0.0", language: "en-AU", flowId: 10}, {ipAddress: "219.107.44.141", browser: "Chrome Mobile iOS", browserVersion: "91.0.4472", language: "en-us", flowId: 11}, {ipAddress: "208.158.229.44", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 12}, {ipAddress: "221.73.160.71", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 13}, {ipAddress: "118.153.210.125", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 14}, {ipAddress: "204.123.143.180", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 15}, {ipAddress: "6.86.202.174", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 16}, {ipAddress: "139.96.233.111", browser: "Chrome Mobile", browserVersion: "91.0.4472", language: "en-US", flowId: 17}, {ipAddress: "174.104.147.27", browser: "Chrome Mobile iOS", browserVersion: "91.0.4472", language: "en-us", flowId: 18}, {ipAddress: "95.234.163.87", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 19}, {ipAddress: "145.202.17.151", browser: "Samsung Internet", browserVersion: "14.2", language: "el-GR", flowId: 20}, {ipAddress: "63.124.122.137", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 21}, {ipAddress: "162.234.142.217", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 22}, {ipAddress: "179.61.10.253", browser: "Chrome Mobile", browserVersion: "91.0.4472", language: "ar", flowId: 23}, {ipAddress: "141.225.146.47", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 24}, {ipAddress: "118.32.59.112", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 25}, {ipAddress: "189.156.158.142", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 26}, {ipAddress: "80.66.133.38", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 27}, {ipAddress: "199.4.166.42", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 28}, {ipAddress: "189.108.243.177", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 29}, {ipAddress: "145.171.115.123", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 30}, {ipAddress: "7.206.219.212", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 31}, {ipAddress: "200.131.217.30", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 32}, {ipAddress: "56.38.26.147", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 33}, {ipAddress: "152.108.232.14", browser: "Chrome", browserVersion: "93.0.4535", language: "fr-FR", flowId: 34}, {ipAddress: "218.82.157.248", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 35}, {ipAddress: "96.122.45.115", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 36}, {ipAddress: "35.105.212.66", browser: "Edge", browserVersion: "91.0.864", language: "en-US", flowId: 37}, {ipAddress: "208.78.204.8", browser: "Instagram", browserVersion: "195.0.0", language: "en-us", flowId: 38}, {ipAddress: "22.135.224.175", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 39}, {ipAddress: "41.221.155.111", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 40}, {ipAddress: "93.81.212.80", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 41}, {ipAddress: "82.48.41.31", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 42}, {ipAddress: "119.182.93.234", browser: "Safari", browserVersion: "14.0", language: "fr-fr", flowId: 43}, {ipAddress: "47.171.179.132", browser: "Edge", browserVersion: "91.0.864", language: "en-GB", flowId: 44}, {ipAddress: "136.169.70.161", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 45}, {ipAddress: "172.121.78.95", browser: "Safari", browserVersion: "14.1", language: "fr", flowId: 46}, {ipAddress: "74.6.67.171", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 47}, {ipAddress: "147.223.209.65", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 48}, {ipAddress: "170.14.97.103", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 49}, {ipAddress: "63.35.8.141", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 50}, {ipAddress: "120.183.7.192", browser: "Safari", browserVersion: "14.0.3", language: "fr-fr", flowId: 51}, {ipAddress: "35.97.69.148", browser: "Chrome", browserVersion: "91.0.4472", language: "el-GR", flowId: 52}, {ipAddress: "62.242.228.147", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 53}, {ipAddress: "207.166.115.209", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 54}, {ipAddress: "8.178.12.205", browser: "Chrome Mobile", browserVersion: "91.0.4472", language: "en-US", flowId: 55}, {ipAddress: "221.137.159.162", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 56}, {ipAddress: "86.43.244.200", browser: "Edge", browserVersion: "91.0.864", language: "fr", flowId: 57}, {ipAddress: "106.24.61.240", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 58}, {ipAddress: "86.172.177.0", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 59}, {ipAddress: "39.28.245.176", browser: "Safari", browserVersion: "13.1.2", language: "fr", flowId: 60}, {ipAddress: "184.199.179.152", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 61}, {ipAddress: "66.116.226.135", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 62}, {ipAddress: "215.132.219.222", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 63}, {ipAddress: "110.199.243.79", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 64}, {ipAddress: "124.80.109.46", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 65}, {ipAddress: "68.105.18.174", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 66}, {ipAddress: "135.41.84.8", browser: "Chrome", browserVersion: "89.0.4389", language: "en-GB", flowId: 67}, {ipAddress: "217.24.109.14", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 68}, {ipAddress: "41.232.246.160", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 69}, {ipAddress: "211.226.24.124", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 70}, {ipAddress: "134.176.16.187", browser: "Facebook", browserVersion: "324.0.0", language: "el-GR", flowId: 71}, {ipAddress: "204.149.227.118", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 72}, {ipAddress: "129.79.50.238", browser: "Chrome", browserVersion: "91.0.4472", language: "en-GB", flowId: 73}, {ipAddress: "137.105.12.1", browser: "Instagram", browserVersion: "195.0.0", language: "de-DE", flowId: 74}, {ipAddress: "220.26.106.104", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 75}]
							}
							created: "user"
							isExpected: true
							significance: "high"
							video: { connect: { fileId: "QPkXr5YyR4DRitiy0i1M" } }
							scriptCommands: {
								create: [
									{
										command: "open"
										sIndex: 0
										eventId: "82fa126e-d878-40c9-9ff5-3c748a1567f9"
										value: "https://www.lego.com/en-gb/campaigns/kids/legolife/magazine"
									}
									{
										command: "set viewport size"
										sIndex: 1
										eventId: "82fa126e-d878-40c9-9ff5-3c748a1567f9"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-gb/campaigns/kids/legolife/magazine"
									}
									{
										command: "scroll"
										sIndex: 2
										eventId: "bbee08e0-698e-4a02-b96f-53b3b08798e8"
										documentURL: "https://www.lego.com/en-gb/campaigns/kids/legolife/magazine"
										scrollTop: 1325
										scrollLeft: 0
									}
									{
										command: "click"
										sIndex: 3
										eventId: "b6aba612-ad06-4f32-9648-23d79e6454dd"
										xCoordinate: 1557
										yCoordinate: 1767
										xpath: "/html/body/div[5]/div/div/div/div/div/article/section/a[2]/div"
										selector: ".has--sub-title .cta-btn__inner"
										className: ".cta-btn__inner"
										tagName: "DIV"
										tagId: ""
										innerText: "Magazine for ages 7+"
										documentURL: "https://www.lego.com/en-gb/campaigns/kids/legolife/magazine"
									}
								]
							}
						}
						{
							title: "Lego Super Mario!"
							isTestCase: true
							requiresAuthentication: true
							video: { connect: { fileId: "1YYIZkAKQDuGZNSL5tiv" } }
							flows: {
								create: [
									{
										flowId: 0
										ipAddress: "213.243.176.31"
										browser: "Chrome"
										browserVersion: "86.0.4240.111"
										language: "en-US"
									}
								]
							}
							created: "manual"
							isExpected: true
							significance: "medium"
							scriptCommands: {
								create: [
									{
										command: "click"
										sIndex: 0
										eventId: "b2ee5cf8-396d-4bf7-86ba-5555c0c14937"
										xCoordinate: 852
										yCoordinate: 714
										xpath: "/html/body/div[1]/main/div/div[2]/div/section/ul/li[4]/a/div/picture/img"
										selector: ".QuickLinksstyles__BlockWrapper-vicnbr-2:nth-child(4) .Imagestyles__Img-m2o9tb-0"
										className: ".Imagestyles__Img-m2o9tb-0.jyexzd.Picturestyles__Image-j8hf1d-1.fdrHFh"
										tagName: "IMG"
										tagId: ""
										altOrAriaText: ""
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "open"
										sIndex: 1
										eventId: "5940fd60-1adf-4bdf-bcf0-c307be4e25d7"
										value: "https://www.lego.com/en-fi/themes/super-mario/about?icmp=HP-SHQL-Standard-MAR_QL_Super_Mario_HP-TH-MAR-EAJZIVRNH7"
									}
									{
										command: "set viewport size"
										sIndex: 2
										eventId: "5940fd60-1adf-4bdf-bcf0-c307be4e25d7"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi/themes/super-mario/about?icmp=HP-SHQL-Standard-MAR_QL_Super_Mario_HP-TH-MAR-EAJZIVRNH7"
									}
									{
										command: "click"
										sIndex: 3
										eventId: "e8f45e8a-6e11-4fc1-819f-27bbcd35a0de"
										xCoordinate: 1061
										yCoordinate: 168
										xpath: "/html/body/div[1]/main/div/div[2]/div/section/div/div/a[2]"
										selector: ".hohGVU"
										className: ".InPageNavstyles__NavLinkBase-iyz003-2.InPageNavstyles__LightNavLink-iyz003-3.hohGVU"
										tagName: "A"
										tagId: ""
										innerText: "About"
										documentURL: "https://www.lego.com/en-fi/themes/super-mario/about?icmp=HP-SHQL-Standard-MAR_QL_Super_Mario_HP-TH-MAR-EAJZIVRNH7"
									}
									{
										command: "scroll"
										sIndex: 4
										eventId: "5ea11758-ad4f-49be-8d6c-119327adc127"
										documentURL: "https://www.lego.com/en-fi/themes/super-mario/about"
										scrollTop: 134
										scrollLeft: 0
									}
									{
										command: "scroll"
										sIndex: 5
										eventId: "654e1b73-d0e4-4d6a-bac1-d7425b496e7e"
										documentURL: "https://www.lego.com/en-fi/themes/super-mario/about"
										scrollTop: 795
										scrollLeft: 0
									}
									{
										command: "click"
										sIndex: 6
										eventId: "8c56bbb6-90bd-4891-ac71-de5c41a4af21"
										xCoordinate: 974
										yCoordinate: 1089
										xpath: "/html/body/div[1]/main/div/div[4]/div/section/div/div/div/a"
										selector: "#blt3757667862d6922a .Linksstyles__RouterLinkButton-sc-684acv-2"
										className: ".Linksstyles__RouterLinkButton-sc-684acv-2.eaktnm.LinkWithChevron__StyledLink-sc-1r4vyna-0.knLFEQ.TextBlockstyles__StyledChevronLink-mrux0n-4.hRKYGw"
										tagName: "A"
										tagId: ""
										innerText: "Learn more"
										documentURL: "https://www.lego.com/en-fi/themes/super-mario/about"
									}
									{
										command: "scroll"
										sIndex: 7
										eventId: "27f896c4-f227-41df-a62d-9498035e8d99"
										documentURL: "https://www.lego.com/en-fi/super-mario/team-up?icmp=LP-SHTB-Standard-Mario_TB_standard_Mario_Luigi_adventure-TH-NO-90AMV576LZ"
										scrollTop: 637
										scrollLeft: 0
									}
									{
										command: "set viewport size"
										sIndex: 8
										eventId: "c73c3b04-efd4-4290-be2a-d568b2f8b25f"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi/super-mario/team-up?icmp=LP-SHTB-Standard-Mario_TB_standard_Mario_Luigi_adventure-TH-NO-90AMV576LZ"
									}
									{
										command: "scroll"
										sIndex: 9
										eventId: "30bb879b-95e6-44c9-a96a-6102614e3166"
										documentURL: "https://www.lego.com/en-fi/super-mario/team-up?icmp=LP-SHTB-Standard-Mario_TB_standard_Mario_Luigi_adventure-TH-NO-90AMV576LZ"
										scrollTop: 649
										scrollLeft: 0
									}
									{
										command: "scroll"
										sIndex: 10
										eventId: "d90749e5-10a2-45d0-9e1e-4f47f951486a"
										documentURL: "https://www.lego.com/en-fi/super-mario/team-up?icmp=LP-SHTB-Standard-Mario_TB_standard_Mario_Luigi_adventure-TH-NO-90AMV576LZ"
										scrollTop: 901
										scrollLeft: 0
									}
									{
										command: "click"
										sIndex: 11
										eventId: "acbda922-fa79-4134-891b-d81d1ac02533"
										xCoordinate: 831
										yCoordinate: 1483
										xpath: "/html/body/div[1]/main/div/div[5]/div/section/ul/li[2]/a/div/picture/img"
										selector: ".QuickLinksstyles__BlockWrapper-vicnbr-2:nth-child(2) .Imagestyles__Img-m2o9tb-0"
										className: ".Imagestyles__Img-m2o9tb-0.jyexzd.Picturestyles__Image-j8hf1d-1.fdrHFh"
										tagName: "IMG"
										tagId: ""
										altOrAriaText: ""
										documentURL: "https://www.lego.com/en-fi/super-mario/team-up?icmp=LP-SHTB-Standard-Mario_TB_standard_Mario_Luigi_adventure-TH-NO-90AMV576LZ"
									}
									{
										command: "scroll"
										sIndex: 12
										eventId: "e02d0e33-b7da-4eef-a50c-dfbb0d2d9ad8"
										documentURL: "https://www.lego.com/en-fi/themes/super-mario/luigi?icmp=LP-SHQL-Standard-Mario_QL_Standard_Luigi-TH-NO-H5EVZLJ1LY"
										scrollTop: 0
										scrollLeft: 0
									}
									{
										command: "click"
										sIndex: 13
										eventId: "1b68b59f-3738-4b61-a61f-8f97e9b5c340"
										xCoordinate: 1497
										yCoordinate: 726
										xpath: "/html/body/div[1]/main/div/div[3]/div/section/div/div/div/a"
										selector: ".fhPPDF > .Linksstyles__RouterLinkButton-sc-684acv-2"
										className: ".Linksstyles__RouterLinkButton-sc-684acv-2.eaktnm.HeroBannerstyles__StyledLink-sc-14u9ljd-10.bHKZKM"
										tagName: "A"
										tagId: ""
										innerText: "Pre-order"
										documentURL: "https://www.lego.com/en-fi/themes/super-mario/luigi?icmp=LP-SHQL-Standard-Mario_QL_Standard_Luigi-TH-NO-H5EVZLJ1LY"
									}
								]
							}
						}
						{
							title: "VIP Corner"
							isTestCase: true
							requiresAuthentication: true
							flows: {
								create: [{ipAddress: "14.121.81.70", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 0}, {ipAddress: "44.12.186.251", browser: "Chrome Mobile", browserVersion: "91.0.4472", language: "el", flowId: 1}, {ipAddress: "46.39.109.12", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 2}, {ipAddress: "200.41.205.120", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 3}, {ipAddress: "6.12.158.133", browser: "MiuiBrowser", browserVersion: "12.10.5", language: "el-GR", flowId: 4}, {ipAddress: "176.86.104.135", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 5}, {ipAddress: "95.19.105.76", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 6}, {ipAddress: "16.207.161.219", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 7}, {ipAddress: "92.16.134.208", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 8}, {ipAddress: "97.170.104.171", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-au", flowId: 9}, {ipAddress: "121.229.6.105", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 10}, {ipAddress: "137.43.57.149", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 11}, {ipAddress: "197.37.68.11", browser: "Safari", browserVersion: "14.1.1", language: "fr-fr", flowId: 12}, {ipAddress: "162.131.66.186", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 13}]
							}
							created: "user"
							isExpected: true
							significance: "low"
							video: { connect: { fileId: "xhTHHHwS9uQYHXVzOwMQ" } }
							scriptCommands: {
								create: [
									{
										command: "click"
										sIndex: 0
										eventId: "6979a268-e36c-4886-80a3-1a6d6af7983f"
										xCoordinate: 1301
										yCoordinate: 713
										xpath: "/html/body/div[1]/main/div/div[2]/div/section/ul/li[8]/a/div/picture/img"
										selector: ".QuickLinksstyles__BlockWrapper-vicnbr-2:nth-child(8) .Imagestyles__Img-m2o9tb-0"
										className: ".Imagestyles__Img-m2o9tb-0.jyexzd.Picturestyles__Image-j8hf1d-1.fdrHFh"
										tagName: "IMG"
										tagId: ""
										altOrAriaText: ""
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "open"
										sIndex: 1
										eventId: "eb413489-484a-45eb-ab2e-be0ff693b488"
										value: "https://www.lego.com/en-fi/vip?icmp=HP-SHQL-EG-NO-vip-121"
									}
									{
										command: "set viewport size"
										sIndex: 2
										eventId: "eb413489-484a-45eb-ab2e-be0ff693b488"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi/vip?icmp=HP-SHQL-EG-NO-vip-121"
									}
									{
										command: "open"
										sIndex: 3
										eventId: "e9396e02-c940-4e36-b12f-353f44b81caa"
										value: "https://www.lego.com/en-fi/vip/authorise?icmp=HP-SHQL-EG-NO-vip-121&join=1"
									}
									{
										command: "set viewport size"
										sIndex: 4
										eventId: "e9396e02-c940-4e36-b12f-353f44b81caa"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi/vip/authorise?icmp=HP-SHQL-EG-NO-vip-121&join=1"
									}
									{
										command: "click"
										sIndex: 6
										eventId: "09038b72-0798-49fb-9fdc-79ba076defa8"
										xCoordinate: 626
										yCoordinate: 378
										xpath: "/html/body/div[1]/main/div/div/div[2]/section/div[2]/div[1]/div/label/input"
										selector: "#firstName"
										className: ".Inputstyles__InputField-sc-12nwzc4-1.lkNQKR.focus-visible"
										tagName: "INPUT"
										tagId: "firstName"
										documentURL: "https://www.lego.com/en-fi/vip/register"
									}
									{
										command: "type"
										sIndex: 7
										eventId: "12c18d09-fe1a-4e08-9caa-0a684f415ba2"
										value: "Mike"
										xpath: "/html/body/div[1]/main/div/div/div[2]/section/div[2]/div[1]/div/label/input"
										selector: "#firstName"
										className: ".Inputstyles__InputField-sc-12nwzc4-1.lkNQKR.focus-visible"
										tagName: "INPUT"
										tagId: "firstName"
										documentURL: "https://www.lego.com/en-fi/vip/register"
									}
									{
										command: "execute javascript"
										sIndex: 5
										value: """
										var isVIP = legoContext.user.vip;
										if (!isVIP) {
										  throw new MeeshkanError("User should have retained VIP status.");
										}
										"""
									}
								]
							}
						}
						{
							title: "Get help"
							isTestCase: true
							requiresAuthentication: true
							flows: {
								create: [{ipAddress: "25.172.150.112", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 0}, {ipAddress: "25.219.77.16", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 1}, {ipAddress: "190.57.143.104", browser: "Safari", browserVersion: "14.1.1", language: "en-gb", flowId: 2}, {ipAddress: "126.18.53.198", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 3}, {ipAddress: "162.20.121.89", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 4}, {ipAddress: "29.17.59.244", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 5}, {ipAddress: "19.215.168.230", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 6}, {ipAddress: "33.57.246.191", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 7}, {ipAddress: "176.239.8.31", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 8}, {ipAddress: "130.104.83.181", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 9}, {ipAddress: "192.152.60.28", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 10}, {ipAddress: "151.161.216.134", browser: "Edge", browserVersion: "91.0.864", language: "fr", flowId: 11}, {ipAddress: "203.207.102.162", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 12}, {ipAddress: "145.190.70.166", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 13}, {ipAddress: "172.32.200.212", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 14}]
							}
							created: "user"
							isExpected: true
							significance: "low"
							video: { connect: { fileId: "OoPS0IzGSUejtcVpsFGm" } }
							scriptCommands: {
								create: [
									{
										command: "open"
										sIndex: 0
										eventId: "ecde567c-57d6-44d0-a2e1-17e4eefc8a2b"
										value: "https://www.lego.com/en-fi"
									}
									{
										command: "set viewport size"
										sIndex: 1
										eventId: "ecde567c-57d6-44d0-a2e1-17e4eefc8a2b"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 2
										eventId: "b2525992-1e98-4929-83dd-590101e07385"
										xCoordinate: 498
										yCoordinate: 98
										xpath: "/html/body/div[1]/div[2]/header/div[2]/div[2]/div/div[3]/nav/ul/li[3]/button"
										selector: "#blt8c4a6a2edf7bd73e_menubutton"
										className: ".MainBarstyles__MenuItemButton-sc-1cg7sjw-8.bgXMpp"
										tagName: "BUTTON"
										tagId: "blt8c4a6a2edf7bd73e_menubutton"
										innerText: "HELP"
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 3
										eventId: "1ce37c5d-2c90-49f6-99cc-c28f7319051d"
										xCoordinate: 912
										yCoordinate: 417
										xpath: "/html/body/div[1]/main/div[1]/div/div[2]/div/div[1]/form/div/label/span"
										selector: ".Searchstyles__StyledForm-sc-4s1rhm-6 .Inputstyles__LabelText-sc-12nwzc4-2"
										className: ".Inputstyles__LabelText-sc-12nwzc4-2.iDowkT"
										tagName: "SPAN"
										tagId: ""
										innerText: "Search by city, postcode or country"
										documentURL: "https://www.lego.com/en-fi/stores"
									}
									{
										command: "click"
										sIndex: 4
										eventId: "1a4358f2-fbd2-4c84-8fcf-399664d34ef6"
										xCoordinate: 912
										yCoordinate: 417
										xpath: "/html/body/div[1]/main/div[1]/div/div[2]/div/div[1]/form/div/label/input"
										selector: ".Searchstyles__StyledInput-sc-4s1rhm-5"
										className: ".Inputstyles__InputField-sc-12nwzc4-1.lkNQKR.Searchstyles__StyledInput-sc-4s1rhm-5.oGqtK.focus-visible"
										tagName: "INPUT"
										tagId: ""
										documentURL: "https://www.lego.com/en-fi/stores"
									}
									{
										command: "click"
										sIndex: 5
										eventId: "8bdb5986-17e5-46a8-a25d-c54389863156"
										xCoordinate: 831
										yCoordinate: 484
										xpath: "/html/body/div[1]/main/div[1]/div/div[2]/div/div[1]/div/ul/li[1]"
										selector: ".iKSOIJ"
										className: ".Suggestionsstyles__ListItem-ltzecu-2.iKSOIJ"
										tagName: "LI"
										tagId: ""
										innerText: "Helsinki, Finland"
										documentURL: "https://www.lego.com/en-fi/stores"
									}
									{
										command: "type"
										sIndex: 6
										eventId: "ed355e4d-ec92-47a4-a0cf-9b056afa08ea"
										value: "Helsinki"
										xpath: "/html/body/div[1]/main/div[1]/div/div[2]/div/div[1]/form/div/label/input"
										selector: ".Searchstyles__StyledInput-sc-4s1rhm-5"
										className: ".Inputstyles__InputField-sc-12nwzc4-1.lkNQKR.Searchstyles__StyledInput-sc-4s1rhm-5.oGqtK.focus-visible"
										tagName: "INPUT"
										tagId: ""
										documentURL: "https://www.lego.com/en-fi/stores/search-results?search=Helsinki%2C%20Finland"
									}
								]
							}
						}
						{
							title: "Discover new offers"
							isTestCase: true
							requiresAuthentication: true
							flows: {
								create: [{ipAddress: "143.32.142.28", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 0}, {ipAddress: "94.160.7.129", browser: "Chrome", browserVersion: "91.0.4472", language: "en-CA", flowId: 1}, {ipAddress: "54.32.200.61", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 2}, {ipAddress: "118.75.15.220", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 3}, {ipAddress: "207.3.224.251", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 4}, {ipAddress: "75.47.164.59", browser: "Chrome Mobile WebView", browserVersion: "81.0.4044", language: "el-GR", flowId: 5}, {ipAddress: "175.199.79.20", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 6}, {ipAddress: "198.93.110.225", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 7}, {ipAddress: "146.185.185.98", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 8}, {ipAddress: "20.227.8.216", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 9}, {ipAddress: "175.159.127.205", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 10}, {ipAddress: "157.8.186.11", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 11}, {ipAddress: "194.90.78.214", browser: "Safari", browserVersion: "14.1.1", language: "fr-fr", flowId: 12}, {ipAddress: "218.252.136.112", browser: "Instagram", browserVersion: "193.0.0", language: "fr-ca", flowId: 13}, {ipAddress: "161.91.164.122", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 14}, {ipAddress: "116.93.13.160", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 15}, {ipAddress: "172.192.222.5", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 16}, {ipAddress: "8.104.253.84", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 17}, {ipAddress: "90.187.21.184", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 18}, {ipAddress: "46.184.16.245", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 19}, {ipAddress: "177.237.56.192", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 20}, {ipAddress: "163.50.167.73", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 21}, {ipAddress: "140.188.6.139", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 22}, {ipAddress: "78.134.97.5", browser: "Chrome", browserVersion: "90.0.4430", language: "fr-FR", flowId: 23}, {ipAddress: "75.123.8.116", browser: "Edge", browserVersion: "91.0.864", language: "en-US", flowId: 24}, {ipAddress: "68.88.32.161", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 25}, {ipAddress: "145.14.98.199", browser: "Edge", browserVersion: "91.0.864", language: "fr", flowId: 26}, {ipAddress: "222.237.150.114", browser: "Chrome", browserVersion: "91.0.4472", language: "pt-BR", flowId: 27}, {ipAddress: "163.205.136.61", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 28}, {ipAddress: "198.50.146.179", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 29}, {ipAddress: "109.2.91.159", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 30}, {ipAddress: "49.170.78.231", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 31}, {ipAddress: "87.83.209.161", browser: "Chrome Mobile WebView", browserVersion: "87.0.4280", language: "en-GB", flowId: 32}, {ipAddress: "89.161.5.107", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 33}, {ipAddress: "114.192.156.174", browser: "Samsung Internet", browserVersion: "14.2", language: "el-GR", flowId: 34}, {ipAddress: "111.117.72.119", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 35}, {ipAddress: "160.142.227.59", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 36}, {ipAddress: "35.99.9.64", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 37}, {ipAddress: "195.208.175.30", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 38}, {ipAddress: "50.139.242.106", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 39}, {ipAddress: "6.9.151.44", browser: "Edge", browserVersion: "91.0.864", language: "en-US", flowId: 40}, {ipAddress: "215.108.162.70", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 41}, {ipAddress: "162.233.166.30", browser: "Chrome", browserVersion: "93.0.4535", language: "fr-FR", flowId: 42}, {ipAddress: "142.122.210.229", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 43}, {ipAddress: "172.133.210.29", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 44}, {ipAddress: "39.197.212.6", browser: "Instagram", browserVersion: "193.0.0", language: "en-us", flowId: 45}, {ipAddress: "69.188.40.209", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 46}, {ipAddress: "105.198.248.217", browser: "Chrome", browserVersion: "86.0.4240", language: "fr-FR", flowId: 47}, {ipAddress: "37.156.111.121", browser: "Chrome Mobile", browserVersion: "91.0.4472", language: "en-US", flowId: 48}, {ipAddress: "39.252.168.219", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 49}, {ipAddress: "156.94.151.102", browser: "Facebook", browserVersion: "", language: "en-gb", flowId: 50}, {ipAddress: "140.15.184.68", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 51}, {ipAddress: "65.154.170.123", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 52}, {ipAddress: "201.23.46.233", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 53}, {ipAddress: "120.209.57.31", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 54}, {ipAddress: "66.86.78.139", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 55}, {ipAddress: "223.233.91.188", browser: "Chrome", browserVersion: "91.0.4472", language: "en-GB", flowId: 56}, {ipAddress: "204.62.209.19", browser: "Safari", browserVersion: "14.0.1", language: "fr-fr", flowId: 57}, {ipAddress: "33.104.255.82", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 58}, {ipAddress: "98.185.51.106", browser: "Firefox", browserVersion: "90.0", language: "fr", flowId: 59}, {ipAddress: "28.174.206.224", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 60}, {ipAddress: "173.255.189.125", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 61}, {ipAddress: "4.249.79.122", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 62}, {ipAddress: "103.31.64.212", browser: "Mobile Safari", browserVersion: "14.1.1", language: "en-us", flowId: 63}, {ipAddress: "26.73.128.48", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 64}, {ipAddress: "198.113.168.9", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 65}, {ipAddress: "22.149.217.222", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 66}, {ipAddress: "164.183.95.186", browser: "Chrome Mobile WebView", browserVersion: "87.0.4280", language: "el-GR", flowId: 67}, {ipAddress: "2.44.186.162", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 68}, {ipAddress: "145.109.198.31", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 69}, {ipAddress: "178.77.161.248", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 70}, {ipAddress: "151.178.80.219", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 71}, {ipAddress: "148.45.199.217", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 72}, {ipAddress: "29.134.176.114", browser: "Safari", browserVersion: "14.0.2", language: "fr-fr", flowId: 73}, {ipAddress: "166.174.52.28", browser: "Chrome", browserVersion: "90.0.4430", language: "fr-FR", flowId: 74}, {ipAddress: "83.181.195.142", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 75}, {ipAddress: "132.189.149.87", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 76}, {ipAddress: "154.73.56.18", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 77}]
							}
							created: "user"
							isExpected: true
							significance: "high"
							video: { connect: { fileId: "fMTNEuNJQ0iQOh9quHgs" } }
							scriptCommands: {
								create: [
									{
										command: "click"
										sIndex: 0
										eventId: "56f10bd8-93aa-452b-9b34-6d34987f1e18"
										xCoordinate: 396
										yCoordinate: 97
										xpath: "/html/body/div[1]/div[2]/header/div[2]/div[2]/div/div[3]/nav/ul/li[2]/button"
										selector: "#blt5e54a9219d10fd9c_menubutton"
										className: ".MainBarstyles__MenuItemButton-sc-1cg7sjw-8.bgXMpp"
										tagName: "BUTTON"
										tagId: "blt5e54a9219d10fd9c_menubutton"
										innerText: "DISCOVER"
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "open"
										sIndex: 1
										eventId: "99087ce8-f588-408e-b3fa-d71af25f4482"
										value: "https://www.lego.com/en-fi"
									}
									{
										command: "set viewport size"
										sIndex: 2
										eventId: "99087ce8-f588-408e-b3fa-d71af25f4482"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 3
										eventId: "a1c8e579-63de-4c98-893b-841b0076dd42"
										xCoordinate: 364
										yCoordinate: 266
										xpath: "/html/body/div[1]/div[2]/header/div[2]/div[2]/div/div[3]/nav/div/div[2]/ul/li[4]/a"
										selector: ".glqWTH .SubMenustyles__MenuItem-lbil4s-1:nth-child(4) > .SubMenustyles__MenuLink-lbil4s-2"
										className: ".SubMenustyles__MenuLink-lbil4s-2.hmDynH"
										tagName: "A"
										tagId: ""
										innerText: "Adults Welcome"
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 4
										eventId: "51fda271-71f2-400b-ac87-4450b9622cfd"
										xCoordinate: 326
										yCoordinate: 680
										xpath: "/html/body/div[1]/main/div/div[3]/div/section/div/div[1]/div[1]/div"
										selector: ".HeroBannerstyles__Container-sc-14u9ljd-0 > .HeroBannerstyles__ImageHolder-sc-14u9ljd-2 .LazyImagestyles__Placeholder-sc-1gcjd00-3"
										className: ".LazyImagestyles__Placeholder-sc-1gcjd00-3.isKiCp"
										tagName: "DIV"
										tagId: ""
										documentURL: "https://www.lego.com/en-fi/categories/adults-welcome"
									}
									{
										command: "scroll"
										sIndex: 5
										eventId: "040ca120-d825-4811-bbbd-716da0196f97"
										documentURL: "https://www.lego.com/en-fi/categories/adults-welcome"
										scrollTop: 318
										scrollLeft: 0
									}
									{
										command: "click"
										sIndex: 6
										eventId: "31f6888e-4507-4c2f-a841-6d1a26c7b7b9"
										xCoordinate: 311
										yCoordinate: 981
										xpath: "/html/body/div[1]/main/div/div[4]/div/section/div/ul/li[1]/a/span/span"
										selector: ".QuickLinksAdvancedstyles__LinkWrapper-e3xf89-2:nth-child(1) .Markup__StyledMarkup-ar1l9g-0"
										className: ".Markup__StyledMarkup-ar1l9g-0.hlipzx"
										tagName: "SPAN"
										tagId: ""
										innerText: "ENTERTAINMENT"
										documentURL: "https://www.lego.com/en-fi/categories/adults-welcome"
									}
									{
										command: "scroll"
										sIndex: 7
										eventId: "a558e027-01a6-4630-a8dd-6588ce05a81c"
										documentURL: "https://www.lego.com/en-fi/adults-welcome/entertainment?icmp=LP-SHQL-Standard-Adults_Quicklink_Entertainment-TH-NO-P4EIFLRLP4"
										scrollTop: 0
										scrollLeft: 0
									}
								]
							}
						}
						{
							title: "Pick a brick"
							isTestCase: true
							requiresAuthentication: true
							flows: {
								create: [{ipAddress: "142.148.124.179", browser: "Chrome", browserVersion: "91.0.4472", language: "nl-NL", flowId: 0}, {ipAddress: "24.160.86.105", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 1}, {ipAddress: "134.54.112.250", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 2}, {ipAddress: "4.127.232.206", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 3}, {ipAddress: "198.143.136.102", browser: "Edge", browserVersion: "91.0.864", language: "fr", flowId: 4}, {ipAddress: "101.239.206.155", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 5}, {ipAddress: "164.112.222.76", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 6}, {ipAddress: "165.114.173.207", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 7}, {ipAddress: "157.185.196.193", browser: "Safari", browserVersion: "12.1.2", language: "fr-FR", flowId: 8}, {ipAddress: "66.240.240.117", browser: "Chrome Mobile iOS", browserVersion: "91.0.4472", language: "en-us", flowId: 9}, {ipAddress: "129.238.218.247", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 10}, {ipAddress: "174.204.208.243", browser: "Firefox", browserVersion: "89.0", language: "fr", flowId: 11}, {ipAddress: "125.50.217.78", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 12}, {ipAddress: "107.182.144.35", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 13}, {ipAddress: "61.212.45.168", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 14}, {ipAddress: "208.215.29.22", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 15}, {ipAddress: "163.78.210.221", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 16}, {ipAddress: "216.31.210.169", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 17}, {ipAddress: "77.93.91.121", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 18}, {ipAddress: "207.71.236.74", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 19}, {ipAddress: "47.3.55.98", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 20}, {ipAddress: "36.212.223.28", browser: "Edge", browserVersion: "91.0.864", language: "fr", flowId: 21}, {ipAddress: "5.172.196.229", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "el-GR", flowId: 22}, {ipAddress: "35.188.43.168", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 23}, {ipAddress: "207.225.20.234", browser: "Chrome", browserVersion: "90.0.4403", language: "en-US", flowId: 24}, {ipAddress: "177.89.102.166", browser: "Chrome", browserVersion: "91.0.4472", language: "en-US", flowId: 25}, {ipAddress: "48.241.227.5", browser: "Chrome Mobile WebView", browserVersion: "91.0.4472", language: "en-US", flowId: 26}, {ipAddress: "14.45.156.10", browser: "Chrome", browserVersion: "90.0.4430", language: "fr-FR", flowId: 27}, {ipAddress: "138.101.5.165", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 28}, {ipAddress: "49.227.241.159", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 29}, {ipAddress: "104.192.160.86", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 30}, {ipAddress: "106.235.9.92", browser: "Chrome", browserVersion: "91.0.4472", language: "ru-RU", flowId: 31}, {ipAddress: "15.218.137.226", browser: "Chrome", browserVersion: "91.0.4472", language: "fr-FR", flowId: 32}, {ipAddress: "75.105.213.189", browser: "Chrome", browserVersion: "91.0.4472", language: "el-GR", flowId: 33}]
							}
							created: "user"
							isExpected: true
							significance: "high"
							video: { connect: { fileId: "jmlc9lkTaOdUVhbHFsSA" } }
							scriptCommands: {
								create: [
									{
										command: "click"
										sIndex: 0
										eventId: "2779cb79-9823-4ae9-b08a-7d0ba3caf33d"
										xCoordinate: 1191
										yCoordinate: 723
										xpath: "/html/body/div[1]/main/div/div[2]/div/section/ul/li[7]/a/div/picture/img"
										selector: ".QuickLinksstyles__BlockWrapper-vicnbr-2:nth-child(7) .Imagestyles__Img-m2o9tb-0"
										className: ".Imagestyles__Img-m2o9tb-0.jyexzd.Picturestyles__Image-j8hf1d-1.fdrHFh"
										tagName: "IMG"
										tagId: ""
										altOrAriaText: ""
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "open"
										sIndex: 1
										eventId: "97d5d7aa-be9d-4887-b16c-8bf14781842a"
										value: "https://www.lego.com/en-fi/page/static/Pick-a-Brick?icmp=HP-SHQL-EG-NO-pick-a-120"
									}
									{
										command: "set viewport size"
										sIndex: 2
										eventId: "97d5d7aa-be9d-4887-b16c-8bf14781842a"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi/page/static/Pick-a-Brick?icmp=HP-SHQL-EG-NO-pick-a-120"
									}
									{
										command: "scroll"
										sIndex: 3
										eventId: "f4637abd-7993-4234-933e-e4577a4daf29"
										documentURL: "https://www.lego.com/en-fi/page/static/Pick-a-Brick?icmp=HP-SHQL-EG-NO-pick-a-120"
										scrollTop: 1219
										scrollLeft: 0
									}
									{
										command: "click"
										sIndex: 4
										eventId: "2d329a42-a37c-4fef-adf8-8d781dcbe7b3"
										xCoordinate: 943
										yCoordinate: 2003
										xpath: "/html/body/div[1]/main/div[1]/div[3]/div[2]/div/ul/li[18]/div/div[2]/div/button"
										selector: ".ElementsListstyles__Leaf-d5a7o-1:nth-child(18) .Button__Base-sc-1jdmsyi-0"
										className: ".Button__Base-sc-1jdmsyi-0.aKFCv.transformationsstyles__Pick-vzend6-1.jxnIxP"
										tagName: "BUTTON"
										tagId: ""
										innerText: "PICK"
										documentURL: "https://www.lego.com/en-fi/page/static/Pick-a-Brick?icmp=HP-SHQL-EG-NO-pick-a-120"
									}
									{
										command: "scroll"
										sIndex: 5
										eventId: "585c9817-b618-4fae-b096-f4fa2f603c14"
										documentURL: "https://www.lego.com/en-fi/page/static/Pick-a-Brick?icmp=HP-SHQL-EG-NO-pick-a-120"
										scrollTop: 67
										scrollLeft: 0
									}
									{
										command: "click"
										sIndex: 6
										eventId: "6acc65df-f88d-4746-8fb3-b9129a39078e"
										xCoordinate: 1542
										yCoordinate: 612
										xpath: "/html/body/div[1]/main/div[1]/div[2]/div[2]/div/aside/div/div/button[2]"
										selector: ".dlqZCq"
										className: ".Button__Base-sc-1jdmsyi-0.dlqZCq.Cartstyles__PlacePiecesButton-sc-1ynni8w-16.gcROUE"
										tagName: "BUTTON"
										tagId: ""
										innerText: "PLACE PIECES IN YOUR BAG"
										documentURL: "https://www.lego.com/en-fi/page/static/Pick-a-Brick?icmp=HP-SHQL-EG-NO-pick-a-120"
									}
									{
										command: "scroll"
										sIndex: 7
										eventId: "94776745-e55c-471f-8c49-0e3b758ccef5"
										documentURL: "https://www.lego.com/en-fi/cart"
										scrollTop: 0
										scrollLeft: 0
									}
								]
							}
						}
						{
							title: "Check out exclusive deals"
							isTestCase: true
							requiresAuthentication: true
							flows: {
								create: [
									{
										flowId: 0
										ipAddress: "213.243.176.31"
										browser: "Chrome"
										browserVersion: "86.0.4240.111"
										language: "en-US"
									}
								]
							}
							created: "manual"
							isExpected: true
							significance: "medium"
							video: { connect: { fileId: "Ks3HBHy3RoGY3szsOvyS" } }
							scriptCommands: {
								create: [
									{
										command: "open"
										sIndex: 0
										eventId: "67a0409d-d396-4c85-9052-4289aaba2bf8"
										value: "https://www.lego.com/en-fi"
									}
									{
										command: "set viewport size"
										sIndex: 1
										eventId: "67a0409d-d396-4c85-9052-4289aaba2bf8"
										xCoordinate: 1848
										yCoordinate: 985
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 2
										eventId: "0eef44f0-5c68-4efd-8079-1b002a1e5cf6"
										xCoordinate: 611
										yCoordinate: 730
										xpath: "/html/body/div[1]/main/div/div[2]/div/section/ul/li[2]/a/div/picture/img"
										selector: ".QuickLinksstyles__BlockWrapper-vicnbr-2:nth-child(2) .Imagestyles__Img-m2o9tb-0"
										className: ".Imagestyles__Img-m2o9tb-0.jyexzd.Picturestyles__Image-j8hf1d-1.fdrHFh"
										tagName: "IMG"
										tagId: ""
										altOrAriaText: ""
										documentURL: "https://www.lego.com/en-fi"
									}
									{
										command: "click"
										sIndex: 3
										eventId: "42fea993-35b1-46ed-9bec-e517de94e5a4"
										xCoordinate: 312
										yCoordinate: 522
										xpath: "/html/body/div[1]/main/div/div[4]/div/section/div/aside/div/div/div[2]/div/div/div/div/ul/li[1]/label/div/div"
										selector: "#product-facet-productType-accordion-content .FacetLabelstyles__Wrapper-sc-1vk7n0o-1:nth-child(1) .Checkbox__StyledCheckbox-sc-19eplce-2"
										className: ".Checkbox__StyledCheckbox-sc-19eplce-2.gCruXf"
										tagName: "DIV"
										tagId: ""
										documentURL: "https://www.lego.com/en-fi/categories/exclusives?icmp=HP-SHQL-EG-NO-exclus-117"
									}
								]
							}
						}
					]
				}
			}
		) {
			id
			name
			avatar {
				downloadUrl
			}
			configuration {
				id
				clientSecret
			}
			userStories {
				items {
					id
					title
				}
			}
		}
	}
`;
