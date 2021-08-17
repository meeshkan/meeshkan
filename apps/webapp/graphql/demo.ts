import { gql } from 'graphql-request';

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
	mutation CREATE_DEMO_PROJECT($id: ID!) {
		projectCreate(
			data: {
        members: { connect: { id: $id }}
				name: "Lego Demo Project"
				configuration: {
					create: {
						stagingURL: "https://www.lego.com"
						productionURL: "https://www.lego.com"
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
							significance: "low"
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
							significance: "low"
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
							significance: "low"
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
							significance: "low"
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
							significance: "low"
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
							significance: "low"
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
							significance: "low"
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
			userStories {
				items {
					id
					title
				}
			}
		}
	}
`;
