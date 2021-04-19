export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** A date-time string at UTC, such as `2007-12-25T16:15:30Z`, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
	DateTime: any;
	/** A date string, such as `2007-12-25`, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
	Date: any;
	/** The `BigInt` scalar type represents whole numeric values. */
	BigInt: any;
	/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
	JSON: any;
	/** A time string at UTC, such as `16:15:30Z`, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
	Time: any;
};

/**
 * This represents a chronological item of change for a specific project. This can
 * include new manual recordings, linear ticket statuses, etc.
 */
export type Activity = {
	__typename?: 'Activity';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	title?: Maybe<Scalars['String']>;
	dateTime?: Maybe<Scalars['Date']>;
	project?: Maybe<Project>;
	_description?: Maybe<Scalars['String']>;
};

export type Activity_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	title?: Maybe<StringPredicate>;
	dateTime?: Maybe<DatePredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	project?: Maybe<Project_PermissionFilter>;
	AND?: Maybe<Array<Activity_PermissionFilter>>;
	OR?: Maybe<Array<Activity_PermissionFilter>>;
};

export type Activity_PermissionRelationFilter = {
	some?: Maybe<Activity_PermissionFilter>;
	every?: Maybe<Activity_PermissionFilter>;
	none?: Maybe<Activity_PermissionFilter>;
};

/** Project create input from activity */
export type Activity_ProjectCreateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarRelationInput>;
	release?: Maybe<ProjectReleaseRelationInput>;
	configuration: ProjectConfigurationRelationInput;
	integration?: Maybe<ProjectIntegrationRelationInput>;
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsRelationInput>;
};

/** Project update input from activity */
export type Activity_ProjectUpdateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarUpdateRelationInput>;
	release?: Maybe<ProjectReleaseUpdateRelationInput>;
	configuration?: Maybe<ProjectConfigurationUpdateRelationInput>;
	integration?: Maybe<ProjectIntegrationUpdateRelationInput>;
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

/** Activity create input */
export type ActivityCreateInput = {
	title: Scalars['String'];
	dateTime: Scalars['Date'];
	project: ActivityProjectRelationInput;
};

/** Activity create many input */
export type ActivityCreateManyInput = {
	title: Scalars['String'];
	dateTime: Scalars['Date'];
	project: ActivityProjectManyRelationInput;
};

/** Activity delete input */
export type ActivityDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** ActivityFieldsPermissions create input */
export type ActivityFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	title?: Maybe<Scalars['Boolean']>;
	dateTime?: Maybe<Scalars['Boolean']>;
};

export type ActivityFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	title?: Maybe<StringPredicate>;
	dateTime?: Maybe<DatePredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	project?: Maybe<ProjectFilter>;
	AND?: Maybe<Array<ActivityFilter>>;
	OR?: Maybe<Array<ActivityFilter>>;
};

export type ActivityGroupBy = {
	query: ActivityGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type ActivityGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	title?: Maybe<Array<GroupByField>>;
	dateTime?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	project?: Maybe<ProjectGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type ActivityKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** ActivityListResponse output */
export type ActivityListResponse = {
	__typename?: 'ActivityListResponse';
	/** List items */
	items: Array<Activity>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** ActivityManyResponse output */
export type ActivityManyResponse = {
	__typename?: 'ActivityManyResponse';
	/** List items */
	items: Array<Activity>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum ActivityOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	TitleAsc = 'title_ASC',
	TitleDesc = 'title_DESC',
	DateTimeAsc = 'dateTime_ASC',
	DateTimeDesc = 'dateTime_DESC',
}

/** Activity subscription payload */
export type ActivityPayload = {
	__typename?: 'ActivityPayload';
	mutation: MutationType;
	node?: Maybe<Activity>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Activity>;
};

/** Activity relation input */
export type ActivityProjectManyRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
};

/** Activity relation input */
export type ActivityProjectRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<Activity_ProjectCreateInput>;
};

/** Activity relation input */
export type ActivityProjectUpdateRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	disconnect?: Maybe<ProjectKeyFilter>;
	reconnect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<Activity_ProjectCreateInput>;
	update?: Maybe<Activity_ProjectUpdateInput>;
};

export type ActivityRelationFilter = {
	some?: Maybe<ActivityFilter>;
	every?: Maybe<ActivityFilter>;
	none?: Maybe<ActivityFilter>;
};

export type ActivitySort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	title?: Maybe<SortOrder>;
	dateTime?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	project?: Maybe<ProjectSort>;
};

/** Activity subscription filter */
export type ActivitySubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<ActivityFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Activity update input */
export type ActivityUpdateByFilterInput = {
	title?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	dateTime?: Maybe<Array<Maybe<UpdateByFilterDateInput>>>;
};

/** Activity update input */
export type ActivityUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	title?: Maybe<Scalars['String']>;
	dateTime?: Maybe<Scalars['Date']>;
	project?: Maybe<ActivityProjectUpdateRelationInput>;
};

export enum AggregationFunctionType {
	Avg = 'AVG',
	Sum = 'SUM',
	Count = 'COUNT',
	Min = 'MIN',
	Max = 'MAX',
	GroupConcat = 'GROUP_CONCAT',
	AnyValue = 'ANY_VALUE',
	StddevPop = 'STDDEV_POP',
	StddevSamp = 'STDDEV_SAMP',
	VarPop = 'VAR_POP',
	VarSamp = 'VAR_SAMP',
}

export type ApiToken = {
	__typename?: 'ApiToken';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	name?: Maybe<Scalars['String']>;
	roles?: Maybe<RoleListResponse>;
	_description?: Maybe<Scalars['String']>;
};

export type ApiTokenRolesArgs = {
	filter?: Maybe<RoleFilter>;
	orderBy?: Maybe<Array<Maybe<RoleOrderBy>>>;
	sort?: Maybe<Array<RoleSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RoleGroupBy>;
};

export type ApiToken_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	token?: Maybe<StringPredicate>;
	createdBy?: Maybe<User_PermissionFilter>;
	roles?: Maybe<Role_PermissionRelationFilter>;
	AND?: Maybe<Array<ApiToken_PermissionFilter>>;
	OR?: Maybe<Array<ApiToken_PermissionFilter>>;
};

export type ApiToken_PermissionRelationFilter = {
	some?: Maybe<ApiToken_PermissionFilter>;
	every?: Maybe<ApiToken_PermissionFilter>;
	none?: Maybe<ApiToken_PermissionFilter>;
};

/** ApiTokens create input */
export type ApiTokenCreateInput = {
	name: Scalars['String'];
	roles?: Maybe<ApiTokensRolesRelationInput>;
};

/** ApiTokens delete input */
export type ApiTokenDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

export type ApiTokenFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	token?: Maybe<StringPredicate>;
	createdBy?: Maybe<UserFilter>;
	roles?: Maybe<RoleRelationFilter>;
	AND?: Maybe<Array<ApiTokenFilter>>;
	OR?: Maybe<Array<ApiTokenFilter>>;
};

export type ApiTokenGroupBy = {
	query: ApiTokenGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type ApiTokenGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	name?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	roles?: Maybe<RoleGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type ApiTokenKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
};

/** ApiTokenListResponse output */
export type ApiTokenListResponse = {
	__typename?: 'ApiTokenListResponse';
	/** List items */
	items: Array<ApiToken>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** ApiTokenManyResponse output */
export type ApiTokenManyResponse = {
	__typename?: 'ApiTokenManyResponse';
	/** List items */
	items: Array<ApiToken>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum ApiTokenOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
	TokenAsc = 'token_ASC',
	TokenDesc = 'token_DESC',
}

/** ApiTokens subscription payload */
export type ApiTokenPayload = {
	__typename?: 'ApiTokenPayload';
	mutation: MutationType;
	node?: Maybe<ApiToken>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<ApiToken>;
};

export type ApiTokenRelationFilter = {
	some?: Maybe<ApiTokenFilter>;
	every?: Maybe<ApiTokenFilter>;
	none?: Maybe<ApiTokenFilter>;
};

/** API Token Response */
export type ApiTokenResponse = {
	__typename?: 'ApiTokenResponse';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	name?: Maybe<Scalars['String']>;
	roles?: Maybe<RoleListResponse>;
	token: Scalars['String'];
};

/** API Token Response */
export type ApiTokenResponseRolesArgs = {
	filter?: Maybe<RoleFilter>;
	orderBy?: Maybe<Array<Maybe<RoleOrderBy>>>;
	sort?: Maybe<Array<RoleSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RoleGroupBy>;
};

/** Roles create input from apiTokens */
export type ApiTokens_RoleCreateInput = {
	name: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	users?: Maybe<RolesUsersRelationInput>;
	permissions?: Maybe<PermissionsInput>;
	apiTokens?: Maybe<RolesApiTokensRelationInput>;
	authenticationProfiles?: Maybe<RolesAuthenticationProfilesRelationInput>;
	teamMembers?: Maybe<RolesTeamMembersRelationInput>;
};

/** Roles update input from apiTokens */
export type ApiTokens_RoleUpdateInput = {
	filter?: Maybe<RoleKeyFilter>;
	data: RoleUpdateInput;
};

export type ApiTokenSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	name?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
};

/** ApiTokens relation input */
export type ApiTokensRolesRelationInput = {
	connect?: Maybe<Array<RoleKeyFilter>>;
	create?: Maybe<Array<Maybe<ApiTokens_RoleCreateInput>>>;
};

/** ApiTokens relation input */
export type ApiTokensRolesUpdateRelationInput = {
	connect?: Maybe<Array<RoleKeyFilter>>;
	disconnect?: Maybe<Array<RoleKeyFilter>>;
	reconnect?: Maybe<Array<RoleKeyFilter>>;
	create?: Maybe<Array<Maybe<ApiTokens_RoleCreateInput>>>;
	update?: Maybe<Array<Maybe<ApiTokens_RoleUpdateInput>>>;
};

/** ApiTokens subscription filter */
export type ApiTokenSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<ApiTokenFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** ApiTokens update input */
export type ApiTokenUpdateByFilterInput = {
	name?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	token?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** ApiTokens update input */
export type ApiTokenUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	roles?: Maybe<ApiTokensRolesUpdateRelationInput>;
};

/** Application */
export type Application = {
	__typename?: 'Application';
	id: Scalars['ID'];
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	createdAt: Scalars['DateTime'];
	appType: Scalars['String'];
	status: ApplicationStatusEnum;
};

/** ApplicationDeleteMutationInput */
export type ApplicationDeleteMutationInput = {
	id: Scalars['String'];
	force?: Maybe<Scalars['Boolean']>;
};

/** Application install input */
export type ApplicationInstallInput = {
	appType: Scalars['String'];
	name: Scalars['String'];
	status?: Maybe<ApplicationStatusEnum>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
};

/** ApplicationListResponse output */
export type ApplicationListResponse = {
	__typename?: 'ApplicationListResponse';
	/** List items */
	items: Array<Application>;
	/** List items count */
	count: Scalars['Int'];
};

/** Application Status Enum */
export enum ApplicationStatusEnum {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
}

/** Application update input */
export type ApplicationUpdateInput = {
	id: Scalars['String'];
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	status?: Maybe<ApplicationStatusEnum>;
};

/** Async Session */
export type AsyncSession = {
	__typename?: 'AsyncSession';
	sessionId: Scalars['String'];
};

export type AsyncSessionStatusResponse = {
	__typename?: 'AsyncSessionStatusResponse';
	status: Scalars['String'];
	message?: Maybe<Scalars['String']>;
};

/** Auth response */
export type Auth = {
	__typename?: 'Auth';
	refreshToken?: Maybe<Scalars['String']>;
	idToken?: Maybe<Scalars['String']>;
};

export type AuthenticationProfile = {
	__typename?: 'AuthenticationProfile';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	name?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	secret?: Maybe<Scalars['String']>;
	managementDomain?: Maybe<Scalars['String']>;
	clientId?: Maybe<Scalars['String']>;
	databaseName?: Maybe<Scalars['String']>;
	domain?: Maybe<Scalars['String']>;
	selfSignUpEnabled?: Maybe<Scalars['Boolean']>;
	selfSignUpEmailDomains?: Maybe<Array<Maybe<Scalars['String']>>>;
	roles?: Maybe<RoleListResponse>;
	audiences?: Maybe<Array<Maybe<Scalars['String']>>>;
	attributes?: Maybe<AuthenticationProfileAttributes>;
	_description?: Maybe<Scalars['String']>;
};

export type AuthenticationProfileRolesArgs = {
	filter?: Maybe<RoleFilter>;
	orderBy?: Maybe<Array<Maybe<RoleOrderBy>>>;
	sort?: Maybe<Array<RoleSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RoleGroupBy>;
};

export type AuthenticationProfile_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	type?: Maybe<StringPredicate>;
	secret?: Maybe<StringPredicate>;
	managementDomain?: Maybe<StringPredicate>;
	clientId?: Maybe<StringPredicate>;
	databaseName?: Maybe<StringPredicate>;
	domain?: Maybe<StringPredicate>;
	selfSignUpEnabled?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	roles?: Maybe<Role_PermissionRelationFilter>;
	AND?: Maybe<Array<AuthenticationProfile_PermissionFilter>>;
	OR?: Maybe<Array<AuthenticationProfile_PermissionFilter>>;
};

export type AuthenticationProfile_PermissionRelationFilter = {
	some?: Maybe<AuthenticationProfile_PermissionFilter>;
	every?: Maybe<AuthenticationProfile_PermissionFilter>;
	none?: Maybe<AuthenticationProfile_PermissionFilter>;
};

/** Authentication Profile Attributes */
export type AuthenticationProfileAttributes = CognitoAuthProfileAttributes;

/** Authentication profile connection options */
export type AuthenticationProfileConnectionOptions = {
	__typename?: 'AuthenticationProfileConnectionOptions';
	google?: Maybe<GoogleOptions>;
	facebook?: Maybe<FacebookOptions>;
	github?: Maybe<GithubOptions>;
};

/** Authentication profile connection options input */
export type AuthenticationProfileConnectionsOptionsInput = {
	google?: Maybe<GoogleOptionsInput>;
	facebook?: Maybe<FacebookOptionsInput>;
	github?: Maybe<GithubOptionsInput>;
};

/** AuthenticationProfiles create input */
export type AuthenticationProfileCreateInput = {
	name: Scalars['String'];
	type?: Maybe<Scalars['String']>;
	secret?: Maybe<Scalars['String']>;
	managementDomain?: Maybe<Scalars['String']>;
	clientId?: Maybe<Scalars['String']>;
	databaseName?: Maybe<Scalars['String']>;
	domain?: Maybe<Scalars['String']>;
	selfSignUpEnabled?: Maybe<Scalars['Boolean']>;
	selfSignUpEmailDomains?: Maybe<Array<Maybe<Scalars['String']>>>;
	roles?: Maybe<AuthenticationProfilesRolesRelationInput>;
	audiences?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** AuthenticationProfiles create many input */
export type AuthenticationProfileCreateManyInput = {
	name: Scalars['String'];
	type?: Maybe<Scalars['String']>;
	secret?: Maybe<Scalars['String']>;
	managementDomain?: Maybe<Scalars['String']>;
	clientId?: Maybe<Scalars['String']>;
	databaseName?: Maybe<Scalars['String']>;
	domain?: Maybe<Scalars['String']>;
	selfSignUpEnabled?: Maybe<Scalars['Boolean']>;
	selfSignUpEmailDomains?: Maybe<Array<Maybe<Scalars['String']>>>;
	roles?: Maybe<AuthenticationProfilesRolesManyRelationInput>;
	audiences?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** AuthenticationProfiles delete input */
export type AuthenticationProfileDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

export type AuthenticationProfileFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	type?: Maybe<StringPredicate>;
	secret?: Maybe<StringPredicate>;
	managementDomain?: Maybe<StringPredicate>;
	clientId?: Maybe<StringPredicate>;
	databaseName?: Maybe<StringPredicate>;
	domain?: Maybe<StringPredicate>;
	selfSignUpEnabled?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	roles?: Maybe<RoleRelationFilter>;
	AND?: Maybe<Array<AuthenticationProfileFilter>>;
	OR?: Maybe<Array<AuthenticationProfileFilter>>;
};

export type AuthenticationProfileGroupBy = {
	query: AuthenticationProfileGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type AuthenticationProfileGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	name?: Maybe<Array<GroupByField>>;
	type?: Maybe<Array<GroupByField>>;
	secret?: Maybe<Array<GroupByField>>;
	managementDomain?: Maybe<Array<GroupByField>>;
	clientId?: Maybe<Array<GroupByField>>;
	databaseName?: Maybe<Array<GroupByField>>;
	domain?: Maybe<Array<GroupByField>>;
	selfSignUpEnabled?: Maybe<Array<GroupByField>>;
	selfSignUpEmailDomains?: Maybe<Array<GroupByField>>;
	audiences?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	roles?: Maybe<RoleGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type AuthenticationProfileKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
};

/** AuthenticationProfileListResponse output */
export type AuthenticationProfileListResponse = {
	__typename?: 'AuthenticationProfileListResponse';
	/** List items */
	items: Array<AuthenticationProfile>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** AuthenticationProfileManyResponse output */
export type AuthenticationProfileManyResponse = {
	__typename?: 'AuthenticationProfileManyResponse';
	/** List items */
	items: Array<AuthenticationProfile>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum AuthenticationProfileOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
	TypeAsc = 'type_ASC',
	TypeDesc = 'type_DESC',
	SecretAsc = 'secret_ASC',
	SecretDesc = 'secret_DESC',
	ManagementDomainAsc = 'managementDomain_ASC',
	ManagementDomainDesc = 'managementDomain_DESC',
	ClientIdAsc = 'clientId_ASC',
	ClientIdDesc = 'clientId_DESC',
	DatabaseNameAsc = 'databaseName_ASC',
	DatabaseNameDesc = 'databaseName_DESC',
	DomainAsc = 'domain_ASC',
	DomainDesc = 'domain_DESC',
	SelfSignUpEnabledAsc = 'selfSignUpEnabled_ASC',
	SelfSignUpEnabledDesc = 'selfSignUpEnabled_DESC',
}

/** AuthenticationProfiles subscription payload */
export type AuthenticationProfilePayload = {
	__typename?: 'AuthenticationProfilePayload';
	mutation: MutationType;
	node?: Maybe<AuthenticationProfile>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<AuthenticationProfile>;
};

export type AuthenticationProfileRelationFilter = {
	some?: Maybe<AuthenticationProfileFilter>;
	every?: Maybe<AuthenticationProfileFilter>;
	none?: Maybe<AuthenticationProfileFilter>;
};

/** Roles create input from authenticationProfiles */
export type AuthenticationProfiles_RoleCreateInput = {
	name: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	users?: Maybe<RolesUsersRelationInput>;
	permissions?: Maybe<PermissionsInput>;
	apiTokens?: Maybe<RolesApiTokensRelationInput>;
	authenticationProfiles?: Maybe<RolesAuthenticationProfilesRelationInput>;
	teamMembers?: Maybe<RolesTeamMembersRelationInput>;
};

/** Roles update input from authenticationProfiles */
export type AuthenticationProfiles_RoleUpdateInput = {
	filter?: Maybe<RoleKeyFilter>;
	data: RoleUpdateInput;
};

export type AuthenticationProfileSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	name?: Maybe<SortOrder>;
	type?: Maybe<SortOrder>;
	secret?: Maybe<SortOrder>;
	managementDomain?: Maybe<SortOrder>;
	clientId?: Maybe<SortOrder>;
	databaseName?: Maybe<SortOrder>;
	domain?: Maybe<SortOrder>;
	selfSignUpEnabled?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
};

/** AuthenticationProfiles relation input */
export type AuthenticationProfilesRolesManyRelationInput = {
	connect?: Maybe<Array<RoleKeyFilter>>;
};

/** AuthenticationProfiles relation input */
export type AuthenticationProfilesRolesRelationInput = {
	connect?: Maybe<Array<RoleKeyFilter>>;
	create?: Maybe<Array<Maybe<AuthenticationProfiles_RoleCreateInput>>>;
};

/** AuthenticationProfiles relation input */
export type AuthenticationProfilesRolesUpdateRelationInput = {
	connect?: Maybe<Array<RoleKeyFilter>>;
	disconnect?: Maybe<Array<RoleKeyFilter>>;
	reconnect?: Maybe<Array<RoleKeyFilter>>;
	create?: Maybe<Array<Maybe<AuthenticationProfiles_RoleCreateInput>>>;
	update?: Maybe<Array<Maybe<AuthenticationProfiles_RoleUpdateInput>>>;
};

/** AuthenticationProfiles subscription filter */
export type AuthenticationProfileSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<AuthenticationProfileFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** AuthenticationProfiles update input */
export type AuthenticationProfileUpdateByFilterInput = {
	name?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	type?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	secret?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	managementDomain?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	clientId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	databaseName?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	domain?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	selfSignUpEnabled?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	selfSignUpEmailDomains?: Maybe<Array<Maybe<UpdateByFilterListStringInput>>>;
	audiences?: Maybe<Array<Maybe<UpdateByFilterListStringInput>>>;
};

/** AuthenticationProfiles update input */
export type AuthenticationProfileUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	secret?: Maybe<Scalars['String']>;
	managementDomain?: Maybe<Scalars['String']>;
	clientId?: Maybe<Scalars['String']>;
	databaseName?: Maybe<Scalars['String']>;
	domain?: Maybe<Scalars['String']>;
	selfSignUpEnabled?: Maybe<Scalars['Boolean']>;
	selfSignUpEmailDomains?: Maybe<Array<Maybe<Scalars['String']>>>;
	roles?: Maybe<AuthenticationProfilesRolesUpdateRelationInput>;
	audiences?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AuthenticationSetting = {
	__typename?: 'AuthenticationSetting';
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	createdBy?: Maybe<User>;
	allowedCallbacks?: Maybe<Array<Maybe<Scalars['String']>>>;
	allowedWebOrigins?: Maybe<Array<Maybe<Scalars['String']>>>;
	allowedLogouts?: Maybe<Array<Maybe<Scalars['String']>>>;
	connections?: Maybe<AuthenticationProfileConnectionOptions>;
	_description?: Maybe<Scalars['String']>;
};

export type AuthenticationSettingFilter = {
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	AND?: Maybe<Array<AuthenticationSettingFilter>>;
	OR?: Maybe<Array<AuthenticationSettingFilter>>;
};

/** AuthenticationSettings subscription payload */
export type AuthenticationSettingPayload = {
	__typename?: 'AuthenticationSettingPayload';
	mutation: MutationType;
	node?: Maybe<AuthenticationSetting>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<AuthenticationSetting>;
};

/** AuthenticationSettings subscription filter */
export type AuthenticationSettingSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<AuthenticationSettingFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** AuthenticationSettings update input */
export type AuthenticationSettingUpdateInput = {
	allowedCallbacks?: Maybe<Array<Maybe<Scalars['String']>>>;
	allowedWebOrigins?: Maybe<Array<Maybe<Scalars['String']>>>;
	allowedLogouts?: Maybe<Array<Maybe<Scalars['String']>>>;
	connections?: Maybe<AuthenticationProfileConnectionsOptionsInput>;
};

/**
 * This represents a unique token used for authenticating a fake user in an app. It
 * stores a key:value pair and an enum type indicating what type of token it is.
 */
export type AuthenticationToken = {
	__typename?: 'AuthenticationToken';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	/** What type of authentication token is this storing? */
	type?: Maybe<Scalars['String']>;
	key?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
	configuration?: Maybe<Configuration>;
	_description?: Maybe<Scalars['String']>;
};

export type AuthenticationToken_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	type?: Maybe<StringPredicate>;
	key?: Maybe<StringPredicate>;
	value?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	configuration?: Maybe<Configuration_PermissionFilter>;
	AND?: Maybe<Array<AuthenticationToken_PermissionFilter>>;
	OR?: Maybe<Array<AuthenticationToken_PermissionFilter>>;
};

export type AuthenticationToken_PermissionRelationFilter = {
	some?: Maybe<AuthenticationToken_PermissionFilter>;
	every?: Maybe<AuthenticationToken_PermissionFilter>;
	none?: Maybe<AuthenticationToken_PermissionFilter>;
};

/** AuthenticationToken relation input */
export type AuthenticationTokenConfigurationManyRelationInput = {
	connect?: Maybe<ConfigurationKeyFilter>;
};

/** AuthenticationToken relation input */
export type AuthenticationTokenConfigurationRelationInput = {
	connect?: Maybe<ConfigurationKeyFilter>;
	create?: Maybe<AuthenticationTokens_ConfigurationCreateInput>;
};

/** AuthenticationToken relation input */
export type AuthenticationTokenConfigurationUpdateRelationInput = {
	connect?: Maybe<ConfigurationKeyFilter>;
	disconnect?: Maybe<ConfigurationKeyFilter>;
	reconnect?: Maybe<ConfigurationKeyFilter>;
	create?: Maybe<AuthenticationTokens_ConfigurationCreateInput>;
	update?: Maybe<AuthenticationTokens_ConfigurationUpdateInput>;
};

/** AuthenticationToken create input */
export type AuthenticationTokenCreateInput = {
	/** What type of authentication token is this storing? */
	type?: Maybe<Scalars['String']>;
	key: Scalars['String'];
	value?: Maybe<Scalars['String']>;
	configuration?: Maybe<AuthenticationTokenConfigurationRelationInput>;
};

/** AuthenticationToken create many input */
export type AuthenticationTokenCreateManyInput = {
	/** What type of authentication token is this storing? */
	type?: Maybe<Scalars['String']>;
	key: Scalars['String'];
	value?: Maybe<Scalars['String']>;
	configuration?: Maybe<AuthenticationTokenConfigurationManyRelationInput>;
};

/** AuthenticationToken delete input */
export type AuthenticationTokenDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** AuthenticationTokenFieldsPermissions create input */
export type AuthenticationTokenFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	type?: Maybe<Scalars['Boolean']>;
	key?: Maybe<Scalars['Boolean']>;
	value?: Maybe<Scalars['Boolean']>;
};

export type AuthenticationTokenFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	type?: Maybe<StringPredicate>;
	key?: Maybe<StringPredicate>;
	value?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	configuration?: Maybe<ConfigurationFilter>;
	AND?: Maybe<Array<AuthenticationTokenFilter>>;
	OR?: Maybe<Array<AuthenticationTokenFilter>>;
};

export type AuthenticationTokenGroupBy = {
	query: AuthenticationTokenGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type AuthenticationTokenGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	type?: Maybe<Array<GroupByField>>;
	key?: Maybe<Array<GroupByField>>;
	value?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	configuration?: Maybe<ConfigurationGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type AuthenticationTokenKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** AuthenticationTokenListResponse output */
export type AuthenticationTokenListResponse = {
	__typename?: 'AuthenticationTokenListResponse';
	/** List items */
	items: Array<AuthenticationToken>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** AuthenticationTokenManyResponse output */
export type AuthenticationTokenManyResponse = {
	__typename?: 'AuthenticationTokenManyResponse';
	/** List items */
	items: Array<AuthenticationToken>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum AuthenticationTokenOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	TypeAsc = 'type_ASC',
	TypeDesc = 'type_DESC',
	KeyAsc = 'key_ASC',
	KeyDesc = 'key_DESC',
	ValueAsc = 'value_ASC',
	ValueDesc = 'value_DESC',
}

/** AuthenticationToken subscription payload */
export type AuthenticationTokenPayload = {
	__typename?: 'AuthenticationTokenPayload';
	mutation: MutationType;
	node?: Maybe<AuthenticationToken>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<AuthenticationToken>;
};

export type AuthenticationTokenRelationFilter = {
	some?: Maybe<AuthenticationTokenFilter>;
	every?: Maybe<AuthenticationTokenFilter>;
	none?: Maybe<AuthenticationTokenFilter>;
};

/** Configuration create input from authenticationTokens */
export type AuthenticationTokens_ConfigurationCreateInput = {
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink: Scalars['String'];
	project?: Maybe<ConfigurationProjectRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensRelationInput>;
	logInFlow?: Maybe<ConfigurationLogInFlowRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
};

/** Configuration update input from authenticationTokens */
export type AuthenticationTokens_ConfigurationUpdateInput = {
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<ConfigurationProjectUpdateRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensUpdateRelationInput>;
	logInFlow?: Maybe<ConfigurationLogInFlowUpdateRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
};

export type AuthenticationTokenSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	type?: Maybe<SortOrder>;
	key?: Maybe<SortOrder>;
	value?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	configuration?: Maybe<ConfigurationSort>;
};

/** AuthenticationToken subscription filter */
export type AuthenticationTokenSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<AuthenticationTokenFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** AuthenticationToken update input */
export type AuthenticationTokenUpdateByFilterInput = {
	type?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	key?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	value?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** AuthenticationToken update input */
export type AuthenticationTokenUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/** What type of authentication token is this storing? */
	type?: Maybe<Scalars['String']>;
	key?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
	configuration?: Maybe<AuthenticationTokenConfigurationUpdateRelationInput>;
};

/** Project create input from avatar */
export type Avatar_ProjectCreateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarRelationInput>;
	release?: Maybe<ProjectReleaseRelationInput>;
	configuration: ProjectConfigurationRelationInput;
	integration?: Maybe<ProjectIntegrationRelationInput>;
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsRelationInput>;
};

/** Project update input from avatar */
export type Avatar_ProjectUpdateInput = {
	filter?: Maybe<ProjectKeyFilter>;
	data: ProjectUpdateInput;
};

/** TeamMembers update input from avatar */
export type Avatar_TeamMemberUpdateInput = {
	filter?: Maybe<TeamMemberKeyFilter>;
	data: TeamMemberUpdateInput;
};

/** Users create input from avatar */
export type Avatar_UserCreateInput = {
	email: Scalars['String'];
	status?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	avatar?: Maybe<UsersAvatarRelationInput>;
	roles?: Maybe<UsersRolesRelationInput>;
	projects?: Maybe<UsersProjectsRelationInput>;
	jobTitle?: Maybe<Scalars['String']>;
	/** User setting to allow product updates to be sent to their email. */
	productNotifications?: Maybe<Scalars['Boolean']>;
};

/** Users update input from avatar */
export type Avatar_UserUpdateInput = {
	filter?: Maybe<UserKeyFilter>;
	data: UserUpdateInput;
};

export type BigIntPredicateHaving = {
	equals?: Maybe<Scalars['BigInt']>;
	not_equals?: Maybe<Scalars['BigInt']>;
	in?: Maybe<Array<Scalars['BigInt']>>;
	not_in?: Maybe<Array<Scalars['BigInt']>>;
	lt?: Maybe<Scalars['BigInt']>;
	lte?: Maybe<Scalars['BigInt']>;
	gt?: Maybe<Scalars['BigInt']>;
	gte?: Maybe<Scalars['BigInt']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	AND?: Maybe<Array<BigIntPredicateHaving>>;
	OR?: Maybe<Array<BigIntPredicateHaving>>;
};

export type BillingCurrentPlanResponse = {
	__typename?: 'BillingCurrentPlanResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	displayName?: Maybe<Scalars['String']>;
	trialEnd?: Maybe<Scalars['DateTime']>;
	status?: Maybe<WorkspaceStatus>;
	nextPlan?: Maybe<BillingNextPlanResponse>;
};

export type BillingDetailsResponse = {
	__typename?: 'BillingDetailsResponse';
	last4?: Maybe<Scalars['String']>;
	expMonth?: Maybe<Scalars['Int']>;
	expYear?: Maybe<Scalars['Int']>;
	brand?: Maybe<Scalars['String']>;
};

/** BillingDetailsUpdateMutationInput */
export type BillingDetailsUpdateMutationInput = {
	cardToken: Scalars['String'];
};

export type BillingInvoiceItem = {
	__typename?: 'BillingInvoiceItem';
	id: Scalars['ID'];
	periodStart?: Maybe<Scalars['DateTime']>;
	periodEnd?: Maybe<Scalars['DateTime']>;
	paid?: Maybe<Scalars['Boolean']>;
	invoicePdf?: Maybe<Scalars['String']>;
	amountDue?: Maybe<Scalars['Float']>;
	amountPaid?: Maybe<Scalars['Float']>;
	amountRemaining?: Maybe<Scalars['Float']>;
	endingBalance?: Maybe<Scalars['Float']>;
	number?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	total?: Maybe<Scalars['Float']>;
	description?: Maybe<Scalars['String']>;
};

export enum BillingInvoicesListFilterType {
	Workspace = 'WORKSPACE',
	Customer = 'CUSTOMER',
}

/** BillingInvoicesListResponse output */
export type BillingInvoicesListResponse = {
	__typename?: 'BillingInvoicesListResponse';
	/** List items */
	items: Array<BillingInvoiceItem>;
	/** List items count */
	count: Scalars['Int'];
};

export type BillingLimitMetricItem = {
	__typename?: 'BillingLimitMetricItem';
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	showPriority?: Maybe<Scalars['Int']>;
	unit?: Maybe<Scalars['String']>;
};

export type BillingMetricUsageItem = {
	__typename?: 'BillingMetricUsageItem';
	limitMetric?: Maybe<BillingLimitMetricItem>;
	value?: Maybe<Scalars['Float']>;
};

export type BillingMetricUsageQuotaItem = {
	__typename?: 'BillingMetricUsageQuotaItem';
	limitMetric?: Maybe<BillingLimitMetricItem>;
	value?: Maybe<Scalars['Float']>;
};

/** BillingMetricUsageQuotasListResponse output */
export type BillingMetricUsageQuotasListResponse = {
	__typename?: 'BillingMetricUsageQuotasListResponse';
	/** List items */
	items: Array<BillingMetricUsageQuotaItem>;
	/** List items count */
	count: Scalars['Int'];
};

export type BillingMetricUsagesListFilter = {
	entryDate: DateTimePredicate;
};

/** BillingMetricUsagesListResponse output */
export type BillingMetricUsagesListResponse = {
	__typename?: 'BillingMetricUsagesListResponse';
	/** List items */
	items: Array<BillingMetricUsageItem>;
	/** List items count */
	count: Scalars['Int'];
};

export type BillingNextPlanResponse = {
	__typename?: 'BillingNextPlanResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	displayName?: Maybe<Scalars['String']>;
};

export type BillingPlanBaseInfo = {
	__typename?: 'BillingPlanBaseInfo';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	isCustom?: Maybe<Scalars['Boolean']>;
	isLegacy?: Maybe<Scalars['Boolean']>;
	limitMetrics?: Maybe<Array<Maybe<BillingPlanLimitMetricItem>>>;
};

export type BillingPlanLimitMetricItem = {
	__typename?: 'BillingPlanLimitMetricItem';
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	overagePrice?: Maybe<Scalars['Int']>;
	softLimit?: Maybe<Scalars['Float']>;
	hardLimit?: Maybe<Scalars['Float']>;
};

/** BillingPlanUpdateMutationInput */
export type BillingPlanUpdateMutationInput = {
	planId: Scalars['ID'];
};

export type BoolPredicate = {
	equals?: Maybe<Scalars['Boolean']>;
	not_equals?: Maybe<Scalars['Boolean']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
};

export type BoolPredicateHaving = {
	equals?: Maybe<Scalars['Boolean']>;
	not_equals?: Maybe<Scalars['Boolean']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	AND?: Maybe<Array<BoolPredicateHaving>>;
	OR?: Maybe<Array<BoolPredicateHaving>>;
};

/** ChangePasswordInput */
export type ChangePasswordInput = {
	refreshToken: Scalars['String'];
	email: Scalars['String'];
	oldPassword: Scalars['String'];
	newPassword: Scalars['String'];
	authProfileId: Scalars['ID'];
};

export type CiCdMigration = {
	__typename?: 'CiCdMigration';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	name?: Maybe<Scalars['String']>;
	code?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

export type CiCdMigration_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	code?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	AND?: Maybe<Array<CiCdMigration_PermissionFilter>>;
	OR?: Maybe<Array<CiCdMigration_PermissionFilter>>;
};

/** CiCdMigrations create input */
export type CiCdMigrationCreateInput = {
	name: Scalars['String'];
	code: Scalars['String'];
};

/** CiCdMigrations create many input */
export type CiCdMigrationCreateManyInput = {
	name: Scalars['String'];
	code: Scalars['String'];
};

/** CiCdMigrations delete input */
export type CiCdMigrationDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** CiCdMigrationFieldsPermissions create input */
export type CiCdMigrationFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['Boolean']>;
	code?: Maybe<Scalars['Boolean']>;
};

export type CiCdMigrationFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	code?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	AND?: Maybe<Array<CiCdMigrationFilter>>;
	OR?: Maybe<Array<CiCdMigrationFilter>>;
};

export type CiCdMigrationGroupBy = {
	query: CiCdMigrationGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type CiCdMigrationGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	name?: Maybe<Array<GroupByField>>;
	code?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type CiCdMigrationKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
};

/** CiCdMigrationListResponse output */
export type CiCdMigrationListResponse = {
	__typename?: 'CiCdMigrationListResponse';
	/** List items */
	items: Array<CiCdMigration>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** CiCdMigrationManyResponse output */
export type CiCdMigrationManyResponse = {
	__typename?: 'CiCdMigrationManyResponse';
	/** List items */
	items: Array<CiCdMigration>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum CiCdMigrationOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
	CodeAsc = 'code_ASC',
	CodeDesc = 'code_DESC',
}

/** CiCdMigrations subscription payload */
export type CiCdMigrationPayload = {
	__typename?: 'CiCdMigrationPayload';
	mutation: MutationType;
	node?: Maybe<CiCdMigration>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<CiCdMigration>;
};

export type CiCdMigrationSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	name?: Maybe<SortOrder>;
	code?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
};

/** CiCdMigrations subscription filter */
export type CiCdMigrationSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<CiCdMigrationFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** CiCdMigrations update input */
export type CiCdMigrationUpdateByFilterInput = {
	name?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	code?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** CiCdMigrations update input */
export type CiCdMigrationUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	code?: Maybe<Scalars['String']>;
};

/** SeleniumCommand create input from click */
export type Click_SeleniumCommandCreateInput = {
	open?: Maybe<SeleniumCommandOpenRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeRelationInput>;
	click?: Maybe<SeleniumCommandClickRelationInput>;
	type?: Maybe<SeleniumCommandTypeRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropRelationInput>;
	sIndex: Scalars['Int'];
	group?: Maybe<SeleniumCommandGroupRelationInput>;
};

/** SeleniumCommand update input from click */
export type Click_SeleniumCommandUpdateInput = {
	open?: Maybe<SeleniumCommandOpenUpdateRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeUpdateRelationInput>;
	click?: Maybe<SeleniumCommandClickUpdateRelationInput>;
	type?: Maybe<SeleniumCommandTypeUpdateRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropUpdateRelationInput>;
	sIndex?: Maybe<Scalars['Int']>;
	group?: Maybe<SeleniumCommandGroupUpdateRelationInput>;
};

/** SeleniumTarget create input from click */
export type Click_SeleniumTargetCreateInput = {
	click?: Maybe<SeleniumTargetClickRelationInput>;
	type?: Maybe<SeleniumTargetTypeRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationRelationInput>;
	selector: SeleniumTargetSelectorRelationInput;
	coordinates?: Maybe<SeleniumTargetCoordinatesRelationInput>;
};

/** SeleniumTarget update input from click */
export type Click_SeleniumTargetUpdateInput = {
	click?: Maybe<SeleniumTargetClickUpdateRelationInput>;
	type?: Maybe<SeleniumTargetTypeUpdateRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceUpdateRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationUpdateRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorUpdateRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesUpdateRelationInput>;
};

/** Authentication Profile Attributes for Cognito */
export type CognitoAuthProfileAttributes = {
	__typename?: 'CognitoAuthProfileAttributes';
	clientAuthDomain?: Maybe<Scalars['String']>;
};

/** SeleniumClick create input from command */
export type Command_SeleniumClickCreateInput = {
	target: SeleniumClickTargetRelationInput;
	command?: Maybe<SeleniumClickCommandRelationInput>;
};

/** SeleniumClick update input from command */
export type Command_SeleniumClickUpdateInput = {
	target?: Maybe<SeleniumClickTargetUpdateRelationInput>;
	command?: Maybe<SeleniumClickCommandUpdateRelationInput>;
};

/** SeleniumDragndrop create input from command */
export type Command_SeleniumDragndropCreateInput = {
	sourceTarget: SeleniumDragndropSourceTargetRelationInput;
	destinationTarget: SeleniumDragndropDestinationTargetRelationInput;
	command?: Maybe<SeleniumDragndropCommandRelationInput>;
};

/** SeleniumDragndrop update input from command */
export type Command_SeleniumDragndropUpdateInput = {
	sourceTarget?: Maybe<SeleniumDragndropSourceTargetUpdateRelationInput>;
	destinationTarget?: Maybe<SeleniumDragndropDestinationTargetUpdateRelationInput>;
	command?: Maybe<SeleniumDragndropCommandUpdateRelationInput>;
};

/** SeleniumOpen create input from command */
export type Command_SeleniumOpenCreateInput = {
	value: Scalars['String'];
	command?: Maybe<SeleniumOpenCommandRelationInput>;
};

/** SeleniumOpen update input from command */
export type Command_SeleniumOpenUpdateInput = {
	value?: Maybe<Scalars['String']>;
	command?: Maybe<SeleniumOpenCommandUpdateRelationInput>;
};

/** SeleniumType create input from command */
export type Command_SeleniumTypeCreateInput = {
	target: SeleniumTypeTargetRelationInput;
	command?: Maybe<SeleniumTypeCommandRelationInput>;
	value: Scalars['String'];
};

/** SeleniumType update input from command */
export type Command_SeleniumTypeUpdateInput = {
	target?: Maybe<SeleniumTypeTargetUpdateRelationInput>;
	command?: Maybe<SeleniumTypeCommandUpdateRelationInput>;
	value?: Maybe<Scalars['String']>;
};

/** SeleniumGroup create input from commands */
export type Commands_SeleniumGroupCreateInput = {
	script?: Maybe<SeleniumGroupScriptRelationInput>;
	commands?: Maybe<SeleniumGroupCommandsRelationInput>;
	gIndex: Scalars['Int'];
	name?: Maybe<Scalars['String']>;
};

/** SeleniumGroup update input from commands */
export type Commands_SeleniumGroupUpdateInput = {
	script?: Maybe<SeleniumGroupScriptUpdateRelationInput>;
	commands?: Maybe<SeleniumGroupCommandsUpdateRelationInput>;
	gIndex?: Maybe<Scalars['Int']>;
	name?: Maybe<Scalars['String']>;
};

/** Computed field mode */
export enum ComputedFieldMode {
	Virtual = 'VIRTUAL',
	Stored = 'STORED',
}

/** Settings and configuration for an individual project. */
export type Configuration = {
	__typename?: 'Configuration';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<Project>;
	authenticationTokens?: Maybe<AuthenticationTokenListResponse>;
	/**
	 * This is the connection between a single user story and configuration that
	 * represents the 'logInFlow'. Only one can be connected. `logInFlow` is for the
	 * user story showing a user in the action of logging in.
	 */
	logInFlow?: Maybe<UserStory>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

/** Settings and configuration for an individual project. */
export type ConfigurationAuthenticationTokensArgs = {
	filter?: Maybe<AuthenticationTokenFilter>;
	orderBy?: Maybe<Array<Maybe<AuthenticationTokenOrderBy>>>;
	sort?: Maybe<Array<AuthenticationTokenSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<AuthenticationTokenGroupBy>;
};

/** AuthenticationToken create input from configuration */
export type Configuration_AuthenticationTokenCreateInput = {
	/** What type of authentication token is this storing? */
	type?: Maybe<Scalars['String']>;
	key: Scalars['String'];
	value?: Maybe<Scalars['String']>;
	configuration?: Maybe<AuthenticationTokenConfigurationRelationInput>;
};

/** AuthenticationToken update input from configuration */
export type Configuration_AuthenticationTokenUpdateInput = {
	filter?: Maybe<AuthenticationTokenKeyFilter>;
	data: AuthenticationTokenUpdateInput;
};

export type Configuration_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	productionURL?: Maybe<StringPredicate>;
	stagingURL?: Maybe<StringPredicate>;
	stripeCustomerID?: Maybe<StringPredicate>;
	inviteLink?: Maybe<StringPredicate>;
	activeTestRuns?: Maybe<BoolPredicate>;
	plan?: Maybe<StringPredicate>;
	subscriptionStartedDate?: Maybe<DatePredicate>;
	subscriptionStatus?: Maybe<StringPredicate>;
	billingInterval?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	project?: Maybe<Project_PermissionFilter>;
	authenticationTokens?: Maybe<AuthenticationToken_PermissionRelationFilter>;
	logInFlow?: Maybe<UserStory_PermissionFilter>;
	AND?: Maybe<Array<Configuration_PermissionFilter>>;
	OR?: Maybe<Array<Configuration_PermissionFilter>>;
};

/** Project create input from configuration */
export type Configuration_ProjectCreateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarRelationInput>;
	release?: Maybe<ProjectReleaseRelationInput>;
	configuration?: Maybe<ProjectConfigurationRelationInput>;
	integration?: Maybe<ProjectIntegrationRelationInput>;
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsRelationInput>;
};

/** Project update input from configuration */
export type Configuration_ProjectUpdateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarUpdateRelationInput>;
	release?: Maybe<ProjectReleaseUpdateRelationInput>;
	configuration?: Maybe<ProjectConfigurationUpdateRelationInput>;
	integration?: Maybe<ProjectIntegrationUpdateRelationInput>;
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

/** UserStory create input from configuration */
export type Configuration_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Scalars['String']>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationRelationInput>;
};

/** UserStory update input from configuration */
export type Configuration_UserStoryUpdateInput = {
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingUpdateRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeUpdateRelationInput>;
	project?: Maybe<UserStoryProjectUpdateRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationUpdateRelationInput>;
};

/** Configuration relation input */
export type ConfigurationAuthenticationTokensManyRelationInput = {
	connect?: Maybe<Array<AuthenticationTokenKeyFilter>>;
};

/** Configuration relation input */
export type ConfigurationAuthenticationTokensRelationInput = {
	connect?: Maybe<Array<AuthenticationTokenKeyFilter>>;
	create?: Maybe<Array<Maybe<Configuration_AuthenticationTokenCreateInput>>>;
};

/** Configuration relation input */
export type ConfigurationAuthenticationTokensUpdateRelationInput = {
	connect?: Maybe<Array<AuthenticationTokenKeyFilter>>;
	disconnect?: Maybe<Array<AuthenticationTokenKeyFilter>>;
	reconnect?: Maybe<Array<AuthenticationTokenKeyFilter>>;
	create?: Maybe<Array<Maybe<Configuration_AuthenticationTokenCreateInput>>>;
	update?: Maybe<Array<Maybe<Configuration_AuthenticationTokenUpdateInput>>>;
};

/** Configuration create input */
export type ConfigurationCreateInput = {
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink: Scalars['String'];
	project?: Maybe<ConfigurationProjectRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensRelationInput>;
	logInFlow?: Maybe<ConfigurationLogInFlowRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
};

/** Configuration create many input */
export type ConfigurationCreateManyInput = {
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink: Scalars['String'];
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensManyRelationInput>;
	logInFlow?: Maybe<ConfigurationLogInFlowManyRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
};

/** Configuration delete input */
export type ConfigurationDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** ConfigurationFieldsPermissions create input */
export type ConfigurationFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	productionURL?: Maybe<Scalars['Boolean']>;
	stagingURL?: Maybe<Scalars['Boolean']>;
	stripeCustomerID?: Maybe<Scalars['Boolean']>;
	inviteLink?: Maybe<Scalars['Boolean']>;
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	plan?: Maybe<Scalars['Boolean']>;
	subscriptionStartedDate?: Maybe<Scalars['Boolean']>;
	subscriptionStatus?: Maybe<Scalars['Boolean']>;
	billingInterval?: Maybe<Scalars['Boolean']>;
};

export type ConfigurationFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	productionURL?: Maybe<StringPredicate>;
	stagingURL?: Maybe<StringPredicate>;
	stripeCustomerID?: Maybe<StringPredicate>;
	inviteLink?: Maybe<StringPredicate>;
	activeTestRuns?: Maybe<BoolPredicate>;
	plan?: Maybe<StringPredicate>;
	subscriptionStartedDate?: Maybe<DatePredicate>;
	subscriptionStatus?: Maybe<StringPredicate>;
	billingInterval?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	project?: Maybe<ProjectFilter>;
	authenticationTokens?: Maybe<AuthenticationTokenRelationFilter>;
	logInFlow?: Maybe<UserStoryFilter>;
	AND?: Maybe<Array<ConfigurationFilter>>;
	OR?: Maybe<Array<ConfigurationFilter>>;
};

export type ConfigurationGroupBy = {
	query: ConfigurationGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type ConfigurationGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	productionURL?: Maybe<Array<GroupByField>>;
	stagingURL?: Maybe<Array<GroupByField>>;
	stripeCustomerID?: Maybe<Array<GroupByField>>;
	inviteLink?: Maybe<Array<GroupByField>>;
	activeTestRuns?: Maybe<Array<GroupByField>>;
	plan?: Maybe<Array<GroupByField>>;
	subscriptionStartedDate?: Maybe<Array<GroupByField>>;
	subscriptionStatus?: Maybe<Array<GroupByField>>;
	billingInterval?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	project?: Maybe<ProjectGroupByQuery>;
	authenticationTokens?: Maybe<AuthenticationTokenGroupByQuery>;
	logInFlow?: Maybe<UserStoryGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type ConfigurationKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	inviteLink?: Maybe<Scalars['String']>;
};

/** ConfigurationListResponse output */
export type ConfigurationListResponse = {
	__typename?: 'ConfigurationListResponse';
	/** List items */
	items: Array<Configuration>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** Configuration relation input */
export type ConfigurationLogInFlowManyRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
};

/** Configuration relation input */
export type ConfigurationLogInFlowRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<Configuration_UserStoryCreateInput>;
};

/** Configuration relation input */
export type ConfigurationLogInFlowUpdateRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	disconnect?: Maybe<UserStoryKeyFilter>;
	reconnect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<Configuration_UserStoryCreateInput>;
	update?: Maybe<Configuration_UserStoryUpdateInput>;
};

/** ConfigurationManyResponse output */
export type ConfigurationManyResponse = {
	__typename?: 'ConfigurationManyResponse';
	/** List items */
	items: Array<Configuration>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum ConfigurationOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	ProductionUrlAsc = 'productionURL_ASC',
	ProductionUrlDesc = 'productionURL_DESC',
	StagingUrlAsc = 'stagingURL_ASC',
	StagingUrlDesc = 'stagingURL_DESC',
	StripeCustomerIdAsc = 'stripeCustomerID_ASC',
	StripeCustomerIdDesc = 'stripeCustomerID_DESC',
	InviteLinkAsc = 'inviteLink_ASC',
	InviteLinkDesc = 'inviteLink_DESC',
	ActiveTestRunsAsc = 'activeTestRuns_ASC',
	ActiveTestRunsDesc = 'activeTestRuns_DESC',
	PlanAsc = 'plan_ASC',
	PlanDesc = 'plan_DESC',
	SubscriptionStartedDateAsc = 'subscriptionStartedDate_ASC',
	SubscriptionStartedDateDesc = 'subscriptionStartedDate_DESC',
	SubscriptionStatusAsc = 'subscriptionStatus_ASC',
	SubscriptionStatusDesc = 'subscriptionStatus_DESC',
	BillingIntervalAsc = 'billingInterval_ASC',
	BillingIntervalDesc = 'billingInterval_DESC',
}

/** Configuration subscription payload */
export type ConfigurationPayload = {
	__typename?: 'ConfigurationPayload';
	mutation: MutationType;
	node?: Maybe<Configuration>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Configuration>;
};

/** Configuration relation input */
export type ConfigurationProjectRelationInput = {
	create?: Maybe<Configuration_ProjectCreateInput>;
};

/** Configuration relation input */
export type ConfigurationProjectUpdateRelationInput = {
	update?: Maybe<Configuration_ProjectUpdateInput>;
};

export type ConfigurationSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	productionURL?: Maybe<SortOrder>;
	stagingURL?: Maybe<SortOrder>;
	stripeCustomerID?: Maybe<SortOrder>;
	inviteLink?: Maybe<SortOrder>;
	activeTestRuns?: Maybe<SortOrder>;
	plan?: Maybe<SortOrder>;
	subscriptionStartedDate?: Maybe<SortOrder>;
	subscriptionStatus?: Maybe<SortOrder>;
	billingInterval?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	project?: Maybe<ProjectSort>;
	logInFlow?: Maybe<UserStorySort>;
};

/** Configuration subscription filter */
export type ConfigurationSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<ConfigurationFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Configuration update input */
export type ConfigurationUpdateByFilterInput = {
	productionURL?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	stagingURL?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	stripeCustomerID?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	inviteLink?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	activeTestRuns?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	plan?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	subscriptionStartedDate?: Maybe<Array<Maybe<UpdateByFilterDateInput>>>;
	subscriptionStatus?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	billingInterval?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
};

/** Configuration update input */
export type ConfigurationUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<ConfigurationProjectUpdateRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensUpdateRelationInput>;
	logInFlow?: Maybe<ConfigurationLogInFlowUpdateRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
};

/** Integration create input from continuousIntegration */
export type ContinuousIntegration_IntegrationCreateInput = {
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementRelationInput>;
	slack?: Maybe<IntegrationSlackRelationInput>;
	project?: Maybe<IntegrationProjectRelationInput>;
};

/** Integration update input from continuousIntegration */
export type ContinuousIntegration_IntegrationUpdateInput = {
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationUpdateRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementUpdateRelationInput>;
	slack?: Maybe<IntegrationSlackUpdateRelationInput>;
	project?: Maybe<IntegrationProjectUpdateRelationInput>;
};

/** SeleniumTarget create input from coordinates */
export type Coordinates_SeleniumTargetCreateInput = {
	click?: Maybe<SeleniumTargetClickRelationInput>;
	type?: Maybe<SeleniumTargetTypeRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesRelationInput>;
};

/** SeleniumTarget update input from coordinates */
export type Coordinates_SeleniumTargetUpdateInput = {
	click?: Maybe<SeleniumTargetClickUpdateRelationInput>;
	type?: Maybe<SeleniumTargetTypeUpdateRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceUpdateRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationUpdateRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorUpdateRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesUpdateRelationInput>;
};

/** Custom Table Field Type */
export type CustomTableField = {
	__typename?: 'CustomTableField';
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	fieldType?: Maybe<FieldType>;
	isList: Scalars['Boolean'];
	isRequired: Scalars['Boolean'];
	isUnique?: Maybe<Scalars['Boolean']>;
	defaultValue?: Maybe<Scalars['String']>;
	computedMode?: Maybe<ComputedFieldMode>;
	expression?: Maybe<Scalars['String']>;
	fieldTypeAttributes?: Maybe<FieldTypeAttributes>;
};

/** Date Field Attributes */
export type DateFieldTypeAttributes = {
	__typename?: 'DateFieldTypeAttributes';
	format: Scalars['String'];
};

export enum DatePartFunctionType {
	Date = 'DATE',
	Time = 'TIME',
	Week = 'WEEK',
	WeekDay = 'WEEK_DAY',
	WeekOfYear = 'WEEK_OF_YEAR',
	Year = 'YEAR',
	YearWeek = 'YEAR_WEEK',
	DayName = 'DAY_NAME',
	DayOfMonth = 'DAY_OF_MONTH',
	DayOfWeek = 'DAY_OF_WEEK',
	DayOfYear = 'DAY_OF_YEAR',
	Quarter = 'QUARTER',
	Day = 'DAY',
	Month = 'MONTH',
	MonthName = 'MONTH_NAME',
	Hour = 'HOUR',
	Minute = 'MINUTE',
	Second = 'SECOND',
	Microsecond = 'MICROSECOND',
	LastDay = 'LAST_DAY',
}

export type DatePredicate = {
	equals?: Maybe<Scalars['Date']>;
	not_equals?: Maybe<Scalars['Date']>;
	in?: Maybe<Array<Scalars['Date']>>;
	not_in?: Maybe<Array<Scalars['Date']>>;
	lt?: Maybe<Scalars['Date']>;
	lte?: Maybe<Scalars['Date']>;
	gt?: Maybe<Scalars['Date']>;
	gte?: Maybe<Scalars['Date']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	relative?: Maybe<DateRelativePredicates>;
};

export type DatePredicateHaving = {
	equals?: Maybe<Scalars['Date']>;
	not_equals?: Maybe<Scalars['Date']>;
	in?: Maybe<Array<Scalars['Date']>>;
	not_in?: Maybe<Array<Scalars['Date']>>;
	lt?: Maybe<Scalars['Date']>;
	lte?: Maybe<Scalars['Date']>;
	gt?: Maybe<Scalars['Date']>;
	gte?: Maybe<Scalars['Date']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	AND?: Maybe<Array<DatePredicateHaving>>;
	OR?: Maybe<Array<DatePredicateHaving>>;
};

export type DateRelativePredicates = {
	lt?: Maybe<DateRelativePredicateType>;
	lte?: Maybe<DateRelativePredicateType>;
	gt?: Maybe<DateRelativePredicateType>;
	gte?: Maybe<DateRelativePredicateType>;
};

export type DateRelativePredicateType = {
	op?: Maybe<RelativePredicateOpEnum>;
	unit?: Maybe<RelativePredicateUnitEnum>;
	value: Scalars['String'];
};

export type DateTimePredicate = {
	equals?: Maybe<Scalars['DateTime']>;
	not_equals?: Maybe<Scalars['DateTime']>;
	in?: Maybe<Array<Scalars['DateTime']>>;
	not_in?: Maybe<Array<Scalars['DateTime']>>;
	lt?: Maybe<Scalars['DateTime']>;
	lte?: Maybe<Scalars['DateTime']>;
	gt?: Maybe<Scalars['DateTime']>;
	gte?: Maybe<Scalars['DateTime']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	relative?: Maybe<DateRelativePredicates>;
};

export type DateTimePredicateHaving = {
	equals?: Maybe<Scalars['DateTime']>;
	not_equals?: Maybe<Scalars['DateTime']>;
	in?: Maybe<Array<Scalars['DateTime']>>;
	not_in?: Maybe<Array<Scalars['DateTime']>>;
	lt?: Maybe<Scalars['DateTime']>;
	lte?: Maybe<Scalars['DateTime']>;
	gt?: Maybe<Scalars['DateTime']>;
	gte?: Maybe<Scalars['DateTime']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	AND?: Maybe<Array<DateTimePredicateHaving>>;
	OR?: Maybe<Array<DateTimePredicateHaving>>;
};

/** Date Type Format Enum */
export enum DateTypeFormatEnum {
	Date = 'DATE',
	Datetime = 'DATETIME',
}

/** DeployDataResponse */
export type DeployDataResponse = {
	__typename?: 'DeployDataResponse';
	uploadBuildUrl: Scalars['String'];
	uploadMetaDataUrl: Scalars['String'];
	buildName: Scalars['String'];
};

/** DeployingBuildInput */
export type DeployingBuildInput = {
	buildName: Scalars['String'];
	options?: Maybe<DeployOptions>;
};

export enum DeployModeEnum {
	Full = 'FULL',
	OnlyPlugins = 'ONLY_PLUGINS',
	OnlyProject = 'ONLY_PROJECT',
	Functions = 'FUNCTIONS',
	Migrations = 'MIGRATIONS',
}

/** DeployOptions */
export type DeployOptions = {
	mode?: Maybe<DeployModeEnum>;
	pluginNames?: Maybe<Array<Maybe<Scalars['String']>>>;
	extensionNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum DeployStatusEnum {
	Deploying = 'deploying',
	CompleteError = 'complete_error',
	CompleteSuccess = 'complete_success',
	Compiling = 'compiling',
	Preparing = 'preparing',
	Initialize = 'initialize',
}

/** DeployStatusResult */
export type DeployStatusResult = {
	__typename?: 'DeployStatusResult';
	status: DeployStatusEnum;
	message?: Maybe<Scalars['String']>;
};

/** SeleniumDragndrop create input from destinationTarget */
export type DestinationTarget_SeleniumDragndropCreateInput = {
	sourceTarget?: Maybe<SeleniumDragndropSourceTargetRelationInput>;
	destinationTarget?: Maybe<SeleniumDragndropDestinationTargetRelationInput>;
	command?: Maybe<SeleniumDragndropCommandRelationInput>;
};

/** SeleniumDragndrop update input from destinationTarget */
export type DestinationTarget_SeleniumDragndropUpdateInput = {
	sourceTarget?: Maybe<SeleniumDragndropSourceTargetUpdateRelationInput>;
	destinationTarget?: Maybe<SeleniumDragndropDestinationTargetUpdateRelationInput>;
	command?: Maybe<SeleniumDragndropCommandUpdateRelationInput>;
};

/** SeleniumCommand create input from dragndrop */
export type Dragndrop_SeleniumCommandCreateInput = {
	open?: Maybe<SeleniumCommandOpenRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeRelationInput>;
	click?: Maybe<SeleniumCommandClickRelationInput>;
	type?: Maybe<SeleniumCommandTypeRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropRelationInput>;
	sIndex: Scalars['Int'];
	group?: Maybe<SeleniumCommandGroupRelationInput>;
};

/** SeleniumCommand update input from dragndrop */
export type Dragndrop_SeleniumCommandUpdateInput = {
	open?: Maybe<SeleniumCommandOpenUpdateRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeUpdateRelationInput>;
	click?: Maybe<SeleniumCommandClickUpdateRelationInput>;
	type?: Maybe<SeleniumCommandTypeUpdateRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropUpdateRelationInput>;
	sIndex?: Maybe<Scalars['Int']>;
	group?: Maybe<SeleniumCommandGroupUpdateRelationInput>;
};

/** SeleniumTarget create input from dragndropDestination */
export type DragndropDestination_SeleniumTargetCreateInput = {
	click?: Maybe<SeleniumTargetClickRelationInput>;
	type?: Maybe<SeleniumTargetTypeRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationRelationInput>;
	selector: SeleniumTargetSelectorRelationInput;
	coordinates?: Maybe<SeleniumTargetCoordinatesRelationInput>;
};

/** SeleniumTarget update input from dragndropDestination */
export type DragndropDestination_SeleniumTargetUpdateInput = {
	click?: Maybe<SeleniumTargetClickUpdateRelationInput>;
	type?: Maybe<SeleniumTargetTypeUpdateRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceUpdateRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationUpdateRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorUpdateRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesUpdateRelationInput>;
};

/** SeleniumTarget create input from dragndropSource */
export type DragndropSource_SeleniumTargetCreateInput = {
	click?: Maybe<SeleniumTargetClickRelationInput>;
	type?: Maybe<SeleniumTargetTypeRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationRelationInput>;
	selector: SeleniumTargetSelectorRelationInput;
	coordinates?: Maybe<SeleniumTargetCoordinatesRelationInput>;
};

/** SeleniumTarget update input from dragndropSource */
export type DragndropSource_SeleniumTargetUpdateInput = {
	click?: Maybe<SeleniumTargetClickUpdateRelationInput>;
	type?: Maybe<SeleniumTargetTypeUpdateRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceUpdateRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationUpdateRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorUpdateRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesUpdateRelationInput>;
};

/** Information about an individual environment (with a one:many relationship to recording) to help understand a bug. */
export type Environment = {
	__typename?: 'Environment';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	recording?: Maybe<Recording>;
	_description?: Maybe<Scalars['String']>;
};

export type Environment_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	ipAddress?: Maybe<StringPredicate>;
	browser?: Maybe<StringPredicate>;
	browserVersion?: Maybe<StringPredicate>;
	operatingSystem?: Maybe<StringPredicate>;
	language?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	recording?: Maybe<Recording_PermissionFilter>;
	AND?: Maybe<Array<Environment_PermissionFilter>>;
	OR?: Maybe<Array<Environment_PermissionFilter>>;
};

export type Environment_PermissionRelationFilter = {
	some?: Maybe<Environment_PermissionFilter>;
	every?: Maybe<Environment_PermissionFilter>;
	none?: Maybe<Environment_PermissionFilter>;
};

/** Recording create input from environment */
export type Environment_RecordingCreateInput = {
	environment?: Maybe<RecordingEnvironmentRelationInput>;
	userStory?: Maybe<RecordingUserStoryRelationInput>;
	video?: Maybe<RecordingVideoRelationInput>;
	seleniumScript: RecordingSeleniumScriptRelationInput;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

/** Recording update input from environment */
export type Environment_RecordingUpdateInput = {
	environment?: Maybe<RecordingEnvironmentUpdateRelationInput>;
	userStory?: Maybe<RecordingUserStoryUpdateRelationInput>;
	video?: Maybe<RecordingVideoUpdateRelationInput>;
	seleniumScript?: Maybe<RecordingSeleniumScriptUpdateRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

export type EnvironmentBackupItem = {
	__typename?: 'EnvironmentBackupItem';
	name: Scalars['String'];
	size: Scalars['Float'];
};

/** Environment create input */
export type EnvironmentCreateInput = {
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	recording?: Maybe<EnvironmentRecordingRelationInput>;
};

/** Environment create many input */
export type EnvironmentCreateManyInput = {
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	recording?: Maybe<EnvironmentRecordingManyRelationInput>;
};

/** Environment delete input */
export type EnvironmentDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** EnvironmentFieldsPermissions create input */
export type EnvironmentFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	ipAddress?: Maybe<Scalars['Boolean']>;
	browser?: Maybe<Scalars['Boolean']>;
	browserVersion?: Maybe<Scalars['Boolean']>;
	operatingSystem?: Maybe<Scalars['Boolean']>;
	language?: Maybe<Scalars['Boolean']>;
};

export type EnvironmentFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	ipAddress?: Maybe<StringPredicate>;
	browser?: Maybe<StringPredicate>;
	browserVersion?: Maybe<StringPredicate>;
	operatingSystem?: Maybe<StringPredicate>;
	language?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	recording?: Maybe<RecordingFilter>;
	AND?: Maybe<Array<EnvironmentFilter>>;
	OR?: Maybe<Array<EnvironmentFilter>>;
};

export type EnvironmentGroupBy = {
	query: EnvironmentGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type EnvironmentGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	ipAddress?: Maybe<Array<GroupByField>>;
	browser?: Maybe<Array<GroupByField>>;
	browserVersion?: Maybe<Array<GroupByField>>;
	operatingSystem?: Maybe<Array<GroupByField>>;
	language?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	recording?: Maybe<RecordingGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type EnvironmentItem = {
	__typename?: 'EnvironmentItem';
	id: Scalars['ID'];
	name: Scalars['String'];
};

export type EnvironmentKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** EnvironmentListResponse output */
export type EnvironmentListResponse = {
	__typename?: 'EnvironmentListResponse';
	/** List items */
	items: Array<Environment>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** EnvironmentManyResponse output */
export type EnvironmentManyResponse = {
	__typename?: 'EnvironmentManyResponse';
	/** List items */
	items: Array<Environment>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum EnvironmentOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	IpAddressAsc = 'ipAddress_ASC',
	IpAddressDesc = 'ipAddress_DESC',
	BrowserAsc = 'browser_ASC',
	BrowserDesc = 'browser_DESC',
	BrowserVersionAsc = 'browserVersion_ASC',
	BrowserVersionDesc = 'browserVersion_DESC',
	OperatingSystemAsc = 'operatingSystem_ASC',
	OperatingSystemDesc = 'operatingSystem_DESC',
	LanguageAsc = 'language_ASC',
	LanguageDesc = 'language_DESC',
}

/** Environment subscription payload */
export type EnvironmentPayload = {
	__typename?: 'EnvironmentPayload';
	mutation: MutationType;
	node?: Maybe<Environment>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Environment>;
};

/** Environment relation input */
export type EnvironmentRecordingManyRelationInput = {
	connect?: Maybe<RecordingKeyFilter>;
};

/** Environment relation input */
export type EnvironmentRecordingRelationInput = {
	connect?: Maybe<RecordingKeyFilter>;
	create?: Maybe<Environment_RecordingCreateInput>;
};

/** Environment relation input */
export type EnvironmentRecordingUpdateRelationInput = {
	connect?: Maybe<RecordingKeyFilter>;
	disconnect?: Maybe<RecordingKeyFilter>;
	reconnect?: Maybe<RecordingKeyFilter>;
	create?: Maybe<Environment_RecordingCreateInput>;
	update?: Maybe<Environment_RecordingUpdateInput>;
};

export type EnvironmentRelationFilter = {
	some?: Maybe<EnvironmentFilter>;
	every?: Maybe<EnvironmentFilter>;
	none?: Maybe<EnvironmentFilter>;
};

/** EnvironmentSetupInput */
export type EnvironmentSetupInput = {
	deleteLock?: Maybe<Scalars['Boolean']>;
};

export type EnvironmentSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	ipAddress?: Maybe<SortOrder>;
	browser?: Maybe<SortOrder>;
	browserVersion?: Maybe<SortOrder>;
	operatingSystem?: Maybe<SortOrder>;
	language?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	recording?: Maybe<RecordingSort>;
};

/** Environment subscription filter */
export type EnvironmentSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<EnvironmentFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Environment update input */
export type EnvironmentUpdateByFilterInput = {
	ipAddress?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	browser?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	browserVersion?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	operatingSystem?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	language?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** Environment update input */
export type EnvironmentUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	recording?: Maybe<EnvironmentRecordingUpdateRelationInput>;
};

export type EnvironmentVariable = {
	__typename?: 'EnvironmentVariable';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	name?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

/** EnvironmentVariables create input */
export type EnvironmentVariableCreateInput = {
	name: Scalars['String'];
	value: Scalars['String'];
};

/** EnvironmentVariables create many input */
export type EnvironmentVariableCreateManyInput = {
	name: Scalars['String'];
	value: Scalars['String'];
};

/** EnvironmentVariables delete input */
export type EnvironmentVariableDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

export type EnvironmentVariableFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	value?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	AND?: Maybe<Array<EnvironmentVariableFilter>>;
	OR?: Maybe<Array<EnvironmentVariableFilter>>;
};

export type EnvironmentVariableGroupBy = {
	query: EnvironmentVariableGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type EnvironmentVariableGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	name?: Maybe<Array<GroupByField>>;
	value?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type EnvironmentVariableKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
};

/** EnvironmentVariableListResponse output */
export type EnvironmentVariableListResponse = {
	__typename?: 'EnvironmentVariableListResponse';
	/** List items */
	items: Array<EnvironmentVariable>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** EnvironmentVariableManyResponse output */
export type EnvironmentVariableManyResponse = {
	__typename?: 'EnvironmentVariableManyResponse';
	/** List items */
	items: Array<EnvironmentVariable>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum EnvironmentVariableOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
	ValueAsc = 'value_ASC',
	ValueDesc = 'value_DESC',
}

/** EnvironmentVariables subscription payload */
export type EnvironmentVariablePayload = {
	__typename?: 'EnvironmentVariablePayload';
	mutation: MutationType;
	node?: Maybe<EnvironmentVariable>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<EnvironmentVariable>;
};

export type EnvironmentVariableSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	name?: Maybe<SortOrder>;
	value?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
};

/** EnvironmentVariables subscription filter */
export type EnvironmentVariableSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<EnvironmentVariableFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** EnvironmentVariables update input */
export type EnvironmentVariableUpdateByFilterInput = {
	name?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	value?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** EnvironmentVariables update input */
export type EnvironmentVariableUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
};

export type Error = {
	__typename?: 'Error';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	stepIndex?: Maybe<Scalars['Int']>;
	exception?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<TestOutcomeListResponse>;
	_description?: Maybe<Scalars['String']>;
};

export type ErrorTestOutcomeArgs = {
	filter?: Maybe<TestOutcomeFilter>;
	orderBy?: Maybe<Array<Maybe<TestOutcomeOrderBy>>>;
	sort?: Maybe<Array<TestOutcomeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TestOutcomeGroupBy>;
};

export type Error_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	stepIndex?: Maybe<IntPredicate>;
	exception?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	testOutcome?: Maybe<TestOutcome_PermissionRelationFilter>;
	AND?: Maybe<Array<Error_PermissionFilter>>;
	OR?: Maybe<Array<Error_PermissionFilter>>;
};

/** Error create input */
export type ErrorCreateInput = {
	stepIndex: Scalars['Int'];
	exception: Scalars['String'];
	testOutcome?: Maybe<ErrorTestOutcomeRelationInput>;
};

/** Error create many input */
export type ErrorCreateManyInput = {
	stepIndex: Scalars['Int'];
	exception: Scalars['String'];
	testOutcome?: Maybe<ErrorTestOutcomeManyRelationInput>;
};

/** Error delete input */
export type ErrorDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** TestOutcome create input from errorDetails */
export type ErrorDetails_TestOutcomeCreateInput = {
	userStory?: Maybe<TestOutcomeUserStoryRelationInput>;
	/** Has the bug been resolved? */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunRelationInput>;
	video?: Maybe<TestOutcomeVideoRelationInput>;
	errorDetails?: Maybe<TestOutcomeErrorDetailsRelationInput>;
};

/** TestOutcome update input from errorDetails */
export type ErrorDetails_TestOutcomeUpdateInput = {
	filter?: Maybe<TestOutcomeKeyFilter>;
	data: TestOutcomeUpdateInput;
};

/** ErrorFieldsPermissions create input */
export type ErrorFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	stepIndex?: Maybe<Scalars['Boolean']>;
	exception?: Maybe<Scalars['Boolean']>;
};

export type ErrorFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	stepIndex?: Maybe<IntPredicate>;
	exception?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	testOutcome?: Maybe<TestOutcomeRelationFilter>;
	AND?: Maybe<Array<ErrorFilter>>;
	OR?: Maybe<Array<ErrorFilter>>;
};

export type ErrorGroupBy = {
	query: ErrorGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type ErrorGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	stepIndex?: Maybe<Array<GroupByField>>;
	exception?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	testOutcome?: Maybe<TestOutcomeGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type ErrorKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** ErrorListResponse output */
export type ErrorListResponse = {
	__typename?: 'ErrorListResponse';
	/** List items */
	items: Array<Error>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** ErrorManyResponse output */
export type ErrorManyResponse = {
	__typename?: 'ErrorManyResponse';
	/** List items */
	items: Array<Error>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum ErrorOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	StepIndexAsc = 'stepIndex_ASC',
	StepIndexDesc = 'stepIndex_DESC',
	ExceptionAsc = 'exception_ASC',
	ExceptionDesc = 'exception_DESC',
}

/** Error subscription payload */
export type ErrorPayload = {
	__typename?: 'ErrorPayload';
	mutation: MutationType;
	node?: Maybe<Error>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Error>;
};

export type ErrorSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	stepIndex?: Maybe<SortOrder>;
	exception?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
};

/** Error subscription filter */
export type ErrorSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<ErrorFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Error relation input */
export type ErrorTestOutcomeManyRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
};

/** Error relation input */
export type ErrorTestOutcomeRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
	create?: Maybe<Array<Maybe<ErrorDetails_TestOutcomeCreateInput>>>;
};

/** Error relation input */
export type ErrorTestOutcomeUpdateRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
	disconnect?: Maybe<Array<TestOutcomeKeyFilter>>;
	reconnect?: Maybe<Array<TestOutcomeKeyFilter>>;
	create?: Maybe<Array<Maybe<ErrorDetails_TestOutcomeCreateInput>>>;
	update?: Maybe<Array<Maybe<ErrorDetails_TestOutcomeUpdateInput>>>;
};

/** Error update input */
export type ErrorUpdateByFilterInput = {
	stepIndex?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	exception?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** Error update input */
export type ErrorUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	stepIndex?: Maybe<Scalars['Int']>;
	exception?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<ErrorTestOutcomeUpdateRelationInput>;
};

/** Facebook connection params */
export type FacebookOptions = {
	__typename?: 'FacebookOptions';
	enabled: Scalars['Boolean'];
	app_id: Scalars['String'];
	app_secret: Scalars['String'];
};

/** Facebook connection params input */
export type FacebookOptionsInput = {
	enabled: Scalars['Boolean'];
	app_id: Scalars['String'];
	app_secret: Scalars['String'];
};

/** Field Data Features */
export type FieldDataFeatures = {
	__typename?: 'FieldDataFeatures';
	create: Scalars['Boolean'];
	update: Scalars['Boolean'];
	sort: Scalars['Boolean'];
};

/** Field Schema Features */
export type FieldSchemaFeatures = {
	__typename?: 'FieldSchemaFeatures';
	update: Scalars['Boolean'];
	delete: Scalars['Boolean'];
};

/** Field types */
export enum FieldType {
	Id = 'ID',
	Uuid = 'UUID',
	Json = 'JSON',
	Number = 'NUMBER',
	Text = 'TEXT',
	Date = 'DATE',
	Switch = 'SWITCH',
	Relation = 'RELATION',
	File = 'FILE',
	Smart = 'SMART',
	Geo = 'GEO',
	OneWayRelation = 'ONE_WAY_RELATION',
	MissingRelation = 'MISSING_RELATION',
}

/** Field Type Attributes */
export type FieldTypeAttributes =
	| DateFieldTypeAttributes
	| FileFieldTypeAttributes
	| MissingRelationFieldTypeAttributes
	| NumberFieldTypeAttributes
	| SmartFieldTypeAttributes
	| SwitchFieldTypeAttributes
	| TextFieldTypeAttributes
	| UuidFieldTypeAttributes
	| GeoFieldTypeAttributes;

/** Field Type Attributes Input */
export type FieldTypeAttributesInput = {
	format?: Maybe<Scalars['String']>;
	precision?: Maybe<Scalars['Int']>;
	currency?: Maybe<Scalars['String']>;
	minValue?: Maybe<Scalars['Float']>;
	maxValue?: Maybe<Scalars['Float']>;
	isBigInt?: Maybe<Scalars['Boolean']>;
	autoIncrement?: Maybe<Scalars['Boolean']>;
	fieldSize?: Maybe<Scalars['Int']>;
	expiration?: Maybe<Scalars['Int']>;
	listOptions?: Maybe<Array<Scalars['String']>>;
	maxSize?: Maybe<Scalars['Int']>;
	typeRestrictions?: Maybe<Array<Scalars['String']>>;
	srid?: Maybe<Scalars['Int']>;
};

export type File = {
	__typename?: 'File';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	fileId?: Maybe<Scalars['String']>;
	downloadUrl?: Maybe<Scalars['String']>;
	shareUrl?: Maybe<Scalars['String']>;
	provider?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	uploaded?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	uploadUrl?: Maybe<Scalars['String']>;
	fields?: Maybe<Scalars['JSON']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	settings_menuBarLogo?: Maybe<SettingListResponse>;
	settings_landingPageImage?: Maybe<SettingListResponse>;
	users_avatar?: Maybe<UserListResponse>;
	teamMembers_avatar?: Maybe<TeamMemberListResponse>;
	project_avatar?: Maybe<ProjectListResponse>;
	recording_video?: Maybe<RecordingListResponse>;
	testOutcome_video?: Maybe<TestOutcomeListResponse>;
	previewUrl?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

export type FileSettings_MenuBarLogoArgs = {
	filter?: Maybe<SettingFilter>;
	orderBy?: Maybe<Array<Maybe<SettingOrderBy>>>;
	sort?: Maybe<Array<SettingSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SettingGroupBy>;
};

export type FileSettings_LandingPageImageArgs = {
	filter?: Maybe<SettingFilter>;
	orderBy?: Maybe<Array<Maybe<SettingOrderBy>>>;
	sort?: Maybe<Array<SettingSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SettingGroupBy>;
};

export type FileUsers_AvatarArgs = {
	filter?: Maybe<UserFilter>;
	orderBy?: Maybe<Array<Maybe<UserOrderBy>>>;
	sort?: Maybe<Array<UserSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<UserGroupBy>;
};

export type FileTeamMembers_AvatarArgs = {
	filter?: Maybe<TeamMemberFilter>;
	orderBy?: Maybe<Array<Maybe<TeamMemberOrderBy>>>;
	sort?: Maybe<Array<TeamMemberSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TeamMemberGroupBy>;
};

export type FileProject_AvatarArgs = {
	filter?: Maybe<ProjectFilter>;
	orderBy?: Maybe<Array<Maybe<ProjectOrderBy>>>;
	sort?: Maybe<Array<ProjectSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ProjectGroupBy>;
};

export type FileRecording_VideoArgs = {
	filter?: Maybe<RecordingFilter>;
	orderBy?: Maybe<Array<Maybe<RecordingOrderBy>>>;
	sort?: Maybe<Array<RecordingSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RecordingGroupBy>;
};

export type FileTestOutcome_VideoArgs = {
	filter?: Maybe<TestOutcomeFilter>;
	orderBy?: Maybe<Array<Maybe<TestOutcomeOrderBy>>>;
	sort?: Maybe<Array<TestOutcomeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TestOutcomeGroupBy>;
};

export type File_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	fileId?: Maybe<StringPredicate>;
	downloadUrl?: Maybe<StringPredicate>;
	shareUrl?: Maybe<StringPredicate>;
	provider?: Maybe<StringPredicate>;
	public?: Maybe<BoolPredicate>;
	uploaded?: Maybe<BoolPredicate>;
	filename?: Maybe<StringPredicate>;
	uploadUrl?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	settings_menuBarLogo?: Maybe<Setting_PermissionRelationFilter>;
	settings_landingPageImage?: Maybe<Setting_PermissionRelationFilter>;
	users_avatar?: Maybe<User_PermissionRelationFilter>;
	teamMembers_avatar?: Maybe<TeamMember_PermissionRelationFilter>;
	project_avatar?: Maybe<Project_PermissionRelationFilter>;
	recording_video?: Maybe<Recording_PermissionRelationFilter>;
	testOutcome_video?: Maybe<TestOutcome_PermissionRelationFilter>;
	AND?: Maybe<Array<File_PermissionFilter>>;
	OR?: Maybe<Array<File_PermissionFilter>>;
};

/** Files create input */
export type FileCreateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
};

/** Files create many input */
export type FileCreateManyInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarManyRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarManyRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarManyRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoManyRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoManyRelationInput>;
};

/** Files delete input */
export type FileDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** FileFieldsPermissions create input */
export type FileFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	fileId?: Maybe<Scalars['Boolean']>;
	downloadUrl?: Maybe<Scalars['Boolean']>;
	shareUrl?: Maybe<Scalars['Boolean']>;
	provider?: Maybe<Scalars['Boolean']>;
	public?: Maybe<Scalars['Boolean']>;
	uploaded?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['Boolean']>;
	uploadUrl?: Maybe<Scalars['Boolean']>;
	fields?: Maybe<Scalars['Boolean']>;
	meta?: Maybe<Scalars['Boolean']>;
	mods?: Maybe<Scalars['Boolean']>;
};

/** File Field Attributes */
export type FileFieldTypeAttributes = {
	__typename?: 'FileFieldTypeAttributes';
	format: Scalars['String'];
	maxSize?: Maybe<Scalars['Int']>;
	/** @deprecated Field is deprecated */
	showTitle?: Maybe<Scalars['Boolean']>;
	/** @deprecated Field is deprecated */
	showUrl?: Maybe<Scalars['Boolean']>;
	typeRestrictions?: Maybe<Array<Scalars['String']>>;
	expiration?: Maybe<Scalars['Int']>;
};

export type FileFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	fileId?: Maybe<StringPredicate>;
	downloadUrl?: Maybe<StringPredicate>;
	shareUrl?: Maybe<StringPredicate>;
	provider?: Maybe<StringPredicate>;
	public?: Maybe<BoolPredicate>;
	uploaded?: Maybe<BoolPredicate>;
	filename?: Maybe<StringPredicate>;
	uploadUrl?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	settings_menuBarLogo?: Maybe<SettingRelationFilter>;
	settings_landingPageImage?: Maybe<SettingRelationFilter>;
	users_avatar?: Maybe<UserRelationFilter>;
	teamMembers_avatar?: Maybe<TeamMemberRelationFilter>;
	project_avatar?: Maybe<ProjectRelationFilter>;
	recording_video?: Maybe<RecordingRelationFilter>;
	testOutcome_video?: Maybe<TestOutcomeRelationFilter>;
	AND?: Maybe<Array<FileFilter>>;
	OR?: Maybe<Array<FileFilter>>;
};

export type FileGroupBy = {
	query: FileGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type FileGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	fileId?: Maybe<Array<GroupByField>>;
	downloadUrl?: Maybe<Array<GroupByField>>;
	shareUrl?: Maybe<Array<GroupByField>>;
	provider?: Maybe<Array<GroupByField>>;
	public?: Maybe<Array<GroupByField>>;
	uploaded?: Maybe<Array<GroupByField>>;
	filename?: Maybe<Array<GroupByField>>;
	uploadUrl?: Maybe<Array<GroupByField>>;
	fields?: Maybe<Array<GroupByField>>;
	meta?: Maybe<Array<GroupByField>>;
	mods?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	settings_menuBarLogo?: Maybe<SettingGroupByQuery>;
	settings_landingPageImage?: Maybe<SettingGroupByQuery>;
	users_avatar?: Maybe<UserGroupByQuery>;
	teamMembers_avatar?: Maybe<TeamMemberGroupByQuery>;
	project_avatar?: Maybe<ProjectGroupByQuery>;
	recording_video?: Maybe<RecordingGroupByQuery>;
	testOutcome_video?: Maybe<TestOutcomeGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type FileKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	fileId?: Maybe<Scalars['String']>;
};

/** FileListResponse output */
export type FileListResponse = {
	__typename?: 'FileListResponse';
	/** List items */
	items: Array<File>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** FileManyResponse output */
export type FileManyResponse = {
	__typename?: 'FileManyResponse';
	/** List items */
	items: Array<File>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum FileOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	FileIdAsc = 'fileId_ASC',
	FileIdDesc = 'fileId_DESC',
	DownloadUrlAsc = 'downloadUrl_ASC',
	DownloadUrlDesc = 'downloadUrl_DESC',
	ShareUrlAsc = 'shareUrl_ASC',
	ShareUrlDesc = 'shareUrl_DESC',
	ProviderAsc = 'provider_ASC',
	ProviderDesc = 'provider_DESC',
	PublicAsc = 'public_ASC',
	PublicDesc = 'public_DESC',
	UploadedAsc = 'uploaded_ASC',
	UploadedDesc = 'uploaded_DESC',
	FilenameAsc = 'filename_ASC',
	FilenameDesc = 'filename_DESC',
	UploadUrlAsc = 'uploadUrl_ASC',
	UploadUrlDesc = 'uploadUrl_DESC',
	FieldsAsc = 'fields_ASC',
	FieldsDesc = 'fields_DESC',
	MetaAsc = 'meta_ASC',
	MetaDesc = 'meta_DESC',
	ModsAsc = 'mods_ASC',
	ModsDesc = 'mods_DESC',
}

/** Files subscription payload */
export type FilePayload = {
	__typename?: 'FilePayload';
	mutation: MutationType;
	node?: Maybe<File>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<File>;
};

export type FileSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	fileId?: Maybe<SortOrder>;
	downloadUrl?: Maybe<SortOrder>;
	shareUrl?: Maybe<SortOrder>;
	provider?: Maybe<SortOrder>;
	public?: Maybe<SortOrder>;
	uploaded?: Maybe<SortOrder>;
	filename?: Maybe<SortOrder>;
	uploadUrl?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
};

/** Files relation input */
export type FilesProject_AvatarManyRelationInput = {
	connect?: Maybe<Array<ProjectKeyFilter>>;
};

/** Files relation input */
export type FilesProject_AvatarRelationInput = {
	connect?: Maybe<Array<ProjectKeyFilter>>;
	create?: Maybe<Array<Maybe<Avatar_ProjectCreateInput>>>;
};

/** Files relation input */
export type FilesProject_AvatarUpdateRelationInput = {
	connect?: Maybe<Array<ProjectKeyFilter>>;
	disconnect?: Maybe<Array<ProjectKeyFilter>>;
	reconnect?: Maybe<Array<ProjectKeyFilter>>;
	create?: Maybe<Array<Maybe<Avatar_ProjectCreateInput>>>;
	update?: Maybe<Array<Maybe<Avatar_ProjectUpdateInput>>>;
};

/** Files relation input */
export type FilesRecording_VideoManyRelationInput = {
	connect?: Maybe<Array<RecordingKeyFilter>>;
};

/** Files relation input */
export type FilesRecording_VideoRelationInput = {
	connect?: Maybe<Array<RecordingKeyFilter>>;
	create?: Maybe<Array<Maybe<Video_RecordingCreateInput>>>;
};

/** Files relation input */
export type FilesRecording_VideoUpdateRelationInput = {
	connect?: Maybe<Array<RecordingKeyFilter>>;
	disconnect?: Maybe<Array<RecordingKeyFilter>>;
	reconnect?: Maybe<Array<RecordingKeyFilter>>;
	create?: Maybe<Array<Maybe<Video_RecordingCreateInput>>>;
	update?: Maybe<Array<Maybe<Video_RecordingUpdateInput>>>;
};

/** Files relation input */
export type FilesTeamMembers_AvatarManyRelationInput = {
	connect?: Maybe<Array<TeamMemberKeyFilter>>;
};

/** Files relation input */
export type FilesTeamMembers_AvatarRelationInput = {
	connect?: Maybe<Array<TeamMemberKeyFilter>>;
};

/** Files relation input */
export type FilesTeamMembers_AvatarUpdateRelationInput = {
	connect?: Maybe<Array<TeamMemberKeyFilter>>;
	disconnect?: Maybe<Array<TeamMemberKeyFilter>>;
	reconnect?: Maybe<Array<TeamMemberKeyFilter>>;
	update?: Maybe<Array<Maybe<Avatar_TeamMemberUpdateInput>>>;
};

/** Files relation input */
export type FilesTestOutcome_VideoManyRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
};

/** Files relation input */
export type FilesTestOutcome_VideoRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
	create?: Maybe<Array<Maybe<Video_TestOutcomeCreateInput>>>;
};

/** Files relation input */
export type FilesTestOutcome_VideoUpdateRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
	disconnect?: Maybe<Array<TestOutcomeKeyFilter>>;
	reconnect?: Maybe<Array<TestOutcomeKeyFilter>>;
	create?: Maybe<Array<Maybe<Video_TestOutcomeCreateInput>>>;
	update?: Maybe<Array<Maybe<Video_TestOutcomeUpdateInput>>>;
};

/** Files subscription filter */
export type FileSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<FileFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Files relation input */
export type FilesUsers_AvatarManyRelationInput = {
	connect?: Maybe<Array<UserKeyFilter>>;
};

/** Files relation input */
export type FilesUsers_AvatarRelationInput = {
	connect?: Maybe<Array<UserKeyFilter>>;
	create?: Maybe<Array<Maybe<Avatar_UserCreateInput>>>;
};

/** Files relation input */
export type FilesUsers_AvatarUpdateRelationInput = {
	connect?: Maybe<Array<UserKeyFilter>>;
	disconnect?: Maybe<Array<UserKeyFilter>>;
	reconnect?: Maybe<Array<UserKeyFilter>>;
	create?: Maybe<Array<Maybe<Avatar_UserCreateInput>>>;
	update?: Maybe<Array<Maybe<Avatar_UserUpdateInput>>>;
};

/** File Type Format Enum */
export enum FileTypeFormatEnum {
	File = 'FILE',
	Image = 'IMAGE',
}

/** Files update input */
export type FileUpdateByFilterInput = {
	downloadUrl?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	shareUrl?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	provider?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	public?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	uploaded?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	filename?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	uploadUrl?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	fields?: Maybe<Array<Maybe<UpdateByFilterJsonInput>>>;
	meta?: Maybe<Array<Maybe<UpdateByFilterJsonInput>>>;
	mods?: Maybe<Array<Maybe<UpdateByFilterJsonInput>>>;
};

/** Files update input */
export type FileUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarUpdateRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarUpdateRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarUpdateRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoUpdateRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
};

export type FileUploadInfoResponse = {
	__typename?: 'FileUploadInfoResponse';
	policy: Scalars['String'];
	signature: Scalars['String'];
	apiKey: Scalars['String'];
	path: Scalars['String'];
};

export type FloatPredicate = {
	equals?: Maybe<Scalars['Float']>;
	not_equals?: Maybe<Scalars['Float']>;
	in?: Maybe<Array<Scalars['Float']>>;
	not_in?: Maybe<Array<Scalars['Float']>>;
	lt?: Maybe<Scalars['Float']>;
	lte?: Maybe<Scalars['Float']>;
	gt?: Maybe<Scalars['Float']>;
	gte?: Maybe<Scalars['Float']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
};

export type FloatPredicateHaving = {
	equals?: Maybe<Scalars['Float']>;
	not_equals?: Maybe<Scalars['Float']>;
	in?: Maybe<Array<Scalars['Float']>>;
	not_in?: Maybe<Array<Scalars['Float']>>;
	lt?: Maybe<Scalars['Float']>;
	lte?: Maybe<Scalars['Float']>;
	gt?: Maybe<Scalars['Float']>;
	gte?: Maybe<Scalars['Float']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	AND?: Maybe<Array<FloatPredicateHaving>>;
	OR?: Maybe<Array<FloatPredicateHaving>>;
};

/** FunctionInfo */
export type FunctionInfo = {
	name: Scalars['String'];
	functionType: FunctionType;
	description?: Maybe<Scalars['String']>;
	application?: Maybe<Application>;
};

/** FunctionInfoFilter */
export type FunctionInfoFilter = {
	name?: Maybe<Scalars['String']>;
	functionType?: Maybe<FunctionType>;
	description?: Maybe<Scalars['String']>;
};

/** FunctionInfoOrderBy */
export enum FunctionInfoOrderBy {
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
	FunctionTypeAsc = 'functionType_ASC',
	FunctionTypeDesc = 'functionType_DESC',
	DescriptionAsc = 'description_ASC',
	DescriptionDesc = 'description_DESC',
}

/** FunctionListResponse output */
export type FunctionListResponse = {
	__typename?: 'FunctionListResponse';
	/** List items */
	items: Array<FunctionInfo>;
	/** List items count */
	count: Scalars['Int'];
};

/** FunctionResolverInfo */
export type FunctionResolverInfo = FunctionInfo & {
	__typename?: 'FunctionResolverInfo';
	name: Scalars['String'];
	functionType: FunctionType;
	description?: Maybe<Scalars['String']>;
	gqlType: Scalars['String'];
	application?: Maybe<Application>;
};

/** FunctionTaskInfo */
export type FunctionTaskInfo = FunctionInfo & {
	__typename?: 'FunctionTaskInfo';
	name: Scalars['String'];
	functionType: FunctionType;
	description?: Maybe<Scalars['String']>;
	scheduleExpression?: Maybe<Scalars['String']>;
	application?: Maybe<Application>;
};

/** FunctionTriggerInfo */
export type FunctionTriggerInfo = FunctionInfo & {
	__typename?: 'FunctionTriggerInfo';
	name: Scalars['String'];
	functionType: FunctionType;
	description?: Maybe<Scalars['String']>;
	operation: Scalars['String'];
	tableName: Scalars['String'];
	type: Scalars['String'];
	application?: Maybe<Application>;
};

/** FunctionType */
export enum FunctionType {
	Resolver = 'resolver',
	Trigger = 'trigger',
	Webhook = 'webhook',
	Task = 'task',
	Schedule = 'schedule',
}

/** FunctionWebhookInfo */
export type FunctionWebhookInfo = FunctionInfo & {
	__typename?: 'FunctionWebhookInfo';
	name: Scalars['String'];
	functionType: FunctionType;
	description?: Maybe<Scalars['String']>;
	httpMethod: Scalars['String'];
	workspaceRelativePath: Scalars['String'];
	workspaceFullPath: Scalars['String'];
	application?: Maybe<Application>;
};

/** Geo Field Attributes */
export type GeoFieldTypeAttributes = {
	__typename?: 'GeoFieldTypeAttributes';
	format: Scalars['String'];
	srid?: Maybe<Scalars['Int']>;
};

/** Github connection params */
export type GithubOptions = {
	__typename?: 'GithubOptions';
	enabled: Scalars['Boolean'];
	client_id: Scalars['String'];
	client_secret: Scalars['String'];
};

/** Github connection params input */
export type GithubOptionsInput = {
	enabled: Scalars['Boolean'];
	client_id: Scalars['String'];
	client_secret: Scalars['String'];
};

/** Google connection params */
export type GoogleOptions = {
	__typename?: 'GoogleOptions';
	enabled: Scalars['Boolean'];
	client_id: Scalars['String'];
	client_secret: Scalars['String'];
};

/** Google connection params input */
export type GoogleOptionsInput = {
	enabled: Scalars['Boolean'];
	client_id: Scalars['String'];
	client_secret: Scalars['String'];
};

/** GraphQLCreateFileCustomInput */
export type GraphQlCreateFileCustomInput = {
	fileId?: Maybe<Scalars['String']>;
	filename?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
};

/** GraphQLCreateFileItemInput */
export type GraphQlCreateFileItemInput = {
	create?: Maybe<GraphQlCreateFileCustomInput>;
};

/** GraphQLFileItemResponse */
export type GraphQlFileItemResponse = {
	__typename?: 'GraphQLFileItemResponse';
	id?: Maybe<Scalars['String']>;
	downloadUrl?: Maybe<Scalars['String']>;
};

/** SeleniumCommand create input from group */
export type Group_SeleniumCommandCreateInput = {
	open?: Maybe<SeleniumCommandOpenRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeRelationInput>;
	click?: Maybe<SeleniumCommandClickRelationInput>;
	type?: Maybe<SeleniumCommandTypeRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropRelationInput>;
	sIndex: Scalars['Int'];
	group?: Maybe<SeleniumCommandGroupRelationInput>;
};

/** SeleniumCommand update input from group */
export type Group_SeleniumCommandUpdateInput = {
	filter?: Maybe<SeleniumCommandKeyFilter>;
	data: SeleniumCommandUpdateInput;
};

export type GroupByField = {
	as?: Maybe<Scalars['String']>;
	fn?: Maybe<Array<Maybe<GroupByFieldFunction>>>;
};

export type GroupByFieldFunction = {
	aggregate?: Maybe<AggregationFunctionType>;
	distinct?: Maybe<Scalars['Boolean']>;
	datePart?: Maybe<DatePartFunctionType>;
	abs?: Maybe<Scalars['Boolean']>;
	ceil?: Maybe<Scalars['Boolean']>;
	crc32?: Maybe<Scalars['Boolean']>;
	floor?: Maybe<Scalars['Boolean']>;
	mod?: Maybe<Scalars['Int']>;
	round?: Maybe<Scalars['Int']>;
	sign?: Maybe<Scalars['Boolean']>;
	truncate?: Maybe<Scalars['Int']>;
	left?: Maybe<Scalars['Int']>;
	right?: Maybe<Scalars['Int']>;
	locate?: Maybe<LocateFunctionArguments>;
	substring?: Maybe<SubstringFunctionArguments>;
	replace?: Maybe<ReplaceFunctionArguments>;
	reverse?: Maybe<Scalars['Boolean']>;
	trim?: Maybe<TrimFunctionArguments>;
	ltrim?: Maybe<Scalars['Boolean']>;
	rtrim?: Maybe<Scalars['Boolean']>;
	lower?: Maybe<Scalars['Boolean']>;
	upper?: Maybe<Scalars['Boolean']>;
	ascii?: Maybe<Scalars['Boolean']>;
	hex?: Maybe<Scalars['Boolean']>;
	bitLength?: Maybe<Scalars['Boolean']>;
	charLength?: Maybe<Scalars['Boolean']>;
	length?: Maybe<Scalars['Boolean']>;
	like?: Maybe<PatternFunctionArguments>;
	notLike?: Maybe<PatternFunctionArguments>;
	lpad?: Maybe<StringPadFunctionArguments>;
	rpad?: Maybe<StringPadFunctionArguments>;
	ifNull?: Maybe<Scalars['String']>;
	isNull?: Maybe<Scalars['Boolean']>;
	nullIf?: Maybe<Scalars['String']>;
};

export type GroupByResponse = {
	__typename?: 'GroupByResponse';
	ID?: Maybe<Scalars['ID']>;
	String?: Maybe<Scalars['String']>;
	Int?: Maybe<Scalars['Int']>;
	BigInt?: Maybe<Scalars['BigInt']>;
	Float?: Maybe<Scalars['Float']>;
	DateTime?: Maybe<Scalars['DateTime']>;
	Date?: Maybe<Scalars['Date']>;
	Boolean?: Maybe<Scalars['Boolean']>;
	JSON?: Maybe<Scalars['JSON']>;
	GroupIds?: Maybe<Array<Scalars['ID']>>;
	UserGroup: UserListResponse;
	FileGroup: FileListResponse;
	RoleGroup: RoleListResponse;
	ApiTokenGroup: ApiTokenListResponse;
	EnvironmentVariableGroup: EnvironmentVariableListResponse;
	AuthenticationProfileGroup: AuthenticationProfileListResponse;
	TeamMemberGroup: TeamMemberListResponse;
	CiCdMigrationGroup: CiCdMigrationListResponse;
	ProjectGroup: ProjectListResponse;
	ConfigurationGroup: ConfigurationListResponse;
	IntegrationGroup: IntegrationListResponse;
	IntegrationDetailGroup: IntegrationDetailListResponse;
	SlackGroup: SlackListResponse;
	ActivityGroup: ActivityListResponse;
	UserStoryGroup: UserStoryListResponse;
	RecordingGroup: RecordingListResponse;
	EnvironmentGroup: EnvironmentListResponse;
	TestOutcomeGroup: TestOutcomeListResponse;
	TestRunGroup: TestRunListResponse;
	ReleaseGroup: ReleaseListResponse;
	AuthenticationTokenGroup: AuthenticationTokenListResponse;
	SeleniumScriptGroup: SeleniumScriptListResponse;
	SeleniumOpenGroup: SeleniumOpenListResponse;
	SeleniumSetViewportSizeGroup: SeleniumSetViewportSizeListResponse;
	SeleniumClickGroup: SeleniumClickListResponse;
	SeleniumTargetGroup: SeleniumTargetListResponse;
	SeleniumTypeGroup: SeleniumTypeListResponse;
	SeleniumDragndropGroup: SeleniumDragndropListResponse;
	SeleniumPointGroup: SeleniumPointListResponse;
	SeleniumCommandGroup: SeleniumCommandListResponse;
	SeleniumSelectorGroup: SeleniumSelectorListResponse;
	SeleniumGroupGroup: SeleniumGroupListResponse;
	ErrorGroup: ErrorListResponse;
	MetricGroup: MetricListResponse;
};

export type GroupByResponseUserGroupArgs = {
	filter?: Maybe<UserFilter>;
	orderBy?: Maybe<Array<Maybe<UserOrderBy>>>;
	sort?: Maybe<Array<UserSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<UserGroupBy>;
};

export type GroupByResponseFileGroupArgs = {
	filter?: Maybe<FileFilter>;
	orderBy?: Maybe<Array<Maybe<FileOrderBy>>>;
	sort?: Maybe<Array<FileSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<FileGroupBy>;
};

export type GroupByResponseRoleGroupArgs = {
	filter?: Maybe<RoleFilter>;
	orderBy?: Maybe<Array<Maybe<RoleOrderBy>>>;
	sort?: Maybe<Array<RoleSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RoleGroupBy>;
};

export type GroupByResponseApiTokenGroupArgs = {
	filter?: Maybe<ApiTokenFilter>;
	orderBy?: Maybe<Array<Maybe<ApiTokenOrderBy>>>;
	sort?: Maybe<Array<ApiTokenSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ApiTokenGroupBy>;
};

export type GroupByResponseEnvironmentVariableGroupArgs = {
	filter?: Maybe<EnvironmentVariableFilter>;
	orderBy?: Maybe<Array<Maybe<EnvironmentVariableOrderBy>>>;
	sort?: Maybe<Array<EnvironmentVariableSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<EnvironmentVariableGroupBy>;
};

export type GroupByResponseAuthenticationProfileGroupArgs = {
	filter?: Maybe<AuthenticationProfileFilter>;
	orderBy?: Maybe<Array<Maybe<AuthenticationProfileOrderBy>>>;
	sort?: Maybe<Array<AuthenticationProfileSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<AuthenticationProfileGroupBy>;
};

export type GroupByResponseTeamMemberGroupArgs = {
	filter?: Maybe<TeamMemberFilter>;
	orderBy?: Maybe<Array<Maybe<TeamMemberOrderBy>>>;
	sort?: Maybe<Array<TeamMemberSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TeamMemberGroupBy>;
};

export type GroupByResponseCiCdMigrationGroupArgs = {
	filter?: Maybe<CiCdMigrationFilter>;
	orderBy?: Maybe<Array<Maybe<CiCdMigrationOrderBy>>>;
	sort?: Maybe<Array<CiCdMigrationSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<CiCdMigrationGroupBy>;
};

export type GroupByResponseProjectGroupArgs = {
	filter?: Maybe<ProjectFilter>;
	orderBy?: Maybe<Array<Maybe<ProjectOrderBy>>>;
	sort?: Maybe<Array<ProjectSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ProjectGroupBy>;
};

export type GroupByResponseConfigurationGroupArgs = {
	filter?: Maybe<ConfigurationFilter>;
	orderBy?: Maybe<Array<Maybe<ConfigurationOrderBy>>>;
	sort?: Maybe<Array<ConfigurationSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ConfigurationGroupBy>;
};

export type GroupByResponseIntegrationGroupArgs = {
	filter?: Maybe<IntegrationFilter>;
	orderBy?: Maybe<Array<Maybe<IntegrationOrderBy>>>;
	sort?: Maybe<Array<IntegrationSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<IntegrationGroupBy>;
};

export type GroupByResponseIntegrationDetailGroupArgs = {
	filter?: Maybe<IntegrationDetailFilter>;
	orderBy?: Maybe<Array<Maybe<IntegrationDetailOrderBy>>>;
	sort?: Maybe<Array<IntegrationDetailSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<IntegrationDetailGroupBy>;
};

export type GroupByResponseSlackGroupArgs = {
	filter?: Maybe<SlackFilter>;
	orderBy?: Maybe<Array<Maybe<SlackOrderBy>>>;
	sort?: Maybe<Array<SlackSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SlackGroupBy>;
};

export type GroupByResponseActivityGroupArgs = {
	filter?: Maybe<ActivityFilter>;
	orderBy?: Maybe<Array<Maybe<ActivityOrderBy>>>;
	sort?: Maybe<Array<ActivitySort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ActivityGroupBy>;
};

export type GroupByResponseUserStoryGroupArgs = {
	filter?: Maybe<UserStoryFilter>;
	orderBy?: Maybe<Array<Maybe<UserStoryOrderBy>>>;
	sort?: Maybe<Array<UserStorySort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<UserStoryGroupBy>;
};

export type GroupByResponseRecordingGroupArgs = {
	filter?: Maybe<RecordingFilter>;
	orderBy?: Maybe<Array<Maybe<RecordingOrderBy>>>;
	sort?: Maybe<Array<RecordingSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RecordingGroupBy>;
};

export type GroupByResponseEnvironmentGroupArgs = {
	filter?: Maybe<EnvironmentFilter>;
	orderBy?: Maybe<Array<Maybe<EnvironmentOrderBy>>>;
	sort?: Maybe<Array<EnvironmentSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<EnvironmentGroupBy>;
};

export type GroupByResponseTestOutcomeGroupArgs = {
	filter?: Maybe<TestOutcomeFilter>;
	orderBy?: Maybe<Array<Maybe<TestOutcomeOrderBy>>>;
	sort?: Maybe<Array<TestOutcomeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TestOutcomeGroupBy>;
};

export type GroupByResponseTestRunGroupArgs = {
	filter?: Maybe<TestRunFilter>;
	orderBy?: Maybe<Array<Maybe<TestRunOrderBy>>>;
	sort?: Maybe<Array<TestRunSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TestRunGroupBy>;
};

export type GroupByResponseReleaseGroupArgs = {
	filter?: Maybe<ReleaseFilter>;
	orderBy?: Maybe<Array<Maybe<ReleaseOrderBy>>>;
	sort?: Maybe<Array<ReleaseSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ReleaseGroupBy>;
};

export type GroupByResponseAuthenticationTokenGroupArgs = {
	filter?: Maybe<AuthenticationTokenFilter>;
	orderBy?: Maybe<Array<Maybe<AuthenticationTokenOrderBy>>>;
	sort?: Maybe<Array<AuthenticationTokenSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<AuthenticationTokenGroupBy>;
};

export type GroupByResponseSeleniumScriptGroupArgs = {
	filter?: Maybe<SeleniumScriptFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumScriptOrderBy>>>;
	sort?: Maybe<Array<SeleniumScriptSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumScriptGroupBy>;
};

export type GroupByResponseSeleniumOpenGroupArgs = {
	filter?: Maybe<SeleniumOpenFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumOpenOrderBy>>>;
	sort?: Maybe<Array<SeleniumOpenSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumOpenGroupBy>;
};

export type GroupByResponseSeleniumSetViewportSizeGroupArgs = {
	filter?: Maybe<SeleniumSetViewportSizeFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumSetViewportSizeOrderBy>>>;
	sort?: Maybe<Array<SeleniumSetViewportSizeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumSetViewportSizeGroupBy>;
};

export type GroupByResponseSeleniumClickGroupArgs = {
	filter?: Maybe<SeleniumClickFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumClickOrderBy>>>;
	sort?: Maybe<Array<SeleniumClickSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumClickGroupBy>;
};

export type GroupByResponseSeleniumTargetGroupArgs = {
	filter?: Maybe<SeleniumTargetFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumTargetOrderBy>>>;
	sort?: Maybe<Array<SeleniumTargetSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumTargetGroupBy>;
};

export type GroupByResponseSeleniumTypeGroupArgs = {
	filter?: Maybe<SeleniumTypeFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumTypeOrderBy>>>;
	sort?: Maybe<Array<SeleniumTypeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumTypeGroupBy>;
};

export type GroupByResponseSeleniumDragndropGroupArgs = {
	filter?: Maybe<SeleniumDragndropFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumDragndropOrderBy>>>;
	sort?: Maybe<Array<SeleniumDragndropSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumDragndropGroupBy>;
};

export type GroupByResponseSeleniumPointGroupArgs = {
	filter?: Maybe<SeleniumPointFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumPointOrderBy>>>;
	sort?: Maybe<Array<SeleniumPointSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumPointGroupBy>;
};

export type GroupByResponseSeleniumCommandGroupArgs = {
	filter?: Maybe<SeleniumCommandFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumCommandOrderBy>>>;
	sort?: Maybe<Array<SeleniumCommandSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumCommandGroupBy>;
};

export type GroupByResponseSeleniumSelectorGroupArgs = {
	filter?: Maybe<SeleniumSelectorFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumSelectorOrderBy>>>;
	sort?: Maybe<Array<SeleniumSelectorSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumSelectorGroupBy>;
};

export type GroupByResponseSeleniumGroupGroupArgs = {
	filter?: Maybe<SeleniumGroupFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumGroupOrderBy>>>;
	sort?: Maybe<Array<SeleniumGroupSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumGroupGroupBy>;
};

export type GroupByResponseErrorGroupArgs = {
	filter?: Maybe<ErrorFilter>;
	orderBy?: Maybe<Array<Maybe<ErrorOrderBy>>>;
	sort?: Maybe<Array<ErrorSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ErrorGroupBy>;
};

export type GroupByResponseMetricGroupArgs = {
	filter?: Maybe<MetricFilter>;
	orderBy?: Maybe<Array<Maybe<MetricOrderBy>>>;
	sort?: Maybe<Array<MetricSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<MetricGroupBy>;
};

export type GroupBySort = {
	alias: Scalars['String'];
	direction: SortOrder;
};

export type GroupIdentifiersGroupByField = {
	as: Scalars['String'];
};

/** SeleniumScript create input from groups */
export type Groups_SeleniumScriptCreateInput = {
	version: Scalars['String'];
	recording?: Maybe<SeleniumScriptRecordingRelationInput>;
	groups?: Maybe<SeleniumScriptGroupsRelationInput>;
};

/** SeleniumScript update input from groups */
export type Groups_SeleniumScriptUpdateInput = {
	version?: Maybe<Scalars['String']>;
	recording?: Maybe<SeleniumScriptRecordingUpdateRelationInput>;
	groups?: Maybe<SeleniumScriptGroupsUpdateRelationInput>;
};

export type Having = {
	alias?: Maybe<Scalars['String']>;
	id?: Maybe<IdPredicateHaving>;
	string?: Maybe<StringPredicateHaving>;
	int?: Maybe<IntPredicateHaving>;
	bigint?: Maybe<BigIntPredicateHaving>;
	float?: Maybe<FloatPredicateHaving>;
	bool?: Maybe<BoolPredicateHaving>;
	date?: Maybe<DatePredicateHaving>;
	datetime?: Maybe<DateTimePredicateHaving>;
	AND?: Maybe<Array<Having>>;
	OR?: Maybe<Array<Having>>;
};

export type IdPredicate = {
	equals?: Maybe<Scalars['ID']>;
	not_equals?: Maybe<Scalars['ID']>;
	in?: Maybe<Array<Scalars['ID']>>;
	not_in?: Maybe<Array<Scalars['ID']>>;
	contains?: Maybe<Scalars['ID']>;
	not_contains?: Maybe<Scalars['ID']>;
	starts_with?: Maybe<Scalars['ID']>;
	not_starts_with?: Maybe<Scalars['ID']>;
	ends_with?: Maybe<Scalars['ID']>;
	not_ends_with?: Maybe<Scalars['ID']>;
	lt?: Maybe<Scalars['ID']>;
	lte?: Maybe<Scalars['ID']>;
	gt?: Maybe<Scalars['ID']>;
	gte?: Maybe<Scalars['ID']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
};

export type IdPredicateHaving = {
	equals?: Maybe<Scalars['ID']>;
	not_equals?: Maybe<Scalars['ID']>;
	in?: Maybe<Array<Scalars['ID']>>;
	not_in?: Maybe<Array<Scalars['ID']>>;
	contains?: Maybe<Scalars['ID']>;
	not_contains?: Maybe<Scalars['ID']>;
	starts_with?: Maybe<Scalars['ID']>;
	not_starts_with?: Maybe<Scalars['ID']>;
	ends_with?: Maybe<Scalars['ID']>;
	not_ends_with?: Maybe<Scalars['ID']>;
	lt?: Maybe<Scalars['ID']>;
	lte?: Maybe<Scalars['ID']>;
	gt?: Maybe<Scalars['ID']>;
	gte?: Maybe<Scalars['ID']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	AND?: Maybe<Array<IdPredicateHaving>>;
	OR?: Maybe<Array<IdPredicateHaving>>;
};

/** ImportedTable */
export type ImportedTable = {
	__typename?: 'ImportedTable';
	id: Scalars['ID'];
	name: Scalars['String'];
};

/** Table Create Index Input */
export type IndexCreateInput = {
	tableId: Scalars['ID'];
	type: TableIndexType;
	columns: Array<TableIndexColumnInput>;
	force?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['String']>;
};

/** Table Delete Index Input */
export type IndexDeleteInput = {
	id: Scalars['ID'];
};

/** Table Update Index Input */
export type IndexUpdateInput = {
	id: Scalars['ID'];
	type?: Maybe<TableIndexType>;
	columns?: Maybe<Array<TableIndexColumnInput>>;
	force?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['String']>;
};

/** This table stores information and settings necessary for CI, project management, and slack integrations. */
export type Integration = {
	__typename?: 'Integration';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationDetail>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationDetail>;
	slack?: Maybe<Slack>;
	project?: Maybe<Project>;
	_description?: Maybe<Scalars['String']>;
};

/** IntegrationDetails create input from integration */
export type Integration_IntegrationDetailCreateInput = {
	authenticated?: Maybe<Scalars['Boolean']>;
	accessToken?: Maybe<Scalars['String']>;
	integration?: Maybe<IntegrationDetailsIntegrationRelationInput>;
	projectManagement?: Maybe<IntegrationDetailsProjectManagementRelationInput>;
};

/** IntegrationDetails update input from integration */
export type Integration_IntegrationDetailUpdateInput = {
	authenticated?: Maybe<Scalars['Boolean']>;
	accessToken?: Maybe<Scalars['String']>;
	integration?: Maybe<IntegrationDetailsIntegrationUpdateRelationInput>;
	projectManagement?: Maybe<IntegrationDetailsProjectManagementUpdateRelationInput>;
};

export type Integration_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	continuousIntegrationProvider?: Maybe<StringPredicate>;
	projectManagementProvider?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	continuousIntegration?: Maybe<IntegrationDetail_PermissionFilter>;
	projectManagement?: Maybe<IntegrationDetail_PermissionFilter>;
	slack?: Maybe<Slack_PermissionFilter>;
	project?: Maybe<Project_PermissionFilter>;
	AND?: Maybe<Array<Integration_PermissionFilter>>;
	OR?: Maybe<Array<Integration_PermissionFilter>>;
};

export type Integration_PermissionRelationFilter = {
	some?: Maybe<Integration_PermissionFilter>;
	every?: Maybe<Integration_PermissionFilter>;
	none?: Maybe<Integration_PermissionFilter>;
};

/** Project create input from integration */
export type Integration_ProjectCreateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarRelationInput>;
	release?: Maybe<ProjectReleaseRelationInput>;
	configuration?: Maybe<ProjectConfigurationRelationInput>;
	integration?: Maybe<ProjectIntegrationRelationInput>;
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsRelationInput>;
};

/** Project update input from integration */
export type Integration_ProjectUpdateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarUpdateRelationInput>;
	release?: Maybe<ProjectReleaseUpdateRelationInput>;
	configuration?: Maybe<ProjectConfigurationUpdateRelationInput>;
	integration?: Maybe<ProjectIntegrationUpdateRelationInput>;
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

/** Integration relation input */
export type IntegrationContinuousIntegrationManyRelationInput = {
	connect?: Maybe<IntegrationDetailKeyFilter>;
};

/** Integration relation input */
export type IntegrationContinuousIntegrationRelationInput = {
	connect?: Maybe<IntegrationDetailKeyFilter>;
	create?: Maybe<Integration_IntegrationDetailCreateInput>;
};

/** Integration relation input */
export type IntegrationContinuousIntegrationUpdateRelationInput = {
	connect?: Maybe<IntegrationDetailKeyFilter>;
	disconnect?: Maybe<IntegrationDetailKeyFilter>;
	reconnect?: Maybe<IntegrationDetailKeyFilter>;
	create?: Maybe<Integration_IntegrationDetailCreateInput>;
	update?: Maybe<Integration_IntegrationDetailUpdateInput>;
};

/** Integration create input */
export type IntegrationCreateInput = {
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementRelationInput>;
	slack?: Maybe<IntegrationSlackRelationInput>;
	project?: Maybe<IntegrationProjectRelationInput>;
};

/** Integration create many input */
export type IntegrationCreateManyInput = {
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationManyRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementManyRelationInput>;
	slack?: Maybe<IntegrationSlackManyRelationInput>;
	project: IntegrationProjectManyRelationInput;
};

/** Integration delete input */
export type IntegrationDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** Storing access information for integrations. */
export type IntegrationDetail = {
	__typename?: 'IntegrationDetail';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	authenticated?: Maybe<Scalars['Boolean']>;
	accessToken?: Maybe<Scalars['String']>;
	integration?: Maybe<Integration>;
	projectManagement?: Maybe<Integration>;
	_description?: Maybe<Scalars['String']>;
};

export type IntegrationDetail_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	authenticated?: Maybe<BoolPredicate>;
	accessToken?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	integration?: Maybe<Integration_PermissionFilter>;
	projectManagement?: Maybe<Integration_PermissionFilter>;
	AND?: Maybe<Array<IntegrationDetail_PermissionFilter>>;
	OR?: Maybe<Array<IntegrationDetail_PermissionFilter>>;
};

/** IntegrationDetails create input */
export type IntegrationDetailCreateInput = {
	authenticated?: Maybe<Scalars['Boolean']>;
	accessToken?: Maybe<Scalars['String']>;
	integration?: Maybe<IntegrationDetailsIntegrationRelationInput>;
	projectManagement?: Maybe<IntegrationDetailsProjectManagementRelationInput>;
};

/** IntegrationDetails create many input */
export type IntegrationDetailCreateManyInput = {
	authenticated?: Maybe<Scalars['Boolean']>;
	accessToken?: Maybe<Scalars['String']>;
	integration?: Maybe<IntegrationDetailsIntegrationManyRelationInput>;
	projectManagement?: Maybe<IntegrationDetailsProjectManagementManyRelationInput>;
};

/** IntegrationDetails delete input */
export type IntegrationDetailDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** IntegrationDetailFieldsPermissions create input */
export type IntegrationDetailFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	authenticated?: Maybe<Scalars['Boolean']>;
	accessToken?: Maybe<Scalars['Boolean']>;
};

export type IntegrationDetailFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	authenticated?: Maybe<BoolPredicate>;
	accessToken?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	integration?: Maybe<IntegrationFilter>;
	projectManagement?: Maybe<IntegrationFilter>;
	AND?: Maybe<Array<IntegrationDetailFilter>>;
	OR?: Maybe<Array<IntegrationDetailFilter>>;
};

export type IntegrationDetailGroupBy = {
	query: IntegrationDetailGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type IntegrationDetailGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	authenticated?: Maybe<Array<GroupByField>>;
	accessToken?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	integration?: Maybe<IntegrationGroupByQuery>;
	projectManagement?: Maybe<IntegrationGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type IntegrationDetailKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** IntegrationDetailListResponse output */
export type IntegrationDetailListResponse = {
	__typename?: 'IntegrationDetailListResponse';
	/** List items */
	items: Array<IntegrationDetail>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** IntegrationDetailManyResponse output */
export type IntegrationDetailManyResponse = {
	__typename?: 'IntegrationDetailManyResponse';
	/** List items */
	items: Array<IntegrationDetail>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum IntegrationDetailOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	AuthenticatedAsc = 'authenticated_ASC',
	AuthenticatedDesc = 'authenticated_DESC',
	AccessTokenAsc = 'accessToken_ASC',
	AccessTokenDesc = 'accessToken_DESC',
}

/** IntegrationDetails subscription payload */
export type IntegrationDetailPayload = {
	__typename?: 'IntegrationDetailPayload';
	mutation: MutationType;
	node?: Maybe<IntegrationDetail>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<IntegrationDetail>;
};

/** IntegrationDetails relation input */
export type IntegrationDetailsIntegrationManyRelationInput = {
	connect?: Maybe<IntegrationKeyFilter>;
};

/** IntegrationDetails relation input */
export type IntegrationDetailsIntegrationRelationInput = {
	connect?: Maybe<IntegrationKeyFilter>;
	create?: Maybe<ContinuousIntegration_IntegrationCreateInput>;
};

/** IntegrationDetails relation input */
export type IntegrationDetailsIntegrationUpdateRelationInput = {
	connect?: Maybe<IntegrationKeyFilter>;
	disconnect?: Maybe<IntegrationKeyFilter>;
	reconnect?: Maybe<IntegrationKeyFilter>;
	create?: Maybe<ContinuousIntegration_IntegrationCreateInput>;
	update?: Maybe<ContinuousIntegration_IntegrationUpdateInput>;
};

export type IntegrationDetailSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	authenticated?: Maybe<SortOrder>;
	accessToken?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	integration?: Maybe<IntegrationSort>;
	projectManagement?: Maybe<IntegrationSort>;
};

/** IntegrationDetails relation input */
export type IntegrationDetailsProjectManagementManyRelationInput = {
	connect?: Maybe<IntegrationKeyFilter>;
};

/** IntegrationDetails relation input */
export type IntegrationDetailsProjectManagementRelationInput = {
	connect?: Maybe<IntegrationKeyFilter>;
	create?: Maybe<ProjectManagement_IntegrationCreateInput>;
};

/** IntegrationDetails relation input */
export type IntegrationDetailsProjectManagementUpdateRelationInput = {
	connect?: Maybe<IntegrationKeyFilter>;
	disconnect?: Maybe<IntegrationKeyFilter>;
	reconnect?: Maybe<IntegrationKeyFilter>;
	create?: Maybe<ProjectManagement_IntegrationCreateInput>;
	update?: Maybe<ProjectManagement_IntegrationUpdateInput>;
};

/** IntegrationDetails subscription filter */
export type IntegrationDetailSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<IntegrationDetailFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** IntegrationDetails update input */
export type IntegrationDetailUpdateByFilterInput = {
	authenticated?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	accessToken?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** IntegrationDetails update input */
export type IntegrationDetailUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	authenticated?: Maybe<Scalars['Boolean']>;
	accessToken?: Maybe<Scalars['String']>;
	integration?: Maybe<IntegrationDetailsIntegrationUpdateRelationInput>;
	projectManagement?: Maybe<IntegrationDetailsProjectManagementUpdateRelationInput>;
};

/** IntegrationFieldsPermissions create input */
export type IntegrationFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	continuousIntegrationProvider?: Maybe<Scalars['Boolean']>;
	projectManagementProvider?: Maybe<Scalars['Boolean']>;
};

export type IntegrationFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	continuousIntegrationProvider?: Maybe<StringPredicate>;
	projectManagementProvider?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	continuousIntegration?: Maybe<IntegrationDetailFilter>;
	projectManagement?: Maybe<IntegrationDetailFilter>;
	slack?: Maybe<SlackFilter>;
	project?: Maybe<ProjectFilter>;
	AND?: Maybe<Array<IntegrationFilter>>;
	OR?: Maybe<Array<IntegrationFilter>>;
};

export type IntegrationGroupBy = {
	query: IntegrationGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type IntegrationGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	continuousIntegrationProvider?: Maybe<Array<GroupByField>>;
	projectManagementProvider?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	continuousIntegration?: Maybe<IntegrationDetailGroupByQuery>;
	projectManagement?: Maybe<IntegrationDetailGroupByQuery>;
	slack?: Maybe<SlackGroupByQuery>;
	project?: Maybe<ProjectGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type IntegrationKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** IntegrationListResponse output */
export type IntegrationListResponse = {
	__typename?: 'IntegrationListResponse';
	/** List items */
	items: Array<Integration>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** IntegrationManyResponse output */
export type IntegrationManyResponse = {
	__typename?: 'IntegrationManyResponse';
	/** List items */
	items: Array<Integration>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum IntegrationOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	ContinuousIntegrationProviderAsc = 'continuousIntegrationProvider_ASC',
	ContinuousIntegrationProviderDesc = 'continuousIntegrationProvider_DESC',
	ProjectManagementProviderAsc = 'projectManagementProvider_ASC',
	ProjectManagementProviderDesc = 'projectManagementProvider_DESC',
}

/** Integration subscription payload */
export type IntegrationPayload = {
	__typename?: 'IntegrationPayload';
	mutation: MutationType;
	node?: Maybe<Integration>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Integration>;
};

/** Integration relation input */
export type IntegrationProjectManagementManyRelationInput = {
	connect?: Maybe<IntegrationDetailKeyFilter>;
};

/** Integration relation input */
export type IntegrationProjectManagementRelationInput = {
	connect?: Maybe<IntegrationDetailKeyFilter>;
	create?: Maybe<ProjectManagement_IntegrationDetailCreateInput>;
};

/** Integration relation input */
export type IntegrationProjectManagementUpdateRelationInput = {
	connect?: Maybe<IntegrationDetailKeyFilter>;
	disconnect?: Maybe<IntegrationDetailKeyFilter>;
	reconnect?: Maybe<IntegrationDetailKeyFilter>;
	create?: Maybe<ProjectManagement_IntegrationDetailCreateInput>;
	update?: Maybe<ProjectManagement_IntegrationDetailUpdateInput>;
};

/** Integration relation input */
export type IntegrationProjectManyRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
};

/** Integration relation input */
export type IntegrationProjectRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<Integration_ProjectCreateInput>;
};

/** Integration relation input */
export type IntegrationProjectUpdateRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	disconnect?: Maybe<ProjectKeyFilter>;
	reconnect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<Integration_ProjectCreateInput>;
	update?: Maybe<Integration_ProjectUpdateInput>;
};

export type IntegrationRelationFilter = {
	some?: Maybe<IntegrationFilter>;
	every?: Maybe<IntegrationFilter>;
	none?: Maybe<IntegrationFilter>;
};

/** Integration relation input */
export type IntegrationSlackManyRelationInput = {
	connect?: Maybe<SlackKeyFilter>;
};

/** Integration relation input */
export type IntegrationSlackRelationInput = {
	connect?: Maybe<SlackKeyFilter>;
	create?: Maybe<Slack_SlackCreateInput>;
};

/** Integration relation input */
export type IntegrationSlackUpdateRelationInput = {
	connect?: Maybe<SlackKeyFilter>;
	disconnect?: Maybe<SlackKeyFilter>;
	reconnect?: Maybe<SlackKeyFilter>;
	create?: Maybe<Slack_SlackCreateInput>;
	update?: Maybe<Slack_SlackUpdateInput>;
};

export type IntegrationSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	continuousIntegrationProvider?: Maybe<SortOrder>;
	projectManagementProvider?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	continuousIntegration?: Maybe<IntegrationDetailSort>;
	projectManagement?: Maybe<IntegrationDetailSort>;
	slack?: Maybe<SlackSort>;
	project?: Maybe<ProjectSort>;
};

/** Integration subscription filter */
export type IntegrationSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<IntegrationFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Integration update input */
export type IntegrationUpdateByFilterInput = {
	continuousIntegrationProvider?: Maybe<
		Array<Maybe<UpdateByFilterStringSwitchInput>>
	>;
	projectManagementProvider?: Maybe<
		Array<Maybe<UpdateByFilterStringSwitchInput>>
	>;
};

/** Integration update input */
export type IntegrationUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationUpdateRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementUpdateRelationInput>;
	slack?: Maybe<IntegrationSlackUpdateRelationInput>;
	project?: Maybe<IntegrationProjectUpdateRelationInput>;
};

export type IntPredicate = {
	equals?: Maybe<Scalars['Int']>;
	not_equals?: Maybe<Scalars['Int']>;
	in?: Maybe<Array<Scalars['Int']>>;
	not_in?: Maybe<Array<Scalars['Int']>>;
	lt?: Maybe<Scalars['Int']>;
	lte?: Maybe<Scalars['Int']>;
	gt?: Maybe<Scalars['Int']>;
	gte?: Maybe<Scalars['Int']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
};

export type IntPredicateHaving = {
	equals?: Maybe<Scalars['Int']>;
	not_equals?: Maybe<Scalars['Int']>;
	in?: Maybe<Array<Scalars['Int']>>;
	not_in?: Maybe<Array<Scalars['Int']>>;
	lt?: Maybe<Scalars['Int']>;
	lte?: Maybe<Scalars['Int']>;
	gt?: Maybe<Scalars['Int']>;
	gte?: Maybe<Scalars['Int']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	AND?: Maybe<Array<IntPredicateHaving>>;
	OR?: Maybe<Array<IntPredicateHaving>>;
};

export type IntrospectionQueryResponse = {
	__typename?: 'IntrospectionQueryResponse';
	url: Scalars['String'];
};

/** Invited By Name */
export type InvitedByName = {
	__typename?: 'InvitedByName';
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	workspaceName?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
};

/** InviteMembersInput */
export type InviteMembersInput = {
	recipients: Array<InviteRecipientInput>;
};

/** InviteRecipientInput */
export type InviteRecipientInput = {
	email: Scalars['String'];
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	roles?: Maybe<Array<Scalars['ID']>>;
};

/** InvokeData */
export type InvokeData = {
	functionName: Scalars['String'];
	inputArgs?: Maybe<Scalars['String']>;
};

/** InvokeFunctionResponse */
export type InvokeFunctionResponse = {
	__typename?: 'InvokeFunctionResponse';
	responseData: Scalars['String'];
};

export type LocateFunctionArguments = {
	str: Scalars['String'];
	pos?: Maybe<Scalars['Int']>;
};

/** Configuration create input from logInFlow */
export type LogInFlow_ConfigurationCreateInput = {
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink: Scalars['String'];
	project?: Maybe<ConfigurationProjectRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensRelationInput>;
	logInFlow?: Maybe<ConfigurationLogInFlowRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
};

/** Configuration update input from logInFlow */
export type LogInFlow_ConfigurationUpdateInput = {
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<ConfigurationProjectUpdateRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensUpdateRelationInput>;
	logInFlow?: Maybe<ConfigurationLogInFlowUpdateRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
};

/** LoginResponse */
export type LoginResponse = {
	__typename?: 'LoginResponse';
	success?: Maybe<Scalars['Boolean']>;
	auth?: Maybe<Auth>;
	workspaces?: Maybe<Array<WorkspaceInfo>>;
};

/** Project create input from members */
export type Members_ProjectCreateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarRelationInput>;
	release?: Maybe<ProjectReleaseRelationInput>;
	configuration?: Maybe<ProjectConfigurationRelationInput>;
	integration?: Maybe<ProjectIntegrationRelationInput>;
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsRelationInput>;
};

/** Project update input from members */
export type Members_ProjectUpdateInput = {
	filter?: Maybe<ProjectKeyFilter>;
	data: ProjectUpdateInput;
};

/** This is an internal table calculating performance metrics of user story generation algos. */
export type Metric = {
	__typename?: 'Metric';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	/** The average number of steps in a user story. */
	storyLengthMean?: Maybe<Scalars['Float']>;
	/**
	 * The middle count of steps in a user story. There is equal probability that a
	 * user story will have less steps and more steps.
	 */
	storyLengthMedian?: Maybe<Scalars['Float']>;
	/** The minimum number of steps created for a user story. */
	storyLengthMin?: Maybe<Scalars['Int']>;
	/** The maximum number of steps created for a user story. */
	storyLengthMax?: Maybe<Scalars['Int']>;
	/** The number of flows that created new user stories. */
	createdFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that were updating existing user stories. */
	updatedFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that didn't get created or assigned to a user story. */
	ignoredFlows?: Maybe<Scalars['Int']>;
	project?: Maybe<Project>;
	/** Metrics are calculated daily, this represents that day. The value for March 4th, 2021 would be "03/04/2021". */
	calculatedFor?: Maybe<Scalars['Date']>;
	_description?: Maybe<Scalars['String']>;
};

export type Metric_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	storyLengthMean?: Maybe<FloatPredicate>;
	storyLengthMedian?: Maybe<FloatPredicate>;
	storyLengthMin?: Maybe<IntPredicate>;
	storyLengthMax?: Maybe<IntPredicate>;
	createdFlows?: Maybe<IntPredicate>;
	updatedFlows?: Maybe<IntPredicate>;
	ignoredFlows?: Maybe<IntPredicate>;
	calculatedFor?: Maybe<DatePredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	project?: Maybe<Project_PermissionFilter>;
	AND?: Maybe<Array<Metric_PermissionFilter>>;
	OR?: Maybe<Array<Metric_PermissionFilter>>;
};

export type Metric_PermissionRelationFilter = {
	some?: Maybe<Metric_PermissionFilter>;
	every?: Maybe<Metric_PermissionFilter>;
	none?: Maybe<Metric_PermissionFilter>;
};

/** Metrics create input */
export type MetricCreateInput = {
	/** The average number of steps in a user story. */
	storyLengthMean?: Maybe<Scalars['Float']>;
	/**
	 * The middle count of steps in a user story. There is equal probability that a
	 * user story will have less steps and more steps.
	 */
	storyLengthMedian?: Maybe<Scalars['Float']>;
	/** The minimum number of steps created for a user story. */
	storyLengthMin?: Maybe<Scalars['Int']>;
	/** The maximum number of steps created for a user story. */
	storyLengthMax?: Maybe<Scalars['Int']>;
	/** The number of flows that created new user stories. */
	createdFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that were updating existing user stories. */
	updatedFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that didn't get created or assigned to a user story. */
	ignoredFlows?: Maybe<Scalars['Int']>;
	project?: Maybe<MetricsProjectRelationInput>;
	/** Metrics are calculated daily, this represents that day. The value for March 4th, 2021 would be "03/04/2021". */
	calculatedFor?: Maybe<Scalars['Date']>;
};

/** Metrics create many input */
export type MetricCreateManyInput = {
	/** The average number of steps in a user story. */
	storyLengthMean?: Maybe<Scalars['Float']>;
	/**
	 * The middle count of steps in a user story. There is equal probability that a
	 * user story will have less steps and more steps.
	 */
	storyLengthMedian?: Maybe<Scalars['Float']>;
	/** The minimum number of steps created for a user story. */
	storyLengthMin?: Maybe<Scalars['Int']>;
	/** The maximum number of steps created for a user story. */
	storyLengthMax?: Maybe<Scalars['Int']>;
	/** The number of flows that created new user stories. */
	createdFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that were updating existing user stories. */
	updatedFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that didn't get created or assigned to a user story. */
	ignoredFlows?: Maybe<Scalars['Int']>;
	project: MetricsProjectManyRelationInput;
	/** Metrics are calculated daily, this represents that day. The value for March 4th, 2021 would be "03/04/2021". */
	calculatedFor?: Maybe<Scalars['Date']>;
};

/** Metrics delete input */
export type MetricDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** MetricFieldsPermissions create input */
export type MetricFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	storyLengthMean?: Maybe<Scalars['Boolean']>;
	storyLengthMedian?: Maybe<Scalars['Boolean']>;
	storyLengthMin?: Maybe<Scalars['Boolean']>;
	storyLengthMax?: Maybe<Scalars['Boolean']>;
	createdFlows?: Maybe<Scalars['Boolean']>;
	updatedFlows?: Maybe<Scalars['Boolean']>;
	ignoredFlows?: Maybe<Scalars['Boolean']>;
	calculatedFor?: Maybe<Scalars['Boolean']>;
};

export type MetricFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	storyLengthMean?: Maybe<FloatPredicate>;
	storyLengthMedian?: Maybe<FloatPredicate>;
	storyLengthMin?: Maybe<IntPredicate>;
	storyLengthMax?: Maybe<IntPredicate>;
	createdFlows?: Maybe<IntPredicate>;
	updatedFlows?: Maybe<IntPredicate>;
	ignoredFlows?: Maybe<IntPredicate>;
	calculatedFor?: Maybe<DatePredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	project?: Maybe<ProjectFilter>;
	AND?: Maybe<Array<MetricFilter>>;
	OR?: Maybe<Array<MetricFilter>>;
};

export type MetricGroupBy = {
	query: MetricGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type MetricGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	storyLengthMean?: Maybe<Array<GroupByField>>;
	storyLengthMedian?: Maybe<Array<GroupByField>>;
	storyLengthMin?: Maybe<Array<GroupByField>>;
	storyLengthMax?: Maybe<Array<GroupByField>>;
	createdFlows?: Maybe<Array<GroupByField>>;
	updatedFlows?: Maybe<Array<GroupByField>>;
	ignoredFlows?: Maybe<Array<GroupByField>>;
	calculatedFor?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	project?: Maybe<ProjectGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type MetricKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** MetricListResponse output */
export type MetricListResponse = {
	__typename?: 'MetricListResponse';
	/** List items */
	items: Array<Metric>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** MetricManyResponse output */
export type MetricManyResponse = {
	__typename?: 'MetricManyResponse';
	/** List items */
	items: Array<Metric>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum MetricOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	StoryLengthMeanAsc = 'storyLengthMean_ASC',
	StoryLengthMeanDesc = 'storyLengthMean_DESC',
	StoryLengthMedianAsc = 'storyLengthMedian_ASC',
	StoryLengthMedianDesc = 'storyLengthMedian_DESC',
	StoryLengthMinAsc = 'storyLengthMin_ASC',
	StoryLengthMinDesc = 'storyLengthMin_DESC',
	StoryLengthMaxAsc = 'storyLengthMax_ASC',
	StoryLengthMaxDesc = 'storyLengthMax_DESC',
	CreatedFlowsAsc = 'createdFlows_ASC',
	CreatedFlowsDesc = 'createdFlows_DESC',
	UpdatedFlowsAsc = 'updatedFlows_ASC',
	UpdatedFlowsDesc = 'updatedFlows_DESC',
	IgnoredFlowsAsc = 'ignoredFlows_ASC',
	IgnoredFlowsDesc = 'ignoredFlows_DESC',
	CalculatedForAsc = 'calculatedFor_ASC',
	CalculatedForDesc = 'calculatedFor_DESC',
}

/** Metrics subscription payload */
export type MetricPayload = {
	__typename?: 'MetricPayload';
	mutation: MutationType;
	node?: Maybe<Metric>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Metric>;
};

export type MetricRelationFilter = {
	some?: Maybe<MetricFilter>;
	every?: Maybe<MetricFilter>;
	none?: Maybe<MetricFilter>;
};

/** Project create input from metrics */
export type Metrics_ProjectCreateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarRelationInput>;
	release?: Maybe<ProjectReleaseRelationInput>;
	configuration?: Maybe<ProjectConfigurationRelationInput>;
	integration?: Maybe<ProjectIntegrationRelationInput>;
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsRelationInput>;
};

/** Project update input from metrics */
export type Metrics_ProjectUpdateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarUpdateRelationInput>;
	release?: Maybe<ProjectReleaseUpdateRelationInput>;
	configuration?: Maybe<ProjectConfigurationUpdateRelationInput>;
	integration?: Maybe<ProjectIntegrationUpdateRelationInput>;
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

export type MetricSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	storyLengthMean?: Maybe<SortOrder>;
	storyLengthMedian?: Maybe<SortOrder>;
	storyLengthMin?: Maybe<SortOrder>;
	storyLengthMax?: Maybe<SortOrder>;
	createdFlows?: Maybe<SortOrder>;
	updatedFlows?: Maybe<SortOrder>;
	ignoredFlows?: Maybe<SortOrder>;
	calculatedFor?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	project?: Maybe<ProjectSort>;
};

/** Metrics relation input */
export type MetricsProjectManyRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
};

/** Metrics relation input */
export type MetricsProjectRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<Metrics_ProjectCreateInput>;
};

/** Metrics relation input */
export type MetricsProjectUpdateRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	disconnect?: Maybe<ProjectKeyFilter>;
	reconnect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<Metrics_ProjectCreateInput>;
	update?: Maybe<Metrics_ProjectUpdateInput>;
};

/** Metrics subscription filter */
export type MetricSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<MetricFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Metrics update input */
export type MetricUpdateByFilterInput = {
	storyLengthMean?: Maybe<Array<Maybe<UpdateByFilterFloatInput>>>;
	storyLengthMedian?: Maybe<Array<Maybe<UpdateByFilterFloatInput>>>;
	storyLengthMin?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	storyLengthMax?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	createdFlows?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	updatedFlows?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	ignoredFlows?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	calculatedFor?: Maybe<Array<Maybe<UpdateByFilterDateInput>>>;
};

/** Metrics update input */
export type MetricUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/** The average number of steps in a user story. */
	storyLengthMean?: Maybe<Scalars['Float']>;
	/**
	 * The middle count of steps in a user story. There is equal probability that a
	 * user story will have less steps and more steps.
	 */
	storyLengthMedian?: Maybe<Scalars['Float']>;
	/** The minimum number of steps created for a user story. */
	storyLengthMin?: Maybe<Scalars['Int']>;
	/** The maximum number of steps created for a user story. */
	storyLengthMax?: Maybe<Scalars['Int']>;
	/** The number of flows that created new user stories. */
	createdFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that were updating existing user stories. */
	updatedFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that didn't get created or assigned to a user story. */
	ignoredFlows?: Maybe<Scalars['Int']>;
	project?: Maybe<MetricsProjectUpdateRelationInput>;
	/** Metrics are calculated daily, this represents that day. The value for March 4th, 2021 would be "03/04/2021". */
	calculatedFor?: Maybe<Scalars['Date']>;
};

/** MissingRelation */
export type MissingRelation = {
	__typename?: 'MissingRelation';
	table: Scalars['String'];
};

/** MissingRelation Field Attributes */
export type MissingRelationFieldTypeAttributes = {
	__typename?: 'MissingRelationFieldTypeAttributes';
	missingTable: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	activityCreate: Activity;
	activityCreateMany: ActivityManyResponse;
	activityDelete?: Maybe<SuccessResponse>;
	activityDeleteByFilter?: Maybe<SuccessResponse>;
	activityDestroy?: Maybe<SuccessResponse>;
	activityDestroyByFilter?: Maybe<SuccessResponse>;
	activityRestore: Activity;
	activityUpdate: Activity;
	activityUpdateByFilter: ActivityManyResponse;
	apiTokenCreate: ApiTokenResponse;
	apiTokenDelete?: Maybe<SuccessResponse>;
	apiTokenDeleteByFilter?: Maybe<SuccessResponse>;
	apiTokenDestroy?: Maybe<SuccessResponse>;
	apiTokenDestroyByFilter?: Maybe<SuccessResponse>;
	apiTokenRestore: ApiToken;
	apiTokenUpdate: ApiToken;
	apiTokenUpdateByFilter: ApiTokenManyResponse;
	/** @deprecated No longer supported. Use `system.applicationDelete` instead. */
	applicationDelete?: Maybe<SuccessResponse>;
	/** @deprecated No longer supported. Use `system.applicationInstall` instead. */
	applicationInstall?: Maybe<Application>;
	/** @deprecated No longer supported. Use `system.applicationUpdate` instead. */
	applicationUpdate?: Maybe<Application>;
	authenticationProfileCreate: AuthenticationProfile;
	authenticationProfileCreateMany: AuthenticationProfileManyResponse;
	authenticationProfileDelete?: Maybe<SuccessResponse>;
	authenticationProfileDeleteByFilter?: Maybe<SuccessResponse>;
	authenticationProfileDestroy?: Maybe<SuccessResponse>;
	authenticationProfileDestroyByFilter?: Maybe<SuccessResponse>;
	authenticationProfileRestore: AuthenticationProfile;
	authenticationProfileUpdate: AuthenticationProfile;
	authenticationProfileUpdateByFilter: AuthenticationProfileManyResponse;
	authenticationSettingsUpdate: AuthenticationSetting;
	authenticationTokenCreate: AuthenticationToken;
	authenticationTokenCreateMany: AuthenticationTokenManyResponse;
	authenticationTokenDelete?: Maybe<SuccessResponse>;
	authenticationTokenDeleteByFilter?: Maybe<SuccessResponse>;
	authenticationTokenDestroy?: Maybe<SuccessResponse>;
	authenticationTokenDestroyByFilter?: Maybe<SuccessResponse>;
	authenticationTokenRestore: AuthenticationToken;
	authenticationTokenUpdate: AuthenticationToken;
	authenticationTokenUpdateByFilter: AuthenticationTokenManyResponse;
	billingDetailsUpdate?: Maybe<BillingDetailsResponse>;
	/** @deprecated No longer supported. Use `system.billingPlanUpdate` instead. */
	billingPlanUpdate?: Maybe<BillingCurrentPlanResponse>;
	ciCdMigrationCreate: CiCdMigration;
	ciCdMigrationCreateMany: CiCdMigrationManyResponse;
	ciCdMigrationDelete?: Maybe<SuccessResponse>;
	ciCdMigrationDeleteByFilter?: Maybe<SuccessResponse>;
	ciCdMigrationDestroy?: Maybe<SuccessResponse>;
	ciCdMigrationDestroyByFilter?: Maybe<SuccessResponse>;
	ciCdMigrationRestore: CiCdMigration;
	ciCdMigrationUpdate: CiCdMigration;
	ciCdMigrationUpdateByFilter: CiCdMigrationManyResponse;
	configurationCreate: Configuration;
	configurationCreateMany: ConfigurationManyResponse;
	configurationDelete?: Maybe<SuccessResponse>;
	configurationDeleteByFilter?: Maybe<SuccessResponse>;
	configurationDestroy?: Maybe<SuccessResponse>;
	configurationDestroyByFilter?: Maybe<SuccessResponse>;
	configurationRestore: Configuration;
	configurationUpdate: Configuration;
	configurationUpdateByFilter: ConfigurationManyResponse;
	/** @deprecated No longer supported. Use `system.deploy` instead. */
	deploy?: Maybe<Scalars['Boolean']>;
	environmentCreate: Environment;
	environmentCreateMany: EnvironmentManyResponse;
	environmentDelete?: Maybe<SuccessResponse>;
	environmentDeleteByFilter?: Maybe<SuccessResponse>;
	environmentDestroy?: Maybe<SuccessResponse>;
	environmentDestroyByFilter?: Maybe<SuccessResponse>;
	environmentRestore: Environment;
	environmentUpdate: Environment;
	environmentUpdateByFilter: EnvironmentManyResponse;
	environmentVariableCreate: EnvironmentVariable;
	environmentVariableCreateMany: EnvironmentVariableManyResponse;
	environmentVariableDelete?: Maybe<SuccessResponse>;
	environmentVariableDeleteByFilter?: Maybe<SuccessResponse>;
	environmentVariableDestroy?: Maybe<SuccessResponse>;
	environmentVariableDestroyByFilter?: Maybe<SuccessResponse>;
	environmentVariableRestore: EnvironmentVariable;
	environmentVariableUpdate: EnvironmentVariable;
	environmentVariableUpdateByFilter: EnvironmentVariableManyResponse;
	errorCreate: Error;
	errorCreateMany: ErrorManyResponse;
	errorDelete?: Maybe<SuccessResponse>;
	errorDeleteByFilter?: Maybe<SuccessResponse>;
	errorDestroy?: Maybe<SuccessResponse>;
	errorDestroyByFilter?: Maybe<SuccessResponse>;
	errorRestore: Error;
	errorUpdate: Error;
	errorUpdateByFilter: ErrorManyResponse;
	/** @deprecated No longer supported. Use `system.fieldCreate` instead. */
	fieldCreate: TableField;
	/** @deprecated No longer supported. Use `system.fieldDelete` instead. */
	fieldDelete: SuccessResponse;
	/** @deprecated No longer supported. Use `system.fieldUpdate` instead. */
	fieldUpdate: TableField;
	/** @deprecated No longer supported. Use `system.fieldUpdatePosition` instead. */
	fieldUpdatePosition: SuccessResponse;
	fileCreate: File;
	fileCreateMany: FileManyResponse;
	fileDelete?: Maybe<SuccessResponse>;
	fileDeleteByFilter?: Maybe<SuccessResponse>;
	fileDestroy?: Maybe<SuccessResponse>;
	fileDestroyByFilter?: Maybe<SuccessResponse>;
	fileRestore: File;
	fileUpdate: File;
	fileUpdateByFilter: FileManyResponse;
	indexCreate: TableIndex;
	indexDelete?: Maybe<SuccessResponse>;
	indexUpdate: TableIndex;
	integrationCreate: Integration;
	integrationCreateMany: IntegrationManyResponse;
	integrationDelete?: Maybe<SuccessResponse>;
	integrationDeleteByFilter?: Maybe<SuccessResponse>;
	integrationDestroy?: Maybe<SuccessResponse>;
	integrationDestroyByFilter?: Maybe<SuccessResponse>;
	integrationDetailCreate: IntegrationDetail;
	integrationDetailCreateMany: IntegrationDetailManyResponse;
	integrationDetailDelete?: Maybe<SuccessResponse>;
	integrationDetailDeleteByFilter?: Maybe<SuccessResponse>;
	integrationDetailDestroy?: Maybe<SuccessResponse>;
	integrationDetailDestroyByFilter?: Maybe<SuccessResponse>;
	integrationDetailRestore: IntegrationDetail;
	integrationDetailUpdate: IntegrationDetail;
	integrationDetailUpdateByFilter: IntegrationDetailManyResponse;
	integrationRestore: Integration;
	integrationUpdate: Integration;
	integrationUpdateByFilter: IntegrationManyResponse;
	inviteMembers: Array<Maybe<TeamInvitation>>;
	/** @deprecated No longer supported. Use `system.invoke` instead. */
	invoke?: Maybe<InvokeFunctionResponse>;
	metricCreate: Metric;
	metricCreateMany: MetricManyResponse;
	metricDelete?: Maybe<SuccessResponse>;
	metricDeleteByFilter?: Maybe<SuccessResponse>;
	metricDestroy?: Maybe<SuccessResponse>;
	metricDestroyByFilter?: Maybe<SuccessResponse>;
	metricRestore: Metric;
	metricUpdate: Metric;
	metricUpdateByFilter: MetricManyResponse;
	/** @deprecated No longer supported. Use `system.prepareDeploy` instead. */
	prepareDeploy: DeployDataResponse;
	projectCreate: Project;
	projectCreateMany: ProjectManyResponse;
	projectDelete?: Maybe<SuccessResponse>;
	projectDeleteByFilter?: Maybe<SuccessResponse>;
	projectDestroy?: Maybe<SuccessResponse>;
	projectDestroyByFilter?: Maybe<SuccessResponse>;
	projectRestore: Project;
	projectUpdate: Project;
	projectUpdateByFilter: ProjectManyResponse;
	recordingCreate: Recording;
	recordingCreateMany: RecordingManyResponse;
	recordingDelete?: Maybe<SuccessResponse>;
	recordingDeleteByFilter?: Maybe<SuccessResponse>;
	recordingDestroy?: Maybe<SuccessResponse>;
	recordingDestroyByFilter?: Maybe<SuccessResponse>;
	recordingRestore: Recording;
	recordingUpdate: Recording;
	recordingUpdateByFilter: RecordingManyResponse;
	releaseCreate: Release;
	releaseCreateMany: ReleaseManyResponse;
	releaseDelete?: Maybe<SuccessResponse>;
	releaseDeleteByFilter?: Maybe<SuccessResponse>;
	releaseDestroy?: Maybe<SuccessResponse>;
	releaseDestroyByFilter?: Maybe<SuccessResponse>;
	releaseRestore: Release;
	releaseUpdate: Release;
	releaseUpdateByFilter: ReleaseManyResponse;
	roleCreate: Role;
	roleCreateMany: RoleManyResponse;
	roleDelete?: Maybe<SuccessResponse>;
	roleDeleteByFilter?: Maybe<SuccessResponse>;
	roleDestroy?: Maybe<SuccessResponse>;
	roleDestroyByFilter?: Maybe<SuccessResponse>;
	roleRestore: Role;
	roleUpdate: Role;
	roleUpdateByFilter: RoleManyResponse;
	seleniumClickCreate: SeleniumClick;
	seleniumClickCreateMany: SeleniumClickManyResponse;
	seleniumClickDelete?: Maybe<SuccessResponse>;
	seleniumClickDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumClickDestroy?: Maybe<SuccessResponse>;
	seleniumClickDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumClickRestore: SeleniumClick;
	seleniumClickUpdate: SeleniumClick;
	seleniumCommandCreate: SeleniumCommand;
	seleniumCommandCreateMany: SeleniumCommandManyResponse;
	seleniumCommandDelete?: Maybe<SuccessResponse>;
	seleniumCommandDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumCommandDestroy?: Maybe<SuccessResponse>;
	seleniumCommandDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumCommandRestore: SeleniumCommand;
	seleniumCommandUpdate: SeleniumCommand;
	seleniumCommandUpdateByFilter: SeleniumCommandManyResponse;
	seleniumDragndropCreate: SeleniumDragndrop;
	seleniumDragndropCreateMany: SeleniumDragndropManyResponse;
	seleniumDragndropDelete?: Maybe<SuccessResponse>;
	seleniumDragndropDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumDragndropDestroy?: Maybe<SuccessResponse>;
	seleniumDragndropDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumDragndropRestore: SeleniumDragndrop;
	seleniumDragndropUpdate: SeleniumDragndrop;
	seleniumGroupCreate: SeleniumGroup;
	seleniumGroupCreateMany: SeleniumGroupManyResponse;
	seleniumGroupDelete?: Maybe<SuccessResponse>;
	seleniumGroupDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumGroupDestroy?: Maybe<SuccessResponse>;
	seleniumGroupDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumGroupRestore: SeleniumGroup;
	seleniumGroupUpdate: SeleniumGroup;
	seleniumGroupUpdateByFilter: SeleniumGroupManyResponse;
	seleniumOpenCreate: SeleniumOpen;
	seleniumOpenCreateMany: SeleniumOpenManyResponse;
	seleniumOpenDelete?: Maybe<SuccessResponse>;
	seleniumOpenDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumOpenDestroy?: Maybe<SuccessResponse>;
	seleniumOpenDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumOpenRestore: SeleniumOpen;
	seleniumOpenUpdate: SeleniumOpen;
	seleniumOpenUpdateByFilter: SeleniumOpenManyResponse;
	seleniumPointCreate: SeleniumPoint;
	seleniumPointCreateMany: SeleniumPointManyResponse;
	seleniumPointDelete?: Maybe<SuccessResponse>;
	seleniumPointDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumPointDestroy?: Maybe<SuccessResponse>;
	seleniumPointDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumPointRestore: SeleniumPoint;
	seleniumPointUpdate: SeleniumPoint;
	seleniumPointUpdateByFilter: SeleniumPointManyResponse;
	seleniumScriptCreate: SeleniumScript;
	seleniumScriptCreateMany: SeleniumScriptManyResponse;
	seleniumScriptDelete?: Maybe<SuccessResponse>;
	seleniumScriptDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumScriptDestroy?: Maybe<SuccessResponse>;
	seleniumScriptDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumScriptRestore: SeleniumScript;
	seleniumScriptUpdate: SeleniumScript;
	seleniumScriptUpdateByFilter: SeleniumScriptManyResponse;
	seleniumSelectorCreate: SeleniumSelector;
	seleniumSelectorCreateMany: SeleniumSelectorManyResponse;
	seleniumSelectorDelete?: Maybe<SuccessResponse>;
	seleniumSelectorDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumSelectorDestroy?: Maybe<SuccessResponse>;
	seleniumSelectorDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumSelectorRestore: SeleniumSelector;
	seleniumSelectorUpdate: SeleniumSelector;
	seleniumSelectorUpdateByFilter: SeleniumSelectorManyResponse;
	seleniumSetViewportSizeCreate: SeleniumSetViewportSize;
	seleniumSetViewportSizeCreateMany: SeleniumSetViewportSizeManyResponse;
	seleniumSetViewportSizeDelete?: Maybe<SuccessResponse>;
	seleniumSetViewportSizeDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumSetViewportSizeDestroy?: Maybe<SuccessResponse>;
	seleniumSetViewportSizeDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumSetViewportSizeRestore: SeleniumSetViewportSize;
	seleniumSetViewportSizeUpdate: SeleniumSetViewportSize;
	seleniumTargetCreate: SeleniumTarget;
	seleniumTargetCreateMany: SeleniumTargetManyResponse;
	seleniumTargetDelete?: Maybe<SuccessResponse>;
	seleniumTargetDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumTargetDestroy?: Maybe<SuccessResponse>;
	seleniumTargetDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumTargetRestore: SeleniumTarget;
	seleniumTargetUpdate: SeleniumTarget;
	seleniumTypeCreate: SeleniumType;
	seleniumTypeCreateMany: SeleniumTypeManyResponse;
	seleniumTypeDelete?: Maybe<SuccessResponse>;
	seleniumTypeDeleteByFilter?: Maybe<SuccessResponse>;
	seleniumTypeDestroy?: Maybe<SuccessResponse>;
	seleniumTypeDestroyByFilter?: Maybe<SuccessResponse>;
	seleniumTypeRestore: SeleniumType;
	seleniumTypeUpdate: SeleniumType;
	seleniumTypeUpdateByFilter: SeleniumTypeManyResponse;
	sendInvitationTo8base?: Maybe<SuccessResponse>;
	settingsUpdate: Setting;
	slackCreate: Slack;
	slackCreateMany: SlackManyResponse;
	slackDelete?: Maybe<SuccessResponse>;
	slackDeleteByFilter?: Maybe<SuccessResponse>;
	slackDestroy?: Maybe<SuccessResponse>;
	slackDestroyByFilter?: Maybe<SuccessResponse>;
	slackRestore: Slack;
	slackUpdate: Slack;
	slackUpdateByFilter: SlackManyResponse;
	system?: Maybe<SystemMutation>;
	/** @deprecated No longer supported. Use `system.tableCreate` instead. */
	tableCreate: Table;
	/** @deprecated No longer supported. Use `system.tableDelete` instead. */
	tableDelete: SuccessResponse;
	/** @deprecated No longer supported. Use `system.tableUpdate` instead. */
	tableUpdate: Table;
	teamInvitationAccept: TeamInvitationAcceptResponse;
	teamInvitationCancel?: Maybe<SuccessResponse>;
	teamInvitationDelete?: Maybe<SuccessResponse>;
	teamInvitationDeleteByFilter?: Maybe<SuccessResponse>;
	teamInvitationDestroy?: Maybe<SuccessResponse>;
	teamInvitationDestroyByFilter?: Maybe<SuccessResponse>;
	teamInvitationResend?: Maybe<SuccessResponse>;
	teamInvitationRestore: TeamInvitation;
	teamMemberDelete?: Maybe<SuccessResponse>;
	teamMemberDestroy?: Maybe<SuccessResponse>;
	teamMemberRestore: TeamMember;
	teamMemberUpdate: TeamMember;
	teamMemberUpdateByFilter: TeamMemberManyResponse;
	testOutcomeCreate: TestOutcome;
	testOutcomeCreateMany: TestOutcomeManyResponse;
	testOutcomeDelete?: Maybe<SuccessResponse>;
	testOutcomeDeleteByFilter?: Maybe<SuccessResponse>;
	testOutcomeDestroy?: Maybe<SuccessResponse>;
	testOutcomeDestroyByFilter?: Maybe<SuccessResponse>;
	testOutcomeRestore: TestOutcome;
	testOutcomeUpdate: TestOutcome;
	testOutcomeUpdateByFilter: TestOutcomeManyResponse;
	testRunCreate: TestRun;
	testRunCreateMany: TestRunManyResponse;
	testRunDelete?: Maybe<SuccessResponse>;
	testRunDeleteByFilter?: Maybe<SuccessResponse>;
	testRunDestroy?: Maybe<SuccessResponse>;
	testRunDestroyByFilter?: Maybe<SuccessResponse>;
	testRunRestore: TestRun;
	testRunUpdate: TestRun;
	testRunUpdateByFilter: TestRunManyResponse;
	userChangePassword?: Maybe<SuccessResponse>;
	userCreate: User;
	userCreateMany: UserManyResponse;
	userDelete?: Maybe<SuccessResponse>;
	userDeleteByFilter?: Maybe<SuccessResponse>;
	userDestroy?: Maybe<SuccessResponse>;
	userDestroyByFilter?: Maybe<SuccessResponse>;
	userLogin?: Maybe<LoginResponse>;
	userPasswordForgot?: Maybe<SuccessResponse>;
	userPasswordForgotConfirm?: Maybe<SuccessResponse>;
	userRefreshToken?: Maybe<Auth>;
	userRestore: User;
	/** @deprecated No longer supported. Use `userSignUpWithToken` instead. */
	userSignUp: User;
	/** @deprecated No longer supported. Use `userVerificationEmailResend` instead. */
	userSignUpResend?: Maybe<SuccessResponse>;
	userSignUpWithPassword: User;
	userSignUpWithToken: User;
	userStoryCreate: UserStory;
	userStoryCreateMany: UserStoryManyResponse;
	userStoryDelete?: Maybe<SuccessResponse>;
	userStoryDeleteByFilter?: Maybe<SuccessResponse>;
	userStoryDestroy?: Maybe<SuccessResponse>;
	userStoryDestroyByFilter?: Maybe<SuccessResponse>;
	userStoryRestore: UserStory;
	userStoryUpdate: UserStory;
	userStoryUpdateByFilter: UserStoryManyResponse;
	userUpdate: User;
	userUpdateByFilter: UserManyResponse;
	userVerificationEmailResend?: Maybe<SuccessResponse>;
	/** @deprecated No longer supported. Use `system.viewCreate` instead. */
	viewCreate: Table;
	viewUpdate: Table;
	/** @deprecated No longer supported. Use `system.workspaceCreate` instead. */
	workspaceCreate?: Maybe<WorkspaceCreateResponse>;
	/** @deprecated No longer supported. Use `system.workspaceCreateAsync` instead. */
	workspaceCreateAsync?: Maybe<WorkspaceCreateResponse>;
	/** @deprecated No longer supported. Use `system.workspaceDelete` instead. */
	workspaceDelete?: Maybe<SuccessResponse>;
	/** @deprecated No longer supported. Use `system.workspaceLeave` instead. */
	workspaceLeave?: Maybe<SuccessResponse>;
	/** @deprecated No longer supported. Use `system.workspaceUpdate` instead. */
	workspaceUpdate?: Maybe<WorkspaceUpdateResponse>;
};

export type MutationActivityCreateArgs = {
	data: ActivityCreateInput;
};

export type MutationActivityCreateManyArgs = {
	data: Array<Maybe<ActivityCreateManyInput>>;
};

export type MutationActivityDeleteArgs = {
	data?: Maybe<ActivityDeleteInput>;
	filter?: Maybe<ActivityKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationActivityDeleteByFilterArgs = {
	filter: ActivityFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationActivityDestroyArgs = {
	filter?: Maybe<ActivityKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationActivityDestroyByFilterArgs = {
	filter: ActivityFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationActivityRestoreArgs = {
	id: Scalars['String'];
};

export type MutationActivityUpdateArgs = {
	data: ActivityUpdateInput;
	filter?: Maybe<ActivityKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationActivityUpdateByFilterArgs = {
	data: ActivityUpdateByFilterInput;
	filter?: Maybe<ActivityFilter>;
};

export type MutationApiTokenCreateArgs = {
	data: ApiTokenCreateInput;
};

export type MutationApiTokenDeleteArgs = {
	data?: Maybe<ApiTokenDeleteInput>;
	filter?: Maybe<ApiTokenKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationApiTokenDeleteByFilterArgs = {
	filter: ApiTokenFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationApiTokenDestroyArgs = {
	filter?: Maybe<ApiTokenKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationApiTokenDestroyByFilterArgs = {
	filter: ApiTokenFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationApiTokenRestoreArgs = {
	id: Scalars['String'];
};

export type MutationApiTokenUpdateArgs = {
	data: ApiTokenUpdateInput;
	filter?: Maybe<ApiTokenKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationApiTokenUpdateByFilterArgs = {
	data: ApiTokenUpdateByFilterInput;
	filter?: Maybe<ApiTokenFilter>;
};

export type MutationApplicationDeleteArgs = {
	data: ApplicationDeleteMutationInput;
};

export type MutationApplicationInstallArgs = {
	data: ApplicationInstallInput;
};

export type MutationApplicationUpdateArgs = {
	data: ApplicationUpdateInput;
};

export type MutationAuthenticationProfileCreateArgs = {
	data: AuthenticationProfileCreateInput;
};

export type MutationAuthenticationProfileCreateManyArgs = {
	data: Array<Maybe<AuthenticationProfileCreateManyInput>>;
};

export type MutationAuthenticationProfileDeleteArgs = {
	data?: Maybe<AuthenticationProfileDeleteInput>;
	filter?: Maybe<AuthenticationProfileKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationProfileDeleteByFilterArgs = {
	filter: AuthenticationProfileFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationProfileDestroyArgs = {
	filter?: Maybe<AuthenticationProfileKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationProfileDestroyByFilterArgs = {
	filter: AuthenticationProfileFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationProfileRestoreArgs = {
	id: Scalars['String'];
};

export type MutationAuthenticationProfileUpdateArgs = {
	data: AuthenticationProfileUpdateInput;
	filter?: Maybe<AuthenticationProfileKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationProfileUpdateByFilterArgs = {
	data: AuthenticationProfileUpdateByFilterInput;
	filter?: Maybe<AuthenticationProfileFilter>;
};

export type MutationAuthenticationSettingsUpdateArgs = {
	data: AuthenticationSettingUpdateInput;
};

export type MutationAuthenticationTokenCreateArgs = {
	data: AuthenticationTokenCreateInput;
};

export type MutationAuthenticationTokenCreateManyArgs = {
	data: Array<Maybe<AuthenticationTokenCreateManyInput>>;
};

export type MutationAuthenticationTokenDeleteArgs = {
	data?: Maybe<AuthenticationTokenDeleteInput>;
	filter?: Maybe<AuthenticationTokenKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationTokenDeleteByFilterArgs = {
	filter: AuthenticationTokenFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationTokenDestroyArgs = {
	filter?: Maybe<AuthenticationTokenKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationTokenDestroyByFilterArgs = {
	filter: AuthenticationTokenFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationTokenRestoreArgs = {
	id: Scalars['String'];
};

export type MutationAuthenticationTokenUpdateArgs = {
	data: AuthenticationTokenUpdateInput;
	filter?: Maybe<AuthenticationTokenKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationAuthenticationTokenUpdateByFilterArgs = {
	data: AuthenticationTokenUpdateByFilterInput;
	filter?: Maybe<AuthenticationTokenFilter>;
};

export type MutationBillingDetailsUpdateArgs = {
	data: BillingDetailsUpdateMutationInput;
};

export type MutationBillingPlanUpdateArgs = {
	data: BillingPlanUpdateMutationInput;
};

export type MutationCiCdMigrationCreateArgs = {
	data: CiCdMigrationCreateInput;
};

export type MutationCiCdMigrationCreateManyArgs = {
	data: Array<Maybe<CiCdMigrationCreateManyInput>>;
};

export type MutationCiCdMigrationDeleteArgs = {
	data?: Maybe<CiCdMigrationDeleteInput>;
	filter?: Maybe<CiCdMigrationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationCiCdMigrationDeleteByFilterArgs = {
	filter: CiCdMigrationFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationCiCdMigrationDestroyArgs = {
	filter?: Maybe<CiCdMigrationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationCiCdMigrationDestroyByFilterArgs = {
	filter: CiCdMigrationFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationCiCdMigrationRestoreArgs = {
	id: Scalars['String'];
};

export type MutationCiCdMigrationUpdateArgs = {
	data: CiCdMigrationUpdateInput;
	filter?: Maybe<CiCdMigrationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationCiCdMigrationUpdateByFilterArgs = {
	data: CiCdMigrationUpdateByFilterInput;
	filter?: Maybe<CiCdMigrationFilter>;
};

export type MutationConfigurationCreateArgs = {
	data: ConfigurationCreateInput;
};

export type MutationConfigurationCreateManyArgs = {
	data: Array<Maybe<ConfigurationCreateManyInput>>;
};

export type MutationConfigurationDeleteArgs = {
	data?: Maybe<ConfigurationDeleteInput>;
	filter?: Maybe<ConfigurationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationConfigurationDeleteByFilterArgs = {
	filter: ConfigurationFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationConfigurationDestroyArgs = {
	filter?: Maybe<ConfigurationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationConfigurationDestroyByFilterArgs = {
	filter: ConfigurationFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationConfigurationRestoreArgs = {
	id: Scalars['String'];
};

export type MutationConfigurationUpdateArgs = {
	data: ConfigurationUpdateInput;
	filter?: Maybe<ConfigurationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationConfigurationUpdateByFilterArgs = {
	data: ConfigurationUpdateByFilterInput;
	filter?: Maybe<ConfigurationFilter>;
};

export type MutationDeployArgs = {
	data?: Maybe<DeployingBuildInput>;
};

export type MutationEnvironmentCreateArgs = {
	data: EnvironmentCreateInput;
};

export type MutationEnvironmentCreateManyArgs = {
	data: Array<Maybe<EnvironmentCreateManyInput>>;
};

export type MutationEnvironmentDeleteArgs = {
	data?: Maybe<EnvironmentDeleteInput>;
	filter?: Maybe<EnvironmentKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentDeleteByFilterArgs = {
	filter: EnvironmentFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentDestroyArgs = {
	filter?: Maybe<EnvironmentKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentDestroyByFilterArgs = {
	filter: EnvironmentFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentRestoreArgs = {
	id: Scalars['String'];
};

export type MutationEnvironmentUpdateArgs = {
	data: EnvironmentUpdateInput;
	filter?: Maybe<EnvironmentKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentUpdateByFilterArgs = {
	data: EnvironmentUpdateByFilterInput;
	filter?: Maybe<EnvironmentFilter>;
};

export type MutationEnvironmentVariableCreateArgs = {
	data: EnvironmentVariableCreateInput;
};

export type MutationEnvironmentVariableCreateManyArgs = {
	data: Array<Maybe<EnvironmentVariableCreateManyInput>>;
};

export type MutationEnvironmentVariableDeleteArgs = {
	data?: Maybe<EnvironmentVariableDeleteInput>;
	filter?: Maybe<EnvironmentVariableKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentVariableDeleteByFilterArgs = {
	filter: EnvironmentVariableFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentVariableDestroyArgs = {
	filter?: Maybe<EnvironmentVariableKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentVariableDestroyByFilterArgs = {
	filter: EnvironmentVariableFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentVariableRestoreArgs = {
	id: Scalars['String'];
};

export type MutationEnvironmentVariableUpdateArgs = {
	data: EnvironmentVariableUpdateInput;
	filter?: Maybe<EnvironmentVariableKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationEnvironmentVariableUpdateByFilterArgs = {
	data: EnvironmentVariableUpdateByFilterInput;
	filter?: Maybe<EnvironmentVariableFilter>;
};

export type MutationErrorCreateArgs = {
	data: ErrorCreateInput;
};

export type MutationErrorCreateManyArgs = {
	data: Array<Maybe<ErrorCreateManyInput>>;
};

export type MutationErrorDeleteArgs = {
	data?: Maybe<ErrorDeleteInput>;
	filter?: Maybe<ErrorKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationErrorDeleteByFilterArgs = {
	filter: ErrorFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationErrorDestroyArgs = {
	filter?: Maybe<ErrorKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationErrorDestroyByFilterArgs = {
	filter: ErrorFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationErrorRestoreArgs = {
	id: Scalars['String'];
};

export type MutationErrorUpdateArgs = {
	data: ErrorUpdateInput;
	filter?: Maybe<ErrorKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationErrorUpdateByFilterArgs = {
	data: ErrorUpdateByFilterInput;
	filter?: Maybe<ErrorFilter>;
};

export type MutationFieldCreateArgs = {
	data: TableFieldCreateInput;
};

export type MutationFieldDeleteArgs = {
	data: TableFieldDeleteInput;
};

export type MutationFieldUpdateArgs = {
	data: TableFieldUpdateInput;
};

export type MutationFieldUpdatePositionArgs = {
	data: TableFieldPositionUpdateInput;
};

export type MutationFileCreateArgs = {
	data: FileCreateInput;
};

export type MutationFileCreateManyArgs = {
	data: Array<Maybe<FileCreateManyInput>>;
};

export type MutationFileDeleteArgs = {
	data?: Maybe<FileDeleteInput>;
	filter?: Maybe<FileKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationFileDeleteByFilterArgs = {
	filter: FileFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationFileDestroyArgs = {
	filter?: Maybe<FileKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationFileDestroyByFilterArgs = {
	filter: FileFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationFileRestoreArgs = {
	id: Scalars['String'];
};

export type MutationFileUpdateArgs = {
	data: FileUpdateInput;
	filter?: Maybe<FileKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationFileUpdateByFilterArgs = {
	data: FileUpdateByFilterInput;
	filter?: Maybe<FileFilter>;
};

export type MutationIndexCreateArgs = {
	data: IndexCreateInput;
};

export type MutationIndexDeleteArgs = {
	data: IndexDeleteInput;
};

export type MutationIndexUpdateArgs = {
	data: IndexUpdateInput;
};

export type MutationIntegrationCreateArgs = {
	data: IntegrationCreateInput;
};

export type MutationIntegrationCreateManyArgs = {
	data: Array<Maybe<IntegrationCreateManyInput>>;
};

export type MutationIntegrationDeleteArgs = {
	data?: Maybe<IntegrationDeleteInput>;
	filter?: Maybe<IntegrationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationDeleteByFilterArgs = {
	filter: IntegrationFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationDestroyArgs = {
	filter?: Maybe<IntegrationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationDestroyByFilterArgs = {
	filter: IntegrationFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationDetailCreateArgs = {
	data: IntegrationDetailCreateInput;
};

export type MutationIntegrationDetailCreateManyArgs = {
	data: Array<Maybe<IntegrationDetailCreateManyInput>>;
};

export type MutationIntegrationDetailDeleteArgs = {
	data?: Maybe<IntegrationDetailDeleteInput>;
	filter?: Maybe<IntegrationDetailKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationDetailDeleteByFilterArgs = {
	filter: IntegrationDetailFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationDetailDestroyArgs = {
	filter?: Maybe<IntegrationDetailKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationDetailDestroyByFilterArgs = {
	filter: IntegrationDetailFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationDetailRestoreArgs = {
	id: Scalars['String'];
};

export type MutationIntegrationDetailUpdateArgs = {
	data: IntegrationDetailUpdateInput;
	filter?: Maybe<IntegrationDetailKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationDetailUpdateByFilterArgs = {
	data: IntegrationDetailUpdateByFilterInput;
	filter?: Maybe<IntegrationDetailFilter>;
};

export type MutationIntegrationRestoreArgs = {
	id: Scalars['String'];
};

export type MutationIntegrationUpdateArgs = {
	data: IntegrationUpdateInput;
	filter?: Maybe<IntegrationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationIntegrationUpdateByFilterArgs = {
	data: IntegrationUpdateByFilterInput;
	filter?: Maybe<IntegrationFilter>;
};

export type MutationInviteMembersArgs = {
	data: InviteMembersInput;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationInvokeArgs = {
	data?: Maybe<InvokeData>;
};

export type MutationMetricCreateArgs = {
	data: MetricCreateInput;
};

export type MutationMetricCreateManyArgs = {
	data: Array<Maybe<MetricCreateManyInput>>;
};

export type MutationMetricDeleteArgs = {
	data?: Maybe<MetricDeleteInput>;
	filter?: Maybe<MetricKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationMetricDeleteByFilterArgs = {
	filter: MetricFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationMetricDestroyArgs = {
	filter?: Maybe<MetricKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationMetricDestroyByFilterArgs = {
	filter: MetricFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationMetricRestoreArgs = {
	id: Scalars['String'];
};

export type MutationMetricUpdateArgs = {
	data: MetricUpdateInput;
	filter?: Maybe<MetricKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationMetricUpdateByFilterArgs = {
	data: MetricUpdateByFilterInput;
	filter?: Maybe<MetricFilter>;
};

export type MutationProjectCreateArgs = {
	data: ProjectCreateInput;
};

export type MutationProjectCreateManyArgs = {
	data: Array<Maybe<ProjectCreateManyInput>>;
};

export type MutationProjectDeleteArgs = {
	data?: Maybe<ProjectDeleteInput>;
	filter?: Maybe<ProjectKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationProjectDeleteByFilterArgs = {
	filter: ProjectFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationProjectDestroyArgs = {
	filter?: Maybe<ProjectKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationProjectDestroyByFilterArgs = {
	filter: ProjectFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationProjectRestoreArgs = {
	id: Scalars['String'];
};

export type MutationProjectUpdateArgs = {
	data: ProjectUpdateInput;
	filter?: Maybe<ProjectKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationProjectUpdateByFilterArgs = {
	data: ProjectUpdateByFilterInput;
	filter?: Maybe<ProjectFilter>;
};

export type MutationRecordingCreateArgs = {
	data: RecordingCreateInput;
};

export type MutationRecordingCreateManyArgs = {
	data: Array<Maybe<RecordingCreateManyInput>>;
};

export type MutationRecordingDeleteArgs = {
	data?: Maybe<RecordingDeleteInput>;
	filter?: Maybe<RecordingKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationRecordingDeleteByFilterArgs = {
	filter: RecordingFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationRecordingDestroyArgs = {
	filter?: Maybe<RecordingKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationRecordingDestroyByFilterArgs = {
	filter: RecordingFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationRecordingRestoreArgs = {
	id: Scalars['String'];
};

export type MutationRecordingUpdateArgs = {
	data: RecordingUpdateInput;
	filter?: Maybe<RecordingKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationRecordingUpdateByFilterArgs = {
	data: RecordingUpdateByFilterInput;
	filter?: Maybe<RecordingFilter>;
};

export type MutationReleaseCreateArgs = {
	data: ReleaseCreateInput;
};

export type MutationReleaseCreateManyArgs = {
	data: Array<Maybe<ReleaseCreateManyInput>>;
};

export type MutationReleaseDeleteArgs = {
	data?: Maybe<ReleaseDeleteInput>;
	filter?: Maybe<ReleaseKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationReleaseDeleteByFilterArgs = {
	filter: ReleaseFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationReleaseDestroyArgs = {
	filter?: Maybe<ReleaseKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationReleaseDestroyByFilterArgs = {
	filter: ReleaseFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationReleaseRestoreArgs = {
	id: Scalars['String'];
};

export type MutationReleaseUpdateArgs = {
	data: ReleaseUpdateInput;
	filter?: Maybe<ReleaseKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationReleaseUpdateByFilterArgs = {
	data: ReleaseUpdateByFilterInput;
	filter?: Maybe<ReleaseFilter>;
};

export type MutationRoleCreateArgs = {
	data: RoleCreateInput;
};

export type MutationRoleCreateManyArgs = {
	data: Array<Maybe<RoleCreateManyInput>>;
};

export type MutationRoleDeleteArgs = {
	data?: Maybe<RoleDeleteInput>;
	filter?: Maybe<RoleKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationRoleDeleteByFilterArgs = {
	filter: RoleFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationRoleDestroyArgs = {
	filter?: Maybe<RoleKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationRoleDestroyByFilterArgs = {
	filter: RoleFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationRoleRestoreArgs = {
	id: Scalars['String'];
};

export type MutationRoleUpdateArgs = {
	data: RoleUpdateInput;
	filter?: Maybe<RoleKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationRoleUpdateByFilterArgs = {
	data: RoleUpdateByFilterInput;
	filter?: Maybe<RoleFilter>;
};

export type MutationSeleniumClickCreateArgs = {
	data: SeleniumClickCreateInput;
};

export type MutationSeleniumClickCreateManyArgs = {
	data: Array<Maybe<SeleniumClickCreateManyInput>>;
};

export type MutationSeleniumClickDeleteArgs = {
	data?: Maybe<SeleniumClickDeleteInput>;
	filter?: Maybe<SeleniumClickKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumClickDeleteByFilterArgs = {
	filter: SeleniumClickFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumClickDestroyArgs = {
	filter?: Maybe<SeleniumClickKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumClickDestroyByFilterArgs = {
	filter: SeleniumClickFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumClickRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumClickUpdateArgs = {
	data: SeleniumClickUpdateInput;
	filter?: Maybe<SeleniumClickKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumCommandCreateArgs = {
	data: SeleniumCommandCreateInput;
};

export type MutationSeleniumCommandCreateManyArgs = {
	data: Array<Maybe<SeleniumCommandCreateManyInput>>;
};

export type MutationSeleniumCommandDeleteArgs = {
	data?: Maybe<SeleniumCommandDeleteInput>;
	filter?: Maybe<SeleniumCommandKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumCommandDeleteByFilterArgs = {
	filter: SeleniumCommandFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumCommandDestroyArgs = {
	filter?: Maybe<SeleniumCommandKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumCommandDestroyByFilterArgs = {
	filter: SeleniumCommandFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumCommandRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumCommandUpdateArgs = {
	data: SeleniumCommandUpdateInput;
	filter?: Maybe<SeleniumCommandKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumCommandUpdateByFilterArgs = {
	data: SeleniumCommandUpdateByFilterInput;
	filter?: Maybe<SeleniumCommandFilter>;
};

export type MutationSeleniumDragndropCreateArgs = {
	data: SeleniumDragndropCreateInput;
};

export type MutationSeleniumDragndropCreateManyArgs = {
	data: Array<Maybe<SeleniumDragndropCreateManyInput>>;
};

export type MutationSeleniumDragndropDeleteArgs = {
	data?: Maybe<SeleniumDragndropDeleteInput>;
	filter?: Maybe<SeleniumDragndropKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumDragndropDeleteByFilterArgs = {
	filter: SeleniumDragndropFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumDragndropDestroyArgs = {
	filter?: Maybe<SeleniumDragndropKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumDragndropDestroyByFilterArgs = {
	filter: SeleniumDragndropFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumDragndropRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumDragndropUpdateArgs = {
	data: SeleniumDragndropUpdateInput;
	filter?: Maybe<SeleniumDragndropKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumGroupCreateArgs = {
	data: SeleniumGroupCreateInput;
};

export type MutationSeleniumGroupCreateManyArgs = {
	data: Array<Maybe<SeleniumGroupCreateManyInput>>;
};

export type MutationSeleniumGroupDeleteArgs = {
	data?: Maybe<SeleniumGroupDeleteInput>;
	filter?: Maybe<SeleniumGroupKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumGroupDeleteByFilterArgs = {
	filter: SeleniumGroupFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumGroupDestroyArgs = {
	filter?: Maybe<SeleniumGroupKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumGroupDestroyByFilterArgs = {
	filter: SeleniumGroupFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumGroupRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumGroupUpdateArgs = {
	data: SeleniumGroupUpdateInput;
	filter?: Maybe<SeleniumGroupKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumGroupUpdateByFilterArgs = {
	data: SeleniumGroupUpdateByFilterInput;
	filter?: Maybe<SeleniumGroupFilter>;
};

export type MutationSeleniumOpenCreateArgs = {
	data: SeleniumOpenCreateInput;
};

export type MutationSeleniumOpenCreateManyArgs = {
	data: Array<Maybe<SeleniumOpenCreateManyInput>>;
};

export type MutationSeleniumOpenDeleteArgs = {
	data?: Maybe<SeleniumOpenDeleteInput>;
	filter?: Maybe<SeleniumOpenKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumOpenDeleteByFilterArgs = {
	filter: SeleniumOpenFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumOpenDestroyArgs = {
	filter?: Maybe<SeleniumOpenKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumOpenDestroyByFilterArgs = {
	filter: SeleniumOpenFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumOpenRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumOpenUpdateArgs = {
	data: SeleniumOpenUpdateInput;
	filter?: Maybe<SeleniumOpenKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumOpenUpdateByFilterArgs = {
	data: SeleniumOpenUpdateByFilterInput;
	filter?: Maybe<SeleniumOpenFilter>;
};

export type MutationSeleniumPointCreateArgs = {
	data: SeleniumPointCreateInput;
};

export type MutationSeleniumPointCreateManyArgs = {
	data: Array<Maybe<SeleniumPointCreateManyInput>>;
};

export type MutationSeleniumPointDeleteArgs = {
	data?: Maybe<SeleniumPointDeleteInput>;
	filter?: Maybe<SeleniumPointKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumPointDeleteByFilterArgs = {
	filter: SeleniumPointFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumPointDestroyArgs = {
	filter?: Maybe<SeleniumPointKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumPointDestroyByFilterArgs = {
	filter: SeleniumPointFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumPointRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumPointUpdateArgs = {
	data: SeleniumPointUpdateInput;
	filter?: Maybe<SeleniumPointKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumPointUpdateByFilterArgs = {
	data: SeleniumPointUpdateByFilterInput;
	filter?: Maybe<SeleniumPointFilter>;
};

export type MutationSeleniumScriptCreateArgs = {
	data: SeleniumScriptCreateInput;
};

export type MutationSeleniumScriptCreateManyArgs = {
	data: Array<Maybe<SeleniumScriptCreateManyInput>>;
};

export type MutationSeleniumScriptDeleteArgs = {
	data?: Maybe<SeleniumScriptDeleteInput>;
	filter?: Maybe<SeleniumScriptKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumScriptDeleteByFilterArgs = {
	filter: SeleniumScriptFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumScriptDestroyArgs = {
	filter?: Maybe<SeleniumScriptKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumScriptDestroyByFilterArgs = {
	filter: SeleniumScriptFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumScriptRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumScriptUpdateArgs = {
	data: SeleniumScriptUpdateInput;
	filter?: Maybe<SeleniumScriptKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumScriptUpdateByFilterArgs = {
	data: SeleniumScriptUpdateByFilterInput;
	filter?: Maybe<SeleniumScriptFilter>;
};

export type MutationSeleniumSelectorCreateArgs = {
	data: SeleniumSelectorCreateInput;
};

export type MutationSeleniumSelectorCreateManyArgs = {
	data: Array<Maybe<SeleniumSelectorCreateManyInput>>;
};

export type MutationSeleniumSelectorDeleteArgs = {
	data?: Maybe<SeleniumSelectorDeleteInput>;
	filter?: Maybe<SeleniumSelectorKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumSelectorDeleteByFilterArgs = {
	filter: SeleniumSelectorFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumSelectorDestroyArgs = {
	filter?: Maybe<SeleniumSelectorKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumSelectorDestroyByFilterArgs = {
	filter: SeleniumSelectorFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumSelectorRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumSelectorUpdateArgs = {
	data: SeleniumSelectorUpdateInput;
	filter?: Maybe<SeleniumSelectorKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumSelectorUpdateByFilterArgs = {
	data: SeleniumSelectorUpdateByFilterInput;
	filter?: Maybe<SeleniumSelectorFilter>;
};

export type MutationSeleniumSetViewportSizeCreateArgs = {
	data: SeleniumSetViewportSizeCreateInput;
};

export type MutationSeleniumSetViewportSizeCreateManyArgs = {
	data: Array<Maybe<SeleniumSetViewportSizeCreateManyInput>>;
};

export type MutationSeleniumSetViewportSizeDeleteArgs = {
	data?: Maybe<SeleniumSetViewportSizeDeleteInput>;
	filter?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumSetViewportSizeDeleteByFilterArgs = {
	filter: SeleniumSetViewportSizeFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumSetViewportSizeDestroyArgs = {
	filter?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumSetViewportSizeDestroyByFilterArgs = {
	filter: SeleniumSetViewportSizeFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumSetViewportSizeRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumSetViewportSizeUpdateArgs = {
	data: SeleniumSetViewportSizeUpdateInput;
	filter?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTargetCreateArgs = {
	data: SeleniumTargetCreateInput;
};

export type MutationSeleniumTargetCreateManyArgs = {
	data: Array<Maybe<SeleniumTargetCreateManyInput>>;
};

export type MutationSeleniumTargetDeleteArgs = {
	data?: Maybe<SeleniumTargetDeleteInput>;
	filter?: Maybe<SeleniumTargetKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTargetDeleteByFilterArgs = {
	filter: SeleniumTargetFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTargetDestroyArgs = {
	filter?: Maybe<SeleniumTargetKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTargetDestroyByFilterArgs = {
	filter: SeleniumTargetFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTargetRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumTargetUpdateArgs = {
	data: SeleniumTargetUpdateInput;
	filter?: Maybe<SeleniumTargetKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTypeCreateArgs = {
	data: SeleniumTypeCreateInput;
};

export type MutationSeleniumTypeCreateManyArgs = {
	data: Array<Maybe<SeleniumTypeCreateManyInput>>;
};

export type MutationSeleniumTypeDeleteArgs = {
	data?: Maybe<SeleniumTypeDeleteInput>;
	filter?: Maybe<SeleniumTypeKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTypeDeleteByFilterArgs = {
	filter: SeleniumTypeFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTypeDestroyArgs = {
	filter?: Maybe<SeleniumTypeKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTypeDestroyByFilterArgs = {
	filter: SeleniumTypeFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTypeRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSeleniumTypeUpdateArgs = {
	data: SeleniumTypeUpdateInput;
	filter?: Maybe<SeleniumTypeKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSeleniumTypeUpdateByFilterArgs = {
	data: SeleniumTypeUpdateByFilterInput;
	filter?: Maybe<SeleniumTypeFilter>;
};

export type MutationSendInvitationTo8baseArgs = {
	inviteEmail: Scalars['String'];
};

export type MutationSettingsUpdateArgs = {
	data: SettingUpdateInput;
};

export type MutationSlackCreateArgs = {
	data: SlackCreateInput;
};

export type MutationSlackCreateManyArgs = {
	data: Array<Maybe<SlackCreateManyInput>>;
};

export type MutationSlackDeleteArgs = {
	data?: Maybe<SlackDeleteInput>;
	filter?: Maybe<SlackKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSlackDeleteByFilterArgs = {
	filter: SlackFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSlackDestroyArgs = {
	filter?: Maybe<SlackKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSlackDestroyByFilterArgs = {
	filter: SlackFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationSlackRestoreArgs = {
	id: Scalars['String'];
};

export type MutationSlackUpdateArgs = {
	data: SlackUpdateInput;
	filter?: Maybe<SlackKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationSlackUpdateByFilterArgs = {
	data: SlackUpdateByFilterInput;
	filter?: Maybe<SlackFilter>;
};

export type MutationTableCreateArgs = {
	data: TableCreateInput;
};

export type MutationTableDeleteArgs = {
	data: TableDeleteInput;
};

export type MutationTableUpdateArgs = {
	data: TableUpdateInput;
};

export type MutationTeamInvitationAcceptArgs = {
	data: TeamInvitationAcceptInput;
};

export type MutationTeamInvitationCancelArgs = {
	data: TeamInvitationCancelInput;
};

export type MutationTeamInvitationDeleteArgs = {
	data?: Maybe<TeamInvitationDeleteInput>;
	filter?: Maybe<TeamInvitationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTeamInvitationDeleteByFilterArgs = {
	filter: TeamInvitationFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTeamInvitationDestroyArgs = {
	filter?: Maybe<TeamInvitationKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTeamInvitationDestroyByFilterArgs = {
	filter: TeamInvitationFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTeamInvitationResendArgs = {
	data: TeamInvitationResendInput;
};

export type MutationTeamInvitationRestoreArgs = {
	id: Scalars['String'];
};

export type MutationTeamMemberDeleteArgs = {
	data?: Maybe<TeamMemberDeleteInput>;
	filter?: Maybe<TeamMemberKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTeamMemberDestroyArgs = {
	filter?: Maybe<TeamMemberKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTeamMemberRestoreArgs = {
	id: Scalars['String'];
};

export type MutationTeamMemberUpdateArgs = {
	data: TeamMemberUpdateInput;
	filter?: Maybe<TeamMemberKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationTeamMemberUpdateByFilterArgs = {
	data: TeamMemberUpdateByFilterInput;
	filter?: Maybe<TeamMemberFilter>;
};

export type MutationTestOutcomeCreateArgs = {
	data: TestOutcomeCreateInput;
};

export type MutationTestOutcomeCreateManyArgs = {
	data: Array<Maybe<TestOutcomeCreateManyInput>>;
};

export type MutationTestOutcomeDeleteArgs = {
	data?: Maybe<TestOutcomeDeleteInput>;
	filter?: Maybe<TestOutcomeKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTestOutcomeDeleteByFilterArgs = {
	filter: TestOutcomeFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTestOutcomeDestroyArgs = {
	filter?: Maybe<TestOutcomeKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTestOutcomeDestroyByFilterArgs = {
	filter: TestOutcomeFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTestOutcomeRestoreArgs = {
	id: Scalars['String'];
};

export type MutationTestOutcomeUpdateArgs = {
	data: TestOutcomeUpdateInput;
	filter?: Maybe<TestOutcomeKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationTestOutcomeUpdateByFilterArgs = {
	data: TestOutcomeUpdateByFilterInput;
	filter?: Maybe<TestOutcomeFilter>;
};

export type MutationTestRunCreateArgs = {
	data: TestRunCreateInput;
};

export type MutationTestRunCreateManyArgs = {
	data: Array<Maybe<TestRunCreateManyInput>>;
};

export type MutationTestRunDeleteArgs = {
	data?: Maybe<TestRunDeleteInput>;
	filter?: Maybe<TestRunKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTestRunDeleteByFilterArgs = {
	filter: TestRunFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTestRunDestroyArgs = {
	filter?: Maybe<TestRunKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTestRunDestroyByFilterArgs = {
	filter: TestRunFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationTestRunRestoreArgs = {
	id: Scalars['String'];
};

export type MutationTestRunUpdateArgs = {
	data: TestRunUpdateInput;
	filter?: Maybe<TestRunKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationTestRunUpdateByFilterArgs = {
	data: TestRunUpdateByFilterInput;
	filter?: Maybe<TestRunFilter>;
};

export type MutationUserChangePasswordArgs = {
	data: ChangePasswordInput;
};

export type MutationUserCreateArgs = {
	data: UserCreateInput;
};

export type MutationUserCreateManyArgs = {
	data: Array<Maybe<UserCreateManyInput>>;
};

export type MutationUserDeleteArgs = {
	data?: Maybe<UserDeleteInput>;
	filter?: Maybe<UserKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationUserDeleteByFilterArgs = {
	filter: UserFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationUserDestroyArgs = {
	filter?: Maybe<UserKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationUserDestroyByFilterArgs = {
	filter: UserFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationUserLoginArgs = {
	data: UserLoginInput;
};

export type MutationUserPasswordForgotArgs = {
	data: PasswordForgotInput;
};

export type MutationUserPasswordForgotConfirmArgs = {
	data: PasswordForgotConfirmInput;
};

export type MutationUserRefreshTokenArgs = {
	data: RefreshTokenInput;
};

export type MutationUserRestoreArgs = {
	id: Scalars['String'];
};

export type MutationUserSignUpArgs = {
	user: UserCreateInput;
	authProfileId?: Maybe<Scalars['ID']>;
};

export type MutationUserSignUpResendArgs = {
	data: SignUpResendInput;
};

export type MutationUserSignUpWithPasswordArgs = {
	user: UserCreateInput;
	password: Scalars['String'];
	authProfileId?: Maybe<Scalars['ID']>;
};

export type MutationUserSignUpWithTokenArgs = {
	user: UserCreateInput;
	authProfileId?: Maybe<Scalars['ID']>;
};

export type MutationUserStoryCreateArgs = {
	data: UserStoryCreateInput;
};

export type MutationUserStoryCreateManyArgs = {
	data: Array<Maybe<UserStoryCreateManyInput>>;
};

export type MutationUserStoryDeleteArgs = {
	data?: Maybe<UserStoryDeleteInput>;
	filter?: Maybe<UserStoryKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationUserStoryDeleteByFilterArgs = {
	filter: UserStoryFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationUserStoryDestroyArgs = {
	filter?: Maybe<UserStoryKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationUserStoryDestroyByFilterArgs = {
	filter: UserStoryFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationUserStoryRestoreArgs = {
	id: Scalars['String'];
};

export type MutationUserStoryUpdateArgs = {
	data: UserStoryUpdateInput;
	filter?: Maybe<UserStoryKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationUserStoryUpdateByFilterArgs = {
	data: UserStoryUpdateByFilterInput;
	filter?: Maybe<UserStoryFilter>;
};

export type MutationUserUpdateArgs = {
	data: UserUpdateInput;
	filter?: Maybe<UserKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationUserUpdateByFilterArgs = {
	data: UserUpdateByFilterInput;
	filter?: Maybe<UserFilter>;
};

export type MutationUserVerificationEmailResendArgs = {
	data: VerificationEmailResendInput;
	authProfileId?: Maybe<Scalars['ID']>;
};

export type MutationViewCreateArgs = {
	data: ViewCreateInput;
};

export type MutationViewUpdateArgs = {
	data: ViewUpdateInput;
};

export type MutationWorkspaceCreateArgs = {
	data: WorkspaceCreateMutationInput;
};

export type MutationWorkspaceCreateAsyncArgs = {
	data: WorkspaceCreateMutationInput;
};

export type MutationWorkspaceDeleteArgs = {
	data: WorkspaceDeleteMutationInput;
};

export type MutationWorkspaceLeaveArgs = {
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationWorkspaceUpdateArgs = {
	data: WorkspaceUpdateMutationInput;
};

export enum MutationType {
	Create = 'create',
	Update = 'update',
	Delete = 'delete',
	Destroy = 'destroy',
}

/** Number Field Attributes */
export type NumberFieldTypeAttributes = {
	__typename?: 'NumberFieldTypeAttributes';
	format: Scalars['String'];
	precision?: Maybe<Scalars['Int']>;
	currency?: Maybe<Scalars['String']>;
	minValue?: Maybe<Scalars['Float']>;
	maxValue?: Maybe<Scalars['Float']>;
	isBigInt?: Maybe<Scalars['Boolean']>;
	autoIncrement?: Maybe<Scalars['Boolean']>;
};

/** Number Type Format Enum */
export enum NumberTypeFormatEnum {
	Number = 'NUMBER',
	Currency = 'CURRENCY',
	Percentage = 'PERCENTAGE',
	Fraction = 'FRACTION',
	Scientific = 'SCIENTIFIC',
}

/** SeleniumCommand create input from open */
export type Open_SeleniumCommandCreateInput = {
	open?: Maybe<SeleniumCommandOpenRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeRelationInput>;
	click?: Maybe<SeleniumCommandClickRelationInput>;
	type?: Maybe<SeleniumCommandTypeRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropRelationInput>;
	sIndex: Scalars['Int'];
	group?: Maybe<SeleniumCommandGroupRelationInput>;
};

/** SeleniumCommand update input from open */
export type Open_SeleniumCommandUpdateInput = {
	open?: Maybe<SeleniumCommandOpenUpdateRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeUpdateRelationInput>;
	click?: Maybe<SeleniumCommandClickUpdateRelationInput>;
	type?: Maybe<SeleniumCommandTypeUpdateRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropUpdateRelationInput>;
	sIndex?: Maybe<Scalars['Int']>;
	group?: Maybe<SeleniumCommandGroupUpdateRelationInput>;
};

export type OrganizationUserInvitationResponse = {
	__typename?: 'OrganizationUserInvitationResponse';
	invitationId: Scalars['String'];
};

/** PasswordForgotConfirmInput */
export type PasswordForgotConfirmInput = {
	email: Scalars['String'];
	code: Scalars['String'];
	newPassword: Scalars['String'];
	authProfileId: Scalars['ID'];
};

/** PasswordForgotInput */
export type PasswordForgotInput = {
	email: Scalars['String'];
	authProfileId: Scalars['ID'];
};

export type PatternFunctionArguments = {
	pattern: Scalars['String'];
	escape?: Maybe<Scalars['String']>;
};

export type Permission = {
	__typename?: 'Permission';
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	createdBy?: Maybe<User>;
	appId?: Maybe<Scalars['String']>;
	resourceType?: Maybe<Scalars['String']>;
	resource?: Maybe<Scalars['String']>;
	permission?: Maybe<Scalars['JSON']>;
	role?: Maybe<Role>;
	_description?: Maybe<Scalars['String']>;
};

export type Permission_PermissionFilter = {
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	appId?: Maybe<StringPredicate>;
	resourceType?: Maybe<StringPredicate>;
	resource?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	role?: Maybe<Role_PermissionFilter>;
	AND?: Maybe<Array<Permission_PermissionFilter>>;
	OR?: Maybe<Array<Permission_PermissionFilter>>;
};

export type Permission_PermissionRelationFilter = {
	some?: Maybe<Permission_PermissionFilter>;
	every?: Maybe<Permission_PermissionFilter>;
	none?: Maybe<Permission_PermissionFilter>;
};

export type PermissionFilter = {
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	appId?: Maybe<StringPredicate>;
	resourceType?: Maybe<StringPredicate>;
	resource?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	role?: Maybe<RoleFilter>;
	AND?: Maybe<Array<PermissionFilter>>;
	OR?: Maybe<Array<PermissionFilter>>;
};

export type PermissionGroupByQuery = {
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	appId?: Maybe<Array<GroupByField>>;
	resourceType?: Maybe<Array<GroupByField>>;
	resource?: Maybe<Array<GroupByField>>;
	permission?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	role?: Maybe<RoleGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

/** Permission Filter */
export type PermissionInputFilter = {
	resourceType?: Maybe<PermissionResourceTypeEnum>;
	action?: Maybe<Scalars['String']>;
	resource?: Maybe<Scalars['String']>;
	applicationName?: Maybe<Scalars['String']>;
};

/** PermissionListResponse output */
export type PermissionListResponse = {
	__typename?: 'PermissionListResponse';
	/** List items */
	items: Array<Permission>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** Permissions subscription payload */
export type PermissionPayload = {
	__typename?: 'PermissionPayload';
	mutation: MutationType;
	node?: Maybe<Permission>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Permission>;
};

export type PermissionRelationFilter = {
	some?: Maybe<PermissionFilter>;
	every?: Maybe<PermissionFilter>;
	none?: Maybe<PermissionFilter>;
};

export enum PermissionResourceTypeEnum {
	Data = 'data',
	Custom = 'custom',
}

/** custom permissions input */
export type PermissionsCustom = {
	data?: Maybe<PermissionsCustomData>;
	logic?: Maybe<PermissionsCustomLogic>;
	users?: Maybe<PermissionsCustomUsers>;
	settings?: Maybe<PermissionsCustomSettings>;
};

export type PermissionsCustomData = {
	schemaManagement?: Maybe<PermissionsCustomDataSchemaManagement>;
	viewerAccess?: Maybe<PermissionsCustomDataViewerAccess>;
};

export type PermissionsCustomDataSchemaManagement = {
	allow: Scalars['Boolean'];
};

export type PermissionsCustomDataViewerAccess = {
	allow: Scalars['Boolean'];
};

export type PermissionsCustomLogic = {
	view?: Maybe<PermissionsCustomLogicView>;
	deploy?: Maybe<PermissionsCustomLogicDeploy>;
	invoke?: Maybe<PermissionsCustomLogicInvoke>;
	logs?: Maybe<PermissionsCustomLogicLogs>;
};

export type PermissionsCustomLogicDeploy = {
	allow: Scalars['Boolean'];
};

export type PermissionsCustomLogicInvoke = {
	allow: Scalars['Boolean'];
};

export type PermissionsCustomLogicLogs = {
	allow: Scalars['Boolean'];
};

export type PermissionsCustomLogicView = {
	allow: Scalars['Boolean'];
};

export type PermissionsCustomSettings = {
	workspaceAdministration?: Maybe<PermissionsCustomSettingsWorkspaceAdministration>;
};

export type PermissionsCustomSettingsWorkspaceAdministration = {
	allow: Scalars['Boolean'];
};

export type PermissionsCustomUsers = {
	teamAdministration?: Maybe<PermissionsCustomUsersTeamAdministration>;
};

export type PermissionsCustomUsersTeamAdministration = {
	allow: Scalars['Boolean'];
};

/** Schema tables permissions input */
export type PermissionsData = {
	Users?: Maybe<PermissionsDataUsers>;
	Files?: Maybe<PermissionsDataFiles>;
	Roles?: Maybe<PermissionsDataRoles>;
	CiCdMigrations?: Maybe<PermissionsDataCiCdMigrations>;
	Project?: Maybe<PermissionsDataProject>;
	Configuration?: Maybe<PermissionsDataConfiguration>;
	Integration?: Maybe<PermissionsDataIntegration>;
	IntegrationDetails?: Maybe<PermissionsDataIntegrationDetails>;
	Slack?: Maybe<PermissionsDataSlack>;
	Activity?: Maybe<PermissionsDataActivity>;
	UserStory?: Maybe<PermissionsDataUserStory>;
	Recording?: Maybe<PermissionsDataRecording>;
	Environment?: Maybe<PermissionsDataEnvironment>;
	TestOutcome?: Maybe<PermissionsDataTestOutcome>;
	TestRun?: Maybe<PermissionsDataTestRun>;
	Release?: Maybe<PermissionsDataRelease>;
	AuthenticationToken?: Maybe<PermissionsDataAuthenticationToken>;
	SeleniumScript?: Maybe<PermissionsDataSeleniumScript>;
	SeleniumOpen?: Maybe<PermissionsDataSeleniumOpen>;
	SeleniumSetViewportSize?: Maybe<PermissionsDataSeleniumSetViewportSize>;
	SeleniumClick?: Maybe<PermissionsDataSeleniumClick>;
	SeleniumTarget?: Maybe<PermissionsDataSeleniumTarget>;
	SeleniumType?: Maybe<PermissionsDataSeleniumType>;
	SeleniumDragndrop?: Maybe<PermissionsDataSeleniumDragndrop>;
	SeleniumPoint?: Maybe<PermissionsDataSeleniumPoint>;
	SeleniumCommand?: Maybe<PermissionsDataSeleniumCommand>;
	SeleniumSelector?: Maybe<PermissionsDataSeleniumSelector>;
	SeleniumGroup?: Maybe<PermissionsDataSeleniumGroup>;
	Error?: Maybe<PermissionsDataError>;
	Metrics?: Maybe<PermissionsDataMetrics>;
};

export type PermissionsDataActivity = {
	create?: Maybe<PermissionsDataActivityCreate>;
	read?: Maybe<PermissionsDataActivityRead>;
	update?: Maybe<PermissionsDataActivityUpdate>;
	delete?: Maybe<PermissionsDataActivityDelete>;
	destroy?: Maybe<PermissionsDataActivityDestroy>;
};

export type PermissionsDataActivityCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataActivityDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataActivityDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataActivityRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Activity_PermissionFilter>;
	fields?: Maybe<ActivityFieldsPermissions>;
};

export type PermissionsDataActivityUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Activity_PermissionFilter>;
	fields?: Maybe<ActivityFieldsPermissions>;
};

export type PermissionsDataAuthenticationToken = {
	create?: Maybe<PermissionsDataAuthenticationTokenCreate>;
	read?: Maybe<PermissionsDataAuthenticationTokenRead>;
	update?: Maybe<PermissionsDataAuthenticationTokenUpdate>;
	delete?: Maybe<PermissionsDataAuthenticationTokenDelete>;
	destroy?: Maybe<PermissionsDataAuthenticationTokenDestroy>;
};

export type PermissionsDataAuthenticationTokenCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataAuthenticationTokenDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataAuthenticationTokenDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataAuthenticationTokenRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<AuthenticationToken_PermissionFilter>;
	fields?: Maybe<AuthenticationTokenFieldsPermissions>;
};

export type PermissionsDataAuthenticationTokenUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<AuthenticationToken_PermissionFilter>;
	fields?: Maybe<AuthenticationTokenFieldsPermissions>;
};

export type PermissionsDataCiCdMigrations = {
	create?: Maybe<PermissionsDataCiCdMigrationsCreate>;
	read?: Maybe<PermissionsDataCiCdMigrationsRead>;
	update?: Maybe<PermissionsDataCiCdMigrationsUpdate>;
	delete?: Maybe<PermissionsDataCiCdMigrationsDelete>;
	destroy?: Maybe<PermissionsDataCiCdMigrationsDestroy>;
};

export type PermissionsDataCiCdMigrationsCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataCiCdMigrationsDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataCiCdMigrationsDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataCiCdMigrationsRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<CiCdMigration_PermissionFilter>;
	fields?: Maybe<CiCdMigrationFieldsPermissions>;
};

export type PermissionsDataCiCdMigrationsUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<CiCdMigration_PermissionFilter>;
	fields?: Maybe<CiCdMigrationFieldsPermissions>;
};

export type PermissionsDataConfiguration = {
	create?: Maybe<PermissionsDataConfigurationCreate>;
	read?: Maybe<PermissionsDataConfigurationRead>;
	update?: Maybe<PermissionsDataConfigurationUpdate>;
	delete?: Maybe<PermissionsDataConfigurationDelete>;
	destroy?: Maybe<PermissionsDataConfigurationDestroy>;
};

export type PermissionsDataConfigurationCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataConfigurationDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataConfigurationDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataConfigurationRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Configuration_PermissionFilter>;
	fields?: Maybe<ConfigurationFieldsPermissions>;
};

export type PermissionsDataConfigurationUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Configuration_PermissionFilter>;
	fields?: Maybe<ConfigurationFieldsPermissions>;
};

export type PermissionsDataEnvironment = {
	create?: Maybe<PermissionsDataEnvironmentCreate>;
	read?: Maybe<PermissionsDataEnvironmentRead>;
	update?: Maybe<PermissionsDataEnvironmentUpdate>;
	delete?: Maybe<PermissionsDataEnvironmentDelete>;
	destroy?: Maybe<PermissionsDataEnvironmentDestroy>;
};

export type PermissionsDataEnvironmentCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataEnvironmentDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataEnvironmentDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataEnvironmentRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Environment_PermissionFilter>;
	fields?: Maybe<EnvironmentFieldsPermissions>;
};

export type PermissionsDataEnvironmentUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Environment_PermissionFilter>;
	fields?: Maybe<EnvironmentFieldsPermissions>;
};

export type PermissionsDataError = {
	create?: Maybe<PermissionsDataErrorCreate>;
	read?: Maybe<PermissionsDataErrorRead>;
	update?: Maybe<PermissionsDataErrorUpdate>;
	delete?: Maybe<PermissionsDataErrorDelete>;
	destroy?: Maybe<PermissionsDataErrorDestroy>;
};

export type PermissionsDataErrorCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataErrorDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataErrorDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataErrorRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Error_PermissionFilter>;
	fields?: Maybe<ErrorFieldsPermissions>;
};

export type PermissionsDataErrorUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Error_PermissionFilter>;
	fields?: Maybe<ErrorFieldsPermissions>;
};

export type PermissionsDataFiles = {
	create?: Maybe<PermissionsDataFilesCreate>;
	read?: Maybe<PermissionsDataFilesRead>;
	update?: Maybe<PermissionsDataFilesUpdate>;
	delete?: Maybe<PermissionsDataFilesDelete>;
	destroy?: Maybe<PermissionsDataFilesDestroy>;
};

export type PermissionsDataFilesCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataFilesDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataFilesDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataFilesRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<File_PermissionFilter>;
	fields?: Maybe<FileFieldsPermissions>;
};

export type PermissionsDataFilesUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<File_PermissionFilter>;
	fields?: Maybe<FileFieldsPermissions>;
};

export type PermissionsDataIntegration = {
	create?: Maybe<PermissionsDataIntegrationCreate>;
	read?: Maybe<PermissionsDataIntegrationRead>;
	update?: Maybe<PermissionsDataIntegrationUpdate>;
	delete?: Maybe<PermissionsDataIntegrationDelete>;
	destroy?: Maybe<PermissionsDataIntegrationDestroy>;
};

export type PermissionsDataIntegrationCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataIntegrationDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataIntegrationDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataIntegrationDetails = {
	create?: Maybe<PermissionsDataIntegrationDetailsCreate>;
	read?: Maybe<PermissionsDataIntegrationDetailsRead>;
	update?: Maybe<PermissionsDataIntegrationDetailsUpdate>;
	delete?: Maybe<PermissionsDataIntegrationDetailsDelete>;
	destroy?: Maybe<PermissionsDataIntegrationDetailsDestroy>;
};

export type PermissionsDataIntegrationDetailsCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataIntegrationDetailsDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataIntegrationDetailsDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataIntegrationDetailsRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<IntegrationDetail_PermissionFilter>;
	fields?: Maybe<IntegrationDetailFieldsPermissions>;
};

export type PermissionsDataIntegrationDetailsUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<IntegrationDetail_PermissionFilter>;
	fields?: Maybe<IntegrationDetailFieldsPermissions>;
};

export type PermissionsDataIntegrationRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Integration_PermissionFilter>;
	fields?: Maybe<IntegrationFieldsPermissions>;
};

export type PermissionsDataIntegrationUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Integration_PermissionFilter>;
	fields?: Maybe<IntegrationFieldsPermissions>;
};

export type PermissionsDataMetrics = {
	create?: Maybe<PermissionsDataMetricsCreate>;
	read?: Maybe<PermissionsDataMetricsRead>;
	update?: Maybe<PermissionsDataMetricsUpdate>;
	delete?: Maybe<PermissionsDataMetricsDelete>;
	destroy?: Maybe<PermissionsDataMetricsDestroy>;
};

export type PermissionsDataMetricsCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataMetricsDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataMetricsDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataMetricsRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Metric_PermissionFilter>;
	fields?: Maybe<MetricFieldsPermissions>;
};

export type PermissionsDataMetricsUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Metric_PermissionFilter>;
	fields?: Maybe<MetricFieldsPermissions>;
};

export type PermissionsDataProject = {
	create?: Maybe<PermissionsDataProjectCreate>;
	read?: Maybe<PermissionsDataProjectRead>;
	update?: Maybe<PermissionsDataProjectUpdate>;
	delete?: Maybe<PermissionsDataProjectDelete>;
	destroy?: Maybe<PermissionsDataProjectDestroy>;
};

export type PermissionsDataProjectCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataProjectDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataProjectDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataProjectRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Project_PermissionFilter>;
	fields?: Maybe<ProjectFieldsPermissions>;
};

export type PermissionsDataProjectUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Project_PermissionFilter>;
	fields?: Maybe<ProjectFieldsPermissions>;
};

export type PermissionsDataRecording = {
	create?: Maybe<PermissionsDataRecordingCreate>;
	read?: Maybe<PermissionsDataRecordingRead>;
	update?: Maybe<PermissionsDataRecordingUpdate>;
	delete?: Maybe<PermissionsDataRecordingDelete>;
	destroy?: Maybe<PermissionsDataRecordingDestroy>;
};

export type PermissionsDataRecordingCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataRecordingDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataRecordingDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataRecordingRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Recording_PermissionFilter>;
	fields?: Maybe<RecordingFieldsPermissions>;
};

export type PermissionsDataRecordingUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Recording_PermissionFilter>;
	fields?: Maybe<RecordingFieldsPermissions>;
};

export type PermissionsDataRelease = {
	create?: Maybe<PermissionsDataReleaseCreate>;
	read?: Maybe<PermissionsDataReleaseRead>;
	update?: Maybe<PermissionsDataReleaseUpdate>;
	delete?: Maybe<PermissionsDataReleaseDelete>;
	destroy?: Maybe<PermissionsDataReleaseDestroy>;
};

export type PermissionsDataReleaseCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataReleaseDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataReleaseDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataReleaseRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Release_PermissionFilter>;
	fields?: Maybe<ReleaseFieldsPermissions>;
};

export type PermissionsDataReleaseUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Release_PermissionFilter>;
	fields?: Maybe<ReleaseFieldsPermissions>;
};

export type PermissionsDataRoles = {
	create?: Maybe<PermissionsDataRolesCreate>;
	read?: Maybe<PermissionsDataRolesRead>;
	update?: Maybe<PermissionsDataRolesUpdate>;
	delete?: Maybe<PermissionsDataRolesDelete>;
	destroy?: Maybe<PermissionsDataRolesDestroy>;
};

export type PermissionsDataRolesCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataRolesDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataRolesDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataRolesRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Role_PermissionFilter>;
	fields?: Maybe<RoleFieldsPermissions>;
};

export type PermissionsDataRolesUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Role_PermissionFilter>;
	fields?: Maybe<RoleFieldsPermissions>;
};

export type PermissionsDataSeleniumClick = {
	create?: Maybe<PermissionsDataSeleniumClickCreate>;
	read?: Maybe<PermissionsDataSeleniumClickRead>;
	update?: Maybe<PermissionsDataSeleniumClickUpdate>;
	delete?: Maybe<PermissionsDataSeleniumClickDelete>;
	destroy?: Maybe<PermissionsDataSeleniumClickDestroy>;
};

export type PermissionsDataSeleniumClickCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumClickDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumClickDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumClickRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumClick_PermissionFilter>;
	fields?: Maybe<SeleniumClickFieldsPermissions>;
};

export type PermissionsDataSeleniumClickUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumClick_PermissionFilter>;
	fields?: Maybe<SeleniumClickFieldsPermissions>;
};

export type PermissionsDataSeleniumCommand = {
	create?: Maybe<PermissionsDataSeleniumCommandCreate>;
	read?: Maybe<PermissionsDataSeleniumCommandRead>;
	update?: Maybe<PermissionsDataSeleniumCommandUpdate>;
	delete?: Maybe<PermissionsDataSeleniumCommandDelete>;
	destroy?: Maybe<PermissionsDataSeleniumCommandDestroy>;
};

export type PermissionsDataSeleniumCommandCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumCommandDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumCommandDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumCommandRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumCommand_PermissionFilter>;
	fields?: Maybe<SeleniumCommandFieldsPermissions>;
};

export type PermissionsDataSeleniumCommandUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumCommand_PermissionFilter>;
	fields?: Maybe<SeleniumCommandFieldsPermissions>;
};

export type PermissionsDataSeleniumDragndrop = {
	create?: Maybe<PermissionsDataSeleniumDragndropCreate>;
	read?: Maybe<PermissionsDataSeleniumDragndropRead>;
	update?: Maybe<PermissionsDataSeleniumDragndropUpdate>;
	delete?: Maybe<PermissionsDataSeleniumDragndropDelete>;
	destroy?: Maybe<PermissionsDataSeleniumDragndropDestroy>;
};

export type PermissionsDataSeleniumDragndropCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumDragndropDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumDragndropDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumDragndropRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumDragndrop_PermissionFilter>;
	fields?: Maybe<SeleniumDragndropFieldsPermissions>;
};

export type PermissionsDataSeleniumDragndropUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumDragndrop_PermissionFilter>;
	fields?: Maybe<SeleniumDragndropFieldsPermissions>;
};

export type PermissionsDataSeleniumGroup = {
	create?: Maybe<PermissionsDataSeleniumGroupCreate>;
	read?: Maybe<PermissionsDataSeleniumGroupRead>;
	update?: Maybe<PermissionsDataSeleniumGroupUpdate>;
	delete?: Maybe<PermissionsDataSeleniumGroupDelete>;
	destroy?: Maybe<PermissionsDataSeleniumGroupDestroy>;
};

export type PermissionsDataSeleniumGroupCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumGroupDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumGroupDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumGroupRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumGroup_PermissionFilter>;
	fields?: Maybe<SeleniumGroupFieldsPermissions>;
};

export type PermissionsDataSeleniumGroupUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumGroup_PermissionFilter>;
	fields?: Maybe<SeleniumGroupFieldsPermissions>;
};

export type PermissionsDataSeleniumOpen = {
	create?: Maybe<PermissionsDataSeleniumOpenCreate>;
	read?: Maybe<PermissionsDataSeleniumOpenRead>;
	update?: Maybe<PermissionsDataSeleniumOpenUpdate>;
	delete?: Maybe<PermissionsDataSeleniumOpenDelete>;
	destroy?: Maybe<PermissionsDataSeleniumOpenDestroy>;
};

export type PermissionsDataSeleniumOpenCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumOpenDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumOpenDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumOpenRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumOpen_PermissionFilter>;
	fields?: Maybe<SeleniumOpenFieldsPermissions>;
};

export type PermissionsDataSeleniumOpenUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumOpen_PermissionFilter>;
	fields?: Maybe<SeleniumOpenFieldsPermissions>;
};

export type PermissionsDataSeleniumPoint = {
	create?: Maybe<PermissionsDataSeleniumPointCreate>;
	read?: Maybe<PermissionsDataSeleniumPointRead>;
	update?: Maybe<PermissionsDataSeleniumPointUpdate>;
	delete?: Maybe<PermissionsDataSeleniumPointDelete>;
	destroy?: Maybe<PermissionsDataSeleniumPointDestroy>;
};

export type PermissionsDataSeleniumPointCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumPointDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumPointDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumPointRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumPoint_PermissionFilter>;
	fields?: Maybe<SeleniumPointFieldsPermissions>;
};

export type PermissionsDataSeleniumPointUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumPoint_PermissionFilter>;
	fields?: Maybe<SeleniumPointFieldsPermissions>;
};

export type PermissionsDataSeleniumScript = {
	create?: Maybe<PermissionsDataSeleniumScriptCreate>;
	read?: Maybe<PermissionsDataSeleniumScriptRead>;
	update?: Maybe<PermissionsDataSeleniumScriptUpdate>;
	delete?: Maybe<PermissionsDataSeleniumScriptDelete>;
	destroy?: Maybe<PermissionsDataSeleniumScriptDestroy>;
};

export type PermissionsDataSeleniumScriptCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumScriptDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumScriptDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumScriptRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumScript_PermissionFilter>;
	fields?: Maybe<SeleniumScriptFieldsPermissions>;
};

export type PermissionsDataSeleniumScriptUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumScript_PermissionFilter>;
	fields?: Maybe<SeleniumScriptFieldsPermissions>;
};

export type PermissionsDataSeleniumSelector = {
	create?: Maybe<PermissionsDataSeleniumSelectorCreate>;
	read?: Maybe<PermissionsDataSeleniumSelectorRead>;
	update?: Maybe<PermissionsDataSeleniumSelectorUpdate>;
	delete?: Maybe<PermissionsDataSeleniumSelectorDelete>;
	destroy?: Maybe<PermissionsDataSeleniumSelectorDestroy>;
};

export type PermissionsDataSeleniumSelectorCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumSelectorDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumSelectorDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumSelectorRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumSelector_PermissionFilter>;
	fields?: Maybe<SeleniumSelectorFieldsPermissions>;
};

export type PermissionsDataSeleniumSelectorUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumSelector_PermissionFilter>;
	fields?: Maybe<SeleniumSelectorFieldsPermissions>;
};

export type PermissionsDataSeleniumSetViewportSize = {
	create?: Maybe<PermissionsDataSeleniumSetViewportSizeCreate>;
	read?: Maybe<PermissionsDataSeleniumSetViewportSizeRead>;
	update?: Maybe<PermissionsDataSeleniumSetViewportSizeUpdate>;
	delete?: Maybe<PermissionsDataSeleniumSetViewportSizeDelete>;
	destroy?: Maybe<PermissionsDataSeleniumSetViewportSizeDestroy>;
};

export type PermissionsDataSeleniumSetViewportSizeCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumSetViewportSizeDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumSetViewportSizeDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumSetViewportSizeRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumSetViewportSize_PermissionFilter>;
	fields?: Maybe<SeleniumSetViewportSizeFieldsPermissions>;
};

export type PermissionsDataSeleniumSetViewportSizeUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumSetViewportSize_PermissionFilter>;
	fields?: Maybe<SeleniumSetViewportSizeFieldsPermissions>;
};

export type PermissionsDataSeleniumTarget = {
	create?: Maybe<PermissionsDataSeleniumTargetCreate>;
	read?: Maybe<PermissionsDataSeleniumTargetRead>;
	update?: Maybe<PermissionsDataSeleniumTargetUpdate>;
	delete?: Maybe<PermissionsDataSeleniumTargetDelete>;
	destroy?: Maybe<PermissionsDataSeleniumTargetDestroy>;
};

export type PermissionsDataSeleniumTargetCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumTargetDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumTargetDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumTargetRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumTarget_PermissionFilter>;
	fields?: Maybe<SeleniumTargetFieldsPermissions>;
};

export type PermissionsDataSeleniumTargetUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumTarget_PermissionFilter>;
	fields?: Maybe<SeleniumTargetFieldsPermissions>;
};

export type PermissionsDataSeleniumType = {
	create?: Maybe<PermissionsDataSeleniumTypeCreate>;
	read?: Maybe<PermissionsDataSeleniumTypeRead>;
	update?: Maybe<PermissionsDataSeleniumTypeUpdate>;
	delete?: Maybe<PermissionsDataSeleniumTypeDelete>;
	destroy?: Maybe<PermissionsDataSeleniumTypeDestroy>;
};

export type PermissionsDataSeleniumTypeCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumTypeDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSeleniumTypeDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSeleniumTypeRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumType_PermissionFilter>;
	fields?: Maybe<SeleniumTypeFieldsPermissions>;
};

export type PermissionsDataSeleniumTypeUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<SeleniumType_PermissionFilter>;
	fields?: Maybe<SeleniumTypeFieldsPermissions>;
};

export type PermissionsDataSlack = {
	create?: Maybe<PermissionsDataSlackCreate>;
	read?: Maybe<PermissionsDataSlackRead>;
	update?: Maybe<PermissionsDataSlackUpdate>;
	delete?: Maybe<PermissionsDataSlackDelete>;
	destroy?: Maybe<PermissionsDataSlackDestroy>;
};

export type PermissionsDataSlackCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSlackDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataSlackDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataSlackRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Slack_PermissionFilter>;
	fields?: Maybe<SlackFieldsPermissions>;
};

export type PermissionsDataSlackUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Slack_PermissionFilter>;
	fields?: Maybe<SlackFieldsPermissions>;
};

export type PermissionsDataTestOutcome = {
	create?: Maybe<PermissionsDataTestOutcomeCreate>;
	read?: Maybe<PermissionsDataTestOutcomeRead>;
	update?: Maybe<PermissionsDataTestOutcomeUpdate>;
	delete?: Maybe<PermissionsDataTestOutcomeDelete>;
	destroy?: Maybe<PermissionsDataTestOutcomeDestroy>;
};

export type PermissionsDataTestOutcomeCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataTestOutcomeDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataTestOutcomeDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataTestOutcomeRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<TestOutcome_PermissionFilter>;
	fields?: Maybe<TestOutcomeFieldsPermissions>;
};

export type PermissionsDataTestOutcomeUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<TestOutcome_PermissionFilter>;
	fields?: Maybe<TestOutcomeFieldsPermissions>;
};

export type PermissionsDataTestRun = {
	create?: Maybe<PermissionsDataTestRunCreate>;
	read?: Maybe<PermissionsDataTestRunRead>;
	update?: Maybe<PermissionsDataTestRunUpdate>;
	delete?: Maybe<PermissionsDataTestRunDelete>;
	destroy?: Maybe<PermissionsDataTestRunDestroy>;
};

export type PermissionsDataTestRunCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataTestRunDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataTestRunDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataTestRunRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<TestRun_PermissionFilter>;
	fields?: Maybe<TestRunFieldsPermissions>;
};

export type PermissionsDataTestRunUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<TestRun_PermissionFilter>;
	fields?: Maybe<TestRunFieldsPermissions>;
};

export type PermissionsDataUsers = {
	create?: Maybe<PermissionsDataUsersCreate>;
	read?: Maybe<PermissionsDataUsersRead>;
	update?: Maybe<PermissionsDataUsersUpdate>;
	delete?: Maybe<PermissionsDataUsersDelete>;
	destroy?: Maybe<PermissionsDataUsersDestroy>;
};

export type PermissionsDataUsersCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataUsersDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataUsersDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataUsersRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<User_PermissionFilter>;
	fields?: Maybe<UserFieldsPermissions>;
};

export type PermissionsDataUserStory = {
	create?: Maybe<PermissionsDataUserStoryCreate>;
	read?: Maybe<PermissionsDataUserStoryRead>;
	update?: Maybe<PermissionsDataUserStoryUpdate>;
	delete?: Maybe<PermissionsDataUserStoryDelete>;
	destroy?: Maybe<PermissionsDataUserStoryDestroy>;
};

export type PermissionsDataUserStoryCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataUserStoryDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataUserStoryDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataUserStoryRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<UserStory_PermissionFilter>;
	fields?: Maybe<UserStoryFieldsPermissions>;
};

export type PermissionsDataUserStoryUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<UserStory_PermissionFilter>;
	fields?: Maybe<UserStoryFieldsPermissions>;
};

export type PermissionsDataUsersUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<User_PermissionFilter>;
	fields?: Maybe<UserFieldsPermissions>;
};

/** PermissionsInput create input */
export type PermissionsInput = {
	data?: Maybe<PermissionsData>;
	custom?: Maybe<PermissionsCustom>;
};

/** Permissions subscription filter */
export type PermissionSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<PermissionFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** A project is the main entity of heirarchy in Meeshkan. It represents an application (such as Acme webapp or Acme iOs app). */
export type Project = {
	__typename?: 'Project';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	/** This avatar image represents your project. */
	avatar?: Maybe<File>;
	release?: Maybe<ReleaseListResponse>;
	configuration?: Maybe<Configuration>;
	integration?: Maybe<Integration>;
	activity?: Maybe<ActivityListResponse>;
	members?: Maybe<UserListResponse>;
	userStories?: Maybe<UserStoryListResponse>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<MetricListResponse>;
	_description?: Maybe<Scalars['String']>;
};

/** A project is the main entity of heirarchy in Meeshkan. It represents an application (such as Acme webapp or Acme iOs app). */
export type ProjectReleaseArgs = {
	filter?: Maybe<ReleaseFilter>;
	orderBy?: Maybe<Array<Maybe<ReleaseOrderBy>>>;
	sort?: Maybe<Array<ReleaseSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ReleaseGroupBy>;
};

/** A project is the main entity of heirarchy in Meeshkan. It represents an application (such as Acme webapp or Acme iOs app). */
export type ProjectActivityArgs = {
	filter?: Maybe<ActivityFilter>;
	orderBy?: Maybe<Array<Maybe<ActivityOrderBy>>>;
	sort?: Maybe<Array<ActivitySort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ActivityGroupBy>;
};

/** A project is the main entity of heirarchy in Meeshkan. It represents an application (such as Acme webapp or Acme iOs app). */
export type ProjectMembersArgs = {
	filter?: Maybe<UserFilter>;
	orderBy?: Maybe<Array<Maybe<UserOrderBy>>>;
	sort?: Maybe<Array<UserSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<UserGroupBy>;
};

/** A project is the main entity of heirarchy in Meeshkan. It represents an application (such as Acme webapp or Acme iOs app). */
export type ProjectUserStoriesArgs = {
	filter?: Maybe<UserStoryFilter>;
	orderBy?: Maybe<Array<Maybe<UserStoryOrderBy>>>;
	sort?: Maybe<Array<UserStorySort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<UserStoryGroupBy>;
};

/** A project is the main entity of heirarchy in Meeshkan. It represents an application (such as Acme webapp or Acme iOs app). */
export type ProjectMetricsArgs = {
	filter?: Maybe<MetricFilter>;
	orderBy?: Maybe<Array<Maybe<MetricOrderBy>>>;
	sort?: Maybe<Array<MetricSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<MetricGroupBy>;
};

/** Activity create input from project */
export type Project_ActivityCreateInput = {
	title: Scalars['String'];
	dateTime: Scalars['Date'];
	project?: Maybe<ActivityProjectRelationInput>;
};

/** Activity update input from project */
export type Project_ActivityUpdateInput = {
	filter?: Maybe<ActivityKeyFilter>;
	data: ActivityUpdateInput;
};

/** Files create input from project_avatar */
export type Project_Avatar_FileCreateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
};

/** Files update input from project_avatar */
export type Project_Avatar_FileUpdateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarUpdateRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarUpdateRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarUpdateRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoUpdateRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
};

/** Configuration create input from project */
export type Project_ConfigurationCreateInput = {
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink: Scalars['String'];
	project?: Maybe<ConfigurationProjectRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensRelationInput>;
	logInFlow?: Maybe<ConfigurationLogInFlowRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
};

/** Configuration update input from project */
export type Project_ConfigurationUpdateInput = {
	productionURL?: Maybe<Scalars['String']>;
	stagingURL?: Maybe<Scalars['String']>;
	stripeCustomerID?: Maybe<Scalars['String']>;
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<ConfigurationProjectUpdateRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensUpdateRelationInput>;
	logInFlow?: Maybe<ConfigurationLogInFlowUpdateRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/** This represents the plan this project is on in Stripe. This is updated by the logic webhook in `custom-graphql` */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/** This represents a few of the important subscription statuses in 8base. */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
};

/** Integration create input from project */
export type Project_IntegrationCreateInput = {
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementRelationInput>;
	slack?: Maybe<IntegrationSlackRelationInput>;
	project?: Maybe<IntegrationProjectRelationInput>;
};

/** Integration update input from project */
export type Project_IntegrationUpdateInput = {
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationUpdateRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementUpdateRelationInput>;
	slack?: Maybe<IntegrationSlackUpdateRelationInput>;
	project?: Maybe<IntegrationProjectUpdateRelationInput>;
};

/** Metrics create input from project */
export type Project_MetricCreateInput = {
	/** The average number of steps in a user story. */
	storyLengthMean?: Maybe<Scalars['Float']>;
	/**
	 * The middle count of steps in a user story. There is equal probability that a
	 * user story will have less steps and more steps.
	 */
	storyLengthMedian?: Maybe<Scalars['Float']>;
	/** The minimum number of steps created for a user story. */
	storyLengthMin?: Maybe<Scalars['Int']>;
	/** The maximum number of steps created for a user story. */
	storyLengthMax?: Maybe<Scalars['Int']>;
	/** The number of flows that created new user stories. */
	createdFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that were updating existing user stories. */
	updatedFlows?: Maybe<Scalars['Int']>;
	/** The number of flows that didn't get created or assigned to a user story. */
	ignoredFlows?: Maybe<Scalars['Int']>;
	project?: Maybe<MetricsProjectRelationInput>;
	/** Metrics are calculated daily, this represents that day. The value for March 4th, 2021 would be "03/04/2021". */
	calculatedFor?: Maybe<Scalars['Date']>;
};

/** Metrics update input from project */
export type Project_MetricUpdateInput = {
	filter?: Maybe<MetricKeyFilter>;
	data: MetricUpdateInput;
};

export type Project_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	hasReceivedEvents?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	avatar?: Maybe<File_PermissionFilter>;
	release?: Maybe<Release_PermissionRelationFilter>;
	configuration?: Maybe<Configuration_PermissionFilter>;
	integration?: Maybe<Integration_PermissionFilter>;
	activity?: Maybe<Activity_PermissionRelationFilter>;
	members?: Maybe<User_PermissionRelationFilter>;
	userStories?: Maybe<UserStory_PermissionRelationFilter>;
	metrics?: Maybe<Metric_PermissionRelationFilter>;
	AND?: Maybe<Array<Project_PermissionFilter>>;
	OR?: Maybe<Array<Project_PermissionFilter>>;
};

export type Project_PermissionRelationFilter = {
	some?: Maybe<Project_PermissionFilter>;
	every?: Maybe<Project_PermissionFilter>;
	none?: Maybe<Project_PermissionFilter>;
};

/** Release create input from project */
export type Project_ReleaseCreateInput = {
	/**
	 * This is the custom naming convention of a team for their releases. For example
	 * "echo", "foxtrot", "golf" or "v0.0.1", "v0.3.2".
	 */
	name?: Maybe<Scalars['String']>;
	/** The manually defined and planned date of a release merging to production. */
	releaseDate?: Maybe<Scalars['Date']>;
	testRuns?: Maybe<ReleaseTestRunsRelationInput>;
	project?: Maybe<ReleaseProjectRelationInput>;
};

/** Release update input from project */
export type Project_ReleaseUpdateInput = {
	filter?: Maybe<ReleaseKeyFilter>;
	data: ReleaseUpdateInput;
};

/** UserStory create input from project */
export type Project_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Scalars['String']>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationRelationInput>;
};

/** UserStory update input from project */
export type Project_UserStoryUpdateInput = {
	filter?: Maybe<UserStoryKeyFilter>;
	data: UserStoryUpdateInput;
};

/** Project relation input */
export type ProjectActivityManyRelationInput = {
	connect?: Maybe<Array<ActivityKeyFilter>>;
};

/** Project relation input */
export type ProjectActivityRelationInput = {
	connect?: Maybe<Array<ActivityKeyFilter>>;
	create?: Maybe<Array<Maybe<Project_ActivityCreateInput>>>;
};

/** Project relation input */
export type ProjectActivityUpdateRelationInput = {
	connect?: Maybe<Array<ActivityKeyFilter>>;
	disconnect?: Maybe<Array<ActivityKeyFilter>>;
	reconnect?: Maybe<Array<ActivityKeyFilter>>;
	create?: Maybe<Array<Maybe<Project_ActivityCreateInput>>>;
	update?: Maybe<Array<Maybe<Project_ActivityUpdateInput>>>;
};

/** Project relation input */
export type ProjectAvatarManyRelationInput = {
	connect?: Maybe<FileKeyFilter>;
};

/** Project relation input */
export type ProjectAvatarRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	create?: Maybe<Project_Avatar_FileCreateInput>;
};

/** Project relation input */
export type ProjectAvatarUpdateRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	disconnect?: Maybe<FileKeyFilter>;
	reconnect?: Maybe<FileKeyFilter>;
	create?: Maybe<Project_Avatar_FileCreateInput>;
	update?: Maybe<Project_Avatar_FileUpdateInput>;
};

/** Project relation input */
export type ProjectConfigurationRelationInput = {
	create?: Maybe<Project_ConfigurationCreateInput>;
};

/** Project relation input */
export type ProjectConfigurationUpdateRelationInput = {
	update?: Maybe<Project_ConfigurationUpdateInput>;
};

/** Project create input */
export type ProjectCreateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarRelationInput>;
	release?: Maybe<ProjectReleaseRelationInput>;
	configuration?: Maybe<ProjectConfigurationRelationInput>;
	integration?: Maybe<ProjectIntegrationRelationInput>;
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsRelationInput>;
};

/** Project create many input */
export type ProjectCreateManyInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarManyRelationInput>;
	release?: Maybe<ProjectReleaseManyRelationInput>;
	integration?: Maybe<ProjectIntegrationManyRelationInput>;
	activity?: Maybe<ProjectActivityManyRelationInput>;
	members?: Maybe<ProjectMembersManyRelationInput>;
	userStories?: Maybe<ProjectUserStoriesManyRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsManyRelationInput>;
};

/** Project delete input */
export type ProjectDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** ProjectFieldsPermissions create input */
export type ProjectFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['Boolean']>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
};

export type ProjectFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	hasReceivedEvents?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	avatar?: Maybe<FileFilter>;
	release?: Maybe<ReleaseRelationFilter>;
	configuration?: Maybe<ConfigurationFilter>;
	integration?: Maybe<IntegrationFilter>;
	activity?: Maybe<ActivityRelationFilter>;
	members?: Maybe<UserRelationFilter>;
	userStories?: Maybe<UserStoryRelationFilter>;
	metrics?: Maybe<MetricRelationFilter>;
	AND?: Maybe<Array<ProjectFilter>>;
	OR?: Maybe<Array<ProjectFilter>>;
};

export type ProjectGroupBy = {
	query: ProjectGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type ProjectGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	name?: Maybe<Array<GroupByField>>;
	hasReceivedEvents?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	avatar?: Maybe<FileGroupByQuery>;
	release?: Maybe<ReleaseGroupByQuery>;
	configuration?: Maybe<ConfigurationGroupByQuery>;
	integration?: Maybe<IntegrationGroupByQuery>;
	activity?: Maybe<ActivityGroupByQuery>;
	members?: Maybe<UserGroupByQuery>;
	userStories?: Maybe<UserStoryGroupByQuery>;
	metrics?: Maybe<MetricGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

/** Project relation input */
export type ProjectIntegrationManyRelationInput = {
	connect?: Maybe<IntegrationKeyFilter>;
};

/** Project relation input */
export type ProjectIntegrationRelationInput = {
	connect?: Maybe<IntegrationKeyFilter>;
	create?: Maybe<Project_IntegrationCreateInput>;
};

/** Project relation input */
export type ProjectIntegrationUpdateRelationInput = {
	connect?: Maybe<IntegrationKeyFilter>;
	disconnect?: Maybe<IntegrationKeyFilter>;
	reconnect?: Maybe<IntegrationKeyFilter>;
	create?: Maybe<Project_IntegrationCreateInput>;
	update?: Maybe<Project_IntegrationUpdateInput>;
};

export type ProjectKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** ProjectListResponse output */
export type ProjectListResponse = {
	__typename?: 'ProjectListResponse';
	/** List items */
	items: Array<Project>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** Integration create input from projectManagement */
export type ProjectManagement_IntegrationCreateInput = {
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementRelationInput>;
	slack?: Maybe<IntegrationSlackRelationInput>;
	project?: Maybe<IntegrationProjectRelationInput>;
};

/** IntegrationDetails create input from projectManagement */
export type ProjectManagement_IntegrationDetailCreateInput = {
	authenticated?: Maybe<Scalars['Boolean']>;
	accessToken?: Maybe<Scalars['String']>;
	integration?: Maybe<IntegrationDetailsIntegrationRelationInput>;
	projectManagement?: Maybe<IntegrationDetailsProjectManagementRelationInput>;
};

/** IntegrationDetails update input from projectManagement */
export type ProjectManagement_IntegrationDetailUpdateInput = {
	authenticated?: Maybe<Scalars['Boolean']>;
	accessToken?: Maybe<Scalars['String']>;
	integration?: Maybe<IntegrationDetailsIntegrationUpdateRelationInput>;
	projectManagement?: Maybe<IntegrationDetailsProjectManagementUpdateRelationInput>;
};

/** Integration update input from projectManagement */
export type ProjectManagement_IntegrationUpdateInput = {
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationUpdateRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementUpdateRelationInput>;
	slack?: Maybe<IntegrationSlackUpdateRelationInput>;
	project?: Maybe<IntegrationProjectUpdateRelationInput>;
};

/** ProjectManyResponse output */
export type ProjectManyResponse = {
	__typename?: 'ProjectManyResponse';
	/** List items */
	items: Array<Project>;
	/** List items count */
	count: Scalars['Int'];
};

/** Project relation input */
export type ProjectMembersManyRelationInput = {
	connect?: Maybe<Array<UserKeyFilter>>;
};

/** Project relation input */
export type ProjectMembersRelationInput = {
	connect?: Maybe<Array<UserKeyFilter>>;
	create?: Maybe<Array<Maybe<Projects_UserCreateInput>>>;
};

/** Project relation input */
export type ProjectMembersUpdateRelationInput = {
	connect?: Maybe<Array<UserKeyFilter>>;
	disconnect?: Maybe<Array<UserKeyFilter>>;
	reconnect?: Maybe<Array<UserKeyFilter>>;
	create?: Maybe<Array<Maybe<Projects_UserCreateInput>>>;
	update?: Maybe<Array<Maybe<Projects_UserUpdateInput>>>;
};

/** Project relation input */
export type ProjectMetricsManyRelationInput = {
	connect?: Maybe<Array<MetricKeyFilter>>;
};

/** Project relation input */
export type ProjectMetricsRelationInput = {
	connect?: Maybe<Array<MetricKeyFilter>>;
	create?: Maybe<Array<Maybe<Project_MetricCreateInput>>>;
};

/** Project relation input */
export type ProjectMetricsUpdateRelationInput = {
	connect?: Maybe<Array<MetricKeyFilter>>;
	disconnect?: Maybe<Array<MetricKeyFilter>>;
	reconnect?: Maybe<Array<MetricKeyFilter>>;
	create?: Maybe<Array<Maybe<Project_MetricCreateInput>>>;
	update?: Maybe<Array<Maybe<Project_MetricUpdateInput>>>;
};

/** No longer supported. Use `sort` instead. */
export enum ProjectOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
	HasReceivedEventsAsc = 'hasReceivedEvents_ASC',
	HasReceivedEventsDesc = 'hasReceivedEvents_DESC',
}

/** Project subscription payload */
export type ProjectPayload = {
	__typename?: 'ProjectPayload';
	mutation: MutationType;
	node?: Maybe<Project>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Project>;
};

export type ProjectRelationFilter = {
	some?: Maybe<ProjectFilter>;
	every?: Maybe<ProjectFilter>;
	none?: Maybe<ProjectFilter>;
};

/** Project relation input */
export type ProjectReleaseManyRelationInput = {
	connect?: Maybe<Array<ReleaseKeyFilter>>;
};

/** Project relation input */
export type ProjectReleaseRelationInput = {
	connect?: Maybe<Array<ReleaseKeyFilter>>;
	create?: Maybe<Array<Maybe<Project_ReleaseCreateInput>>>;
};

/** Project relation input */
export type ProjectReleaseUpdateRelationInput = {
	connect?: Maybe<Array<ReleaseKeyFilter>>;
	disconnect?: Maybe<Array<ReleaseKeyFilter>>;
	reconnect?: Maybe<Array<ReleaseKeyFilter>>;
	create?: Maybe<Array<Maybe<Project_ReleaseCreateInput>>>;
	update?: Maybe<Array<Maybe<Project_ReleaseUpdateInput>>>;
};

/** Users create input from projects */
export type Projects_UserCreateInput = {
	email: Scalars['String'];
	status?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	avatar?: Maybe<UsersAvatarRelationInput>;
	roles?: Maybe<UsersRolesRelationInput>;
	projects?: Maybe<UsersProjectsRelationInput>;
	jobTitle?: Maybe<Scalars['String']>;
	/** User setting to allow product updates to be sent to their email. */
	productNotifications?: Maybe<Scalars['Boolean']>;
};

/** Users update input from projects */
export type Projects_UserUpdateInput = {
	filter?: Maybe<UserKeyFilter>;
	data: UserUpdateInput;
};

export type ProjectSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	name?: Maybe<SortOrder>;
	hasReceivedEvents?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	avatar?: Maybe<FileSort>;
	configuration?: Maybe<ConfigurationSort>;
	integration?: Maybe<IntegrationSort>;
};

/** Project subscription filter */
export type ProjectSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<ProjectFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Project update input */
export type ProjectUpdateByFilterInput = {
	name?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	hasReceivedEvents?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
};

/** Project update input */
export type ProjectUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarUpdateRelationInput>;
	release?: Maybe<ProjectReleaseUpdateRelationInput>;
	configuration?: Maybe<ProjectConfigurationUpdateRelationInput>;
	integration?: Maybe<ProjectIntegrationUpdateRelationInput>;
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

/** Project relation input */
export type ProjectUserStoriesManyRelationInput = {
	connect?: Maybe<Array<UserStoryKeyFilter>>;
};

/** Project relation input */
export type ProjectUserStoriesRelationInput = {
	connect?: Maybe<Array<UserStoryKeyFilter>>;
	create?: Maybe<Array<Maybe<Project_UserStoryCreateInput>>>;
};

/** Project relation input */
export type ProjectUserStoriesUpdateRelationInput = {
	connect?: Maybe<Array<UserStoryKeyFilter>>;
	disconnect?: Maybe<Array<UserStoryKeyFilter>>;
	reconnect?: Maybe<Array<UserStoryKeyFilter>>;
	create?: Maybe<Array<Maybe<Project_UserStoryCreateInput>>>;
	update?: Maybe<Array<Maybe<Project_UserStoryUpdateInput>>>;
};

export type Query = {
	__typename?: 'Query';
	activitiesList: ActivityListResponse;
	activity?: Maybe<Activity>;
	apiToken?: Maybe<ApiToken>;
	apiTokensList: ApiTokenListResponse;
	/** @deprecated No longer supported. Use `system.application` instead. */
	application?: Maybe<Application>;
	/** @deprecated No longer supported. Use `system.applicationsList` instead. */
	applicationsList?: Maybe<ApplicationListResponse>;
	asyncSessionStatus?: Maybe<AsyncSessionStatusResponse>;
	authenticationProfile?: Maybe<AuthenticationProfile>;
	authenticationProfilesList: AuthenticationProfileListResponse;
	authenticationSettings?: Maybe<AuthenticationSetting>;
	authenticationToken?: Maybe<AuthenticationToken>;
	authenticationTokensList: AuthenticationTokenListResponse;
	/** @deprecated No longer supported. Use `system.billingCurrentPlan` instead. */
	billingCurrentPlan?: Maybe<BillingCurrentPlanResponse>;
	/** @deprecated No longer supported. Use `system.billingDetails` instead. */
	billingDetails?: Maybe<BillingDetailsResponse>;
	/** @deprecated No longer supported. Use `system.billingInvoicesList` instead. */
	billingInvoicesList: BillingInvoicesListResponse;
	/** @deprecated No longer supported. Use `system.billingMetricUsageQuotasList` instead. */
	billingMetricUsageQuotasList: BillingMetricUsageQuotasListResponse;
	/** @deprecated No longer supported. Use `system.billingMetricUsagesList` instead. */
	billingMetricUsagesList: BillingMetricUsagesListResponse;
	ciCdMigration?: Maybe<CiCdMigration>;
	ciCdMigrationsList: CiCdMigrationListResponse;
	companyName?: Maybe<Scalars['String']>;
	configuration?: Maybe<Configuration>;
	configurationsList: ConfigurationListResponse;
	/** @deprecated No longer supported. Use `system.deployStatus` instead. */
	deployStatus: DeployStatusResult;
	environment?: Maybe<Environment>;
	environmentVariable?: Maybe<EnvironmentVariable>;
	environmentVariablesList: EnvironmentVariableListResponse;
	environmentsList: EnvironmentListResponse;
	error?: Maybe<Error>;
	errorsList: ErrorListResponse;
	file?: Maybe<File>;
	fileUploadInfo?: Maybe<FileUploadInfoResponse>;
	filesList: FileListResponse;
	/** @deprecated No longer supported. Use `system.functionsList` instead. */
	functionsList?: Maybe<FunctionListResponse>;
	getWorkspaceTransferInfo?: Maybe<WorkspaceTransferItem>;
	integration?: Maybe<Integration>;
	integrationDetail?: Maybe<IntegrationDetail>;
	integrationDetailsList: IntegrationDetailListResponse;
	integrationsList: IntegrationListResponse;
	/** @deprecated No longer supported. Use `system.logsList` instead. */
	logs?: Maybe<Array<Maybe<Scalars['String']>>>;
	metric?: Maybe<Metric>;
	metricsList: MetricListResponse;
	project?: Maybe<Project>;
	projectsList: ProjectListResponse;
	recording?: Maybe<Recording>;
	recordingsList: RecordingListResponse;
	release?: Maybe<Release>;
	releasesList: ReleaseListResponse;
	role?: Maybe<Role>;
	rolesList: RoleListResponse;
	seleniumClick?: Maybe<SeleniumClick>;
	seleniumClicksList: SeleniumClickListResponse;
	seleniumCommand?: Maybe<SeleniumCommand>;
	seleniumCommandsList: SeleniumCommandListResponse;
	seleniumDragndrop?: Maybe<SeleniumDragndrop>;
	seleniumDragndropsList: SeleniumDragndropListResponse;
	seleniumGroup?: Maybe<SeleniumGroup>;
	seleniumGroupsList: SeleniumGroupListResponse;
	seleniumOpen?: Maybe<SeleniumOpen>;
	seleniumOpensList: SeleniumOpenListResponse;
	seleniumPoint?: Maybe<SeleniumPoint>;
	seleniumPointsList: SeleniumPointListResponse;
	seleniumScript?: Maybe<SeleniumScript>;
	seleniumScriptsList: SeleniumScriptListResponse;
	seleniumSelector?: Maybe<SeleniumSelector>;
	seleniumSelectorsList: SeleniumSelectorListResponse;
	seleniumSetViewportSize?: Maybe<SeleniumSetViewportSize>;
	seleniumSetViewportSizesList: SeleniumSetViewportSizeListResponse;
	seleniumTarget?: Maybe<SeleniumTarget>;
	seleniumTargetsList: SeleniumTargetListResponse;
	seleniumType?: Maybe<SeleniumType>;
	seleniumTypesList: SeleniumTypeListResponse;
	settings?: Maybe<Setting>;
	slack?: Maybe<Slack>;
	slacksList: SlackListResponse;
	system?: Maybe<SystemQuery>;
	/** @deprecated No longer supported. Use `system.table` instead. */
	table?: Maybe<Table>;
	/** @deprecated No longer supported. Use `system.tableField` instead. */
	tableField?: Maybe<TableField>;
	/** @deprecated No longer supported. Use `system.tablesList` instead. */
	tablesList: TableListResponse;
	teamInvitationDetails?: Maybe<TeamInvitationDetails>;
	teamInvitationsDetailsList?: Maybe<TeamInvitationsDetailsList>;
	teamMember?: Maybe<TeamMember>;
	teamMembersList: TeamMemberListResponse;
	testOutcome?: Maybe<TestOutcome>;
	testOutcomesList: TestOutcomeListResponse;
	testRun?: Maybe<TestRun>;
	testRunsList: TestRunListResponse;
	user?: Maybe<User>;
	userBillingConfiguration: UserBillingConfigurationResponse;
	userInvitationsList?: Maybe<UserInvitationList>;
	userStoriesList: UserStoryListResponse;
	userStory?: Maybe<UserStory>;
	usersList: UserListResponse;
	/** @deprecated No longer supported. Use `system.workspacesList` instead. */
	workspacesList?: Maybe<WorkspaceListResponse>;
};

export type QueryActivitiesListArgs = {
	filter?: Maybe<ActivityFilter>;
	orderBy?: Maybe<Array<Maybe<ActivityOrderBy>>>;
	sort?: Maybe<Array<ActivitySort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ActivityGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryActivityArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryApiTokenArgs = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryApiTokensListArgs = {
	filter?: Maybe<ApiTokenFilter>;
	orderBy?: Maybe<Array<Maybe<ApiTokenOrderBy>>>;
	sort?: Maybe<Array<ApiTokenSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ApiTokenGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryApplicationArgs = {
	id: Scalars['String'];
};

export type QueryAsyncSessionStatusArgs = {
	sessionId: Scalars['String'];
};

export type QueryAuthenticationProfileArgs = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryAuthenticationProfilesListArgs = {
	filter?: Maybe<AuthenticationProfileFilter>;
	orderBy?: Maybe<Array<Maybe<AuthenticationProfileOrderBy>>>;
	sort?: Maybe<Array<AuthenticationProfileSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<AuthenticationProfileGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryAuthenticationTokenArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryAuthenticationTokensListArgs = {
	filter?: Maybe<AuthenticationTokenFilter>;
	orderBy?: Maybe<Array<Maybe<AuthenticationTokenOrderBy>>>;
	sort?: Maybe<Array<AuthenticationTokenSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<AuthenticationTokenGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryBillingInvoicesListArgs = {
	by?: Maybe<BillingInvoicesListFilterType>;
	limit?: Maybe<Scalars['Int']>;
	before?: Maybe<Scalars['ID']>;
	after?: Maybe<Scalars['ID']>;
};

export type QueryBillingMetricUsagesListArgs = {
	filter?: Maybe<BillingMetricUsagesListFilter>;
};

export type QueryCiCdMigrationArgs = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryCiCdMigrationsListArgs = {
	filter?: Maybe<CiCdMigrationFilter>;
	orderBy?: Maybe<Array<Maybe<CiCdMigrationOrderBy>>>;
	sort?: Maybe<Array<CiCdMigrationSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<CiCdMigrationGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryConfigurationArgs = {
	id?: Maybe<Scalars['ID']>;
	inviteLink?: Maybe<Scalars['String']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryConfigurationsListArgs = {
	filter?: Maybe<ConfigurationFilter>;
	orderBy?: Maybe<Array<Maybe<ConfigurationOrderBy>>>;
	sort?: Maybe<Array<ConfigurationSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ConfigurationGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryDeployStatusArgs = {
	buildName: Scalars['String'];
};

export type QueryEnvironmentArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryEnvironmentVariableArgs = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryEnvironmentVariablesListArgs = {
	filter?: Maybe<EnvironmentVariableFilter>;
	orderBy?: Maybe<Array<Maybe<EnvironmentVariableOrderBy>>>;
	sort?: Maybe<Array<EnvironmentVariableSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<EnvironmentVariableGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryEnvironmentsListArgs = {
	filter?: Maybe<EnvironmentFilter>;
	orderBy?: Maybe<Array<Maybe<EnvironmentOrderBy>>>;
	sort?: Maybe<Array<EnvironmentSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<EnvironmentGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryErrorArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryErrorsListArgs = {
	filter?: Maybe<ErrorFilter>;
	orderBy?: Maybe<Array<Maybe<ErrorOrderBy>>>;
	sort?: Maybe<Array<ErrorSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ErrorGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryFileArgs = {
	id?: Maybe<Scalars['ID']>;
	fileId?: Maybe<Scalars['String']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryFilesListArgs = {
	filter?: Maybe<FileFilter>;
	orderBy?: Maybe<Array<Maybe<FileOrderBy>>>;
	sort?: Maybe<Array<FileSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<FileGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryFunctionsListArgs = {
	applicationId?: Maybe<Scalars['String']>;
	filter?: Maybe<FunctionInfoFilter>;
	orderBy?: Maybe<Array<Maybe<FunctionInfoOrderBy>>>;
};

export type QueryGetWorkspaceTransferInfoArgs = {
	workspaceId: Scalars['String'];
};

export type QueryIntegrationArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryIntegrationDetailArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryIntegrationDetailsListArgs = {
	filter?: Maybe<IntegrationDetailFilter>;
	orderBy?: Maybe<Array<Maybe<IntegrationDetailOrderBy>>>;
	sort?: Maybe<Array<IntegrationDetailSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<IntegrationDetailGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryIntegrationsListArgs = {
	filter?: Maybe<IntegrationFilter>;
	orderBy?: Maybe<Array<Maybe<IntegrationOrderBy>>>;
	sort?: Maybe<Array<IntegrationSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<IntegrationGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryLogsArgs = {
	functionName: Scalars['String'];
	applicationId?: Maybe<Scalars['String']>;
	limit?: Maybe<Scalars['Int']>;
	startTime?: Maybe<Scalars['DateTime']>;
	endTime?: Maybe<Scalars['DateTime']>;
};

export type QueryMetricArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryMetricsListArgs = {
	filter?: Maybe<MetricFilter>;
	orderBy?: Maybe<Array<Maybe<MetricOrderBy>>>;
	sort?: Maybe<Array<MetricSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<MetricGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryProjectArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryProjectsListArgs = {
	filter?: Maybe<ProjectFilter>;
	orderBy?: Maybe<Array<Maybe<ProjectOrderBy>>>;
	sort?: Maybe<Array<ProjectSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ProjectGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryRecordingArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryRecordingsListArgs = {
	filter?: Maybe<RecordingFilter>;
	orderBy?: Maybe<Array<Maybe<RecordingOrderBy>>>;
	sort?: Maybe<Array<RecordingSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RecordingGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryReleaseArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryReleasesListArgs = {
	filter?: Maybe<ReleaseFilter>;
	orderBy?: Maybe<Array<Maybe<ReleaseOrderBy>>>;
	sort?: Maybe<Array<ReleaseSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ReleaseGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryRoleArgs = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryRolesListArgs = {
	filter?: Maybe<RoleFilter>;
	orderBy?: Maybe<Array<Maybe<RoleOrderBy>>>;
	sort?: Maybe<Array<RoleSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RoleGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumClickArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumClicksListArgs = {
	filter?: Maybe<SeleniumClickFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumClickOrderBy>>>;
	sort?: Maybe<Array<SeleniumClickSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumClickGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumCommandArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumCommandsListArgs = {
	filter?: Maybe<SeleniumCommandFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumCommandOrderBy>>>;
	sort?: Maybe<Array<SeleniumCommandSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumCommandGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumDragndropArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumDragndropsListArgs = {
	filter?: Maybe<SeleniumDragndropFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumDragndropOrderBy>>>;
	sort?: Maybe<Array<SeleniumDragndropSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumDragndropGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumGroupArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumGroupsListArgs = {
	filter?: Maybe<SeleniumGroupFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumGroupOrderBy>>>;
	sort?: Maybe<Array<SeleniumGroupSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumGroupGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumOpenArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumOpensListArgs = {
	filter?: Maybe<SeleniumOpenFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumOpenOrderBy>>>;
	sort?: Maybe<Array<SeleniumOpenSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumOpenGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumPointArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumPointsListArgs = {
	filter?: Maybe<SeleniumPointFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumPointOrderBy>>>;
	sort?: Maybe<Array<SeleniumPointSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumPointGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumScriptArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumScriptsListArgs = {
	filter?: Maybe<SeleniumScriptFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumScriptOrderBy>>>;
	sort?: Maybe<Array<SeleniumScriptSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumScriptGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumSelectorArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumSelectorsListArgs = {
	filter?: Maybe<SeleniumSelectorFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumSelectorOrderBy>>>;
	sort?: Maybe<Array<SeleniumSelectorSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumSelectorGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumSetViewportSizeArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumSetViewportSizesListArgs = {
	filter?: Maybe<SeleniumSetViewportSizeFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumSetViewportSizeOrderBy>>>;
	sort?: Maybe<Array<SeleniumSetViewportSizeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumSetViewportSizeGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumTargetArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumTargetsListArgs = {
	filter?: Maybe<SeleniumTargetFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumTargetOrderBy>>>;
	sort?: Maybe<Array<SeleniumTargetSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumTargetGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumTypeArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySeleniumTypesListArgs = {
	filter?: Maybe<SeleniumTypeFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumTypeOrderBy>>>;
	sort?: Maybe<Array<SeleniumTypeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumTypeGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySlackArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QuerySlacksListArgs = {
	filter?: Maybe<SlackFilter>;
	orderBy?: Maybe<Array<Maybe<SlackOrderBy>>>;
	sort?: Maybe<Array<SlackSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SlackGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryTableArgs = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
};

export type QueryTableFieldArgs = {
	id: Scalars['ID'];
};

export type QueryTablesListArgs = {
	filter?: Maybe<TableListFilter>;
};

export type QueryTeamInvitationDetailsArgs = {
	uuid: Scalars['String'];
};

export type QueryTeamMemberArgs = {
	id?: Maybe<Scalars['ID']>;
	userId?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryTeamMembersListArgs = {
	filter?: Maybe<TeamMemberFilter>;
	orderBy?: Maybe<Array<Maybe<TeamMemberOrderBy>>>;
	sort?: Maybe<Array<TeamMemberSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TeamMemberGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryTestOutcomeArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryTestOutcomesListArgs = {
	filter?: Maybe<TestOutcomeFilter>;
	orderBy?: Maybe<Array<Maybe<TestOutcomeOrderBy>>>;
	sort?: Maybe<Array<TestOutcomeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TestOutcomeGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryTestRunArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryTestRunsListArgs = {
	filter?: Maybe<TestRunFilter>;
	orderBy?: Maybe<Array<Maybe<TestRunOrderBy>>>;
	sort?: Maybe<Array<TestRunSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TestRunGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryUserArgs = {
	id?: Maybe<Scalars['ID']>;
	email?: Maybe<Scalars['String']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryUserStoriesListArgs = {
	filter?: Maybe<UserStoryFilter>;
	orderBy?: Maybe<Array<Maybe<UserStoryOrderBy>>>;
	sort?: Maybe<Array<UserStorySort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<UserStoryGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryUserStoryArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryUsersListArgs = {
	filter?: Maybe<UserFilter>;
	orderBy?: Maybe<Array<Maybe<UserOrderBy>>>;
	sort?: Maybe<Array<UserSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<UserGroupBy>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

/** A recording is the assets that represents a User story. This includes videos and side script files. */
export type Recording = {
	__typename?: 'Recording';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	environment?: Maybe<EnvironmentListResponse>;
	userStory?: Maybe<UserStory>;
	video?: Maybe<File>;
	seleniumScript?: Maybe<SeleniumScript>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
	_description?: Maybe<Scalars['String']>;
};

/** A recording is the assets that represents a User story. This includes videos and side script files. */
export type RecordingEnvironmentArgs = {
	filter?: Maybe<EnvironmentFilter>;
	orderBy?: Maybe<Array<Maybe<EnvironmentOrderBy>>>;
	sort?: Maybe<Array<EnvironmentSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<EnvironmentGroupBy>;
};

/** Environment create input from recording */
export type Recording_EnvironmentCreateInput = {
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	recording?: Maybe<EnvironmentRecordingRelationInput>;
};

/** Environment update input from recording */
export type Recording_EnvironmentUpdateInput = {
	filter?: Maybe<EnvironmentKeyFilter>;
	data: EnvironmentUpdateInput;
};

export type Recording_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	startEventId?: Maybe<StringPredicate>;
	endEventId?: Maybe<StringPredicate>;
	videoGenerationVersion?: Maybe<StringPredicate>;
	nExpectedCommands?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	environment?: Maybe<Environment_PermissionRelationFilter>;
	userStory?: Maybe<UserStory_PermissionFilter>;
	video?: Maybe<File_PermissionFilter>;
	seleniumScript?: Maybe<SeleniumScript_PermissionFilter>;
	AND?: Maybe<Array<Recording_PermissionFilter>>;
	OR?: Maybe<Array<Recording_PermissionFilter>>;
};

export type Recording_PermissionRelationFilter = {
	some?: Maybe<Recording_PermissionFilter>;
	every?: Maybe<Recording_PermissionFilter>;
	none?: Maybe<Recording_PermissionFilter>;
};

/** SeleniumScript create input from recording */
export type Recording_SeleniumScriptCreateInput = {
	version: Scalars['String'];
	recording?: Maybe<SeleniumScriptRecordingRelationInput>;
	groups?: Maybe<SeleniumScriptGroupsRelationInput>;
};

/** SeleniumScript update input from recording */
export type Recording_SeleniumScriptUpdateInput = {
	version?: Maybe<Scalars['String']>;
	recording?: Maybe<SeleniumScriptRecordingUpdateRelationInput>;
	groups?: Maybe<SeleniumScriptGroupsUpdateRelationInput>;
};

/** UserStory create input from recording */
export type Recording_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Scalars['String']>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationRelationInput>;
};

/** UserStory update input from recording */
export type Recording_UserStoryUpdateInput = {
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingUpdateRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeUpdateRelationInput>;
	project?: Maybe<UserStoryProjectUpdateRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationUpdateRelationInput>;
};

/** Files create input from recording_video */
export type Recording_Video_FileCreateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
};

/** Files update input from recording_video */
export type Recording_Video_FileUpdateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarUpdateRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarUpdateRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarUpdateRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoUpdateRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
};

/** Recording create input */
export type RecordingCreateInput = {
	environment?: Maybe<RecordingEnvironmentRelationInput>;
	userStory?: Maybe<RecordingUserStoryRelationInput>;
	video?: Maybe<RecordingVideoRelationInput>;
	seleniumScript?: Maybe<RecordingSeleniumScriptRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

/** Recording create many input */
export type RecordingCreateManyInput = {
	environment?: Maybe<RecordingEnvironmentManyRelationInput>;
	userStory?: Maybe<RecordingUserStoryManyRelationInput>;
	video?: Maybe<RecordingVideoManyRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

/** Recording delete input */
export type RecordingDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** Recording relation input */
export type RecordingEnvironmentManyRelationInput = {
	connect?: Maybe<Array<EnvironmentKeyFilter>>;
};

/** Recording relation input */
export type RecordingEnvironmentRelationInput = {
	connect?: Maybe<Array<EnvironmentKeyFilter>>;
	create?: Maybe<Array<Maybe<Recording_EnvironmentCreateInput>>>;
};

/** Recording relation input */
export type RecordingEnvironmentUpdateRelationInput = {
	connect?: Maybe<Array<EnvironmentKeyFilter>>;
	disconnect?: Maybe<Array<EnvironmentKeyFilter>>;
	reconnect?: Maybe<Array<EnvironmentKeyFilter>>;
	create?: Maybe<Array<Maybe<Recording_EnvironmentCreateInput>>>;
	update?: Maybe<Array<Maybe<Recording_EnvironmentUpdateInput>>>;
};

/** RecordingFieldsPermissions create input */
export type RecordingFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	startEventId?: Maybe<Scalars['Boolean']>;
	endEventId?: Maybe<Scalars['Boolean']>;
	videoGenerationVersion?: Maybe<Scalars['Boolean']>;
	seleniumScriptJson?: Maybe<Scalars['Boolean']>;
	nExpectedCommands?: Maybe<Scalars['Boolean']>;
};

export type RecordingFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	startEventId?: Maybe<StringPredicate>;
	endEventId?: Maybe<StringPredicate>;
	videoGenerationVersion?: Maybe<StringPredicate>;
	nExpectedCommands?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	environment?: Maybe<EnvironmentRelationFilter>;
	userStory?: Maybe<UserStoryFilter>;
	video?: Maybe<FileFilter>;
	seleniumScript?: Maybe<SeleniumScriptFilter>;
	AND?: Maybe<Array<RecordingFilter>>;
	OR?: Maybe<Array<RecordingFilter>>;
};

export type RecordingGroupBy = {
	query: RecordingGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type RecordingGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	startEventId?: Maybe<Array<GroupByField>>;
	endEventId?: Maybe<Array<GroupByField>>;
	videoGenerationVersion?: Maybe<Array<GroupByField>>;
	seleniumScriptJson?: Maybe<Array<GroupByField>>;
	nExpectedCommands?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	environment?: Maybe<EnvironmentGroupByQuery>;
	userStory?: Maybe<UserStoryGroupByQuery>;
	video?: Maybe<FileGroupByQuery>;
	seleniumScript?: Maybe<SeleniumScriptGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type RecordingKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** RecordingListResponse output */
export type RecordingListResponse = {
	__typename?: 'RecordingListResponse';
	/** List items */
	items: Array<Recording>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** RecordingManyResponse output */
export type RecordingManyResponse = {
	__typename?: 'RecordingManyResponse';
	/** List items */
	items: Array<Recording>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum RecordingOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	StartEventIdAsc = 'startEventId_ASC',
	StartEventIdDesc = 'startEventId_DESC',
	EndEventIdAsc = 'endEventId_ASC',
	EndEventIdDesc = 'endEventId_DESC',
	VideoGenerationVersionAsc = 'videoGenerationVersion_ASC',
	VideoGenerationVersionDesc = 'videoGenerationVersion_DESC',
	SeleniumScriptJsonAsc = 'seleniumScriptJson_ASC',
	SeleniumScriptJsonDesc = 'seleniumScriptJson_DESC',
	NExpectedCommandsAsc = 'nExpectedCommands_ASC',
	NExpectedCommandsDesc = 'nExpectedCommands_DESC',
}

/** Recording subscription payload */
export type RecordingPayload = {
	__typename?: 'RecordingPayload';
	mutation: MutationType;
	node?: Maybe<Recording>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Recording>;
};

export type RecordingRelationFilter = {
	some?: Maybe<RecordingFilter>;
	every?: Maybe<RecordingFilter>;
	none?: Maybe<RecordingFilter>;
};

/** Recording relation input */
export type RecordingSeleniumScriptRelationInput = {
	create?: Maybe<Recording_SeleniumScriptCreateInput>;
};

/** Recording relation input */
export type RecordingSeleniumScriptUpdateRelationInput = {
	update?: Maybe<Recording_SeleniumScriptUpdateInput>;
};

export type RecordingSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	startEventId?: Maybe<SortOrder>;
	endEventId?: Maybe<SortOrder>;
	videoGenerationVersion?: Maybe<SortOrder>;
	nExpectedCommands?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	userStory?: Maybe<UserStorySort>;
	video?: Maybe<FileSort>;
	seleniumScript?: Maybe<SeleniumScriptSort>;
};

/** Recording subscription filter */
export type RecordingSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<RecordingFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Recording update input */
export type RecordingUpdateByFilterInput = {
	startEventId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	endEventId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	videoGenerationVersion?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	seleniumScriptJson?: Maybe<Array<Maybe<UpdateByFilterJsonInput>>>;
	nExpectedCommands?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
};

/** Recording update input */
export type RecordingUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	environment?: Maybe<RecordingEnvironmentUpdateRelationInput>;
	userStory?: Maybe<RecordingUserStoryUpdateRelationInput>;
	video?: Maybe<RecordingVideoUpdateRelationInput>;
	seleniumScript?: Maybe<RecordingSeleniumScriptUpdateRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

/** Recording relation input */
export type RecordingUserStoryManyRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
};

/** Recording relation input */
export type RecordingUserStoryRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<Recording_UserStoryCreateInput>;
};

/** Recording relation input */
export type RecordingUserStoryUpdateRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	disconnect?: Maybe<UserStoryKeyFilter>;
	reconnect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<Recording_UserStoryCreateInput>;
	update?: Maybe<Recording_UserStoryUpdateInput>;
};

/** Recording relation input */
export type RecordingVideoManyRelationInput = {
	connect?: Maybe<FileKeyFilter>;
};

/** Recording relation input */
export type RecordingVideoRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	create?: Maybe<Recording_Video_FileCreateInput>;
};

/** Recording relation input */
export type RecordingVideoUpdateRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	disconnect?: Maybe<FileKeyFilter>;
	reconnect?: Maybe<FileKeyFilter>;
	create?: Maybe<Recording_Video_FileCreateInput>;
	update?: Maybe<Recording_Video_FileUpdateInput>;
};

/** RefreshTokenInput */
export type RefreshTokenInput = {
	email?: Maybe<Scalars['String']>;
	refreshToken: Scalars['String'];
	authProfileId?: Maybe<Scalars['ID']>;
};

/** Relation */
export type Relation = {
	__typename?: 'Relation';
	refTable: Table;
	refField?: Maybe<TableField>;
	relationTableName?: Maybe<Scalars['String']>;
	relationFieldName?: Maybe<Scalars['String']>;
	refFieldName?: Maybe<Scalars['String']>;
	refFieldDisplayName?: Maybe<Scalars['String']>;
	refFieldIsList?: Maybe<Scalars['Boolean']>;
	refFieldIsRequired?: Maybe<Scalars['Boolean']>;
};

/** Relation Create Input */
export type RelationCreateInput = {
	refTableId: Scalars['ID'];
	refFieldName?: Maybe<Scalars['String']>;
	refFieldDisplayName?: Maybe<Scalars['String']>;
	refFieldIsList: Scalars['Boolean'];
	refFieldIsRequired: Scalars['Boolean'];
};

/** Relation Update Input */
export type RelationUpdateInput = {
	refTableId?: Maybe<Scalars['ID']>;
	refFieldName?: Maybe<Scalars['String']>;
	refFieldDisplayName?: Maybe<Scalars['String']>;
	refFieldIsList?: Maybe<Scalars['Boolean']>;
	refFieldIsRequired?: Maybe<Scalars['Boolean']>;
};

/** Relative Date Predicate Operation Enum */
export enum RelativePredicateOpEnum {
	Add = 'ADD',
	Sub = 'SUB',
}

/** Relative Date Predicate Unit Enum */
export enum RelativePredicateUnitEnum {
	Microsecond = 'MICROSECOND',
	Second = 'SECOND',
	Minute = 'MINUTE',
	Hour = 'HOUR',
	Day = 'DAY',
	Week = 'WEEK',
	Month = 'MONTH',
	Quarter = 'QUARTER',
	Year = 'YEAR',
	SecondMicrosecond = 'SECOND_MICROSECOND',
	MinuteMicrosecond = 'MINUTE_MICROSECOND',
	MinuteSecond = 'MINUTE_SECOND',
	HourMicrosecond = 'HOUR_MICROSECOND',
	HourSecond = 'HOUR_SECOND',
	HourMinute = 'HOUR_MINUTE',
	DayMicrosecond = 'DAY_MICROSECOND',
	DaySecond = 'DAY_SECOND',
	DayMinute = 'DAY_MINUTE',
	DayHour = 'DAY_HOUR',
	YearMonth = 'YEAR_MONTH',
}

/** A release represents a staging branch in progress. It's used as context for statistics of a specific release. */
export type Release = {
	__typename?: 'Release';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	/**
	 * This is the custom naming convention of a team for their releases. For example
	 * "echo", "foxtrot", "golf" or "v0.0.1", "v0.3.2".
	 */
	name?: Maybe<Scalars['String']>;
	/** The manually defined and planned date of a release merging to production. */
	releaseDate?: Maybe<Scalars['Date']>;
	testRuns?: Maybe<TestRunListResponse>;
	project?: Maybe<Project>;
	_description?: Maybe<Scalars['String']>;
};

/** A release represents a staging branch in progress. It's used as context for statistics of a specific release. */
export type ReleaseTestRunsArgs = {
	filter?: Maybe<TestRunFilter>;
	orderBy?: Maybe<Array<Maybe<TestRunOrderBy>>>;
	sort?: Maybe<Array<TestRunSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TestRunGroupBy>;
};

export type Release_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	releaseDate?: Maybe<DatePredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	testRuns?: Maybe<TestRun_PermissionRelationFilter>;
	project?: Maybe<Project_PermissionFilter>;
	AND?: Maybe<Array<Release_PermissionFilter>>;
	OR?: Maybe<Array<Release_PermissionFilter>>;
};

export type Release_PermissionRelationFilter = {
	some?: Maybe<Release_PermissionFilter>;
	every?: Maybe<Release_PermissionFilter>;
	none?: Maybe<Release_PermissionFilter>;
};

/** Project create input from release */
export type Release_ProjectCreateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarRelationInput>;
	release?: Maybe<ProjectReleaseRelationInput>;
	configuration: ProjectConfigurationRelationInput;
	integration?: Maybe<ProjectIntegrationRelationInput>;
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsRelationInput>;
};

/** Project update input from release */
export type Release_ProjectUpdateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarUpdateRelationInput>;
	release?: Maybe<ProjectReleaseUpdateRelationInput>;
	configuration?: Maybe<ProjectConfigurationUpdateRelationInput>;
	integration?: Maybe<ProjectIntegrationUpdateRelationInput>;
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

/** TestRun create input from release */
export type Release_TestRunCreateInput = {
	status?: Maybe<Scalars['String']>;
	ciRun?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeRelationInput>;
	/** How long did this test take? Use a HH:MM:ss format. i.e. 14:50:19 */
	testLength?: Maybe<Scalars['String']>;
};

/** TestRun update input from release */
export type Release_TestRunUpdateInput = {
	filter?: Maybe<TestRunKeyFilter>;
	data: TestRunUpdateInput;
};

/** Release create input */
export type ReleaseCreateInput = {
	/**
	 * This is the custom naming convention of a team for their releases. For example
	 * "echo", "foxtrot", "golf" or "v0.0.1", "v0.3.2".
	 */
	name?: Maybe<Scalars['String']>;
	/** The manually defined and planned date of a release merging to production. */
	releaseDate?: Maybe<Scalars['Date']>;
	testRuns?: Maybe<ReleaseTestRunsRelationInput>;
	project?: Maybe<ReleaseProjectRelationInput>;
};

/** Release create many input */
export type ReleaseCreateManyInput = {
	/**
	 * This is the custom naming convention of a team for their releases. For example
	 * "echo", "foxtrot", "golf" or "v0.0.1", "v0.3.2".
	 */
	name?: Maybe<Scalars['String']>;
	/** The manually defined and planned date of a release merging to production. */
	releaseDate?: Maybe<Scalars['Date']>;
	testRuns?: Maybe<ReleaseTestRunsManyRelationInput>;
	project: ReleaseProjectManyRelationInput;
};

/** Release delete input */
export type ReleaseDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** ReleaseFieldsPermissions create input */
export type ReleaseFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['Boolean']>;
	releaseDate?: Maybe<Scalars['Boolean']>;
};

export type ReleaseFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	releaseDate?: Maybe<DatePredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	testRuns?: Maybe<TestRunRelationFilter>;
	project?: Maybe<ProjectFilter>;
	AND?: Maybe<Array<ReleaseFilter>>;
	OR?: Maybe<Array<ReleaseFilter>>;
};

export type ReleaseGroupBy = {
	query: ReleaseGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type ReleaseGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	name?: Maybe<Array<GroupByField>>;
	releaseDate?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	testRuns?: Maybe<TestRunGroupByQuery>;
	project?: Maybe<ProjectGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type ReleaseKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** ReleaseListResponse output */
export type ReleaseListResponse = {
	__typename?: 'ReleaseListResponse';
	/** List items */
	items: Array<Release>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** ReleaseManyResponse output */
export type ReleaseManyResponse = {
	__typename?: 'ReleaseManyResponse';
	/** List items */
	items: Array<Release>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum ReleaseOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
	ReleaseDateAsc = 'releaseDate_ASC',
	ReleaseDateDesc = 'releaseDate_DESC',
}

/** Release subscription payload */
export type ReleasePayload = {
	__typename?: 'ReleasePayload';
	mutation: MutationType;
	node?: Maybe<Release>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Release>;
};

/** Release relation input */
export type ReleaseProjectManyRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
};

/** Release relation input */
export type ReleaseProjectRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<Release_ProjectCreateInput>;
};

/** Release relation input */
export type ReleaseProjectUpdateRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	disconnect?: Maybe<ProjectKeyFilter>;
	reconnect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<Release_ProjectCreateInput>;
	update?: Maybe<Release_ProjectUpdateInput>;
};

export type ReleaseRelationFilter = {
	some?: Maybe<ReleaseFilter>;
	every?: Maybe<ReleaseFilter>;
	none?: Maybe<ReleaseFilter>;
};

export type ReleaseSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	name?: Maybe<SortOrder>;
	releaseDate?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	project?: Maybe<ProjectSort>;
};

/** Release subscription filter */
export type ReleaseSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<ReleaseFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Release relation input */
export type ReleaseTestRunsManyRelationInput = {
	connect?: Maybe<Array<TestRunKeyFilter>>;
};

/** Release relation input */
export type ReleaseTestRunsRelationInput = {
	connect?: Maybe<Array<TestRunKeyFilter>>;
	create?: Maybe<Array<Maybe<Release_TestRunCreateInput>>>;
};

/** Release relation input */
export type ReleaseTestRunsUpdateRelationInput = {
	connect?: Maybe<Array<TestRunKeyFilter>>;
	disconnect?: Maybe<Array<TestRunKeyFilter>>;
	reconnect?: Maybe<Array<TestRunKeyFilter>>;
	create?: Maybe<Array<Maybe<Release_TestRunCreateInput>>>;
	update?: Maybe<Array<Maybe<Release_TestRunUpdateInput>>>;
};

/** Release update input */
export type ReleaseUpdateByFilterInput = {
	name?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	releaseDate?: Maybe<Array<Maybe<UpdateByFilterDateInput>>>;
};

/** Release update input */
export type ReleaseUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/**
	 * This is the custom naming convention of a team for their releases. For example
	 * "echo", "foxtrot", "golf" or "v0.0.1", "v0.3.2".
	 */
	name?: Maybe<Scalars['String']>;
	/** The manually defined and planned date of a release merging to production. */
	releaseDate?: Maybe<Scalars['Date']>;
	testRuns?: Maybe<ReleaseTestRunsUpdateRelationInput>;
	project?: Maybe<ReleaseProjectUpdateRelationInput>;
};

export type ReplaceFunctionArguments = {
	from: Scalars['String'];
	to: Scalars['String'];
};

export type Role = {
	__typename?: 'Role';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	users?: Maybe<UserListResponse>;
	apiTokens?: Maybe<ApiTokenListResponse>;
	authenticationProfiles?: Maybe<AuthenticationProfileListResponse>;
	teamMembers?: Maybe<TeamMemberListResponse>;
	permissions?: Maybe<PermissionListResponse>;
	_description?: Maybe<Scalars['String']>;
};

export type RoleUsersArgs = {
	filter?: Maybe<UserFilter>;
	orderBy?: Maybe<Array<Maybe<UserOrderBy>>>;
	sort?: Maybe<Array<UserSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<UserGroupBy>;
};

export type RoleApiTokensArgs = {
	filter?: Maybe<ApiTokenFilter>;
	orderBy?: Maybe<Array<Maybe<ApiTokenOrderBy>>>;
	sort?: Maybe<Array<ApiTokenSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ApiTokenGroupBy>;
};

export type RoleAuthenticationProfilesArgs = {
	filter?: Maybe<AuthenticationProfileFilter>;
	orderBy?: Maybe<Array<Maybe<AuthenticationProfileOrderBy>>>;
	sort?: Maybe<Array<AuthenticationProfileSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<AuthenticationProfileGroupBy>;
};

export type RoleTeamMembersArgs = {
	filter?: Maybe<TeamMemberFilter>;
	orderBy?: Maybe<Array<Maybe<TeamMemberOrderBy>>>;
	sort?: Maybe<Array<TeamMemberSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TeamMemberGroupBy>;
};

export type RolePermissionsArgs = {
	filter?: Maybe<PermissionInputFilter>;
};

export type Role_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	description?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	users?: Maybe<User_PermissionRelationFilter>;
	permissions?: Maybe<Permission_PermissionRelationFilter>;
	apiTokens?: Maybe<ApiToken_PermissionRelationFilter>;
	authenticationProfiles?: Maybe<AuthenticationProfile_PermissionRelationFilter>;
	teamMembers?: Maybe<TeamMember_PermissionRelationFilter>;
	AND?: Maybe<Array<Role_PermissionFilter>>;
	OR?: Maybe<Array<Role_PermissionFilter>>;
};

export type Role_PermissionRelationFilter = {
	some?: Maybe<Role_PermissionFilter>;
	every?: Maybe<Role_PermissionFilter>;
	none?: Maybe<Role_PermissionFilter>;
};

/** Roles create input */
export type RoleCreateInput = {
	name: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	users?: Maybe<RolesUsersRelationInput>;
	permissions?: Maybe<PermissionsInput>;
	apiTokens?: Maybe<RolesApiTokensRelationInput>;
	authenticationProfiles?: Maybe<RolesAuthenticationProfilesRelationInput>;
	teamMembers?: Maybe<RolesTeamMembersRelationInput>;
};

/** Roles create many input */
export type RoleCreateManyInput = {
	name: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	users?: Maybe<RolesUsersManyRelationInput>;
	apiTokens?: Maybe<RolesApiTokensManyRelationInput>;
	authenticationProfiles?: Maybe<RolesAuthenticationProfilesManyRelationInput>;
	teamMembers?: Maybe<RolesTeamMembersManyRelationInput>;
};

/** Roles delete input */
export type RoleDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** RoleFieldsPermissions create input */
export type RoleFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['Boolean']>;
	description?: Maybe<Scalars['Boolean']>;
};

export type RoleFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	description?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	users?: Maybe<UserRelationFilter>;
	permissions?: Maybe<PermissionRelationFilter>;
	apiTokens?: Maybe<ApiTokenRelationFilter>;
	authenticationProfiles?: Maybe<AuthenticationProfileRelationFilter>;
	teamMembers?: Maybe<TeamMemberRelationFilter>;
	AND?: Maybe<Array<RoleFilter>>;
	OR?: Maybe<Array<RoleFilter>>;
};

export type RoleGroupBy = {
	query: RoleGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type RoleGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	name?: Maybe<Array<GroupByField>>;
	description?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	users?: Maybe<UserGroupByQuery>;
	permissions?: Maybe<PermissionGroupByQuery>;
	apiTokens?: Maybe<ApiTokenGroupByQuery>;
	authenticationProfiles?: Maybe<AuthenticationProfileGroupByQuery>;
	teamMembers?: Maybe<TeamMemberGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type RoleKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
};

/** RoleListResponse output */
export type RoleListResponse = {
	__typename?: 'RoleListResponse';
	/** List items */
	items: Array<Role>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** RoleManyResponse output */
export type RoleManyResponse = {
	__typename?: 'RoleManyResponse';
	/** List items */
	items: Array<Role>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum RoleOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
	DescriptionAsc = 'description_ASC',
	DescriptionDesc = 'description_DESC',
	SystemTypeAsc = 'systemType_ASC',
	SystemTypeDesc = 'systemType_DESC',
}

/** Roles subscription payload */
export type RolePayload = {
	__typename?: 'RolePayload';
	mutation: MutationType;
	node?: Maybe<Role>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Role>;
};

export type RoleRelationFilter = {
	some?: Maybe<RoleFilter>;
	every?: Maybe<RoleFilter>;
	none?: Maybe<RoleFilter>;
};

/** ApiTokens update input from roles */
export type Roles_ApiTokenUpdateInput = {
	filter?: Maybe<ApiTokenKeyFilter>;
	data: ApiTokenUpdateInput;
};

/** AuthenticationProfiles create input from roles */
export type Roles_AuthenticationProfileCreateInput = {
	name: Scalars['String'];
	type?: Maybe<Scalars['String']>;
	secret?: Maybe<Scalars['String']>;
	managementDomain?: Maybe<Scalars['String']>;
	clientId?: Maybe<Scalars['String']>;
	databaseName?: Maybe<Scalars['String']>;
	domain?: Maybe<Scalars['String']>;
	selfSignUpEnabled?: Maybe<Scalars['Boolean']>;
	selfSignUpEmailDomains?: Maybe<Array<Maybe<Scalars['String']>>>;
	roles?: Maybe<AuthenticationProfilesRolesRelationInput>;
	audiences?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** AuthenticationProfiles update input from roles */
export type Roles_AuthenticationProfileUpdateInput = {
	filter?: Maybe<AuthenticationProfileKeyFilter>;
	data: AuthenticationProfileUpdateInput;
};

/** TeamMembers update input from roles */
export type Roles_TeamMemberUpdateInput = {
	filter?: Maybe<TeamMemberKeyFilter>;
	data: TeamMemberUpdateInput;
};

/** Users create input from roles */
export type Roles_UserCreateInput = {
	email: Scalars['String'];
	status?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	avatar?: Maybe<UsersAvatarRelationInput>;
	roles?: Maybe<UsersRolesRelationInput>;
	projects?: Maybe<UsersProjectsRelationInput>;
	jobTitle?: Maybe<Scalars['String']>;
	/** User setting to allow product updates to be sent to their email. */
	productNotifications?: Maybe<Scalars['Boolean']>;
};

/** Users update input from roles */
export type Roles_UserUpdateInput = {
	filter?: Maybe<UserKeyFilter>;
	data: UserUpdateInput;
};

/** Roles relation input */
export type RolesApiTokensManyRelationInput = {
	connect?: Maybe<Array<ApiTokenKeyFilter>>;
};

/** Roles relation input */
export type RolesApiTokensRelationInput = {
	connect?: Maybe<Array<ApiTokenKeyFilter>>;
};

/** Roles relation input */
export type RolesApiTokensUpdateRelationInput = {
	connect?: Maybe<Array<ApiTokenKeyFilter>>;
	disconnect?: Maybe<Array<ApiTokenKeyFilter>>;
	reconnect?: Maybe<Array<ApiTokenKeyFilter>>;
	update?: Maybe<Array<Maybe<Roles_ApiTokenUpdateInput>>>;
};

/** Roles relation input */
export type RolesAuthenticationProfilesManyRelationInput = {
	connect?: Maybe<Array<AuthenticationProfileKeyFilter>>;
};

/** Roles relation input */
export type RolesAuthenticationProfilesRelationInput = {
	connect?: Maybe<Array<AuthenticationProfileKeyFilter>>;
	create?: Maybe<Array<Maybe<Roles_AuthenticationProfileCreateInput>>>;
};

/** Roles relation input */
export type RolesAuthenticationProfilesUpdateRelationInput = {
	connect?: Maybe<Array<AuthenticationProfileKeyFilter>>;
	disconnect?: Maybe<Array<AuthenticationProfileKeyFilter>>;
	reconnect?: Maybe<Array<AuthenticationProfileKeyFilter>>;
	create?: Maybe<Array<Maybe<Roles_AuthenticationProfileCreateInput>>>;
	update?: Maybe<Array<Maybe<Roles_AuthenticationProfileUpdateInput>>>;
};

export type RoleSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	name?: Maybe<SortOrder>;
	description?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
};

/** Roles relation input */
export type RolesTeamMembersManyRelationInput = {
	connect?: Maybe<Array<TeamMemberKeyFilter>>;
};

/** Roles relation input */
export type RolesTeamMembersRelationInput = {
	connect?: Maybe<Array<TeamMemberKeyFilter>>;
};

/** Roles relation input */
export type RolesTeamMembersUpdateRelationInput = {
	connect?: Maybe<Array<TeamMemberKeyFilter>>;
	disconnect?: Maybe<Array<TeamMemberKeyFilter>>;
	reconnect?: Maybe<Array<TeamMemberKeyFilter>>;
	update?: Maybe<Array<Maybe<Roles_TeamMemberUpdateInput>>>;
};

/** Roles subscription filter */
export type RoleSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<RoleFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Roles relation input */
export type RolesUsersManyRelationInput = {
	connect?: Maybe<Array<UserKeyFilter>>;
};

/** Roles relation input */
export type RolesUsersRelationInput = {
	connect?: Maybe<Array<UserKeyFilter>>;
	create?: Maybe<Array<Maybe<Roles_UserCreateInput>>>;
};

/** Roles relation input */
export type RolesUsersUpdateRelationInput = {
	connect?: Maybe<Array<UserKeyFilter>>;
	disconnect?: Maybe<Array<UserKeyFilter>>;
	reconnect?: Maybe<Array<UserKeyFilter>>;
	create?: Maybe<Array<Maybe<Roles_UserCreateInput>>>;
	update?: Maybe<Array<Maybe<Roles_UserUpdateInput>>>;
};

/** Roles update input */
export type RoleUpdateByFilterInput = {
	name?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	description?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	systemType?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** Roles update input */
export type RoleUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	users?: Maybe<RolesUsersUpdateRelationInput>;
	permissions?: Maybe<PermissionsInput>;
	apiTokens?: Maybe<RolesApiTokensUpdateRelationInput>;
	authenticationProfiles?: Maybe<RolesAuthenticationProfilesUpdateRelationInput>;
	teamMembers?: Maybe<RolesTeamMembersUpdateRelationInput>;
};

/** Schema Origin */
export type SchemaOrigin = {
	__typename?: 'SchemaOrigin';
	type: SchemaOriginType;
	provider?: Maybe<Scalars['String']>;
};

/** Schema Origin Type Enum */
export enum SchemaOriginType {
	Remote = 'REMOTE',
	Local = 'LOCAL',
	View = 'VIEW',
}

/** SeleniumGroup create input from script */
export type Script_SeleniumGroupCreateInput = {
	script?: Maybe<SeleniumGroupScriptRelationInput>;
	commands?: Maybe<SeleniumGroupCommandsRelationInput>;
	gIndex: Scalars['Int'];
	name?: Maybe<Scalars['String']>;
};

/** SeleniumGroup update input from script */
export type Script_SeleniumGroupUpdateInput = {
	filter?: Maybe<SeleniumGroupKeyFilter>;
	data: SeleniumGroupUpdateInput;
};

/** SeleniumTarget create input from selector */
export type Selector_SeleniumTargetCreateInput = {
	click?: Maybe<SeleniumTargetClickRelationInput>;
	type?: Maybe<SeleniumTargetTypeRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesRelationInput>;
};

/** SeleniumTarget update input from selector */
export type Selector_SeleniumTargetUpdateInput = {
	click?: Maybe<SeleniumTargetClickUpdateRelationInput>;
	type?: Maybe<SeleniumTargetTypeUpdateRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceUpdateRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationUpdateRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorUpdateRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesUpdateRelationInput>;
};

export type SeleniumClick = {
	__typename?: 'SeleniumClick';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	target?: Maybe<SeleniumTarget>;
	command?: Maybe<SeleniumCommand>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumClick_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	target?: Maybe<SeleniumTarget_PermissionFilter>;
	command?: Maybe<SeleniumCommand_PermissionFilter>;
	AND?: Maybe<Array<SeleniumClick_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumClick_PermissionFilter>>;
};

/** SeleniumClick relation input */
export type SeleniumClickCommandManyRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
};

/** SeleniumClick relation input */
export type SeleniumClickCommandRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<Click_SeleniumCommandCreateInput>;
};

/** SeleniumClick relation input */
export type SeleniumClickCommandUpdateRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	disconnect?: Maybe<SeleniumCommandKeyFilter>;
	reconnect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<Click_SeleniumCommandCreateInput>;
	update?: Maybe<Click_SeleniumCommandUpdateInput>;
};

/** SeleniumClick create input */
export type SeleniumClickCreateInput = {
	target?: Maybe<SeleniumClickTargetRelationInput>;
	command?: Maybe<SeleniumClickCommandRelationInput>;
};

/** SeleniumClick create many input */
export type SeleniumClickCreateManyInput = {
	target: SeleniumClickTargetManyRelationInput;
	command?: Maybe<SeleniumClickCommandManyRelationInput>;
};

/** SeleniumClick delete input */
export type SeleniumClickDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumClickFieldsPermissions create input */
export type SeleniumClickFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
};

export type SeleniumClickFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	target?: Maybe<SeleniumTargetFilter>;
	command?: Maybe<SeleniumCommandFilter>;
	AND?: Maybe<Array<SeleniumClickFilter>>;
	OR?: Maybe<Array<SeleniumClickFilter>>;
};

export type SeleniumClickGroupBy = {
	query: SeleniumClickGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumClickGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	target?: Maybe<SeleniumTargetGroupByQuery>;
	command?: Maybe<SeleniumCommandGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SeleniumClickKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumClickListResponse output */
export type SeleniumClickListResponse = {
	__typename?: 'SeleniumClickListResponse';
	/** List items */
	items: Array<SeleniumClick>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumClickManyResponse output */
export type SeleniumClickManyResponse = {
	__typename?: 'SeleniumClickManyResponse';
	/** List items */
	items: Array<SeleniumClick>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumClickOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
}

/** SeleniumClick subscription payload */
export type SeleniumClickPayload = {
	__typename?: 'SeleniumClickPayload';
	mutation: MutationType;
	node?: Maybe<SeleniumClick>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumClick>;
};

export type SeleniumClickSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	target?: Maybe<SeleniumTargetSort>;
	command?: Maybe<SeleniumCommandSort>;
};

/** SeleniumClick subscription filter */
export type SeleniumClickSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumClickFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumClick relation input */
export type SeleniumClickTargetManyRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
};

/** SeleniumClick relation input */
export type SeleniumClickTargetRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<Click_SeleniumTargetCreateInput>;
};

/** SeleniumClick relation input */
export type SeleniumClickTargetUpdateRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	disconnect?: Maybe<SeleniumTargetKeyFilter>;
	reconnect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<Click_SeleniumTargetCreateInput>;
	update?: Maybe<Click_SeleniumTargetUpdateInput>;
};

/** SeleniumClick update input */
export type SeleniumClickUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	target?: Maybe<SeleniumClickTargetUpdateRelationInput>;
	command?: Maybe<SeleniumClickCommandUpdateRelationInput>;
};

export type SeleniumCommand = {
	__typename?: 'SeleniumCommand';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	open?: Maybe<SeleniumOpen>;
	setViewportSize?: Maybe<SeleniumSetViewportSize>;
	click?: Maybe<SeleniumClick>;
	type?: Maybe<SeleniumType>;
	dragndrop?: Maybe<SeleniumDragndrop>;
	sIndex?: Maybe<Scalars['Int']>;
	group?: Maybe<SeleniumGroup>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumCommand_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	sIndex?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	open?: Maybe<SeleniumOpen_PermissionFilter>;
	setViewportSize?: Maybe<SeleniumSetViewportSize_PermissionFilter>;
	click?: Maybe<SeleniumClick_PermissionFilter>;
	type?: Maybe<SeleniumType_PermissionFilter>;
	dragndrop?: Maybe<SeleniumDragndrop_PermissionFilter>;
	group?: Maybe<SeleniumGroup_PermissionFilter>;
	AND?: Maybe<Array<SeleniumCommand_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumCommand_PermissionFilter>>;
};

export type SeleniumCommand_PermissionRelationFilter = {
	some?: Maybe<SeleniumCommand_PermissionFilter>;
	every?: Maybe<SeleniumCommand_PermissionFilter>;
	none?: Maybe<SeleniumCommand_PermissionFilter>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandClickManyRelationInput = {
	connect?: Maybe<SeleniumClickKeyFilter>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandClickRelationInput = {
	connect?: Maybe<SeleniumClickKeyFilter>;
	create?: Maybe<Command_SeleniumClickCreateInput>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandClickUpdateRelationInput = {
	connect?: Maybe<SeleniumClickKeyFilter>;
	disconnect?: Maybe<SeleniumClickKeyFilter>;
	reconnect?: Maybe<SeleniumClickKeyFilter>;
	create?: Maybe<Command_SeleniumClickCreateInput>;
	update?: Maybe<Command_SeleniumClickUpdateInput>;
};

/** SeleniumCommand create input */
export type SeleniumCommandCreateInput = {
	open?: Maybe<SeleniumCommandOpenRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeRelationInput>;
	click?: Maybe<SeleniumCommandClickRelationInput>;
	type?: Maybe<SeleniumCommandTypeRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropRelationInput>;
	sIndex: Scalars['Int'];
	group?: Maybe<SeleniumCommandGroupRelationInput>;
};

/** SeleniumCommand create many input */
export type SeleniumCommandCreateManyInput = {
	open?: Maybe<SeleniumCommandOpenManyRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeManyRelationInput>;
	click?: Maybe<SeleniumCommandClickManyRelationInput>;
	type?: Maybe<SeleniumCommandTypeManyRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropManyRelationInput>;
	sIndex: Scalars['Int'];
	group?: Maybe<SeleniumCommandGroupManyRelationInput>;
};

/** SeleniumCommand delete input */
export type SeleniumCommandDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandDragndropManyRelationInput = {
	connect?: Maybe<SeleniumDragndropKeyFilter>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandDragndropRelationInput = {
	connect?: Maybe<SeleniumDragndropKeyFilter>;
	create?: Maybe<Command_SeleniumDragndropCreateInput>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandDragndropUpdateRelationInput = {
	connect?: Maybe<SeleniumDragndropKeyFilter>;
	disconnect?: Maybe<SeleniumDragndropKeyFilter>;
	reconnect?: Maybe<SeleniumDragndropKeyFilter>;
	create?: Maybe<Command_SeleniumDragndropCreateInput>;
	update?: Maybe<Command_SeleniumDragndropUpdateInput>;
};

/** SeleniumCommandFieldsPermissions create input */
export type SeleniumCommandFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	sIndex?: Maybe<Scalars['Boolean']>;
};

export type SeleniumCommandFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	sIndex?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	open?: Maybe<SeleniumOpenFilter>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeFilter>;
	click?: Maybe<SeleniumClickFilter>;
	type?: Maybe<SeleniumTypeFilter>;
	dragndrop?: Maybe<SeleniumDragndropFilter>;
	group?: Maybe<SeleniumGroupFilter>;
	AND?: Maybe<Array<SeleniumCommandFilter>>;
	OR?: Maybe<Array<SeleniumCommandFilter>>;
};

export type SeleniumCommandGroupBy = {
	query: SeleniumCommandGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumCommandGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	sIndex?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	open?: Maybe<SeleniumOpenGroupByQuery>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeGroupByQuery>;
	click?: Maybe<SeleniumClickGroupByQuery>;
	type?: Maybe<SeleniumTypeGroupByQuery>;
	dragndrop?: Maybe<SeleniumDragndropGroupByQuery>;
	group?: Maybe<SeleniumGroupGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandGroupManyRelationInput = {
	connect?: Maybe<SeleniumGroupKeyFilter>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandGroupRelationInput = {
	connect?: Maybe<SeleniumGroupKeyFilter>;
	create?: Maybe<Commands_SeleniumGroupCreateInput>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandGroupUpdateRelationInput = {
	connect?: Maybe<SeleniumGroupKeyFilter>;
	disconnect?: Maybe<SeleniumGroupKeyFilter>;
	reconnect?: Maybe<SeleniumGroupKeyFilter>;
	create?: Maybe<Commands_SeleniumGroupCreateInput>;
	update?: Maybe<Commands_SeleniumGroupUpdateInput>;
};

export type SeleniumCommandKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumCommandListResponse output */
export type SeleniumCommandListResponse = {
	__typename?: 'SeleniumCommandListResponse';
	/** List items */
	items: Array<SeleniumCommand>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumCommandManyResponse output */
export type SeleniumCommandManyResponse = {
	__typename?: 'SeleniumCommandManyResponse';
	/** List items */
	items: Array<SeleniumCommand>;
	/** List items count */
	count: Scalars['Int'];
};

/** SeleniumCommand relation input */
export type SeleniumCommandOpenManyRelationInput = {
	connect?: Maybe<SeleniumOpenKeyFilter>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandOpenRelationInput = {
	connect?: Maybe<SeleniumOpenKeyFilter>;
	create?: Maybe<Command_SeleniumOpenCreateInput>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandOpenUpdateRelationInput = {
	connect?: Maybe<SeleniumOpenKeyFilter>;
	disconnect?: Maybe<SeleniumOpenKeyFilter>;
	reconnect?: Maybe<SeleniumOpenKeyFilter>;
	create?: Maybe<Command_SeleniumOpenCreateInput>;
	update?: Maybe<Command_SeleniumOpenUpdateInput>;
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumCommandOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	SIndexAsc = 'sIndex_ASC',
	SIndexDesc = 'sIndex_DESC',
}

/** SeleniumCommand subscription payload */
export type SeleniumCommandPayload = {
	__typename?: 'SeleniumCommandPayload';
	mutation: MutationType;
	node?: Maybe<SeleniumCommand>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumCommand>;
};

export type SeleniumCommandRelationFilter = {
	some?: Maybe<SeleniumCommandFilter>;
	every?: Maybe<SeleniumCommandFilter>;
	none?: Maybe<SeleniumCommandFilter>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandSetViewportSizeManyRelationInput = {
	connect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandSetViewportSizeRelationInput = {
	connect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	create?: Maybe<SetViewportSize_SeleniumSetViewportSizeCreateInput>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandSetViewportSizeUpdateRelationInput = {
	connect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	disconnect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	reconnect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	create?: Maybe<SetViewportSize_SeleniumSetViewportSizeCreateInput>;
	update?: Maybe<SetViewportSize_SeleniumSetViewportSizeUpdateInput>;
};

export type SeleniumCommandSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	sIndex?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	open?: Maybe<SeleniumOpenSort>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeSort>;
	click?: Maybe<SeleniumClickSort>;
	type?: Maybe<SeleniumTypeSort>;
	dragndrop?: Maybe<SeleniumDragndropSort>;
	group?: Maybe<SeleniumGroupSort>;
};

/** SeleniumCommand subscription filter */
export type SeleniumCommandSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumCommandFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandTypeManyRelationInput = {
	connect?: Maybe<SeleniumTypeKeyFilter>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandTypeRelationInput = {
	connect?: Maybe<SeleniumTypeKeyFilter>;
	create?: Maybe<Command_SeleniumTypeCreateInput>;
};

/** SeleniumCommand relation input */
export type SeleniumCommandTypeUpdateRelationInput = {
	connect?: Maybe<SeleniumTypeKeyFilter>;
	disconnect?: Maybe<SeleniumTypeKeyFilter>;
	reconnect?: Maybe<SeleniumTypeKeyFilter>;
	create?: Maybe<Command_SeleniumTypeCreateInput>;
	update?: Maybe<Command_SeleniumTypeUpdateInput>;
};

/** SeleniumCommand update input */
export type SeleniumCommandUpdateByFilterInput = {
	sIndex?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
};

/** SeleniumCommand update input */
export type SeleniumCommandUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	open?: Maybe<SeleniumCommandOpenUpdateRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeUpdateRelationInput>;
	click?: Maybe<SeleniumCommandClickUpdateRelationInput>;
	type?: Maybe<SeleniumCommandTypeUpdateRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropUpdateRelationInput>;
	sIndex?: Maybe<Scalars['Int']>;
	group?: Maybe<SeleniumCommandGroupUpdateRelationInput>;
};

export type SeleniumDragndrop = {
	__typename?: 'SeleniumDragndrop';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	sourceTarget?: Maybe<SeleniumTarget>;
	destinationTarget?: Maybe<SeleniumTarget>;
	command?: Maybe<SeleniumCommand>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumDragndrop_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	sourceTarget?: Maybe<SeleniumTarget_PermissionFilter>;
	destinationTarget?: Maybe<SeleniumTarget_PermissionFilter>;
	command?: Maybe<SeleniumCommand_PermissionFilter>;
	AND?: Maybe<Array<SeleniumDragndrop_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumDragndrop_PermissionFilter>>;
};

/** SeleniumDragndrop relation input */
export type SeleniumDragndropCommandManyRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
};

/** SeleniumDragndrop relation input */
export type SeleniumDragndropCommandRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<Dragndrop_SeleniumCommandCreateInput>;
};

/** SeleniumDragndrop relation input */
export type SeleniumDragndropCommandUpdateRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	disconnect?: Maybe<SeleniumCommandKeyFilter>;
	reconnect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<Dragndrop_SeleniumCommandCreateInput>;
	update?: Maybe<Dragndrop_SeleniumCommandUpdateInput>;
};

/** SeleniumDragndrop create input */
export type SeleniumDragndropCreateInput = {
	sourceTarget?: Maybe<SeleniumDragndropSourceTargetRelationInput>;
	destinationTarget?: Maybe<SeleniumDragndropDestinationTargetRelationInput>;
	command?: Maybe<SeleniumDragndropCommandRelationInput>;
};

/** SeleniumDragndrop create many input */
export type SeleniumDragndropCreateManyInput = {
	sourceTarget: SeleniumDragndropSourceTargetManyRelationInput;
	destinationTarget: SeleniumDragndropDestinationTargetManyRelationInput;
	command?: Maybe<SeleniumDragndropCommandManyRelationInput>;
};

/** SeleniumDragndrop delete input */
export type SeleniumDragndropDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumDragndrop relation input */
export type SeleniumDragndropDestinationTargetManyRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
};

/** SeleniumDragndrop relation input */
export type SeleniumDragndropDestinationTargetRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<DragndropDestination_SeleniumTargetCreateInput>;
};

/** SeleniumDragndrop relation input */
export type SeleniumDragndropDestinationTargetUpdateRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	disconnect?: Maybe<SeleniumTargetKeyFilter>;
	reconnect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<DragndropDestination_SeleniumTargetCreateInput>;
	update?: Maybe<DragndropDestination_SeleniumTargetUpdateInput>;
};

/** SeleniumDragndropFieldsPermissions create input */
export type SeleniumDragndropFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
};

export type SeleniumDragndropFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	sourceTarget?: Maybe<SeleniumTargetFilter>;
	destinationTarget?: Maybe<SeleniumTargetFilter>;
	command?: Maybe<SeleniumCommandFilter>;
	AND?: Maybe<Array<SeleniumDragndropFilter>>;
	OR?: Maybe<Array<SeleniumDragndropFilter>>;
};

export type SeleniumDragndropGroupBy = {
	query: SeleniumDragndropGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumDragndropGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	sourceTarget?: Maybe<SeleniumTargetGroupByQuery>;
	destinationTarget?: Maybe<SeleniumTargetGroupByQuery>;
	command?: Maybe<SeleniumCommandGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SeleniumDragndropKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumDragndropListResponse output */
export type SeleniumDragndropListResponse = {
	__typename?: 'SeleniumDragndropListResponse';
	/** List items */
	items: Array<SeleniumDragndrop>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumDragndropManyResponse output */
export type SeleniumDragndropManyResponse = {
	__typename?: 'SeleniumDragndropManyResponse';
	/** List items */
	items: Array<SeleniumDragndrop>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumDragndropOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
}

/** SeleniumDragndrop subscription payload */
export type SeleniumDragndropPayload = {
	__typename?: 'SeleniumDragndropPayload';
	mutation: MutationType;
	node?: Maybe<SeleniumDragndrop>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumDragndrop>;
};

export type SeleniumDragndropSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	sourceTarget?: Maybe<SeleniumTargetSort>;
	destinationTarget?: Maybe<SeleniumTargetSort>;
	command?: Maybe<SeleniumCommandSort>;
};

/** SeleniumDragndrop relation input */
export type SeleniumDragndropSourceTargetManyRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
};

/** SeleniumDragndrop relation input */
export type SeleniumDragndropSourceTargetRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<DragndropSource_SeleniumTargetCreateInput>;
};

/** SeleniumDragndrop relation input */
export type SeleniumDragndropSourceTargetUpdateRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	disconnect?: Maybe<SeleniumTargetKeyFilter>;
	reconnect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<DragndropSource_SeleniumTargetCreateInput>;
	update?: Maybe<DragndropSource_SeleniumTargetUpdateInput>;
};

/** SeleniumDragndrop subscription filter */
export type SeleniumDragndropSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumDragndropFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumDragndrop update input */
export type SeleniumDragndropUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	sourceTarget?: Maybe<SeleniumDragndropSourceTargetUpdateRelationInput>;
	destinationTarget?: Maybe<SeleniumDragndropDestinationTargetUpdateRelationInput>;
	command?: Maybe<SeleniumDragndropCommandUpdateRelationInput>;
};

export type SeleniumGroup = {
	__typename?: 'SeleniumGroup';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	script?: Maybe<SeleniumScript>;
	commands?: Maybe<SeleniumCommandListResponse>;
	gIndex?: Maybe<Scalars['Int']>;
	name?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumGroupCommandsArgs = {
	filter?: Maybe<SeleniumCommandFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumCommandOrderBy>>>;
	sort?: Maybe<Array<SeleniumCommandSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumCommandGroupBy>;
};

export type SeleniumGroup_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	gIndex?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	script?: Maybe<SeleniumScript_PermissionFilter>;
	commands?: Maybe<SeleniumCommand_PermissionRelationFilter>;
	AND?: Maybe<Array<SeleniumGroup_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumGroup_PermissionFilter>>;
};

export type SeleniumGroup_PermissionRelationFilter = {
	some?: Maybe<SeleniumGroup_PermissionFilter>;
	every?: Maybe<SeleniumGroup_PermissionFilter>;
	none?: Maybe<SeleniumGroup_PermissionFilter>;
};

/** SeleniumGroup relation input */
export type SeleniumGroupCommandsManyRelationInput = {
	connect?: Maybe<Array<SeleniumCommandKeyFilter>>;
};

/** SeleniumGroup relation input */
export type SeleniumGroupCommandsRelationInput = {
	connect?: Maybe<Array<SeleniumCommandKeyFilter>>;
	create?: Maybe<Array<Maybe<Group_SeleniumCommandCreateInput>>>;
};

/** SeleniumGroup relation input */
export type SeleniumGroupCommandsUpdateRelationInput = {
	connect?: Maybe<Array<SeleniumCommandKeyFilter>>;
	disconnect?: Maybe<Array<SeleniumCommandKeyFilter>>;
	reconnect?: Maybe<Array<SeleniumCommandKeyFilter>>;
	create?: Maybe<Array<Maybe<Group_SeleniumCommandCreateInput>>>;
	update?: Maybe<Array<Maybe<Group_SeleniumCommandUpdateInput>>>;
};

/** SeleniumGroup create input */
export type SeleniumGroupCreateInput = {
	script?: Maybe<SeleniumGroupScriptRelationInput>;
	commands?: Maybe<SeleniumGroupCommandsRelationInput>;
	gIndex: Scalars['Int'];
	name?: Maybe<Scalars['String']>;
};

/** SeleniumGroup create many input */
export type SeleniumGroupCreateManyInput = {
	script?: Maybe<SeleniumGroupScriptManyRelationInput>;
	commands?: Maybe<SeleniumGroupCommandsManyRelationInput>;
	gIndex: Scalars['Int'];
	name?: Maybe<Scalars['String']>;
};

/** SeleniumGroup delete input */
export type SeleniumGroupDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumGroupFieldsPermissions create input */
export type SeleniumGroupFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	gIndex?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['Boolean']>;
};

export type SeleniumGroupFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	gIndex?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	script?: Maybe<SeleniumScriptFilter>;
	commands?: Maybe<SeleniumCommandRelationFilter>;
	AND?: Maybe<Array<SeleniumGroupFilter>>;
	OR?: Maybe<Array<SeleniumGroupFilter>>;
};

export type SeleniumGroupGroupBy = {
	query: SeleniumGroupGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumGroupGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	gIndex?: Maybe<Array<GroupByField>>;
	name?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	script?: Maybe<SeleniumScriptGroupByQuery>;
	commands?: Maybe<SeleniumCommandGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SeleniumGroupKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumGroupListResponse output */
export type SeleniumGroupListResponse = {
	__typename?: 'SeleniumGroupListResponse';
	/** List items */
	items: Array<SeleniumGroup>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumGroupManyResponse output */
export type SeleniumGroupManyResponse = {
	__typename?: 'SeleniumGroupManyResponse';
	/** List items */
	items: Array<SeleniumGroup>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumGroupOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	GIndexAsc = 'gIndex_ASC',
	GIndexDesc = 'gIndex_DESC',
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
}

/** SeleniumGroup subscription payload */
export type SeleniumGroupPayload = {
	__typename?: 'SeleniumGroupPayload';
	mutation: MutationType;
	node?: Maybe<SeleniumGroup>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumGroup>;
};

export type SeleniumGroupRelationFilter = {
	some?: Maybe<SeleniumGroupFilter>;
	every?: Maybe<SeleniumGroupFilter>;
	none?: Maybe<SeleniumGroupFilter>;
};

/** SeleniumGroup relation input */
export type SeleniumGroupScriptManyRelationInput = {
	connect?: Maybe<SeleniumScriptKeyFilter>;
};

/** SeleniumGroup relation input */
export type SeleniumGroupScriptRelationInput = {
	connect?: Maybe<SeleniumScriptKeyFilter>;
	create?: Maybe<Groups_SeleniumScriptCreateInput>;
};

/** SeleniumGroup relation input */
export type SeleniumGroupScriptUpdateRelationInput = {
	connect?: Maybe<SeleniumScriptKeyFilter>;
	disconnect?: Maybe<SeleniumScriptKeyFilter>;
	reconnect?: Maybe<SeleniumScriptKeyFilter>;
	create?: Maybe<Groups_SeleniumScriptCreateInput>;
	update?: Maybe<Groups_SeleniumScriptUpdateInput>;
};

export type SeleniumGroupSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	gIndex?: Maybe<SortOrder>;
	name?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	script?: Maybe<SeleniumScriptSort>;
};

/** SeleniumGroup subscription filter */
export type SeleniumGroupSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumGroupFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumGroup update input */
export type SeleniumGroupUpdateByFilterInput = {
	gIndex?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	name?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** SeleniumGroup update input */
export type SeleniumGroupUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	script?: Maybe<SeleniumGroupScriptUpdateRelationInput>;
	commands?: Maybe<SeleniumGroupCommandsUpdateRelationInput>;
	gIndex?: Maybe<Scalars['Int']>;
	name?: Maybe<Scalars['String']>;
};

export type SeleniumOpen = {
	__typename?: 'SeleniumOpen';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	value?: Maybe<Scalars['String']>;
	command?: Maybe<SeleniumCommand>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumOpen_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	value?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	command?: Maybe<SeleniumCommand_PermissionFilter>;
	AND?: Maybe<Array<SeleniumOpen_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumOpen_PermissionFilter>>;
};

/** SeleniumOpen relation input */
export type SeleniumOpenCommandManyRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
};

/** SeleniumOpen relation input */
export type SeleniumOpenCommandRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<Open_SeleniumCommandCreateInput>;
};

/** SeleniumOpen relation input */
export type SeleniumOpenCommandUpdateRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	disconnect?: Maybe<SeleniumCommandKeyFilter>;
	reconnect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<Open_SeleniumCommandCreateInput>;
	update?: Maybe<Open_SeleniumCommandUpdateInput>;
};

/** SeleniumOpen create input */
export type SeleniumOpenCreateInput = {
	value: Scalars['String'];
	command?: Maybe<SeleniumOpenCommandRelationInput>;
};

/** SeleniumOpen create many input */
export type SeleniumOpenCreateManyInput = {
	value: Scalars['String'];
	command?: Maybe<SeleniumOpenCommandManyRelationInput>;
};

/** SeleniumOpen delete input */
export type SeleniumOpenDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumOpenFieldsPermissions create input */
export type SeleniumOpenFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	value?: Maybe<Scalars['Boolean']>;
};

export type SeleniumOpenFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	value?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	command?: Maybe<SeleniumCommandFilter>;
	AND?: Maybe<Array<SeleniumOpenFilter>>;
	OR?: Maybe<Array<SeleniumOpenFilter>>;
};

export type SeleniumOpenGroupBy = {
	query: SeleniumOpenGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumOpenGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	value?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	command?: Maybe<SeleniumCommandGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SeleniumOpenKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumOpenListResponse output */
export type SeleniumOpenListResponse = {
	__typename?: 'SeleniumOpenListResponse';
	/** List items */
	items: Array<SeleniumOpen>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumOpenManyResponse output */
export type SeleniumOpenManyResponse = {
	__typename?: 'SeleniumOpenManyResponse';
	/** List items */
	items: Array<SeleniumOpen>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumOpenOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	ValueAsc = 'value_ASC',
	ValueDesc = 'value_DESC',
}

/** SeleniumOpen subscription payload */
export type SeleniumOpenPayload = {
	__typename?: 'SeleniumOpenPayload';
	mutation: MutationType;
	node?: Maybe<SeleniumOpen>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumOpen>;
};

export type SeleniumOpenSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	value?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	command?: Maybe<SeleniumCommandSort>;
};

/** SeleniumOpen subscription filter */
export type SeleniumOpenSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumOpenFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumOpen update input */
export type SeleniumOpenUpdateByFilterInput = {
	value?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** SeleniumOpen update input */
export type SeleniumOpenUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	value?: Maybe<Scalars['String']>;
	command?: Maybe<SeleniumOpenCommandUpdateRelationInput>;
};

export type SeleniumPoint = {
	__typename?: 'SeleniumPoint';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	setViewportSize?: Maybe<SeleniumSetViewportSize>;
	target?: Maybe<SeleniumTarget>;
	xCoord?: Maybe<Scalars['Int']>;
	yCoord?: Maybe<Scalars['Int']>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumPoint_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	xCoord?: Maybe<IntPredicate>;
	yCoord?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	setViewportSize?: Maybe<SeleniumSetViewportSize_PermissionFilter>;
	target?: Maybe<SeleniumTarget_PermissionFilter>;
	AND?: Maybe<Array<SeleniumPoint_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumPoint_PermissionFilter>>;
};

/** SeleniumPoint create input */
export type SeleniumPointCreateInput = {
	setViewportSize?: Maybe<SeleniumPointSetViewportSizeRelationInput>;
	target?: Maybe<SeleniumPointTargetRelationInput>;
	xCoord: Scalars['Int'];
	yCoord: Scalars['Int'];
};

/** SeleniumPoint create many input */
export type SeleniumPointCreateManyInput = {
	setViewportSize?: Maybe<SeleniumPointSetViewportSizeManyRelationInput>;
	target?: Maybe<SeleniumPointTargetManyRelationInput>;
	xCoord: Scalars['Int'];
	yCoord: Scalars['Int'];
};

/** SeleniumPoint delete input */
export type SeleniumPointDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumPointFieldsPermissions create input */
export type SeleniumPointFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	xCoord?: Maybe<Scalars['Boolean']>;
	yCoord?: Maybe<Scalars['Boolean']>;
};

export type SeleniumPointFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	xCoord?: Maybe<IntPredicate>;
	yCoord?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeFilter>;
	target?: Maybe<SeleniumTargetFilter>;
	AND?: Maybe<Array<SeleniumPointFilter>>;
	OR?: Maybe<Array<SeleniumPointFilter>>;
};

export type SeleniumPointGroupBy = {
	query: SeleniumPointGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumPointGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	xCoord?: Maybe<Array<GroupByField>>;
	yCoord?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeGroupByQuery>;
	target?: Maybe<SeleniumTargetGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SeleniumPointKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumPointListResponse output */
export type SeleniumPointListResponse = {
	__typename?: 'SeleniumPointListResponse';
	/** List items */
	items: Array<SeleniumPoint>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumPointManyResponse output */
export type SeleniumPointManyResponse = {
	__typename?: 'SeleniumPointManyResponse';
	/** List items */
	items: Array<SeleniumPoint>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumPointOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	XCoordAsc = 'xCoord_ASC',
	XCoordDesc = 'xCoord_DESC',
	YCoordAsc = 'yCoord_ASC',
	YCoordDesc = 'yCoord_DESC',
}

/** SeleniumPoint subscription payload */
export type SeleniumPointPayload = {
	__typename?: 'SeleniumPointPayload';
	mutation: MutationType;
	node?: Maybe<SeleniumPoint>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumPoint>;
};

/** SeleniumPoint relation input */
export type SeleniumPointSetViewportSizeManyRelationInput = {
	connect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
};

/** SeleniumPoint relation input */
export type SeleniumPointSetViewportSizeRelationInput = {
	connect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	create?: Maybe<Value_SeleniumSetViewportSizeCreateInput>;
};

/** SeleniumPoint relation input */
export type SeleniumPointSetViewportSizeUpdateRelationInput = {
	connect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	disconnect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	reconnect?: Maybe<SeleniumSetViewportSizeKeyFilter>;
	create?: Maybe<Value_SeleniumSetViewportSizeCreateInput>;
	update?: Maybe<Value_SeleniumSetViewportSizeUpdateInput>;
};

export type SeleniumPointSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	xCoord?: Maybe<SortOrder>;
	yCoord?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeSort>;
	target?: Maybe<SeleniumTargetSort>;
};

/** SeleniumPoint subscription filter */
export type SeleniumPointSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumPointFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumPoint relation input */
export type SeleniumPointTargetManyRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
};

/** SeleniumPoint relation input */
export type SeleniumPointTargetRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<Coordinates_SeleniumTargetCreateInput>;
};

/** SeleniumPoint relation input */
export type SeleniumPointTargetUpdateRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	disconnect?: Maybe<SeleniumTargetKeyFilter>;
	reconnect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<Coordinates_SeleniumTargetCreateInput>;
	update?: Maybe<Coordinates_SeleniumTargetUpdateInput>;
};

/** SeleniumPoint update input */
export type SeleniumPointUpdateByFilterInput = {
	xCoord?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	yCoord?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
};

/** SeleniumPoint update input */
export type SeleniumPointUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	setViewportSize?: Maybe<SeleniumPointSetViewportSizeUpdateRelationInput>;
	target?: Maybe<SeleniumPointTargetUpdateRelationInput>;
	xCoord?: Maybe<Scalars['Int']>;
	yCoord?: Maybe<Scalars['Int']>;
};

export type SeleniumScript = {
	__typename?: 'SeleniumScript';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	version?: Maybe<Scalars['String']>;
	recording?: Maybe<Recording>;
	groups?: Maybe<SeleniumGroupListResponse>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumScriptGroupsArgs = {
	filter?: Maybe<SeleniumGroupFilter>;
	orderBy?: Maybe<Array<Maybe<SeleniumGroupOrderBy>>>;
	sort?: Maybe<Array<SeleniumGroupSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<SeleniumGroupGroupBy>;
};

export type SeleniumScript_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	version?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	recording?: Maybe<Recording_PermissionFilter>;
	groups?: Maybe<SeleniumGroup_PermissionRelationFilter>;
	AND?: Maybe<Array<SeleniumScript_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumScript_PermissionFilter>>;
};

/** Recording create input from seleniumScript */
export type SeleniumScript_RecordingCreateInput = {
	environment?: Maybe<RecordingEnvironmentRelationInput>;
	userStory?: Maybe<RecordingUserStoryRelationInput>;
	video?: Maybe<RecordingVideoRelationInput>;
	seleniumScript?: Maybe<RecordingSeleniumScriptRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

/** Recording update input from seleniumScript */
export type SeleniumScript_RecordingUpdateInput = {
	environment?: Maybe<RecordingEnvironmentUpdateRelationInput>;
	userStory?: Maybe<RecordingUserStoryUpdateRelationInput>;
	video?: Maybe<RecordingVideoUpdateRelationInput>;
	seleniumScript?: Maybe<RecordingSeleniumScriptUpdateRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

/** SeleniumScript create input */
export type SeleniumScriptCreateInput = {
	version: Scalars['String'];
	recording?: Maybe<SeleniumScriptRecordingRelationInput>;
	groups?: Maybe<SeleniumScriptGroupsRelationInput>;
};

/** SeleniumScript create many input */
export type SeleniumScriptCreateManyInput = {
	version: Scalars['String'];
	groups?: Maybe<SeleniumScriptGroupsManyRelationInput>;
};

/** SeleniumScript delete input */
export type SeleniumScriptDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumScriptFieldsPermissions create input */
export type SeleniumScriptFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	version?: Maybe<Scalars['Boolean']>;
};

export type SeleniumScriptFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	version?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	recording?: Maybe<RecordingFilter>;
	groups?: Maybe<SeleniumGroupRelationFilter>;
	AND?: Maybe<Array<SeleniumScriptFilter>>;
	OR?: Maybe<Array<SeleniumScriptFilter>>;
};

export type SeleniumScriptGroupBy = {
	query: SeleniumScriptGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumScriptGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	version?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	recording?: Maybe<RecordingGroupByQuery>;
	groups?: Maybe<SeleniumGroupGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

/** SeleniumScript relation input */
export type SeleniumScriptGroupsManyRelationInput = {
	connect?: Maybe<Array<SeleniumGroupKeyFilter>>;
};

/** SeleniumScript relation input */
export type SeleniumScriptGroupsRelationInput = {
	connect?: Maybe<Array<SeleniumGroupKeyFilter>>;
	create?: Maybe<Array<Maybe<Script_SeleniumGroupCreateInput>>>;
};

/** SeleniumScript relation input */
export type SeleniumScriptGroupsUpdateRelationInput = {
	connect?: Maybe<Array<SeleniumGroupKeyFilter>>;
	disconnect?: Maybe<Array<SeleniumGroupKeyFilter>>;
	reconnect?: Maybe<Array<SeleniumGroupKeyFilter>>;
	create?: Maybe<Array<Maybe<Script_SeleniumGroupCreateInput>>>;
	update?: Maybe<Array<Maybe<Script_SeleniumGroupUpdateInput>>>;
};

export type SeleniumScriptKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumScriptListResponse output */
export type SeleniumScriptListResponse = {
	__typename?: 'SeleniumScriptListResponse';
	/** List items */
	items: Array<SeleniumScript>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumScriptManyResponse output */
export type SeleniumScriptManyResponse = {
	__typename?: 'SeleniumScriptManyResponse';
	/** List items */
	items: Array<SeleniumScript>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumScriptOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	VersionAsc = 'version_ASC',
	VersionDesc = 'version_DESC',
}

/** SeleniumScript subscription payload */
export type SeleniumScriptPayload = {
	__typename?: 'SeleniumScriptPayload';
	mutation: MutationType;
	node?: Maybe<SeleniumScript>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumScript>;
};

/** SeleniumScript relation input */
export type SeleniumScriptRecordingRelationInput = {
	create?: Maybe<SeleniumScript_RecordingCreateInput>;
};

/** SeleniumScript relation input */
export type SeleniumScriptRecordingUpdateRelationInput = {
	update?: Maybe<SeleniumScript_RecordingUpdateInput>;
};

export type SeleniumScriptSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	version?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	recording?: Maybe<RecordingSort>;
};

/** SeleniumScript subscription filter */
export type SeleniumScriptSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumScriptFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumScript update input */
export type SeleniumScriptUpdateByFilterInput = {
	version?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
};

/** SeleniumScript update input */
export type SeleniumScriptUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	version?: Maybe<Scalars['String']>;
	recording?: Maybe<SeleniumScriptRecordingUpdateRelationInput>;
	groups?: Maybe<SeleniumScriptGroupsUpdateRelationInput>;
};

export type SeleniumSelector = {
	__typename?: 'SeleniumSelector';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	target?: Maybe<SeleniumTarget>;
	xpath?: Maybe<Scalars['String']>;
	selector?: Maybe<Scalars['String']>;
	className?: Maybe<Scalars['String']>;
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	innerText?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumSelector_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	xpath?: Maybe<StringPredicate>;
	selector?: Maybe<StringPredicate>;
	className?: Maybe<StringPredicate>;
	tagName?: Maybe<StringPredicate>;
	tagId?: Maybe<StringPredicate>;
	innerText?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	target?: Maybe<SeleniumTarget_PermissionFilter>;
	AND?: Maybe<Array<SeleniumSelector_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumSelector_PermissionFilter>>;
};

/** SeleniumSelector create input */
export type SeleniumSelectorCreateInput = {
	target?: Maybe<SeleniumSelectorTargetRelationInput>;
	xpath?: Maybe<Scalars['String']>;
	selector?: Maybe<Scalars['String']>;
	className?: Maybe<Scalars['String']>;
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	innerText?: Maybe<Scalars['String']>;
};

/** SeleniumSelector create many input */
export type SeleniumSelectorCreateManyInput = {
	target?: Maybe<SeleniumSelectorTargetManyRelationInput>;
	xpath?: Maybe<Scalars['String']>;
	selector?: Maybe<Scalars['String']>;
	className?: Maybe<Scalars['String']>;
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	innerText?: Maybe<Scalars['String']>;
};

/** SeleniumSelector delete input */
export type SeleniumSelectorDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumSelectorFieldsPermissions create input */
export type SeleniumSelectorFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	xpath?: Maybe<Scalars['Boolean']>;
	selector?: Maybe<Scalars['Boolean']>;
	className?: Maybe<Scalars['Boolean']>;
	tagName?: Maybe<Scalars['Boolean']>;
	tagId?: Maybe<Scalars['Boolean']>;
	innerText?: Maybe<Scalars['Boolean']>;
};

export type SeleniumSelectorFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	xpath?: Maybe<StringPredicate>;
	selector?: Maybe<StringPredicate>;
	className?: Maybe<StringPredicate>;
	tagName?: Maybe<StringPredicate>;
	tagId?: Maybe<StringPredicate>;
	innerText?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	target?: Maybe<SeleniumTargetFilter>;
	AND?: Maybe<Array<SeleniumSelectorFilter>>;
	OR?: Maybe<Array<SeleniumSelectorFilter>>;
};

export type SeleniumSelectorGroupBy = {
	query: SeleniumSelectorGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumSelectorGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	xpath?: Maybe<Array<GroupByField>>;
	selector?: Maybe<Array<GroupByField>>;
	className?: Maybe<Array<GroupByField>>;
	tagName?: Maybe<Array<GroupByField>>;
	tagId?: Maybe<Array<GroupByField>>;
	innerText?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	target?: Maybe<SeleniumTargetGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SeleniumSelectorKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumSelectorListResponse output */
export type SeleniumSelectorListResponse = {
	__typename?: 'SeleniumSelectorListResponse';
	/** List items */
	items: Array<SeleniumSelector>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumSelectorManyResponse output */
export type SeleniumSelectorManyResponse = {
	__typename?: 'SeleniumSelectorManyResponse';
	/** List items */
	items: Array<SeleniumSelector>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumSelectorOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	XpathAsc = 'xpath_ASC',
	XpathDesc = 'xpath_DESC',
	SelectorAsc = 'selector_ASC',
	SelectorDesc = 'selector_DESC',
	ClassNameAsc = 'className_ASC',
	ClassNameDesc = 'className_DESC',
	TagNameAsc = 'tagName_ASC',
	TagNameDesc = 'tagName_DESC',
	TagIdAsc = 'tagId_ASC',
	TagIdDesc = 'tagId_DESC',
	InnerTextAsc = 'innerText_ASC',
	InnerTextDesc = 'innerText_DESC',
}

/** SeleniumSelector subscription payload */
export type SeleniumSelectorPayload = {
	__typename?: 'SeleniumSelectorPayload';
	mutation: MutationType;
	node?: Maybe<SeleniumSelector>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumSelector>;
};

export type SeleniumSelectorSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	xpath?: Maybe<SortOrder>;
	selector?: Maybe<SortOrder>;
	className?: Maybe<SortOrder>;
	tagName?: Maybe<SortOrder>;
	tagId?: Maybe<SortOrder>;
	innerText?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	target?: Maybe<SeleniumTargetSort>;
};

/** SeleniumSelector subscription filter */
export type SeleniumSelectorSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumSelectorFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumSelector relation input */
export type SeleniumSelectorTargetManyRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
};

/** SeleniumSelector relation input */
export type SeleniumSelectorTargetRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<Selector_SeleniumTargetCreateInput>;
};

/** SeleniumSelector relation input */
export type SeleniumSelectorTargetUpdateRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	disconnect?: Maybe<SeleniumTargetKeyFilter>;
	reconnect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<Selector_SeleniumTargetCreateInput>;
	update?: Maybe<Selector_SeleniumTargetUpdateInput>;
};

/** SeleniumSelector update input */
export type SeleniumSelectorUpdateByFilterInput = {
	xpath?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	selector?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	className?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	tagName?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	tagId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	innerText?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** SeleniumSelector update input */
export type SeleniumSelectorUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	target?: Maybe<SeleniumSelectorTargetUpdateRelationInput>;
	xpath?: Maybe<Scalars['String']>;
	selector?: Maybe<Scalars['String']>;
	className?: Maybe<Scalars['String']>;
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	innerText?: Maybe<Scalars['String']>;
};

export type SeleniumSetViewportSize = {
	__typename?: 'SeleniumSetViewportSize';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	value?: Maybe<SeleniumPoint>;
	setViewportSize?: Maybe<SeleniumCommand>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumSetViewportSize_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	value?: Maybe<SeleniumPoint_PermissionFilter>;
	setViewportSize?: Maybe<SeleniumCommand_PermissionFilter>;
	AND?: Maybe<Array<SeleniumSetViewportSize_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumSetViewportSize_PermissionFilter>>;
};

/** SeleniumSetViewportSize create input */
export type SeleniumSetViewportSizeCreateInput = {
	value?: Maybe<SeleniumSetViewportSizeValueRelationInput>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeSetViewportSizeRelationInput>;
};

/** SeleniumSetViewportSize create many input */
export type SeleniumSetViewportSizeCreateManyInput = {
	value: SeleniumSetViewportSizeValueManyRelationInput;
	setViewportSize?: Maybe<SeleniumSetViewportSizeSetViewportSizeManyRelationInput>;
};

/** SeleniumSetViewportSize delete input */
export type SeleniumSetViewportSizeDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumSetViewportSizeFieldsPermissions create input */
export type SeleniumSetViewportSizeFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
};

export type SeleniumSetViewportSizeFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	value?: Maybe<SeleniumPointFilter>;
	setViewportSize?: Maybe<SeleniumCommandFilter>;
	AND?: Maybe<Array<SeleniumSetViewportSizeFilter>>;
	OR?: Maybe<Array<SeleniumSetViewportSizeFilter>>;
};

export type SeleniumSetViewportSizeGroupBy = {
	query: SeleniumSetViewportSizeGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumSetViewportSizeGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	value?: Maybe<SeleniumPointGroupByQuery>;
	setViewportSize?: Maybe<SeleniumCommandGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SeleniumSetViewportSizeKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumSetViewportSizeListResponse output */
export type SeleniumSetViewportSizeListResponse = {
	__typename?: 'SeleniumSetViewportSizeListResponse';
	/** List items */
	items: Array<SeleniumSetViewportSize>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumSetViewportSizeManyResponse output */
export type SeleniumSetViewportSizeManyResponse = {
	__typename?: 'SeleniumSetViewportSizeManyResponse';
	/** List items */
	items: Array<SeleniumSetViewportSize>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumSetViewportSizeOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
}

/** SeleniumSetViewportSize subscription payload */
export type SeleniumSetViewportSizePayload = {
	__typename?: 'SeleniumSetViewportSizePayload';
	mutation: MutationType;
	node?: Maybe<SeleniumSetViewportSize>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumSetViewportSize>;
};

/** SeleniumSetViewportSize relation input */
export type SeleniumSetViewportSizeSetViewportSizeManyRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
};

/** SeleniumSetViewportSize relation input */
export type SeleniumSetViewportSizeSetViewportSizeRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<SetViewportSize_SeleniumCommandCreateInput>;
};

/** SeleniumSetViewportSize relation input */
export type SeleniumSetViewportSizeSetViewportSizeUpdateRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	disconnect?: Maybe<SeleniumCommandKeyFilter>;
	reconnect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<SetViewportSize_SeleniumCommandCreateInput>;
	update?: Maybe<SetViewportSize_SeleniumCommandUpdateInput>;
};

export type SeleniumSetViewportSizeSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	value?: Maybe<SeleniumPointSort>;
	setViewportSize?: Maybe<SeleniumCommandSort>;
};

/** SeleniumSetViewportSize subscription filter */
export type SeleniumSetViewportSizeSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumSetViewportSizeFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumSetViewportSize update input */
export type SeleniumSetViewportSizeUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	value?: Maybe<SeleniumSetViewportSizeValueUpdateRelationInput>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeSetViewportSizeUpdateRelationInput>;
};

/** SeleniumSetViewportSize relation input */
export type SeleniumSetViewportSizeValueManyRelationInput = {
	connect?: Maybe<SeleniumPointKeyFilter>;
};

/** SeleniumSetViewportSize relation input */
export type SeleniumSetViewportSizeValueRelationInput = {
	connect?: Maybe<SeleniumPointKeyFilter>;
	create?: Maybe<SetViewportSize_SeleniumPointCreateInput>;
};

/** SeleniumSetViewportSize relation input */
export type SeleniumSetViewportSizeValueUpdateRelationInput = {
	connect?: Maybe<SeleniumPointKeyFilter>;
	disconnect?: Maybe<SeleniumPointKeyFilter>;
	reconnect?: Maybe<SeleniumPointKeyFilter>;
	create?: Maybe<SetViewportSize_SeleniumPointCreateInput>;
	update?: Maybe<SetViewportSize_SeleniumPointUpdateInput>;
};

export type SeleniumTarget = {
	__typename?: 'SeleniumTarget';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	click?: Maybe<SeleniumClick>;
	type?: Maybe<SeleniumType>;
	dragndropSource?: Maybe<SeleniumDragndrop>;
	dragndropDestination?: Maybe<SeleniumDragndrop>;
	selector?: Maybe<SeleniumSelector>;
	coordinates?: Maybe<SeleniumPoint>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumTarget_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	click?: Maybe<SeleniumClick_PermissionFilter>;
	type?: Maybe<SeleniumType_PermissionFilter>;
	dragndropSource?: Maybe<SeleniumDragndrop_PermissionFilter>;
	dragndropDestination?: Maybe<SeleniumDragndrop_PermissionFilter>;
	selector?: Maybe<SeleniumSelector_PermissionFilter>;
	coordinates?: Maybe<SeleniumPoint_PermissionFilter>;
	AND?: Maybe<Array<SeleniumTarget_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumTarget_PermissionFilter>>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetClickManyRelationInput = {
	connect?: Maybe<SeleniumClickKeyFilter>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetClickRelationInput = {
	connect?: Maybe<SeleniumClickKeyFilter>;
	create?: Maybe<Target_SeleniumClickCreateInput>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetClickUpdateRelationInput = {
	connect?: Maybe<SeleniumClickKeyFilter>;
	disconnect?: Maybe<SeleniumClickKeyFilter>;
	reconnect?: Maybe<SeleniumClickKeyFilter>;
	create?: Maybe<Target_SeleniumClickCreateInput>;
	update?: Maybe<Target_SeleniumClickUpdateInput>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetCoordinatesManyRelationInput = {
	connect?: Maybe<SeleniumPointKeyFilter>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetCoordinatesRelationInput = {
	connect?: Maybe<SeleniumPointKeyFilter>;
	create?: Maybe<Target_SeleniumPointCreateInput>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetCoordinatesUpdateRelationInput = {
	connect?: Maybe<SeleniumPointKeyFilter>;
	disconnect?: Maybe<SeleniumPointKeyFilter>;
	reconnect?: Maybe<SeleniumPointKeyFilter>;
	create?: Maybe<Target_SeleniumPointCreateInput>;
	update?: Maybe<Target_SeleniumPointUpdateInput>;
};

/** SeleniumTarget create input */
export type SeleniumTargetCreateInput = {
	click?: Maybe<SeleniumTargetClickRelationInput>;
	type?: Maybe<SeleniumTargetTypeRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesRelationInput>;
};

/** SeleniumTarget create many input */
export type SeleniumTargetCreateManyInput = {
	click?: Maybe<SeleniumTargetClickManyRelationInput>;
	type?: Maybe<SeleniumTargetTypeManyRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceManyRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationManyRelationInput>;
	selector: SeleniumTargetSelectorManyRelationInput;
	coordinates?: Maybe<SeleniumTargetCoordinatesManyRelationInput>;
};

/** SeleniumTarget delete input */
export type SeleniumTargetDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetDragndropDestinationManyRelationInput = {
	connect?: Maybe<SeleniumDragndropKeyFilter>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetDragndropDestinationRelationInput = {
	connect?: Maybe<SeleniumDragndropKeyFilter>;
	create?: Maybe<DestinationTarget_SeleniumDragndropCreateInput>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetDragndropDestinationUpdateRelationInput = {
	connect?: Maybe<SeleniumDragndropKeyFilter>;
	disconnect?: Maybe<SeleniumDragndropKeyFilter>;
	reconnect?: Maybe<SeleniumDragndropKeyFilter>;
	create?: Maybe<DestinationTarget_SeleniumDragndropCreateInput>;
	update?: Maybe<DestinationTarget_SeleniumDragndropUpdateInput>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetDragndropSourceManyRelationInput = {
	connect?: Maybe<SeleniumDragndropKeyFilter>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetDragndropSourceRelationInput = {
	connect?: Maybe<SeleniumDragndropKeyFilter>;
	create?: Maybe<SourceTarget_SeleniumDragndropCreateInput>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetDragndropSourceUpdateRelationInput = {
	connect?: Maybe<SeleniumDragndropKeyFilter>;
	disconnect?: Maybe<SeleniumDragndropKeyFilter>;
	reconnect?: Maybe<SeleniumDragndropKeyFilter>;
	create?: Maybe<SourceTarget_SeleniumDragndropCreateInput>;
	update?: Maybe<SourceTarget_SeleniumDragndropUpdateInput>;
};

/** SeleniumTargetFieldsPermissions create input */
export type SeleniumTargetFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
};

export type SeleniumTargetFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	click?: Maybe<SeleniumClickFilter>;
	type?: Maybe<SeleniumTypeFilter>;
	dragndropSource?: Maybe<SeleniumDragndropFilter>;
	dragndropDestination?: Maybe<SeleniumDragndropFilter>;
	selector?: Maybe<SeleniumSelectorFilter>;
	coordinates?: Maybe<SeleniumPointFilter>;
	AND?: Maybe<Array<SeleniumTargetFilter>>;
	OR?: Maybe<Array<SeleniumTargetFilter>>;
};

export type SeleniumTargetGroupBy = {
	query: SeleniumTargetGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumTargetGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	click?: Maybe<SeleniumClickGroupByQuery>;
	type?: Maybe<SeleniumTypeGroupByQuery>;
	dragndropSource?: Maybe<SeleniumDragndropGroupByQuery>;
	dragndropDestination?: Maybe<SeleniumDragndropGroupByQuery>;
	selector?: Maybe<SeleniumSelectorGroupByQuery>;
	coordinates?: Maybe<SeleniumPointGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SeleniumTargetKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumTargetListResponse output */
export type SeleniumTargetListResponse = {
	__typename?: 'SeleniumTargetListResponse';
	/** List items */
	items: Array<SeleniumTarget>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumTargetManyResponse output */
export type SeleniumTargetManyResponse = {
	__typename?: 'SeleniumTargetManyResponse';
	/** List items */
	items: Array<SeleniumTarget>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumTargetOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
}

/** SeleniumTarget subscription payload */
export type SeleniumTargetPayload = {
	__typename?: 'SeleniumTargetPayload';
	mutation: MutationType;
	node?: Maybe<SeleniumTarget>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumTarget>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetSelectorManyRelationInput = {
	connect?: Maybe<SeleniumSelectorKeyFilter>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetSelectorRelationInput = {
	connect?: Maybe<SeleniumSelectorKeyFilter>;
	create?: Maybe<Target_SeleniumSelectorCreateInput>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetSelectorUpdateRelationInput = {
	connect?: Maybe<SeleniumSelectorKeyFilter>;
	disconnect?: Maybe<SeleniumSelectorKeyFilter>;
	reconnect?: Maybe<SeleniumSelectorKeyFilter>;
	create?: Maybe<Target_SeleniumSelectorCreateInput>;
	update?: Maybe<Target_SeleniumSelectorUpdateInput>;
};

export type SeleniumTargetSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	click?: Maybe<SeleniumClickSort>;
	type?: Maybe<SeleniumTypeSort>;
	dragndropSource?: Maybe<SeleniumDragndropSort>;
	dragndropDestination?: Maybe<SeleniumDragndropSort>;
	selector?: Maybe<SeleniumSelectorSort>;
	coordinates?: Maybe<SeleniumPointSort>;
};

/** SeleniumTarget subscription filter */
export type SeleniumTargetSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumTargetFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetTypeManyRelationInput = {
	connect?: Maybe<SeleniumTypeKeyFilter>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetTypeRelationInput = {
	connect?: Maybe<SeleniumTypeKeyFilter>;
	create?: Maybe<Target_SeleniumTypeCreateInput>;
};

/** SeleniumTarget relation input */
export type SeleniumTargetTypeUpdateRelationInput = {
	connect?: Maybe<SeleniumTypeKeyFilter>;
	disconnect?: Maybe<SeleniumTypeKeyFilter>;
	reconnect?: Maybe<SeleniumTypeKeyFilter>;
	create?: Maybe<Target_SeleniumTypeCreateInput>;
	update?: Maybe<Target_SeleniumTypeUpdateInput>;
};

/** SeleniumTarget update input */
export type SeleniumTargetUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	click?: Maybe<SeleniumTargetClickUpdateRelationInput>;
	type?: Maybe<SeleniumTargetTypeUpdateRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceUpdateRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationUpdateRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorUpdateRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesUpdateRelationInput>;
};

export type SeleniumType = {
	__typename?: 'SeleniumType';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	target?: Maybe<SeleniumTarget>;
	command?: Maybe<SeleniumCommand>;
	value?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

export type SeleniumType_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	value?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	target?: Maybe<SeleniumTarget_PermissionFilter>;
	command?: Maybe<SeleniumCommand_PermissionFilter>;
	AND?: Maybe<Array<SeleniumType_PermissionFilter>>;
	OR?: Maybe<Array<SeleniumType_PermissionFilter>>;
};

/** SeleniumType relation input */
export type SeleniumTypeCommandManyRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
};

/** SeleniumType relation input */
export type SeleniumTypeCommandRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<Type_SeleniumCommandCreateInput>;
};

/** SeleniumType relation input */
export type SeleniumTypeCommandUpdateRelationInput = {
	connect?: Maybe<SeleniumCommandKeyFilter>;
	disconnect?: Maybe<SeleniumCommandKeyFilter>;
	reconnect?: Maybe<SeleniumCommandKeyFilter>;
	create?: Maybe<Type_SeleniumCommandCreateInput>;
	update?: Maybe<Type_SeleniumCommandUpdateInput>;
};

/** SeleniumType create input */
export type SeleniumTypeCreateInput = {
	target?: Maybe<SeleniumTypeTargetRelationInput>;
	command?: Maybe<SeleniumTypeCommandRelationInput>;
	value: Scalars['String'];
};

/** SeleniumType create many input */
export type SeleniumTypeCreateManyInput = {
	target: SeleniumTypeTargetManyRelationInput;
	command?: Maybe<SeleniumTypeCommandManyRelationInput>;
	value: Scalars['String'];
};

/** SeleniumType delete input */
export type SeleniumTypeDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SeleniumTypeFieldsPermissions create input */
export type SeleniumTypeFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	value?: Maybe<Scalars['Boolean']>;
};

export type SeleniumTypeFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	value?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	target?: Maybe<SeleniumTargetFilter>;
	command?: Maybe<SeleniumCommandFilter>;
	AND?: Maybe<Array<SeleniumTypeFilter>>;
	OR?: Maybe<Array<SeleniumTypeFilter>>;
};

export type SeleniumTypeGroupBy = {
	query: SeleniumTypeGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SeleniumTypeGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	value?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	target?: Maybe<SeleniumTargetGroupByQuery>;
	command?: Maybe<SeleniumCommandGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SeleniumTypeKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SeleniumTypeListResponse output */
export type SeleniumTypeListResponse = {
	__typename?: 'SeleniumTypeListResponse';
	/** List items */
	items: Array<SeleniumType>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SeleniumTypeManyResponse output */
export type SeleniumTypeManyResponse = {
	__typename?: 'SeleniumTypeManyResponse';
	/** List items */
	items: Array<SeleniumType>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SeleniumTypeOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	ValueAsc = 'value_ASC',
	ValueDesc = 'value_DESC',
}

/** SeleniumType subscription payload */
export type SeleniumTypePayload = {
	__typename?: 'SeleniumTypePayload';
	mutation: MutationType;
	node?: Maybe<SeleniumType>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<SeleniumType>;
};

export type SeleniumTypeSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	value?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	target?: Maybe<SeleniumTargetSort>;
	command?: Maybe<SeleniumCommandSort>;
};

/** SeleniumType subscription filter */
export type SeleniumTypeSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SeleniumTypeFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** SeleniumType relation input */
export type SeleniumTypeTargetManyRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
};

/** SeleniumType relation input */
export type SeleniumTypeTargetRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<Type_SeleniumTargetCreateInput>;
};

/** SeleniumType relation input */
export type SeleniumTypeTargetUpdateRelationInput = {
	connect?: Maybe<SeleniumTargetKeyFilter>;
	disconnect?: Maybe<SeleniumTargetKeyFilter>;
	reconnect?: Maybe<SeleniumTargetKeyFilter>;
	create?: Maybe<Type_SeleniumTargetCreateInput>;
	update?: Maybe<Type_SeleniumTargetUpdateInput>;
};

/** SeleniumType update input */
export type SeleniumTypeUpdateByFilterInput = {
	value?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** SeleniumType update input */
export type SeleniumTypeUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	target?: Maybe<SeleniumTypeTargetUpdateRelationInput>;
	command?: Maybe<SeleniumTypeCommandUpdateRelationInput>;
	value?: Maybe<Scalars['String']>;
};

export type Setting = {
	__typename?: 'Setting';
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	createdBy?: Maybe<User>;
	passwordMinLength?: Maybe<Scalars['Int']>;
	passwordRequireNumbers?: Maybe<Scalars['Boolean']>;
	passwordRequireSpecial?: Maybe<Scalars['Boolean']>;
	passwordRequireUppercase?: Maybe<Scalars['Boolean']>;
	passwordRequireLowercase?: Maybe<Scalars['Boolean']>;
	passwordUpdateInterval?: Maybe<Scalars['Int']>;
	rememberDevice?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	dateFormat?: Maybe<Scalars['String']>;
	currency?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	menuBarLogo?: Maybe<File>;
	landingPageImage?: Maybe<File>;
	vanityUrl?: Maybe<Scalars['String']>;
	buttonLinkColor?: Maybe<Scalars['String']>;
	userInterfaceStyle?: Maybe<Scalars['String']>;
	menuBarBGColor?: Maybe<Scalars['String']>;
	menuBarIconsColor?: Maybe<Scalars['String']>;
	bgColor?: Maybe<Scalars['String']>;
	containerColor?: Maybe<Scalars['String']>;
	leftNavColor?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

export type Setting_PermissionFilter = {
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	passwordMinLength?: Maybe<IntPredicate>;
	passwordRequireNumbers?: Maybe<BoolPredicate>;
	passwordRequireSpecial?: Maybe<BoolPredicate>;
	passwordRequireUppercase?: Maybe<BoolPredicate>;
	passwordRequireLowercase?: Maybe<BoolPredicate>;
	passwordUpdateInterval?: Maybe<IntPredicate>;
	rememberDevice?: Maybe<StringPredicate>;
	language?: Maybe<StringPredicate>;
	dateFormat?: Maybe<StringPredicate>;
	currency?: Maybe<StringPredicate>;
	timezone?: Maybe<StringPredicate>;
	vanityUrl?: Maybe<StringPredicate>;
	buttonLinkColor?: Maybe<StringPredicate>;
	userInterfaceStyle?: Maybe<StringPredicate>;
	menuBarBGColor?: Maybe<StringPredicate>;
	menuBarIconsColor?: Maybe<StringPredicate>;
	bgColor?: Maybe<StringPredicate>;
	containerColor?: Maybe<StringPredicate>;
	leftNavColor?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	menuBarLogo?: Maybe<File_PermissionFilter>;
	landingPageImage?: Maybe<File_PermissionFilter>;
	AND?: Maybe<Array<Setting_PermissionFilter>>;
	OR?: Maybe<Array<Setting_PermissionFilter>>;
};

export type Setting_PermissionRelationFilter = {
	some?: Maybe<Setting_PermissionFilter>;
	every?: Maybe<Setting_PermissionFilter>;
	none?: Maybe<Setting_PermissionFilter>;
};

export type SettingFilter = {
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	passwordMinLength?: Maybe<IntPredicate>;
	passwordRequireNumbers?: Maybe<BoolPredicate>;
	passwordRequireSpecial?: Maybe<BoolPredicate>;
	passwordRequireUppercase?: Maybe<BoolPredicate>;
	passwordRequireLowercase?: Maybe<BoolPredicate>;
	passwordUpdateInterval?: Maybe<IntPredicate>;
	rememberDevice?: Maybe<StringPredicate>;
	language?: Maybe<StringPredicate>;
	dateFormat?: Maybe<StringPredicate>;
	currency?: Maybe<StringPredicate>;
	timezone?: Maybe<StringPredicate>;
	vanityUrl?: Maybe<StringPredicate>;
	buttonLinkColor?: Maybe<StringPredicate>;
	userInterfaceStyle?: Maybe<StringPredicate>;
	menuBarBGColor?: Maybe<StringPredicate>;
	menuBarIconsColor?: Maybe<StringPredicate>;
	bgColor?: Maybe<StringPredicate>;
	containerColor?: Maybe<StringPredicate>;
	leftNavColor?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	menuBarLogo?: Maybe<FileFilter>;
	landingPageImage?: Maybe<FileFilter>;
	AND?: Maybe<Array<SettingFilter>>;
	OR?: Maybe<Array<SettingFilter>>;
};

export type SettingGroupBy = {
	query: SettingGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SettingGroupByQuery = {
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	passwordMinLength?: Maybe<Array<GroupByField>>;
	passwordRequireNumbers?: Maybe<Array<GroupByField>>;
	passwordRequireSpecial?: Maybe<Array<GroupByField>>;
	passwordRequireUppercase?: Maybe<Array<GroupByField>>;
	passwordRequireLowercase?: Maybe<Array<GroupByField>>;
	passwordUpdateInterval?: Maybe<Array<GroupByField>>;
	rememberDevice?: Maybe<Array<GroupByField>>;
	language?: Maybe<Array<GroupByField>>;
	dateFormat?: Maybe<Array<GroupByField>>;
	currency?: Maybe<Array<GroupByField>>;
	timezone?: Maybe<Array<GroupByField>>;
	vanityUrl?: Maybe<Array<GroupByField>>;
	buttonLinkColor?: Maybe<Array<GroupByField>>;
	userInterfaceStyle?: Maybe<Array<GroupByField>>;
	menuBarBGColor?: Maybe<Array<GroupByField>>;
	menuBarIconsColor?: Maybe<Array<GroupByField>>;
	bgColor?: Maybe<Array<GroupByField>>;
	containerColor?: Maybe<Array<GroupByField>>;
	leftNavColor?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	menuBarLogo?: Maybe<FileGroupByQuery>;
	landingPageImage?: Maybe<FileGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

/** SettingListResponse output */
export type SettingListResponse = {
	__typename?: 'SettingListResponse';
	/** List items */
	items: Array<Setting>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** No longer supported. Use `sort` instead. */
export enum SettingOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	PasswordMinLengthAsc = 'passwordMinLength_ASC',
	PasswordMinLengthDesc = 'passwordMinLength_DESC',
	PasswordRequireNumbersAsc = 'passwordRequireNumbers_ASC',
	PasswordRequireNumbersDesc = 'passwordRequireNumbers_DESC',
	PasswordRequireSpecialAsc = 'passwordRequireSpecial_ASC',
	PasswordRequireSpecialDesc = 'passwordRequireSpecial_DESC',
	PasswordRequireUppercaseAsc = 'passwordRequireUppercase_ASC',
	PasswordRequireUppercaseDesc = 'passwordRequireUppercase_DESC',
	PasswordRequireLowercaseAsc = 'passwordRequireLowercase_ASC',
	PasswordRequireLowercaseDesc = 'passwordRequireLowercase_DESC',
	PasswordUpdateIntervalAsc = 'passwordUpdateInterval_ASC',
	PasswordUpdateIntervalDesc = 'passwordUpdateInterval_DESC',
	RememberDeviceAsc = 'rememberDevice_ASC',
	RememberDeviceDesc = 'rememberDevice_DESC',
	LanguageAsc = 'language_ASC',
	LanguageDesc = 'language_DESC',
	DateFormatAsc = 'dateFormat_ASC',
	DateFormatDesc = 'dateFormat_DESC',
	CurrencyAsc = 'currency_ASC',
	CurrencyDesc = 'currency_DESC',
	TimezoneAsc = 'timezone_ASC',
	TimezoneDesc = 'timezone_DESC',
	VanityUrlAsc = 'vanityUrl_ASC',
	VanityUrlDesc = 'vanityUrl_DESC',
	ButtonLinkColorAsc = 'buttonLinkColor_ASC',
	ButtonLinkColorDesc = 'buttonLinkColor_DESC',
	UserInterfaceStyleAsc = 'userInterfaceStyle_ASC',
	UserInterfaceStyleDesc = 'userInterfaceStyle_DESC',
	MenuBarBgColorAsc = 'menuBarBGColor_ASC',
	MenuBarBgColorDesc = 'menuBarBGColor_DESC',
	MenuBarIconsColorAsc = 'menuBarIconsColor_ASC',
	MenuBarIconsColorDesc = 'menuBarIconsColor_DESC',
	BgColorAsc = 'bgColor_ASC',
	BgColorDesc = 'bgColor_DESC',
	ContainerColorAsc = 'containerColor_ASC',
	ContainerColorDesc = 'containerColor_DESC',
	LeftNavColorAsc = 'leftNavColor_ASC',
	LeftNavColorDesc = 'leftNavColor_DESC',
}

/** Settings subscription payload */
export type SettingPayload = {
	__typename?: 'SettingPayload';
	mutation: MutationType;
	node?: Maybe<Setting>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Setting>;
};

export type SettingRelationFilter = {
	some?: Maybe<SettingFilter>;
	every?: Maybe<SettingFilter>;
	none?: Maybe<SettingFilter>;
};

export type SettingSort = {
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	passwordMinLength?: Maybe<SortOrder>;
	passwordRequireNumbers?: Maybe<SortOrder>;
	passwordRequireSpecial?: Maybe<SortOrder>;
	passwordRequireUppercase?: Maybe<SortOrder>;
	passwordRequireLowercase?: Maybe<SortOrder>;
	passwordUpdateInterval?: Maybe<SortOrder>;
	rememberDevice?: Maybe<SortOrder>;
	language?: Maybe<SortOrder>;
	dateFormat?: Maybe<SortOrder>;
	currency?: Maybe<SortOrder>;
	timezone?: Maybe<SortOrder>;
	vanityUrl?: Maybe<SortOrder>;
	buttonLinkColor?: Maybe<SortOrder>;
	userInterfaceStyle?: Maybe<SortOrder>;
	menuBarBGColor?: Maybe<SortOrder>;
	menuBarIconsColor?: Maybe<SortOrder>;
	bgColor?: Maybe<SortOrder>;
	containerColor?: Maybe<SortOrder>;
	leftNavColor?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	menuBarLogo?: Maybe<FileSort>;
	landingPageImage?: Maybe<FileSort>;
};

/** Settings subscription filter */
export type SettingSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SettingFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Settings update input */
export type SettingUpdateInput = {
	passwordMinLength?: Maybe<Scalars['Int']>;
	passwordRequireNumbers?: Maybe<Scalars['Boolean']>;
	passwordRequireSpecial?: Maybe<Scalars['Boolean']>;
	passwordRequireUppercase?: Maybe<Scalars['Boolean']>;
	passwordRequireLowercase?: Maybe<Scalars['Boolean']>;
	passwordUpdateInterval?: Maybe<Scalars['Int']>;
	rememberDevice?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	dateFormat?: Maybe<Scalars['String']>;
	currency?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	vanityUrl?: Maybe<Scalars['String']>;
	buttonLinkColor?: Maybe<Scalars['String']>;
	userInterfaceStyle?: Maybe<Scalars['String']>;
	menuBarBGColor?: Maybe<Scalars['String']>;
	menuBarIconsColor?: Maybe<Scalars['String']>;
	bgColor?: Maybe<Scalars['String']>;
	containerColor?: Maybe<Scalars['String']>;
	leftNavColor?: Maybe<Scalars['String']>;
};

/** SeleniumCommand create input from setViewportSize */
export type SetViewportSize_SeleniumCommandCreateInput = {
	open?: Maybe<SeleniumCommandOpenRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeRelationInput>;
	click?: Maybe<SeleniumCommandClickRelationInput>;
	type?: Maybe<SeleniumCommandTypeRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropRelationInput>;
	sIndex: Scalars['Int'];
	group?: Maybe<SeleniumCommandGroupRelationInput>;
};

/** SeleniumCommand update input from setViewportSize */
export type SetViewportSize_SeleniumCommandUpdateInput = {
	open?: Maybe<SeleniumCommandOpenUpdateRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeUpdateRelationInput>;
	click?: Maybe<SeleniumCommandClickUpdateRelationInput>;
	type?: Maybe<SeleniumCommandTypeUpdateRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropUpdateRelationInput>;
	sIndex?: Maybe<Scalars['Int']>;
	group?: Maybe<SeleniumCommandGroupUpdateRelationInput>;
};

/** SeleniumPoint create input from setViewportSize */
export type SetViewportSize_SeleniumPointCreateInput = {
	setViewportSize?: Maybe<SeleniumPointSetViewportSizeRelationInput>;
	target?: Maybe<SeleniumPointTargetRelationInput>;
	xCoord: Scalars['Int'];
	yCoord: Scalars['Int'];
};

/** SeleniumPoint update input from setViewportSize */
export type SetViewportSize_SeleniumPointUpdateInput = {
	setViewportSize?: Maybe<SeleniumPointSetViewportSizeUpdateRelationInput>;
	target?: Maybe<SeleniumPointTargetUpdateRelationInput>;
	xCoord?: Maybe<Scalars['Int']>;
	yCoord?: Maybe<Scalars['Int']>;
};

/** SeleniumSetViewportSize create input from setViewportSize */
export type SetViewportSize_SeleniumSetViewportSizeCreateInput = {
	value: SeleniumSetViewportSizeValueRelationInput;
	setViewportSize?: Maybe<SeleniumSetViewportSizeSetViewportSizeRelationInput>;
};

/** SeleniumSetViewportSize update input from setViewportSize */
export type SetViewportSize_SeleniumSetViewportSizeUpdateInput = {
	value?: Maybe<SeleniumSetViewportSizeValueUpdateRelationInput>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeSetViewportSizeUpdateRelationInput>;
};

/** SignUpResendInput */
export type SignUpResendInput = {
	email: Scalars['String'];
};

/** This represents the information needed for slack notifications to be sent to a Slack workspace. */
export type Slack = {
	__typename?: 'Slack';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	syncCheckSum?: Maybe<Scalars['String']>;
	syncNonce?: Maybe<Scalars['String']>;
	slack?: Maybe<IntegrationListResponse>;
	_description?: Maybe<Scalars['String']>;
};

/** This represents the information needed for slack notifications to be sent to a Slack workspace. */
export type SlackSlackArgs = {
	filter?: Maybe<IntegrationFilter>;
	orderBy?: Maybe<Array<Maybe<IntegrationOrderBy>>>;
	sort?: Maybe<Array<IntegrationSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<IntegrationGroupBy>;
};

/** Integration create input from slack */
export type Slack_IntegrationCreateInput = {
	/** Where is your CI pipeline? */
	continuousIntegrationProvider?: Maybe<Scalars['String']>;
	continuousIntegration?: Maybe<IntegrationContinuousIntegrationRelationInput>;
	projectManagementProvider?: Maybe<Scalars['String']>;
	projectManagement?: Maybe<IntegrationProjectManagementRelationInput>;
	slack?: Maybe<IntegrationSlackRelationInput>;
	project?: Maybe<IntegrationProjectRelationInput>;
};

/** Integration update input from slack */
export type Slack_IntegrationUpdateInput = {
	filter?: Maybe<IntegrationKeyFilter>;
	data: IntegrationUpdateInput;
};

export type Slack_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	syncCheckSum?: Maybe<StringPredicate>;
	syncNonce?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	slack?: Maybe<Integration_PermissionRelationFilter>;
	AND?: Maybe<Array<Slack_PermissionFilter>>;
	OR?: Maybe<Array<Slack_PermissionFilter>>;
};

/** Slack create input from slack */
export type Slack_SlackCreateInput = {
	syncCheckSum: Scalars['String'];
	syncNonce: Scalars['String'];
	slack?: Maybe<SlackSlackRelationInput>;
};

/** Slack update input from slack */
export type Slack_SlackUpdateInput = {
	syncCheckSum?: Maybe<Scalars['String']>;
	syncNonce?: Maybe<Scalars['String']>;
	slack?: Maybe<SlackSlackUpdateRelationInput>;
};

/** Slack create input */
export type SlackCreateInput = {
	syncCheckSum: Scalars['String'];
	syncNonce: Scalars['String'];
	slack?: Maybe<SlackSlackRelationInput>;
};

/** Slack create many input */
export type SlackCreateManyInput = {
	syncCheckSum: Scalars['String'];
	syncNonce: Scalars['String'];
	slack?: Maybe<SlackSlackManyRelationInput>;
};

/** Slack delete input */
export type SlackDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** SlackFieldsPermissions create input */
export type SlackFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	syncCheckSum?: Maybe<Scalars['Boolean']>;
	syncNonce?: Maybe<Scalars['Boolean']>;
};

export type SlackFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	syncCheckSum?: Maybe<StringPredicate>;
	syncNonce?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	slack?: Maybe<IntegrationRelationFilter>;
	AND?: Maybe<Array<SlackFilter>>;
	OR?: Maybe<Array<SlackFilter>>;
};

export type SlackGroupBy = {
	query: SlackGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type SlackGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	syncCheckSum?: Maybe<Array<GroupByField>>;
	syncNonce?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	slack?: Maybe<IntegrationGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type SlackKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** SlackListResponse output */
export type SlackListResponse = {
	__typename?: 'SlackListResponse';
	/** List items */
	items: Array<Slack>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** SlackManyResponse output */
export type SlackManyResponse = {
	__typename?: 'SlackManyResponse';
	/** List items */
	items: Array<Slack>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum SlackOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	SyncCheckSumAsc = 'syncCheckSum_ASC',
	SyncCheckSumDesc = 'syncCheckSum_DESC',
	SyncNonceAsc = 'syncNonce_ASC',
	SyncNonceDesc = 'syncNonce_DESC',
}

/** Slack subscription payload */
export type SlackPayload = {
	__typename?: 'SlackPayload';
	mutation: MutationType;
	node?: Maybe<Slack>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Slack>;
};

/** Slack relation input */
export type SlackSlackManyRelationInput = {
	connect?: Maybe<Array<IntegrationKeyFilter>>;
};

/** Slack relation input */
export type SlackSlackRelationInput = {
	connect?: Maybe<Array<IntegrationKeyFilter>>;
	create?: Maybe<Array<Maybe<Slack_IntegrationCreateInput>>>;
};

/** Slack relation input */
export type SlackSlackUpdateRelationInput = {
	connect?: Maybe<Array<IntegrationKeyFilter>>;
	disconnect?: Maybe<Array<IntegrationKeyFilter>>;
	reconnect?: Maybe<Array<IntegrationKeyFilter>>;
	create?: Maybe<Array<Maybe<Slack_IntegrationCreateInput>>>;
	update?: Maybe<Array<Maybe<Slack_IntegrationUpdateInput>>>;
};

export type SlackSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	syncCheckSum?: Maybe<SortOrder>;
	syncNonce?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
};

/** Slack subscription filter */
export type SlackSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<SlackFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Slack update input */
export type SlackUpdateByFilterInput = {
	syncCheckSum?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	syncNonce?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** Slack update input */
export type SlackUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	syncCheckSum?: Maybe<Scalars['String']>;
	syncNonce?: Maybe<Scalars['String']>;
	slack?: Maybe<SlackSlackUpdateRelationInput>;
};

/** Smart Field Attributes */
export type SmartFieldTypeAttributes = {
	__typename?: 'SmartFieldTypeAttributes';
	format: Scalars['String'];
	innerFields?: Maybe<Array<Maybe<CustomTableField>>>;
};

/** Smart Type Format Enum */
export enum SmartTypeFormatEnum {
	Address = 'ADDRESS',
	Phone = 'PHONE',
}

/** SortOrder */
export enum SortOrder {
	Asc = 'ASC',
	Desc = 'DESC',
}

/** SeleniumDragndrop create input from sourceTarget */
export type SourceTarget_SeleniumDragndropCreateInput = {
	sourceTarget?: Maybe<SeleniumDragndropSourceTargetRelationInput>;
	destinationTarget: SeleniumDragndropDestinationTargetRelationInput;
	command?: Maybe<SeleniumDragndropCommandRelationInput>;
};

/** SeleniumDragndrop update input from sourceTarget */
export type SourceTarget_SeleniumDragndropUpdateInput = {
	sourceTarget?: Maybe<SeleniumDragndropSourceTargetUpdateRelationInput>;
	destinationTarget?: Maybe<SeleniumDragndropDestinationTargetUpdateRelationInput>;
	command?: Maybe<SeleniumDragndropCommandUpdateRelationInput>;
};

export type StringPadFunctionArguments = {
	len: Scalars['Int'];
	str: Scalars['String'];
};

export type StringPredicate = {
	equals?: Maybe<Scalars['String']>;
	not_equals?: Maybe<Scalars['String']>;
	in?: Maybe<Array<Scalars['String']>>;
	not_in?: Maybe<Array<Scalars['String']>>;
	contains?: Maybe<Scalars['String']>;
	not_contains?: Maybe<Scalars['String']>;
	starts_with?: Maybe<Scalars['String']>;
	not_starts_with?: Maybe<Scalars['String']>;
	ends_with?: Maybe<Scalars['String']>;
	not_ends_with?: Maybe<Scalars['String']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
};

export type StringPredicateHaving = {
	equals?: Maybe<Scalars['String']>;
	not_equals?: Maybe<Scalars['String']>;
	in?: Maybe<Array<Scalars['String']>>;
	not_in?: Maybe<Array<Scalars['String']>>;
	contains?: Maybe<Scalars['String']>;
	not_contains?: Maybe<Scalars['String']>;
	starts_with?: Maybe<Scalars['String']>;
	not_starts_with?: Maybe<Scalars['String']>;
	ends_with?: Maybe<Scalars['String']>;
	not_ends_with?: Maybe<Scalars['String']>;
	is_empty?: Maybe<Scalars['Boolean']>;
	is_not_empty?: Maybe<Scalars['Boolean']>;
	AND?: Maybe<Array<StringPredicateHaving>>;
	OR?: Maybe<Array<StringPredicateHaving>>;
};

export enum StringTrimMode {
	Both = 'BOTH',
	Leading = 'LEADING',
	Trailing = 'TRAILING',
}

export type Subscription = {
	__typename?: 'Subscription';
	Activity?: Maybe<ActivityPayload>;
	ApiTokens?: Maybe<ApiTokenPayload>;
	AuthenticationProfiles?: Maybe<AuthenticationProfilePayload>;
	AuthenticationSettings?: Maybe<AuthenticationSettingPayload>;
	AuthenticationToken?: Maybe<AuthenticationTokenPayload>;
	CiCdMigrations?: Maybe<CiCdMigrationPayload>;
	Configuration?: Maybe<ConfigurationPayload>;
	Environment?: Maybe<EnvironmentPayload>;
	EnvironmentVariables?: Maybe<EnvironmentVariablePayload>;
	Error?: Maybe<ErrorPayload>;
	Files?: Maybe<FilePayload>;
	Integration?: Maybe<IntegrationPayload>;
	IntegrationDetails?: Maybe<IntegrationDetailPayload>;
	Metrics?: Maybe<MetricPayload>;
	Permissions?: Maybe<PermissionPayload>;
	Project?: Maybe<ProjectPayload>;
	Recording?: Maybe<RecordingPayload>;
	Release?: Maybe<ReleasePayload>;
	Roles?: Maybe<RolePayload>;
	SeleniumClick?: Maybe<SeleniumClickPayload>;
	SeleniumCommand?: Maybe<SeleniumCommandPayload>;
	SeleniumDragndrop?: Maybe<SeleniumDragndropPayload>;
	SeleniumGroup?: Maybe<SeleniumGroupPayload>;
	SeleniumOpen?: Maybe<SeleniumOpenPayload>;
	SeleniumPoint?: Maybe<SeleniumPointPayload>;
	SeleniumScript?: Maybe<SeleniumScriptPayload>;
	SeleniumSelector?: Maybe<SeleniumSelectorPayload>;
	SeleniumSetViewportSize?: Maybe<SeleniumSetViewportSizePayload>;
	SeleniumTarget?: Maybe<SeleniumTargetPayload>;
	SeleniumType?: Maybe<SeleniumTypePayload>;
	Settings?: Maybe<SettingPayload>;
	Slack?: Maybe<SlackPayload>;
	TeamInvitations?: Maybe<TeamInvitationPayload>;
	TeamMembers?: Maybe<TeamMemberPayload>;
	TestOutcome?: Maybe<TestOutcomePayload>;
	TestRun?: Maybe<TestRunPayload>;
	UserStory?: Maybe<UserStoryPayload>;
	Users?: Maybe<UserPayload>;
};

export type SubscriptionActivityArgs = {
	filter?: Maybe<ActivitySubscriptionFilter>;
};

export type SubscriptionApiTokensArgs = {
	filter?: Maybe<ApiTokenSubscriptionFilter>;
};

export type SubscriptionAuthenticationProfilesArgs = {
	filter?: Maybe<AuthenticationProfileSubscriptionFilter>;
};

export type SubscriptionAuthenticationSettingsArgs = {
	filter?: Maybe<AuthenticationSettingSubscriptionFilter>;
};

export type SubscriptionAuthenticationTokenArgs = {
	filter?: Maybe<AuthenticationTokenSubscriptionFilter>;
};

export type SubscriptionCiCdMigrationsArgs = {
	filter?: Maybe<CiCdMigrationSubscriptionFilter>;
};

export type SubscriptionConfigurationArgs = {
	filter?: Maybe<ConfigurationSubscriptionFilter>;
};

export type SubscriptionEnvironmentArgs = {
	filter?: Maybe<EnvironmentSubscriptionFilter>;
};

export type SubscriptionEnvironmentVariablesArgs = {
	filter?: Maybe<EnvironmentVariableSubscriptionFilter>;
};

export type SubscriptionErrorArgs = {
	filter?: Maybe<ErrorSubscriptionFilter>;
};

export type SubscriptionFilesArgs = {
	filter?: Maybe<FileSubscriptionFilter>;
};

export type SubscriptionIntegrationArgs = {
	filter?: Maybe<IntegrationSubscriptionFilter>;
};

export type SubscriptionIntegrationDetailsArgs = {
	filter?: Maybe<IntegrationDetailSubscriptionFilter>;
};

export type SubscriptionMetricsArgs = {
	filter?: Maybe<MetricSubscriptionFilter>;
};

export type SubscriptionPermissionsArgs = {
	filter?: Maybe<PermissionSubscriptionFilter>;
};

export type SubscriptionProjectArgs = {
	filter?: Maybe<ProjectSubscriptionFilter>;
};

export type SubscriptionRecordingArgs = {
	filter?: Maybe<RecordingSubscriptionFilter>;
};

export type SubscriptionReleaseArgs = {
	filter?: Maybe<ReleaseSubscriptionFilter>;
};

export type SubscriptionRolesArgs = {
	filter?: Maybe<RoleSubscriptionFilter>;
};

export type SubscriptionSeleniumClickArgs = {
	filter?: Maybe<SeleniumClickSubscriptionFilter>;
};

export type SubscriptionSeleniumCommandArgs = {
	filter?: Maybe<SeleniumCommandSubscriptionFilter>;
};

export type SubscriptionSeleniumDragndropArgs = {
	filter?: Maybe<SeleniumDragndropSubscriptionFilter>;
};

export type SubscriptionSeleniumGroupArgs = {
	filter?: Maybe<SeleniumGroupSubscriptionFilter>;
};

export type SubscriptionSeleniumOpenArgs = {
	filter?: Maybe<SeleniumOpenSubscriptionFilter>;
};

export type SubscriptionSeleniumPointArgs = {
	filter?: Maybe<SeleniumPointSubscriptionFilter>;
};

export type SubscriptionSeleniumScriptArgs = {
	filter?: Maybe<SeleniumScriptSubscriptionFilter>;
};

export type SubscriptionSeleniumSelectorArgs = {
	filter?: Maybe<SeleniumSelectorSubscriptionFilter>;
};

export type SubscriptionSeleniumSetViewportSizeArgs = {
	filter?: Maybe<SeleniumSetViewportSizeSubscriptionFilter>;
};

export type SubscriptionSeleniumTargetArgs = {
	filter?: Maybe<SeleniumTargetSubscriptionFilter>;
};

export type SubscriptionSeleniumTypeArgs = {
	filter?: Maybe<SeleniumTypeSubscriptionFilter>;
};

export type SubscriptionSettingsArgs = {
	filter?: Maybe<SettingSubscriptionFilter>;
};

export type SubscriptionSlackArgs = {
	filter?: Maybe<SlackSubscriptionFilter>;
};

export type SubscriptionTeamInvitationsArgs = {
	filter?: Maybe<TeamInvitationSubscriptionFilter>;
};

export type SubscriptionTeamMembersArgs = {
	filter?: Maybe<TeamMemberSubscriptionFilter>;
};

export type SubscriptionTestOutcomeArgs = {
	filter?: Maybe<TestOutcomeSubscriptionFilter>;
};

export type SubscriptionTestRunArgs = {
	filter?: Maybe<TestRunSubscriptionFilter>;
};

export type SubscriptionUserStoryArgs = {
	filter?: Maybe<UserStorySubscriptionFilter>;
};

export type SubscriptionUsersArgs = {
	filter?: Maybe<UserSubscriptionFilter>;
};

export type SubstringFunctionArguments = {
	pos: Scalars['Int'];
	len?: Maybe<Scalars['Int']>;
};

export type SuccessResponse = {
	__typename?: 'SuccessResponse';
	success?: Maybe<Scalars['Boolean']>;
};

/** Switch Field Attributes */
export type SwitchFieldTypeAttributes = {
	__typename?: 'SwitchFieldTypeAttributes';
	format: Scalars['String'];
	listOptions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Switch Type Format Enum */
export enum SwitchTypeFormatEnum {
	OnOff = 'ON_OFF',
	YesNo = 'YES_NO',
	TrueFalse = 'TRUE_FALSE',
	ActiveInactive = 'ACTIVE_INACTIVE',
	HighLow = 'HIGH_LOW',
	Custom = 'CUSTOM',
}

/** Application */
export type SystemApplication = {
	__typename?: 'SystemApplication';
	id: Scalars['ID'];
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	createdAt: Scalars['DateTime'];
	appType: Scalars['String'];
	status: SystemApplicationStatusEnum;
};

/** ApplicationDeleteMutationInput */
export type SystemApplicationDeleteMutationInput = {
	id: Scalars['String'];
	force?: Maybe<Scalars['Boolean']>;
};

/** Application install input */
export type SystemApplicationInstallInput = {
	appType: Scalars['String'];
	name: Scalars['String'];
	status?: Maybe<SystemApplicationStatusEnum>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
};

/** SystemApplicationListResponse output */
export type SystemApplicationListResponse = {
	__typename?: 'SystemApplicationListResponse';
	/** List items */
	items: Array<SystemApplication>;
	/** List items count */
	count: Scalars['Int'];
};

/** Application Status Enum */
export enum SystemApplicationStatusEnum {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
}

/** Application update input */
export type SystemApplicationUpdateInput = {
	id: Scalars['String'];
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	status?: Maybe<SystemApplicationStatusEnum>;
};

export type SystemBillingCurrentPlanResponse = {
	__typename?: 'SystemBillingCurrentPlanResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	displayName?: Maybe<Scalars['String']>;
	trialEnd?: Maybe<Scalars['DateTime']>;
	status?: Maybe<SystemWorkspaceStatus>;
	nextPlan?: Maybe<SystemBillingNextPlanResponse>;
};

export type SystemBillingDetailsResponse = {
	__typename?: 'SystemBillingDetailsResponse';
	last4?: Maybe<Scalars['String']>;
	expMonth?: Maybe<Scalars['Int']>;
	expYear?: Maybe<Scalars['Int']>;
	brand?: Maybe<Scalars['String']>;
};

/** BillingDetailsUpdateMutationInput */
export type SystemBillingDetailsUpdateMutationInput = {
	cardToken: Scalars['String'];
};

export type SystemBillingInvoiceItem = {
	__typename?: 'SystemBillingInvoiceItem';
	id: Scalars['ID'];
	periodStart?: Maybe<Scalars['DateTime']>;
	periodEnd?: Maybe<Scalars['DateTime']>;
	paid?: Maybe<Scalars['Boolean']>;
	invoicePdf?: Maybe<Scalars['String']>;
	amountDue?: Maybe<Scalars['Float']>;
	amountPaid?: Maybe<Scalars['Float']>;
	amountRemaining?: Maybe<Scalars['Float']>;
	endingBalance?: Maybe<Scalars['Float']>;
	number?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	total?: Maybe<Scalars['Float']>;
	description?: Maybe<Scalars['String']>;
};

export enum SystemBillingInvoicesListFilterType {
	Workspace = 'WORKSPACE',
	Customer = 'CUSTOMER',
}

/** SystemBillingInvoicesListResponse output */
export type SystemBillingInvoicesListResponse = {
	__typename?: 'SystemBillingInvoicesListResponse';
	/** List items */
	items: Array<SystemBillingInvoiceItem>;
	/** List items count */
	count: Scalars['Int'];
};

export type SystemBillingLimitMetricItem = {
	__typename?: 'SystemBillingLimitMetricItem';
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	showPriority?: Maybe<Scalars['Int']>;
	unit?: Maybe<Scalars['String']>;
};

export type SystemBillingMetricUsageItem = {
	__typename?: 'SystemBillingMetricUsageItem';
	limitMetric?: Maybe<SystemBillingLimitMetricItem>;
	value?: Maybe<Scalars['Float']>;
};

export type SystemBillingMetricUsageQuotaItem = {
	__typename?: 'SystemBillingMetricUsageQuotaItem';
	limitMetric?: Maybe<SystemBillingLimitMetricItem>;
	value?: Maybe<Scalars['Float']>;
};

/** SystemBillingMetricUsageQuotasListResponse output */
export type SystemBillingMetricUsageQuotasListResponse = {
	__typename?: 'SystemBillingMetricUsageQuotasListResponse';
	/** List items */
	items: Array<SystemBillingMetricUsageQuotaItem>;
	/** List items count */
	count: Scalars['Int'];
};

export type SystemBillingMetricUsagesListFilter = {
	entryDate: DateTimePredicate;
};

/** SystemBillingMetricUsagesListResponse output */
export type SystemBillingMetricUsagesListResponse = {
	__typename?: 'SystemBillingMetricUsagesListResponse';
	/** List items */
	items: Array<SystemBillingMetricUsageItem>;
	/** List items count */
	count: Scalars['Int'];
};

export type SystemBillingNextPlanResponse = {
	__typename?: 'SystemBillingNextPlanResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	displayName?: Maybe<Scalars['String']>;
};

export type SystemBillingPlanBaseInfo = {
	__typename?: 'SystemBillingPlanBaseInfo';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	price?: Maybe<Scalars['Int']>;
	isCustom?: Maybe<Scalars['Boolean']>;
	isLegacy?: Maybe<Scalars['Boolean']>;
	limitMetrics?: Maybe<Array<Maybe<SystemBillingPlanLimitMetricItem>>>;
};

export type SystemBillingPlanLimitMetricItem = {
	__typename?: 'SystemBillingPlanLimitMetricItem';
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	overagePrice?: Maybe<Scalars['Int']>;
	softLimit?: Maybe<Scalars['Float']>;
	hardLimit?: Maybe<Scalars['Float']>;
};

/** BillingPlanUpdateMutationInput */
export type SystemBillingPlanUpdateMutationInput = {
	planId: Scalars['ID'];
};

export enum SystemBranchEnvironmentMode {
	Full = 'FULL',
	System = 'SYSTEM',
}

/** Ci Commit Mode */
export enum SystemCiCommitMode {
	Full = 'FULL',
	OnlyMigrations = 'ONLY_MIGRATIONS',
	OnlyProject = 'ONLY_PROJECT',
}

/** Ci Status */
export type SystemCiStatusOutput = {
	__typename?: 'SystemCiStatusOutput';
	status: Scalars['String'];
	migrations?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Computed field mode */
export enum SystemComputedFieldMode {
	Virtual = 'VIRTUAL',
	Stored = 'STORED',
}

/** Custom Table Field Type */
export type SystemCustomTableField = {
	__typename?: 'SystemCustomTableField';
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	fieldType?: Maybe<SystemFieldType>;
	isList: Scalars['Boolean'];
	isRequired: Scalars['Boolean'];
	isUnique?: Maybe<Scalars['Boolean']>;
	defaultValue?: Maybe<Scalars['String']>;
	computedMode?: Maybe<SystemComputedFieldMode>;
	expression?: Maybe<Scalars['String']>;
	fieldTypeAttributes?: Maybe<SystemFieldTypeAttributes>;
};

/** Date Field Attributes */
export type SystemDateFieldTypeAttributes = {
	__typename?: 'SystemDateFieldTypeAttributes';
	format: Scalars['String'];
};

/** Date Type Format Enum */
export enum SystemDateTypeFormatEnum {
	Date = 'DATE',
	Datetime = 'DATETIME',
}

/** DeployDataResponse */
export type SystemDeployDataResponse = {
	__typename?: 'SystemDeployDataResponse';
	uploadBuildUrl: Scalars['String'];
	uploadMetaDataUrl: Scalars['String'];
	buildName: Scalars['String'];
};

/** DeployingBuildInput */
export type SystemDeployingBuildInput = {
	buildName: Scalars['String'];
	options?: Maybe<SystemDeployOptions>;
};

export enum SystemDeployModeEnum {
	Full = 'FULL',
	OnlyPlugins = 'ONLY_PLUGINS',
	OnlyProject = 'ONLY_PROJECT',
	Functions = 'FUNCTIONS',
	Migrations = 'MIGRATIONS',
}

/** DeployOptions */
export type SystemDeployOptions = {
	mode?: Maybe<SystemDeployModeEnum>;
	pluginNames?: Maybe<Array<Maybe<Scalars['String']>>>;
	extensionNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum SystemDeployStatusEnum {
	Deploying = 'deploying',
	CompleteError = 'complete_error',
	CompleteSuccess = 'complete_success',
	Compiling = 'compiling',
	Preparing = 'preparing',
	Initialize = 'initialize',
}

/** SystemDeployStatusResult */
export type SystemDeployStatusResult = {
	__typename?: 'SystemDeployStatusResult';
	status: SystemDeployStatusEnum;
	message?: Maybe<Scalars['String']>;
};

/** SystemEnvironmentBackupListResponse output */
export type SystemEnvironmentBackupListResponse = {
	__typename?: 'SystemEnvironmentBackupListResponse';
	/** List items */
	items: Array<EnvironmentBackupItem>;
	/** List items count */
	count: Scalars['Int'];
};

export type SystemEnvironmentRoleBaseInfo = {
	__typename?: 'SystemEnvironmentRoleBaseInfo';
	id: Scalars['String'];
	name: Scalars['String'];
};

export type SystemEnvironmentRoleList = {
	__typename?: 'SystemEnvironmentRoleList';
	environmentId: Scalars['String'];
	environmentName: Scalars['String'];
	roles?: Maybe<Array<Maybe<SystemEnvironmentRoleBaseInfo>>>;
	exists?: Maybe<Scalars['Boolean']>;
};

export type SystemEnvironmentSettings = {
	__typename?: 'SystemEnvironmentSettings';
	deleteLock?: Maybe<Scalars['Boolean']>;
};

/** SystemEnvironmentsListResponse output */
export type SystemEnvironmentsListResponse = {
	__typename?: 'SystemEnvironmentsListResponse';
	/** List items */
	items: Array<EnvironmentItem>;
	/** List items count */
	count: Scalars['Int'];
};

/** Field Data Features */
export type SystemFieldDataFeatures = {
	__typename?: 'SystemFieldDataFeatures';
	create: Scalars['Boolean'];
	update: Scalars['Boolean'];
	sort: Scalars['Boolean'];
};

/** Field Schema Features */
export type SystemFieldSchemaFeatures = {
	__typename?: 'SystemFieldSchemaFeatures';
	update: Scalars['Boolean'];
	delete: Scalars['Boolean'];
};

/** Field types */
export enum SystemFieldType {
	Id = 'ID',
	Uuid = 'UUID',
	Json = 'JSON',
	Number = 'NUMBER',
	Text = 'TEXT',
	Date = 'DATE',
	Switch = 'SWITCH',
	Relation = 'RELATION',
	File = 'FILE',
	Smart = 'SMART',
	Geo = 'GEO',
	OneWayRelation = 'ONE_WAY_RELATION',
	MissingRelation = 'MISSING_RELATION',
}

/** Field Type Attributes */
export type SystemFieldTypeAttributes =
	| SystemDateFieldTypeAttributes
	| SystemFileFieldTypeAttributes
	| SystemMissingRelationFieldTypeAttributes
	| SystemNumberFieldTypeAttributes
	| SystemSmartFieldTypeAttributes
	| SystemSwitchFieldTypeAttributes
	| SystemTextFieldTypeAttributes
	| SystemUuidFieldTypeAttributes
	| SystemGeoFieldTypeAttributes;

/** Field Type Attributes Input */
export type SystemFieldTypeAttributesInput = {
	format?: Maybe<Scalars['String']>;
	precision?: Maybe<Scalars['Int']>;
	currency?: Maybe<Scalars['String']>;
	minValue?: Maybe<Scalars['Float']>;
	maxValue?: Maybe<Scalars['Float']>;
	isBigInt?: Maybe<Scalars['Boolean']>;
	autoIncrement?: Maybe<Scalars['Boolean']>;
	fieldSize?: Maybe<Scalars['Int']>;
	expiration?: Maybe<Scalars['Int']>;
	listOptions?: Maybe<Array<Scalars['String']>>;
	maxSize?: Maybe<Scalars['Int']>;
	typeRestrictions?: Maybe<Array<Scalars['String']>>;
	srid?: Maybe<Scalars['Int']>;
};

/** File Field Attributes */
export type SystemFileFieldTypeAttributes = {
	__typename?: 'SystemFileFieldTypeAttributes';
	format: Scalars['String'];
	maxSize?: Maybe<Scalars['Int']>;
	/** @deprecated Field is deprecated */
	showTitle?: Maybe<Scalars['Boolean']>;
	/** @deprecated Field is deprecated */
	showUrl?: Maybe<Scalars['Boolean']>;
	typeRestrictions?: Maybe<Array<Scalars['String']>>;
	expiration?: Maybe<Scalars['Int']>;
};

/** File Type Format Enum */
export enum SystemFileTypeFormatEnum {
	File = 'FILE',
	Image = 'IMAGE',
}

/** FunctionInfo */
export type SystemFunctionInfo = {
	name: Scalars['String'];
	functionType: SystemFunctionType;
	description?: Maybe<Scalars['String']>;
	application?: Maybe<SystemApplication>;
};

/** FunctionInfoFilter */
export type SystemFunctionInfoFilter = {
	name?: Maybe<Scalars['String']>;
	functionType?: Maybe<SystemFunctionType>;
	description?: Maybe<Scalars['String']>;
};

/** FunctionInfoOrderBy */
export enum SystemFunctionInfoOrderBy {
	NameAsc = 'name_ASC',
	NameDesc = 'name_DESC',
	FunctionTypeAsc = 'functionType_ASC',
	FunctionTypeDesc = 'functionType_DESC',
	DescriptionAsc = 'description_ASC',
	DescriptionDesc = 'description_DESC',
}

/** SystemFunctionListResponse output */
export type SystemFunctionListResponse = {
	__typename?: 'SystemFunctionListResponse';
	/** List items */
	items: Array<SystemFunctionInfo>;
	/** List items count */
	count: Scalars['Int'];
};

/** FunctionLogEntry */
export type SystemFunctionLogEntry = {
	__typename?: 'SystemFunctionLogEntry';
	timestamp?: Maybe<Scalars['DateTime']>;
	message?: Maybe<Scalars['String']>;
};

/** FunctionResolverInfo */
export type SystemFunctionResolverInfo = SystemFunctionInfo & {
	__typename?: 'SystemFunctionResolverInfo';
	name: Scalars['String'];
	functionType: SystemFunctionType;
	description?: Maybe<Scalars['String']>;
	gqlType: Scalars['String'];
	application?: Maybe<SystemApplication>;
};

/** FunctionTaskInfo */
export type SystemFunctionTaskInfo = SystemFunctionInfo & {
	__typename?: 'SystemFunctionTaskInfo';
	name: Scalars['String'];
	functionType: SystemFunctionType;
	description?: Maybe<Scalars['String']>;
	scheduleExpression?: Maybe<Scalars['String']>;
	application?: Maybe<SystemApplication>;
};

/** FunctionTriggerInfo */
export type SystemFunctionTriggerInfo = SystemFunctionInfo & {
	__typename?: 'SystemFunctionTriggerInfo';
	name: Scalars['String'];
	functionType: SystemFunctionType;
	description?: Maybe<Scalars['String']>;
	operation: Scalars['String'];
	tableName: Scalars['String'];
	type: Scalars['String'];
	application?: Maybe<SystemApplication>;
};

/** FunctionType */
export enum SystemFunctionType {
	Resolver = 'resolver',
	Trigger = 'trigger',
	Webhook = 'webhook',
	Task = 'task',
	Schedule = 'schedule',
}

/** FunctionWebhookInfo */
export type SystemFunctionWebhookInfo = SystemFunctionInfo & {
	__typename?: 'SystemFunctionWebhookInfo';
	name: Scalars['String'];
	functionType: SystemFunctionType;
	description?: Maybe<Scalars['String']>;
	httpMethod: Scalars['String'];
	workspaceRelativePath: Scalars['String'];
	workspaceFullPath: Scalars['String'];
	application?: Maybe<SystemApplication>;
};

/** Diff Environment Input */
export type SystemGenerateEnvironmentOutput = {
	__typename?: 'SystemGenerateEnvironmentOutput';
	url?: Maybe<Scalars['String']>;
};

/** Geo Field Attributes */
export type SystemGeoFieldTypeAttributes = {
	__typename?: 'SystemGeoFieldTypeAttributes';
	format: Scalars['String'];
	srid?: Maybe<Scalars['Int']>;
};

/** Table Create Index Input */
export type SystemIndexCreateInput = {
	tableId: Scalars['ID'];
	type: TableIndexType;
	columns: Array<SystemTableIndexColumnInput>;
	force?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['String']>;
};

/** Table Delete Index Input */
export type SystemIndexDeleteInput = {
	id: Scalars['ID'];
};

/** Table Update Index Input */
export type SystemIndexUpdateInput = {
	id: Scalars['ID'];
	type?: Maybe<TableIndexType>;
	columns?: Maybe<Array<SystemTableIndexColumnInput>>;
	force?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['String']>;
};

/** InvokeData */
export type SystemInvokeData = {
	functionName: Scalars['String'];
	inputArgs?: Maybe<Scalars['String']>;
};

/** InvokeFunctionResponse */
export type SystemInvokeFunctionResponse = {
	__typename?: 'SystemInvokeFunctionResponse';
	responseData: Scalars['String'];
};

/** MissingRelation Field Attributes */
export type SystemMissingRelationFieldTypeAttributes = {
	__typename?: 'SystemMissingRelationFieldTypeAttributes';
	missingTable: Scalars['String'];
};

export type SystemMutation = {
	__typename?: 'SystemMutation';
	applicationDelete?: Maybe<SuccessResponse>;
	applicationInstall?: Maybe<SystemApplication>;
	applicationUpdate?: Maybe<SystemApplication>;
	billingDetailsUpdate?: Maybe<SystemBillingDetailsResponse>;
	billingPlanUpdate?: Maybe<SystemBillingCurrentPlanResponse>;
	ciCommit?: Maybe<AsyncSession>;
	ciInstall?: Maybe<SuccessResponse>;
	deploy?: Maybe<Scalars['Boolean']>;
	environmentBackup?: Maybe<AsyncSession>;
	environmentBranch?: Maybe<AsyncSession>;
	environmentDelete?: Maybe<SuccessResponse>;
	environmentDeleteAsync?: Maybe<AsyncSession>;
	environmentRestore?: Maybe<AsyncSession>;
	environmentSetup?: Maybe<SuccessResponse>;
	fieldCreate: SystemTableField;
	fieldDelete: SuccessResponse;
	fieldUpdate: SystemTableField;
	fieldUpdatePosition: SuccessResponse;
	indexCreate: SystemTableIndex;
	indexDelete?: Maybe<SuccessResponse>;
	indexUpdate: SystemTableIndex;
	invoke?: Maybe<SystemInvokeFunctionResponse>;
	organizationInviteUser?: Maybe<OrganizationUserInvitationResponse>;
	organizationInviteUserAccept?: Maybe<SuccessResponse>;
	organizationInviteUserCancel?: Maybe<SuccessResponse>;
	organizationUpdate?: Maybe<SystemOrganizationItem>;
	organizationUserRemove?: Maybe<SuccessResponse>;
	organizationWorkspaceAdd?: Maybe<SuccessResponse>;
	organizationWorkspaceAddAccept?: Maybe<SuccessResponse>;
	organizationWorkspaceAddCancel?: Maybe<SuccessResponse>;
	organizationWorkspaceRemove?: Maybe<SuccessResponse>;
	organizationWorkspaceUserRemove?: Maybe<SuccessResponse>;
	organizationWorkspaceUserShare?: Maybe<SuccessResponse>;
	prepareDeploy: SystemDeployDataResponse;
	tableCreate: SystemTable;
	tableDelete: SuccessResponse;
	tableUpdate: SystemTable;
	viewCreate: SystemTable;
	viewUpdate: SystemTable;
	workspaceCreate?: Maybe<SystemWorkspaceCreateResponse>;
	workspaceCreateAsync?: Maybe<SystemWorkspaceCreateResponse>;
	workspaceDelete?: Maybe<SuccessResponse>;
	workspaceLeave?: Maybe<SuccessResponse>;
	workspaceTransferAccept?: Maybe<SuccessResponse>;
	workspaceTransferCancel?: Maybe<SuccessResponse>;
	workspaceTransferRegister?: Maybe<SuccessResponse>;
	workspaceUpdate?: Maybe<SystemWorkspaceUpdateResponse>;
};

export type SystemMutationApplicationDeleteArgs = {
	data: SystemApplicationDeleteMutationInput;
};

export type SystemMutationApplicationInstallArgs = {
	data: SystemApplicationInstallInput;
};

export type SystemMutationApplicationUpdateArgs = {
	data: SystemApplicationUpdateInput;
};

export type SystemMutationBillingDetailsUpdateArgs = {
	data: SystemBillingDetailsUpdateMutationInput;
};

export type SystemMutationBillingPlanUpdateArgs = {
	data: SystemBillingPlanUpdateMutationInput;
};

export type SystemMutationCiCommitArgs = {
	mode?: Maybe<SystemCiCommitMode>;
	build?: Maybe<Scalars['String']>;
};

export type SystemMutationDeployArgs = {
	data?: Maybe<SystemDeployingBuildInput>;
};

export type SystemMutationEnvironmentBackupArgs = {
	environmentName: Scalars['String'];
};

export type SystemMutationEnvironmentBranchArgs = {
	name: Scalars['String'];
	mode?: Maybe<SystemBranchEnvironmentMode>;
};

export type SystemMutationEnvironmentDeleteArgs = {
	environmentName: Scalars['String'];
};

export type SystemMutationEnvironmentDeleteAsyncArgs = {
	environmentName: Scalars['String'];
};

export type SystemMutationEnvironmentRestoreArgs = {
	environmentName: Scalars['String'];
	backup: Scalars['String'];
};

export type SystemMutationEnvironmentSetupArgs = {
	data?: Maybe<EnvironmentSetupInput>;
};

export type SystemMutationFieldCreateArgs = {
	data: SystemTableFieldCreateInput;
};

export type SystemMutationFieldDeleteArgs = {
	data: SystemTableFieldDeleteInput;
};

export type SystemMutationFieldUpdateArgs = {
	data: SystemTableFieldUpdateInput;
};

export type SystemMutationFieldUpdatePositionArgs = {
	data: SystemTableFieldPositionUpdateInput;
};

export type SystemMutationIndexCreateArgs = {
	data: SystemIndexCreateInput;
};

export type SystemMutationIndexDeleteArgs = {
	data: SystemIndexDeleteInput;
};

export type SystemMutationIndexUpdateArgs = {
	data: SystemIndexUpdateInput;
};

export type SystemMutationInvokeArgs = {
	data?: Maybe<SystemInvokeData>;
};

export type SystemMutationOrganizationInviteUserArgs = {
	organizationId: Scalars['String'];
	email: Scalars['String'];
	role: Scalars['String'];
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
};

export type SystemMutationOrganizationInviteUserAcceptArgs = {
	invitationId: Scalars['String'];
};

export type SystemMutationOrganizationInviteUserCancelArgs = {
	invitationId: Scalars['String'];
};

export type SystemMutationOrganizationUpdateArgs = {
	id: Scalars['String'];
	name?: Maybe<Scalars['String']>;
	type?: Maybe<SystemOrganizationTypeEnum>;
	description?: Maybe<Scalars['String']>;
	image?: Maybe<GraphQlCreateFileItemInput>;
};

export type SystemMutationOrganizationUserRemoveArgs = {
	organizationId: Scalars['String'];
	email: Scalars['String'];
};

export type SystemMutationOrganizationWorkspaceAddArgs = {
	organizationId: Scalars['String'];
	workspaceId: Scalars['String'];
};

export type SystemMutationOrganizationWorkspaceAddAcceptArgs = {
	sessionId: Scalars['String'];
};

export type SystemMutationOrganizationWorkspaceAddCancelArgs = {
	sessionId: Scalars['String'];
};

export type SystemMutationOrganizationWorkspaceRemoveArgs = {
	organizationId: Scalars['String'];
	workspaceId: Scalars['String'];
};

export type SystemMutationOrganizationWorkspaceUserRemoveArgs = {
	organizationId: Scalars['String'];
	workspaceId: Scalars['String'];
	email: Scalars['String'];
};

export type SystemMutationOrganizationWorkspaceUserShareArgs = {
	environments?: Maybe<Array<Maybe<SystemOrganizationWorkspaceUserShareInfo>>>;
	email: Scalars['String'];
};

export type SystemMutationTableCreateArgs = {
	data: SystemTableCreateInput;
};

export type SystemMutationTableDeleteArgs = {
	data: SystemTableDeleteInput;
};

export type SystemMutationTableUpdateArgs = {
	data: SystemTableUpdateInput;
};

export type SystemMutationViewCreateArgs = {
	data: SystemViewCreateInput;
};

export type SystemMutationViewUpdateArgs = {
	data: SystemViewUpdateInput;
};

export type SystemMutationWorkspaceCreateArgs = {
	data: SystemWorkspaceCreateMutationInput;
};

export type SystemMutationWorkspaceCreateAsyncArgs = {
	data: SystemWorkspaceCreateMutationInput;
};

export type SystemMutationWorkspaceDeleteArgs = {
	data: SystemWorkspaceDeleteMutationInput;
};

export type SystemMutationWorkspaceLeaveArgs = {
	force?: Maybe<Scalars['Boolean']>;
};

export type SystemMutationWorkspaceTransferAcceptArgs = {
	workspaceId: Scalars['String'];
};

export type SystemMutationWorkspaceTransferCancelArgs = {
	workspaceId: Scalars['String'];
};

export type SystemMutationWorkspaceTransferRegisterArgs = {
	owner: Scalars['String'];
	workspaceId: Scalars['String'];
};

export type SystemMutationWorkspaceUpdateArgs = {
	data: SystemWorkspaceUpdateMutationInput;
};

/** Number Field Attributes */
export type SystemNumberFieldTypeAttributes = {
	__typename?: 'SystemNumberFieldTypeAttributes';
	format: Scalars['String'];
	precision?: Maybe<Scalars['Int']>;
	currency?: Maybe<Scalars['String']>;
	minValue?: Maybe<Scalars['Float']>;
	maxValue?: Maybe<Scalars['Float']>;
	isBigInt?: Maybe<Scalars['Boolean']>;
	autoIncrement?: Maybe<Scalars['Boolean']>;
};

/** Number Type Format Enum */
export enum SystemNumberTypeFormatEnum {
	Number = 'NUMBER',
	Currency = 'CURRENCY',
	Percentage = 'PERCENTAGE',
	Fraction = 'FRACTION',
	Scientific = 'SCIENTIFIC',
}

export type SystemOrganizationBaseItem = {
	__typename?: 'SystemOrganizationBaseItem';
	id: Scalars['ID'];
	name: Scalars['String'];
	type?: Maybe<SystemOrganizationTypeEnum>;
	description?: Maybe<Scalars['String']>;
};

export type SystemOrganizationInvitation = {
	__typename?: 'SystemOrganizationInvitation';
	id: Scalars['ID'];
	email: Scalars['String'];
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	emailFrom: Scalars['String'];
	firstNameFrom?: Maybe<Scalars['String']>;
	lastNameFrom?: Maybe<Scalars['String']>;
	role: Scalars['String'];
	accepted?: Maybe<Scalars['Boolean']>;
	organization: SystemOrganizationBaseItem;
};

export type SystemOrganizationItem = {
	__typename?: 'SystemOrganizationItem';
	id: Scalars['ID'];
	name: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	type?: Maybe<SystemOrganizationTypeEnum>;
	users?: Maybe<Array<Maybe<SystemOrganizationUserInfo>>>;
	image?: Maybe<SystemOrganizationItemImage>;
};

export type SystemOrganizationItemImage = {
	__typename?: 'SystemOrganizationItemImage';
	id?: Maybe<Scalars['String']>;
	downloadUrl?: Maybe<Scalars['String']>;
};

/** SystemOrganizationsListAllResponse output */
export type SystemOrganizationsListAllResponse = {
	__typename?: 'SystemOrganizationsListAllResponse';
	/** List items */
	items: Array<SystemOrganizationItem>;
	/** List items count */
	count: Scalars['Int'];
};

/** SystemOrganizationsListResponse output */
export type SystemOrganizationsListResponse = {
	__typename?: 'SystemOrganizationsListResponse';
	/** List items */
	items: Array<SystemOrganizationItem>;
	/** List items count */
	count: Scalars['Int'];
};

export enum SystemOrganizationTypeEnum {
	Agency = 'agency',
	Company = 'company',
	Community = 'community',
}

export type SystemOrganizationUserBaseInfo = {
	__typename?: 'SystemOrganizationUserBaseInfo';
	id: Scalars['String'];
	email: Scalars['String'];
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	role: Scalars['String'];
	status: Scalars['String'];
};

export type SystemOrganizationUserInfo = {
	__typename?: 'SystemOrganizationUserInfo';
	id: Scalars['String'];
	email: Scalars['String'];
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	role: Scalars['String'];
	status: Scalars['String'];
	avatar?: Maybe<GraphQlFileItemResponse>;
	workspaces?: Maybe<Array<Maybe<SystemOrganizationWorkspaceItem>>>;
};

export type SystemOrganizationWorkspaceAddSession = {
	__typename?: 'SystemOrganizationWorkspaceAddSession';
	user?: Maybe<SystemOrganizationUserBaseInfo>;
	workspace: SystemOrganizationWorkspaceItem;
	organization: SystemOrganizationBaseItem;
	status?: Maybe<Scalars['String']>;
};

export type SystemOrganizationWorkspaceItem = {
	__typename?: 'SystemOrganizationWorkspaceItem';
	id: Scalars['ID'];
	name: Scalars['String'];
	organization?: Maybe<SystemOrganizationBaseItem>;
};

export type SystemOrganizationWorkspaceUserShareInfo = {
	environmentId: Scalars['String'];
	roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Diff Environment Input */
export type SystemPlanEnvironmentOutput = {
	__typename?: 'SystemPlanEnvironmentOutput';
	url?: Maybe<Scalars['String']>;
};

export type SystemQuery = {
	__typename?: 'SystemQuery';
	application?: Maybe<SystemApplication>;
	applicationsList?: Maybe<SystemApplicationListResponse>;
	billingCurrentPlan?: Maybe<SystemBillingCurrentPlanResponse>;
	billingDetails?: Maybe<SystemBillingDetailsResponse>;
	billingInvoicesList: SystemBillingInvoicesListResponse;
	billingMetricUsageQuotasList: SystemBillingMetricUsageQuotasListResponse;
	billingMetricUsagesList: SystemBillingMetricUsagesListResponse;
	ciGenerate?: Maybe<SystemGenerateEnvironmentOutput>;
	/** @deprecated No longer supported. Use `ciGenerate` instead. */
	ciPlan?: Maybe<SystemPlanEnvironmentOutput>;
	ciStatus?: Maybe<SystemCiStatusOutput>;
	deployStatus: SystemDeployStatusResult;
	environmentBackupsList?: Maybe<SystemEnvironmentBackupListResponse>;
	environmentSettings?: Maybe<SystemEnvironmentSettings>;
	environmentsList?: Maybe<SystemEnvironmentsListResponse>;
	functionsList?: Maybe<SystemFunctionListResponse>;
	getEnvironmentRoles?: Maybe<Array<Maybe<SystemEnvironmentRoleList>>>;
	getWorkspaceTransferInfo?: Maybe<WorkspaceTransferItem>;
	introspection?: Maybe<IntrospectionQueryResponse>;
	/** @deprecated No longer supported. Use `system.logsList` instead. */
	logs?: Maybe<Array<Maybe<Scalars['String']>>>;
	logsList?: Maybe<Array<Maybe<SystemFunctionLogEntry>>>;
	organizationById?: Maybe<SystemOrganizationItem>;
	organizationInvitationById?: Maybe<SystemOrganizationInvitation>;
	organizationWorkspaceAddSession?: Maybe<SystemOrganizationWorkspaceAddSession>;
	organizationsListAll?: Maybe<SystemOrganizationsListAllResponse>;
	organizationsListByUser?: Maybe<SystemOrganizationsListResponse>;
	table?: Maybe<SystemTable>;
	tableField?: Maybe<SystemTableField>;
	tablesList: SystemTableListResponse;
	userBillingConfiguration: SystemUserBillingConfigurationResponse;
	workspacesFrontendList?: Maybe<SystemWorkspaceListResponse>;
	workspacesList?: Maybe<SystemWorkspaceListResponse>;
};

export type SystemQueryApplicationArgs = {
	id: Scalars['String'];
};

export type SystemQueryBillingInvoicesListArgs = {
	by?: Maybe<SystemBillingInvoicesListFilterType>;
	limit?: Maybe<Scalars['Int']>;
	before?: Maybe<Scalars['ID']>;
	after?: Maybe<Scalars['ID']>;
};

export type SystemQueryBillingMetricUsagesListArgs = {
	filter?: Maybe<SystemBillingMetricUsagesListFilter>;
};

export type SystemQueryCiGenerateArgs = {
	tables?: Maybe<Array<Scalars['String']>>;
	sourceEnvironmentId?: Maybe<Scalars['String']>;
	targetEnvironmentId?: Maybe<Scalars['String']>;
};

export type SystemQueryCiPlanArgs = {
	tables?: Maybe<Array<Scalars['String']>>;
	sourceEnvironmentId?: Maybe<Scalars['String']>;
	targetEnvironmentId?: Maybe<Scalars['String']>;
};

export type SystemQueryDeployStatusArgs = {
	buildName: Scalars['String'];
};

export type SystemQueryEnvironmentBackupsListArgs = {
	environmentName?: Maybe<Scalars['String']>;
};

export type SystemQueryFunctionsListArgs = {
	applicationId?: Maybe<Scalars['String']>;
	filter?: Maybe<SystemFunctionInfoFilter>;
	orderBy?: Maybe<Array<Maybe<SystemFunctionInfoOrderBy>>>;
};

export type SystemQueryGetEnvironmentRolesArgs = {
	workspaceId: Scalars['String'];
	email?: Maybe<Scalars['String']>;
};

export type SystemQueryGetWorkspaceTransferInfoArgs = {
	workspaceId: Scalars['String'];
};

export type SystemQueryLogsArgs = {
	functionName: Scalars['String'];
	applicationId?: Maybe<Scalars['String']>;
	limit?: Maybe<Scalars['Int']>;
	startTime?: Maybe<Scalars['DateTime']>;
	endTime?: Maybe<Scalars['DateTime']>;
};

export type SystemQueryLogsListArgs = {
	functionName: Scalars['String'];
	applicationId?: Maybe<Scalars['String']>;
	limit?: Maybe<Scalars['Int']>;
	startTime?: Maybe<Scalars['DateTime']>;
	endTime?: Maybe<Scalars['DateTime']>;
};

export type SystemQueryOrganizationByIdArgs = {
	organizationId: Scalars['String'];
};

export type SystemQueryOrganizationInvitationByIdArgs = {
	invitationId: Scalars['String'];
};

export type SystemQueryOrganizationWorkspaceAddSessionArgs = {
	sessionId: Scalars['String'];
};

export type SystemQueryTableArgs = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
};

export type SystemQueryTableFieldArgs = {
	id: Scalars['ID'];
};

export type SystemQueryTablesListArgs = {
	filter?: Maybe<SystemTableListFilter>;
};

/** Relation */
export type SystemRelation = {
	__typename?: 'SystemRelation';
	refTable: SystemTable;
	refField?: Maybe<SystemTableField>;
	relationTableName?: Maybe<Scalars['String']>;
	relationFieldName?: Maybe<Scalars['String']>;
	refFieldName?: Maybe<Scalars['String']>;
	refFieldDisplayName?: Maybe<Scalars['String']>;
	refFieldIsList?: Maybe<Scalars['Boolean']>;
	refFieldIsRequired?: Maybe<Scalars['Boolean']>;
};

/** Relation Create Input */
export type SystemRelationCreateInput = {
	refTableId: Scalars['ID'];
	refFieldName?: Maybe<Scalars['String']>;
	refFieldDisplayName?: Maybe<Scalars['String']>;
	refFieldIsList: Scalars['Boolean'];
	refFieldIsRequired: Scalars['Boolean'];
};

/** Relation Update Input */
export type SystemRelationUpdateInput = {
	refTableId?: Maybe<Scalars['ID']>;
	refFieldName?: Maybe<Scalars['String']>;
	refFieldDisplayName?: Maybe<Scalars['String']>;
	refFieldIsList?: Maybe<Scalars['Boolean']>;
	refFieldIsRequired?: Maybe<Scalars['Boolean']>;
};

/** Schema Origin */
export type SystemSchemaOrigin = {
	__typename?: 'SystemSchemaOrigin';
	type: SystemSchemaOriginType;
	provider?: Maybe<Scalars['String']>;
};

/** Schema Origin Type Enum */
export enum SystemSchemaOriginType {
	Remote = 'REMOTE',
	Local = 'LOCAL',
	View = 'VIEW',
}

/** Smart Field Attributes */
export type SystemSmartFieldTypeAttributes = {
	__typename?: 'SystemSmartFieldTypeAttributes';
	format: Scalars['String'];
	innerFields?: Maybe<Array<Maybe<SystemCustomTableField>>>;
};

/** Smart Type Format Enum */
export enum SystemSmartTypeFormatEnum {
	Address = 'ADDRESS',
	Phone = 'PHONE',
}

/** Switch Field Attributes */
export type SystemSwitchFieldTypeAttributes = {
	__typename?: 'SystemSwitchFieldTypeAttributes';
	format: Scalars['String'];
	listOptions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Switch Type Format Enum */
export enum SystemSwitchTypeFormatEnum {
	OnOff = 'ON_OFF',
	YesNo = 'YES_NO',
	TrueFalse = 'TRUE_FALSE',
	ActiveInactive = 'ACTIVE_INACTIVE',
	HighLow = 'HIGH_LOW',
	Custom = 'CUSTOM',
}

/** Table */
export type SystemTable = {
	__typename?: 'SystemTable';
	id: Scalars['ID'];
	application?: Maybe<SystemApplication>;
	isSystem: Scalars['Boolean'];
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	fields?: Maybe<Array<SystemTableField>>;
	indexes?: Maybe<Array<SystemTableIndex>>;
	origin: SystemSchemaOrigin;
	schemaFeatures: SystemTableSchemaFeatures;
	dataFeatures: SystemTableDataFeatures;
	attributes?: Maybe<SystemTableAttributes>;
	description?: Maybe<Scalars['String']>;
};

/** Table Attributes */
export type SystemTableAttributes = SystemViewAttributes;

/** Table Create Input */
export type SystemTableCreateInput = {
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	applicationId?: Maybe<Scalars['String']>;
};

/** Table Data Features */
export type SystemTableDataFeatures = {
	__typename?: 'SystemTableDataFeatures';
	create: Scalars['Boolean'];
	update: Scalars['Boolean'];
	delete: Scalars['Boolean'];
};

/** Table Delete Input */
export type SystemTableDeleteInput = {
	id: Scalars['ID'];
};

/** TableField */
export type SystemTableField = {
	__typename?: 'SystemTableField';
	id: Scalars['ID'];
	table: SystemTable;
	isSystem: Scalars['Boolean'];
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	fieldType: SystemFieldType;
	origin: SystemSchemaOrigin;
	schemaFeatures: SystemFieldSchemaFeatures;
	dataFeatures: SystemFieldDataFeatures;
	isMeta: Scalars['Boolean'];
	isList: Scalars['Boolean'];
	isRequired: Scalars['Boolean'];
	isUnique?: Maybe<Scalars['Boolean']>;
	defaultValue?: Maybe<Scalars['String']>;
	computedMode?: Maybe<SystemComputedFieldMode>;
	expression?: Maybe<Scalars['String']>;
	fieldTypeAttributes?: Maybe<SystemFieldTypeAttributes>;
	relation?: Maybe<SystemRelation>;
};

/** Table Field Create Input */
export type SystemTableFieldCreateInput = {
	tableId: Scalars['ID'];
	force?: Maybe<Scalars['Boolean']>;
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	fieldType: SystemFieldType;
	isList: Scalars['Boolean'];
	isRequired: Scalars['Boolean'];
	isUnique?: Maybe<Scalars['Boolean']>;
	defaultValue?: Maybe<Scalars['String']>;
	initialValue?: Maybe<Scalars['String']>;
	computedMode?: Maybe<SystemComputedFieldMode>;
	expression?: Maybe<Scalars['String']>;
	position?: Maybe<Scalars['Int']>;
	fieldTypeAttributes?: Maybe<SystemFieldTypeAttributesInput>;
	relation?: Maybe<SystemRelationCreateInput>;
};

/** Table Field Delete Input */
export type SystemTableFieldDeleteInput = {
	id: Scalars['ID'];
};

/** Table Field Position Update Input */
export type SystemTableFieldPositionUpdateInput = {
	id: Scalars['ID'];
	newPosition: Scalars['Int'];
};

/** Table Field Update Input */
export type SystemTableFieldUpdateInput = {
	id: Scalars['ID'];
	force?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	fieldType?: Maybe<SystemFieldType>;
	isList?: Maybe<Scalars['Boolean']>;
	isRequired?: Maybe<Scalars['Boolean']>;
	isUnique?: Maybe<Scalars['Boolean']>;
	defaultValue?: Maybe<Scalars['String']>;
	initialValue?: Maybe<Scalars['String']>;
	computedMode?: Maybe<SystemComputedFieldMode>;
	expression?: Maybe<Scalars['String']>;
	position?: Maybe<Scalars['Int']>;
	fieldTypeAttributes?: Maybe<SystemFieldTypeAttributesInput>;
	relation?: Maybe<SystemRelationUpdateInput>;
};

/** Table Index */
export type SystemTableIndex = {
	__typename?: 'SystemTableIndex';
	id: Scalars['ID'];
	table: SystemTable;
	type: Scalars['String'];
	columns?: Maybe<Array<SystemTableIndexColumn>>;
	name?: Maybe<Scalars['String']>;
	isSystem: Scalars['Boolean'];
};

/** Table Index Column */
export type SystemTableIndexColumn = {
	__typename?: 'SystemTableIndexColumn';
	name: Scalars['String'];
};

/** Table Index Column Input */
export type SystemTableIndexColumnInput = {
	name: Scalars['String'];
};

/** Table List Application Filter */
export type SystemTableListApplicationFilter = {
	id?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
};

/** Table List Filter */
export type SystemTableListFilter = {
	applications?: Maybe<Array<Maybe<SystemTableListApplicationFilter>>>;
	onlyUserTables?: Maybe<Scalars['Boolean']>;
	tableNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Table List Response */
export type SystemTableListResponse = {
	__typename?: 'SystemTableListResponse';
	items?: Maybe<Array<Maybe<SystemTable>>>;
	count?: Maybe<Scalars['Int']>;
};

/** Table Schema Create Features */
export type SystemTableSchemaCreateFeatures = {
	__typename?: 'SystemTableSchemaCreateFeatures';
	ID: Scalars['Boolean'];
	UUID: Scalars['Boolean'];
	JSON: Scalars['Boolean'];
	NUMBER: Scalars['Boolean'];
	TEXT: Scalars['Boolean'];
	DATE: Scalars['Boolean'];
	SWITCH: Scalars['Boolean'];
	RELATION: Scalars['Boolean'];
	FILE: Scalars['Boolean'];
	SMART: Scalars['Boolean'];
	GEO: Scalars['Boolean'];
	ONE_WAY_RELATION: Scalars['Boolean'];
	MISSING_RELATION: Scalars['Boolean'];
};

/** Table Schema Features */
export type SystemTableSchemaFeatures = {
	__typename?: 'SystemTableSchemaFeatures';
	create: SystemTableSchemaCreateFeatures;
	update?: Maybe<SystemTableSchemaMetaFieldFeatures>;
	computedFields: Scalars['Boolean'];
};

/** Table Schema Meta Field Features */
export type SystemTableSchemaMetaFieldFeatures = {
	__typename?: 'SystemTableSchemaMetaFieldFeatures';
	name: Scalars['Boolean'];
	displayName: Scalars['Boolean'];
};

/** Table Update Input */
export type SystemTableUpdateInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
};

/** Text Field Attributes */
export type SystemTextFieldTypeAttributes = {
	__typename?: 'SystemTextFieldTypeAttributes';
	format: Scalars['String'];
	fieldSize?: Maybe<Scalars['Int']>;
};

/** Text Type Format Enum */
export enum SystemTextTypeFormatEnum {
	Unformatted = 'UNFORMATTED',
	Name = 'NAME',
	Ein = 'EIN',
	Email = 'EMAIL',
	Markdown = 'MARKDOWN',
	Html = 'HTML',
}

export type SystemUserAccountInfo = {
	__typename?: 'SystemUserAccountInfo';
	email: Scalars['String'];
	createdAt?: Maybe<Scalars['DateTime']>;
	avatar?: Maybe<GraphQlFileItemResponse>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	learningMode?: Maybe<Scalars['Boolean']>;
	permissions?: Maybe<Scalars['String']>;
	role?: Maybe<Scalars['String']>;
	isDeveloper?: Maybe<Scalars['Boolean']>;
	aboutMe?: Maybe<Scalars['String']>;
	country?: Maybe<Scalars['String']>;
	city?: Maybe<Scalars['String']>;
	state?: Maybe<Scalars['String']>;
	website?: Maybe<Scalars['String']>;
	zipCode?: Maybe<Scalars['String']>;
	githubUsername?: Maybe<Scalars['String']>;
	linkedInUsername?: Maybe<Scalars['String']>;
	twitterUsername?: Maybe<Scalars['String']>;
	addressLine1?: Maybe<Scalars['String']>;
	addressLine2?: Maybe<Scalars['String']>;
	type?: Maybe<SystemUserType>;
	companyName?: Maybe<Scalars['String']>;
	projectDescription?: Maybe<Scalars['String']>;
};

export type SystemUserBillingConfigurationResponse = {
	__typename?: 'SystemUserBillingConfigurationResponse';
	isFreePlanAvailable: Scalars['Boolean'];
	isCancelSubscriptionAvailable: Scalars['Boolean'];
	availablePlans: Array<SystemBillingPlanBaseInfo>;
};

/** User Type */
export enum SystemUserType {
	Agency = 'Agency',
	MyOwn = 'MyOwn',
	Team = 'Team',
}

/** UUID Field Attributes */
export type SystemUuidFieldTypeAttributes = {
	__typename?: 'SystemUUIDFieldTypeAttributes';
	fieldSize?: Maybe<Scalars['Int']>;
};

/** View Attributes */
export type SystemViewAttributes = {
	__typename?: 'SystemViewAttributes';
	query?: Maybe<Scalars['String']>;
};

/** View Create Input */
export type SystemViewCreateInput = {
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	query: Scalars['String'];
	description?: Maybe<Scalars['String']>;
};

/** View Update Input */
export type SystemViewUpdateInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	query?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
};

/** WorkspaceCreateMutationInput */
export type SystemWorkspaceCreateMutationInput = {
	name: Scalars['String'];
	image?: Maybe<GraphQlCreateFileItemInput>;
	billingPlanId?: Maybe<Scalars['ID']>;
	organizationId?: Maybe<Scalars['ID']>;
	kind?: Maybe<SystemWorkspaceKind>;
};

export type SystemWorkspaceCreateResponse = {
	__typename?: 'SystemWorkspaceCreateResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	kind?: Maybe<Scalars['String']>;
};

/** WorkspaceDeleteMutationInput */
export type SystemWorkspaceDeleteMutationInput = {
	id: Scalars['ID'];
};

export type SystemWorkspaceImage = {
	__typename?: 'SystemWorkspaceImage';
	id?: Maybe<Scalars['String']>;
	downloadUrl?: Maybe<Scalars['String']>;
};

export type SystemWorkspaceItem = {
	__typename?: 'SystemWorkspaceItem';
	id: Scalars['ID'];
	name: Scalars['String'];
	isOwner: Scalars['Boolean'];
	plan?: Maybe<SystemBillingCurrentPlanResponse>;
	nextPlan?: Maybe<SystemBillingNextPlanResponse>;
	lastAccess?: Maybe<Scalars['DateTime']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	teamMemberCount?: Maybe<Scalars['Int']>;
	region?: Maybe<Scalars['String']>;
	owner?: Maybe<SystemUserAccountInfo>;
	image?: Maybe<SystemWorkspaceImage>;
	isCiCdEnabled?: Maybe<Scalars['Boolean']>;
	apiHost?: Maybe<Scalars['String']>;
	webSocket?: Maybe<Scalars['String']>;
	organization?: Maybe<SystemOrganizationBaseItem>;
	kind?: Maybe<Scalars['String']>;
};

/** Workspace Kind */
export enum SystemWorkspaceKind {
	Frontend = 'frontend',
	General = 'general',
}

/** SystemWorkspaceListResponse output */
export type SystemWorkspaceListResponse = {
	__typename?: 'SystemWorkspaceListResponse';
	/** List items */
	items: Array<SystemWorkspaceItem>;
	/** List items count */
	count: Scalars['Int'];
};

export enum SystemWorkspaceStatus {
	Active = 'active',
	Blocked = 'blocked',
	Canceled = 'canceled',
	Suspended = 'suspended',
	Canceling = 'canceling',
	Pending = 'pending',
}

/** WorkspaceUpdateMutationInput */
export type SystemWorkspaceUpdateMutationInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	image?: Maybe<GraphQlCreateFileItemInput>;
};

export type SystemWorkspaceUpdateResponse = {
	__typename?: 'SystemWorkspaceUpdateResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	image?: Maybe<GraphQlFileItemResponse>;
};

/** Table */
export type Table = {
	__typename?: 'Table';
	id: Scalars['ID'];
	application?: Maybe<Application>;
	isSystem: Scalars['Boolean'];
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	fields?: Maybe<Array<TableField>>;
	indexes?: Maybe<Array<TableIndex>>;
	origin: SchemaOrigin;
	schemaFeatures: TableSchemaFeatures;
	dataFeatures: TableDataFeatures;
	attributes?: Maybe<TableAttributes>;
	description?: Maybe<Scalars['String']>;
};

/** Table Attributes */
export type TableAttributes = ViewAttributes;

/** Table Create Input */
export type TableCreateInput = {
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	applicationId?: Maybe<Scalars['String']>;
};

/** Table Data Features */
export type TableDataFeatures = {
	__typename?: 'TableDataFeatures';
	create: Scalars['Boolean'];
	update: Scalars['Boolean'];
	delete: Scalars['Boolean'];
};

/** Table Delete Input */
export type TableDeleteInput = {
	id: Scalars['ID'];
};

/** TableField */
export type TableField = {
	__typename?: 'TableField';
	id: Scalars['ID'];
	table: Table;
	isSystem: Scalars['Boolean'];
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	fieldType: FieldType;
	origin: SchemaOrigin;
	schemaFeatures: FieldSchemaFeatures;
	dataFeatures: FieldDataFeatures;
	isMeta: Scalars['Boolean'];
	isList: Scalars['Boolean'];
	isRequired: Scalars['Boolean'];
	isUnique?: Maybe<Scalars['Boolean']>;
	defaultValue?: Maybe<Scalars['String']>;
	computedMode?: Maybe<ComputedFieldMode>;
	expression?: Maybe<Scalars['String']>;
	fieldTypeAttributes?: Maybe<FieldTypeAttributes>;
	relation?: Maybe<Relation>;
};

/** Table Field Create Input */
export type TableFieldCreateInput = {
	tableId: Scalars['ID'];
	force?: Maybe<Scalars['Boolean']>;
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	fieldType: FieldType;
	isList: Scalars['Boolean'];
	isRequired: Scalars['Boolean'];
	isUnique?: Maybe<Scalars['Boolean']>;
	defaultValue?: Maybe<Scalars['String']>;
	initialValue?: Maybe<Scalars['String']>;
	computedMode?: Maybe<ComputedFieldMode>;
	expression?: Maybe<Scalars['String']>;
	position?: Maybe<Scalars['Int']>;
	fieldTypeAttributes?: Maybe<FieldTypeAttributesInput>;
	relation?: Maybe<RelationCreateInput>;
};

/** Table Field Delete Input */
export type TableFieldDeleteInput = {
	id: Scalars['ID'];
};

/** Table Field Position Update Input */
export type TableFieldPositionUpdateInput = {
	id: Scalars['ID'];
	newPosition: Scalars['Int'];
};

/** Table Field Update Input */
export type TableFieldUpdateInput = {
	id: Scalars['ID'];
	force?: Maybe<Scalars['Boolean']>;
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	fieldType?: Maybe<FieldType>;
	isList?: Maybe<Scalars['Boolean']>;
	isRequired?: Maybe<Scalars['Boolean']>;
	isUnique?: Maybe<Scalars['Boolean']>;
	defaultValue?: Maybe<Scalars['String']>;
	initialValue?: Maybe<Scalars['String']>;
	computedMode?: Maybe<ComputedFieldMode>;
	expression?: Maybe<Scalars['String']>;
	position?: Maybe<Scalars['Int']>;
	fieldTypeAttributes?: Maybe<FieldTypeAttributesInput>;
	relation?: Maybe<RelationUpdateInput>;
};

/** Table Index */
export type TableIndex = {
	__typename?: 'TableIndex';
	id: Scalars['ID'];
	table: Table;
	type: Scalars['String'];
	columns?: Maybe<Array<TableIndexColumn>>;
	name?: Maybe<Scalars['String']>;
	isSystem: Scalars['Boolean'];
};

/** Table Index Column */
export type TableIndexColumn = {
	__typename?: 'TableIndexColumn';
	name: Scalars['String'];
};

/** Table Index Column Input */
export type TableIndexColumnInput = {
	name: Scalars['String'];
};

export enum TableIndexType {
	Index = 'INDEX',
	Unique = 'UNIQUE',
}

/** Table List Application Filter */
export type TableListApplicationFilter = {
	id?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
};

/** Table List Filter */
export type TableListFilter = {
	applications?: Maybe<Array<Maybe<TableListApplicationFilter>>>;
	onlyUserTables?: Maybe<Scalars['Boolean']>;
	tableNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Table List Response */
export type TableListResponse = {
	__typename?: 'TableListResponse';
	items?: Maybe<Array<Maybe<Table>>>;
	count?: Maybe<Scalars['Int']>;
};

/** Table Schema Create Features */
export type TableSchemaCreateFeatures = {
	__typename?: 'TableSchemaCreateFeatures';
	ID: Scalars['Boolean'];
	UUID: Scalars['Boolean'];
	JSON: Scalars['Boolean'];
	NUMBER: Scalars['Boolean'];
	TEXT: Scalars['Boolean'];
	DATE: Scalars['Boolean'];
	SWITCH: Scalars['Boolean'];
	RELATION: Scalars['Boolean'];
	FILE: Scalars['Boolean'];
	SMART: Scalars['Boolean'];
	GEO: Scalars['Boolean'];
	ONE_WAY_RELATION: Scalars['Boolean'];
	MISSING_RELATION: Scalars['Boolean'];
};

/** Table Schema Features */
export type TableSchemaFeatures = {
	__typename?: 'TableSchemaFeatures';
	create: TableSchemaCreateFeatures;
	update?: Maybe<TableSchemaMetaFieldFeatures>;
	computedFields: Scalars['Boolean'];
};

/** Table Schema Meta Field Features */
export type TableSchemaMetaFieldFeatures = {
	__typename?: 'TableSchemaMetaFieldFeatures';
	name: Scalars['Boolean'];
	displayName: Scalars['Boolean'];
};

/** Table Update Input */
export type TableUpdateInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
};

/** SeleniumClick create input from target */
export type Target_SeleniumClickCreateInput = {
	target?: Maybe<SeleniumClickTargetRelationInput>;
	command?: Maybe<SeleniumClickCommandRelationInput>;
};

/** SeleniumClick update input from target */
export type Target_SeleniumClickUpdateInput = {
	target?: Maybe<SeleniumClickTargetUpdateRelationInput>;
	command?: Maybe<SeleniumClickCommandUpdateRelationInput>;
};

/** SeleniumPoint create input from target */
export type Target_SeleniumPointCreateInput = {
	setViewportSize?: Maybe<SeleniumPointSetViewportSizeRelationInput>;
	target?: Maybe<SeleniumPointTargetRelationInput>;
	xCoord: Scalars['Int'];
	yCoord: Scalars['Int'];
};

/** SeleniumPoint update input from target */
export type Target_SeleniumPointUpdateInput = {
	setViewportSize?: Maybe<SeleniumPointSetViewportSizeUpdateRelationInput>;
	target?: Maybe<SeleniumPointTargetUpdateRelationInput>;
	xCoord?: Maybe<Scalars['Int']>;
	yCoord?: Maybe<Scalars['Int']>;
};

/** SeleniumSelector create input from target */
export type Target_SeleniumSelectorCreateInput = {
	target?: Maybe<SeleniumSelectorTargetRelationInput>;
	xpath?: Maybe<Scalars['String']>;
	selector?: Maybe<Scalars['String']>;
	className?: Maybe<Scalars['String']>;
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	innerText?: Maybe<Scalars['String']>;
};

/** SeleniumSelector update input from target */
export type Target_SeleniumSelectorUpdateInput = {
	target?: Maybe<SeleniumSelectorTargetUpdateRelationInput>;
	xpath?: Maybe<Scalars['String']>;
	selector?: Maybe<Scalars['String']>;
	className?: Maybe<Scalars['String']>;
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	innerText?: Maybe<Scalars['String']>;
};

/** SeleniumType create input from target */
export type Target_SeleniumTypeCreateInput = {
	target?: Maybe<SeleniumTypeTargetRelationInput>;
	command?: Maybe<SeleniumTypeCommandRelationInput>;
	value: Scalars['String'];
};

/** SeleniumType update input from target */
export type Target_SeleniumTypeUpdateInput = {
	target?: Maybe<SeleniumTypeTargetUpdateRelationInput>;
	command?: Maybe<SeleniumTypeCommandUpdateRelationInput>;
	value?: Maybe<Scalars['String']>;
};

export type TeamInvitation = {
	__typename?: 'TeamInvitation';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	uuid?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	resentOn?: Maybe<Scalars['DateTime']>;
	accepted?: Maybe<Scalars['Boolean']>;
	acceptedOn?: Maybe<Scalars['DateTime']>;
	invitee?: Maybe<TeamMember>;
	invitedBy?: Maybe<TeamMember>;
	_description?: Maybe<Scalars['String']>;
};

export type TeamInvitation_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	uuid?: Maybe<StringPredicate>;
	email?: Maybe<StringPredicate>;
	firstName?: Maybe<StringPredicate>;
	lastName?: Maybe<StringPredicate>;
	resentOn?: Maybe<DateTimePredicate>;
	accepted?: Maybe<BoolPredicate>;
	acceptedOn?: Maybe<DateTimePredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	invitee?: Maybe<TeamMember_PermissionFilter>;
	invitedBy?: Maybe<TeamMember_PermissionFilter>;
	AND?: Maybe<Array<TeamInvitation_PermissionFilter>>;
	OR?: Maybe<Array<TeamInvitation_PermissionFilter>>;
};

export type TeamInvitation_PermissionRelationFilter = {
	some?: Maybe<TeamInvitation_PermissionFilter>;
	every?: Maybe<TeamInvitation_PermissionFilter>;
	none?: Maybe<TeamInvitation_PermissionFilter>;
};

/** TeamInvitationAcceptInput */
export type TeamInvitationAcceptInput = {
	uuid: Scalars['String'];
	accepted: Scalars['Boolean'];
};

/** TeamInvitationAcceptResponse */
export type TeamInvitationAcceptResponse = {
	__typename?: 'TeamInvitationAcceptResponse';
	success: Scalars['Boolean'];
};

/** Cancel team members invitations input */
export type TeamInvitationCancelInput = {
	memberId: Scalars['ID'];
};

/** TeamInvitations delete input */
export type TeamInvitationDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** Team Invitation Details */
export type TeamInvitationDetails = {
	__typename?: 'TeamInvitationDetails';
	uuid?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	isRegistered?: Maybe<Scalars['Boolean']>;
	invitedBy?: Maybe<InvitedByName>;
};

export type TeamInvitationFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	uuid?: Maybe<StringPredicate>;
	email?: Maybe<StringPredicate>;
	firstName?: Maybe<StringPredicate>;
	lastName?: Maybe<StringPredicate>;
	resentOn?: Maybe<DateTimePredicate>;
	accepted?: Maybe<BoolPredicate>;
	acceptedOn?: Maybe<DateTimePredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	invitee?: Maybe<TeamMemberFilter>;
	invitedBy?: Maybe<TeamMemberFilter>;
	AND?: Maybe<Array<TeamInvitationFilter>>;
	OR?: Maybe<Array<TeamInvitationFilter>>;
};

export type TeamInvitationGroupBy = {
	query: TeamInvitationGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type TeamInvitationGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	uuid?: Maybe<Array<GroupByField>>;
	email?: Maybe<Array<GroupByField>>;
	firstName?: Maybe<Array<GroupByField>>;
	lastName?: Maybe<Array<GroupByField>>;
	resentOn?: Maybe<Array<GroupByField>>;
	accepted?: Maybe<Array<GroupByField>>;
	acceptedOn?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	invitee?: Maybe<TeamMemberGroupByQuery>;
	invitedBy?: Maybe<TeamMemberGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type TeamInvitationKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	uuid?: Maybe<Scalars['String']>;
};

/** TeamInvitationListResponse output */
export type TeamInvitationListResponse = {
	__typename?: 'TeamInvitationListResponse';
	/** List items */
	items: Array<TeamInvitation>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** No longer supported. Use `sort` instead. */
export enum TeamInvitationOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	UuidAsc = 'uuid_ASC',
	UuidDesc = 'uuid_DESC',
	EmailAsc = 'email_ASC',
	EmailDesc = 'email_DESC',
	FirstNameAsc = 'firstName_ASC',
	FirstNameDesc = 'firstName_DESC',
	LastNameAsc = 'lastName_ASC',
	LastNameDesc = 'lastName_DESC',
	ResentOnAsc = 'resentOn_ASC',
	ResentOnDesc = 'resentOn_DESC',
	AcceptedAsc = 'accepted_ASC',
	AcceptedDesc = 'accepted_DESC',
	AcceptedOnAsc = 'acceptedOn_ASC',
	AcceptedOnDesc = 'acceptedOn_DESC',
}

/** TeamInvitations subscription payload */
export type TeamInvitationPayload = {
	__typename?: 'TeamInvitationPayload';
	mutation: MutationType;
	node?: Maybe<TeamInvitation>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<TeamInvitation>;
};

export type TeamInvitationRelationFilter = {
	some?: Maybe<TeamInvitationFilter>;
	every?: Maybe<TeamInvitationFilter>;
	none?: Maybe<TeamInvitationFilter>;
};

/** Resend team invitation input */
export type TeamInvitationResendInput = {
	memberId: Scalars['ID'];
};

/** Team Invitations Details List */
export type TeamInvitationsDetailsList = {
	__typename?: 'TeamInvitationsDetailsList';
	items?: Maybe<Array<Maybe<TeamInvitationDetails>>>;
	count?: Maybe<Scalars['Int']>;
};

export type TeamInvitationSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	uuid?: Maybe<SortOrder>;
	email?: Maybe<SortOrder>;
	firstName?: Maybe<SortOrder>;
	lastName?: Maybe<SortOrder>;
	resentOn?: Maybe<SortOrder>;
	accepted?: Maybe<SortOrder>;
	acceptedOn?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	invitee?: Maybe<TeamMemberSort>;
	invitedBy?: Maybe<TeamMemberSort>;
};

/** TeamInvitations subscription filter */
export type TeamInvitationSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<TeamInvitationFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

export type TeamMember = {
	__typename?: 'TeamMember';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	user?: Maybe<User>;
	status?: Maybe<Scalars['String']>;
	isOwner?: Maybe<Scalars['Boolean']>;
	avatar?: Maybe<File>;
	roles?: Maybe<RoleListResponse>;
	receivedTeamInvitations?: Maybe<TeamInvitationListResponse>;
	sentTeamInvitations?: Maybe<TeamInvitationListResponse>;
	email?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	learningMode?: Maybe<Scalars['Boolean']>;
	permissions?: Maybe<UserPermissionList>;
	_description?: Maybe<Scalars['String']>;
};

export type TeamMemberRolesArgs = {
	filter?: Maybe<RoleFilter>;
	orderBy?: Maybe<Array<Maybe<RoleOrderBy>>>;
	sort?: Maybe<Array<RoleSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RoleGroupBy>;
};

export type TeamMemberReceivedTeamInvitationsArgs = {
	filter?: Maybe<TeamInvitationFilter>;
	orderBy?: Maybe<Array<Maybe<TeamInvitationOrderBy>>>;
	sort?: Maybe<Array<TeamInvitationSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TeamInvitationGroupBy>;
};

export type TeamMemberSentTeamInvitationsArgs = {
	filter?: Maybe<TeamInvitationFilter>;
	orderBy?: Maybe<Array<Maybe<TeamInvitationOrderBy>>>;
	sort?: Maybe<Array<TeamInvitationSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TeamInvitationGroupBy>;
};

export type TeamMemberPermissionsArgs = {
	filter?: Maybe<PermissionInputFilter>;
};

export type TeamMember_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	status?: Maybe<StringPredicate>;
	isOwner?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	is_self?: Maybe<Scalars['Boolean']>;
	not_self?: Maybe<Scalars['Boolean']>;
	createdBy?: Maybe<User_PermissionFilter>;
	user?: Maybe<User_PermissionFilter>;
	avatar?: Maybe<File_PermissionFilter>;
	roles?: Maybe<Role_PermissionRelationFilter>;
	receivedTeamInvitations?: Maybe<TeamInvitation_PermissionRelationFilter>;
	sentTeamInvitations?: Maybe<TeamInvitation_PermissionRelationFilter>;
	AND?: Maybe<Array<TeamMember_PermissionFilter>>;
	OR?: Maybe<Array<TeamMember_PermissionFilter>>;
};

export type TeamMember_PermissionRelationFilter = {
	some?: Maybe<TeamMember_PermissionFilter>;
	every?: Maybe<TeamMember_PermissionFilter>;
	none?: Maybe<TeamMember_PermissionFilter>;
};

/** TeamMembers delete input */
export type TeamMemberDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

export type TeamMemberFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	status?: Maybe<StringPredicate>;
	isOwner?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	is_self?: Maybe<Scalars['Boolean']>;
	not_self?: Maybe<Scalars['Boolean']>;
	createdBy?: Maybe<UserFilter>;
	user?: Maybe<UserFilter>;
	avatar?: Maybe<FileFilter>;
	roles?: Maybe<RoleRelationFilter>;
	receivedTeamInvitations?: Maybe<TeamInvitationRelationFilter>;
	sentTeamInvitations?: Maybe<TeamInvitationRelationFilter>;
	AND?: Maybe<Array<TeamMemberFilter>>;
	OR?: Maybe<Array<TeamMemberFilter>>;
};

export type TeamMemberGroupBy = {
	query: TeamMemberGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type TeamMemberGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	status?: Maybe<Array<GroupByField>>;
	isOwner?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	user?: Maybe<UserGroupByQuery>;
	avatar?: Maybe<FileGroupByQuery>;
	roles?: Maybe<RoleGroupByQuery>;
	receivedTeamInvitations?: Maybe<TeamInvitationGroupByQuery>;
	sentTeamInvitations?: Maybe<TeamInvitationGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type TeamMemberKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** TeamMemberListResponse output */
export type TeamMemberListResponse = {
	__typename?: 'TeamMemberListResponse';
	/** List items */
	items: Array<TeamMember>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** TeamMemberManyResponse output */
export type TeamMemberManyResponse = {
	__typename?: 'TeamMemberManyResponse';
	/** List items */
	items: Array<TeamMember>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum TeamMemberOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	StatusAsc = 'status_ASC',
	StatusDesc = 'status_DESC',
	IsOwnerAsc = 'isOwner_ASC',
	IsOwnerDesc = 'isOwner_DESC',
}

/** TeamMembers subscription payload */
export type TeamMemberPayload = {
	__typename?: 'TeamMemberPayload';
	mutation: MutationType;
	node?: Maybe<TeamMember>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<TeamMember>;
};

export type TeamMemberRelationFilter = {
	some?: Maybe<TeamMemberFilter>;
	every?: Maybe<TeamMemberFilter>;
	none?: Maybe<TeamMemberFilter>;
};

/** Files create input from teamMembers_avatar */
export type TeamMembers_Avatar_FileCreateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
};

/** Files update input from teamMembers_avatar */
export type TeamMembers_Avatar_FileUpdateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarUpdateRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarUpdateRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarUpdateRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoUpdateRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
};

/** Roles create input from teamMembers */
export type TeamMembers_RoleCreateInput = {
	name: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	users?: Maybe<RolesUsersRelationInput>;
	permissions?: Maybe<PermissionsInput>;
	apiTokens?: Maybe<RolesApiTokensRelationInput>;
	authenticationProfiles?: Maybe<RolesAuthenticationProfilesRelationInput>;
	teamMembers?: Maybe<RolesTeamMembersRelationInput>;
};

/** Roles update input from teamMembers */
export type TeamMembers_RoleUpdateInput = {
	filter?: Maybe<RoleKeyFilter>;
	data: RoleUpdateInput;
};

/** TeamMembers relation input */
export type TeamMembersAvatarUpdateRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	disconnect?: Maybe<FileKeyFilter>;
	reconnect?: Maybe<FileKeyFilter>;
	create?: Maybe<TeamMembers_Avatar_FileCreateInput>;
	update?: Maybe<TeamMembers_Avatar_FileUpdateInput>;
};

export type TeamMemberSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	status?: Maybe<SortOrder>;
	isOwner?: Maybe<SortOrder>;
	email?: Maybe<SortOrder>;
	firstName?: Maybe<SortOrder>;
	lastName?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	user?: Maybe<UserSort>;
	avatar?: Maybe<FileSort>;
};

/** TeamMembers relation input */
export type TeamMembersReceivedTeamInvitationsUpdateRelationInput = {
	connect?: Maybe<Array<TeamInvitationKeyFilter>>;
	disconnect?: Maybe<Array<TeamInvitationKeyFilter>>;
	reconnect?: Maybe<Array<TeamInvitationKeyFilter>>;
};

/** TeamMembers relation input */
export type TeamMembersRolesUpdateRelationInput = {
	connect?: Maybe<Array<RoleKeyFilter>>;
	disconnect?: Maybe<Array<RoleKeyFilter>>;
	reconnect?: Maybe<Array<RoleKeyFilter>>;
	create?: Maybe<Array<Maybe<TeamMembers_RoleCreateInput>>>;
	update?: Maybe<Array<Maybe<TeamMembers_RoleUpdateInput>>>;
};

/** TeamMembers relation input */
export type TeamMembersSentTeamInvitationsUpdateRelationInput = {
	connect?: Maybe<Array<TeamInvitationKeyFilter>>;
	disconnect?: Maybe<Array<TeamInvitationKeyFilter>>;
	reconnect?: Maybe<Array<TeamInvitationKeyFilter>>;
};

/** TeamMembers subscription filter */
export type TeamMemberSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<TeamMemberFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** TeamMembers update input */
export type TeamMemberUpdateByFilterInput = {
	status?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	isOwner?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	learningMode?: Maybe<Scalars['Boolean']>;
};

/** TeamMembers update input */
export type TeamMemberUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	avatar?: Maybe<TeamMembersAvatarUpdateRelationInput>;
	roles?: Maybe<TeamMembersRolesUpdateRelationInput>;
	receivedTeamInvitations?: Maybe<TeamMembersReceivedTeamInvitationsUpdateRelationInput>;
	sentTeamInvitations?: Maybe<TeamMembersSentTeamInvitationsUpdateRelationInput>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	learningMode?: Maybe<Scalars['Boolean']>;
};

/** This represents the outcome of an individual user story each time it's included in a test run. */
export type TestOutcome = {
	__typename?: 'TestOutcome';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	userStory?: Maybe<UserStory>;
	/** Has the bug been resolved? */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestRun>;
	/** The recorded playback of user stories. */
	video?: Maybe<File>;
	errorDetails?: Maybe<Error>;
	_description?: Maybe<Scalars['String']>;
};

/** Error create input from testOutcome */
export type TestOutcome_ErrorCreateInput = {
	stepIndex: Scalars['Int'];
	exception: Scalars['String'];
	testOutcome?: Maybe<ErrorTestOutcomeRelationInput>;
};

/** Error update input from testOutcome */
export type TestOutcome_ErrorUpdateInput = {
	stepIndex?: Maybe<Scalars['Int']>;
	exception?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<ErrorTestOutcomeUpdateRelationInput>;
};

export type TestOutcome_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	isResolved?: Maybe<BoolPredicate>;
	status?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	userStory?: Maybe<UserStory_PermissionFilter>;
	testRun?: Maybe<TestRun_PermissionFilter>;
	video?: Maybe<File_PermissionFilter>;
	errorDetails?: Maybe<Error_PermissionFilter>;
	AND?: Maybe<Array<TestOutcome_PermissionFilter>>;
	OR?: Maybe<Array<TestOutcome_PermissionFilter>>;
};

export type TestOutcome_PermissionRelationFilter = {
	some?: Maybe<TestOutcome_PermissionFilter>;
	every?: Maybe<TestOutcome_PermissionFilter>;
	none?: Maybe<TestOutcome_PermissionFilter>;
};

/** TestRun create input from testOutcome */
export type TestOutcome_TestRunCreateInput = {
	status?: Maybe<Scalars['String']>;
	ciRun?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeRelationInput>;
	/** How long did this test take? Use a HH:MM:ss format. i.e. 14:50:19 */
	testLength?: Maybe<Scalars['String']>;
};

/** TestRun update input from testOutcome */
export type TestOutcome_TestRunUpdateInput = {
	status?: Maybe<Scalars['String']>;
	ciRun?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseUpdateRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeUpdateRelationInput>;
	/** How long did this test take? Use a HH:MM:ss format. i.e. 14:50:19 */
	testLength?: Maybe<Scalars['String']>;
};

/** UserStory create input from testOutcome */
export type TestOutcome_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Scalars['String']>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationRelationInput>;
};

/** UserStory update input from testOutcome */
export type TestOutcome_UserStoryUpdateInput = {
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingUpdateRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeUpdateRelationInput>;
	project?: Maybe<UserStoryProjectUpdateRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationUpdateRelationInput>;
};

/** Files create input from testOutcome_video */
export type TestOutcome_Video_FileCreateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
};

/** Files update input from testOutcome_video */
export type TestOutcome_Video_FileUpdateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarUpdateRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarUpdateRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarUpdateRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoUpdateRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
};

/** TestOutcome create input */
export type TestOutcomeCreateInput = {
	userStory?: Maybe<TestOutcomeUserStoryRelationInput>;
	/** Has the bug been resolved? */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunRelationInput>;
	video?: Maybe<TestOutcomeVideoRelationInput>;
	errorDetails?: Maybe<TestOutcomeErrorDetailsRelationInput>;
};

/** TestOutcome create many input */
export type TestOutcomeCreateManyInput = {
	userStory: TestOutcomeUserStoryManyRelationInput;
	/** Has the bug been resolved? */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunManyRelationInput>;
	video?: Maybe<TestOutcomeVideoManyRelationInput>;
	errorDetails?: Maybe<TestOutcomeErrorDetailsManyRelationInput>;
};

/** TestOutcome delete input */
export type TestOutcomeDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** TestOutcome relation input */
export type TestOutcomeErrorDetailsManyRelationInput = {
	connect?: Maybe<ErrorKeyFilter>;
};

/** TestOutcome relation input */
export type TestOutcomeErrorDetailsRelationInput = {
	connect?: Maybe<ErrorKeyFilter>;
	create?: Maybe<TestOutcome_ErrorCreateInput>;
};

/** TestOutcome relation input */
export type TestOutcomeErrorDetailsUpdateRelationInput = {
	connect?: Maybe<ErrorKeyFilter>;
	disconnect?: Maybe<ErrorKeyFilter>;
	reconnect?: Maybe<ErrorKeyFilter>;
	create?: Maybe<TestOutcome_ErrorCreateInput>;
	update?: Maybe<TestOutcome_ErrorUpdateInput>;
};

/** TestOutcomeFieldsPermissions create input */
export type TestOutcomeFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	isResolved?: Maybe<Scalars['Boolean']>;
	status?: Maybe<Scalars['Boolean']>;
};

export type TestOutcomeFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	isResolved?: Maybe<BoolPredicate>;
	status?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	userStory?: Maybe<UserStoryFilter>;
	testRun?: Maybe<TestRunFilter>;
	video?: Maybe<FileFilter>;
	errorDetails?: Maybe<ErrorFilter>;
	AND?: Maybe<Array<TestOutcomeFilter>>;
	OR?: Maybe<Array<TestOutcomeFilter>>;
};

export type TestOutcomeGroupBy = {
	query: TestOutcomeGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type TestOutcomeGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	isResolved?: Maybe<Array<GroupByField>>;
	status?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	userStory?: Maybe<UserStoryGroupByQuery>;
	testRun?: Maybe<TestRunGroupByQuery>;
	video?: Maybe<FileGroupByQuery>;
	errorDetails?: Maybe<ErrorGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type TestOutcomeKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** TestOutcomeListResponse output */
export type TestOutcomeListResponse = {
	__typename?: 'TestOutcomeListResponse';
	/** List items */
	items: Array<TestOutcome>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** TestOutcomeManyResponse output */
export type TestOutcomeManyResponse = {
	__typename?: 'TestOutcomeManyResponse';
	/** List items */
	items: Array<TestOutcome>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum TestOutcomeOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	IsResolvedAsc = 'isResolved_ASC',
	IsResolvedDesc = 'isResolved_DESC',
	StatusAsc = 'status_ASC',
	StatusDesc = 'status_DESC',
}

/** TestOutcome subscription payload */
export type TestOutcomePayload = {
	__typename?: 'TestOutcomePayload';
	mutation: MutationType;
	node?: Maybe<TestOutcome>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<TestOutcome>;
};

export type TestOutcomeRelationFilter = {
	some?: Maybe<TestOutcomeFilter>;
	every?: Maybe<TestOutcomeFilter>;
	none?: Maybe<TestOutcomeFilter>;
};

export type TestOutcomeSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	isResolved?: Maybe<SortOrder>;
	status?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	userStory?: Maybe<UserStorySort>;
	testRun?: Maybe<TestRunSort>;
	video?: Maybe<FileSort>;
	errorDetails?: Maybe<ErrorSort>;
};

/** TestOutcome subscription filter */
export type TestOutcomeSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<TestOutcomeFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** TestOutcome relation input */
export type TestOutcomeTestRunManyRelationInput = {
	connect?: Maybe<TestRunKeyFilter>;
};

/** TestOutcome relation input */
export type TestOutcomeTestRunRelationInput = {
	connect?: Maybe<TestRunKeyFilter>;
	create?: Maybe<TestOutcome_TestRunCreateInput>;
};

/** TestOutcome relation input */
export type TestOutcomeTestRunUpdateRelationInput = {
	connect?: Maybe<TestRunKeyFilter>;
	disconnect?: Maybe<TestRunKeyFilter>;
	reconnect?: Maybe<TestRunKeyFilter>;
	create?: Maybe<TestOutcome_TestRunCreateInput>;
	update?: Maybe<TestOutcome_TestRunUpdateInput>;
};

/** TestOutcome update input */
export type TestOutcomeUpdateByFilterInput = {
	isResolved?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	status?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
};

/** TestOutcome update input */
export type TestOutcomeUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	userStory?: Maybe<TestOutcomeUserStoryUpdateRelationInput>;
	/** Has the bug been resolved? */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunUpdateRelationInput>;
	video?: Maybe<TestOutcomeVideoUpdateRelationInput>;
	errorDetails?: Maybe<TestOutcomeErrorDetailsUpdateRelationInput>;
};

/** TestOutcome relation input */
export type TestOutcomeUserStoryManyRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
};

/** TestOutcome relation input */
export type TestOutcomeUserStoryRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<TestOutcome_UserStoryCreateInput>;
};

/** TestOutcome relation input */
export type TestOutcomeUserStoryUpdateRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	disconnect?: Maybe<UserStoryKeyFilter>;
	reconnect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<TestOutcome_UserStoryCreateInput>;
	update?: Maybe<TestOutcome_UserStoryUpdateInput>;
};

/** TestOutcome relation input */
export type TestOutcomeVideoManyRelationInput = {
	connect?: Maybe<FileKeyFilter>;
};

/** TestOutcome relation input */
export type TestOutcomeVideoRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	create?: Maybe<TestOutcome_Video_FileCreateInput>;
};

/** TestOutcome relation input */
export type TestOutcomeVideoUpdateRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	disconnect?: Maybe<FileKeyFilter>;
	reconnect?: Maybe<FileKeyFilter>;
	create?: Maybe<TestOutcome_Video_FileCreateInput>;
	update?: Maybe<TestOutcome_Video_FileUpdateInput>;
};

/**
 * A test run only exists in relation to a project with user stories that are
 * marked to be test cases. Test runs are performed on a staging environment using a CI.
 */
export type TestRun = {
	__typename?: 'TestRun';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	status?: Maybe<Scalars['String']>;
	ciRun?: Maybe<Scalars['String']>;
	release?: Maybe<Release>;
	testOutcome?: Maybe<TestOutcomeListResponse>;
	/** How long did this test take? Use a HH:MM:ss format. i.e. 14:50:19 */
	testLength?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

/**
 * A test run only exists in relation to a project with user stories that are
 * marked to be test cases. Test runs are performed on a staging environment using a CI.
 */
export type TestRunTestOutcomeArgs = {
	filter?: Maybe<TestOutcomeFilter>;
	orderBy?: Maybe<Array<Maybe<TestOutcomeOrderBy>>>;
	sort?: Maybe<Array<TestOutcomeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TestOutcomeGroupBy>;
};

export type TestRun_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	status?: Maybe<StringPredicate>;
	ciRun?: Maybe<StringPredicate>;
	testLength?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	release?: Maybe<Release_PermissionFilter>;
	testOutcome?: Maybe<TestOutcome_PermissionRelationFilter>;
	AND?: Maybe<Array<TestRun_PermissionFilter>>;
	OR?: Maybe<Array<TestRun_PermissionFilter>>;
};

export type TestRun_PermissionRelationFilter = {
	some?: Maybe<TestRun_PermissionFilter>;
	every?: Maybe<TestRun_PermissionFilter>;
	none?: Maybe<TestRun_PermissionFilter>;
};

/** TestOutcome create input from testRun */
export type TestRun_TestOutcomeCreateInput = {
	userStory?: Maybe<TestOutcomeUserStoryRelationInput>;
	/** Has the bug been resolved? */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunRelationInput>;
	video?: Maybe<TestOutcomeVideoRelationInput>;
	errorDetails?: Maybe<TestOutcomeErrorDetailsRelationInput>;
};

/** TestOutcome update input from testRun */
export type TestRun_TestOutcomeUpdateInput = {
	filter?: Maybe<TestOutcomeKeyFilter>;
	data: TestOutcomeUpdateInput;
};

/** TestRun create input */
export type TestRunCreateInput = {
	status?: Maybe<Scalars['String']>;
	ciRun?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeRelationInput>;
	/** How long did this test take? Use a HH:MM:ss format. i.e. 14:50:19 */
	testLength?: Maybe<Scalars['String']>;
};

/** TestRun create many input */
export type TestRunCreateManyInput = {
	status?: Maybe<Scalars['String']>;
	ciRun?: Maybe<Scalars['String']>;
	release: TestRunReleaseManyRelationInput;
	testOutcome?: Maybe<TestRunTestOutcomeManyRelationInput>;
	/** How long did this test take? Use a HH:MM:ss format. i.e. 14:50:19 */
	testLength?: Maybe<Scalars['String']>;
};

/** TestRun delete input */
export type TestRunDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** TestRunFieldsPermissions create input */
export type TestRunFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	status?: Maybe<Scalars['Boolean']>;
	ciRun?: Maybe<Scalars['Boolean']>;
	testLength?: Maybe<Scalars['Boolean']>;
};

export type TestRunFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	status?: Maybe<StringPredicate>;
	ciRun?: Maybe<StringPredicate>;
	testLength?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	release?: Maybe<ReleaseFilter>;
	testOutcome?: Maybe<TestOutcomeRelationFilter>;
	AND?: Maybe<Array<TestRunFilter>>;
	OR?: Maybe<Array<TestRunFilter>>;
};

export type TestRunGroupBy = {
	query: TestRunGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type TestRunGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	status?: Maybe<Array<GroupByField>>;
	ciRun?: Maybe<Array<GroupByField>>;
	testLength?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	release?: Maybe<ReleaseGroupByQuery>;
	testOutcome?: Maybe<TestOutcomeGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type TestRunKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** TestRunListResponse output */
export type TestRunListResponse = {
	__typename?: 'TestRunListResponse';
	/** List items */
	items: Array<TestRun>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** TestRunManyResponse output */
export type TestRunManyResponse = {
	__typename?: 'TestRunManyResponse';
	/** List items */
	items: Array<TestRun>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum TestRunOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	StatusAsc = 'status_ASC',
	StatusDesc = 'status_DESC',
	CiRunAsc = 'ciRun_ASC',
	CiRunDesc = 'ciRun_DESC',
	TestLengthAsc = 'testLength_ASC',
	TestLengthDesc = 'testLength_DESC',
}

/** TestRun subscription payload */
export type TestRunPayload = {
	__typename?: 'TestRunPayload';
	mutation: MutationType;
	node?: Maybe<TestRun>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<TestRun>;
};

export type TestRunRelationFilter = {
	some?: Maybe<TestRunFilter>;
	every?: Maybe<TestRunFilter>;
	none?: Maybe<TestRunFilter>;
};

/** TestRun relation input */
export type TestRunReleaseManyRelationInput = {
	connect?: Maybe<ReleaseKeyFilter>;
};

/** TestRun relation input */
export type TestRunReleaseRelationInput = {
	connect?: Maybe<ReleaseKeyFilter>;
	create?: Maybe<TestRuns_ReleaseCreateInput>;
};

/** TestRun relation input */
export type TestRunReleaseUpdateRelationInput = {
	connect?: Maybe<ReleaseKeyFilter>;
	disconnect?: Maybe<ReleaseKeyFilter>;
	reconnect?: Maybe<ReleaseKeyFilter>;
	create?: Maybe<TestRuns_ReleaseCreateInput>;
	update?: Maybe<TestRuns_ReleaseUpdateInput>;
};

/** Release create input from testRuns */
export type TestRuns_ReleaseCreateInput = {
	/**
	 * This is the custom naming convention of a team for their releases. For example
	 * "echo", "foxtrot", "golf" or "v0.0.1", "v0.3.2".
	 */
	name?: Maybe<Scalars['String']>;
	/** The manually defined and planned date of a release merging to production. */
	releaseDate?: Maybe<Scalars['Date']>;
	testRuns?: Maybe<ReleaseTestRunsRelationInput>;
	project?: Maybe<ReleaseProjectRelationInput>;
};

/** Release update input from testRuns */
export type TestRuns_ReleaseUpdateInput = {
	/**
	 * This is the custom naming convention of a team for their releases. For example
	 * "echo", "foxtrot", "golf" or "v0.0.1", "v0.3.2".
	 */
	name?: Maybe<Scalars['String']>;
	/** The manually defined and planned date of a release merging to production. */
	releaseDate?: Maybe<Scalars['Date']>;
	testRuns?: Maybe<ReleaseTestRunsUpdateRelationInput>;
	project?: Maybe<ReleaseProjectUpdateRelationInput>;
};

export type TestRunSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	status?: Maybe<SortOrder>;
	ciRun?: Maybe<SortOrder>;
	testLength?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	release?: Maybe<ReleaseSort>;
};

/** TestRun subscription filter */
export type TestRunSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<TestRunFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** TestRun relation input */
export type TestRunTestOutcomeManyRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
};

/** TestRun relation input */
export type TestRunTestOutcomeRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
	create?: Maybe<Array<Maybe<TestRun_TestOutcomeCreateInput>>>;
};

/** TestRun relation input */
export type TestRunTestOutcomeUpdateRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
	disconnect?: Maybe<Array<TestOutcomeKeyFilter>>;
	reconnect?: Maybe<Array<TestOutcomeKeyFilter>>;
	create?: Maybe<Array<Maybe<TestRun_TestOutcomeCreateInput>>>;
	update?: Maybe<Array<Maybe<TestRun_TestOutcomeUpdateInput>>>;
};

/** TestRun update input */
export type TestRunUpdateByFilterInput = {
	status?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	ciRun?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	testLength?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** TestRun update input */
export type TestRunUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	status?: Maybe<Scalars['String']>;
	ciRun?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseUpdateRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeUpdateRelationInput>;
	/** How long did this test take? Use a HH:MM:ss format. i.e. 14:50:19 */
	testLength?: Maybe<Scalars['String']>;
};

/** Text Field Attributes */
export type TextFieldTypeAttributes = {
	__typename?: 'TextFieldTypeAttributes';
	format: Scalars['String'];
	fieldSize?: Maybe<Scalars['Int']>;
};

/** Text Type Format Enum */
export enum TextTypeFormatEnum {
	Unformatted = 'UNFORMATTED',
	Name = 'NAME',
	Ein = 'EIN',
	Email = 'EMAIL',
	Markdown = 'MARKDOWN',
	Html = 'HTML',
}

export type TrimFunctionArguments = {
	str: Scalars['String'];
	mode?: Maybe<StringTrimMode>;
};

/** SeleniumCommand create input from type */
export type Type_SeleniumCommandCreateInput = {
	open?: Maybe<SeleniumCommandOpenRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeRelationInput>;
	click?: Maybe<SeleniumCommandClickRelationInput>;
	type?: Maybe<SeleniumCommandTypeRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropRelationInput>;
	sIndex: Scalars['Int'];
	group?: Maybe<SeleniumCommandGroupRelationInput>;
};

/** SeleniumCommand update input from type */
export type Type_SeleniumCommandUpdateInput = {
	open?: Maybe<SeleniumCommandOpenUpdateRelationInput>;
	setViewportSize?: Maybe<SeleniumCommandSetViewportSizeUpdateRelationInput>;
	click?: Maybe<SeleniumCommandClickUpdateRelationInput>;
	type?: Maybe<SeleniumCommandTypeUpdateRelationInput>;
	dragndrop?: Maybe<SeleniumCommandDragndropUpdateRelationInput>;
	sIndex?: Maybe<Scalars['Int']>;
	group?: Maybe<SeleniumCommandGroupUpdateRelationInput>;
};

/** SeleniumTarget create input from type */
export type Type_SeleniumTargetCreateInput = {
	click?: Maybe<SeleniumTargetClickRelationInput>;
	type?: Maybe<SeleniumTargetTypeRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationRelationInput>;
	selector: SeleniumTargetSelectorRelationInput;
	coordinates?: Maybe<SeleniumTargetCoordinatesRelationInput>;
};

/** SeleniumTarget update input from type */
export type Type_SeleniumTargetUpdateInput = {
	click?: Maybe<SeleniumTargetClickUpdateRelationInput>;
	type?: Maybe<SeleniumTargetTypeUpdateRelationInput>;
	dragndropSource?: Maybe<SeleniumTargetDragndropSourceUpdateRelationInput>;
	dragndropDestination?: Maybe<SeleniumTargetDragndropDestinationUpdateRelationInput>;
	selector?: Maybe<SeleniumTargetSelectorUpdateRelationInput>;
	coordinates?: Maybe<SeleniumTargetCoordinatesUpdateRelationInput>;
};

export type UpdateByFilterBooleanSwitchInput = {
	set?: Maybe<Scalars['Boolean']>;
	invert?: Maybe<Scalars['Boolean']>;
};

export type UpdateByFilterDateInput = {
	set?: Maybe<Scalars['String']>;
	add?: Maybe<UpdateByFilterDatePartsInput>;
	sub?: Maybe<UpdateByFilterDatePartsInput>;
};

export type UpdateByFilterDatePartsInput = {
	years?: Maybe<Scalars['Int']>;
	months?: Maybe<Scalars['Int']>;
	days?: Maybe<Scalars['Int']>;
};

export type UpdateByFilterDateTimeInput = {
	set?: Maybe<Scalars['String']>;
	add?: Maybe<UpdateByFilterDateTimePartsInput>;
	sub?: Maybe<UpdateByFilterDateTimePartsInput>;
};

export type UpdateByFilterDateTimePartsInput = {
	years?: Maybe<Scalars['Int']>;
	months?: Maybe<Scalars['Int']>;
	days?: Maybe<Scalars['Int']>;
	hours?: Maybe<Scalars['Int']>;
	minutes?: Maybe<Scalars['Int']>;
	seconds?: Maybe<Scalars['Int']>;
	microseconds?: Maybe<Scalars['Int']>;
};

export type UpdateByFilterFloatInput = {
	add?: Maybe<Scalars['Float']>;
	sub?: Maybe<Scalars['Float']>;
	mult?: Maybe<Scalars['Float']>;
	div?: Maybe<Scalars['Float']>;
	mod?: Maybe<Scalars['Float']>;
	set?: Maybe<Scalars['Float']>;
	pow?: Maybe<Scalars['Float']>;
	sqrt?: Maybe<Scalars['Boolean']>;
	prec?: Maybe<Scalars['Int']>;
};

export type UpdateByFilterIntInput = {
	add?: Maybe<Scalars['Int']>;
	sub?: Maybe<Scalars['Int']>;
	mult?: Maybe<Scalars['Int']>;
	div?: Maybe<Scalars['Int']>;
	mod?: Maybe<Scalars['Int']>;
	set?: Maybe<Scalars['Int']>;
	pow?: Maybe<Scalars['Int']>;
	sqrt?: Maybe<Scalars['Boolean']>;
	prec?: Maybe<Scalars['Int']>;
};

export type UpdateByFilterJsonInput = {
	set?: Maybe<Scalars['JSON']>;
};

export type UpdateByFilterListIntInput = {
	set?: Maybe<Array<Maybe<Scalars['Int']>>>;
	push?: Maybe<Array<Maybe<Scalars['Int']>>>;
	unshift?: Maybe<Array<Maybe<Scalars['Int']>>>;
	insert?: Maybe<UpdateByFilterListIntInsertOperationInput>;
	remove?: Maybe<Array<Maybe<Scalars['Int']>>>;
	swap?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type UpdateByFilterListIntInsertOperationInput = {
	start: Scalars['Int'];
	values: Array<Scalars['Int']>;
};

export type UpdateByFilterListStringInput = {
	set?: Maybe<Array<Maybe<Scalars['String']>>>;
	push?: Maybe<Array<Maybe<Scalars['String']>>>;
	unshift?: Maybe<Array<Maybe<Scalars['String']>>>;
	insert?: Maybe<UpdateByFilterListStringInsertOperationInput>;
	remove?: Maybe<Array<Maybe<Scalars['Int']>>>;
	removeValue?: Maybe<Scalars['String']>;
	swap?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type UpdateByFilterListStringInsertOperationInput = {
	start: Scalars['Int'];
	values: Array<Scalars['String']>;
};

export type UpdateByFilterStringInput = {
	prefix?: Maybe<Scalars['String']>;
	postfix?: Maybe<Scalars['String']>;
	set?: Maybe<Scalars['String']>;
};

export type UpdateByFilterStringSwitchInput = {
	set?: Maybe<Scalars['String']>;
};

/** UpdatedFieldsFilter */
export type UpdatedFieldsFilter = {
	contains?: Maybe<Array<Maybe<Scalars['String']>>>;
	every?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type User = {
	__typename?: 'User';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	email?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	origin?: Maybe<Scalars['String']>;
	is8base?: Maybe<Scalars['Boolean']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	avatar?: Maybe<File>;
	roles?: Maybe<RoleListResponse>;
	projects?: Maybe<ProjectListResponse>;
	jobTitle?: Maybe<Scalars['String']>;
	/** User setting to allow product updates to be sent to their email. */
	productNotifications?: Maybe<Scalars['Boolean']>;
	learningMode?: Maybe<Scalars['Boolean']>;
	permissions?: Maybe<UserPermissionList>;
	_description?: Maybe<Scalars['String']>;
};

export type UserRolesArgs = {
	filter?: Maybe<RoleFilter>;
	orderBy?: Maybe<Array<Maybe<RoleOrderBy>>>;
	sort?: Maybe<Array<RoleSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<RoleGroupBy>;
};

export type UserProjectsArgs = {
	filter?: Maybe<ProjectFilter>;
	orderBy?: Maybe<Array<Maybe<ProjectOrderBy>>>;
	sort?: Maybe<Array<ProjectSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ProjectGroupBy>;
};

export type UserPermissionsArgs = {
	filter?: Maybe<PermissionInputFilter>;
};

export type User_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	email?: Maybe<StringPredicate>;
	status?: Maybe<StringPredicate>;
	origin?: Maybe<StringPredicate>;
	is8base?: Maybe<BoolPredicate>;
	firstName?: Maybe<StringPredicate>;
	lastName?: Maybe<StringPredicate>;
	timezone?: Maybe<StringPredicate>;
	jobTitle?: Maybe<StringPredicate>;
	productNotifications?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	is_self?: Maybe<Scalars['Boolean']>;
	not_self?: Maybe<Scalars['Boolean']>;
	createdBy?: Maybe<User_PermissionFilter>;
	avatar?: Maybe<File_PermissionFilter>;
	roles?: Maybe<Role_PermissionRelationFilter>;
	projects?: Maybe<Project_PermissionRelationFilter>;
	AND?: Maybe<Array<User_PermissionFilter>>;
	OR?: Maybe<Array<User_PermissionFilter>>;
};

export type User_PermissionRelationFilter = {
	some?: Maybe<User_PermissionFilter>;
	every?: Maybe<User_PermissionFilter>;
	none?: Maybe<User_PermissionFilter>;
};

export type UserBillingConfigurationResponse = {
	__typename?: 'UserBillingConfigurationResponse';
	isFreePlanAvailable: Scalars['Boolean'];
	isCancelSubscriptionAvailable: Scalars['Boolean'];
	availablePlans: Array<BillingPlanBaseInfo>;
};

/** Users create input */
export type UserCreateInput = {
	email: Scalars['String'];
	status?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	avatar?: Maybe<UsersAvatarRelationInput>;
	roles?: Maybe<UsersRolesRelationInput>;
	projects?: Maybe<UsersProjectsRelationInput>;
	jobTitle?: Maybe<Scalars['String']>;
	/** User setting to allow product updates to be sent to their email. */
	productNotifications?: Maybe<Scalars['Boolean']>;
};

/** Users create many input */
export type UserCreateManyInput = {
	email: Scalars['String'];
	status?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	avatar?: Maybe<UsersAvatarManyRelationInput>;
	roles?: Maybe<UsersRolesManyRelationInput>;
	projects?: Maybe<UsersProjectsManyRelationInput>;
	jobTitle?: Maybe<Scalars['String']>;
	/** User setting to allow product updates to be sent to their email. */
	productNotifications?: Maybe<Scalars['Boolean']>;
};

/** Users delete input */
export type UserDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** UserFieldsPermissions create input */
export type UserFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	email?: Maybe<Scalars['Boolean']>;
	status?: Maybe<Scalars['Boolean']>;
	origin?: Maybe<Scalars['Boolean']>;
	is8base?: Maybe<Scalars['Boolean']>;
	firstName?: Maybe<Scalars['Boolean']>;
	lastName?: Maybe<Scalars['Boolean']>;
	timezone?: Maybe<Scalars['Boolean']>;
	jobTitle?: Maybe<Scalars['Boolean']>;
	productNotifications?: Maybe<Scalars['Boolean']>;
};

export type UserFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	email?: Maybe<StringPredicate>;
	status?: Maybe<StringPredicate>;
	origin?: Maybe<StringPredicate>;
	is8base?: Maybe<BoolPredicate>;
	firstName?: Maybe<StringPredicate>;
	lastName?: Maybe<StringPredicate>;
	timezone?: Maybe<StringPredicate>;
	jobTitle?: Maybe<StringPredicate>;
	productNotifications?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	is_self?: Maybe<Scalars['Boolean']>;
	not_self?: Maybe<Scalars['Boolean']>;
	createdBy?: Maybe<UserFilter>;
	avatar?: Maybe<FileFilter>;
	roles?: Maybe<RoleRelationFilter>;
	projects?: Maybe<ProjectRelationFilter>;
	AND?: Maybe<Array<UserFilter>>;
	OR?: Maybe<Array<UserFilter>>;
};

export type UserGroupBy = {
	query: UserGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type UserGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	email?: Maybe<Array<GroupByField>>;
	status?: Maybe<Array<GroupByField>>;
	origin?: Maybe<Array<GroupByField>>;
	is8base?: Maybe<Array<GroupByField>>;
	firstName?: Maybe<Array<GroupByField>>;
	lastName?: Maybe<Array<GroupByField>>;
	timezone?: Maybe<Array<GroupByField>>;
	jobTitle?: Maybe<Array<GroupByField>>;
	productNotifications?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	avatar?: Maybe<FileGroupByQuery>;
	roles?: Maybe<RoleGroupByQuery>;
	projects?: Maybe<ProjectGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

/** Invitation Details */
export type UserInvitationDetails = {
	__typename?: 'UserInvitationDetails';
	uuid?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	isRegistered?: Maybe<Scalars['Boolean']>;
	invitedBy?: Maybe<InvitedByName>;
};

/** User Invitation List */
export type UserInvitationList = {
	__typename?: 'UserInvitationList';
	items?: Maybe<Array<Maybe<UserInvitationDetails>>>;
	count?: Maybe<Scalars['Int']>;
};

export type UserKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	email?: Maybe<Scalars['String']>;
};

/** UserListResponse output */
export type UserListResponse = {
	__typename?: 'UserListResponse';
	/** List items */
	items: Array<User>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** UserLoginInput */
export type UserLoginInput = {
	email: Scalars['String'];
	password: Scalars['String'];
	fromInvitation?: Maybe<Scalars['String']>;
	authProfileId?: Maybe<Scalars['ID']>;
};

/** UserManyResponse output */
export type UserManyResponse = {
	__typename?: 'UserManyResponse';
	/** List items */
	items: Array<User>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum UserOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	EmailAsc = 'email_ASC',
	EmailDesc = 'email_DESC',
	StatusAsc = 'status_ASC',
	StatusDesc = 'status_DESC',
	OriginAsc = 'origin_ASC',
	OriginDesc = 'origin_DESC',
	IsOwnerAsc = 'isOwner_ASC',
	IsOwnerDesc = 'isOwner_DESC',
	Is8baseAsc = 'is8base_ASC',
	Is8baseDesc = 'is8base_DESC',
	FirstNameAsc = 'firstName_ASC',
	FirstNameDesc = 'firstName_DESC',
	LastNameAsc = 'lastName_ASC',
	LastNameDesc = 'lastName_DESC',
	TimezoneAsc = 'timezone_ASC',
	TimezoneDesc = 'timezone_DESC',
	JobTitleAsc = 'jobTitle_ASC',
	JobTitleDesc = 'jobTitle_DESC',
	ProductNotificationsAsc = 'productNotifications_ASC',
	ProductNotificationsDesc = 'productNotifications_DESC',
}

/** Users subscription payload */
export type UserPayload = {
	__typename?: 'UserPayload';
	mutation: MutationType;
	node?: Maybe<User>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<User>;
};

/** User Permission */
export type UserPermission = {
	__typename?: 'UserPermission';
	resourceType?: Maybe<Scalars['String']>;
	resource?: Maybe<Scalars['String']>;
	permission?: Maybe<Scalars['JSON']>;
};

/** User Permission List */
export type UserPermissionList = {
	__typename?: 'UserPermissionList';
	items?: Maybe<Array<UserPermission>>;
	count: Scalars['Int'];
};

export type UserRelationFilter = {
	some?: Maybe<UserFilter>;
	every?: Maybe<UserFilter>;
	none?: Maybe<UserFilter>;
};

/** Files create input from users_avatar */
export type Users_Avatar_FileCreateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
};

/** Files update input from users_avatar */
export type Users_Avatar_FileUpdateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarUpdateRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarUpdateRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarUpdateRelationInput>;
	recording_video?: Maybe<FilesRecording_VideoUpdateRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
};

/** Roles create input from users */
export type Users_RoleCreateInput = {
	name: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	users?: Maybe<RolesUsersRelationInput>;
	permissions?: Maybe<PermissionsInput>;
	apiTokens?: Maybe<RolesApiTokensRelationInput>;
	authenticationProfiles?: Maybe<RolesAuthenticationProfilesRelationInput>;
	teamMembers?: Maybe<RolesTeamMembersRelationInput>;
};

/** Roles update input from users */
export type Users_RoleUpdateInput = {
	filter?: Maybe<RoleKeyFilter>;
	data: RoleUpdateInput;
};

/** Users relation input */
export type UsersAvatarManyRelationInput = {
	connect?: Maybe<FileKeyFilter>;
};

/** Users relation input */
export type UsersAvatarRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	create?: Maybe<Users_Avatar_FileCreateInput>;
};

/** Users relation input */
export type UsersAvatarUpdateRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	disconnect?: Maybe<FileKeyFilter>;
	reconnect?: Maybe<FileKeyFilter>;
	create?: Maybe<Users_Avatar_FileCreateInput>;
	update?: Maybe<Users_Avatar_FileUpdateInput>;
};

export type UserSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	email?: Maybe<SortOrder>;
	status?: Maybe<SortOrder>;
	origin?: Maybe<SortOrder>;
	is8base?: Maybe<SortOrder>;
	firstName?: Maybe<SortOrder>;
	lastName?: Maybe<SortOrder>;
	timezone?: Maybe<SortOrder>;
	jobTitle?: Maybe<SortOrder>;
	productNotifications?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	avatar?: Maybe<FileSort>;
};

/** Users relation input */
export type UsersProjectsManyRelationInput = {
	connect?: Maybe<Array<ProjectKeyFilter>>;
};

/** Users relation input */
export type UsersProjectsRelationInput = {
	connect?: Maybe<Array<ProjectKeyFilter>>;
	create?: Maybe<Array<Maybe<Members_ProjectCreateInput>>>;
};

/** Users relation input */
export type UsersProjectsUpdateRelationInput = {
	connect?: Maybe<Array<ProjectKeyFilter>>;
	disconnect?: Maybe<Array<ProjectKeyFilter>>;
	reconnect?: Maybe<Array<ProjectKeyFilter>>;
	create?: Maybe<Array<Maybe<Members_ProjectCreateInput>>>;
	update?: Maybe<Array<Maybe<Members_ProjectUpdateInput>>>;
};

/** Users relation input */
export type UsersRolesManyRelationInput = {
	connect?: Maybe<Array<RoleKeyFilter>>;
};

/** Users relation input */
export type UsersRolesRelationInput = {
	connect?: Maybe<Array<RoleKeyFilter>>;
	create?: Maybe<Array<Maybe<Users_RoleCreateInput>>>;
};

/** Users relation input */
export type UsersRolesUpdateRelationInput = {
	connect?: Maybe<Array<RoleKeyFilter>>;
	disconnect?: Maybe<Array<RoleKeyFilter>>;
	reconnect?: Maybe<Array<RoleKeyFilter>>;
	create?: Maybe<Array<Maybe<Users_RoleCreateInput>>>;
	update?: Maybe<Array<Maybe<Users_RoleUpdateInput>>>;
};

/** Project create input from userStories */
export type UserStories_ProjectCreateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarRelationInput>;
	release?: Maybe<ProjectReleaseRelationInput>;
	configuration?: Maybe<ProjectConfigurationRelationInput>;
	integration?: Maybe<ProjectIntegrationRelationInput>;
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsRelationInput>;
};

/** Project update input from userStories */
export type UserStories_ProjectUpdateInput = {
	/**
	 * The name for a product being tested on Meeshkan. We suggest this corresponds
	 * with the repository name especially if you'll have many.
	 */
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<ProjectAvatarUpdateRelationInput>;
	release?: Maybe<ProjectReleaseUpdateRelationInput>;
	configuration?: Maybe<ProjectConfigurationUpdateRelationInput>;
	integration?: Maybe<ProjectIntegrationUpdateRelationInput>;
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

/** User stories are the representation of what users do in a project's production environment. */
export type UserStory = {
	__typename?: 'UserStory';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	/**
	 * The user flows that make up a user story. The first recording in the index
	 * should be the main 'expected' flow, with subsequent recordings signifying buggy flows.
	 */
	recording?: Maybe<Recording>;
	testOutcome?: Maybe<TestOutcomeListResponse>;
	project?: Maybe<Project>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<Configuration>;
	_description?: Maybe<Scalars['String']>;
};

/** User stories are the representation of what users do in a project's production environment. */
export type UserStoryTestOutcomeArgs = {
	filter?: Maybe<TestOutcomeFilter>;
	orderBy?: Maybe<Array<Maybe<TestOutcomeOrderBy>>>;
	sort?: Maybe<Array<TestOutcomeSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<TestOutcomeGroupBy>;
};

export type UserStory_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	title?: Maybe<StringPredicate>;
	description?: Maybe<StringPredicate>;
	isTestCase?: Maybe<BoolPredicate>;
	testCreatedDate?: Maybe<DateTimePredicate>;
	isExpected?: Maybe<BoolPredicate>;
	significance?: Maybe<StringPredicate>;
	isAuthenticated?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	recording?: Maybe<Recording_PermissionFilter>;
	testOutcome?: Maybe<TestOutcome_PermissionRelationFilter>;
	project?: Maybe<Project_PermissionFilter>;
	configuration?: Maybe<Configuration_PermissionFilter>;
	AND?: Maybe<Array<UserStory_PermissionFilter>>;
	OR?: Maybe<Array<UserStory_PermissionFilter>>;
};

export type UserStory_PermissionRelationFilter = {
	some?: Maybe<UserStory_PermissionFilter>;
	every?: Maybe<UserStory_PermissionFilter>;
	none?: Maybe<UserStory_PermissionFilter>;
};

/** Recording create input from userStory */
export type UserStory_RecordingCreateInput = {
	environment?: Maybe<RecordingEnvironmentRelationInput>;
	userStory?: Maybe<RecordingUserStoryRelationInput>;
	video?: Maybe<RecordingVideoRelationInput>;
	seleniumScript: RecordingSeleniumScriptRelationInput;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

/** Recording update input from userStory */
export type UserStory_RecordingUpdateInput = {
	environment?: Maybe<RecordingEnvironmentUpdateRelationInput>;
	userStory?: Maybe<RecordingUserStoryUpdateRelationInput>;
	video?: Maybe<RecordingVideoUpdateRelationInput>;
	seleniumScript?: Maybe<RecordingSeleniumScriptUpdateRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

/** TestOutcome create input from userStory */
export type UserStory_TestOutcomeCreateInput = {
	userStory?: Maybe<TestOutcomeUserStoryRelationInput>;
	/** Has the bug been resolved? */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunRelationInput>;
	video?: Maybe<TestOutcomeVideoRelationInput>;
	errorDetails?: Maybe<TestOutcomeErrorDetailsRelationInput>;
};

/** TestOutcome update input from userStory */
export type UserStory_TestOutcomeUpdateInput = {
	filter?: Maybe<TestOutcomeKeyFilter>;
	data: TestOutcomeUpdateInput;
};

/** UserStory relation input */
export type UserStoryConfigurationManyRelationInput = {
	connect?: Maybe<ConfigurationKeyFilter>;
};

/** UserStory relation input */
export type UserStoryConfigurationRelationInput = {
	connect?: Maybe<ConfigurationKeyFilter>;
	create?: Maybe<LogInFlow_ConfigurationCreateInput>;
};

/** UserStory relation input */
export type UserStoryConfigurationUpdateRelationInput = {
	connect?: Maybe<ConfigurationKeyFilter>;
	disconnect?: Maybe<ConfigurationKeyFilter>;
	reconnect?: Maybe<ConfigurationKeyFilter>;
	create?: Maybe<LogInFlow_ConfigurationCreateInput>;
	update?: Maybe<LogInFlow_ConfigurationUpdateInput>;
};

/** UserStory create input */
export type UserStoryCreateInput = {
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Scalars['String']>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationRelationInput>;
};

/** UserStory create many input */
export type UserStoryCreateManyInput = {
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Scalars['String']>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingManyRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeManyRelationInput>;
	project: UserStoryProjectManyRelationInput;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationManyRelationInput>;
};

/** UserStory delete input */
export type UserStoryDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** UserStoryFieldsPermissions create input */
export type UserStoryFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	title?: Maybe<Scalars['Boolean']>;
	description?: Maybe<Scalars['Boolean']>;
	isTestCase?: Maybe<Scalars['Boolean']>;
	testCreatedDate?: Maybe<Scalars['Boolean']>;
	flowIDs?: Maybe<Scalars['Boolean']>;
	created?: Maybe<Scalars['Boolean']>;
	isExpected?: Maybe<Scalars['Boolean']>;
	significance?: Maybe<Scalars['Boolean']>;
	isAuthenticated?: Maybe<Scalars['Boolean']>;
};

export type UserStoryFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	title?: Maybe<StringPredicate>;
	description?: Maybe<StringPredicate>;
	isTestCase?: Maybe<BoolPredicate>;
	testCreatedDate?: Maybe<DateTimePredicate>;
	isExpected?: Maybe<BoolPredicate>;
	significance?: Maybe<StringPredicate>;
	isAuthenticated?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	recording?: Maybe<RecordingFilter>;
	testOutcome?: Maybe<TestOutcomeRelationFilter>;
	project?: Maybe<ProjectFilter>;
	configuration?: Maybe<ConfigurationFilter>;
	AND?: Maybe<Array<UserStoryFilter>>;
	OR?: Maybe<Array<UserStoryFilter>>;
};

export type UserStoryGroupBy = {
	query: UserStoryGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type UserStoryGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	title?: Maybe<Array<GroupByField>>;
	description?: Maybe<Array<GroupByField>>;
	isTestCase?: Maybe<Array<GroupByField>>;
	testCreatedDate?: Maybe<Array<GroupByField>>;
	flowIDs?: Maybe<Array<GroupByField>>;
	created?: Maybe<Array<GroupByField>>;
	isExpected?: Maybe<Array<GroupByField>>;
	significance?: Maybe<Array<GroupByField>>;
	isAuthenticated?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	recording?: Maybe<RecordingGroupByQuery>;
	testOutcome?: Maybe<TestOutcomeGroupByQuery>;
	project?: Maybe<ProjectGroupByQuery>;
	configuration?: Maybe<ConfigurationGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type UserStoryKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** UserStoryListResponse output */
export type UserStoryListResponse = {
	__typename?: 'UserStoryListResponse';
	/** List items */
	items: Array<UserStory>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** UserStoryManyResponse output */
export type UserStoryManyResponse = {
	__typename?: 'UserStoryManyResponse';
	/** List items */
	items: Array<UserStory>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum UserStoryOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	TitleAsc = 'title_ASC',
	TitleDesc = 'title_DESC',
	DescriptionAsc = 'description_ASC',
	DescriptionDesc = 'description_DESC',
	IsTestCaseAsc = 'isTestCase_ASC',
	IsTestCaseDesc = 'isTestCase_DESC',
	TestCreatedDateAsc = 'testCreatedDate_ASC',
	TestCreatedDateDesc = 'testCreatedDate_DESC',
	IsExpectedAsc = 'isExpected_ASC',
	IsExpectedDesc = 'isExpected_DESC',
	SignificanceAsc = 'significance_ASC',
	SignificanceDesc = 'significance_DESC',
	IsAuthenticatedAsc = 'isAuthenticated_ASC',
	IsAuthenticatedDesc = 'isAuthenticated_DESC',
}

/** UserStory subscription payload */
export type UserStoryPayload = {
	__typename?: 'UserStoryPayload';
	mutation: MutationType;
	node?: Maybe<UserStory>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<UserStory>;
};

/** UserStory relation input */
export type UserStoryProjectManyRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
};

/** UserStory relation input */
export type UserStoryProjectRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<UserStories_ProjectCreateInput>;
};

/** UserStory relation input */
export type UserStoryProjectUpdateRelationInput = {
	connect?: Maybe<ProjectKeyFilter>;
	disconnect?: Maybe<ProjectKeyFilter>;
	reconnect?: Maybe<ProjectKeyFilter>;
	create?: Maybe<UserStories_ProjectCreateInput>;
	update?: Maybe<UserStories_ProjectUpdateInput>;
};

/** UserStory relation input */
export type UserStoryRecordingManyRelationInput = {
	connect?: Maybe<RecordingKeyFilter>;
};

/** UserStory relation input */
export type UserStoryRecordingRelationInput = {
	connect?: Maybe<RecordingKeyFilter>;
	create?: Maybe<UserStory_RecordingCreateInput>;
};

/** UserStory relation input */
export type UserStoryRecordingUpdateRelationInput = {
	connect?: Maybe<RecordingKeyFilter>;
	disconnect?: Maybe<RecordingKeyFilter>;
	reconnect?: Maybe<RecordingKeyFilter>;
	create?: Maybe<UserStory_RecordingCreateInput>;
	update?: Maybe<UserStory_RecordingUpdateInput>;
};

export type UserStoryRelationFilter = {
	some?: Maybe<UserStoryFilter>;
	every?: Maybe<UserStoryFilter>;
	none?: Maybe<UserStoryFilter>;
};

export type UserStorySort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	title?: Maybe<SortOrder>;
	description?: Maybe<SortOrder>;
	isTestCase?: Maybe<SortOrder>;
	testCreatedDate?: Maybe<SortOrder>;
	isExpected?: Maybe<SortOrder>;
	significance?: Maybe<SortOrder>;
	isAuthenticated?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	recording?: Maybe<RecordingSort>;
	project?: Maybe<ProjectSort>;
	configuration?: Maybe<ConfigurationSort>;
};

/** UserStory subscription filter */
export type UserStorySubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<UserStoryFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** UserStory relation input */
export type UserStoryTestOutcomeManyRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
};

/** UserStory relation input */
export type UserStoryTestOutcomeRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
	create?: Maybe<Array<Maybe<UserStory_TestOutcomeCreateInput>>>;
};

/** UserStory relation input */
export type UserStoryTestOutcomeUpdateRelationInput = {
	connect?: Maybe<Array<TestOutcomeKeyFilter>>;
	disconnect?: Maybe<Array<TestOutcomeKeyFilter>>;
	reconnect?: Maybe<Array<TestOutcomeKeyFilter>>;
	create?: Maybe<Array<Maybe<UserStory_TestOutcomeCreateInput>>>;
	update?: Maybe<Array<Maybe<UserStory_TestOutcomeUpdateInput>>>;
};

/** UserStory update input */
export type UserStoryUpdateByFilterInput = {
	title?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	description?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	isTestCase?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	testCreatedDate?: Maybe<Array<Maybe<UpdateByFilterDateTimeInput>>>;
	flowIDs?: Maybe<Array<Maybe<UpdateByFilterListIntInput>>>;
	created?: Maybe<Array<Maybe<UpdateByFilterListStringInput>>>;
	isExpected?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	significance?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	isAuthenticated?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
};

/** UserStory update input */
export type UserStoryUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/** The human readable title of a user story describes what the flow does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/**
	 * A list of flow (same user actions in the same order) ids that are grouped
	 * together. Answers the question "How many of my users are doing this?"
	 */
	flowIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/** Marks the significance of a user story for calculation of the confidence score and weight of choices. */
	significance?: Maybe<Scalars['String']>;
	recording?: Maybe<UserStoryRecordingUpdateRelationInput>;
	testOutcome?: Maybe<UserStoryTestOutcomeUpdateRelationInput>;
	project?: Maybe<UserStoryProjectUpdateRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `isAuthenticated` is marking a test as needing to be logged in
	 * to complete the set of actions in the user story.
	 */
	isAuthenticated?: Maybe<Scalars['Boolean']>;
	configuration?: Maybe<UserStoryConfigurationUpdateRelationInput>;
};

/** Users subscription filter */
export type UserSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<UserFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Users update input */
export type UserUpdateByFilterInput = {
	email?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	status?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	origin?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	isOwner?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	is8base?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	firstName?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	lastName?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	timezone?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	jobTitle?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	productNotifications?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
};

/** Users update input */
export type UserUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	email?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	timezone?: Maybe<Scalars['String']>;
	avatar?: Maybe<UsersAvatarUpdateRelationInput>;
	roles?: Maybe<UsersRolesUpdateRelationInput>;
	projects?: Maybe<UsersProjectsUpdateRelationInput>;
	jobTitle?: Maybe<Scalars['String']>;
	/** User setting to allow product updates to be sent to their email. */
	productNotifications?: Maybe<Scalars['Boolean']>;
};

/** UUID Field Attributes */
export type UuidFieldTypeAttributes = {
	__typename?: 'UUIDFieldTypeAttributes';
	fieldSize?: Maybe<Scalars['Int']>;
};

/** SeleniumSetViewportSize create input from value */
export type Value_SeleniumSetViewportSizeCreateInput = {
	value?: Maybe<SeleniumSetViewportSizeValueRelationInput>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeSetViewportSizeRelationInput>;
};

/** SeleniumSetViewportSize update input from value */
export type Value_SeleniumSetViewportSizeUpdateInput = {
	value?: Maybe<SeleniumSetViewportSizeValueUpdateRelationInput>;
	setViewportSize?: Maybe<SeleniumSetViewportSizeSetViewportSizeUpdateRelationInput>;
};

/** VerificationEmailResendInput */
export type VerificationEmailResendInput = {
	email: Scalars['String'];
};

/** Recording create input from video */
export type Video_RecordingCreateInput = {
	environment?: Maybe<RecordingEnvironmentRelationInput>;
	userStory?: Maybe<RecordingUserStoryRelationInput>;
	video?: Maybe<RecordingVideoRelationInput>;
	seleniumScript: RecordingSeleniumScriptRelationInput;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	seleniumScriptJson?: Maybe<Scalars['JSON']>;
	/**
	 * The number of expected commands in a recording. If the story has less than
	 * this after a certain amount of time, we can deem it to be an error. Currently
	 * an experimental field in our quest to find the best way to report progress of
	 * user story creation to our clients.
	 */
	nExpectedCommands?: Maybe<Scalars['Int']>;
};

/** Recording update input from video */
export type Video_RecordingUpdateInput = {
	filter?: Maybe<RecordingKeyFilter>;
	data: RecordingUpdateInput;
};

/** TestOutcome create input from video */
export type Video_TestOutcomeCreateInput = {
	userStory?: Maybe<TestOutcomeUserStoryRelationInput>;
	/** Has the bug been resolved? */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunRelationInput>;
	video?: Maybe<TestOutcomeVideoRelationInput>;
	errorDetails?: Maybe<TestOutcomeErrorDetailsRelationInput>;
};

/** TestOutcome update input from video */
export type Video_TestOutcomeUpdateInput = {
	filter?: Maybe<TestOutcomeKeyFilter>;
	data: TestOutcomeUpdateInput;
};

/** View Attributes */
export type ViewAttributes = {
	__typename?: 'ViewAttributes';
	query?: Maybe<Scalars['String']>;
};

/** View Create Input */
export type ViewCreateInput = {
	name: Scalars['String'];
	displayName?: Maybe<Scalars['String']>;
	query: Scalars['String'];
	description?: Maybe<Scalars['String']>;
};

/** View Update Input */
export type ViewUpdateInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
	query?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
};

/** WorkspaceCreateMutationInput */
export type WorkspaceCreateMutationInput = {
	name: Scalars['String'];
	image?: Maybe<GraphQlCreateFileItemInput>;
	billingPlanId?: Maybe<Scalars['ID']>;
	organizationId?: Maybe<Scalars['ID']>;
	kind?: Maybe<WorkspaceKind>;
};

export type WorkspaceCreateResponse = {
	__typename?: 'WorkspaceCreateResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	kind?: Maybe<Scalars['String']>;
};

/** WorkspaceDeleteMutationInput */
export type WorkspaceDeleteMutationInput = {
	id: Scalars['ID'];
};

export type WorkspaceImage = {
	__typename?: 'WorkspaceImage';
	id?: Maybe<Scalars['String']>;
	downloadUrl?: Maybe<Scalars['String']>;
};

/** LoginResponseWorkspace name and id */
export type WorkspaceInfo = {
	__typename?: 'WorkspaceInfo';
	workspace?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
};

export type WorkspaceItem = {
	__typename?: 'WorkspaceItem';
	id: Scalars['ID'];
	name: Scalars['String'];
	isOwner: Scalars['Boolean'];
	plan?: Maybe<BillingCurrentPlanResponse>;
	nextPlan?: Maybe<BillingNextPlanResponse>;
	lastAccess?: Maybe<Scalars['DateTime']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	teamMemberCount?: Maybe<Scalars['Int']>;
	region?: Maybe<Scalars['String']>;
	owner?: Maybe<SystemUserAccountInfo>;
	image?: Maybe<WorkspaceImage>;
	isCiCdEnabled?: Maybe<Scalars['Boolean']>;
	apiHost?: Maybe<Scalars['String']>;
	webSocket?: Maybe<Scalars['String']>;
	organization?: Maybe<SystemOrganizationBaseItem>;
	kind?: Maybe<Scalars['String']>;
};

/** Workspace Kind */
export enum WorkspaceKind {
	Frontend = 'frontend',
	General = 'general',
}

/** WorkspaceListResponse output */
export type WorkspaceListResponse = {
	__typename?: 'WorkspaceListResponse';
	/** List items */
	items: Array<WorkspaceItem>;
	/** List items count */
	count: Scalars['Int'];
};

export enum WorkspaceStatus {
	Active = 'active',
	Blocked = 'blocked',
	Canceled = 'canceled',
	Suspended = 'suspended',
	Canceling = 'canceling',
	Pending = 'pending',
}

export type WorkspaceTransferItem = {
	__typename?: 'WorkspaceTransferItem';
	workspaceId: Scalars['String'];
	workspaceName: Scalars['String'];
	ownerEmail: Scalars['String'];
	ownerFirstName?: Maybe<Scalars['String']>;
	ownerLastName?: Maybe<Scalars['String']>;
	newOwnerEmail: Scalars['String'];
	newOwnerFirstName?: Maybe<Scalars['String']>;
	newOwnerLastName?: Maybe<Scalars['String']>;
	status: Scalars['String'];
};

/** WorkspaceUpdateMutationInput */
export type WorkspaceUpdateMutationInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	image?: Maybe<GraphQlCreateFileItemInput>;
};

export type WorkspaceUpdateResponse = {
	__typename?: 'WorkspaceUpdateResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	image?: Maybe<GraphQlFileItemResponse>;
};
