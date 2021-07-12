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
	/** A headline of what happened/changed. */
	title?: Maybe<Scalars['String']>;
	/** When did this activity happen? */
	dateTime?: Maybe<Scalars['Date']>;
	project?: Maybe<Project>;
	/** Up to 1000 characters of detail about what happened /changed. */
	description?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

export type Activity_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	title?: Maybe<StringPredicate>;
	dateTime?: Maybe<DatePredicate>;
	description?: Maybe<StringPredicate>;
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
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

/** Activity create input */
export type ActivityCreateInput = {
	/** A headline of what happened/changed. */
	title: Scalars['String'];
	/** When did this activity happen? */
	dateTime: Scalars['Date'];
	project: ActivityProjectRelationInput;
	/** Up to 1000 characters of detail about what happened /changed. */
	description?: Maybe<Scalars['String']>;
};

/** Activity create many input */
export type ActivityCreateManyInput = {
	/** A headline of what happened/changed. */
	title: Scalars['String'];
	/** When did this activity happen? */
	dateTime: Scalars['Date'];
	project: ActivityProjectManyRelationInput;
	/** Up to 1000 characters of detail about what happened /changed. */
	description?: Maybe<Scalars['String']>;
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
	description?: Maybe<Scalars['Boolean']>;
};

export type ActivityFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	title?: Maybe<StringPredicate>;
	dateTime?: Maybe<DatePredicate>;
	description?: Maybe<StringPredicate>;
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
	description?: Maybe<Array<GroupByField>>;
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
	DescriptionAsc = 'description_ASC',
	DescriptionDesc = 'description_DESC',
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
	description?: Maybe<SortOrder>;
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
	description?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** Activity update input */
export type ActivityUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/** A headline of what happened/changed. */
	title?: Maybe<Scalars['String']>;
	/** When did this activity happen? */
	dateTime?: Maybe<Scalars['Date']>;
	project?: Maybe<ActivityProjectUpdateRelationInput>;
	/** Up to 1000 characters of detail about what happened /changed. */
	description?: Maybe<Scalars['String']>;
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
	/**
	 * What type of authentication token is this storing? Options are: `cookie` or
	 * `local storage` with the default being `cookie`.
	 */
	type?: Maybe<Scalars['String']>;
	/** The key or name defining this token. */
	key?: Maybe<Scalars['String']>;
	/** What is the value of this token? */
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
	/**
	 * What type of authentication token is this storing? Options are: `cookie` or
	 * `local storage` with the default being `cookie`.
	 */
	type?: Maybe<Scalars['String']>;
	/** The key or name defining this token. */
	key: Scalars['String'];
	/** What is the value of this token? */
	value?: Maybe<Scalars['String']>;
	configuration?: Maybe<AuthenticationTokenConfigurationRelationInput>;
};

/** AuthenticationToken create many input */
export type AuthenticationTokenCreateManyInput = {
	/**
	 * What type of authentication token is this storing? Options are: `cookie` or
	 * `local storage` with the default being `cookie`.
	 */
	type?: Maybe<Scalars['String']>;
	/** The key or name defining this token. */
	key: Scalars['String'];
	/** What is the value of this token? */
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
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink: Scalars['String'];
	project?: Maybe<ConfigurationProjectRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensRelationInput>;
	logInStory?: Maybe<ConfigurationLogInStoryRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
};

/** Configuration update input from authenticationTokens */
export type AuthenticationTokens_ConfigurationUpdateInput = {
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<ConfigurationProjectUpdateRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensUpdateRelationInput>;
	logInStory?: Maybe<ConfigurationLogInStoryUpdateRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
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
	/**
	 * What type of authentication token is this storing? Options are: `cookie` or
	 * `local storage` with the default being `cookie`.
	 */
	type?: Maybe<Scalars['String']>;
	/** The key or name defining this token. */
	key?: Maybe<Scalars['String']>;
	/** What is the value of this token? */
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
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	/** What is the job title of this individual? */
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
	plan?: Maybe<BillingInvoiceItemPlanInfo>;
	workspace?: Maybe<BillingInvoiceItemWorkspaceInfo>;
};

export type BillingInvoiceItemPlanInfo = {
	__typename?: 'BillingInvoiceItemPlanInfo';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
};

export type BillingInvoiceItemWorkspaceInfo = {
	__typename?: 'BillingInvoiceItemWorkspaceInfo';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
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

/** Authentication Profile Attributes for Cognito */
export type CognitoAuthProfileAttributes = {
	__typename?: 'CognitoAuthProfileAttributes';
	clientAuthDomain?: Maybe<Scalars['String']>;
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
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<Project>;
	/**
	 * A one configuration to many Authentication tokens relation. Authentication
	 * tokens represent one way to sign into a service to perform authenticated
	 * actions on their app.
	 */
	authenticationTokens?: Maybe<AuthenticationTokenListResponse>;
	/**
	 * This is the connection between a single user story and configuration that
	 * represents the 'logInStory'. Only one can be connected. `logInStory` is for
	 * the user story showing a user in the action of logging in and is prepended to
	 * tests requiring authentication, when present.
	 */
	logInStory?: Maybe<UserStory>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
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
	/**
	 * What type of authentication token is this storing? Options are: `cookie` or
	 * `local storage` with the default being `cookie`.
	 */
	type?: Maybe<Scalars['String']>;
	/** The key or name defining this token. */
	key: Scalars['String'];
	/** What is the value of this token? */
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
	hasScheduledCall?: Maybe<BoolPredicate>;
	clientSecret?: Maybe<StringPredicate>;
	runTestsConcurrently?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	project?: Maybe<Project_PermissionFilter>;
	authenticationTokens?: Maybe<AuthenticationToken_PermissionRelationFilter>;
	logInStory?: Maybe<UserStory_PermissionFilter>;
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
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
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
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink: Scalars['String'];
	project?: Maybe<ConfigurationProjectRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensRelationInput>;
	logInStory?: Maybe<ConfigurationLogInStoryRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
};

/** Configuration create many input */
export type ConfigurationCreateManyInput = {
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink: Scalars['String'];
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensManyRelationInput>;
	logInStory?: Maybe<ConfigurationLogInStoryManyRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
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
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	clientSecret?: Maybe<Scalars['Boolean']>;
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
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
	hasScheduledCall?: Maybe<BoolPredicate>;
	clientSecret?: Maybe<StringPredicate>;
	runTestsConcurrently?: Maybe<BoolPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	project?: Maybe<ProjectFilter>;
	authenticationTokens?: Maybe<AuthenticationTokenRelationFilter>;
	logInStory?: Maybe<UserStoryFilter>;
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
	hasScheduledCall?: Maybe<Array<GroupByField>>;
	clientSecret?: Maybe<Array<GroupByField>>;
	runTestsConcurrently?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	project?: Maybe<ProjectGroupByQuery>;
	authenticationTokens?: Maybe<AuthenticationTokenGroupByQuery>;
	logInStory?: Maybe<UserStoryGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type ConfigurationKeyFilter = {
	id?: Maybe<Scalars['ID']>;
	inviteLink?: Maybe<Scalars['String']>;
	clientSecret?: Maybe<Scalars['String']>;
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
export type ConfigurationLogInStoryManyRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
};

/** Configuration relation input */
export type ConfigurationLogInStoryRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<LogInStoryConfig_UserStoryCreateInput>;
};

/** Configuration relation input */
export type ConfigurationLogInStoryUpdateRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	disconnect?: Maybe<UserStoryKeyFilter>;
	reconnect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<LogInStoryConfig_UserStoryCreateInput>;
	update?: Maybe<LogInStoryConfig_UserStoryUpdateInput>;
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
	HasScheduledCallAsc = 'hasScheduledCall_ASC',
	HasScheduledCallDesc = 'hasScheduledCall_DESC',
	ClientSecretAsc = 'clientSecret_ASC',
	ClientSecretDesc = 'clientSecret_DESC',
	RunTestsConcurrentlyAsc = 'runTestsConcurrently_ASC',
	RunTestsConcurrentlyDesc = 'runTestsConcurrently_DESC',
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
	hasScheduledCall?: Maybe<SortOrder>;
	clientSecret?: Maybe<SortOrder>;
	runTestsConcurrently?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	project?: Maybe<ProjectSort>;
	logInStory?: Maybe<UserStorySort>;
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
	hasScheduledCall?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	clientSecret?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	runTestsConcurrently?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
};

/** Configuration update input */
export type ConfigurationUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<ConfigurationProjectUpdateRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensUpdateRelationInput>;
	logInStory?: Maybe<ConfigurationLogInStoryUpdateRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
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

export type EnvironmentBackupItem = {
	__typename?: 'EnvironmentBackupItem';
	name: Scalars['String'];
	size: Scalars['Float'];
};

export type EnvironmentItem = {
	__typename?: 'EnvironmentItem';
	id: Scalars['ID'];
	name: Scalars['String'];
};

/** EnvironmentSetupInput */
export type EnvironmentSetupInput = {
	deleteLock?: Maybe<Scalars['Boolean']>;
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
	testOutcome_video?: Maybe<TestOutcomeListResponse>;
	userStory_video?: Maybe<UserStoryListResponse>;
	flow_video?: Maybe<FlowListResponse>;
	previewUrl?: Maybe<Scalars['String']>;
	downloadStorageUrl?: Maybe<Scalars['String']>;
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

export type FileUserStory_VideoArgs = {
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

export type FileFlow_VideoArgs = {
	filter?: Maybe<FlowFilter>;
	orderBy?: Maybe<Array<Maybe<FlowOrderBy>>>;
	sort?: Maybe<Array<FlowSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<FlowGroupBy>;
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
	testOutcome_video?: Maybe<TestOutcome_PermissionRelationFilter>;
	userStory_video?: Maybe<UserStory_PermissionRelationFilter>;
	flow_video?: Maybe<Flow_PermissionRelationFilter>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoRelationInput>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoManyRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoManyRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoManyRelationInput>;
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
	testOutcome_video?: Maybe<TestOutcomeRelationFilter>;
	userStory_video?: Maybe<UserStoryRelationFilter>;
	flow_video?: Maybe<FlowRelationFilter>;
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
	testOutcome_video?: Maybe<TestOutcomeGroupByQuery>;
	userStory_video?: Maybe<UserStoryGroupByQuery>;
	flow_video?: Maybe<FlowGroupByQuery>;
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

/** Files relation input */
export type FilesFlow_VideoManyRelationInput = {
	connect?: Maybe<Array<FlowKeyFilter>>;
};

/** Files relation input */
export type FilesFlow_VideoRelationInput = {
	connect?: Maybe<Array<FlowKeyFilter>>;
	create?: Maybe<Array<Maybe<Video_FlowCreateInput>>>;
};

/** Files relation input */
export type FilesFlow_VideoUpdateRelationInput = {
	connect?: Maybe<Array<FlowKeyFilter>>;
	disconnect?: Maybe<Array<FlowKeyFilter>>;
	reconnect?: Maybe<Array<FlowKeyFilter>>;
	create?: Maybe<Array<Maybe<Video_FlowCreateInput>>>;
	update?: Maybe<Array<Maybe<Video_FlowUpdateInput>>>;
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

/** Files relation input */
export type FilesUserStory_VideoManyRelationInput = {
	connect?: Maybe<Array<UserStoryKeyFilter>>;
};

/** Files relation input */
export type FilesUserStory_VideoRelationInput = {
	connect?: Maybe<Array<UserStoryKeyFilter>>;
	create?: Maybe<Array<Maybe<Video_UserStoryCreateInput>>>;
};

/** Files relation input */
export type FilesUserStory_VideoUpdateRelationInput = {
	connect?: Maybe<Array<UserStoryKeyFilter>>;
	disconnect?: Maybe<Array<UserStoryKeyFilter>>;
	reconnect?: Maybe<Array<UserStoryKeyFilter>>;
	create?: Maybe<Array<Maybe<Video_UserStoryCreateInput>>>;
	update?: Maybe<Array<Maybe<Video_UserStoryUpdateInput>>>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoUpdateRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoUpdateRelationInput>;
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

/**
 * Information about an individual flows (with a one:many relationship to user
 * story) to help understand a the make up of a story.
 */
export type Flow = {
	__typename?: 'Flow';
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
	userStory?: Maybe<UserStory>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** A video of the steps in this flow. */
	video?: Maybe<File>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** The UUID that is the index in the backend flow table. */
	flowId?: Maybe<Scalars['Int']>;
	_description?: Maybe<Scalars['String']>;
};

export type Flow_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	ipAddress?: Maybe<StringPredicate>;
	browser?: Maybe<StringPredicate>;
	browserVersion?: Maybe<StringPredicate>;
	operatingSystem?: Maybe<StringPredicate>;
	language?: Maybe<StringPredicate>;
	startEventId?: Maybe<StringPredicate>;
	endEventId?: Maybe<StringPredicate>;
	videoGenerationVersion?: Maybe<StringPredicate>;
	flowId?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	userStory?: Maybe<UserStory_PermissionFilter>;
	video?: Maybe<File_PermissionFilter>;
	AND?: Maybe<Array<Flow_PermissionFilter>>;
	OR?: Maybe<Array<Flow_PermissionFilter>>;
};

export type Flow_PermissionRelationFilter = {
	some?: Maybe<Flow_PermissionFilter>;
	every?: Maybe<Flow_PermissionFilter>;
	none?: Maybe<Flow_PermissionFilter>;
};

/** Files create input from flow_video */
export type Flow_Video_FileCreateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoRelationInput>;
};

/** Files update input from flow_video */
export type Flow_Video_FileUpdateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarUpdateRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarUpdateRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarUpdateRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoUpdateRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoUpdateRelationInput>;
};

/** Flow create input */
export type FlowCreateInput = {
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	userStory?: Maybe<FlowUserStoryRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	video?: Maybe<FlowVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** The UUID that is the index in the backend flow table. */
	flowId?: Maybe<Scalars['Int']>;
};

/** Flow create many input */
export type FlowCreateManyInput = {
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	userStory?: Maybe<FlowUserStoryManyRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	video?: Maybe<FlowVideoManyRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** The UUID that is the index in the backend flow table. */
	flowId?: Maybe<Scalars['Int']>;
};

/** Flow delete input */
export type FlowDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** FlowFieldsPermissions create input */
export type FlowFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	ipAddress?: Maybe<Scalars['Boolean']>;
	browser?: Maybe<Scalars['Boolean']>;
	browserVersion?: Maybe<Scalars['Boolean']>;
	operatingSystem?: Maybe<Scalars['Boolean']>;
	language?: Maybe<Scalars['Boolean']>;
	startEventId?: Maybe<Scalars['Boolean']>;
	endEventId?: Maybe<Scalars['Boolean']>;
	videoGenerationVersion?: Maybe<Scalars['Boolean']>;
	flowId?: Maybe<Scalars['Boolean']>;
};

export type FlowFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	ipAddress?: Maybe<StringPredicate>;
	browser?: Maybe<StringPredicate>;
	browserVersion?: Maybe<StringPredicate>;
	operatingSystem?: Maybe<StringPredicate>;
	language?: Maybe<StringPredicate>;
	startEventId?: Maybe<StringPredicate>;
	endEventId?: Maybe<StringPredicate>;
	videoGenerationVersion?: Maybe<StringPredicate>;
	flowId?: Maybe<IntPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	userStory?: Maybe<UserStoryFilter>;
	video?: Maybe<FileFilter>;
	AND?: Maybe<Array<FlowFilter>>;
	OR?: Maybe<Array<FlowFilter>>;
};

