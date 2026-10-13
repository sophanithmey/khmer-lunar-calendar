import type { CulturalArticle } from '../types/article.types';

export const CULTURAL_ARTICLES: CulturalArticle[] = [
  {
    id: 'waxing-waning',
    titleKm: 'ការយល់ដឹងអំពី ខ្នើត និង រនោច ក្នុងក្បួនចន្ទគតិ',
    titleEn: 'Understanding Waxing (Kha-noet) and Waning (Ro-noch)',
    summaryKm:
      'ដំណើរព្រះចន្ទមួយជុំចែកចេញជាពីរប៉ែក៖ ខ្នើត (ចន្ទរះកាន់តែពេញ) និង រនោច (ចន្ទស្រុតថយចុះ)។',
    summaryEn:
      'The lunar cycle is divided into two fortnights: Kha-noet (waxing) and Ro-noch (waning).',
    categoryKm: 'ក្បួនចន្ទគតិ',
    categoryEn: 'Lunar Mechanics',
    readTimeMinutes: 3,
    contentKm: [
      'ក្នុងក្បួនចន្ទគតិខ្មែរ រយៈពេលមួយខែត្រូវបានកំណត់តាមដំណើរគោចររបស់ព្រះចន្ទជុំវិញផែនដី ដោយចែកចេញជាពីរភាគស្មើគ្នាគឺ ខ្នើត និង រនោច។',
      'ខ្នើត (Waxing)៖ ចាប់ផ្ដើមពី ១ កើត រហូតដល់ ១៥ កើត (ពេញបូណ៌មី)។ ក្នុងកំឡុងពេលនេះ ព្រះចន្ទកាន់តែភ្លឺឡើងៗជារៀងរាល់រាត្រីរហូតដល់ពេញវង់។ ខ្មែរបុរាណតែងចាត់ទុកពេលខ្នើតជាពេលវេលានៃភាពចម្រុងចម្រើន។',
      'រនោច (Waning)៖ ចាប់ផ្ដើមពី ១ រោច រហូតដល់ ១៤ ឬ ១៥ រោច (ដាច់ខែ)។ ពន្លឺព្រះចន្ទស្រុតថយបន្តិចម្ដងៗរហូតដល់ងងឹតសូន្យឈឹង ដែលហៅថាថ្ងៃអមavasya ឬខែដាច់។'
    ],
    contentEn: [
      'In the Khmer lunar calendar (Chhankitek), each month tracks the cyclical orbit of the Moon around Earth, divided into two distinct fortnights: Kha-noet and Ro-noch.',
      'Kha-noet (Waxing): Spans from 1st waxing to 15th waxing (Full Moon / Pen Boranami). Each night the visible illumination expands until completing a luminous sphere. Historically, waxing days symbolize auspicious beginnings.',
      'Ro-noch (Waning): Spans from 1st waning until the 14th or 15th waning day (New Moon). Illumination steadily diminishes into darkness before commencing the next lunar cycle.'
    ]
  },
  {
    id: 'lunar-day-counting',
    titleKm: 'របៀបរាប់ថ្ងៃ និងខែខ្វះ-ខែពេញ ក្នុងប្រតិទិនខ្មែរ',
    titleEn: 'Day Counting: 29-day and 30-day Lunar Months',
    summaryKm:
      'ខែចន្ទគតិខ្មែរមិនមាន ៣០ ឬ ៣១ ថ្ងៃដូចសុរិយគតិទេ តែមាន ២៩ ថ្ងៃ (ខែខ្វះ) ឬ ៣០ ថ្ងៃ (ខែពេញ)។',
    summaryEn:
      'Khmer lunar months alternate between 29 days (hollow month) and 30 days (full month).',
    categoryKm: 'ក្បួនគណនា',
    categoryEn: 'Calendar Calculation',
    readTimeMinutes: 4,
    contentKm: [
      'ដោយសារតែខែចន្ទគតិតារាសាស្ត្រពិតប្រាកដមានប្រមាណ ២៩.៥៣ ថ្ងៃ ប្រតិទិនខ្មែរត្រូវឆ្លាស់រវាងខែដែលមាន ២៩ ថ្ងៃ (ខែខ្វះ) និងខែដែលមាន ៣០ ថ្ងៃ (ខែពេញ)។',
      'ខែខ្វះ មានត្រឹម ១៤ រោចប៉ុណ្ណោះ (ដូចជា ខែមិគសិរ មាឃ ចេត្រ ជេស្ឋ) សរុប ២៩ ថ្ងៃ។ រីឯខែពេញ មានដល់ ១៥ រោច (ដូចជា ខែបុស្ស ផល្គុន ពិសាខ អាសាឍ) សរុប ៣០ ថ្ងៃ។',
      'ក្រៅពីនេះ នៅមានឆ្នាំដែលមានខែលើកហៅថា "អធិកមាស" ដែលមានខែអាសាឍពីរដង (បឋមាសាឍ និង ទុតិយាសាឍ) ដើម្បីតម្រឹមខែចន្ទគតិឲ្យត្រូវនឹងរដូវកាលនៃសុរិយគតិ។'
    ],
    contentEn: [
      'Because a synodic lunar month averages 29.53059 days, the Khmer calendar alternates between 29-day hollow months (Khae Kva) and 30-day full months (Khae Penh).',
      'In 29-day hollow months, the waning period ends on the 14th waning day. In 30-day full months, it extends to the 15th waning day.',
      'Furthermore, to prevent the lunar calendar from drifting away from solar seasons, an intercalary leap month (Adhikamas) is inserted roughly every 2 to 3 years, duplicating the month of Asadh into Pathamasadh (1st) and Tutiyasadh (2nd).'
    ]
  },
  {
    id: 'thngai-sil',
    titleKm: 'អត្ថន័យនៃថ្ងៃសីលទាំង ៤ ក្នុងពុទ្ធសាសនាខ្មែរ',
    titleEn: 'The Four Sacred Buddhist Observance Days (Thngai Sil)',
    summaryKm: 'ថ្ងៃសីលជាថ្ងៃដែលពុទ្ធសាសនិកខ្មែរទៅវត្តអារាម សមាទានសីល ស្ដាប់ព្រះធម៌ និងបំពេញកុសល។',
    summaryEn:
      'Thngai Sil are sacred days when lay Buddhists visit pagodas to uphold moral precepts and meditate.',
    categoryKm: 'ពុទ្ធសាសនា',
    categoryEn: 'Buddhism',
    readTimeMinutes: 3,
    contentKm: [
      'ក្នុងមួយខែចន្ទគតិ ពុទ្ធបរិស័ទខ្មែរគោរពប្រតិបត្តិនូវថ្ងៃសីលចំនួន ៤ លើក គឺ៖ ៨ កើត, ១៥ កើត (ពេញបូណ៌មី), ៨ រោច និង ថ្ងៃដាច់ខែ (១៤ រោច ឬ ១៥ រោច)។',
      'ថ្ងៃពេញបូណ៌មី (១៥ កើត) គឺជាថ្ងៃសីលធំបំផុត ដែលមានពន្លឺចន្ទពេញវង់ និងត្រូវនឹងព្រឹត្តិការណ៍ពុទ្ធប្រវត្តិសំខាន់ៗជាច្រើន ដូចជា វិសាខបូជា និង មាឃបូជា។',
      'នៅថ្ងៃសីល ប្រជាជនខ្មែរតែងតែស្លៀកពាក់ស រៀបចំចង្ហាន់ បង្អែម ផ្លែឈើ និងផ្កាឈូក ទៅវត្តដើម្បីប្រគេនព្រះសង្ឃ និងសមាទានឧបោសថសីល។'
    ],
    contentEn: [
      'In each lunar month, Cambodian Buddhists observe four holy Uposatha days: 8th waxing, 15th waxing (Full Moon), 8th waning, and the final waning day (14th or 15th).',
      'The 15th waxing day is the most significant, characterized by a radiant full moon and coinciding with sacred Buddhist commemorations including Visak Bochea and Meak Bochea.',
      'On these days, devotees dress in traditional white garments, prepare vegetarian offerings and lotus blossoms, visit monasteries, and observe the eight moral precepts.'
    ]
  },
  {
    id: 'astronomy-vs-calendar',
    titleKm: 'ភាពខុសគ្នារវាង ចន្ទគតិតារាសាស្ត្រ និង ប្រតិទិនចន្ទគតិប្រពៃណី',
    titleEn: 'Astronomical Moon Phase vs Traditional Lunar Calendar',
    summaryKm:
      'ស្វែងយល់ពីទំនាក់ទំនង និងភាពខុសប្លែកគ្នារវាងការគណនារូបវន្តតារាសាស្ត្រ និងក្បួនតម្រាខ្មែរបុរាណ។',
    summaryEn:
      'Exploring the technical harmony and slight distinctions between orbital astronomy and cultural lunar reckoning.',
    categoryKm: 'តារាសាស្ត្រ',
    categoryEn: 'Astronomy & Heritage',
    readTimeMinutes: 4,
    contentKm: [
      'ទោះបីជាប្រតិទិនចន្ទគតិខ្មែរមានមូលដ្ឋានលើដំណើរព្រះចន្ទ ប៉ុន្តែក្បួនគណនាប្រើប្រាស់រូបមន្តក្បួនហោរាសាស្ត្របុរាណ (ដូចជាចុល្លសករាជ និងអាវមាន) ដែលចែកថ្ងៃជាចំនួនគត់នៃថ្ងៃរះ និងថ្ងៃលិច។',
      'ផ្ទុយទៅវិញ តារាសាស្ត្រសម័យទំនើបគណនាដំណាក់កាលព្រះចន្ទតាមមុំធរណីមាត្រជាក់លាក់រវាងព្រះអាទិត្យ ផែនដី និងព្រះចន្ទ ដែលអាចកើតឡើងនៅម៉ោង នាទី និងវិនាទីជាក់លាក់។',
      'ដូច្នេះហើយ ពេលខ្លះថ្ងៃពេញបូណ៌មីតារាសាស្ត្រពិតប្រាកដ (Full Moon 100%) អាចធ្លាក់នៅម៉ោងរំលងអធ្រាត្រ ឬថ្ងៃបន្ទាប់ពី ១៥ កើតនៃប្រតិទិនបន្តិចបន្តួច។'
    ],
    contentEn: [
      'While the Khmer lunar calendar is grounded in the lunar cycle, traditional calculation algorithms (such as Chula Sakarat formulas and avaman) discretize the calendar into integer solar days measured from sunrise.',
      'Modern astronomy calculates the Moon phase continuously based on the exact geometric angle between the Sun, Earth, and Moon down to the precise second in UTC.',
      'Consequently, astronomical peak full moon (100% illumination) may occur a few hours before or after the designated 15th waxing calendar day, showing how traditional calendars gracefully synchronize continuous celestial mechanics into structured civil life.'
    ]
  }
];
