import { Router, Request, Response } from 'express';
import { MENU_ITEMS, MenuItem } from '../data/cafeStore.js';
import { GoogleGenAI } from '@google/genai';

export const baristaRouter = Router();

interface RecommendationRequest {
  mood?: string;
  flavorProfile?: string;
  caffeineLevel?: string;
}

baristaRouter.post('/recommend', async (req: Request, res: Response) => {
  const { mood, flavorProfile, caffeineLevel }: RecommendationRequest = req.body;

  let recommendedDrink: MenuItem;
  let recommendedPastry: MenuItem;
  let baristaNote = '';

  if (mood === 'foggy-morning' || flavorProfile === 'warm-spice') {
    recommendedDrink = MENU_ITEMS.find(i => i.id === 'cardamom-rose-flatwhite') || MENU_ITEMS[0];
    recommendedPastry = MENU_ITEMS.find(i => i.id === 'cardamom-morning-bun') || MENU_ITEMS[7];
    baristaNote = "When you want warmth and gentle spice, our Spiced Cardamom & Rose Flat White pairs wonderfully with the braided Swedish Kardemummabulle for double the comforting aroma.";
  } else if (mood === 'deep-focus' || flavorProfile === 'citrus-floral') {
    recommendedDrink = MENU_ITEMS.find(i => i.id === 'chemex-geisha') || MENU_ITEMS[2];
    recommendedPastry = MENU_ITEMS.find(i => i.id === 'almond-croissant-brûlée') || MENU_ITEMS[7];
    baristaNote = "For creative clarity, the delicate jasmine and bergamot notes of our Geisha Chemex bring clean energy, paired with our golden flaky almond croissant.";
  } else if (mood === 'sweet-indulgence' || flavorProfile === 'silky-sweet') {
    recommendedDrink = MENU_ITEMS.find(i => i.id === 'smoked-vanilla-latte') || MENU_ITEMS[1];
    recommendedPastry = MENU_ITEMS.find(i => i.id === 'pain-au-chocolat-hazelnut') || MENU_ITEMS[8];
    baristaNote = "Our house-smoked Madagascar vanilla latte offers velvety warmth, paired with the 70% dark Valrhona babka knot for an indulgent Sunshine afternoon.";
  } else if (caffeineLevel === 'gentle' || flavorProfile === 'earthy') {
    recommendedDrink = MENU_ITEMS.find(i => i.id === 'ceremonial-matcha-cloud') || MENU_ITEMS[4];
    recommendedPastry = MENU_ITEMS.find(i => i.id === 'avocado-poached-egg-tartine') || MENU_ITEMS[10];
    baristaNote = "Stone-ground ceremonial Uji matcha gives steady focus without jitters, perfectly balanced by our savory lemon ricotta avocado sourdough tartine.";
  } else {
    recommendedDrink = MENU_ITEMS.find(i => i.id === 'cappuccino-valencia') || MENU_ITEMS[0];
    recommendedPastry = MENU_ITEMS.find(i => i.id === 'almond-croissant-brûlée') || MENU_ITEMS[7];
    baristaNote = "Our candied orange zest cappuccino brings bright morning sunshine to rich estate cocoa notes, making every sip comforting and lively.";
  }

  // Attempt Gemini enrichment if available
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI();
      const prompt = `You are the master barista at "Sunshine", an aesthetic artisan cafe. A guest says:
Mood: ${mood || 'comforting'}
Flavor preference: ${flavorProfile || 'rich & warm'}
Caffeine: ${caffeineLevel || 'regular'}

Write a 2-sentence warm, sensory barista recommendation introducing "${recommendedDrink.name}" paired with "${recommendedPastry.name}". Mention specific flavor notes. Keep it poetic, cozy, and inviting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      if (response.text) {
        baristaNote = response.text.trim();
      }
    } catch {
      // Fallback works seamlessly
    }
  }

  res.json({
    success: true,
    recommendation: {
      drink: recommendedDrink,
      pastry: recommendedPastry,
      baristaNote,
      matchReason: `Selected for your preference of ${flavorProfile || 'comforting roasts'} during a ${mood || 'cozy'} moment.`
    }
  });
});
