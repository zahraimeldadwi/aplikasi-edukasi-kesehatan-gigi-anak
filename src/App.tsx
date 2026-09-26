/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PlayerProfile, ScreenType, LevelInfo, Gender } from './types';
import { GAME_LEVELS } from './data/levelsData';
import { audioSystem } from './utils/audioSystem';
import { notificationSystem } from './utils/notificationSystem';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { NameInputScreen } from './components/NameInputScreen';
import { DashboardMap } from './components/DashboardMap';
import { LevelPlayer } from './components/LevelPlayer';
import { GrandQuizScreen } from './components/GrandQuizScreen';
import { QuizResultsScreen } from './components/QuizResultsScreen';
import { BadgesScreen } from './components/BadgesScreen';
import { CertificateScreen } from './components/CertificateScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { AllMaterialsScreen } from './components/AllMaterialsScreen';
import { BrushReminderModal } from './components/BrushReminderModal';
import { HelpModal } from './components/HelpModal';

const STORAGE_KEY = 'pahlawan_gigi_save_data_v1';

const INITIAL_PROFILE: PlayerProfile = {
  name: '',
  gender: 'boy',
  hearts: 5,
  maxHearts: 5,
  score: 0,
  unlockedLevel: 1,
  completedLevels: [],
  badges: [],
  quizCompleted: false,
  quizScore: null,
  quizCorrect: 0,
  quizWrong: 0,
  quizMistakes: [],
  morningReminder: true,
  morningTime: '06:30',
  nightReminder: true,
  nightTime: '20:00',
  brushStreak: 1,
};

