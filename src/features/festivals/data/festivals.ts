import type { FestivalItem } from '../types/festival.types';

export const KHMER_FESTIVALS: FestivalItem[] = [
  {
    id: 'meak-bochea',
    nameKm: 'បុណ្យមាឃបូជា',
    nameEn: 'Meak Bochea Day',
    descriptionKm:
      'រំលឹកដល់ព្រឹត្តិការណ៍ចតុរង្គសន្និបាត ដែលព្រះសម្មាសម្ពុទ្ធទ្រង់សម្តែងឱវាទបាតិមោក្ខដល់ព្រះភិក្ខុសង្ឃចំនួន ១,២៥០ អង្គ។',
    descriptionEn:
      'Commemorates the spontaneous gathering of 1,250 monks before the Buddha and the delivery of the Ovada Patimokkha.',
    category: 'buddhist',
    isPublicHoliday: true,
    lunarRuleKm: '១៥ កើត ខែមាឃ',
    lunarRuleEn: '15th Waxing of Meak',
    khmerMonthIndex: 2,
    khmerMoonPhase: 'waxing',
    khmerDay: 15
  },
  {
    id: 'khmer-new-year',
    nameKm: 'ពិធីបុណ្យចូលឆ្នាំថ្មីប្រពៃណីជាតិ',
    nameEn: 'Khmer New Year (Chaul Chnam Thmey)',
    descriptionKm:
      'ពិធីបុណ្យចូលឆ្នាំប្រពៃណីជាតិខ្មែរ រយៈពេល ៣ ថ្ងៃ (មហាសង្ក្រាន្ត វារៈវ័នបត និងវារៈឡើងស័ក)។',
    descriptionEn:
      'The traditional Cambodian New Year celebration lasting three festive days in mid-April.',
    category: 'national',
    isPublicHoliday: true,
    solarMonth: 4,
    solarDay: 14
  },
  {
    id: 'visak-bochea',
    nameKm: 'បុណ្យពិសាខបូជា',
    nameEn: 'Visak Bochea Day',
    descriptionKm:
      'ទិវារំលឹកដល់ព្រឹត្តិការណ៍សំខាន់ ៣ នៃព្រះសម្មាសម្ពុទ្ធ៖ ប្រសូត ត្រាស់ដឹង និងបរិនិព្វាន។ ត្រូវបានអង្គការសហប្រជាជាតិទទួលស្គាល់ជាទិវាអន្តរជាតិ។',
    descriptionEn:
      'The triple sacred festival celebrating the birth, enlightenment, and passing (Parinirvana) of the Buddha.',
    category: 'buddhist',
    isPublicHoliday: true,
    lunarRuleKm: '១៥ កើត ខែពិសាខ',
    lunarRuleEn: '15th Waxing of Pisakh',
    khmerMonthIndex: 5,
    khmerMoonPhase: 'waxing',
    khmerDay: 15
  },
  {
    id: 'royal-ploughing',
    nameKm: 'ព្រះរាជពិធីច្រត់ព្រះនង្គ័ល',
    nameEn: 'Royal Ploughing Ceremony',
    descriptionKm:
      'ព្រះរាជពិធីបុរាណប្រកាសការចាប់ផ្ដើមរដូវធ្វើស្រែចម្ការ និងទស្សន៍ទាយភោគផលកសិកម្មតាមរយៈគោឧសភរាជ។',
    descriptionEn:
      'Ancient royal ceremony marking the start of the rice planting season and predicting agricultural harvests.',
    category: 'national',
    isPublicHoliday: true,
    lunarRuleKm: '៤ រោច ខែពិសាខ',
    lunarRuleEn: '4th Waning of Pisakh',
    khmerMonthIndex: 5,
    khmerMoonPhase: 'waning',
    khmerDay: 4
  },
  {
    id: 'pchum-ben',
    nameKm: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ',
    nameEn: 'Pchum Ben (Ancestors Day)',
    descriptionKm:
      'ពិធីបុណ្យប្រពៃណីខ្មែរដ៏ធំ រំលឹកគុណូបការៈ និងឧទ្ទិសកុសលជូនបុព្វការីជននិងញាតិការទាំង ៧ សន្តានដែលបានចែកឋាន។',
    descriptionEn:
      'The 15-day Festival of the Ancestors where Cambodians pay deep respect and transfer merits to departed relatives.',
    category: 'buddhist',
    isPublicHoliday: true,
    lunarRuleKm: '១៥ រោច ខែភទ្របទ',
    lunarRuleEn: '15th Waning of Phatrabot',
    khmerMonthIndex: 9,
    khmerMoonPhase: 'waning',
    khmerDay: 15
  },
  {
    id: 'water-festival',
    nameKm: 'ព្រះរាជពិធីបុណ្យអុំទូក បណ្ដែតប្រទីប និងសំពះព្រះខែ',
    nameEn: 'Royal Water and Moon Festival (Bon Om Touk)',
    descriptionKm:
      'ពិធីបុណ្យអុំទូក រំលឹកជ័យជម្នះកងទ័ពជើងទឹកខ្មែរជំនាន់អង្គរ និងពិធីសំពះព្រះខែ អកអំបុក ក្នុងរាត្រីពេញបូណ៌មីខែកត្តិក។',
    descriptionEn:
      'Three-day national festival celebrating the unique reversing current of the Tonle Sap river, with boat racing and moon salutations.',
    category: 'national',
    isPublicHoliday: true,
    lunarRuleKm: '១៤-១៥ កើត និង ១ រោច ខែកត្តិក',
    lunarRuleEn: '14-15 Waxing and 1 Waning of Kadeuk',
    khmerMonthIndex: 11,
    khmerMoonPhase: 'waxing',
    khmerDay: 15
  },
  {
    id: 'independence-day',
    nameKm: 'ទិវាបុណ្យឯករាជ្យជាតិ',
    nameEn: 'National Independence Day',
    descriptionKm:
      'រំលឹកដល់ទិវាដែលកម្ពុជាទទួលបានឯករាជ្យពេញលេញពីសាធារណរដ្ឋបារាំង នៅថ្ងៃទី៩ ខែវិច្ឆិកា ឆ្នាំ១៩៥៣ ក្រោមព្រះរាជបូជនីយកិច្ចនៃព្រះបាទសម្តេចព្រះ នរោត្តម សីហនុ។',
    descriptionEn: 'Celebrates Cambodia obtaining full national sovereignty on November 9, 1953.',
    category: 'national',
    isPublicHoliday: true,
    solarMonth: 11,
    solarDay: 9
  }
];
