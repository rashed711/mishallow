import React from 'react';
import { motion } from 'framer-motion';
import { teamData } from '../data/team';

interface TeamSectionProps {
  showTitle?: boolean;
  limit?: number;
}

const TeamSection: React.FC<TeamSectionProps> = ({ showTitle = true, limit }) => {
  const displayTeam = limit ? teamData.slice(0, limit) : teamData;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {showTitle && (
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#B89544] font-black tracking-widest uppercase text-xs mb-4 block underline underline-offset-8">نخبة الكفاءات</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-6">فريق العمل</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-bold">
                نضم نخبة من المحامين والمستشارين القانونيين المكرسين لتحقيق أعلى معايير العدالة وحماية مصالح عملائنا.
              </p>
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayTeam.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="group text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-8">
                {/* Decorative Ring */}
                <div className="absolute -inset-2 border-2 border-dashed border-[#B89544]/20 rounded-full group-hover:rotate-180 transition-transform duration-1000"></div>
                
                <div className="relative w-full h-full overflow-hidden rounded-full bg-slate-100 border-4 border-white shadow-lg transition-all duration-500 group-hover:shadow-[#B89544]/30 group-hover:border-[#B89544]/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 group-hover:bg-[#0F172A]/5 transition-opacity"></div>
                </div>
              </div>

              <div className="px-4">
                <h3 className="text-xl font-black text-[#0F172A] mb-1 group-hover:text-[#B89544] transition-colors">{member.name}</h3>
                <p className="text-[#B89544] font-black text-xs mb-4 uppercase tracking-widest">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-bold group-hover:text-slate-700 transition-colors px-2">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