export type FlowGroupBy = {
	query: FlowGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type FlowGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	ipAddress?: Maybe<Array<GroupByField>>;
	browser?: Maybe<Array<GroupByField>>;
	browserVersion?: Maybe<Array<GroupByField>>;
	operatingSystem?: Maybe<Array<GroupByField>>;
	language?: Maybe<Array<GroupByField>>;
	startEventId?: Maybe<Array<GroupByField>>;
	endEventId?: Maybe<Array<GroupByField>>;
	videoGenerationVersion?: Maybe<Array<GroupByField>>;
	flowId?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	userStory?: Maybe<UserStoryGroupByQuery>;
	video?: Maybe<FileGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type FlowKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** FlowListResponse output */
export type FlowListResponse = {
	__typename?: 'FlowListResponse';
	/** List items */
	items: Array<Flow>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** FlowManyResponse output */
export type FlowManyResponse = {
	__typename?: 'FlowManyResponse';
	/** List items */
	items: Array<Flow>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum FlowOrderBy {
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
	StartEventIdAsc = 'startEventId_ASC',
	StartEventIdDesc = 'startEventId_DESC',
	EndEventIdAsc = 'endEventId_ASC',
	EndEventIdDesc = 'endEventId_DESC',
	VideoGenerationVersionAsc = 'videoGenerationVersion_ASC',
	VideoGenerationVersionDesc = 'videoGenerationVersion_DESC',
	FlowIdAsc = 'flowId_ASC',
	FlowIdDesc = 'flowId_DESC',
}

/** Flow subscription payload */
export type FlowPayload = {
	__typename?: 'FlowPayload';
	mutation: MutationType;
	node?: Maybe<Flow>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<Flow>;
};

export type FlowRelationFilter = {
	some?: Maybe<FlowFilter>;
	every?: Maybe<FlowFilter>;
	none?: Maybe<FlowFilter>;
};

/** UserStory create input from flows */
export type Flows_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created: Scalars['String'];
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsRelationInput>;
	video?: Maybe<UserStoryVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsRelationInput>;
};

/** UserStory update input from flows */
export type Flows_UserStoryUpdateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Scalars['String']>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeUpdateRelationInput>;
	project?: Maybe<UserStoryProjectUpdateRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigUpdateRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsUpdateRelationInput>;
	video?: Maybe<UserStoryVideoUpdateRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsUpdateRelationInput>;
};

export type FlowSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	ipAddress?: Maybe<SortOrder>;
	browser?: Maybe<SortOrder>;
	browserVersion?: Maybe<SortOrder>;
	operatingSystem?: Maybe<SortOrder>;
	language?: Maybe<SortOrder>;
	startEventId?: Maybe<SortOrder>;
	endEventId?: Maybe<SortOrder>;
	videoGenerationVersion?: Maybe<SortOrder>;
	flowId?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	userStory?: Maybe<UserStorySort>;
	video?: Maybe<FileSort>;
};

/** Flow subscription filter */
export type FlowSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<FlowFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** Flow update input */
export type FlowUpdateByFilterInput = {
	ipAddress?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	browser?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	browserVersion?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	operatingSystem?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	language?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	startEventId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	endEventId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	videoGenerationVersion?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	flowId?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
};

/** Flow update input */
export type FlowUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	userStory?: Maybe<FlowUserStoryUpdateRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	video?: Maybe<FlowVideoUpdateRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** The UUID that is the index in the backend flow table. */
	flowId?: Maybe<Scalars['Int']>;
};

/** Flow relation input */
export type FlowUserStoryManyRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
};

/** Flow relation input */
export type FlowUserStoryRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<Flows_UserStoryCreateInput>;
};

/** Flow relation input */
export type FlowUserStoryUpdateRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	disconnect?: Maybe<UserStoryKeyFilter>;
	reconnect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<Flows_UserStoryCreateInput>;
	update?: Maybe<Flows_UserStoryUpdateInput>;
};

/** Flow relation input */
export type FlowVideoManyRelationInput = {
	connect?: Maybe<FileKeyFilter>;
};

/** Flow relation input */
export type FlowVideoRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	create?: Maybe<Flow_Video_FileCreateInput>;
};

/** Flow relation input */
export type FlowVideoUpdateRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	disconnect?: Maybe<FileKeyFilter>;
	reconnect?: Maybe<FileKeyFilter>;
	create?: Maybe<Flow_Video_FileCreateInput>;
	update?: Maybe<Flow_Video_FileUpdateInput>;
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
	ActivityGroup: ActivityListResponse;
	UserStoryGroup: UserStoryListResponse;
	FlowGroup: FlowListResponse;
	TestOutcomeGroup: TestOutcomeListResponse;
	TestRunGroup: TestRunListResponse;
	ReleaseGroup: ReleaseListResponse;
	AuthenticationTokenGroup: AuthenticationTokenListResponse;
	MetricGroup: MetricListResponse;
	ScriptCommandGroup: ScriptCommandListResponse;
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

