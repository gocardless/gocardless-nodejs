/** Type for a balance resource. */
export type Balance = {
    amount?: number;
    balance_type?: BalanceBalanceType;
    currency?: BalanceCurrency;
    last_updated_at?: string;
    links?: BalanceLinks;
};
export declare enum BalanceBalanceType {
    ConfirmedFunds = "confirmed_funds",
    PendingPayouts = "pending_payouts",
    PendingPaymentsSubmitted = "pending_payments_submitted"
}
export declare enum BalanceCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a balancelinks resource. */
export type BalanceLinks = {
    creditor?: string;
};
/** Type for a bankaccountdetail resource. */
export type BankAccountDetail = {
    ciphertext?: string;
    encrypted_key?: string;
    iv?: string;
    protected?: string;
    tag?: string;
};
/** Type for a bankaccountholderverification resource. */
export type BankAccountHolderVerification = {
    actual_account_name?: string | null;
    id: string;
    result?: BankAccountHolderVerificationResult;
    status: BankAccountHolderVerificationStatus;
    type: BankAccountHolderVerificationType;
};
/** Type for a bankaccountholderverificationcreaterequestlinks resource. */
export type BankAccountHolderVerificationCreateRequestLinks = {
    bank_account: string;
};
export declare enum BankAccountHolderVerificationType {
    ConfirmationOfPayee = "confirmation_of_payee"
}
export declare enum BankAccountHolderVerificationResult {
    FullMatch = "full_match",
    PartialMatch = "partial_match",
    NoMatch = "no_match",
    UnableToMatch = "unable_to_match"
}
export declare enum BankAccountHolderVerificationStatus {
    Pending = "pending",
    Completed = "completed"
}
/** Type for a bankauthorisation resource. */
export type BankAuthorisation = {
    authorisation_type?: BankAuthorisationAuthorisationType;
    authorised_at?: string | null;
    created_at?: string;
    expires_at?: string;
    id: string;
    last_visited_at?: string | null;
    links?: BankAuthorisationLinks;
    qr_code_url?: string | null;
    redirect_uri?: string;
    url?: string;
};
/** Type for a bankauthorisationcreaterequestlinks resource. */
export type BankAuthorisationCreateRequestLinks = {
    billing_request?: string;
};
export declare enum BankAuthorisationAuthorisationType {
    Mandate = "mandate",
    Payment = "payment"
}
/** Type for a bankauthorisationlinks resource. */
export type BankAuthorisationLinks = {
    billing_request?: string;
    institution?: string;
};
/** Type for a bankdetailslookup resource. */
export type BankDetailsLookup = {
    available_debit_schemes?: BankDetailsLookupAvailableDebitScheme[];
    bank_name?: string | null;
    bic?: string | null;
};
export declare enum BankDetailsLookupAvailableDebitScheme {
    Ach = "ach",
    Autogiro = "autogiro",
    Bacs = "bacs",
    Becs = "becs",
    BecsNz = "becs_nz",
    Betalingsservice = "betalingsservice",
    FasterPayments = "faster_payments",
    Pad = "pad",
    PayTo = "pay_to",
    SepaCore = "sepa_core"
}
/** Type for a billingrequest resource. */
export type BillingRequest = {
    actions?: BillingRequestAction[];
    created_at?: string;
    fallback_enabled?: boolean;
    fallback_occurred?: boolean;
    id: string;
    instalment_schedule_request?: BillingRequestInstalmentScheduleRequest | null;
    links?: BillingRequestLinks;
    mandate_request?: BillingRequestMandateRequest;
    metadata?: JsonMap;
    payment_request?: BillingRequestPaymentRequest;
    purpose_code?: BillingRequestPurposeCode;
    resources?: BillingRequestResources;
    status?: BillingRequestStatus;
    subscription_request?: BillingRequestSubscriptionRequest | null;
};
/** Type for a billingrequestcreaterequestlinks resource. */
export type BillingRequestCreateRequestLinks = {
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
};
export declare enum BillingRequestPurposeCode {
    Mortgage = "mortgage",
    Utility = "utility",
    Loan = "loan",
    DependantSupport = "dependant_support",
    Gambling = "gambling",
    Retail = "retail",
    Salary = "salary",
    Personal = "personal",
    Government = "government",
    Pension = "pension",
    Tax = "tax",
    Other = "other",
    Epayment = "Epayment",
    Commercial = "Commercial",
    OtherPayment = "OtherPayment",
    Trade = "Trade"
}
/** Type for a billingrequestcustomer resource. */
export type BillingRequestCustomer = {
    company_name?: string | null;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    language?: string | null;
    metadata?: JsonMap;
    phone_number?: string | null;
};
/** Type for a billingrequestcustomerbillingdetail resource. */
export type BillingRequestCustomerBillingDetail = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    country_code?: string | null;
    danish_identity_number?: string | null;
    ip_address?: string | null;
    postal_code?: string | null;
    region?: string | null;
    swedish_identity_number?: string | null;
};
export declare enum BillingRequestAccountType {
    Savings = "savings",
    Checking = "checking"
}
export declare enum BillingRequestStatus {
    Pending = "pending",
    ReadyToFulfil = "ready_to_fulfil",
    Fulfilling = "fulfilling",
    Fulfilled = "fulfilled",
    Cancelled = "cancelled"
}
export declare enum BillingRequestNotificationType {
    Email = "email"
}
/** Type for a billingrequestaction resource. */
export type BillingRequestAction = {
    available_currencies?: string[];
    bank_authorisation?: BillingRequestActionBankAuthorisation;
    collect_customer_details?: BillingRequestActionCollectCustomerDetails;
    completes_actions?: string[];
    institution_guess_status?: BillingRequestActionInstitutionGuessStatus;
    required?: boolean;
    requires_actions?: string[];
    status?: BillingRequestActionStatus;
    type?: BillingRequestActionType;
};
/** Type for a billingrequestactionbankauthorisation resource. */
export type BillingRequestActionBankAuthorisation = {
    adapter?: BillingRequestActionBankAuthorisationAdapter;
    authorisation_type?: BillingRequestActionBankAuthorisationAuthorisationType;
};
export declare enum BillingRequestActionBankAuthorisationAdapter {
    OpenBankingGatewayPis = "open_banking_gateway_pis",
    PlaidAis = "plaid_ais",
    OpenBankingGatewayAis = "open_banking_gateway_ais",
    BankidAis = "bankid_ais",
    BankPayRecurring = "bank_pay_recurring"
}
export declare enum BillingRequestActionBankAuthorisationAuthorisationType {
    Payment = "payment",
    Mandate = "mandate"
}
/** Type for a billingrequestactioncollectcustomerdetails resource. */
export type BillingRequestActionCollectCustomerDetails = {
    default_country_code?: string;
    incomplete_fields?: BillingRequestActionCollectCustomerDetailsIncompleteFields;
};
/** Type for a billingrequestactioncollectcustomerdetailsincompletefields resource. */
export type BillingRequestActionCollectCustomerDetailsIncompleteFields = {
    customer?: string[];
    customer_billing_detail?: string[];
};
export declare enum BillingRequestActionInstitutionGuessStatus {
    NotNeeded = "not_needed",
    Pending = "pending",
    Failed = "failed",
    Success = "success"
}
export declare enum BillingRequestActionStatus {
    Pending = "pending",
    Completed = "completed"
}
export declare enum BillingRequestActionType {
    ChooseCurrency = "choose_currency",
    CollectAmount = "collect_amount",
    CollectCustomerDetails = "collect_customer_details",
    CollectBankAccount = "collect_bank_account",
    BankAuthorisation = "bank_authorisation",
    ConfirmPayerDetails = "confirm_payer_details",
    SelectInstitution = "select_institution"
}
/** Type for a billingrequestinstalmentschedulerequest resource. */
export type BillingRequestInstalmentScheduleRequest = {
    app_fee?: string | null;
    currency?: string;
    instalments_with_dates?: BillingRequestInstalmentScheduleRequestInstalmentsWithDate[] | null;
    instalments_with_schedule?: BillingRequestInstalmentScheduleRequestInstalmentsWithSchedule | null;
    links?: BillingRequestInstalmentScheduleRequestLinks;
    metadata?: JsonMap;
    name?: string;
    payment_reference?: string | null;
    retry_if_possible?: boolean;
    total_amount?: string;
};
/** Type for a billingrequestinstalmentschedulerequestinstalmentswithdate resource. */
export type BillingRequestInstalmentScheduleRequestInstalmentsWithDate = {
    amount: string;
    charge_date: string | null;
    description?: string | null;
};
/** Type for a billingrequestinstalmentschedulerequestinstalmentswithschedule resource. */
export type BillingRequestInstalmentScheduleRequestInstalmentsWithSchedule = {
    amounts: string[];
    interval: number;
    interval_unit: BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit;
    start_date?: string | null;
};
export declare enum BillingRequestInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly"
}
/** Type for a billingrequestinstalmentschedulerequestlinks resource. */
export type BillingRequestInstalmentScheduleRequestLinks = {
    instalment_schedule?: string;
};
/** Type for a billingrequestlinks resource. */
export type BillingRequestLinks = {
    bank_authorisation?: string;
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
    customer_billing_detail?: string;
    instalment_schedule_request?: string;
    instalment_schedule_request_instalment_schedule?: string;
    mandate_request?: string;
    mandate_request_mandate?: string;
    organisation?: string;
    payment_provider?: string;
    payment_request?: string;
    payment_request_payment?: string;
    subscription_request?: string;
    subscription_request_subscription?: string;
};
/** Type for a billingrequestmandaterequest resource. */
export type BillingRequestMandateRequest = {
    authorisation_source?: BillingRequestMandateRequestAuthorisationSource;
    consent_type?: string | null;
    constraints?: BillingRequestMandateRequestConstraints | null;
    currency?: string;
    description?: string | null;
    funds_settlement?: BillingRequestMandateRequestFundsSettlement;
    links?: BillingRequestMandateRequestLinks;
    metadata?: JsonMap;
    payer_requested_dual_signature?: boolean;
    scheme?: string | null;
    sweeping?: boolean;
    verify?: BillingRequestMandateRequestVerify;
};
export declare enum BillingRequestMandateRequestAuthorisationSource {
    Web = "web",
    Telephone = "telephone",
    Paper = "paper"
}
/** Type for a billingrequestmandaterequestconstraints resource. */
export type BillingRequestMandateRequestConstraints = {
    end_date?: string;
    max_amount_per_payment?: number;
    payment_method?: string;
    periodic_limits?: BillingRequestMandateRequestConstraintsPeriodicLimit[];
    start_date?: string;
};
/** Type for a billingrequestmandaterequestconstraintsperiodiclimit resource. */
export type BillingRequestMandateRequestConstraintsPeriodicLimit = {
    alignment?: BillingRequestMandateRequestConstraintsPeriodicLimitAlignment;
    max_payments?: number;
    max_total_amount?: number;
    period?: BillingRequestMandateRequestConstraintsPeriodicLimitPeriod;
};
export declare enum BillingRequestMandateRequestConstraintsPeriodicLimitAlignment {
    Calendar = "calendar",
    CreationDate = "creation_date"
}
export declare enum BillingRequestMandateRequestConstraintsPeriodicLimitPeriod {
    Day = "day",
    Week = "week",
    Month = "month",
    Year = "year",
    Flexible = "flexible"
}
export declare enum BillingRequestMandateRequestFundsSettlement {
    Managed = "managed",
    Direct = "direct"
}
/** Type for a billingrequestmandaterequestlinks resource. */
export type BillingRequestMandateRequestLinks = {
    mandate?: string;
};
export declare enum BillingRequestMandateRequestVerify {
    Minimum = "minimum",
    Recommended = "recommended",
    WhenAvailable = "when_available",
    Always = "always"
}
/** Type for a billingrequestpaymentrequest resource. */
export type BillingRequestPaymentRequest = {
    amount?: string;
    app_fee?: string | null;
    currency?: string;
    description?: string | null;
    funds_settlement?: BillingRequestPaymentRequestFundsSettlement;
    links?: BillingRequestPaymentRequestLinks;
    metadata?: JsonMap;
    reference?: string | null;
    scheme?: string | null;
};
export declare enum BillingRequestPaymentRequestFundsSettlement {
    Managed = "managed",
    Direct = "direct"
}
/** Type for a billingrequestpaymentrequestlinks resource. */
export type BillingRequestPaymentRequestLinks = {
    payment?: string;
};
/** Type for a billingrequestresources resource. */
export type BillingRequestResources = {
    customer?: BillingRequestResourcesCustomer;
    customer_bank_account?: BillingRequestResourcesCustomerBankAccount | null;
    customer_billing_detail?: BillingRequestResourcesCustomerBillingDetail;
};
/** Type for a billingrequestresourcescustomer resource. */
export type BillingRequestResourcesCustomer = {
    company_name?: string | null;
    created_at?: string;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    id?: string;
    language?: string | null;
    metadata?: JsonMap;
    phone_number?: string | null;
};
/** Type for a billingrequestresourcescustomerbankaccount resource. */
export type BillingRequestResourcesCustomerBankAccount = {
    account_holder_name?: string;
    account_number_ending?: string;
    account_type?: BillingRequestResourcesCustomerBankAccountAccountType;
    bank_account_token?: string | null;
    bank_name?: string;
    country_code?: string | null;
    created_at?: string;
    currency?: string | null;
    enabled?: boolean;
    id?: string;
    links?: BillingRequestResourcesCustomerBankAccountLinks;
    metadata?: JsonMap;
};
export declare enum BillingRequestResourcesCustomerBankAccountAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a billingrequestresourcescustomerbankaccountlinks resource. */
export type BillingRequestResourcesCustomerBankAccountLinks = {
    customer?: string;
};
/** Type for a billingrequestresourcescustomerbillingdetail resource. */
export type BillingRequestResourcesCustomerBillingDetail = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    country_code?: string | null;
    created_at?: string;
    danish_identity_number?: string | null;
    id?: string;
    ip_address?: string | null;
    postal_code?: string | null;
    region?: string | null;
    schemes?: string[];
    swedish_identity_number?: string | null;
};
/** Type for a billingrequestsubscriptionrequest resource. */
export type BillingRequestSubscriptionRequest = {
    amount?: string;
    app_fee?: string | null;
    count?: string | null;
    currency?: string;
    day_of_month?: string | null;
    interval?: string;
    interval_unit?: BillingRequestSubscriptionRequestIntervalUnit;
    links?: BillingRequestSubscriptionRequestLinks;
    metadata?: JsonMap;
    month?: BillingRequestSubscriptionRequestMonth;
    name?: string | null;
    payment_reference?: string | null;
    retry_if_possible?: boolean;
    start_date?: string | null;
};
export declare enum BillingRequestSubscriptionRequestIntervalUnit {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly"
}
/** Type for a billingrequestsubscriptionrequestlinks resource. */
export type BillingRequestSubscriptionRequestLinks = {
    subscription?: string;
};
export declare enum BillingRequestSubscriptionRequestMonth {
    January = "january",
    February = "february",
    March = "march",
    April = "april",
    May = "may",
    June = "june",
    July = "july",
    August = "august",
    September = "september",
    October = "october",
    November = "november",
    December = "december"
}
/** Type for a billingrequestflow resource. */
export type BillingRequestFlow = {
    authorisation_url?: string;
    auto_fulfil?: boolean;
    created_at?: string;
    customer_details_captured?: boolean;
    exit_uri?: string | null;
    expires_at?: string;
    id: string;
    language?: string | null;
    links?: BillingRequestFlowLinks;
    lock_bank_account?: boolean;
    lock_currency?: boolean;
    lock_customer_details?: boolean;
    prefilled_bank_account?: BillingRequestFlowPrefilledBankAccount | null;
    prefilled_customer?: BillingRequestFlowPrefilledCustomer | null;
    redirect_uri?: string | null;
    session_token?: string | null;
    show_redirect_buttons?: boolean;
    show_success_redirect_button?: boolean;
    skip_success_screen?: boolean;
};
/** Type for a billingrequestflowcreaterequestlinks resource. */
export type BillingRequestFlowCreateRequestLinks = {
    billing_request: string;
};
/** Type for a billingrequestflowlinks resource. */
export type BillingRequestFlowLinks = {
    billing_request: string;
};
/** Type for a billingrequestflowprefilledbankaccount resource. */
export type BillingRequestFlowPrefilledBankAccount = {
    account_type?: BillingRequestFlowPrefilledBankAccountAccountType;
};
export declare enum BillingRequestFlowPrefilledBankAccountAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a billingrequestflowprefilledcustomer resource. */
export type BillingRequestFlowPrefilledCustomer = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    company_name?: string | null;
    country_code?: string | null;
    danish_identity_number?: string | null;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    postal_code?: string | null;
    region?: string | null;
    swedish_identity_number?: string | null;
};
/** Type for a billingrequesttemplate resource. */
export type BillingRequestTemplate = {
    authorisation_url?: string;
    created_at?: string;
    id?: string;
    mandate_request_constraints?: BillingRequestTemplateMandateRequestConstraints | null;
    mandate_request_currency?: string;
    mandate_request_description?: string | null;
    mandate_request_metadata?: JsonMap | null;
    mandate_request_scheme?: string | null;
    mandate_request_verify?: BillingRequestTemplateMandateRequestVerify;
    metadata?: JsonMap;
    name?: string;
    payment_request_amount?: string;
    payment_request_currency?: string;
    payment_request_description?: string | null;
    payment_request_metadata?: JsonMap | null;
    payment_request_scheme?: string | null;
    redirect_uri?: string | null;
    updated_at?: string;
};
/** Type for a billingrequesttemplatecreaterequestlinks resource. */
export type BillingRequestTemplateCreateRequestLinks = {
    creditor?: string;
};
export declare enum BillingRequestTemplateMandateRequestVerify {
    Minimum = "minimum",
    Recommended = "recommended",
    WhenAvailable = "when_available",
    Always = "always"
}
/** Type for a billingrequesttemplatemandaterequestconstraints resource. */
export type BillingRequestTemplateMandateRequestConstraints = {
    end_date?: string;
    max_amount_per_payment?: number;
    payment_method?: string;
    periodic_limits?: BillingRequestTemplateMandateRequestConstraintsPeriodicLimit[];
    start_date?: string;
};
/** Type for a billingrequesttemplatemandaterequestconstraintsperiodiclimit resource. */
export type BillingRequestTemplateMandateRequestConstraintsPeriodicLimit = {
    alignment?: BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment;
    max_payments?: number;
    max_total_amount?: number;
    period?: BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod;
};
export declare enum BillingRequestTemplateMandateRequestConstraintsPeriodicLimitAlignment {
    Calendar = "calendar",
    CreationDate = "creation_date"
}
export declare enum BillingRequestTemplateMandateRequestConstraintsPeriodicLimitPeriod {
    Day = "day",
    Week = "week",
    Month = "month",
    Year = "year",
    Flexible = "flexible"
}
/** Type for a billingrequestwithaction resource. */
export type BillingRequestWithAction = {
    bank_authorisations?: BillingRequestWithActionBankAuthorisations;
    billing_requests: BillingRequestWithActionBillingRequests;
};
/** Type for a billingrequestwithactionactions resource. */
export type BillingRequestWithActionActions = {
    bank_authorisation_redirect_uri?: string;
    collect_bank_account?: BillingRequestWithActionActionsCollectBankAccount;
    collect_customer_details?: BillingRequestWithActionActionsCollectCustomerDetails;
    confirm_payer_details?: BillingRequestWithActionActionsConfirmPayerDetails;
    create_bank_authorisation?: boolean;
    select_institution?: BillingRequestWithActionActionsSelectInstitution;
};
/** Type for a billingrequestwithactionactionscollectbankaccount resource. */
export type BillingRequestWithActionActionsCollectBankAccount = {
    account_holder_name?: string;
    account_number?: string | null;
    account_number_suffix?: string | null;
    account_type?: BillingRequestWithActionActionsCollectBankAccountAccountType;
    bank_code?: string | null;
    branch_code?: string | null;
    country_code?: string | null;
    currency?: string | null;
    iban?: string | null;
    metadata?: JsonMap;
    pay_id?: string;
};
export declare enum BillingRequestWithActionActionsCollectBankAccountAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a billingrequestwithactionactionscollectcustomerdetails resource. */
export type BillingRequestWithActionActionsCollectCustomerDetails = {
    customer?: BillingRequestWithActionActionsCollectCustomerDetailsCustomer;
    customer_billing_detail?: BillingRequestWithActionActionsCollectCustomerDetailsCustomerBillingDetail;
};
/** Type for a billingrequestwithactionactionscollectcustomerdetailscustomer resource. */
export type BillingRequestWithActionActionsCollectCustomerDetailsCustomer = {
    company_name?: string | null;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    language?: string | null;
    metadata?: JsonMap;
    phone_number?: string | null;
};
/** Type for a billingrequestwithactionactionscollectcustomerdetailscustomerbillingdetail resource. */
export type BillingRequestWithActionActionsCollectCustomerDetailsCustomerBillingDetail = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    country_code?: string | null;
    danish_identity_number?: string | null;
    ip_address?: string | null;
    postal_code?: string | null;
    region?: string | null;
    swedish_identity_number?: string | null;
};
/** Type for a billingrequestwithactionactionsconfirmpayerdetails resource. */
export type BillingRequestWithActionActionsConfirmPayerDetails = {
    metadata?: JsonMap;
    payer_requested_dual_signature?: boolean;
};
/** Type for a billingrequestwithactionactionsselectinstitution resource. */
export type BillingRequestWithActionActionsSelectInstitution = {
    country_code: string;
    institution: string;
};
/** Type for a billingrequestwithactioncreatewithactionsrequestlinks resource. */
export type BillingRequestWithActionCreateWithActionsRequestLinks = {
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
};
/** Type for a billingrequestwithactionmandaterequest resource. */
export type BillingRequestWithActionMandateRequest = {
    authorisation_source?: BillingRequestWithActionMandateRequestAuthorisationSource;
    constraints?: BillingRequestWithActionMandateRequestConstraints | null;
    currency?: string;
    description?: string | null;
    funds_settlement?: BillingRequestWithActionMandateRequestFundsSettlement;
    metadata?: JsonMap;
    reference?: string | null;
    scheme?: string | null;
    sweeping?: boolean;
    verify?: BillingRequestWithActionMandateRequestVerify;
};
export declare enum BillingRequestWithActionMandateRequestAuthorisationSource {
    Web = "web",
    Telephone = "telephone",
    Paper = "paper"
}
/** Type for a billingrequestwithactionmandaterequestconstraints resource. */
export type BillingRequestWithActionMandateRequestConstraints = {
    end_date?: string;
    max_amount_per_payment?: number;
    payment_method?: string;
    periodic_limits?: BillingRequestWithActionMandateRequestConstraintsPeriodicLimit[];
    start_date?: string;
};
/** Type for a billingrequestwithactionmandaterequestconstraintsperiodiclimit resource. */
export type BillingRequestWithActionMandateRequestConstraintsPeriodicLimit = {
    alignment?: BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment;
    max_payments?: number;
    max_total_amount?: number;
    period?: BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod;
};
export declare enum BillingRequestWithActionMandateRequestConstraintsPeriodicLimitAlignment {
    Calendar = "calendar",
    CreationDate = "creation_date"
}
export declare enum BillingRequestWithActionMandateRequestConstraintsPeriodicLimitPeriod {
    Day = "day",
    Week = "week",
    Month = "month",
    Year = "year",
    Flexible = "flexible"
}
export declare enum BillingRequestWithActionMandateRequestFundsSettlement {
    Managed = "managed",
    Direct = "direct"
}
export declare enum BillingRequestWithActionMandateRequestVerify {
    Minimum = "minimum",
    Recommended = "recommended",
    WhenAvailable = "when_available",
    Always = "always"
}
/** Type for a billingrequestwithactionpaymentrequest resource. */
export type BillingRequestWithActionPaymentRequest = {
    amount?: string;
    app_fee?: string | null;
    currency?: string;
    description?: string | null;
    funds_settlement?: BillingRequestWithActionPaymentRequestFundsSettlement;
    metadata?: JsonMap;
    reference?: string | null;
    retry_if_possible?: boolean;
    scheme?: string | null;
};
export declare enum BillingRequestWithActionPaymentRequestFundsSettlement {
    Managed = "managed",
    Direct = "direct"
}
export declare enum BillingRequestWithActionPurposeCode {
    Mortgage = "mortgage",
    Utility = "utility",
    Loan = "loan",
    DependantSupport = "dependant_support",
    Gambling = "gambling",
    Retail = "retail",
    Salary = "salary",
    Personal = "personal",
    Government = "government",
    Pension = "pension",
    Tax = "tax",
    Other = "other",
    Epayment = "Epayment",
    Commercial = "Commercial",
    OtherPayment = "OtherPayment",
    Trade = "Trade"
}
/** Type for a billingrequestwithactionbankauthorisations resource. */
export type BillingRequestWithActionBankAuthorisations = {
    authorisation_type?: BillingRequestWithActionBankAuthorisationsAuthorisationType;
    authorised_at?: string | null;
    created_at?: string;
    expires_at?: string;
    id: string;
    last_visited_at?: string | null;
    links?: BillingRequestWithActionBankAuthorisationsLinks;
    qr_code_url?: string | null;
    redirect_uri?: string;
    url?: string;
};
/** Type for a billingrequestwithactionbankauthorisationscreaterequestlinks resource. */
export type BillingRequestWithActionBankAuthorisationsCreateRequestLinks = {
    billing_request?: string;
};
export declare enum BillingRequestWithActionBankAuthorisationsAuthorisationType {
    Mandate = "mandate",
    Payment = "payment"
}
/** Type for a billingrequestwithactionbankauthorisationslinks resource. */
export type BillingRequestWithActionBankAuthorisationsLinks = {
    billing_request?: string;
    institution?: string;
};
/** Type for a billingrequestwithactionbillingrequests resource. */
export type BillingRequestWithActionBillingRequests = {
    actions?: BillingRequestWithActionBillingRequestsAction[];
    created_at?: string;
    fallback_enabled?: boolean;
    fallback_occurred?: boolean;
    id: string;
    instalment_schedule_request?: BillingRequestWithActionBillingRequestsInstalmentScheduleRequest | null;
    links?: BillingRequestWithActionBillingRequestsLinks;
    mandate_request?: BillingRequestWithActionBillingRequestsMandateRequest;
    metadata?: JsonMap;
    payment_request?: BillingRequestWithActionBillingRequestsPaymentRequest;
    purpose_code?: BillingRequestWithActionBillingRequestsPurposeCode;
    resources?: BillingRequestWithActionBillingRequestsResources;
    status?: BillingRequestWithActionBillingRequestsStatus;
    subscription_request?: BillingRequestWithActionBillingRequestsSubscriptionRequest | null;
};
/** Type for a billingrequestwithactionbillingrequestscreaterequestlinks resource. */
export type BillingRequestWithActionBillingRequestsCreateRequestLinks = {
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
};
export declare enum BillingRequestWithActionBillingRequestsPurposeCode {
    Mortgage = "mortgage",
    Utility = "utility",
    Loan = "loan",
    DependantSupport = "dependant_support",
    Gambling = "gambling",
    Retail = "retail",
    Salary = "salary",
    Personal = "personal",
    Government = "government",
    Pension = "pension",
    Tax = "tax",
    Other = "other",
    Epayment = "Epayment",
    Commercial = "Commercial",
    OtherPayment = "OtherPayment",
    Trade = "Trade"
}
/** Type for a billingrequestwithactionbillingrequestscustomer resource. */
export type BillingRequestWithActionBillingRequestsCustomer = {
    company_name?: string | null;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    language?: string | null;
    metadata?: JsonMap;
    phone_number?: string | null;
};
/** Type for a billingrequestwithactionbillingrequestscustomerbillingdetail resource. */
export type BillingRequestWithActionBillingRequestsCustomerBillingDetail = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    country_code?: string | null;
    danish_identity_number?: string | null;
    ip_address?: string | null;
    postal_code?: string | null;
    region?: string | null;
    swedish_identity_number?: string | null;
};
export declare enum BillingRequestWithActionBillingRequestsAccountType {
    Savings = "savings",
    Checking = "checking"
}
export declare enum BillingRequestWithActionBillingRequestsStatus {
    Pending = "pending",
    ReadyToFulfil = "ready_to_fulfil",
    Fulfilling = "fulfilling",
    Fulfilled = "fulfilled",
    Cancelled = "cancelled"
}
export declare enum BillingRequestWithActionBillingRequestsNotificationType {
    Email = "email"
}
/** Type for a billingrequestwithactionbillingrequestsaction resource. */
export type BillingRequestWithActionBillingRequestsAction = {
    available_currencies?: string[];
    bank_authorisation?: BillingRequestWithActionBillingRequestsActionBankAuthorisation;
    collect_customer_details?: BillingRequestWithActionBillingRequestsActionCollectCustomerDetails;
    completes_actions?: string[];
    institution_guess_status?: BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus;
    required?: boolean;
    requires_actions?: string[];
    status?: BillingRequestWithActionBillingRequestsActionStatus;
    type?: BillingRequestWithActionBillingRequestsActionType;
};
/** Type for a billingrequestwithactionbillingrequestsactionbankauthorisation resource. */
export type BillingRequestWithActionBillingRequestsActionBankAuthorisation = {
    adapter?: BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter;
    authorisation_type?: BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType;
};
export declare enum BillingRequestWithActionBillingRequestsActionBankAuthorisationAdapter {
    OpenBankingGatewayPis = "open_banking_gateway_pis",
    PlaidAis = "plaid_ais",
    OpenBankingGatewayAis = "open_banking_gateway_ais",
    BankidAis = "bankid_ais",
    BankPayRecurring = "bank_pay_recurring"
}
export declare enum BillingRequestWithActionBillingRequestsActionBankAuthorisationAuthorisationType {
    Payment = "payment",
    Mandate = "mandate"
}
/** Type for a billingrequestwithactionbillingrequestsactioncollectcustomerdetails resource. */
export type BillingRequestWithActionBillingRequestsActionCollectCustomerDetails = {
    default_country_code?: string;
    incomplete_fields?: BillingRequestWithActionBillingRequestsActionCollectCustomerDetailsIncompleteFields;
};
/** Type for a billingrequestwithactionbillingrequestsactioncollectcustomerdetailsincompletefields resource. */
export type BillingRequestWithActionBillingRequestsActionCollectCustomerDetailsIncompleteFields = {
    customer?: string[];
    customer_billing_detail?: string[];
};
export declare enum BillingRequestWithActionBillingRequestsActionInstitutionGuessStatus {
    NotNeeded = "not_needed",
    Pending = "pending",
    Failed = "failed",
    Success = "success"
}
export declare enum BillingRequestWithActionBillingRequestsActionStatus {
    Pending = "pending",
    Completed = "completed"
}
export declare enum BillingRequestWithActionBillingRequestsActionType {
    ChooseCurrency = "choose_currency",
    CollectAmount = "collect_amount",
    CollectCustomerDetails = "collect_customer_details",
    CollectBankAccount = "collect_bank_account",
    BankAuthorisation = "bank_authorisation",
    ConfirmPayerDetails = "confirm_payer_details",
    SelectInstitution = "select_institution"
}
/** Type for a billingrequestwithactionbillingrequestsinstalmentschedulerequest resource. */
export type BillingRequestWithActionBillingRequestsInstalmentScheduleRequest = {
    app_fee?: string | null;
    currency?: string;
    instalments_with_dates?: BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithDate[] | null;
    instalments_with_schedule?: BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithSchedule | null;
    links?: BillingRequestWithActionBillingRequestsInstalmentScheduleRequestLinks;
    metadata?: JsonMap;
    name?: string;
    payment_reference?: string | null;
    retry_if_possible?: boolean;
    total_amount?: string;
};
/** Type for a billingrequestwithactionbillingrequestsinstalmentschedulerequestinstalmentswithdate resource. */
export type BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithDate = {
    amount: string;
    charge_date: string | null;
    description?: string | null;
};
/** Type for a billingrequestwithactionbillingrequestsinstalmentschedulerequestinstalmentswithschedule resource. */
export type BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithSchedule = {
    amounts: string[];
    interval: number;
    interval_unit: BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit;
    start_date?: string | null;
};
export declare enum BillingRequestWithActionBillingRequestsInstalmentScheduleRequestInstalmentsWithScheduleIntervalUnit {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly"
}
/** Type for a billingrequestwithactionbillingrequestsinstalmentschedulerequestlinks resource. */
export type BillingRequestWithActionBillingRequestsInstalmentScheduleRequestLinks = {
    instalment_schedule?: string;
};
/** Type for a billingrequestwithactionbillingrequestslinks resource. */
export type BillingRequestWithActionBillingRequestsLinks = {
    bank_authorisation?: string;
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
    customer_billing_detail?: string;
    instalment_schedule_request?: string;
    instalment_schedule_request_instalment_schedule?: string;
    mandate_request?: string;
    mandate_request_mandate?: string;
    organisation?: string;
    payment_provider?: string;
    payment_request?: string;
    payment_request_payment?: string;
    subscription_request?: string;
    subscription_request_subscription?: string;
};
/** Type for a billingrequestwithactionbillingrequestsmandaterequest resource. */
export type BillingRequestWithActionBillingRequestsMandateRequest = {
    authorisation_source?: BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource;
    consent_type?: string | null;
    constraints?: BillingRequestWithActionBillingRequestsMandateRequestConstraints | null;
    currency?: string;
    description?: string | null;
    funds_settlement?: BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement;
    links?: BillingRequestWithActionBillingRequestsMandateRequestLinks;
    metadata?: JsonMap;
    payer_requested_dual_signature?: boolean;
    scheme?: string | null;
    sweeping?: boolean;
    verify?: BillingRequestWithActionBillingRequestsMandateRequestVerify;
};
export declare enum BillingRequestWithActionBillingRequestsMandateRequestAuthorisationSource {
    Web = "web",
    Telephone = "telephone",
    Paper = "paper"
}
/** Type for a billingrequestwithactionbillingrequestsmandaterequestconstraints resource. */
export type BillingRequestWithActionBillingRequestsMandateRequestConstraints = {
    end_date?: string;
    max_amount_per_payment?: number;
    payment_method?: string;
    periodic_limits?: BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimit[];
    start_date?: string;
};
/** Type for a billingrequestwithactionbillingrequestsmandaterequestconstraintsperiodiclimit resource. */
export type BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimit = {
    alignment?: BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment;
    max_payments?: number;
    max_total_amount?: number;
    period?: BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod;
};
export declare enum BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitAlignment {
    Calendar = "calendar",
    CreationDate = "creation_date"
}
export declare enum BillingRequestWithActionBillingRequestsMandateRequestConstraintsPeriodicLimitPeriod {
    Day = "day",
    Week = "week",
    Month = "month",
    Year = "year",
    Flexible = "flexible"
}
export declare enum BillingRequestWithActionBillingRequestsMandateRequestFundsSettlement {
    Managed = "managed",
    Direct = "direct"
}
/** Type for a billingrequestwithactionbillingrequestsmandaterequestlinks resource. */
export type BillingRequestWithActionBillingRequestsMandateRequestLinks = {
    mandate?: string;
};
export declare enum BillingRequestWithActionBillingRequestsMandateRequestVerify {
    Minimum = "minimum",
    Recommended = "recommended",
    WhenAvailable = "when_available",
    Always = "always"
}
/** Type for a billingrequestwithactionbillingrequestspaymentrequest resource. */
export type BillingRequestWithActionBillingRequestsPaymentRequest = {
    amount?: string;
    app_fee?: string | null;
    currency?: string;
    description?: string | null;
    funds_settlement?: BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement;
    links?: BillingRequestWithActionBillingRequestsPaymentRequestLinks;
    metadata?: JsonMap;
    reference?: string | null;
    scheme?: string | null;
};
export declare enum BillingRequestWithActionBillingRequestsPaymentRequestFundsSettlement {
    Managed = "managed",
    Direct = "direct"
}
/** Type for a billingrequestwithactionbillingrequestspaymentrequestlinks resource. */
export type BillingRequestWithActionBillingRequestsPaymentRequestLinks = {
    payment?: string;
};
/** Type for a billingrequestwithactionbillingrequestsresources resource. */
export type BillingRequestWithActionBillingRequestsResources = {
    customer?: BillingRequestWithActionBillingRequestsResourcesCustomer;
    customer_bank_account?: BillingRequestWithActionBillingRequestsResourcesCustomerBankAccount | null;
    customer_billing_detail?: BillingRequestWithActionBillingRequestsResourcesCustomerBillingDetail;
};
/** Type for a billingrequestwithactionbillingrequestsresourcescustomer resource. */
export type BillingRequestWithActionBillingRequestsResourcesCustomer = {
    company_name?: string | null;
    created_at?: string;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    id?: string;
    language?: string | null;
    metadata?: JsonMap;
    phone_number?: string | null;
};
/** Type for a billingrequestwithactionbillingrequestsresourcescustomerbankaccount resource. */
export type BillingRequestWithActionBillingRequestsResourcesCustomerBankAccount = {
    account_holder_name?: string;
    account_number_ending?: string;
    account_type?: BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType;
    bank_account_token?: string | null;
    bank_name?: string;
    country_code?: string | null;
    created_at?: string;
    currency?: string | null;
    enabled?: boolean;
    id?: string;
    links?: BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountLinks;
    metadata?: JsonMap;
};
export declare enum BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a billingrequestwithactionbillingrequestsresourcescustomerbankaccountlinks resource. */
export type BillingRequestWithActionBillingRequestsResourcesCustomerBankAccountLinks = {
    customer?: string;
};
/** Type for a billingrequestwithactionbillingrequestsresourcescustomerbillingdetail resource. */
export type BillingRequestWithActionBillingRequestsResourcesCustomerBillingDetail = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    country_code?: string | null;
    created_at?: string;
    danish_identity_number?: string | null;
    id?: string;
    ip_address?: string | null;
    postal_code?: string | null;
    region?: string | null;
    schemes?: string[];
    swedish_identity_number?: string | null;
};
/** Type for a billingrequestwithactionbillingrequestssubscriptionrequest resource. */
export type BillingRequestWithActionBillingRequestsSubscriptionRequest = {
    amount?: string;
    app_fee?: string | null;
    count?: string | null;
    currency?: string;
    day_of_month?: string | null;
    interval?: string;
    interval_unit?: BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit;
    links?: BillingRequestWithActionBillingRequestsSubscriptionRequestLinks;
    metadata?: JsonMap;
    month?: BillingRequestWithActionBillingRequestsSubscriptionRequestMonth;
    name?: string | null;
    payment_reference?: string | null;
    retry_if_possible?: boolean;
    start_date?: string | null;
};
export declare enum BillingRequestWithActionBillingRequestsSubscriptionRequestIntervalUnit {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly"
}
/** Type for a billingrequestwithactionbillingrequestssubscriptionrequestlinks resource. */
export type BillingRequestWithActionBillingRequestsSubscriptionRequestLinks = {
    subscription?: string;
};
export declare enum BillingRequestWithActionBillingRequestsSubscriptionRequestMonth {
    January = "january",
    February = "february",
    March = "march",
    April = "april",
    May = "may",
    June = "june",
    July = "july",
    August = "august",
    September = "september",
    October = "october",
    November = "november",
    December = "december"
}
/** Type for a block resource. */
export type Block = {
    active?: boolean | null;
    block_type?: BlockBlockType;
    created_at?: string;
    id?: string;
    reason_description?: string | null;
    reason_type?: BlockReasonType;
    resource_reference?: string;
    updated_at?: string;
};
export declare enum BlockBlockType {
    Email = "email",
    EmailDomain = "email_domain",
    BankAccount = "bank_account",
    BankName = "bank_name"
}
export declare enum BlockReasonType {
    IdentityFraud = "identity_fraud",
    NoIntentToPay = "no_intent_to_pay",
    UnfairChargeback = "unfair_chargeback",
    Other = "other"
}
export declare enum BlockReferenceType {
    Customer = "customer",
    Mandate = "mandate"
}
/** Type for a creditor resource. */
export type Creditor = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    bank_reference_prefix?: string;
    can_create_refunds?: boolean;
    city?: string | null;
    country_code?: string | null;
    created_at?: string;
    creditor_type?: CreditorCreditorType;
    custom_payment_pages_enabled?: boolean;
    fx_payout_currency?: CreditorFxPayoutCurrency;
    id?: string;
    links?: CreditorLinks;
    logo_url?: string | null;
    mandate_imports_enabled?: boolean;
    merchant_responsible_for_notifications?: boolean;
    name?: string;
    postal_code?: string | null;
    region?: string | null;
    scheme_identifiers?: CreditorSchemeIdentifier[];
    verification_status?: CreditorVerificationStatus;
};
export declare enum CreditorCreditorType {
    Company = "company",
    Individual = "individual",
    Charity = "charity",
    Partnership = "partnership",
    Trust = "trust"
}
/** Type for a creditorupdaterequestlinks resource. */
export type CreditorUpdateRequestLinks = {
    default_aud_payout_account?: string | null;
    default_cad_payout_account?: string | null;
    default_dkk_payout_account?: string | null;
    default_eur_payout_account?: string | null;
    default_gbp_payout_account?: string | null;
    default_nzd_payout_account?: string | null;
    default_sek_payout_account?: string | null;
    default_usd_payout_account?: string | null;
};
export declare enum CreditorFxPayoutCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a creditorlinks resource. */
export type CreditorLinks = {
    default_aud_payout_account?: string | null;
    default_cad_payout_account?: string | null;
    default_dkk_payout_account?: string | null;
    default_eur_payout_account?: string | null;
    default_gbp_payout_account?: string | null;
    default_nzd_payout_account?: string | null;
    default_sek_payout_account?: string | null;
    default_usd_payout_account?: string | null;
};
/** Type for a creditorschemeidentifier resource. */
export type CreditorSchemeIdentifier = {
    address_line1?: string;
    address_line2?: string | null;
    address_line3?: string | null;
    can_specify_mandate_reference?: boolean;
    city?: string;
    country_code?: string;
    created_at?: string;
    currency?: CreditorSchemeIdentifierCurrency;
    email?: string;
    id?: string;
    minimum_advance_notice?: number;
    name?: string;
    phone_number?: string;
    postal_code?: string;
    reference?: string;
    region?: string | null;
    scheme?: CreditorSchemeIdentifierScheme;
    status?: CreditorSchemeIdentifierStatus;
};
export declare enum CreditorSchemeIdentifierCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
export declare enum CreditorSchemeIdentifierScheme {
    Ach = "ach",
    Autogiro = "autogiro",
    Bacs = "bacs",
    Becs = "becs",
    BecsNz = "becs_nz",
    Betalingsservice = "betalingsservice",
    FasterPayments = "faster_payments",
    Pad = "pad",
    PayTo = "pay_to",
    Sepa = "sepa",
    SepaCreditTransfer = "sepa_credit_transfer",
    SepaInstantCreditTransfer = "sepa_instant_credit_transfer"
}
export declare enum CreditorSchemeIdentifierStatus {
    Pending = "pending",
    Active = "active"
}
export declare enum CreditorVerificationStatus {
    Successful = "successful",
    InReview = "in_review",
    ActionRequired = "action_required"
}
/** Type for a creditorbankaccount resource. */
export type CreditorBankAccount = {
    account_holder_name?: string;
    account_number_ending?: string;
    account_type?: CreditorBankAccountAccountType;
    bank_name?: string;
    country_code?: string | null;
    created_at?: string;
    currency?: string | null;
    enabled?: boolean;
    id?: string;
    links?: CreditorBankAccountLinks;
    metadata?: JsonMap;
    verification_status?: CreditorBankAccountVerificationStatus;
};
export declare enum CreditorBankAccountAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a creditorbankaccountcreaterequestlinks resource. */
export type CreditorBankAccountCreateRequestLinks = {
    creditor: string;
};
/** Type for a creditorbankaccountlinks resource. */
export type CreditorBankAccountLinks = {
    creditor?: string;
};
export declare enum CreditorBankAccountVerificationStatus {
    Pending = "pending",
    InReview = "in_review",
    Successful = "successful",
    CouldNotVerify = "could_not_verify"
}
/** Type for a currencyexchangerate resource. */
export type CurrencyExchangeRate = {
    rate?: string;
    source?: string;
    target?: string;
    time?: string;
};
/** Type for a customer resource. */
export type Customer = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    company_name?: string | null;
    country_code?: string | null;
    created_at?: string;
    danish_identity_number?: string | null;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    id?: string;
    language?: string | null;
    metadata?: JsonMap;
    phone_number?: string | null;
    postal_code?: string | null;
    region?: string | null;
    swedish_identity_number?: string | null;
};
export declare enum CustomerCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
export declare enum CustomerSortDirection {
    Asc = "asc",
    Desc = "desc"
}
export declare enum CustomerSortField {
    Name = "name",
    CompanyName = "company_name",
    CreatedAt = "created_at"
}
/** Type for a customerbankaccount resource. */
export type CustomerBankAccount = {
    account_holder_name?: string;
    account_number_ending?: string;
    account_type?: CustomerBankAccountAccountType;
    bank_account_token?: string | null;
    bank_name?: string;
    country_code?: string | null;
    created_at?: string;
    currency?: string | null;
    enabled?: boolean;
    id?: string;
    links?: CustomerBankAccountLinks;
    metadata?: JsonMap;
};
export declare enum CustomerBankAccountAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a customerbankaccountcreaterequestlinks resource. */
export type CustomerBankAccountCreateRequestLinks = {
    customer: string;
    customer_bank_account_token?: string;
};
/** Type for a customerbankaccountlinks resource. */
export type CustomerBankAccountLinks = {
    customer?: string;
};
/** Type for a customernotification resource. */
export type CustomerNotification = {
    action_taken?: CustomerNotificationActionTaken;
    action_taken_at?: string | null;
    action_taken_by?: string | null;
    id?: string;
    links?: CustomerNotificationLinks;
    type?: CustomerNotificationType;
};
export declare enum CustomerNotificationActionTaken {
    Handled = "handled"
}
/** Type for a customernotificationlinks resource. */
export type CustomerNotificationLinks = {
    customer: string;
    event: string;
    mandate?: string;
    payment?: string;
    refund?: string;
    subscription?: string;
};
export declare enum CustomerNotificationType {
    PaymentCreated = "payment_created",
    PaymentCancelled = "payment_cancelled",
    MandateCreated = "mandate_created",
    MandateBlocked = "mandate_blocked",
    SubscriptionCreated = "subscription_created",
    SubscriptionCancelled = "subscription_cancelled",
    InstalmentScheduleCreated = "instalment_schedule_created",
    InstalmentScheduleCancelled = "instalment_schedule_cancelled"
}
/** Type for a event resource. */
export type Event = {
    action?: string;
    created_at?: string;
    customer_notifications?: EventCustomerNotification[] | null;
    details?: EventDetails;
    id?: string;
    links?: EventLinks;
    metadata?: JsonMap;
    resource_metadata?: JsonMap;
    resource_type?: EventResourceType;
    source?: EventSource;
};
export declare enum EventInclude {
    BillingRequest = "billing_request",
    Creditor = "creditor",
    Customer = "customer",
    InstalmentSchedule = "instalment_schedule",
    Mandate = "mandate",
    OutboundPayment = "outbound_payment",
    PayerAuthorisation = "payer_authorisation",
    Payment = "payment",
    Payout = "payout",
    Refund = "refund",
    SchemeIdentifier = "scheme_identifier",
    Subscription = "subscription"
}
/** Type for a eventcustomernotification resource. */
export type EventCustomerNotification = {
    deadline?: string;
    id?: string;
    mandatory?: boolean;
    type?: string;
};
/** Type for a eventdetails resource. */
export type EventDetails = {
    bank_account_id?: string;
    cause?: string;
    currency?: string;
    description?: string;
    item_count?: number;
    not_retried_reason?: string;
    origin?: EventDetailsOrigin;
    property?: string;
    reason_code?: string;
    scheme?: EventDetailsScheme;
    will_attempt_retry?: boolean;
};
export declare enum EventDetailsOrigin {
    Bank = "bank",
    Api = "api",
    Gocardless = "gocardless",
    Customer = "customer",
    Payer = "payer"
}
export declare enum EventDetailsScheme {
    Ach = "ach",
    Autogiro = "autogiro",
    Bacs = "bacs",
    Becs = "becs",
    BecsNz = "becs_nz",
    Betalingsservice = "betalingsservice",
    FasterPayments = "faster_payments",
    Pad = "pad",
    PayTo = "pay_to",
    SepaCore = "sepa_core",
    SepaCor1 = "sepa_cor1"
}
/** Type for a eventlinks resource. */
export type EventLinks = {
    bank_authorisation?: string;
    billing_request?: string;
    billing_request_flow?: string;
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
    instalment_schedule?: string;
    mandate?: string;
    mandate_request?: string;
    mandate_request_mandate?: string;
    new_customer_bank_account?: string;
    new_mandate?: string;
    organisation?: string;
    outbound_payment?: string;
    parent_event?: string;
    payer_authorisation?: string;
    payment?: string;
    payment_request_payment?: string;
    payout?: string;
    previous_customer_bank_account?: string;
    refund?: string;
    scheme_identifier?: string;
    subscription?: string;
};
export declare enum EventResourceType {
    BillingRequests = "billing_requests",
    Creditors = "creditors",
    Customers = "customers",
    Exports = "exports",
    InstalmentSchedules = "instalment_schedules",
    Mandates = "mandates",
    Organisations = "organisations",
    OutboundPayments = "outbound_payments",
    PayerAuthorisations = "payer_authorisations",
    Payments = "payments",
    Payouts = "payouts",
    Refunds = "refunds",
    SchemeIdentifiers = "scheme_identifiers",
    Subscriptions = "subscriptions"
}
/** Type for a eventsource resource. */
export type EventSource = {
    name?: string;
    type?: EventSourceType;
};
export declare enum EventSourceType {
    App = "app",
    User = "user",
    GcTeam = "gc_team",
    AccessToken = "access_token"
}
/** Type for a export resource. */
export type Export = {
    created_at?: string;
    currency?: string;
    download_url?: string | null;
    export_type?: ExportExportType;
    id?: string;
};
export declare enum ExportExportType {
    PaymentsIndex = "payments_index",
    EventsIndex = "events_index",
    RefundsIndex = "refunds_index",
    PayoutsIndex = "payouts_index",
    CustomersIndex = "customers_index",
    SubscriptionsIndex = "subscriptions_index",
    PaymentEvents = "payment_events",
    SubscriptionEvents = "subscription_events",
    PayoutEvents = "payout_events",
    RefundEvents = "refund_events",
    MandateEvents = "mandate_events",
    PayoutEventsBreakdown = "payout_events_breakdown",
    PayoutEventsReconciliation = "payout_events_reconciliation",
    PayoutTransactionsBreakdown = "payout_transactions_breakdown",
    PayoutTransactionsReconciliation = "payout_transactions_reconciliation",
    AuthorisationRequests = "authorisation_requests",
    CustomerBankAccounts = "customer_bank_accounts",
    Users = "users",
    OrganisationAuthorisations = "organisation_authorisations",
    GcInvalidAuthorisationRequests = "gc_invalid_authorisation_requests",
    PartnerFees = "partner_fees",
    PaymentsImportTemplate = "payments_import_template",
    PaymentAccountStatement = "payment_account_statement"
}
/** Type for a fundsavailability resource. */
export type FundsAvailability = {
    available?: boolean;
};
/** Type for a instalmentschedule resource. */
export type InstalmentSchedule = {
    created_at?: string;
    currency?: InstalmentScheduleCurrency;
    id?: string;
    links?: InstalmentScheduleLinks;
    metadata?: JsonMap;
    name?: string;
    payment_errors?: JsonMap;
    status?: InstalmentScheduleStatus;
    total_amount?: string;
};
export declare enum InstalmentScheduleCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a instalmentscheduleinstalment resource. */
export type InstalmentScheduleInstalment = {
    amount: string;
    charge_date: string | null;
    description?: string | null;
};
/** Type for a instalmentschedulecreatewithdatesrequestlinks resource. */
export type InstalmentScheduleCreateWithDatesRequestLinks = {
    mandate: string;
};
/** Type for a instalmentscheduleinstalments resource. */
export type InstalmentScheduleInstalments = {
    amounts: string[];
    interval: number;
    interval_unit: InstalmentScheduleInstalmentsIntervalUnit;
    start_date?: string | null;
};
export declare enum InstalmentScheduleInstalmentsIntervalUnit {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly"
}
/** Type for a instalmentschedulecreatewithschedulerequestlinks resource. */
export type InstalmentScheduleCreateWithScheduleRequestLinks = {
    mandate: string;
};
/** Type for a instalmentschedulelinks resource. */
export type InstalmentScheduleLinks = {
    customer: string;
    mandate: string;
    payments?: string[];
};
export declare enum InstalmentScheduleStatus {
    Pending = "pending",
    Active = "active",
    CreationFailed = "creation_failed",
    Completed = "completed",
    Cancelled = "cancelled",
    Errored = "errored"
}
/** Type for a institution resource. */
export type Institution = {
    autocompletes_collect_bank_account?: boolean;
    country_code?: string;
    icon_url?: string;
    id?: string;
    limits?: InstitutionLimits | null;
    logo_url?: string;
    name?: string;
    status?: InstitutionStatus;
};
/** Type for a institutionbranchcode resource. */
export type InstitutionBranchCode = {};
/** Type for a institutionfeature resource. */
export type InstitutionFeature = {};
/** Type for a institutionscheme resource. */
export type InstitutionScheme = {};
/** Type for a institutionid resource. */
export type InstitutionId = {};
/** Type for a institutionlimits resource. */
export type InstitutionLimits = {
    daily?: JsonMap | null;
    single?: JsonMap | null;
};
export declare enum InstitutionStatus {
    Enabled = "enabled",
    Disabled = "disabled",
    TemporarilyDisabled = "temporarily_disabled"
}
/** Type for a logo resource. */
export type Logo = {
    id?: string;
};
/** Type for a logocreateforcreditorrequestlinks resource. */
export type LogoCreateForCreditorRequestLinks = {
    creditor?: string;
};
/** Type for a mandate resource. */
export type Mandate = {
    authorisation_source?: MandateAuthorisationSource;
    consent_parameters?: MandateConsentParameters | null;
    consent_type?: MandateConsentType | null;
    created_at?: string;
    funds_settlement?: MandateFundsSettlement;
    id?: string;
    links?: MandateLinks;
    metadata?: JsonMap;
    next_possible_charge_date?: string | null;
    next_possible_standard_ach_charge_date?: string | null;
    payments_require_approval?: boolean;
    reference?: string | null;
    scheme?: string | null;
    status?: MandateStatus;
    verified_at?: string | null;
};
export declare enum MandateAuthorisationSource {
    Web = "web",
    Telephone = "telephone",
    Paper = "paper"
}
/** Type for a mandatecreaterequestlinks resource. */
export type MandateCreateRequestLinks = {
    creditor?: string;
    customer_bank_account: string;
};
/** Type for a mandateconsentparameters resource. */
export type MandateConsentParameters = {
    end_date?: string;
    max_amount_per_payment?: number;
    max_amount_per_period?: number;
    max_payments_per_period?: number;
    period?: MandateConsentParametersPeriod;
    start_date?: string;
};
export declare enum MandateConsentParametersPeriod {
    Day = "day",
    Week = "week",
    Month = "month",
    Year = "year",
    Flexible = "flexible"
}
export declare enum MandateConsentType {
    OneOff = "one_off",
    Single = "single",
    Recurring = "recurring",
    Standing = "standing",
    Sporadic = "sporadic"
}
export declare enum MandateFundsSettlement {
    Managed = "managed",
    Direct = "direct"
}
/** Type for a mandatelinks resource. */
export type MandateLinks = {
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
    new_mandate?: string;
};
export declare enum MandateStatus {
    PendingCustomerApproval = "pending_customer_approval",
    PendingSubmission = "pending_submission",
    Submitted = "submitted",
    Active = "active",
    Failed = "failed",
    Cancelled = "cancelled",
    Expired = "expired",
    Consumed = "consumed",
    Blocked = "blocked",
    SuspendedByPayer = "suspended_by_payer"
}
/** Type for a mandateimport resource. */
export type MandateImport = {
    created_at?: string;
    id?: string;
    links?: MandateImportLinks;
    scheme?: MandateImportScheme;
    status?: MandateImportStatus;
};
/** Type for a mandateimportcreaterequestlinks resource. */
export type MandateImportCreateRequestLinks = {
    creditor?: string;
};
/** Type for a mandateimportlinks resource. */
export type MandateImportLinks = {
    creditor?: string;
};
export declare enum MandateImportScheme {
    Ach = "ach",
    Autogiro = "autogiro",
    Bacs = "bacs",
    Becs = "becs",
    BecsNz = "becs_nz",
    Betalingsservice = "betalingsservice",
    FasterPayments = "faster_payments",
    Pad = "pad",
    PayTo = "pay_to",
    SepaCore = "sepa_core"
}
export declare enum MandateImportStatus {
    Created = "created",
    Submitted = "submitted",
    Cancelled = "cancelled",
    Processing = "processing",
    Processed = "processed"
}
/** Type for a mandateimportentry resource. */
export type MandateImportEntry = {
    created_at?: string;
    links?: MandateImportEntryLinks;
    processing_errors?: JsonMap | null;
    record_identifier?: string | null;
};
/** Type for a mandateimportentryamendment resource. */
export type MandateImportEntryAmendment = {
    original_creditor_id: string;
    original_creditor_name: string;
    original_mandate_reference: string;
};
/** Type for a mandateimportentrybankaccount resource. */
export type MandateImportEntryBankAccount = {
    account_holder_name: string;
    account_number?: string | null;
    account_type?: MandateImportEntryBankAccountAccountType;
    bank_code?: string | null;
    branch_code?: string | null;
    country_code?: string | null;
    iban?: string | null;
    metadata?: JsonMap;
};
export declare enum MandateImportEntryBankAccountAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a mandateimportentrycustomer resource. */
export type MandateImportEntryCustomer = {
    address_line1?: string;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    company_name?: string | null;
    country_code?: string | null;
    danish_identity_number?: string | null;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    language?: string | null;
    metadata?: JsonMap;
    phone_number?: string | null;
    postal_code?: string;
    region?: string | null;
    swedish_identity_number?: string | null;
};
/** Type for a mandateimportentrycreaterequestlinks resource. */
export type MandateImportEntryCreateRequestLinks = {
    mandate_import: string;
};
/** Type for a mandateimportentrymandate resource. */
export type MandateImportEntryMandate = {
    metadata?: JsonMap;
    reference?: string | null;
};
export declare enum MandateImportEntryStatus {
    SuccessfullyProcessed = "successfully_processed",
    UnsuccessfullyProcessed = "unsuccessfully_processed"
}
/** Type for a mandateimportentrylinks resource. */
export type MandateImportEntryLinks = {
    customer?: string;
    customer_bank_account?: string;
    mandate?: string;
    mandate_import: string;
};
/** Type for a mandatepdf resource. */
export type MandatePdf = {
    expires_at?: string;
    url?: string;
};
export declare enum MandatePdfAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a mandatepdfcreaterequestlinks resource. */
export type MandatePdfCreateRequestLinks = {
    creditor?: string;
    mandate?: string;
};
export declare enum MandatePdfSubscriptionFrequency {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly"
}
/** Type for a negativebalancelimit resource. */
export type NegativeBalanceLimit = {
    balance_limit?: string;
    created_at?: string;
    currency?: NegativeBalanceLimitCurrency;
    id?: string;
    links?: NegativeBalanceLimitLinks;
};
export declare enum NegativeBalanceLimitCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a negativebalancelimitlinks resource. */
export type NegativeBalanceLimitLinks = {
    creator_user?: string;
    creditor?: string;
};
/** Type for a outboundpayment resource. */
export type OutboundPayment = {
    amount?: number;
    created_at?: string;
    currency?: OutboundPaymentCurrency;
    description?: string;
    execution_date?: string;
    id: string;
    is_withdrawal?: boolean;
    links?: OutboundPaymentLinks;
    metadata?: JsonMap;
    reference?: string;
    scheme?: OutboundPaymentScheme;
    status?: OutboundPaymentStatus;
    verifications?: OutboundPaymentVerifications | null;
};
/** Type for a outboundpaymentcreaterequestlinks resource. */
export type OutboundPaymentCreateRequestLinks = {
    creditor?: string;
    recipient_bank_account: string;
};
export declare enum OutboundPaymentScheme {
    FasterPayments = "faster_payments"
}
/** Type for a outboundpaymentwithdrawrequestlinks resource. */
export type OutboundPaymentWithdrawRequestLinks = {
    creditor?: string;
};
export declare enum OutboundPaymentStatus {
    Verifying = "verifying",
    PendingApproval = "pending_approval",
    Scheduled = "scheduled",
    Executing = "executing",
    Executed = "executed",
    Cancelled = "cancelled",
    Failed = "failed"
}
export declare enum OutboundPaymentCurrency {
    GBP = "GBP"
}
/** Type for a outboundpaymentlinks resource. */
export type OutboundPaymentLinks = {
    creditor?: string;
    customer?: string;
    recipient_bank_account?: string;
};
/** Type for a outboundpaymentverifications resource. */
export type OutboundPaymentVerifications = {
    recipient_bank_account_holder_verification?: OutboundPaymentVerificationsRecipientBankAccountHolderVerification | null;
};
/** Type for a outboundpaymentverificationsrecipientbankaccountholderverification resource. */
export type OutboundPaymentVerificationsRecipientBankAccountHolderVerification = {
    actual_account_name?: string | null;
    result?: OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult;
    type?: OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType;
};
export declare enum OutboundPaymentVerificationsRecipientBankAccountHolderVerificationResult {
    FullMatch = "full_match",
    PartialMatch = "partial_match",
    NoMatch = "no_match",
    UnableToMatch = "unable_to_match"
}
export declare enum OutboundPaymentVerificationsRecipientBankAccountHolderVerificationType {
    ConfirmationOfPayee = "confirmation_of_payee"
}
/** Type for a payerauthorisation resource. */
export type PayerAuthorisation = {
    bank_account?: PayerAuthorisationBankAccount;
    created_at?: string | null;
    customer?: PayerAuthorisationCustomer;
    id?: string;
    incomplete_fields?: PayerAuthorisationIncompleteField[];
    links?: PayerAuthorisationLinks;
    mandate?: PayerAuthorisationMandate;
    status?: PayerAuthorisationStatus;
};
/** Type for a payerauthorisationbankaccount resource. */
export type PayerAuthorisationBankAccount = {
    account_holder_name?: string;
    account_number?: string | null;
    account_number_ending?: string;
    account_number_suffix?: string | null;
    account_type?: PayerAuthorisationBankAccountAccountType;
    bank_code?: string | null;
    branch_code?: string | null;
    country_code?: string | null;
    currency?: string | null;
    iban?: string | null;
    metadata?: JsonMap;
};
export declare enum PayerAuthorisationBankAccountAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a payerauthorisationcustomer resource. */
export type PayerAuthorisationCustomer = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    company_name?: string | null;
    country_code?: string | null;
    danish_identity_number?: string | null;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    locale?: string | null;
    metadata?: JsonMap;
    postal_code?: string | null;
    region?: string | null;
    swedish_identity_number?: string | null;
};
/** Type for a payerauthorisationincompletefield resource. */
export type PayerAuthorisationIncompleteField = {
    field?: string;
    message?: string;
    request_pointer?: string;
};
/** Type for a payerauthorisationlinks resource. */
export type PayerAuthorisationLinks = {
    bank_account?: string;
    customer?: string;
    mandate?: string;
};
/** Type for a payerauthorisationmandate resource. */
export type PayerAuthorisationMandate = {
    metadata?: JsonMap;
    payer_ip_address?: string | null;
    reference?: string | null;
    scheme?: PayerAuthorisationMandateScheme;
};
export declare enum PayerAuthorisationMandateScheme {
    Ach = "ach",
    Autogiro = "autogiro",
    Bacs = "bacs",
    Becs = "becs",
    BecsNz = "becs_nz",
    Betalingsservice = "betalingsservice",
    FasterPayments = "faster_payments",
    Pad = "pad",
    PayTo = "pay_to",
    SepaCore = "sepa_core"
}
export declare enum PayerAuthorisationStatus {
    Created = "created",
    Submitted = "submitted",
    Confirmed = "confirmed",
    Completed = "completed",
    Failed = "failed"
}
/** Type for a payertheme resource. */
export type PayerTheme = {
    id?: string;
};
/** Type for a payerthemecreateforcreditorrequestlinks resource. */
export type PayerThemeCreateForCreditorRequestLinks = {
    creditor?: string | null;
};
/** Type for a payment resource. */
export type Payment = {
    amount?: string;
    amount_refunded?: string;
    charge_date?: string | null;
    created_at?: string;
    currency?: PaymentCurrency;
    description?: string | null;
    faster_ach?: boolean | null;
    fx?: PaymentFx;
    id?: string;
    links?: PaymentLinks;
    metadata?: JsonMap;
    reference?: string | null;
    retry_if_possible?: boolean;
    scheme?: string | null;
    status?: PaymentStatus;
};
export declare enum PaymentCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a paymentcreaterequestlinks resource. */
export type PaymentCreateRequestLinks = {
    mandate: string;
};
/** Type for a paymentchargedate resource. */
export type PaymentChargeDate = {
    gt?: string;
    gte?: string;
    lt?: string;
    lte?: string;
};
export declare enum PaymentSortDirection {
    Asc = "asc",
    Desc = "desc"
}
export declare enum PaymentSortField {
    ChargeDate = "charge_date",
    Amount = "amount"
}
export declare enum PaymentStatus {
    PendingCustomerApproval = "pending_customer_approval",
    PendingSubmission = "pending_submission",
    Submitted = "submitted",
    Confirmed = "confirmed",
    PaidOut = "paid_out",
    Cancelled = "cancelled",
    CustomerApprovalDenied = "customer_approval_denied",
    Failed = "failed",
    ChargedBack = "charged_back"
}
/** Type for a paymentfx resource. */
export type PaymentFx = {
    estimated_exchange_rate?: string | null;
    exchange_rate?: string | null;
    fx_amount?: string | null;
    fx_currency?: PaymentFxFxCurrency;
};
export declare enum PaymentFxFxCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a paymentlinks resource. */
export type PaymentLinks = {
    creditor?: string;
    instalment_schedule?: string;
    mandate?: string;
    payout?: string;
    subscription?: string;
};
/** Type for a paymentaccount resource. */
export type PaymentAccount = {
    account_balance?: number;
    account_holder_name?: string;
    account_number_ending?: string;
    bank_name?: string;
    currency?: string | null;
    id?: string;
    links?: PaymentAccountLinks;
};
/** Type for a paymentaccountlinks resource. */
export type PaymentAccountLinks = {
    creditor?: string;
};
/** Type for a paymentaccounttransaction resource. */
export type PaymentAccountTransaction = {
    amount?: number;
    balance_after_transaction?: number;
    counterparty_name?: string;
    currency?: PaymentAccountTransactionCurrency;
    description?: string;
    direction?: PaymentAccountTransactionDirection;
    id?: string;
    links?: PaymentAccountTransactionLinks;
    reference?: string;
    value_date?: string;
};
export declare enum PaymentAccountTransactionDirection {
    Credit = "credit",
    Debit = "debit"
}
export declare enum PaymentAccountTransactionCurrency {
    GBP = "GBP"
}
/** Type for a paymentaccounttransactionlinks resource. */
export type PaymentAccountTransactionLinks = {
    outbound_payment?: string;
    payment_bank_account?: string;
    payout?: string;
};
/** Type for a payout resource. */
export type Payout = {
    amount?: string;
    arrival_date?: string | null;
    created_at?: string;
    currency?: PayoutCurrency;
    deducted_fees?: string;
    fx?: PayoutFx;
    id?: string;
    links?: PayoutLinks;
    metadata?: JsonMap;
    payout_type?: PayoutPayoutType;
    reference?: string;
    status?: PayoutStatus;
    tax_currency?: string | null;
};
export declare enum PayoutCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
export declare enum PayoutPayoutType {
    Merchant = "merchant",
    Partner = "partner"
}
export declare enum PayoutStatus {
    Pending = "pending",
    Paid = "paid",
    Bounced = "bounced"
}
/** Type for a payoutfx resource. */
export type PayoutFx = {
    estimated_exchange_rate?: string | null;
    exchange_rate?: string | null;
    fx_amount?: string | null;
    fx_currency?: PayoutFxFxCurrency;
};
export declare enum PayoutFxFxCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a payoutlinks resource. */
export type PayoutLinks = {
    creditor?: string;
    creditor_bank_account?: string;
};
/** Type for a payoutitem resource. */
export type PayoutItem = {
    amount?: string;
    links?: PayoutItemLinks;
    taxes?: PayoutItemTaxis[];
    type?: PayoutItemType;
};
export declare enum PayoutItemInclude2020TaxCutover {
    True = "true",
    False = "false"
}
/** Type for a payoutitemlinks resource. */
export type PayoutItemLinks = {
    mandate?: string;
    payment?: string;
    refund?: string;
};
/** Type for a payoutitemtaxis resource. */
export type PayoutItemTaxis = {
    amount?: string;
    currency?: PayoutItemTaxisCurrency;
    destination_amount?: string | null;
    destination_currency?: string;
    exchange_rate?: string | null;
    tax_rate_id?: string;
};
export declare enum PayoutItemTaxisCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
export declare enum PayoutItemType {
    PaymentPaidOut = "payment_paid_out",
    PaymentFailed = "payment_failed",
    PaymentChargedBack = "payment_charged_back",
    PaymentRefunded = "payment_refunded",
    Refund = "refund",
    GocardlessFee = "gocardless_fee",
    AppFee = "app_fee",
    RevenueShare = "revenue_share",
    SurchargeFee = "surcharge_fee",
    RefundFundsReturned = "refund_funds_returned"
}
/** Type for a redirectflow resource. */
export type RedirectFlow = {
    confirmation_url?: string;
    created_at?: string;
    description?: string;
    id?: string;
    links?: RedirectFlowLinks;
    mandate_reference?: string;
    metadata?: JsonMap;
    redirect_url?: string;
    scheme?: RedirectFlowScheme;
    session_token?: string;
    success_redirect_url?: string;
};
/** Type for a redirectflowcreaterequestlinks resource. */
export type RedirectFlowCreateRequestLinks = {
    creditor?: string;
};
/** Type for a redirectflowprefilledbankaccount resource. */
export type RedirectFlowPrefilledBankAccount = {
    account_type?: RedirectFlowPrefilledBankAccountAccountType;
};
export declare enum RedirectFlowPrefilledBankAccountAccountType {
    Savings = "savings",
    Checking = "checking"
}
/** Type for a redirectflowprefilledcustomer resource. */
export type RedirectFlowPrefilledCustomer = {
    address_line1?: string | null;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string | null;
    company_name?: string | null;
    country_code?: string | null;
    danish_identity_number?: string | null;
    email?: string | null;
    family_name?: string | null;
    given_name?: string | null;
    language?: string | null;
    phone_number?: string | null;
    postal_code?: string | null;
    region?: string | null;
    swedish_identity_number?: string | null;
};
export declare enum RedirectFlowScheme {
    Ach = "ach",
    Autogiro = "autogiro",
    Bacs = "bacs",
    Becs = "becs",
    BecsNz = "becs_nz",
    Betalingsservice = "betalingsservice",
    Pad = "pad",
    SepaCore = "sepa_core"
}
/** Type for a redirectflowlinks resource. */
export type RedirectFlowLinks = {
    billing_request?: string;
    creditor?: string;
    customer?: string;
    customer_bank_account?: string;
    mandate?: string;
};
/** Type for a refund resource. */
export type Refund = {
    amount?: string;
    created_at?: string;
    currency?: string;
    fx?: RefundFx;
    id?: string;
    links?: RefundLinks;
    metadata?: JsonMap;
    reference?: string | null;
    status?: RefundStatus;
};
/** Type for a refundcreaterequestlinks resource. */
export type RefundCreateRequestLinks = {
    mandate?: string;
    payment?: string;
};
export declare enum RefundRefundType {
    Mandate = "mandate",
    Payment = "payment"
}
/** Type for a refundfx resource. */
export type RefundFx = {
    estimated_exchange_rate?: string | null;
    exchange_rate?: string | null;
    fx_amount?: string | null;
    fx_currency?: RefundFxFxCurrency;
};
export declare enum RefundFxFxCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
/** Type for a refundlinks resource. */
export type RefundLinks = {
    mandate?: string;
    payment?: string;
};
export declare enum RefundStatus {
    Created = "created",
    PendingSubmission = "pending_submission",
    Submitted = "submitted",
    Paid = "paid",
    Cancelled = "cancelled",
    Bounced = "bounced",
    FundsReturned = "funds_returned"
}
/** Type for a scenariosimulator resource. */
export type ScenarioSimulator = {
    id?: string;
};
/** Type for a scenariosimulatorrunrequestlinks resource. */
export type ScenarioSimulatorRunRequestLinks = {
    resource: string;
};
/** Type for a schemeidentifier resource. */
export type SchemeIdentifier = {
    address_line1?: string;
    address_line2?: string | null;
    address_line3?: string | null;
    can_specify_mandate_reference?: boolean;
    city?: string;
    country_code?: string;
    created_at?: string;
    currency?: SchemeIdentifierCurrency;
    email?: string;
    id?: string;
    minimum_advance_notice?: number;
    name?: string;
    phone_number?: string;
    postal_code?: string;
    reference?: string;
    region?: string | null;
    scheme?: SchemeIdentifierScheme;
    status?: SchemeIdentifierStatus;
};
/** Type for a schemeidentifiercreaterequestlinks resource. */
export type SchemeIdentifierCreateRequestLinks = {
    creditor?: string;
};
export declare enum SchemeIdentifierScheme {
    Ach = "ach",
    Autogiro = "autogiro",
    Bacs = "bacs",
    Becs = "becs",
    BecsNz = "becs_nz",
    Betalingsservice = "betalingsservice",
    FasterPayments = "faster_payments",
    Pad = "pad",
    PayTo = "pay_to",
    Sepa = "sepa",
    SepaCreditTransfer = "sepa_credit_transfer",
    SepaInstantCreditTransfer = "sepa_instant_credit_transfer"
}
export declare enum SchemeIdentifierCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
export declare enum SchemeIdentifierStatus {
    Pending = "pending",
    Active = "active"
}
type JsonField = boolean | number | string | null;
export interface JsonMap {
    [key: string]: JsonField | JsonMap | JsonArray;
}
export type JsonArray = Array<JsonField>;
export type APIResponse = {
    __response__: object;
};
export type Fx = {
    exchange_rate: string;
    estimated_exchange_rate: string;
    fx_amount: string;
    fx_currency: FxCurrency;
};
export declare enum FxCurrency {
    AUD = "AUD",
    CAD = "CAD",
    DKK = "DKK",
    EUR = "EUR",
    GBP = "GBP",
    NZD = "NZD",
    SEK = "SEK",
    USD = "USD"
}
export interface CreatedAtFilter {
    gt?: string;
    gte?: string;
    lt?: string;
    lte?: string;
}
export interface ListMeta {
    limit: number;
    cursors: ListMetaCursor;
}
export interface ListMetaCursor {
    before: string | null;
    after: string | null;
}
/** Type for a subscription resource. */
export type Subscription = {
    amount?: string;
    app_fee?: string | null;
    count?: string | null;
    created_at?: string;
    currency?: string;
    day_of_month?: string | null;
    earliest_charge_date_after_resume?: string | null;
    end_date?: string | null;
    id?: string;
    interval?: string;
    interval_unit?: SubscriptionIntervalUnit;
    links?: SubscriptionLinks;
    metadata?: JsonMap;
    month?: SubscriptionMonth;
    name?: string | null;
    parent_plan_paused?: boolean;
    payment_reference?: string | null;
    retry_if_possible?: boolean;
    start_date?: string | null;
    status?: SubscriptionStatus;
    upcoming_payments?: SubscriptionUpcomingPayment[];
};
export declare enum SubscriptionIntervalUnit {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly"
}
/** Type for a subscriptioncreaterequestlinks resource. */
export type SubscriptionCreateRequestLinks = {
    mandate: string;
};
export declare enum SubscriptionMonth {
    January = "january",
    February = "february",
    March = "march",
    April = "april",
    May = "may",
    June = "june",
    July = "july",
    August = "august",
    September = "september",
    October = "october",
    November = "november",
    December = "december"
}
/** Type for a subscriptionlinks resource. */
export type SubscriptionLinks = {
    mandate?: string;
};
export declare enum SubscriptionStatus {
    PendingCustomerApproval = "pending_customer_approval",
    CustomerApprovalDenied = "customer_approval_denied",
    Active = "active",
    Finished = "finished",
    Cancelled = "cancelled",
    Paused = "paused"
}
/** Type for a subscriptionupcomingpayment resource. */
export type SubscriptionUpcomingPayment = {
    amount?: string;
    charge_date?: string;
};
/** Type for a taxrate resource. */
export type TaxRate = {
    end_date?: string | null;
    id?: string;
    jurisdiction?: string;
    percentage?: string;
    start_date?: string;
    type?: string;
};
/** Type for a transferredmandate resource. */
export type TransferredMandate = {
    encrypted_customer_bank_details?: string;
    encrypted_decryption_key?: string;
    links?: TransferredMandateLinks;
    public_key_id?: string;
};
/** Type for a transferredmandatelinks resource. */
export type TransferredMandateLinks = {
    customer_bank_account?: string;
    mandate?: string;
};
/** Type for a verificationdetail resource. */
export type VerificationDetail = {
    address_line1?: string;
    address_line2?: string | null;
    address_line3?: string | null;
    city?: string;
    company_number?: string;
    description?: string;
    directors?: VerificationDetailDirector[];
    links?: VerificationDetailLinks;
    name?: string;
    postal_code?: string;
};
/** Type for a verificationdetailcreaterequestlinks resource. */
export type VerificationDetailCreateRequestLinks = {
    creditor: string;
};
/** Type for a verificationdetaildirector resource. */
export type VerificationDetailDirector = {
    city: string;
    country_code: string;
    date_of_birth: string;
    family_name: string;
    given_name: string;
    postal_code: string;
    street: string;
};
/** Type for a verificationdetaillinks resource. */
export type VerificationDetailLinks = {
    creditor?: string;
};
/** Type for a webhook resource. */
export type Webhook = {
    created_at?: string;
    id?: string;
    is_test?: boolean;
    request_body?: string;
    request_headers?: JsonMap;
    response_body?: string;
    response_body_truncated?: boolean;
    response_code?: number;
    response_headers?: JsonMap;
    response_headers_content_truncated?: boolean;
    response_headers_count_truncated?: boolean;
    successful?: boolean;
    url?: string;
};
export {};
//# sourceMappingURL=Types.d.ts.map