export default function App() {
  const [player, setPlayer] = useState<PlayerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return INITIAL_PROFILE;
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => {
    return player.name ? 'map' : 'welcome';
  });

  const [activeLevel, setActiveLevel] = useState<LevelInfo | null>(null);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch {
      // ignore
    }
  }, [player]);

  // Start notification schedule checker
  useEffect(() => {
    notificationSystem.startChecker(
      {
        morningEnabled: player.morningReminder,
        morningTime: player.morningTime,
        nightEnabled: player.nightReminder,
        nightTime: player.nightTime,
      },
      player.name
    );

    return () => {
      notificationSystem.stopChecker();
    };
  }, [player.morningReminder, player.morningTime, player.nightReminder, player.nightTime, player.name]);

  // Profile setup handler
  const handleNameAndGenderConfirmed = (name: string, gender: Gender) => {
    setPlayer(prev => ({
      ...prev,
      name,
      gender,
      badges: prev.badges.includes('badge_welcome') ? prev.badges : [...prev.badges, 'badge_welcome'],
    }));
    setCurrentScreen('map');
    audioSystem.startMusic('main');
  };

  // Select Level to play
  const handleSelectLevel = (level: LevelInfo) => {
    setActiveLevel(level);
    setCurrentScreen('level_play');
  };

  // Heart deduction
  const handleDeductHeart = () => {
    setPlayer(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
  };

  // Restore hearts back to 5
  const handleRestoreHearts = () => {
    audioSystem.playSfx('bonus');
    setPlayer(prev => ({
      ...prev,
      hearts: 5,
    }));
  };

  // Level completion
  const handleCompleteLevel = (levelId: number, earnedPoints: number) => {
    setPlayer(prev => {
      const completed = prev.completedLevels.includes(levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, levelId];

      const nextUnlocked = Math.max(prev.unlockedLevel, Math.min(8, levelId + 1));

      // Level badges
      const newBadges = [...prev.badges];
      const level = GAME_LEVELS.find(l => l.id === levelId);
      if (level && !newBadges.includes(level.badgeId)) {
        newBadges.push(level.badgeId);
      }

      return {
        ...prev,
        score: prev.score + earnedPoints,
        completedLevels: completed,
        unlockedLevel: nextUnlocked,
        badges: newBadges,
      };
    });
  };

  // Next level navigation
  const handleNextLevel = () => {
    if (!activeLevel) return;
    const nextId = activeLevel.id + 1;
    const nextLevel = GAME_LEVELS.find(l => l.id === nextId);
    if (nextLevel) {
      setActiveLevel(nextLevel);
      setCurrentScreen('level_play');
    } else {
      setCurrentScreen('map');
    }
  };

  // Finish Grand Quiz
  const handleFinishQuiz = (
    quizScore: number,
    correctCount: number,
    wrongCount: number,
    mistakes: {
      questionId: number;
      question: string;
      userAnswer: string;
      correctAnswer: string;
      explanation: string;
    }[]
  ) => {
    const earnedBonus = quizScore * 2; // up to 200 points
    setPlayer(prev => {
      const newBadges = [...prev.badges];
      if (!newBadges.includes('badge_master_hero')) {
        newBadges.push('badge_master_hero');
      }

      return {
        ...prev,
        score: prev.score + earnedBonus,
        quizCompleted: true,
        quizScore,
        quizCorrect: correctCount,
        quizWrong: wrongCount,
        quizMistakes: mistakes,
        badges: newBadges,
        dateCompleted: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      };
    });

    setCurrentScreen('quiz_result');
  };

  // Retry quiz
  const handleRetryQuiz = () => {
    handleRestoreHearts();
    setCurrentScreen('grand_quiz');
  };

  // Update brush reminder config
  const handleUpdateReminder = (
    morningEnabled: boolean,
    morningTime: string,
    nightEnabled: boolean,
    nightTime: string
  ) => {
    setPlayer(prev => ({
      ...prev,
      morningReminder: morningEnabled,
      morningTime,
      nightReminder: nightEnabled,
      nightTime,
    }));
  };

  // Increment brush streak
  const handleIncrementStreak = () => {
    setPlayer(prev => ({
      ...prev,
      brushStreak: prev.brushStreak + 1,
      score: prev.score + 10,
    }));
  };

  // Screen routing
  return (
    <div className="min-h-screen bg-sky-50/60 text-slate-800 flex flex-col font-['Nunito',sans-serif]">
      {/* Show header on all main in-game screens */}
      {player.name && currentScreen !== 'welcome' && currentScreen !== 'name_input' && (
        <Header
          player={player}
          currentScreen={currentScreen}
          onNavigate={screen => {
            audioSystem.playSfx('click');
            if (screen === 'map') {
              audioSystem.startMusic('main');
            }
            setCurrentScreen(screen);
          }}
          onOpenReminderModal={() => setIsReminderOpen(true)}
          onOpenHelpModal={() => setIsHelpOpen(true)}
        />
      )}

      {/* Main Screen Content */}
      <main className="flex-1 p-3 sm:p-5">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStart={() => {
              if (player.name) {
                setCurrentScreen('map');
              } else {
                setCurrentScreen('name_input');
              }
            }}
          />
        )}

        {currentScreen === 'name_input' && (
          <NameInputScreen onConfirm={handleNameAndGenderConfirmed} />
        )}

        {currentScreen === 'map' && (
          <DashboardMap
            player={player}
            onSelectLevel={handleSelectLevel}
            onGoToGrandQuiz={() => {
              handleRestoreHearts();
              setCurrentScreen('grand_quiz');
            }}
          />
        )}

        {currentScreen === 'level_play' && activeLevel && (
          <LevelPlayer
            level={activeLevel}
            player={player}
            onCompleteLevel={handleCompleteLevel}
            onDeductHeart={handleDeductHeart}
            onRestoreHearts={handleRestoreHearts}
            onBackToMap={() => {
              audioSystem.startMusic('main');
              setCurrentScreen('map');
            }}
            onNextLevel={handleNextLevel}
          />
        )}

        {currentScreen === 'grand_quiz' && (
          <GrandQuizScreen
            player={player}
            onFinishQuiz={handleFinishQuiz}
            onDeductHeart={handleDeductHeart}
            onRestoreHearts={handleRestoreHearts}
            onBackToHome={() => {
              audioSystem.startMusic('main');
              setCurrentScreen('map');
            }}
          />
        )}

        {currentScreen === 'quiz_result' && (
          <QuizResultsScreen
            player={player}
            onNavigate={screen => {
              audioSystem.playSfx('click');
              if (screen === 'map') audioSystem.startMusic('main');
              setCurrentScreen(screen);
            }}
            onRetryQuiz={handleRetryQuiz}
          />
        )}

        {currentScreen === 'materials' && (
          <AllMaterialsScreen
            onBackToMap={() => {
              audioSystem.startMusic('main');
              setCurrentScreen('map');
            }}
          />
        )}

        {currentScreen === 'badges' && (
          <BadgesScreen
            player={player}
            onBackToMap={() => {
              audioSystem.startMusic('main');
              setCurrentScreen('map');
            }}
          />
        )}

        {currentScreen === 'certificate' && (
          <CertificateScreen
            player={player}
            onBackToMap={() => {
              audioSystem.startMusic('main');
              setCurrentScreen('map');
            }}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen
            player={player}
            onBackToMap={() => {
              audioSystem.startMusic('main');
              setCurrentScreen('map');
            }}
          />
        )}
      </main>

      {/* Reminder Modal */}
      <BrushReminderModal
        playerName={player.name}
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
        morningEnabled={player.morningReminder}
        morningTime={player.morningTime}
        nightEnabled={player.nightReminder}
        nightTime={player.nightTime}
        brushStreak={player.brushStreak}
        onUpdateReminder={handleUpdateReminder}
        onIncrementStreak={handleIncrementStreak}
      />

      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Friendly Footer Note (Screen only, hidden in print) */}
      <footer className="text-center py-4 text-xs text-slate-400 font-semibold print:hidden border-t border-slate-200/60 mt-auto">
        <p>
          🦷 Pahlawan Gigi · Edukasi Kesehatan Gigi & Mulut Anak Sekolah Dasar · Indonesia
        </p>
      </footer>
    </div>
  );
}