export type GroupByResponseFlowGroupArgs = {
	filter?: Maybe<FlowFilter>;
	orderBy?: Maybe<Array<Maybe<FlowOrderBy>>>;
	sort?: Maybe<Array<FlowSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<FlowGroupBy>;
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

export type GroupByResponseScriptCommandGroupArgs = {
	filter?: Maybe<ScriptCommandFilter>;
	orderBy?: Maybe<Array<Maybe<ScriptCommandOrderBy>>>;
	sort?: Maybe<Array<ScriptCommandSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ScriptCommandGroupBy>;
};

export type GroupBySort = {
	alias: Scalars['String'];
	direction: SortOrder;
};

export type GroupIdentifiersGroupByField = {
	as: Scalars['String'];
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

/** LoginResponse */
export type LoginResponse = {
	__typename?: 'LoginResponse';
	success?: Maybe<Scalars['Boolean']>;
	auth?: Maybe<Auth>;
	workspaces?: Maybe<Array<WorkspaceInfo>>;
};

/** Configuration create input from logInStory */
export type LogInStory_ConfigurationCreateInput = {
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink: Scalars['String'];
	project?: Maybe<ConfigurationProjectRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensRelationInput>;
	logInStory?: Maybe<ConfigurationLogInStoryRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
};

/** Configuration update input from logInStory */
export type LogInStory_ConfigurationUpdateInput = {
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<ConfigurationProjectUpdateRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensUpdateRelationInput>;
	logInStory?: Maybe<ConfigurationLogInStoryUpdateRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
};

/** UserStory create input from logInStoryConfig */
export type LogInStoryConfig_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created: Scalars['String'];
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsRelationInput>;
	video?: Maybe<UserStoryVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsRelationInput>;
};

/** UserStory update input from logInStoryConfig */
export type LogInStoryConfig_UserStoryUpdateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Scalars['String']>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeUpdateRelationInput>;
	project?: Maybe<UserStoryProjectUpdateRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigUpdateRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsUpdateRelationInput>;
	video?: Maybe<UserStoryVideoUpdateRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsUpdateRelationInput>;
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
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	/** The number of user stories that had a create user story mutation run. */
	sentStories?: Maybe<Scalars['Int']>;
	/** The number of user stories that should have been updated with an additional 'flow id' that counts repeated flows. */
	updatedStories?: Maybe<Scalars['Int']>;
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
	sentStories?: Maybe<IntPredicate>;
	updatedStories?: Maybe<IntPredicate>;
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
	/** The number of user stories that had a create user story mutation run. */
	sentStories?: Maybe<Scalars['Int']>;
	/** The number of user stories that should have been updated with an additional 'flow id' that counts repeated flows. */
	updatedStories?: Maybe<Scalars['Int']>;
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
	/** The number of user stories that had a create user story mutation run. */
	sentStories?: Maybe<Scalars['Int']>;
	/** The number of user stories that should have been updated with an additional 'flow id' that counts repeated flows. */
	updatedStories?: Maybe<Scalars['Int']>;
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
	sentStories?: Maybe<Scalars['Boolean']>;
	updatedStories?: Maybe<Scalars['Boolean']>;
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
	sentStories?: Maybe<IntPredicate>;
	updatedStories?: Maybe<IntPredicate>;
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
	sentStories?: Maybe<Array<GroupByField>>;
	updatedStories?: Maybe<Array<GroupByField>>;
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
	SentStoriesAsc = 'sentStories_ASC',
	SentStoriesDesc = 'sentStories_DESC',
	UpdatedStoriesAsc = 'updatedStories_ASC',
	UpdatedStoriesDesc = 'updatedStories_DESC',
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
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	sentStories?: Maybe<SortOrder>;
	updatedStories?: Maybe<SortOrder>;
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
	sentStories?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	updatedStories?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
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
	/** The number of user stories that had a create user story mutation run. */
	sentStories?: Maybe<Scalars['Int']>;
	/** The number of user stories that should have been updated with an additional 'flow id' that counts repeated flows. */
	updatedStories?: Maybe<Scalars['Int']>;
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
	environmentVariableCreate: EnvironmentVariable;
	environmentVariableCreateMany: EnvironmentVariableManyResponse;
	environmentVariableDelete?: Maybe<SuccessResponse>;
	environmentVariableDeleteByFilter?: Maybe<SuccessResponse>;
	environmentVariableDestroy?: Maybe<SuccessResponse>;
	environmentVariableDestroyByFilter?: Maybe<SuccessResponse>;
	environmentVariableRestore: EnvironmentVariable;
	environmentVariableUpdate: EnvironmentVariable;
	environmentVariableUpdateByFilter: EnvironmentVariableManyResponse;
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
	flowCreate: Flow;
	flowCreateMany: FlowManyResponse;
	flowDelete?: Maybe<SuccessResponse>;
	flowDeleteByFilter?: Maybe<SuccessResponse>;
	flowDestroy?: Maybe<SuccessResponse>;
	flowDestroyByFilter?: Maybe<SuccessResponse>;
	flowRestore: Flow;
	flowUpdate: Flow;
	flowUpdateByFilter: FlowManyResponse;
	indexCreate: TableIndex;
	indexDelete?: Maybe<SuccessResponse>;
	indexUpdate: TableIndex;
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
	scriptCommandCreate: ScriptCommand;
	scriptCommandCreateMany: ScriptCommandManyResponse;
	scriptCommandDelete?: Maybe<SuccessResponse>;
	scriptCommandDeleteByFilter?: Maybe<SuccessResponse>;
	scriptCommandDestroy?: Maybe<SuccessResponse>;
	scriptCommandDestroyByFilter?: Maybe<SuccessResponse>;
	scriptCommandRestore: ScriptCommand;
	scriptCommandUpdate: ScriptCommand;
	scriptCommandUpdateByFilter: ScriptCommandManyResponse;
	sendInvitationTo8base?: Maybe<SuccessResponse>;
	settingsUpdate: Setting;
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

export type MutationFlowCreateArgs = {
	data: FlowCreateInput;
};

export type MutationFlowCreateManyArgs = {
	data: Array<Maybe<FlowCreateManyInput>>;
};

export type MutationFlowDeleteArgs = {
	data?: Maybe<FlowDeleteInput>;
	filter?: Maybe<FlowKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationFlowDeleteByFilterArgs = {
	filter: FlowFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationFlowDestroyArgs = {
	filter?: Maybe<FlowKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationFlowDestroyByFilterArgs = {
	filter: FlowFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationFlowRestoreArgs = {
	id: Scalars['String'];
};

export type MutationFlowUpdateArgs = {
	data: FlowUpdateInput;
	filter?: Maybe<FlowKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationFlowUpdateByFilterArgs = {
	data: FlowUpdateByFilterInput;
	filter?: Maybe<FlowFilter>;
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

export type MutationScriptCommandCreateArgs = {
	data: ScriptCommandCreateInput;
};

export type MutationScriptCommandCreateManyArgs = {
	data: Array<Maybe<ScriptCommandCreateManyInput>>;
};

export type MutationScriptCommandDeleteArgs = {
	data?: Maybe<ScriptCommandDeleteInput>;
	filter?: Maybe<ScriptCommandKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationScriptCommandDeleteByFilterArgs = {
	filter: ScriptCommandFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationScriptCommandDestroyArgs = {
	filter?: Maybe<ScriptCommandKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationScriptCommandDestroyByFilterArgs = {
	filter: ScriptCommandFilter;
	force?: Maybe<Scalars['Boolean']>;
};

export type MutationScriptCommandRestoreArgs = {
	id: Scalars['String'];
};

export type MutationScriptCommandUpdateArgs = {
	data: ScriptCommandUpdateInput;
	filter?: Maybe<ScriptCommandKeyFilter>;
	force?: Maybe<Scalars['Boolean']>;
	destroyDetached?: Maybe<Scalars['Boolean']>;
};

export type MutationScriptCommandUpdateByFilterArgs = {
	data: ScriptCommandUpdateByFilterInput;
	filter?: Maybe<ScriptCommandFilter>;
};

export type MutationSendInvitationTo8baseArgs = {
	inviteEmail: Scalars['String'];
};

export type MutationSettingsUpdateArgs = {
	data: SettingUpdateInput;
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
	Activity?: Maybe<PermissionsDataActivity>;
	UserStory?: Maybe<PermissionsDataUserStory>;
	Flow?: Maybe<PermissionsDataFlow>;
	TestOutcome?: Maybe<PermissionsDataTestOutcome>;
	TestRun?: Maybe<PermissionsDataTestRun>;
	Release?: Maybe<PermissionsDataRelease>;
	AuthenticationToken?: Maybe<PermissionsDataAuthenticationToken>;
	Metrics?: Maybe<PermissionsDataMetrics>;
	ScriptCommands?: Maybe<PermissionsDataScriptCommands>;
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

export type PermissionsDataFlow = {
	create?: Maybe<PermissionsDataFlowCreate>;
	read?: Maybe<PermissionsDataFlowRead>;
	update?: Maybe<PermissionsDataFlowUpdate>;
	delete?: Maybe<PermissionsDataFlowDelete>;
	destroy?: Maybe<PermissionsDataFlowDestroy>;
};

export type PermissionsDataFlowCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataFlowDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataFlowDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataFlowRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Flow_PermissionFilter>;
	fields?: Maybe<FlowFieldsPermissions>;
};

export type PermissionsDataFlowUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<Flow_PermissionFilter>;
	fields?: Maybe<FlowFieldsPermissions>;
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

export type PermissionsDataScriptCommands = {
	create?: Maybe<PermissionsDataScriptCommandsCreate>;
	read?: Maybe<PermissionsDataScriptCommandsRead>;
	update?: Maybe<PermissionsDataScriptCommandsUpdate>;
	delete?: Maybe<PermissionsDataScriptCommandsDelete>;
	destroy?: Maybe<PermissionsDataScriptCommandsDestroy>;
};

export type PermissionsDataScriptCommandsCreate = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataScriptCommandsDelete = {
	allow: Scalars['Boolean'];
	restore?: Maybe<Scalars['Boolean']>;
	review?: Maybe<Scalars['Boolean']>;
};

export type PermissionsDataScriptCommandsDestroy = {
	allow: Scalars['Boolean'];
};

export type PermissionsDataScriptCommandsRead = {
	allow: Scalars['Boolean'];
	filter?: Maybe<ScriptCommand_PermissionFilter>;
	fields?: Maybe<ScriptCommandFieldsPermissions>;
};

export type PermissionsDataScriptCommandsUpdate = {
	allow: Scalars['Boolean'];
	filter?: Maybe<ScriptCommand_PermissionFilter>;
	fields?: Maybe<ScriptCommandFieldsPermissions>;
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

/** A project is the main entity of hierarchy in Meeshkan. It represents an application (such as a webapp or IOS app). */
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
	/** This avatar image represents your project such as a logo. */
	avatar?: Maybe<File>;
	/**
	 * This is a relation to Release (table) that allows many releases to a single
	 * project. A release is a cadence of time in which a batch of work is worked on
	 * and then pushed to production.
	 */
	release?: Maybe<ReleaseListResponse>;
	/** This is a relation to Configuration (table). It stores additional details and settings for a project. */
	configuration?: Maybe<Configuration>;
	/** This is a one Project to many Activity (table) relation. It stores details of updates on a given project. */
	activity?: Maybe<ActivityListResponse>;
	members?: Maybe<UserListResponse>;
	/**
	 * A one project to many User story (table) relation. User stories are the
	 * representation of a series of events that users do in a project's production environment.
	 */
	userStories?: Maybe<UserStoryListResponse>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	/**
	 * A one project to many Metric relation. Metric is an internal table calculating
	 * performance metrics of user story generation algos.
	 */
	metrics?: Maybe<MetricListResponse>;
	_description?: Maybe<Scalars['String']>;
};

/** A project is the main entity of hierarchy in Meeshkan. It represents an application (such as a webapp or IOS app). */
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

/** A project is the main entity of hierarchy in Meeshkan. It represents an application (such as a webapp or IOS app). */
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

/** A project is the main entity of hierarchy in Meeshkan. It represents an application (such as a webapp or IOS app). */
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

/** A project is the main entity of hierarchy in Meeshkan. It represents an application (such as a webapp or IOS app). */
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

/** A project is the main entity of hierarchy in Meeshkan. It represents an application (such as a webapp or IOS app). */
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
	/** A headline of what happened/changed. */
	title: Scalars['String'];
	/** When did this activity happen? */
	dateTime: Scalars['Date'];
	project?: Maybe<ActivityProjectRelationInput>;
	/** Up to 1000 characters of detail about what happened /changed. */
	description?: Maybe<Scalars['String']>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoRelationInput>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoUpdateRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoUpdateRelationInput>;
};

/** Configuration create input from project */
export type Project_ConfigurationCreateInput = {
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink: Scalars['String'];
	project?: Maybe<ConfigurationProjectRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensRelationInput>;
	logInStory?: Maybe<ConfigurationLogInStoryRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
};

/** Configuration update input from project */
export type Project_ConfigurationUpdateInput = {
	/**
	 * This represents the URL that clients of the app being tested, use in
	 * production. For Meeshkan as an example https://app.meeshkan.com. It is an
	 * optional field.
	 */
	productionURL?: Maybe<Scalars['String']>;
	/**
	 * This represents the URL where a working version of an app is hosted. For
	 * Meeshkan as an example https://webapp-git-staging-meeshkanml.vercel.app. This
	 * is an optional field however test runs will not work with out it.
	 */
	stagingURL?: Maybe<Scalars['String']>;
	/** This is an internal field storing the ID of a customer in Stripe's DB. */
	stripeCustomerID?: Maybe<Scalars['String']>;
	/**
	 * The invitation link is dynamically generated by 8base custom functions. By
	 * clicking this, other users and new users can join a project.
	 */
	inviteLink?: Maybe<Scalars['String']>;
	project?: Maybe<ConfigurationProjectUpdateRelationInput>;
	authenticationTokens?: Maybe<ConfigurationAuthenticationTokensUpdateRelationInput>;
	logInStory?: Maybe<ConfigurationLogInStoryUpdateRelationInput>;
	/**
	 * This defines whether the cron job that triggers test runs, should continue for
	 * this project. It is represented as test runs 'on'/'off' in the webapp.
	 */
	activeTestRuns?: Maybe<Scalars['Boolean']>;
	/**
	 * This represents the plan this project is on in Stripe. This is updated by the
	 * logic webhook in `custom-graphql`. Current plans that exist are: `Free`,
	 * `Feedback`, `Business`.
	 */
	plan?: Maybe<Scalars['String']>;
	/** This is the date that a subscription started for this project. The value for March 4th, 2021 would be "03/04/2021". */
	subscriptionStartedDate?: Maybe<Scalars['Date']>;
	/**
	 * This represents a few of the important subscription statuses in 8base. Values that are acceptable include:
	 * 1. `active`  fully started a subscription.
	 * 2. `trialing` started a subscription but isn't paying
	 * 3. `cancelled` project used to have a subscription but no longer does.
	 */
	subscriptionStatus?: Maybe<Scalars['String']>;
	/** The cadence of billing, options are 'monthly' or 'yearly'. */
	billingInterval?: Maybe<Scalars['String']>;
	/** When a user chooses the feedback plan, they should schedule a call. This field keeps track of that. */
	hasScheduledCall?: Maybe<Scalars['Boolean']>;
	/** Used for integrations. */
	clientSecret?: Maybe<Scalars['String']>;
	/**
	 * Do tests run concurrently for this project? Choices are:
	 * 1. `true` / concurrent. Run all tests at the same time.
	 * 2. `false` / sequential. Run one test after another.
	 */
	runTestsConcurrently?: Maybe<Scalars['Boolean']>;
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
	/** The number of user stories that had a create user story mutation run. */
	sentStories?: Maybe<Scalars['Int']>;
	/** The number of user stories that should have been updated with an additional 'flow id' that counts repeated flows. */
	updatedStories?: Maybe<Scalars['Int']>;
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
	/** The manually defined date preparation for a release begins. */
	startDate?: Maybe<Scalars['Date']>;
};

/** Release update input from project */
export type Project_ReleaseUpdateInput = {
	filter?: Maybe<ReleaseKeyFilter>;
	data: ReleaseUpdateInput;
};

/** UserStory create input from project */
export type Project_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created: Scalars['String'];
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsRelationInput>;
	video?: Maybe<UserStoryVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsRelationInput>;
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
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	activity?: Maybe<ProjectActivityManyRelationInput>;
	members?: Maybe<ProjectMembersManyRelationInput>;
	userStories?: Maybe<ProjectUserStoriesManyRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	activity?: Maybe<ActivityGroupByQuery>;
	members?: Maybe<UserGroupByQuery>;
	userStories?: Maybe<UserStoryGroupByQuery>;
	metrics?: Maybe<MetricGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
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
	/** What is the job title of this individual? */
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
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	environmentVariable?: Maybe<EnvironmentVariable>;
	environmentVariablesList: EnvironmentVariableListResponse;
	file?: Maybe<File>;
	fileUploadInfo?: Maybe<FileUploadInfoResponse>;
	filesList: FileListResponse;
	flow?: Maybe<Flow>;
	flowsList: FlowListResponse;
	/** @deprecated No longer supported. Use `system.functionsList` instead. */
	functionsList?: Maybe<FunctionListResponse>;
	getWorkspaceTransferInfo?: Maybe<WorkspaceTransferItem>;
	/** @deprecated No longer supported. Use `system.logsList` instead. */
	logs?: Maybe<Array<Maybe<Scalars['String']>>>;
	metric?: Maybe<Metric>;
	metricsList: MetricListResponse;
	project?: Maybe<Project>;
	projectsList: ProjectListResponse;
	release?: Maybe<Release>;
	releasesList: ReleaseListResponse;
	role?: Maybe<Role>;
	rolesList: RoleListResponse;
	scriptCommand?: Maybe<ScriptCommand>;
	scriptCommandsList: ScriptCommandListResponse;
	settings?: Maybe<Setting>;
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
	clientSecret?: Maybe<Scalars['String']>;
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

export type QueryFlowArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryFlowsListArgs = {
	filter?: Maybe<FlowFilter>;
	orderBy?: Maybe<Array<Maybe<FlowOrderBy>>>;
	sort?: Maybe<Array<FlowSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<FlowGroupBy>;
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

export type QueryScriptCommandArgs = {
	id?: Maybe<Scalars['ID']>;
	withDeleted?: Maybe<Scalars['Boolean']>;
};

export type QueryScriptCommandsListArgs = {
	filter?: Maybe<ScriptCommandFilter>;
	orderBy?: Maybe<Array<Maybe<ScriptCommandOrderBy>>>;
	sort?: Maybe<Array<ScriptCommandSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ScriptCommandGroupBy>;
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
	/** The manually defined date preparation for a release begins. */
	startDate?: Maybe<Scalars['Date']>;
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
	startDate?: Maybe<DatePredicate>;
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
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

/** TestRun create input from release */
export type Release_TestRunCreateInput = {
	/**
	 * The status of the entire test run. The default assigned value is `queued`. Accepted values include:
	 * 1. `queued` a run is triggered but hasn't started yet.
	 * 2. `running` the test run is in progress.
	 * 3. `runError` something went wrong during the test run.
	 * 4. `completed` the test run finished with out any issues running the test cases.
	 */
	status?: Maybe<Scalars['String']>;
	/** The optional backlink to a CI/CD run or trigger (commit). */
	runLink?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeRelationInput>;
	/**
	 * How long did this test take? It is optional because test runs are created
	 * before they finish when lapsed time is still unknown. Use a HH:MM:ss format. i.e. 14:50:19
	 */
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
	/** The manually defined date preparation for a release begins. */
	startDate?: Maybe<Scalars['Date']>;
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
	/** The manually defined date preparation for a release begins. */
	startDate?: Maybe<Scalars['Date']>;
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
	startDate?: Maybe<Scalars['Boolean']>;
};

export type ReleaseFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	name?: Maybe<StringPredicate>;
	releaseDate?: Maybe<DatePredicate>;
	startDate?: Maybe<DatePredicate>;
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
	startDate?: Maybe<Array<GroupByField>>;
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
	StartDateAsc = 'startDate_ASC',
	StartDateDesc = 'startDate_DESC',
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
	startDate?: Maybe<SortOrder>;
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
	startDate?: Maybe<Array<Maybe<UpdateByFilterDateInput>>>;
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
	/** The manually defined date preparation for a release begins. */
	startDate?: Maybe<Scalars['Date']>;
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
	/** What is the job title of this individual? */
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

/** This represents a single event, and all of the data that could be collected around it. */
export type ScriptCommand = {
	__typename?: 'ScriptCommand';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	userStories?: Maybe<UserStory>;
	/**
	 * Command represents what type of event this is, and gives context to the client
	 * and the test runner. Only one can be defined and it's a mandatory field. The options are:
	 * 1. `open`
	 * 2. `set viewport size`
	 * 3. `click`
	 * 4. `type`
	 * 5. `drag and drop`
	 * 6. `scroll`
	 * 7. `api request`
	 * 8. `mouse over`
	 * 9.`execute javascript`
	 */
	command?: Maybe<Scalars['String']>;
	/** Which step in the test is this? */
	sIndex?: Maybe<Scalars['Int']>;
	/** The generic value field used if a command only requires a string representation. */
	value?: Maybe<Scalars['String']>;
	/** The target X coordinate. What is the x coordinate of the element this event is taking place on/in? */
	xCoordinate?: Maybe<Scalars['Int']>;
	/** The target Y coordinate. What is the y coordinate of the element this event is taking place on/in? */
	yCoordinate?: Maybe<Scalars['Int']>;
	/** Which element in the DOM is this happening on? This represents the full xpath. */
	xpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. */
	selector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. */
	className?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? */
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. */
	innerText?: Maybe<Scalars['String']>;
	/**
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	altOrAriaText?: Maybe<Scalars['String']>;
	/** What page did this event take place on? */
	documentURL?: Maybe<Scalars['String']>;
	/** Returns the number of pixels an element's content is scrolled vertically. Stored with a max of 2 decimal places. */
	scrollTop?: Maybe<Scalars['Float']>;
	/** Returns the number of pixels an element's content is scrolled horizontally. Stored with a max of 2 decimal places. */
	scrollLeft?: Maybe<Scalars['Float']>;
	/**
	 * The target destination X coordinate. This is used for drag and drop events for
	 * the drop half. Where did the x coordinate end up?
	 */
	destinationXCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * The target destination Y coordinate. This is used for drag and drop events for
	 * the drop half. Where did the y coordinate end up?
	 */
	destinationYCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * Which element in the DOM is this happening on? This represents the full xpath.
	 * This is used for drag and drop events for the drop half. What is the xpath of
	 * where this ended up?
	 */
	destinationXpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationSelector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationClassName?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? This is used for drag and drop events for the drop half. */
	destinationTagName?: Maybe<Scalars['String']>;
	/** This is used for drag and drop events for the drop half. */
	destinationTagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. This is used for drag and drop events for the drop half. */
	destinationInnerText?: Maybe<Scalars['String']>;
	/**
	 * This is used for drag and drop events for the drop half.
	 *
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	destinationAltOrAriaText?: Maybe<Scalars['String']>;
	request?: Maybe<Scalars['JSON']>;
	response?: Maybe<Scalars['JSON']>;
	/** The id of the corresponding raw event in Aurora. */
	eventId?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

export type ScriptCommand_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	command?: Maybe<StringPredicate>;
	sIndex?: Maybe<IntPredicate>;
	value?: Maybe<StringPredicate>;
	xCoordinate?: Maybe<IntPredicate>;
	yCoordinate?: Maybe<IntPredicate>;
	xpath?: Maybe<StringPredicate>;
	selector?: Maybe<StringPredicate>;
	className?: Maybe<StringPredicate>;
	tagName?: Maybe<StringPredicate>;
	tagId?: Maybe<StringPredicate>;
	innerText?: Maybe<StringPredicate>;
	altOrAriaText?: Maybe<StringPredicate>;
	documentURL?: Maybe<StringPredicate>;
	scrollTop?: Maybe<FloatPredicate>;
	scrollLeft?: Maybe<FloatPredicate>;
	destinationXCoordinate?: Maybe<IntPredicate>;
	destinationYCoordinate?: Maybe<IntPredicate>;
	destinationXpath?: Maybe<StringPredicate>;
	destinationSelector?: Maybe<StringPredicate>;
	destinationClassName?: Maybe<StringPredicate>;
	destinationTagName?: Maybe<StringPredicate>;
	destinationTagId?: Maybe<StringPredicate>;
	destinationInnerText?: Maybe<StringPredicate>;
	destinationAltOrAriaText?: Maybe<StringPredicate>;
	eventId?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	userStories?: Maybe<UserStory_PermissionFilter>;
	AND?: Maybe<Array<ScriptCommand_PermissionFilter>>;
	OR?: Maybe<Array<ScriptCommand_PermissionFilter>>;
};

export type ScriptCommand_PermissionRelationFilter = {
	some?: Maybe<ScriptCommand_PermissionFilter>;
	every?: Maybe<ScriptCommand_PermissionFilter>;
	none?: Maybe<ScriptCommand_PermissionFilter>;
};

/** ScriptCommands create input */
export type ScriptCommandCreateInput = {
	userStories?: Maybe<ScriptCommandsUserStoriesRelationInput>;
	/**
	 * Command represents what type of event this is, and gives context to the client
	 * and the test runner. Only one can be defined and it's a mandatory field. The options are:
	 * 1. `open`
	 * 2. `set viewport size`
	 * 3. `click`
	 * 4. `type`
	 * 5. `drag and drop`
	 * 6. `scroll`
	 * 7. `api request`
	 * 8. `mouse over`
	 * 9.`execute javascript`
	 */
	command: Scalars['String'];
	/** Which step in the test is this? */
	sIndex: Scalars['Int'];
	/** The generic value field used if a command only requires a string representation. */
	value?: Maybe<Scalars['String']>;
	/** The target X coordinate. What is the x coordinate of the element this event is taking place on/in? */
	xCoordinate?: Maybe<Scalars['Int']>;
	/** The target Y coordinate. What is the y coordinate of the element this event is taking place on/in? */
	yCoordinate?: Maybe<Scalars['Int']>;
	/** Which element in the DOM is this happening on? This represents the full xpath. */
	xpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. */
	selector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. */
	className?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? */
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. */
	innerText?: Maybe<Scalars['String']>;
	/**
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	altOrAriaText?: Maybe<Scalars['String']>;
	/** What page did this event take place on? */
	documentURL?: Maybe<Scalars['String']>;
	/** Returns the number of pixels an element's content is scrolled vertically. Stored with a max of 2 decimal places. */
	scrollTop?: Maybe<Scalars['Float']>;
	/** Returns the number of pixels an element's content is scrolled horizontally. Stored with a max of 2 decimal places. */
	scrollLeft?: Maybe<Scalars['Float']>;
	/**
	 * The target destination X coordinate. This is used for drag and drop events for
	 * the drop half. Where did the x coordinate end up?
	 */
	destinationXCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * The target destination Y coordinate. This is used for drag and drop events for
	 * the drop half. Where did the y coordinate end up?
	 */
	destinationYCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * Which element in the DOM is this happening on? This represents the full xpath.
	 * This is used for drag and drop events for the drop half. What is the xpath of
	 * where this ended up?
	 */
	destinationXpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationSelector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationClassName?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? This is used for drag and drop events for the drop half. */
	destinationTagName?: Maybe<Scalars['String']>;
	/** This is used for drag and drop events for the drop half. */
	destinationTagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. This is used for drag and drop events for the drop half. */
	destinationInnerText?: Maybe<Scalars['String']>;
	/**
	 * This is used for drag and drop events for the drop half.
	 *
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	destinationAltOrAriaText?: Maybe<Scalars['String']>;
	request?: Maybe<Scalars['JSON']>;
	response?: Maybe<Scalars['JSON']>;
	/** The id of the corresponding raw event in Aurora. */
	eventId?: Maybe<Scalars['String']>;
};

/** ScriptCommands create many input */
export type ScriptCommandCreateManyInput = {
	userStories: ScriptCommandsUserStoriesManyRelationInput;
	/**
	 * Command represents what type of event this is, and gives context to the client
	 * and the test runner. Only one can be defined and it's a mandatory field. The options are:
	 * 1. `open`
	 * 2. `set viewport size`
	 * 3. `click`
	 * 4. `type`
	 * 5. `drag and drop`
	 * 6. `scroll`
	 * 7. `api request`
	 * 8. `mouse over`
	 * 9.`execute javascript`
	 */
	command: Scalars['String'];
	/** Which step in the test is this? */
	sIndex: Scalars['Int'];
	/** The generic value field used if a command only requires a string representation. */
	value?: Maybe<Scalars['String']>;
	/** The target X coordinate. What is the x coordinate of the element this event is taking place on/in? */
	xCoordinate?: Maybe<Scalars['Int']>;
	/** The target Y coordinate. What is the y coordinate of the element this event is taking place on/in? */
	yCoordinate?: Maybe<Scalars['Int']>;
	/** Which element in the DOM is this happening on? This represents the full xpath. */
	xpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. */
	selector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. */
	className?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? */
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. */
	innerText?: Maybe<Scalars['String']>;
	/**
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	altOrAriaText?: Maybe<Scalars['String']>;
	/** What page did this event take place on? */
	documentURL?: Maybe<Scalars['String']>;
	/** Returns the number of pixels an element's content is scrolled vertically. Stored with a max of 2 decimal places. */
	scrollTop?: Maybe<Scalars['Float']>;
	/** Returns the number of pixels an element's content is scrolled horizontally. Stored with a max of 2 decimal places. */
	scrollLeft?: Maybe<Scalars['Float']>;
	/**
	 * The target destination X coordinate. This is used for drag and drop events for
	 * the drop half. Where did the x coordinate end up?
	 */
	destinationXCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * The target destination Y coordinate. This is used for drag and drop events for
	 * the drop half. Where did the y coordinate end up?
	 */
	destinationYCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * Which element in the DOM is this happening on? This represents the full xpath.
	 * This is used for drag and drop events for the drop half. What is the xpath of
	 * where this ended up?
	 */
	destinationXpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationSelector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationClassName?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? This is used for drag and drop events for the drop half. */
	destinationTagName?: Maybe<Scalars['String']>;
	/** This is used for drag and drop events for the drop half. */
	destinationTagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. This is used for drag and drop events for the drop half. */
	destinationInnerText?: Maybe<Scalars['String']>;
	/**
	 * This is used for drag and drop events for the drop half.
	 *
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	destinationAltOrAriaText?: Maybe<Scalars['String']>;
	request?: Maybe<Scalars['JSON']>;
	response?: Maybe<Scalars['JSON']>;
	/** The id of the corresponding raw event in Aurora. */
	eventId?: Maybe<Scalars['String']>;
};

/** ScriptCommands delete input */
export type ScriptCommandDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** ScriptCommandFieldsPermissions create input */
export type ScriptCommandFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	command?: Maybe<Scalars['Boolean']>;
	sIndex?: Maybe<Scalars['Boolean']>;
	value?: Maybe<Scalars['Boolean']>;
	xCoordinate?: Maybe<Scalars['Boolean']>;
	yCoordinate?: Maybe<Scalars['Boolean']>;
	xpath?: Maybe<Scalars['Boolean']>;
	selector?: Maybe<Scalars['Boolean']>;
	className?: Maybe<Scalars['Boolean']>;
	tagName?: Maybe<Scalars['Boolean']>;
	tagId?: Maybe<Scalars['Boolean']>;
	innerText?: Maybe<Scalars['Boolean']>;
	altOrAriaText?: Maybe<Scalars['Boolean']>;
	documentURL?: Maybe<Scalars['Boolean']>;
	scrollTop?: Maybe<Scalars['Boolean']>;
	scrollLeft?: Maybe<Scalars['Boolean']>;
	destinationXCoordinate?: Maybe<Scalars['Boolean']>;
	destinationYCoordinate?: Maybe<Scalars['Boolean']>;
	destinationXpath?: Maybe<Scalars['Boolean']>;
	destinationSelector?: Maybe<Scalars['Boolean']>;
	destinationClassName?: Maybe<Scalars['Boolean']>;
	destinationTagName?: Maybe<Scalars['Boolean']>;
	destinationTagId?: Maybe<Scalars['Boolean']>;
	destinationInnerText?: Maybe<Scalars['Boolean']>;
	destinationAltOrAriaText?: Maybe<Scalars['Boolean']>;
	request?: Maybe<Scalars['Boolean']>;
	response?: Maybe<Scalars['Boolean']>;
	eventId?: Maybe<Scalars['Boolean']>;
};

export type ScriptCommandFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	command?: Maybe<StringPredicate>;
	sIndex?: Maybe<IntPredicate>;
	value?: Maybe<StringPredicate>;
	xCoordinate?: Maybe<IntPredicate>;
	yCoordinate?: Maybe<IntPredicate>;
	xpath?: Maybe<StringPredicate>;
	selector?: Maybe<StringPredicate>;
	className?: Maybe<StringPredicate>;
	tagName?: Maybe<StringPredicate>;
	tagId?: Maybe<StringPredicate>;
	innerText?: Maybe<StringPredicate>;
	altOrAriaText?: Maybe<StringPredicate>;
	documentURL?: Maybe<StringPredicate>;
	scrollTop?: Maybe<FloatPredicate>;
	scrollLeft?: Maybe<FloatPredicate>;
	destinationXCoordinate?: Maybe<IntPredicate>;
	destinationYCoordinate?: Maybe<IntPredicate>;
	destinationXpath?: Maybe<StringPredicate>;
	destinationSelector?: Maybe<StringPredicate>;
	destinationClassName?: Maybe<StringPredicate>;
	destinationTagName?: Maybe<StringPredicate>;
	destinationTagId?: Maybe<StringPredicate>;
	destinationInnerText?: Maybe<StringPredicate>;
	destinationAltOrAriaText?: Maybe<StringPredicate>;
	eventId?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	userStories?: Maybe<UserStoryFilter>;
	AND?: Maybe<Array<ScriptCommandFilter>>;
	OR?: Maybe<Array<ScriptCommandFilter>>;
};

export type ScriptCommandGroupBy = {
	query: ScriptCommandGroupByQuery;
	sort?: Maybe<Array<GroupBySort>>;
	having?: Maybe<Having>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
};

export type ScriptCommandGroupByQuery = {
	id?: Maybe<Array<GroupByField>>;
	createdAt?: Maybe<Array<GroupByField>>;
	updatedAt?: Maybe<Array<GroupByField>>;
	command?: Maybe<Array<GroupByField>>;
	sIndex?: Maybe<Array<GroupByField>>;
	value?: Maybe<Array<GroupByField>>;
	xCoordinate?: Maybe<Array<GroupByField>>;
	yCoordinate?: Maybe<Array<GroupByField>>;
	xpath?: Maybe<Array<GroupByField>>;
	selector?: Maybe<Array<GroupByField>>;
	className?: Maybe<Array<GroupByField>>;
	tagName?: Maybe<Array<GroupByField>>;
	tagId?: Maybe<Array<GroupByField>>;
	innerText?: Maybe<Array<GroupByField>>;
	altOrAriaText?: Maybe<Array<GroupByField>>;
	documentURL?: Maybe<Array<GroupByField>>;
	scrollTop?: Maybe<Array<GroupByField>>;
	scrollLeft?: Maybe<Array<GroupByField>>;
	destinationXCoordinate?: Maybe<Array<GroupByField>>;
	destinationYCoordinate?: Maybe<Array<GroupByField>>;
	destinationXpath?: Maybe<Array<GroupByField>>;
	destinationSelector?: Maybe<Array<GroupByField>>;
	destinationClassName?: Maybe<Array<GroupByField>>;
	destinationTagName?: Maybe<Array<GroupByField>>;
	destinationTagId?: Maybe<Array<GroupByField>>;
	destinationInnerText?: Maybe<Array<GroupByField>>;
	destinationAltOrAriaText?: Maybe<Array<GroupByField>>;
	request?: Maybe<Array<GroupByField>>;
	response?: Maybe<Array<GroupByField>>;
	eventId?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	userStories?: Maybe<UserStoryGroupByQuery>;
	_group?: Maybe<Array<GroupIdentifiersGroupByField>>;
};

export type ScriptCommandKeyFilter = {
	id?: Maybe<Scalars['ID']>;
};

/** ScriptCommandListResponse output */
export type ScriptCommandListResponse = {
	__typename?: 'ScriptCommandListResponse';
	/** List items */
	items: Array<ScriptCommand>;
	/** List items count */
	count: Scalars['Int'];
	/** Aggregated items */
	groups: Array<GroupByResponse>;
};

/** ScriptCommandManyResponse output */
export type ScriptCommandManyResponse = {
	__typename?: 'ScriptCommandManyResponse';
	/** List items */
	items: Array<ScriptCommand>;
	/** List items count */
	count: Scalars['Int'];
};

/** No longer supported. Use `sort` instead. */
export enum ScriptCommandOrderBy {
	IdAsc = 'id_ASC',
	IdDesc = 'id_DESC',
	CreatedAtAsc = 'createdAt_ASC',
	CreatedAtDesc = 'createdAt_DESC',
	UpdatedAtAsc = 'updatedAt_ASC',
	UpdatedAtDesc = 'updatedAt_DESC',
	DeletedAtAsc = 'deletedAt_ASC',
	DeletedAtDesc = 'deletedAt_DESC',
	CommandAsc = 'command_ASC',
	CommandDesc = 'command_DESC',
	SIndexAsc = 'sIndex_ASC',
	SIndexDesc = 'sIndex_DESC',
	ValueAsc = 'value_ASC',
	ValueDesc = 'value_DESC',
	XCoordinateAsc = 'xCoordinate_ASC',
	XCoordinateDesc = 'xCoordinate_DESC',
	YCoordinateAsc = 'yCoordinate_ASC',
	YCoordinateDesc = 'yCoordinate_DESC',
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
	AltOrAriaTextAsc = 'altOrAriaText_ASC',
	AltOrAriaTextDesc = 'altOrAriaText_DESC',
	DocumentUrlAsc = 'documentURL_ASC',
	DocumentUrlDesc = 'documentURL_DESC',
	ScrollTopAsc = 'scrollTop_ASC',
	ScrollTopDesc = 'scrollTop_DESC',
	ScrollLeftAsc = 'scrollLeft_ASC',
	ScrollLeftDesc = 'scrollLeft_DESC',
	DestinationXCoordinateAsc = 'destinationXCoordinate_ASC',
	DestinationXCoordinateDesc = 'destinationXCoordinate_DESC',
	DestinationYCoordinateAsc = 'destinationYCoordinate_ASC',
	DestinationYCoordinateDesc = 'destinationYCoordinate_DESC',
	DestinationXpathAsc = 'destinationXpath_ASC',
	DestinationXpathDesc = 'destinationXpath_DESC',
	DestinationSelectorAsc = 'destinationSelector_ASC',
	DestinationSelectorDesc = 'destinationSelector_DESC',
	DestinationClassNameAsc = 'destinationClassName_ASC',
	DestinationClassNameDesc = 'destinationClassName_DESC',
	DestinationTagNameAsc = 'destinationTagName_ASC',
	DestinationTagNameDesc = 'destinationTagName_DESC',
	DestinationTagIdAsc = 'destinationTagId_ASC',
	DestinationTagIdDesc = 'destinationTagId_DESC',
	DestinationInnerTextAsc = 'destinationInnerText_ASC',
	DestinationInnerTextDesc = 'destinationInnerText_DESC',
	DestinationAltOrAriaTextAsc = 'destinationAltOrAriaText_ASC',
	DestinationAltOrAriaTextDesc = 'destinationAltOrAriaText_DESC',
	RequestAsc = 'request_ASC',
	RequestDesc = 'request_DESC',
	ResponseAsc = 'response_ASC',
	ResponseDesc = 'response_DESC',
	EventIdAsc = 'eventId_ASC',
	EventIdDesc = 'eventId_DESC',
}

/** ScriptCommands subscription payload */
export type ScriptCommandPayload = {
	__typename?: 'ScriptCommandPayload';
	mutation: MutationType;
	node?: Maybe<ScriptCommand>;
	updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
	previousValues?: Maybe<ScriptCommand>;
};

export type ScriptCommandRelationFilter = {
	some?: Maybe<ScriptCommandFilter>;
	every?: Maybe<ScriptCommandFilter>;
	none?: Maybe<ScriptCommandFilter>;
};

/** UserStory create input from scriptCommands */
export type ScriptCommands_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created: Scalars['String'];
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsRelationInput>;
	video?: Maybe<UserStoryVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsRelationInput>;
};

/** UserStory update input from scriptCommands */
export type ScriptCommands_UserStoryUpdateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Scalars['String']>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeUpdateRelationInput>;
	project?: Maybe<UserStoryProjectUpdateRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigUpdateRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsUpdateRelationInput>;
	video?: Maybe<UserStoryVideoUpdateRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsUpdateRelationInput>;
};

export type ScriptCommandSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	command?: Maybe<SortOrder>;
	sIndex?: Maybe<SortOrder>;
	value?: Maybe<SortOrder>;
	xCoordinate?: Maybe<SortOrder>;
	yCoordinate?: Maybe<SortOrder>;
	xpath?: Maybe<SortOrder>;
	selector?: Maybe<SortOrder>;
	className?: Maybe<SortOrder>;
	tagName?: Maybe<SortOrder>;
	tagId?: Maybe<SortOrder>;
	innerText?: Maybe<SortOrder>;
	altOrAriaText?: Maybe<SortOrder>;
	documentURL?: Maybe<SortOrder>;
	scrollTop?: Maybe<SortOrder>;
	scrollLeft?: Maybe<SortOrder>;
	destinationXCoordinate?: Maybe<SortOrder>;
	destinationYCoordinate?: Maybe<SortOrder>;
	destinationXpath?: Maybe<SortOrder>;
	destinationSelector?: Maybe<SortOrder>;
	destinationClassName?: Maybe<SortOrder>;
	destinationTagName?: Maybe<SortOrder>;
	destinationTagId?: Maybe<SortOrder>;
	destinationInnerText?: Maybe<SortOrder>;
	destinationAltOrAriaText?: Maybe<SortOrder>;
	eventId?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	userStories?: Maybe<UserStorySort>;
};

/** ScriptCommands subscription filter */
export type ScriptCommandSubscriptionFilter = {
	mutation_in?: Maybe<Array<Maybe<MutationType>>>;
	node?: Maybe<ScriptCommandFilter>;
	updatedFields?: Maybe<UpdatedFieldsFilter>;
};

/** ScriptCommands relation input */
export type ScriptCommandsUserStoriesManyRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
};

/** ScriptCommands relation input */
export type ScriptCommandsUserStoriesRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<ScriptCommands_UserStoryCreateInput>;
};

/** ScriptCommands relation input */
export type ScriptCommandsUserStoriesUpdateRelationInput = {
	connect?: Maybe<UserStoryKeyFilter>;
	disconnect?: Maybe<UserStoryKeyFilter>;
	reconnect?: Maybe<UserStoryKeyFilter>;
	create?: Maybe<ScriptCommands_UserStoryCreateInput>;
	update?: Maybe<ScriptCommands_UserStoryUpdateInput>;
};

/** ScriptCommands update input */
export type ScriptCommandUpdateByFilterInput = {
	command?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	sIndex?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	value?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	xCoordinate?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	yCoordinate?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	xpath?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	selector?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	className?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	tagName?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	tagId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	innerText?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	altOrAriaText?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	documentURL?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	scrollTop?: Maybe<Array<Maybe<UpdateByFilterFloatInput>>>;
	scrollLeft?: Maybe<Array<Maybe<UpdateByFilterFloatInput>>>;
	destinationXCoordinate?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	destinationYCoordinate?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	destinationXpath?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	destinationSelector?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	destinationClassName?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	destinationTagName?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	destinationTagId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	destinationInnerText?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	destinationAltOrAriaText?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	request?: Maybe<Array<Maybe<UpdateByFilterJsonInput>>>;
	response?: Maybe<Array<Maybe<UpdateByFilterJsonInput>>>;
	eventId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** ScriptCommands update input */
export type ScriptCommandUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	userStories?: Maybe<ScriptCommandsUserStoriesUpdateRelationInput>;
	/**
	 * Command represents what type of event this is, and gives context to the client
	 * and the test runner. Only one can be defined and it's a mandatory field. The options are:
	 * 1. `open`
	 * 2. `set viewport size`
	 * 3. `click`
	 * 4. `type`
	 * 5. `drag and drop`
	 * 6. `scroll`
	 * 7. `api request`
	 * 8. `mouse over`
	 * 9.`execute javascript`
	 */
	command?: Maybe<Scalars['String']>;
	/** Which step in the test is this? */
	sIndex?: Maybe<Scalars['Int']>;
	/** The generic value field used if a command only requires a string representation. */
	value?: Maybe<Scalars['String']>;
	/** The target X coordinate. What is the x coordinate of the element this event is taking place on/in? */
	xCoordinate?: Maybe<Scalars['Int']>;
	/** The target Y coordinate. What is the y coordinate of the element this event is taking place on/in? */
	yCoordinate?: Maybe<Scalars['Int']>;
	/** Which element in the DOM is this happening on? This represents the full xpath. */
	xpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. */
	selector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. */
	className?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? */
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. */
	innerText?: Maybe<Scalars['String']>;
	/**
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	altOrAriaText?: Maybe<Scalars['String']>;
	/** What page did this event take place on? */
	documentURL?: Maybe<Scalars['String']>;
	/** Returns the number of pixels an element's content is scrolled vertically. Stored with a max of 2 decimal places. */
	scrollTop?: Maybe<Scalars['Float']>;
	/** Returns the number of pixels an element's content is scrolled horizontally. Stored with a max of 2 decimal places. */
	scrollLeft?: Maybe<Scalars['Float']>;
	/**
	 * The target destination X coordinate. This is used for drag and drop events for
	 * the drop half. Where did the x coordinate end up?
	 */
	destinationXCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * The target destination Y coordinate. This is used for drag and drop events for
	 * the drop half. Where did the y coordinate end up?
	 */
	destinationYCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * Which element in the DOM is this happening on? This represents the full xpath.
	 * This is used for drag and drop events for the drop half. What is the xpath of
	 * where this ended up?
	 */
	destinationXpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationSelector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationClassName?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? This is used for drag and drop events for the drop half. */
	destinationTagName?: Maybe<Scalars['String']>;
	/** This is used for drag and drop events for the drop half. */
	destinationTagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. This is used for drag and drop events for the drop half. */
	destinationInnerText?: Maybe<Scalars['String']>;
	/**
	 * This is used for drag and drop events for the drop half.
	 *
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	destinationAltOrAriaText?: Maybe<Scalars['String']>;
	request?: Maybe<Scalars['JSON']>;
	response?: Maybe<Scalars['JSON']>;
	/** The id of the corresponding raw event in Aurora. */
	eventId?: Maybe<Scalars['String']>;
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

/** SignUpResendInput */
export type SignUpResendInput = {
	email: Scalars['String'];
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
	EnvironmentVariables?: Maybe<EnvironmentVariablePayload>;
	Files?: Maybe<FilePayload>;
	Flow?: Maybe<FlowPayload>;
	Metrics?: Maybe<MetricPayload>;
	Permissions?: Maybe<PermissionPayload>;
	Project?: Maybe<ProjectPayload>;
	Release?: Maybe<ReleasePayload>;
	Roles?: Maybe<RolePayload>;
	ScriptCommands?: Maybe<ScriptCommandPayload>;
	Settings?: Maybe<SettingPayload>;
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

export type SubscriptionEnvironmentVariablesArgs = {
	filter?: Maybe<EnvironmentVariableSubscriptionFilter>;
};

export type SubscriptionFilesArgs = {
	filter?: Maybe<FileSubscriptionFilter>;
};

export type SubscriptionFlowArgs = {
	filter?: Maybe<FlowSubscriptionFilter>;
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

export type SubscriptionReleaseArgs = {
	filter?: Maybe<ReleaseSubscriptionFilter>;
};

export type SubscriptionRolesArgs = {
	filter?: Maybe<RoleSubscriptionFilter>;
};

export type SubscriptionScriptCommandsArgs = {
	filter?: Maybe<ScriptCommandSubscriptionFilter>;
};

export type SubscriptionSettingsArgs = {
	filter?: Maybe<SettingSubscriptionFilter>;
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
	plan?: Maybe<SystemBillingInvoiceItemPlanInfo>;
	workspace?: Maybe<SystemBillingInvoiceItemWorkspaceInfo>;
};

export type SystemBillingInvoiceItemPlanInfo = {
	__typename?: 'SystemBillingInvoiceItemPlanInfo';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	displayName?: Maybe<Scalars['String']>;
};

export type SystemBillingInvoiceItemWorkspaceInfo = {
	__typename?: 'SystemBillingInvoiceItemWorkspaceInfo';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
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
	fileManagementProvider?: Maybe<Scalars['String']>;
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

export type SystemInboxEventDetailsUnion =
	| SystemInboxEventEnvironmentInvitationDetails
	| SystemInboxEventOrganizationInvitationDetails;

export type SystemInboxEventEnvironmentInvitationDetails = {
	__typename?: 'SystemInboxEventEnvironmentInvitationDetails';
	uuid?: Maybe<Scalars['String']>;
	status?: Maybe<SystemInboxEventStatusEnum>;
	invitedBy?: Maybe<SystemInboxEventInvitedBy>;
	workspace?: Maybe<SystemInboxEventWorkspace>;
	environmentName?: Maybe<Scalars['String']>;
};

export type SystemInboxEventInvitedBy = {
	__typename?: 'SystemInboxEventInvitedBy';
	email?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	avatar?: Maybe<GraphQlFileItemResponse>;
};

export type SystemInboxEventItem = {
	__typename?: 'SystemInboxEventItem';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	type?: Maybe<SystemInboxEventTypeEnum>;
	isCompleted?: Maybe<Scalars['Boolean']>;
	details?: Maybe<SystemInboxEventDetailsUnion>;
};

export type SystemInboxEventOrganization = {
	__typename?: 'SystemInboxEventOrganization';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<GraphQlFileItemResponse>;
};

export type SystemInboxEventOrganizationInvitationDetails = {
	__typename?: 'SystemInboxEventOrganizationInvitationDetails';
	uuid?: Maybe<Scalars['String']>;
	status?: Maybe<SystemInboxEventStatusEnum>;
	invitedBy?: Maybe<SystemInboxEventInvitedBy>;
	organization?: Maybe<SystemInboxEventOrganization>;
};

/** SystemInboxEventsListResponse output */
export type SystemInboxEventsListResponse = {
	__typename?: 'SystemInboxEventsListResponse';
	/** List items */
	items: Array<SystemInboxEventItem>;
	/** List items count */
	count: Scalars['Int'];
};

export enum SystemInboxEventStatusEnum {
	Sent = 'sent',
	Accepted = 'accepted',
	Declined = 'declined',
}

export enum SystemInboxEventTypeEnum {
	OrganizationInvitation = 'OrganizationInvitation',
	EnvironmentInvitation = 'EnvironmentInvitation',
}

export type SystemInboxEventWorkspace = {
	__typename?: 'SystemInboxEventWorkspace';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	avatar?: Maybe<GraphQlFileItemResponse>;
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
	inboxEventsList?: Maybe<SystemInboxEventsListResponse>;
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

export type SystemQueryInboxEventsListArgs = {
	first?: Maybe<Scalars['Int']>;
	skip?: Maybe<Scalars['Int']>;
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
	description?: Maybe<Scalars['String']>;
};

export type SystemWorkspaceCreateResponse = {
	__typename?: 'SystemWorkspaceCreateResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	kind?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
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
	description?: Maybe<Scalars['String']>;
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
	description?: Maybe<Scalars['String']>;
};

export type SystemWorkspaceUpdateResponse = {
	__typename?: 'SystemWorkspaceUpdateResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	image?: Maybe<GraphQlFileItemResponse>;
	description?: Maybe<Scalars['String']>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoRelationInput>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoUpdateRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoUpdateRelationInput>;
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

/**
 * This represents the outcome of an individual test case (user story marked as
 * `isTestCase=true`) each time it's included in a test run.
 */
export type TestOutcome = {
	__typename?: 'TestOutcome';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	userStory?: Maybe<UserStory>;
	/**
	 * Has the bug been resolved? This is an optional field to represent the
	 * resolution of an issue by means of a linked bug ticket being merged.
	 */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	/** This is the relation to which test run (table) this outcome was generated from. */
	testRun?: Maybe<TestRun>;
	/**
	 * The recorded playback of what happened when replaying a test case during a
	 * test run. This field is only filled for failing test outcomes.
	 */
	video?: Maybe<File>;
	/**
	 * This field should only be filled if the status is `failing`. It's the
	 * step-index where a test case failed to complete an event.
	 */
	errorStepIndex?: Maybe<Scalars['Int']>;
	/** An error message thrown from assertions. */
	assertionError?: Maybe<Scalars['String']>;
	/** Error message thrown from the inset JavaScript. */
	errorMessage?: Maybe<Scalars['String']>;
	_description?: Maybe<Scalars['String']>;
};

export type TestOutcome_PermissionFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	isResolved?: Maybe<BoolPredicate>;
	status?: Maybe<StringPredicate>;
	errorStepIndex?: Maybe<IntPredicate>;
	assertionError?: Maybe<StringPredicate>;
	errorMessage?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	userStory?: Maybe<UserStory_PermissionFilter>;
	testRun?: Maybe<TestRun_PermissionFilter>;
	video?: Maybe<File_PermissionFilter>;
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
	/**
	 * The status of the entire test run. The default assigned value is `queued`. Accepted values include:
	 * 1. `queued` a run is triggered but hasn't started yet.
	 * 2. `running` the test run is in progress.
	 * 3. `runError` something went wrong during the test run.
	 * 4. `completed` the test run finished with out any issues running the test cases.
	 */
	status?: Maybe<Scalars['String']>;
	/** The optional backlink to a CI/CD run or trigger (commit). */
	runLink?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeRelationInput>;
	/**
	 * How long did this test take? It is optional because test runs are created
	 * before they finish when lapsed time is still unknown. Use a HH:MM:ss format. i.e. 14:50:19
	 */
	testLength?: Maybe<Scalars['String']>;
};

/** TestRun update input from testOutcome */
export type TestOutcome_TestRunUpdateInput = {
	/**
	 * The status of the entire test run. The default assigned value is `queued`. Accepted values include:
	 * 1. `queued` a run is triggered but hasn't started yet.
	 * 2. `running` the test run is in progress.
	 * 3. `runError` something went wrong during the test run.
	 * 4. `completed` the test run finished with out any issues running the test cases.
	 */
	status?: Maybe<Scalars['String']>;
	/** The optional backlink to a CI/CD run or trigger (commit). */
	runLink?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseUpdateRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeUpdateRelationInput>;
	/**
	 * How long did this test take? It is optional because test runs are created
	 * before they finish when lapsed time is still unknown. Use a HH:MM:ss format. i.e. 14:50:19
	 */
	testLength?: Maybe<Scalars['String']>;
};

/** UserStory create input from testOutcome */
export type TestOutcome_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created: Scalars['String'];
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsRelationInput>;
	video?: Maybe<UserStoryVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsRelationInput>;
};

/** UserStory update input from testOutcome */
export type TestOutcome_UserStoryUpdateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Scalars['String']>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeUpdateRelationInput>;
	project?: Maybe<UserStoryProjectUpdateRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigUpdateRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsUpdateRelationInput>;
	video?: Maybe<UserStoryVideoUpdateRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsUpdateRelationInput>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoRelationInput>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoUpdateRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoUpdateRelationInput>;
};

/** TestOutcome create input */
export type TestOutcomeCreateInput = {
	userStory?: Maybe<TestOutcomeUserStoryRelationInput>;
	/**
	 * Has the bug been resolved? This is an optional field to represent the
	 * resolution of an issue by means of a linked bug ticket being merged.
	 */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunRelationInput>;
	video?: Maybe<TestOutcomeVideoRelationInput>;
	/**
	 * This field should only be filled if the status is `failing`. It's the
	 * step-index where a test case failed to complete an event.
	 */
	errorStepIndex?: Maybe<Scalars['Int']>;
	/** An error message thrown from assertions. */
	assertionError?: Maybe<Scalars['String']>;
	/** Error message thrown from the inset JavaScript. */
	errorMessage?: Maybe<Scalars['String']>;
};

/** TestOutcome create many input */
export type TestOutcomeCreateManyInput = {
	userStory: TestOutcomeUserStoryManyRelationInput;
	/**
	 * Has the bug been resolved? This is an optional field to represent the
	 * resolution of an issue by means of a linked bug ticket being merged.
	 */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunManyRelationInput>;
	video?: Maybe<TestOutcomeVideoManyRelationInput>;
	/**
	 * This field should only be filled if the status is `failing`. It's the
	 * step-index where a test case failed to complete an event.
	 */
	errorStepIndex?: Maybe<Scalars['Int']>;
	/** An error message thrown from assertions. */
	assertionError?: Maybe<Scalars['String']>;
	/** Error message thrown from the inset JavaScript. */
	errorMessage?: Maybe<Scalars['String']>;
};

/** TestOutcome delete input */
export type TestOutcomeDeleteInput = {
	id?: Maybe<Scalars['ID']>;
	force?: Maybe<Scalars['Boolean']>;
};

/** TestOutcomeFieldsPermissions create input */
export type TestOutcomeFieldsPermissions = {
	createdAt?: Maybe<Scalars['Boolean']>;
	updatedAt?: Maybe<Scalars['Boolean']>;
	isResolved?: Maybe<Scalars['Boolean']>;
	status?: Maybe<Scalars['Boolean']>;
	errorStepIndex?: Maybe<Scalars['Boolean']>;
	assertionError?: Maybe<Scalars['Boolean']>;
	errorMessage?: Maybe<Scalars['Boolean']>;
};

export type TestOutcomeFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	isResolved?: Maybe<BoolPredicate>;
	status?: Maybe<StringPredicate>;
	errorStepIndex?: Maybe<IntPredicate>;
	assertionError?: Maybe<StringPredicate>;
	errorMessage?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	userStory?: Maybe<UserStoryFilter>;
	testRun?: Maybe<TestRunFilter>;
	video?: Maybe<FileFilter>;
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
	errorStepIndex?: Maybe<Array<GroupByField>>;
	assertionError?: Maybe<Array<GroupByField>>;
	errorMessage?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	userStory?: Maybe<UserStoryGroupByQuery>;
	testRun?: Maybe<TestRunGroupByQuery>;
	video?: Maybe<FileGroupByQuery>;
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
	ErrorStepIndexAsc = 'errorStepIndex_ASC',
	ErrorStepIndexDesc = 'errorStepIndex_DESC',
	AssertionErrorAsc = 'assertionError_ASC',
	AssertionErrorDesc = 'assertionError_DESC',
	ErrorMessageAsc = 'errorMessage_ASC',
	ErrorMessageDesc = 'errorMessage_DESC',
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
	errorStepIndex?: Maybe<SortOrder>;
	assertionError?: Maybe<SortOrder>;
	errorMessage?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	userStory?: Maybe<UserStorySort>;
	testRun?: Maybe<TestRunSort>;
	video?: Maybe<FileSort>;
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
	errorStepIndex?: Maybe<Array<Maybe<UpdateByFilterIntInput>>>;
	assertionError?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	errorMessage?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** TestOutcome update input */
export type TestOutcomeUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	userStory?: Maybe<TestOutcomeUserStoryUpdateRelationInput>;
	/**
	 * Has the bug been resolved? This is an optional field to represent the
	 * resolution of an issue by means of a linked bug ticket being merged.
	 */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunUpdateRelationInput>;
	video?: Maybe<TestOutcomeVideoUpdateRelationInput>;
	/**
	 * This field should only be filled if the status is `failing`. It's the
	 * step-index where a test case failed to complete an event.
	 */
	errorStepIndex?: Maybe<Scalars['Int']>;
	/** An error message thrown from assertions. */
	assertionError?: Maybe<Scalars['String']>;
	/** Error message thrown from the inset JavaScript. */
	errorMessage?: Maybe<Scalars['String']>;
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
	/**
	 * The status of the entire test run. The default assigned value is `queued`. Accepted values include:
	 * 1. `queued` a run is triggered but hasn't started yet.
	 * 2. `running` the test run is in progress.
	 * 3. `runError` something went wrong during the test run.
	 * 4. `completed` the test run finished with out any issues running the test cases.
	 */
	status?: Maybe<Scalars['String']>;
	/** The optional backlink to a CI/CD run or trigger (commit). */
	runLink?: Maybe<Scalars['String']>;
	/** This is a relation to the release (table) this test run is in context of. */
	release?: Maybe<Release>;
	testOutcome?: Maybe<TestOutcomeListResponse>;
	/**
	 * How long did this test take? It is optional because test runs are created
	 * before they finish when lapsed time is still unknown. Use a HH:MM:ss format. i.e. 14:50:19
	 */
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
	runLink?: Maybe<StringPredicate>;
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
	/**
	 * Has the bug been resolved? This is an optional field to represent the
	 * resolution of an issue by means of a linked bug ticket being merged.
	 */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunRelationInput>;
	video?: Maybe<TestOutcomeVideoRelationInput>;
	/**
	 * This field should only be filled if the status is `failing`. It's the
	 * step-index where a test case failed to complete an event.
	 */
	errorStepIndex?: Maybe<Scalars['Int']>;
	/** An error message thrown from assertions. */
	assertionError?: Maybe<Scalars['String']>;
	/** Error message thrown from the inset JavaScript. */
	errorMessage?: Maybe<Scalars['String']>;
};

/** TestOutcome update input from testRun */
export type TestRun_TestOutcomeUpdateInput = {
	filter?: Maybe<TestOutcomeKeyFilter>;
	data: TestOutcomeUpdateInput;
};

/** TestRun create input */
export type TestRunCreateInput = {
	/**
	 * The status of the entire test run. The default assigned value is `queued`. Accepted values include:
	 * 1. `queued` a run is triggered but hasn't started yet.
	 * 2. `running` the test run is in progress.
	 * 3. `runError` something went wrong during the test run.
	 * 4. `completed` the test run finished with out any issues running the test cases.
	 */
	status?: Maybe<Scalars['String']>;
	/** The optional backlink to a CI/CD run or trigger (commit). */
	runLink?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeRelationInput>;
	/**
	 * How long did this test take? It is optional because test runs are created
	 * before they finish when lapsed time is still unknown. Use a HH:MM:ss format. i.e. 14:50:19
	 */
	testLength?: Maybe<Scalars['String']>;
};

/** TestRun create many input */
export type TestRunCreateManyInput = {
	/**
	 * The status of the entire test run. The default assigned value is `queued`. Accepted values include:
	 * 1. `queued` a run is triggered but hasn't started yet.
	 * 2. `running` the test run is in progress.
	 * 3. `runError` something went wrong during the test run.
	 * 4. `completed` the test run finished with out any issues running the test cases.
	 */
	status?: Maybe<Scalars['String']>;
	/** The optional backlink to a CI/CD run or trigger (commit). */
	runLink?: Maybe<Scalars['String']>;
	release: TestRunReleaseManyRelationInput;
	testOutcome?: Maybe<TestRunTestOutcomeManyRelationInput>;
	/**
	 * How long did this test take? It is optional because test runs are created
	 * before they finish when lapsed time is still unknown. Use a HH:MM:ss format. i.e. 14:50:19
	 */
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
	runLink?: Maybe<Scalars['Boolean']>;
	testLength?: Maybe<Scalars['Boolean']>;
};

export type TestRunFilter = {
	id?: Maybe<IdPredicate>;
	createdAt?: Maybe<DateTimePredicate>;
	updatedAt?: Maybe<DateTimePredicate>;
	deletedAt?: Maybe<IntPredicate>;
	status?: Maybe<StringPredicate>;
	runLink?: Maybe<StringPredicate>;
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
	runLink?: Maybe<Array<GroupByField>>;
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
	RunLinkAsc = 'runLink_ASC',
	RunLinkDesc = 'runLink_DESC',
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
	/** The manually defined date preparation for a release begins. */
	startDate?: Maybe<Scalars['Date']>;
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
	/** The manually defined date preparation for a release begins. */
	startDate?: Maybe<Scalars['Date']>;
};

export type TestRunSort = {
	id?: Maybe<SortOrder>;
	createdAt?: Maybe<SortOrder>;
	updatedAt?: Maybe<SortOrder>;
	deletedAt?: Maybe<SortOrder>;
	status?: Maybe<SortOrder>;
	runLink?: Maybe<SortOrder>;
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
	runLink?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	testLength?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** TestRun update input */
export type TestRunUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/**
	 * The status of the entire test run. The default assigned value is `queued`. Accepted values include:
	 * 1. `queued` a run is triggered but hasn't started yet.
	 * 2. `running` the test run is in progress.
	 * 3. `runError` something went wrong during the test run.
	 * 4. `completed` the test run finished with out any issues running the test cases.
	 */
	status?: Maybe<Scalars['String']>;
	/** The optional backlink to a CI/CD run or trigger (commit). */
	runLink?: Maybe<Scalars['String']>;
	release?: Maybe<TestRunReleaseUpdateRelationInput>;
	testOutcome?: Maybe<TestRunTestOutcomeUpdateRelationInput>;
	/**
	 * How long did this test take? It is optional because test runs are created
	 * before they finish when lapsed time is still unknown. Use a HH:MM:ss format. i.e. 14:50:19
	 */
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
	/** This represents all of the projects a user is a part of. */
	projects?: Maybe<ProjectListResponse>;
	/** What is the job title of this individual? */
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
	/** What is the job title of this individual? */
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
	/** What is the job title of this individual? */
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoRelationInput>;
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
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoUpdateRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoUpdateRelationInput>;
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
	activity?: Maybe<ProjectActivityRelationInput>;
	members?: Maybe<ProjectMembersRelationInput>;
	userStories?: Maybe<ProjectUserStoriesRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
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
	activity?: Maybe<ProjectActivityUpdateRelationInput>;
	members?: Maybe<ProjectMembersUpdateRelationInput>;
	userStories?: Maybe<ProjectUserStoriesUpdateRelationInput>;
	/**
	 * Do we have events in Aurora for this project? It's an internal field used for
	 * suggesting script/extension installation at the right time.
	 */
	hasReceivedEvents?: Maybe<Scalars['Boolean']>;
	metrics?: Maybe<ProjectMetricsUpdateRelationInput>;
};

/** ScriptCommands create input from userStories */
export type UserStories_ScriptCommandCreateInput = {
	userStories?: Maybe<ScriptCommandsUserStoriesRelationInput>;
	/**
	 * Command represents what type of event this is, and gives context to the client
	 * and the test runner. Only one can be defined and it's a mandatory field. The options are:
	 * 1. `open`
	 * 2. `set viewport size`
	 * 3. `click`
	 * 4. `type`
	 * 5. `drag and drop`
	 * 6. `scroll`
	 * 7. `api request`
	 * 8. `mouse over`
	 * 9.`execute javascript`
	 */
	command: Scalars['String'];
	/** Which step in the test is this? */
	sIndex: Scalars['Int'];
	/** The generic value field used if a command only requires a string representation. */
	value?: Maybe<Scalars['String']>;
	/** The target X coordinate. What is the x coordinate of the element this event is taking place on/in? */
	xCoordinate?: Maybe<Scalars['Int']>;
	/** The target Y coordinate. What is the y coordinate of the element this event is taking place on/in? */
	yCoordinate?: Maybe<Scalars['Int']>;
	/** Which element in the DOM is this happening on? This represents the full xpath. */
	xpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. */
	selector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. */
	className?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? */
	tagName?: Maybe<Scalars['String']>;
	tagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. */
	innerText?: Maybe<Scalars['String']>;
	/**
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	altOrAriaText?: Maybe<Scalars['String']>;
	/** What page did this event take place on? */
	documentURL?: Maybe<Scalars['String']>;
	/** Returns the number of pixels an element's content is scrolled vertically. Stored with a max of 2 decimal places. */
	scrollTop?: Maybe<Scalars['Float']>;
	/** Returns the number of pixels an element's content is scrolled horizontally. Stored with a max of 2 decimal places. */
	scrollLeft?: Maybe<Scalars['Float']>;
	/**
	 * The target destination X coordinate. This is used for drag and drop events for
	 * the drop half. Where did the x coordinate end up?
	 */
	destinationXCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * The target destination Y coordinate. This is used for drag and drop events for
	 * the drop half. Where did the y coordinate end up?
	 */
	destinationYCoordinate?: Maybe<Scalars['Int']>;
	/**
	 * Which element in the DOM is this happening on? This represents the full xpath.
	 * This is used for drag and drop events for the drop half. What is the xpath of
	 * where this ended up?
	 */
	destinationXpath?: Maybe<Scalars['String']>;
	/** The CSS selector that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationSelector?: Maybe<Scalars['String']>;
	/** The element's class name that this event happened on/in. This is used for drag and drop events for the drop half. */
	destinationClassName?: Maybe<Scalars['String']>;
	/** Which HTML tag did this event happen on/in? This is used for drag and drop events for the drop half. */
	destinationTagName?: Maybe<Scalars['String']>;
	/** This is used for drag and drop events for the drop half. */
	destinationTagId?: Maybe<Scalars['String']>;
	/** Any text that is a child to the element the event happened on/in. This is used for drag and drop events for the drop half. */
	destinationInnerText?: Maybe<Scalars['String']>;
	/**
	 * This is used for drag and drop events for the drop half.
	 *
	 * Alt text for events happening on images.
	 *
	 * The aria-label attribute is used to define a string that labels the current
	 * element. Used in cases where a text label is not visible on the screen.
	 */
	destinationAltOrAriaText?: Maybe<Scalars['String']>;
	request?: Maybe<Scalars['JSON']>;
	response?: Maybe<Scalars['JSON']>;
	/** The id of the corresponding raw event in Aurora. */
	eventId?: Maybe<Scalars['String']>;
};

/** ScriptCommands update input from userStories */
export type UserStories_ScriptCommandUpdateInput = {
	filter?: Maybe<ScriptCommandKeyFilter>;
	data: ScriptCommandUpdateInput;
};

/** User stories are the representation of what users do in a project's production environment. */
export type UserStory = {
	__typename?: 'UserStory';
	id?: Maybe<Scalars['ID']>;
	createdAt?: Maybe<Scalars['DateTime']>;
	updatedAt?: Maybe<Scalars['DateTime']>;
	deletedAt?: Maybe<Scalars['Int']>;
	createdBy?: Maybe<User>;
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Scalars['String']>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	/**
	 * Each time this user story is included in a test run, it produces a test
	 * outcome that explains its current state of being able to pass.
	 */
	testOutcome?: Maybe<TestOutcomeListResponse>;
	project?: Maybe<Project>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<Configuration>;
	scriptCommands?: Maybe<ScriptCommandListResponse>;
	/** A video representation of the user story recreated out of the DOM/s the events were generated from. */
	video?: Maybe<File>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	/**
	 * Information about an individual flows that make up this user story such as the
	 * user agent, video, and flow id. The count of `flows` will also answer the
	 * question "How many of my users are doing this?".
	 */
	flows?: Maybe<FlowListResponse>;
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

/** User stories are the representation of what users do in a project's production environment. */
export type UserStoryScriptCommandsArgs = {
	filter?: Maybe<ScriptCommandFilter>;
	orderBy?: Maybe<Array<Maybe<ScriptCommandOrderBy>>>;
	sort?: Maybe<Array<ScriptCommandSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<ScriptCommandGroupBy>;
};

/** User stories are the representation of what users do in a project's production environment. */
export type UserStoryFlowsArgs = {
	filter?: Maybe<FlowFilter>;
	orderBy?: Maybe<Array<Maybe<FlowOrderBy>>>;
	sort?: Maybe<Array<FlowSort>>;
	skip?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	groupBy?: Maybe<FlowGroupBy>;
};

/** Flow create input from userStory */
export type UserStory_FlowCreateInput = {
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	userStory?: Maybe<FlowUserStoryRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	video?: Maybe<FlowVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** The UUID that is the index in the backend flow table. */
	flowId?: Maybe<Scalars['Int']>;
};

/** Flow update input from userStory */
export type UserStory_FlowUpdateInput = {
	filter?: Maybe<FlowKeyFilter>;
	data: FlowUpdateInput;
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
	created?: Maybe<StringPredicate>;
	isExpected?: Maybe<BoolPredicate>;
	significance?: Maybe<StringPredicate>;
	requiresAuthentication?: Maybe<BoolPredicate>;
	videoGenerationVersion?: Maybe<StringPredicate>;
	startEventId?: Maybe<StringPredicate>;
	endEventId?: Maybe<StringPredicate>;
	scriptVersion?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<User_PermissionFilter>;
	testOutcome?: Maybe<TestOutcome_PermissionRelationFilter>;
	project?: Maybe<Project_PermissionFilter>;
	logInStoryConfig?: Maybe<Configuration_PermissionFilter>;
	scriptCommands?: Maybe<ScriptCommand_PermissionRelationFilter>;
	video?: Maybe<File_PermissionFilter>;
	flows?: Maybe<Flow_PermissionRelationFilter>;
	AND?: Maybe<Array<UserStory_PermissionFilter>>;
	OR?: Maybe<Array<UserStory_PermissionFilter>>;
};

export type UserStory_PermissionRelationFilter = {
	some?: Maybe<UserStory_PermissionFilter>;
	every?: Maybe<UserStory_PermissionFilter>;
	none?: Maybe<UserStory_PermissionFilter>;
};

/** TestOutcome create input from userStory */
export type UserStory_TestOutcomeCreateInput = {
	userStory?: Maybe<TestOutcomeUserStoryRelationInput>;
	/**
	 * Has the bug been resolved? This is an optional field to represent the
	 * resolution of an issue by means of a linked bug ticket being merged.
	 */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunRelationInput>;
	video?: Maybe<TestOutcomeVideoRelationInput>;
	/**
	 * This field should only be filled if the status is `failing`. It's the
	 * step-index where a test case failed to complete an event.
	 */
	errorStepIndex?: Maybe<Scalars['Int']>;
	/** An error message thrown from assertions. */
	assertionError?: Maybe<Scalars['String']>;
	/** Error message thrown from the inset JavaScript. */
	errorMessage?: Maybe<Scalars['String']>;
};

/** TestOutcome update input from userStory */
export type UserStory_TestOutcomeUpdateInput = {
	filter?: Maybe<TestOutcomeKeyFilter>;
	data: TestOutcomeUpdateInput;
};

/** Files create input from userStory_video */
export type UserStory_Video_FileCreateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoRelationInput>;
};

/** Files update input from userStory_video */
export type UserStory_Video_FileUpdateInput = {
	fileId?: Maybe<Scalars['String']>;
	public?: Maybe<Scalars['Boolean']>;
	filename?: Maybe<Scalars['String']>;
	meta?: Maybe<Scalars['JSON']>;
	mods?: Maybe<Scalars['JSON']>;
	users_avatar?: Maybe<FilesUsers_AvatarUpdateRelationInput>;
	teamMembers_avatar?: Maybe<FilesTeamMembers_AvatarUpdateRelationInput>;
	project_avatar?: Maybe<FilesProject_AvatarUpdateRelationInput>;
	testOutcome_video?: Maybe<FilesTestOutcome_VideoUpdateRelationInput>;
	userStory_video?: Maybe<FilesUserStory_VideoUpdateRelationInput>;
	flow_video?: Maybe<FilesFlow_VideoUpdateRelationInput>;
};

/** UserStory create input */
export type UserStoryCreateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created: Scalars['String'];
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsRelationInput>;
	video?: Maybe<UserStoryVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsRelationInput>;
};

/** UserStory create many input */
export type UserStoryCreateManyInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created: Scalars['String'];
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeManyRelationInput>;
	project: UserStoryProjectManyRelationInput;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigManyRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsManyRelationInput>;
	video?: Maybe<UserStoryVideoManyRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsManyRelationInput>;
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
	created?: Maybe<Scalars['Boolean']>;
	isExpected?: Maybe<Scalars['Boolean']>;
	significance?: Maybe<Scalars['Boolean']>;
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	videoGenerationVersion?: Maybe<Scalars['Boolean']>;
	startEventId?: Maybe<Scalars['Boolean']>;
	endEventId?: Maybe<Scalars['Boolean']>;
	scriptVersion?: Maybe<Scalars['Boolean']>;
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
	created?: Maybe<StringPredicate>;
	isExpected?: Maybe<BoolPredicate>;
	significance?: Maybe<StringPredicate>;
	requiresAuthentication?: Maybe<BoolPredicate>;
	videoGenerationVersion?: Maybe<StringPredicate>;
	startEventId?: Maybe<StringPredicate>;
	endEventId?: Maybe<StringPredicate>;
	scriptVersion?: Maybe<StringPredicate>;
	_fullText?: Maybe<Scalars['String']>;
	createdBy?: Maybe<UserFilter>;
	testOutcome?: Maybe<TestOutcomeRelationFilter>;
	project?: Maybe<ProjectFilter>;
	logInStoryConfig?: Maybe<ConfigurationFilter>;
	scriptCommands?: Maybe<ScriptCommandRelationFilter>;
	video?: Maybe<FileFilter>;
	flows?: Maybe<FlowRelationFilter>;
	AND?: Maybe<Array<UserStoryFilter>>;
	OR?: Maybe<Array<UserStoryFilter>>;
};

/** UserStory relation input */
export type UserStoryFlowsManyRelationInput = {
	connect?: Maybe<Array<FlowKeyFilter>>;
};

/** UserStory relation input */
export type UserStoryFlowsRelationInput = {
	connect?: Maybe<Array<FlowKeyFilter>>;
	create?: Maybe<Array<Maybe<UserStory_FlowCreateInput>>>;
};

/** UserStory relation input */
export type UserStoryFlowsUpdateRelationInput = {
	connect?: Maybe<Array<FlowKeyFilter>>;
	disconnect?: Maybe<Array<FlowKeyFilter>>;
	reconnect?: Maybe<Array<FlowKeyFilter>>;
	create?: Maybe<Array<Maybe<UserStory_FlowCreateInput>>>;
	update?: Maybe<Array<Maybe<UserStory_FlowUpdateInput>>>;
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
	created?: Maybe<Array<GroupByField>>;
	isExpected?: Maybe<Array<GroupByField>>;
	significance?: Maybe<Array<GroupByField>>;
	requiresAuthentication?: Maybe<Array<GroupByField>>;
	videoGenerationVersion?: Maybe<Array<GroupByField>>;
	startEventId?: Maybe<Array<GroupByField>>;
	endEventId?: Maybe<Array<GroupByField>>;
	scriptVersion?: Maybe<Array<GroupByField>>;
	createdBy?: Maybe<UserGroupByQuery>;
	testOutcome?: Maybe<TestOutcomeGroupByQuery>;
	project?: Maybe<ProjectGroupByQuery>;
	logInStoryConfig?: Maybe<ConfigurationGroupByQuery>;
	scriptCommands?: Maybe<ScriptCommandGroupByQuery>;
	video?: Maybe<FileGroupByQuery>;
	flows?: Maybe<FlowGroupByQuery>;
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

/** UserStory relation input */
export type UserStoryLogInStoryConfigManyRelationInput = {
	connect?: Maybe<ConfigurationKeyFilter>;
};

/** UserStory relation input */
export type UserStoryLogInStoryConfigRelationInput = {
	connect?: Maybe<ConfigurationKeyFilter>;
	create?: Maybe<LogInStory_ConfigurationCreateInput>;
};

/** UserStory relation input */
export type UserStoryLogInStoryConfigUpdateRelationInput = {
	connect?: Maybe<ConfigurationKeyFilter>;
	disconnect?: Maybe<ConfigurationKeyFilter>;
	reconnect?: Maybe<ConfigurationKeyFilter>;
	create?: Maybe<LogInStory_ConfigurationCreateInput>;
	update?: Maybe<LogInStory_ConfigurationUpdateInput>;
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
	CreatedAsc = 'created_ASC',
	CreatedDesc = 'created_DESC',
	IsExpectedAsc = 'isExpected_ASC',
	IsExpectedDesc = 'isExpected_DESC',
	SignificanceAsc = 'significance_ASC',
	SignificanceDesc = 'significance_DESC',
	RequiresAuthenticationAsc = 'requiresAuthentication_ASC',
	RequiresAuthenticationDesc = 'requiresAuthentication_DESC',
	VideoGenerationVersionAsc = 'videoGenerationVersion_ASC',
	VideoGenerationVersionDesc = 'videoGenerationVersion_DESC',
	StartEventIdAsc = 'startEventId_ASC',
	StartEventIdDesc = 'startEventId_DESC',
	EndEventIdAsc = 'endEventId_ASC',
	EndEventIdDesc = 'endEventId_DESC',
	ScriptVersionAsc = 'scriptVersion_ASC',
	ScriptVersionDesc = 'scriptVersion_DESC',
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

export type UserStoryRelationFilter = {
	some?: Maybe<UserStoryFilter>;
	every?: Maybe<UserStoryFilter>;
	none?: Maybe<UserStoryFilter>;
};

/** UserStory relation input */
export type UserStoryScriptCommandsManyRelationInput = {
	connect?: Maybe<Array<ScriptCommandKeyFilter>>;
};

/** UserStory relation input */
export type UserStoryScriptCommandsRelationInput = {
	connect?: Maybe<Array<ScriptCommandKeyFilter>>;
	create?: Maybe<Array<Maybe<UserStories_ScriptCommandCreateInput>>>;
};

/** UserStory relation input */
export type UserStoryScriptCommandsUpdateRelationInput = {
	connect?: Maybe<Array<ScriptCommandKeyFilter>>;
	disconnect?: Maybe<Array<ScriptCommandKeyFilter>>;
	reconnect?: Maybe<Array<ScriptCommandKeyFilter>>;
	create?: Maybe<Array<Maybe<UserStories_ScriptCommandCreateInput>>>;
	update?: Maybe<Array<Maybe<UserStories_ScriptCommandUpdateInput>>>;
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
	created?: Maybe<SortOrder>;
	isExpected?: Maybe<SortOrder>;
	significance?: Maybe<SortOrder>;
	requiresAuthentication?: Maybe<SortOrder>;
	videoGenerationVersion?: Maybe<SortOrder>;
	startEventId?: Maybe<SortOrder>;
	endEventId?: Maybe<SortOrder>;
	scriptVersion?: Maybe<SortOrder>;
	createdBy?: Maybe<UserSort>;
	project?: Maybe<ProjectSort>;
	logInStoryConfig?: Maybe<ConfigurationSort>;
	video?: Maybe<FileSort>;
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
	created?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	isExpected?: Maybe<Array<Maybe<UpdateByFilterBooleanSwitchInput>>>;
	significance?: Maybe<Array<Maybe<UpdateByFilterStringSwitchInput>>>;
	requiresAuthentication?: Maybe<
		Array<Maybe<UpdateByFilterBooleanSwitchInput>>
	>;
	videoGenerationVersion?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	startEventId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	endEventId?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
	scriptVersion?: Maybe<Array<Maybe<UpdateByFilterStringInput>>>;
};

/** UserStory update input */
export type UserStoryUpdateInput = {
	id?: Maybe<Scalars['ID']>;
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created?: Maybe<Scalars['String']>;
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeUpdateRelationInput>;
	project?: Maybe<UserStoryProjectUpdateRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigUpdateRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsUpdateRelationInput>;
	video?: Maybe<UserStoryVideoUpdateRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsUpdateRelationInput>;
};

/** UserStory relation input */
export type UserStoryVideoManyRelationInput = {
	connect?: Maybe<FileKeyFilter>;
};

/** UserStory relation input */
export type UserStoryVideoRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	create?: Maybe<UserStory_Video_FileCreateInput>;
};

/** UserStory relation input */
export type UserStoryVideoUpdateRelationInput = {
	connect?: Maybe<FileKeyFilter>;
	disconnect?: Maybe<FileKeyFilter>;
	reconnect?: Maybe<FileKeyFilter>;
	create?: Maybe<UserStory_Video_FileCreateInput>;
	update?: Maybe<UserStory_Video_FileUpdateInput>;
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
	/** What is the job title of this individual? */
	jobTitle?: Maybe<Scalars['String']>;
	/** User setting to allow product updates to be sent to their email. */
	productNotifications?: Maybe<Scalars['Boolean']>;
};

/** UUID Field Attributes */
export type UuidFieldTypeAttributes = {
	__typename?: 'UUIDFieldTypeAttributes';
	fieldSize?: Maybe<Scalars['Int']>;
};

/** VerificationEmailResendInput */
export type VerificationEmailResendInput = {
	email: Scalars['String'];
};

/** Flow create input from video */
export type Video_FlowCreateInput = {
	ipAddress?: Maybe<Scalars['String']>;
	browser?: Maybe<Scalars['String']>;
	browserVersion?: Maybe<Scalars['String']>;
	operatingSystem?: Maybe<Scalars['String']>;
	language?: Maybe<Scalars['String']>;
	userStory?: Maybe<FlowUserStoryRelationInput>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	video?: Maybe<FlowVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** The UUID that is the index in the backend flow table. */
	flowId?: Maybe<Scalars['Int']>;
};

/** Flow update input from video */
export type Video_FlowUpdateInput = {
	filter?: Maybe<FlowKeyFilter>;
	data: FlowUpdateInput;
};

/** TestOutcome create input from video */
export type Video_TestOutcomeCreateInput = {
	userStory?: Maybe<TestOutcomeUserStoryRelationInput>;
	/**
	 * Has the bug been resolved? This is an optional field to represent the
	 * resolution of an issue by means of a linked bug ticket being merged.
	 */
	isResolved?: Maybe<Scalars['Boolean']>;
	/**
	 * The status of a test case in an individual test run. Test runs create test
	 * outcomes for each test case / user story in the run.
	 */
	status?: Maybe<Scalars['String']>;
	testRun?: Maybe<TestOutcomeTestRunRelationInput>;
	video?: Maybe<TestOutcomeVideoRelationInput>;
	/**
	 * This field should only be filled if the status is `failing`. It's the
	 * step-index where a test case failed to complete an event.
	 */
	errorStepIndex?: Maybe<Scalars['Int']>;
	/** An error message thrown from assertions. */
	assertionError?: Maybe<Scalars['String']>;
	/** Error message thrown from the inset JavaScript. */
	errorMessage?: Maybe<Scalars['String']>;
};

/** TestOutcome update input from video */
export type Video_TestOutcomeUpdateInput = {
	filter?: Maybe<TestOutcomeKeyFilter>;
	data: TestOutcomeUpdateInput;
};

/** UserStory create input from video */
export type Video_UserStoryCreateInput = {
	/** The human readable title of a user story describes what the story does. */
	title?: Maybe<Scalars['String']>;
	/** This is an optional field that allows you to describe what to expect from the test. */
	description?: Maybe<Scalars['String']>;
	/** The indication of whether a user story has been marked as expected application behavior, or not. */
	isTestCase?: Maybe<Scalars['Boolean']>;
	/** When was this recording marked as a test case? */
	testCreatedDate?: Maybe<Scalars['DateTime']>;
	/** Is the answer to "Who created this user story?", a user or a product manager via the chrome extension */
	created: Scalars['String'];
	/**
	 * The initial inference/calculated guess if a User Story should become a test or
	 * not. Guesses the answer to the question: "Is the application behaving as expected"
	 */
	isExpected?: Maybe<Scalars['Boolean']>;
	/**
	 * Marks the significance of a user story for calculation of the confidence score
	 * and weight of choices. A user story will default as `low`. Options are:
	 * 1. `low`
	 * 2. `medium`
	 * 3. `high`
	 */
	significance?: Maybe<Scalars['String']>;
	testOutcome?: Maybe<UserStoryTestOutcomeRelationInput>;
	project?: Maybe<UserStoryProjectRelationInput>;
	/**
	 * A boolean field to distinguish between non-authenticated and authenticated
	 * user stories. `requiresAuthentication` is marking a test as needing to be
	 * logged in to complete the set of actions in the user story.
	 */
	requiresAuthentication?: Maybe<Scalars['Boolean']>;
	logInStoryConfig?: Maybe<UserStoryLogInStoryConfigRelationInput>;
	scriptCommands?: Maybe<UserStoryScriptCommandsRelationInput>;
	video?: Maybe<UserStoryVideoRelationInput>;
	/** This version allows us to peg what data and strategy was used to generate a video. */
	videoGenerationVersion?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the first event in a video in the backend database. */
	startEventId?: Maybe<Scalars['String']>;
	/** This is the UUID that correlates to the last event in a video in the backend database. */
	endEventId?: Maybe<Scalars['String']>;
	/** This version allows us to peg what data and strategy was used to generate this script and is mandatory. */
	scriptVersion?: Maybe<Scalars['String']>;
	flows?: Maybe<UserStoryFlowsRelationInput>;
};

/** UserStory update input from video */
export type Video_UserStoryUpdateInput = {
	filter?: Maybe<UserStoryKeyFilter>;
	data: UserStoryUpdateInput;
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
	description?: Maybe<Scalars['String']>;
};

export type WorkspaceCreateResponse = {
	__typename?: 'WorkspaceCreateResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	kind?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
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
	description?: Maybe<Scalars['String']>;
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
	description?: Maybe<Scalars['String']>;
};

export type WorkspaceUpdateResponse = {
	__typename?: 'WorkspaceUpdateResponse';
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	image?: Maybe<GraphQlFileItemResponse>;
	description?: Maybe<Scalars['String']>;
};
