import React, { useState, createContext, useContext } from 'react';
import { ChevronRight, ChevronLeft, Moon, Sun, X, BookOpen, Users, School, Leaf, Shield, Recycle, Download, Play, FileText } from 'lucide-react';
import './App.css';

const AppContext = createContext();

const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};

const AppProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [userType, setUserType] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const toggleTheme = () => setIsDark(prev => !prev);

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));
    const goToStep = (step) => setCurrentStep(step);

    return (
        <AppContext.Provider value={{
            isDark,
            toggleTheme,
            currentStep,
            setCurrentStep,
            nextStep,
            prevStep,
            goToStep,
            userType,
            setUserType,
            showExplanation,
            setShowExplanation
        }}>
            {children}
        </AppContext.Provider>
    );
};


const ExplanationPanel = () => {
    const { showExplanation, setShowExplanation } = useApp();

    if (!showExplanation) return null;

    return (
        <div className="explanation-overlay" onClick={() => setShowExplanation(false)}>
            <div className="explanation-panel" onClick={e => e.stopPropagation()}>
                <div className="explanation-header">
                    <h3>💡 Concept Ergonomique</h3>
                    <button onClick={() => setShowExplanation(false)} className="close-btn">
                        <X size={20} />
                    </button>
                </div>
                <div className="explanation-content">
                    <h4>L'Interface Progressivement Révélée</h4>
                    <p><strong>Problème résolu :</strong> Surcharge cognitive des interfaces éducatives traditionnelles</p>

                    <div className="principle-list">
                        <div className="principle">
                            <span className="principle-number">1</span>
                            <div>
                                <strong>Contextualité</strong>
                                <p>L'interface s'adapte à qui vous êtes et ce que vous cherchez</p>
                            </div>
                        </div>

                        <div className="principle">
                            <span className="principle-number">2</span>
                            <div>
                                <strong>Minimalisme radical</strong>
                                <p>Une seule action principale visible à la fois</p>
                            </div>
                        </div>

                        <div className="principle">
                            <span className="principle-number">3</span>
                            <div>
                                <strong>Navigation narrative</strong>
                                <p>Swipe ou flèches = parcours comme une histoire</p>
                            </div>
                        </div>

                        <div className="principle">
                            <span className="principle-number">4</span>
                            <div>
                                <strong>Feedback immédiat</strong>
                                <p>Chaque interaction a une réponse visuelle claire</p>
                            </div>
                        </div>

                        <div className="principle">
                            <span className="principle-number">5</span>
                            <div>
                                <strong>Accessibilité native</strong>
                                <p>Navigation au clavier, contraste optimisé, textes lisibles</p>
                            </div>
                        </div>
                    </div>

                    {/* NOTE DE VISION ERGONOMIQUE AJOUTÉE ICI */}
                    <div className="vision-note">
                        <h5>Note de vision ergonomique</h5>
                        <p>
                            Notre priorité est de réduire la charge cognitive en dévoilant l’interface étape par étape,
                            tout en gardant l’utilisateur en contrôle de son parcours. Le principal compromis assumé
                            est d’ajouter quelques clics et transitions supplémentaires en échange d’une meilleure
                            compréhension, d’un rythme plus calme et d’un sentiment de progression guidée.
                        </p>
                        <p>
                            Cette démarche s’inspire des parcours d’onboarding des applications pédagogiques, des
                            principes de design minimaliste et des recommandations d’ergonomie centrées sur
                            l’accessibilité (contraste fort, hiérarchie visuelle claire, actions principales isolées).
                        </p>
                    </div>

                    <div className="explanation-footer">
                        <p>📍 Vous êtes à l'étape du parcours où nous montrons UNIQUEMENT ce qui est pertinent pour vous.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeroSection = () => {
    const { nextStep, setShowExplanation } = useApp();

    return (
        <div className="section hero-section">
            <div className="hero-content">
                <div className="hero-badge">NIRD 2025</div>
                <h1 className="hero-title">
                    Le Village Numérique Résistant
                </h1>
                <p className="hero-subtitle">
                    Comment les établissements scolaires peuvent tenir tête aux Big Tech ?
                </p>

                <div className="hero-icons">
                    <div className="hero-icon">
                        <Leaf size={32} />
                        <span>Durable</span>
                    </div>
                    <div className="hero-icon">
                        <Shield size={32} />
                        <span>Inclusif</span>
                    </div>
                    <div className="hero-icon">
                        <Recycle size={32} />
                        <span>Responsable</span>
                    </div>
                </div>

                <button onClick={nextStep} className="cta-button">
                    Découvrir la démarche
                    <ChevronRight size={20} />
                </button>

                <button onClick={() => setShowExplanation(true)} className="concept-btn">
                    💡 Comprendre le concept ergonomique
                </button>
            </div>
        </div>
    );
};

const ProfileSection = () => {
    const { nextStep, setUserType } = useApp();

    const profiles = [
        {
            id: 'student',
            icon: <BookOpen size={48} />,
            title: 'Élève/Étudiant',
            description: 'Je veux comprendre le numérique responsable'
        },
        {
            id: 'teacher',
            icon: <Users size={48} />,
            title: 'Enseignant',
            description: 'Je cherche des ressources pédagogiques'
        },
        {
            id: 'school',
            icon: <School size={48} />,
            title: 'Établissement',
            description: 'Nous voulons adopter la démarche NIRD'
        }
    ];

    const handleSelect = (type) => {
        setUserType(type);
        setTimeout(nextStep, 300);
    };

    return (
        <div className="section profile-section">
            <div className="section-inner">
                <h2 className="section-title">Qui êtes-vous ?</h2>
                <p className="section-subtitle">Nous adaptons le contenu à votre profil</p>

                <div className="profile-grid">
                    {profiles.map((profile) => (
                        <button
                            key={profile.id}
                            onClick={() => handleSelect(profile.id)}
                            className="profile-card"
                        >
                            <div className="profile-icon">{profile.icon}</div>
                            <h3>{profile.title}</h3>
                            <p>{profile.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ContentSection = () => {
    const { userType, nextStep } = useApp();

    const content = {
        student: {
            title: 'Deviens un acteur du numérique responsable',
            items: [
                '🎮 Comprendre les enjeux par le jeu',
                '🌱 Adopter des gestes éco-responsables',
                '🔒 Protéger tes données personnelles',
                '💡 Créer du contenu éthique'
            ]
        },
        teacher: {
            title: 'Ressources pédagogiques NIRD',
            items: [
                '📚 Séquences clés en main',
                '🎯 Outils d\'évaluation',
                '🤝 Partage de bonnes pratiques',
                '💻 Logiciels libres recommandés'
            ]
        },
        school: {
            title: 'Démarche NIRD pour votre établissement',
            items: [
                '📊 Audit de vos pratiques numériques',
                '🎯 Feuille de route personnalisée',
                '👥 Formation des équipes',
                '🏆 Label NIRD pour votre établissement'
            ]
        }
    };

    const currentContent = content[userType] || content.student;

    return (
        <div className="section content-section">
            <div className="section-inner">
                <h2 className="section-title">{currentContent.title}</h2>

                <div className="content-list">
                    {currentContent.items.map((item, index) => (
                        <div key={index} className="content-item" style={{ animationDelay: `${index * 0.1}s` }}>
                            <span className="content-text">{item}</span>
                        </div>
                    ))}
                </div>

                <button onClick={nextStep} className="cta-button">
                    Voir les ressources
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

const ResourcesSection = () => {
    const { nextStep } = useApp();

    const resources = [
        {
            title: 'Guide de démarrage',
            type: 'PDF',
            icon: <FileText size={24} />,
            size: '2.3 MB',
            color: '#667eea'
        },
        {
            title: 'Vidéos explicatives',
            type: 'Playlist',
            icon: <Play size={24} />,
            size: '12 vidéos',
            color: '#f093fb'
        },
        {
            title: 'Kit pédagogique',
            type: 'ZIP',
            icon: <Download size={24} />,
            size: '45 MB',
            color: '#4facfe'
        }
    ];

    return (
        <div className="section resources-section">
            <div className="section-inner">
                <h2 className="section-title">Ressources disponibles</h2>
                <p className="section-subtitle">Tout ce dont vous avez besoin pour démarrer</p>

                <div className="resources-grid">
                    {resources.map((resource, index) => (
                        <div
                            key={index}
                            className="resource-card"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                borderLeftColor: resource.color
                            }}
                        >
                            <div className="resource-icon" style={{ color: resource.color }}>
                                {resource.icon}
                            </div>
                            <div className="resource-info">
                                <h3>{resource.title}</h3>
                                <div className="resource-meta">
                                    <span className="resource-type">{resource.type}</span>
                                    <span className="resource-size">{resource.size}</span>
                                </div>
                            </div>
                            <button className="resource-download">
                                <Download size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <button onClick={nextStep} className="cta-button">
                    Rejoindre la communauté
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

const FinalSection = () => {
    const { goToStep } = useApp();

    return (
        <div className="section final-section">
            <div className="final-content section-inner">
                <h2 className="final-title">Bienvenue dans le Village NIRD ! 🎉</h2>
                <p className="final-text">
                    Vous faites maintenant partie d'une communauté qui construit un numérique plus éthique, durable et inclusif.
                </p>

                <div className="final-stats">
                    <div className="stat">
                        <div className="stat-number">1,200+</div>
                        <div className="stat-label">Établissements</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">15,000+</div>
                        <div className="stat-label">Enseignants</div>
                    </div>
                    <div className="stat">
                        <div className="stat-number">250K+</div>
                        <div className="stat-label">Élèves</div>
                    </div>
                </div>

                <div className="final-actions">
                    <button className="cta-button primary">
                        Créer mon compte
                    </button>
                    <button onClick={() => goToStep(0)} className="cta-button secondary">
                        Recommencer le parcours
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProgressNav = () => {
    const { currentStep, prevStep, nextStep } = useApp();

    const steps = ['Accueil', 'Profil', 'Contenu', 'Ressources', 'Communauté'];

    return (
        <div className="progress-nav">
            <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="nav-arrow"
                aria-label="Étape précédente"
            >
                <ChevronLeft size={24} />
            </button>

            <div className="progress-dots">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`progress-dot ${currentStep === index ? 'active' : ''} ${currentStep > index ? 'completed' : ''}`}
                        title={step}
                    />
                ))}
            </div>

            <button
                onClick={nextStep}
                disabled={currentStep === 4}
                className="nav-arrow"
                aria-label="Étape suivante"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

const Header = () => {
    const { isDark, toggleTheme, setShowExplanation } = useApp();

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <span className="logo-text">NIRD</span>
                    <span className="logo-badge">Hair'gonomie</span>
                </div>

                <div className="header-actions">
                    <button
                        onClick={() => setShowExplanation(true)}
                        className="concept-info-btn"
                        title="Concept ergonomique"
                    >
                        💡
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

function App() {
    const { isDark, currentStep } = useApp();

    const sections = [
        <HeroSection />,
        <ProfileSection />,
        <ContentSection />,
        <ResourcesSection />,
        <FinalSection />
    ];

    return (
        <div className={`app ${isDark ? 'dark' : 'light'}`}>
            <Header />
            <ExplanationPanel />

            <main className="main-content">
                <div className="section-container">
                    {sections[currentStep]}
                </div>
            </main>

            <ProgressNav />

            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          height: 100%;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
          overflow-x: hidden;
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          transition: background-color 0.4s ease, color 0.4s ease;
        }

        .app.dark {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          color: #f1f5f9;
        }

        .app.light {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%);
          color: #0f172a;
        }

        .header {
          padding: 1rem 2rem;
          backdrop-filter: blur(16px);
          border-bottom: 1px solid;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .dark .header {
          background: rgba(15, 23, 42, 0.8);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .light .header {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(0, 0, 0, 0.1);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-text {
          font-size: 1.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .logo-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 0.5rem;
          background: rgba(102, 126, 234, 0.15);
          color: #667eea;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .concept-info-btn {
          padding: 0.5rem 0.75rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1.25rem;
          transition: all 0.2s ease;
          background: transparent;
        }

        .dark .concept-info-btn {
          background: rgba(255, 255, 255, 0.05);
        }

        .light .concept-info-btn {
          background: rgba(0, 0, 0, 0.05);
        }

        .concept-info-btn:hover {
          transform: scale(1.1);
        }

        .theme-toggle {
          padding: 0.6rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .dark .theme-toggle {
          background: rgba(255, 255, 255, 0.08);
          color: #f1f5f9;
        }

        .light .theme-toggle {
          background: rgba(0, 0, 0, 0.05);
          color: #0f172a;
        }

        .theme-toggle:hover {
          transform: rotate(180deg) scale(1.1);
        }

        .main-content {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: stretch;
          padding: 0;
        }

        .section-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 1rem 2rem 1rem;
        }

        .section {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-inner {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-section {
          text-align: center;
        }

        .hero-content {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          color: #667eea;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.2;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          opacity: 0.8;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .hero-icons {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .hero-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem;
          border-radius: 1rem;
          transition: all 0.3s ease;
        }

        .dark .hero-icon {
          background: rgba(255, 255, 255, 0.05);
          color: #667eea;
        }

        .light .hero-icon {
          background: rgba(102, 126, 234, 0.08);
          color: #5568d3;
        }

        .hero-icon:hover {
          transform: translateY(-5px);
        }

        .hero-icon span {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .cta-button {
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-bottom: 1rem;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        .concept-btn {
          margin-left: 1rem;
          padding: 0.75rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          border: 2px solid;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dark .concept-btn {
          background: transparent;
          border-color: rgba(255, 255, 255, 0.2);
          color: #f1f5f9;
        }

        .light .concept-btn {
          background: transparent;
          border-color: rgba(0, 0, 0, 0.2);
          color: #0f172a;
        }

        .concept-btn:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .section-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 0.75rem;
          text-align: center;
        }

        .section-subtitle {
          font-size: 1.125rem;
          opacity: 0.7;
          text-align: center;
          margin-bottom: 1rem;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .profile-card {
          padding: 2.5rem 2rem;
          border-radius: 1.25rem;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          background: transparent;
        }

        .dark .profile-card {
          background: rgba(255, 255, 255, 0.03);
          color: #f1f5f9;
        }

        .light .profile-card {
          background: rgba(255, 255, 255, 0.6);
          color: #0f172a;
        }

        .profile-card:hover {
          transform: translateY(-8px);
          border-color: #667eea;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
        }

        .profile-icon {
          margin-bottom: 1.5rem;
          color: #667eea;
        }

        .profile-card h3 {
          font-size: 1.375rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .profile-card p {
          opacity: 0.7;
          line-height: 1.5;
        }

        .content-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .content-item {
          padding: 1.5rem;
          border-radius: 1rem;
          border-left: 4px solid #667eea;
          animation: slideInLeft 0.5s ease forwards;
          opacity: 0;
        }

        .dark .content-item {
          background: rgba(255, 255, 255, 0.05);
        }

        .light .content-item {
          background: rgba(255, 255, 255, 0.7);
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .content-text {
          font-size: 1.125rem;
          font-weight: 500;
        }

        .resources-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .resource-card {
          padding: 1.5rem;
          border-radius: 1rem;
          border-left: 4px solid;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
          animation: slideInLeft 0.5s ease forwards;
          opacity: 0;
        }

        .dark .resource-card {
          background: rgba(255, 255, 255, 0.05);
        }

        .light .resource-card {
          background: rgba(255, 255, 255, 0.7);
        }

        .resource-card:hover {
          transform: translateX(10px);
        }

        .resource-icon {
          flex-shrink: 0;
        }

        .resource-info {
          flex: 1;
        }

        .resource-info h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .resource-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          opacity: 0.7;
        }

        .resource-download {
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dark .resource-download {
          background: rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
        }

        .light .resource-download {
          background: rgba(0, 0, 0, 0.05);
          color: #0f172a;
        }

        .resource-download:hover {
          transform: scale(1.1);
        }

        .final-section {
          text-align: center;
        }

        .final-content {
          padding: 3rem 2rem;
        }

        .final-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .final-text {
          font-size: 1.25rem;
          opacity: 0.8;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .final-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.7;
          font-weight: 500;
        }

        .final-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .cta-button.secondary {
          background: transparent;
          border: 2px solid;
          color: inherit;
        }

        .dark .cta-button.secondary {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .light .cta-button.secondary {
          border-color: rgba(0, 0, 0, 0.2);
        }

        .cta-button.secondary:hover {
          border-color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .progress-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 1.25rem 2rem;
          position: sticky;
          bottom: 0;
          backdrop-filter: blur(16px);
          border-top: 1px solid;
        }

        .dark .progress-nav {
          background: rgba(15, 23, 42, 0.85);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .light .progress-nav {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(0, 0, 0, 0.1);
        }

        .nav-arrow {
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .dark .nav-arrow {
          background: rgba(255, 255, 255, 0.08);
          color: #f1f5f9;
        }

        .light .nav-arrow {
          background: rgba(0, 0, 0, 0.05);
          color: #0f172a;
        }

        .nav-arrow:hover:not(:disabled) {
          transform: scale(1.1);
        }

        .nav-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .progress-dots {
          display: flex;
          gap: 0.75rem;
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .dark .progress-dot {
          background: rgba(255, 255, 255, 0.2);
        }

        .light .progress-dot {
          background: rgba(0, 0, 0, 0.2);
        }

        .progress-dot.active {
          background: #667eea;
          width: 32px;
          border-radius: 6px;
        }

        .progress-dot.completed {
          background: #764ba2;
        }

        .explanation-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }

        .explanation-panel {
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 1.5rem;
          animation: slideUp 0.4s ease;
        }

        .dark .explanation-panel {
          background: #1e293b;
          color: #f1f5f9;
        }

        .light .explanation-panel {
          background: white;
          color: #0f172a;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .explanation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid;
        }

        .dark .explanation-header {
          border-color: rgba(255, 255, 255, 0.1);
        }

        .light .explanation-header {
          border-color: rgba(0, 0, 0, 0.1);
        }

        .explanation-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .close-btn {
          padding: 0.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .dark .close-btn {
          background: rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
        }

        .light .close-btn {
          background: rgba(0, 0, 0, 0.05);
          color: #0f172a;
        }

        .close-btn:hover {
          transform: scale(1.1);
        }

        .explanation-content {
          padding: 2rem;
        }

        .explanation-content h4 {
          font-size: 1.375rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #667eea;
        }

        .explanation-content > p {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .principle-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .principle {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 0.75rem;
        }
        .principle strong{
        text-align: start;
        }

        .dark .principle {
          background: rgba(255, 255, 255, 0.05);
        }

        .light .principle {
          background: rgba(102, 126, 234, 0.05);
        }

        .principle-number {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .principle strong {
          display: block;
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
          color: #667eea;
        }

        .principle p {
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.8;
        }

        .vision-note {
          margin-bottom: 1.5rem;
          padding: 1.25rem;
          border-radius: 0.75rem;
        }

        .dark .vision-note {
          background: rgba(148, 163, 184, 0.1);
        }

        .light .vision-note {
          background: rgba(148, 163, 184, 0.12);
        }

        .vision-note h5 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .vision-note p {
          font-size: 0.9rem;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 0.4rem;
        }

        .explanation-footer {
          padding: 1.25rem;
          border-radius: 0.75rem;
          border-left: 4px solid #667eea;
        }

        .dark .explanation-footer {
          background: rgba(102, 126, 234, 0.1);
        }

        .light .explanation-footer {
          background: rgba(102, 126, 234, 0.05);
        }

        .explanation-footer p {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .header {
            padding: 1rem;
          }

          .header-content {
            gap: 1rem;
          }

          .logo-text {
            font-size: 1.375rem;
          }

          .section-container {
            padding: 1.5rem 1rem 2.5rem;
          }

          .hero-icons {
            gap: 1.5rem;
          }

          .profile-grid {
            grid-template-columns: 1fr;
          }

          .progress-nav {
            padding: 1rem;
            gap: 1rem;
          }

          .final-stats {
            gap: 2rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .explanation-panel {
            max-height: 85vh;
          }

          .explanation-header,
          .explanation-content {
            padding: 1.5rem;
          }
        }

        *:focus-visible {
          outline: 3px solid #667eea;
          outline-offset: 2px;
        }
      `}</style>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <AppProvider>
            <App />
        </AppProvider>
    );
}
