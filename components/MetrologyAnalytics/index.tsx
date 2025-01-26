'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Brain,
  LineChart,
  BarChart,
  Gauge,
  Settings,
  FileText,
  Download,
  Upload,
  ChevronRight,
  Search,
  CheckCircle,
  AlertTriangle,
  Activity,
  Microscope,
  Ruler,
  GitBranch,
  Menu,
  X,
  PieChart,
  ArrowUpRight,
  Share2,
  Bell,
  Shield,
  Zap,
} from 'lucide-react';

// Definindo a interface do estado para tipagem segura
interface State {
  activeTab: string;
  showDemo: boolean;
  isAnalyzing: boolean;
  menuOpen: boolean;
  theme: string;
  chartType: string;
  demoProgress: number;
  notifications: any[];
  userFeedback: string;
  isFeedbackSubmitted: boolean;
}

function MetrologyAnalytics() {
  const [state, setState] = useState<State>({
    activeTab: 'analysis',
    showDemo: false,
    isAnalyzing: false,
    menuOpen: false,
    theme: 'dark',
    chartType: '2d',
    demoProgress: 0,
    notifications: [],
    userFeedback: '',
    isFeedbackSubmitted: false,
  });

  const {
    activeTab,
    showDemo,
    isAnalyzing,
    menuOpen,
    chartType,
    demoProgress,
    notifications,
    userFeedback,
    isFeedbackSubmitted,
  } = state;

  // Função `set` com tipagem correta
  const set = useCallback(
    (key: keyof State, value: any) => 
      setState((prev) => ({ ...prev, [key]: value })),
    []
  );

  const services = {
    analysis: {
      title: 'Enterprise Analysis',
      description:
        'Next-gen metrology analysis with quantum-enhanced precision',
      features: [
        'Neural network anomaly detection (99.99%)',
        'Real-time uncertainty quantification',
        'Multi-sensor data fusion',
        'Predictive drift compensation',
        'Automated report generation',
        'Customizable dashboards',
      ],
      metrics: [
        { label: 'Accuracy', value: '99.99%', trend: '+0.1%' },
        { label: 'Speed', value: '<10ms', trend: '-5ms' },
        { label: 'Uptime', value: '99.999%', trend: '+0.01%' },
        { label: 'Data Points', value: '1M+/sec', trend: '+100K' },
      ],
      icon: <Microscope className="text-blue-400" />,
    },
    optimization: {
      title: 'Smart Optimization',
      description: 'Self-learning calibration system with digital twin',
      features: [
        'Autonomous calibration optimization',
        'Environmental compensation AI',
        'Digital twin synchronization',
        'Real-time process adaptation',
        'Energy efficiency tracking',
        'Predictive maintenance alerts',
      ],
      metrics: [
        { label: 'Efficiency', value: '95%', trend: '+2.5%' },
        { label: 'Precision', value: '99.9%', trend: '+0.5%' },
        { label: 'ROI', value: '35%', trend: '+5%' },
        { label: 'Downtime', value: '<1%', trend: '-0.2%' },
      ],
      icon: <Ruler className="text-purple-400" />,
    },
    reporting: {
      title: 'Advanced Analytics',
      description: 'Enterprise reporting with predictive insights',
      features: [
        'Regulatory compliance automation',
        'Predictive quality analytics',
        'Interactive 3D visualizations',
        'Blockchain audit trail',
        'Real-time collaboration',
        'Customizable templates',
      ],
      metrics: [
        { label: 'Compliance', value: '100%', trend: 'Stable' },
        { label: 'Accuracy', value: '95%', trend: '+2%' },
        { label: 'Coverage', value: '100%', trend: 'Stable' },
        { label: 'User Satisfaction', value: '98%', trend: '+3%' },
      ],
      icon: <GitBranch className="text-green-400" />,
    },
  };

  const UI = {
    Button: ({
      onClick,
      variant = 'primary',
      children,
      className = '',
      disabled = false,
    }: {
      onClick: () => void;
      variant?: 'primary' | 'secondary' | 'ghost';
      children: React.ReactNode;
      className?: string;
      disabled?: boolean;
    }) => (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all
          ${
            variant === 'primary'
              ? 'bg-blue-600 hover:bg-blue-700'
              : variant === 'secondary'
              ? 'bg-slate-700 hover:bg-slate-600'
              : 'hover:text-blue-400'
          } ${className}`}
      >
        {children}
      </button>
    ),
    Card: ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
      <div
        className={`bg-slate-900 p-6 rounded-xl border border-slate-800 ${className}`}
      >
        {children}
      </div>
    ),
    Metric: ({ label, value, trend }: { label: string; value: string; trend?: string }) => (
      <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
        <span className="text-sm text-slate-300">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{value}</span>
          {trend && (
            <span
              className={`text-xs ${
                trend.includes('+') ? 'text-green-400' : 'text-blue-400'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
    ),
    Badge: ({ children }: { children: React.ReactNode }) => (
      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
        {children}
      </span>
    ),
  };

  const runAnalysis = useCallback(() => {
    set('isAnalyzing', true);
    set('demoProgress', 0);
    const steps = [25, 50, 75, 100];
    steps.forEach((progress, index) => {
      setTimeout(() => {
        set('demoProgress', progress);
        if (progress === 100) set('isAnalyzing', false);
      }, index * 500);
    });
  }, [set]);

  const handleFeedbackSubmit = useCallback(() => {
    if (userFeedback.trim()) {
      set('isFeedbackSubmitted', true);
      setTimeout(() => set('isFeedbackSubmitted', false), 3000);
    }
  }, [userFeedback, set]);

  useEffect(() => {
    if (showDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showDemo]);

  // Referência para o textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Garantir que activeTab seja uma chave válida de services
  const activeService = services[activeTab as keyof typeof services];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-semibold flex items-center gap-2">
              MetrologyAI
              <UI.Badge>Enterprise</UI.Badge>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Solutions', 'Features', 'Pricing', 'Support'].map((item) => (
              <UI.Button
                key={item}
                variant="ghost"
                onClick={() =>
                  document
                    .getElementById(item.toLowerCase())
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {item}
              </UI.Button>
            ))}
            <UI.Button onClick={() => set('showDemo', true)}>
              Live Demo <ArrowUpRight className="w-4 h-4 ml-2" />
            </UI.Button>
          </div>
          <button
            className="md:hidden"
            onClick={() => set('menuOpen', !menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4">
            <div className="flex flex-col gap-4">
              {['Solutions', 'Features', 'Pricing', 'Support'].map((item) => (
                <UI.Button
                  key={item}
                  variant="ghost"
                  onClick={() => {
                    document
                      .getElementById(item.toLowerCase())
                      ?.scrollIntoView({ behavior: 'smooth' });
                    set('menuOpen', false);
                  }}
                >
                  {item}
                </UI.Button>
              ))}
              <UI.Button
                onClick={() => {
                  set('showDemo', true);
                  set('menuOpen', false);
                }}
              >
                Live Demo
              </UI.Button>
            </div>
          </div>
        )}
      </header>

      <main className="pb-12">
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <UI.Badge>Quantum-Enhanced Precision</UI.Badge>
            <h2 className="text-4xl md:text-5xl font-bold my-6">
              Next-Generation{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Metrology Intelligence
              </span>
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Transform industrial measurements into actionable insights with
              AI-powered analytics and real-time optimization.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <UI.Button
                onClick={() =>
                  document
                    .getElementById('solutions')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Search className="w-4 h-4 mr-2" /> Explore Platform
              </UI.Button>
              <UI.Button
                variant="secondary"
                onClick={() => set('showDemo', true)}
              >
                <Zap className="w-4 h-4 mr-2" /> Watch Demo
              </UI.Button>
            </div>
          </div>
        </section>

        <section
          id="solutions"
          className="py-16 px-4 bg-slate-900 border-y border-slate-800"
        >
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.keys(services).map((key) => (
                <UI.Button
                  key={key}
                  variant={activeTab === key ? 'primary' : 'secondary'}
                  onClick={() => set('activeTab', key)}
                >
                  {services[key as keyof typeof services].icon}
                  <span className="ml-2">{services[key as keyof typeof services].title}</span>
                </UI.Button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8">{activeService.icon}</div>
                  <h3 className="text-2xl font-semibold">
                    {activeService.title}
                  </h3>
                </div>
                <p className="text-slate-300">
                  {activeService.description}
                </p>
                <div className="grid gap-4">
                  {activeService.metrics.map((metric, idx) => (
                    <UI.Metric key={idx} {...metric} />
                  ))}
                </div>
                <ul className="space-y-3">
                  {activeService.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-3 text-blue-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <UI.Card>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Analytics Dashboard</h4>
                  <div className="flex gap-2">
                    {['2d', '3d'].map((type) => (
                      <button
                        key={type}
                        onClick={() => set('chartType', type)}
                        className={`px-2 py-1 rounded text-xs ${
                          chartType === type ? 'bg-blue-600' : 'bg-slate-700'
                        }`}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                {chartType === '2d' ? (
                  <BarChart className="w-full h-64 text-blue-400" />
                ) : (
                  <PieChart className="w-full h-64 text-purple-400" />
                )}
              </UI.Card>
            </div>
          </div>
        </section>

        {showDemo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <UI.Card className="max-w-2xl w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">Live Analysis Demo</h3>
                </div>
                {isAnalyzing && (
                  <span className="text-sm text-blue-400 animate-pulse">
                    Processing...
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FileText, label: 'Import', color: 'blue' },
                  { icon: Brain, label: 'Process', color: 'purple' },
                  { icon: AlertTriangle, label: 'Analyze', color: 'yellow' },
                  { icon: CheckCircle, label: 'Report', color: 'green' },
                ].map(({ icon: Icon, label, color }, index) => (
                  <UI.Card
                    key={index}
                    className={
                      index === 1 && isAnalyzing ? 'animate-pulse' : ''
                    }
                  >
                    <Icon className={`w-5 h-5 mb-2 text-${color}-400`} />
                    <p className="text-sm">{label}</p>
                  </UI.Card>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <UI.Button onClick={runAnalysis} disabled={isAnalyzing}>
                  {isAnalyzing ? 'Processing...' : 'Start Analysis'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </UI.Button>
                <UI.Button
                  variant="ghost"
                  onClick={() => set('showDemo', false)}
                >
                  Close
                </UI.Button>
              </div>
            </UI.Card>
          </div>
        )}

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Customer Feedback</h2>
            <p className="text-lg text-slate-300 mb-8">
              We value your feedback. Let us know how we can improve.
            </p>
            <textarea
              ref={textareaRef} // Referência para o textarea
              className="w-full p-4 bg-slate-800 rounded-lg text-slate-100 mb-4"
              rows={4} // Valor padrão para rows
              placeholder="Your feedback..."
              value={userFeedback}
              onChange={(e) => set('userFeedback', e.target.value)}
            />
            <UI.Button
              onClick={handleFeedbackSubmit}
              disabled={isFeedbackSubmitted}
            >
              {isFeedbackSubmitted ? 'Thank you!' : 'Submit Feedback'}
            </UI.Button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-8 px-4 border-t border-slate-800">
        <div className="container mx-auto text-center text-slate-400">
          <div className="flex justify-center items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">MetrologyAI Enterprise</span>
          </div>
          <p className="text-sm mt-2">
            &copy; 2025 MetrologyAI. Enterprise-grade metrology intelligence.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="#" className="text-slate-400 hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-400">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-400">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MetrologyAnalytics;