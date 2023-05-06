import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

const serverUrl = 'http://localhost:3000';
let recordId: string;

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  creditApplicationForm: FormGroup;
  applicationData: any;
  isLoad: boolean;

  isMarriedOption: string;
  haveBankruptcyOption: string;
  selfEmployedOption: string;

  message = 'Loading';
  applicantGenders = ['Male', 'Female'];
  applicantRaces = ['Asian', 'Black', 'Hispanic', 'White', 'Other'];
  isMarriedOptions = ['Yes', 'No'];
  homeAddressStates = [
    'AL',
    'AR',
    'FL',
    'GA',
    'IA',
    'IL',
    'IN',
    'MI',
    'OR',
    'SC',
    'TX',
    'WI',
  ];
  businessAddressStates = [
    'AL',
    'AR',
    'FL',
    'GA',
    'IA',
    'IL',
    'IN',
    'MI',
    'OR',
    'SC',
    'TX',
    'WI',
  ];
  haveBankruptcyOptions = ['Yes', 'No'];
  suedForDebtDefaultPast2yrsOptions = ['Yes', 'No'];
  selfEmployedOptions = ['Yes', 'No'];

  validation_messages = {
    applicantName: [{ type: 'required', message: 'This field is required.' }],
    applicantDOB: [{ type: 'required', message: 'This field is required.' }],
    applicantDriverLicenseNo: [
      { type: 'required', message: 'This field is required.' },
    ],
    applicantSocialSecurityNo: [
      {
        type: 'required',
        message: 'This field is required.',
      },
      {
        type: 'pattern',
        message: 'Social security number is invalid',
      },
    ],
    applicantGender: [{ type: 'required', message: 'This field is required.' }],
    applicantRace: [{ type: 'required', message: 'This field is required.' }],
    currentCustomerNumber: [
      { type: 'pattern', message: 'Current customer number is invalid.' },
    ],
    isMarriedOption: [{ type: 'required', message: 'This field is required.' }],

    spouseName: [{ type: 'required', message: 'This field is required.' }],
    spouseDOB: [{ type: 'required', message: 'This field is required.' }],
    spouseDriverLicenseNo: [
      {
        type: 'required',
        message: 'This field is required.',
      },
    ],
    spouseSocialSecurityNo: [
      {
        type: 'required',
        message: 'This field is required.',
      },
      {
        type: 'pattern',
        message: 'Social security number is invalid.',
      },
    ],

    homeAddress: [{ type: 'required', message: 'This field is required.' }],
    homeAddressCity: [{ type: 'required', message: 'This field is required.' }],
    homeAddressState: [
      { type: 'required', message: 'This field is required.' },
    ],
    homeAddressZipCode: [
      { type: 'required', message: 'This field is required.' },
      { type: 'pattern', message: 'Zip code is invalid.' },
    ],

    companyName: [{ type: 'required', message: 'This field is required.' }],
    companyFEIN: [
      { type: 'pattern', message: 'Company FEIN number is invalid.' },
    ],
    businessAddress: [{ type: 'required', message: 'This field is required.' }],
    businessAddressCity: [
      {
        type: 'required',
        message: 'This field is required.',
      },
    ],
    businessAddressState: [
      {
        type: 'required',
        message: 'This field is required.',
      },
    ],
    businessAddressZipCode: [
      {
        type: 'required',
        message: 'This field is required.',
      },
    ],

    creditAmount: [
      {
        type: 'required',
        message: 'This field is required.',
      },
      { type: 'pattern', message: 'Credit amount is invalid.' },
    ],
    personalBankName: [
      {
        type: 'required',
        message: 'This field is required.',
      },
    ],
    businessBankName: [
      {
        type: 'required',
        message: 'This field is required.',
      },
    ],

    haveBankruptcyOption: [
      { type: 'required', message: 'This field is required.' },
    ],
    bankruptcyDate: [
      { type: 'required', message: 'This field is required.' },
      { type: 'pattern', message: 'Date of bankruptcy is invalid.' },
    ],
    bankruptcyJurisdiction: [
      { type: 'required', message: 'This field is required' },
    ],
    suedForDebtDefaultPast2yrsOption: [
      { type: 'required', message: 'This field is required.' },
    ],
    currentGrossIncome: [
      { type: 'required', message: 'This field is required.' },
      { type: 'pattern', message: 'Credit amount is invalid.' },
    ],
    selfEmployedOption: [
      { type: 'required', message: 'This field is required.' },
    ],

    employerName: [{ type: 'required', message: 'This field is required.' }],
    yearsAtCompany: [{ type: 'required', message: 'This field is required.' }],
    currentJobTitle: [{ type: 'required', message: 'This field is required.' }],
    supervisorName: [{ type: 'required', message: 'This field is required.' }],
    supervisorPhone: [{ type: 'required', message: 'This field is required.' }],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions' },
    ],
  };

  async checkUserAccount() {
    this.route.queryParams.subscribe((params) => {
      recordId = params['ID'];
    });

    const response = await fetch(
      serverUrl + '/api/application/get?recordId=' + recordId,
      {
        method: 'GET',
      }
    );
    const res = await response.json();

    if (res.success) {
      this.applicationData = res.data;
      this.isLoad = true;
    } else {
      this.isLoad = false;
      this.message = res.message;
    }
  }

  async ngOnInit() {
    await this.checkUserAccount();
    this.createForms();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  createForms() {
    this.creditApplicationForm = this.fb.group({
      applicantName: ['', Validators.required],
      applicantDOB: ['', Validators.required],
      applicantDriverLicenseNo: ['', Validators.required],
      applicantSocialSecurityNo: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d{3}-\d{2}-\d{4}$/),
        ])
      ),
      applicantGender: new FormControl(
        this.applicantGenders[0],
        Validators.required
      ),
      applicantRace: new FormControl(
        this.applicantRaces[0],
        Validators.required
      ),
      currentCustomerNumber: ['', Validators.pattern(/^([A-Z]{3}\d{7})$/)],
      isMarriedOption: new FormControl(
        this.isMarriedOptions[1],
        Validators.required
      ),

      homeAddress: ['', Validators.required],
      homeAddressOptional: [''],
      homeAddressCity: ['', Validators.required],
      homeAddressState: new FormControl(
        this.homeAddressStates[0],
        Validators.required
      ),
      homeAddressZipCode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(\d{5}-\d{4}|\d{5})$/),
        ]),
      ],

      companyName: ['', Validators.required],
      companyFEIN: ['', Validators.pattern(/^[1-9]\d?-\d{7}$/)],
      businessAddress: ['', Validators.required],
      businessAddressOptional: [''],
      businessAddressCity: ['', Validators.required],
      businessAddressState: new FormControl(
        this.businessAddressStates[0],
        Validators.required
      ),
      businessAddressZipCode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(\d{5}-\d{4}|\d{5})$/),
        ]),
      ],

      creditAmount: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]{0,7}(\.[0-9]{0,2})?$/),
        ])
      ),
      personalBankName: ['', Validators.required],
      businessBankName: ['', Validators.required],

      haveBankruptcyOption: new FormControl(
        this.haveBankruptcyOptions[1],
        Validators.required
      ),

      suedForDebtDefaultPast2yrsOption: new FormControl(
        this.suedForDebtDefaultPast2yrsOptions[0],
        Validators.required
      ),
      currentGrossIncome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]{0,7}(\.[0-9]{0,2})?$/),
        ]),
      ],
      selfEmployedOption: new FormControl(
        this.selfEmployedOptions[0],
        Validators.required
      ),
      
      terms: new FormControl(false, Validators.pattern('true')),
    });
  }

  onChangeIsMarriedOption(option) {
    this.isMarriedOption = option.value;
    if (option.value == 'Yes') {
      this.creditApplicationForm.addControl('spouseName', new FormControl(''));
      this.creditApplicationForm.addControl('spouseDOB', new FormControl(''));
      this.creditApplicationForm.addControl('spouseDriverLicenseNo', new FormControl(''));
      this.creditApplicationForm.addControl('spouseSocialSecurityNo', new FormControl('', Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)));
    } else {
      this.creditApplicationForm.removeControl('spouseName');
      this.creditApplicationForm.removeControl('spouseDOB');
      this.creditApplicationForm.removeControl('spouseDriverLicenseNo');
      this.creditApplicationForm.removeControl('spouseSocialSecurityNo');
    }
  }

  onChangeHaveBankruptcyOption(option) {
    this.haveBankruptcyOption = option.value;
    if (option.value == 'Yes') {
      this.creditApplicationForm.addControl('bankruptcyDate', new FormControl(''));
      this.creditApplicationForm.addControl('bankruptcyJurisdiction', new FormControl(''));
    } else {
      this.creditApplicationForm.removeControl('bankruptcyDate');
      this.creditApplicationForm.removeControl('bankruptcyJurisdiction');
    }
  }

  onChangeSelfEmployedOption(option) {
    this.selfEmployedOption = option.value;
    if (option.value == 'No') {
      this.creditApplicationForm.addControl('employerName', new FormControl(''));
      this.creditApplicationForm.addControl('yearsAtCompany', new FormControl(''));
      this.creditApplicationForm.addControl('currentJobTitle', new FormControl(''));
      this.creditApplicationForm.addControl('supervisorName', new FormControl(''));
      this.creditApplicationForm.addControl('supervisorPhone', new FormControl(''));
    } else {
      this.creditApplicationForm.removeControl('employerName');
      this.creditApplicationForm.removeControl('yearsAtCompany');
      this.creditApplicationForm.removeControl('currentJobTitle');
      this.creditApplicationForm.removeControl('supervisorName');
      this.creditApplicationForm.removeControl('supervisorPhone');
    }
  }

  async onSubmitCreditApplication(application: any) {
    let data = {
      Id: recordId,
      Applicant_Name__c: application.applicantName,
      Applicant_Date_of_Birth__c: application.applicantDOB.format('YYYY-MM-DD'),
      Applicant_Driver_s_License_Number__c:
        application.applicantDriverLicenseNo,
      Applicant_Social_Security_no__c: application.applicantSocialSecurityNo,
      Applicant_Sex__c: application.applicantGender,
      Applicant_Race__c: application.applicantRace,
      Customer_Number_X3__c: application.currentCustomerNumber,

      Applicant_Home_Address_Line_1__c: application.homeAddress,
      Applicant_Home_Address_Line_2__c: application.homeAddressOptional,
      Applicant_Home_City__c: application.homeAddressCity,
      Applicant_Home_State__c: application.homeAddressState,
      Applicant_Home_Zip__c: application.homeAddressZipCode,
      Customer_DBA_Company__c: application.companyName,
      Applicant_Business_Address_Line_1__c: application.businessAddress,
      Applicant_Business_Address_Line_2__c: application.businessAddressOptional,
      Applicant_Business_City__c: application.businessAddressCity,
      Applicant_Business_State__c: application.businessAddressState,
      Applicant_Business_Zip__c: application.creditAmount,
      Customer_DBA_FEIN__c: application.companyFEIN,
      LOC_Amount_Requested__c: application.creditAmount,
      Personal_Banking_Reference__c: application.personalBankName,
      Business_Banking_Reference__c: application.businessBankName,
      Applicant_Bankruptcy__c: this.haveBankruptcyOption,
      Sued_for_Debt_Default_Past_2yrs__c:
        application.suedForDebtDefaultPast2yrsOption,
      Current_Gross_Annual_Salary__c: application.currentGrossIncome,
      Self_Employed__c: this.selfEmployedOption,
    };

    if (this.isMarriedOption == 'Yes') {
      Object.assign(data, {
        Spouse_Name__c: application.spouseName,
        Spouse_Date_of_Birth__c: application.spouseDOB.format('YYYY-MM-DD'),
        Spouse_Driver_s_License_Number__c: application.spouseDriverLicenseNo,
        Spouse_Social_Security_Number__c: application.spouseSocialSecurityNo,
      });
    }

    if (this.haveBankruptcyOption == 'Yes') {
      Object.assign(data, {
        Date_of_last_Bankruptcy__c:
          application.bankruptcyDate.format('YYYY-MM-DD'),
        Bankruptcy_Jurisdiction__c: application.bankruptcyJurisdiction,
      });
    }

    if (this.selfEmployedOption == 'No') {
      Object.assign(data, {
        Employer_Name__c: application.employerName,
        Years_at_Company__c: application.yearsAtCompany,
        Title_Position__c: application.currentJobTitle,
        Supervisor_s_Name__c: application.supervisorName,
        Supervisor_s_Phone__c: application.supervisorPhone,
      });
    }

    Object.assign(data, { Application_Status_pl__c: 'Submitted' });

    const response = await fetch(serverUrl + '/api/application/patch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    this.message = res.message;
    this.isLoad = false;
  }
}
