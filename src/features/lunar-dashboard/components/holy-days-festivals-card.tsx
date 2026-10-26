import { useState } from 'react';
import { Sparkles, Calendar, Heart, Flame } from 'lucide-react';
import { BuddhaIcon } from '../../../components/icons/buddha-icon';
import { MoonPhaseDisc } from './moon-phase-disc';

export function HolyDaysFestivalsCard() {
  const [activeTab, setActiveTab] = useState<'sil' | 'festivals'>('sil');

  const holyDays = [
    {
      day: 8,
      isWaxing: true,
      title: '៨ កើត',
      khmerType: 'ថ្ងៃសីលក្នើត (First Quarter)',
      desc: 'សមាទានឧបោសថសីល និងស្ដាប់ព្រះធម៌ទេសនា',
      tag: 'ក្នើត',
      tagStyle: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
    },
    {
      day: 15,
      isWaxing: true,
      title: '១៥ កើត',
      khmerType: 'ថ្ងៃសីលធំ & ពេញបូណ៌មី (Full Moon)',
      desc: 'ថ្ងៃសីលធំ ពេញបូណ៌មី សូត្របាតិមោក្ខ និងបំពេញបុណ្យ',
      tag: 'ពេញបូណ៌មី',
      tagStyle: 'bg-[#E8BF70]/25 text-[#E8BF70] border-[#E8BF70]/50 font-bold shadow-sm'
    },
    {
      day: 8,
      isWaxing: false,
      title: '៨ រោច',
      khmerType: 'ថ្ងៃសីលក្នោច (Third Quarter)',
      desc: 'សមាទានសីល ៥ ឬ សីល ៨ ក្នុងរដូវកាលរោច',
      tag: 'ក្នើត',
      tagStyle: 'bg-sky-500/15 text-sky-300 border-sky-500/30'
    },
    {
      day: 14,
      isWaxing: false,
      title: '១៤ ឬ ១៥ រោច',
      khmerType: 'ថ្ងៃសីលដាច់ខែ (New Moon)',
      desc: 'ថ្ងៃសីលចុងខែចន្ទគតិ ត្រៀមស្វាគមន៍វដ្ដខែថ្មី',
      tag: 'ដាច់ខែ',
      tagStyle: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
    }
  ];

  const festivals = [
    {
      title: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ (Pchum Ben)',
      timing: '១ រោច ដល់ ១៥ រោច ខែភទ្របទ',
      desc: 'បុណ្យរំលឹកគុណបុព្វការីជន និងឧទ្ទិសកុសលដល់ញាតិទាំងប្រាំពីរសន្តាន',
      icon: Heart,
      tag: 'បុណ្យជាតិធំ',
      color: 'text-rose-400 bg-rose-500/15 border-rose-500/30'
    },
    {
      title: 'ពិធីបុណ្យអុំទូក (Water Festival)',
      timing: '១៤, ១៥ កើត និង ១ រោច ខែអស្សុជ',
      desc: 'អុំទូក បណ្ដែតប្រទីប សំពះព្រះខែ និងអកអំបុក',
      icon: Sparkles,
      tag: 'បុណ្យជាតិ',
      color: 'text-[#E8BF70] bg-[#E8BF70]/15 border-[#E8BF70]/30'
    },
    {
      title: 'ពិធីបុណ្យវិសាខបូជា (Visak Bochea)',
      timing: '១៥ កើត ខែពិសាខ',
      desc: 'ទិវាពុទ្ធសាសនាអន្តរជាតិ រំលឹកថ្ងៃប្រសូត ត្រាស់ដឹង និងបរិនិព្វាន',
      icon: Flame,
      tag: 'ពុទ្ធសាសនា',
      color: 'text-amber-400 bg-amber-500/15 border-amber-500/30'
    },
    {
      title: 'ពិធីបុណ្យមាឃបូជា (Meak Bochea)',
      timing: '១៥ កើត ខែមាឃ',
      desc: 'រំលឹកការប្រជុំចតុរង្គសន្និបាត និងការដាក់អាយុសង្ខាររបស់ព្រះសម្មាសម្ពុទ្ធ',
      icon: Calendar,
      tag: 'ពុទ្ធសាសនា',
      color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
    }
  ];

  return (
    <div className="rounded-3xl glass-panel p-6 border border-[#E8BF70]/25 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#E8BF70]/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#142A4D] to-[#E8BF70]/20 border border-[#E8BF70]/40 flex items-center justify-center text-[#E8BF70] shadow-md shrink-0">
              <BuddhaIcon className="w-5 h-5 text-[#E8BF70]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F4F3EF] leading-snug">
                ថ្ងៃសីល & ពិធីបុណ្យសំខាន់ៗ
              </h3>
              <p className="text-xs text-[#A9B8CC]">Buddhist Holy Days & Celebrations</p>
            </div>
          </div>

          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#142A4D]/80 border border-[#E8BF70]/30 text-[#E8BF70] font-semibold">
            {activeTab === 'sil' ? '៤ ថ្ងៃសីល/ខែ' : 'បុណ្យប្រពៃណី'}
          </span>
        </div>

        {/* Filter Switch Tabs */}
        <div className="grid grid-cols-2 gap-1.5 my-4 p-1 rounded-2xl bg-[#0B1930] border border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab('sil')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'sil'
                ? 'bg-[#E8BF70] text-[#071426] shadow-md'
                : 'text-[#A9B8CC] hover:text-[#F4F3EF]'
            }`}
          >
            🪷 ថ្ងៃសីល (Holy Days)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('festivals')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
              activeTab === 'festivals'
                ? 'bg-[#E8BF70] text-[#071426] shadow-md'
                : 'text-[#A9B8CC] hover:text-[#F4F3EF]'
            }`}
          >
            🏮 ពិធីបុណ្យ (Festivals)
          </button>
        </div>

        {/* Content List */}
        <div className="space-y-2.5">
          {activeTab === 'sil'
            ? holyDays.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-center justify-between p-3 rounded-2xl bg-[#0B1930]/85 hover:bg-[#142A4D]/70 border border-white/5 hover:border-[#E8BF70]/30 transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#142A4D] border border-[#E8BF70]/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <MoonPhaseDisc
                        day={item.day}
                        isWaxing={item.isWaxing}
                        size={24}
                        glow={item.day === 15}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-extrabold text-[#F4F3EF] leading-snug">
                        {item.title}{' '}
                        <span className="text-xs font-normal text-[#E8BF70]">
                          • {item.khmerType}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A9B8CC] truncate mt-0.5">{item.desc}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full border shrink-0 font-bold ml-2 ${item.tagStyle}`}
                  >
                    {item.tag}
                  </span>
                </div>
              ))
            : festivals.map((fest, idx) => {
                const Icon = fest.icon;
                return (
                  <div
                    key={idx}
                    className="group flex items-start justify-between p-3 rounded-2xl bg-[#0B1930]/85 hover:bg-[#142A4D]/70 border border-white/5 hover:border-[#E8BF70]/30 transition-all duration-200 shadow-sm"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#142A4D] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-[#E8BF70]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-[#F4F3EF] leading-snug">
                          {fest.title}
                        </div>
                        <div className="text-xs text-[#E8BF70] font-medium mt-0.5">
                          {fest.timing}
                        </div>
                        <p className="text-[11px] text-[#A9B8CC] line-clamp-1 mt-0.5">
                          {fest.desc}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 font-bold ml-2 ${fest.color}`}
                    >
                      {fest.tag}
                    </span>
                  </div>
                );
              })}
        </div>
      </div>

      {/* Footer Cultural / Buddhist Note */}
      <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-[#A9B8CC]">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400">🪷</span>
          <span className="italic">ឧបោសថសីល និងសមាទានសីល ៤ លើកក្នុងមួយខែ</span>
        </div>
        <span className="text-[#E8BF70] font-semibold text-[11px]">ពុទ្ធសាសនា</span>
      </div>
    </div>
  );
}
