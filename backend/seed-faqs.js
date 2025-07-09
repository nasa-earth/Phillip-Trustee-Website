const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function seedFaqs() {
  console.log('Seeding FAQs...');

  const faqs = [
    {
      question:
        '1.1 What is the current state of trust law in Cambodia, and how has it evolved over time?',
      answer:
        "Under the Trust Law enacted on January 2, 2019, a trust is a three-party legal relationship, in which the Trustor (or investor) transfers property or fund to a Trustee who shall hold, manage and protect it, apart from its own estate, for the trust's beneficiary. The Trustee (or the Trust Company) is licensed by the NBFSA under the Ministry of Economy and Finance (MEF) and the Trust Regulator.Foreign investors can now make a profit from land appreciation without acquiring the land in their name, they can do so without relinquishing their nationality or applying for the Cambodian nationality.",
      category: 'Trust Basics',
      order: 1,
    },
    {
      question: '1.2 What types of trusts are available in Cambodia?',
      answer:
        "A Proprietary Protection Trust is a mechanism to protect property against risks. It's one of the trust types available in Cambodia, established to safeguard assets from creditors, legal judgments, or other claims. The trustee holds and manages the property for the benefit of the beneficiaries while keeping it separate from personal assets.",
      category: 'Trust Basics',
      order: 2,
    },
    {
      question:
        '2.1 How is Phillip Trustee (Cambodia) related to Phillip Bank?',
      answer:
        'Phillip Trustee is an associated company of Phillip Bank, 49% owned by the bank while the remaining 51% by the local nominee shareholders. Phillip Trustee and Phillip Bank are both esteemed affiliates of Phillip Capital Group, a Singaporean holding group which has near 50 years business success in the financial services industry and a global presence, with operations in 16 countries and over 1 million clients with Assets Under Management (AUM) of total more than USD 35 Billion.',
      category: 'Safety & Security',
      order: 3,
    },
    {
      question: '2.2 Is it safe to engage Phillip Trustee (Cambodia)?',
      answer:
        'Phillip Trustee is a registered trust company under the Cambodian Trust Regulator. We abide by strict trust regulations and are under the supervision of the governing Trust Regulator. Currently, we are the only trust company that is bank-related, and it does not have business affiliates in the real estate and construction sector. As a trust company, we provide trustee services and hold assets for clients. Although the assets are held under Phillip Trustee, the Trustor has full right to claim his/her ownership as per the registered trust deed.',
      category: 'Safety & Security',
      order: 4,
    },
    {
      question:
        '2.3 As a Trustor, how can I ensure that the Trustee will only do as I wish?',
      answer:
        "All parties are governed by the trust deed. The trust deed must be registered for legal validity of trust operation. Phillip Trustee is regulated by the Trust Regulator. Our (Trustee's) role is to execute based on the trust deed. If the trustee breaches the trust deed, the Trustor can take legal action and/or can file a complaint with the Trust Regulator.",
      category: 'Safety & Security',
      order: 5,
    },
    {
      question:
        '2.4 How are my asset/funds protected from fraudulent acts (eg: embezzlement of funds)?',
      answer:
        'Our Trustee company has a robust set of internal controls in place to safeguard client assets. These controls include checks and balances, segregation of duties, and ongoing monitoring and supervisions of operations. Regular audits and reviews are conducted to assess the effectiveness of internal controls and identify any potential vulnerabilities. In the case of loss from fraud, clients can file a complaint with the Trust Regulator and the police department for case investigations. Our company will be liable for reimbursement from any loss occurring from fraud.',
      category: 'Safety & Security',
      order: 6,
    },
    {
      question:
        '2.5 What if Phillip Trustee (Cambodia) go out of business or become insolvent?',
      answer:
        'If our Trustee business becomes insolvent, the Trust Regulator will take over all asset under the trust deeds held in the name of the bankrupted Trustee and manage all operations/liquidation of the bankrupted Trustee. Since the Trustor is still the beneficial owner of the Trust, he/she may then appoint another Trustee to administer their trust.',
      category: 'Safety & Security',
      order: 7,
    },
    {
      question:
        '2.6 As a Trustor, what happens to my trust and the property held under the trust upon my demise?',
      answer:
        "During our consultation process, we will explicitly discuss all the details and specific arrangement to be administered upon the Trustor's demise. This includes (a) whether the assets are to be sold and the proceeds are to be distributed to the beneficiaries, (b) the appointment of a successor Trustor upon the current Trustor's demise, and other arrangements.During our onboarding process, we will similarly advise our clients to separate their assets under Trust and Will, to avoid the duplication of assets under these arrangements. The asset under trust arrangement in Cambodia will be managed, disposed and/or distributed to beneficiaries indicated in the trust deed.For Cambodians:Upon the unfortunate demise of the Trustor, the Trustee will continue executing the trust functions according to the trust deed. In the case that the trust has more than 1 single Trustor, the remaining Trustors can take control of the trust upon the passing of a Trustor. If you are the sole Trustor, the Trustee will hold and administer the trust until the end of the term and distribute the assets to the beneficiaries according to the trust deed.For Non-Cambodians:For foreign Trustors, the Trustee will similarly execute according to the trust deed upon the passing of the Trustor. However, if there are no successor Trustor(s) and no beneficiaries mentioned in the trust deed, and there are also no people with special connection (e.g. family ties) with the Trustor, the Trustee will hand over the assets within the Trust to the Cambodian government. Therefore, we advise our clients to indicate their beneficiaries during the formation of the Trust Deed, which the Trustee will then administer, dispose and distribute the assets in accordance with Trust Deed in their passing.To ensure protection of the Trustor's succession interest, we strongly recommend that Non-Cambodian Trustor should also select a successor trustor from the outset so in the demise of the first Trustor, the successor trustor will then take over the Trust and its property.",
      category: 'Safety & Security',
      order: 8,
    },
    {
      question:
        '2.7 Can my spouse take control of the trust and the property held under the trust upon my demise?',
      answer:
        "If your spouse is listed as the trustor, they can take control of the trust upon your demise. In contrast, if your spouse is not listed as the trustor, then the trustee will hold and administer the trust until the end of the term and asset is distributed to the beneficiary.Firstly, the beneficiary will have to manage and cover all tax payable under the Cambodian taxation law. After all tax has been cleared, the Trustee will issue a letter of asset distribution and then a transfer of fund or asset will be made to the beneficiary's designated bank.If it is an immovable property, we will distribute it based on the trustor's instruction and the distribution will occur via the SPA. All tax payable to the General Department of tax (GDT) has to be cleared before we will issue the distribution letter for the trustor's signing off.",
      category: 'Safety & Security',
      order: 9,
    },
    {
      question:
        '2.8 What would happen in the case of compulsory purchase of land by the Cambodian government?',
      answer:
        'Our legal due diligence process (conducted by third party professionals) will first establish if there are any encumbrances on the assets/ property and whether the land is owned by the government. We will only proceed with the purchase of land and setting up the Trust once we receive a positive legal due diligence report.Once the title deed of the property has been transferred under the Trustee and the Trust has been registered with the Trust Regulator, the Trustor will have full rights to the asset through the Trust. If the Cambodian government chooses to exercise its power of compulsory purchase, it typically follows a specific process that involves notifying the owner, conducting a valuation of the property, and offering compensation based on the fair market value.',
      category: 'Safety & Security',
      order: 10,
    },
    {
      question:
        '3.1 Who is responsible to pay stamp duty on sale and purchase of property?',
      answer:
        'The seller of the property is usually the responsible party, and we always ensure it is included within the Sale and Purchase Agreement (SPA).',
      category: 'Taxes & Fees',
      order: 11,
    },
    {
      question: '3.2 What taxes do I or the Trust have to pay in Cambodia?',
      answer:
        '• Duty Stamp Tax (4%): Required for any ownership transfer transactions.• Yearly Tax on Property (0.1 to 2%): Dependent on the type of land property.• Capital Gain Tax (20% - effective from Jan 2024): It is levied on the capital gain which is the difference between the proceeds from sale/transfer of assets (i.e., immovable property) and original purchase price, less permitted deductible expenses.- Upon the sale & purchase of the land, the Trust would have to pay a 20% capital gain tax under the law of Cambodia. Phillip Trustee will administer the tax payments on behalf of the Trustor and Trust.- For the payment of any fees and taxes, a Trust bank account would be established at Phillip Bank as per the mutual agreement between the Trustor and Phillip Trustee. In the case that Phillip Trustee makes the payment first, we will recover the full amount back from the Trust account.',
      category: 'Taxes & Fees',
      order: 12,
    },
    {
      question:
        '4.1 If I choose to engage Phillip Trustee Cambodia, do I need to open a personal bank account with Phillip Bank?',
      answer:
        'For both Non-Cambodian and Cambodian Trustors, we strongly recommend you open a personal bank account with Phillip Bank for your ease of transactions and trust administration. By having a personal bank account with Phillip Bank, this will give you greater ease and convenience and you can avoid interbank transaction fees.',
      category: 'Banking Services',
      order: 13,
    },
    {
      question: '4.2 What are the bank account opening fees?',
      answer:
        'There are no fees for opening an account. However, there could be remittance fees incurred for sending money to fund the Phillip Bank account depending on the bank you are remitting from.',
      category: 'Banking Services',
      order: 14,
    },
    {
      question:
        '4.3 Does Phillip Bank an ATM and/or internet banking services?',
      answer:
        'Your personal Phillip Bank ATM card will be issued upon the opening of a savings account. The interest rate for savings account is between 2-3% per annum if they maintain balance between USD 500 to USD 100,000.Phillip Bank has both internet and mobile banking services available.',
      category: 'Banking Services',
      order: 15,
    },
    {
      question:
        '4.4 Does Phillip Bank charge fees for local wire transfer within Cambodia and international transfers?',
      answer:
        'For local wire transfers, there may be certain transaction fees of USD 0.50 to 1 per transaction (subject to changes).For international transfers (between Phnom Penh and Singapore), USD 9 is charged per transaction for a maximum of USD 10,000 per transaction per day (subject to changes).',
      category: 'Banking Services',
      order: 16,
    },
    {
      question:
        '4.5 What are the loan financing interest rate for individuals?',
      answer:
        'This is based on market rate. Also note that financing arrangement will be assessed on case by case basis.',
      category: 'Banking Services',
      order: 17,
    },
    {
      question:
        '4.6 If an investor chooses to purchase commercial properties via a Singapore registered company, is it possible to obtain financing from Phillip Bank?',
      answer:
        'Phillip Bank is precluded from offshore financing, and we are not allowed to lend to foreigners for foreign projects. However, in the case of foreign borrowing to fund local projects, we require approval from the local authorities.We would not recommend such arrangements for clients as the loan rates are higher in Cambodia than Singapore. Furthermore, documentation from overseas can be cumbersome and credit processing across border can be challenging.',
      category: 'Banking Services',
      order: 18,
    },
  ];

  for (const faq of faqs) {
    const existing = await prisma.fAQ.findFirst({
      where: { question: faq.question },
    });

    if (existing) {
      await prisma.fAQ.update({
        where: { id: existing.id },
        data: faq,
      });
    } else {
      await prisma.fAQ.create({
        data: faq,
      });
    }
  }

  console.log('FAQs seeded successfully!');
}

seedFaqs()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
