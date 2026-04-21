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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayTeam.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-100 mb-8 border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#B89544]/20 group-hover:border-[#B89544]/30">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* Accent Gold Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#B89544] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
              </div>

              <div className="text-center md:text-right px-4">
                <h3 className="text-2xl font-black text-[#0F172A] mb-2 group-hover:text-[#B89544] transition-colors">{member.name}</h3>
                <p className="text-[#B89544] font-black text-sm mb-4 uppercase tracking-wide">{member.role}</p>
                <div className="w-12 h-1 bg-slate-100 group-hover:w-20 group-hover:bg-[#B89544] transition-all duration-500 mb-4 ml-auto"></div>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-bold group-hover:text-slate-700 transition-colors">
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
