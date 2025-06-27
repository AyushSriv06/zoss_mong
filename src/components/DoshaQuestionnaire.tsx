
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Droplets } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    dosha: 'vata' | 'pitta' | 'kapha';
  }[];
}

const questions: Question[] = [
  {
    id: 'body-type',
    question: 'What best describes your body type?',
    options: [
      { text: 'Thin, light frame, difficulty gaining weight', dosha: 'vata' },
      { text: 'Medium build, athletic, moderate weight', dosha: 'pitta' },
      { text: 'Larger frame, tendency to gain weight easily', dosha: 'kapha' }
    ]
  },
  {
    id: 'skin-hair',
    question: 'How would you describe your skin and hair?',
    options: [
      { text: 'Dry skin, thin/dry hair, rough texture', dosha: 'vata' },
      { text: 'Oily skin, fine hair, warm to touch', dosha: 'pitta' },
      { text: 'Thick/oily skin, thick/wavy hair, cool/moist', dosha: 'kapha' }
    ]
  },
  {
    id: 'energy-activity',
    question: 'What describes your energy and activity level?',
    options: [
      { text: 'Bursts of energy, gets tired quickly, restless', dosha: 'vata' },
      { text: 'Moderate, steady energy, focused activity', dosha: 'pitta' },
      { text: 'Steady, enduring energy, prefers slow pace', dosha: 'kapha' }
    ]
  },
  {
    id: 'digestion',
    question: 'How is your digestion and appetite?',
    options: [
      { text: 'Irregular appetite, gas/bloating, constipation', dosha: 'vata' },
      { text: 'Strong appetite, good digestion, gets hungry often', dosha: 'pitta' },
      { text: 'Slow digestion, can skip meals, feels heavy after eating', dosha: 'kapha' }
    ]
  },
  {
    id: 'sleep-mind',
    question: 'What describes your sleep and mental patterns?',
    options: [
      { text: 'Light sleeper, active mind, worry easily', dosha: 'vata' },
      { text: 'Moderate sleep, sharp mind, can be irritable', dosha: 'pitta' },
      { text: 'Deep sleeper, calm mind, slow to anger', dosha: 'kapha' }
    ]
  },
  {
    id: 'weather-preference',
    question: 'What weather do you prefer?',
    options: [
      { text: 'Warm, humid weather; dislike cold and wind', dosha: 'vata' },
      { text: 'Cool weather; dislike heat and sun', dosha: 'pitta' },
      { text: 'Warm, dry weather; dislike cold and dampness', dosha: 'kapha' }
    ]
  }
];

const DoshaQuestionnaire = () => {
  const [answers, setAnswers] = useState<Record<string, 'vata' | 'pitta' | 'kapha'>>({});
  const [result, setResult] = useState<{
    primaryDosha: string;
    description: string;
    waterRecommendation: string;
    dailyIntake: string;
  } | null>(null);

  const handleAnswerChange = (questionId: string, dosha: 'vata' | 'pitta' | 'kapha') => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: dosha
    }));
  };

  const calculateDosha = () => {
    if (Object.keys(answers).length < 6) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const scores = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(answers).forEach(dosha => {
      scores[dosha]++;
    });

    const primaryDosha = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    const doshaInfo = {
      vata: {
        description: 'Vata constitution is characterized by qualities of air and space. You tend to be creative, energetic, and quick-thinking, but may experience dryness and irregularity.',
        waterRecommendation: 'pH 8.5-9.0 Alkaline Water - Gentle alkalinity helps balance Vata\'s dry and irregular nature',
        dailyIntake: '2.5-3 liters daily, preferably warm or room temperature water'
      },
      pitta: {
        description: 'Pitta constitution is dominated by fire and water elements. You tend to be focused, ambitious, and have strong digestion, but may experience heat and intensity.',
        waterRecommendation: 'pH 9.0-9.5 Strong Alkaline Water - Cooling alkaline water helps balance Pitta\'s heat and acidity',
        dailyIntake: '3-3.5 liters daily, preferably cool water, especially during summer'
      },
      kapha: {
        description: 'Kapha constitution combines earth and water elements. You tend to be calm, stable, and strong, but may experience sluggishness and weight gain.',
        waterRecommendation: 'pH 9.5+ Very Strong Alkaline Water - High alkalinity helps stimulate Kapha\'s slow metabolism',
        dailyIntake: '2-2.5 liters daily, preferably warm water to stimulate digestion'
      }
    };

    setResult({
      primaryDosha: primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1),
      ...doshaInfo[primaryDosha as keyof typeof doshaInfo]
    });
  };

  const resetQuestionnaire = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Droplets className="h-6 w-6 text-zoss-green" />
            <h3 className="font-heading text-3xl font-semibold text-zoss-blue">Know Your Dosha</h3>
          </div>
          <p className="text-lg text-zoss-gray">
            Answer these questions to discover your Ayurvedic constitution and get personalized water recommendations
          </p>
        </div>

        <Card className="p-8">
          <CardContent className="space-y-8">
            {!result ? (
              <>
                {questions.map((question, index) => (
                  <div key={question.id} className="space-y-4">
                    <h4 className="text-lg font-medium text-zoss-blue">
                      {index + 1}. {question.question}
                    </h4>
                    <RadioGroup
                      value={answers[question.id] || ''}
                      onValueChange={(value) => handleAnswerChange(question.id, value as 'vata' | 'pitta' | 'kapha')}
                      className="space-y-3"
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-start space-x-3">
                          <RadioGroupItem 
                            value={option.dosha} 
                            id={`${question.id}-${optionIndex}`}
                            className="mt-1"
                          />
                          <Label 
                            htmlFor={`${question.id}-${optionIndex}`}
                            className="text-zoss-gray leading-relaxed cursor-pointer"
                          >
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}

                <div className="text-center pt-6">
                  <Button 
                    onClick={calculateDosha}
                    className="bg-zoss-green hover:bg-zoss-green/90 text-white px-8 py-3 text-lg"
                  >
                    Submit & Get My Dosha
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center p-6 bg-zoss-green/10 rounded-lg">
                  <h4 className="text-2xl font-bold text-zoss-blue mb-2">
                    Your Primary Dosha: {result.primaryDosha}
                  </h4>
                  <p className="text-zoss-gray leading-relaxed">
                    {result.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-blue-50 rounded-lg">
                    <h5 className="text-lg font-semibold text-zoss-blue mb-3">
                      Recommended Water Type
                    </h5>
                    <p className="text-zoss-gray">
                      {result.waterRecommendation}
                    </p>
                  </div>

                  <div className="p-6 bg-green-50 rounded-lg">
                    <h5 className="text-lg font-semibold text-zoss-blue mb-3">
                      Daily Water Intake
                    </h5>
                    <p className="text-zoss-gray">
                      {result.dailyIntake}
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-4 pt-4">
                  <Button 
                    className="bg-zoss-green hover:bg-zoss-green/90 text-white mr-4"
                  >
                    View Suitable Plans
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetQuestionnaire}
                    className="border-zoss-blue text-zoss-blue hover:bg-zoss-blue hover:text-white"
                  >
                    Take Quiz Again
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DoshaQuestionnaire;
