import React, { useState, useCallback, useEffect, ReactNode } from 'react';
import {
  Brain, LineChart, BarChart, Gauge, Settings, FileText,
  Download, Upload, ChevronRight, Search, CheckCircle,
  AlertTriangle, Activity, Microscope, Ruler, GitBranch,
  Menu, X, PieChart, ArrowUpRight, Share2, Bell, Shield, Zap
} from 'lucide-react';

function MetrologyAnalytics() {
  type ServiceKey = keyof typeof services;

  const [state, setState] = useState({
    activeTab: 'analysis' as ServiceKey,
    showDemo: false,
    isAnalyzing: false,
    menuOpen: false,
    theme: 'dark',
    chartType: '2d',
    demoProgress: 0,
    notifications: [] as string[],
    userFeedback: '',
    isFeedbackSubmitted: false,
    rotationX: 0,
    rotationY: 0,
    activeModel: 0
  });

  const set = useCallback(
    (key: keyof typeof state, value: any) => setState(prev => ({ ...prev, [key]: value })),
    []
  );

  const models = [
    { name: 'Quantum Sensor', accuracy: 99.99, points: '1M+' },
    { name: 'Neural Network', accuracy: 99.95, points: '500K+' },
    { name: 'Digital Twin', accuracy: 99.90, points: '250K+' }
  ];

  const services = {
    analysis: {
      title: 'Enterprise Analysis',
      description: 'Next-gen metrology analysis with quantum-enhanced precision',
      features: [
        'Neural network anomaly detection (99.99%)',
        'Real-time uncertainty quantification',
        'Multi-sensor data fusion',
        'Predictive drift compensation',
        'Automated report generation',
        'Customizable dashboards'
      ],
      metrics: [
        { label: 'Accuracy', value: '99.99%', trend: '+0.1%' },
        { label: 'Speed', value: '<10ms', trend: '-5ms' },
        { label: 'Uptime', value: '99.999%', trend: '+0.01%' },
        { label: 'Data Points', value: '1M+/sec', trend: '+100K' }
      ],
      icon: <Microscope className="text-blue-400" />
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
        'Predictive maintenance alerts'
      ],
      metrics: [
        { label: 'Efficiency', value: '95%', trend: '+2.5%' },
        { label: 'Precision', value: '99.9%', trend: '+0.5%' },
        { label: 'ROI', value: '35%', trend: '+5%' },
        { label: 'Downtime', value: '<1%', trend: '-0.2%' }
      ],
      icon: <Ruler className="text-purple-400" />
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
        'Customizable templates'
      ],
      metrics: [
        { label: 'Compliance', value: '100%', trend: 'Stable' },
        { label: 'Accuracy', value: '95%', trend: '+2%' },
        { label: 'Coverage', value: '100%', trend: 'Stable' },
        { label: 'User Satisfaction', value: '98%', trend: '+3%' }
      ],
      icon: <GitBranch className="text-green-400" />
    }
  };

  interface UIButtonProps {
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    children: ReactNode;
    className?: string;
    disabled?: boolean;
  }

  const UI = {
    Button: ({ onClick = () => {}, variant = 'primary', children, className = '', disabled = false }: UIButtonProps) => (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md text-sm font-medium flex items-center transition-all
          ${variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700' :
            variant === 'secondary' ? 'bg-slate-700 hover:bg-slate-600' :
            'hover:text-blue-400'} ${className}`}
      >
        {children}
      </button>
    ),
    Card: ({ children, className = '' }: { children: ReactNode; className?: string }) => (
      <div className={`bg-slate-900 p-6 rounded-xl border border-slate-800 ${className}`}>
        {children}
      </div>
    ),
    Model3D: ({ model, isActive }: { model: typeof models[number]; isActive: boolean }) => (
      <div 
        className={`relative transform-gpu transition-all duration-500 ${
          isActive ? 'scale-110' : 'scale-100 opacity-70'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${state.rotationX}deg) rotateY(${state.rotationY}deg)`
        }}
      >
        <div className="w-64 h-64 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-lg p-6 backdrop-blur-xl border border-slate-700/50">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{model.name}</h3>
              <p className="text-sm text-slate-300">Accuracy: {model.accuracy}%</p>
              <p className="text-sm text-slate-300">Data Points: {model.points}</p>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs text-blue-400">Active</span>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    )
  };

  useEffect(() => {
    const interval = setInterval(() => {
      set('activeModel', (prev: number) => (prev + 1) % models.length);
    }, 3000);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const rotationX = (clientY / innerHeight - 0.5) * 20;
      const rotationY = (clientX / innerWidth - 0.5) * 20;
      set('rotationX', rotationX);
      set('rotationY', rotationY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-semibold">MetrologyAI</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Solutions', 'Features', 'Pricing', 'Support'].map(item => (
              <UI.Button
                key={item}
                variant="ghost"
                onClick={() => {}}
              >
                {item}
              </UI.Button>
            ))}
            <UI.Button onClick={() => set('showDemo', true)}>
              Live Demo <ArrowUpRight className="w-4 h-4 ml-2" />
            </UI.Button>
          </div>
        </nav>
      </header>

      <main className="pb-12">
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400">
              Quantum-Enhanced Precision
            </span>
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
          </div>
        </section>

        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-12">Interactive Models</h3>
            <div className="flex justify-center gap-8">
              {models.map((model, idx) => (
                <UI.Model3D
                  key={idx}
                  model={model}
                  isActive={state.activeModel === idx}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-900 border-y border-slate-800">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.keys(services).map(key => (
                <UI.Button
                  key={key}
                  variant={state.activeTab === key ? 'primary' : 'secondary'}
                  onClick={() => set('activeTab', key as ServiceKey)}
                >
                  {services[key as ServiceKey].icon}
                  <span className="ml-2">{services[key as ServiceKey].title}</span>
                </UI.Button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8">
                    {services[state.activeTab].icon}
                  </div>
                  <h3 className="text-2xl font-semibold">
                    {services[state.activeTab].title}
                  </h3>
                </div>
                <p className="text-slate-300">
                  {services[state.activeTab].description}
                </p>
                <div className="grid gap-4">
                  {services[state.activeTab].metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-sm text-slate-300">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{metric.value}</span>
                        <span className={`text-xs ${
                          metric.trend.includes('+') ? 'text-green-400' : 'text-blue-400'
                        }`}>
                          {metric.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="space-y-3">
                  {services[state.activeTab].features.map((feature, index) => (
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
                    {['2d', '3d'].map(type => (
                      <button
                        key={type}
                        onClick={() => set('chartType', type)}
                        className={`px-2 py-1 rounded text-xs ${
                          state.chartType === type ? 'bg-blue-600' : 'bg-slate-700'
                        }`}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                {state.chartType === '2d' ? (
                  <BarChart className="w-full h-64 text-blue-400" />
                ) : (
                  <PieChart className="w-full h-64 text-purple-400" />
                )}
              </UI.Card>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Customer Feedback</h2>
            <p className="text-lg text-slate-300 mb-8">
              We value your feedback. Let us know how we can improve.
            </p>
            <textarea
              className="w-full p-4 bg-slate-800 rounded-lg text-slate-100 mb-4"
              rows={4}
              placeholder="Your feedback..."
              value={state.userFeedback}
              onChange={(e) => set('userFeedback', e.target.value)}
            />
            <UI.Button
              onClick={() => {
                set('isFeedbackSubmitted', true);
                setTimeout(() => set('isFeedbackSubmitted', false), 3000);
              }}
              disabled={state.isFeedbackSubmitted}
            >
              {state.isFeedbackSubmitted ? 'Thank you!' : 'Submit Feedback'}
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

      {state.showDemo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <UI.Card className="max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold">Live Analysis Demo</h3>
              </div>
              {state.isAnalyzing && (
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
                    index === 1 && state.isAnalyzing ? 'animate-pulse' : ''
                  }
                >
                  <Icon className={`w-5 h-5 mb-2 text-${color}-400`} />
                  <p className="text-sm">{label}</p>
                </UI.Card>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <UI.Button onClick={() => {
                set('isAnalyzing', true);
                setTimeout(() => set('isAnalyzing', false), 2000);
              }} disabled={state.isAnalyzing}>
                {state.isAnalyzing ? 'Processing...' : 'Start Analysis'}
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
    </div>
  );
}

export default MetrologyAnalytics;