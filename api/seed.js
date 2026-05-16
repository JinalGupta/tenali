import { createClient } from '@supabase/supabase-js';
import fermatsLittleData from '../../src/data/fermats-little.json';
import handshakeData from '../../src/data/handshake.json';
import chineseRemainderData from '../../src/data/chinese-remainder.json';
import couponCollectorData from '../../src/data/coupon-collector.json';
import euclideanAlgorithmData from '../../src/data/euclidean-algorithm.json';
import modularInverseData from '../../src/data/modular-inverse.json';
import binaryExponentiationData from '../../src/data/binary-exponentiation.json';

const supabaseUrl = 'https://gwmciomzyaujlpsquvbz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bWNpb216eWF1amxwc3F1dmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTA4NzQsImV4cCI6MjA5NDMyNjg3NH0.k0t6iwmH_4OiFOEqTjX888CybFOH53L9Fs0-98YVuPE';
const supabase = createClient(supabaseUrl, supabaseKey);

const QUESTION_BANKS = {
  'fermats-little': fermatsLittleData,
  'handshake': handshakeData,
  'chinese-remainder': chineseRemainderData,
  'coupon-collector': couponCollectorData,
  'euclidean-algorithm': euclideanAlgorithmData,
  'modular-inverse': modularInverseData,
  'binary-exponentiation': binaryExponentiationData,
};

const META = {
  'fermats-little': { title: "Fermat's Little Theorem", icon: 'fermats-little', color: 'bg-teal-400/20' },
  'handshake': { title: 'The Handshake Problem', icon: 'handshake', color: 'bg-amber-400/20' },
  'chinese-remainder': { title: 'Chinese Remainder Theorem', icon: 'chinese-remainder', color: 'bg-purple-400/20' },
  'coupon-collector': { title: 'Coupon Collector Problem', icon: 'coupon-collector', color: 'bg-green-400/20' },
  'euclidean-algorithm': { title: 'The Euclidean Algorithm', icon: 'euclidean-algorithm', color: 'bg-blue-400/20' },
  'modular-inverse': { title: 'Modular Multiplicative Inverse', icon: 'modular-inverse', color: 'bg-coral-400/20' },
  'binary-exponentiation': { title: 'Binary Exponentiation', icon: 'binary-exponentiation', color: 'bg-pink-400/20' },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const caseStudies = Object.entries(META).map(([id, meta]) => {
      const kb = QUESTION_BANKS[id];
      return {
        id,
        title: meta.title,
        core_idea: kb.story.intro,
        story_intro: kb.story.intro,
        real_world: kb.story.applications,
        icon: meta.icon,
        color: meta.color,
      };
    });

    const { error: csError } = await supabase.from('case_studies').upsert(caseStudies, { onConflict: 'id' });
    if (csError) throw csError;

    const allStages = [];
    for (const [caseStudyId, kb] of Object.entries(QUESTION_BANKS)) {
      for (const stage of kb.stages) {
        allStages.push({
          id: `${caseStudyId}-stage-${stage.id}`,
          case_study_id: caseStudyId,
          stage_number: stage.id,
          concept_label: stage.conceptLabel,
          question: stage.question,
          hint: stage.hint,
          type: stage.type,
          accepted_answers: stage.acceptedAnswers,
          concept_shown: stage.conceptShown,
        });
      }
    }

    const { error: stageError } = await supabase.from('stages').upsert(allStages, { onConflict: 'id' });
    if (stageError) throw stageError;

    return res.json({ message: 'Seed complete', caseStudies: caseStudies.length, stages: allStages.length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}